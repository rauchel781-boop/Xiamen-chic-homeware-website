import { defineRouting } from 'next-intl/routing';

// Multilingual B2B export site. Decision: English is the canonical language
// (no /en/ prefix), and we add 4 high-priority B2B export markets:
//   - Spanish (LATAM + Spain)
//   - German (DACH region, large EU buyer base)
//   - French (FR + BE + CA + parts of Africa)
//   - Japanese (premium gift/packaging market)
//
// localePrefix 'as-needed' keeps /products/foo (English) clean, while
// /es/products/foo, /de/products/foo, etc. get a prefix.
export const routing = defineRouting({
  locales: ['en', 'es', 'de', 'fr', 'ja'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;

// Display names shown in the language switcher dropdown.
export const localeNames = {
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
  fr: 'Français',
  ja: '日本語',
};

// hreflang values for SEO (slightly different from locale codes).
// 'x-default' points to English (the canonical version for non-targeted users).
export const localeHreflang = {
  en: 'en',
  es: 'es',
  de: 'de',
  fr: 'fr',
  ja: 'ja',
};

// Build absolute hreflang URLs for any path. Pass an absolute siteUrl.
// With localePrefix:'as-needed', English gets NO prefix; others get /<locale>.
export function hreflangFor(siteUrl, path = '') {
  const langs = {};
  for (const loc of routing.locales) {
    const prefix = loc === routing.defaultLocale ? '' : `/${loc}`;
    langs[loc] = `${siteUrl}${prefix}${path}`;
  }
  langs['x-default'] = `${siteUrl}${path}`;
  return langs;
}

// Build the SELF canonical path for a given locale + page path.
// Each locale variant must self-canonical (e.g., /de/about → canonical /de/about)
// or Google will treat translated versions as duplicates of the English source
// and drop them from the index. Pair this with hreflangFor() for the alternates.
//
// Examples (path = '/about'):
//   canonicalFor('en', '/about')  →  '/about'
//   canonicalFor('de', '/about')  →  '/de/about'
//   canonicalFor('ja', '/about')  →  '/ja/about'
export function canonicalFor(locale, path = '') {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${prefix}${path}`;
}
