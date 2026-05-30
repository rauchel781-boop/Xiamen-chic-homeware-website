const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./i18n/request.js');

// Auto-generated redirect list from the WP data + Search Console traffic data.
// Kept in a JSON file so it stays in sync if you re-export WP later.
//   - 71 blog post redirects:  /<post-slug> → /blog/<post-slug>
//   - 10 empty-page category stubs: /<cat-slug> → /products/<cat-slug>
//   - 5 long-slug aliases:     /complete-guide-… → /material-guide  etc.
const dataRedirects = require('./wp-data/extracted/all_redirects.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ── Cache-Control headers for the Cloudflare CDN in front ───────────
  // Cloudflare obeys origin Cache-Control headers, so we set explicit
  // long-lived caching on hashed/static assets and a short shared TTL
  // (s-maxage) on HTML so the edge can cache pages while browsers
  // still revalidate. The /api/ route stays uncached.
  async headers() {
    const oneYear  = 60 * 60 * 24 * 365;
    const thirtyDays = 60 * 60 * 24 * 30;
    return [
      {
        // Next.js build assets — content-hashed, safe to cache forever.
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: `public, max-age=${oneYear}, immutable` },
        ],
      },
      {
        // Optimized images returned by next/image.
        source: '/_next/image',
        headers: [
          { key: 'Cache-Control', value: `public, max-age=${thirtyDays}, s-maxage=${thirtyDays}, stale-while-revalidate=86400` },
        ],
      },
      {
        // Raw WP-imported images (~756 MB). Long edge TTL = huge bandwidth saving.
        source: '/wp-images/:path*',
        headers: [
          { key: 'Cache-Control', value: `public, max-age=${thirtyDays}, s-maxage=${thirtyDays}, immutable` },
        ],
      },
      {
        // Hero / brand / product images at the public/ root (PNG/JPG/WebP).
        source: '/:img(.*\\.(?:png|jpg|jpeg|webp|avif|svg|ico|woff2?))',
        headers: [
          { key: 'Cache-Control', value: `public, max-age=${thirtyDays}, s-maxage=${thirtyDays}` },
        ],
      },
      {
        // Sitemap + robots refresh every 24 hours at the edge.
        source: '/:f(sitemap.xml|robots.txt)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=300, s-maxage=86400' },
        ],
      },
      {
        // API routes — never cache. Form posts, etc.
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
        ],
      },
      {
        // Everything else (HTML pages). Short browser TTL, longer shared
        // s-maxage so Cloudflare edge can cache for a minute, then SWR
        // serves stale while revalidating in the background.
        source: '/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=60, stale-while-revalidate=86400' },
        ],
      },
    ];
  },

  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
    // Auto-convert to modern formats — saves 70-80% size vs PNG/JPG.
    // AVIF first, fallback WebP, then original (browser picks best supported).
    formats: ['image/avif', 'image/webp'],
    // Standard responsive breakpoints — keeps mobile downloads small.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache optimized variants for 30 days
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  // ── 301 Redirects — preserve every URL Google has indexed ──────────
  // Validated against Google Search Console export (May 2026).
  async redirects() {
    return [
      // ── Wildcard: WP singular permalink → new plural ───────────────
      // WP used /product/<slug>/ — our new structure uses /products/<slug>.
      // This single rule covers all 178 products + any future product whose
      // old URL Google has indexed.
      { source: '/product/:slug',          destination: '/products/:slug', permanent: true },
      { source: '/product/:slug/:rest*',   destination: '/products/:slug', permanent: true },

      // ── Industry Brief was briefly published at /blog/<slug> ───────
      // before being moved to its dedicated /briefs/<slug> route with a
      // newsletter-style template. 301 catches anything that may have
      // been indexed during that window.
      { source: '/blog/q4-wooden-gift-box-inquiry-timeline-2026',
        destination: '/briefs/q4-wooden-gift-box-inquiry-timeline-2026',
        permanent: true },
      { source: '/:locale(de|es|fr|ja)/blog/q4-wooden-gift-box-inquiry-timeline-2026',
        destination: '/:locale/briefs/q4-wooden-gift-box-inquiry-timeline-2026',
        permanent: true },

      // ── Per-slug redirects from the JSON data ──────────────────────
      // Blog posts (71) + empty-page category stubs (10) + alias pages (5).
      // Loaded at build time from wp-data/extracted/all_redirects.json.
      ...dataRedirects.map(({ source, destination, permanent }) => ({
        source,
        destination,
        permanent: permanent !== false,
      })),

      // ── Legacy long-slug redirects (URL was shortened on WP after publishing) ──
      {
        source: '/acacia-vs-bamboo-organizer-why-2026s-top-home-brands-are-pivoting-to-acacia-wood-a-data-driven-analysis',
        destination: '/blog/acacia-vs-bamboo-organizer',
        permanent: true,
      },

      // ── Cannibalization fix: orphan WP page → the real landing page ──
      // /wooden-sofa-tray was a legacy WP page competing with /wooden-sofa-tray-manufacturer
      // and /products/wooden-sofa-tray for the same keyword cluster. 301 to the
      // strongest (hand-coded SEO landing page). Also cover locale-prefixed variants.
      { source: '/wooden-sofa-tray',                            destination: '/wooden-sofa-tray-manufacturer',        permanent: true },
      { source: '/:locale(de|es|fr|ja)/wooden-sofa-tray',       destination: '/:locale/wooden-sofa-tray-manufacturer', permanent: true },

      // ── Wishlist orphan from WP/WooCommerce import → home ──
      // Chinese-slug page (心愿单 = "wishlist") leftover from the old WP store.
      // Has no business on the English B2B site; 301 to / to consolidate any link equity.
      // Belt-and-suspenders: cover both URL-encoded + decoded forms × all locales.
      // Browsers/proxies may or may not decode the path before Next.js sees it,
      // so we match both variants.
      { source: '/心愿单',                                          destination: '/',         permanent: true },
      { source: '/%E5%BF%83%E6%84%BF%E5%8D%95',                    destination: '/',         permanent: true },
      { source: '/%e5%bf%83%e6%84%bf%e5%8d%95',                    destination: '/',         permanent: true },
      { source: '/:locale(de|es|fr|ja)/心愿单',                    destination: '/:locale',  permanent: true },
      { source: '/:locale(de|es|fr|ja)/%E5%BF%83%E6%84%BF%E5%8D%95', destination: '/:locale', permanent: true },
      { source: '/:locale(de|es|fr|ja)/%e5%bf%83%e6%84%bf%e5%8d%95', destination: '/:locale', permanent: true },

      // ── Legacy WP / WooCommerce URL cleanup ────────────────────────
      // Common URLs Google may still have indexed from the old WordPress site
      // (about-us, contact-us, shop, sample-page, WooCommerce my-account/cart/
      // wishlist, etc.). All 301'd to the closest equivalent on the new site
      // so we don't lose link equity.
      //
      // NOTE: /custom-wooden-products-manufacturer is NOT redirected here — it
      // is a LIVE hand-coded SEO landing page (app/[locale]/custom-wooden-
      // products-manufacturer/page.js) and a priority-0.9 entry in the sitemap.
      // A previous version 301'd it to / by mistake (assuming it was a legacy
      // WP-only slug), which made the real page unreachable and tanked its
      // impressions. Leave it alone so the landing page serves normally.
      { source: '/about-us',                                   destination: '/about',            permanent: true },
      { source: '/about-us/:rest*',                            destination: '/about',            permanent: true },
      { source: '/contact-us',                                 destination: '/contact',          permanent: true },
      { source: '/contact-us/:rest*',                          destination: '/contact',          permanent: true },
      { source: '/shop',                                       destination: '/products',         permanent: true },
      { source: '/shop/:rest*',                                destination: '/products',         permanent: true },
      { source: '/sample-page',                                destination: '/',                 permanent: true },
      { source: '/home',                                       destination: '/',                 permanent: true },
      { source: '/index.html',                                 destination: '/',                 permanent: true },
      { source: '/index.php',                                  destination: '/',                 permanent: true },
      { source: '/blog-2',                                     destination: '/blog',             permanent: true },
      // WooCommerce shop scaffolding — no equivalent on a quote-only site,
      // 301 to the closest analogue so Google retires these.
      { source: '/my-account',                                 destination: '/contact',          permanent: true },
      { source: '/my-account/:rest*',                          destination: '/contact',          permanent: true },
      { source: '/cart',                                       destination: '/contact',          permanent: true },
      { source: '/cart/:rest*',                                destination: '/contact',          permanent: true },
      { source: '/checkout',                                   destination: '/contact',          permanent: true },
      { source: '/checkout/:rest*',                            destination: '/contact',          permanent: true },
      { source: '/wishlist',                                   destination: '/products',         permanent: true },
      { source: '/wishlist/:rest*',                            destination: '/products',         permanent: true },
      // WP default category permalink shape: /product-category/<slug>/ →
      // mirror this to our /products/<slug>/ category landing page.
      { source: '/product-category/:slug',                     destination: '/products/:slug',   permanent: true },
      { source: '/product-category/:slug/:rest*',              destination: '/products/:slug',   permanent: true },
      // WP feed URLs — every CMS export leaves these, Google sometimes
      // crawls them and gets noise. 301 to the closest live equivalent.
      { source: '/feed',                                       destination: '/blog',             permanent: true },
      { source: '/feed/:rest*',                                destination: '/blog',             permanent: true },
      { source: '/comments/feed',                              destination: '/blog',             permanent: true },

      // ── Locale clean-up redirects ──────────────────────────────────
      // /en → / (English is the no-prefix canonical, localePrefix: 'as-needed')
      // /zh, /it, /ko, /pt → / (legacy/unsupported locales from old WP experiment)
      // NOTE: /de, /es, /fr, /ja are LIVE locales — do NOT redirect them.
      { source: '/en',         destination: '/',         permanent: true },
      { source: '/en/:path*',  destination: '/:path*',   permanent: true },
      { source: '/zh',         destination: '/',         permanent: true },
      { source: '/zh/:path*',  destination: '/:path*',   permanent: true },
      { source: '/it/:path*',  destination: '/:path*',   permanent: true },
      { source: '/ko/:path*',  destination: '/:path*',   permanent: true },
      { source: '/pt/:path*',  destination: '/:path*',   permanent: true },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
