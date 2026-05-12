// /material-guide — fully redesigned, image-rich material guide.
// Content sourced from the WP "complete-guide-wood-materials-for-kitchenware" page.
// Each wood has its own card with photo, description, ratings, best-for use cases,
// and links to relevant product categories on this site.

import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';
import { wpPosts } from '@/lib/wp-data';
import { hreflangFor } from '@/i18n/routing';

export async function generateMetadata({ params: { locale } = {} }) {
  const title = 'Wood Materials Guide — Choose the Right Wood for Your Product';
  const description = 'A complete guide to wood materials for kitchenware, storage boxes and home organizers. Compare acacia, walnut, bamboo, pine, oak, paulownia, teak and more.';
  return {
    title, description,
    alternates: { canonical: `/material-guide`, languages: hreflangFor(SITE.siteUrl, '/material-guide') },
    openGraph: {
      type: 'article',
      url: `${SITE.siteUrl}/material-guide`,
      title, description, siteName: SITE.company.brand,
    },
  };
}

// ───────────────────────────────────────────────────────────────────
// Material data — image + description + ratings + best-fit categories
// ───────────────────────────────────────────────────────────────────
//
// Ratings: 1–5 (★ = poor → strong)
// Cost:    $ (cheap) → $$$$ (premium)
// Weight:  light / medium / heavy
//
const MATERIALS = [
  {
    slug: 'acacia',
    name: 'Acacia Wood',
    tagline: 'The all-rounder hardwood for premium kitchenware.',
    intro:
      'A durable hardwood with rich, irregular grain — extremely popular for wooden plates, serving trays, cutting boards and kitchen organizers. Excellent food-contact safety with proper finishes.',
    advantages: [
      'Strong, dense, hard-wearing structure',
      'Natural color variation gives a premium look',
      'Food-safe with proper food-grade finish',
      'Ages beautifully with use',
    ],
    rating: { hardness: 4, cost: '$$$', weight: 'Medium', appearance: 'Rich grain', moisture: 'Good' },
    bestFor: ['Cutting boards', 'Cheese boards', 'Serving trays', 'Knife blocks'],
    categories: [
      { label: 'Cutting Boards', slug: 'wooden-cutting-board' },
      { label: 'Cheese Boards',  slug: 'wooden-cheese-board' },
      { label: 'Serving Trays',  slug: 'wooden-serving-tray' },
      { label: 'Kitchen & Dining', slug: 'wooden-kitchen-dining' },
    ],
    image: '/different%20wood/acacia%20wood.png',
  },
  {
    slug: 'walnut',
    name: 'Walnut Wood',
    tagline: 'Premium dark hardwood for high-end gifts and luxury packaging.',
    intro:
      'A premium hardwood with deep chocolate tones and elegant straight grain. The go-to material when the brand brief says "luxury" — watches, jewelry, premium gift sets and heirloom keepsake boxes.',
    advantages: [
      'Striking dark color, no staining required',
      'Very strong and durable',
      'Reads as high-end on a retail shelf',
      'Pairs beautifully with brass / leather accents',
    ],
    rating: { hardness: 5, cost: '$$$$', weight: 'Medium-heavy', appearance: 'Dark elegant', moisture: 'Good' },
    bestFor: ['Watch boxes', 'Jewelry boxes', 'Premium gift packaging', 'Keepsake / valet trays'],
    categories: [
      { label: 'Watch Boxes',   slug: 'wooden-watch-boxes' },
      { label: 'Jewelry Boxes', slug: 'wooden-jewelry-boxes' },
      { label: 'Gift & Retail Packaging', slug: 'gift-boxes-retail-packaging' },
      { label: 'Keepsake Boxes', slug: 'wooden-keepsake-boxes' },
    ],
    image: '/different%20wood/walnut%20wood.png',
  },
  {
    slug: 'bamboo',
    name: 'Bamboo',
    tagline: 'Eco-friendly, fast-growing, light-toned and cost-efficient.',
    intro:
      'Technically a grass, but used as a wood. Pale, smooth, sustainable — bamboo is the choice for eco-conscious brands and Amazon sellers selling kitchen storage and organizers.',
    advantages: [
      'Sustainable & fast-growing (3–5 year cycle)',
      'Stable and warp-resistant',
      'Smooth, even surface — minimal sanding',
      'Cost-effective at scale',
    ],
    rating: { hardness: 3, cost: '$$', weight: 'Light', appearance: 'Pale, clean', moisture: 'Moderate' },
    bestFor: ['Pantry organizers', 'Cutlery trays', 'Kitchen storage', 'Drawer dividers'],
    categories: [
      { label: 'Pantry Organizers', slug: 'wooden-pantry-organizers' },
      { label: 'Cutlery Organizer', slug: 'wooden-cutlery-organizer' },
      { label: 'Drawer Organizer',  slug: 'wooden-drawer-organizer' },
      { label: 'Kitchen & Dining',  slug: 'wooden-kitchen-dining' },
    ],
    image: '/different%20wood/bamboo.png',
  },
  {
    slug: 'pine',
    name: 'Pine Wood',
    tagline: 'Lightweight, affordable softwood — workhorse for volume orders.',
    intro:
      'A pale, lightweight softwood that takes paint and stain beautifully. Best for budget-friendly storage boxes, larger organizers and pieces where weight (and shipping cost) matter.',
    advantages: [
      'Cost-effective for large pieces',
      'Easy to machine, shape and assemble',
      'Accepts paint, stain or natural finish',
      'Good for printed branding',
    ],
    rating: { hardness: 2, cost: '$', weight: 'Light', appearance: 'Pale, knotted', moisture: 'Fair' },
    bestFor: ['Storage boxes', 'Large gift packaging', 'Garden boxes', 'Painted items'],
    categories: [
      { label: 'Storage Boxes',     slug: 'wooden-storage-box-with-lid' },
      { label: 'Gift Boxes',        slug: 'wooden-gift-box' },
      { label: 'Pet Products',      slug: 'pet-products' },
      { label: 'Storage & Home Organization', slug: 'storage-home-organization' },
    ],
    image: '/different%20wood/pine%20wood.png',
  },
  {
    slug: 'paulownia',
    name: 'Paulownia Wood',
    tagline: 'Ultra-lightweight option for big boxes that ship cheap.',
    intro:
      'One of the lightest commercial timbers available. Paulownia is the secret weapon for brands shipping large wooden boxes — wine cases, gift packaging, decorative storage — where every kilo of freight cost counts.',
    advantages: [
      'Extremely lightweight (cuts shipping cost)',
      'Stable, low warping',
      'Great for bulk production',
      'Takes finishes well',
    ],
    rating: { hardness: 1, cost: '$', weight: 'Very light', appearance: 'Pale, soft grain', moisture: 'Fair' },
    bestFor: ['Wine boxes', 'Large gift boxes', 'Decorative storage', 'Tea boxes'],
    categories: [
      { label: 'Wine Boxes',  slug: 'wooden-wine-box' },
      { label: 'Tea Boxes',   slug: 'wooden-tea-box' },
      { label: 'Gift Boxes',  slug: 'wooden-gift-box' },
      { label: 'Coffee Boxes', slug: 'wooden-coffee-box' },
    ],
    image: '/different%20wood/paulownia%20wood.png',
  },
  {
    slug: 'oak',
    name: 'Oak Wood',
    tagline: 'Classic premium hardwood — built for the long haul.',
    intro:
      'A long-favored European hardwood, prized for its open, classic grain and outstanding durability. Used where the product needs to last decades — premium boards, furniture-grade organizers and statement gifts.',
    advantages: [
      'Excellent durability — generational',
      'Distinctive open grain',
      'Holds finishes very well',
      'Reads as classic & high-end',
    ],
    rating: { hardness: 4, cost: '$$$', weight: 'Medium-heavy', appearance: 'Classic open grain', moisture: 'Good' },
    bestFor: ['Premium serving trays', 'Cutting boards', 'Furniture-style organizers', 'Heritage gifts'],
    categories: [
      { label: 'Serving Trays',     slug: 'wooden-serving-tray' },
      { label: 'Cutting Boards',    slug: 'wooden-cutting-board' },
      { label: 'Countertop Organizers', slug: 'wooden-countertop-organizers' },
    ],
    image: '/different%20wood/oak%20wood.png',
  },
  {
    slug: 'beech',
    name: 'Beech Wood',
    tagline: 'Smooth, even-grained hardwood — the minimalist\'s choice.',
    intro:
      'A pale European hardwood with a fine, uniform grain. Works beautifully for clean, minimal product designs — Scandinavian-inspired kitchenware and household items where the wood should feel quiet, not loud.',
    advantages: [
      'Smooth, uniform surface',
      'Strong food-contact-safe hardwood',
      'Pale, clean appearance',
      'Stains evenly',
    ],
    rating: { hardness: 4, cost: '$$', weight: 'Medium', appearance: 'Pale, even grain', moisture: 'Moderate' },
    bestFor: ['Plates & boards', 'Minimalist kitchenware', 'Spatulas / utensils', 'Children\'s items'],
    categories: [
      { label: 'Cutting Boards',    slug: 'wooden-cutting-board' },
      { label: 'Cheese Boards',     slug: 'wooden-cheese-board' },
      { label: 'Kitchen & Dining',  slug: 'wooden-kitchen-dining' },
    ],
    image: '/different%20wood/beech%20wood.png',
  },
  {
    slug: 'rubber',
    name: 'Rubber Wood',
    tagline: 'Pale, sustainable hardwood reclaimed from rubber plantations.',
    intro:
      'After rubber trees stop producing latex, the timber is harvested instead of burned — making rubber wood one of the most sustainable hardwoods on the market. Pale, even and strong — perfect for everyday kitchenware and organizers.',
    advantages: [
      'Sustainable — reclaimed plantation wood',
      'Stable, low movement',
      'Light, even color — easy to brand',
      'Strong yet workable',
    ],
    rating: { hardness: 3, cost: '$$', weight: 'Medium', appearance: 'Pale, even', moisture: 'Moderate' },
    bestFor: ['Kitchenware', 'Home organizers', 'Branded promotional items', 'Pet products'],
    categories: [
      { label: 'Kitchen & Dining',  slug: 'wooden-kitchen-dining' },
      { label: 'Home Organization', slug: 'storage-home-organization' },
      { label: 'Branded Promo Gifts', slug: 'branded-wooden-promotional-gifts' },
    ],
    image: '/different%20wood/rubber%20wood.png',
  },
  {
    slug: 'teak',
    name: 'Teak Wood',
    tagline: 'Naturally water-resistant — premium pick for cutting boards.',
    intro:
      'Naturally rich in oils that repel water, teak resists warping and cracking better than almost any other timber. Premium choice for boards, trays and storage that may meet moisture or humidity.',
    advantages: [
      'Excellent moisture & humidity resistance',
      'Very high durability',
      'Beautiful warm golden-brown color',
      'Naturally rot-resistant',
    ],
    rating: { hardness: 5, cost: '$$$$', weight: 'Medium-heavy', appearance: 'Warm golden brown', moisture: 'Excellent' },
    bestFor: ['Premium cutting boards', 'Bathroom trays', 'Outdoor / spa pieces', 'Long-life kitchenware'],
    categories: [
      { label: 'Cutting Boards',    slug: 'wooden-cutting-board' },
      { label: 'Bathroom Trays',    slug: 'bathroom-vanity-trays' },
      { label: 'Hospitality',       slug: 'hospitality-commercial' },
    ],
    image: '/different%20wood/teak%20wood.png',
  },
  {
    slug: 'sapele',
    name: 'Sapele Wood',
    tagline: 'Reddish-brown hardwood — affordable mahogany alternative.',
    intro:
      'A tropical hardwood with a warm reddish tone, often used as a cost-effective stand-in for true mahogany. Strong, stable and visually striking — a great fit for plates, trays and decorative pieces.',
    advantages: [
      'Attractive reddish-brown color',
      'Good strength and stability',
      'More affordable than mahogany',
      'Polishes to a deep luster',
    ],
    rating: { hardness: 4, cost: '$$$', weight: 'Medium-heavy', appearance: 'Reddish brown', moisture: 'Good' },
    bestFor: ['Plates & trays', 'Decorative boxes', 'Premium-look organizers'],
    categories: [
      { label: 'Serving Trays', slug: 'wooden-serving-tray' },
      { label: 'Gift Packaging', slug: 'gift-boxes-retail-packaging' },
    ],
    image: '/different%20wood/sapele%20wood.png',
  },
  {
    slug: 'mdf',
    name: 'MDF',
    tagline: 'Engineered budget option for painted, printed, or laminated finishes.',
    intro:
      'Medium-density fiberboard. Not a solid wood — it\'s an engineered panel. Smooth, dimensionally stable and cheap. The choice when the design relies on paint, print, decals or laminate rather than visible grain.',
    advantages: [
      'Perfectly smooth — ideal for paint / print',
      'Consistent quality, no knots or splits',
      'Lower material cost',
      'Stable in size and shape',
    ],
    rating: { hardness: 2, cost: '$', weight: 'Medium', appearance: 'Painted / printed', moisture: 'Poor' },
    bestFor: ['Painted gift boxes', 'Photo frames', 'Promotional items', 'Decorative organizers'],
    categories: [
      { label: 'Gift Boxes',     slug: 'wooden-gift-box' },
      { label: 'Photo Frames',   slug: 'wooden-photo-frame' },
      { label: 'Branded Promo Gifts', slug: 'branded-wooden-promotional-gifts' },
    ],
    image: '/different%20wood/mdf.png',
  },
  {
    slug: 'plywood',
    name: 'Plywood',
    tagline: 'Layered engineered wood — strong, stable, finish-flexible.',
    intro:
      'Multiple veneer layers cross-bonded for strength and stability. Plywood resists warping better than solid wood at the same thickness — a reliable engine for storage boxes and large organizers, often surfaced with a veneer for a wood look at a lower cost.',
    advantages: [
      'Very stable — resists warping',
      'Strong for its weight',
      'Surface can be veneered, laminated or wrapped',
      'Cost-effective for big pieces',
    ],
    rating: { hardness: 3, cost: '$', weight: 'Medium', appearance: 'Layered edge / veneered face', moisture: 'Moderate' },
    bestFor: ['Storage boxes', 'Drawer organizers', 'Large display pieces', 'Cabinet-style products'],
    categories: [
      { label: 'Storage Boxes',     slug: 'wooden-storage-box-with-lid' },
      { label: 'Drawer Organizer',  slug: 'wooden-drawer-organizer' },
      { label: 'Storage & Home Organization', slug: 'storage-home-organization' },
    ],
    image: '/different%20wood/plywood.png',
  },
];

