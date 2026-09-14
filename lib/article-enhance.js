// Server-side HTML preprocessor for blog / long-form articles.
//
// Three jobs:
//   1. Extract H2/H3 headings, slugify them, inject id attributes so the
//      TOC can deep-link.
//   2. Find every external link, add target="_blank" + rel="noopener nofollow",
//      and count them so we can warn when an article exceeds the SEO budget
//      (we cap at 10 external links per article).
//   3. Wrap Mermaid code blocks so the client-side loader can find them.
//
// Used by app/[locale]/blog/[slug]/page.js. Designed for the WordPress-block
// HTML format we get from wp-data/posts.json.

import { SITE } from '@/data/site-config';

// External-link budget per article. Beyond this the article risks diluting
// its own page-rank — Google's algorithms treat link-heavy pages with
// suspicion. We log a warning at build time so the author knows.
export const MAX_EXTERNAL_LINKS = 10;

// Sister properties operated by the same company. Links to these are still
// external (target="_blank", rel="noopener") but must NOT be nofollowed —
// nofollow on your own second site throws away the link equity you meant to
// pass to it. Everything else external stays nofollow.
export const SISTER_DOMAINS = [
  'custom-woodenbox.com',
  'www.custom-woodenbox.com',
];

function isSisterUrl(href) {
  try {
    const url = new URL(href, SITE.siteUrl);
    return SISTER_DOMAINS.includes(url.host);
  } catch {
    return false;
  }
}

