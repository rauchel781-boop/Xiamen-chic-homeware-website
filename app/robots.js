import { SITE } from '@/data/site-config';

// Next.js 14 Metadata Files API — generates /robots.txt at build time
// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Only /api/ is blocked.
        //
        // /_next/ used to be blocked here, which was quietly expensive:
        // every product photo on this site is served through the Next.js
        // image optimiser at /_next/image?url=..., and all CSS and JS live
        // under /_next/static/. Blocking that prefix told Google it may not
        // fetch a single image, stylesheet or script on the site — so the
        // image entries we publish in sitemap.xml pointed at resources the
        // crawler was forbidden to load, and pages could not be rendered as
        // a visitor sees them.
        //
        // Google's robots.txt guidance: do not block resources that the page
        // needs in order to be understood.
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE.siteUrl}/sitemap.xml`,
    host: SITE.siteUrl,
  };
}
