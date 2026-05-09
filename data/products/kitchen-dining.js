// ─────────────────────────────────────────────────────────────────────────
// Kitchen & Dining Boxes — 8 products
// Image paths reference /public/kitchen-dining-boxes/<folder>/
// Encoding handled centrally by `img()`.
// ─────────────────────────────────────────────────────────────────────────

const PARENT = 'Kitchen & Dining boxes';
const img = (folder, name) =>
  '/' + [PARENT, folder, name].map(encodeURIComponent).join('/');

export const PRODUCTS = {
  'magnetic-wooden-salt-box': {
    slug: 'magnetic-wooden-salt-box',
    name: 'Magnetic Wooden Salt Box',
    closure: 'Magnetic',
    tagline: 'Acacia salt cellar with snap-shut magnetic lid',
    intro:
      'A countertop salt cellar carved from a single block of acacia hardwood. The magnetic flip-lid stays put when not in use, and snaps open one-handed while cooking. Food-safe lacquer interior, raw oiled exterior.',
    images: [
      img('magnetic-wooden-salt-box', 'ScreenShot_2026-05-04_221858_701.png'),
      img('magnetic-wooden-salt-box', 'ScreenShot_2026-05-04_221914_313.png'),
      img('magnetic-wooden-salt-box', 'ScreenShot_2026-05-04_221923_172.png'),
      img('magnetic-wooden-salt-box', 'ScreenShot_2026-05-04_221931_239.png'),
    ],
    specs: {
      'Closure Type': 'Magnetic flip lid',
      'Material': 'Solid acacia hardwood',
      'Surface Finish': 'Mineral oil + beeswax (food-safe)',
      'Hardware': 'Concealed neodymium magnet pair',
      'Interior Lining': 'Sealed food-safe lacquer',
      'Size': '120 × 120 × 110 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid surface',
    },
    customization: [
      'Wood: acacia, walnut, bamboo, oak',
      'Single or twin compartment (salt + pepper)',
      'Hinged or magnetic flip lid',
      'Round or square footprint',
      'Engraved logo or recipe inscription',
      'Gift-ready outer carton',
    ],
    packaging:
      'Wrapped in OPP polybag with food-safe insert, packed in retail-ready inner box, then 5-ply export master carton.',
    useCases: ['Home kitchen', 'Restaurant tabletops', 'Chef gift sets', 'Hotel hospitality', 'Specialty food retail', 'Spice subscription'],
    related: ['acacia-utensil-box', 'drawer-spice-organizer', 'magnetic-wooden-salt-box'],
  },

  'acacia-utensil-box': {
    slug: 'acacia-utensil-box',
    name: 'Acacia Wood Utensil Box',
    closure: 'Lift-off',
    tagline: 'Tabletop caddy for cutlery, napkins, and condiments',
    intro:
      'A solid acacia utensil and condiment caddy with built-in dividers — perfect for casual dining tables, picnics, and outdoor entertaining. Holds cutlery on one side and napkins or condiments on the other.',
    images: [
      img('acacia-utensil box', 'ScreenShot_2026-05-04_222248_065.png'),
      img('acacia-utensil box', 'ScreenShot_2026-05-04_222258_952.png'),
      img('acacia-utensil box', 'ScreenShot_2026-05-04_222307_332.png'),
      img('acacia-utensil box', 'ScreenShot_2026-05-04_222319_666.png'),
    ],
    specs: {
      'Closure Type': 'Open-top with carry handle',
      'Material': 'Solid acacia hardwood',
      'Surface Finish': 'Food-safe oil + matte lacquer',
      'Hardware': 'Routed-through wooden handle',
      'Interior Lining': '3-compartment open layout',
      'Size': '300 × 200 × 160 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving · branding plate',
    },
    customization: [
      '2 / 3 / 4 compartment layouts',
      'Wood: acacia, bamboo, oak, walnut',
      'Routed wood handle or rope handle',
      'Removable dividers',
      'Engraved logo on handle face',
      'Painted or stained finish options',
    ],
    packaging:
      'Stacked in groups of 6, wrapped in foam, then export master carton with brand label.',
    useCases: ['Cafes & bistros', 'Picnic gift sets', 'Family dining tables', 'BBQ accessories', 'Hospitality buffet', 'Wedding rentals'],
    related: ['bamboo-cutlery-box-sliding', 'rustic-wood-egg-holder-tray', 'sapele-wooden-napkin-holder'],
  },

  'bamboo-cutlery-box-sliding': {
    slug: 'bamboo-cutlery-box-sliding',
    name: 'Bamboo Sliding-Lid Cutlery Box',
    closure: 'Sliding',
    tagline: 'Modular bamboo drawer for fine cutlery storage',
    intro:
      'A bamboo cutlery storage box with a smooth sliding lid and felt-lined compartments to keep silverware quiet and scratch-free. Sized to fit standard kitchen drawers, available in 4-, 6-, and 8-compartment layouts.',
    images: [
      img('bamboo-cutlery-box-sliding', 'ScreenShot_2026-05-04_222433_414.png'),
      img('bamboo-cutlery-box-sliding', 'ScreenShot_2026-05-04_222445_432.png'),
      img('bamboo-cutlery-box-sliding', 'ScreenShot_2026-05-04_222453_490.png'),
      img('bamboo-cutlery-box-sliding', 'ScreenShot_2026-05-04_222500_499.png'),
      img('bamboo-cutlery-box-sliding', 'ScreenShot_2026-05-04_222510_823.png'),
    ],
    specs: {
      'Closure Type': 'Sliding bamboo lid',
      'Material': 'Carbonized moso bamboo',
      'Surface Finish': 'Natural satin · food-safe oil',
      'Hardware': 'None — wood-on-wood slide',
      'Interior Lining': 'Felt-lined compartments (optional)',
      'Size': '380 × 250 × 60 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      '4 / 6 / 8 / 12 compartment layouts',
      'Felt or fabric-lined compartments',
      'Carbonized or natural bamboo finish',
      'Stackable design with locating ridges',
      'Engraved logo or kitchen quote on lid',
      'Sized to common drawer depths (EU/US/AU)',
    ],
    packaging:
      'Wrapped in foam sleeve, retail box, then 5-ply export master carton.',
    useCases: ['Kitchen drawers', 'Catering supplies', 'Chef gift sets', 'Eco-living retail', 'Hotel pantries', 'Cooking schools'],
    related: ['drawer-spice-organizer', 'hinged-bamboo-bread-bin', 'wood-kitchen-utensil-holder-with-spice-drawer'],
  },

  'drawer-spice-organizer': {
    slug: 'drawer-spice-organizer',
    name: 'Drawer Spice Organizer',
    closure: 'Drawer',
    tagline: '3-tier pull-out spice rack with 24+ jar slots',
    intro:
      'A multi-tier drawer-style spice organizer with angled jar slots that present every label face-up when the drawer pulls out. Sized to fit standard 60 cm or 80 cm cabinet drawers; bamboo or oak construction.',
    images: [
      img('drawer-spice-organizer', 'ScreenShot_2026-05-04_222603_935.png'),
      img('drawer-spice-organizer', 'ScreenShot_2026-05-04_222614_018.png'),
      img('drawer-spice-organizer', 'ScreenShot_2026-05-04_222624_567.png'),
      img('drawer-spice-organizer', 'ScreenShot_2026-05-04_222632_950.png'),
    ],
    specs: {
      'Closure Type': 'Pull-out drawer insert',
      'Material': 'Bamboo or solid oak',
      'Surface Finish': 'Food-safe oil + matte lacquer',
      'Hardware': 'Wood runners (or ball-bearing slides)',
      'Interior Lining': 'Angled jar slots (24–36 jars)',
      'Size': '600 × 400 mm (custom drawer fit)',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on front face',
    },
    customization: [
      'Drawer-insert or freestanding configurations',
      '12 / 24 / 36 jar slot capacities',
      'Custom drawer dimensions (EU/US/AU)',
      'Bamboo, oak, or walnut',
      'Optional jar set bundle (4 oz spice jars)',
      'Engraved labels per slot',
    ],
    packaging:
      'Foam-wrapped, retail-ready inner carton, 5-ply export master carton.',
    useCases: ['Modern kitchens', 'Spice merchant retail', 'Chef gifting', 'Apartment living', 'Cooking class kits', 'Hotel galleys'],
    related: ['bamboo-cutlery-box-sliding', 'magnetic-wooden-salt-box', 'wood-kitchen-utensil-holder-with-spice-drawer'],
  },

  'hinged-bamboo-bread-bin': {
    slug: 'hinged-bamboo-bread-bin',
    name: 'Hinged Bamboo Bread Bin',
    closure: 'Hinged',
    tagline: 'Vented countertop bread storage with cutting-board lid',
    intro:
      'A bamboo bread bin with a hinged lid that doubles as a cutting board. Vented base keeps loaves fresh; food-safe finish stands up to daily kitchen use. Single- and double-loaf sizes available.',
    images: [
      img('hinged-bamboo-bread-bin', 'ScreenShot_2026-05-04_222718_655.png'),
      img('hinged-bamboo-bread-bin', 'ScreenShot_2026-05-04_222733_303.png'),
      img('hinged-bamboo-bread-bin', 'ScreenShot_2026-05-04_222743_958.png'),
      img('hinged-bamboo-bread-bin', 'ScreenShot_2026-05-04_222754_234.png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid (cutting-board top)',
      'Material': 'Carbonized moso bamboo',
      'Surface Finish': 'Food-safe oil + beeswax',
      'Hardware': 'Steel pin hinges',
      'Interior Lining': 'Vented bamboo slats',
      'Size': '400 × 280 × 200 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving · brand plate',
    },
    customization: [
      'Single / double loaf size',
      'Lid as cutting board or simple lift-top',
      'Vented or solid base',
      'Bamboo, acacia, or oak',
      'Custom branding burned or laser-engraved',
      'Optional drawer for crumbs',
    ],
    packaging:
      'Foam-wrapped, packed flat in retail carton, then 5-ply export master carton.',
    useCases: ['Bakery retail', 'Modern home kitchens', 'Hotel breakfast bars', 'Cafes', 'Cooking gift sets', 'Eco living retail'],
    related: ['acacia-utensil-box', 'wood-kitchen-utensil-holder-with-spice-drawer', 'rustic-wood-egg-holder-tray'],
  },

  'rustic-wood-egg-holder-tray': {
    slug: 'rustic-wood-egg-holder-tray',
    name: 'Rustic Wood Egg Holder Tray',
    closure: 'Lift-off',
    tagline: 'Farmhouse egg tray with side handles for 12 or 18',
    intro:
      'A rustic farmhouse-style wooden egg tray with cushioned cup holes and routed side handles. Holds 12 or 18 eggs upright; perfect for kitchen counters, farm shops, and chicken-keeper gift sets.',
    images: [
      img('Rustic Wood Egg Holder Tray with Handles', 'ScreenShot_2026-05-04_223321_511.png'),
      img('Rustic Wood Egg Holder Tray with Handles', 'ScreenShot_2026-05-04_223331_324.png'),
      img('Rustic Wood Egg Holder Tray with Handles', 'ScreenShot_2026-05-04_223340_688.png'),
      img('Rustic Wood Egg Holder Tray with Handles', 'ScreenShot_2026-05-04_223349_625.png'),
    ],
    specs: {
      'Closure Type': 'Open tray with side handles',
      'Material': 'Solid pine (paulownia available)',
      'Surface Finish': 'Distressed stain · raw · whitewash',
      'Hardware': 'Routed-through finger handles',
      'Interior Lining': 'Drilled-cushioned egg holes',
      'Size': '12-egg or 18-egg capacity',
      'MOQ': '500 pcs',
      'Lead Time': '25 days',
      'Branding': 'Laser engraving · branding burn',
    },
    customization: [
      '12 / 18 / 24 egg capacities',
      'Pine, paulownia, or acacia',
      'Distressed, whitewashed, or natural finish',
      'Engraved farm name or quote',
      'Stackable design for retail display',
      'Available with matching kitchen tray',
    ],
    packaging:
      'Bubble-wrapped in pairs, packed in 5-ply export master carton with carton labels.',
    useCases: ['Farm shops', 'Backyard chicken keepers', 'Country-style decor', 'Egg-merchant retail', 'Cooking gift sets', 'Bed & breakfast'],
    related: ['sapele-wooden-napkin-holder', 'acacia-utensil-box', 'hinged-bamboo-bread-bin'],
  },

  'sapele-wooden-napkin-holder': {
    slug: 'sapele-wooden-napkin-holder',
    name: 'Sapele Wooden Napkin Holder',
    closure: 'Lift-off',
    tagline: 'Weighted napkin holder with brass tension arm',
    intro:
      'A solid sapele hardwood napkin holder with a weighted brass tension arm that keeps the stack tidy and accessible. The deep red-brown grain of sapele looks at home in modern and traditional dining rooms alike.',
    images: [
      img('Sapele Wooden Napkin Holder', 'ScreenShot_2026-05-04_222857_540.png'),
      img('Sapele Wooden Napkin Holder', 'ScreenShot_2026-05-04_222906_547.png'),
      img('Sapele Wooden Napkin Holder', 'ScreenShot_2026-05-04_222915_151.png'),
      img('Sapele Wooden Napkin Holder', 'ScreenShot_2026-05-04_222923_082.png'),
    ],
    specs: {
      'Closure Type': 'Open holder with tension arm',
      'Material': 'Solid sapele (walnut available)',
      'Surface Finish': 'Hand-rubbed oil + wax',
      'Hardware': 'Solid brass tension arm + weight',
      'Interior Lining': 'Felt slot pad',
      'Size': '180 × 180 × 60 mm',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on base',
    },
    customization: [
      'Wood: sapele, walnut, oak, bamboo',
      'Brass or matte black tension arm',
      'Round, square, or scalloped footprint',
      'Custom logo on tension arm or base',
      'Set with matching salt cellar',
      'Sized for cocktail or dinner napkins',
    ],
    packaging:
      'Wrapped in tissue, retail box, then export master carton.',
    useCases: ['Restaurant tabletop', 'Hotel dining', 'Premium home gifting', 'Branded F&B retail', 'Coffee shop counters', 'Wedding decor'],
    related: ['acacia-utensil-box', 'rustic-wood-egg-holder-tray', 'magnetic-wooden-salt-box'],
  },

  'wood-kitchen-utensil-holder-with-spice-drawer': {
    slug: 'wood-kitchen-utensil-holder-with-spice-drawer',
    name: 'Kitchen Utensil Holder with Spice Drawer',
    closure: 'Drawer',
    tagline: 'Combination utensil crock + pull-out spice drawer',
    intro:
      'A two-in-one countertop kitchen organizer — a felt-padded utensil crock above, and a pull-out spice drawer below. Designed for cooks who want a tidy worktop without giving up easy access to their tools.',
    images: [
      img('Wood Kitchen Utensil Holder with Spice Drawer', 'ScreenShot_2026-05-04_223138_698.png'),
      img('Wood Kitchen Utensil Holder with Spice Drawer', 'ScreenShot_2026-05-04_223146_871.png'),
      img('Wood Kitchen Utensil Holder with Spice Drawer', 'ScreenShot_2026-05-04_223154_578.png'),
      img('Wood Kitchen Utensil Holder with Spice Drawer', 'ScreenShot_2026-05-04_223202_861.png'),
      img('Wood Kitchen Utensil Holder with Spice Drawer', 'ScreenShot_2026-05-04_223213_497.png'),
    ],
    specs: {
      'Closure Type': 'Open crock + pull-out drawer',
      'Material': 'Acacia or bamboo + MDF drawer',
      'Surface Finish': 'Food-safe oil + matte lacquer',
      'Hardware': 'Wood runners · brass cup pull',
      'Interior Lining': 'Felt-padded crock + 12-jar drawer',
      'Size': '260 × 200 × 320 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on drawer face',
    },
    customization: [
      'Wood: acacia, bamboo, walnut',
      'Single or twin drawer configuration',
      'Drawer pull: brass cup, leather tab, recessed',
      'Optional knife block insert',
      'Felt or cork drawer lining',
      'Engraved logo or recipe quote',
    ],
    packaging:
      'Drawer secured with adhesive seal, foam-wrapped, retail carton, 5-ply master carton.',
    useCases: ['Modern home kitchens', 'Chef gift sets', 'Wedding registry', 'Specialty kitchen retail', 'Compact apartments', 'Hospitality galleys'],
    related: ['drawer-spice-organizer', 'bamboo-cutlery-box-sliding', 'hinged-bamboo-bread-bin'],
  },
};

export const PRODUCT_SLUGS = Object.keys(PRODUCTS);
export const CLOSURES = Array.from(new Set(Object.values(PRODUCTS).map((p) => p.closure)));
