// /wholesale-wooden-serving-trays — hand-coded SEO landing page.
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { buildServiceLd } from '@/lib/service-schema';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';
import { hreflangFor, canonicalFor } from '@/i18n/routing';

const SLUG = 'wholesale-wooden-serving-trays';
const HERO_IMAGE = '/wp-images/2026/02/1-1.jpg';

const MATERIAL_IMAGES = [
  '/different%20wood/acacia%20wood.png',
  '/different%20wood/bamboo.png',
  '/different%20wood/walnut%20wood.png',
  '/different%20wood/rubber%20wood.png',
];
const DESIGN_IMAGES = [
  '/wp-images/2026/02/1-4.jpg',
  '/wp-images/2026/02/1-5.jpg',
  '/wp-images/2026/02/1-4.png',
  '/wp-images/2026/02/1-1.jpg',
];

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'landing.wholesaleServingTrays' });
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
  const t = useTranslations('landing.wholesaleServingTrays');
  const tCta = useTranslations('cta');

  const MATERIALS = MATERIAL_IMAGES.map((image, i) => ({
    name: t(`mat${i + 1}Name`),
    label: t(`mat${i + 1}Label`),
    body: t(`mat${i + 1}Body`),
    image,
  }));
  const QUALITY = [
    { title: t('quality1Title'), body: t('quality1Body') },
    { title: t('quality2Title'), body: t('quality2Body') },
    { title: t('quality3Title'), body: t('quality3Body') },
  ];
  const DESIGNS = DESIGN_IMAGES.map((image, i) => ({
    title: t(`design${i + 1}Title`),
    body: t(`design${i + 1}Body`),
    image,
  }));
  const CUSTOMIZATION = [
    { title: t('custom1Title'), body: t('custom1Body') },
    { title: t('custom2Title'), body: t('custom2Body') },
    { title: t('custom3Title'), body: t('custom3Body') },
  ];
  const FAQS = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
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
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  const serviceLd = buildServiceLd({
    slug: SLUG,
    serviceType: 'Wholesale Wooden Serving Tray Manufacturing',
    name: t('ogTitle'),
    description: t('metaDesc'),
    locale: params.locale,
    offerItems: DESIGNS.map(d => ({ name: d.title, description: d.body })),
  });

  return (
    <article className="bg-white">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={faqLd} />
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
                {t('heroH1Pre')} <span className="text-brand-green">{t('heroH1Highlight')}</span> {t('heroH1Post')}
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
                <Link href="/contact#form" className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition">{t('ctaPrice')}</Link>
                <Link href="/products" className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition">{t('ctaBrowse')}</Link>
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
          <p className="text-brand-mute leading-relaxed text-[16px] mb-3">{t('introBody1')}</p>
          <p className="text-brand-mute leading-relaxed text-[16px]">{t('introBody2')}</p>
        </div>
      </section>

      {/* MATERIALS */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{t('materialsEyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('materialsTitle')}</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">{t('materialsIntro')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MATERIALS.map(m => (
              <article key={m.name} className="group bg-white rounded-2xl border border-brand-line overflow-hidden hover:border-brand-green/40 hover:shadow-lg transition flex flex-col">
                <div className="relative aspect-square bg-brand-cream overflow-hidden">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-[1.03] transition duration-500"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green mb-1">{m.label}</p>
                  <h3 className="text-lg font-bold text-brand-ink mb-2">{m.name}</h3>
                  <p className="text-sm text-brand-mute leading-relaxed flex-1">{m.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY INSIGHTS */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{t('qualityEyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('qualityTitle')}</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">{t('qualityIntro')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {QUALITY.map((q, i) => (
              <article key={q.title} className="bg-brand-cream rounded-2xl border border-brand-line p-7 hover:border-brand-green/40 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mb-4 font-bold text-sm">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-lg font-bold text-brand-ink mb-2 leading-snug">{q.title}</h3>
                <p className="text-sm text-brand-mute leading-relaxed">{q.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DESIGNS */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{t('designsEyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('designsTitle')}</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">{t('designsIntro')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DESIGNS.map(d => (
              <article key={d.title} className="group bg-white rounded-2xl border border-brand-line overflow-hidden hover:border-brand-green/40 hover:shadow-lg transition">
                <div className="relative aspect-[4/3] bg-brand-cream overflow-hidden">
                  <Image
                    src={d.image}
                    alt={d.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-[1.03] transition duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-brand-ink mb-2 leading-snug">{d.title}</h3>
                  <p className="text-sm text-brand-mute leading-relaxed">{d.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMIZATION */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{t('customEyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('customTitle')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {CUSTOMIZATION.map((c, i) => (
              <article key={c.title} className="bg-brand-cream rounded-2xl border border-brand-line p-7 hover:border-brand-green/40 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mb-4 font-bold text-sm">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-lg font-bold text-brand-ink mb-2 leading-snug">{c.title}</h3>
                <p className="text-sm text-brand-mute leading-relaxed">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[820px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{t('faqEyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('faqTitle')}</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-brand-line hover:border-brand-green/40 transition overflow-hidden">
                <summary className="flex items-start justify-between cursor-pointer p-5 lg:p-6 gap-4 list-none">
                  <span className="font-semibold text-brand-ink leading-snug">{f.q}</span>
                  <span className="shrink-0 w-7 h-7 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center text-sm font-bold transition group-open:bg-brand-green group-open:text-white group-open:rotate-45">+</span>
                </summary>
                <div className="px-5 lg:px-6 pb-5 lg:pb-6 -mt-1 text-brand-mute leading-relaxed text-[15px]">{f.a}</div>
              </details>
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
              <Link href="/products" className="inline-flex items-center rounded-full border-2 border-white px-7 py-3 text-[15px] font-semibold text-white hover:bg-white hover:text-brand-green transition">{t('ctaBrowse')}</Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
