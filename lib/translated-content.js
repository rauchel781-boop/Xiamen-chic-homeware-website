// Runtime loader for translated product / blog content.
//
// At build time `scripts/translate.mjs` writes:
//   messages/products.<locale>.json  → { [slug]: { title, overview } }
//   messages/blogs.<locale>.json     → { [slug]: { title, excerpt, content } }
//
// This module lazy-loads those files and exposes simple lookups.
// English (the source language) falls through to the original WP data.

import fs from 'fs';
import path from 'path';

const cache = {};

function loadJson(filename) {
  if (filename in cache) return cache[filename];
  const file = path.join(process.cwd(), 'messages', filename);
  try {
    cache[filename] = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    cache[filename] = null; // not generated yet — fall back to English
  }
  return cache[filename];
}

// Look up the translated title + overview for a product.
// Returns { title, overview } or null if no translation exists.
export function translatedProduct(slug, locale) {
  if (!locale || locale === 'en') return null;
  const data = loadJson(`products.${locale}.json`);
  if (!data || !data[slug]) return null;
  return data[slug];
}

// Look up the translated title + excerpt + content for a blog post.
// Returns { title, excerpt, content } or null if no translation exists.
export function translatedPost(slug, locale) {
  if (!locale || locale === 'en') return null;
  const data = loadJson(`blogs.${locale}.json`);
  if (!data || !data[slug]) return null;
  return data[slug];
}

// Look up the translated name + description + meta_title for a product
// category. Categories were the one content type the translation pipeline
// never covered: every localized category page rendered an English <h1> and
// an English description inside otherwise translated chrome, which is why
// Google filed 860 localized URLs under "crawled - currently not indexed".
// Returns { name, description, meta_title } or null.
export function translatedCategory(slug, locale) {
  if (!locale || locale === 'en') return null;
  const data = loadJson(`categories.${locale}.json`);
  if (!data || !data[slug]) return null;
  return data[slug];
}

// Merge a category with its translation. Always returns a category object —
// falls back to the English fields when a translation is missing, so a new
// category added before the next translation pass still renders.
export function localizeCategory(cat, locale) {
  if (!cat) return cat;
  const tr = translatedCategory(cat.slug, locale);
  if (!tr) return cat;
  return {
    ...cat,
    name: tr.name || cat.name,
    description: tr.description || cat.description,
    meta_title: tr.meta_title || cat.meta_title,
  };
}

// Merge a product with its translation (when available).
// Always returns a product object — falls back to English fields if untranslated.
export function localizeProduct(product, locale) {
  if (!product) return product;
  const tr = translatedProduct(product.slug, locale);
  // The embedded category array drives the product card label, the
  // breadcrumb and the Product schema's category field, so it needs
  // localizing even when the product itself has no translation yet.
  const categories = (product.categories || []).map((c) => {
    const ct = translatedCategory(c.slug, locale);
    return ct ? { ...c, name: ct.name || c.name } : c;
  });
  if (!tr) return categories.length ? { ...product, categories } : product;
  return {
    ...product,
    categories,
    title: tr.title || product.title,
    _localizedOverview: tr.overview, // exposed for SEO content generator
  };
}

// Merge a blog post with its translation (when available).
export function localizePost(post, locale) {
  if (!post) return post;
  const tr = translatedPost(post.slug, locale);
  if (!tr) return post;
  return {
    ...post,
    title: tr.title || post.title,
    excerpt: tr.excerpt || post.excerpt,
    content: tr.content || post.content,
    // Localized hand-written meta + FAQ (when the translation pipeline has
    // produced them). Fall back to the English source if not yet translated.
    meta_title: tr.meta_title || post.meta_title,
    meta_desc: tr.meta_desc || post.meta_desc,
    faq: (Array.isArray(tr.faq) && tr.faq.length) ? tr.faq : post.faq,
    // Industry Brief structured fields. Independently localizable — anything
    // not translated yet falls back to the English source so we never render
    // a half-translated brief.
    tldr:           (Array.isArray(tr.tldr) && tr.tldr.length) ? tr.tldr : post.tldr,
    bigNumber:      tr.bigNumber      || post.bigNumber,
    outsideSignal:  tr.outsideSignal  || post.outsideSignal,
    fromTheFloor:   tr.fromTheFloor   || post.fromTheFloor,
    actionItems:    (Array.isArray(tr.actionItems) && tr.actionItems.length) ? tr.actionItems : post.actionItems,
    nextWeek:       tr.nextWeek       || post.nextWeek,
    weekOf:         tr.weekOf         || post.weekOf,
  };
}
