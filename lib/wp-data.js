// WP data layer — reads JSON exports in /wp-data and exposes typed accessors.
// All content originally came from xmchichomeware.com (WordPress export).
// Files in /wp-data: pages.json, posts.json, products.json,
//   product_categories.json, post_categories.json, menus.json, media_index.json, site.json

import fs from 'fs';
import path from 'path';

const root = process.cwd();
const dir = path.join(root, 'wp-data');

const cache = {};
function read(name) {
  if (cache[name]) return cache[name];
  const file = path.join(dir, name);
  if (!fs.existsSync(file)) return (cache[name] = []);
  cache[name] = JSON.parse(fs.readFileSync(file, 'utf8'));
  return cache[name];
}

export const wpSite     = () => read('site.json');
export const wpPages    = () => read('pages.json');
export const wpPosts    = () => read('posts.json');
export const wpProducts = () => read('products.json');
export const wpProductCategories = () => read('product_categories.json');
export const wpPostCategories    = () => read('post_categories.json');
export const wpMenus    = () => read('menus.json');

export function wpProductBySlug(slug)    { return wpProducts().find(p => p.slug === slug); }
export function wpPostBySlug(slug)       { return wpPosts().find(p => p.slug === slug); }
export function wpPageBySlug(slug)       { return wpPages().find(p => p.slug === slug); }
export function wpCategoryBySlug(slug)   { return wpProductCategories().find(c => c.slug === slug); }

export function wpProductsByCategory(slug) {
  return wpProducts().filter(p => p.categories?.some(c => c.slug === slug));
}

export function wpProductCategoryTree() {
  const cats = wpProductCategories().filter(c => c.slug !== 'uncategorized');
  const byId = Object.fromEntries(cats.map(c => [c.id, { ...c, children: [] }]));
  const roots = [];
  for (const c of Object.values(byId)) {
    const pid = parseInt(c.parent || '0', 10);
    if (pid && byId[pid]) byId[pid].children.push(c);
    else roots.push(c);
  }
  return roots;
}

