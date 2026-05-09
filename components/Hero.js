import Image from 'next/image';
import { Link } from '@/i18n/navigation';

const POINTS = [
  'OEM & ODM Manufacturer',
  'Factory Direct Pricing',
  'Global Export Experience',
  'Flexible MOQ',
];

const FACTORY_PHOTO = '/wp-images/2026/02/CHIC-Factory.jpg';

export default function Hero() {
  return (
    <section className="bg-brand-cream">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid gap-10 lg:gap-14 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          {/* LEFT — copy */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
              Xiamen Chic Homeware Co.,Ltd.
            </p>

            <h1 className="font-extrabold tracking-tight text-brand-ink leading-[1.1] text-[clamp(2.25rem,4.4vw,3.4rem)]">
              Wooden Products Manufacturer{' '}
              <span className="whitespace-nowrap">&amp; OEM Supplier</span>{' '}
              in China
            </h1>

            <ul className="mt-7 grid grid-cols-2 gap-x-5 gap-y-3 max-w-[480px]">
              {POINTS.map((p) => (
                <li key={p} className="flex items-center gap-2 text-[14px] font-semibold text-brand-ink">
                  <CheckBadge />
                  <span className="leading-tight">{p}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-[15px] text-brand-ink/80 leading-relaxed max-w-[520px]">
              Factory-direct OEM &amp; ODM manufacturer of wooden kitchenware,
              desk organizers and home storage products — built for global brands.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white shadow-md hover:bg-brand-greenDark transition"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition"
              >
                View All Products
              </Link>
            </div>
          </div>

          {/* RIGHT — factory photo (LCP target — preloaded + auto WebP) */}
          <div className="relative">
            <div className="relative rounded-[20px] overflow-hidden shadow-xl bg-white aspect-[5/4] lg:aspect-[6/5]">
              <Image
                src={FACTORY_PHOTO}
                alt="CHIC factory — Xiamen Chic Homeware Co., Ltd."
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
            </div>
            <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-3 py-1.5 text-[11px] font-bold tracking-wide text-brand-ink shadow">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-sm bg-brand-green text-white text-[9px]">◧</span>
              CHIC · wooden expert
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckBadge() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-green text-white shrink-0">
      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 8.5l3 3 6-6" />
      </svg>
    </span>
  );
}
