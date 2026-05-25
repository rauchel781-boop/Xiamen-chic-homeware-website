// ─────────────────────────────────────────────────────────────────────────
// Sitemap — multilingual (5 locales: en/es/de/fr/ja) B2B export site.
// Each URL is emitted ONCE (as the default-locale English version) with
// alternates pointing to all other locale variants. This is the format
// Google recommends for hreflang sitemaps.
//
// Refs:
//   - https://developers.google.com/search/docs/specialty/international/localized-versions#sitemap
//   - https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
//   - https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps
// ─────────────────────────────────────────────────────────────────────────

import { SITE } from '@/data/site-config';
import {
  wpProducts,
  wpPosts,
  wpProductCategories,
  wpPages,
} from '@/lib/wp-data';
import { routing } from '@/i18n/routing';

const TODAY = new Date();

function abs(imgPath) {
  if (!imgPath) return null;
  if (imgPath.startsWith('http')) return imgPath;
  return `${SITE.siteUrl}${imgPath}`;
}

// Build the per-locale URL for a path. EN has no prefix; others get /<locale>/.
function urlFor(locale, path) {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${SITE.siteUrl}${prefix}${path}`;
}

// Build hreflang alternates for a path — all locales + x-default.
function alternatesFor(path) {
  const languages = {};
  for (const loc of routing.locales) {
    languages[loc] = urlFor(loc, path);
  }
  languages['x-default'] = urlFor(routing.defaultLocale, path);
  return { languages };
}

export default function sitemap() {
  const entries = [];
  const push = (path, opts = {}) => {
    const entry = {
      // Canonical URL is the English (default-locale) one
      url: urlFor(routing.defaultLocale, path === '/' ? '' : path),
      lastModified: opts.lastModified || TODAY,
      changeFrequency: opts.changeFrequency || 'monthly',
      priority: opts.priority ?? 0.7,
      alternates: alternatesFor(path === '/' ? '' : path),
    };
    if (opts.images && opts.images.length > 0) entry.images = opts.images;
    entries.push(entry);
  };

  // ── Static pages ───────────────────────────────────────────────────
  push('/',                { priority: 1.0, changeFrequency: 'weekly'  });
  push('/products',        { priority: 0.9, changeFrequency: 'weekly'  });
  push('/material-guide',  { priority: 0.8, changeFrequency: 'monthly' });
  push('/about',           { priority: 0.7, changeFrequency: 'monthly' });
  push('/contact',         { priority: 0.6, changeFrequency: 'yearly'  });
  push('/blog',            { priority: 0.7, changeFrequency: 'weekly'  });

  // ── Hand-coded SEO landing pages (8 pages × 5 locales = 40 URLs) ───
  // These live under app/[locale]/<slug>/page.js — NOT in WP data, so
  // they don't get picked up by the wpPages() catch-all below.
  // High commercial intent — keyword-targeted manufacturer landing pages.
  const LANDING_PAGES = [
    'custom-wooden-spice-rack',
    'wooden-box-factory-in-china',
    'custom-wooden-boxes',
    'wholesale-wooden-spice-racks',
    'wholesale-wooden-serving-trays',
    'wooden-sofa-tray-manufacturer',
    'custom-wooden-storage-boxes-wholesale',
    'custom-wooden-products-manufacturer',
    'wooden-stash-box-manufacturer',
    'custom-wooden-gift-box-manufacturer',
  ];
  for (const slug of LANDING_PAGES) {
    push(`/${slug}`, { priority: 0.9, changeFrequency: 'monthly' });
  }

  // ── Product category pages (45 categories) ─────────────────────────
  const products = wpProducts();
  const cats = wpProductCategories().filter((c) => c.slug !== 'uncategorized');
  for (const cat of cats) {
    const catImages = products
      .filter((p) => p.featured_image && p.categories?.some((c) => c.slug === cat.slug))
      .slice(0, 4)
      .map((p) => ({ url: abs(p.featured_image) }))
      .filter((i) => i.url);
    push(`/products/${cat.slug}`, {
      priority: 0.8,
      changeFrequency: 'weekly',
      images: catImages,
    });
  }

  // ── Individual product pages (178) ─────────────────────────────────
  for (const p of products) {
    const imgs = [];
    if (p.featured_image) imgs.push({ url: abs(p.featured_image) });
    for (const g of p.gallery || []) if (g) imgs.push({ url: abs(g) });
    push(`/products/${p.slug}`, {
      lastModified: p.date ? new Date(p.date) : TODAY,
      priority: 0.7,
      changeFrequency: 'monthly',
      images: imgs.slice(0, 6),
    });
  }

  // ── Long-tail WP pages handled by the [slug] catch-all ─────────────
  // ALIAS_SLUGS = WP page slugs we DON'T want to emit via the catch-all,
  // either because they're aliases of real routes (home, contact, etc.)
  // OR because they're handled elsewhere in this sitemap with a higher
  // priority (the 8 hand-coded SEO landing pages above).
  const ALIAS_SLUGS = new Set([
    'home', 'products', 'cart', 'thank-you',
    'contact', 'about', 'material-guide', 'blog',
    'wooden-products-factory-in-china',
    'complete-guide-wood-materials-for-kitchenware',
    'blog-wooden-homeware-sourcing-blog',
    // ── Hand-coded SEO landing pages — emitted above at priority 0.9 ──
    // WP still has page records with these slugs (legacy from import),
    // but the real source of truth is app/[locale]/<slug>/page.js now.
    ...LANDING_PAGES,
    // ── Orphans 301-redirected in next.config.js ──
    // Keep them out of the sitemap so Google stops crawling the old URL.
    'wooden-sofa-tray',  // → /wooden-sofa-tray-manufacturer (keyword cannibalization fix)
    // Legacy WooCommerce wishlist page — WP stores it URL-encoded, not as raw Chinese
    '%e5%bf%83%e6%84%bf%e5%8d%95',  // /心愿单 → / (legacy wishlist)
    '心愿单',                         // belt-and-suspenders: catch the decoded form too
  ]);
  for (const wp of wpPages()) {
    if (ALIAS_SLUGS.has(wp.slug)) continue;
    if (!wp.content || wp.content.length < 50) continue;
    // Defensive: skip any slug with URL-encoded chars or non-ASCII (e.g. Chinese
    // wishlist page 心愿单 stored as %e5%bf%83...). These are legacy WP artifacts
    // not useful for international SEO.
    if (/%[0-9a-fA-F]{2}/.test(wp.slug)) continue;
    if (!/^[a-z0-9-]+$/i.test(wp.slug))   continue;
    push(`/${wp.slug}`, {
      lastModified: wp.date ? new Date(wp.date) : TODAY,
      priority: 0.5,
      changeFrequency: 'monthly',
    });
  }

  // ── Blog posts ─────────────────────────────────────────────────────
  for (const post of wpPosts()) {
    const imgs = post.featured_image ? [{ url: abs(post.featured_image) }] : [];
    push(`/blog/${post.slug}`, {
      lastModified: post.date ? new Date(post.date) : TODAY,
      priority: 0.6,
      changeFrequency: 'monthly',
      images: imgs,
    });
  }

  return entries;
}
