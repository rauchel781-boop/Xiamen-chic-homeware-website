const ITEMS = [
  { title: 'Solid Wood Boards', desc: 'Strong, durable boards for furniture and interiors.' },
  { title: 'Plywood', desc: 'Multi-layer plywood with consistent thickness and finish.' },
  { title: 'Cut-to-Size Boards', desc: 'Precise cutting to your specs to save time and waste.' },
  { title: 'Wooden Handles', desc: 'Custom turned and shaped handles for tools and furniture.' },
  { title: 'Wooden Beads', desc: 'Smooth, finished beads in many shapes and sizes.' },
  { title: 'Wooden Lids & Stoppers', desc: 'Tight-fit lids and stoppers for jars and bottles.' },
];

export default function Featured() {
  return (
    <section className="bg-white section-pad">
      <div className="container">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-brand-teal">
          CHIC Featured Wood Board Manufacturing
        </h2>

        <div className="mx-auto mt-8 max-w-4xl space-y-5 text-[15px] md:text-base leading-relaxed text-brand-ink/90">
          <p>
            CHIC is a leader in the production and supply of wood boards, offering a wide
            variety of popular options to meet the needs of both customers and industries.
          </p>
          <p>
            We provide an extensive range of products, including: Solid wood boards, Plywood,
            Cut-to-size wood boards, Wooden handles, Wooden beads, Wooden lids and stoppers.
          </p>
          <p>
            If you require custom specifications for wood materials, we are fully equipped to
            produce them. Our advanced and well-equipped manufacturing facilities enable us to
            deliver high-quality, custom wood solutions.
          </p>
          <p>
            Additionally, we offer cut-to-size boards, saving our customers both time and materials
            while ensuring a precise fit for their projects.
          </p>
        </div>

        {/* Product grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it) => (
            <article
              key={it.title}
              className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-yellow/70">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="#5C3A1B" strokeWidth="1.8">
                  <path d="M3 7l9-4 9 4-9 4-9-4z" />
                  <path d="M3 12l9 4 9-4" />
                  <path d="M3 17l9 4 9-4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-brand-navy">{it.title}</h3>
              <p className="mt-2 text-sm text-brand-mute leading-relaxed">{it.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
