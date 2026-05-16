'use client';

// Sticky TOC sidebar for long-form blog posts.
//
// Receives `toc` array from lib/article-enhance.js → buildToc():
//   [{ id: 'why-source-from-china', text: 'Why source from China?', level: 2 }, ...]
//
// Behavior:
//   - Desktop (lg+):  renders as sticky sidebar, highlights active section
//                     via IntersectionObserver, smooth-scrolls on click.
//   - Mobile (< lg):  renders as collapsible <details> accordion above
//                     the article so it doesn't dominate the viewport.
//
// The active-section highlight uses a "first visible heading in the top
// portion of the viewport" heuristic — more stable than tracking last-passed
// heading on fast scrolls.

import { useEffect, useState, useRef } from 'react';

export default function TableOfContents({ toc, title = 'On this page' }) {
  const [activeId, setActiveId] = useState(toc?.[0]?.id || '');
  // Track all currently-visible heading ids in a Set so we can pick the
  // topmost one deterministically each tick. IntersectionObserver fires
  // for entries leaving and entering — we need both sides of the event.
  const visibleIds = useRef(new Set());

  useEffect(() => {
    if (!toc || toc.length === 0) return;

    // Build the list of actual DOM nodes to observe. Some ids in the
    // toc might not be in the DOM yet on first render of streamed HTML,
    // but for blog posts the content is server-rendered so this is fine.
    const targets = toc
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleIds.current.add(entry.target.id);
          } else {
            visibleIds.current.delete(entry.target.id);
          }
        }
        // Pick whichever visible heading appears earliest in the toc
        // (= earliest in the document). This avoids jitter when two
        // headings are simultaneously inside the rootMargin band.
        if (visibleIds.current.size > 0) {
          const first = toc.find((item) => visibleIds.current.has(item.id));
          if (first) setActiveId(first.id);
        }
      },
      {
        // Trigger when heading crosses into the top 25% of viewport.
        // -75% bottom margin = "heading is in top 25% band of viewport".
        rootMargin: '-80px 0px -75% 0px',
        threshold: 0,
      }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [toc]);

  if (!toc || toc.length === 0) return null;

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    // Smooth scroll with a small offset to clear the sticky site header.
    const top = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: 'smooth' });
    // Update the URL hash without triggering a jump
    history.replaceState(null, '', `#${id}`);
  };

  return (
    <>
      {/* MOBILE: collapsible accordion */}
      <details className="lg:hidden group bg-brand-cream border border-brand-line rounded-2xl mb-8 print:hidden">
        <summary className="cursor-pointer list-none p-5 flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-green">
            {title}
          </span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-brand-mute transition-transform group-open:rotate-180"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </summary>
        <nav className="px-5 pb-5">
          <ol className="space-y-2 text-sm border-l border-brand-line/70 pl-4">
            {toc.map((item) => (
              <li key={item.id} className={item.level === 3 ? 'pl-4' : ''}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={
                    activeId === item.id
                      ? 'text-brand-green font-semibold'
                      : 'text-brand-mute hover:text-brand-ink'
                  }
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </details>

      {/* DESKTOP: sticky sidebar */}
      <div className="hidden lg:block print:hidden">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green mb-3">
          {title}
        </p>
        <nav aria-label="Table of contents">
          <ol className="space-y-2 text-[13px] border-l border-brand-line">
            {toc.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li
                  key={item.id}
                  className={item.level === 3 ? 'ml-3' : ''}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleClick(e, item.id)}
                    className={
                      'block -ml-px pl-4 py-1 border-l-2 leading-snug transition-colors ' +
                      (isActive
                        ? 'border-brand-green text-brand-green font-semibold'
                        : 'border-transparent text-brand-mute hover:text-brand-ink hover:border-brand-line')
                    }
                  >
                    {item.text}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </>
  );
}
