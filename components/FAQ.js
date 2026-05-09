'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';

// FAQ items pulled from xmchichomeware.com home page (5 questions).
const ITEMS = [
  {
    q: 'Are you a wooden products manufacturer or a trading company?',
    a: 'We are a professional wooden products manufacturer in China, with our factory located in Cao County and a sales office in Xiamen.',
  },
  {
    q: 'Do you support OEM and private label production?',
    a: 'Yes. We provide OEM and ODM wooden products manufacturing services, including custom materials, sizes, logo branding, and packaging.',
  },
  {
    q: 'What types of wooden products do you manufacture?',
    a: 'We manufacture wooden kitchenware, storage organizers, gift boxes, desk organizers, and custom wooden homeware products.',
  },
  {
    q: 'Which markets do you mainly export to?',
    a: 'Our wooden products are mainly exported to the United States, Europe, Australia, and other global markets.',
  },
  {
    q: 'How do I choose the right wood material for my product?',
    a: (
      <>
        Choosing the right wood depends on product usage, target price, and market positioning.
        You can refer to our{' '}
        <Link href="/material-guide" className="text-brand-green underline hover:text-brand-greenDark">
          Material Selection Guide
        </Link>
        {' '}for a clear comparison of common wood options used in kitchenware and storage products.
      </>
    ),
  },
];

// FAQPage JSON-LD — built from the items below for Google rich results
function buildFaqLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: {
        '@type': 'Answer',
        // Strip the inline JSX into plain text for the LD
        text: typeof it.a === 'string' ? it.a : 'Refer to the question on our website for the full answer.',
      },
    })),
  };
}

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-white py-20 lg:py-28">
      <JsonLd data={buildFaqLd(ITEMS)} />
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16">
          {/* LEFT — title block + contact card */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
              Got Questions?
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-brand-ink leading-[1.1]">
              Frequently asked{' '}
              <span className="text-brand-green">questions</span>
            </h2>
            <p className="mt-5 text-brand-mute leading-relaxed max-w-md">
              Quick answers about our factory, materials, and OEM &amp; ODM services.
              Don&apos;t see your question below? Reach out — we usually reply within 24 hours.
            </p>

            {/* Still-have-questions card */}
            <div className="mt-8 rounded-2xl bg-brand-cream border border-brand-line p-6 lg:p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-green mb-3">
                Still have a question?
              </p>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="mailto:sales@xmchichomeware.com" className="flex items-center gap-3 text-brand-ink hover:text-brand-green group">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white border border-brand-line text-brand-green group-hover:bg-brand-green group-hover:text-white group-hover:border-brand-green transition shrink-0">
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                    </span>
                    <span className="font-medium">sales@xmchichomeware.com</span>
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/8618960098762" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-brand-ink hover:text-brand-green group">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white border border-brand-line text-brand-green group-hover:bg-brand-green group-hover:text-white group-hover:border-brand-green transition shrink-0">
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M17.6 6.32A8.78 8.78 0 0 0 12.05 4c-4.85 0-8.8 3.95-8.8 8.8 0 1.55.4 3.05 1.18 4.38L3.16 21.5l4.45-1.17a8.8 8.8 0 0 0 4.43 1.2h.01c4.85 0 8.8-3.95 8.8-8.8 0-2.35-.92-4.56-2.58-6.21zm-5.55 13.55h-.01a7.3 7.3 0 0 1-3.72-1.02l-.27-.16-2.78.73.74-2.71-.18-.28a7.27 7.27 0 0 1-1.12-3.9c0-4.04 3.29-7.32 7.34-7.32a7.3 7.3 0 0 1 5.18 2.15 7.27 7.27 0 0 1 2.15 5.18c0 4.04-3.29 7.33-7.33 7.33z"/></svg>
                    </span>
                    <span className="font-medium">WhatsApp Chat</span>
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="flex items-center gap-3 text-brand-ink hover:text-brand-green group">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white border border-brand-line text-brand-green group-hover:bg-brand-green group-hover:text-white group-hover:border-brand-green transition shrink-0">
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </span>
                    <span className="font-medium">Send a detailed inquiry →</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT — accordion */}
          <div>
            {ITEMS.map((it, i) => (
              <Item
                key={i}
                index={i + 1}
                question={it.q}
                answer={it.a}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Item({ index, question, answer, isOpen, onToggle }) {
  return (
    <div
      className={`group rounded-2xl border transition mb-3 overflow-hidden ${
        isOpen
          ? 'border-brand-green/40 bg-brand-cream/50 shadow-sm'
          : 'border-brand-line bg-white hover:border-brand-green/30'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 p-5 lg:p-6 text-left"
        aria-expanded={isOpen}
      >
        {/* Q number badge */}
        <span
          className={`shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full text-xs font-extrabold tabular-nums transition ${
            isOpen
              ? 'bg-brand-green text-white'
              : 'bg-brand-cream text-brand-green group-hover:bg-brand-green group-hover:text-white'
          }`}
        >
          Q{index}
        </span>

        {/* Question text */}
        <span className="flex-1 text-base lg:text-[17px] font-bold text-brand-ink leading-snug pt-1.5">
          {question}
        </span>

        {/* Toggle icon */}
        <span
          className={`shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full border transition mt-1 ${
            isOpen
              ? 'border-brand-green bg-brand-green text-white rotate-180'
              : 'border-brand-line text-brand-mute group-hover:border-brand-green group-hover:text-brand-green'
          }`}
        >
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l5 5 5-5" />
          </svg>
        </span>
      </button>

      {/* Answer — animates open via grid trick (no JS height calc needed) */}
      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 lg:px-6 pb-6 pl-[68px] lg:pl-[80px] text-sm lg:text-[15px] text-brand-mute leading-relaxed">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}
