// Catch-all for WP page slugs that should live at the root.
// For our 5 high-SEO landing pages we render through WpRichLanding which
// auto-classifies the WP HTML into typed sections (gallery / feature grid /
// process steps / FAQ / image+text) and renders each with a brand-consistent
// React component instead of dumping raw Elementor markup.
//
// IMPORTANT: this route is a sibling of the static routes (about, products,
// blog, contact, material-guide). Next.js prefers static over dynamic, so this
// only matches slugs that don't conflict with those.

import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound, redirect } from 'next/navigation';
import WpRichLanding from '@/components/WpRichLanding';
import { wpPageBySlug, wpPages, stripHtml } from '@/lib/wp-data';
import { classifyWpPage } from '@/lib/wp-classify-page';

// Slugs that have their own dedicated routes in app/[locale]/<slug>/
// Don't generate them here, and redirect requests to the canonical short URL.
const ALIAS_REDIRECTS = {
  'wooden-products-factory-in-china': '/about',
  'complete-guide-wood-materials-for-kitchenware': '/material-guide',
  'blog-wooden-homeware-sourcing-blog': '/blog',
};

const RESERVED = new Set([
  'home', 'products', 'blog', 'contact', 'about',
  'material-guide', 'capabilities', 'wood-fabrication',
  'thank-you', 'cart',
]);

// Hand-tuned hero copy per WP slug.
const HERO_COPY = {
  'custom-wooden-boxes': {
    kicker: 'Custom Wooden Boxes',
    lead:
      'Factory-direct OEM wooden boxes for brands, retailers, and Amazon sellers — low MOQ, premium wood options, full branding and global shipping.',
  },
  'wooden-sofa-tray-manufacturer': {
    kicker: 'Wooden Sofa Tray',
    lead:
      'Direct manufacturer of wooden sofa trays in bamboo, acacia and pine — OEM, private label, low MOQ for US & EU buyers.',
  },
  'custom-wooden-storage-boxes-wholesale': {
    kicker: 'Wholesale Storage Boxes',
    lead:
      'OEM wooden storage box manufacturer in China — custom sizes, materials, lids, inserts, branding and export packaging for B2B buyers.',
  },
  'custom-wooden-spice-rack': {
    kicker: 'Custom Spice Racks',
    lead:
      'Wholesale & OEM wooden spice rack manufacturer — wall-mounted, countertop, drawer and tiered styles with matching glass jars and full branding support.',
  },
  'wooden-box-factory-in-china': {
    kicker: 'Factory in China',
    lead:
      'OEM wooden box factory based in Xiamen — direct manufacturing for gift, retail and storage packaging programs, with stable QC and full export support.',
  },
};

export function generateStaticParams() {
  return wpPages()
    .filter(p => !RESERVED.has(p.slug) && !ALIAS_REDIRECTS[p.slug])
    .filter(p => p.content && p.content.length > 50)
    .map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = wpPageBySlug(params.slug);
  if (!p) return {};
  return {
    title: p.meta_title || stripHtml(p.title),
    description: p.meta_desc || stripHtml(p.excerpt || p.content).slice(0, 160),
    alternates: { canonical: `/${params.slug}` },
  };
}

export default function WpPageRoute({ params }) {
  unstable_setRequestLocale(params.locale);

  // Aliases — 301 to the canonical short URL
  if (ALIAS_REDIRECTS[params.slug]) {
    redirect(ALIAS_REDIRECTS[params.slug]);
  }

  const data = classifyWpPage(params.slug);
  if (!data) notFound();

  const heroCopy = HERO_COPY[params.slug] || {};
  const p = wpPageBySlug(params.slug);
  const title = data.h1 || data.metaTitle || stripHtml(p.title);
  const lead = heroCopy.lead || data.metaDesc;

  return (
    <WpRichLanding
      title={title}
      kicker={heroCopy.kicker}
      lead={lead}
      intro={data.intro}
      sections={data.sections}
    />
  );
}