// Quick slugify — lowercase, strip HTML tags, replace whitespace and
// punctuation with hyphens, trim leading/trailing hyphens. Stable enough
// for in-page anchors; collisions are rare in practice for a single article.
function slugify(text) {
  return String(text || '')
    .replace(/<[^>]+>/g, ' ')          // strip any inline tags
    .replace(/&[a-z]+;/g, ' ')         // strip HTML entities
    .replace(/&#\d+;/g, ' ')
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

// Build the TOC: array of { id, text, level } for every h2 and h3 in the
// article HTML. Also returns the rewritten HTML with id attributes injected
// on those headings so #anchor links work.
export function buildToc(html) {
  if (!html) return { html: '', toc: [] };

  const toc = [];
  const used = new Set();

  // Match <h2>...</h2> and <h3>...</h3> blocks. Attributes on the opening
  // tag are preserved; we only inject an id="" attribute if one isn't there.
  const newHtml = html.replace(
    /<(h[23])(\s[^>]*)?>(.*?)<\/\1>/gis,
    (match, tag, attrs, inner) => {
      const text = inner.replace(/<[^>]+>/g, '').trim();
      if (!text) return match;
      let id = slugify(text);
      // Avoid collisions (two headings with the same text)
      if (!id) return match;
      let dedupe = id, n = 1;
      while (used.has(dedupe)) dedupe = `${id}-${++n}`;
      id = dedupe;
      used.add(id);

      toc.push({
        id,
        text,
        level: tag === 'h2' ? 2 : 3,
      });

      // If the heading already has an id attribute, leave it; otherwise add one.
      const existingAttrs = attrs || '';
      if (/\sid\s*=/.test(existingAttrs)) return match;
      return `<${tag}${existingAttrs} id="${id}">${inner}</${tag}>`;
    }
  );

  return { html: newHtml, toc };
}

// Determine if a URL is external to our site. We treat protocol-relative
// (//foo.com) as external too, since they hit a different origin in practice.
function isExternalUrl(href) {
  if (!href) return false;
  if (href.startsWith('#')) return false;
  if (href.startsWith('/') && !href.startsWith('//')) return false;
  if (href.startsWith('mailto:') || href.startsWith('tel:')) return false;
  try {
    const url = new URL(href, SITE.siteUrl);
    return url.host && url.host !== new URL(SITE.siteUrl).host;
  } catch {
    return false;
  }
}

// Process every <a href="..."> in the HTML:
//   - external link → add target="_blank" rel="noopener nofollow" if missing
//   - internal link → leave alone
//
// Also counts external links and returns the count alongside the rewritten
// HTML. The blog page logs a console.warn() during build if count exceeds
// MAX_EXTERNAL_LINKS so we catch it in the build log.
export function processLinks(html) {
  if (!html) return { html: '', externalCount: 0 };
  let externalCount = 0;

  const newHtml = html.replace(
    /<a\b([^>]*?)\shref\s*=\s*(["'])([^"']*)\2([^>]*)>/gi,
    (match, before, quote, href, after) => {
      if (!isExternalUrl(href)) return match;
      externalCount++;

      // If the tag already has target= attribute, leave its value alone.
      // Otherwise add target="_blank".
      const hasTarget = /\starget\s*=/.test(before + after);
      // Similarly for rel — but if rel exists, make sure it contains both
      // noopener and nofollow; if not, append.
      const relMatch = /\srel\s*=\s*(["'])([^"']*)\1/i.exec(before + after);
      let newAfter = after;
      let newBefore = before;

      if (!hasTarget) newAfter += ' target="_blank"';

      if (relMatch) {
        const tokens = new Set(relMatch[2].split(/\s+/).filter(Boolean));
        tokens.add('noopener');
        if (!isSisterUrl(href)) tokens.add('nofollow');
        const newRel = Array.from(tokens).join(' ');
        // Rebuild before/after with updated rel — replace whichever side it's on
        if (/\srel\s*=/.test(before)) {
          newBefore = before.replace(/\srel\s*=\s*(["'])[^"']*\1/i, ` rel="${newRel}"`);
        } else {
          newAfter = newAfter.replace(/\srel\s*=\s*(["'])[^"']*\1/i, ` rel="${newRel}"`);
        }
      } else {
        newAfter += isSisterUrl(href)
          ? ' rel="noopener"'
          : ' rel="noopener nofollow"';
      }

      return `<a${newBefore} href=${quote}${href}${quote}${newAfter}>`;
    }
  );

  if (externalCount > MAX_EXTERNAL_LINKS) {
    // Build-time warning so the author can tighten up the article.
    // eslint-disable-next-line no-console
    console.warn(
      `[article-enhance] external links (${externalCount}) exceed budget of ${MAX_EXTERNAL_LINKS}. ` +
      `Consider consolidating outbound references — too many external links dilute PageRank.`
    );
  }

  return { html: newHtml, externalCount };
}

// Rewrite content <img src="/wp-images/..."> so the raw 1-3 MB PNGs/JPGs are
// served through Next's image optimizer (AVIF/WebP + responsive widths) and
// lazy-loaded. Featured/hero images already use next/image; this fixes the
// images embedded inside article/brief HTML bodies, which were served raw.
// Widths must be valid next.config deviceSizes (640 / 1080 / 1200).
const CONTENT_IMG_WIDTHS = [640, 1080, 1200];
export function optimizeContentImages(html) {
  if (!html) return '';
  return html.replace(
    /<img\b([^>]*?)\ssrc=(["'])(\/wp-images\/[^"']+)\2([^>]*)>/gi,
    (match, before, _q, src, after) => {
      if (src.includes('/_next/image')) return match; // already optimized
      const enc = encodeURIComponent(src);
      const u = (w) => `/_next/image?url=${enc}&amp;w=${w}&amp;q=72`;
      const srcset = CONTENT_IMG_WIDTHS.map((w) => `${u(w)} ${w}w`).join(', ');
      const attrs = before + after;
      const lazy  = /\sloading\s*=/i.test(attrs)  ? '' : ' loading="lazy"';
      const dec   = /\sdecoding\s*=/i.test(attrs) ? '' : ' decoding="async"';
      const sizes = /\ssizes\s*=/i.test(attrs)    ? '' : ' sizes="(max-width: 768px) 100vw, 768px"';
      return `<img${before} src="${u(1200)}" srcset="${srcset}"${sizes}${lazy}${dec}${after}>`;
    }
  );
}

// ── Inline quote CTA ──────────────────────────────────────────────────
// The best-ranking articles are very long (the paulownia/pine/acacia piece
// renders ~42,000 px tall) and the first in-body conversion link sat at 83%
// of the page. A reader convinced by the FOB price table at 40% had nowhere
// to click. This injects one contextual CTA at the point of peak buying
// intent: immediately after the first spec/price table.
//
// Styling is INLINE on purpose. tailwind.config.js only scans ./app and
// ./components, so any Tailwind class written in lib/ is purged from the
// built CSS and would render unstyled.
//
// Injected AFTER processLinks() so the WhatsApp link does not count against
// the article's 10-external-link SEO budget — it is our own contact channel,
// not an outbound reference.
const CTA_MIN_HTML_LENGTH = 6000;   // skip short posts
const CTA_MIN_POSITION    = 0.15;   // don't land above 15% of the body
const CTA_MAX_POSITION    = 0.68;   // or below 68% — the footer CTA covers the tail

function ctaMarkup({ heading, body, quoteLabel, chatLabel, chatUrl }) {
  const chat = chatUrl
    ? `<a href="${chatUrl}" target="_blank" rel="noopener" style="display:inline-block;border:1px solid #2C5E3F;color:#2C5E3F;text-decoration:none;font-weight:700;font-size:14px;padding:.6rem 1.35rem;border-radius:999px">${chatLabel}</a>`
    : '';
  return `
<aside class="inline-quote-cta" style="margin:2.5rem 0;padding:1.4rem 1.5rem;background:#F5F7F8;border:1px solid #E5E7EB;border-left:4px solid #2C5E3F;border-radius:14px">
<p style="margin:0 0 .4rem;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#2C5E3F">${heading}</p>
<p style="margin:0 0 1.1rem;font-size:15px;line-height:1.65;color:#1A1A1A">${body}</p>
<div style="display:flex;flex-wrap:wrap;gap:.6rem">
<a href="/contact#form" style="display:inline-block;background:#2C5E3F;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:.6rem 1.35rem;border-radius:999px">${quoteLabel}</a>
${chat}
</div>
</aside>
`.trim();
}

// Pick where the CTA goes. Preference order:
//   1. straight after the first spec/price table — peak buying intent
//   2. otherwise just before the third H2
// Returns -1 when no position falls inside the allowed band.
function findCtaOffset(html) {
  const len = html.length;
  const lo = len * CTA_MIN_POSITION;
  const hi = len * CTA_MAX_POSITION;
  const inBand = (i) => i > lo && i < hi;

  const table = html.search(/<figure[^>]*class="[^"]*wp-block-table[\s\S]*?<\/figure>/i);
  if (table !== -1) {
    const end = html.indexOf('</figure>', table);
    if (end !== -1) {
      // step past the closing tag and any wp block comment that follows
      let after = end + '</figure>'.length;
      const trailing = /^\s*<!-- \/wp:table -->/.exec(html.slice(after));
      if (trailing) after += trailing[0].length;
      if (inBand(after)) return after;
    }
  }

  // Fall back to a heading boundary: the first H2 that lands inside the
  // band, preferring later ones so the CTA follows some real content.
  const h2 = [...html.matchAll(/<h2\b/gi)].map((m) => m.index).filter(inBand);
  if (h2.length) {
    const pick = h2[Math.min(1, h2.length - 1)];
    // Back up past the WordPress block comment that introduces the heading,
    // so the CTA sits between blocks rather than inside the heading block.
    const lead = /<!-- wp:heading[^>]*-->\s*$/i.exec(html.slice(Math.max(0, pick - 80), pick));
    return lead ? pick - lead[0].length : pick;
  }
  return -1;
}

export function injectInlineCta(html, opts = {}) {
  if (!html || html.length < CTA_MIN_HTML_LENGTH) return { html: html || '', injected: false };
  if (html.includes('inline-quote-cta')) return { html, injected: false };

  const at = findCtaOffset(html);
  if (at === -1) return { html, injected: false };

  const block = ctaMarkup({
    heading:    opts.heading    || 'Costing this for your own spec?',
    body:       opts.body       || 'Send us the size, wood and quantity you need. You get a technical drawing, a real FOB band per size and the MOQ &mdash; usually within one working day.',
    quoteLabel: opts.quoteLabel || 'Request a quote \u2192',
    chatLabel:  opts.chatLabel  || 'WhatsApp',
    chatUrl:    opts.chatUrl !== undefined ? opts.chatUrl : (SITE.whatsapp && SITE.whatsapp.chatUrl) || '',
  });

  return { html: html.slice(0, at) + '\n' + block + '\n' + html.slice(at), injected: true };
}

// Combined pass: build TOC + process links + optimize images in one go.
// Returns: { html, toc, externalCount }
export function enhanceArticle(html, opts = {}) {
  const tocResult = buildToc(html);
  const linkResult = processLinks(tocResult.html);
  const withImages = optimizeContentImages(linkResult.html);
  // CTA goes last: after buildToc so it never appears in the table of
  // contents, and after processLinks so its WhatsApp link is not counted
  // against the external-link budget.
  const cta = opts.cta === false
    ? { html: withImages, injected: false }
    : injectInlineCta(withImages, opts.cta || {});
  return {
    html: cta.html,
    toc: tocResult.toc,
    externalCount: linkResult.externalCount,
    ctaInjected: cta.injected,
  };
}
