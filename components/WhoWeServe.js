// Who We Serve — clean centered intro + 4 equal-height segment cards.
// Materials block has been split out into its own component (MaterialsSection.js).
const SEGMENTS = [
  {
    title: 'Amazon FBA Sellers',
    icon: 'cart',
    body: 'Drop-test certified packaging, FNSKU labelling and Amazon-ready master cartons.',
  },
  {
    title: 'Home & Kitchen Brands',
    icon: 'home',
    body: 'Branded wooden kitchenware, organizers and storage products with custom finishes.',
  },
  {
    title: 'Gift & Promotional Companies',
    icon: 'gift',
    body: 'Corporate gift boxes, presentation cases and branded promotional items in low MOQ.',
  },
  {
    title: 'Importers, Wholesalers & Retailers',
    icon: 'truck',
    body: 'Reliable bulk supply for partners across North America, Europe, Australia and Japan.',
  },
];

const MARKETS_PHOTO = '/wp-images/2025/12/3ee060b0-b0ef-458f-a2df-2994aee5d953.png';

export default function WhoWeServe() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
            Who We Serve
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold tracking-tight text-brand-ink leading-[1.15]">
            From launching Amazon sellers to{' '}
            <span className="text-brand-green">multi-store retail chains</span>
          </h2>
          <p className="mt-4 text-brand-mute leading-relaxed">
            We supply wooden products to brands and importers across North America, Europe and Australia.
          </p>
        </div>

        {/* 4 segments — equal height grid, icon left, content right */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-12">
          {SEGMENTS.map((s) => (
            <article
              key={s.title}
              className="bg-brand-cream border border-brand-line rounded-2xl p-6 lg:p-7 hover:border-brand-green/40 hover:shadow-md transition flex flex-col"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand-green border border-brand-green/15 mb-5">
                <SegIcon name={s.icon} />
              </span>
              <h3 className="text-base lg:text-lg font-bold text-brand-ink mb-2 leading-snug">
                {s.title}
              </h3>
              <p className="text-sm text-brand-mute leading-relaxed">
                {s.body}
              </p>
            </article>
          ))}
        </div>

        {/* Markets photo banner with overlay caption */}
        <div className="relative rounded-2xl overflow-hidden aspect-[16/6] bg-brand-cream">
          <img src={MARKETS_PHOTO} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-greenDeep/80 via-brand-greenDeep/40 to-transparent" />
          <div className="absolute inset-0 flex items-center px-8 lg:px-14 max-w-2xl">
            <div className="text-white">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-yellowSoft mb-2">
                Global Reach
              </p>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight">
                Shipping to 60+ countries — US, EU, UK, Australia, Japan and beyond
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SegIcon({ name }) {
  const c = 'w-6 h-6';
  switch (name) {
    case 'cart':
      return (
        <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.7 13.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6" />
        </svg>
      );
    case 'home':
      return (
        <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12l9-9 9 9" /><path d="M5 10v10a1 1 0 001 1h12a1 1 0 001-1V10" />
        </svg>
      );
    case 'gift':
      return (
        <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="8" width="18" height="13" rx="1" /><path d="M3 12h18M12 8v13" />
          <path d="M7 8a3 3 0 110-6 5 5 0 015 5M17 8a3 3 0 100-6 5 5 0 00-5 5" />
        </svg>
      );
    case 'truck':
      return (
        <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7" />
          <circle cx="6" cy="19" r="2" /><circle cx="19" cy="19" r="2" />
        </svg>
      );
    default: return null;
  }
}
