// Google Analytics 4 (gtag.js) loader.
//
// Uses next/script with strategy="afterInteractive" so the GA script loads
// AFTER hydration finishes — it never blocks the LCP element or first paint.
// GA4 Enhanced Measurement automatically tracks SPA route changes via the
// History API, so we don't need to manually wire router.events.
//
// To disable GA (e.g., for dev/staging/preview), set
// SITE.googleAnalytics.measurementId to an empty string in data/site-config.js.

import Script from 'next/script';
import { SITE } from '@/data/site-config';

export default function GoogleAnalytics() {
  const id = SITE.googleAnalytics?.measurementId;
  if (!id) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', {
            // Respect the locale of the current page for the GA "Language" dimension
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}
