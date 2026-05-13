// /about — fully redesigned About / Factory page.
// Structure: Hero · Stats · Video · Story · Process · Capabilities · QC · Gallery · FAQ · CTA
// Content sourced from the WP "wooden-products-factory-in-china" page.

import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';
import CaseStudies from '@/components/CaseStudies';
import { SITE } from '@/data/site-config';
import { hreflangFor } from '@/i18n/routing';
import { schemaLang } from '@/i18n/seo';

export async function generateMetadata({ params: { locale } = {} }) {
  const t = await getTranslations({ locale, namespace: 'about' });
  const title = t('metaTitle');
  const description = t('metaDesc');
  return {
    title, description,
    alternates: { canonical: `/about`, languages: hreflangFor(SITE.siteUrl, '/about') },
    openGraph: {
      type: 'website',
      url: `${SITE.siteUrl}/about`,
      title, description, siteName: SITE.company.brand,
      images: [{ url: '/CHIC%20Factory.jpg', width: 1200, height: 800, alt: t('heroImageAlt') }],
    },
  };
}

// Factory tour video — id stays locale-neutral; name/description from i18n
const VIDEO_ID = '_HKxrZ_p5-4';
const VIDEO_UPLOAD_DATE = '2026-03-15';

// ─────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────
export default function AboutPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('about');
  const tCta = useTranslations('cta');
  const tNav = useTranslations('nav');

  const STATS = [
    { n: '15+',     label: t('stat1Label') },
    { n: '60+',     label: t('stat2Label') },
    { n: '500+',    label: t('stat3Label') },
    { n: '20,000㎡', label: t('stat4Label') },
    { n: '100',     label: t('stat5Label') },
    { n: '24h',     label: t('stat6Label') },
  ];
  const PROCESS = [
    { title: t('step1Title'), body: t('step1Body') },
    { title: t('step2Title'), body: t('step2Body') },
    { title: t('step3Title'), body: t('step3Body') },
    { title: t('step4Title'), body: t('step4Body') },
    { title: t('step5Title'), body: t('step5Body') },
    { title: t('step6Title'), body: t('step6Body') },
  ];
  const CAPABILITIES = [
    { icon: 'badge',     title: t('cap1Title'), body: t('cap1Body') },
    { icon: 'grid',      title: t('cap2Title'), body: t('cap2Body') },
    { icon: 'sliders',   title: t('cap3Title'), body: t('cap3Body') },
    { icon: 'tree',      title: t('cap4Title'), body: t('cap4Body') },
    { icon: 'shield',    title: t('cap5Title'), body: t('cap5Body') },
    { icon: 'box',       title: t('cap6Title'), body: t('cap6Body') },
    { icon: 'speed',     title: t('cap7Title'), body: t('cap7Body') },
    { icon: 'handshake', title: t('cap8Title'), body: t('cap8Body') },
  ];
  const FAQ = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
    { q: t('faq5Q'), a: t('faq5A') },
    { q: t('faq6Q'), a: t('faq6A') },
    { q: t('faq7Q'), a: t('faq7A') },
    { q: t('faq8Q'), a: t('faq8A') },
  ];
  const QC_LINES = [t('qc1'), t('qc2'), t('qc3'), t('qc4'), t('qc5'), t('qc6')];
  const GALLERY = [
    { url: '/wp-images/2026/02/CHIC-Factory.jpg', alt: t('galleryAlt1') },
    { url: '/wp-images/2026/01/1-4.jpg',  alt: t('galleryAlt2') },
    { url: '/wp-images/2026/01/1-13.jpg', alt: t('galleryAlt3') },
    { url: '/wp-images/2026/01/1-3.jpg',  alt: t('galleryAlt4') },
    { url: '/wp-images/2026/01/1-7.jpg',  alt: t('galleryAlt5') },
    { url: '/wp-images/2026/01/1-6.jpg',  alt: t('galleryAlt6') },
    { url: '/wp-images/2026/01/1-8.jpg',  alt: t('galleryAlt7') },
    { url: '/wp-images/2026/01/gift-box-3.png', alt: t('galleryAlt8') },
    { url: '/wp-images/2026/01/3.jpg',    alt: t('galleryAlt9') },
    { url: '/wp-images/2026/01/bulk-packaging.jpg', alt: t('galleryAlt10') },
    { url: '/wp-images/2026/01/brown-box-19.jpg',  alt: t('galleryAlt11') },
    { url: '/wp-images/2026/01/1-14.jpg', alt: t('galleryAlt12') },
  ];

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.siteUrl}` },
      { '@type': 'ListItem', position: 2, name: t('breadcrumb') },
    ],
  };
  const aboutPageLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${SITE.siteUrl}/about#page`,
    url: `${SITE.siteUrl}/about`,
    name: t('schemaName'),
    description: t('schemaDesc'),
    inLanguage: schemaLang(locale),
    isPartOf: { '@id': `${SITE.siteUrl}/#website` },
    about: { '@id': `${SITE.siteUrl}/#organization` },
    mainEntity: { '@id': `${SITE.siteUrl}/#organization` },
    primaryImageOfPage: `${SITE.siteUrl}/CHIC%20Factory.jpg`,
    image: [
      `${SITE.siteUrl}/CHIC%20Factory.jpg`,
      `${SITE.siteUrl}/wp-images/2026/01/raw-material-warehouse.jpg`,
      `${SITE.siteUrl}/wp-images/2026/01/production.jpg`,
      `${SITE.siteUrl}/wp-images/2026/01/machine-4.jpg`,
    ],
    significantLink: [
      `${SITE.siteUrl}/products`,
      `${SITE.siteUrl}/contact`,
      `${SITE.siteUrl}/material-guide`,
    ],
  };
  const videoLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `${SITE.siteUrl}/about#video`,
    name: t('videoTitle'),
    description: t('videoDesc'),
    thumbnailUrl: [
      `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`,
      `https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`,
    ],
    uploadDate: VIDEO_UPLOAD_DATE,
    contentUrl: `https://www.youtube.com/watch?v=${VIDEO_ID}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${VIDEO_ID}`,
    publisher: { '@id': `${SITE.siteUrl}/#organization` },
    inLanguage: schemaLang(locale),
  };

  return (
    <article className="bg-white">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={aboutPageLd} />
      <JsonLd data={videoLd} />
      {/* ── Hero ── */}
      <header className="bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <nav className="text-xs text-brand-mute mb-4">
            <Link href="/" className="hover:text-brand-green">{tNav('home')}</Link>
            {' / '}
            <span className="text-brand-ink">{t('breadcrumb')}</span>
          </nav>

          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
                {t('heroEyebrow')}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-brand-ink leading-[1.1]">
                {t('heroH1Pre')}{' '}
                <span className="text-brand-green">{t('heroH1Highlight')}</span>
              </h1>
              <p className="mt-5 text-brand-mute leading-relaxed max-w-xl">
                {t('heroLead')}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition"
                >
                  {t('ctaTalk')}
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition"
                >
                  {t('ctaBrowse')}
                </Link>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-xl bg-white aspect-[5/4]">
              <img
                src="/wp-images/2026/02/CHIC-Factory.jpg"
                alt={t('heroImageAlt')}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* ── Stats strip ── */}
      <section className="bg-brand-greenDeep text-white border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-3xl lg:text-4xl font-extrabold tracking-tight">{s.n}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Factory tour video ── */}
      <section className="py-20 lg:py-24 bg-white border-b border-brand-line">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              {t('videoEyebrow')}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold tracking-tight text-brand-ink leading-[1.15]">
              {t('videoTitlePre')}{' '}
              <span className="text-brand-green">{t('videoTitleHighlight')}</span>.
            </h2>
            <p className="mt-4 text-brand-mute leading-relaxed">
              {t('videoIntro')}
            </p>
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden border border-brand-line shadow-lg bg-brand-cream">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0`}
              title={t('videoTitle')}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          <p className="mt-5 text-center text-sm text-brand-mute">
            {t('videoWatchOn')}{' '}
            <a
              href={`https://www.youtube.com/watch?v=${VIDEO_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-green hover:text-brand-greenDark"
            >
              YouTube
            </a>{' '}
            · {t('videoMoreOn')}{' '}
            <a
              href={SITE.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-green hover:text-brand-greenDark"
            >
              {t('videoChannelLink')}
            </a>
          </p>
        </div>
      </section>

      {/* ── Two-base story (Caoxian + Xiamen) ── */}
      <section className="py-20 lg:py-24 border-b border-brand-line">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              {t('basesEyebrow')}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold tracking-tight text-brand-ink leading-[1.15]">
              {t('basesTitlePre')}{' '}
              <span className="text-brand-green">{t('basesTitleHighlight')}</span>
            </h2>
            <p className="mt-4 text-brand-mute leading-relaxed">
              {t('basesIntro')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <BaseCard
              tag={t('base1Tag')}
              city={t('base1City')}
              text={t('base1Text')}
              bullets={[t('base1Bullet1'), t('base1Bullet2'), t('base1Bullet3')]}
              image="/CHIC%20Factory.jpg"
            />
            <BaseCard
              tag={t('base2Tag')}
              city={t('base2City')}
              text={t('base2Text')}
              bullets={[t('base2Bullet1'), t('base2Bullet2'), t('base2Bullet3')]}
              image="/sales%20office.jpg"
            />
          </div>
        </div>
      </section>

      {/* ── Manufacturing Process ── */}
      <section className="py-20 lg:py-24 bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              {t('processEyebrow')}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold tracking-tight text-brand-ink leading-[1.15]">
              {t('processTitlePre')}{' '}
              <span className="text-brand-green">{t('processTitleHighlight')}</span>.
            </h2>
            <p className="mt-4 text-brand-mute leading-relaxed">
              {t('processIntro')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS.map((s, i) => (
              <article
                key={s.title}
                className="bg-white rounded-2xl border border-brand-line p-7 hover:border-brand-green/40 hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-white text-sm font-extrabold tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-green">
                    {t('processStepLabel')} {i + 1}
                  </span>
                </div>
                <h3 className="text-base font-bold text-brand-ink mb-2 leading-snug">{s.title}</h3>
                <p className="text-sm text-brand-mute leading-relaxed">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="py-20 lg:py-24 border-b border-brand-line">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
                {t('capsEyebrow')}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold tracking-tight text-brand-ink leading-[1.1]">
                {t('capsTitlePre')}{' '}
                <span className="text-brand-green">{t('capsTitleHighlight')}</span>.
              </h2>
              <p className="mt-5 text-brand-mute leading-relaxed max-w-md">
                {t('capsIntro')}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {CAPABILITIES.map((c) => (
                <article
                  key={c.title}
                  className="bg-brand-cream rounded-2xl border border-brand-line p-6 hover:border-brand-green/40 hover:shadow-sm transition"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-green border border-brand-green/15 mb-4">
                    <CapIcon name={c.icon} />
                  </span>
                  <h3 className="text-base font-bold text-brand-ink mb-2 leading-snug">{c.title}</h3>
                  <p className="text-sm text-brand-mute leading-relaxed">{c.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Quality Control deep-dive ── */}
      <section className="py-20 lg:py-24 bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-[5/4]">
              <img
                src="/inspection.jpg"
                alt={t('qcImageAlt')}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
                {t('qcEyebrow')}
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.1] mb-5">
                {t('qcTitlePre')}{' '}
                <span className="text-brand-green">{t('qcTitleHighlight')}</span>{t('qcTitlePost')}
              </h2>
              <p className="text-brand-mute leading-relaxed mb-6">
                {t('qcBody')}
              </p>
              <ul className="space-y-2.5">
                {QC_LINES.map((line) => (
                  <li key={line} className="flex items-start gap-2 text-sm text-brand-ink/85">
                    <CheckBadge />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Photo gallery ── */}
      <section className="py-20 lg:py-24 border-b border-brand-line">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              {t('galleryEyebrow')}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold tracking-tight text-brand-ink leading-[1.15]">
              {t('galleryTitlePre')}{' '}
              <span className="text-brand-green">{t('galleryTitleHighlight')}</span>.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {GALLERY.map((g) => (
              <div key={g.url} className="aspect-square bg-brand-cream rounded-xl overflow-hidden border border-brand-line">
                <img src={g.url} alt={g.alt} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 lg:py-24 bg-brand-cream border-b border-brand-line">
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
            {FAQ.map((it, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-brand-line bg-white overflow-hidden open:border-brand-green/40 open:bg-brand-cream/50"
                open={i === 0}
              >
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

      {/* ── Long-term partnerships / Case studies ──
          6 anonymized case studies (US/UK/DE/CA/JP/AU) anchoring the
          Authoritativeness leg of E-E-A-T. Placed before the final CTA
          so it builds trust right where the visitor is most likely to
          convert. */}
      <CaseStudies />

      {/* ── CTA ── */}
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
              {tCta('getFreeQuote')}
            </Link>
            <Link
              href="/material-guide"
              className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-8 py-3.5 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition"
            >
              {t('bottomCtaMaterial')}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

// ── helpers ──────────────────────────────────────────────────────

function BaseCard({ tag, city, text, bullets, image }) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-brand-line">
      <div className="aspect-[16/9] bg-brand-cream overflow-hidden">
        <img src={image} alt={city} className="w-full h-full object-cover" />
      </div>
      <div className="p-7 lg:p-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-green mb-2">{tag}</p>
        <h3 className="text-2xl font-extrabold text-brand-ink mb-3">{city}</h3>
        <p className="text-sm text-brand-mute leading-relaxed mb-4">{text}</p>
        <ul className="space-y-1.5">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-brand-ink/85">
              <CheckBadge />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function CheckBadge() {
  return (
    <span className="shrink-0 inline-flex h-4 w-4 mt-0.5 items-center justify-center rounded-full bg-brand-green text-white">
      <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 8.5l3 3 6-6" />
      </svg>
    </span>
  );
}

function CapIcon({ name }) {
  const c = 'w-5 h-5';
  switch (name) {
    case 'badge':
      return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"><circle cx="12" cy="9" r="6"/><path d="M8 14l-2 8 6-3 6 3-2-8"/></svg>;
    case 'grid':
      return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
    case 'sliders':
      return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h13M4 12h7M4 18h11"/><circle cx="20" cy="6" r="2"/><circle cx="14" cy="12" r="2"/><circle cx="18" cy="18" r="2"/></svg>;
    case 'tree':
      return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"><path d="M12 2L4 12h4v8h8v-8h4z"/></svg>;
    case 'shield':
      return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>;
    case 'box':
      return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>;
    case 'speed':
      return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"><path d="M12 22a10 10 0 100-20 10 10 0 000 20z"/><path d="M12 6v6l4 2"/></svg>;
    case 'handshake':
      return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"><path d="M11 17l-3-3 5-5 4 4-2 2"/><path d="M3 11l5-5 4 4M13 13l4 4 4-4-4-4"/></svg>;
    default: return null;
  }
}
