// /products — full product catalog with editorial hero, visual category
// showcase, material chips, sticky sidebar and rich product cards.

import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';
import { wpProducts, wpProductCategories, wpProductCategoryTree } from '@/lib/wp-data';
import { localizeProduct } from '@/lib/translated-content';
import { hreflangFor, canonicalFor } from '@/i18n/routing';

export async function generateMetadata({ params: { locale } = {} }) {
  return {
    title: 'All Products — Custom Wooden & Bamboo Manufacturer',
    description: 'Browse 178+ wooden and bamboo home storage products — kitchen, organizers, gift packaging, hospitality. OEM & ODM ready. 45 categories.',
    alternates: { canonical: canonicalFor(locale, '/products'), languages: hreflangFor(SITE.siteUrl, '/products') },
    openGraph: {
      type: 'website',
      url: `${SITE.siteUrl}/products`,
      title: 'All Products — Custom Wooden & Bamboo Manufacturer',
      description: 'Browse 178+ wooden and bamboo home storage products. OEM & ODM ready.',
      siteName: SITE.company.brand,
    },
  };
}

const SHOWCASE = [
  { slug: 'wooden-kitchen-dining',     label: 'Kitchen & Dining',          blurb: 'Cutting boards, cheese boards, bread boxes, spice racks, cutlery organizers.' },
  { slug: 'storage-home-organization', label: 'Storage & Home Organization', blurb: 'Bathroom, pantry, keepsake, countertop and entryway organizers.' },
  { slug: 'gift-boxes-retail-packaging', label: 'Gift & Retail Packaging', blurb: 'Watch, jewelry, tea, coffee, wine and presentation boxes for retail.' },
  { slug: 'desk-office-organizers',    label: 'Desk & Office',             blurb: 'Drawer organizers, pen holders, document trays, valet trays.' },
  { slug: 'pet-products',              label: 'Pet Products',              blurb: 'Bowl stands, food storage, toy boxes, feeding stations.' },
  { slug: 'hospitality-commercial',    label: 'Hospitality & Commercial',  blurb: 'Hotel amenity trays, restaurant caddies, Airbnb welcome kits.' },
];

const MATERIAL_CHIPS = [
  { name: 'Acacia',    href: '/material-guide#acacia' },
  { name: 'Walnut',    href: '/material-guide#walnut' },
  { name: 'Bamboo',    href: '/material-guide#bamboo' },
  { name: 'Pine',      href: '/material-guide#pine' },
  { name: 'Oak',       href: '/material-guide#oak' },
  { name: 'Beech',     href: '/material-guide#beech' },
  { name: 'Paulownia', href: '/material-guide#paulownia' },
  { name: 'Teak',      href: '/material-guide#teak' },
];

