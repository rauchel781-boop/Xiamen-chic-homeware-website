import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request) {
  const { pathname } = request.nextUrl;

  // ── /en/* is a duplicate of the unprefixed English URL ───────────────
  //
  // localePrefix is 'as-needed', so English lives at /products/foo and the
  // canonical tag, the sitemap and every hreflang entry point there. But
  // generateStaticParams() in app/[locale]/layout.js emits 'en' along with
  // the other locales, so Next also builds /en/products/foo and serves it
  // with a 200. Google found those: they show up in Search Console under
  // "crawled - currently not indexed", a second copy of the entire English
  // site competing with the real one.
  //
  // Redirecting here rather than in next.config.js redirects() is
  // deliberate. next-intl rewrites an unprefixed request to the internal
  // /en/... path; a redirects() rule matching /en/:path* risks catching that
  // rewrite and looping. This runs on the inbound request only, before the
  // rewrite happens, so there is nothing to loop on.
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
    return NextResponse.redirect(url, 301);
  }

  return intlMiddleware(request);
}

export const config = {
  // Match every path EXCEPT api, _next, sitemap.xml, robots.txt, and any
  // path with a file extension. (Note: blog IS handled — it lives under
  // /[locale]/blog/, so /blog/foo redirects to /en/blog/foo.)
  matcher: ['/((?!api|_next|sitemap.xml|robots.txt|.*\\..*).*)'],
};
