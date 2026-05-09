// 4-step manufacturing process — image-led card design.
// Each step: real WP photo on top, number badge overlapping the image,
// title and description below. Connected with a horizontal flow line on lg+.

const STEPS = [
  {
    n: 1,
    title: 'Quotation & Sample Development',
    body: 'Share your quantity, product details and requirements. We prepare a clear quotation and produce samples for your approval.',
    img: '/wp-images/2026/02/ScreenShot_2026-02-07_220235_556.png',
    alt: 'Quotation and sample development discussion',
  },
  {
    n: 2,
    title: 'Sample Confirmation',
    body: 'After approval we finalize materials, structure, finishes and production details — locked-in spec sheet for the bulk run.',
    img: '/wp-images/2026/02/holder-6.jpg',
    alt: 'Wooden product sample on the production bench',
  },
  {
    n: 3,
    title: 'Custom Packaging',
    body: 'Color labels, gift boxes, kraft cartons, or Amazon drop-test packaging — we prep your goods for retail or FBA.',
    img: '/wp-images/2026/02/holder-7.jpg',
    alt: 'Amazon FBA ready packaging',
  },
  {
    n: 4,
    title: 'Shipping & Delivery',
    body: 'Sea freight, express, or Amazon FBA shipping — arranged based on your destination, timeline and budget.',
    img: '/wp-images/2026/02/holder-8.jpg',
    alt: 'Pallets ready for global dispatch',
  },
];

export default function Process() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-14 lg:mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            Our Workflow
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-brand-ink leading-[1.1] uppercase">
            OEM &amp; ODM Manufacturing Process
          </h2>
          <p className="mt-4 text-brand-mute max-w-3xl mx-auto leading-relaxed">
            From quotation and sampling to custom packaging and global shipping —
            a clear, reliable workflow for every order, large or small.
          </p>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
          {/* Connecting flow line on lg+ — sits behind cards */}
          <div
            className="hidden lg:block absolute top-[110px] left-0 right-0 mx-auto h-0.5 bg-gradient-to-r from-brand-green/0 via-brand-green/30 to-brand-green/0 z-0 pointer-events-none"
            aria-hidden="true"
          />

          {STEPS.map((s) => (
            <Card key={s.n} step={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ step: s }) {
  return (
    <article className="group relative z-10">
      {/* Image */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-brand-cream shadow-sm border border-brand-line">
        <img
          src={s.img}
          alt={s.alt}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        {/* Connector dot for lg+ horizontal flow */}
        <span
          className="hidden lg:block absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-brand-green z-20"
          aria-hidden="true"
        />
      </div>

      {/* Step number badge — overlapping bottom of image */}
      <div className="-mt-6 ml-5 inline-flex items-center gap-2 relative z-10">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-green text-white text-base font-extrabold shadow-md ring-4 ring-white">
          {String(s.n).padStart(2, '0')}
        </span>
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-green">
          Step {s.n}
        </span>
      </div>

      {/* Text */}
      <div className="mt-4 px-1">
        <h3 className="text-base lg:text-lg font-bold text-brand-ink leading-snug mb-2">
          {s.title}
        </h3>
        <p className="text-sm text-brand-mute leading-relaxed">
          {s.body}
        </p>
      </div>
    </article>
  );
}
