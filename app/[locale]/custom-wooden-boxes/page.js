// /custom-wooden-boxes — hand-coded SEO landing page (~13k chars original).
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';
import { hreflangFor } from '@/i18n/routing';

const SLUG = 'custom-wooden-boxes';
const TITLE = 'Custom Wooden Boxes Manufacturer for Wholesale & Private Label';
const META_DESC =
  'Factory-direct custom wooden boxes for brands, retailers, and Amazon sellers. Low MOQ, OEM branding, premium wood options, and global shipping.';

export const metadata = {
  title: 'Custom Wooden Boxes Manufacturer | OEM & Wholesale Supplier China',
  description: META_DESC,
  alternates: { canonical: `/${SLUG}`, languages: hreflangFor(SITE.siteUrl, `/${SLUG}`) },
  openGraph: {
    type: 'website',
    url: `${SITE.siteUrl}/${SLUG}`,
    title: TITLE,
    description: META_DESC,
    images: [{ url: '/wp-images/2026/01/11-1.png', width: 1200, height: 800, alt: TITLE }],
    siteName: SITE.company.brand,
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: META_DESC },
};

const HERO = {
  kicker: 'Custom Wooden Boxes',
  badges: ['Low MOQ for trial orders', 'OEM private label & logo', 'Multiple wood options'],
  lead: 'Factory-direct wooden box manufacturer in China — custom sizes, OEM branding, premium wood options, and export-ready packaging for brands, retailers and Amazon sellers.',
  image: '/wp-images/2026/03/natural-wood-box-8.png',
};

const CATEGORIES = [
  { title: 'Wooden Jewelry Box', body: 'Rings, necklaces, bracelets, earrings — with custom lining, velvet inserts, mirrors, compartments, and branding.', image: '/wp-images/2026/01/11-1.png', href: '/products/wooden-jewelry-boxes' },
  { title: 'Wooden Keepsake Box', body: 'Personal gifts, memory storage, decorative packaging — custom size, wood, lid, finish, and logo.', image: '/wp-images/2026/01/22-1.png', href: '/products/wooden-keepsake-boxes' },
  { title: 'Wooden Watch Box', body: 'For watch brands, collectors, promotional packaging — pillows, glass lids, metal hardware, custom logo.', image: '/wp-images/2026/01/33.jpg', href: '/products/wooden-watch-boxes' },
  { title: 'Wooden Wine Box', body: 'Single-bottle, double-bottle, or premium gift packaging — custom dividers, handles, and branding.', image: '/wp-images/2026/01/44-1.png', href: '/products/wooden-wine-box' },
  { title: 'Wooden Packaging Boxes', body: 'For candles, cosmetics, chocolates, essential oils — custom inserts, logo branding, low MOQ OEM.', image: '/wp-images/2026/03/natural-wood-box-8.png', href: '/products/gift-boxes-retail-packaging' },
  { title: 'Wooden Display Boxes', body: 'Retail display, countertop showcases — glass panels, compartments, logo printing, custom structures.', image: '/wp-images/2026/02/1-5.png', href: '/products/gift-boxes-retail-packaging' },
  { title: 'Custom Wooden Gift Boxes', body: 'Gift packaging, seasonal promos, corporate gifting — different sizes, finishes, logos, inserts.', image: '/wp-images/2026/02/Portable-Artist-Sketchbox-10.png', href: '/products/gift-boxes-retail-packaging' },
  { title: 'Wooden Tea Boxes', body: 'For tea brands, gift sets — compartments, glass lids, engraved logos, custom inner layouts.', image: '/wp-images/2026/01/55.jpg', href: '/products/wooden-tea-box' },
  { title: 'Wooden Storage Box with Lid', body: 'Home organization, desktop storage, kitchen storage, decorative retail packaging.', image: '/wp-images/2026/03/Face-Towel-Holder-Box-2.png', href: '/products/wooden-storage-box-with-lid' },
];

const STYLES = [
  { title: 'Hinged Lid', body: 'Most popular for gift packaging, storage, premium presentation. Customize hinges, locks, handles, inserts, logos.', image: '/wp-images/2026/03/image-3.png' },
  { title: 'Sliding Lid', body: 'Ideal for tea, gift sets, keepsake boxes, promotional packaging. Clean look with flexible customization.', image: '/wp-images/2026/03/Wooden-Storage-Box-7.jpg' },
  { title: 'Magnetic Closure', body: 'Premium gift packaging — strong presentation feel without visible hardware.', image: '/wp-images/2026/02/ring-box-2.png' },
  { title: 'With Compartments', body: 'For jewelry, essential oils, tea bags — multi-item storage or presentation sets.', image: '/wp-images/2026/02/holder-10.jpg' },
  { title: 'Glass Lid', body: 'Visual showcase for premium products — collector boxes, retail display, jewelry.', image: '/wp-images/2026/01/Slim-Wooden-Double-Ring-Box-5.png' },
  { title: 'Lock or Clasp', body: 'Decorative + practical — vintage look, added security, stronger display value.', image: '/wp-images/2026/03/ScreenShot_2026-03-17_200616_970.png' },
  { title: 'Lift-Off Lid', body: 'Simple removable lid — perfect for chocolates, soaps, candles and stackable retail boxes.', image: '/wp-images/2026/02/box-design.jpg' },
  { title: 'With Inserts', body: 'EVA foam, velvet, microfiber, molded pulp — protect product and elevate unboxing.', image: '/wp-images/2026/02/1-66.jpg' },
];

