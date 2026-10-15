import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

// next-intl wires this into every server component automatically.
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
