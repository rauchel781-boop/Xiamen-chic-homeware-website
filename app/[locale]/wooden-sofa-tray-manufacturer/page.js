// /wooden-sofa-tray-manufacturer — hand-coded SEO landing page.
// Content extracted from the original WordPress page (4,878 chars), laid out
// with brand-consistent sections that mirror the home-page design language.
// Static route takes precedence over the [slug] catch-all.

import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';
import { buildServiceLd } from '@/lib/service-schema';
import { SITE } from '@/data/site-config';
import { hreflangFor } from '@/i18n/routing';

const SLUG = 'wooden-sofa-tray-manufacturer';
const HERO_IMAGE = '/wp-images/2026/01/13434.png';

const PRODUCT_IMAGES = [
  '/wp-images/2026/01/主图3.jpg',
  '/wp-images/2026/01/1-25.png',
  '/wp-images/2026/01/sofa-tray-2.png',
  '/wp-images/2026/01/sofa-tray-6.png',
];
const EDU_IMAGE = '/wp-images/2026/01/sofa-tray-6.png';
const MATERIAL_IMAGES = [
  '/wp-images/2026/01/11.png',
  '/wp-images/2026/01/22.png',
  '/wp-images/2026/01/44.png',
  '/wp-images/2026/01/33.png',
];
const APP_IMAGES = [
  '/wp-images/2026/01/sofa-tray.png',
  '/wp-images/2026/01/222222.png',
  '/wp-images/2026/01/3333333.png',
  '/wp-images/2026/01/444444.png',
];

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'landing.woodenSofaTray' });
  const description = t('metaDesc');
  const ogTitle = t('ogTitle');
  return {
    title: t('metaTitle'),
    description,
    alternates: { canonical: `/${SLUG}`, languages: hreflangFor(SITE.siteUrl, `/${SLUG}`) },
    openGraph: {
      type: 'website',
      url: `${SITE.siteUrl}/${SLUG}`,
      title: ogTitle,
      description,
      images: [{ url: HERO_IMAGE, width: 1200, height: 800, alt: ogTitle }],
      siteName: SITE.company.brand,
    },
    twitter: { card: 'summary_large_image', title: ogTitle, description },
  };
}

