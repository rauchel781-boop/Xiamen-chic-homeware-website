// /custom-wooden-boxes — hand-coded SEO landing page (~13k chars original).
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { buildServiceLd } from '@/lib/service-schema';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';
import { hreflangFor } from '@/i18n/routing';

const SLUG = 'custom-wooden-boxes';
const HERO_IMAGE = '/wp-images/2026/03/natural-wood-box-8.png';

const CATEGORY_DATA = [
  { image: '/wp-images/2026/01/11-1.png', href: '/products/wooden-jewelry-boxes' },
  { image: '/wp-images/2026/01/22-1.png', href: '/products/wooden-keepsake-boxes' },
  { image: '/wp-images/2026/01/33.jpg',   href: '/products/wooden-watch-boxes' },
  { image: '/wp-images/2026/01/44-1.png', href: '/products/wooden-wine-box' },
  { image: '/wp-images/2026/03/natural-wood-box-8.png', href: '/products/gift-boxes-retail-packaging' },
  { image: '/wp-images/2026/02/1-5.png', href: '/products/gift-boxes-retail-packaging' },
  { image: '/wp-images/2026/02/Portable-Artist-Sketchbox-10.png', href: '/products/gift-boxes-retail-packaging' },
  { image: '/wp-images/2026/01/55.jpg', href: '/products/wooden-tea-box' },
  { image: '/wp-images/2026/03/Face-Towel-Holder-Box-2.png', href: '/products/wooden-storage-box-with-lid' },
];
const STYLE_IMAGES = [
  '/wp-images/2026/03/image-3.png',
  '/wp-images/2026/03/Wooden-Storage-Box-7.jpg',
  '/wp-images/2026/02/ring-box-2.png',
  '/wp-images/2026/02/holder-10.jpg',
  '/wp-images/2026/01/Slim-Wooden-Double-Ring-Box-5.png',
  '/wp-images/2026/03/ScreenShot_2026-03-17_200616_970.png',
  '/wp-images/2026/02/box-design.jpg',
  '/wp-images/2026/02/1-66.jpg',
];
const MATERIAL_IMAGES = [
  '/different%20wood/acacia%20wood.png',
  '/different%20wood/pine%20wood.png',
  '/different%20wood/walnut%20wood.png',
  '/different%20wood/paulownia%20wood.png',
  '/different%20wood/teak%20wood.png',
  '/different%20wood/bamboo.png',
];

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'landing.customWoodenBoxes' });
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
      images: [{ url: '/wp-images/2026/01/11-1.png', width: 1200, height: 800, alt: ogTitle }],
      siteName: SITE.company.brand,
    },
    twitter: { card: 'summary_large_image', title: ogTitle, description },
  };
}

