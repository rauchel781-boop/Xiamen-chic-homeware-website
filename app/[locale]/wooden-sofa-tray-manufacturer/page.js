// /wooden-sofa-tray-manufacturer — hand-coded SEO landing page.
// Content extracted from the original WordPress page (4,878 chars), laid out
// with brand-consistent sections that mirror the home-page design language.
// Static route takes precedence over the [slug] catch-all.

import { unstable_setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';

const SLUG = 'wooden-sofa-tray-manufacturer';
const TITLE = 'Wooden Sofa Tray Manufacturer & OEM Supplier';
const META_DESC =
  'Direct manufacturer of wooden sofa trays in bamboo, acacia and pine — OEM & private label support, low MOQ, custom size and packaging for US & EU markets.';

export const metadata = {
  title: '7 Ways to Elevate Your Space with a Wooden Sofa Tray',
  description: META_DESC,
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    type: 'website',
    url: `${SITE.siteUrl}/${SLUG}`,
    title: TITLE,
    description: META_DESC,
    images: [{ url: '/wp-images/2026/01/13434.png', width: 1200, height: 800, alt: TITLE }],
    siteName: SITE.company.brand,
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: META_DESC },
};

// ─── Page data ────────────────────────────────────────────────────
const HERO = {
  kicker: 'Wooden Sofa Tray',
  h1: TITLE,
  lead:
    'Factory-direct manufacturer of wooden sofa trays in bamboo, acacia and pine — OEM, private label, low MOQ for US & EU buyers.',
  badges: [
    'Direct Factory in China',
    'Low MOQ for Trial Orders',
    'Export Experience for US & Europe',
  ],
  image: '/wp-images/2026/01/13434.png',
  imageAlt: 'Wooden sofa tray manufacturer factory product',
};

const PRODUCTS = {
  kicker: 'Our Wooden Sofa Trays',
  title: 'Custom Size & Material Available',
  lead:
    'We produce sofa arm trays, sofa organizer trays, and sofa trays with phone slots — wholesale or OEM, for retailers, Amazon sellers and brands.',
  items: [
    {
      title: 'Sofa Arm Tray',
      body: 'Classic wooden sofa armrest tray — sits securely on most couch armrests.',
      image: '/wp-images/2026/01/主图3.jpg',
    },
    {
      title: 'Sofa Organizer Tray',
      body: 'Multiple compartments for drinks, remotes, snacks, and personal items.',
      image: '/wp-images/2026/01/1-25.png',
    },
    {
      title: 'Sofa Tray with Phone Slot',
      body: 'Built-in slots for phone, tablet and remote — perfect for movie nights.',
      image: '/wp-images/2026/01/sofa-tray-2.png',
    },
    {
      title: 'Custom OEM Tray',
      body: 'Your size, layout, wood, finish and logo — from sample to bulk shipment.',
      image: '/wp-images/2026/01/sofa-tray-6.png',
    },
  ],
};

const EDU = {
  kicker: 'What Is a Wooden Sofa Tray?',
  title: 'A functional sofa accessory designed for everyday comfort.',
  paragraphs: [
    'A wooden sofa tray is a functional home accessory designed to sit securely on a sofa armrest, providing a stable surface for drinks, snacks, remote controls, and personal items.',
    'Compared with plastic or metal alternatives, wooden sofa trays offer a warmer appearance, better durability, and improved stability for everyday use.',
    'Popular styles include sofa arm trays, sofa organizer trays with compartments, and sofa trays with phone or tablet slots — widely used in living rooms, apartments, and hospitality settings.',
  ],
  image: '/wp-images/2026/01/sofa-tray-6.png',
  imageAlt: 'A wooden sofa tray on a couch with drinks and snacks',
};

const WHY = {
  kicker: 'Why Choose Us',
  title: 'Direct factory. OEM & private label support.',
  lead: 'Stable production, transparent pricing, and export-grade quality control.',
  items: [
    {
      title: 'Direct Factory in China',
      body: 'We are a direct manufacturer specializing in wooden sofa trays — stable quality, competitive pricing, and flexible production capacity.',
    },
    {
      title: 'OEM & Custom Design',
      body: 'Custom sizes, layouts, materials, finishes, and logo branding — for private label and wholesale buyers worldwide.',
    },
    {
      title: 'US & EU Market Experience',
      body: 'Products designed to meet the requirements of Amazon sellers, retailers, and distributors in the US and European markets.',
    },
  ],
};

