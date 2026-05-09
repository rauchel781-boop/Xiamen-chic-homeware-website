import { routing } from './routing';

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