// ───────────────────────────────────────────────────────────────────
// "Choose by use case" decision matrix
// ───────────────────────────────────────────────────────────────────
const USE_CASES = [
  {
    title: 'Premium gift packaging',
    body: 'Watch boxes, jewelry boxes, luxury gift sets — the wood IS the product.',
    recommend: ['walnut', 'oak', 'teak'],
    avoid: ['mdf', 'pine'],
  },
  {
    title: 'Cutting boards & food contact',
    body: 'Knives, juices, frequent washing — needs hardness + moisture resistance.',
    recommend: ['acacia', 'teak', 'beech', 'oak'],
    avoid: ['mdf', 'paulownia'],
  },
  {
    title: 'Big lightweight boxes',
    body: 'Wine cases, large gift packaging — every kilo of freight matters.',
    recommend: ['paulownia', 'pine'],
    avoid: ['walnut', 'oak'],
  },
  {
    title: 'Painted / printed designs',
    body: 'Brand color, custom artwork, promotional items.',
    recommend: ['mdf', 'pine', 'plywood'],
    avoid: ['walnut'],
  },
  {
    title: 'Sustainable / eco-conscious brands',
    body: 'FSC-aware brands, plant-based packaging audiences.',
    recommend: ['bamboo', 'rubber'],
    avoid: ['mdf'],
  },
  {
    title: 'High-volume Amazon FBA',
    body: 'Cost target driven, FBA dimension limits, bulk repeatability.',
    recommend: ['bamboo', 'pine', 'plywood'],
    avoid: ['teak', 'walnut'],
  },
];

