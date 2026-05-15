// Reusable per-page FAQ section.
//
// Usage:
//   <PageFAQ
//     title="About CHIC — FAQ"
//     intro="Common questions about our factory..."
//     items={[
//       { q: '...', a: '...' },
//       ...
//     ]}
//     ctaHref="/contact#form"
//   />
//
// Each instance emits its own FAQPage JSON-LD so search engines can pull
// rich-result Q&A snippets for that specific page. Pages can include
// multiple FAQs (or one big one) and the schema stays clean per-section.

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';

export default function PageFAQ({
  eyebrow,
  title,
  intro,
  items,
  ctaTitle,
  ctaBody,
  ctaButton,
  ctaHref = '/contact#form',
  background = 'bg-white',
  defaultOpenIndex = 0,
}) {
  const t = useTranslations('pageFaqs');
  const [openIdx, setOpenIdx] = useState(defaultOpenIndex);

  // Plain-text JSON-LD payload for FAQPage rich results.
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };

  return (
    <section className={`${background} py-20 lg:py-24 border-b border-brand-line`}>
      <JsonLd data={faqLd} />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16">
          {/* LEFT — title + sticky CTA on desktop */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
              {eyebrow || t('eyebrow')}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
              {title}
            </h2>
            {intro && (
              <p className="mt-5 text-brand-mute leading-relaxed text-[16px]">
                {intro}
              </p>
            )}

            {/* Optional CTA card — page-specific or fall back to global ctaTitle/Body */}
            {(ctaTitle || ctaButton) && (
              <div className="mt-8 bg-brand-cream rounded-2xl border border-brand-line p-6">
                <p className="font-extrabold text-brand-ink leading-tight mb-2">
                  {ctaTitle || t('ctaTitle')}
                </p>
                <p className="text-sm text-brand-mute leading-relaxed mb-4">
                  {ctaBody || t('ctaBody')}
                </p>
                <Link
                  href={ctaHref}
                  className="inline-flex items-center rounded-full bg-brand-green px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-greenDark transition"
                >
                  {ctaButton || t('ctaButton')}
                </Link>
              </div>
            )}
          </div>

          {/* RIGHT — accordion of Q&A pairs */}
          <div className="space-y-3">
            {items.map((it, i) => {
              const open = openIdx === i;
              return (
                <details
                  key={i}
                  open={open}
                  onToggle={(e) => {
                    if (e.currentTarget.open) setOpenIdx(i);
                    else if (open) setOpenIdx(-1);
                  }}
                  className={`group rounded-2xl border ${open ? 'border-brand-green/40 shadow-md bg-white' : 'border-brand-line bg-white'} transition overflow-hidden`}
                >
                  <summary className="cursor-pointer list-none flex items-start gap-4 p-5 lg:p-6 hover:bg-brand-cream/40 transition">
                    <span className={`shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold tabular-nums transition ${open ? 'bg-brand-green text-white' : 'bg-brand-cream text-brand-green'}`}>
                      Q{i + 1}
                    </span>
                    <span className="flex-1 text-base lg:text-[17px] font-bold text-brand-ink leading-snug pt-1">
                      {it.q}
                    </span>
                    <span className={`shrink-0 mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full border text-brand-mute transition ${open ? 'border-brand-green bg-brand-green text-white rotate-180' : 'border-brand-line'}`}>
                      <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l5 5 5-5" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-5 lg:px-6 pb-6 pl-[68px] lg:pl-[80px] text-sm lg:text-[15px] text-brand-mute leading-relaxed">
                    {it.a}
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
