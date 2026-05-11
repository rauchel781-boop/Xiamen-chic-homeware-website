// /wholesale-wooden-serving-trays — hand-coded SEO landing page.
import { unstable_setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';
import { hreflangFor } from '@/i18n/routing';

const SLUG = 'wholesale-wooden-serving-trays';
const TITLE = 'Wholesale Wooden Serving Trays & Platters: Premium Manufacturer';
const META_DESC =
  'Sourcing food-safe options? Discover our factory-direct collection of acacia round platters, bamboo trays, and wholesale wooden serving trays for global brands.';

export const metadata = {
  title: '7 Remarkable Wholesale Wooden Serving Trays & Platters',
  description: META_DESC,
  alternates: { canonical: `/${SLUG}`, languages: hreflangFor(SITE.siteUrl, `/${SLUG}`) },
  openGraph: { type: 'website', url: `${SITE.siteUrl}/${SLUG}`, title: TITLE, description: META_DESC,
    images: [{ url: '/wp-images/2026/02/1-1.jpg', width: 1200, height: 800, alt: TITLE }],
    siteName: SITE.company.brand },
  twitter: { card: 'summary_large_image', title: TITLE, description: META_DESC },
};

const HERO = {
  kicker: 'Wholesale Serving Trays',
  badges: ['Food-safe FDA & LFGB', 'Acacia / Bamboo / Walnut', 'FBA-ready DDP'],
  lead: 'Premium wholesale wooden serving trays — factory-direct collection of acacia round platters, bamboo divided trays, and walnut charcuterie boards. Food-safe, stylish, and built for global retail.',
  image: '/wp-images/2026/02/1-1.jpg',
};

const MATERIALS = [
  { name: 'Acacia Wood', label: 'BEST SELLER', body: 'High density and distinctive grain patterns — rich dark browns to golden honey tones. Naturally water-resistant and antimicrobial — top choice for cheese boards and charcuterie platters.', image: '/different%20wood/acacia%20wood.png' },
  { name: 'Bamboo', label: 'ECO-FRIENDLY', body: 'Technically a grass — harder than maple, incredibly sustainable. Uniform clean blonde look. Lightweight, affordable, perfect for high-volume retail or promotional gift sets.', image: '/different%20wood/bamboo.png' },
  { name: 'Walnut Wood', label: 'PREMIUM', body: 'Rich dark grain with elegant natural patterns. Top-tier choice for luxury serving sets and high-end charcuterie boards. Premium feel with timeless appeal.', image: '/different%20wood/walnut%20wood.png' },
  { name: 'Rubberwood & Pine', label: 'BUDGET', body: 'Excellent budget-friendly options. Softer woods perfect for painted finishes or rustic farmhouse style trays where a distressed look is desired.', image: '/different%20wood/rubber%20wood.png' },
];

const QUALITY = [
  { title: 'Moisture Content Control', body: 'We strictly dry our lumber to 8–12% moisture before production. Tray stays flat from humid China to dry climates like Arizona or Northern Europe.' },
  { title: 'Food-Safe Finishes', body: 'All trays finished with FDA and LFGB-compliant oils, waxes, or varnishes. Matte oil for natural feel, or high-gloss lacquer for easy cleaning — all safe for direct food contact.' },
  { title: 'Precision Sanding', body: 'Multi-step sanding process finishing with fine-grit sandpaper. Every handle, corner, and surface is silky smooth to the touch.' },
];

const DESIGNS = [
  { title: 'The Ottoman Tray', body: 'Large rectangular trays with high sides and sturdy cutout handles. Built to hold heavy coffee pots or breakfast in bed.', image: '/wp-images/2026/02/1-4.jpg' },
  { title: 'The Party Platter', body: 'Innovative divided bamboo trays with clear lids — game-changers for outdoor catering, picnics, or keeping snacks fresh and pest-free.', image: '/wp-images/2026/02/1-5.jpg' },
  { title: 'Charcuterie Boards', body: 'Premium acacia and walnut boards with handle cutouts. Made for cheese, charcuterie, and elegant tablescapes.', image: '/wp-images/2026/02/1-4.png' },
  { title: 'Seasonal Shapes', body: 'Christmas tree-shaped dishes, heart-shaped Valentine\'s platters, oval thanksgiving trays. Molds ready to boost your Q4 sales.', image: '/wp-images/2026/02/1-1.jpg' },
];

const CUSTOMIZATION = [
  { title: 'Laser Engraving', body: 'Burn your logo into the tray center or handle for a permanent brand mark.' },
  { title: 'Custom Color Stain', body: 'Stain wood to match Walnut, Cherry, or Black Oak tones to fit your collection palette.' },
  { title: 'Retail Packaging', body: 'Color sleeves, gift boxes, or PDQ displays designed to maximize shelf appeal.' },
];

const FAQS = [
  { q: 'What is the MOQ for custom wholesale wooden serving trays?', a: 'For standard items, our MOQ is typically 500 pieces. However, for first-time partners, we are flexible and can support trial orders to test your market.' },
  { q: 'How do I clean and maintain wooden serving trays?', a: 'Hand wash with mild soap and warm water. Never soak the wood or put it in the dishwasher. To maintain luster, wipe with food-grade mineral oil once a month. We can include a "Care Instruction Card" in your packaging.' },
  { q: 'Do your trays pass food safety tests?', a: 'Yes. We can provide SGS, Intertek, or TUV test reports verifying that our finishes are lead-free, BPA-free, and safe for food contact according to FDA (USA) and LFGB (EU) standards.' },
  { q: 'Can you handle DDP shipping to Amazon FBA?', a: 'Absolutely. We have extensive experience shipping to FBA warehouses in the US, UK, and Canada. We handle labeling, palletizing, and customs clearance — you don\'t have to worry about logistics.' },
];

const BREADCRUMB = [{ name: 'Home', url: '/' }, { name: 'Wholesale Wooden Serving Trays' }];

export default function Page({ params }) {
  unstable_setRequestLocale(params.locale);
  const breadcrumbLd = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: BREADCRUMB.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url ? `${SITE.siteUrl}${c.url}` : `${SITE.siteUrl}/${SLUG}` })) };
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

  return (
    <article className="bg-white">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={faqLd} />

      <header className="bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <nav className="text-xs text-brand-mute mb-4">
            <Link href="/" className="hover:text-brand-green">Home</Link>{' / '}
            <span className="text-brand-ink">Wholesale Wooden Serving Trays</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">{HERO.kicker}</p>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-brand-ink leading-[1.1]">
                Wholesale Wooden <span className="text-brand-green">Serving Trays</span> & Platters
              </h1>
              <p className="mt-5 text-brand-mute leading-relaxed text-[17px] max-w-xl">{HERO.lead}</p>
              <ul className="mt-6 grid sm:grid-cols-3 gap-3">
                {HERO.badges.map(b => <li key={b} className="flex items-center gap-2 bg-white border border-brand-line rounded-full px-4 py-2 text-sm font-semibold text-brand-ink"><span className="w-2 h-2 rounded-full bg-brand-green" />{b}</li>)}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition">Get Wholesale Price</Link>
                <Link href="/products" className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition">Browse Products</Link>
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
        <div className="max-w-[820px] mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-ink leading-tight mb-4">
            Why Choose Our Wholesale Wooden Serving Trays?
          </h2>
          <p className="text-brand-mute leading-relaxed text-[16px] mb-3">
            In home decor and hospitality, plastic is out and nature is in. Wooden serving trays are no longer just functional — they&apos;re essential decor for coffee tables, ottomans, and kitchen islands.
          </p>
          <p className="text-brand-mute leading-relaxed text-[16px]">
            For retailers and F&amp;B brands, high-quality wooden platters offer a high-margin product that appeals to eco-conscious consumers. As a premier wooden serving tray manufacturer in China, we engineer durable, food-safe, and aesthetically stunning serving solutions tailored for the global market.
          </p>
        </div>
      </section>

      {/* MATERIALS */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Material Guide</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">Acacia vs. Bamboo vs. Walnut</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">Choosing the right wood is crucial for your target market. Here&apos;s what we offer.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MATERIALS.map(m => (
              <article key={m.name} className="group bg-white rounded-2xl border border-brand-line overflow-hidden hover:border-brand-green/40 hover:shadow-lg transition flex flex-col">
                <div className="aspect-square bg-brand-cream overflow-hidden">
                  <img src={m.image} alt={m.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green mb-1">{m.label}</p>
                  <h3 className="text-lg font-bold text-brand-ink mb-2">{m.name}</h3>
                  <p className="text-sm text-brand-mute leading-relaxed flex-1">{m.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY INSIGHTS */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Factory Insights</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">How We Ensure Quality</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">Importing wooden products can be risky if the manufacturer doesn&apos;t understand wood science. Here&apos;s how we prevent common issues.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {QUALITY.map((q, i) => (
              <article key={q.title} className="bg-brand-cream rounded-2xl border border-brand-line p-7 hover:border-brand-green/40 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mb-4 font-bold text-sm">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-lg font-bold text-brand-ink mb-2 leading-snug">{q.title}</h3>
                <p className="text-sm text-brand-mute leading-relaxed">{q.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DESIGNS */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Versatile Designs</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">Designs for Every Occasion</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">Diverse structures to meet different buyer needs.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DESIGNS.map(d => (
              <article key={d.title} className="group bg-white rounded-2xl border border-brand-line overflow-hidden hover:border-brand-green/40 hover:shadow-lg transition">
                <div className="aspect-[4/3] bg-brand-cream overflow-hidden">
                  <img src={d.image} alt={d.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-brand-ink mb-2 leading-snug">{d.title}</h3>
                  <p className="text-sm text-brand-mute leading-relaxed">{d.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMIZATION */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Customization & OEM</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">Stand Out with Your Brand</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
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

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[820px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">Frequently Asked Questions</h2>
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
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-wood mb-3">Source from the factory</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">Build your wooden serving tray collection.</h2>
              <p className="mt-4 text-white/85 leading-relaxed text-[16px] max-w-xl">Tell us your size, material, and branding needs — we&apos;ll send a full quote with samples and lead-time within one business day.</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/contact" className="inline-flex items-center rounded-full bg-brand-wood px-7 py-3 text-[15px] font-semibold text-brand-ink hover:bg-brand-woodSoft transition">Get a Free Quote</Link>
              <Link href="/products" className="inline-flex items-center rounded-full border-2 border-white px-7 py-3 text-[15px] font-semibold text-white hover:bg-white hover:text-brand-green transition">Browse Products</Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
