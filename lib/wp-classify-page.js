// Parse a WP page's HTML into a structured array of typed sections so the
// new site can render each section with a brand-consistent React component.
//
// Multi-pass approach:
//   pass 1 — preclean: drop SVGs/attrs, rewrite WP image URLs, convert
//            <details><summary> accordion blocks into <h3>/<p> form so the
//            classifier picks them up as FAQ items.
//   pass 2 — split body into raw {title, body} sections by H2.
//   pass 3 — pair-merge: collapse "Name H2" + "image+desc H2" (or
//            "STEP 01" + "Step Title") that Elementor split into two H2s.
//   pass 4 — classify each section into one of: faq, processSteps,
//            featureGrid, gallery, imageText, prose. Galleries are detected
//            BOTH from a parent H2 keyword AND from a structural pattern of
//            3+ consecutive "card-like" siblings.
//
// The classifier never crashes on unexpected content — anything it can't
// classify falls through to "prose" and the page still reads.

import { stripHtml, wpPageBySlug } from './wp-data';

// ── Tunable section-keyword regexes ────────────────────────────────
const PARENT_KEYWORDS = /\b(categor|style|type|solution|material|application|capabilit|kind|option|range|collection|use case|industries?|services?|our wooden|our \w+ trays?|our \w+ boxes?|popular|featured|product line|we offer)\b/i;
const FAQ_KEYWORDS    = /\b(faq|frequently asked|q&a|questions?|everything you need to know)\b/i;
const STEPS_KEYWORDS  = /\b(process|step|how to|how we|stages?|workflow|production flow|how it works|how to get|how (you|it) work)\b/i;
const STEP_TITLE_RE   = /^\s*step\s*\d+/i;
const STEP_NUMBER_RE  = /^\s*step\s*0?\d+\s*$/i;
const NUMERIC_LIST_RE = /^\s*\d+[\.\)]\s/;

