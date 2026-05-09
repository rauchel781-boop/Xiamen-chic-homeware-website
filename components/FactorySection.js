// Factory section — editorial layout with balanced 2x2 photo grid (left)
// and two location cards (right). Less wall-of-text, less bold spam.
import { Link } from '@/i18n/navigation';

const PHOTOS = [
  { url: '/wp-images/2026/01/raw-material-warehouse.jpg', alt: 'Raw material warehouse' },
  { url: '/wp-images/2026/01/production.jpg', alt: 'Wooden product production line' },
  { url: '/wp-images/2026/01/machine-4.jpg', alt: 'CNC woodworking machinery' },
  { url: '/wp-images/2026/02/CHIC-Factory.jpg', alt: 'CHIC factory exterior' },
];

const LOCATIONS = [
  {
    label: 'Production Base',
    city: 'Caoxian, Shandong',
    body: 'One of China\'s most established hubs for wooden homeware and packaging. Strong supply chain, skilled labor and cost-efficient mass production for OEM & ODM orders.',
    bullets: ['Solid wood &amp; bamboo supply chain', 'In-house CNC, finishing &amp; assembly', 'Volume capacity from 100 → 100k+ pcs'],
  },
  {
    label: 'Sales & Export Office',
    city: 'Xiamen, Fujian',
    body: 'Major international port city. Our Xiamen team handles design, sampling, QC follow-up and global logistics — your single point of contact end to end.',
    bullets: ['Bilingual project managers', 'On-site QC &amp; pre-shipment audits', 'Sea / air / Amazon FBA logistics'],
  },
];

export default function FactorySection() {
  return (
    <section className="bg-brand-cream py-20 lg:py-28">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
        {/* Top intro */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
            Our Factory
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-brand-ink leading-[1.1]">
            Built in China,{' '}
            <span className="text-brand-green">trusted by global brands.</span>
          </h2>
          <p className="mt-5 text-brand-mute leading-relaxed">
            Factory-direct manufacturing in Caoxian + professional export service in Xiamen —
            two bases working together to deliver consistent quality, competitive pricing and
            smooth international shipping.
          </p>
        </div>

        {/* Body — 2 col */}
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-12 items-stretch">
          {/* LEFT — 2x2 photo grid, all equal size */}
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            {PHOTOS.map((p) => (
              <div key={p.url} className="aspect-[5/4] rounded-xl overflow-hidden bg-white shadow-sm">
                <img
                  src={p.url}
                  alt={p.alt}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
            ))}
          </div>

          {/* RIGHT — two location cards stacked + CTA */}
          <div className="flex flex-col gap-5">
            {LOCATIONS.map((loc) => (
              <article key={loc.city} className="bg-white rounded-2xl p-7 lg:p-8 border border-brand-line">
                <div className="flex items-start gap-4">
                  <span className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-cream text-brand-green border border-brand-green/20">
                    <PinIcon />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-green">
                      {loc.label}
                    </p>
                    <h3 className="mt-1 text-xl lg:text-2xl font-extrabold text-brand-ink leading-tight">
                      {loc.city}
                    </h3>
                  </div>
                </div>
                <p className="mt-4 text-sm text-brand-mute leading-relaxed">
                  {loc.body}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {loc.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-brand-ink/85">
                      <CheckBadge />
                      <span dangerouslySetInnerHTML={{__html: b}} />
                    </li>
                  ))}
                </ul>
              </article>
            ))}

            <div className="flex flex-wrap gap-3 mt-2">
              <Link
                href="/about"
                className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition"
              >
                Learn More About CHIC
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition"
              >
                Talk to Our Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
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
