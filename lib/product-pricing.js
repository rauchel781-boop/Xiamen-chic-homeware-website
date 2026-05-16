// Wholesale FOB price ranges per category. Used by the product detail page
// to emit an `AggregateOffer` block inside the Product JSON-LD schema.
//
// These ranges are HONEST B2B FOB-Xiamen prices (USD/unit) reflecting our
// MOQ-tiered wholesale pricing — they are not a binding quote. A real quote
// always depends on volume, customisation (logo / stain / packaging) and
// commodity timing.
//
// Source: pricing handed off by the factory, May 2026.
// Update via this single file — no other file needs to change.

export const PRICING_BY_CATEGORY = {
  // Bath / spa
  'wooden-bathtub-caddy-tray':       { moq: 300, lowPrice: 4.60,  highPrice: 12.50 },
  // Kitchen flat surfaces
  'wooden-cutting-board':            { moq: 300, lowPrice: 1.50,  highPrice: 6.00  },
  'wooden-cheese-board':             { moq: 300, lowPrice: 2.00,  highPrice: 10.00 },
  'wooden-coasters':                 { moq: 500, lowPrice: 0.15,  highPrice: 0.60  },
  // Trays
  'wooden-serving-tray':             { moq: 300, lowPrice: 2.00,  highPrice: 6.00  },
  'wooden-sofa-tray':                { moq: 300, lowPrice: 3.00,  highPrice: 10.00 },
  'hotel-amenity-trays':             { moq: 300, lowPrice: 1.50,  highPrice: 8.00  },
  'room-service-trays':              { moq: 300, lowPrice: 1.50,  highPrice: 7.00  },
  'bathroom-vanity-trays':           { moq: 300, lowPrice: 1.50,  highPrice: 7.00  },
  'entryway-catchall-trays':         { moq: 300, lowPrice: 2.00,  highPrice: 8.00  },
  // Generic boxes
  'wooden-gift-box':                 { moq: 300, lowPrice: 0.50,  highPrice: 8.00  },
  'custom-wooden-packaging-box':     { moq: 300, lowPrice: 1.50,  highPrice: 8.00  },
  'wooden-tea-box':                  { moq: 300, lowPrice: 2.00,  highPrice: 9.00  },
  'wooden-stash-box':                { moq: 300, lowPrice: 4.00,  highPrice: 8.00  },
  'wooden-storage-box-with-lid':     { moq: 300, lowPrice: 1.00,  highPrice: 6.00  },
  'wooden-keepsake-boxes':           { moq: 300, lowPrice: 2.00,  highPrice: 10.00 },
  'gift-boxes-retail-packaging':     { moq: 300, lowPrice: 2.00,  highPrice: 8.00  },
  // Premium boxes
  'wooden-wine-box':                 { moq: 300, lowPrice: 1.00,  highPrice: 7.00  },
  'wooden-jewelry-boxes':            { moq: 300, lowPrice: 2.00,  highPrice: 10.00 },
  'wooden-watch-boxes':              { moq: 300, lowPrice: 3.00,  highPrice: 8.00  },
  'wooden-photo-frame':              { moq: 300, lowPrice: 2.00,  highPrice: 7.00  },
  // Organizers
  'wooden-spice-rack':               { moq: 300, lowPrice: 2.00,  highPrice: 9.00  },
  'wooden-cutlery-organizer':        { moq: 300, lowPrice: 3.00,  highPrice: 10.00 },
  'wooden-drawer-organizer':         { moq: 300, lowPrice: 3.00,  highPrice: 10.00 },
  'wooden-desk-organizer':           { moq: 300, lowPrice: 2.00,  highPrice: 8.00  },
  'wooden-jewelry-organizer':        { moq: 300, lowPrice: 3.00,  highPrice: 10.00 },
  'wooden-bathroom-organizer':       { moq: 300, lowPrice: 2.00,  highPrice: 9.00  },
  'wooden-countertop-organizers':    { moq: 300, lowPrice: 2.00,  highPrice: 8.00  },
  'desk-office-organizers':          { moq: 300, lowPrice: 2.00,  highPrice: 8.00  },
  'wooden-coffee-organizer':         { moq: 300, lowPrice: 4.00,  highPrice: 11.00 },
  'wooden-pen-holders':              { moq: 300, lowPrice: 1.00,  highPrice: 4.00  },
  'restaurant-table-caddies':        { moq: 300, lowPrice: 3.00,  highPrice: 8.00  },
  // Large kitchen
  'wooden-bread-box':                { moq: 300, lowPrice: 6.00,  highPrice: 10.00 },
  'wooden-cake-stands':              { moq: 300, lowPrice: 2.00,  highPrice: 7.00  },
  // Niche
  'pet-products':                    { moq: 300, lowPrice: 3.00,  highPrice: 9.00  },
  // Fallback bucket
  'uncategorized':                   { moq: 300, lowPrice: 2.00,  highPrice: 7.00  },
};

const DEFAULT_PRICING = { moq: 300, lowPrice: 2.00, highPrice: 7.00 };

// Categories to skip during initial direct-match. 'uncategorized' is
// here because it's an attached WP tag but not a real pricing bucket —
// we want slug-pattern inference to run before falling back to it.
const SKIP_CATS = new Set([
  'wooden-kitchen-dining',
  'storage-home-organization',
  'hospitality-commercial',
  'uncategorized',
]);

