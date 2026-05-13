// /wooden-box-factory-in-china — hand-coded factory positioning landing page.
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { buildServiceLd } from '@/lib/service-schema';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';
import { hreflangFor } from '@/i18n/routing';

const SLUG = 'wooden-box-factory-in-china';
const HERO_IMAGE = '/wp-images/2026/02/CHIC-Factory.jpg';

const PHOTO_SRCS = [
  '/wp-images/2026/02/CHIC-Factory.jpg',
  '/wp-images/2026/02/1-65.jpg',
  '/wp-images/2026/02/1-56.jpg',
];
const PROCESS_IMAGES = [
  '/wp-images/2026/02/1-1-1.jpg',
  '/wp-images/2026/02/1-56.jpg',
  '/wp-images/2026/02/1-16.jpg',
  '/wp-images/2026/02/different-logo-effect-on-wood.jpg',
  '/wp-images/2026/02/1-60.jpg',
];
const BOX_CAT_DATA = [
  { image: '/wp-images/2026/01/jewelry-box-1-1.png', href: '/products/wooden-jewelry-boxes' },
  { image: '/wp-images/2026/01/33.jpg',              href: '/products/wooden-watch-boxes' },
  { image: '/wp-images/2026/01/55.jpg',              href: '/products/wooden-tea-box' },
  { image: '/wp-images/2026/02/wooden-box-1.jpg',    href: '/products/wooden-storage-box-with-lid' },
];

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'landing.woodenBoxFactory' });
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
  const t = useTranslations('landing.woodenBoxFactory');
  const tCta = useTranslations('cta');

  const FACTORY_PHOTOS = PHOTO_SRCS.map((src, i) => ({
    src,
    alt: t(`photo${i + 1}Alt`),
  }));
  const CAPABILITIES = [
    { title: t('cap1Title'), body: t('cap1Body') },
    { title: t('cap2Title'), body: t('cap2Body') },
    { title: t('cap3Title'), body: t('cap3Body') },
    { title: t('cap4Title'), body: t('cap4Body') },
  ];
  const PROCESS = PROCESS_IMAGES.map((image, i) => ({
    n: String(i + 1).padStart(2, '0'),
    title: t(`step${i + 1}Title`),
    body: t(`step${i + 1}Body`),
    image,
  }));
  const WHY = [
    { title: t('why1Title'), body: t('why1Body') },
    { title: t('why2Title'), body: t('why2Body') },
    { title: t('why3Title'), body: t('why3Body') },
    { title: t('why4Title'), body: t('why4Body') },
    { title: t('why5Title'), body: t('why5Body') },
  ];
  const QC_CHECKLIST = [t('qc1'), t('qc2'), t('qc3'), t('qc4'), t('qc5')];
  const CAPABILITIES_LIST = BOX_CAT_DATA.map((d, i) => ({
    title: t(`boxCat${i + 1}Title`),
    body: t(`boxCat${i + 1}Body`),
    image: d.image,
    href: d.href,
  }));
  const FAQS = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
    { q: t('faq5Q'), a: t('faq5A') },
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
    serviceType: 'Wooden Box Manufacturing',
    name: t('ogTitle'),
    description: t('metaDesc'),
    locale: params.locale,
    offerItems: CAPABILITIES_LIST.map(c => ({ name: c.title, description: c.body, url: c.href })),
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
                <Link href="/contact" className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition">{t('ctaQuote')}</Link>
                <Link href="/about" className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition">{t('ctaAbout')}</Link>
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

      {/* WHO WE ARE - Factory Photos */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{t('whoEyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('whoTitle')}</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">{t('whoIntro')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {FACTORY_PHOTOS.map(p => (
              <div key={p.src} className="relative aspect-[4/3] bg-brand-cream rounded-2xl overflow-hidden border border-brand-line">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES — 4 cards */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{t('capsEyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('capsTitle')}</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">{t('capsIntro')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CAPABILITIES.map((c, i) => (
              <article key={c.title} className="bg-white rounded-2xl border border-brand-line p-7 hover:border-brand-green/40 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mb-4 font-bold text-sm">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-base font-bold text-brand-ink mb-2 leading-snug">{c.title}</h3>
                <p className="text-sm text-brand-mute leading-relaxed">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MANUFACTURING PROCESS - 5 steps with images */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{t('processEyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('processTitle')}</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">{t('processIntro')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {PROCESS.map(s => (
              <div key={s.n} className="bg-white rounded-2xl border border-brand-line overflow-hidden hover:border-brand-green/40 hover:shadow-md transition">
                <div className="relative aspect-[4/3] bg-brand-cream overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="text-2xl font-extrabold text-brand-green/40 leading-none mb-2">{s.n}</div>
                  <h3 className="text-[14px] font-bold text-brand-ink mb-2 leading-snug">{s.title}</h3>
                  <p className="text-[13px] text-brand-mute leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY WORK DIRECTLY */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{t('whyEyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('whyTitle')}</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">{t('whyIntro')}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY.map((w, i) => (
              <article key={w.title} className="bg-white rounded-2xl border border-brand-line p-7 hover:border-brand-green/40 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mb-4 font-bold text-sm">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-lg font-bold text-brand-ink mb-2 leading-snug">{w.title}</h3>
                <p className="text-sm text-brand-mute leading-relaxed">{w.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY CONTROL */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] bg-brand-cream rounded-2xl overflow-hidden border border-brand-line">
              <Image
                src="/wp-images/2026/02/inspection-2.jpg"
                alt={t('qcImageAlt')}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{t('qcEyebrow')}</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-tight mb-5">
                {t('qcTitle')}
              </h2>
              <p className="text-brand-mute leading-relaxed text-[16px] mb-5">
                {t('qcIntro')}
              </p>
              <ul className="space-y-3">
                {QC_CHECKLIST.map(item => (
                  <li key={item} className="flex items-start gap-3 text-brand-ink">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="text-brand-green flex-shrink-0 mt-0.5">
                      <circle cx="8" cy="8" r="8" fill="#E8F0EA" />
                      <path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* MANUFACTURING CAPABILITIES — 4 product types */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{t('boxCatsEyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('boxCatsTitle')}</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">{t('boxCatsIntro')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAPABILITIES_LIST.map(c => (
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[820px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{t('faqEyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('faqTitle')}</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <details key={i} className="group bg-brand-cream rounded-2xl border border-brand-line hover:border-brand-green/40 transition overflow-hidden">
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
              <Link href="/contact" className="inline-flex items-center rounded-full bg-brand-wood px-7 py-3 text-[15px] font-semibold text-brand-ink hover:bg-brand-woodSoft transition">{t('ctaQuote')}</Link>
              <Link href="/custom-wooden-boxes" className="inline-flex items-center rounded-full border-2 border-white px-7 py-3 text-[15px] font-semibold text-white hover:bg-white hover:text-brand-green transition">{t('bottomCtaView')}</Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
