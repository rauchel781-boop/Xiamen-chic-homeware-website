const CAPS = [
  {
    title: 'Advanced Equipment',
    desc: 'CNC routers, panel saws, edge banders and finishing lines for consistent quality.',
  },
  {
    title: 'Custom Design Support',
    desc: 'Full design and prototyping help — from sketches and CAD to first articles.',
  },
  {
    title: 'Strict Quality Control',
    desc: 'Multi-stage QC: incoming material, in-process checks, and pre-shipment inspection.',
  },
  {
    title: 'Wholesale & OEM',
    desc: 'Reliable bulk supply with flexible MOQs and private-label / OEM programs.',
  },
];

export default function CapabilitiesSection() {
  return (
    <section className="bg-brand-cream section-pad">
      <div className="container">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-brand-teal">
          Our Capabilities
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-brand-mute">
          One-stop manufacturing service for wholesale buyers, brands, and project teams.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CAPS.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-teal text-brand-wood">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12l4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-bold text-brand-teal">{c.title}</h3>
              <p className="mt-2 text-sm text-brand-mute leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
