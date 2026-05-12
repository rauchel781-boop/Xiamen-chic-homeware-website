// /wooden-box-factory-in-china — hand-coded factory positioning landing page.
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';
import { hreflangFor } from '@/i18n/routing';

const SLUG = 'wooden-box-factory-in-china';
const TITLE = 'Wooden Box Manufacturer in China';
const META_DESC =
  'Wooden box factory in China offering OEM and custom wooden packaging. Factory-direct manufacturing for gift boxes, retail packaging and private label brands.';

export const metadata = {
  title: 'Wooden Box Factory in China | OEM Wooden Packaging Manufacturer',
  description: META_DESC,
  alternates: { canonical: `/${SLUG}`, languages: hreflangFor(SITE.siteUrl, `/${SLUG}`) },
  openGraph: {
    type: 'website', url: `${SITE.siteUrl}/${SLUG}`, title: TITLE, description: META_DESC,
    images: [{ url: '/wp-images/2026/02/CHIC-Factory.jpg', width: 1200, height: 800, alt: TITLE }],
    siteName: SITE.company.brand,
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: META_DESC },
};

const HERO = {
  kicker: 'Factory in China',
  badges: ['Direct factory, not trader', 'Export-quality QC', 'OEM & private label ready'],
  lead: 'A wooden box factory based in China — export-quality wooden boxes for packaging, gift, and storage applications. We work directly with brands, wholesalers, and importers seeking stable OEM production.',
  image: '/wp-images/2026/02/CHIC-Factory.jpg',
};

const FACTORY_PHOTOS = [
  { src: '/wp-images/2026/02/CHIC-Factory.jpg', alt: 'CHIC factory exterior' },
  { src: '/wp-images/2026/02/1-65.jpg', alt: 'Wooden box production line' },
  { src: '/wp-images/2026/02/1-56.jpg', alt: 'Quality inspection workshop' },
];

const CAPABILITIES = [
  { title: 'Wooden Box Cutting & Assembly', body: 'Precision cutting and structural assembly based on box structure requirements.' },
  { title: 'Surface Sanding & Finishing', body: 'Manual and machine sanding to achieve consistent surface quality across batches.' },
  { title: 'Logo Marking & OEM Branding', body: 'Laser engraving, screen printing, hot stamping — applied to order specifications.' },
  { title: 'Export Packing & Shipment Prep', body: 'Drop-tested cartons, palletization, and full export documentation support.' },
];

const PROCESS = [
  { n: '01', title: 'Wood Material Preparation', body: 'Wood selection and moisture control before production to ensure structural stability.', image: '/wp-images/2026/02/1-1-1.jpg' },
  { n: '02', title: 'Cutting & Assembly', body: 'Precision cutting and assembly based on box structure requirements.', image: '/wp-images/2026/02/1-56.jpg' },
  { n: '03', title: 'Surface Sanding & Finishing', body: 'Manual and machine sanding to achieve consistent surface quality.', image: '/wp-images/2026/02/1-16.jpg' },
  { n: '04', title: 'Logo Marking', body: 'Logo marking applied according to order specifications — laser, print, or stamp.', image: '/wp-images/2026/02/different-logo-effect-on-wood.jpg' },
  { n: '05', title: 'Final Inspection & Packing', body: 'Final inspection and packing before export shipment.', image: '/wp-images/2026/02/1-60.jpg' },
];

const WHY = [
  { title: 'Direct Material Sourcing', body: 'We control material sourcing and moisture content directly — not relying on second-tier suppliers.' },
  { title: 'Transparent MOQ & Cost', body: 'Clear pricing structure with no hidden trading fees. You see the real factory cost.' },
  { title: 'Faster Sampling Revisions', body: 'Direct in-factory sampling means changes happen in days, not weeks.' },
  { title: 'OEM Without Middlemen', body: 'Private label and custom branding handled in-house — no trading layer in between.' },
  { title: 'Stable Sample-to-Production', body: 'Every box designed with manufacturing reality in mind — wood movement, joint tolerance, production yield.' },
];

const QC_CHECKLIST = [
  'Incoming material inspection',
  'Moisture content management (8–12%)',
  'In-process structure checks',
  'Surface finish inspection',
  'Pre-shipment quality review',
];

const CAPABILITIES_LIST = [
  { title: 'Custom Gift & Presentation Boxes', body: 'Custom wooden jewelry boxes for brands, retailers, and private label jewelry collections.', image: '/wp-images/2026/01/jewelry-box-1-1.png', href: '/products/wooden-jewelry-boxes' },
  { title: 'Retail & Display Packaging Boxes', body: 'Luxury wooden watch boxes for watch brands, collectors, and private label packaging.', image: '/wp-images/2026/01/33.jpg', href: '/products/wooden-watch-boxes' },
  { title: 'Category-Specific Packaging', body: 'Custom wooden tea boxes for loose leaf tea, gift sets, and retail display packaging.', image: '/wp-images/2026/01/55.jpg', href: '/products/wooden-tea-box' },
  { title: 'Functional Storage & Organizer', body: 'Multipurpose wooden storage boxes with lids for home organization, gifting, and retail use.', image: '/wp-images/2026/02/wooden-box-1.jpg', href: '/products/wooden-storage-box-with-lid' },
];

const FAQS = [
  { q: 'Are you a manufacturer or a trading company?', a: 'We are a wooden box manufacturer with our own production facilities in China.' },
  { q: 'Where is your wooden box factory located?', a: 'Our production is based in China and focused on export-oriented manufacturing.' },
  { q: 'What types of wooden boxes do you manufacture?', a: 'We manufacture wooden boxes for packaging, gift, and storage purposes — gift boxes, jewelry boxes, watch boxes, wine boxes, tea boxes, and storage boxes with lids.' },
  { q: 'Do you work with overseas clients?', a: 'Yes. We supply wooden boxes to overseas brands, wholesalers, and importers across North America, Europe, the UK, and Australia.' },
  { q: 'Do you support factory audits or inspections?', a: 'Yes. Factory information and cooperation details can be discussed upon request.' },
];

