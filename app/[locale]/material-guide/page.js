// /material-guide — fully redesigned, image-rich material guide.
// Content sourced from the WP "complete-guide-wood-materials-for-kitchenware" page.
// Each wood has its own card with photo, description, ratings, best-for use cases,
// and links to relevant product categories on this site.

import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';
import { wpPosts } from '@/lib/wp-data';
import { hreflangFor } from '@/i18n/routing';
import { schemaLang } from '@/i18n/seo';

export async function generateMetadata({ params: { locale } = {} }) {
  const t = await getTranslations({ locale, namespace: 'materialGuide' });
  const title = t('metaTitle');
  const description = t('metaDesc');
  return {
    title, description,
    alternates: { canonical: `/material-guide`, languages: hreflangFor(SITE.siteUrl, '/material-guide') },
    openGraph: {
      type: 'article',
      url: `${SITE.siteUrl}/material-guide`,
      title, description, siteName: SITE.company.brand,
    },
  };
}

// Per-wood static fields that don't change with locale (slug, image, cost, hardness,
// product-category slugs). Order corresponds to wood1..wood12 i18n keys.
const WOOD_DATA = [
  { slug: 'acacia',    image: '/different%20wood/acacia%20wood.png',    cost: '$$$',  hardness: 4, catSlugs: ['wooden-cutting-board', 'wooden-cheese-board', 'wooden-serving-tray', 'wooden-kitchen-dining'], bestCount: 4 },
  { slug: 'walnut',    image: '/different%20wood/walnut%20wood.png',    cost: '$$$$', hardness: 5, catSlugs: ['wooden-watch-boxes', 'wooden-jewelry-boxes', 'gift-boxes-retail-packaging', 'wooden-keepsake-boxes'], bestCount: 4 },
  { slug: 'bamboo',    image: '/different%20wood/bamboo.png',           cost: '$$',   hardness: 3, catSlugs: ['wooden-pantry-organizers', 'wooden-cutlery-organizer', 'wooden-drawer-organizer', 'wooden-kitchen-dining'], bestCount: 4 },
  { slug: 'pine',      image: '/different%20wood/pine%20wood.png',      cost: '$',    hardness: 2, catSlugs: ['wooden-storage-box-with-lid', 'wooden-gift-box', 'pet-products', 'storage-home-organization'], bestCount: 4 },
  { slug: 'paulownia', image: '/different%20wood/paulownia%20wood.png', cost: '$',    hardness: 1, catSlugs: ['wooden-wine-box', 'wooden-tea-box', 'wooden-gift-box', 'wooden-coffee-box'], bestCount: 4 },
  { slug: 'oak',       image: '/different%20wood/oak%20wood.png',       cost: '$$$',  hardness: 4, catSlugs: ['wooden-serving-tray', 'wooden-cutting-board', 'wooden-countertop-organizers'], bestCount: 4 },
  { slug: 'beech',     image: '/different%20wood/beech%20wood.png',     cost: '$$',   hardness: 4, catSlugs: ['wooden-cutting-board', 'wooden-cheese-board', 'wooden-kitchen-dining'], bestCount: 4 },
  { slug: 'rubber',    image: '/different%20wood/rubber%20wood.png',    cost: '$$',   hardness: 3, catSlugs: ['wooden-kitchen-dining', 'storage-home-organization', 'branded-wooden-promotional-gifts'], bestCount: 4 },
  { slug: 'teak',      image: '/different%20wood/teak%20wood.png',      cost: '$$$$', hardness: 5, catSlugs: ['wooden-cutting-board', 'bathroom-vanity-trays', 'hospitality-commercial'], bestCount: 4 },
  { slug: 'sapele',    image: '/different%20wood/sapele%20wood.png',    cost: '$$$',  hardness: 4, catSlugs: ['wooden-serving-tray', 'gift-boxes-retail-packaging'], bestCount: 3 },
  { slug: 'mdf',       image: '/different%20wood/mdf.png',              cost: '$',    hardness: 2, catSlugs: ['wooden-gift-box', 'wooden-photo-frame', 'branded-wooden-promotional-gifts'], bestCount: 4 },
  { slug: 'plywood',   image: '/different%20wood/plywood.png',          cost: '$',    hardness: 3, catSlugs: ['wooden-storage-box-with-lid', 'wooden-drawer-organizer', 'storage-home-organization'], bestCount: 4 },
];

