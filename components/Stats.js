// Quick numeric trust strip — placeholder values, user should update them.
const STATS = [
  { n: '15+',     label: 'Years OEM Experience' },
  { n: '60+',     label: 'Export Countries' },
  { n: '500+',    label: 'SKUs Manufactured' },
  { n: '20,000㎡', label: 'Factory Floor Space' },
];

export default function Stats() {
  return (
    <section className="bg-brand-greenDeep text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {STATS.map((s) => (
          <div key={s.label}>
            <div className="text-4xl md:text-5xl font-extrabold tracking-tight">{s.n}</div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/60">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
