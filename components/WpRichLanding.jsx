// Rich landing page renderer — takes typed sections from classifyWpPage()
// and produces a multi-section layout with the same visual language as the
// home page (cream/green palette, rounded cards, hover effects, alternating
// background bands).
//
// All section components live in this single file to keep the surface small.
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';

// ─────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────
function Hero({ title, kicker, lead, breadcrumb }) {
  return (
    <header className="bg-brand-cream border-b border-brand-line">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-14 lg:py-20">
        <nav className="text-xs text-brand-mute mb-4">
          <Link href="/" className="hover:text-brand-green">Home</Link>
          {breadcrumb.map((c, i) => (
            <span key={i}>
              {' / '}
              {c.url ? (
                <Link href={c.url} className="hover:text-brand-green">{c.name}</Link>
              ) : (
                <span>{c.name}</span>
              )}
            </span>
          ))}
          {' / '}
          <span className="text-brand-ink">{title}</span>
        </nav>
        {kicker && (
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
            {kicker}
          </p>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-brand-ink leading-[1.1] max-w-4xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-5 text-brand-mute leading-relaxed max-w-2xl text-[17px]">
            {lead}
          </p>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/contact#form"
            className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition"
          >
            Get a Free Quote
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────
// Intro block — short prose right after the hero
// ─────────────────────────────────────────────────────────────────
function IntroBlock({ html }) {
  if (!html || html.length < 30) return null;
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-[820px] mx-auto px-6 lg:px-8">
        <div className="wp-content text-[17px]" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Section heading helper — kicker + H2 + lead, centered
// ─────────────────────────────────────────────────────────────────
function SectionHead({ title, lead, kicker, dark = false }) {
  return (
    <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
      {kicker && (
        <p className={`text-[11px] font-bold uppercase tracking-[0.25em] mb-3 ${dark ? 'text-brand-wood' : 'text-brand-green'}`}>
          {kicker}
        </p>
      )}
      <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight leading-tight ${dark ? 'text-white' : 'text-brand-ink'}`}>
        {title}
      </h2>
      {lead && (
        <p className={`mt-4 leading-relaxed text-[16px] ${dark ? 'text-white/80' : 'text-brand-mute'}`}>
          {lead}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Gallery — 3-col card grid (image + title + body)
// ─────────────────────────────────────────────────────────────────
function GallerySection({ title, lead, items, bg }) {
  return (
    <section className={`py-16 lg:py-24 ${bg}`}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <SectionHead title={title} lead={lead} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <article
              key={i}
              className="group bg-white rounded-2xl border border-brand-line overflow-hidden hover:border-brand-green/40 hover:shadow-lg transition"
            >
              {it.image && (
                <div className="relative aspect-square bg-brand-cream overflow-hidden">
                  <Image
                    src={it.image}
                    alt={it.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-[1.03] transition duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-base font-bold text-brand-ink mb-2 leading-snug">
                  {it.title}
                </h3>
                {it.body && (
                  <p className="text-sm text-brand-mute leading-relaxed line-clamp-4">
                    {it.body}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Feature Grid — 3-col cards (no image)
// ─────────────────────────────────────────────────────────────────
function FeatureGridSection({ title, lead, items, bg }) {
  return (
    <section className={`py-16 lg:py-24 ${bg}`}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <SectionHead title={title} lead={lead} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <article
              key={i}
              className="bg-white rounded-2xl border border-brand-line p-7 hover:border-brand-green/40 hover:shadow-md transition"
            >
              <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mb-4 font-bold text-sm">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="text-lg font-bold text-brand-ink mb-2 leading-snug">
                {it.title}
              </h3>
              <p className="text-sm text-brand-mute leading-relaxed">
                {it.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Process Steps — numbered horizontal band
// ─────────────────────────────────────────────────────────────────
function ProcessStepsSection({ title, lead, items, bg }) {
  const hasImages = items.some(it => it.image);
  return (
    <section className={`py-16 lg:py-24 ${bg}`}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <SectionHead title={title} lead={lead} kicker="Process" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {items.map((it, i) => (
            <div
              key={i}
              className="relative bg-white rounded-2xl border border-brand-line overflow-hidden hover:border-brand-green/40 hover:shadow-md transition"
            >
              {it.image && (
                <div className="relative aspect-[4/3] bg-brand-cream overflow-hidden">
                  <Image
                    src={it.image}
                    alt={it.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-5 lg:p-6">
                <div className="text-2xl font-extrabold text-brand-green/40 leading-none mb-2">
                  {it.number}
                </div>
                <h3 className="text-[15px] font-bold text-brand-ink mb-2 leading-snug">
                  {it.title}
                </h3>
                {it.body && (
                  <p className="text-[13px] text-brand-mute leading-relaxed line-clamp-4">
                    {it.body}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Image + Text — alternating side-by-side
// ─────────────────────────────────────────────────────────────────
function ImageTextSection({ title, image, bodyHtml, reverse, bg }) {
  return (
    <section className={`py-16 lg:py-20 ${bg}`}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className={`relative aspect-[4/3] bg-brand-cream rounded-2xl overflow-hidden ${reverse ? 'lg:order-2' : ''}`}>
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          </div>
          <div className={reverse ? 'lg:order-1' : ''}>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-tight mb-5">
              {title}
            </h2>
            <div
              className="wp-content text-[16px]"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Prose — fallback simple text section
// ─────────────────────────────────────────────────────────────────
function ProseSection({ title, bodyHtml, bg }) {
  return (
    <section className={`py-12 lg:py-16 ${bg}`}>
      <div className="max-w-[820px] mx-auto px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-ink leading-tight mb-6">
          {title}
        </h2>
        <div
          className="wp-content text-[16px]"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// FAQ — accordion
// ─────────────────────────────────────────────────────────────────
function FaqSection({ title, items, bg }) {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section className={`py-16 lg:py-24 ${bg}`}>
      <div className="max-w-[820px] mx-auto px-6 lg:px-8">
        <SectionHead title={title} kicker="FAQ" />
        <div className="space-y-3">
          {items.map((it, i) => {
            const open = openIdx === i;
            return (
              <div
                key={i}
                className={`bg-white rounded-2xl border ${open ? 'border-brand-green/40 shadow-md' : 'border-brand-line'} overflow-hidden transition`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? -1 : i)}
                  className="w-full flex items-start justify-between text-left p-5 lg:p-6 gap-4"
                >
                  <span className="font-semibold text-brand-ink leading-snug pr-2">
                    {it.q}
                  </span>
                  <span
                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition ${
                      open ? 'bg-brand-green text-white rotate-45' : 'bg-brand-green/10 text-brand-green'
                    }`}
                  >
                    +
                  </span>
                </button>
                {open && (
                  <div className="px-5 lg:px-6 pb-5 lg:pb-6 -mt-1 text-brand-mute leading-relaxed text-[15px]">
                    {it.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Final CTA band — closing call-to-action
// ─────────────────────────────────────────────────────────────────
function FinalCta() {
  return (
    <section className="bg-brand-green text-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-wood mb-3">
              Ready to start
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Let&apos;s build your custom wooden program.
            </h2>
            <p className="mt-4 text-white/85 leading-relaxed text-[16px] max-w-xl">
              Tell us your size, material and packaging needs — we&apos;ll send a
              full quote with samples and lead-time within one business day.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link
              href="/contact#form"
              className="inline-flex items-center rounded-full bg-brand-wood px-7 py-3 text-[15px] font-semibold text-brand-ink hover:bg-brand-woodSoft transition"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center rounded-full border-2 border-white px-7 py-3 text-[15px] font-semibold text-white hover:bg-white hover:text-brand-green transition"
            >
              About Our Factory
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Main orchestrator — alternates background bands for visual rhythm
// ─────────────────────────────────────────────────────────────────
export default function WpRichLanding({
  title,
  kicker,
  lead,
  intro,
  sections,
  breadcrumb = [],
  faqs = [],
}) {
  // Build BreadcrumbList JSON-LD
  const crumbs = [{ name: 'Home', url: '/' }, ...breadcrumb, { name: title }];
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url ? `${SITE.siteUrl}${c.url}` : undefined,
    })),
  };

  // FAQ JSON-LD if any FAQ section is in the page
  const faqSection = sections.find(s => s.type === 'faq');
  const faqLd =
    faqSection && faqSection.items.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqSection.items.map(it => ({
            '@type': 'Question',
            name: it.q,
            acceptedAnswer: { '@type': 'Answer', text: it.a },
          })),
        }
      : null;

  // Alternating backgrounds — every other section gets cream
  const BG = ['bg-white', 'bg-brand-cream'];

  let imageTextCount = 0;
  return (
    <article className="bg-white">
      <JsonLd data={breadcrumbLd} />
      {faqLd && <JsonLd data={faqLd} />}

      <Hero title={title} kicker={kicker} lead={lead} breadcrumb={breadcrumb} />

      {intro && <IntroBlock html={intro} />}

      {sections.map((s, i) => {
        const bg = BG[i % 2];
        switch (s.type) {
          case 'gallery':
            return <GallerySection key={i} {...s} bg={bg} />;
          case 'featureGrid':
            return <FeatureGridSection key={i} {...s} bg={bg} />;
          case 'processSteps':
            return <ProcessStepsSection key={i} {...s} bg={bg} />;
          case 'imageText': {
            const reverse = imageTextCount++ % 2 === 1;
            return <ImageTextSection key={i} {...s} reverse={reverse} bg={bg} />;
          }
          case 'faq':
            return <FaqSection key={i} {...s} bg={bg} />;
          case 'prose':
          default:
            return <ProseSection key={i} {...s} bg={bg} />;
        }
      })}

      <FinalCta />
    </article>
  );
}
