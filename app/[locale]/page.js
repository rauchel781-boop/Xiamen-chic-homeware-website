// Home page — full layout matching xmchichomeware.com structure & content.
// Sections (top → bottom):
//   1. Hero (real CHIC-Factory.jpg + 4 checkmarks + dual CTA)
//   2. Real Products carousel
//   3. Why Choose Us (4 icon cards — content from WP)
//   4. Manufacturing Process (4 steps — content from WP)
//   5. Factory Section (4 photos + Caoxian/Xiamen narrative — content from WP)
//   6. Trusted Manufacturer (dark green strip, 4-stage pipeline — content from WP)
//   7. Categories Grid (6 product categories with cover images)
//   8. Who We Serve (4 segments + 2 photos + wood materials chips — content from WP)
//   9. Blog Preview (latest 3 posts)
//   10. FAQ (5 questions — content from WP)
//   11. Final CTA strip

import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import fs from 'fs';
import path from 'path';
import { wpProducts } from '@/lib/wp-data';
import { SITE } from '@/data/site-config';
import { hreflangFor, canonicalFor, routing } from '@/i18n/routing';
import { schemaLang } from '@/i18n/seo';
import JsonLd from '@/components/JsonLd';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import RealProducts from '@/components/RealProducts';
import WhyChooseUs from '@/components/WhyChooseUs';
import Process from '@/components/Process';
import FactorySection from '@/components/FactorySection';
import ImpactBanner from '@/components/ImpactBanner';
import CategoriesGrid from '@/components/CategoriesGrid';
import WhoWeServe from '@/components/WhoWeServe';
import MaterialsSection from '@/components/MaterialsSection';
import IndustryBrief from '@/components/IndustryBrief';
import BlogPreview from '@/components/BlogPreview';
import FAQ from '@/components/FAQ';
import CaseStudies from '@/components/CaseStudies';
import ProcessVideos from '@/components/ProcessVideos';

// LCP image — preloaded so it lands within the LCP budget (< 2.5s)
const HERO_LCP = '/wp-images/2026/02/CHIC-Factory.jpg';

// Home page metadata override (locale layout already handles canonical/hreflang)
export async function generateMetadata({ params: requestParams }) {
  const { locale } = (await requestParams) ?? {};
  const t = await getTranslations({ locale, namespace: 'meta' });
  const title = locale === routing.defaultLocale
    ? 'Wooden Products Manufacturer & OEM Supplier in China'
    : t('siteTitle');
  const desc = locale === routing.defaultLocale
    ? 'Custom wooden & bamboo home storage, kitchenware and gift packaging — factory-direct OEM/ODM with 60+ countries of export experience.'
    : t('siteDescription');
  const homeUrl = `${SITE.siteUrl}${canonicalFor(locale, '')}`;
  return {
    title: { absolute: title },
    description: desc,
    alternates: { canonical: homeUrl, languages: hreflangFor(SITE.siteUrl, '') },
    openGraph: {
      type: 'website',
      url: homeUrl,
      title,
      description: desc,
      siteName: SITE.company.brand,
      images: [{ url: HERO_LCP, width: 1200, height: 800, alt: 'CHIC factory exterior' }],
    },
    twitter: { card: 'summary_large_image', title, description: desc, images: [HERO_LCP] },
  };
}

// Note: WebSite + SearchAction JSON-LD is now in the global layout (locale/layout.js)
// so it's emitted on every page and uses the correct URL (no /en/ prefix).

export default async function HomePageRoute(props) {
  return <HomePage {...props} params={await props.params} />;
}

function HomePage({ params: { locale } }) {
  setRequestLocale(locale);

  // Curated showcase products — the exact 8 image + title pairs from the
  // xmchichomeware.com home page "Our Real Products" section.
  // Saved to wp-data/extracted/home_real_products.json by the import script.
  const curatedFile = path.join(process.cwd(), 'wp-data/extracted/home_real_products.json');
  const curated = fs.existsSync(curatedFile)
    ? JSON.parse(fs.readFileSync(curatedFile, 'utf8'))
    : [];

  // For items without a matched product slug, fall back to /products (browse all).
  const featuredForCarousel = curated.map((c) => ({
    title: c.title,
    img:   c.img,
    slug:  c.slug || 'products',  // fallback target
  }));

  // Safety net: if curated file is empty, fall back to first 8 products with images.
  if (featuredForCarousel.length === 0) {
    featuredForCarousel.push(
      ...wpProducts()
        .filter((p) => p.featured_image)
        .slice(0, 8)
        .map((p) => ({ slug: p.slug, title: p.title, img: p.featured_image }))
    );
  }

  // localePrefix: 'as-needed' — English no prefix, others get /<locale>/
  const localePrefix = locale === 'en' ? '' : `/${locale}`;
  const homeUrl = `${SITE.siteUrl}${localePrefix || '/'}`;

  // WebPage schema — tells Google this is the primary entry point.
  // Pulls together Organization (#organization), WebSite (#website) and the
  // featured products via mainEntity, giving the homepage a clean entity graph.
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${homeUrl}#webpage`,
    url: homeUrl,
    name: 'Wooden Products Manufacturer & OEM Supplier in China',
    description: 'Custom wooden & bamboo home storage, kitchenware and gift packaging — factory-direct OEM/ODM with 60+ countries of export experience.',
    inLanguage: schemaLang(locale),
    isPartOf: { '@id': `${SITE.siteUrl}/#website` },
    about: { '@id': `${SITE.siteUrl}/#organization` },
    primaryImageOfPage: `${SITE.siteUrl}${HERO_LCP}`,
  };

  // ItemList — featured products on home. Lets Google understand what we
  // actually sell at the top entry point, helps "site search" features,
  // and feeds the Sitelinks Search Box / knowledge panel offerings list.
  const featuredItemsLd = featuredForCarousel.length === 0 ? null : {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Featured Wooden Products',
    description: 'Bestsellers and showcase OEM/ODM products from Xiamen Chic Homeware.',
    numberOfItems: featuredForCarousel.length,
    itemListElement: featuredForCarousel.slice(0, 8).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.title,
      url: `${SITE.siteUrl}/products/${p.slug}`,
      image: p.img && (p.img.startsWith('http') ? p.img : `${SITE.siteUrl}${p.img}`),
    })),
  };

  return (
    <>
      {/* LCP optimization — preload the Hero factory photo so it loads ASAP */}
      <link rel="preload" as="image" href={HERO_LCP} fetchPriority="high" />

      <JsonLd data={webPageLd} />
      {featuredItemsLd && <JsonLd data={featuredItemsLd} />}

      <Hero />
      <TrustBar />
      <CategoriesGrid />
      <RealProducts products={featuredForCarousel} />
      <ImpactBanner />
      <WhyChooseUs />
      <Process />
      <FactorySection />
      {/* Factory-floor clips. emitSchema={false} because /material-guide is
          the canonical page for these VideoObjects — one owner per video. */}
      <ProcessVideos locale={locale} emitSchema={false} />

      <WhoWeServe />
      {/* Customer proof — 6 long-term partnerships. Previously only on
          /about, so the highest-authority page on the site carried none. */}
      <CaseStudies />

      <MaterialsSection />
      <IndustryBrief />
      <BlogPreview />
      <FAQ />
    </>
  );
}
