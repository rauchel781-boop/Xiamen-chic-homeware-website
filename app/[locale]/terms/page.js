// /terms — Terms of Service page.
// Plain prose page rendering 13 numbered sections from the `terms`
// i18n namespace. Same structure as /privacy.

import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { SITE } from '@/data/site-config';
import { hreflangFor, routing } from '@/i18n/routing';

export async function generateMetadata({ params: { locale } = {} }) {
  const t = await getTranslations({ locale, namespace: 'terms' });
  const title = t('metaTitle');
  const description = t('metaDesc');
  return {
    title,
    description,
    alternates: { canonical: '/terms', languages: hreflangFor(SITE.siteUrl, '/terms') },
    openGraph: {
      type: 'website',
      url: `${SITE.siteUrl}/terms`,
      title,
      description,
      siteName: SITE.company.brand,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function TermsPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('terms');
  const isTranslated = locale !== routing.defaultLocale;

  return (
    <article className="bg-white">
      <header className="bg-brand-cream border-b border-brand-line">
        <div className="max-w-[820px] mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
            {t('lastUpdatedLabel')} {t('lastUpdatedDate')}
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-ink leading-tight">
            {t('pageTitle')}
          </h1>
          {isTranslated && (
            <p className="mt-6 text-sm text-brand-mute italic border-l-2 border-brand-green/40 pl-4">
              {t('translationNote')}
            </p>
          )}
          <p className="mt-6 text-[17px] text-brand-ink/85 leading-relaxed">
            {t('intro')}
          </p>
        </div>
      </header>

      <div className="max-w-[820px] mx-auto px-6 lg:px-8 py-14 lg:py-20 space-y-12">
        <Section title={t('s1Title')}>
          <p>{t('s1Body')}</p>
        </Section>

        <Section title={t('s2Title')}>
          <p>{t('s2Body')}</p>
        </Section>

        <Section title={t('s3Title')}>
          <p>{t('s3Body')}</p>
        </Section>

        <Section title={t('s4Title')}>
          <p>{t('s4Body')}</p>
        </Section>

        <Section title={t('s5Title')}>
          <p>{t('s5Intro')}</p>
          <ul>
            <li>{t('s5L1')}</li>
            <li>{t('s5L2')}</li>
            <li>{t('s5L3')}</li>
            <li>{t('s5L4')}</li>
            <li>{t('s5L5')}</li>
            <li>{t('s5L6')}</li>
            <li>{t('s5L7')}</li>
          </ul>
        </Section>

        <Section title={t('s6Title')}>
          <p>{t('s6Body')}</p>
        </Section>

        <Section title={t('s7Title')}>
          <p>{t('s7Body')}</p>
        </Section>

        <Section title={t('s8Title')}>
          <p>{t('s8Body')}</p>
        </Section>

        <Section title={t('s9Title')}>
          <p>{t('s9Body')}</p>
        </Section>

        <Section title={t('s10Title')}>
          <p>{t('s10Body')}</p>
        </Section>

        <Section title={t('s11Title')}>
          <p>{t('s11Body')}</p>
        </Section>

        <Section title={t('s12Title')}>
          <p>{t('s12Body')}</p>
        </Section>

        <Section title={t('s13Title')}>
          <p>{t('s13Body')}</p>
        </Section>
      </div>
    </article>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-ink leading-tight mb-5">
        {title}
      </h2>
      <div className="prose-legal text-[16px] text-brand-ink/85 leading-relaxed space-y-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2">
        {children}
      </div>
    </section>
  );
}
