// /products/[slug] — dispatches between:
//   1. CATEGORY landing (lists products in that category) when slug matches a wp_product_cat
//   2. PRODUCT detail (rich content) when slug matches a wp product
// Both use the original WP slugs so old links keep working.

import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';
import { routing, canonicalFor } from '@/i18n/routing';
import {
  wpCategoryBySlug,
  wpProductBySlug,
  wpProducts,
  wpProductCategories,
  wpProductsByCategory,
  stripHtml,
} from '@/lib/wp-data';
import { generateProductContent, cleanProductWpContent } from '@/lib/product-content';
import { localizeProduct } from '@/lib/translated-content';
import { schemaLang } from '@/i18n/seo';

// Build hreflang map for a path — used in metadata.alternates.languages.
// With localePrefix:'as-needed', the default locale (en) has NO prefix.
function buildAlternates(path) {
  const langs = {};
  for (const loc of routing.locales) {
    const prefix = loc === routing.defaultLocale ? '' : `/${loc}`;
    langs[loc] = `${SITE.siteUrl}${prefix}${path}`;
  }
  langs['x-default'] = `${SITE.siteUrl}${path}`;
  return langs;
}

export function generateStaticParams() {
  const cats = wpProductCategories().filter(c => c.slug !== 'uncategorized');
  const prods = wpProducts();
  return [
    ...cats.map(c => ({ slug: c.slug })),
    ...prods.map(p => ({ slug: p.slug })),
  ];
}

export async function generateMetadata({ params }) {
  const path = `/products/${params.slug}`;
  const t = await getTranslations({ locale: params.locale, namespace: 'productDetail' });
  const cat  = wpCategoryBySlug(params.slug);
  if (cat) {
    const desc = stripHtml(cat.description).slice(0, 160)
      || t('categoryFallbackDesc', { category: cat.name.toLowerCase() });
    return {
      title: `${cat.name} — ${t('categoryWholesaleManufacturer')}`,
      description: desc,
      alternates: { canonical: canonicalFor(params.locale, path), languages: buildAlternates(path) },
      openGraph: {
        type: 'website',
        url: `${SITE.siteUrl}${path}`,
        title: `${cat.name} — ${t('categoryWholesaleManufacturer')}`,
        description: desc,
        siteName: SITE.company.brand,
      },
      twitter: { card: 'summary_large_image', title: `${cat.name} — ${t('categoryWholesaleManufacturer')}`, description: desc },
    };
  }
  const rawP = wpProductBySlug(params.slug);
  if (rawP) {
    const p = localizeProduct(rawP, params.locale);
    const title = stripHtml(p.title);
    const desc  = p._localizedOverview?.slice(0, 160) || p.meta_desc || stripHtml(p.excerpt || p.content).slice(0, 160);
    const img   = p.featured_image || `${SITE.siteUrl}/logo.png`;
    return {
      title,
      description: desc,
      alternates: { canonical: canonicalFor(params.locale, path), languages: buildAlternates(path) },
      openGraph: {
        type: 'website',
        url: `${SITE.siteUrl}${path}`,
        title,
        description: desc,
        images: [{ url: img, width: 1200, height: 1200, alt: title }],
        siteName: SITE.company.brand,
      },
      twitter: { card: 'summary_large_image', title, description: desc, images: [img] },
    };
  }
  return {};
}

export default function ProductOrCategoryPage({ params }) {
  unstable_setRequestLocale(params.locale);
  const cat  = wpCategoryBySlug(params.slug);
  if (cat)  return <CategoryView cat={cat} locale={params.locale} />;
  const rawP = wpProductBySlug(params.slug);
  if (rawP) {
    const p = localizeProduct(rawP, params.locale);
    return <ProductView p={p} locale={params.locale} />;
  }
  notFound();
}

// Breadcrumb JSON-LD helper
function breadcrumbLd(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url ? `${SITE.siteUrl}${c.url}` : undefined,
    })),
  };
}

