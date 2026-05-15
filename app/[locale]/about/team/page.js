// /about/team — Meet the Team page.
//
// Renders 5 named individuals (founder + 4 department leads) with photos,
// roles, and bios. Each person is also emitted as a Schema.org Person
// entity inside the page's JSON-LD so search engines can recognize the
// site as having real, named authors — a core E-E-A-T signal.

import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';
import PageFAQ from '@/components/PageFAQ';
import { SITE } from '@/data/site-config';
import { hreflangFor, canonicalFor } from '@/i18n/routing';
import { schemaLang } from '@/i18n/seo';

export async function generateMetadata({ params: { locale } = {} }) {
  const t = await getTranslations({ locale, namespace: 'team' });
  const title = t('metaTitle');
  const description = t('metaDesc');
  return {
    title,
    description,
    alternates: { canonical: canonicalFor(locale, '/about/team'), languages: hreflangFor(SITE.siteUrl, '/about/team') },
    openGraph: {
      type: 'website',
      url: `${SITE.siteUrl}/about/team`,
      title,
      description,
      siteName: SITE.company.brand,
    },
  };
}

export default function TeamPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const t   = useTranslations('team');
  const tNav = useTranslations('nav');

  // Build localized team data from site-config + i18n bio keys.
  const TEAM = SITE.team.map((m) => ({
    ...m,
    role: t(m.roleKey),
    bio:  t(m.bioKey),
  }));

  // Breadcrumb JSON-LD
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',  item: SITE.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE.siteUrl}/about` },
      { '@type': 'ListItem', position: 3, name: t('breadcrumb') },
    ],
  };

  // Emit each team member as a Schema.org Person tied to the Organization.
  // This is the E-E-A-T signal we're paying for: real, named people behind
  // the site, with affiliation to the company entity.
  const peopleLd = TEAM.map((m) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE.siteUrl}/about/team#${m.slug}`,
    name: m.name,
    jobTitle: m.role,
    description: m.bio,
    image: `${SITE.siteUrl}${m.photo}`,
    worksFor: { '@id': `${SITE.siteUrl}/#organization` },
    inLanguage: schemaLang(locale),
  }));

  return (
    <article className="bg-white">
      <JsonLd data={breadcrumbLd} />
      {peopleLd.map((p) => <JsonLd key={p['@id']} data={p} />)}

      {/* Hero */}
      <header className="bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <nav className="text-xs text-brand-mute mb-4">
            <Link href="/" className="hover:text-brand-green">{tNav('home')}</Link>
            {' / '}
            <Link href="/about" className="hover:text-brand-green">{tNav('about')}</Link>
            {' / '}
            <span className="text-brand-ink">{t('breadcrumb')}</span>
          </nav>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
            {t('pageEyebrow')}
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-ink leading-tight max-w-3xl">
            {t('pageTitle')}
          </h1>
          <p className="mt-6 text-[17px] text-brand-ink/85 leading-relaxed max-w-2xl">
            {t('pageIntro')}
          </p>
        </div>
      </header>

      {/* Team grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {TEAM.map((m, i) => (
              <article
                key={m.slug}
                id={m.slug}
                className={`bg-brand-cream rounded-2xl border border-brand-line overflow-hidden hover:shadow-lg hover:border-brand-green/40 transition ${
                  i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="relative aspect-square bg-white overflow-hidden">
                  <Image
                    src={m.photo}
                    alt={`${m.name} — ${m.role}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 lg:p-7">
                  <h2 className="text-xl font-extrabold text-brand-ink leading-tight">
                    {m.name}
                  </h2>
                  <p className="text-sm font-semibold text-brand-green uppercase tracking-wider mt-1">
                    {m.role}
                  </p>
                  <p className="mt-4 text-[15px] text-brand-ink/85 leading-relaxed">
                    {m.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team FAQ ──
          5 Q&As specifically about communication, languages, founder
          access and working hours. Distinct from /contact FAQ. */}
      <TeamFaq />
    </article>
  );
}

function TeamFaq() {
  const t = useTranslations('pageFaqs');
  const ITEMS = [1, 2, 3, 4, 5].map((i) => ({
    q: t(`teamQ${i}`),
    a: t(`teamA${i}`),
  }));
  return (
    <PageFAQ
      title={t('teamTitle')}
      intro={t('teamIntro')}
      items={ITEMS}
      background="bg-brand-cream"
    />
  );
}