export default function ProductsIndex({ params: { locale } }) {
  unstable_setRequestLocale(locale);

  // Localize product titles for the active locale (English passes through).
  const products = wpProducts().map((p) => localizeProduct(p, locale));
  const categoryTree = wpProductCategoryTree();
  const allCats = wpProductCategories();

  const cover = (slug) => {
    let p = products.find((p) => p.featured_image && p.categories?.some((c) => c.slug === slug));
    if (p) return p.featured_image;
    const cat = allCats.find((c) => c.slug === slug);
    if (!cat) return '';
    const childSlugs = allCats.filter((c) => String(c.parent) === String(cat.id)).map((c) => c.slug);
    p = products.find((p) => p.featured_image && p.categories?.some((c) => childSlugs.includes(c.slug)));
    return p?.featured_image || '';
  };

  const trending = products.filter((p) => p.featured_image).slice(0, 4);

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Products' },
    ],
  };
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All Products',
    url: `${SITE.siteUrl}/products`,
    isPartOf: { '@id': `${SITE.siteUrl}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: products.length,
      itemListElement: products.slice(0, 30).map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE.siteUrl}/products/${p.slug}`,
        name: p.title,
      })),
    },
  };

  return (
    <article className="bg-white">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={itemListLd} />

      {/* ── Hero header ── */}
      <header className="bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <nav className="text-xs text-brand-mute mb-4">
            <Link href="/" className="hover:text-brand-green">Home</Link>
            {' / '}
            <span className="text-brand-ink">Products</span>
          </nav>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
            Our Catalog
          </p>
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-end">
            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-brand-ink leading-[1.1]">
              {products.length}+ wooden products,{' '}
              <span className="text-brand-green">all OEM &amp; ODM ready.</span>
            </h1>
            <p className="text-brand-mute leading-relaxed lg:pb-3">
              From small Amazon-FBA SKUs to multi-store retail programs — every product
              on this page can be customized in size, finish, branding and packaging.
              Browse by category, material, or scroll the full grid.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center rounded-full bg-white border border-brand-line px-4 py-2">
              <span className="font-extrabold text-brand-ink mr-2">{products.length}</span>
              <span className="text-brand-mute">SKUs</span>
            </span>
            <span className="inline-flex items-center rounded-full bg-white border border-brand-line px-4 py-2">
              <span className="font-extrabold text-brand-ink mr-2">{categoryTree.length}</span>
              <span className="text-brand-mute">Categories</span>
            </span>
            <span className="inline-flex items-center rounded-full bg-white border border-brand-line px-4 py-2">
              <span className="font-extrabold text-brand-ink mr-2">12</span>
              <span className="text-brand-mute">Wood materials</span>
            </span>
            <span className="inline-flex items-center rounded-full bg-white border border-brand-line px-4 py-2">
              <span className="font-extrabold text-brand-ink mr-2">100</span>
              <span className="text-brand-mute">Pcs MOQ from</span>
            </span>
          </div>
        </div>
      </header>

      {/* ── Visual category showcase ── */}
      <section className="py-16 lg:py-20 border-b border-brand-line">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
                Browse by Category
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
                Six core product collections
              </h2>
            </div>
            <Link href="#all-products" className="hidden md:inline-flex items-center text-sm font-semibold text-brand-green hover:text-brand-greenDark">
              Skip to full grid ↓
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5">
            {SHOWCASE.map((s) => {
              const img = cover(s.slug);
              return (
                <Link key={s.slug} href={`/products/${s.slug}`} className="group bg-white rounded-2xl overflow-hidden border border-brand-line hover:shadow-lg transition">
                  <div className="relative aspect-[4/3] bg-brand-cream overflow-hidden">
                    {img && (
                      <Image
                        src={img}
                        alt={s.label}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5 text-white">
                      <h3 className="text-lg lg:text-xl font-extrabold">{s.label}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-brand-mute leading-relaxed line-clamp-2">{s.blurb}</p>
                    <span className="mt-3 inline-flex items-center text-sm font-semibold text-brand-green group-hover:text-brand-greenDark">
                      View Category →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Material filter chips ── */}
      <section className="py-12 lg:py-14 bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-2">By Material</p>
              <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-brand-ink">
                Looking for a specific wood? Start here.
              </h2>
            </div>
            <Link href="/material-guide" className="inline-flex items-center text-sm font-semibold text-brand-green hover:text-brand-greenDark self-start md:self-auto">
              Read the full material guide →
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {MATERIAL_CHIPS.map((m) => (
              <Link key={m.name} href={m.href} className="inline-flex items-center rounded-full bg-white border border-brand-line px-4 py-2 text-sm font-semibold text-brand-ink hover:border-brand-green hover:bg-brand-green hover:text-white transition">
                {m.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trending ── */}
      {trending.length > 0 && (
        <section className="py-14 border-b border-brand-line">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
            <div className="mb-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-2">Trending Now</p>
              <h2 className="text-xl md:text-2xl font-extrabold text-brand-ink">Recently developed pieces</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5">
              {trending.map((p) => <ProductCard key={p.id} p={p} compact />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Full catalog with sidebar ── */}
      <section id="all-products" className="scroll-mt-24 py-16 lg:py-20">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-10">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-2">Full Catalog</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-tight">Every product, all in one place</h2>
              <p className="mt-3 text-brand-mute">
                {products.length} products across {categoryTree.length} categories.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="bg-brand-cream border border-brand-line rounded-2xl p-5">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-green mb-4">All Categories</h3>
                <ul className="space-y-1 text-sm">
                  {categoryTree.map((c) => (
                    <li key={c.id}>
                      <Link href={`/products/${c.slug}`} className="flex items-center justify-between py-1.5 px-2 rounded-md text-brand-ink hover:bg-white hover:text-brand-green font-semibold">
                        <span>{c.name}</span>
                        {c.children?.length > 0 && <span className="text-[10px] text-brand-mute font-normal">{c.children.length}</span>}
                      </Link>
                      {c.children?.length > 0 && (
                        <ul className="ml-3 mt-0.5 mb-1 border-l border-brand-line/70 pl-2 space-y-0.5">
                          {c.children.map((sc) => (
                            <li key={sc.id}>
                              <Link href={`/products/${sc.slug}`} className="block py-1 px-2 rounded text-[13px] text-brand-mute hover:bg-white hover:text-brand-green">
                                {sc.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 bg-brand-greenDeep text-white rounded-2xl p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-yellowSoft mb-2">Can&apos;t find it?</p>
                <h4 className="font-extrabold text-base mb-2 leading-snug">Send us your sketch — we&apos;ll quote any wooden product.</h4>
                <Link href="/contact#form" className="mt-3 inline-flex items-center rounded-full bg-white text-brand-green px-4 py-2 text-xs font-bold hover:bg-brand-cream transition">
                  Custom Inquiry →
                </Link>
              </div>
            </aside>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
              {products.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-brand-cream py-16 lg:py-20 border-t border-brand-line">
        <div className="max-w-[900px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Don&apos;t See It?</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-ink mb-4 leading-tight">
            We can build wooden products beyond this catalog.
          </h2>
          <p className="text-brand-mute leading-relaxed mb-8">
            These 178 SKUs are the ones we&apos;ve already tooled. Send us a sketch, a competitor
            product, or just a written brief — we develop new wooden products from scratch every week.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact#form" className="inline-flex items-center rounded-full bg-brand-green px-8 py-3.5 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition">
              Start a Custom Project
            </Link>
            <Link href="/material-guide" className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-8 py-3.5 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition">
              Material Guide
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

function ProductCard({ p, compact = false }) {
  return (
    <Link href={`/products/${p.slug}`} className="group block">
      <div className="relative aspect-square bg-brand-cream rounded-xl overflow-hidden border border-brand-line">
        {p.featured_image ? (
          <Image
            src={p.featured_image}
            alt={p.title || 'Wooden product'}
            fill
            sizes={compact ? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px" : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"}
            className="object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brand-mute text-xs uppercase tracking-wider">No image</div>
        )}
        {!compact && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/95 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold text-brand-green shadow-sm">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-green" />
            OEM Ready
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-white text-brand-green px-3.5 py-1.5 text-[11px] font-bold shadow-md translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition">
          View
          <svg viewBox="0 0 14 14" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 7h10M8 3l4 4-4 4" />
          </svg>
        </span>
      </div>
      <h3 className="mt-3 text-sm font-semibold text-brand-ink group-hover:text-brand-green line-clamp-2 leading-snug transition">
        {p.title}
      </h3>
      {p.categories?.[0] && !compact && (
        <p className="mt-1 text-[11px] uppercase tracking-wider text-brand-mute">{p.categories[0].name}</p>
      )}
    </Link>
  );
}
