// /products/[slug] — dispatches between:
//   1. CATEGORY landing (lists products in that category) when slug matches a wp_product_cat
//   2. PRODUCT detail (rich content) when slug matches a wp product
// Both use the original WP slugs so old links keep working.

import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';
import { routing } from '@/i18n/routing';
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
  const cat  = wpCategoryBySlug(params.slug);
  if (cat) {
    const desc = stripHtml(cat.description).slice(0, 160) || `Custom ${cat.name.toLowerCase()} — wholesale wooden & bamboo manufacturing for retailers and brands.`;
    return {
      title: `${cat.name} — Wholesale Manufacturer`,
      description: desc,
      alternates: { canonical: path, languages: buildAlternates(path) },
      openGraph: {
        type: 'website',
        url: `${SITE.siteUrl}${path}`,
        title: `${cat.name} — Wholesale Manufacturer`,
        description: desc,
        siteName: SITE.company.brand,
      },
      twitter: { card: 'summary_large_image', title: `${cat.name} — Wholesale Manufacturer`, description: desc },
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
      alternates: { canonical: path, languages: buildAlternates(path) },
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
            <p className="mt-3 text-brand-mute">{items.length} products in this category</p>
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
          <p className="text-brand-mute">No products in this category yet. <Link href="/products" className="underline">Browse all products</Link>.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map(p => (
              <Link
                key={p.id}
                href={`/products/${p.slug}`}
                className="group bg-white rounded-lg overflow-hidden border border-brand-line hover:shadow-lg transition"
              >
                <div className="aspect-square bg-stone-100">
                  {p.featured_image && (
                    <img src={p.featured_image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
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

  // Use generated overview as fallback description — much richer + more
  // keyword-dense than the often-empty excerpt or raw spec dump.
  // If a translated overview exists for this locale, use that instead.
  const generated = generateProductContent(p);
  if (p._localizedOverview) {
    generated.overview = p._localizedOverview;
  }
  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: stripHtml(p.title),
    description: (stripHtml(p.excerpt).length > 80
      ? stripHtml(p.excerpt)
      : generated.overview).slice(0, 5000),
    image: [p.featured_image, ...(p.gallery || [])].filter(Boolean).slice(0, 6).map((u) => u.startsWith('http') ? u : `${SITE.siteUrl}${u}`),
    sku: p.sku || String(p.id),
    brand: { '@type': 'Brand', name: SITE.company.brand },
    manufacturer: { '@id': `${SITE.siteUrl}/#organization` },
    category: p.categories?.[0]?.name || 'Wooden Products',
    url: `${SITE.siteUrl}/products/${p.slug}`,
    // Quote-only B2B product — no public price. Earlier we set price:'0' to
    // satisfy schema validators, but Google Search Console flags that as
    // "Invalid price" and revokes Product rich-result eligibility.
    // Instead: omit price entirely, declare a PriceSpecification with
    // currency + VAT flag so the offer is structurally valid, and lean on
    // businessFunction + eligibleQuantity (MOQ) to signal wholesale intent.
    offers: {
      '@type': 'Offer',
      url: `${SITE.siteUrl}/contact`,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      businessFunction: 'https://schema.org/Sell',
      eligibleQuantity: { '@type': 'QuantitativeValue', minValue: 100, unitCode: 'C62' },
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD',
        valueAddedTaxIncluded: false,
      },
      seller: { '@id': `${SITE.siteUrl}/#organization` },
    },
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
            <div className="aspect-square bg-stone-100 rounded-xl overflow-hidden">
              {p.featured_image ? (
                <img src={p.featured_image} alt={p.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-brand-mute">No image</div>
              )}
            </div>
            {p.gallery?.length > 0 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {p.gallery.slice(0, 8).map((g, i) => (
                  <div key={i} className="aspect-square bg-stone-100 rounded overflow-hidden">
                    <img src={g} alt="" className="w-full h-full object-cover" />
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
            {p.excerpt && (
              <div className="mt-6 text-brand-ink/85 wp-content" dangerouslySetInnerHTML={{__html: p.excerpt}} />
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition"
              >
                Get a Quote
              </Link>
              <a
                href={`mailto:?subject=${encodeURIComponent('Inquiry: ' + p.title)}`}
                className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition"
              >
                Email Inquiry
              </a>
            </div>
          </div>
        </div>

        {/* ─── SEO-ENRICHED PRODUCT CONTENT ─────────────────────────
            Auto-generated overview / features / material / customization /
            applications / FAQ sections — gives each product page 600-1000+
            words of unique, keyword-rich content built from its title and
            category metadata. */}
        <ProductSEOSections product={p} />

        {/* Original WP content — cleaned of Elementor cruft, only renders if
            substantial content exists beyond what's auto-generated above. */}
        {p.content && (() => {
          const cleaned = cleanProductWpContent(p.content);
          if (cleaned && cleaned.length > 200) {
            return (
              <section className="mt-12 border-t border-brand-line pt-10">
                <h2 className="text-2xl font-bold text-brand-ink mb-6">More about this product</h2>
                <div className="wp-content max-w-4xl" dangerouslySetInnerHTML={{__html: cleaned}} />
              </section>
            );
          }
          return null;
        })()}

        {related.length > 0 && (
          <section className="mt-16 border-t border-brand-line pt-12">
            <h2 className="text-2xl font-bold text-brand-ink mb-8">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map(r => (
                <Link
                  key={r.id}
                  href={`/products/${r.slug}`}
                  className="group bg-white border border-brand-line rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  <div className="aspect-square bg-stone-100">
                    {r.featured_image && <img src={r.featured_image} alt="" className="w-full h-full object-cover" />}
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
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-wood mb-3">Ready to order</p>
              <h2 className="text-2xl md:text-3xl font-extrabold leading-tight">
                Get a wholesale quote for {stripHtml(p.title).slice(0, 60)}{stripHtml(p.title).length > 60 ? '…' : ''}
              </h2>
              <p className="mt-3 text-white/85 leading-relaxed">
                Send your target size, quantity, branding and packaging needs — full quote within one business day.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/contact" className="inline-flex items-center rounded-full bg-brand-wood px-7 py-3 text-[15px] font-semibold text-brand-ink hover:bg-brand-woodSoft transition">Get a Free Quote</Link>
              <Link href="/about" className="inline-flex items-center rounded-full border-2 border-white px-7 py-3 text-[15px] font-semibold text-white hover:bg-white hover:text-brand-green transition">About Our Factory</Link>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}

// ─── SEO-enriched product content sections ──────────────────────────────
function ProductSEOSections({ product }) {
  const c = generateProductContent(product);

  // Emit a FAQPage JSON-LD so Google can show the FAQ accordion in results
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map(f => ({
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
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Overview</p>
          <p className="text-lg text-brand-ink leading-relaxed">
            {c.overview}
          </p>
        </div>
      </section>

      {/* ── Key Features ─────────────────────────────────── */}
      {c.features.length > 0 && (
        <section className="mt-12">
          <div className="max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-ink mb-6">
              Key Features
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {c.features.map((f, i) => (
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
      {c.materialSection && (
        <section className="mt-12 bg-brand-cream rounded-2xl px-6 py-8 lg:px-10 lg:py-10">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Material</p>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-ink mb-4">
              {c.materialSection.title}
            </h2>
            <p className="text-[16px] text-brand-ink/85 leading-relaxed mb-4">
              {c.materialSection.body}
            </p>
            <p className="text-sm text-brand-mute">
              <span className="font-semibold text-brand-green">Best for:</span> {c.materialSection.bestFor}
            </p>
          </div>
        </section>
      )}

      {/* ── Customization options ──────────────────────── */}
      <section className="mt-12">
        <div className="max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-ink mb-6">
            OEM & Private Label Customization
          </h2>
          <p className="text-brand-mute mb-6 leading-relaxed">
            CHIC supports full customization for wholesale and private label programs.
            Tell us your spec and we'll deliver to your brand standard.
          </p>
          <ul className="space-y-3">
            {c.customization.map((item, i) => (
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
            Applications & Markets
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {c.applications.map((a, i) => (
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
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Why CHIC</p>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-ink mb-4">
            Factory-direct from China
          </h2>
          <p className="text-brand-ink/85 leading-relaxed">{c.whyChic}</p>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────── */}
      <section className="mt-12">
        <div className="max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">FAQ</p>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-ink mb-6">
            Frequently asked
          </h2>
          <div className="space-y-3">
            {c.faqs.map((f, i) => (
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