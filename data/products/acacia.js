// ─────────────────────────────────────────────────────────────────────────
// Acacia Wooden Boxes — 13 products
// Image paths reference /public/acacia-wood-box/<folder>/
// ─────────────────────────────────────────────────────────────────────────

const PARENT = 'acacia wood box';
const img = (folder, name) =>
  '/' + [PARENT, folder, name].map(encodeURIComponent).join('/');

export const PRODUCTS = {
  'acacia-cable-management-box': {
    slug: 'acacia-cable-management-box',
    name: 'Acacia Cable Management Box',
    closure: 'Hinged',
    tagline: 'Hide power strips and cords with warm acacia grain',
    intro:
      'A solid acacia cable management box that hides a power strip, surge protector, or charging hub on a desk or nightstand. Slot openings on each end let cords pass through cleanly while the lid keeps everything dust-free and out of sight.',
    images: [
      img('set-1', 'ScreenShot_2026-05-06_191003_071.png'),
      img('set-1', 'ScreenShot_2026-05-06_191013_044.png'),
      img('set-1', 'ScreenShot_2026-05-06_191020_055.png'),
      img('set-1', 'ScreenShot_2026-05-06_191029_221.png'),
    ],
    specs: {
      'Closure Type': 'Lift-off / hinged lid',
      'Material': 'Solid acacia hardwood',
      'Surface Finish': 'Hand-rubbed oil',
      'Cord Slots': 'Two side cutouts for power + USB cords',
      'Interior': 'Sized for standard 6-outlet power strip',
      'Size': '320 × 140 × 130 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Wood: acacia, walnut, oak, bamboo',
      'Sized for standard 4 / 6 / 8-outlet strips',
      'Optional ventilation grille',
      'Engraved logo or quote on lid',
      'Felt-pad base option',
      'Custom external dimensions',
    ],
    packaging:
      'Wrapped in OPP polybag, retail-ready inner carton, then 5-ply export master carton.',
    useCases: ['Home office', 'Bedroom nightstand', 'Living-room TV bench', 'Hotel desk amenity', 'Co-working spaces', 'Gift for tech-tidy enthusiasts'],
    related: ['acacia-8-compartment-storage-box', 'acacia-handled-cutlery-caddy', 'acacia-utensil-holder'],
  },

  'acacia-square-tissue-holder': {
    slug: 'acacia-square-tissue-holder',
    name: 'Acacia Square Tissue Holder',
    closure: 'Open-Top',
    tagline: 'Pop-up tissue cover with rich acacia grain',
    intro:
      'A square acacia tissue cover for facial tissues — drops over a standard tissue cube and gives any room an instant warm-wood upgrade. Heavy-walled construction sits stable on the counter; the open top lets tissues pull cleanly without snagging.',
    images: [
      img('2', 'ScreenShot_2026-05-06_191103_486.png'),
      img('2', 'ScreenShot_2026-05-06_191110_652.png'),
      img('2', 'ScreenShot_2026-05-06_191117_743.png'),
      img('2', 'ScreenShot_2026-05-06_191124_977.png'),
    ],
    specs: {
      'Closure Type': 'Open top (drop-over cover)',
      'Material': 'Solid acacia hardwood',
      'Surface Finish': 'Natural oil',
      'Fits': 'Standard square tissue boxes',
      'Interior': 'Sanded smooth',
      'Size': '140 × 140 × 140 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving',
    },
    customization: [
      'Wood: acacia, walnut, bamboo',
      'Square or rectangular versions',
      'Open-bottom or closed-bottom design',
      'Engraved monogram',
      'Optional felt foot pads',
      'Custom dimensions for boutique tissue brands',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Bathroom', 'Hotel guestroom', 'Spa & salon', 'Boutique retail', 'Office reception', 'Gift sets'],
    related: ['acacia-cable-management-box', 'acacia-utensil-holder', 'acacia-knife-and-utensil-block'],
  },

  'acacia-recipe-card-box': {
    slug: 'acacia-recipe-card-box',
    name: 'Acacia Recipe Card Box',
    closure: 'Hinged',
    tagline: 'Striped acacia recipe holder with stand-up flap',
    intro:
      'An acacia recipe card box with a hinged front panel that doubles as a card holder. Keep recipe cards organized inside; pop one out, fold the front, and your card stands upright while you cook — with nothing to clip or splatter.',
    images: [
      img('3', 'ScreenShot_2026-05-06_191204_037.png'),
      img('3', 'ScreenShot_2026-05-06_191211_623.png'),
      img('3', 'ScreenShot_2026-05-06_191220_703.png'),
      img('3', 'ScreenShot_2026-05-06_191230_734.png'),
      img('3', 'ScreenShot_2026-05-06_191240_413.png'),
    ],
    specs: {
      'Closure Type': 'Hinged stand-up lid',
      'Material': 'Solid acacia hardwood',
      'Surface Finish': 'Food-safe oil',
      'Capacity': '~150 standard 4×6 recipe cards',
      'Interior': 'Sanded wood',
      'Size': '180 × 130 × 110 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on front',
    },
    customization: [
      'Wood: acacia, walnut, oak',
      'Sizes for 3×5 or 4×6 cards',
      'Optional internal divider tabs',
      'Engraved family name or kitchen logo',
      'Pre-printed recipe card pack add-on',
      'Custom external dimensions',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Home kitchen', 'Wedding gift', 'Cooking-class retail', 'Heirloom recipe storage', 'Cookware bundle', 'Foodie gift sets'],
    related: ['acacia-tea-bag-box-glass-lid', 'acacia-knife-and-utensil-block', 'acacia-handled-cutlery-caddy'],
  },

  'acacia-tea-bag-box-glass-lid': {
    slug: 'acacia-tea-bag-box-glass-lid',
    name: 'Acacia Tea Bag Box with Glass Lid',
    closure: 'Hinged',
    tagline: '8-compartment acacia tea organizer with clear acrylic top',
    intro:
      'An 8-compartment acacia tea bag organizer with a clear acrylic lid — see your selection at a glance, keep tea bags fresh and organized. The hinged-lid design keeps it tidy on countertops, in pantries, or as a tea-bar centrepiece for hospitality.',
    images: [
      img('4', 'ScreenShot_2026-05-06_191317_195.png'),
      img('4', 'ScreenShot_2026-05-06_191324_586.png'),
      img('4', 'ScreenShot_2026-05-06_191331_588.png'),
      img('4', 'ScreenShot_2026-05-06_191339_788.png'),
      img('4', 'ScreenShot_2026-05-06_191348_485.png'),
    ],
    specs: {
      'Closure Type': 'Hinged glass lid',
      'Material': 'Solid acacia hardwood',
      'Surface Finish': 'Food-safe lacquer',
      'Compartments': '8 (custom 4 / 6 / 9)',
      'Lid': 'Clear acrylic insert',
      'Size': '300 × 180 × 90 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraved frame edge',
    },
    customization: [
      '4 / 6 / 8 / 9 compartment layouts',
      'Wood: acacia, bamboo, walnut',
      'Glass or clear acrylic top',
      'Removable or fixed dividers',
      'Engraved logo or label frame',
      'Optional magnetic closure',
    ],
    packaging:
      'Glass-protected foam wrap, retail box, 5-ply export master carton.',
    useCases: ['Tea brands', 'Cafe & hotel pantry', 'Office breakroom', 'Tea subscription boxes', 'Gift sets', 'Specialty grocery'],
    related: ['acacia-recipe-card-box', 'acacia-8-compartment-storage-box', 'acacia-handled-cutlery-caddy'],
  },

  'acacia-knife-and-utensil-block': {
    slug: 'acacia-knife-and-utensil-block',
    name: 'Acacia Knife & Utensil Block',
    closure: 'Open-Top',
    tagline: 'All-in-one block for knives plus a utensil bin',
    intro:
      'A two-tier acacia kitchen station — back compartment slots for chef knives, front open bin for spatulas, whisks, and stirrers. Solid hardwood construction stays planted on the counter; the contrasting acacia grain is pretty enough to leave on display.',
    images: [
      img('5', 'ScreenShot_2026-05-06_191409_592.png'),
      img('5', 'ScreenShot_2026-05-06_191421_039.png'),
      img('5', 'ScreenShot_2026-05-06_191431_385.png'),
    ],
    specs: {
      'Closure Type': 'Open-top (knife slots + bin)',
      'Material': 'Solid acacia hardwood',
      'Surface Finish': 'Food-safe oil',
      'Knife Slots': '5 universal slots + scissors slot',
      'Utensil Bin': 'Front open bin',
      'Size': '230 × 180 × 200 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on side',
    },
    customization: [
      'Universal slot or fitted knife slots',
      'Wood: acacia, walnut, bamboo',
      'Add cutting-board side dock',
      'Engraved chef name / restaurant logo',
      'Optional removable knife liner',
      'Custom external dimensions',
    ],
    packaging:
      'Foam-wrapped, retail box, 5-ply export master carton.',
    useCases: ['Home kitchen', 'Cooking class supplies', 'Premium chef gift', 'Culinary retail', 'Hospitality kitchen', 'Catering equipment'],
    related: ['acacia-utensil-holder', 'acacia-handled-cutlery-caddy', 'acacia-recipe-card-box'],
  },

  'acacia-utensil-holder': {
    slug: 'acacia-utensil-holder',
    name: 'Acacia Utensil Holder',
    closure: 'Open-Top',
    tagline: 'Round acacia crock for cooking utensils',
    intro:
      'A round acacia utensil crock with a clean band-stripe pattern in the staves. Sized for spatulas, ladles, whisks, and tongs — heavy enough to stay put, beautiful enough to leave on the counter.',
    images: [
      img('6', 'ScreenShot_2026-05-06_191454_272.png'),
      img('6', 'ScreenShot_2026-05-06_191501_820.png'),
      img('6', 'ScreenShot_2026-05-06_191509_455.png'),
      img('6', 'ScreenShot_2026-05-06_191516_551.png'),
      img('6', 'ScreenShot_2026-05-06_191525_282.png'),
    ],
    specs: {
      'Closure Type': 'Open-top crock',
      'Material': 'Solid stave-built acacia',
      'Surface Finish': 'Food-safe oil',
      'Capacity': '~12 utensils',
      'Base': 'Felt-pad protected',
      'Size': '160 × 160 × 200 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving',
    },
    customization: [
      'Diameter & height variants',
      'Wood: acacia, walnut, bamboo',
      'Stave-built or solid-turned',
      'Engraved kitchen / brand name',
      'Optional felt or cork base',
      'Light or carbonized tone',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Home kitchen', 'Hospitality FOH', 'Specialty grocery', 'Cookware bundle', 'Wedding registry', 'Foodie gift'],
    related: ['acacia-knife-and-utensil-block', 'acacia-handled-cutlery-caddy', 'acacia-square-tissue-holder'],
  },

  'acacia-swivel-salt-box': {
    slug: 'acacia-swivel-salt-box',
    name: 'Acacia Stacked Salt & Spice Box',
    closure: 'Swivel Lid',
    tagline: 'Stacked acacia salt cellar with magnet swivel lids',
    intro:
      'A stacked acacia salt and spice cellar — magnet-swivel lid on top tier, a second compartment beneath. Keep finishing salts, pepper flakes, or sugar within an arm\'s reach without the visual clutter of a spice rack.',
    images: [
      img('7', 'ScreenShot_2026-05-06_191619_719.png'),
      img('7', 'ScreenShot_2026-05-06_191626_485.png'),
      img('7', 'ScreenShot_2026-05-06_191633_690.png'),
    ],
    specs: {
      'Closure Type': 'Swivel magnetic lid',
      'Material': 'Solid acacia hardwood',
      'Surface Finish': 'Food-safe oil + wax',
      'Compartments': '2 stacked (custom 1–3)',
      'Hardware': 'Hidden neodymium magnet',
      'Size': '120 × 100 × 100 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      '1, 2, or 3-tier stack',
      'Wood: acacia, walnut, bamboo',
      'Magnetic or pin-hinge lid',
      'Engraved logo on lid',
      'Custom diameter & depth',
      'Bulk gift packaging',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Home cook', 'Chef gifting', 'Counter-top storage', 'Wedding gift', 'Catering retail', 'Hospitality FOH'],
    related: ['acacia-triple-tier-salt-box', 'acacia-utensil-holder', 'acacia-knife-and-utensil-block'],
  },

  'acacia-triple-tier-salt-box': {
    slug: 'acacia-triple-tier-salt-box',
    name: 'Acacia Triple-Tier Salt Box',
    closure: 'Swivel Lid',
    tagline: 'Three round acacia compartments with rotating cover',
    intro:
      'A three-tier round acacia salt and spice keeper — each tier rotates open under a single shared lid. Sea salt, pepper, sugar — all in one tight footprint, all closed up tight when not in use.',
    images: [
      img('8', 'ScreenShot_2026-05-06_191709_241.png'),
      img('8', 'ScreenShot_2026-05-06_191715_714.png'),
      img('8', 'ScreenShot_2026-05-06_191727_123.png'),
      img('8', 'ScreenShot_2026-05-06_191734_452.png'),
    ],
    specs: {
      'Closure Type': 'Rotating shared lid',
      'Material': 'Solid acacia hardwood',
      'Surface Finish': 'Food-safe oil',
      'Compartments': '3 round wells',
      'Capacity': '~40 g per well',
      'Size': '160 × 160 × 50 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraved lid',
    },
    customization: [
      '2, 3, or 4-compartment versions',
      'Wood: acacia, walnut, bamboo',
      'Magnetic or friction-fit lid',
      'Engraved logo on top lid',
      'Optional ceramic well inserts',
      'Custom diameter',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Home kitchen', 'Cook gifting', 'Hospitality FOH', 'Specialty food retail', 'Wedding registry', 'Catering supply'],
    related: ['acacia-swivel-salt-box', 'acacia-utensil-holder', 'acacia-tea-bag-box-glass-lid'],
  },

  'acacia-8-compartment-storage-box': {
    slug: 'acacia-8-compartment-storage-box',
    name: 'Acacia 8-Compartment Storage Box',
    closure: 'Hinged',
    tagline: 'Glass-lid acacia organizer with 8 wells',
    intro:
      'An 8-compartment acacia organizer with a glass insert lid — built for tea bags, vitamins, jewelry, hardware, or any small parts that benefit from sorting. Removable dividers let you reconfigure to suit the contents.',
    images: [
      img('9', 'ScreenShot_2026-05-06_191810_752.png'),
      img('9', 'ScreenShot_2026-05-06_191817_287.png'),
      img('9', 'ScreenShot_2026-05-06_191824_603.png'),
      img('9', 'ScreenShot_2026-05-06_191832_661.png'),
    ],
    specs: {
      'Closure Type': 'Hinged glass lid',
      'Material': 'Solid acacia hardwood',
      'Surface Finish': 'Hand-rubbed oil',
      'Compartments': '8 (removable dividers)',
      'Lid': 'Clear glass insert',
      'Size': '300 × 240 × 80 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraved frame',
    },
    customization: [
      '4 / 6 / 8 / 12 compartment layouts',
      'Wood: acacia, walnut, bamboo',
      'Removable or fixed dividers',
      'Engraved logo on frame',
      'Felt-lined wells option',
      'Custom external dimensions',
    ],
    packaging:
      'Glass-protected foam wrap, retail box, 5-ply export master carton.',
    useCases: ['Tea & vitamin storage', 'Jewelry organizer', 'Craft supplies', 'Pantry organization', 'Office desk', 'Hardware sorter'],
    related: ['acacia-tea-bag-box-glass-lid', 'acacia-recipe-card-box', 'acacia-cable-management-box'],
  },

  'acacia-cheese-knife-set-caddy': {
    slug: 'acacia-cheese-knife-set-caddy',
    name: 'Acacia Cheese & Cutlery Knife Caddy',
    closure: 'Open-Top',
    tagline: 'Compact acacia caddy for cheese knives and forks',
    intro:
      'A compact acacia caddy that holds a 4–6 piece cheese-knife set with cocktail forks, cake servers, or steak knives. Magnetic interior on knife side keeps blades aligned and tips down; the open top makes a cheese-board service feel curated.',
    images: [
      img('set-2', 'ScreenShot_2026-05-06_192055_296.png'),
      img('set-2', 'ScreenShot_2026-05-06_192102_952.png'),
      img('set-2', 'ScreenShot_2026-05-06_192111_453.png'),
      img('set-2', 'ScreenShot_2026-05-06_192120_318.png'),
    ],
    specs: {
      'Closure Type': 'Open-top dual compartment',
      'Material': 'Solid acacia hardwood',
      'Surface Finish': 'Food-safe oil',
      'Capacity': '4–6 piece cheese knife set',
      'Interior': 'Optional magnetic strip',
      'Size': '140 × 130 × 130 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving',
    },
    customization: [
      'Wood: acacia, walnut, bamboo',
      'Open-top or sliding-lid version',
      'Magnetic strip or felt liner',
      'Engraved restaurant / brand logo',
      'Optional cutlery starter set add-on',
      'Custom proportions',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Cheese-board retail', 'Wine and cheese gifting', 'Bistro service', 'Wedding registry', 'Cooking class supply', 'Gourmet retail'],
    related: ['acacia-restaurant-condiment-caddy', 'acacia-handled-cutlery-caddy', 'acacia-knife-and-utensil-block'],
  },

  'acacia-restaurant-condiment-caddy': {
    slug: 'acacia-restaurant-condiment-caddy',
    name: 'Acacia Restaurant Condiment Caddy',
    closure: 'Open-Top',
    tagline: 'Hospitality-grade caddy for table condiments',
    intro:
      'A compact acacia caddy for restaurant table service — holds a salt + pepper grinder, oil + vinegar, or any combination of small bottles and a small flower vase. Built thick to take daily wiping and bussing without warping.',
    images: [
      img('set-3', 'ScreenShot_2026-05-06_192144_463.png'),
      img('set-3', 'ScreenShot_2026-05-06_192151_421.png'),
      img('set-3', 'ScreenShot_2026-05-06_192201_161.png'),
      img('set-3', 'ScreenShot_2026-05-06_192219_279.png'),
    ],
    specs: {
      'Closure Type': 'Open-top tray with handle cutouts',
      'Material': 'Solid acacia hardwood',
      'Surface Finish': 'Food-safe oil + commercial lacquer',
      'Capacity': '2–4 small bottles + utensils',
      'Handle': 'Side cutout grips',
      'Size': '180 × 130 × 90 mm (custom)',
      'MOQ': '500 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraved on long side',
    },
    customization: [
      'Wood: acacia, walnut, bamboo',
      'Custom interior dividers',
      'Engraved restaurant / table number',
      'Bus-tray or compact table size',
      'Optional vase tube insert',
      'Bulk-pack pricing',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton — bus-tray-friendly bulk packs available.',
    useCases: ['Restaurant tabletop', 'Cafe service', 'Hotel breakfast bar', 'Catering events', 'Bistro retail', 'Hospitality supply'],
    related: ['acacia-cheese-knife-set-caddy', 'acacia-handled-cutlery-caddy', 'acacia-utensil-holder'],
  },

  'acacia-ice-bucket': {
    slug: 'acacia-ice-bucket',
    name: 'Acacia Hexagonal Ice Bucket',
    closure: 'Lift-Off Lid',
    tagline: 'Faceted acacia ice bucket with stainless liner',
    intro:
      'A hexagonal stave-built acacia ice bucket with a removable stainless steel inner liner — pour ice in, lift the liner out to wash. The faceted exterior catches light beautifully on bar tops and dining tables.',
    images: [
      img('set-4', 'ScreenShot_2026-05-06_192305_566.png'),
      img('set-4', 'ScreenShot_2026-05-06_192312_668.png'),
      img('set-4', 'ScreenShot_2026-05-06_192320_573.png'),
      img('set-4', 'ScreenShot_2026-05-06_192328_788.png'),
    ],
    specs: {
      'Closure Type': 'Lift-off handled lid',
      'Material': 'Stave-built acacia + stainless steel insert',
      'Surface Finish': 'Food-safe oil',
      'Capacity': '~3 L (custom)',
      'Insert': 'Removable stainless liner',
      'Size': '180 × 180 × 240 mm (custom)',
      'MOQ': '200 pcs',
      'Lead Time': '35 days',
      'Branding': 'Laser engraving on side',
    },
    customization: [
      'Wood: acacia, walnut, bamboo',
      'Hexagonal, round, or square build',
      'Custom liner sizes',
      'Engraved logo or quote',
      'Bar-set add-ons (tongs, scoop)',
      'Polished or matte stainless liner',
    ],
    packaging:
      'Foam-wrapped, retail box, 5-ply export master carton.',
    useCases: ['Bar service', 'Wine bucket', 'Champagne presentation', 'Hospitality FOH', 'Wedding gifting', 'Hotel mini bar'],
    related: ['acacia-restaurant-condiment-caddy', 'acacia-utensil-holder', 'acacia-handled-cutlery-caddy'],
  },

  'acacia-handled-cutlery-caddy': {
    slug: 'acacia-handled-cutlery-caddy',
    name: 'Acacia Handled Cutlery Caddy',
    closure: 'Open-Top',
    tagline: 'Carry-handle acacia caddy for cutlery and napkins',
    intro:
      'A handled acacia cutlery caddy with three sections — forks, spoons, knives — and a center handle. Engraved utensil icons make sorting effortless for a buffet, BBQ, or party setup. Built solid for repeat catering use.',
    images: [
      img('set-5', 'ScreenShot_2026-05-06_192434_875.png'),
      img('set-5', 'ScreenShot_2026-05-06_192443_709.png'),
      img('set-5', 'ScreenShot_2026-05-06_192452_161.png'),
      img('set-5', 'ScreenShot_2026-05-06_192502_840.png'),
    ],
    specs: {
      'Closure Type': 'Open-top with center handle',
      'Material': 'Solid acacia hardwood',
      'Surface Finish': 'Food-safe oil',
      'Compartments': '3 (custom 4 / 5)',
      'Branding': 'Engraved utensil icons',
      'Size': '320 × 180 × 200 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding Add-On': 'Custom logo on side',
    },
    customization: [
      'Wood: acacia, walnut, pine',
      '3, 4, or 5 sections',
      'Custom engraved icons / labels',
      'Solid or rope handle option',
      'Engraved logo or restaurant name',
      'Custom proportions',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Buffet service', 'BBQ & picnic', 'Catering events', 'Cafe condiment station', 'Wedding rental', 'Hospitality FOH'],
    related: ['acacia-restaurant-condiment-caddy', 'acacia-cheese-knife-set-caddy', 'acacia-utensil-holder'],
  },
};

export const PRODUCT_SLUGS = Object.keys(PRODUCTS);
export const CLOSURES = Array.from(new Set(Object.values(PRODUCTS).map((p) => p.closure)));
