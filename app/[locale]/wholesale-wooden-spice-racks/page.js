// /wholesale-wooden-spice-racks — hand-coded SEO landing page (small, ~800 chars original).
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';
import { hreflangFor, canonicalFor } from '@/i18n/routing';
import { buildServiceLd } from '@/lib/service-schema';

const SLUG = 'wholesale-wooden-spice-racks';
const HERO_IMAGE = '/wp-images/2026/04/ScreenShot_2026-04-09_180610_619.png';
const STYLE_IMAGES = [
  '/wp-images/2026/04/countertop-spice-rack.png',
  '/wp-images/2026/04/ScreenShot_2026-04-09_182057_064.png',
  '/wp-images/2026/04/ScreenShot_2026-04-09_182849_375.png',
  '/wp-images/2026/04/ScreenShot_2026-04-09_183921_196.png',
];

// Per-locale metadata. Title / description / OG strings are pulled from
// messages/{locale}.json via getTranslations so non-EN versions show in
// localized SERPs with the right meta tags (not English).
export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'landing.wholesaleSpiceRacks' });
  const description = t('metaDesc');
  const ogTitle = t('ogTitle');
  return {
    title: t('metaTitle'),
    description,
    alternates: { canonical: canonicalFor(locale, `/${SLUG}`), languages: hreflangFor(SITE.siteUrl, `/${SLUG}`) },
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

export default function Page({ params }) {
  unstable_setRequestLocale(params.locale);
  const t = useTranslations('landing.wholesaleSpiceRacks');
  const tCta = useTranslations('cta');

  const STYLES = [
    { title: t('style1Title'), body: t('style1Body'), image: STYLE_IMAGES[0] },
    { title: t('style2Title'), body: t('style2Body'), image: STYLE_IMAGES[1] },
    { title: t('style3Title'), body: t('style3Body'), image: STYLE_IMAGES[2] },
    { title: t('style4Title'), body: t('style4Body'), image: STYLE_IMAGES[3] },
  ];
  const REASONS = [
    { title: t('reason1Title'), body: t('reason1Body') },
    { title: t('reason2Title'), body: t('reason2Body') },
    { title: t('reason3Title'), body: t('reason3Body') },
  ];
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
  const serviceLd = buildServiceLd({
    slug: SLUG,
    serviceType: 'Wholesale Wooden Spice Rack Supply',
    name: t('ogTitle'),
    description: t('metaDesc'),
    locale: params.locale,
    offerItems: STYLES.map(s => ({ name: s.title, description: s.body })),
  });

  return (
    <article className="bg-white">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={serviceLd} />

      <header className="bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <nav className="text-xs text-brand-mute mb-4">
            <Link href="/" className="hover:text-brand-green">Home</Link>{' / '}
            <span className="text-brand-ink">{t('breadcrumb')}</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">{t('heroKicker')}</p>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-brand-ink leading-[1.1]">
                {t('heroH1Pre')} <span className="text-brand-green">{t('heroH1Highlight')}</span>
              </h1>
              <p className="mt-5 text-brand-mute leading-relaxed text-[17px] max-w-xl">{t('heroLead')}</p>
              <ul className="mt-6 grid sm:grid-cols-3 gap-3">
                {[t('heroBadge1'), t('heroBadge2'), t('heroBadge3')].map(b => (
                  <li key={b} className="flex items-center gap-2 bg-white border border-brand-line rounded-full px-4 py-2 text-sm font-semibold text-brand-ink">
                    <span className="w-2 h-2 rounded-full bg-brand-green" />{b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact#form" className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition">{t('heroCtaPrice')}</Link>
                <Link href="/custom-wooden-spice-rack" className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition">{t('heroCtaOEM')}</Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] bg-white rounded-2xl overflow-hidden border border-brand-line shadow-sm">
              <Image
                src={HERO_IMAGE}
                alt={t('ogTitle')}
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

      {/* INTRO */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[820px] mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-ink leading-tight mb-4">
            {t('introTitle')}
          </h2>
          <p className="text-brand-mute leading-relaxed text-[16px]">
            {t('introBody')}
          </p>
        </div>
      </section>

      {/* STYLES */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{t('stylesEyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">
              {t('stylesTitle')}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STYLES.map(s => (
              <article key={s.title} className="group bg-white rounded-2xl border border-brand-line overflow-hidden hover:border-brand-green/40 hover:shadow-lg transition">
                <div className="relative aspect-[4/3] bg-brand-cream overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-[1.03] transition duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-brand-ink mb-2 leading-snug">{s.title}</h3>
                  <p className="text-sm text-brand-mute leading-relaxed">{s.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{t('reasonsEyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('reasonsTitle')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {REASONS.map((r, i) => (
              <article key={r.title} className="bg-brand-cream rounded-2xl border border-brand-line p-7 hover:border-brand-green/40 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mb-4 font-bold text-sm">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-lg font-bold text-brand-ink mb-2 leading-snug">{r.title}</h3>
                <p className="text-sm text-brand-mute leading-relaxed">{r.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-green text-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-wood mb-3">{t('bottomCtaEyebrow')}</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">{t('bottomCtaTitle')}</h2>
              <p className="mt-4 text-white/85 leading-relaxed text-[16px] max-w-xl">{t('bottomCtaBody')}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/contact#form" className="inline-flex items-center rounded-full bg-brand-wood px-7 py-3 text-[15px] font-semibold text-brand-ink hover:bg-brand-woodSoft transition">{tCta('getFreeQuote')}</Link>
              <Link href="/custom-wooden-spice-rack" className="inline-flex items-center rounded-full border-2 border-white px-7 py-3 text-[15px] font-semibold text-white hover:bg-white hover:text-brand-green transition">{t('heroCtaOEM')}</Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
