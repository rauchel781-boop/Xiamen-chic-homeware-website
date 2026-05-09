import { defineRouting } from 'next-intl/routing';

// English-only export site. Decision: serving B2B export buyers globally,
// 95% of whom communicate in English — auto-translated content gets
// penalized by Google, so we keep a single high-quality English version.
//
// To add a real (human-translated) language later:
//   1. Add the code to `locales` below
//   2. Add a matching `messages/<code>.json`
//   3. Switch localePrefix to 'as-needed' so /en/ stays clean and /de/ etc.
//      get a prefix.
export const routing = defineRouting({
  locales: ['en'],
  defaultLocale: 'en',
  // 'never' → URLs have no /en/ prefix at all. /products/foo, not /en/products/foo.
  localePrefix: 'never',
});

export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;

export const localeNames = {
  en: 'English',
};
