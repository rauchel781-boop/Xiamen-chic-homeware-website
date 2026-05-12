// /custom-wooden-storage-boxes-wholesale — hand-coded SEO landing page.
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';
import { hreflangFor } from '@/i18n/routing';

const SLUG = 'custom-wooden-storage-boxes-wholesale';
const TITLE = 'Custom Wooden Storage Boxes Wholesale for Brands, Importers and Retailers';
const META_DESC =
  'Source custom wooden storage boxes wholesale from a factory-direct manufacturer in China. OEM sizes, materials, lids, inserts, logo branding, and export packaging for B2B buyers.';

export const metadata = {
  title: 'Custom Wooden Storage Boxes Wholesale | OEM Manufacturer China',
  description: META_DESC,
  alternates: { canonical: `/${SLUG}`, languages: hreflangFor(SITE.siteUrl, `/${SLUG}`) },
  openGraph: { type: 'website', url: `${SITE.siteUrl}/${SLUG}`, title: TITLE, description: META_DESC,
    images: [{ url: '/wp-images/2026/03/natural-wood-box-4.png', width: 1200, height: 800, alt: TITLE }],
    siteName: SITE.company.brand },
  twitter: { card: 'summary_large_image', title: TITLE, description: META_DESC },
};

const HERO = {
  kicker: 'Wholesale Storage Boxes',
  badges: ['Custom sizes & lids', 'Logo branding & packaging', 'Solid wood & engineered options'],
  lead: 'Custom wooden storage boxes for home organization, gift packaging, retail presentation, and private label projects — full OEM service for B2B buyers.',
  image: '/wp-images/2026/03/natural-wood-box-4.png',
};

const STYLES = [
  { title: 'Hinged Lid Boxes', body: 'Classic structure for keepsake storage, gift packaging, home organization, and private label collections.', image: '/wp-images/2026/03/natural-wood-box-5.png' },
  { title: 'Sliding Lid Boxes', body: 'Clean and practical style — for tea, coffee, desktop accessories, and compact retail packaging.', image: '/wp-images/2026/02/wooden-gift-box-.jpg' },
  { title: 'Boxes with Compartments', body: 'For jewelry, essential oils, tea bags, accessories — multi-item storage and presentation sets.', image: '/wp-images/2026/02/holder-10.jpg' },
  { title: 'Magnetic Closure', body: 'Stronger presentation option — premium packaging, corporate gifts, refined branded collections.', image: '/wp-images/2026/01/Slim-Wooden-Double-Ring-Box-5.png' },
  { title: 'Lock or Clasp', body: 'Decorative and practical — added security, stronger display value, vintage look.', image: '/wp-images/2026/03/ScreenShot_2026-03-17_200616_970.png' },
  { title: 'Open-Top Organizers', body: 'For desk storage, vanity organization, entryway catchall use, and countertop display programs.', image: '/wp-images/2026/03/Bamboo-Toilet-Paper-Storage-box-6.png' },
];

const MATERIALS = [
  { name: 'Premium Wood Options', body: 'Acacia, walnut. For higher-end retail packaging, gift presentation, and projects needing a refined appearance and solid feel.', image: '/wp-images/2026/03/ScreenShot_2026-03-17_150727_334.png' },
  { name: 'Cost-Effective Solid Wood', body: 'Pine, paulownia. Practical for larger-volume box programs, painted finishes, and projects needing better cost control.', image: '/wp-images/2026/03/ScreenShot_2026-03-17_151314_710.png' },
  { name: 'Stable Engineered Options', body: 'Plywood, MDF veneer. Good for painted, veneered, or structure-sensitive projects where consistency and budget balance matter.', image: '/wp-images/2026/03/wooden-shower-crate-2.jpg' },
];

const CUSTOMIZATION = [
  'Custom dimensions and internal depth',
  'Hinged, sliding, magnetic lid or clasp',
  'Dividers, removable inserts, EVA or velvet lining',
  'Natural finish, stained finish, or painted colors',
  'Laser logo, printing, foil logo, or branding details',
  'Retail box, export carton, or e-commerce packaging',
];

const APPLICATIONS = [
  { title: 'Home Organization', body: 'Closet, kitchen, bathroom, entryway organization for retail and DIY home brands.' },
  { title: 'Gift & Retail Packaging', body: 'Premium gift packaging programs — corporate, holiday, and seasonal collections.' },
  { title: 'Subscription & E-Commerce', body: 'Branded boxes for subscription companies, DTC brands, and online retailers.' },
  { title: 'Hospitality Amenity', body: 'Hotel, Airbnb, and serviced apartment amenity boxes — drawer organizers, in-room caddies.' },
];

const FAQS = [
  { q: 'What is your typical MOQ for wooden storage boxes?', a: 'Typically 300–500 pcs per design depending on size, material, and customization. Trial orders below MOQ may be possible.' },
  { q: 'Can you make custom sizes and lids?', a: 'Yes — custom dimensions, internal depth, and lid styles (hinged, sliding, magnetic, clasp) are all supported.' },
  { q: 'Do you provide samples before mass production?', a: 'Yes. Pre-production samples for size, material, finish, and logo confirmation. Sample lead time 7–10 days.' },
  { q: 'What wood materials do you usually use?', a: 'Acacia, walnut, pine, paulownia for solid wood — and plywood, MDF veneer for engineered budget projects.' },
  { q: 'Can you ship directly to Amazon FBA?', a: 'Yes. We provide FBA-ready packaging, barcode labels, drop-test packaging, and worldwide shipping coordination.' },
];