const CUSTOMIZATION = [
  { title: 'Logo Engraving / Printing', body: 'Laser engraving, screen print, hot-foil stamping, UV print, embossing.' },
  { title: 'Lid Styles', body: 'Hinged, sliding, magnetic, lift-off, lock — pick what fits your product story.' },
  { title: 'Surface Finish', body: 'Natural oil, matte lacquer, stained, painted color, distressed, polished.' },
  { title: 'Size & Structure', body: 'Any size from miniature ring boxes to oversized storage trunks.' },
  { title: 'Custom Packaging', body: 'Color box, kraft sleeve, FBA-ready master cartons, drop-tested.' },
  { title: 'Interior Inserts', body: 'EVA foam, velvet, microfiber, molded pulp — cut to your product.' },
];

const MATERIALS = [
  { name: 'Acacia Wood', body: 'Dense, oily hardwood with rich tiger-stripe grain. Premium feel, scratch resistant.', image: '/different%20wood/acacia%20wood.png' },
  { name: 'Pine Wood', body: 'Warm farmhouse look with prominent knots. Budget-friendly solid wood.', image: '/different%20wood/pine%20wood.png' },
  { name: 'Walnut Wood', body: 'Premium dark hardwood with elegant grain. Top tier for luxury packaging.', image: '/different%20wood/walnut%20wood.png' },
  { name: 'Paulownia', body: 'Lightweight at 40% lighter than pine. Stable, easy to ship, eco-conscious.', image: '/different%20wood/paulownia%20wood.png' },
  { name: 'Teak Wood', body: 'Naturally water-resistant tropical hardwood. Ideal for outdoor and high-end products.', image: '/different%20wood/teak%20wood.png' },
  { name: 'Bamboo', body: 'Sustainable grass with natural water resistance. Ideal for kitchen & eco lines.', image: '/different%20wood/bamboo.png' },
];

const PROCESS = [
  { n: '01', title: 'Send Your Design or Idea', body: 'Share your logo, product type, size, or reference photos. We review your requirements.' },
  { n: '02', title: 'Get Quotation & Sample', body: 'We provide pricing, lead time, and optional pre-production samples for approval.' },
  { n: '03', title: 'Production & Quality Control', body: 'Mass production with moisture control, assembly, and in-house quality inspection.' },
  { n: '04', title: 'Packaging & Global Shipping', body: 'Amazon-ready packaging and worldwide shipping coordinated end-to-end.' },
];

const FAQS = [
  { q: 'What is your minimum order quantity (MOQ)?', a: 'Our standard MOQ is typically 300–500 pcs per design, depending on box size, material, and customization requirements.' },
  { q: 'Can you customize size, logo, and packaging?', a: 'Yes. We provide full OEM & private label service: custom box size & structure, laser engraving / UV print / hot stamping, custom color boxes, barcode labels, and inserts.' },
  { q: 'Do you provide samples before mass production?', a: 'Yes. We offer pre-production samples for size, logo, and material confirmation. Sample lead time is usually 7–10 days.' },
  { q: 'How do you prevent cracking or warping during shipping?', a: 'All wood is kiln-dried and moisture controlled at 8–12% before production. We also use export-grade packaging with corner protection and drop-tested cartons.' },
  { q: 'Can you ship directly to Amazon FBA or overseas warehouses?', a: 'Yes. We provide Amazon FBA-ready packaging including barcode labels, carton markings, and drop-test packaging. We can ship to Amazon warehouses, 3PL, or your own fulfillment center worldwide.' },
  { q: 'What is your production lead time?', a: 'Typical production time is 20–35 days, depending on quantity, box type, and customization. We always confirm lead time before order.' },
  { q: 'How do I choose the right wood material for my product?', a: 'Choosing the right wood depends on product usage, target price, and market positioning. You can refer to our Material Selection Guide for a comparison of common wood options.' },
];

const BREADCRUMB = [{ name: 'Home', url: '/' }, { name: 'Custom Wooden Boxes' }];

