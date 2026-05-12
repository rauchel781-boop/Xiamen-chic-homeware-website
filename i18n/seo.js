import { routing } from './routing';

// Schema.org BCP-47 language tags. Used in inLanguage fields on JSON-LD
// (WebSite / BlogPosting / Product / Service) so search engines get a
// localized language signal matching the hreflang map — not a hard-coded en-US.
export const SCHEMA_INLANGUAGE = {
  en: 'en-US',
  es: 'es-ES',
  de: 'de-DE',
  fr: 'fr-FR',
  ja: 'ja-JP',
};

// Helper to safely resolve inLanguage from a locale param (defaults to en-US).
export function schemaLang(locale) {
  return SCHEMA_INLANGUAGE[locale] || 'en-US';
}

// Build the canonical + alternates.languages object for any page path.
// Pass the path WITHOUT locale prefix (e.g. '/about', '/products/walnut').
// Returns a metadata.alternates value that next-intl + Next.js renders as
// <link rel="canonical"> and one <link rel="alternate" hreflang="..."> per locale.
export function alternates(locale, path = '') {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const stripTrailing = clean === '/' ? '' : clean;
  const languages = {};
  for (const loc of routing.locales) {
    languages[loc] = `/${loc}${stripTrailing}`;
  }
  languages['x-default'] = `/${routing.defaultLocale}${stripTrailing}`;
  return {
    canonical: `/${locale}${stripTrailing}`,
    languages,
  };
}
