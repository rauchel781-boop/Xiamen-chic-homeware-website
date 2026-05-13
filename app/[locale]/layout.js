import { NextIntlClientProvider } from 'next-intl';
import { unstable_setRequestLocale, getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Plus_Jakarta_Sans, Fraunces } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingChat from '@/components/FloatingChat';
import JsonLd from '@/components/JsonLd';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import MicrosoftClarity from '@/components/MicrosoftClarity';
import { SITE } from '@/data/site-config';
import { routing } from '@/i18n/routing';
import { schemaLang } from '@/i18n/seo';

// Body font — modern, friendly geometric sans (refined alternative to Inter).
// Trimmed to 3 weights (was 5) — saves ~140 KB and ~200ms render-blocking.
const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
  preload: true,
});

// Display font — variable serif. Used in EVERY hero H1 (home, landing pages,
// blog post titles), so it IS above the fold and must preload to avoid the
// FOIT/FOUT flash on the LCP element. Combined with display:'swap' the body
// renders immediately and the H1 gets its real font as soon as the woff2 lands.
const display = Fraunces({
  subsets: ['latin'],
  weight: ['800'],
  display: 'swap',
  variable: '--font-display',
  preload: true,
});

// Global Organization + WebSite structured data (rendered on every page).
// Multi-type schema combining Organization + Manufacturer + LocalBusiness so
// Google can show this entity in both knowledge panel ("wooden box factory")
// AND local pack ("factory in Xiamen") results.
const ORG_LD = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'Manufacturer', 'LocalBusiness'],
  '@id': `${SITE.siteUrl}/#organization`,
  name: SITE.company.legalName,
  alternateName: [SITE.company.brand, 'CHIC Wooden Expert', 'Xiamen Chic Homeware'],
  description:
    'Factory-direct manufacturer of custom wooden products in China — OEM & ODM ' +
    'wooden boxes, kitchenware, organizers, trays, and home storage for global brands.',
  url: SITE.siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE.siteUrl}/logo.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE.siteUrl}/logo.png`,
  email: SITE.email,
  telephone: `+${SITE.whatsapp.number}`,
  foundingDate: '2017',
  slogan: 'Wooden Expert — OEM & ODM Manufacturer',
  knowsAbout: [
    'Wooden Boxes', 'Wooden Gift Boxes', 'Wooden Storage Boxes',
    'Custom Wooden Packaging', 'OEM Wooden Products', 'Bamboo Products',
    'Wooden Kitchenware', 'Wooden Spice Racks', 'Wooden Sofa Trays',
    'Wooden Cutting Boards', 'Wooden Serving Trays', 'Private Label Manufacturing',
  ],
  areaServed: [
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'Germany' },
    { '@type': 'Country', name: 'France' },
    { '@type': 'Country', name: 'Australia' },
    { '@type': 'Country', name: 'Canada' },
    { '@type': 'Place', name: 'European Union' },
  ],
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '18:00',
  },
  sameAs: [SITE.social.linkedin, SITE.social.youtube, SITE.social.alibaba].filter(Boolean),
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: SITE.addresses.salesOffice.lines.join(' '),
      addressLocality: 'Xiamen',
      addressRegion: 'Fujian',
      addressCountry: 'CN',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: SITE.addresses.factory.lines.join(' '),
      addressLocality: 'Heze',
      addressRegion: 'Shandong',
      addressCountry: 'CN',
    },
  ],
  contactPoint: [{
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: SITE.email,
    telephone: `+${SITE.whatsapp.number}`,
    availableLanguage: ['English'],
    areaServed: ['US', 'EU', 'GB', 'AU', 'CA', 'JP', 'KR'],
  }],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Custom Wooden Products',
    itemListElement: [
      { '@type': 'OfferCatalog', name: 'Wooden Kitchen & Dining',
        url: `${SITE.siteUrl}/products/wooden-kitchen-dining` },
      { '@type': 'OfferCatalog', name: 'Storage & Home Organization',
        url: `${SITE.siteUrl}/products/storage-home-organization` },
      { '@type': 'OfferCatalog', name: 'Desk & Office Organizers',
        url: `${SITE.siteUrl}/products/desk-office-organizers` },
      { '@type': 'OfferCatalog', name: 'Gift Boxes & Retail Packaging',
        url: `${SITE.siteUrl}/products/gift-boxes-retail-packaging` },
      { '@type': 'OfferCatalog', name: 'Hospitality & Commercial',
        url: `${SITE.siteUrl}/products/hospitality-commercial` },
    ],
  },
};

// WEBSITE schema — emitted on every page. Built per-locale so the inLanguage
// signal matches the actual rendered locale (was hard-coded to en-US before,
// which mismatched the /de/, /es/, /fr/, /ja/ versions). SCHEMA_INLANGUAGE
// map lives in i18n/seo.js for cross-file reuse.
function buildWebsiteLd(locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.siteUrl}/#website`,
    url: SITE.siteUrl,
    name: SITE.company.brand,
    alternateName: SITE.company.legalName,
    description:
      'Factory-direct manufacturer of custom wooden products — OEM wooden boxes, ' +
      'kitchenware, storage and gift packaging for B2B brands worldwide.',
    publisher: { '@id': `${SITE.siteUrl}/#organization` },
    inLanguage: schemaLang(locale),
    // NOTE: SearchAction removed — /products?q= filtering isn't implemented,
    // and a SearchAction that points to a non-functional URL hurts trust signals.
    // Add it back once /products supports a real ?q= search filter + UI.
  };
}