const MATERIALS = {
  kicker: 'Materials',
  title: 'Multiple wood options for every market.',
  lead: 'Match the wood to your price point, brand story, and customer expectations.',
  items: [
    {
      name: 'Bamboo',
      image: '/wp-images/2026/01/11.png',
      bestFor: 'Best for: Daily heavy use and cold beverages.',
      knowledge: 'A dense, grass-based fiber that is naturally more water-resistant than traditional hardwoods.',
      benefit: 'The perfect "spill-proof" choice for iced drinks. Won’t warp or crack from condensation.',
    },
    {
      name: 'Acacia Wood',
      image: '/wp-images/2026/01/22.png',
      bestFor: 'Best for: High-end interior styling and durability.',
      knowledge: 'A dense, oily hardwood famous for its rich, contrasting "Tiger-stripe" grain.',
      benefit: 'Almost impossible to scratch — stands up to daily wear while adding a custom-built look.',
    },
    {
      name: 'Pine Wood',
      image: '/wp-images/2026/01/44.png',
      bestFor: 'Best for: Cozy farmhouse vibes and natural scents.',
      knowledge: 'Features prominent knots and a soft, straight grain that tells a story of the forest.',
      benefit: 'Brings a warm "hygge" feel — the most budget-friendly solid wood option with a relaxing natural scent.',
    },
    {
      name: 'Paulownia Wood',
      image: '/wp-images/2026/01/33.png',
      bestFor: 'Best for: Expensive leather sofas and delicate fabrics.',
      knowledge: 'Often called the "Aluminum of Timber" — incredibly low density but high strength-to-weight ratio.',
      benefit: '40% lighter than pine. Provides a stable surface without leaving "pressure dents" on luxury sofa armrests.',
    },
  ],
};

const APPLICATIONS = {
  kicker: 'Applications',
  title: 'Designed for everyday living, gifting, and commercial use.',
  items: [
    {
      title: 'Living Room Use',
      body: 'Perfect for drinks, snacks, remotes, and phones while relaxing on the sofa.',
      image: '/wp-images/2026/01/sofa-tray.png',
    },
    {
      title: 'Small Space Solution',
      body: 'A space-saving sofa tray designed for apartments, condos, and compact homes.',
      image: '/wp-images/2026/01/222222.png',
    },
    {
      title: 'Gift & Retail Ready',
      body: 'A popular wooden gift item for housewarming, holidays, and lifestyle brands.',
      image: '/wp-images/2026/01/3333333.png',
    },
    {
      title: 'Hospitality & Commercial Use',
      body: 'Widely used in hotels, serviced apartments, and Airbnb properties.',
      image: '/wp-images/2026/01/444444.png',
    },
  ],
};

const PROCESS = {
  kicker: 'OEM & Private Label',
  title: 'From sample to bulk in 5 clear steps.',
  lead: 'Custom size, layout, finish, and logo — handled end-to-end by one factory team.',
  steps: [
    { n: '01', title: 'Share Your Idea', body: 'Send target size, function (phone slot / cup holder / compartments), and reference photos.' },
    { n: '02', title: 'Design & Quote', body: '24–48 hour turnaround. We confirm specs and offer a clear quotation with options.' },
    { n: '03', title: 'Sample Making', body: '7–12 days. Prototype for fit, stability, and finishing approval.' },
    { n: '04', title: 'Mass Production', body: 'Stable QC standards, moisture control, and consistent finishing across batches.' },
    { n: '05', title: 'Packaging & Shipping', body: 'Retail box / color box / Amazon-ready packaging available. We coordinate worldwide shipping.' },
  ],
  bullets: [
    'Low MOQ for trial orders',
    'Logo: Laser / Print / Engraving',
    'Packaging: Color box & barcode available',
  ],
};

const BREADCRUMB = [{ name: 'Home', url: '/' }, { name: 'Wooden Sofa Tray Manufacturer' }];