const BREADCRUMB = [{ name: 'Home', url: '/' }, { name: 'Custom Wooden Storage Boxes Wholesale' }];

export default function Page({ params }) {
  unstable_setRequestLocale(params.locale);
  const breadcrumbLd = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: BREADCRUMB.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url ? `${SITE.siteUrl}${c.url}` : `${SITE.siteUrl}/${SLUG}` })) };
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

  return (
    <article className="bg-white">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={faqLd} />

      <header className="bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <nav className="text-xs text-brand-mute mb-4">
            <Link href="/" className="hover:text-brand-green">Home</Link>{' / '}
            <span className="text-brand-ink">Custom Wooden Storage Boxes Wholesale</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">{HERO.kicker}</p>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-brand-ink leading-[1.1]">
                Custom Wooden <span className="text-brand-green">Storage Boxes</span> Wholesale
              </h1>
              <p className="mt-5 text-brand-mute leading-relaxed text-[17px] max-w-xl">{HERO.lead}</p>
              <ul className="mt-6 grid sm:grid-cols-3 gap-3">
                {HERO.badges.map(b => <li key={b} className="flex items-center gap-2 bg-white border border-brand-line rounded-full px-4 py-2 text-sm font-semibold text-brand-ink"><span className="w-2 h-2 rounded-full bg-brand-green" />{b}</li>)}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition">Get a Quote</Link>
                <Link href="/products/wooden-storage-box-with-lid" className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition">Browse Boxes</Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] bg-white rounded-2xl overflow-hidden border border-brand-line shadow-sm">
              <Image
                src={HERO.image}
                alt={TITLE}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* STYLES */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Box Styles</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">Popular Custom Wooden Storage Box Styles</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">Different projects require different box structures — practical organizers, premium gift boxes, or branded retail collections.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STYLES.map(s => (
              <article key={s.title} className="group bg-white rounded-2xl border border-brand-line overflow-hidden hover:border-brand-green/40 hover:shadow-lg transition">
                <div className="relative aspect-[4/3] bg-brand-cream overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-[1.03] transition duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-brand-ink mb-2 leading-snug">{s.title}</h3>
                  <p className="text-sm text-brand-mute leading-relaxed">{s.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIALS */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Materials</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">Wood Materials for Different Price Levels</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">Material affects cost, appearance, weight, and structure — different solutions for different market positions.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {MATERIALS.map(m => (
              <article key={m.name} className="group bg-white rounded-2xl border border-brand-line overflow-hidden hover:border-brand-green/40 hover:shadow-lg transition">
                <div className="relative aspect-[4/3] bg-brand-cream overflow-hidden">
                  <Image
                    src={m.image}
                    alt={`${m.name} wood`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-[1.03] transition duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-brand-ink mb-2">{m.name}</h3>
                  <p className="text-sm text-brand-mute leading-relaxed">{m.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMIZATION */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] bg-brand-cream rounded-2xl overflow-hidden border border-brand-line">
              <Image
                src="/wp-images/2026/02/image-14.png"
                alt="Custom wooden storage box customization options"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Customization</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-tight mb-5">
                Full Customization for Wholesale Buyers
              </h2>
              <p className="text-brand-mute leading-relaxed text-[16px] mb-6">
                Buyers care about more than just outer box shape — internal layout, lid style, finish, logo placement, and shipping packaging all affect the final result.
              </p>
              <ul className="space-y-3">
                {CUSTOMIZATION.map(item => (
                  <li key={item} className="flex items-start gap-3 text-brand-ink">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="text-brand-green flex-shrink-0 mt-0.5">
                      <circle cx="8" cy="8" r="8" fill="#E8F0EA" />
                      <path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">Applications</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">For Storage, Gifting, and Retail Packaging</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {APPLICATIONS.map((a, i) => (
              <article key={a.title} className="bg-white rounded-2xl border border-brand-line p-7 hover:border-brand-green/40 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mb-4 font-bold text-sm">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-base font-bold text-brand-ink mb-2 leading-snug">{a.title}</h3>
                <p className="text-sm text-brand-mute leading-relaxed">{a.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[820px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">FAQ About Custom Wooden Storage Boxes Wholesale</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <details key={i} className="group bg-brand-cream rounded-2xl border border-brand-line hover:border-brand-green/40 transition overflow-hidden">
                <summary className="flex items-start justify-between cursor-pointer p-5 lg:p-6 gap-4 list-none">
                  <span className="font-semibold text-brand-ink leading-snug">{f.q}</span>
                  <span className="shrink-0 w-7 h-7 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center text-sm font-bold transition group-open:bg-brand-green group-open:text-white group-open:rotate-45">+</span>
                </summary>
                <div className="px-5 lg:px-6 pb-5 lg:pb-6 -mt-1 text-brand-mute leading-relaxed text-[15px]">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-green text-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-wood mb-3">Need a quote</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">Need a Quote for Custom Wooden Storage Boxes?</h2>
              <p className="mt-4 text-white/85 leading-relaxed text-[16px] max-w-xl">Send us your size, material preference, lid style, logo and packaging requirements — full quote with samples and lead-time within one business day.</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/contact" className="inline-flex items-center rounded-full bg-brand-wood px-7 py-3 text-[15px] font-semibold text-brand-ink hover:bg-brand-woodSoft transition">Get a Free Quote</Link>
              <Link href="/wooden-box-factory-in-china" className="inline-flex items-center rounded-full border-2 border-white px-7 py-3 text-[15px] font-semibold text-white hover:bg-white hover:text-brand-green transition">About Our Factory</Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