function CategoryView({ cat, locale }) {
  const t = useTranslations('productDetail');
  const items = wpProductsByCategory(cat.slug).map((p) => localizeProduct(p, locale));
  const subCats = wpProductCategories().filter(c => String(c.parent) === String(cat.id));

  // Breadcrumb + ItemList JSON-LD for category landing
  const breadcrumb = breadcrumbLd([
    { name: 'Home',     url: '/' },
    { name: 'Products', url: `/products` },
    { name: cat.name },
  ]);
  const itemListLd = items.length === 0 ? null : {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: cat.name,
    numberOfItems: items.length,
    itemListElement: items.slice(0, 30).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE.siteUrl}/products/${p.slug}`,
      name: p.title,
    })),
  };

  return (
    <div className="bg-brand-cream min-h-screen">
      <JsonLd data={breadcrumb} />
      {itemListLd && <JsonLd data={itemListLd} />}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
        <nav className="text-xs text-brand-mute mb-4">
          <Link href="/" className="hover:text-brand-green">Home</Link>
          {' / '}
          <Link href="/products" className="hover:text-brand-green">Products</Link>
          {' / '}
          <span className="text-brand-ink">{cat.name}</span>
        </nav>

        <header className="mb-10 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-ink leading-tight">{cat.name}</h1>
          {cat.description ? (
            <div className="mt-4 text-brand-ink/85 wp-content" dangerouslySetInnerHTML={{__html: cat.description}} />
          ) : (
            <p className="mt-3 text-brand-mute">{t('categoryProductCount', { count: items.length })}</p>
          )}
        </header>

        {subCats.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {subCats.map(sc => (
              <Link
                key={sc.id}
                href={`/products/${sc.slug}`}
                className="px-3.5 py-1.5 rounded-full bg-white border border-brand-line text-sm text-brand-ink hover:border-brand-green hover:text-brand-green"
              >
                {sc.name}
              </Link>
            ))}
          </div>
        )}

        {items.length === 0 ? (
          <p className="text-brand-mute">{t('categoryNoProducts')} <Link href="/products" className="underline">{t('categoryBrowseAll')}</Link>.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map(p => (
              <Link
                key={p.id}
                href={`/products/${p.slug}`}
                className="group bg-white rounded-lg overflow-hidden border border-brand-line hover:shadow-lg transition"
              >
                <div className="relative aspect-square bg-stone-100 overflow-hidden">
                  {p.featured_image && (
                    <Image
                      src={p.featured_image}
                      alt={stripHtml(p.title)}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-brand-green line-clamp-2">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductView({ p, locale }) {
  const t = useTranslations('productDetail');
  const tPc = useTranslations('productContent');
  const tCta = useTranslations('cta');
  const related = wpProducts()
    .filter(x => x.id !== p.id && x.categories?.some(c => p.categories?.some(pc => pc.slug === c.slug)))
    .slice(0, 4);

  // Breadcrumb + Product JSON-LD
  const crumbs = [
    { name: 'Home',     url: '/' },
    { name: 'Products', url: `/products` },
  ];
  if (p.categories?.[0]) {
    crumbs.push({ name: p.categories[0].name, url: `/products/${p.categories[0].slug}` });
  }
  crumbs.push({ name: stripHtml(p.title) });
  const breadcrumb = breadcrumbLd(crumbs);

  // Build the locale-aware overview from the detected material/template +
  // an ICU MessageFormat template. If a hand-curated translated overview
  // exists for this locale (messages/products.{locale}.json) we prefer that.
  const c = generateProductContent(p);
  const materialName = c.materialKey ? tPc(`materials.${c.materialKey}Name`) : '';
  const productType  = tPc(`templates.${c.templateKey}Type`);
  const tplApp1 = tPc(`templates.${c.templateKey}App1`);
  const tplApp2 = tPc(`templates.${c.templateKey}App2`);
  const tplApp3 = tPc(`templates.${c.templateKey}App3`);
  const overview = p._localizedOverview || (
    c.materialKey
      ? tPc('overviewWithMaterial', { title: c.title, productType, materialName, app1: tplApp1, app2: tplApp2, app3: tplApp3 })
      : tPc('overviewNoMaterial',  { title: c.title, productType, app1: tplApp1, app2: tplApp2 })
  );

  // Same translator declaration pattern as the blog page — only emit on
  // non-default-locale variants where the description was machine-translated.
  const isTranslated = locale !== routing.defaultLocale;
  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: stripHtml(p.title),
    description: (stripHtml(p.excerpt).length > 80
      ? stripHtml(p.excerpt)
      : overview).slice(0, 5000),
    image: [p.featured_image, ...(p.gallery || [])].filter(Boolean).slice(0, 6).map((u) => u.startsWith('http') ? u : `${SITE.siteUrl}${u}`),
    sku: p.sku || String(p.id),
    brand: { '@type': 'Brand', name: SITE.company.brand },
    manufacturer: { '@id': `${SITE.siteUrl}/#organization` },
    category: p.categories?.[0]?.name || 'Wooden Products',
    url: `${SITE.siteUrl}/products/${p.slug}`,
    inLanguage: schemaLang(locale),
    ...(isTranslated && {
      translator: {
        '@type': 'Organization',
        name: 'CHIC Localization (Aliyun Machine Translation, human-reviewed)',
      },
    }),
    // ── No `offers` block by design ────────────────────────────────────
    // This is a B2B quote-only catalog — public prices don't exist. We
    // tried two intermediate schemes:
    //   1. price: '0'                  → Google flagged "Invalid price"
    //   2. PriceSpecification w/o price → Google flagged "Missing price"
    //
    // Both broke Product rich-result eligibility site-wide. Cleanest fix
    // is to omit `offers` entirely. Trade-off: no "Merchant listing"
    // price snippet in SERP, but all other rich results (BreadcrumbList,
    // FAQPage, Organization knowledge panel) keep working — and a
    // "$3 starting from" snippet would actually hurt B2B credibility
    // for an OEM/ODM factory anyway.
    //
    // To re-enable Product rich results later: add `aggregateRating`
    // (from real customer reviews) or switch to `AggregateOffer` with
    // honest lowPrice/highPrice that reflects MOQ-based wholesale ranges.
  };

  return (
    <article className="bg-white">
      <JsonLd data={breadcrumb} />
      <JsonLd data={productLd} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
        <nav className="text-xs text-brand-mute mb-6">
          <Link href="/" className="hover:text-brand-green">Home</Link>
          {' / '}
          <Link href="/products" className="hover:text-brand-green">Products</Link>
          {p.categories?.[0] && (
            <>
              {' / '}
              <Link href={`/products/${p.categories[0].slug}`} className="hover:text-brand-green">{p.categories[0].name}</Link>
            </>
          )}
          {' / '}
          <span className="text-brand-ink">{p.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          <div>
            <div className="relative aspect-square bg-stone-100 rounded-xl overflow-hidden">
              {p.featured_image ? (
                <Image
                  src={p.featured_image}
                  alt={stripHtml(p.title)}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-brand-mute">No image</div>
              )}
            </div>
            {p.gallery?.length > 0 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {p.gallery.slice(0, 8).map((g, i) => (
                  <div key={i} className="relative aspect-square bg-stone-100 rounded overflow-hidden">
                    <Image
                      src={g}
                      alt={`${stripHtml(p.title)} — detail ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 25vw, 12vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-ink leading-tight">
              {p.title}
            </h1>
            {p.categories?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {p.categories.map(c => (
                  <Link
                    key={c.slug}
                    href={`/products/${c.slug}`}
                    className="text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-cream text-brand-green hover:bg-brand-green hover:text-white"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
            {/* Hero blurb — prefer the real excerpt on the default locale
                (English source); on translated locales fall back to the
                first ~2 sentences of the localized overview so visitors
                always see language-appropriate hero copy. */}
            {(() => {
              const isDefault = locale === routing.defaultLocale;
              const localizedBlurb = overview
                ? overview.split(/(?<=\. )/).slice(0, 2).join('').trim()
                : null;
              const blurbHtml = isDefault
                ? (p.excerpt && stripHtml(p.excerpt).length > 20 ? p.excerpt : (localizedBlurb ? `<p>${localizedBlurb}</p>` : null))
                : (localizedBlurb ? `<p>${localizedBlurb}</p>` : null);
              return blurbHtml ? (
                <div className="mt-6 text-brand-ink/85 wp-content" dangerouslySetInnerHTML={{__html: blurbHtml}} />
              ) : null;
            })()}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact#form"
                className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition"
              >
                {t('getQuote')}
              </Link>
              <a
                href={`mailto:?subject=${encodeURIComponent(t('inquirySubjectPrefix') + ' ' + p.title)}`}
                className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition"
              >
                {t('emailInquiry')}
              </a>
            </div>
          </div>
        </div>

        {/* ─── SEO-ENRICHED PRODUCT CONTENT ─────────────────────────
            Auto-generated overview / features / material / customization /
            applications / FAQ sections — gives each product page 600-1000+
            words of unique, keyword-rich content built from its title and
            category metadata. All strings come from productContent.* i18n
            keys, so each locale gets fully translated content. */}
        <ProductSEOSections product={p} overview={overview} />

        {/* Original WP content — cleaned of Elementor cruft, only renders if
            substantial content exists beyond what's auto-generated above. */}
        {p.content && (() => {
          const cleaned = cleanProductWpContent(p.content);
          if (cleaned && cleaned.length > 200) {
            return (
              <section className="mt-12 border-t border-brand-line pt-10">
                <h2 className="text-2xl font-bold text-brand-ink mb-6">{t('moreAboutProduct')}</h2>
                <div className="wp-content max-w-4xl" dangerouslySetInnerHTML={{__html: cleaned}} />
              </section>
            );
          }
          return null;
        })()}

        {related.length > 0 && (
          <section className="mt-16 border-t border-brand-line pt-12">
            <h2 className="text-2xl font-bold text-brand-ink mb-8">{t('relatedProducts')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map(r => (
                <Link
                  key={r.id}
                  href={`/products/${r.slug}`}
                  className="group bg-white border border-brand-line rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  <div className="relative aspect-square bg-stone-100 overflow-hidden">
                    {r.featured_image && (
                      <Image
                        src={r.featured_image}
                        alt={stripHtml(r.title)}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition duration-500"
                      />
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-brand-green line-clamp-2">{r.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Final CTA band */}
        <section className="mt-16 bg-brand-green text-white rounded-2xl px-6 py-10 lg:px-12 lg:py-14">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-wood mb-3">{t('ctaEyebrow')}</p>
              <h2 className="text-2xl md:text-3xl font-extrabold leading-tight">
                {t('ctaTitle', { title: stripHtml(p.title).slice(0, 60) + (stripHtml(p.title).length > 60 ? '…' : '') })}
              </h2>
              <p className="mt-3 text-white/85 leading-relaxed">
                {t('ctaBody')}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/contact#form" className="inline-flex items-center rounded-full bg-brand-wood px-7 py-3 text-[15px] font-semibold text-brand-ink hover:bg-brand-woodSoft transition">{tCta('getFreeQuote')}</Link>
              <Link href="/about" className="inline-flex items-center rounded-full border-2 border-white px-7 py-3 text-[15px] font-semibold text-white hover:bg-white hover:text-brand-green transition">{t('ctaAboutFactory')}</Link>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}

// ─── SEO-enriched product content sections ──────────────────────────────
// Renders Overview / Features / Material / Customization / Applications /
// Why CHIC / FAQ sections. All strings come from the productContent.*
// namespace so the user sees content in their own locale (de/es/fr/ja).
//
// The shape returned by generateProductContent is pure keys + params; this
// component is responsible for converting those keys to localized strings.
function ProductSEOSections({ product, overview }) {
  const t   = useTranslations('productDetail');
  const tPc = useTranslations('productContent');
  const c   = generateProductContent(product);

  const productType   = tPc(`templates.${c.templateKey}Type`);
  const materialName  = c.materialKey ? tPc(`materials.${c.materialKey}Name`) : null;
  const materialDesc  = c.materialKey ? tPc(`materials.${c.materialKey}Desc`) : null;
  const materialBest  = c.materialKey ? tPc(`materials.${c.materialKey}BestFor`) : null;
  const materialTitle = materialName ? tPc('materialSectionTitle', { materialName }) : null;

  // Applications — 4 per template
  const applications = [1, 2, 3, 4].map(n => tPc(`templates.${c.templateKey}App${n}`));

  // Features — translate each detected feature key
  const features = c.featureKeys.map(k => tPc(`features.${k}`));

  // Customization — 6 fixed slots
  const customization = ['1', '2', '3', '4', '5', '6'].map(n => tPc(`customization.${n}`));

  // FAQ = template-specific (0-2) + universal (4)
  const templateFaqs = [];
  for (let i = 1; i <= c.templateFaqCount; i++) {
    templateFaqs.push({
      q: tPc(`templates.${c.templateKey}Faq${i}Q`),
      a: tPc(`templates.${c.templateKey}Faq${i}A`),
    });
  }
  const universalFaqs = [
    { q: tPc('universalFaq.moqQ'),      a: tPc('universalFaq.moqA') },
    { q: tPc('universalFaq.logoQ'),     a: tPc('universalFaq.logoA') },
    { q: tPc('universalFaq.leadTimeQ'), a: tPc('universalFaq.leadTimeA') },
    { q: tPc('universalFaq.fbaQ'),      a: tPc('universalFaq.fbaA') },
  ];
  const faqs = [...templateFaqs, ...universalFaqs];

  // Emit a FAQPage JSON-LD so Google can show the FAQ accordion in results
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={faqLd} />

      {/* ── Overview ─────────────────────────────────────── */}
      <section className="mt-2 border-t border-brand-line pt-10">
        <div className="max-w-4xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{t('overviewEyebrow')}</p>
          <p className="text-lg text-brand-ink leading-relaxed">
            {overview}
          </p>
        </div>
      </section>

      {/* ── Key Features ─────────────────────────────────── */}
      {features.length > 0 && (
        <section className="mt-12">
          <div className="max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-ink mb-6">
              {t('keyFeaturesTitle')}
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 bg-brand-cream rounded-xl p-4">
                  <svg width="22" height="22" viewBox="0 0 16 16" fill="none" className="text-brand-green flex-shrink-0 mt-0.5">
                    <circle cx="8" cy="8" r="8" fill="#E8F0EA" />
                    <path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[15px] text-brand-ink leading-snug font-medium">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Material spotlight ──────────────────────────── */}
      {c.materialKey && (
        <section className="mt-12 bg-brand-cream rounded-2xl px-6 py-8 lg:px-10 lg:py-10">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{t('materialEyebrow')}</p>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-ink mb-4">
              {materialTitle}
            </h2>
            <p className="text-[16px] text-brand-ink/85 leading-relaxed mb-4">
              {materialDesc}
            </p>
            <p className="text-sm text-brand-mute">
              <span className="font-semibold text-brand-green">{t('materialBestFor')}</span> {materialBest}
            </p>
          </div>
        </section>
      )}

      {/* ── Customization options ──────────────────────── */}
      <section className="mt-12">
        <div className="max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-ink mb-6">
            {t('oemTitle')}
          </h2>
          <p className="text-brand-mute mb-6 leading-relaxed">
            {t('oemIntro')}
          </p>
          <ul className="space-y-3">
            {customization.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-brand-ink">
                <span className="shrink-0 w-7 h-7 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center text-xs font-bold mt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Applications ───────────────────────────────── */}
      <section className="mt-12">
        <div className="max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-ink mb-6">
            {t('applicationsTitle')}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {applications.map((a, i) => (
              <div key={i} className="bg-white border border-brand-line rounded-xl p-5 hover:border-brand-green/40 hover:shadow-md transition">
                <div className="text-2xl font-extrabold text-brand-green/30 leading-none mb-2">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="text-brand-ink font-medium leading-snug">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why CHIC ───────────────────────────────────── */}
      <section className="mt-12 bg-brand-cream rounded-2xl px-6 py-8 lg:px-10 lg:py-10">
        <div className="max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{t('whyChicEyebrow')}</p>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-ink mb-4">
            {t('whyChicTitle')}
          </h2>
          <p className="text-brand-ink/85 leading-relaxed">{tPc('whyChic')}</p>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────── */}
      <section className="mt-12">
        <div className="max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{t('faqEyebrow')}</p>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-ink mb-6">
            {t('faqTitle')}
          </h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="group bg-white border border-brand-line rounded-xl hover:border-brand-green/40 transition overflow-hidden">
                <summary className="flex items-start justify-between cursor-pointer p-5 gap-4 list-none">
                  <span className="font-semibold text-brand-ink leading-snug">{f.q}</span>
                  <span className="shrink-0 w-7 h-7 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center text-sm font-bold transition group-open:bg-brand-green group-open:text-white group-open:rotate-45">+</span>
                </summary>
                <div className="px-5 pb-5 -mt-1 text-brand-mute leading-relaxed text-[15px]">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       