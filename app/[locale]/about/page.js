// /about — fully redesigned About / Factory page.
// Structure: Hero · Stats · Story · Process · Capabilities · QC · Gallery · FAQ · CTA
// Content sourced from the WP "wooden-products-factory-in-china" page.

import { unstable_setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';
import { hreflangFor } from '@/i18n/routing';
import { schemaLang } from '@/i18n/seo';

export async function generateMetadata({ params: { locale } = {} }) {
  const title = 'About CHIC — Custom Wooden Products Factory in Xiamen, China';
  const description = 'Xiamen Chic Homeware Co.,Ltd. — wooden products factory in China, OEM & ODM manufacturer for global brands. Learn about our factory, process, capabilities and quality system.';
  return {
    title, description,
    alternates: { canonical: `/about`, languages: hreflangFor(SITE.siteUrl, '/about') },
    openGraph: {
      type: 'website',
      url: `${SITE.siteUrl}/about`,
      title, description, siteName: SITE.company.brand,
      images: [{ url: '/CHIC%20Factory.jpg', width: 1200, height: 800, alt: 'CHIC factory exterior' }],
    },
  };
}

const ABOUT_BREADCRUMB = (locale) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',     item: `${SITE.siteUrl}` },
    { '@type': 'ListItem', position: 2, name: 'About Us' },
  ],
});

const ABOUT_PAGE_LD = (locale) => ({
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${SITE.siteUrl}/about#page`,
  url: `${SITE.siteUrl}/about`,
  name: 'About CHIC — Wooden Products Factory in China',
  description: 'Xiamen Chic Homeware Co.,Ltd. — wooden products factory in China, OEM & ODM manufacturer for global brands. 15+ years export experience, 20,000m² factory floor.',
  inLanguage: schemaLang(locale),
  isPartOf: { '@id': `${SITE.siteUrl}/#website` },
  about: { '@id': `${SITE.siteUrl}/#organization` },
  mainEntity: { '@id': `${SITE.siteUrl}/#organization` },
  primaryImageOfPage: `${SITE.siteUrl}/CHIC%20Factory.jpg`,
  // Gallery — gives the AboutPage entity visual richness in knowledge panel
  image: [
    `${SITE.siteUrl}/CHIC%20Factory.jpg`,
    `${SITE.siteUrl}/wp-images/2026/01/raw-material-warehouse.jpg`,
    `${SITE.siteUrl}/wp-images/2026/01/production.jpg`,
    `${SITE.siteUrl}/wp-images/2026/01/machine-4.jpg`,
  ],
  significantLink: [
    `${SITE.siteUrl}/products`,
    `${SITE.siteUrl}/contact`,
    `${SITE.siteUrl}/material-guide`,
  ],
});

// ─────────────────────────────────────────────────────────────────
// Stats — quick credibility strip (placeholder values, edit to match)
// ─────────────────────────────────────────────────────────────────
const STATS = [
  { n: '15+',     label: 'Years OEM' },
  { n: '60+',     label: 'Export Countries' },
  { n: '500+',    label: 'SKUs Manufactured' },
  { n: '20,000㎡', label: 'Factory Floor' },
  { n: '100',     label: 'Pcs MOQ from' },
  { n: '24h',     label: 'Quote Reply' },
];

// ─────────────────────────────────────────────────────────────────
// Manufacturing process — 6 steps from WP
// ─────────────────────────────────────────────────────────────────
const PROCESS = [
  { title: 'Inquiry & Requirement Review', body: 'We review your brief, product references and target spec. Initial questions and reference samples are exchanged.' },
  { title: 'Sample Development & Approval', body: 'Functional sample produced in-house, photographed and shipped. Iterations until you sign off on the spec sheet.' },
  { title: 'Material Selection & Preparation', body: 'Wood is sourced, dried to target moisture content, cut and pre-conditioned. FSC documents prepared if required.' },
  { title: 'Mass Production', body: 'Production runs in our own factory under ISO-style procedures. Daily progress photos shared if you want.' },
  { title: 'Quality Inspection', body: 'In-process and final QC: dimensions, finish, structure, packaging integrity. Third-party AQL audit available on request.' },
  { title: 'Packing & Export Shipping', body: 'Drop-test certified packaging. Sea, air, express or Amazon FBA — your choice. EXW / FOB / DDP terms.' },
];

