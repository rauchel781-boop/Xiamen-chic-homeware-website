// ─────────────────────────────────────────────────────────────────────────
// Sliding Lid Wooden Boxes — 9 products
// Image paths reference /public/sliding-lid-wooden-box/<folder>/
// ─────────────────────────────────────────────────────────────────────────

const PARENT = 'Sliding lid wooden box';
const img = (folder, name) =>
  '/' + [PARENT, folder, name].map(encodeURIComponent).join('/');

export const PRODUCTS = {
  'pine-sliding-box': {
    slug: 'pine-sliding-box',
    name: 'Pine Sliding-Lid Box',
    closure: 'Sliding',
    tagline: 'Workhorse sliding-lid box in clean knot-free pine',
    intro:
      'A workhorse sliding-lid pine box — knot-free clear-grade timber with CNC-routed groove and a smooth-gliding lid. The standard format for craft kits, pen sets, and any application that wants the cleanest possible exterior.',
    images: [
      img('pine sliding box', 'ScreenShot_2026-05-05_144157_482.png'),
      img('pine sliding box', 'ScreenShot_2026-05-05_144208_464.png'),
      img('pine sliding box', 'ScreenShot_2026-05-05_144215_113.png'),
      img('pine sliding box', 'ScreenShot_2026-05-05_144222_778.png'),
    ],
    specs: {
      'Closure Type': 'Sliding lid (CNC-routed groove)',
      'Material': 'Knot-free clear pine',
      'Surface Finish': 'Natural · oil · stain',
      'Hardware': 'None — wood-on-wood slide',
      'Interior Lining': 'Open or divided',
      'Size': '230 × 130 × 60 mm (custom)',
      'MOQ': '500 pcs',
      'Lead Time': '25 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Multiple sizes (S / M / L / XL)',
      'Optional finger pull or ribbon hole',
      'Knot-free or rustic knotty pine',
      'Stained, oiled, or natural',
      'Engraved branding on lid',
      'Bulk-pack pricing for craft retail',
    ],
    packaging:
      'Stacked in groups of 24, OPP polybag, packed in 5-ply export master carton — hardware-free design saves freight cost.',
    useCases: ['Craft kits', 'Pen / stationery sets', 'Wedding favors', 'Tea / coffee', 'Children gift sets', 'Bulk reseller'],
    related: ['walnut-sliding-box', 'sliding-storage-box', 'pine-bead-sorter-sliding-box'],
  },

  'walnut-sliding-box': {
    slug: 'walnut-sliding-box',
    name: 'Walnut Sliding-Lid Box',
    closure: 'Sliding',
    tagline: 'Premium walnut sliding-lid presentation box',
    intro:
      'A premium-tier sliding-lid box in solid American walnut — for products that deserve a presentation surface as good as the product itself. The dark chocolate grain doubles the perceived value.',
    images: [
      img('walnut sliding box', 'ScreenShot_2026-05-05_145004_580.png'),
      img('walnut sliding box', 'ScreenShot_2026-05-05_145010_767.png'),
      img('walnut sliding box', 'ScreenShot_2026-05-05_145016_923.png'),
      img('walnut sliding box', 'ScreenShot_2026-05-05_145024_696.png'),
    ],
    specs: {
      'Closure Type': 'Sliding lid (CNC-routed groove)',
      'Material': 'Solid American black walnut',
      'Surface Finish': 'Hand-rubbed oil + wax',
      'Hardware': 'None — wood-on-wood slide',
      'Interior Lining': 'Felt-lined or open',
      'Size': '180 × 100 × 50 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Wood: walnut, oak, mahogany',
      'Felt or velvet lining options',
      'Custom size for product fit',
      'Engraved logo on lid',
      'Optional ribbon or finger pull',
      'Premium retail-ready packaging',
    ],
    packaging:
      'Wrapped in tissue, retail-ready inner box, then 5-ply export master carton.',
    useCases: ['Premium gifting', 'Pen / stationery sets', 'Cufflink presentation', 'Watch storage', 'Wedding favors', 'Spirit packaging'],
    related: ['pine-sliding-box', 'walnut-acrylic-top-trinket-box', 'sliding-storage-box'],
  },

  'sliding-storage-box': {
    slug: 'sliding-storage-box',
    name: 'Sliding Storage Box (Stained Pine)',
    closure: 'Sliding',
    tagline: 'Stained pine sliding box with chunky proportions',
    intro:
      'A larger-format stained pine sliding-lid box with chunky proportions — sized for jewelry sets, mala beads, or tabletop accessory storage. The stained finish lifts pine into a more premium aesthetic.',
    images: [
      img('sliding storage box', 'ScreenShot_2026-05-05_144239_670.png'),
      img('sliding storage box', 'ScreenShot_2026-05-05_144247_798.png'),
      img('sliding storage box', 'ScreenShot_2026-05-05_144256_192.png'),
      img('sliding storage box', 'ScreenShot_2026-05-05_144305_913.png'),
    ],
    specs: {
      'Closure Type': 'Sliding lid (CNC-routed groove)',
      'Material': 'Stained pine',
      'Surface Finish': 'Walnut stain · matte top coat',
      'Hardware': 'None — wood-on-wood slide',
      'Interior Lining': 'Sanded wood',
      'Size': '270 × 140 × 80 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Stain color: walnut, cherry, ebony, custom',
      'Pine, paulownia, oak',
      'Felt-lined interior option',
      'Engraved logo or quote',
      'Multi-compartment dividers',
      'Stackable design',
    ],
    packaging:
      'OPP polybag, retail box, then 5-ply export master carton.',
    useCases: ['Jewelry storage', 'Mala bead storage', 'Yoga / mindfulness retail', 'Hostess gifts', 'Tabletop accessory', 'Premium gifting'],
    related: ['pine-sliding-box', 'walnut-sliding-box', 'walnut-acrylic-top-trinket-box'],
  },

  'pine-bead-sorter-sliding-box': {
    slug: 'pine-bead-sorter-sliding-box',
    name: 'Pine 9-Compartment Bead Sorter',
    closure: 'Sliding',
    tagline: '9-section bead and bead-craft organizer',
    intro:
      'A 9-compartment pine bead sorter with a clear sliding-acrylic lid — perfect for bead crafters, jewelry makers, and small-parts hobbyists. See every compartment without opening; tip and pour as needed.',
    images: [
      img('set-1', 'ScreenShot_2026-05-05_144746_593.png'),
      img('set-1', 'ScreenShot_2026-05-05_144753_160.png'),
      img('set-1', 'ScreenShot_2026-05-05_144759_955.png'),
      img('set-1', 'ScreenShot_2026-05-05_144807_889.png'),
      img('set-1', 'ScreenShot_2026-05-05_144817_081.png'),
    ],
    specs: {
      'Closure Type': 'Sliding clear acrylic lid',
      'Material': 'Pine + clear acrylic',
      'Surface Finish': 'Sanded raw',
      'Hardware': 'None — wood-on-wood slide',
      'Interior Lining': '9 routed compartments',
      'Size': '240 × 200 × 30 mm',
      'MOQ': '500 pcs',
      'Lead Time': '25 days',
      'Branding': 'Laser engraving on frame',
    },
    customization: [
      'Compartment count: 9 / 12 / 16 / 24',
      'Acrylic or wood sliding lid',
      'Pine, paulownia, bamboo',
      'Optional starter bead bundle',
      'Custom-sized compartments',
      'Stackable design',
    ],
    packaging:
      'OPP polybag, retail box, then 5-ply export master carton.',
    useCases: ['Bead craft', 'Jewelry making', 'Small-parts storage', 'Maker subscription', 'Hobby retail', 'Educational kits'],
    related: ['pine-sliding-box', 'pine-adventure-engraved-sliding-box', 'bamboo-sliding-storage-set'],
  },

  'pine-adventure-engraved-sliding-box': {
    slug: 'pine-adventure-engraved-sliding-box',
    name: 'Pine Engraved Sliding Box ("Our Next Adventure")',
    closure: 'Sliding',
    tagline: 'Slim sliding-lid box with heart cutout for memory keepers',
    intro:
      'A slim sliding-lid pine box engraved "Our Next Adventure" with a heart cutout in the lid — designed for couples to save tickets, photos, and travel memories. A long-form gift built around shared moments.',
    images: [
      img('set-2', 'ScreenShot_2026-05-05_144326_253.png'),
      img('set-2', 'ScreenShot_2026-05-05_144333_867.png'),
      img('set-2', 'ScreenShot_2026-05-05_144341_575.png'),
      img('set-2', 'ScreenShot_2026-05-05_144349_451.png'),
      img('set-2', 'ScreenShot_2026-05-05_144357_212.png'),
    ],
    specs: {
      'Closure Type': 'Sliding lid w/ heart cutout',
      'Material': 'Solid pine',
      'Surface Finish': 'Stain · raw',
      'Hardware': 'None — wood-on-wood slide',
      'Interior Lining': 'Open compartment',
      'Size': '300 × 100 × 70 mm',
      'MOQ': '300 pcs',
      'Lead Time': '25 days',
      'Branding': 'Laser engraving + cutout',
    },
    customization: [
      'Custom engraved phrase ("Our Adventure", "Memories", etc.)',
      'Cutout shape: heart / star / map / custom',
      'Personalized names + date',
      'Pine, paulownia, oak',
      'Stained or natural finish',
      'Optional starter ticket bundle',
    ],
    packaging:
      'OPP polybag, retail-ready gift box, then 5-ply export master carton.',
    useCases: ['Wedding gifts', 'Anniversary keepsake', 'Travel-couple gifts', 'Honeymoon keepsake', 'Memory boxes', 'Gift retail'],
    related: ['pine-perfect-match-wedding-box', 'pine-groomsman-cigar-sliding-box', 'pine-sliding-box'],
  },

  'pine-perfect-match-wedding-box': {
    slug: 'pine-perfect-match-wedding-box',
    name: 'Pine "Perfect Match" Wedding Sliding Box',
    closure: 'Sliding',
    tagline: 'Personalized matchstick box for wedding favors',
    intro:
      'A personalized "Perfect Match" wedding favor box — a sliding-lid pine matchbox printed with the couple\'s names and date, holding long matches for ceremonial candle lighting. Romantic and practical.',
    images: [
      img('set-3', 'ScreenShot_2026-05-05_144417_775.png'),
      img('set-3', 'ScreenShot_2026-05-05_144423_750.png'),
      img('set-3', 'ScreenShot_2026-05-05_144430_486.png'),
      img('set-3', 'ScreenShot_2026-05-05_144437_165.png'),
    ],
    specs: {
      'Closure Type': 'Sliding card lid',
      'Material': 'Pine + printed cardstock',
      'Surface Finish': 'Stain · raw',
      'Hardware': 'None — sliding lid',
      'Interior Lining': 'Open match cavity',
      'Size': '110 × 70 × 25 mm',
      'MOQ': '500 pcs',
      'Lead Time': '20 days',
      'Branding': 'Custom-printed couple name + date',
    },
    customization: [
      'Custom couple names + wedding date',
      'Printed art (florals, rustic, modern)',
      'Includes match-set (long or standard)',
      'Pine or paulownia construction',
      'Bulk wedding-favor packaging',
      'Optional thank-you tag',
    ],
    packaging:
      'Stacked in groups of 24, OPP polybag, packed in 5-ply export master carton — wedding-favor-friendly bulk pack.',
    useCases: ['Wedding favors', 'Engagement parties', 'Anniversary gifts', 'Couples gift retail', 'Romantic packaging', 'Date night gifts'],
    related: ['pine-adventure-engraved-sliding-box', 'pine-groomsman-cigar-sliding-box', 'pine-sliding-box'],
  },

  'bamboo-sliding-storage-set': {
    slug: 'bamboo-sliding-storage-set',
    name: 'Bamboo Sliding-Lid Storage Set',
    closure: 'Sliding',
    tagline: 'Multi-size bamboo sliding boxes — sold as a nesting set',
    intro:
      'A nesting set of bamboo sliding-lid storage boxes in graduated sizes — perfect for home organization, retail merchandising, or as a versatile starter set for bead crafters, herbalists, or hobbyists.',
    images: [
      img('set-4', 'ScreenShot_2026-05-05_144516_357.png'),
      img('set-4', 'ScreenShot_2026-05-05_144525_698.png'),
      img('set-4', 'ScreenShot_2026-05-05_144550_285.png'),
      img('set-4', 'ScreenShot_2026-05-05_144601_797.png'),
    ],
    specs: {
      'Closure Type': 'Sliding clear acrylic lids',
      'Material': 'Carbonized bamboo + acrylic',
      'Surface Finish': 'Food-safe oil',
      'Hardware': 'None — wood-on-wood slide',
      'Interior Lining': 'Open',
      'Size': 'Set of 6 (graduated sizes)',
      'MOQ': '200 sets',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Set of 3 / 4 / 6 / 8 boxes',
      'Bamboo or pine',
      'Acrylic or wood lid',
      'Custom labels per box',
      'Engraved branding',
      'Stackable / nesting design',
    ],
    packaging:
      'Nested for shipping efficiency, OPP polybag, retail box, then 5-ply export master carton.',
    useCases: ['Home organization', 'Bead / hobby storage', 'Office supplies', 'Spice / dry goods', 'Maker retail', 'Eco gift sets'],
    related: ['pine-bead-sorter-sliding-box', 'pine-sliding-box', 'sliding-storage-box'],
  },

  'walnut-acrylic-top-trinket-box': {
    slug: 'walnut-acrylic-top-trinket-box',
    name: 'Walnut Acrylic-Top Trinket Box',
    closure: 'Sliding',
    tagline: 'Walnut box with sliding acrylic lid for trinket display',
    intro:
      'A walnut trinket box with a sliding clear-acrylic lid — show off jewelry, coins, or small collectibles while keeping them dust-free. The combination of walnut and clean acrylic feels both warm and modern.',
    images: [
      img('set-5', 'ScreenShot_2026-05-05_144706_699.png'),
      img('set-5', 'ScreenShot_2026-05-05_144713_593.png'),
      img('set-5', 'ScreenShot_2026-05-05_144719_913.png'),
      img('set-5', 'ScreenShot_2026-05-05_144726_154.png'),
    ],
    specs: {
      'Closure Type': 'Sliding clear acrylic lid',
      'Material': 'Solid walnut + acrylic',
      'Surface Finish': 'Hand-rubbed oil',
      'Hardware': 'None — wood-on-wood slide',
      'Interior Lining': 'Felt or open',
      'Size': '230 × 130 × 60 mm',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on frame',
    },
    customization: [
      'Wood: walnut, oak, cherry',
      'Felt-lined interior color options',
      'Multiple sizes (S / M / L)',
      'Engraved logo on frame edge',
      'Optional dividers',
      'Premium gift-ready packaging',
    ],
    packaging:
      'Wrapped in tissue, retail box, then 5-ply export master carton.',
    useCases: ['Jewelry display', 'Coin collection', 'Trinket storage', 'Anniversary gifts', 'Premium retail', 'Watch & cufflink display'],
    related: ['walnut-sliding-box', 'sliding-storage-box', 'pine-bead-sorter-sliding-box'],
  },

  'pine-groomsman-cigar-sliding-box': {
    slug: 'pine-groomsman-cigar-sliding-box',
    name: 'Pine Groomsman Cigar Sliding Box',
    closure: 'Sliding',
    tagline: 'Personalized cigar box for groomsman gifts',
    intro:
      'A long, slim sliding-lid pine cigar box engraved with groomsman monograms — sized to hold 4–6 cigars. Sold as 4-piece sets for wedding parties; bulk pricing for wedding planners and gift retailers.',
    images: [
      img('set-6', 'ScreenShot_2026-05-05_144835_954.png'),
      img('set-6', 'ScreenShot_2026-05-05_144841_940.png'),
      img('set-6', 'ScreenShot_2026-05-05_144848_022.png'),
      img('set-6', 'ScreenShot_2026-05-05_144855_319.png'),
    ],
    specs: {
      'Closure Type': 'Sliding lid (CNC-routed groove)',
      'Material': 'Pine',
      'Surface Finish': 'Natural · stain',
      'Hardware': 'None — wood-on-wood slide',
      'Interior Lining': 'Cigar cradle insert',
      'Size': '230 × 70 × 35 mm (cigar)',
      'MOQ': '200 sets (4 boxes per set)',
      'Lead Time': '25 days',
      'Branding': 'Engraved monograms · names',
    },
    customization: [
      'Engraved monogram + name + role',
      'Cigar capacity: 1 / 4 / 6',
      'Set sizes: 4 / 6 / 10 boxes',
      'Pine, paulownia, walnut',
      'Optional cigar cutter / lighter bundle',
      'Wedding-party themed art',
    ],
    packaging:
      'Sets bundled with personalized labels, OPP polybag, retail-ready inner box, 5-ply export master carton.',
    useCases: ['Wedding groomsman gifts', 'Bachelor party favors', 'Cigar lounge retail', 'Father\'s Day gifts', 'Corporate gifting', 'Anniversary'],
    related: ['pine-perfect-match-wedding-box', 'pine-adventure-engraved-sliding-box', 'walnut-sliding-box'],
  },
};

export const PRODUCT_SLUGS = Object.keys(PRODUCTS);
export const CLOSURES = Array.from(new Set(Object.values(PRODUCTS).map((p) => p.closure)));
