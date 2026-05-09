// Thin stats / trust strip — sits right under Hero.
// Builds instant credibility before the product carousel.
const STATS = [
  { n: '15+',     label: 'Years OEM',          sub: 'Manufacturing experience' },
  { n: '60+',     label: 'Export Countries',   sub: 'US, EU, AU, JP, KR…' },
  { n: '500+',    label: 'SKUs Produced',      sub: 'Across 40+ categories' },
  { n: '20,000㎡', label: 'Factory Floor',     sub: 'Caoxian production base' },
];

export default function TrustBar() {
  return (
    <section className="bg-white border-y border-brand-line">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8 py-8 lg:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`text-center px-4 py-2 ${i < 3 ? 'md:border-r border-brand-line' : ''} ${i % 2 === 0 ? 'border-r border-brand-line md:border-r' : ''}`}
            >
              <div className="font-extrabold text-3xl md:text-4xl text-brand-ink tracking-tight tabular-nums">
                {s.n}
              </div>
              <div className="mt-1 text-[12px] font-bold uppercase tracking-[0.15em] text-brand-green">
                {s.label}
              </div>
              <div className="mt-1 text-[11px] text-brand-mute">
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
