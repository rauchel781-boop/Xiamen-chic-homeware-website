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
        tokens.add('nofollow');
        const newRel = Array.from(tokens).join(' ');
        // Rebuild before/after with updated rel — replace whichever side it's on
        if (/\srel\s*=/.test(before)) {
          newBefore = before.replace(/\srel\s*=\s*(["'])[^"']*\1/i, ` rel="${newRel}"`);
        } else {
          newAfter = newAfter.replace(/\srel\s*=\s*(["'])[^"']*\1/i, ` rel="${newRel}"`);
        }
      } else {
        newAfter += ' rel="noopener nofollow"';
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

// Combined pass: build TOC + process links in one go. Returns:
//   { html, toc, externalCount }
export function enhanceArticle(html) {
  const tocResult = buildToc(html);
  const linkResult = processLinks(tocResult.html);
  return {
    html: linkResult.html,
    toc: tocResult.toc,
    externalCount: linkResult.externalCount,
  };
}
