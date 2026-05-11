// /wood-fabrication — capabilities page describing in-house wood fabrication.
import { unstable_setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { SITE } from '@/data/site-config';
import { hreflangFor } from '@/i18n/routing';

export const metadata = {
  title: 'Wood Fabrication Capabilities — CHIC',
  description:
    'From rough timber to finished, packaged wooden box components — CHIC handles cutting, shaping, mortising, pre-assembly, polishing and packing under one roof.',
  alternates: { canonical: '/wood-fabrication', languages: hreflangFor(SITE.siteUrl, '/wood-fabrication') },
};

const CAPABILITIES = [
  { t: 'CNC Machining',         d: 'Precise cutting, drilling and routing on 3-axis and 4-axis machines.' },
  { t: 'Sanding & Finishing',   d: 'Belt and orbital sanding, oiling, lacquering and painting lines.' },
  { t: 'Custom Shaping',        d: 'Turning, carving, edge profiling, and assembly to your drawings.' },
  { t: 'Pre-Assembly',          d: 'Hinge fitting, magnetic closure installation, lock & key hardware mounting.' },
  { t: 'Inserts & Lining',      d: 'CNC-cut foam, velvet wrap, microfiber lining, molded pulp inserts.' },
  { t: 'Quality & Packing',     d: 'Multi-step QC, drop-test packaging, FBA-ready master cartons, palletization.' },
];

export default function WoodFabricationPage({ params }) {
  unstable_setRequestLocale(params.locale);
  return (
    <article className="bg-white">
      <header className="bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <nav className="text-xs text-brand-mute mb-4">
            <Link href="/" className="hover:text-brand-green">Home</Link>
            {' / '}
            <span className="text-brand-ink">Wood Fabrication</span>
          </nav>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
            Capabilities
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-ink leading-[1.1]">
            Full in-house{' '}
            <span className="text-brand-green">wood fabrication</span>.
          </h1>
          <p className="mt-5 text-brand-mute leading-relaxed max-w-2xl">
            From rough timber to finished, packaged wooden box components — our 15,000&nbsp;m² facility
            handles every step of the wood fabrication process under one roof.
          </p>
        </div>
      </header>

      <section className="py-16 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAPABILITIES.map((c) => (
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