// ─────────────────────────────────────────────────────────────────
// Capabilities — content adapted from WP "Why Choose Us" subsections
// ─────────────────────────────────────────────────────────────────
const CAPABILITIES = [
  {
    icon: 'badge',
    title: 'Experienced OEM & Private Label',
    body: 'Years of practical experience manufacturing for brands, importers, wholesalers and distributors — from product development to export packaging.',
  },
  {
    icon: 'grid',
    title: 'Wide Product Range',
    body: 'Wooden homeware, storage products, desk organizers, gift boxes, retail packaging — different categories, different price levels, one supply chain.',
  },
  {
    icon: 'sliders',
    title: 'Flexible Customization',
    body: 'Custom size, structure, color, logo, insert and packaging — sized for your brand positioning, from simple wholesale to premium private label.',
  },
  {
    icon: 'tree',
    title: 'Material & Finish Choices',
    body: '12+ wood materials, multiple engineered options, food-safe lacquer or oil finishes, custom color matching, hardware details to spec.',
  },
  {
    icon: 'shield',
    title: 'Multi-Stage Quality Control',
    body: 'QC integrated at every step — material inspection, semi-finished checking, assembly review, packing audit. Stable export-grade quality.',
  },
  {
    icon: 'box',
    title: 'Export Packaging Support',
    body: 'Inner protection, color cartons, shelf-ready packs, FBA-prepped master cartons, palletization — packed for the actual journey.',
  },
  {
    icon: 'speed',
    title: 'Efficient Sampling & Follow-Up',
    body: 'Practical B2B workflow for sampling, order follow-up and production communication. Clearer, faster, easier for overseas buyers.',
  },
  {
    icon: 'handshake',
    title: 'Long-Term Wholesale Supply',
    body: 'Built for repeat orders. Stable production management and clear communication for long-term OEM relationships, not one-off transactions.',
  },
];

// ─────────────────────────────────────────────────────────────────
// FAQ — from WP about page (Q1) + additional sourcing-specific
// questions buyers commonly ask our team
// ─────────────────────────────────────────────────────────────────
const FAQ = [
  {
    q: 'What kind of products do you manufacture?',
    a: 'We specialize in designing and manufacturing high-quality wooden organizers and premium packaging. Our main product lines include: wooden desk & office organizers (pen holders, monitor stands, document trays), wooden beauty & cosmetic organizers (jewelry boxes, vanity trays, brush holders), kitchen & dining wooden storage (knife blocks, utensil caddies, spice boxes, bread boxes), home storage organizers (countertop, pantry, entryway, sofa trays), and gift / retail packaging (watch boxes, tea & coffee boxes, wine boxes, custom presentation cases).',
  },
  {
    q: 'Are you a real factory or a trading company?',
    a: 'We are a real wooden products manufacturer. Our production base is in Cao County, Shandong Province — one of China\'s most established wooden homeware hubs. Our sales and design office is in Xiamen, Fujian. You are welcome to visit either site, or take a virtual factory tour over video call.',
  },
  {
    q: 'What is your typical MOQ and lead time?',
    a: 'MOQ varies by product complexity. As a guide: 100 pcs for simple designs and samples, 500 pcs for production runs. Sample lead time: 7–10 days for standard samples, 15–25 days for custom-tooled samples. Production lead time: 25–45 days after sample confirmation, depending on order quantity, materials and surface treatment.',
  },
  {
    q: 'Which countries do you export to?',
    a: 'Our wooden products are exported to 60+ countries, with the largest customer bases in the United States, Canada, the United Kingdom, Germany, France, Italy, Japan, South Korea and Australia. We have hands-on experience with Amazon FBA logistics, retail-chain compliance and door-to-door delivery (DDP).',
  },
  {
    q: 'What customization options do you support?',
    a: 'Material (12+ wood types), size, structure, surface finish, color, logo (laser, foil, deboss, screen print, UV print), inserts (foam, velvet, microfiber), packaging (color box, kraft, gift, FBA-ready cartons), and hardware (hinges, locks, handles, magnetic closure). Send us a sketch or reference photo and we\'ll suggest a configuration.',
  },
  {
    q: 'Do you offer FSC, REACH or food-safety certifications?',
    a: 'Yes. We can source FSC-certified wood, use REACH-compliant finishes, supply CARB P2 / TSCA Title VI compliant engineered panels, and provide LFGB / FDA food-contact safety reports. Compliance documents are issued per order with the shipment.',
  },
  {
    q: 'How does the sampling and ordering process work?',
    a: 'Send us your brief → we quote within 24 hours → on PI confirmation we develop a sample (paid, refundable on bulk) → photos and physical sample shipped for approval → on sample sign-off we receive the deposit and start production → final QC and pre-shipment inspection → balance payment and shipment. Each stage has a clear timeline and contact point.',
  },
  {
    q: 'What payment terms do you accept?',
    a: 'Standard terms are 30% T/T deposit, 70% balance before shipment. For repeat customers and larger orders we also work with L/C at sight, OA terms, and via Alibaba Trade Assurance. We accept USD, EUR and CNY.',
  },
];