// Tells Next.js to pre-render every locale at build time.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// OG locale codes (Facebook spec) — different from our 2-letter codes.
const OG_LOCALES = {
  en: 'en_US',
  es: 'es_ES',
  de: 'de_DE',
  fr: 'fr_FR',
  ja: 'ja_JP',
};

// Build hreflang map for any path — includes all locales + x-default.
// localePrefix: 'as-needed' means EN has NO prefix, others get /<locale>/.
export function buildHreflangAlternates(pathInLocale = '') {
  const languages = {};
  for (const loc of routing.locales) {
    const prefix = loc === routing.defaultLocale ? '' : `/${loc}`;
    languages[loc] = `${SITE.siteUrl}${prefix}${pathInLocale}`;
  }
  // x-default points to English (the canonical fallback for non-targeted users)
  languages['x-default'] = `${SITE.siteUrl}${pathInLocale}`;
  return languages;
}

// Per-locale metadata (title/description translated, hreflang on every page).
export async function generateMetadata({ params: { locale } }) {
  if (!routing.locales.includes(locale)) return {};
  const t = await getTranslations({ locale, namespace: 'meta' });
  const SITE_NAME = `${SITE.company.brand} — ${SITE.company.tagline}`;
  const title = t('siteTitle');
  const description = t('siteDescription');

  // Canonical for the HOME page in this locale
  const homePath = locale === routing.defaultLocale ? '/' : `/${locale}`;
  const ogLocale = OG_LOCALES[locale] || 'en_US';
  const alternateLocales = Object.values(OG_LOCALES).filter((l) => l !== ogLocale);

  return {
    title: { default: title, template: `%s | ${SITE_NAME}` },
    description,
    applicationName: SITE_NAME,
    authors: [{ name: SITE.company.legalName }],
    creator: SITE.company.legalName,
    publisher: SITE.company.legalName,
    metadataBase: new URL(SITE.siteUrl),
    alternates: {
      canonical: homePath,
      languages: buildHreflangAlternates(''),
    },
    openGraph: {
      type: 'website',
      locale: ogLocale,
      alternateLocale: alternateLocales,
      url: `${SITE.siteUrl}${homePath === '/' ? '' : homePath}`,
      siteName: SITE_NAME,
      title,
      description,
      images: [{ url: SITE.defaultOgImage, width: 1200, height: 630, alt: `${SITE_NAME} — factory` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SITE.defaultOgImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

export default async function LocaleLayout({ children, params: { locale } }) {
  if (!routing.locales.includes(locale)) {
    notFound();
  }
  // Required for static rendering
  unstable_setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${sans.variable} ${display.variable}`}>
      <body>
        {/* Global structured data — Organization + WebSite (WebSite built per-locale) */}
        <JsonLd data={ORG_LD} />
        <JsonLd data={buildWebsiteLd(locale)} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingChat />
        </NextIntlClientProvider>
        {/* GA4 — loads after hydration via strategy="afterInteractive",
            doesn't block LCP. Disable by setting measurementId to '' in site-config. */}
        <GoogleAnalytics />
        {/* Microsoft Clarity — heatmaps + session recordings.
            Same afterInteractive strategy. Disable via site-config projectId=''. */}
        <MicrosoftClarity />
      </body>
    </html>
  );
}
                                                                                                                                                                    