const decode = (s) =>
  (s || '')
    .replace(/&amp;/g, '&')
    .replace(/&#8211;/g, '–')
    .replace(/&#8217;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();

const RE_REMOTE_IMG = /https?:\/\/(?:www\.)?xmchichomeware\.com\/wp-content\/uploads\//g;
const RE_REMOTE_LINK = /https?:\/\/(?:www\.)?xmchichomeware\.com\//g;

// ── Pass 1: Preclean WP HTML ──────────────────────────────────────
function preclean(html) {
  let h = html || '';

  // Drop Elementor decorative SVG icons
  h = h.replace(/<svg[\s\S]*?<\/svg>/g, '');

  // Strip class / style / id / data-* attrs
  h = h.replace(/\s+(class|style|id|data-[\w-]+)="[^"]*"/g, '');
  h = h.replace(/\s+(class|style|id|data-[\w-]+)='[^']*'/g, '');

  // Strip per-tag attrs that often clutter Elementor exports
  h = h.replace(/\s+(tabindex|aria-[\w-]+|role)="[^"]*"/g, '');

  // Rewrite WP image / page URLs to local paths
  h = h.replace(RE_REMOTE_IMG, '/wp-images/');
  h = h.replace(RE_REMOTE_LINK, '/');

  // Empty paragraphs
  h = h.replace(/<p>\s*(?:&nbsp;)?\s*<\/p>/g, '');

  // Strip srcset / sizes / width / height from imgs
  h = h.replace(/<img([^>]*?)>/g, (m, attrs) => {
    const src = (attrs.match(/src="([^"]+)"/) || [])[1] || '';
    const alt = (attrs.match(/alt="([^"]*)"/) || [])[1] || '';
    if (!src) return '';
    return `<img src="${src}" alt="${alt}" loading="lazy" />`;
  });

  // Convert Elementor accordion <details><summary>Q</summary>body</details>
  // into <h3>Q</h3>body so the classifier picks it up as an FAQ.
  h = h.replace(
    /<details[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g,
    (m, q, body) => {
      const question = decode(stripHtml(q));
      return `<h3>${question}</h3>${body}`;
    }
  );

  // Convert "<p><strong>Question?</strong></p><p>Answer</p>" FAQ pairs
  // into <h3>Question?</h3><p>Answer</p> so the classifier picks them up.
  // Some WP pages format their FAQ this way instead of using h3/details.
  // Pattern: a paragraph that contains ONLY a <strong> with text ending in '?'
  // followed immediately by a regular paragraph (the answer).
  h = h.replace(
    /<p>\s*<strong>([^<]{3,200}\?)\s*<\/strong>\s*<\/p>\s*<p>([\s\S]*?)<\/p>/g,
    (m, q, a) => `<h3>${decode(q)}</h3><p>${a}</p>`
  );
  // Also handle the case where the question doesn't end with '?' but the
  // strong text reads like a question (capitalized + "Are/Do/Can/What/Where/
  // When/Who/How/Why")
  h = h.replace(
    /<p>\s*<strong>((?:Are|Do|Can|What|Where|When|Who|How|Why)[^<]{3,200})<\/strong>\s*<\/p>\s*<p>([\s\S]*?)<\/p>/g,
    (m, q, a) => `<h3>${decode(q.trim())}?</h3><p>${a}</p>`
  );

  // Rewrite role=button / bare <a> CTAs
  h = h.replace(
    /<a\s+role="button"[^>]*>([\s\S]*?)<\/a>/g,
    '<a href="/contact" class="wp-cta-btn">$1</a>'
  );
  h = h.replace(/<a>([\s\S]*?)<\/a>/g, '<a href="/contact" class="wp-cta-btn">$1</a>');

  return h;
}

// ── Helpers ──────────────────────────────────────────────────────
function extractImgs(body) {
  return [...(body || '').matchAll(/<img[^>]+src="([^"]+)"/g)].map(m => m[1]);
}

function extractH3Items(body) {
  const out = [];
  const re = /<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3|<h2|$)/g;
  let m;
  while ((m = re.exec(body || '')) !== null) {
    out.push({
      title: decode(stripHtml(m[1])),
      html: m[2] || '',
      text: stripHtml(m[2] || '').replace(/\s+/g, ' ').trim(),
    });
  }
  return out;
}

function plainText(s) { return stripHtml(s || '').replace(/\s+/g, ' ').trim(); }

function leadBeforeH3(body) {
  const idx = (body || '').search(/<h3/);
  const lead = idx >= 0 ? body.slice(0, idx) : (body || '');
  return plainText(lead);
}

// A section is "card-like" if it has no h3 children, no FAQ/steps content,
// and either: 1 image with short body text, or no image with a short title.
function shapeOf(section) {
  const body = section.body || '';
  const imgs = extractImgs(body);
  const text = plainText(body);
  const h3 = (body.match(/<h3/g) || []).length;
  return {
    h3,
    imgs,
    imgCount: imgs.length,
    textLen: text.length,
    text,
    isCard: h3 === 0 && imgs.length <= 2 && text.length < 700,
    isNameOnly: h3 === 0 && imgs.length === 0 && text.length < 60,
    isImageCard: h3 === 0 && imgs.length >= 1 && text.length < 700,
    isStepHeader: STEP_NUMBER_RE.test(section.title.trim()),
  };
}

// ── Pass 3: pair-merge alternating H2s ───────────────────────────
function pairMerge(raw) {
  const out = [];
  for (let i = 0; i < raw.length; i++) {
    const cur = raw[i];
    const next = raw[i + 1];
    if (next) {
      const curShape = shapeOf(cur);
      const nextShape = shapeOf(next);
      // Pattern A: "STEP 01" + "Send Your Design or Idea"
      if (curShape.isStepHeader && !STEP_NUMBER_RE.test(next.title.trim())) {
        out.push({
          title: next.title,
          body: next.body,
          stepNumber: cur.title.trim().replace(/^step\s*/i, '').padStart(2, '0'),
        });
        i++;
        continue;
      }
      // Pattern B: "Bamboo" (name-only H2) + "Best for: ..." (image card)
      // ONLY merge when next title clearly describes the previous, otherwise
      // a name-only H2 like "Sofa Tray with Phone Slot" wrongly absorbs the
      // next H2 (e.g. "What Is a Wooden Sofa Tray?") and breaks gallery
      // detection downstream.
      if (curShape.isNameOnly && nextShape.isImageCard && nextShape.textLen >= 50) {
        const nextLow = next.title.trim().toLowerCase();
        const isDescriptiveSibling =
          /^(best for|ideal for|great for|perfect for|recommended for|suited for)\b/.test(nextLow);
        if (isDescriptiveSibling) {
          out.push({
            title: cur.title,
            body: next.body,
            mergedFrom: ['nameOnly', 'imageCard'],
          });
          i++;
          continue;
        }
      }
    }
    out.push(cur);
  }
  return out;
}

// ── Pass 4a: classify a single section (no gallery detection here) ─
function classifySingle(s) {
  const title = s.title;
  const body = s.body;
  const titleLow = title.toLowerCase();
  const h3Items = extractH3Items(body);
  const imgs = extractImgs(body);
  const textLen = plainText(body).length;

  // ── FAQ ─────────────────────────────────────────────────────
  if (
    FAQ_KEYWORDS.test(titleLow) ||
    (h3Items.length >= 3 && h3Items.filter(it => it.title.endsWith('?')).length >= h3Items.length - 1)
  ) {
    const items = h3Items
      .filter(it => it.title.length > 3 && it.text.length > 5)
      .map(it => ({
        q: it.title.replace(/\?+$/, '').trim() + '?',
        a: it.text,
      }));
    if (items.length >= 2) return { type: 'faq', title, items };
  }

  // ── Process Steps (H3-based) ──────────────────────────────
  if (
    h3Items.length >= 3 &&
    (STEPS_KEYWORDS.test(titleLow) ||
      h3Items.filter(it => STEP_TITLE_RE.test(it.title) || NUMERIC_LIST_RE.test(it.title)).length >= 2)
  ) {
    const items = h3Items.map((it, idx) => ({
      number: String(idx + 1).padStart(2, '0'),
      title: it.title.replace(/^step\s*\d+\s*[—\-:.]\s*/i, '').replace(/^\d+[\.\)]\s*/, ''),
      body: it.text,
    }));
    return { type: 'processSteps', title, lead: leadBeforeH3(body), items };
  }

  // ── Feature Grid (3+ H3s with body text) ──────────────────
  if (h3Items.length >= 3 && h3Items.filter(it => it.text.length >= 25).length >= 3) {
    return {
      type: 'featureGrid',
      title,
      lead: leadBeforeH3(body),
      items: h3Items.map(it => ({ title: it.title, body: it.text })),
    };
  }

  // ── Image + Text ──────────────────────────────────────────
  if (imgs.length >= 1 && textLen >= 80) {
    return {
      type: 'imageText',
      title,
      image: imgs[0],
      bodyHtml: body.replace(/<img[^>]*>/g, ''),
    };
  }

  // ── Prose fallback ────────────────────────────────────────
  if (textLen > 30 || h3Items.length > 0) {
    return { type: 'prose', title, bodyHtml: body };
  }

  return null;
}

// ── Pass 4b: try to make section[anchorIdx] a gallery PARENT.
function tryGalleryFromAnchor(raw, anchorIdx) {
  const anchor = raw[anchorIdx];
  if (!anchor) return null;
  const aShape = shapeOf(anchor);

  // Anchor must be light enough to act as a parent (not a substantive article)
  if (aShape.textLen > 400) return null;
  if (aShape.h3 > 0) return null;
  if (anchor.title.endsWith('?')) return null;
  if (FAQ_KEYWORDS.test(anchor.title) || STEPS_KEYWORDS.test(anchor.title)) return null;

  const items = [];
  let j = anchorIdx + 1;
  for (; j < raw.length; j++) {
    const sib = raw[j];
    const sh = shapeOf(sib);
    if (sh.h3 > 0) break;
    if (sh.textLen > 400) break;
    if (sib.title.endsWith('?')) break;
    if (FAQ_KEYWORDS.test(sib.title) || STEPS_KEYWORDS.test(sib.title)) break;
    items.push({
      title: sib.title,
      image: sh.imgs[0] || '',
      body: sh.text.slice(0, 320),
    });
    if (items.length >= 12) { j++; break; }
  }
  if (items.length < 3) return null;

  return {
    type: 'gallery',
    title: anchor.title,
    lead: aShape.text,
    coverImage: aShape.imgs[0] || null,
    items,
    consumedCount: j - anchorIdx, // anchor + items
  };
}

// ── Pass 4c: collapse "STEPS_KW parent + step entries" into processSteps.
// Tries (a) explicit step-paired entries first, (b) implicit card siblings.
function tryProcessStepsAtAnchor(raw, anchorIdx) {
  const anchor = raw[anchorIdx];
  if (!anchor) return null;
  if (!STEPS_KEYWORDS.test(anchor.title)) return null;

  // (a) Explicit "STEP NN" + step-title pairs
  const explicit = [];
  let j = anchorIdx + 1;
  while (j < raw.length && raw[j].stepNumber) {
    explicit.push({
      number: raw[j].stepNumber,
      title: raw[j].title,
      body: plainText(raw[j].body),
    });
    j++;
  }
  if (explicit.length >= 3) {
    return {
      type: 'processSteps',
      title: anchor.title,
      lead: plainText(anchor.body),
      items: explicit,
      consumedCount: j - anchorIdx,
    };
  }

  // (b) Implicit: 3+ card-like H2 siblings without explicit step numbers
  const implicit = [];
  let k = anchorIdx + 1;
  for (; k < raw.length; k++) {
    const sib = raw[k];
    const sh = shapeOf(sib);
    if (sh.h3 > 0) break;
    if (sh.textLen > 400) break;
    if (sib.title.endsWith('?')) break;
    if (FAQ_KEYWORDS.test(sib.title) || STEPS_KEYWORDS.test(sib.title)) break;
    implicit.push({
      number: String(implicit.length + 1).padStart(2, '0'),
      title: sib.title,
      body: plainText(sib.body).slice(0, 320),
      image: sh.imgs[0] || '',
    });
    if (implicit.length >= 12) { k++; break; }
  }
  if (implicit.length >= 3) {
    return {
      type: 'processSteps',
      title: anchor.title,
      lead: plainText(anchor.body),
      items: implicit,
      consumedCount: k - anchorIdx,
    };
  }
  return null;
}

// ── Pass 4b: structural gallery — 3+ consecutive card-like siblings  ──
function tryStructuralGallery(raw, startIdx) {
  const items = [];
  let j = startIdx;
  for (; j < raw.length; j++) {
    const s = raw[j];
    const sh = shapeOf(s);
    if (sh.h3 > 0) break;
    if (sh.textLen > 400) break;
    if (s.title.endsWith('?')) break;
    if (FAQ_KEYWORDS.test(s.title) || STEPS_KEYWORDS.test(s.title)) break;
    if (PARENT_KEYWORDS.test(s.title) && sh.textLen < 30) break;
    if (!sh.isImageCard) {
      // Allow at most one name-only between image cards (rare)
      if (sh.isNameOnly && items.length > 0) continue;
      break;
    }
    items.push({
      title: s.title,
      image: sh.imgs[0] || '',
      body: sh.text.slice(0, 320),
    });
    if (items.length >= 12) { j++; break; }
  }
  if (items.length >= 3) {
    return {
      type: 'gallery',
      title: '', // anonymous gallery, will fall back to no heading
      lead: '',
      items,
      consumedCount: j - startIdx,
    };
  }
  return null;
}

// ── Main entry ────────────────────────────────────────────────────
export function classifyWpPage(slug) {
  const p = wpPageBySlug(slug);
  if (!p) return null;
  let html = preclean(p.content || '');

  // Strip H1 — rendered separately in hero
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const h1 = h1Match ? decode(stripHtml(h1Match[1])) : '';
  let body = h1Match ? html.replace(h1Match[0], '') : html;

  // Intro = HTML before first H2
  const firstH2 = body.search(/<h2[^>]*>/);
  let intro = firstH2 >= 0 ? body.slice(0, firstH2) : body;
  body = firstH2 >= 0 ? body.slice(firstH2) : '';
  intro = intro.replace(/^[\s\n]*<p>[^<]{0,200}\|[^<]{0,200}<\/p>/, '');
  intro = intro.replace(/^[^<]+/, '');

  // Pass 2: split body into raw H2 sections
  const parts = body.split(/(<h2[^>]*>[\s\S]*?<\/h2>)/);
  const raw = [];
  let curTitle = null, curBody = '';
  for (const part of parts) {
    const m = part.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
    if (m) {
      if (curTitle !== null) raw.push({ title: curTitle, body: curBody });
      curTitle = decode(stripHtml(m[1]));
      curBody = '';
    } else {
      curBody += part;
    }
  }
  if (curTitle !== null) raw.push({ title: curTitle, body: curBody });

  // Pass 3: pair-merge alternating H2 patterns
  const merged = pairMerge(raw);

  // Pass 4: classify each section using a priority chain
  //   1. Process steps (parent + paired step entries)
  //   2. Gallery (parent + 3+ card siblings)
  //   3. Single-section classification (FAQ / featureGrid / imageText / prose)
  const sections = [];
  let i = 0;
  while (i < merged.length) {
    // 1. Process steps?
    const steps = tryProcessStepsAtAnchor(merged, i);
    if (steps) {
      sections.push(steps);
      i += steps.consumedCount;
      continue;
    }

    // 2. Gallery anchored here?
    const gal = tryGalleryFromAnchor(merged, i);
    if (gal) {
      sections.push(gal);
      i += gal.consumedCount;
      continue;
    }

    // 3. Single-section classification
    const cls = classifySingle(merged[i]);
    if (cls) sections.push(cls);
    i++;
  }

  return {
    h1,
    intro,
    sections,
    metaTitle: p.meta_title || '',
    metaDesc:  p.meta_desc || '',
  };
}
