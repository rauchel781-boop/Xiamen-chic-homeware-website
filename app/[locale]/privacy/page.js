// /privacy — Privacy Policy page.
// Plain prose page rendering 13 numbered sections from the `privacy`
// i18n namespace. No interactive elements; no JSON-LD beyond what the
// root layout already emits (Organization + WebSite).

import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { SITE } from '@/data/site-config';
import { hreflangFor, canonicalFor, routing } from '@/i18n/routing';

export async function generateMetadata({ params: { locale } = {} }) {
  const t = await getTranslations({ locale, namespace: 'privacy' });
  const title = t('metaTitle');
  const description = t('metaDesc');
  return {
    title,
    description,
    alternates: { canonical: canonicalFor(locale, '/privacy'), languages: hreflangFor(SITE.siteUrl, '/privacy') },
    openGraph: {
      type: 'website',
      url: `${SITE.siteUrl}/privacy`,
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

export default function PrivacyPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('privacy');
  const isTranslated = locale !== routing.defaultLocale;

  // Sections that are pure prose (title + body paragraph).
  const PROSE_SECTIONS = [1, 4, 6, 7, 10, 11, 12, 13];
  // Section 8 is a short list (4 items) following an implicit intro.
  // Section 9 has an intro + 7 bullets + outro.
  // Section 2/3/5 have intro + bullets (5/6/5).

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
        {/* Section 1 — Who we are */}
        <Section title={t('s1Title')}>
          <p>{t('s1Body')}</p>
        </Section>

        {/* Section 2 — Information we collect */}
        <Section title={t('s2Title')}>
          <p>{t('s2Intro')}</p>
          <ul>
            <li>{t('s2L1')}</li>
            <li>{t('s2L2')}</li>
            <li>{t('s2L3')}</li>
            <li>{t('s2L4')}</li>
            <li>{t('s2L5')}</li>
          </ul>
        </Section>

        {/* Section 3 — How we use your information */}
        <Section title={t('s3Title')}>
          <p>{t('s3Intro')}</p>
          <ul>
            <li>{t('s3L1')}</li>
            <li>{t('s3L2')}</li>
            <li>{t('s3L3')}</li>
            <li>{t('s3L4')}</li>
            <li>{t('s3L5')}</li>
            <li>{t('s3L6')}</li>
          </ul>
        </Section>

        {/* Section 4 — Legal basis */}
        <Section title={t('s4Title')}>
          <p>{t('s4Body')}</p>
        </Section>

        {/* Section 5 — Third parties */}
        <Section title={t('s5Title')}>
          <p>{t('s5Intro')}</p>
          <ul>
            <li>{t('s5L1')}</li>
            <li>{t('s5L2')}</li>
            <li>{t('s5L3')}</li>
            <li>{t('s5L4')}</li>
            <li>{t('s5L5')}</li>
          </ul>
          <p>{t('s5Outro')}</p>
        </Section>

        {/* Section 6 — Cookies */}
        <Section title={t('s6Title')}>
          <p>{t('s6Body')}</p>
        </Section>

        {/* Section 7 — International transfers */}
        <Section title={t('s7Title')}>
          <p>{t('s7Body')}</p>
        </Section>

        {/* Section 8 — Retention */}
        <Section title={t('s8Title')}>
          <ul>
            <li>{t('s8L1')}</li>
            <li>{t('s8L2')}</li>
            <li>{t('s8L3')}</li>
            <li>{t('s8L4')}</li>
          </ul>
        </Section>

        {/* Section 9 — Your rights */}
        <Section title={t('s9Title')}>
          <p>{t('s9Intro')}</p>
          <ul>
            <li>{t('s9L1')}</li>
            <li>{t('s9L2')}</li>
            <li>{t('s9L3')}</li>
            <li>{t('s9L4')}</li>
            <li>{t('s9L5')}</li>
            <li>{t('s9L6')}</li>
            <li>{t('s9L7')}</li>
          </ul>
          <p>{t('s9Outro')}</p>
        </Section>

        {/* Section 10 — Children */}
        <Section title={t('s10Title')}>
          <p>{t('s10Body')}</p>
        </Section>

        {/* Section 11 — Security */}
        <Section title={t('s11Title')}>
          <p>{t('s11Body')}</p>
        </Section>

        {/* Section 12 — Changes */}
        <Section title={t('s12Title')}>
          <p>{t('s12Body')}</p>
        </Section>

        {/* Section 13 — Contact */}
        <Section title={t('s13Title')}>
          <p>{t('s13Body')}</p>
        </Section>
      </div>
    </article>
  );
}

// Shared prose section component for both /privacy and /terms.
// Renders h2 + a `prose` div that styles its child <p> and <ul> nicely.
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
