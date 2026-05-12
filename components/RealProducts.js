// Real Products showcase — editorial header + 8-card static grid (no carousel).
// All 8 products are visible at once for quick scanning; rich hover state
// reveals a "View product" pill in the lower-right of each card.
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

// Server component — receives `products` array as prop from home page.
// Each product: { slug, title, img }
export default function RealProducts({ products = [] }) {
  if (!products.length) return null;

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
        {/* Editorial header */}
        <div className="max-w-2xl mb-12 lg:mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
            Bestsellers &amp; New Designs
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold tracking-tight text-brand-ink leading-[1.15]">
            Real products,{' '}
            <span className="text-brand-green">OEM &amp; ODM ready</span>
          </h2>
          <p className="mt-4 text-brand-mute leading-relaxed">
            Selected solid wood &amp; bamboo pieces we manufacture for global brands —
            every SKU customizable in size, finish, branding and packaging.
          </p>
        </div>

        {/* 4x2 grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {products.slice(0, 8).map((p) => (
            <Card key={p.slug + p.img} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ p }) {
  return (
    <Link
      href={`/products/${p.slug}`}
      className="group block"
    >
      {/* Image with overlay */}
      <div className="relative aspect-square bg-brand-cream rounded-xl overflow-hidden border border-brand-line">
        {p.img ? (
          <Image
            src={p.img}
            alt={p.title || 'Featured wooden product'}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brand-mute text-xs uppercase tracking-wider">
            No image
          </div>
        )}

        {/* OEM badge — top-left */}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/95 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold text-brand-green shadow-sm">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-green" />
          OEM Ready
        </span>

        {/* Hover overlay — gradient from bottom + view pill */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-white text-brand-green px-4 py-2 text-xs font-bold shadow-md translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition">
          View product
          <svg viewBox="0 0 14 14" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 7h10M8 3l4 4-4 4" />
          </svg>
        </span>
      </div>

      {/* Caption */}
      <h3 className="mt-3 text-sm lg:text-[15px] font-semibold text-brand-ink group-hover:text-brand-green line-clamp-2 leading-snug transition">
        {p.title}
      </h3>
    </Link>
  );
}
