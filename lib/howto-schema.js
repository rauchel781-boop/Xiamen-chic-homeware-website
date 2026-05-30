// Generates a HowTo JSON-LD block for sourcing-guide style blog posts.
//
// Google retired the "step card" visual rich result for HowTo in late 2023
// (except cooking recipes), but the structured data is still parsed by:
//   - Google's entity / Knowledge Panel pipeline
//   - AI Overviews / SGE answer generation
//   - Bing search step display
// So emitting it remains a low-risk, low-effort upgrade — there's no cost
// to including it and it lifts the article's signal in Google's understanding
// of "this is a how-to-do-X article" rather than just an informational post.
//
// The 3 sourcing guides currently in the catalog (bath caddy, spice rack,
// cheese board) all share the same 9-step factory workflow, so we centralise
// the step template here. The article's title and product type vary; the
// per-step instructions don't.
//
// Triggered automatically for any blog post whose tags include 'sourcing-guide'.

import { SITE } from '@/data/site-config';
import { stripHtml } from './wp-data';

// Standard 12-week China sourcing workflow. Step `name` is short (used as
// the headline in step-card UIs); `text` is the detailed instruction.
function sourcingSteps(productType, postUrl) {
  return [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Send a spec brief to the factory',
      text: `Write a one-page spec brief covering ${productType} dimensions (±2 mm tolerance), material grade, finish type, customisation (logo placement, stain colour, packaging), MOQ band, and target FOB. A well-written brief returns a quote in 24-48 hours; a vague brief returns a thin number you can't use.`,
      url: `${postUrl}#picking-the-right-wood`,
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Compare quotes and pay the sample fee',
      text: `Request quotes from 3-5 vetted factories. Compare unit cost at the 500 / 2,000 / 5,000-unit tiers — a real factory will share the curve, a re-seller picks one number and stays there. Pay the sample fee ($40-$120) at the supplier you intend to work with.`,
      url: `${postUrl}#moq-and-price-tiers-in-2026`,
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Receive and approve the custom sample',
      text: `The sample arrives by air courier in 7-14 working days depending on customisation. Inspect against a written acceptance form covering dimension tolerances, finish reference (PMS / Munsell code), hardware quality, and a "do-not-ship-if" clause for known defects.`,
      url: `${postUrl}#the-12-week-sourcing-timeline`,
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Wire the 30% deposit',
      text: 'Industry standard is 30% deposit by T/T (bank transfer) to start mass production, 70% balance before the bill of lading is released. Refuse any supplier demanding 100% upfront — it indicates either a scam or a factory with no working capital.',
      url: `${postUrl}#vetting-a-supplier-seven-red-flags`,
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Mass production runs (3-4 weeks)',
      text: `For a 5,000-unit ${productType} order, plan on 3-4 weeks of mass production. Request weekly progress photos and, if possible, a mid-production line inspection from SGS, BV, or QIMA.`,
      url: `${postUrl}#the-12-week-sourcing-timeline`,
    },
    {
      '@type': 'HowToStep',
      position: 6,
      name: 'Pre-shipment QC at AQL 2.5',
      text: 'Book a third-party inspection (SGS / BV / QIMA) once 80% of the run is finished and packaged. AQL 2.5 is the industry standard for general merchandise. Inspectors verify dimensions, finish quality, packaging integrity, and the agreed "do-not-ship-if" defect clauses.',
      url: `${postUrl}#vetting-a-supplier-seven-red-flags`,
    },
    {
      '@type': 'HowToStep',
      position: 7,
      name: 'Wire the 70% balance and release the bill of lading',
      text: 'Once pre-shipment QC passes, wire the 70% balance. The supplier releases the bill of lading, which the freight forwarder needs before the container can clear origin port.',
      url: `${postUrl}#logistics-incoterms-and-container-math`,
    },
    {
      '@type': 'HowToStep',
      position: 8,
      name: 'Sea freight to destination port',
      text: 'Sea transit from Xiamen runs 18-24 days to US West Coast, 28-34 days to US East Coast, 32-40 days to EU North ports. FOB Xiamen is the cleanest base Incoterm; DDP is operationally simpler for first-time importers but adds 15-20% to landed cost.',
      url: `${postUrl}#logistics-incoterms-and-container-math`,
    },
    {
      '@type': 'HowToStep',
      position: 9,
      name: 'Customs clearance + last-mile to your 3PL',
      text: `Verify the HS code with your customs broker (commonly 4419.12 or 4419.19 for wooden kitchenware). Add ~$1,200 for customs brokerage, drayage and last-mile palletisation in landed-cost planning.`,
      url: `${postUrl}#logistics-incoterms-and-container-math`,
    },
  ];
}

// Build the full HowTo JSON-LD for a sourcing-guide post.
// `post` is a wp-data post object; `locale` is used for the `inLanguage`.
export function buildSourcingHowTo(post, locale = 'en') {
  if (!post || !post.tags) return null;
  const tagSlugs = (post.tags || []).map((t) => t.slug || t.toLowerCase?.());
  if (!tagSlugs.includes('sourcing-guide')) return null;

  // Require a specific product-type tag to opt in to this HowTo template.
  // Older sourcing-guide posts (e.g. quality-focused or vendor articles)
  // don't follow the same 9-step factory workflow, so we narrow the trigger
  // to articles that have both `sourcing-guide` AND a product-specific tag.
  const productTagMap = {
    'bath-caddy':    'wooden bath caddy',
    'spice-rack':    'wooden spice rack',
    'cheese-board':  'wooden cheese board',
    'charcuterie':   'wooden cheese board',
    'cutting-board': 'wooden cutting board',
    'serving-tray':  'wooden serving tray',
  };
  let productType = null;
  for (const t of tagSlugs) {
    if (productTagMap[t]) { productType = productTagMap[t]; break; }
  }
  if (!productType) return null;

  const postUrl = `${SITE.siteUrl}/blog/${post.slug}`;
  const name = stripHtml(post.title);
  const description = stripHtml(post.excerpt || '').slice(0, 280);

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    image: post.featured_image
      ? (post.featured_image.startsWith('http')
          ? post.featured_image
          : `${SITE.siteUrl}${post.featured_image}`)
      : undefined,
    // ISO 8601 duration — 12 weeks max in our timeline
    totalTime: 'P12W',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      // Cost of a typical 5,000-unit PO + sample fee; honest range, not a single
      // figure (HowTo schema accepts a single value, so we use the mid-point).
      value: '30000',
    },
    tool: [
      { '@type': 'HowToTool', name: 'A one-page written spec sheet' },
      { '@type': 'HowToTool', name: 'A list of 3-5 vetted Chinese factories' },
      { '@type': 'HowToTool', name: 'A third-party inspector (SGS / BV / QIMA)' },
      { '@type': 'HowToTool', name: 'A licensed customs broker at the destination port' },
    ],
    supply: [
      { '@type': 'HowToSupply', name: '$40-$120 sample fee (credited back on first order)' },
      { '@type': 'HowToSupply', name: '30% deposit on the production PO' },
      { '@type': 'HowToSupply', name: '70% balance before BL release' },
      { '@type': 'HowToSupply', name: 'Sea freight quote (FOB Xiamen → destination port)' },
    ],
    step: sourcingSteps(productType, postUrl),
    inLanguage: locale,
    mainEntityOfPage: postUrl,
  };
}
