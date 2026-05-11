// /custom-wooden-spice-rack — hand-coded SEO landing page (~10k chars original).
import { unstable_setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';
import { hreflangFor } from '@/i18n/routing';

const SLUG = 'custom-wooden-spice-rack';
const TITLE = 'Custom Wooden Spice Rack Manufacturer with Glass Jar Matching Options';
const META_DESC =
  'Custom wooden spice rack manufacturer in China. Wall-mounted, countertop, drawer and tiered styles with matching glass jars, wood material options, OEM customization and wholesale packaging support.';

export const metadata = {
  title: 'Custom Wooden Spice Rack Manufacturer | Wooden Rack & Glass Jar Set Solutions',
  description: META_DESC,
  alternates: { canonical: `/${SLUG}`, languages: hreflangFor(SITE.siteUrl, `/${SLUG}`) },
  openGraph: {
    type: 'website', url: `${SITE.siteUrl}/${SLUG}`, title: TITLE, description: META_DESC,
    images: [{ url: '/wp-images/2026/04/ScreenShot_2026-04-09_180610_619.png', width: 1200, height: 800, alt: TITLE }],
    siteName: SITE.company.brand,
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: META_DESC },
};

const HERO = {
  kicker: 'Custom Spice Racks',
  badges: ['4 rack styles', 'Glass jar set matching', 'OEM & private label'],
  lead: 'Custom wooden spice racks for importers, wholesalers, kitchenware brands and private label buyers — different rack styles, wood materials, glass jar sets, and full OEM packaging.',
  image: '/wp-images/2026/04/ScreenShot_2026-04-09_180610_619.png',
};

const STYLES = [
  { title: 'Countertop Wooden Spice Racks', body: 'Practical, easy to place, suitable for daily kitchen use. Works well for ready-to-sell kitchen organizer collections and retail packaging programs.', image: '/wp-images/2026/04/countertop-spice-rack.png' },
  { title: 'Wall-Mounted Wooden Spice Racks', body: 'Save working space — popular for compact kitchens. Suitable for buyers looking for functional and space-saving storage solutions.', image: '/wp-images/2026/04/ScreenShot_2026-04-09_182057_064.png' },
  { title: 'Drawer & Cabinet Spice Organizers', body: 'For cleaner kitchen layouts and hidden storage concepts. A good option for brands building a more organized kitchen collection.', image: '/wp-images/2026/04/ScreenShot_2026-04-09_182849_375.png' },
  { title: 'Tiered, Rotating & Expandable', body: 'For wider product ranges — tiered, rotating and expandable rack structures help cover different selling points and price segments.', image: '/wp-images/2026/04/ScreenShot_2026-04-09_183921_196.png' },
];

const SETS = [
  { title: 'Matching Glass Jar Options', body: 'Square jars, round jars, and other common spice bottle formats. Rack size and opening layout adjusted to jar dimensions and capacity.', image: '/wp-images/2026/04/ScreenShot_2026-04-09_190502_438.png' },
  { title: 'Lid Style Options', body: 'Bamboo lids, metal lids, or other styles. Buyers targeting natural kitchen styles often prefer wooden rack + glass jars + bamboo lid combinations.', image: '/wp-images/2026/04/ScreenShot_2026-04-09_185438_888.png' },
  { title: 'Labels, Funnel & Shaker Lids', body: 'For more complete spice rack sets — labels, funnels, shaker lids and similar accessories that increase product value and retail presentation.', image: '/wp-images/2026/04/ScreenShot_2026-04-09_191044_303.png' },
];

const MATERIALS = [
  { name: 'Bamboo', body: 'Light natural look, sustainable, popular for eco-conscious kitchen brands. Good water resistance.' },
  { name: 'Acacia Wood', body: 'Warm tiger-stripe grain, premium feel, durable. Best for high-end retail and gift sets.' },
  { name: 'Pine Wood', body: 'Cost-effective with a clean, neutral look. Suitable for painted finishes and farmhouse styles.' },
  { name: 'Walnut Wood', body: 'Rich dark grain for premium positioning. Great for luxury kitchen accessory programs.' },
];

const CUSTOMIZATION = [
  { title: 'Custom Size & Layout', body: 'Rack dimensions, jar slots, drawer depth — adjusted to your jar dimensions and target market.' },
  { title: 'Custom Logo & Branding', body: 'Laser engraving, screen print, hot stamping. On the rack body and/or packaging.' },
  { title: 'Custom Style Development', body: 'Build a unique style for your collection — not just a stock product.' },
  { title: 'Sample & Production Control', body: 'Pre-production samples for approval, then stable mass production with QC.' },
  { title: 'Wholesale Packaging', body: 'Retail box, color box, kraft sleeve, FBA-ready master cartons.' },
  { title: 'Export Carton Support', body: 'Drop-tested cartons designed for international freight and Amazon FBA inbound.' },
];

const PROCESS = [
  { n: '01', title: 'Share Your Concept', body: 'Send your preferred rack style, jar size, material, finish, and packaging idea.' },
  { n: '02', title: 'Design & Quote', body: 'We confirm specs, recommend the right structure, and offer a clear quotation in 24–48h.' },
  { n: '03', title: 'Sample Approval', body: 'Pre-production sample for fit, finish, and jar matching approval.' },
  { n: '04', title: 'Mass Production', body: 'Stable QC standards, moisture control, consistent finishing across batches.' },
  { n: '05', title: 'Packaging & Shipping', body: 'Retail box, FBA-ready packaging, and worldwide shipping coordination.' },
];

const FAQS = [
  { q: 'Can you supply the wooden spice rack with glass jars?', a: 'Yes. We can discuss spice rack sets with matching glass jar options based on your preferred style, size and market requirements.' },
  { q: 'Can the rack size be customized according to our jar dimensions?', a: 'Yes. If you already have target jar dimensions or a preferred bottle format, we can review the measurements and develop a matching rack structure.' },
  { q: 'What wood materials can you use for spice racks?', a: 'We can discuss bamboo, acacia, pine and other suitable wood materials depending on the design, cost target and product positioning.' },
  { q: 'Do you offer wall-mounted and countertop spice rack styles?', a: 'Yes. We support different structures including countertop, wall-mounted, drawer, cabinet and tiered organizer styles.' },
  { q: 'Can you add our logo to the rack or packaging?', a: 'Yes. Logo customization can be discussed based on the rack design, packaging plan and branding requirements.' },
  { q: 'Can you include labels, funnels or shaker lids in the set?', a: 'Yes. We can discuss different accessory combinations for buyers who want a more complete spice rack set.' },
  { q: 'Do you support OEM and private label projects?', a: 'Yes. We support OEM and private label development for suitable wooden spice rack and kitchen organizer projects.' },
  { q: 'Can you provide retail-ready or e-commerce packaging?', a: 'Yes. We can discuss packaging solutions for wholesale, retail and e-commerce sales channels.' },
];

const BREADCRUMB = [{ name: 'Home', url: '/' }, { name: 'Custom Wooden Spice Rack' }];

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

      <header className="bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <nav className="text-xs text-brand-mute mb-4">
            <Link href="/" className="hover:text-brand-green">Home</Link>{' / '}
            <span className="text-brand-ink">Custom Wooden Spice Rack</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">{HERO.kicker}</p>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-brand-ink leading-[1.1]">
                Custom Wooden <span className="text-brand-green">Spice Rack</span> Manufacturer
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
                <Link href="/contact" className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition">Get a Quote</Link>
                <Link href="/wholesale-wooden-spice-racks" className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition">Explore Styles</Link>
              </div>
            </div>
            <div className="aspect-[4/3] bg-white rounded-2xl overflow-hidden border border-brand-line shadow-sm">
              <img src={HERO.image} alt="Custom wooden spice rack" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      {/* RACK STYLES */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Rack Styles</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">Solutions for Different Kitchen Markets</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">
              Different markets prefer different rack structures — countertop, wall-mounted, drawer, or tiered organizer styles based on space, jar size, and product look.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STYLES.map(s => (
              <article key={s.title} className="group bg-white rounded-2xl border border-brand-line overflow-hidden hover:border-brand-green/40 hover:shadow-lg transition">
                <div className="aspect-[4/3] bg-brand-cream overflow-hidden">
                  <img src={s.image} alt={s.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" />
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

      {/* SETS - Glass Jars */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Spice Rack Sets</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">Glass Jars, Labels & Accessory Options</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">
              Match the rack with glass jar formats, lid styles, and accessories — a complete solution instead of sourcing rack and jars separately.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {SETS.map(s => (
              <article key={s.title} className="group bg-white rounded-2xl border border-brand-line overflow-hidden hover:border-brand-green/40 hover:shadow-lg transition">
                <div className="aspect-[4/3] bg-brand-cream overflow-hidden">
                  <img src={s.image} alt={s.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-brand-ink mb-2 leading-snug">{s.title}</h3>
                  <p className="text-sm text-brand-mute leading-relaxed">{s.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIALS */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Materials</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">Wood Material & Finish Options</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">
              Material affects appearance, cost level, and how well the rack matches the rest of your kitchen collection.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MATERIALS.map((m, i) => (
              <article key={m.name} className="bg-brand-cream rounded-2xl border border-brand-line p-7 hover:border-brand-green/40 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mb-4 font-bold text-sm">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-lg font-bold text-brand-ink mb-2">{m.name}</h3>
                <p className="text-sm text-brand-mute leading-relaxed">{m.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMIZATION */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">OEM & Custom</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">OEM and Custom Development for Wooden Spice Rack Projects</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CUSTOMIZATION.map((c, i) => (
              <article key={c.title} className="bg-white rounded-2xl border border-brand-line p-7 hover:border-brand-green/40 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mb-4 font-bold text-sm">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-lg font-bold text-brand-ink mb-2 leading-snug">{c.title}</h3>
                <p className="text-sm text-brand-mute leading-relaxed">{c.body}</p>
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
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">From Concept to Container in 5 Clear Steps</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
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
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">FAQ About Custom Wooden Spice Rack Orders</h2>
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

      <section className="bg-brand-green text-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-wood mb-3">Ready to start</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">Send us your wooden spice rack inquiry.</h2>
              <p className="mt-4 text-white/85 leading-relaxed text-[16px] max-w-xl">Share your preferred rack style, jar size, material choice, finish direction and packaging idea — we&apos;ll quote within one business day.</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/contact" className="inline-flex items-center rounded-full bg-brand-wood px-7 py-3 text-[15px] font-semibold text-brand-ink hover:bg-brand-woodSoft transition">Get a Free Quote</Link>
              <Link href="/wholesale-wooden-spice-racks" className="inline-flex items-center rounded-full border-2 border-white px-7 py-3 text-[15px] font-semibold text-white hover:bg-white hover:text-brand-green transition">View Spice Rack Products</Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