const NAME_BY_SLUG = Object.fromEntries(MATERIALS.map((m) => [m.slug, m.name]));

// ───────────────────────────────────────────────────────────────────
// PAGE
// ───────────────────────────────────────────────────────────────────
export default function MaterialsGuide({ params: { locale } }) {
  unstable_setRequestLocale(locale);

  // Breadcrumb + Article JSON-LD for the guide
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.siteUrl}` },
      { '@type': 'ListItem', position: 2, name: 'Material Guide' },
    ],
  };
  const guideLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Wood Materials Guide for Custom Manufacturing',
    description: 'Compare 12 wood materials used for kitchenware, storage boxes and home organizers — hardness, cost, weight, moisture resistance and best-fit applications.',
    author: { '@id': `${SITE.siteUrl}/#organization` },
    publisher: { '@id': `${SITE.siteUrl}/#organization` },
    url: `${SITE.siteUrl}/material-guide`,
    inLanguage: 'en',
    mainEntityOfPage: `${SITE.siteUrl}/material-guide`,
  };

  return (
    <article className="bg-white">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={guideLd} />
      {/* Hero */}
      <header className="bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <nav className="text-xs text-brand-mute mb-4">
            <Link href="/" className="hover:text-brand-green">Home</Link>
            {' / '}
            <span className="text-brand-ink">Material Guide</span>
          </nav>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
            Wood Materials Guide
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-brand-ink leading-[1.1] max-w-3xl">
            Choose the right wood for{' '}
            <span className="text-brand-green">your product &amp; market</span>.
          </h1>
          <p className="mt-5 text-brand-mute leading-relaxed max-w-2xl">
            Written by our factory team based on real production experience. Compare 12 common
            woods used in kitchenware, storage, and packaging — with clear recommendations
            on what each material is good for.
          </p>

          {/* Quick nav chips */}
          <div className="mt-7 flex flex-wrap gap-2">
            {MATERIALS.map((m) => (
              <a
                key={m.slug}
                href={`#${m.slug}`}
                className="inline-flex items-center rounded-full border border-brand-line bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-ink hover:border-brand-green hover:text-brand-green transition"
              >
                {m.name}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Comparison-at-a-glance table */}
      <section className="py-16 lg:py-20 border-b border-brand-line">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            At a Glance
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-brand-ink mb-2 leading-tight">
            12 woods, side by side.
          </h2>
          <p className="text-brand-mute mb-8">
            Quick comparison of the materials we work with. Click any wood to jump to its full profile.
          </p>

          <div className="overflow-x-auto rounded-xl border border-brand-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-cream text-left text-[11px] uppercase tracking-wider text-brand-ink/80">
                  <th className="py-3 px-4 font-bold">Wood</th>
                  <th className="py-3 px-4 font-bold">Hardness</th>
                  <th className="py-3 px-4 font-bold">Weight</th>
                  <th className="py-3 px-4 font-bold">Cost</th>
                  <th className="py-3 px-4 font-bold">Moisture</th>
                  <th className="py-3 px-4 font-bold">Best For</th>
                </tr>
              </thead>
              <tbody>
                {MATERIALS.map((m, i) => (
                  <tr
                    key={m.slug}
                    className={`border-t border-brand-line ${i % 2 === 0 ? 'bg-white' : 'bg-brand-cream/30'}`}
                  >
                    <td className="py-3 px-4 font-bold text-brand-green">
                      <a href={`#${m.slug}`} className="hover:underline">{m.name}</a>
                    </td>
                    <td className="py-3 px-4">
                      <Stars n={m.rating.hardness} />
                    </td>
                    <td className="py-3 px-4 text-brand-mute">{m.rating.weight}</td>
                    <td className="py-3 px-4 font-bold text-brand-ink">{m.rating.cost}</td>
                    <td className="py-3 px-4 text-brand-mute">{m.rating.moisture}</td>
                    <td className="py-3 px-4 text-brand-mute text-xs">
                      {m.bestFor.slice(0, 2).join(' · ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Material profiles — alternating zigzag layout */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 space-y-20 lg:space-y-24">
          {MATERIALS.map((m, i) => (
            <MaterialBlock key={m.slug} material={m} flipped={i % 2 === 1} />
          ))}
        </div>
      </section>

      {/* Decision matrix */}
      <section className="bg-brand-cream py-20 lg:py-24 border-y border-brand-line">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              How to Choose
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
              Pick a wood{' '}
              <span className="text-brand-green">by your use case</span>.
            </h2>
            <p className="mt-4 text-brand-mute leading-relaxed">
              Same product type, different priorities — premium feel vs. shipping cost vs. brand
              palette. Here&apos;s how we usually recommend wood by the job at hand.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {USE_CASES.map((uc) => (
              <article key={uc.title} className="bg-white rounded-2xl border border-brand-line p-6 lg:p-7">
                <h3 className="text-lg font-extrabold text-brand-ink mb-2">
                  {uc.title}
                </h3>
                <p className="text-sm text-brand-mute leading-relaxed mb-5">
                  {uc.body}
                </p>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2">
                    <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full bg-brand-green text-white text-[10px] font-bold uppercase tracking-wider">
                      Pick
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {uc.recommend.map((slug) => (
                        <a
                          key={slug}
                          href={`#${slug}`}
                          className="text-xs font-semibold text-brand-ink hover:text-brand-green underline-offset-2 hover:underline"
                        >
                          {NAME_BY_SLUG[slug]}
                        </a>
                      )).reduce((acc, x, idx) => idx ? [...acc, <span key={idx} className="text-brand-mute text-xs">·</span>, x] : [x], [])}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full bg-stone-200 text-brand-ink/70 text-[10px] font-bold uppercase tracking-wider">
                      Skip
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {uc.avoid.map((slug, idx) => (
                        <span key={slug} className="flex items-center gap-1.5">
                          {idx > 0 && <span className="text-brand-mute text-xs">·</span>}
                          <a href={`#${slug}`} className="text-xs text-brand-mute hover:text-brand-ink line-through">
                            {NAME_BY_SLUG[slug]}
                          </a>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Janka Hardness Chart — visual data point */}
      <HardnessChart />

      {/* Finishes & Surface Treatments */}
      <FinishesSection />

      {/* Branding & Customization Methods */}
      <BrandingSection />

      {/* Sustainability & Compliance */}
      <ComplianceSection />

      {/* Care & Maintenance */}
      <CareSection />

      {/* Sourcing checklist */}
      <SourcingChecklist />

      {/* Material FAQ */}
      <MaterialFAQ />

      {/* Related articles from blog */}
      <RelatedArticles />

      {/* CTA */}
      <section className="py-20 lg:py-24">
        <div className="max-w-[900px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            Need Help Choosing?
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-ink mb-4 leading-tight">
            Still not sure which wood is right for your product?
          </h2>
          <p className="text-brand-mute leading-relaxed mb-8 max-w-2xl mx-auto">
            Send us your design, target price and target market. Our engineering team will
            recommend 1–2 wood options and produce material samples for free.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-brand-green px-8 py-3.5 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition"
            >
              Talk to Our Engineers
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-8 py-3.5 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

// ───────────────────────────────────────────────────────────────────
// MaterialBlock — full profile per wood
// ───────────────────────────────────────────────────────────────────
function MaterialBlock({ material: m, flipped }) {
  return (
    <article id={m.slug} className="scroll-mt-24">
      <div className={`grid lg:grid-cols-2 gap-10 lg:gap-14 items-center`}>
        {/* Image */}
        <div className={`${flipped ? 'lg:order-2' : ''}`}>
          <div className="relative aspect-[5/4] rounded-2xl overflow-hidden bg-brand-cream border border-brand-line">
            <Image
              src={m.image}
              alt={`${m.name} wood — material sample for kitchenware`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Text */}
        <div className={`${flipped ? 'lg:order-1' : ''}`}>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            {m.rating.cost} · {m.rating.weight}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-tight mb-3">
            {m.name}
          </h2>
          <p className="text-lg text-brand-ink/80 mb-5 leading-snug">
            {m.tagline}
          </p>
          <p className="text-brand-mute leading-relaxed mb-6">
            {m.intro}
          </p>

          {/* Ratings strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <Stat label="Hardness">
              <Stars n={m.rating.hardness} />
            </Stat>
            <Stat label="Cost">{m.rating.cost}</Stat>
            <Stat label="Weight">{m.rating.weight}</Stat>
            <Stat label="Moisture">{m.rating.moisture}</Stat>
          </div>

          {/* Advantages */}
          <h3 className="text-[12px] uppercase tracking-wider font-bold text-brand-green mb-2">
            Key Advantages
          </h3>
          <ul className="space-y-1.5 mb-6">
            {m.advantages.map((a) => (
              <li key={a} className="flex items-start gap-2 text-sm text-brand-ink/85">
                <CheckMark />
                <span>{a}</span>
              </li>
            ))}
          </ul>

          {/* Best-fit categories */}
          <h3 className="text-[12px] uppercase tracking-wider font-bold text-brand-green mb-2">
            Common Products
          </h3>
          <div className="flex flex-wrap gap-2">
            {m.categories.map((c) => (
              <Link
                key={c.slug}
                href={`/products/${c.slug}`}
                className="inline-flex items-center rounded-full border border-brand-line bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-ink hover:border-brand-green hover:bg-brand-green hover:text-white transition"
              >
                {c.label} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function Stat({ label, children }) {
  return (
    <div className="bg-brand-cream rounded-lg px-3 py-2.5 border border-brand-line">
      <div className="text-[10px] uppercase tracking-wider font-bold text-brand-mute mb-1">{label}</div>
      <div className="text-sm font-bold text-brand-ink">{children}</div>
    </div>
  );
}

function Stars({ n }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${n} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= n ? 'text-brand-green' : 'text-brand-line'}>★</span>
      ))}
    </span>
  );
}

function CheckMark() {
  return (
    <span className="shrink-0 inline-flex h-4 w-4 mt-0.5 items-center justify-center rounded-full bg-brand-green text-white">
      <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 8.5l3 3 6-6" />
      </svg>
    </span>
  );
}

// ───────────────────────────────────────────────────────────────────
// Janka Hardness Chart — visual horizontal bar chart, real lbf values.
// Data from public Janka hardness references; bamboo & MDF/plywood are
// approximate as they're engineered.
// ───────────────────────────────────────────────────────────────────
const JANKA = [
  { name: 'Acacia',    lbf: 2200, note: 'Hardest in our range' },
  { name: 'Sapele',    lbf: 1410 },
  { name: 'Bamboo',    lbf: 1380, note: 'Carbonized solid' },
  { name: 'Oak',       lbf: 1360, note: 'White oak' },
  { name: 'Beech',     lbf: 1300 },
  { name: 'Teak',      lbf: 1155 },
  { name: 'Walnut',    lbf: 1010, note: 'Black walnut' },
  { name: 'Rubber',    lbf: 960 },
  { name: 'Pine',      lbf: 870, note: 'Yellow pine' },
  { name: 'Plywood',   lbf: 700, note: 'Engineered' },
  { name: 'MDF',       lbf: 700, note: 'Engineered' },
  { name: 'Paulownia', lbf: 300, note: 'Lightest' },
];

function HardnessChart() {
  const max = Math.max(...JANKA.map((w) => w.lbf));
  return (
    <section className="bg-white py-20 lg:py-24 border-b border-brand-line">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            Janka Hardness
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
            How hard is each wood,{' '}
            <span className="text-brand-green">measured in pounds-force?</span>
          </h2>
          <p className="mt-4 text-brand-mute leading-relaxed">
            Janka hardness measures how much force it takes to embed a small steel ball
            half-way into the wood. Higher numbers = better resistance to dents, scratches
            and cutting-board cuts. Anything above ~1,000 lbf is generally suitable for
            heavy-use kitchenware.
          </p>
        </div>

        <div className="space-y-3 lg:space-y-4">
          {JANKA.map((w) => (
            <div key={w.name} className="grid grid-cols-[100px_1fr_auto] items-center gap-4">
              <div className="text-sm font-bold text-brand-ink text-right">
                {w.name}
              </div>
              <div className="relative h-7 bg-brand-cream rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-green to-brand-greenLight rounded-full"
                  style={{ width: `${(w.lbf / max) * 100}%` }}
                />
              </div>
              <div className="text-right">
                <div className="text-sm font-extrabold text-brand-ink tabular-nums">{w.lbf.toLocaleString()} lbf</div>
                {w.note && <div className="text-[11px] text-brand-mute">{w.note}</div>}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-brand-mute italic text-center">
          Indicative reference values — actual results vary by species sub-variety,
          growing region, and finishing process.
        </p>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
// Finishes & Surface Treatments
// ───────────────────────────────────────────────────────────────────
const FINISHES = [
  { name: 'Food-Safe Lacquer', body: 'Clear protective coat that meets food-contact safety standards. Most common finish for kitchenware.', tag: 'Food-safe' },
  { name: 'Mineral Oil',       body: 'Natural, food-safe finish that nourishes the wood. Needs periodic re-application.', tag: 'Natural' },
  { name: 'Beeswax Blend',     body: 'Soft luster, hand-feel finish that protects against moisture without chemicals.', tag: 'Eco' },
  { name: 'Polyurethane',      body: 'Hard-wearing glossy or matte coat. Great for decorative pieces — not for cutting boards.', tag: 'Durable' },
  { name: 'Color Stain',       body: 'Tinted finish that lets the natural grain show through. Custom colors on request.', tag: 'Custom' },
  { name: 'Solid Paint',       body: 'Full opaque color. Works best on MDF, pine, paulownia and plywood. Print-ready surface.', tag: 'Custom' },
  { name: 'Natural / Raw',     body: 'Sanded only, no finish — the wood will patina with use. Lowest cost.', tag: 'Minimal' },
];

function FinishesSection() {
  return (
    <section className="bg-brand-cream py-20 lg:py-24 border-b border-brand-line">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            Finishes &amp; Surface Treatments
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
            7 finish options,{' '}
            <span className="text-brand-green">one for every market</span>.
          </h2>
          <p className="mt-4 text-brand-mute leading-relaxed">
            The wood is half the story — the finish decides how the product feels, how it
            ages, and which compliance standards it meets. Here&apos;s what we offer.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FINISHES.map((f) => (
            <article key={f.name} className="bg-white rounded-2xl border border-brand-line p-6 hover:border-brand-green/40 hover:shadow-sm transition">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-base font-extrabold text-brand-ink leading-snug">{f.name}</h3>
                <span className="shrink-0 inline-flex items-center rounded-full bg-brand-cream text-brand-green border border-brand-green/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  {f.tag}
                </span>
              </div>
              <p className="text-sm text-brand-mute leading-relaxed">{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
// Branding & Customization Methods
// ───────────────────────────────────────────────────────────────────
const BRANDING = [
  { name: 'Laser Engraving', body: 'Burned-in mark, dark on light wood, virtually permanent. Best for logos, model numbers, batch IDs.', icon: 'spark' },
  { name: 'Hot Foil Stamping', body: 'Metallic gold, silver, copper or color foil pressed into the wood with heat. Premium retail look.', icon: 'foil' },
  { name: 'Debossing',         body: 'Pressed indent without ink — subtle, classy, ages well. Reads as luxury.', icon: 'press' },
  { name: 'Screen Print',      body: '1–6 spot colors on flat surfaces. Cost-effective for medium runs and bold logos.', icon: 'print' },
  { name: 'UV Print',          body: 'Full CMYK photo-quality print, including white. Photo, gradient and pattern artwork.', icon: 'cmyk' },
  { name: 'Pad Print',         body: 'Transfers logo onto curved or uneven surfaces — bowls, handles, lid edges.', icon: 'pad' },
  { name: 'Custom Inserts',    body: 'CNC-cut foam, velvet wrap, microfiber lining or molded pulp inserts inside the box.', icon: 'insert' },
];

function BrandingSection() {
  return (
    <section className="bg-white py-20 lg:py-24 border-b border-brand-line">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            Branding &amp; Customization
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
            Make it{' '}
            <span className="text-brand-green">unmistakably yours</span>.
          </h2>
          <p className="mt-4 text-brand-mute leading-relaxed">
            Every wooden product we ship can carry your brand in some form — from a discreet
            laser mark to a full-color UV print on every face. Pick the technique that fits
            your wood, your budget and your shelf positioning.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BRANDING.map((b) => (
            <article key={b.name} className="bg-brand-cream rounded-2xl border border-brand-line p-6 hover:border-brand-green/40 hover:shadow-sm transition">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-green border border-brand-green/15 mb-4">
                <BrandIcon name={b.icon} />
              </div>
              <h3 className="text-base font-extrabold text-brand-ink mb-2 leading-snug">{b.name}</h3>
              <p className="text-sm text-brand-mute leading-relaxed">{b.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandIcon({ name }) {
  const c = 'w-5 h-5';
  switch (name) {
    case 'spark':  return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M5 19l4-4M15 9l4-4"/></svg>;
    case 'foil':   return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 9h6v6H9z" fill="currentColor" opacity="0.3"/></svg>;
    case 'press':  return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 12h6"/></svg>;
    case 'print':  return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6z"/></svg>;
    case 'cmyk':   return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="9" r="5"/><circle cx="15" cy="9" r="5"/><circle cx="12" cy="15" r="5"/></svg>;
    case 'pad':    return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12c4-6 16-6 20 0"/><path d="M2 12c4 6 16 6 20 0"/><circle cx="12" cy="12" r="2"/></svg>;
    case 'insert': return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="14" rx="1"/><path d="M3 10h18M9 6V3M15 6V3"/></svg>;
    default: return null;
  }
}

// ───────────────────────────────────────────────────────────────────
// Sustainability & Compliance
// ───────────────────────────────────────────────────────────────────
const CERTS = [
  { tag: 'FSC',          full: 'Forest Stewardship Council', body: 'Sustainably-sourced wood from certified forests. Required by many EU retailers and brands aiming at FSC consumers.' },
  { tag: 'EU REACH',     full: 'EU Regulation 1907/2006',   body: 'Restricts hazardous substances in finishes, glues and coatings. Required for products imported into the European Union.' },
  { tag: 'CARB P2',      full: 'California Air Resources Board (also TSCA Title VI in the US)', body: 'Caps formaldehyde emissions in MDF, plywood and particleboard. Mandatory for the US market.' },
  { tag: 'LFGB / FDA',   full: 'Food contact safety',       body: 'Independent testing that confirms finishes are safe for direct food contact — required for cutting boards, plates, utensils.' },
  { tag: 'ISO 9001',     full: 'Quality management',        body: 'Our factory operates under ISO 9001 quality processes — written procedures for sampling, production and outgoing QC.' },
  { tag: 'Sedex SMETA',  full: 'Ethical sourcing audit',    body: 'Available on request — covers labor, health & safety, environment and business ethics. Required by major retailers.' },
];

function ComplianceSection() {
  return (
    <section className="bg-brand-cream py-20 lg:py-24 border-b border-brand-line">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            Sustainability &amp; Compliance
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
            Certifications that{' '}
            <span className="text-brand-green">unlock retail channels</span>.
          </h2>
          <p className="mt-4 text-brand-mute leading-relaxed">
            The wood you choose plus the supplier you choose decides which certifications you
            can claim. Here are the documents we can supply on request — typically issued
            per-order with the shipment.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTS.map((c) => (
            <article key={c.tag} className="bg-white rounded-2xl border border-brand-line p-6 hover:border-brand-green/40 hover:shadow-sm transition">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/30 text-[11px] font-extrabold tracking-wider mb-3">
                {c.tag}
              </div>
              <h3 className="text-sm font-bold text-brand-ink mb-2">{c.full}</h3>
              <p className="text-sm text-brand-mute leading-relaxed">{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
// Care & Maintenance
// ───────────────────────────────────────────────────────────────────
const CARE = [
  { title: 'Hand wash, never dishwasher', body: 'Dishwashers wreck wooden items — the heat, detergent and prolonged moisture cause warping and cracking. Wash with mild soap and a soft sponge.' },
  { title: 'Dry immediately, never soak',  body: 'Don\'t leave wooden boards or trays sitting in water. Towel-dry right after washing and air-dry standing on edge.' },
  { title: 'Re-oil cutting boards monthly', body: 'Apply food-grade mineral oil or a board butter monthly (more often with heavy use). Wipe on, let sit 15 min, buff off the excess.' },
  { title: 'Avoid direct sun & heat',       body: 'UV light fades wood color, dry heat causes splits. Keep wooden products away from windows and heaters.' },
  { title: 'Stabilize moisture',            body: 'Sudden humidity changes cause warping. We pre-condition wood to ~8–12% moisture for export — your end-customers should avoid extreme climate swings.' },
  { title: 'Sand & re-finish if dull',      body: 'Wooden surfaces can be refreshed at home — light sand with 220-grit and re-oil. Brings back the original look.' },
];

function CareSection() {
  return (
    <section className="bg-white py-20 lg:py-24 border-b border-brand-line">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            Care &amp; Maintenance
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
            How to make wooden products{' '}
            <span className="text-brand-green">last for years</span>.
          </h2>
          <p className="mt-4 text-brand-mute leading-relaxed">
            Use this on your hangtags, packaging inserts and product pages. Educated end-customers
            return fewer products and leave better reviews.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CARE.map((c, i) => (
            <article key={c.title} className="bg-brand-cream rounded-2xl border border-brand-line p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-white text-xs font-extrabold tabular-nums">
                  {i + 1}
                </span>
                <h3 className="text-base font-bold text-brand-ink leading-snug">{c.title}</h3>
              </div>
              <p className="text-sm text-brand-mute leading-relaxed">{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
// Sourcing Checklist
// ───────────────────────────────────────────────────────────────────
const CHECKLIST = [
  'What is the wood species\' Latin name? (E.g. "Acacia mangium" — beware of generic terms like "hardwood")',
  'Is this a real factory or a trading agent? Can you visit the factory or get a virtual tour?',
  'Where is the wood actually sourced from? Plantation? Forest? Country of origin?',
  'What\'s the moisture content target before assembly? (8–12% is typical for export.)',
  'Do you provide third-party QC reports — material, dimensional, drop-test?',
  'Can you supply FSC, REACH, CARB P2 documents on this order?',
  'What food-safe testing is available — LFGB, FDA migration test, BPA-free?',
  'How is the wood pre-treated against insects? (Heat, kiln, fumigation?)',
  'What\'s the standard finish, and what custom finishes do you support?',
  'What\'s the typical lead time for samples vs bulk production?',
  'What happens if I find defects after delivery — your QC policy and warranty?',
];

function SourcingChecklist() {
  return (
    <section className="bg-brand-cream py-20 lg:py-24 border-b border-brand-line">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              Buyer&apos;s Checklist
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.1]">
              11 questions to ask{' '}
              <span className="text-brand-green">your wood supplier</span>.
            </h2>
            <p className="mt-5 text-brand-mute leading-relaxed">
              Save this list. Send it to any factory you&apos;re evaluating — including us.
              The answers separate real manufacturers from middlemen.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition"
              >
                Ask Us These Questions →
              </Link>
            </div>
          </div>
          <ol className="space-y-3">
            {CHECKLIST.map((q, i) => (
              <li key={i} className="flex gap-4 bg-white rounded-xl border border-brand-line p-5 hover:border-brand-green/40 transition">
                <span className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-cream text-brand-green text-xs font-extrabold tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm text-brand-ink/90 leading-relaxed">{q}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
// Material FAQ
// ───────────────────────────────────────────────────────────────────
const MFAQ = [
  { q: 'What\'s the difference between hardwood and softwood — and which should I pick?',
    a: 'Hardwood comes from broad-leaved trees (acacia, walnut, oak, beech, teak, sapele, rubber, paulownia). Softwood comes from coniferous trees (pine). Hardwoods generally last longer and look more premium, but cost more and are heavier. For cutting boards, jewelry boxes and high-end gifts: hardwood. For large painted boxes, budget storage and shipping-cost-sensitive items: pine or paulownia.' },
  { q: 'How do you ensure your wooden kitchenware is food-safe?',
    a: 'Three layers: the wood itself is sanded and pre-treated with no toxic glues; the finish is a food-grade lacquer, mineral oil or beeswax that meets FDA / LFGB migration limits; and we issue a third-party food-contact safety report per order. For cutting boards we avoid varnishes — those crack with knife use and trap bacteria.' },
  { q: 'Which wood is best for a heavy-use chef\'s cutting board?',
    a: 'Hardwoods that score 1,200+ on Janka — acacia, beech, and teak are the standard picks. Acacia has the best grain look at a reasonable price. Teak is the most water-resistant. End-grain construction adds another step up in knife-friendliness.' },
  { q: 'Will the wood warp or crack during international shipping?',
    a: 'Properly pre-conditioned wood at 8–12% moisture content, sealed with a stable finish and packed with desiccant in vacuum-sealed master cartons travels reliably. We pre-condition all wood before assembly and document moisture content per batch.' },
  { q: 'Can I get FSC-certified wood — and does it cost more?',
    a: 'Yes for acacia, oak, beech, walnut, sapele and bamboo. FSC-certified material adds roughly 8–15% to the wood cost (not the total product cost) and requires us to issue a Chain-of-Custody certificate per order. Lead time may be slightly longer.' },
  { q: 'What moisture content should I specify in my purchase order?',
    a: 'For export to North America and Western Europe: 8–10%. For humid markets (Southeast Asia, coastal Australia): 10–12%. For very dry destinations (Arizona, Middle East), inform us early — we\'ll dry the wood lower and add a desiccant pack.' },
  { q: 'When should I use solid wood vs. plywood / MDF?',
    a: 'Solid wood when the wood IS part of the appeal — kitchenware, gift packaging, premium products. Plywood when you need a stable, large flat surface (storage box panels) at lower cost. MDF when the design relies on paint, print or laminate rather than visible grain.' },
  { q: 'How does grain direction affect product strength?',
    a: 'Wood is much stronger along its grain than across it. For cutting boards, "edge-grain" boards have good knife feel; "end-grain" boards are knife-friendliest and most premium-looking. We adjust grain orientation in the CAD stage of every custom project.' },
];

function MaterialFAQ() {
  return (
    <section className="bg-white py-20 lg:py-24 border-b border-brand-line">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            Material FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
            Wood material questions,{' '}
            <span className="text-brand-green">answered honestly</span>.
          </h2>
        </div>
        <div className="space-y-3">
          {MFAQ.map((it, i) => (
            <details key={i} className="group rounded-2xl border border-brand-line bg-white overflow-hidden open:border-brand-green/40 open:bg-brand-cream/50">
              <summary className="cursor-pointer list-none flex items-start gap-4 p-5 lg:p-6 hover:bg-brand-cream/40 transition">
                <span className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-cream text-brand-green text-xs font-extrabold tabular-nums group-open:bg-brand-green group-open:text-white transition">
                  Q{i + 1}
                </span>
                <span className="flex-1 text-base lg:text-[17px] font-bold text-brand-ink leading-snug pt-1.5">
                  {it.q}
                </span>
                <span className="shrink-0 mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-line text-brand-mute group-open:border-brand-green group-open:bg-brand-green group-open:text-white group-open:rotate-180 transition">
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l5 5 5-5" />
                  </svg>
                </span>
              </summary>
              <div className="px-5 lg:px-6 pb-6 pl-[68px] lg:pl-[80px] text-sm lg:text-[15px] text-brand-mute leading-relaxed">
                {it.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
// Related Articles
// ───────────────────────────────────────────────────────────────────
function RelatedArticles() {
  const KEYWORDS = ['wood', 'material', 'fsc', 'spec', 'finish', 'oem', 'sourcing', 'manufactur'];
  const related = wpPosts()
    .filter((p) => {
      const text = (p.title + ' ' + (p.excerpt || '')).toLowerCase();
      return KEYWORDS.some((k) => text.includes(k));
    })
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="bg-brand-cream py-20 lg:py-24 border-b border-brand-line">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            Read More
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
            Related{' '}
            <span className="text-brand-green">sourcing &amp; manufacturing guides</span>.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {related.map((p) => (
            <Link
              key={p.id}
              href={`/blog/${p.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-brand-line hover:shadow-lg transition flex flex-col"
            >
              {p.featured_image && (
                <div className="relative aspect-[16/10] bg-brand-cream overflow-hidden">
                  <Image
                    src={p.featured_image}
                    alt={p.title || 'Related article'}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-[11px] uppercase tracking-wider text-brand-mute mb-2">
                  {new Date(p.date).toLocaleDateString('en-US', {year:'numeric', month:'short', day:'numeric'})}
                </p>
                <h3
                  className="font-bold text-brand-ink group-hover:text-brand-green transition leading-snug line-clamp-3"
                  dangerouslySetInnerHTML={{__html: p.title}}
                />
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand-green group-hover:text-brand-greenDark">
                  Read article →
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition"
          >
            All Articles →
          </Link>
        </div>
      </div>
    </section>
  );
}