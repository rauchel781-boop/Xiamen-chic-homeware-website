'use client';

// Client-side Mermaid.js loader for flowcharts inside blog posts.
//
// Loads Mermaid from CDN (esm.sh) on demand. Two reasons for not bundling:
//   1. Mermaid is ~600KB. Only 1-2 articles will use it. Bundling it
//      inflates every page's JS budget.
//   2. Skipping the npm dependency avoids a lockfile bump that breaks
//      our Coolify Nixpacks builds until we redeploy.
//
// Authors write Mermaid in WP content as:
//   <pre class="wp-block-code language-mermaid"><code>flowchart LR
//     A[Brief] --> B[Quote]
//   </code></pre>
// or any <code class="language-mermaid">...</code>.
//
// If a diagram fails to parse we leave the original code block visible so
// the author can spot the bug.

import { useEffect } from 'react';

const MERMAID_CDN = 'https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.esm.min.mjs';

export default function MermaidLoader({ selector = '.blog-prose code.language-mermaid, .wp-content code.language-mermaid' }) {
  useEffect(() => {
    const codes = Array.from(document.querySelectorAll(selector));
    if (codes.length === 0) return;

    let cancelled = false;

    (async () => {
      try {
        // ESM import from CDN — Next/webpack passes through dynamic import
        // of an absolute URL, the browser fetches and caches it.
        const mod = await import(/* webpackIgnore: true */ MERMAID_CDN);
        const mermaid = mod.default || mod;
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            primaryColor: '#F5F1E8',
            primaryTextColor: '#1A1A1A',
            primaryBorderColor: '#2C5E3F',
            lineColor: '#2C5E3F',
            secondaryColor: '#ffffff',
            tertiaryColor: '#F5F1E8',
            fontFamily: 'inherit',
            fontSize: '14px',
          },
          securityLevel: 'strict',
          flowchart: { curve: 'basis', padding: 16, useMaxWidth: true },
        });

        for (let i = 0; i < codes.length; i++) {
          if (cancelled) return;
          const code = codes[i];
          const source = code.textContent || '';
          const id = `mermaid-svg-${Date.now()}-${i}`;
          try {
            const { svg } = await mermaid.render(id, source);
            const wrapper = code.closest('pre') || code;
            const container = document.createElement('figure');
            container.className =
              'my-8 rounded-2xl border border-brand-line bg-brand-cream p-6 overflow-x-auto print:break-inside-avoid';
            container.innerHTML = svg;
            wrapper.replaceWith(container);
          } catch (err) {
            // eslint-disable-next-line no-console
            console.warn('[MermaidLoader] render failed:', err?.message || err);
          }
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('[MermaidLoader] cdn import failed:', err?.message || err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [selector]);

  return null;
}
