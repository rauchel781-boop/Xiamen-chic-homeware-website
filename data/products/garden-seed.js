// ─────────────────────────────────────────────────────────────────────────
// Garden & Seed Boxes — 9 products
// Image paths reference /public/garden-seeds-box/<folder>/
// ─────────────────────────────────────────────────────────────────────────

const PARENT = 'Garden&Seeds box';
const img = (folder, name) =>
  '/' + [PARENT, folder, name].map(encodeURIComponent).join('/');

export const PRODUCTS = {
  'bamboo-seed-organizer-box': {
    slug: 'bamboo-seed-organizer-box',
    name: 'Bamboo Seed Organizer Box',
    closure: 'Hinged',
    tagline: 'Compartmented bamboo box for seed packets',
    intro:
      'A compartmented bamboo seed organizer with hinged lid and labeled slot dividers. Holds standard seed packets upright, alphabetically or by season. Ideal for serious gardeners and seed-merchant retail.',
    images: [
      img('Bamboo Seed Organizer Box', 'Bamboo Seed Organizer Box  (1).png'),
      img('Bamboo Seed Organizer Box', 'Bamboo Seed Organizer Box  (2).png'),
      img('Bamboo Seed Organizer Box', 'Bamboo Seed Organizer Box  (3).png'),
      img('Bamboo Seed Organizer Box', 'Bamboo Seed Organizer Box  (4).png'),
      img('Bamboo Seed Organizer Box', 'Bamboo Seed Organizer Box  (5).png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid',
      'Material': 'Carbonized moso bamboo',
      'Surface Finish': 'Natural satin oil',
      'Hardware': 'Steel pin hinges',
      'Interior Lining': 'Slot dividers (8–12 sections)',
      'Size': '300 × 200 × 100 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Compartments: 6 / 8 / 12 / custom',
      'Pre-printed alphabet or season tabs',
      'Bamboo, paulownia, or pine',
      'Engraved branding on lid',
      'Optional seed-pack starter kit',
      'Magnetic or hinged lid',
    ],
    packaging:
      'Wrapped in OPP polybag, retail box, then 5-ply export master carton.',
    useCases: ['Garden centers', 'Seed retailers', 'Allotment gifts', 'Greenhouse supply', 'Eco-living retail', 'Garden subscription kits'],
    related: ['bamboo-seed-storage-box-with-adjustable-removable-dividers', 'wooden-herb-planter-box-with-sliding-lid', 'wooden-succulent-planter-box'],
  },

  'bamboo-seed-storage-box-with-adjustable-removable-dividers': {
    slug: 'bamboo-seed-storage-box-with-adjustable-removable-dividers',
    name: 'Bamboo Seed Box with Adjustable Dividers',
    closure: 'Hinged',
    tagline: 'Removable dividers adapt to any seed packet size',
    intro:
      'A bamboo seed storage box with fully removable dividers — slot them in or take them out to fit any packet height or width. Perfect for gardeners who collect seeds across seasons and want flexible storage.',
    images: [
      img('Bamboo Seed Storage Box with Adjustable Removable Dividers', 'Bamboo Seed Storage Box with Adjustable Removable Dividers (1).png'),
      img('Bamboo Seed Storage Box with Adjustable Removable Dividers', 'Bamboo Seed Storage Box with Adjustable Removable Dividers (2).png'),
      img('Bamboo Seed Storage Box with Adjustable Removable Dividers', 'Bamboo Seed Storage Box with Adjustable Removable Dividers (3).png'),
      img('Bamboo Seed Storage Box with Adjustable Removable Dividers', 'Bamboo Seed Storage Box with Adjustable Removable Dividers (4).png'),
      img('Bamboo Seed Storage Box with Adjustable Removable Dividers', 'Bamboo Seed Storage Box with Adjustable Removable Dividers (5).png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid',
      'Material': 'Natural moso bamboo',
      'Surface Finish': 'Food-safe oil',
      'Hardware': 'Steel pin hinges',
      'Interior Lining': 'Removable bamboo dividers',
      'Size': '320 × 220 × 110 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Up to 16 removable dividers',
      'Bamboo or paulownia construction',
      'Engraved gardening quote on lid',
      'Magnetic or hook clasp',
      'Optional seed-saver gift bundle',
      'Custom size for retail SKUs',
    ],
    packaging:
      'Foam-wrapped, retail box, then 5-ply export master carton.',
    useCases: ['Heirloom seed savers', 'Garden subscription kits', 'Allotment gifts', 'Garden retail', 'Eco-living', 'Wedding favors'],
    related: ['bamboo-seed-organizer-box', 'wooden-herb-planter-box-with-sliding-lid', 'set-of-3-round-wood-plant-stand-risers'],
  },

  'rustic-wooden-planter-box': {
    slug: 'rustic-wooden-planter-box',
    name: 'Rustic Wooden Planter Box',
    closure: 'Lift-off',
    tagline: 'Knotty pine planter with natural drainage',
    intro:
      'A simple, sturdy rustic planter built from knotty pine with pre-drilled drainage holes and a torched-rope finish that ages beautifully. Ideal for herb gardens, succulents, or seasonal floral arrangements.',
    images: [
      img('Rustic Wooden Planter Box', 'Rustic Wooden Planter Box (1).png'),
      img('Rustic Wooden Planter Box', 'Rustic Wooden Planter Box (2).png'),
      img('Rustic Wooden Planter Box', 'Rustic Wooden Planter Box (3).png'),
      img('Rustic Wooden Planter Box', 'Rustic Wooden Planter Box (4).png'),
    ],
    specs: {
      'Closure Type': 'Open-top planter',
      'Material': 'Knotty pine (rot-resistant)',
      'Surface Finish': 'Torched · oiled · raw',
      'Hardware': 'Galvanized brad nails',
      'Interior Lining': 'Optional plastic liner',
      'Size': '500 × 200 × 200 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '25 days',
      'Branding': 'Wood-burned brand · laser engraving',
    },
    customization: [
      'Sizes from herb-pot to large patio scale',
      'Optional plastic liner for indoor use',
      'Torched, whitewashed, or stained finish',
      'Rope handles or routed grip',
      'Engraved farm or brand name',
      'Stackable for retail display',
    ],
    packaging:
      'Stacked in groups of 4–6 with foam separators, then 5-ply export master carton.',
    useCases: ['Garden centers', 'Patio retail', 'Wedding decor rental', 'Herb gardening', 'Restaurant tabletops', 'Florist supply'],
    related: ['wooden-flower-planter-box-with-handle', 'wooden-succulent-planter-box', 'wooden-wheelbarrow-flower-planter'],
  },

  'wooden-flower-planter-box-with-handle': {
    slug: 'wooden-flower-planter-box-with-handle',
    name: 'Wooden Flower Planter Box with Handle',
    closure: 'Lift-off',
    tagline: 'Carry-handle planter for herbs, flowers, or display',
    intro:
      'A pine planter with an integrated arched carry handle — equally at home indoors as a tabletop centerpiece or outdoors in the garden. Pre-drilled drainage and a sealed interior for plant safety.',
    images: [
      img('Wooden Flower Planter Box with Handle', 'Wooden Flower Planter Box with Handle (1).png'),
      img('Wooden Flower Planter Box with Handle', 'Wooden Flower Planter Box with Handle (2).png'),
      img('Wooden Flower Planter Box with Handle', 'Wooden Flower Planter Box with Handle (3).png'),
      img('Wooden Flower Planter Box with Handle', 'Wooden Flower Planter Box with Handle (4).png'),
    ],
    specs: {
      'Closure Type': 'Open-top planter w/ arched handle',
      'Material': 'Solid pine',
      'Surface Finish': 'Whitewash · stain · raw',
      'Hardware': 'Sanded wood handle',
      'Interior Lining': 'Sealed lacquer (water-safe)',
      'Size': '350 × 150 × 220 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '25 days',
      'Branding': 'Wood-burned · screen-printed',
    },
    customization: [
      'Solo handle or twin-handle configuration',
      'Sealed interior or open base with drainage',
      'Whitewash, raw, stained, or painted',
      'Engraved or screen-printed branding',
      'Compartment dividers for herb sets',
      'Sized for table centerpiece or floor planter',
    ],
    packaging:
      'Stacked in groups of 6, foam-separated, packed in 5-ply export master carton.',
    useCases: ['Florist retail', 'Wedding centerpieces', 'Herb gift sets', 'Restaurant tabletop greenery', 'Garden subscription kits', 'Window-sill planters'],
    related: ['rustic-wooden-planter-box', 'wooden-herb-planter-box-with-sliding-lid', 'wooden-succulent-planter-box'],
  },

  'wooden-herb-planter-box-with-sliding-lid': {
    slug: 'wooden-herb-planter-box-with-sliding-lid',
    name: 'Wooden Herb Planter with Sliding Lid',
    closure: 'Sliding',
    tagline: 'Sliding-lid herb planter with chalkboard label',
    intro:
      'A 3-compartment indoor herb planter with a sliding lid that doubles as a serving tray, plus a chalkboard front for naming the herbs. Perfect for kitchen window-sills and herb-of-the-month gift programs.',
    images: [
      img('Wooden Herb Planter Box with Sliding Lid', 'Wooden Herb Planter Box with Sliding Lid (1).png'),
      img('Wooden Herb Planter Box with Sliding Lid', 'Wooden Herb Planter Box with Sliding Lid (2).png'),
      img('Wooden Herb Planter Box with Sliding Lid', 'Wooden Herb Planter Box with Sliding Lid (3).png'),
      img('Wooden Herb Planter Box with Sliding Lid', 'Wooden Herb Planter Box with Sliding Lid (4).png'),
    ],
    specs: {
      'Closure Type': 'Sliding lid (doubles as tray)',
      'Material': 'Pine or paulownia',
      'Surface Finish': 'Stain · whitewash · natural',
      'Hardware': 'None — wood-on-wood slide',
      'Interior Lining': '3 sealed compartments + drainage',
      'Size': '450 × 130 × 130 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Chalkboard front + laser logo',
    },
    customization: [
      'Number of compartments: 2 / 3 / 4',
      'Chalkboard or porcelain label front',
      'Pine, paulownia, or bamboo',
      'Sealed interior or removable galvanized inserts',
      'Engraved logo on lid',
      'Optional seed-bundle gift set',
    ],
    packaging:
      'Wrapped in foam, then 5-ply export master carton.',
    useCases: ['Indoor herb gardening', 'Cooking gift sets', 'Garden subscription', 'Kitchen retail', 'Restaurant tabletop greenery', 'Wedding favors'],
    related: ['wooden-succulent-planter-box', 'bamboo-seed-organizer-box', 'set-of-3-round-wood-plant-stand-risers'],
  },

  'wooden-succulent-planter-box': {
    slug: 'wooden-succulent-planter-box',
    name: 'Wooden Succulent Planter Box',
    closure: 'Lift-off',
    tagline: 'Compact pine planter for succulent arrangements',
    intro:
      'A compact pine planter sized for succulent and cactus arrangements — typically a single rectangular planter holding 3 to 5 small specimens, with sealed interior and pre-drilled drainage.',
    images: [
      img('Wooden Succulent Planter Box', 'Wooden Succulent Planter Box (1).png'),
      img('Wooden Succulent Planter Box', 'Wooden Succulent Planter Box (2).png'),
      img('Wooden Succulent Planter Box', 'Wooden Succulent Planter Box (3).png'),
      img('Wooden Succulent Planter Box', 'Wooden Succulent Planter Box (4).png'),
    ],
    specs: {
      'Closure Type': 'Open-top planter',
      'Material': 'Pine or paulownia',
      'Surface Finish': 'Whitewash · stain · raw',
      'Hardware': 'Concealed brad fixings',
      'Interior Lining': 'Sealed lacquer + drainage holes',
      'Size': '250 × 100 × 80 mm (custom)',
      'MOQ': '500 pcs',
      'Lead Time': '25 days',
      'Branding': 'Engraved or screen-printed front face',
    },
    customization: [
      'Single, double, or triple planter wells',
      'Whitewash, raw, stained finishes',
      'Optional pebble or moss top dressing',
      'Custom logo or quote engraving',
      'Square, rectangular, or oval footprint',
      'Wedding-favor or retail-pack quantities',
    ],
    packaging:
      'Stacked in groups of 12, foam-separated, packed in 5-ply export master carton.',
    useCases: ['Wedding favors', 'Florist retail', 'Office desk decor', 'Hostess gifts', 'Garden gift sets', 'Cafe tabletop greenery'],
    related: ['rustic-wooden-planter-box', 'wooden-flower-planter-box-with-handle', 'wooden-herb-planter-box-with-sliding-lid'],
  },

  'wooden-wheelbarrow-flower-planter': {
    slug: 'wooden-wheelbarrow-flower-planter',
    name: 'Wooden Wheelbarrow Flower Planter',
    closure: 'Lift-off',
    tagline: 'Decorative wheelbarrow planter for porch and patio',
    intro:
      'A whimsical wheelbarrow-shaped wooden planter that doubles as garden decor. Solid pine construction with rolling wheel and twin handles. Holds floral arrangements, herbs, or seasonal seedlings.',
    images: [
      img('Wooden Wheelbarrow Flower Planter', 'Wooden Wheelbarrow Flower Planter (1).png'),
      img('Wooden Wheelbarrow Flower Planter', 'Wooden Wheelbarrow Flower Planter (2).png'),
      img('Wooden Wheelbarrow Flower Planter', 'Wooden Wheelbarrow Flower Planter (3).png'),
      img('Wooden Wheelbarrow Flower Planter', 'Wooden Wheelbarrow Flower Planter (4).png'),
    ],
    specs: {
      'Closure Type': 'Open-top planter w/ wheel',
      'Material': 'Solid pine',
      'Surface Finish': 'Stain · whitewash · raw',
      'Hardware': 'Wooden axle wheel · twin handles',
      'Interior Lining': 'Sealed interior + drainage',
      'Size': '700 × 320 × 380 mm (custom)',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Wood-burned · stenciled · engraved',
    },
    customization: [
      'Sizes from tabletop to floor scale',
      'Functional or decorative wheel',
      'Whitewash, distressed, or stained finish',
      'Engraved family name or farm name',
      'Optional matching tricycle planter set',
      'Indoor or outdoor finish',
    ],
    packaging:
      'Wheel and handles flat-packed for shipping efficiency, foam-wrapped, packed in 5-ply export master carton.',
    useCases: ['Garden center retail', 'Outdoor decor', 'Wedding decor rental', 'Country-style home gifts', 'Patio centerpiece', 'Holiday seasonal display'],
    related: ['rustic-tricycle-bicycle-planter', 'rustic-wooden-planter-box', 'wooden-flower-planter-box-with-handle'],
  },

  'rustic-tricycle-bicycle-planter': {
    slug: 'rustic-tricycle-bicycle-planter',
    name: 'Rustic Tricycle / Bicycle Planter',
    closure: 'Lift-off',
    tagline: 'Decorative bike-style planter for porch decor',
    intro:
      'A charming tricycle-shaped wooden planter — handle bars, seat, and rolling wheels — with a planter basket for flowers or herbs. The kind of garden accent that lives on the porch year-round.',
    images: [
      img('Rustic Tricycle Bicycle Planter', 'Rustic Tricycle Bicycle Planter (1).png'),
      img('Rustic Tricycle Bicycle Planter', 'Rustic Tricycle Bicycle Planter (2).png'),
      img('Rustic Tricycle Bicycle Planter', 'Rustic Tricycle Bicycle Planter (3).png'),
      img('Rustic Tricycle Bicycle Planter', 'Rustic Tricycle Bicycle Planter (4).png'),
      img('Rustic Tricycle Bicycle Planter', 'Rustic Tricycle Bicycle Planter (5).png'),
    ],
    specs: {
      'Closure Type': 'Open-top planter w/ frame',
      'Material': 'Solid pine',
      'Surface Finish': 'Distressed stain · whitewash',
      'Hardware': 'Wooden wheels & frame fixings',
      'Interior Lining': 'Sealed interior + drainage',
      'Size': '600 × 280 × 320 mm (custom)',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Wood-burned · stenciled · engraved',
    },
    customization: [
      'Tricycle, bicycle, or wheelbarrow style',
      'Functional or decorative wheels',
      'Distressed, painted, or natural finish',
      'Engraved family or farm name',
      'Indoor or outdoor finish',
      'Holiday seasonal painted variants',
    ],
    packaging:
      'Flat-packed for shipping efficiency, foam-wrapped, packed in 5-ply export master carton with assembly instructions.',
    useCases: ['Garden center retail', 'Front porch decor', 'Wedding decor rental', 'Holiday seasonal display', 'Country home gifts', 'Florist retail'],
    related: ['wooden-wheelbarrow-flower-planter', 'rustic-wooden-planter-box', 'wooden-flower-planter-box-with-handle'],
  },

  'set-of-3-round-wood-plant-stand-risers': {
    slug: 'set-of-3-round-wood-plant-stand-risers',
    name: 'Set of 3 Round Plant Stand Risers',
    closure: 'Lift-off',
    tagline: 'Stackable round risers for tiered plant display',
    intro:
      'A set of three round wooden plant risers in graduated heights — perfect for layered plant display on a balcony, patio, or sunroom. Use individually or stack/scatter for tiered arrangements.',
    images: [
      img('Set of 3 Round Wood Plant Stand Risers', 'Set of 3 Round Wood Plant Stand Risers (1).png'),
      img('Set of 3 Round Wood Plant Stand Risers', 'Set of 3 Round Wood Plant Stand Risers (2).png'),
      img('Set of 3 Round Wood Plant Stand Risers', 'Set of 3 Round Wood Plant Stand Risers (3).png'),
      img('Set of 3 Round Wood Plant Stand Risers', 'Set of 3 Round Wood Plant Stand Risers (4).png'),
    ],
    specs: {
      'Closure Type': 'Open plant riser (set of 3)',
      'Material': 'Solid pine or acacia',
      'Surface Finish': 'Stain · raw · oiled',
      'Hardware': 'Concealed wood pegs',
      'Interior Lining': 'N/A (display surface)',
      'Size': '3 risers, 100 / 150 / 200 mm tall',
      'MOQ': '500 sets',
      'Lead Time': '25 days',
      'Branding': 'Engraved logo on rim',
    },
    customization: [
      'Set of 3 / 5 / 7 risers',
      'Round, square, or hexagonal',
      'Pine, acacia, or walnut',
      'Stained, oiled, or whitewashed',
      'Engraved branding on rim',
      'Custom size sets per retailer',
    ],
    packaging:
      'Sets nested for shipping efficiency, OPP polybag, packed in 5-ply export master carton.',
    useCases: ['Plant retail', 'Garden center display', 'Indoor jungle decor', 'Floral display', 'Cake stand alternative', 'Trade show booths'],
    related: ['wooden-succulent-planter-box', 'rustic-wooden-planter-box', 'wooden-flower-planter-box-with-handle'],
  },
};

export const PRODUCT_SLUGS = Object.keys(PRODUCTS);
export const CLOSURES = Array.from(new Set(Object.values(PRODUCTS).map((p) => p.closure)));
