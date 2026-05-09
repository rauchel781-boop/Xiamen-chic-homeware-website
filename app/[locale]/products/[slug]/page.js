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

// Build hreflang map for a path — used in metadata.alternates.languages
function buildAlternates(path) {
  const langs = {};
  for (const loc of routing.locales) langs[loc] = `/${loc}${path}`;
  langs['x-default'] = `/${routing.defaultLocale}${path}`;
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
      alternates: { canonical: path},
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
  const p = wpProductBySlug(params.slug);
  if (p) {
    const title = stripHtml(p.title);
    const desc  = p.meta_desc || stripHtml(p.excerpt || p.content).slice(0, 160);
    const img   = p.featured_image || `${SITE.siteUrl}/logo.png`;
    return {
      title,
      description: desc,
      alternates: { canonical: path},
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
  const p = wpProductBySlug(params.slug);
  if (p)    return <ProductView p={p} locale={params.locale} />;
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
  const items = wpProductsByCategory(cat.slug);
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

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: stripHtml(p.title),
    description: stripHtml(p.excerpt || p.content).slice(0, 5000) || `Custom OEM/ODM ${stripHtml(p.title)} from CHIC, a wooden products manufacturer in China.`,
    image: [p.featured_image, ...(p.gallery || [])].filter(Boolean).slice(0, 6).map((u) => u.startsWith('http') ? u : `${SITE.siteUrl}${u}`),
    sku: p.sku || String(p.id),
    brand: { '@type': 'Brand', name: SITE.company.brand },
    manufacturer: { '@id': `${SITE.siteUrl}/#organization` },
    category: p.categories?.[0]?.name || 'Wooden Products',
    url: `${SITE.siteUrl}/products/${p.slug}`,
    // No public price — explicitly mark as a quote-only B2B product so Google
    // doesn't expect a Product/Offer with price (avoids "fake offers" flag).
    offers: {
      '@type': 'Offer',
      url: `${SITE.siteUrl}/contact`,
      priceCurrency: 'USD',
      price: '0',
      priceValidUntil: '2099-12-31',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      businessFunction: 'https://schema.org/Sell',
      eligibleQuantity: { '@type': 'QuantitativeValue', minValue: 100, unitCode: 'C62' },
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

        {p.content && (
          <section className="border-t border-brand-line pt-10">
            <div className="wp-content max-w-4xl mx-auto" dangerouslySetInnerHTML={{__html: p.content}} />
          </section>
        )}

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
      </div>
    </article>
  );
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       