export default function WoodenSofaTrayPage({ params }) {
  unstable_setRequestLocale(params.locale);
  const t = useTranslations('landing.woodenSofaTray');
  const tCta = useTranslations('cta');

  const PRODUCT_ITEMS = PRODUCT_IMAGES.map((image, i) => ({
    title: t(`prod${i + 1}Title`),
    body: t(`prod${i + 1}Body`),
    image,
  }));
  const EDU_PARAGRAPHS = [t('eduPara1'), t('eduPara2'), t('eduPara3')];
  const WHY_ITEMS = [
    { title: t('why1Title'), body: t('why1Body') },
    { title: t('why2Title'), body: t('why2Body') },
    { title: t('why3Title'), body: t('why3Body') },
  ];
  const MATERIAL_ITEMS = MATERIAL_IMAGES.map((image, i) => ({
    name: t(`mat${i + 1}Name`),
    image,
    bestFor: t(`mat${i + 1}BestFor`),
    knowledge: t(`mat${i + 1}Knowledge`),
    benefit: t(`mat${i + 1}Benefit`),
  }));
  const APP_ITEMS = APP_IMAGES.map((image, i) => ({
    title: t(`app${i + 1}Title`),
    body: t(`app${i + 1}Body`),
    image,
  }));
  const STEPS = [
    { n: '01', title: t('step1Title'), body: t('step1Body') },
    { n: '02', title: t('step2Title'), body: t('step2Body') },
    { n: '03', title: t('step3Title'), body: t('step3Body') },
    { n: '04', title: t('step4Title'), body: t('step4Body') },
    { n: '05', title: t('step5Title'), body: t('step5Body') },
  ];
  const PROCESS_BULLETS = [t('bullet1'), t('bullet2'), t('bullet3')];
  const BREADCRUMB = [{ name: 'Home', url: '/' }, { name: t('breadcrumb') }];

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: BREADCRUMB.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url ? `${SITE.siteUrl}${c.url}` : `${SITE.siteUrl}/${SLUG}`,
    })),
  };

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Wooden Sofa Tray',
    description: t('metaDesc'),
    image: PRODUCT_ITEMS.map(it => `${SITE.siteUrl}${it.image}`),
    brand: { '@type': 'Brand', name: SITE.company.brand },
    manufacturer: { '@type': 'Organization', name: SITE.company.legalName },
  };
  const serviceLd = buildServiceLd({
    slug: SLUG,
    serviceType: 'Wooden Sofa Tray Manufacturing',
    name: t('ogTitle'),
    description: t('metaDesc'),
    locale: params.locale,
    offerItems: PRODUCT_ITEMS.map(it => ({ name: it.title, description: it.body })),
  });

  return (
    <article className="bg-white">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={productLd} />
      <JsonLd data={serviceLd} />

      {/* ─── HERO ──────────────────────────────────────────── */}
      <header className="bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <nav className="text-xs text-brand-mute mb-4">
            <Link href="/" className="hover:text-brand-green">Home</Link>
            {' / '}
            <span className="text-brand-ink">{t('breadcrumb')}</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
                {t('heroKicker')}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-brand-ink leading-[1.1]">
                {t('heroH1Pre')}{' '}
                <span className="text-brand-green">{t('heroH1Highlight')}</span>
                {' '}{t('heroH1Post')}
              </h1>
              <p className="mt-5 text-brand-mute leading-relaxed text-[17px] max-w-xl">
                {t('heroLead')}
              </p>
              <ul className="mt-6 grid sm:grid-cols-3 gap-3">
                {[t('heroBadge1'), t('heroBadge2'), t('heroBadge3')].map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-2 bg-white border border-brand-line rounded-full px-4 py-2 text-sm font-semibold text-brand-ink"
                  >
                    <span className="w-2 h-2 rounded-full bg-brand-green" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition"
                >
                  {t('ctaQuote')}
                </Link>
                <Link
                  href="/products/wooden-sofa-tray"
                  className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition"
                >
                  {t('ctaBrowse')}
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] bg-white rounded-2xl overflow-hidden border border-brand-line shadow-sm">
              <Image
                src={HERO_IMAGE}
                alt={t('heroImageAlt')}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                priority
                fetchPriority="high"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* ─── PRODUCTS ───────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              {t('productsKicker')}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">
              {t('productsTitle')}
            </h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">{t('productsLead')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCT_ITEMS.map((it) => (
              <article
                key={it.title}
                className="group bg-white rounded-2xl border border-brand-line overflow-hidden hover:border-brand-green/40 hover:shadow-lg transition"
              >
                <div className="relative aspect-square bg-brand-cream overflow-hidden">
                  <Image
                    src={it.image}
                    alt={it.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-[1.03] transition duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-brand-ink mb-2 leading-snug">
                    {it.title}
                  </h3>
                  <p className="text-sm text-brand-mute leading-relaxed">{it.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EDUCATIONAL — image left, text right ───────────── */}
      <section className="py-16 lg:py-20 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] bg-white rounded-2xl overflow-hidden border border-brand-line">
              <Image
                src={EDU_IMAGE}
                alt={t('eduImageAlt')}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
                {t('eduKicker')}
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-tight mb-5">
                {t('eduTitle')}
              </h2>
              <div className="space-y-4 text-brand-mute leading-relaxed text-[16px]">
                {EDU_PARAGRAPHS.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ──────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              {t('whyKicker')}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">
              {t('whyTitle')}
            </h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">{t('whyLead')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {WHY_ITEMS.map((it, i) => (
              <article
                key={it.title}
                className="bg-brand-cream rounded-2xl border border-brand-line p-7 hover:border-brand-green/40 hover:shadow-md transition"
              >
                <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mb-4 font-bold text-sm">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-lg font-bold text-brand-ink mb-2 leading-snug">{it.title}</h3>
                <p className="text-sm text-brand-mute leading-relaxed">{it.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MATERIALS ──────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              {t('matsKicker')}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">
              {t('matsTitle')}
            </h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">{t('matsLead')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MATERIAL_ITEMS.map((it) => (
              <article
                key={it.name}
                className="group bg-white rounded-2xl border border-brand-line overflow-hidden hover:border-brand-green/40 hover:shadow-lg transition flex flex-col"
              >
                <div className="relative aspect-square bg-brand-cream overflow-hidden">
                  <Image
                    src={it.image}
                    alt={`${it.name} sofa tray`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-[1.03] transition duration-500"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-brand-ink mb-1">{it.name}</h3>
                  <p className="text-[13px] font-semibold text-brand-green mb-3">{it.bestFor}</p>
                  <p className="text-sm text-brand-mute leading-relaxed mb-3">
                    <span className="font-semibold text-brand-ink">{t('matsKnowledgeLabel')} </span>
                    {it.knowledge}
                  </p>
                  <p className="text-sm text-brand-mute leading-relaxed">
                    <span className="font-semibold text-brand-ink">{t('matsBenefitLabel')} </span>
                    {it.benefit}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── APPLICATIONS ───────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              {t('appsKicker')}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">
              {t('appsTitle')}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {APP_ITEMS.map((it) => (
              <article
                key={it.title}
                className="group bg-brand-cream rounded-2xl overflow-hidden hover:shadow-lg transition"
              >
                <div className="relative aspect-[4/3] bg-white overflow-hidden">
                  <Image
                    src={it.image}
                    alt={it.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-[1.03] transition duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-brand-ink mb-2 leading-snug">
                    {it.title}
                  </h3>
                  <p className="text-sm text-brand-mute leading-relaxed">{it.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OEM PROCESS ────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              {t('processKicker')}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">
              {t('processTitle')}
            </h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">{t('processLead')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="bg-white rounded-2xl border border-brand-line p-6 hover:border-brand-green/40 hover:shadow-md transition"
              >
                <div className="text-3xl font-extrabold text-brand-green/30 leading-none mb-3">
                  {s.n}
                </div>
                <h3 className="text-[15px] font-bold text-brand-ink mb-2 leading-snug">{s.title}</h3>
                <p className="text-[13px] text-brand-mute leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {PROCESS_BULLETS.map((b) => (
              <div
                key={b}
                className="flex items-center gap-3 bg-white border border-brand-line rounded-xl px-4 py-3 text-sm font-semibold text-brand-ink"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-brand-green flex-shrink-0"
                >
                  <path
                    d="M3 8.5l3.5 3.5L13 5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {b}
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-brand-green px-8 py-3.5 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition"
            >
              {t('sampleCta')}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ──────────────────────────────────────── */}
      <section className="bg-brand-green text-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-wood mb-3">
                {t('bottomCtaEyebrow')}
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                {t('bottomCtaTitle')}
              </h2>
              <p className="mt-4 text-white/85 leading-relaxed text-[16px] max-w-xl">
                {t('bottomCtaBody')}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-brand-wood px-7 py-3 text-[15px] font-semibold text-brand-ink hover:bg-brand-woodSoft transition"
              >
                {tCta('getFreeQuote')}
              </Link>
              <Link
                href="/products/wooden-sofa-tray"
                className="inline-flex items-center rounded-full border-2 border-white px-7 py-3 text-[15px] font-semibold text-white hover:bg-white hover:text-brand-green transition"
              >
                {t('bottomCtaView')} →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