// ─────────────────────────────────────────────────────────────────
// Photo gallery — real WP factory photos
// ─────────────────────────────────────────────────────────────────
const GALLERY = [
  { url: '/wp-images/2026/02/CHIC-Factory.jpg', alt: 'CHIC factory exterior' },
  { url: '/wp-images/2026/01/1-4.jpg',  alt: 'Production area' },
  { url: '/wp-images/2026/01/1-13.jpg', alt: 'Sample development' },
  { url: '/wp-images/2026/01/1-3.jpg',  alt: 'Wood machining' },
  { url: '/wp-images/2026/01/1-7.jpg',  alt: 'Wooden kitchenware production' },
  { url: '/wp-images/2026/01/1-6.jpg',  alt: 'Quality inspection' },
  { url: '/wp-images/2026/01/1-8.jpg',  alt: 'Assembly line' },
  { url: '/wp-images/2026/01/gift-box-3.png', alt: 'Gift packaging' },
  { url: '/wp-images/2026/01/3.jpg',    alt: 'Finished products' },
  { url: '/wp-images/2026/01/bulk-packaging.jpg', alt: 'Bulk packaging' },
  { url: '/wp-images/2026/01/brown-box-19.jpg',  alt: 'Master cartons' },
  { url: '/wp-images/2026/01/1-14.jpg', alt: 'Factory floor' },
];

// ─────────────────────────────────────────────────────────────────
// Factory tour video — YouTube embed + VideoObject schema
// ─────────────────────────────────────────────────────────────────
// NOTE: uploadDate is a placeholder. Update to the real publish date
// (visible on the YouTube watch page) so Google's freshness signal is honest.
const VIDEO = {
  id: '_HKxrZ_p5-4',
  title: 'Inside Our Wooden Products Factory — Xiamen Chic Homeware',
  description:
    'A walk through the Xiamen Chic Homeware factory in Cao County, Shandong — raw material warehouse, CNC machining, sanding, finishing, QC and packing for OEM & ODM wooden product orders.',
  uploadDate: '2026-03-15',
};
const VIDEO_LD = (locale) => ({
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  '@id': `${SITE.siteUrl}/about#video`,
  name: VIDEO.title,
  description: VIDEO.description,
  thumbnailUrl: [
    `https://img.youtube.com/vi/${VIDEO.id}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${VIDEO.id}/hqdefault.jpg`,
  ],
  uploadDate: VIDEO.uploadDate,
  contentUrl: `https://www.youtube.com/watch?v=${VIDEO.id}`,
  embedUrl: `https://www.youtube-nocookie.com/embed/${VIDEO.id}`,
  publisher: { '@id': `${SITE.siteUrl}/#organization` },
  inLanguage: 'en',
});