// ───────────────────────────────────────────────────────────────────
// PAGE
// ───────────────────────────────────────────────────────────────────
export default function MaterialsGuide({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('materialGuide');
  const tNav = useTranslations('nav');

  // Build localized MATERIALS array. Each wood pulls name/tagline/intro/
  // advantages/weight/appearance/moisture/bestFor labels/category labels from t().
  const MATERIALS = WOOD_DATA.map((w, idx) => {
    const i = idx + 1;
    const bestFor = [];
    for (let b = 1; b <= w.bestCount; b++) {
      try { bestFor.push(t(`wood${i}Best${b}`)); } catch { /* missing */ }
    }
    const categories = w.catSlugs.map((slug, ci) => ({
      label: t(`wood${i}Cat${ci + 1}`),
      slug,
    }));
    return {
      slug: w.slug,
      name: t(`wood${i}Name`),
      tagline: t(`wood${i}Tagline`),
      intro: t(`wood${i}Intro`),
      advantages: [t(`wood${i}Adv1`), t(`wood${i}Adv2`), t(`wood${i}Adv3`), t(`wood${i}Adv4`)],
      rating: {
        hardness: w.hardness,
        cost: w.cost,
        weight: t(`wood${i}Weight`),
        appearance: t(`wood${i}Appearance`),
        moisture: t(`wood${i}Moisture`),
      },
      bestFor,
      categories,
      image: w.image,
    };
  });

  const USE_CASES = [
    { title: t('uc1Title'), body: t('uc1Body'), recommend: ['walnut', 'oak', 'teak'],        avoid: ['mdf', 'pine'] },
    { title: t('uc2Title'), body: t('uc2Body'), recommend: ['acacia', 'teak', 'beech', 'oak'], avoid: ['mdf', 'paulownia'] },
    { title: t('uc3Title'), body: t('uc3Body'), recommend: ['paulownia', 'pine'],            avoid: ['walnut', 'oak'] },
    { title: t('uc4Title'), body: t('uc4Body'), recommend: ['mdf', 'pine', 'plywood'],       avoid: ['walnut'] },
    { title: t('uc5Title'), body: t('uc5Body'), recommend: ['bamboo', 'rubber'],             avoid: ['mdf'] },
    { title: t('uc6Title'), body: t('uc6Body'), recommend: ['bamboo', 'pine', 'plywood'],    avoid: ['teak', 'walnut'] },
  ];
  const NAME_BY_SLUG = Object.fromEntries(MATERIALS.map((m) => [m.slug, m.name]));

  // Breadcrumb + Article JSON-LD for the guide
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.siteUrl}` },
      { '@type': 'ListItem', position: 2, name: t('breadcrumb') },
    ],
  };
  const guideLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${SITE.siteUrl}/material-guide#article`,
    headline: t('metaTitle'),
    description: t('metaDesc'),
    author: { '@id': `${SITE.siteUrl}/#organization` },
    publisher: { '@id': `${SITE.siteUrl}/#organization` },
    url: `${SITE.siteUrl}/material-guide`,
    inLanguage: schemaLang(locale),
    mainEntityOfPage: `${SITE.siteUrl}/material-guide`,
    datePublished: '2026-01-01',
    dateModified: '2026-05-12',
    image: MATERIALS.slice(0, 6).map(m => `${SITE.siteUrl}${m.image}`),
    keywords: MATERIALS.map(m => m.name).join(', '),
    about: MATERIALS.map(m => ({ '@type': 'Thing', name: m.name })),
    articleSection: 'Materials Guide',
    proficiencyLevel: 'Beginner',
  };
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '12 Wood Materials for Custom Manufacturing',
    description: t('atGlanceIntro'),
    numberOfItems: MATERIALS.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: MATERIALS.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: m.name,
      url: `${SITE.siteUrl}/material-guide#${m.slug}`,
      image: `${SITE.siteUrl}${m.image}`,
      description: m.tagline,
    })),
  };

  return (
    <article className="bg-white">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={guideLd} />
      <JsonLd data={itemListLd} />
      {/* Hero */}
      <header className="bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <nav className="text-xs text-brand-mute mb-4">
            <Link href="/" className="hover:text-brand-green">{tNav('home')}</Link>
            {' / '}
            <span className="text-brand-ink">{t('breadcrumb')}</span>
          </nav>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
            {t('heroEyebrow')}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-brand-ink leading-[1.1] max-w-3xl">
            {t('heroH1Pre')}{' '}
            <span className="text-brand-green">{t('heroH1Highlight')}</span>.
          </h1>
          <p className="mt-5 text-brand-mute leading-relaxed max-w-2xl">
            {t('heroLead')}
          </p>

          {/* Quick nav chips */}
          <div className="mt-7 flex flex-wrap gap-2">
            {MATERIALS.map((m) => (
              <a
                key={m.slug}
                href={`#${m.slug}`}
                className="inline-flex items-center rounded-full border border-brand-line bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-ink hover:border-brand-green hover:text-brand-green transition"
              >
                {m.name}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Comparison-at-a-glance table */}
      <section className="py-16 lg:py-20 border-b border-brand-line">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            {t('atGlanceEyebrow')}
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-brand-ink mb-2 leading-tight">
            {t('atGlanceTitle')}
          </h2>
          <p className="text-brand-mute mb-8">
            {t('atGlanceIntro')}
          </p>

          <div className="overflow-x-auto rounded-xl border border-brand-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-cream text-left text-[11px] uppercase tracking-wider text-brand-ink/80">
                  <th className="py-3 px-4 font-bold">{t('tHeadWood')}</th>
                  <th className="py-3 px-4 font-bold">{t('tHeadHardness')}</th>
                  <th className="py-3 px-4 font-bold">{t('tHeadWeight')}</th>
                  <th className="py-3 px-4 font-bold">{t('tHeadCost')}</th>
                  <th className="py-3 px-4 font-bold">{t('tHeadMoisture')}</th>
                  <th className="py-3 px-4 font-bold">{t('tHeadBestFor')}</th>
                </tr>
              </thead>
              <tbody>
                {MATERIALS.map((m, i) => (
                  <tr
                    key={m.slug}
                    className={`border-t border-brand-line ${i % 2 === 0 ? 'bg-white' : 'bg-brand-cream/30'}`}
                  >
                    <td className="py-3 px-4 font-bold text-brand-green">
                      <a href={`#${m.slug}`} className="hover:underline">{m.name}</a>
                    </td>
                    <td className="py-3 px-4">
                      <Stars n={m.rating.hardness} />
                    </td>
                    <td className="py-3 px-4 text-brand-mute">{m.rating.weight}</td>
                    <td className="py-3 px-4 font-bold text-brand-ink">{m.rating.cost}</td>
                    <td className="py-3 px-4 text-brand-mute">{m.rating.moisture}</td>
                    <td className="py-3 px-4 text-brand-mute text-xs">
                      {m.bestFor.slice(0, 2).join(' · ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Material profiles — alternating zigzag layout */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 space-y-20 lg:space-y-24">
          {MATERIALS.map((m, i) => (
            <MaterialBlock
              key={m.slug}
              material={m}
              flipped={i % 2 === 1}
              labels={{ keyAdvantages: t('keyAdvantages'), commonProducts: t('commonProducts'), statHardness: t('statHardness'), statCost: t('statCost'), statWeight: t('statWeight'), statMoisture: t('statMoisture') }}
            />
          ))}
        </div>
      </section>

      {/* Decision matrix */}
      <section className="bg-brand-cream py-20 lg:py-24 border-y border-brand-line">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              {t('ucEyebrow')}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
              {t('ucTitlePre')}{' '}
              <span className="text-brand-green">{t('ucTitleHighlight')}</span>.
            </h2>
            <p className="mt-4 text-brand-mute leading-relaxed">
              {t('ucIntro')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {USE_CASES.map((uc) => (
              <article key={uc.title} className="bg-white rounded-2xl border border-brand-line p-6 lg:p-7">
                <h3 className="text-lg font-extrabold text-brand-ink mb-2">
                  {uc.title}
                </h3>
                <p className="text-sm text-brand-mute leading-relaxed mb-5">
                  {uc.body}
                </p>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2">
                    <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full bg-brand-green text-white text-[10px] font-bold uppercase tracking-wider">
                      {t('ucPick')}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {uc.recommend.map((slug) => (
                        <a
                          key={slug}
                          href={`#${slug}`}
                          className="text-xs font-semibold text-brand-ink hover:text-brand-green underline-offset-2 hover:underline"
                        >
                          {NAME_BY_SLUG[slug]}
                        </a>
                      )).reduce((acc, x, idx) => idx ? [...acc, <span key={idx} className="text-brand-mute text-xs">·</span>, x] : [x], [])}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full bg-stone-200 text-brand-ink/70 text-[10px] font-bold uppercase tracking-wider">
                      {t('ucSkip')}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {uc.avoid.map((slug, idx) => (
                        <span key={slug} className="flex items-center gap-1.5">
                          {idx > 0 && <span className="text-brand-mute text-xs">·</span>}
                          <a href={`#${slug}`} className="text-xs text-brand-mute hover:text-brand-ink line-through">
                            {NAME_BY_SLUG[slug]}
                          </a>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <HardnessChart />
      <FinishesSection />
      <BrandingSection />
      <ComplianceSection />
      <CareSection />
      <SourcingChecklist />
      <MaterialFAQ />
      <RelatedArticles />

      {/* CTA */}
      <section className="py-20 lg:py-24">
        <div className="max-w-[900px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            {t('bottomCtaEyebrow')}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-ink mb-4 leading-tight">
            {t('bottomCtaTitle')}
          </h2>
          <p className="text-brand-mute leading-relaxed mb-8 max-w-2xl mx-auto">
            {t('bottomCtaBody')}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-brand-green px-8 py-3.5 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition"
            >
              {t('bottomCtaTalk')}
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-8 py-3.5 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition"
            >
              {t('bottomCtaBrowse')}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

// ───────────────────────────────────────────────────────────────────
// MaterialBlock — full profile per wood (receives translated labels via props)
// ───────────────────────────────────────────────────────────────────
function MaterialBlock({ material: m, flipped, labels }) {
  return (
    <article id={m.slug} className="scroll-mt-24">
      <div className={`grid lg:grid-cols-2 gap-10 lg:gap-14 items-center`}>
        <div className={`${flipped ? 'lg:order-2' : ''}`}>
          <div className="relative aspect-[5/4] rounded-2xl overflow-hidden bg-brand-cream border border-brand-line">
            <Image
              src={m.image}
              alt={`${m.name} wood — material sample for kitchenware`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className={`${flipped ? 'lg:order-1' : ''}`}>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            {m.rating.cost} · {m.rating.weight}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-tight mb-3">
            {m.name}
          </h2>
          <p className="text-lg text-brand-ink/80 mb-5 leading-snug">
            {m.tagline}
          </p>
          <p className="text-brand-mute leading-relaxed mb-6">
            {m.intro}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <Stat label={labels.statHardness}><Stars n={m.rating.hardness} /></Stat>
            <Stat label={labels.statCost}>{m.rating.cost}</Stat>
            <Stat label={labels.statWeight}>{m.rating.weight}</Stat>
            <Stat label={labels.statMoisture}>{m.rating.moisture}</Stat>
          </div>

          <h3 className="text-[12px] uppercase tracking-wider font-bold text-brand-green mb-2">
            {labels.keyAdvantages}
          </h3>
          <ul className="space-y-1.5 mb-6">
            {m.advantages.map((a) => (
              <li key={a} className="flex items-start gap-2 text-sm text-brand-ink/85">
                <CheckMark />
                <span>{a}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-[12px] uppercase tracking-wider font-bold text-brand-green mb-2">
            {labels.commonProducts}
          </h3>
          <div className="flex flex-wrap gap-2">
            {m.categories.map((c) => (
              <Link
                key={c.slug}
                href={`/products/${c.slug}`}
                className="inline-flex items-center rounded-full border border-brand-line bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-ink hover:border-brand-green hover:bg-brand-green hover:text-white transition"
              >
                {c.label} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function Stat({ label, children }) {
  return (
    <div className="bg-brand-cream rounded-lg px-3 py-2.5 border border-brand-line">
      <div className="text-[10px] uppercase tracking-wider font-bold text-brand-mute mb-1">{label}</div>
      <div className="text-sm font-bold text-brand-ink">{children}</div>
    </div>
  );
}

function Stars({ n }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${n} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= n ? 'text-brand-green' : 'text-brand-line'}>★</span>
      ))}
    </span>
  );
}

function CheckMark() {
  return (
    <span className="shrink-0 inline-flex h-4 w-4 mt-0.5 items-center justify-center rounded-full bg-brand-green text-white">
      <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 8.5l3 3 6-6" />
      </svg>
    </span>
  );
}

// ───────────────────────────────────────────────────────────────────
// Janka Hardness Chart — measurements are locale-neutral, notes are i18n.
// ───────────────────────────────────────────────────────────────────
function HardnessChart() {
  const t = useTranslations('materialGuide');
  // Notes mapping: index into jankaNote1..jankaNote7 (some rows have no note)
  const JANKA = [
    { name: 'Acacia',    lbf: 2200, noteKey: 'jankaNote1' },
    { name: 'Sapele',    lbf: 1410 },
    { name: 'Bamboo',    lbf: 1380, noteKey: 'jankaNote2' },
    { name: 'Oak',       lbf: 1360, noteKey: 'jankaNote3' },
    { name: 'Beech',     lbf: 1300 },
    { name: 'Teak',      lbf: 1155 },
    { name: 'Walnut',    lbf: 1010, noteKey: 'jankaNote4' },
    { name: 'Rubber',    lbf: 960 },
    { name: 'Pine',      lbf: 870,  noteKey: 'jankaNote5' },
    { name: 'Plywood',   lbf: 700,  noteKey: 'jankaNote6' },
    { name: 'MDF',       lbf: 700,  noteKey: 'jankaNote6' },
    { name: 'Paulownia', lbf: 300,  noteKey: 'jankaNote7' },
  ];
  const max = Math.max(...JANKA.map((w) => w.lbf));
  return (
    <section className="bg-white py-20 lg:py-24 border-b border-brand-line">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            {t('jankaEyebrow')}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
            {t('jankaTitlePre')}{' '}
            <span className="text-brand-green">{t('jankaTitleHighlight')}</span>
          </h2>
          <p className="mt-4 text-brand-mute leading-relaxed">
            {t('jankaIntro')}
          </p>
        </div>

        <div className="space-y-3 lg:space-y-4">
          {JANKA.map((w) => (
            <div key={w.name} className="grid grid-cols-[100px_1fr_auto] items-center gap-4">
              <div className="text-sm font-bold text-brand-ink text-right">
                {w.name}
              </div>
              <div className="relative h-7 bg-brand-cream rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-green to-brand-greenLight rounded-full"
                  style={{ width: `${(w.lbf / max) * 100}%` }}
                />
              </div>
              <div className="text-right">
                <div className="text-sm font-extrabold text-brand-ink tabular-nums">{w.lbf.toLocaleString()} lbf</div>
                {w.noteKey && <div className="text-[11px] text-brand-mute">{t(w.noteKey)}</div>}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-brand-mute italic text-center">
          {t('jankaFooter')}
          {' '}
          <a
            href="https://en.wikipedia.org/wiki/Janka_hardness_test"
            target="_blank"
            rel="noopener nofollow"
            className="not-italic font-semibold text-brand-green hover:text-brand-greenDark"
          >
            Janka hardness test (Wikipedia) ↗
          </a>
        </p>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
function FinishesSection() {
  const t = useTranslations('materialGuide');
  const FINISHES = [1, 2, 3, 4, 5, 6, 7].map(i => ({
    name: t(`finish${i}Name`),
    body: t(`finish${i}Body`),
    tag:  t(`finish${i}Tag`),
  }));
  return (
    <section className="bg-brand-cream py-20 lg:py-24 border-b border-brand-line">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            {t('finishEyebrow')}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
            {t('finishTitlePre')}{' '}
            <span className="text-brand-green">{t('finishTitleHighlight')}</span>.
          </h2>
          <p className="mt-4 text-brand-mute leading-relaxed">
            {t('finishIntro')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FINISHES.map((f) => (
            <article key={f.name} className="bg-white rounded-2xl border border-brand-line p-6 hover:border-brand-green/40 hover:shadow-sm transition">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-base font-extrabold text-brand-ink leading-snug">{f.name}</h3>
                <span className="shrink-0 inline-flex items-center rounded-full bg-brand-cream text-brand-green border border-brand-green/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  {f.tag}
                </span>
              </div>
              <p className="text-sm text-brand-mute leading-relaxed">{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
function BrandingSection() {
  const t = useTranslations('materialGuide');
  const ICONS = ['spark', 'foil', 'press', 'print', 'cmyk', 'pad', 'insert'];
  const BRANDING = [1, 2, 3, 4, 5, 6, 7].map(i => ({
    name: t(`br${i}Name`),
    body: t(`br${i}Body`),
    icon: ICONS[i - 1],
  }));
  return (
    <section className="bg-white py-20 lg:py-24 border-b border-brand-line">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            {t('brEyebrow')}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
            {t('brTitlePre')}{' '}
            <span className="text-brand-green">{t('brTitleHighlight')}</span>.
          </h2>
          <p className="mt-4 text-brand-mute leading-relaxed">
            {t('brIntro')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BRANDING.map((b) => (
            <article key={b.name} className="bg-brand-cream rounded-2xl border border-brand-line p-6 hover:border-brand-green/40 hover:shadow-sm transition">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-green border border-brand-green/15 mb-4">
                <BrandIcon name={b.icon} />
              </div>
              <h3 className="text-base font-extrabold text-brand-ink mb-2 leading-snug">{b.name}</h3>
              <p className="text-sm text-brand-mute leading-relaxed">{b.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandIcon({ name }) {
  const c = 'w-5 h-5';
  switch (name) {
    case 'spark':  return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M5 19l4-4M15 9l4-4"/></svg>;
    case 'foil':   return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 9h6v6H9z" fill="currentColor" opacity="0.3"/></svg>;
    case 'press':  return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 12h6"/></svg>;
    case 'print':  return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6z"/></svg>;
    case 'cmyk':   return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="9" r="5"/><circle cx="15" cy="9" r="5"/><circle cx="12" cy="15" r="5"/></svg>;
    case 'pad':    return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12c4-6 16-6 20 0"/><path d="M2 12c4 6 16 6 20 0"/><circle cx="12" cy="12" r="2"/></svg>;
    case 'insert': return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="14" rx="1"/><path d="M3 10h18M9 6V3M15 6V3"/></svg>;
    default: return null;
  }
}

// ───────────────────────────────────────────────────────────────────
// ComplianceSection — each certification card includes an outbound link
// to the issuing authority's official site. Goal: pass an Expertise +
// Trust signal to Google's E-E-A-T evaluators without leaking PageRank
// (rel=noopener nofollow). The link also lets buyers verify the
// standards themselves, which is real-world useful for B2B due diligence.
function ComplianceSection() {
  const t = useTranslations('materialGuide');
  const CERTS = [
    { tag: 'FSC',          authority: 'https://fsc.org/en',                                                      authorityLabel: 'fsc.org' },
    { tag: 'EU REACH',     authority: 'https://echa.europa.eu/regulations/reach/understanding-reach',           authorityLabel: 'echa.europa.eu' },
    { tag: 'CARB P2',      authority: 'https://ww2.arb.ca.gov/our-work/programs/composite-wood-products-arb',   authorityLabel: 'ww2.arb.ca.gov' },
    { tag: 'LFGB / FDA',   authority: 'https://www.fda.gov/food/food-ingredients-packaging',                    authorityLabel: 'fda.gov' },
    { tag: 'ISO 9001',     authority: 'https://www.iso.org/iso-9001-quality-management.html',                   authorityLabel: 'iso.org' },
    { tag: 'Sedex SMETA',  authority: 'https://www.sedex.com/our-services/smeta-audit/',                        authorityLabel: 'sedex.com' },
  ].map((c, i) => ({
    ...c,
    full: t(`cert${i + 1}Full`),
    body: t(`cert${i + 1}Body`),
  }));
  return (
    <section className="bg-brand-cream py-20 lg:py-24 border-b border-brand-line">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            {t('certEyebrow')}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
            {t('certTitlePre')}{' '}
            <span className="text-brand-green">{t('certTitleHighlight')}</span>.
          </h2>
          <p className="mt-4 text-brand-mute leading-relaxed">
            {t('certIntro')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTS.map((c) => (
            <article key={c.tag} className="bg-white rounded-2xl border border-brand-line p-6 hover:border-brand-green/40 hover:shadow-sm transition">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/30 text-[11px] font-extrabold tracking-wider mb-3">
                {c.tag}
              </div>
              <h3 className="text-sm font-bold text-brand-ink mb-2">{c.full}</h3>
              <p className="text-sm text-brand-mute leading-relaxed">{c.body}</p>
              <a
                href={c.authority}
                target="_blank"
                rel="noopener nofollow"
                className="inline-flex items-center gap-1 mt-3 text-[11px] font-semibold text-brand-green hover:text-brand-greenDark"
              >
                {c.authorityLabel} ↗
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
function CareSection() {
  const t = useTranslations('materialGuide');
  const CARE = [1, 2, 3, 4, 5, 6].map(i => ({
    title: t(`care${i}Title`),
    body:  t(`care${i}Body`),
  }));
  return (
    <section className="bg-white py-20 lg:py-24 border-b border-brand-line">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            {t('careEyebrow')}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
            {t('careTitlePre')}{' '}
            <span className="text-brand-green">{t('careTitleHighlight')}</span>.
          </h2>
          <p className="mt-4 text-brand-mute leading-relaxed">
            {t('careIntro')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CARE.map((c, i) => (
            <article key={c.title} className="bg-brand-cream rounded-2xl border border-brand-line p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-white text-xs font-extrabold tabular-nums">
                  {i + 1}
                </span>
                <h3 className="text-base font-bold text-brand-ink leading-snug">{c.title}</h3>
              </div>
              <p className="text-sm text-brand-mute leading-relaxed">{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
function SourcingChecklist() {
  const t = useTranslations('materialGuide');
  const CHECKLIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => t(`ck${i}`));
  return (
    <section className="bg-brand-cream py-20 lg:py-24 border-b border-brand-line">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              {t('ckEyebrow')}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.1]">
              {t('ckTitlePre')}{' '}
              <span className="text-brand-green">{t('ckTitleHighlight')}</span>.
            </h2>
            <p className="mt-5 text-brand-mute leading-relaxed">
              {t('ckIntro')}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition"
              >
                {t('ckCta')} →
              </Link>
            </div>
          </div>
          <ol className="space-y-3">
            {CHECKLIST.map((q, i) => (
              <li key={i} className="flex gap-4 bg-white rounded-xl border border-brand-line p-5 hover:border-brand-green/40 transition">
                <span className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-cream text-brand-green text-xs font-extrabold tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm text-brand-ink/90 leading-relaxed">{q}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
function MaterialFAQ() {
  const t = useTranslations('materialGuide');
  const MFAQ = [1, 2, 3, 4, 5, 6, 7, 8].map(i => ({
    q: t(`faq${i}Q`),
    a: t(`faq${i}A`),
  }));
  return (
    <section className="bg-white py-20 lg:py-24 border-b border-brand-line">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            {t('faqEyebrow')}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
            {t('faqTitlePre')}{' '}
            <span className="text-brand-green">{t('faqTitleHighlight')}</span>.
          </h2>
        </div>
        <div className="space-y-3">
          {MFAQ.map((it, i) => (
            <details key={i} className="group rounded-2xl border border-brand-line bg-white overflow-hidden open:border-brand-green/40 open:bg-brand-cream/50">
              <summary className="cursor-pointer list-none flex items-start gap-4 p-5 lg:p-6 hover:bg-brand-cream/40 transition">
                <span className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-cream text-brand-green text-xs font-extrabold tabular-nums group-open:bg-brand-green group-open:text-white transition">
                  Q{i + 1}
                </span>
                <span className="flex-1 text-base lg:text-[17px] font-bold text-brand-ink leading-snug pt-1.5">
                  {it.q}
                </span>
                <span className="shrink-0 mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-line text-brand-mute group-open:border-brand-green group-open:bg-brand-green group-open:text-white group-open:rotate-180 transition">
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l5 5 5-5" />
                  </svg>
                </span>
              </summary>
              <div className="px-5 lg:px-6 pb-6 pl-[68px] lg:pl-[80px] text-sm lg:text-[15px] text-brand-mute leading-relaxed">
                {it.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
function RelatedArticles() {
  const t = useTranslations('materialGuide');
  const KEYWORDS = ['wood', 'material', 'fsc', 'spec', 'finish', 'oem', 'sourcing', 'manufactur'];
  const related = wpPosts()
    .filter((p) => {
      const text = (p.title + ' ' + (p.excerpt || '')).toLowerCase();
      return KEYWORDS.some((k) => text.includes(k));
    })
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="bg-brand-cream py-20 lg:py-24 border-b border-brand-line">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            {t('relEyebrow')}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
            {t('relTitlePre')}{' '}
            <span className="text-brand-green">{t('relTitleHighlight')}</span>.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {related.map((p) => (
            <Link
              key={p.id}
              href={`/blog/${p.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-brand-line hover:shadow-lg transition flex flex-col"
            >
              {p.featured_image && (
                <div className="relative aspect-[16/10] bg-brand-cream overflow-hidden">
                  <Image
                    src={p.featured_image}
                    alt={p.title || 'Related article'}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-[11px] uppercase tracking-wider text-brand-mute mb-2">
                  {new Date(p.date).toLocaleDateString('en-US', {year:'numeric', month:'short', day:'numeric'})}
                </p>
                <h3
                  className="font-bold text-brand-ink group-hover:text-brand-green transition leading-snug line-clamp-3"
                  dangerouslySetInnerHTML={{__html: p.title}}
                />
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand-green group-hover:text-brand-greenDark">
                  {t('relReadArticle')} →
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition"
          >
            {t('relViewAll')} →
          </Link>
        </div>
      </div>
    </section>
  );
}
