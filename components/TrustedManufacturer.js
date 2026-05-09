// "Your Trusted Wooden Products Manufacturer" section — pulled from the
// xmchichomeware.com home page. Compact 4-step pipeline below an intro line.
import { Link } from '@/i18n/navigation';

const STAGES = [
  { n: 1, label: 'Product Design',     desc: 'CAD drawings, mockups, prototypes — we co-design with your brand brief.' },
  { n: 2, label: 'Sample Development', desc: 'Functional samples produced in our own factory, photo & video confirmation.' },
  { n: 3, label: 'Quality Testing',    desc: 'Multi-step QC: material check, in-process inspection, pre-shipment AQL.' },
  { n: 4, label: 'Bulk Production',    desc: 'Scaled production with consistent finish, packaging and on-time delivery.' },
];

export default function TrustedManufacturer() {
  return (
    <section className="bg-brand-greenDeep text-white py-20 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.25em] text-brand-yellowSoft font-semibold">
            Your Trusted Wooden Products Manufacturer
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-wide uppercase">
            From Product Design to Bulk Production — All Under One Roof
          </h2>
          <p className="mt-4 text-white/75 max-w-3xl mx-auto leading-relaxed">
            As a professional wooden products manufacturer, we specialize in high-quality
            wooden kitchenware, desk organizers, and home storage products for global markets.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {STAGES.map((s) => (
            <div
              key={s.n}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur hover:bg-white/10 transition"
            >
              <div className="text-xs font-semibold tracking-wider text-brand-yellowSoft mb-2">
                STAGE 0{s.n}
              </div>
              <div className="text-lg font-bold mb-2">{s.label}</div>
              <p className="text-sm text-white/65 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-white/75 max-w-3xl mx-auto leading-relaxed">
          Our reputation is built on consistent quality, factory-direct pricing, and reliable
          OEM &amp; ODM service for brands, importers, and Amazon sellers worldwide.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-white text-brand-green px-8 py-3.5 text-[15px] font-bold hover:bg-brand-cream transition"
          >
            Start a Project →
          </Link>
        </div>
      </div>
    </section>
  );
}
