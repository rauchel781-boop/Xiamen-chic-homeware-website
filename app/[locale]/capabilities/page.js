// /capabilities — high-level overview of factory capabilities.
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SITE } from '@/data/site-config';
import { hreflangFor, canonicalFor } from '@/i18n/routing';
import PageFAQ from '@/components/PageFAQ';

export async function generateMetadata({ params: { locale } = {} }) {
  const t = await getTranslations({ locale, namespace: 'capabilities' });
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: { canonical: canonicalFor(locale, '/capabilities'), languages: hreflangFor(SITE.siteUrl, '/capabilities') },
  };
}

export default function CapabilitiesPage({ params }) {
  unstable_setRequestLocale(params.locale);
  const t = useTranslations('capabilities');
  const tCta = useTranslations('cta');
  const tNav = useTranslations('nav');

  const ITEMS = [1, 2, 3, 4, 5, 6].map(i => ({
    t: t(`item${i}Title`),
    d: t(`item${i}Body`),
  }));

  return (
    <article className="bg-white">
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
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-ink leading-[1.1]">
            {t('heroH1Pre')}{' '}
            <span className="text-brand-green">{t('heroH1Highlight')}</span>
          </h1>
          <p className="mt-5 text-brand-mute leading-relaxed max-w-2xl">
            {t('heroLead')}
          </p>
        </div>
      </header>

      <section className="py-16 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ITEMS.map((c) => (
              <article
                key={c.t}
                className="bg-brand-cream rounded-2xl border border-brand-line p-6 lg:p-7 hover:border-brand-green/40 transition"
              >
                <h3 className="text-base font-bold text-brand-ink mb-2">{c.t}</h3>
                <p className="text-sm text-brand-mute leading-relaxed">{c.d}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/contact#form"
              className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition"
            >
              {tCta('getFreeQuote')}
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition"
            >
              {t('ctaAbout')}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Capabilities FAQ ── */}
      <CapabilitiesFaq />
    </article>
  );
}

function CapabilitiesFaq() {
  const t = useTranslations('pageFaqs');
  const ITEMS = [1, 2, 3, 4, 5, 6, 7].map((i) => ({
    q: t(`capabilitiesQ${i}`),
    a: t(`capabilitiesA${i}`),
  }));
  return (
    <PageFAQ
      title={t('capabilitiesTitle')}
      intro={t('capabilitiesIntro')}
      items={ITEMS}
      background="bg-brand-cream"
    />
  );
}
