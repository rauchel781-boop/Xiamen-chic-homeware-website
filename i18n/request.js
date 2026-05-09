import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

// next-intl wires this into every server component automatically.
export default getRequestConfig(async ({ locale }) => {
  if (!routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }
  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
