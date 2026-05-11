// /custom-wooden-products-manufacturer — hand-coded company / product overview page.
import { unstable_setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';
import { hreflangFor } from '@/i18n/routing';

const SLUG = 'custom-wooden-products-manufacturer';
const TITLE = 'Custom Wooden Products Manufacturer in China';
const META_DESC =
  'Custom wooden products manufacturer in China specializing in wooden and bamboo organizers, gift boxes, and OEM private label solutions for global brands.';

export const metadata = {
  title: 'Custom Wooden Products Manufacturer in China | OEM & Private Label Supplier',
  description: META_DESC,
  alternates: { canonical: `/${SLUG}`, languages: hreflangFor(SITE.siteUrl, `/${SLUG}`) },
  openGraph: { type: 'website', url: `${SITE.siteUrl}/${SLUG}`, title: TITLE, description: META_DESC,
    images: [{ url: '/wp-images/2025/12/production.jpg', width: 1200, height: 800, alt: TITLE }],
    siteName: SITE.company.brand },
  twitter: { card: 'summary_large_image', title: TITLE, description: META_DESC },
};

const HERO = {
  kicker: 'Wooden Products Manufacturer',
  badges: ['Factory in Cao County, Shandong', 'OEM & ODM', 'FBA-ready packaging'],
  lead: 'Xiamen Chic Homeware is a custom wooden products manufacturer in China — factory-direct OEM and private label solutions for global brands, importers, wholesalers, and distributors.',
  image: '/wp-images/2025/12/production.jpg',
};

const REAL_PRODUCTS = [
  { title: 'Wooden Egg Tray with Storage Drawer', image: '/wp-images/2026/02/1-7.jpg' },
  { title: 'Wooden Bread Cutting Board', image: '/wp-images/2026/02/1-1.jpg' },
  { title: 'Walnut Wood Jewelry Box', image: '/wp-images/2026/02/10.jpg' },
  { title: 'Wooden Metal Wall Shelf', image: '/wp-images/2026/02/1-4.jpg' },
  { title: 'Acacia Wood Cheese Board with Slate Insert', image: '/wp-images/2026/02/1-4.png' },
  { title: 'Wood Storage Drawer for Coffee & Tea', image: '/wp-images/2026/02/1-5.jpg' },
  { title: 'Acacia Wood Knife Block', image: '/wp-images/2026/02/1-5.webp' },
  { title: 'Wood Coffee Pot Storage Box', image: '/wp-images/2026/02/1-6.jpg' },
];

const CATEGORIES = [
  { title: 'Wooden Kitchen & Dining', body: 'Trays, cutting boards, bread boxes, spice racks.', href: '/products/wooden-kitchen-dining' },
  { title: 'Storage & Home Organization', body: 'Storage boxes, pantry organizers, keepsake boxes.', href: '/products/storage-home-organization' },
  { title: 'Desk & Office Organizers', body: 'Desk trays, drawer organizers, valet trays.', href: '/products/desk-office-organizers' },
  { title: 'Gift Boxes & Retail Packaging', body: 'Gift boxes, subscription box packaging, branded boxes.', href: '/products/gift-boxes-retail-packaging' },
  { title: 'Hospitality & Commercial', body: 'Hotel amenities, Airbnb trays, room organizers.', href: '/products/hospitality-commercial' },
  { title: 'OEM & Custom Projects', body: 'Custom design, size, material, logo, packaging.', href: '/contact' },
];

const WHY = [
  { title: 'Factory Direct Manufacturer', body: 'In-house production in China with full control over quality, cost, and delivery.' },
  { title: 'Export-Grade Wood Control', body: 'Kiln-dried solid wood, moisture controlled at 8–12% to prevent cracking and warping.' },
  { title: 'OEM & Private Label Ready', body: 'Laser engraving, custom sizes, packaging and logo branding for your market.' },
  { title: 'Built for International Shipping', body: 'Drop-tested cartons, barcodes, and packaging designed for Amazon FBA and retail.' },
];

const PROCESS = [
  { n: '01', title: 'Send Your Design or Idea', body: 'Share your logo, product type, size, or reference photos. Our team reviews your requirements.' },
  { n: '02', title: 'Get Quotation & Sample', body: 'We provide pricing, lead time, and optional pre-production samples for approval.' },
  { n: '03', title: 'Production & Quality Control', body: 'Mass production with moisture control, assembly, and in-house quality inspection.' },
  { n: '04', title: 'Packaging & Global Shipping', body: 'Amazon-ready packaging and worldwide shipping coordinated end-to-end.' },
];

const BREADCRUMB = [{ name: 'Home', url: '/' }, { name: 'Custom Wooden Products Manufacturer' }];

export default function Page({ params }) {
  unstable_setRequestLocale(params.locale);
  const breadcrumbLd = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: BREADCRUMB.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url ? `${SITE.siteUrl}${c.url}` : `${SITE.siteUrl}/${SLUG}` })) };

  return (
    <article className="bg-white">
      <JsonLd data={breadcrumbLd} />

      <header className="bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <nav className="text-xs text-brand-mute mb-4">
            <Link href="/" className="hover:text-brand-green">Home</Link>{' / '}
            <span className="text-brand-ink">Custom Wooden Products Manufacturer</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">{HERO.kicker}</p>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-brand-ink leading-[1.1]">
                Custom Wooden <span className="text-brand-green">Products</span> Manufacturer in China
              </h1>
              <p className="mt-2 text-lg font-semibold text-brand-mute">OEM & Private Label Wooden Products Factory for Global Brands</p>
              <p className="mt-5 text-brand-mute leading-relaxed text-[17px] max-w-xl">{HERO.lead}</p>
              <ul className="mt-6 grid sm:grid-cols-3 gap-3">
                {HERO.badges.map(b => <li key={b} className="flex items-center gap-2 bg-white border border-brand-line rounded-full px-4 py-2 text-sm font-semibold text-brand-ink"><span className="w-2 h-2 rounded-full bg-brand-green" />{b}</li>)}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition">Start a Custom Project</Link>
                <Link href="/products" className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition">View Categories</Link>
              </div>
            </div>
            <div className="aspect-[4/3] bg-white rounded-2xl overflow-hidden border border-brand-line shadow-sm">
              <img src={HERO.image} alt={TITLE} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      {/* INTRO */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[820px] mx-auto px-6 lg:px-8">
          <p className="text-brand-mute leading-relaxed text-[16px] mb-4">
            Our manufacturing base is located in <strong className="text-brand-ink">Cao County, Shandong</strong>, one of China&apos;s most established wooden products production hubs — enabling stable mass production, material control, and consistent quality standards for export-oriented orders.
          </p>
          <p className="text-brand-mute leading-relaxed text-[16px] mb-4">
            We manufacture a wide range of customized wooden items including <strong className="text-brand-ink">wooden boxes, organizers, trays, kitchen storage products, and gift packaging solutions</strong>. We work with paulownia, pine, acacia, walnut, bamboo, and engineered wood — selected based on durability, cost efficiency, and application requirements.
          </p>
          <p className="text-brand-mute leading-relaxed text-[16px]">
            Our factory supports OEM &amp; ODM manufacturing, private label branding, custom sizes, structural development, laser engraving, logo customization, and retail-ready packaging — designed to meet international standards for North America, Europe, the UK, and Australia.
          </p>
        </div>
      </section>

      {/* REAL PRODUCTS */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Real Products</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">OEM & ODM Manufacturing</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">Selected solid wood &amp; bamboo products we manufacture for global brands.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {REAL_PRODUCTS.map(p => (
              <article key={p.title} className="group bg-white rounded-2xl border border-brand-line overflow-hidden hover:border-brand-green/40 hover:shadow-lg transition">
                <div className="aspect-square bg-brand-cream overflow-hidden">
                  <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-brand-ink leading-snug">{p.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Product Categories</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">Choose a Product Category</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES.map((c, i) => (
              <Link key={c.title} href={c.href} className="group bg-brand-cream rounded-2xl border border-brand-line p-7 hover:border-brand-green/40 hover:shadow-md transition flex flex-col">
                <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mb-4 font-bold text-sm">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-lg font-bold text-brand-ink mb-2 leading-snug">{c.title}</h3>
                <p className="text-sm text-brand-mute leading-relaxed flex-1">{c.body}</p>
                <span className="mt-4 text-sm font-semibold text-brand-green group-hover:underline">View examples →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Why Choose CHIC</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">Why Global Brands Choose CHIC Wooden Expert</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY.map((w, i) => (
              <article key={w.title} className="bg-white rounded-2xl border border-brand-line p-7 hover:border-brand-green/40 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mb-4 font-bold text-sm">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-base font-bold text-brand-ink mb-2 leading-snug">{w.title}</h3>
                <p className="text-sm text-brand-mute leading-relaxed">{w.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Process</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">How to Get Your Custom Wooden & Bamboo Products</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">A simple 4-step process from idea to finished products — built for global brands and Amazon sellers.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS.map(s => (
              <div key={s.n} className="bg-brand-cream rounded-2xl border border-brand-line p-6 hover:border-brand-green/40 hover:shadow-md transition">
                <div className="text-3xl font-extrabold text-brand-green/30 leading-none mb-3">{s.n}</div>
                <h3 className="text-[15px] font-bold text-brand-ink mb-2 leading-snug">{s.title}</h3>
                <p className="text-[13px] text-brand-mute leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-green text-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-wood mb-3">Start a Custom Project</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">Ready to manufacture in China?</h2>
              <p className="mt-4 text-white/85 leading-relaxed text-[16px] max-w-xl">Tell us your product idea, target market, and quantities — we&apos;ll send a full quote with samples and lead-time within one business day.</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/contact" className="inline-flex items-center rounded-full bg-brand-wood px-7 py-3 text-[15px] font-semibold text-brand-ink hover:bg-brand-woodSoft transition">Start a Custom Project</Link>
              <Link href="/about" className="inline-flex items-center rounded-full border-2 border-white px-7 py-3 text-[15px] font-semibold text-white hover:bg-white hover:text-brand-green transition">About Our Factory</Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
