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
      // strongest (hand-coded SEO landing page).
      { source: '/wooden-sofa-tray', destination: '/wooden-sofa-tray-manufacturer', permanent: true },

      // ── Wishlist orphan from WP/WooCommerce import → home ──
      // Chinese-slug page (心愿单 = "wishlist") leftover from the old WP store.
      // Has no business on the English B2B site; 301 to / to consolidate any link equity.
      { source: '/心愿单', destination: '/', permanent: true },

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
