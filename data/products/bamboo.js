// ─────────────────────────────────────────────────────────────────────────
// Bamboo Boxes — 15 products
// Image paths reference /public/bamboo-box/<folder>/
// ─────────────────────────────────────────────────────────────────────────

const PARENT = 'bamboo box';
const img = (folder, name) =>
  '/' + [PARENT, folder, name].map(encodeURIComponent).join('/');

export const PRODUCTS = {
  'bamboo-8-compartment-glass-lid-box': {
    slug: 'bamboo-8-compartment-glass-lid-box',
    name: 'Bamboo 8-Compartment Glass-Lid Box',
    closure: 'Hinged',
    tagline: 'Pale bamboo organizer with eight wells under glass',
    intro:
      'An 8-compartment bamboo organizer with a clear acrylic / glass lid — see contents at a glance. Perfect for tea bags, jewelry, vitamins, hardware, or any small parts that need sorting in a clean, light-toned wood.',
    images: [
      img('set-1', 'ScreenShot_2026-05-06_192756_317.png'),
      img('set-1', 'ScreenShot_2026-05-06_192806_298.png'),
      img('set-1', 'ScreenShot_2026-05-06_192812_948.png'),
      img('set-1', 'ScreenShot_2026-05-06_192820_026.png'),
      img('set-1', 'ScreenShot_2026-05-06_192827_068.png'),
    ],
    specs: {
      'Closure Type': 'Hinged glass / acrylic lid',
      'Material': 'Solid bamboo',
      'Surface Finish': 'Food-safe lacquer',
      'Compartments': '8 (custom 4 / 6)',
      'Lid': 'Clear glass or acrylic',
      'Size': '300 × 180 × 80 mm (custom)',
      'MOQ': '500 pcs',
      'Lead Time': '25 days',
      'Branding': 'Laser engraved frame',
    },
    customization: [
      '4 / 6 / 8 / 9 compartments',
      'Bamboo: natural or carbonized',
      'Glass or clear acrylic lid',
      'Removable or fixed dividers',
      'Engraved logo or label frames',
      'Optional magnetic close',
    ],
    packaging:
      'Glass-protected foam wrap, retail box, 5-ply export master carton.',
    useCases: ['Tea brands', 'Vitamin sorter', 'Jewelry organizer', 'Cafe pantry', 'Office breakroom', 'Specialty grocery'],
    related: ['bamboo-pen-chopstick-presentation-box', 'bamboo-tea-bag-organizer-hasp', 'bamboo-cutlery-drawer-organizer'],
  },

  'bamboo-pen-chopstick-presentation-box': {
    slug: 'bamboo-pen-chopstick-presentation-box',
    name: 'Bamboo Pen / Chopstick Presentation Box',
    closure: 'Hinged',
    tagline: 'Slim bamboo gift box with felt insert',
    intro:
      'A slim hinged bamboo presentation box with a black felt insert — purpose-built for chopstick gift sets, premium pens, fountain pen sets, or paint brushes. Light bamboo exterior contrasts beautifully against deep black interior.',
    images: [
      img('2', 'ScreenShot_2026-05-06_192946_034.png'),
      img('2', 'ScreenShot_2026-05-06_192953_545.png'),
      img('2', 'ScreenShot_2026-05-06_193001_476.png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid',
      'Material': 'Solid bamboo',
      'Surface Finish': 'Natural lacquer',
      'Interior Lining': 'Black felt with shaped slot',
      'Hardware': 'Brass pin hinges',
      'Size': '270 × 70 × 35 mm (custom)',
      'MOQ': '500 pcs',
      'Lead Time': '25 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Bamboo: natural or carbonized',
      'Custom felt color & insert shape',
      'Engraved logo on lid',
      'Magnetic closure option',
      'Sized for pens / chopsticks / brushes',
      'Bulk-pack volume pricing',
    ],
    packaging:
      'Wrapped in tissue, OPP sleeve, retail-ready inner carton, then 5-ply export master carton.',
    useCases: ['Pen retail', 'Chopstick gift sets', 'Wedding favor', 'Calligraphy gift', 'Brush gift sets', 'Hospitality amenity'],
    related: ['bamboo-8-compartment-glass-lid-box', 'bamboo-sliding-lid-box', 'bamboo-tea-bag-organizer-hasp'],
  },

  'bamboo-2-tier-fruit-bin': {
    slug: 'bamboo-2-tier-fruit-bin',
    name: 'Bamboo 2-Tier Fruit & Vegetable Bin',
    closure: 'Open-Top',
    tagline: 'Stackable bamboo crates for produce storage',
    intro:
      'A two-tier stackable bamboo crate set for fruits and vegetables — keep ripening produce organized on a counter or pantry shelf. Solid bamboo construction with hand-hold cutouts and good airflow between tiers.',
    images: [
      img('set-2', 'ScreenShot_2026-05-06_192844_624.png'),
      img('set-2', 'ScreenShot_2026-05-06_192851_349.png'),
      img('set-2', 'ScreenShot_2026-05-06_192907_180.png'),
      img('set-2', 'ScreenShot_2026-05-06_192914_596.png'),
      img('set-2', 'ScreenShot_2026-05-06_192923_512.png'),
    ],
    specs: {
      'Closure Type': 'Open-top stackable bins',
      'Material': 'Solid bamboo',
      'Surface Finish': 'Food-safe lacquer',
      'Tiers': '2 (stackable to 3+)',
      'Handles': 'Side cutouts',
      'Size': '380 × 280 × 360 mm (custom)',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on front',
    },
    customization: [
      '2 / 3 / 4-tier configurations',
      'Bamboo: natural or carbonized',
      'Optional removable inner liners',
      'Engraved logo on front face',
      'Custom dimensions for retail shelves',
      'Stackable and storeable nesting',
    ],
    packaging:
      'Flat-packed and tied, foam-wrapped, 5-ply export master carton.',
    useCases: ['Home pantry', 'Specialty grocery', 'Farmers market display', 'Cafe back-of-house', 'Greengrocer retail', 'Kitchen organization'],
    related: ['bamboo-cutlery-caddy-handled', 'bamboo-stackable-3-comp-tabletop', 'bamboo-bath-bomb-organizer'],
  },

  'bamboo-tea-bag-organizer-hasp': {
    slug: 'bamboo-tea-bag-organizer-hasp',
    name: 'Bamboo 5-Compartment Tea Box',
    closure: 'Hinged',
    tagline: 'Five-section bamboo tea organizer with hasp clasp',
    intro:
      'A hinged-lid bamboo tea organizer with five tall compartments and a brushed-chrome hasp clasp. Handles standard tea bag sleeves; the clear acrylic top keeps your selection visible while protecting from light and humidity.',
    images: [
      img('set-3', 'ScreenShot_2026-05-06_193042_061.png'),
      img('set-3', 'ScreenShot_2026-05-06_193049_013.png'),
      img('set-3', 'ScreenShot_2026-05-06_193055_716.png'),
    ],
    specs: {
      'Closure Type': 'Hinged glass-top + hasp',
      'Material': 'Solid bamboo',
      'Surface Finish': 'Food-safe lacquer',
      'Compartments': '5 (custom 4 / 6)',
      'Lid': 'Acrylic / glass insert',
      'Size': '280 × 130 × 90 mm (custom)',
      'MOQ': '500 pcs',
      'Lead Time': '25 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Bamboo: natural or carbonized',
      '4 / 5 / 6-compartment layouts',
      'Glass or acrylic top',
      'Brass / chrome / black hasp',
      'Engraved tea-brand logo',
      'Custom external dimensions',
    ],
    packaging:
      'Glass-protected foam wrap, retail box, 5-ply export master carton.',
    useCases: ['Tea brands', 'Cafe service', 'Hotel guest amenity', 'Office breakroom', 'Specialty retail', 'Subscription gift'],
    related: ['bamboo-8-compartment-glass-lid-box', 'bamboo-2-tier-tea-display', 'bamboo-coffee-station-organizer'],
  },

  'bamboo-bag-organizer': {
    slug: 'bamboo-bag-organizer',
    name: 'Bamboo Plastic Bag Organizer',
    closure: 'Drawer',
    tagline: 'In-drawer bamboo dispenser for sandwich, snack, gallon bags',
    intro:
      'A four-slot bamboo organizer that fits inside a kitchen drawer — pulls out, dispenses, refills. Labeled Gallon / Quart / Sandwich / Snack slots end the cabinet jumble of mismatched plastic bag boxes.',
    images: [
      img('set-4', 'ScreenShot_2026-05-06_193122_283.png'),
      img('set-4', 'ScreenShot_2026-05-06_193135_783.png'),
      img('set-4', 'ScreenShot_2026-05-06_193149_947.png'),
    ],
    specs: {
      'Closure Type': 'Open dispenser slots',
      'Material': 'Solid bamboo',
      'Surface Finish': 'Food-safe lacquer',
      'Slots': '4 (Gallon / Quart / Sandwich / Snack)',
      'Profile': 'Drawer-friendly low profile',
      'Size': '320 × 280 × 80 mm (custom)',
      'MOQ': '500 pcs',
      'Lead Time': '25 days',
      'Branding': 'Laser engraved labels',
    },
    customization: [
      'Bamboo: natural or carbonized',
      'Custom slot count & sizes',
      'Engraved labels in any language',
      'Multi-pack retail bundle',
      'Fits any standard kitchen drawer',
      'Bulk-pack volume pricing',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Home kitchen', 'Pantry organization', 'Wedding registry', 'Cooking-class supply', 'Catering kitchen', 'Specialty grocery'],
    related: ['bamboo-cutlery-drawer-organizer', 'bamboo-2-tier-fruit-bin', 'bamboo-stackable-3-comp-tabletop'],
  },

  'bamboo-cutlery-caddy-handled': {
    slug: 'bamboo-cutlery-caddy-handled',
    name: 'Bamboo Cutlery Caddy with Napkin Slot',
    closure: 'Open-Top',
    tagline: 'Three-section bamboo caddy with rear napkin holder',
    intro:
      'A three-section bamboo cutlery caddy with a rear napkin slot, engraved labels for forks, spoons, and knives. Built solid enough for daily catering and service, light enough to carry from station to station.',
    images: [
      img('set-5', 'ScreenShot_2026-05-06_193217_111.png'),
      img('set-5', 'ScreenShot_2026-05-06_193225_739.png'),
      img('set-5', 'ScreenShot_2026-05-06_193233_297.png'),
      img('set-5', 'ScreenShot_2026-05-06_193243_551.png'),
    ],
    specs: {
      'Closure Type': 'Open-top with napkin slot',
      'Material': 'Solid bamboo',
      'Surface Finish': 'Food-safe oil',
      'Sections': '3 cutlery + 1 napkin',
      'Branding': 'Engraved utensil labels',
      'Size': '280 × 160 × 180 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '25 days',
      'Branding Add-On': 'Custom logo on side',
    },
    customization: [
      'Bamboo: natural or carbonized',
      'Custom labeled sections',
      'Optional center carry handle',
      'Engraved logo or restaurant name',
      'Custom dimensions',
      'Bulk-pack pricing',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Buffet service', 'Cafe pickup station', 'BBQ & picnic', 'Catering events', 'Hospitality FOH', 'Wedding rental'],
    related: ['bamboo-bag-organizer', 'bamboo-coffee-station-organizer', 'bamboo-cutlery-drawer-organizer'],
  },

  'bamboo-sliding-lid-box': {
    slug: 'bamboo-sliding-lid-box',
    name: 'Bamboo Sliding Lid Box',
    closure: 'Sliding Lid',
    tagline: 'Classic bamboo box with smooth-running sliding lid',
    intro:
      'A simple bamboo sliding-lid box — the cleanest possible exterior, no hardware. The flat lid is a perfect canvas for laser engraving. Ideal for gift packaging, craft kits, pen sets, and retail-ready unboxing experiences.',
    images: [
      img('set-6', 'ScreenShot_2026-05-06_193306_701.png'),
      img('set-6', 'ScreenShot_2026-05-06_193314_094.png'),
      img('set-6', 'ScreenShot_2026-05-06_193325_196.png'),
    ],
    specs: {
      'Closure Type': 'Sliding lid (CNC groove)',
      'Material': 'Solid bamboo',
      'Surface Finish': 'Natural lacquer',
      'Interior': 'Sanded smooth',
      'Lid': 'Flush flat panel',
      'Size': '180 × 120 × 60 mm (custom)',
      'MOQ': '500 pcs',
      'Lead Time': '25 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Bamboo: natural or carbonized',
      'Multiple sizes (S / M / L / XL)',
      'Foam or fabric insert',
      'Engraved monogram or full lid art',
      'Optional finger pull or ribbon hole',
      'Bulk-pack pricing',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Gift packaging', 'Craft kit retail', 'Pen and tool sets', 'Wedding favor', 'Children craft kits', 'Subscription unboxing'],
    related: ['bamboo-pen-chopstick-presentation-box', 'bamboo-stackable-3-comp-tabletop', 'bamboo-bath-accessory-set'],
  },

  'bamboo-coffee-station-organizer': {
    slug: 'bamboo-coffee-station-organizer',
    name: 'Bamboo Coffee Station Organizer',
    closure: 'Drawer',
    tagline: 'Drawer-style bamboo organizer for K-cups and coffee gear',
    intro:
      'A bamboo coffee-station organizer that puts a coffee maker, sugar containers, K-cup pods, and napkins all in one tidy footprint. Front drawer holds K-cups; side compartment holds coffee accessories. Sized for most home and office machines.',
    images: [
      img('set-7', 'ScreenShot_2026-05-06_193423_665.png'),
      img('set-7', 'ScreenShot_2026-05-06_193432_419.png'),
      img('set-7', 'ScreenShot_2026-05-06_193440_890.png'),
      img('set-7', 'ScreenShot_2026-05-06_193448_785.png'),
    ],
    specs: {
      'Closure Type': 'Pull-out drawer + open shelf',
      'Material': 'Solid bamboo',
      'Surface Finish': 'Food-safe lacquer',
      'Pod Capacity': '~36 K-cups',
      'Top Shelf': 'Coffee maker base',
      'Size': '450 × 360 × 100 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraved drawer',
    },
    customization: [
      'Bamboo: natural or carbonized',
      'Sized for Keurig / Nespresso / Dolce Gusto',
      'Optional condiment slots',
      'Engraved logo / cafe name',
      'Custom dimensions for office breakrooms',
      'Multi-drawer configurations',
    ],
    packaging:
      'Flat-pack with assembly hardware, retail box, 5-ply export master carton.',
    useCases: ['Home coffee bar', 'Office breakroom', 'Cafe POS counter', 'Hotel mini bar', 'Co-working spaces', 'Wedding registry'],
    related: ['bamboo-tea-bag-organizer-hasp', 'bamboo-2-tier-tea-display', 'bamboo-cutlery-caddy-handled'],
  },

  'bamboo-bath-accessory-set': {
    slug: 'bamboo-bath-accessory-set',
    name: 'Bamboo Bath Accessory Set',
    closure: 'Open-Top',
    tagline: 'Soap dispenser, tumbler, and tray in matching bamboo',
    intro:
      'A bamboo bath accessory set — soap dispenser, tumbler, and tray in matching pale bamboo. Naturally water-resistant, antimicrobial, and beautifully grained. The set anchors a spa-style bathroom or hotel guestroom.',
    images: [
      img('set-8', 'ScreenShot_2026-05-06_193512_039.png'),
      img('set-8', 'ScreenShot_2026-05-06_193519_411.png'),
      img('set-8', 'ScreenShot_2026-05-06_193527_252.png'),
      img('set-8', 'ScreenShot_2026-05-06_193535_684.png'),
      img('set-8', 'ScreenShot_2026-05-06_193547_148.png'),
      img('set-8', 'ScreenShot_2026-05-06_193554_418.png'),
      img('set-8', 'ScreenShot_2026-05-06_193600_859.png'),
      img('set-8', 'ScreenShot_2026-05-06_193607_641.png'),
      img('set-8', 'ScreenShot_2026-05-06_193614_361.png'),
    ],
    specs: {
      'Set Includes': 'Dispenser + tumbler + soap tray',
      'Material': 'Solid bamboo + stainless pump',
      'Surface Finish': 'Water-resistant lacquer',
      'Pump': 'Brushed stainless steel',
      'Tray': 'Drainage-grooved soap tray',
      'Size': 'Tray 200 × 160 × 30 mm',
      'MOQ': '300 pcs (set)',
      'Lead Time': '30 days',
      'Branding': 'Laser engraved logo',
    },
    customization: [
      'Bamboo: natural or carbonized',
      'Custom set composition (3 / 4 / 5 pieces)',
      'Pump finish: chrome, black, brass',
      'Engraved hotel logo',
      'Bath tray-only or full-set retail',
      'Custom proportions',
    ],
    packaging:
      'Foam-cradled retail box, then 5-ply export master carton.',
    useCases: ['Hotel guestroom', 'Spa retail', 'Bathroom remodel retail', 'Wedding registry', 'Vacation rental amenities', 'Spa-style gift sets'],
    related: ['bamboo-sliding-lid-box', 'bamboo-stackable-3-comp-tabletop', 'bamboo-cable-management-box'],
  },

  'bamboo-stackable-3-comp-tabletop': {
    slug: 'bamboo-stackable-3-comp-tabletop',
    name: 'Bamboo 3-Compartment Tabletop Tray',
    closure: 'Open-Top',
    tagline: 'Three-section bamboo tray for tabletop sundries',
    intro:
      'A three-compartment open-top bamboo tray for tabletop sundries — keys, mail, remotes, makeup brushes, snacks, hardware. The simplest possible organizer; sized to disappear into any room.',
    images: [
      img('set-9', 'ScreenShot_2026-05-06_193637_299.png'),
      img('set-9', 'ScreenShot_2026-05-06_193644_490.png'),
      img('set-9', 'ScreenShot_2026-05-06_193651_066.png'),
    ],
    specs: {
      'Closure Type': 'Open-top tray',
      'Material': 'Solid bamboo',
      'Surface Finish': 'Natural lacquer',
      'Compartments': '3 equal sections',
      'Stackable': 'Yes (flat top)',
      'Size': '280 × 110 × 70 mm (custom)',
      'MOQ': '500 pcs',
      'Lead Time': '25 days',
      'Branding': 'Laser engraving',
    },
    customization: [
      'Bamboo: natural or carbonized',
      '2 / 3 / 4-section layouts',
      'Engraved labels',
      'Felt-lined wells option',
      'Custom dimensions',
      'Bulk-pack pricing',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Entryway tray', 'Office desk organizer', 'Bedroom dresser', 'Bathroom counter', 'Kids art supplies', 'Hotel amenity'],
    related: ['bamboo-2-tier-fruit-bin', 'bamboo-bath-bomb-organizer', 'bamboo-cutlery-drawer-organizer'],
  },

  'bamboo-portable-cutlery-caddy': {
    slug: 'bamboo-portable-cutlery-caddy',
    name: 'Bamboo Portable Cutlery Caddy',
    closure: 'Open-Top',
    tagline: 'Three-section bamboo caddy with center carry handle',
    intro:
      'A handled bamboo cutlery caddy with three deep sections — forks, knives, spoons — and a center carry handle for moving from kitchen to dining room. Substantial enough for full-size dinnerware, light enough to carry one-handed.',
    images: [
      img('set-10', 'ScreenShot_2026-05-06_193726_412.png'),
      img('set-10', 'ScreenShot_2026-05-06_193737_355.png'),
      img('set-10', 'ScreenShot_2026-05-06_193749_385.png'),
    ],
    specs: {
      'Closure Type': 'Open-top with center handle',
      'Material': 'Solid bamboo',
      'Surface Finish': 'Food-safe oil',
      'Sections': '3 (custom 4 / 5)',
      'Handle': 'Solid bamboo bar',
      'Size': '270 × 180 × 200 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '25 days',
      'Branding': 'Laser engraving on side',
    },
    customization: [
      'Bamboo: natural or carbonized',
      '3, 4, or 5 sections',
      'Solid wood or rope handle',
      'Engraved logo / restaurant name',
      'Custom proportions',
      'Bulk-pack pricing',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Buffet service', 'Picnic & BBQ', 'Catering events', 'Cafe condiment station', 'Hospitality FOH', 'Wedding rental'],
    related: ['bamboo-cutlery-caddy-handled', 'bamboo-bag-organizer', 'bamboo-coffee-station-organizer'],
  },

  'bamboo-cable-management-box': {
    slug: 'bamboo-cable-management-box',
    name: 'Bamboo Cable Management Box',
    closure: 'Lift-Off Lid',
    tagline: 'Hide power strips with a clean bamboo cover',
    intro:
      'A lift-off-lid bamboo cable management box — hide power strips, cords, and chargers from view. Decorative side cutouts give the cords clean exit paths and improve airflow. The pale bamboo blends into any modern desk or living room.',
    images: [
      img('set-11', 'ScreenShot_2026-05-06_193834_049.png'),
      img('set-11', 'ScreenShot_2026-05-06_193841_172.png'),
      img('set-11', 'ScreenShot_2026-05-06_193849_754.png'),
    ],
    specs: {
      'Closure Type': 'Lift-off lid',
      'Material': 'Solid bamboo',
      'Surface Finish': 'Natural lacquer',
      'Cord Slots': 'Decorative side cutouts',
      'Interior': 'Fits 6-outlet power strip',
      'Size': '400 × 160 × 130 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '25 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Bamboo: natural or carbonized',
      'Sized for 4 / 6 / 8-outlet strips',
      'Custom cord-cutout patterns',
      'Engraved logo on lid',
      'Felt-padded bottom',
      'Bulk-pack pricing',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Home office', 'TV bench', 'Bedside organization', 'Co-working spaces', 'Hotel desk amenity', 'Tech-tidy gifting'],
    related: ['bamboo-bath-accessory-set', 'bamboo-coffee-station-organizer', 'bamboo-stackable-3-comp-tabletop'],
  },

  'bamboo-cutlery-drawer-organizer': {
    slug: 'bamboo-cutlery-drawer-organizer',
    name: 'Bamboo Cutlery Drawer Organizer',
    closure: 'Open-Top',
    tagline: 'Expandable bamboo organizer for kitchen drawers',
    intro:
      'A bamboo in-drawer organizer with sections sized for forks, knives, spoons, chopsticks, and serving utensils. Compact body slides into a standard kitchen drawer; the open top lets you grab without fishing.',
    images: [
      img('set-12', 'ScreenShot_2026-05-06_193922_986.png'),
      img('set-12', 'ScreenShot_2026-05-06_193930_354.png'),
      img('set-12', 'ScreenShot_2026-05-06_193938_108.png'),
      img('set-12', 'ScreenShot_2026-05-06_193945_896.png'),
    ],
    specs: {
      'Closure Type': 'Open-top in-drawer organizer',
      'Material': 'Solid bamboo',
      'Surface Finish': 'Food-safe lacquer',
      'Sections': '5 (custom)',
      'Profile': 'Drawer-friendly low profile',
      'Size': '380 × 160 × 60 mm (custom)',
      'MOQ': '500 pcs',
      'Lead Time': '25 days',
      'Branding': 'Laser engraving on side',
    },
    customization: [
      'Bamboo: natural or carbonized',
      'Custom section sizes & count',
      'Expandable telescoping option',
      'Engraved labels',
      'Custom dimensions for any drawer',
      'Bulk-pack pricing',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Home kitchen', 'Wedding registry', 'Cooking class supply', 'Specialty grocery', 'Catering kitchen', 'Apartment living'],
    related: ['bamboo-bag-organizer', 'bamboo-stackable-3-comp-tabletop', 'bamboo-cutlery-caddy-handled'],
  },

  'bamboo-2-tier-tea-display': {
    slug: 'bamboo-2-tier-tea-display',
    name: 'Bamboo 2-Tier Tea Display Caddy',
    closure: 'Open-Top',
    tagline: 'Stackable angled bamboo tea bag display',
    intro:
      'A two-tier stackable tea display caddy — angled bamboo bins make tea bag selections face the user, like a curated cafe display. Stack three or four high; perfect for retail, hotel breakfast bars, and home tea lovers.',
    images: [
      img('set-13', 'ScreenShot_2026-05-06_194005_600.png'),
      img('set-13', 'ScreenShot_2026-05-06_194014_546.png'),
      img('set-13', 'ScreenShot_2026-05-06_194021_082.png'),
      img('set-13', 'ScreenShot_2026-05-06_194030_364.png'),
    ],
    specs: {
      'Closure Type': 'Open-top angled bins',
      'Material': 'Solid bamboo',
      'Surface Finish': 'Food-safe lacquer',
      'Tiers': '2 (stackable to 4+)',
      'Compartments': '5 per tier',
      'Size': '280 × 200 × 150 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on tier face',
    },
    customization: [
      'Bamboo: natural or carbonized',
      '1 / 2 / 3-tier configurations',
      'Custom compartment count',
      'Engraved logo / cafe name',
      'Custom proportions',
      'Bulk-pack pricing',
    ],
    packaging:
      'Flat-pack and OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Cafe / hotel breakfast bar', 'Tea brand retail', 'Office breakroom', 'Specialty grocery', 'Hospitality FOH', 'Tea-subscription gifting'],
    related: ['bamboo-tea-bag-organizer-hasp', 'bamboo-coffee-station-organizer', 'bamboo-8-compartment-glass-lid-box'],
  },

  'bamboo-bath-bomb-organizer': {
    slug: 'bamboo-bath-bomb-organizer',
    name: 'Bamboo Bath Bomb Organizer',
    closure: 'Open-Top',
    tagline: 'Six-section bamboo organizer for bath bombs and skincare',
    intro:
      'A six-section bamboo organizer with deep cells designed for bath bombs, soaps, candles, or skincare retail. Solid bamboo construction looks great on a vanity, retail shelf, or guestroom — equally at home as personal storage or merchandising.',
    images: [
      img('set-14', 'ScreenShot_2026-05-06_194053_961.png'),
      img('set-14', 'ScreenShot_2026-05-06_194100_612.png'),
      img('set-14', 'ScreenShot_2026-05-06_194108_429.png'),
      img('set-14', 'ScreenShot_2026-05-06_194117_195.png'),
    ],
    specs: {
      'Closure Type': 'Open-top sectioned tray',
      'Material': 'Solid bamboo',
      'Surface Finish': 'Water-resistant lacquer',
      'Compartments': '6 (custom 4 / 8)',
      'Profile': 'Deep cells',
      'Size': '300 × 200 × 80 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on side',
    },
    customization: [
      'Bamboo: natural or carbonized',
      'Custom compartment count & sizes',
      'Engraved logo on side',
      'Optional acrylic lid',
      'Custom proportions',
      'Bulk-pack pricing',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Bath & skincare retail', 'Spa amenity', 'Soap maker market booth', 'Hotel guestroom', 'Cosmetic display', 'Wedding favor display'],
    related: ['bamboo-bath-accessory-set', 'bamboo-stackable-3-comp-tabletop', 'bamboo-2-tier-fruit-bin'],
  },
};

export const PRODUCT_SLUGS = Object.keys(PRODUCTS);
export const CLOSURES = Array.from(new Set(Object.values(PRODUCTS).map((p) => p.closure)));
