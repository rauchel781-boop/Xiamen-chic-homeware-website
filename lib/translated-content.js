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

// Merge a product with its translation (when available).
// Always returns a product object — falls back to English fields if untranslated.
export function localizeProduct(product, locale) {
  if (!product) return product;
  const tr = translatedProduct(product.slug, locale);
  if (!tr) return product;
  return {
    ...product,
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
  };
}
