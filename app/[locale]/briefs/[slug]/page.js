// /briefs/[slug] — Industry Brief detail page.
// Newsletter-style layout, distinct from /blog/[slug]:
//   · Volume header band (VOL. 01 · Week of … · 3 min read)
//   · TL;DR box (3 bullets)
//   · Big-number hero card (★ 76 ★)
//   · Outside Signal box (cream, globe icon)
//   · From the Floor box (green, factory icon)
//   · Action checklist (checkbox list)
//   · Next Week teaser + CTA
//   · Compact 3-question FAQ
//
// Briefs live in wp-data/posts.json but with `type: 'brief'` and structured
// fields (tldr[], bigNumber{}, outsideSignal{}, fromTheFloor{}, actionItems[],
// nextWeek). They are filtered OUT of /blog routes so they only render here.

import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';
import { wpPosts, stripHtml } from '@/lib/wp-data';
import { localizePost } from '@/lib/translated-content';
import { routing, canonicalFor } from '@/i18n/routing';
import { schemaLang } from '@/i18n/seo';

function getBriefBySlug(slug) {
  return wpPosts().find(
    (p) =>
      p.slug === slug &&
      (p.type === 'brief' ||
        p.categories?.some((c) => c.slug === 'industry-brief'))
  );
}

function getAllBriefs() {
  return wpPosts()
    .filter(
      (p) =>
        p.type === 'brief' ||
        p.categories?.some((c) => c.slug === 'industry-brief')
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function buildAlternates(path) {
  const langs = {};
  for (const loc of routing.locales) {
    const prefix = loc === routing.defaultLocale ? '' : `/${loc}`;
    langs[loc] = `${SITE.siteUrl}${prefix}${path}`;
  }
  langs['x-default'] = `${SITE.siteUrl}${path}`;
  return langs;
}

export function generateStaticParams() {
  return getAllBriefs().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const raw = getBriefBySlug(params.slug);
  if (!raw) return {};
  const p = localizePost(raw, params.locale);
  const path = `/briefs/${params.slug}`;
  return {
    title: p.meta_title || stripHtml(p.title),
    description: p.meta_desc || stripHtml(p.excerpt),
    alternates: {
      canonical: canonicalFor(params.locale, path),
      languages: buildAlternates(path),
    },
    openGraph: {
      type: 'article',
      url: `${SITE.siteUrl}${path}`,
      title: p.meta_title || stripHtml(p.title),
      description: p.meta_desc || stripHtml(p.excerpt),
      siteName: SITE.company.brand,
      images: p.featured_image ? [{ url: p.featured_image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: p.meta_title || stripHtml(p.title),
      description: p.meta_desc || stripHtml(p.excerpt),
    },
  };
}

export default function BriefDetailPage({ params }) {
  unstable_setRequestLocale(params.locale);
  return <BriefDetail params={params} />;
}

function BriefDetail({ params }) {
  const t = useTranslations('briefs');
  const raw = getBriefBySlug(params.slug);
  if (!raw) notFound();

  const b = localizePost(raw, params.locale);
  const briefs = getAllBriefs();
  const idx = briefs.findIndex((x) => x.slug === b.slug);
  const newer = idx > 0 ? briefs[idx - 1] : null;
  const older = idx < briefs.length - 1 ? briefs[idx + 1] : null;

  // BlogPosting + FAQ schema
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: stripHtml(b.title),
    description: stripHtml(b.excerpt),
    datePublished: b.date,
    dateModified: b.date,
    inLanguage: schemaLang(params.locale),
    author: { '@type': 'Organization', name: SITE.company.brand },
    publisher: {
      '@type': 'Organization',
      name: SITE.company.brand,
      logo: { '@type': 'ImageObject', url: `${SITE.siteUrl}/logo.png` },
    },
    image: b.featured_image ? [`${SITE.siteUrl}${b.featured_image}`] : [],
    mainEntityOfPage: `${SITE.siteUrl}/briefs/${b.slug}`,
  };
  const faqLd =
    b.faq && b.faq.length
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: b.faq.map((q) => ({
            '@type': 'Question',
            name: q.q,
            acceptedAnswer: { '@type': 'Answer', text: stripHtml(q.a) },
          })),
        }
      : null;

  const volStr = String(b.briefNumber || 1).padStart(2, '0');

  return (
    <>
      <JsonLd data={articleLd} />
      {faqLd && <JsonLd data={faqLd} />}

      <article className="bg-brand-cream min-h-screen">
        {/* ── Volume header band ─────────────────────────────────── */}
        <header className="bg-brand-ink text-white py-8">
          <div className="max-w-3xl mx-auto px-6">
            <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-white/70 mb-3">
              <span className="text-brand-green">{t('seriesName')}</span>
              <span>·</span>
              <span>
                {t('vol')} {volStr}
              </span>
            </div>
            <div className="text-[13px] text-white/60">
              {t('weekOf')} {b.weekOf || ''}
              {b.readTime && (
                <>
                  {' · '}
                  {b.readTime} {t('minRead')}
                </>
              )}
            </div>
          </div>
        </header>

        {/* ── Title ─────────────────────────────────────────────── */}
        <div className="bg-white py-12 lg:py-16 border-b border-brand-line">
          <div className="max-w-3xl mx-auto px-6">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-ink leading-[1.1]"
              dangerouslySetInnerHTML={{ __html: b.title }}
            />
          </div>
        </div>

        {/* ── TL;DR box ─────────────────────────────────────────── */}
        {b.tldr && b.tldr.length > 0 && (
          <section className="py-10 lg:py-14">
            <div className="max-w-3xl mx-auto px-6">
              <div className="rounded-2xl border-2 border-brand-green/30 bg-white p-6 lg:p-8 shadow-sm">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-brand-green mb-4">
                  {t('tldr')}
                </p>
                <ul className="space-y-3">
                  {b.tldr.map((line, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-[15px] text-brand-ink leading-relaxed"
                    >
                      <span className="text-brand-green font-bold mt-1">▸</span>
                      <span dangerouslySetInnerHTML={{ __html: line }} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* ── Big Number hero card ──────────────────────────────── */}
        {b.bigNumber && (
          <section className="py-10">
            <div className="max-w-3xl mx-auto px-6">
              <div className="rounded-2xl bg-gradient-to-br from-brand-green to-brand-greenDark text-white p-10 lg:p-14 text-center shadow-md">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-white/70 mb-4">
                  {t('byTheNumbers')}
                </p>
                <div className="text-7xl lg:text-8xl font-black tracking-tight leading-none mb-3">
                  {b.bigNumber.value}
                </div>
                <p className="text-lg lg:text-xl font-semibold mb-2">
                  {b.bigNumber.label}
                </p>
                {b.bigNumber.context && (
                  <p className="text-sm text-white/70">
                    {b.bigNumber.context}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── Outside Signal ────────────────────────────────────── */}
        {b.outsideSignal && (
          <section className="py-8">
            <div className="max-w-3xl mx-auto px-6">
              <div className="rounded-2xl bg-amber-50 border border-amber-200 p-7 lg:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🌍</span>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-amber-800">
                    {t('outsideSignal')}
                  </p>
                </div>
                <h2 className="text-xl lg:text-2xl font-extrabold text-brand-ink leading-snug mb-3">
                  {b.outsideSignal.headline}
                </h2>
                <p className="text-[15px] text-brand-ink/80 leading-relaxed">
                  {b.outsideSignal.body}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ── From the Floor ────────────────────────────────────── */}
        {b.fromTheFloor && (
          <section className="py-8">
            <div className="max-w-3xl mx-auto px-6">
              <div className="rounded-2xl bg-brand-green/10 border border-brand-green/30 p-7 lg:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🏭</span>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-brand-greenDark">
                    {t('fromTheFloor')}
                  </p>
                </div>
                <h2 className="text-xl lg:text-2xl font-extrabold text-brand-ink leading-snug mb-3">
                  {b.fromTheFloor.headline}
                </h2>
                <p className="text-[15px] text-brand-ink/80 leading-relaxed">
                  {b.fromTheFloor.body}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ── Action checklist ──────────────────────────────────── */}
        {b.actionItems && b.actionItems.length > 0 && (
          <section className="py-10">
            <div className="max-w-3xl mx-auto px-6">
              <div className="rounded-2xl bg-white border-2 border-brand-ink/10 p-7 lg:p-8">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-2xl">✅</span>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-brand-ink">
                    {t('whatToDo')}
                  </p>
                </div>
                <ul className="space-y-3">
                  {b.actionItems.map((line, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-[15px] text-brand-ink leading-relaxed"
                    >
                      <span className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded border-2 border-brand-ink/40 text-brand-ink/40 text-xs font-bold flex-shrink-0">
                        □
                      </span>
                      <span dangerouslySetInnerHTML={{ __html: line }} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* ── Next Week teaser + CTA ────────────────────────────── */}
        {b.nextWeek && (
          <section className="py-12 lg:py-16 border-t border-brand-line bg-white">
            <div className="max-w-3xl mx-auto px-6">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-brand-mute mb-3">
                {t('nextWeek')}
              </p>
              <p className="text-lg text-brand-ink leading-relaxed mb-6">
                {b.nextWeek}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-brand-green text-white px-7 py-3 text-[15px] font-semibold hover:bg-brand-greenDark transition"
              >
                {t('getQuoteCta')} →
              </Link>
            </div>
          </section>
        )}

        {/* ── FAQ (compact, 3 questions) ────────────────────────── */}
        {b.faq && b.faq.length > 0 && (
          <section className="py-12 lg:py-16 border-t border-brand-line">
            <div className="max-w-3xl mx-auto px-6">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-brand-green mb-4">
                {t('faqLabel')}
              </p>
              <div className="space-y-5">
                {b.faq.map((q, i) => (
                  <details
                    key={i}
                    className="group rounded-xl bg-white border border-brand-line p-5 lg:p-6 hover:border-brand-green/40 transition"
                  >
                    <summary className="cursor-pointer list-none font-bold text-brand-ink flex justify-between items-start gap-4">
                      <span>{q.q}</span>
                      <span className="text-brand-green text-xl flex-shrink-0 group-open:rotate-45 transition">
                        +
                      </span>
                    </summary>
                    <div
                      className="mt-3 text-[15px] text-brand-mute leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: q.a }}
                    />
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Prev / Next brief navigation ──────────────────────── */}
        <nav className="py-10 border-t border-brand-line bg-white">
          <div className="max-w-3xl mx-auto px-6 flex justify-between items-center gap-4 flex-wrap">
            {newer ? (
              <Link
                href={`/briefs/${newer.slug}`}
                className="text-sm font-semibold text-brand-green hover:text-brand-greenDark"
              >
                ← {t('newerBrief')} (Vol.{' '}
                {String(newer.briefNumber || '').padStart(2, '0')})
              </Link>
            ) : (
              <span />
            )}
            <Link
              href="/blog"
              className="text-sm font-semibold text-brand-ink hover:text-brand-green"
            >
              {t('allBriefs')}
            </Link>
            {older ? (
              <Link
                href={`/briefs/${older.slug}`}
                className="text-sm font-semibold text-brand-green hover:text-brand-greenDark text-right"
              >
                {t('olderBrief')} (Vol.{' '}
                {String(older.briefNumber || '').padStart(2, '0')}) →
              </Link>
            ) : (
              <span />
            )}
          </div>
        </nav>
      </article>
    </>
  );
}