// Slug-pattern fallback for products that only carry the "uncategorized"
// tag but have descriptive slugs. Order: most specific first.
const SLUG_PATTERNS = [
  { re: /cheese[-_ ]?board|charcuterie/i,                              cat: 'wooden-cheese-board' },
  { re: /cutting[-_ ]?board|chopping[-_ ]?board|kitchen[-_ ]?board/i,  cat: 'wooden-cutting-board' },
  { re: /cake[-_ ]?stand|dessert[-_ ]?stand|tier[-_ ]?(stand|display)/i, cat: 'wooden-cake-stands' },
  { re: /bread[-_ ]?board/i,                                            cat: 'wooden-cutting-board' },
  { re: /coaster|cup[-_ ]?holder|teacup[-_ ]?(holder|pad)|insulation[-_ ]?pad/i, cat: 'wooden-coasters' },
  { re: /essential[-_ ]?oil[-_ ]?tray|vanity[-_ ]?tray/i,               cat: 'bathroom-vanity-trays' },
  { re: /serving[-_ ]?(tray|stand)|fruit[-_ ]?(tray|platter)|food[-_ ]?(board|platter)|tea[-_ ]?tray|table[-_ ]?tray|wooden[-_ ]?tray/i, cat: 'wooden-serving-tray' },
  { re: /\b(pet|dog|cat|hamster|aquarium|rabbit|fish)\b/i,              cat: 'pet-products' },
  { re: /jewelry[-_ ]?(box|case)|ring[-_ ]?box/i,                       cat: 'wooden-jewelry-boxes' },
  { re: /watch[-_ ]?box|watch[-_ ]?case/i,                              cat: 'wooden-watch-boxes' },
  { re: /wine[-_ ]?(box|case)|whisk(e)?y[-_ ]?box/i,                    cat: 'wooden-wine-box' },
  { re: /photo[-_ ]?frame|picture[-_ ]?frame/i,                         cat: 'wooden-photo-frame' },
  { re: /tea[-_ ]?box|matcha[-_ ]?box/i,                                cat: 'wooden-tea-box' },
  { re: /stash[-_ ]?box|rolling[-_ ]?box/i,                             cat: 'wooden-stash-box' },
  { re: /keepsake[-_ ]?box|memory[-_ ]?box|treasure[-_ ]?box/i,         cat: 'wooden-keepsake-boxes' },
  { re: /salt[-_ ]?box|spice[-_ ]?box|salt[-_ ]?cellar/i,               cat: 'wooden-storage-box-with-lid' },
  { re: /gift[-_ ]?box|packaging[-_ ]?box/i,                            cat: 'wooden-gift-box' },
  { re: /spice[-_ ]?(rack|organizer|holder)/i,                          cat: 'wooden-spice-rack' },
  { re: /cutlery[-_ ]?(organizer|holder|tray)|utensil/i,                cat: 'wooden-cutlery-organizer' },
  { re: /drawer[-_ ]?organizer/i,                                       cat: 'wooden-drawer-organizer' },
  { re: /jewelry[-_ ]?organizer|belt[-_ ]?organizer|jewelry[-_ ]?holder/i, cat: 'wooden-jewelry-organizer' },
  { re: /bathroom[-_ ]?organizer|bath[-_ ]?organizer/i,                 cat: 'wooden-bathroom-organizer' },
  { re: /coffee[-_ ]?(organizer|caddy|station)/i,                       cat: 'wooden-coffee-organizer' },
  { re: /pen[-_ ]?holder|pencil[-_ ]?holder/i,                          cat: 'wooden-pen-holders' },
  { re: /notebook[-_ ]?stand|book[-_ ]?stand|tablet[-_ ]?stand/i,       cat: 'wooden-desk-organizer' },
  { re: /desk[-_ ]?organizer|office[-_ ]?organizer/i,                   cat: 'wooden-desk-organizer' },
  { re: /countertop[-_ ]?organizer/i,                                   cat: 'wooden-countertop-organizers' },
  { re: /restaurant[-_ ]?caddy|table[-_ ]?caddy/i,                      cat: 'restaurant-table-caddies' },
  { re: /bread[-_ ]?box/i,                                              cat: 'wooden-bread-box' },
];

function inferCategoryFromSlug(slug, title) {
  const haystack = `${slug || ''} ${title || ''}`.toLowerCase();
  for (const { re, cat } of SLUG_PATTERNS) {
    if (re.test(haystack)) return cat;
  }
  return null;
}

export function getPriceRangeForProduct(product) {
  const cats = product?.categories || [];
  for (const c of cats) {
    if (SKIP_CATS.has(c.slug)) continue;
    if (PRICING_BY_CATEGORY[c.slug]) return PRICING_BY_CATEGORY[c.slug];
  }
  for (const c of cats) {
    if (c.slug === 'uncategorized') continue;
    if (PRICING_BY_CATEGORY[c.slug]) return PRICING_BY_CATEGORY[c.slug];
  }
  const inferred = inferCategoryFromSlug(product?.slug, product?.title);
  if (inferred && PRICING_BY_CATEGORY[inferred]) {
    return PRICING_BY_CATEGORY[inferred];
  }
  return PRICING_BY_CATEGORY['uncategorized'] || DEFAULT_PRICING;
}