// ─── Page component ──────────────────────────────────────────────
export default function WoodenSofaTrayPage({ params }) {
  unstable_setRequestLocale(params.locale);

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: BREADCRUMB.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url ? `${SITE.siteUrl}${c.url}` : `${SITE.siteUrl}/${SLUG}`,
    })),
  };

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Wooden Sofa Tray',
    description: META_DESC,
    image: PRODUCTS.items.map(it => `${SITE.siteUrl}${it.image}`),
    brand: { '@type': 'Brand', name: SITE.company.brand },
    manufacturer: { '@type': 'Organization', name: SITE.company.legalName },
  };

  return (
    <article className="bg-white">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={productLd} />

      {/* ─── HERO ──────────────────────────────────────────── */}
      <header className="bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <nav className="text-xs text-brand-mute mb-4">
            <Link href="/" className="hover:text-brand-green">Home</Link>
            {' / '}
            <span className="text-brand-ink">Wooden Sofa Tray Manufacturer</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
                {HERO.kicker}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-brand-ink leading-[1.1]">
                Wooden Sofa Tray{' '}
                <span className="text-brand-green">Manufacturer</span>
                {' & '}OEM Supplier
              </h1>
              <p className="mt-5 text-brand-mute leading-relaxed text-[17px] max-w-xl">
                {HERO.lead}
              </p>
              <ul className="mt-6 grid sm:grid-cols-3 gap-3">
                {HERO.badges.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-2 bg-white border border-brand-line rounded-full px-4 py-2 text-sm font-semibold text-brand-ink"
                  >
                    <span className="w-2 h-2 rounded-full bg-brand-green" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition"
                >
                  Get a Free Quote
                </Link>
                <Link
                  href="/products/wooden-sofa-tray"
                  className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition"
                >
                  Browse Products
                </Link>
              </div>
            </div>
            <div className="aspect-[4/3] bg-white rounded-2xl overflow-hidden border border-brand-line shadow-sm">
              <img
                src={HERO.image}
                alt={HERO.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* ─── PRODUCTS ───────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              {PRODUCTS.kicker}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">
              {PRODUCTS.title}
            </h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">{PRODUCTS.lead}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.items.map((it) => (
              <article
                key={it.title}
                className="group bg-white rounded-2xl border border-brand-line overflow-hidden hover:border-brand-green/40 hover:shadow-lg transition"
              >
                <div className="aspect-square bg-brand-cream overflow-hidden">
                  <img
                    src={it.image}
                    alt={it.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-brand-ink mb-2 leading-snug">
                    {it.title}
                  </h3>
                  <p className="text-sm text-brand-mute leading-relaxed">{it.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EDUCATIONAL — image left, text right ───────────── */}
      <section className="py-16 lg:py-20 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="aspect-[4/3] bg-white rounded-2xl overflow-hidden border border-brand-line">
              <img src={EDU.image} alt={EDU.imageAlt} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
                {EDU.kicker}
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-tight mb-5">
                {EDU.title}
              </h2>
              <div className="space-y-4 text-brand-mute leading-relaxed text-[16px]">
                {EDU.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ──────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              {WHY.kicker}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">
              {WHY.title}
            </h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">{WHY.lead}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {WHY.items.map((it, i) => (
              <article
                key={it.title}
                className="bg-brand-cream rounded-2xl border border-brand-line p-7 hover:border-brand-green/40 hover:shadow-md transition"
              >
                <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mb-4 font-bold text-sm">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-lg font-bold text-brand-ink mb-2 leading-snug">{it.title}</h3>
                <p className="text-sm text-brand-mute leading-relaxed">{it.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MATERIALS ──────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              {MATERIALS.kicker}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">
              {MATERIALS.title}
            </h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">{MATERIALS.lead}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MATERIALS.items.map((it) => (
              <article
                key={it.name}
                className="group bg-white rounded-2xl border border-brand-line overflow-hidden hover:border-brand-green/40 hover:shadow-lg transition flex flex-col"
              >
                <div className="aspect-square bg-brand-cream overflow-hidden">
                  <img
                    src={it.image}
                    alt={`${it.name} sofa tray`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-brand-ink mb-1">{it.name}</h3>
                  <p className="text-[13px] font-semibold text-brand-green mb-3">{it.bestFor}</p>
                  <p className="text-sm text-brand-mute leading-relaxed mb-3">
                    <span className="font-semibold text-brand-ink">The Knowledge: </span>
                    {it.knowledge}
                  </p>
                  <p className="text-sm text-brand-mute leading-relaxed">
                    <span className="font-semibold text-brand-ink">The Sofa Benefit: </span>
                    {it.benefit}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── APPLICATIONS ───────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              {APPLICATIONS.kicker}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">
              {APPLICATIONS.title}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {APPLICATIONS.items.map((it) => (
              <article
                key={it.title}
                className="group bg-brand-cream rounded-2xl overflow-hidden hover:shadow-lg transition"
              >
                <div className="aspect-[4/3] bg-white overflow-hidden">
                  <img
                    src={it.image}
                    alt={it.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-brand-ink mb-2 leading-snug">
                    {it.title}
                  </h3>
                  <p className="text-sm text-brand-mute leading-relaxed">{it.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OEM PROCESS ────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              {PROCESS.kicker}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">
              {PROCESS.title}
            </h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">{PROCESS.lead}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {PROCESS.steps.map((s) => (
              <div
                key={s.n}
                className="bg-white rounded-2xl border border-brand-line p-6 hover:border-brand-green/40 hover:shadow-md transition"
              >
                <div className="text-3xl font-extrabold text-brand-green/30 leading-none mb-3">
                  {s.n}
                </div>
                <h3 className="text-[15px] font-bold text-brand-ink mb-2 leading-snug">{s.title}</h3>
                <p className="text-[13px] text-brand-mute leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {PROCESS.bullets.map((b) => (
              <div
                key={b}
                className="flex items-center gap-3 bg-white border border-brand-line rounded-xl px-4 py-3 text-sm font-semibold text-brand-ink"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-brand-green flex-shrink-0"
                >
                  <path
                    d="M3 8.5l3.5 3.5L13 5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {b}
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-brand-green px-8 py-3.5 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition"
            >
              Request a Sample → Reply within 12h on working days
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ──────────────────────────────────────── */}
      <section className="bg-brand-green text-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-wood mb-3">
                Ready to start
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                Let&apos;s build your wooden sofa tray program.
              </h2>
              <p className="mt-4 text-white/85 leading-relaxed text-[16px] max-w-xl">
                Tell us your size, material and packaging needs — we&apos;ll send a full quote
                with samples and lead-time within one business day.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-brand-wood px-7 py-3 text-[15px] font-semibold text-brand-ink hover:bg-brand-woodSoft transition"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/products/wooden-sofa-tray"
                className="inline-flex items-center rounded-full border-2 border-white px-7 py-3 text-[15px] font-semibold text-white hover:bg-white hover:text-brand-green transition"
              >
                View Sofa Tray Products →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