// ─────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────
export default function AboutPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);

  return (
    <article className="bg-white">
      <JsonLd data={ABOUT_BREADCRUMB(locale)} />
      <JsonLd data={ABOUT_PAGE_LD(locale)} />
      <JsonLd data={VIDEO_LD(locale)} />
      {/* ── Hero ── */}
      <header className="bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <nav className="text-xs text-brand-mute mb-4">
            <Link href="/" className="hover:text-brand-green">Home</Link>
            {' / '}
            <span className="text-brand-ink">About Us</span>
          </nav>

          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
                Our Factory &amp; Manufacturing Capabilities
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-brand-ink leading-[1.1]">
                A real wooden products factory{' '}
                <span className="text-brand-green">built for global brands.</span>
              </h1>
              <p className="mt-5 text-brand-mute leading-relaxed max-w-xl">
                Xiamen Chic Homeware Co.,Ltd. operates dedicated production lines for cutting,
                assembly, sanding, finishing and packaging — every step handled by experienced
                workers under one roof, in our own facility in Cao County, Shandong.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition"
                >
                  Talk to Our Team
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition"
                >
                  Browse Products
                </Link>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-xl bg-white aspect-[5/4]">
              <img
                src="/wp-images/2026/02/CHIC-Factory.jpg"
                alt="CHIC factory exterior — Xiamen Chic Homeware Co., Ltd."
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* ── Stats strip ── */}
      <section className="bg-brand-greenDeep text-white border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-3xl lg:text-4xl font-extrabold tracking-tight">{s.n}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Factory tour video ── */}
      <section className="py-20 lg:py-24 bg-white border-b border-brand-line">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              Factory Tour
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold tracking-tight text-brand-ink leading-[1.15]">
              See the factory{' '}
              <span className="text-brand-green">for yourself</span>.
            </h2>
            <p className="mt-4 text-brand-mute leading-relaxed">
              A short walk through our wooden products factory — production lines,
              finishing area, and quality control in action.
            </p>
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden border border-brand-line shadow-lg bg-brand-cream">
            {/* youtube-nocookie variant — no tracking until user interacts.
                loading="lazy" defers iframe creation until near viewport,
                keeping LCP unaffected on the above-the-fold content. */}
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${VIDEO.id}?rel=0`}
              title={VIDEO.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          <p className="mt-5 text-center text-sm text-brand-mute">
            Watch on{' '}
            <a
              href={`https://www.youtube.com/watch?v=${VIDEO.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-green hover:text-brand-greenDark"
            >
              YouTube
            </a>{' '}
            · More videos on our{' '}
            <a
              href={SITE.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-green hover:text-brand-greenDark"
            >
              channel
            </a>
          </p>
        </div>
      </section>

      {/* ── Two-base story (Caoxian + Xiamen) ── */}
      <section className="py-20 lg:py-24 border-b border-brand-line">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              Where We Operate
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold tracking-tight text-brand-ink leading-[1.15]">
              Two bases.{' '}
              <span className="text-brand-green">One supply chain.</span>
            </h2>
            <p className="mt-4 text-brand-mute leading-relaxed">
              Factory-direct manufacturing in Caoxian + professional export service in Xiamen —
              this structure lets us combine the lowest production cost with smooth international delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <BaseCard
              tag="Production Base"
              city="Caoxian, Shandong"
              text="One of China's most established hubs for wooden homeware, storage boxes and custom packaging. Strong woodworking supply chain, skilled labor, cost-efficient mass production."
              bullets={['Solid wood & bamboo supply chain', 'In-house CNC, finishing & assembly', 'Volume capacity 100 → 100k+ pcs']}
              image="/CHIC%20Factory.jpg"
            />
            <BaseCard
              tag="Sales & Export Office"
              city="Xiamen, Fujian"
              text="Major international port city in southern China. Our Xiamen team handles design, sampling, quality control follow-up and end-to-end global logistics."
              bullets={['Bilingual project managers', 'On-site QC & pre-shipment audits', 'Sea / air / Amazon FBA logistics']}
              image="/sales%20office.jpg"
            />
          </div>
        </div>
      </section>

      {/* ── Manufacturing Process ── */}
      <section className="py-20 lg:py-24 bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              Manufacturing Process
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold tracking-tight text-brand-ink leading-[1.15]">
              Six steps from{' '}
              <span className="text-brand-green">brief to shipment</span>.
            </h2>
            <p className="mt-4 text-brand-mute leading-relaxed">
              Our standard OEM workflow, with clear owner and timeline at each stage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS.map((s, i) => (
              <article
                key={s.title}
                className="bg-white rounded-2xl border border-brand-line p-7 hover:border-brand-green/40 hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-white text-sm font-extrabold tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-green">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="text-base font-bold text-brand-ink mb-2 leading-snug">{s.title}</h3>
                <p className="text-sm text-brand-mute leading-relaxed">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="py-20 lg:py-24 border-b border-brand-line">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
                Why Choose Us
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold tracking-tight text-brand-ink leading-[1.1]">
                Eight capabilities{' '}
                <span className="text-brand-green">brands rely on us for</span>.
              </h2>
              <p className="mt-5 text-brand-mute leading-relaxed max-w-md">
                A real factory, real product range, and a real workflow built for repeat
                B2B business — not one-off transactions.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {CAPABILITIES.map((c) => (
                <article
                  key={c.title}
                  className="bg-brand-cream rounded-2xl border border-brand-line p-6 hover:border-brand-green/40 hover:shadow-sm transition"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-green border border-brand-green/15 mb-4">
                    <CapIcon name={c.icon} />
                  </span>
                  <h3 className="text-base font-bold text-brand-ink mb-2 leading-snug">{c.title}</h3>
                  <p className="text-sm text-brand-mute leading-relaxed">{c.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Quality Control deep-dive ── */}
      <section className="py-20 lg:py-24 bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-[5/4]">
              <img
                src="/inspection.jpg"
                alt="Quality inspection"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
                Quality Control
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.1] mb-5">
                QC integrated{' '}
                <span className="text-brand-green">at every stage</span>, not bolted on at the end.
              </h2>
              <p className="text-brand-mute leading-relaxed mb-6">
                Each order is checked for dimensions, surface finishing, structure stability and
                packaging integrity to meet export standards required by international markets.
                We follow international export standards and operate our own factory under
                consistent QC procedures — supporting OEM and private label projects for global brands.
              </p>
              <ul className="space-y-2.5">
                {[
                  'Incoming material inspection (moisture content, defects, FSC docs)',
                  'In-process check at machining and pre-finishing',
                  'Sub-assembly review for dimension and structural fit',
                  'Final visual & functional QC before packing',
                  'AQL pre-shipment inspection (third-party available)',
                  'Drop-test verification for FBA and retail-shelf orders',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2 text-sm text-brand-ink/85">
                    <CheckBadge />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Photo gallery ── */}
      <section className="py-20 lg:py-24 border-b border-brand-line">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              Inside the Factory
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold tracking-tight text-brand-ink leading-[1.15]">
              Production floor,{' '}
              <span className="text-brand-green">in real photos</span>.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {GALLERY.map((g) => (
              <div key={g.url} className="aspect-square bg-brand-cream rounded-xl overflow-hidden border border-brand-line">
                <img src={g.url} alt={g.alt} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 lg:py-24 bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
              Common questions about{' '}
              <span className="text-brand-green">our factory &amp; OEM service</span>.
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ.map((it, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-brand-line bg-white overflow-hidden open:border-brand-green/40 open:bg-brand-cream/50"
                open={i === 0}
              >
                <summary className="cursor-pointer list-none flex items-start gap-4 p-5 lg:p-6 hover:bg-brand-cream/40 transition">
                  <span className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-cream text-brand-green text-xs font-extrabold tabular-nums group-open:bg-brand-green group-open:text-white transition">
                    Q{i + 1}
                  </span>
                  <span className="flex-1 text-base lg:text-[17px] font-bold text-brand-ink leading-snug pt-1.5">
                    {it.q}
                  </span>
                  <span className="shrink-0 mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-line text-brand-mute group-open:border-brand-green group-open:bg-brand-green group-open:text-white group-open:rotate-180 transition">
                    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l5 5 5-5" />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 lg:px-6 pb-6 pl-[68px] lg:pl-[80px] text-sm lg:text-[15px] text-brand-mute leading-relaxed">
                  {it.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 lg:py-24">
        <div className="max-w-[900px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            Ready to Talk?
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-ink mb-4 leading-tight">
            Have a brief? Let&apos;s build it together.
          </h2>
          <p className="text-brand-mute leading-relaxed mb-8 max-w-2xl mx-auto">
            Send your specs, sketches or reference samples — we typically reply within 24 hours
            with a quote and a sample timeline.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-brand-green px-8 py-3.5 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/material-guide"
              className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-8 py-3.5 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition"
            >
              Material Guide
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

// ── helpers ──────────────────────────────────────────────────────

function BaseCard({ tag, city, text, bullets, image }) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-brand-line">
      <div className="aspect-[16/9] bg-brand-cream overflow-hidden">
        <img src={image} alt={city} className="w-full h-full object-cover" />
      </div>
      <div className="p-7 lg:p-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-green mb-2">{tag}</p>
        <h3 className="text-2xl font-extrabold text-brand-ink mb-3">{city}</h3>
        <p className="text-sm text-brand-mute leading-relaxed mb-4">{text}</p>
        <ul className="space-y-1.5">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-brand-ink/85">
              <CheckBadge />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function CheckBadge() {
  return (
    <span className="shrink-0 inline-flex h-4 w-4 mt-0.5 items-center justify-center rounded-full bg-brand-green text-white">
      <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 8.5l3 3 6-6" />
      </svg>
    </span>
  );
}

function CapIcon({ name }) {
  const c = 'w-5 h-5';
  switch (name) {
    case 'badge':
      return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"><circle cx="12" cy="9" r="6"/><path d="M8 14l-2 8 6-3 6 3-2-8"/></svg>;
    case 'grid':
      return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
    case 'sliders':
      return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h13M4 12h7M4 18h11"/><circle cx="20" cy="6" r="2"/><circle cx="14" cy="12" r="2"/><circle cx="18" cy="18" r="2"/></svg>;
    case 'tree':
      return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"><path d="M12 2L4 12h4v8h8v-8h4z"/></svg>;
    case 'shield':
      return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>;
    case 'box':
      return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>;
    case 'speed':
      return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"><path d="M12 22a10 10 0 100-20 10 10 0 000 20z"/><path d="M12 6v6l4 2"/></svg>;
    case 'handshake':
      return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"><path d="M11 17l-3-3 5-5 4 4-2 2"/><path d="M3 11l5-5 4 4M13 13l4 4 4-4-4-4"/></svg>;
    default: return null;
  }
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       