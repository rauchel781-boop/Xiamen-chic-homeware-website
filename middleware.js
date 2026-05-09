import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match every path EXCEPT api, _next, sitemap.xml, robots.txt, and any
  // path with a file extension. (Note: blog IS handled — it lives under
  // /[locale]/blog/, so /blog/foo redirects to /en/blog/foo.)
  matcher: ['/((?!api|_next|sitemap.xml|robots.txt|.*\\..*).*)'],
};
