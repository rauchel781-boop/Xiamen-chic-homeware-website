// Microsoft Clarity — heatmaps + session recordings.
//
// Uses next/script with strategy="afterInteractive" so the loader script
// runs AFTER hydration and never blocks LCP. Clarity then loads its own
// recorder code lazily on top of that.
//
// To disable (dev/staging), set SITE.microsoftClarity.projectId = '' in
// data/site-config.js.

import Script from 'next/script';
import { SITE } from '@/data/site-config';

export default function MicrosoftClarity() {
  const id = SITE.microsoftClarity?.projectId;
  if (!id) return null;

  return (
    <Script id="clarity-init" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${id}");
      `}
    </Script>
  );
}