export default function Page({ params }) {
  unstable_setRequestLocale(params.locale);
  const t = useTranslations('landing.customWoodenBoxes');
  const tCta = useTranslations('cta');

  const CATEGORIES = CATEGORY_DATA.map((d, i) => ({
    title: t(`cat${i + 1}Title`),
    body: t(`cat${i + 1}Body`),
    image: d.image,
    href: d.href,
  }));
  const STYLES = STYLE_IMAGES.map((image, i) => ({
    title: t(`style${i + 1}Title`),
    body: t(`style${i + 1}Body`),
    image,
  }));
  const CUSTOMIZATION = [
    { title: t('custom1Title'), body: t('custom1Body') },
    { title: t('custom2Title'), body: t('custom2Body') },
    { title: t('custom3Title'), body: t('custom3Body') },
    { title: t('custom4Title'), body: t('custom4Body') },
    { title: t('custom5Title'), body: t('custom5Body') },
    { title: t('custom6Title'), body: t('custom6Body') },
  ];
  const MATERIALS = MATERIAL_IMAGES.map((image, i) => ({
    name: t(`mat${i + 1}Name`),
    body: t(`mat${i + 1}Body`),
    image,
  }));
  const PROCESS = [
    { n: '01', title: t('step1Title'), body: t('step1Body') },
    { n: '02', title: t('step2Title'), body: t('step2Body') },
    { n: '03', title: t('step3Title'), body: t('step3Body') },
    { n: '04', title: t('step4Title'), body: t('step4Body') },
  ];
  const FAQS = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
    { q: t('faq5Q'), a: t('faq5A') },
    { q: t('faq6Q'), a: t('faq6A') },
    { q: t('faq7Q'), a: t('faq7A') },
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
    serviceType: 'Custom Wooden Box Manufacturing',
    name: t('ogTitle'),
    description: t('metaDesc'),
    locale: params.locale,
    offerItems: CATEGORIES.map(c => ({ name: c.title, description: c.body, url: c.href })),
  });

  return (
    <article className="bg-white">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={faqLd} />
      <JsonLd data={serviceLd} />

      {/* HERO */}
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
                <Link href="/contact" className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition">{t('ctaPrice')}</Link>
                <Link href="/products/gift-boxes-retail-packaging" className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition">{t('ctaBrowse')}</Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] bg-white rounded-2xl overflow-hidden border border-brand-line shadow-sm">
              <Image
                src={HERO_IMAGE}
                alt={t('heroImageAlt')}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* CATEGORIES — 9 box types */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{t('catsEyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">
              {t('catsTitle')}
            </h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">
              {t('catsIntro')}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map(c => (
              <Link key={c.title} href={c.href} className="group bg-white rounded-2xl border border-brand-line overflow-hidden hover:border-brand-green/40 hover:shadow-lg transition flex flex-col">
                <div className="relative aspect-square bg-brand-cream overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-[1.03] transition duration-500"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-base font-bold text-brand-ink mb-2 leading-snug">{c.title}</h3>
                  <p className="text-sm text-brand-mute leading-relaxed flex-1">{c.body}</p>
                  <span className="mt-3 text-sm font-semibold text-brand-green group-hover:underline">{t('viewLink')} &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BOX STYLES */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{t('stylesEyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('stylesTitle')}</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">
              {t('stylesIntro')}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STYLES.map(s => (
              <article key={s.title} className="group bg-white rounded-2xl border border-brand-line overflow-hidden hover:border-brand-green/40 hover:shadow-lg transition">
                <div className="relative aspect-[4/3] bg-brand-cream overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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

      {/* CUSTOMIZATION OPTIONS */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{t('customEyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('customTitle')}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
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

      {/* MATERIALS */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{t('matsEyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('matsTitle')}</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">
              {t('matsIntro')}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MATERIALS.map(m => (
              <article key={m.name} className="group bg-white rounded-2xl border border-brand-line overflow-hidden hover:border-brand-green/40 hover:shadow-lg transition">
                <div className="relative aspect-[4/3] bg-brand-cream overflow-hidden">
                  <Image
                    src={m.image}
                    alt={`${m.name} wood`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-[1.03] transition duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-brand-ink mb-2">{m.name}</h3>
                  <p className="text-sm text-brand-mute leading-relaxed">{m.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{t('processEyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('processTitle')}</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">{t('processIntro')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS.map(s => (
              <div key={s.n} className="bg-brand-cream rounded-2xl border border-brand-line p-6 hover:border-brand-green/40 hover:shadow-md transition">
                <div className="text-3xl font-extrabold text-brand-green/30 leading-none mb-3">{s.n}</div>
                <h3 className="text-[15px] font-bold text-brand-ink mb-2 leading-snug">{s.title}</h3>
                <p className="text-[13px] text-brand-mute leading-relaxed">{s.body}</p>
              </div>
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

      {/* FINAL CTA */}
      <section className="bg-brand-green text-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-wood mb-3">{t('bottomCtaEyebrow')}</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">{t('bottomCtaTitle')}</h2>
              <p className="mt-4 text-white/85 leading-relaxed text-[16px] max-w-xl">{t('bottomCtaBody')}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/contact" className="inline-flex items-center rounded-full bg-brand-wood px-7 py-3 text-[15px] font-semibold text-brand-ink hover:bg-brand-woodSoft transition">{tCta('getFreeQuote')}</Link>
              <Link href="/wooden-box-factory-in-china" className="inline-flex items-center rounded-full border-2 border-white px-7 py-3 text-[15px] font-semibold text-white hover:bg-white hover:text-brand-green transition">{t('bottomCtaAbout')}</Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