const BREADCRUMB = [{ name: 'Home', url: '/' }, { name: 'Wooden Box Factory in China' }];

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
            <span className="text-brand-ink">Wooden Box Factory in China</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">{HERO.kicker}</p>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-brand-ink leading-[1.1]">
                Wooden Box <span className="text-brand-green">Manufacturer</span> in China
              </h1>
              <p className="mt-2 text-lg font-semibold text-brand-mute">For Packaging, Gift & Storage Markets</p>
              <p className="mt-5 text-brand-mute leading-relaxed text-[17px] max-w-xl">{HERO.lead}</p>
              <ul className="mt-6 grid sm:grid-cols-3 gap-3">
                {HERO.badges.map(b => (
                  <li key={b} className="flex items-center gap-2 bg-white border border-brand-line rounded-full px-4 py-2 text-sm font-semibold text-brand-ink">
                    <span className="w-2 h-2 rounded-full bg-brand-green" />{b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition">Request Factory Quote</Link>
                <Link href="/about" className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition">About Our Factory</Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] bg-white rounded-2xl overflow-hidden border border-brand-line shadow-sm">
              <Image
                src={HERO.image}
                alt="Wooden box factory in China — Xiamen Chic Homeware"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* WHO WE ARE - Factory Photos */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Who We Are</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">A Dedicated Wooden Box Manufacturer in China</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">
              Clear production focus on wooden boxes — not mixed product categories. We supply for retail packaging, promotional gifts, and home storage. Operating as a factory rather than a trading company, we maintain direct control over material selection, production processes, and quality inspection.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {FACTORY_PHOTOS.map(p => (
              <div key={p.src} className="relative aspect-[4/3] bg-brand-cream rounded-2xl overflow-hidden border border-brand-line">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES — 4 cards */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Capabilities</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">Our Wooden Box Factory & Production Capability</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">
              Equipped for medium to large-scale production and export-oriented manufacturing.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CAPABILITIES.map((c, i) => (
              <article key={c.title} className="bg-white rounded-2xl border border-brand-line p-7 hover:border-brand-green/40 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mb-4 font-bold text-sm">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-base font-bold text-brand-ink mb-2 leading-snug">{c.title}</h3>
                <p className="text-sm text-brand-mute leading-relaxed">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MANUFACTURING PROCESS - 5 steps with images */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Process</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">Our Wooden Box Manufacturing Process</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">
              A structured production flow designed to ensure consistent quality and stable output.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {PROCESS.map(s => (
              <div key={s.n} className="bg-white rounded-2xl border border-brand-line overflow-hidden hover:border-brand-green/40 hover:shadow-md transition">
                <div className="relative aspect-[4/3] bg-brand-cream overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="text-2xl font-extrabold text-brand-green/40 leading-none mb-2">{s.n}</div>
                  <h3 className="text-[14px] font-bold text-brand-ink mb-2 leading-snug">{s.title}</h3>
                  <p className="text-[13px] text-brand-mute leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY WORK DIRECTLY */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Why Direct</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">Why Work Directly with a Factory</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">
              Working directly with a factory offers clear advantages compared to catalog suppliers or trading companies.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY.map((w, i) => (
              <article key={w.title} className="bg-white rounded-2xl border border-brand-line p-7 hover:border-brand-green/40 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mb-4 font-bold text-sm">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-lg font-bold text-brand-ink mb-2 leading-snug">{w.title}</h3>
                <p className="text-sm text-brand-mute leading-relaxed">{w.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY CONTROL */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] bg-brand-cream rounded-2xl overflow-hidden border border-brand-line">
              <Image
                src="/wp-images/2026/02/inspection-2.jpg"
                alt="Wooden box factory quality control inspection"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Quality Control</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-tight mb-5">
                Quality Control in Wooden Box Manufacturing
              </h2>
              <p className="text-brand-mute leading-relaxed text-[16px] mb-5">
                Our quality control system minimizes variation between approved samples and mass production.
              </p>
              <ul className="space-y-3">
                {QC_CHECKLIST.map(item => (
                  <li key={item} className="flex items-start gap-3 text-brand-ink">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="text-brand-green flex-shrink-0 mt-0.5">
                      <circle cx="8" cy="8" r="8" fill="#E8F0EA" />
                      <path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* MANUFACTURING CAPABILITIES — 4 product types */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Box Categories</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">Our Wooden Box Manufacturing Capabilities</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">
              We manufacture wooden boxes across multiple application categories — OEM and private label production.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAPABILITIES_LIST.map(c => (
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[820px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">Wooden Box Factory FAQ</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <details key={i} className="group bg-brand-cream rounded-2xl border border-brand-line hover:border-brand-green/40 transition overflow-hidden">
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
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-wood mb-3">Looking for a reliable factory</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">Direct from the wooden box factory in China.</h2>
              <p className="mt-4 text-white/85 leading-relaxed text-[16px] max-w-xl">Skip the middleman. Talk to the team that makes your boxes — clearer quotes, faster sampling, stable production.</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/contact" className="inline-flex items-center rounded-full bg-brand-wood px-7 py-3 text-[15px] font-semibold text-brand-ink hover:bg-brand-woodSoft transition">Request Factory Quote</Link>
              <Link href="/custom-wooden-boxes" className="inline-flex items-center rounded-full border-2 border-white px-7 py-3 text-[15px] font-semibold text-white hover:bg-white hover:text-brand-green transition">View Box Types</Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