export default function Page({ params }) {
  unstable_setRequestLocale(params.locale);

  const breadcrumbLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: BREADCRUMB.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url ? `${SITE.siteUrl}${c.url}` : `${SITE.siteUrl}/${SLUG}` })),
  };
  const faqLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <article className="bg-white">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={faqLd} />

      {/* HERO */}
      <header className="bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <nav className="text-xs text-brand-mute mb-4">
            <Link href="/" className="hover:text-brand-green">Home</Link>{' / '}
            <span className="text-brand-ink">Custom Wooden Boxes</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">{HERO.kicker}</p>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-brand-ink leading-[1.1]">
                Custom Wooden Boxes <span className="text-brand-green">Manufacturer</span> for Wholesale & Private Label
              </h1>
              <p className="mt-5 text-brand-mute leading-relaxed text-[17px] max-w-xl">{HERO.lead}</p>
              <ul className="mt-6 grid sm:grid-cols-3 gap-3">
                {HERO.badges.map(b => (
                  <li key={b} className="flex items-center gap-2 bg-white border border-brand-line rounded-full px-4 py-2 text-sm font-semibold text-brand-ink">
                    <span className="w-2 h-2 rounded-full bg-brand-green" />{b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition">Get Wholesale Price</Link>
                <Link href="/products/gift-boxes-retail-packaging" className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition">Browse Boxes</Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] bg-white rounded-2xl overflow-hidden border border-brand-line shadow-sm">
              <Image
                src={HERO.image}
                alt="Custom wooden boxes manufacturer"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* CATEGORIES — 9 box types */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Categories</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">
              Custom Wooden Box Categories for Wholesale & Private Label
            </h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">
              Wide range of box styles for gift packaging, retail presentation, storage, and brand customization — OEM, private label, and wholesale.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map(c => (
              <Link key={c.title} href={c.href} className="group bg-white rounded-2xl border border-brand-line overflow-hidden hover:border-brand-green/40 hover:shadow-lg transition flex flex-col">
                <div className="relative aspect-square bg-brand-cream overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-[1.03] transition duration-500"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-base font-bold text-brand-ink mb-2 leading-snug">{c.title}</h3>
                  <p className="text-sm text-brand-mute leading-relaxed flex-1">{c.body}</p>
                  <span className="mt-3 text-sm font-semibold text-brand-green group-hover:underline">View &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BOX STYLES */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Structures</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">Box Styles and Structures</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">
              From hinged lid wooden boxes and sliding lid designs to magnetic closure boxes, glass lid boxes, and compartment boxes — pick the structure that fits your product.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STYLES.map(s => (
              <article key={s.title} className="group bg-white rounded-2xl border border-brand-line overflow-hidden hover:border-brand-green/40 hover:shadow-lg transition">
                <div className="relative aspect-[4/3] bg-brand-cream overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-[1.03] transition duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-brand-ink mb-2 leading-snug">{s.title}</h3>
                  <p className="text-sm text-brand-mute leading-relaxed">{s.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMIZATION OPTIONS */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Customization</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">Customization Options for Custom Wooden Boxes</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CUSTOMIZATION.map((c, i) => (
              <article key={c.title} className="bg-brand-cream rounded-2xl border border-brand-line p-7 hover:border-brand-green/40 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mb-4 font-bold text-sm">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-lg font-bold text-brand-ink mb-2 leading-snug">{c.title}</h3>
                <p className="text-sm text-brand-mute leading-relaxed">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIALS */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Materials</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">Wood Materials for Custom Wooden Boxes</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">
              We work with paulownia, pine, acacia, walnut, camphor, and bamboo — selected based on durability, cost, and brand positioning.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MATERIALS.map(m => (
              <article key={m.name} className="group bg-white rounded-2xl border border-brand-line overflow-hidden hover:border-brand-green/40 hover:shadow-lg transition">
                <div className="relative aspect-[4/3] bg-brand-cream overflow-hidden">
                  <Image
                    src={m.image}
                    alt={`${m.name} wood`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-[1.03] transition duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-brand-ink mb-2">{m.name}</h3>
                  <p className="text-sm text-brand-mute leading-relaxed">{m.body}</p>
                </div>
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
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">How to Get Your Custom Wooden Boxes</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">A simple 4-step process from idea to finished products.</p>
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

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[820px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">Everything You Need to Know Before Ordering</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-brand-line hover:border-brand-green/40 transition overflow-hidden">
                <summary className="flex items-start justify-between cursor-pointer p-5 lg:p-6 gap-4 list-none">
                  <span className="font-semibold text-brand-ink leading-snug">{f.q}</span>
                  <span className="shrink-0 w-7 h-7 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center text-sm font-bold transition group-open:bg-brand-green group-open:text-white group-open:rotate-45">+</span>
                </summary>
                <div className="px-5 lg:px-6 pb-5 lg:pb-6 -mt-1 text-brand-mute leading-relaxed text-[15px]">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-brand-green text-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-wood mb-3">Ready to start</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">Let&apos;s build your custom wooden box program.</h2>
              <p className="mt-4 text-white/85 leading-relaxed text-[16px] max-w-xl">Tell us your size, material and packaging needs — we&apos;ll send a full quote with samples and lead-time within one business day.</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/contact" className="inline-flex items-center rounded-full bg-brand-wood px-7 py-3 text-[15px] font-semibold text-brand-ink hover:bg-brand-woodSoft transition">Get a Free Quote</Link>
              <Link href="/wooden-box-factory-in-china" className="inline-flex items-center rounded-full border-2 border-white px-7 py-3 text-[15px] font-semibold text-white hover:bg-white hover:text-brand-green transition">About Our Factory</Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
