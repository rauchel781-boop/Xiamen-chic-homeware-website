// /capabilities — high-level overview of factory capabilities.
import { unstable_setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export const metadata = {
  title: 'Capabilities — CHIC Wooden Products Factory',
  description:
    'CNC routing, laser engraving, hot foil, screen print, kiln drying, finishing and packing — modern equipment and a strict QC system for wholesale and OEM wooden box programs.',
  alternates: { canonical: '/capabilities' },
};

const ITEMS = [
  { t: 'Manufacturing Equipment', d: 'CNC routers, sliding panel saws, edge banders, finishing booths.' },
  { t: 'Quality Control',         d: 'Multi-stage inspection from incoming materials to pre-shipment.' },
  { t: 'OEM / ODM',               d: 'Branding, packaging, and full design support for private label.' },
  { t: 'Production Capacity',     d: 'Stable monthly output with predictable lead times.' },
  { t: 'Engineering Support',     d: 'CAD review, prototyping, and DFM suggestions.' },
  { t: 'Logistics',               d: 'Reliable export packing and worldwide shipping coordination.' },
];

export default function CapabilitiesPage({ params }) {
  unstable_setRequestLocale(params.locale);
  return (
    <article className="bg-white">
      <header className="bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <nav className="text-xs text-brand-mute mb-4">
            <Link href="/" className="hover:text-brand-green">Home</Link>
            {' / '}
            <span className="text-brand-ink">Capabilities</span>
          </nav>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
            What We Can Do
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-ink leading-[1.1]">
            Modern equipment.{' '}
            <span className="text-brand-green">Strict quality.</span>
          </h1>
          <p className="mt-5 text-brand-mute leading-relaxed max-w-2xl">
            Designed for wholesale and OEM customers — modern machinery, experienced operators,
            and a documented quality system that holds export-grade standards.
          </p>
        </div>
      </header>

      <section className="py-16 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ITEMS.map((c) => (
              <article
                key={c.t}
                className="bg-brand-cream rounded-2xl border border-brand-line p-6 lg:p-7 hover:border-brand-green/40 transition"
              >
                <h3 className="text-base font-bold text-brand-ink mb-2">{c.t}</h3>
                <p className="text-sm text-brand-mute leading-relaxed">{c.d}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition"
            >
              About Our Factory
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
