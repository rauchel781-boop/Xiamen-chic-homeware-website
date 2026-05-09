// ─────────────────────────────────────────────────────────────────────────
// Watch & Jewelry products (sample 5 — covers all 5 closure types)
// Image paths reference /public/watch-jewelry/<product-folder>/
// Encoding handled centrally by `img()` so spaces, &, parens, and CJK
// characters in filenames are all URL-safe.
// ─────────────────────────────────────────────────────────────────────────

const PARENT = 'Watch & Jewelry';
const img = (folder, name) =>
  '/' + [PARENT, folder, name].map(encodeURIComponent).join('/');

export const PRODUCTS = {
  'luxury-velvet-ring-box': {
    slug: 'luxury-velvet-ring-box',
    name: 'Luxury Velvet Ring Box',
    closure: 'Magnetic',
    tagline: 'Soft-touch magnetic flip with velvet ring slot',
    intro:
      'A premium magnetic-flip ring presentation box with a soft-touch matte exterior and velvet-lined interior. The flip-open design with concealed neodymium magnets creates the engagement-ready reveal. Walnut, oak, or fabric-wrapped MDF options.',
    images: [
      img('Luxury Velvet Ring Box', 'Walnut Wood Cufflink Box (1).png'),
      img('Luxury Velvet Ring Box', 'Walnut Wood Cufflink Box (2).png'),
      img('Luxury Velvet Ring Box', 'Walnut Wood Cufflink Box (3).png'),
      img('Luxury Velvet Ring Box', 'Walnut Wood Cufflink Box (4).png'),
    ],
    specs: {
      'Closure Type': 'Hidden magnetic flip',
      'Material': 'Walnut · oak · fabric-wrapped MDF',
      'Surface Finish': 'Soft-touch matte · piano lacquer · fabric wrap',
      'Hardware': 'Concealed neodymium magnetic flap',
      'Interior Lining': 'Velvet ring slot · microfiber lid pad',
      'Size': 'Custom',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Hot foil · debossing · laser engraving',
    },
    customization: [
      'Single, double, or set ring slot configurations',
      'Velvet color: black / navy / cream / blush / custom',
      'Soft-touch, piano gloss, or fabric-wrap exterior',
      'Hot-foil logo (gold / silver / rose gold)',
      'Branded inner lid (printed satin or velvet)',
      'Optional outer sleeve box for retail',
    ],
    packaging:
      'Each box wrapped in OPP polybag → individual white inner carton → 5-ply export master carton. Master carton labeled with customer SKU and barcode if required.',
    useCases: ['Engagement rings', 'Wedding bands', 'Cufflink presentation', 'Anniversary gifts', 'Designer jewelry retail', 'Heirloom packaging'],
    related: ['three-watch-display-case', 'pearl-necklace-presentation-box', 'multi-tier-earring-chest'],
  },

  'three-watch-display-case': {
    slug: 'three-watch-display-case',
    name: 'Three-Watch Display Case',
    closure: 'Hinged',
    tagline: 'Glass-top three-watch case with concealed soft-close hinges',
    intro:
      'A glass-top hinged display case for three watches on velvet pillows. Soft-close European hinges, brass clasp, and removable watch pillows. Equally at home on a retail counter or in a collector’s drawer.',
    images: [
      img('Three-Watch Display Case', 'ScreenShot_2026-05-04_135435_904.png'),
      img('Three-Watch Display Case', 'ScreenShot_2026-05-04_135449_157.png'),
      img('Three-Watch Display Case', 'ScreenShot_2026-05-04_135458_016.png'),
      img('Three-Watch Display Case', 'ScreenShot_2026-05-04_135521_073.png'),
    ],
    specs: {
      'Closure Type': 'Hinged glass-top with brass clasp',
      'Material': 'Walnut · oak · MDF veneered',
      'Surface Finish': 'Piano lacquer · oiled hardwood · matte',
      'Hardware': 'Concealed soft-close European hinges · brass clasp',
      'Interior Lining': '3 removable velvet watch pillows · microfiber base',
      'Size': 'Custom',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving · brass nameplate · embroidered lining',
    },
    customization: [
      'Capacity: 1 / 3 / 6 / 10 / 12-watch configurations',
      'Glass top, solid wood top, or photo-frame top',
      'Watch pillow size to fit any wrist (small / medium / large)',
      'Optional drawer below for accessories or a second tier',
      'Lock & key option (cam or piano lock)',
      'Embroidered or printed brand on lid lining',
    ],
    packaging:
      'Glass-top units double-wrapped with foam corner protectors, then placed in 5-layer export master cartons with fragile labeling.',
    useCases: ['Watch retailers', 'Collector storage', 'Anniversary gifts', 'Hotel concierge', 'Travel cases', 'Heirloom display'],
    related: ['luxury-velvet-ring-box', 'multi-tier-earring-chest', 'pearl-necklace-presentation-box'],
  },

  'bamboo-jewelry-tray-set': {
    slug: 'bamboo-jewelry-tray-set',
    name: 'Bamboo Jewelry Tray Set',
    closure: 'Sliding',
    tagline: 'Stackable bamboo trays with sliding lid',
    intro:
      'A stackable jewelry organization system with sliding lid. Carbonized bamboo construction with food-safe finish, customizable internal grid for rings, earrings, and necklaces. Modern, sustainable, and built to live on the dresser.',
    images: [
      img('Bamboo Jewelry Tray Set', 'ScreenShot_2026-05-04_140059_218.png'),
      img('Bamboo Jewelry Tray Set', 'ScreenShot_2026-05-04_140114_651.png'),
      img('Bamboo Jewelry Tray Set', 'ScreenShot_2026-05-04_140122_682.png'),
      img('Bamboo Jewelry Tray Set', 'ScreenShot_2026-05-04_140139_730.png'),
    ],
    specs: {
      'Closure Type': 'Sliding lid (CNC-routed grooves)',
      'Material': 'Carbonized bamboo · natural bamboo',
      'Surface Finish': 'Food-safe oil · clear lacquer · raw',
      'Hardware': 'None — hardware-free construction',
      'Interior': 'Configurable divider grid (rings / earrings / necklace)',
      'Size': 'Custom',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving · screen print',
    },
    customization: [
      'Tray size and stacking count (1 / 2 / 3-tier sets)',
      'Bamboo color: natural pale gold or warm carbonized caramel',
      'Internal divider grid: ring slots, earring holes, necklace channels',
      'Lid surface engraving (full bamboo grain canvas)',
      'Optional velvet liner inside trays',
      'Eco-friendly retail packaging matched to product',
    ],
    packaging:
      'Trays nested with bamboo separators, sealed in OPP, packed in master cartons. Hardware-free design saves on freight cost.',
    useCases: ['Daily-wear organization', 'Eco-gift sets', 'Bamboo lifestyle brands', 'Bridal retail', 'Hotel amenity', 'Travel jewelry kit'],
    related: ['multi-tier-earring-chest', 'pearl-necklace-presentation-box', 'luxury-velvet-ring-box'],
  },

  'multi-tier-earring-chest': {
    slug: 'multi-tier-earring-chest',
    name: 'Multi-Tier Earring Chest',
    closure: 'Drawer',
    tagline: 'Apothecary-style chest for earrings, rings, and pendants',
    intro:
      'An apothecary-inspired multi-tier drawer chest with 6 to 12 small drawers, brass cup pulls, and brass label frames. Each drawer custom-divided for earrings, rings, or pendants. Solid wood construction throughout.',
    images: [
      img('Multi-Tier Earring Chest', '美图设计室_无损改尺寸_2025_12_11（4）.jpeg'),
      img('Multi-Tier Earring Chest', '美图设计室_无损改尺寸_2025_12_11（5）.jpeg'),
      img('Multi-Tier Earring Chest', '美图设计室_无损改尺寸_2025_12_11（6）.jpeg'),
      img('Multi-Tier Earring Chest', '美图设计室_无损改尺寸_2025_12_11（7）.jpeg'),
      img('Multi-Tier Earring Chest', '美图设计室_无损改尺寸_2025_12_11（8）.jpeg'),
      img('Multi-Tier Earring Chest', '美图设计室_无损改尺寸_2025_12_11（9）.jpeg'),
    ],
    specs: {
      'Closure Type': 'Pull-out drawers (apothecary style)',
      'Material': 'Walnut · oak · pine · birch ply',
      'Surface Finish': 'Stained · oiled · matte lacquer',
      'Drawer Slides': 'Wood-on-wood (smooth-fit precision)',
      'Hardware': 'Brass cup pulls · brass label frames',
      'Interior': 'Custom divider layout per drawer (rings / earrings / pendants)',
      'Size': 'Custom',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Brass plate · laser engraving · burned-in mark',
    },
    customization: [
      '6 / 8 / 10 / 12 drawer count (or custom)',
      'Pulls: brass cup, brass knob, leather, recessed',
      'Label frames: brass / aluminum / paper / engraved',
      'Per-drawer custom divider layout',
      'Optional lock on top drawer',
      'Stain colors: natural / honey / walnut / ebony',
    ],
    packaging:
      'Each drawer secured with foam blocks against opening in transit, full chest bubble-wrapped, packed in 5-layer export master cartons.',
    useCases: ['Jewelry retail back-stock', 'Collector storage', 'Hobbyist supplies', 'Apothecary gift sets', 'Designer studios', 'Hotel suites'],
    related: ['three-watch-display-case', 'bamboo-jewelry-tray-set', 'pearl-necklace-presentation-box'],
  },

  'pearl-necklace-presentation-box': {
    slug: 'pearl-necklace-presentation-box',
    name: 'Pearl Necklace Presentation Box',
    closure: 'Lift-off',
    tagline: 'Long lift-off lid box for necklaces and bracelets',
    intro:
      'An elongated lift-off lid box specifically sized for necklaces, bracelets, and longer jewelry pieces. Padded velvet inserts with neck-form holders inside. Generous flat lid surface for hot-foil branding or laser engraving.',
    images: [
      img('Pearl Necklace Presentation Box', 'jewelry box (1).png'),
      img('Pearl Necklace Presentation Box', 'jewelry box (2).png'),
      img('Pearl Necklace Presentation Box', 'jewelry box (3).png'),
      img('Pearl Necklace Presentation Box', 'jewelry box (4).png'),
      img('Pearl Necklace Presentation Box', 'jewelry box (5).png'),
    ],
    specs: {
      'Closure Type': 'Lift-off two-piece (lid + base)',
      'Material': 'MDF veneered · pine · paulownia · solid hardwood',
      'Surface Finish': 'Matte / gloss lacquer · printed · paper-wrapped',
      'Hardware': 'None — friction or lip-fit closure',
      'Interior Lining': 'Padded velvet with neck-form holders',
      'Size': 'Custom',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Hot foil · printing · laser engraving',
    },
    customization: [
      'Length sized for necklace / bracelet / bangle',
      'Single neck form, double, or compartmented',
      'Velvet color: black / navy / cream / pearl-grey / custom',
      'Lid surface: full hot foil canvas or printed pattern',
      'Optional outer sleeve, ribbon, or wrapping band',
      'Retail-ready barcode and SKU labeling',
    ],
    packaging:
      'Lid and base stacked together with foam separator, OPP-wrapped, then packed in master cartons sized for elongated layout.',
    useCases: ['Pearl & fine jewelry', 'Bridal sets', 'Anniversary gifts', 'Designer brand retail', 'Hotel suite amenities', 'Award ceremonies'],
    related: ['luxury-velvet-ring-box', 'three-watch-display-case', 'bamboo-jewelry-tray-set'],
  },
};

export const PRODUCT_SLUGS = Object.keys(PRODUCTS);
export const CLOSURES = Array.from(new Set(Object.values(PRODUCTS).map((p) => p.closure)));