// Strip WP HTML for plain previews
export function stripHtml(s) {
  return (s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

// Clean WP page HTML so it can be safely rendered with Tailwind prose styling.
// Removes Elementor inline SVG icons, class/style/id/data-* attributes,
// rewrites legacy xmchichomeware.com image URLs to local /wp-images/ paths,
// strips empty paragraphs, and decodes a few common entities.
// Returns { h1, body } where h1 is the first H1's text (used as the page hero
// title) and body is the cleaned HTML with that first H1 removed (so we don't
// double-render the title).
export function wpCleanPageHtml(html) {
  if (!html) return { h1: '', body: '' };
  let h = html;

  // 1. Drop Elementor decorative inline SVG icons
  h = h.replace(/<svg[\s\S]*?<\/svg>/g, '');

  // 2. Strip class / style / id / data-* attributes from any tag
  h = h.replace(/\s+(class|style|id|data-[\w-]+)="[^"]*"/g, '');
  h = h.replace(/\s+(class|style|id|data-[\w-]+)='[^']*'/g, '');

  // 3. Rewrite remote xmchichomeware image URLs to local /wp-images/ path so
  //    images stay self-hosted on the new site.
  h = h.replace(/https?:\/\/(?:www\.)?xmchichomeware\.com\/wp-content\/uploads\//g, '/wp-images/');

  // 4. Drop empty <p>, &nbsp;-only paragraphs, and tag-only paragraphs
  h = h.replace(/<p>\s*(?:&nbsp;)?\s*<\/p>/g, '');

  // 5. Pull out the FIRST <h1> (we render this as a styled hero in the
  //    template, then strip it from body so the page doesn't show two H1s)
  let h1 = '';
  const h1Match = h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (h1Match) {
    h1 = stripHtml(h1Match[1]).replace(/&amp;/g, '&').trim();
    h = h.replace(h1Match[0], '');
  }

  // 6. Rewrite Elementor "<a role=button>...</a>" CTAs (no href) to point to
  //    /contact so old "Get a Quote" buttons keep working on the new site.
  h = h.replace(
    /<a\s+role="button"[^>]*>([\s\S]*?)<\/a>/g,
    '<a href="/contact" class="wp-cta-btn">$1</a>'
  );
  // Also handle bare <a> with no href and no role
  h = h.replace(
    /<a>([\s\S]*?)<\/a>/g,
    '<a href="/contact" class="wp-cta-btn">$1</a>'
  );

  // 7. Strip orphan plain-text blobs and excess whitespace
  h = h.replace(/[\t\r]+/g, ' ');
  h = h.replace(/\n\s*\n/g, '\n');
  // Drop any leading text that lives outside the first tag (Elementor often
  // leaves a duplicate of the headline as plain text after the H1 strip)
  h = h.replace(/^[^<]+/, '');

  // 8. Rewrite any remaining absolute xmchichomeware.com links to local paths
  h = h.replace(/https?:\/\/(?:www\.)?xmchichomeware\.com\/product\//g, '/products/');
  h = h.replace(/https?:\/\/(?:www\.)?xmchichomeware\.com\//g, '/');

  // 9. Collapse runs of whitespace between tags
  h = h.replace(/>\s+</g, '><');

  // 10. Drop the leading "tagline" paragraph if it's a short pipe-separated
  //     subtitle ("Factory Direct | OEM & Private Label | US & EU Market") —
  //     this is exactly the lead we already show in the hero, so keeping it
  //     here just creates visual noise.
  h = h.replace(/^<p>[^<]{0,200}\|[^<]{0,200}<\/p>/, '');

  // 11. Strip "decorative" H3 trust-badge titles — Elementor used H3 for icon
  //     cards arranged in 3-column rows. After we removed the SVG icons, we're
  //     left with bare H3s containing nothing but a phrase, often back-to-back
  //     with no <p>/<ul> body. Detect and drop those: an H3 is decorative if
  //     immediately followed by another H3, an H2, an image, or a button.
  h = h.replace(
    /<h3[^>]*>[\s\S]*?<\/h3>(?=\s*(?:<h[23]|<img|<a[^>]*class="wp-cta-btn"))/g,
    ''
  );

  // 12. Strip headings that contain only an image / SVG / nothing
  h = h.replace(/<h[1-6][^>]*>\s*<\/h[1-6]>/g, '');

  // 13. Group consecutive CTA buttons into a flex row container so they sit
  //     side-by-side on desktop and stack neatly on mobile.
  h = h.replace(
    /(?:<a[^>]*class="wp-cta-btn"[^>]*>[\s\S]*?<\/a>\s*){2,}/g,
    (match) => `<div class="wp-cta-row">${match.trim()}</div>`
  );

  // 14. Strip width/height/sizes/srcset attributes from <img> — they reference
  //     legacy WP-resized variants we no longer have, so the browser falls
  //     back to broken sources. Keep only src + alt and let CSS size them.
  h = h.replace(/<img([^>]*?)>/g, (m, attrs) => {
    const src = (attrs.match(/src="([^"]+)"/) || [])[1] || '';
    const alt = (attrs.match(/alt="([^"]*)"/) || [])[1] || '';
    if (!src) return '';
    return `<img src="${src}" alt="${alt}" loading="lazy" />`;
  });

  return { h1, body: h };
}

// Detect an FAQ section in WP page HTML and return [{ q, a }] for FAQPage
// JSON-LD. Heuristic: H3 ending with "?" followed by content until the next H2/H3.
export function wpExtractFaqs(html) {
  if (!html) return [];
  const re = /<h3[^>]*>([\s\S]*?\?)<\/h3>([\s\S]*?)(?=<h[123]|$)/g;
  const faqs = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    const q = stripHtml(m[1]).replace(/&amp;/g, '&').trim();
    const a = stripHtml(m[2]).replace(/\s+/g, ' ').trim();
    if (q && a) faqs.push({ q, a });
  }
  return faqs;
}

// Look up media by URL substring fragment (used to find primary image)
export function wpResolveImage(urlOrFragment) {
  if (!urlOrFragment) return '';
  if (urlOrFragment.startsWith('http')) return urlOrFragment;
  const media = read('media_index.json');
  const m = media.find(x => x.url?.includes(urlOrFragment));
  return m?.url || '';
}

// Parse a WP page's HTML content into sections keyed by H2 title.
// Returns: { [titleSlug]: { title, html, text, images: [url] } }
export function wpParseSections(slug) {
  const page = wpPageBySlug(slug);
  if (!page) return {};
  const html = page.content || '';
  const parts = html.split(/(<h2[^>]*>[\s\S]*?<\/h2>)/);
  const out = {};
  let curTitle = null, curBuf = '';
  for (const p of parts) {
    const h2 = p.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
    if (h2) {
      if (curTitle != null) finalize();
      curTitle = stripHtml(h2[1]).replace(/&amp;/g,'&').replace(/&#8211;/g,'–');
      curBuf = '';
    } else {
      curBuf += p;
    }
  }
  if (curTitle != null) finalize();
  function finalize() {
    const key = curTitle.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
    const imgs = [...curBuf.matchAll(/<img[^>]+src="([^"]+)"/g)].map(m => m[1]);
    out[key] = {
      title: curTitle,
      html: curBuf,
      text: stripHtml(curBuf).replace(/\s+/g,' ').trim(),
      images: [...new Set(imgs)],
    };
  }
  return out;
}

// Extract H3 sub-blocks within a section (icon/title/body cards on WP)
export function wpExtractH3Blocks(sectionHtml) {
  if (!sectionHtml) return [];
  const re = /<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3|$)/g;
  const blocks = [];
  let m;
  while ((m = re.exec(sectionHtml)) !== null) {
    blocks.push({
      title: stripHtml(m[1]).replace(/&amp;/g,'&'),
      html:  m[2],
      text:  stripHtml(m[2]).replace(/\s+/g,' ').trim(),
    });
  }
  return blocks;
}
