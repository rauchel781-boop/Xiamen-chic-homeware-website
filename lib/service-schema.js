// Service JSON-LD generator for SEO landing pages.
//
// Why a separate helper:
//   The 8 hand-coded landing pages (custom-wooden-spice-rack, wooden-box-factory-in-china,
//   etc.) each describe a specific OEM/ODM manufacturing service. Adding inline
//   Service schema to all of them would duplicate ~40 lines × 8 pages = 320 LOC.
//   This helper keeps it to 1 line per page.
//
// What `Service` schema does for SEO:
//   - Helps Google understand the page sells a SERVICE (not just a product)
//   - Lets the Organization (#organization) be tied to specific service offerings
//   - Improves eligibility for "X manufacturer / supplier / wholesale" queries
//   - Complements existing Product schema on /products/[slug] pages
//
// Refs:
//   https://schema.org/Service
//   https://developers.google.com/search/docs/appearance/structured-data/local-business

import { SITE } from '@/data/site-config';

// Default countries we serve — mirrors layout.js ORG_LD.areaServed
const DEFAULT_AREAS = [
  { '@type': 'Country', name: 'United States' },
  { '@type': 'Country', name: 'United Kingdom' },
  { '@type': 'Country', name: 'Germany' },
  { '@type': 'Country', name: 'France' },
  { '@type': 'Country', name: 'Australia' },
  { '@type': 'Country', name: 'Canada' },
  { '@type': 'Place',   name: 'European Union' },
];

/**
 * Generate a Service JSON-LD object for a landing page.
 *
 * @param {object} opts
 * @param {string} opts.slug           - landing page slug (no leading slash)
 * @param {string} opts.serviceType    - e.g. "Custom Wooden Spice Rack Manufacturing"
 * @param {string} opts.name           - SERP-visible name; defaults to serviceType
 * @param {string} opts.description    - short summary, used as service description
 * @param {Array<{name:string,url?:string,description?:string}>=} opts.offerItems
 *        - sub-services / variations to list in hasOfferCatalog
 * @param {Array=}   opts.areaServed   - override default 7-country list
 * @returns {object} Service JSON-LD ready to pass to <JsonLd data={...} />
 */
export function buildServiceLd({
  slug,
  serviceType,
  name,
  description,
  offerItems,
  areaServed,
}) {
  const url = `${SITE.siteUrl}/${slug}`;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    serviceType,
    name: name || serviceType,
    description,
    url,
    provider: { '@id': `${SITE.siteUrl}/#organization` },
    areaServed: areaServed || DEFAULT_AREAS,
    // serviceOutput hints what the buyer receives — concrete products from this service
    serviceOutput: 'Custom-manufactured wooden products to buyer specification',
    // category tells Google the broad industry bucket
    category: 'Manufacturing',
    // Implicit B2B signal — quote-only, no public catalog prices
    termsOfService: `${SITE.siteUrl}/contact`,
  };

  if (offerItems && offerItems.length) {
    ld.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name,
      itemListElement: offerItems.map((it, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: {
          '@type': 'Service',
          name: it.name,
          ...(it.description ? { description: it.description } : {}),
          ...(it.url ? { url: it.url.startsWith('http') ? it.url : `${SITE.siteUrl}${it.url}` } : {}),
        },
      })),
    };
  }

  return ld;
}
