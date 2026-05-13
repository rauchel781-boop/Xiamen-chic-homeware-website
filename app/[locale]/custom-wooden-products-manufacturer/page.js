// /custom-wooden-products-manufacturer — hand-coded company / product overview page.
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { buildServiceLd } from '@/lib/service-schema';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';
import { hreflangFor } from '@/i18n/routing';

const SLUG = 'custom-wooden-products-manufacturer';
const HERO_IMAGE = '/wp-images/2025/12/production.jpg';

const PRODUCT_IMAGES = [
  '/wp-images/2026/02/1-7.jpg',
  '/wp-images/2026/02/1-1.jpg',
  '/wp-images/2026/02/10.jpg',
  '/wp-images/2026/02/1-4.jpg',
  '/wp-images/2026/02/1-4.png',
  '/wp-images/2026/02/1-5.jpg',
  '/wp-images/2026/02/1-5.webp',
  '/wp-images/2026/02/1-6.jpg',
];

const CATEGORY_HREFS = [
  '/products/wooden-kitchen-dining',
  '/products/storage-home-organization',
  '/products/desk-office-organizers',
  '/products/gift-boxes-retail-packaging',
  '/products/hospitality-commercial',
  '/contact',
];

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'landing.customWoodenProductsManufacturer' });
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

export default function Page({ params }) {
  unstable_setRequestLocale(params.locale);
  const t = useTranslations('landing.customWoodenProductsManufacturer');
  const tCta = useTranslations('cta');

  const REAL_PRODUCTS = PRODUCT_IMAGES.map((image, i) => ({
    title: t(`product${i + 1}`),
    image,
  }));
  const CATEGORIES = CATEGORY_HREFS.map((href, i) => ({
    title: t(`cat${i + 1}Title`),
    body: t(`cat${i + 1}Body`),
    href,
  }));
  const WHY = [
    { title: t('why1Title'), body: t('why1Body') },
    { title: t('why2Title'), body: t('why2Body') },
    { title: t('why3Title'), body: t('why3Body') },
    { title: t('why4Title'), body: t('why4Body') },
  ];
  const PROCESS = [
    { n: '01', title: t('step1Title'), body: t('step1Body') },
    { n: '02', title: t('step2Title'), body: t('step2Body') },
    { n: '03', title: t('step3Title'), body: t('step3Body') },
    { n: '04', title: t('step4Title'), body: t('step4Body') },
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
    serviceType: 'Custom Wooden Products Manufacturing',
    name: t('ogTitle'),
    description: t('metaDesc'),
    locale: params.locale,
    offerItems: CATEGORIES.map(c => ({ name: c.title, description: c.body, url: c.href })),
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
                {t('heroH1Pre')} <span className="text-brand-green">{t('heroH1Highlight')}</span> {t('heroH1Post')}
              </h1>
              <p className="mt-2 text-lg font-semibold text-brand-mute">{t('heroSubtitle')}</p>
              <p className="mt-5 text-brand-mute leading-relaxed text-[17px] max-w-xl">{t('heroLead')}</p>
              <ul className="mt-6 grid sm:grid-cols-3 gap-3">
                {[t('heroBadge1'), t('heroBadge2'), t('heroBadge3')].map(b => (
                  <li key={b} className="flex items-center gap-2 bg-white border border-brand-line rounded-full px-4 py-2 text-sm font-semibold text-brand-ink">
                    <span className="w-2 h-2 rounded-full bg-brand-green" />{b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact#form" className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition">{t('ctaStart')}</Link>
                <Link href="/products" className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition">{t('ctaViewCategories')}</Link>
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
        <div className="max-w-[820px] mx-auto px-6 lg:px-8">
          <p className="text-brand-mute leading-relaxed text-[16px] mb-4">{t('intro1')}</p>
          <p className="text-brand-mute leading-relaxed text-[16px] mb-4">{t('intro2')}</p>
          <p className="text-brand-mute leading-relaxed text-[16px]">{t('intro3')}</p>
        </div>
      </section>

      {/* REAL PRODUCTS */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{t('realProductsEyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('realProductsTitle')}</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">{t('realProductsIntro')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {REAL_PRODUCTS.map(p => (
              <article key={p.title} className="group bg-white rounded-2xl border border-brand-line overflow-hidden hover:border-brand-green/40 hover:shadow-lg transition">
                <div className="relative aspect-square bg-brand-cream overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-[1.03] transition duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-brand-ink leading-snug">{p.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{t('categoriesEyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('categoriesTitle')}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES.map((c, i) => (
              <Link key={c.title} href={c.href} className="group bg-brand-cream rounded-2xl border border-brand-line p-7 hover:border-brand-green/40 hover:shadow-md transition flex flex-col">
                <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mb-4 font-bold text-sm">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-lg font-bold text-brand-ink mb-2 leading-snug">{c.title}</h3>
                <p className="text-sm text-brand-mute leading-relaxed flex-1">{c.body}</p>
                <span className="mt-4 text-sm font-semibold text-brand-green group-hover:underline">{t('viewExamples')} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{t('whyEyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('whyTitle')}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY.map((w, i) => (
              <article key={w.title} className="bg-white rounded-2xl border border-brand-line p-7 hover:border-brand-green/40 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mb-4 font-bold text-sm">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-base font-bold text-brand-ink mb-2 leading-snug">{w.title}</h3>
                <p className="text-sm text-brand-mute leading-relaxed">{w.body}</p>
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

      <section className="bg-brand-green text-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-wood mb-3">{t('bottomCtaEyebrow')}</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">{t('bottomCtaTitle')}</h2>
              <p className="mt-4 text-white/85 leading-relaxed text-[16px] max-w-xl">{t('bottomCtaBody')}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/contact#form" className="inline-flex items-center rounded-full bg-brand-wood px-7 py-3 text-[15px] font-semibold text-brand-ink hover:bg-brand-woodSoft transition">{t('ctaStart')}</Link>
              <Link href="/about" className="inline-flex items-center rounded-full border-2 border-white px-7 py-3 text-[15px] font-semibold text-white hover:bg-white hover:text-brand-green transition">{t('bottomCtaAbout')}</Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
