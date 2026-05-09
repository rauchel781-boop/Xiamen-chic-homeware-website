// ─────────────────────────────────────────────────────────────────────────
// Tea & Coffee Box products (sample 6 — covers all 5 closure types)
// Image paths reference /public/tea-coffee-boxes/<product-folder>/
// img() handles URL encoding for spaces, &, parens, and CJK characters.
// ─────────────────────────────────────────────────────────────────────────

const PARENT = 'Tea&Coffee Boxes';
const img = (folder, name) =>
  '/' + [PARENT, folder, name].map(encodeURIComponent).join('/');

export const PRODUCTS = {
  'acacia-tea-bag-box-8-compartment': {
    slug: 'acacia-tea-bag-box-8-compartment',
    name: '8-Compartment Acacia Tea Bag Box',
    closure: 'Magnetic',
    tagline: 'Solid acacia hardwood box with hidden magnetic flip lid',
    intro:
      'A premium 8-compartment tea bag organizer in solid acacia hardwood, with a hidden magnetic lid that closes flush. The dramatic acacia grain pattern makes each piece unique. Compartments sized for standard tea bag pouches; optional adjustable dividers available.',
    images: [
      img('8 dividers acacia tea bag box', 'tea box (1).jpg'),
      img('8 dividers acacia tea bag box', 'tea box (2).jpg'),
      img('8 dividers acacia tea bag box', 'tea box (3).jpg'),
      img('8 dividers acacia tea bag box', 'tea box (5).jpg'),
      img('8 dividers acacia tea bag box', 'tea box (6).jpg'),
    ],
    specs: {
      'Closure Type': 'Hidden magnetic flip lid',
      'Material': 'Solid acacia hardwood',
      'Surface Finish': 'Food-safe oil · matte lacquer · natural',
      'Hardware': 'Concealed neodymium magnets',
      'Compartments': '8 (custom 4 / 6 / 9 / 12 available)',
      'Size': 'Custom',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving · brass plate · burned-in mark',
    },
    customization: [
      'Compartment count: 4 / 6 / 8 / 9 / 12 (or custom)',
      'Wood: acacia, walnut, oak, bamboo',
      'Adjustable removable dividers (optional)',
      'Optional acrylic window in lid',
      'Lining: raw wood, food-safe finish, or velvet',
      'Branding: laser, brass plate, hot foil, or wood-burning',
    ],
    packaging:
      'Each box wrapped in OPP polybag → individual white inner carton → 5-ply export master carton. Master carton labeled with customer SKU and barcode if required.',
    useCases: ['Tea retailers', 'Hotel mini bars', 'Office pantries', 'Premium gift sets', 'Subscription tea boxes', 'Hospitality amenities'],
    related: ['black-wooden-tea-organizer', 'bamboo-tea-organizer-clear-lid', 'wood-metal-tea-station'],
  },

  'bamboo-tea-organizer-clear-lid': {
    slug: 'bamboo-tea-organizer-clear-lid',
    name: 'Bamboo Tea Organizer with Clear Lid',
    closure: 'Hinged',
    tagline: 'Hinged bamboo organizer with acrylic-window lid',
    intro:
      'A bamboo tea bag organizer with a hinged lid featuring a clear acrylic window — see contents at a glance. 6 or 9 compartment configurations, food-safe natural bamboo finish, perfect for retail display, hotel rooms, and office pantries.',
    images: [
      img('Bamboo Tea Bag Organizer Box with Clear Lid', 'babmoo tea box (2).png'),
      img('Bamboo Tea Bag Organizer Box with Clear Lid', 'babmoo tea box (3).png'),
      img('Bamboo Tea Bag Organizer Box with Clear Lid', 'babmoo tea box (4).png'),
      img('Bamboo Tea Bag Organizer Box with Clear Lid', 'babmoo tea box (5).png'),
      img('Bamboo Tea Bag Organizer Box with Clear Lid', 'babmoo tea box (6).png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid with clear acrylic window',
      'Material': 'Carbonized or natural bamboo',
      'Surface Finish': 'Food-safe oil · clear lacquer · raw',
      'Hardware': 'Brass-finish hinges · optional clasp',
      'Lid Window': '3 mm clear acrylic insert',
      'Compartments': '6 or 9 (custom on request)',
      'Size': 'Custom',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser · screen print · printed lid liner',
    },
    customization: [
      'Compartment count: 4 / 6 / 8 / 9',
      'Bamboo color: natural pale gold or warm carbonized',
      'Acrylic window or solid wood lid',
      'Removable dividers',
      'Hinges: brass / antique brass / matte black',
      'Optional rear hook for tea-bag dispenser slot',
    ],
    packaging:
      'Acrylic protected with PE film, full unit OPP-wrapped, packed in master cartons. Hinges secured against transit damage.',
    useCases: ['Retail tea brands', 'Cafes', 'Hotel rooms', 'Office tea stations', 'Eco-gift sets', 'Restaurant service'],
    related: ['bamboo-tea-organizer-box', 'acacia-tea-bag-box-8-compartment', 'black-wooden-tea-organizer'],
  },

  'bamboo-tea-organizer-box': {
    slug: 'bamboo-tea-organizer-box',
    name: 'Bamboo Tea Bag Organizer Box',
    closure: 'Sliding',
    tagline: 'Sliding-lid bamboo organizer with food-safe finish',
    intro:
      'A sleek sliding-lid bamboo box for organizing tea bags or pyramid sachets. Clean grain, food-safe finish, and a hardware-free sliding mechanism that keeps contents fresh. Ideal for kitchens, cafes, and gift sets.',
    images: [
      img('Bamboo Tea Bag Organizer Box', '主图1（5）.png'),
      img('Bamboo Tea Bag Organizer Box', '主图2（2）.png'),
      img('Bamboo Tea Bag Organizer Box', '主图3（1）.png'),
      img('Bamboo Tea Bag Organizer Box', '主图4（4）.png'),
      img('Bamboo Tea Bag Organizer Box', '主图5（0）.png'),
      img('Bamboo Tea Bag Organizer Box', '主图6（3）.png'),
    ],
    specs: {
      'Closure Type': 'Sliding lid (CNC-routed grooves)',
      'Material': 'Carbonized or natural bamboo',
      'Surface Finish': 'Food-safe oil · clear lacquer · raw',
      'Hardware': 'None — hardware-free construction',
      'Compartments': 'Configurable (4 / 6 / 8 / 9)',
      'Size': 'Custom',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving · screen print · branded liner',
    },
    customization: [
      'Compartment grid layout (4 / 6 / 8 / 9)',
      'Bamboo color: natural or carbonized',
      'Lid finger pull / ribbon hole',
      'Optional acrylic insert in lid for visibility',
      'Removable internal dividers',
      'Stackable design with locating ridges',
    ],
    packaging:
      'Stacked in groups of 12-24, OPP-wrapped, packed in master cartons. Hardware-free design saves on freight cost.',
    useCases: ['Kitchen tea storage', 'Cafe service', 'Gift sets', 'Eco brands', 'Hotel mini bars', 'Office pantries'],
    related: ['bamboo-tea-organizer-clear-lid', 'acacia-tea-bag-box-8-compartment', 'wood-metal-tea-station'],
  },

  'black-wooden-tea-organizer': {
    slug: 'black-wooden-tea-organizer',
    name: 'Black Wooden Tea Bag Organizer',
    closure: 'Magnetic',
    tagline: 'Modern matte-black organizer with hidden magnetic closure',
    intro:
      'A modern matte-black tea bag organizer with hidden magnetic closure. The clean lines and premium finish suit contemporary kitchens and corporate gifting. Configurable compartment count from 4 to 12.',
    images: [
      img('Black Wooden Tea Bag Organizer Box', 'tea bag organiser (2).jpg'),
      img('Black Wooden Tea Bag Organizer Box', 'tea bag organiser (3).jpg'),
      img('Black Wooden Tea Bag Organizer Box', 'tea bag organiser (4).jpg'),
      img('Black Wooden Tea Bag Organizer Box', 'tea bag organiser (5).jpg'),
      img('Black Wooden Tea Bag Organizer Box', 'tea bag organiser (6).jpg'),
    ],
    specs: {
      'Closure Type': 'Hidden magnetic flip lid',
      'Material': 'MDF / pine / paulownia, paint-finished black',
      'Surface Finish': 'Matte black paint · soft-touch coating',
      'Hardware': 'Concealed neodymium magnets',
      'Compartments': '4 / 6 / 8 / 12 (custom)',
      'Size': 'Custom',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser · hot foil · screen print on lid',
    },
    customization: [
      'Color: matte black / matte white / custom RAL',
      'Surface texture: smooth, soft-touch, or wood-grain feel',
      'Compartment count: 4 / 6 / 8 / 9 / 12',
      'Logo: hot foil (gold/silver/copper), laser, or print',
      'Optional acrylic window in lid',
      'Velvet-lined interior available',
    ],
    packaging:
      'Soft cloth wrap to prevent surface scratching → individual carton → 5-ply export master carton.',
    useCases: ['Corporate gifting', 'Hotel premium amenities', 'Modern retail', 'Subscription tea boxes', 'Designer kitchen brands', 'Wedding favors'],
    related: ['acacia-tea-bag-box-8-compartment', 'bamboo-tea-organizer-clear-lid', 'bamboo-tea-organizer-box'],
  },

  'coffee-machine-stand-drawer': {
    slug: 'coffee-machine-stand-drawer',
    name: 'Coffee Machine Stand with Drawer',
    closure: 'Drawer',
    tagline: 'Counter-top stand with pull-out drawer and integrated cup hooks',
    intro:
      'A counter-top espresso machine stand with a pull-out drawer for capsules and grounds, plus integrated under-shelf cup hooks. Built from solid wood with metal hardware. Designed to consolidate the morning coffee station into one footprint.',
    images: [
      img('Machine Stand with Cup Hooks & Drawers', 'coffee storage rack (1).png'),
      img('Machine Stand with Cup Hooks & Drawers', 'coffee storage rack (2).png'),
    ],
    specs: {
      'Closure Type': 'Pull-out drawer',
      'Material': 'Solid pine · oak · acacia',
      'Surface Finish': 'Stained · oiled · matte lacquer',
      'Hardware': 'Metal cup hooks · drawer slides · brass pulls',
      'Drawer Capacity': 'Capsules / pods / grounds / accessories',
      'Cup Hooks': '3-5 hooks under shelf',
      'Size': 'Custom',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving · burned-in mark · brass plate',
    },
    customization: [
      'Wood: pine, oak, walnut, acacia',
      'Stain: natural / honey / walnut / ebony',
      'Cup hook count: 3 / 5 / 7',
      'Drawer interior dividers (capsules / grounds / accessories)',
      'Top shelf size to fit specific machine models',
      'Optional second drawer or open shelf',
    ],
    packaging:
      'Disassembled and flat-packed (top shelf, base, drawer, hooks) with assembly hardware bagged. Each component foam-protected.',
    useCases: ['Home barista setups', 'Office coffee stations', 'Cafes & co-working spaces', 'AirBnB / vacation rentals', 'Hotel suite kitchenettes', 'Specialty coffee retail'],
    related: ['wood-metal-tea-station', 'acacia-tea-bag-box-8-compartment', 'black-wooden-tea-organizer'],
  },

  'wood-metal-tea-station': {
    slug: 'wood-metal-tea-station',
    name: 'Wood & Metal Tea Station Organizer',
    closure: 'Lift-off',
    tagline: 'Industrial multi-tier tea/coffee station',
    intro:
      'A multi-tier tea and coffee station organizer in wood and powder-coated metal — industrial-modern aesthetic for cafes and modern offices. Lift-off compartment lids, integrated mug hangers, and accessory shelves all in one freestanding unit.',
    images: [
      img('Wood & Metal Tea Station Organizer', 'metal wood organiser (1).png'),
      img('Wood & Metal Tea Station Organizer', 'metal wood organiser (7).png'),
      img('Wood & Metal Tea Station Organizer', 'metal wood organiser (8).png'),
      img('Wood & Metal Tea Station Organizer', 'metal wood organiser (9).png'),
      img('Wood & Metal Tea Station Organizer', 'metal wood organiser (10).png'),
      img('Wood & Metal Tea Station Organizer', 'metal wood organiser (11).png'),
    ],
    specs: {
      'Closure Type': 'Lift-off lids on storage compartments',
      'Material': 'Solid wood + powder-coated steel',
      'Surface Finish': 'Stained wood · matte black or white metal frame',
      'Hardware': 'Welded steel frame · brass / matte black hooks',
      'Configuration': 'Multi-tier with hooks, shelves, and lift-off bins',
      'Size': 'Custom',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving · brass plate · screen-print on metal',
    },
    customization: [
      'Wood species: pine, oak, acacia',
      'Metal frame color: matte black, white, brass-plated',
      'Number of tiers and shelves',
      'Mug hook count and positioning',
      'Lift-off bin sizes for tea / coffee / sugar / accessories',
      'Wall-mount or freestanding configuration',
    ],
    packaging:
      'Flat-packed: wood components, metal frame sections, hardware bagged with assembly instructions. Foam-protected and 5-ply boxed.',
    useCases: ['Cafe service stations', 'Modern offices', 'Co-working spaces', 'Hospitality industry', 'Designer kitchen retail', 'Barista training stations'],
    related: ['coffee-machine-stand-drawer', 'bamboo-tea-organizer-box', 'acacia-tea-bag-box-8-compartment'],
  },

  // ═══════════════════════════════════════════════════════════════════
  // NEW PRODUCTS
  // ═══════════════════════════════════════════════════════════════════

  'rustic-coffee-bar-caddy-set': {
    slug: 'rustic-coffee-bar-caddy-set',
    name: 'Rustic "Coffee Bar" Caddy Set with Rope Handles',
    closure: 'Open',
    tagline: 'Burnt-finish wood caddies with jute rope side handles',
    intro:
      'A pair of rustic burnt-finish wood caddies with jute rope side handles and "Coffee Bar" white-paint script on the front. Open-top divided compartments — drop in K-cups, sugar packets, stir sticks, tea bags. Two stackable sizes per set. Farmhouse / coffee-shop aesthetic.',
    images: [
      img('set-1', 'ScreenShot_2026-05-07_172938_835.png'),
      img('set-1', 'ScreenShot_2026-05-07_172959_387.png'),
      img('set-1', 'ScreenShot_2026-05-07_173006_914.png'),
      img('set-1', 'ScreenShot_2026-05-07_173016_337.png'),
    ],
    specs: {
      'Closure Type': 'Open-top divided compartments',
      'Material': 'Solid pine, burnt / torched finish',
      'Surface Finish': 'Torched + clear matte sealer',
      'Hardware': 'Jute rope side handles',
      'Compartments': '4-6 (configurable)',
      'Set': '2 nesting sizes',
      'MOQ': '200 sets',
      'Lead Time': '30 days',
      'Branding': 'White-paint screen print · laser engrave',
    },
    customization: [
      'Single piece or 2-piece nesting set',
      'Surface text: "Coffee Bar", "Tea Time", custom phrase',
      'Wood finish: torched, dark walnut stain, weathered grey',
      'Handle material: jute rope, leather strap, or recessed',
      'Compartment count and width',
    ],
    packaging:
      'Each piece OPP-bagged, set nested with corrugated divider, packed in 5-ply master carton.',
    useCases: ['Farmhouse kitchens', 'Coffee shops', 'AirBnB rentals', 'Hospitality breakfast bars', 'Office pantries', 'Gift retail'],
    related: ['black-coffee-bar-station-caddy', 'black-coffee-bar-3-compartment', 'wood-metal-tea-station'],
  },

  'oak-tea-box-6-compartment-glass-lid': {
    slug: 'oak-tea-box-6-compartment-glass-lid',
    name: '6-Compartment Oak Tea Box with Glass Window Lid',
    closure: 'Hinged',
    tagline: 'Solid oak box with full-glass viewing lid and "TEA BOX" engraving',
    intro:
      'A solid oak tea box with a hinged full-glass lid that lets you see the entire tea selection at a glance. Six removable dividers create the standard 6-compartment grid; "TEA BOX" laser-engraved on the front. Premium retail-display ready.',
    images: [
      img('2', 'ScreenShot_2026-05-07_173046_515.png'),
      img('2', 'ScreenShot_2026-05-07_173104_253.png'),
      img('2', 'ScreenShot_2026-05-07_173111_406.png'),
      img('2', 'ScreenShot_2026-05-07_173121_265.png'),
    ],
    specs: {
      'Closure Type': 'Hinged glass-window lid with brass clasp',
      'Material': 'Solid oak hardwood',
      'Surface Finish': 'Natural oil + clear lacquer',
      'Hardware': 'Brass hinges + brass front clasp',
      'Lid Window': 'Full panel tempered glass',
      'Compartments': '6 (removable dividers)',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engrave (front and lid corner)',
    },
    customization: [
      'Wood: oak, walnut, acacia, paulownia',
      'Compartment count: 4 / 6 / 8 / 9 / 12',
      'Front engraving text and font',
      'Glass tint or frosted option',
      'Velvet or food-safe finish for compartment interior',
      'Hardware finish: brass, antique brass, matte black',
    ],
    packaging:
      'Glass corners protected with EVA foam → individual carton → 5-ply master carton with FRAGILE marking.',
    useCases: ['Premium tea retailers', 'Hotel mini bars', 'Café service', 'Gift retail', 'Boutique guesthouses', 'Restaurant tea service'],
    related: ['acacia-tea-bag-box-8-compartment', 'bamboo-12-compartment-spice-tea-box', 'zebrawood-8-compartment-tea-box'],
  },

  'rustic-2-drawer-tea-storage-box': {
    slug: 'rustic-2-drawer-tea-storage-box',
    name: 'Rustic 2-Drawer Tea / Storage Box',
    closure: 'Drawer',
    tagline: 'Burnt wood 2-drawer cabinet with antique brass ring pulls',
    intro:
      'A rustic burnt-finish 2-drawer cabinet for tea bags, capsules, accessories, or desk supplies. Antique brass ring pulls and visible wood grain produce a vintage workshop look. Stackable footprint suits desktops and counter corners.',
    images: [
      img('3', 'ScreenShot_2026-05-07_173151_726.png'),
      img('3', 'ScreenShot_2026-05-07_173159_433.png'),
      img('3', 'ScreenShot_2026-05-07_173207_246.png'),
      img('3', 'ScreenShot_2026-05-07_173215_072.png'),
    ],
    specs: {
      'Closure Type': '2 pull-out drawers',
      'Material': 'Solid pine, torched / burnt finish',
      'Surface Finish': 'Torched + sealed wax/oil',
      'Hardware': 'Antique brass ring pulls',
      'Drawer Layout': 'Open or with removable dividers',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engrave on top or front',
    },
    customization: [
      'Drawer count: 2 / 3 / 4',
      'Pull style: ring, knob, leather tab',
      'Internal divider grid for tea bags or capsules',
      'Wood finish: torched, walnut stain, weathered',
      'Optional brass label frames on drawers',
    ],
    packaging:
      'Drawers secured with paper insert → individual carton → 5-ply master carton.',
    useCases: ['Office tea / coffee corners', 'Café back-of-counter', 'Studio supply storage', 'Vintage retail display', 'Workshop organizing', 'Home office'],
    related: ['bamboo-mini-2-drawer-box', 'black-3-drawer-compact-storage', 'coffee-machine-stand-drawer'],
  },

  'bamboo-4-compartment-snack-caddy': {
    slug: 'bamboo-4-compartment-snack-caddy',
    name: 'Bamboo 4-Compartment Snack & Tea Caddy',
    closure: 'Open',
    tagline: 'Compact open-top bamboo caddy for tea bags and snack bars',
    intro:
      'A compact open-top bamboo caddy with 4 internal compartments — sized for tea bags, granola bars, snack pouches, or condiment packets. Clean natural bamboo finish, food-safe, stackable, and small enough for any countertop or cabinet shelf.',
    images: [
      img('4', 'ScreenShot_2026-05-07_173246_957.png'),
      img('4', 'ScreenShot_2026-05-07_173254_200.png'),
      img('4', 'ScreenShot_2026-05-07_173301_927.png'),
    ],
    specs: {
      'Closure Type': 'Open-top with internal dividers',
      'Material': 'Natural laminated bamboo',
      'Surface Finish': 'Food-safe oil',
      'Compartments': '4 (custom 6 / 9 available)',
      'Footprint': 'Compact (~18 × 18 cm)',
      'MOQ': '300 pcs',
      'Lead Time': '25 days',
      'Branding': 'Laser engrave on front face or bottom',
    },
    customization: [
      'Compartment count: 4 / 6 / 9',
      'Bamboo color: natural pale or warm carbonized',
      'Footprint sized to fit pantry shelf depth',
      'Removable dividers',
      'Stackable design with locating ridges',
    ],
    packaging:
      'Stacks of 12 in OPP, 5-ply master carton.',
    useCases: ['Pantry organizing', 'Office snack stations', 'Hotel mini bars', 'Café self-service stands', 'Eco gift sets', 'Subscription snack boxes'],
    related: ['bamboo-2-compartment-mini-caddy', 'bamboo-tea-organizer-box', 'bamboo-4-compartment-acrylic-top'],
  },

  'acacia-tea-box-with-drawer-glass-lid': {
    slug: 'acacia-tea-box-with-drawer-glass-lid',
    name: 'Acacia Tea Box with Glass Lid + Lower Drawer',
    closure: 'Hinged',
    tagline: 'Hinged acacia tea box with full-width glass lid and storage drawer',
    intro:
      'A premium acacia tea box with a hinged glass-window lid up top and a separate full-width storage drawer below. Three top compartments for tea bags; the drawer holds spoons, sweeteners, or extra accessories. The dramatic acacia grain pattern makes every piece unique.',
    images: [
      img('5', 'ScreenShot_2026-05-07_173330_363.png'),
      img('5', 'ScreenShot_2026-05-07_173338_891.png'),
      img('5', 'ScreenShot_2026-05-07_173347_193.png'),
      img('5', 'ScreenShot_2026-05-07_173402_955.png'),
    ],
    specs: {
      'Closure Type': 'Hinged glass-window lid + lower drawer',
      'Material': 'Solid acacia hardwood',
      'Surface Finish': 'Oiled with hand-polished topcoat',
      'Hardware': 'Brass hinges · brass front-pull on drawer',
      'Lid Window': 'Tempered glass panel',
      'Top Compartments': '3 (custom on request)',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engrave or brass plate',
    },
    customization: [
      'Top compartment count: 3 / 6 / 9',
      'Drawer interior dividers',
      'Wood: acacia, walnut, oak',
      'Hardware finish: brass, antique, matte black',
      'Custom dimensions for hotel / retail spec',
    ],
    packaging:
      'Glass corners EVA-protected, drawer secured with paper insert, individual carton, 5-ply master.',
    useCases: ['Premium tea retailers', 'Boutique hotels', 'Specialty cafés', 'Executive office gifts', 'Restaurant table service', 'Wedding favor boxes'],
    related: ['acacia-tea-bag-box-8-compartment', 'oak-tea-box-6-compartment-glass-lid', 'zebrawood-8-compartment-tea-box'],
  },

  'vintage-french-curio-tea-box': {
    slug: 'vintage-french-curio-tea-box',
    name: 'Vintage French Curio Tea Box with Glass Door',
    closure: 'Hinged',
    tagline: 'Antique-look wooden curio with French-text glass door',
    intro:
      'A vintage French country-style tea curio with a hinged glass front door, wreath-and-script decoration, and 9 internal compartments. Antique brown stain and weathered hardware suit shabby-chic, French country, and farmhouse interiors. A statement display piece as much as a tea box.',
    images: [
      img('6', 'ScreenShot_2026-05-07_173441_648.png'),
      img('6', 'ScreenShot_2026-05-07_173449_337.png'),
      img('6', 'ScreenShot_2026-05-07_173456_765.png'),
      img('6', 'ScreenShot_2026-05-07_173504_961.png'),
    ],
    specs: {
      'Closure Type': 'Hinged glass-front door with vintage latch',
      'Material': 'Solid pine + tempered glass',
      'Surface Finish': 'Antique brown stain · waxed',
      'Hardware': 'Antique brass hinges and latch',
      'Compartments': '9 fixed-grid interior',
      'Decoration': 'Screen-printed wreath + French text',
      'MOQ': '200 pcs',
      'Lead Time': '35 days',
      'Branding': 'Custom screen-print artwork on glass',
    },
    customization: [
      'Glass artwork: choose stock French / Italian / English text',
      'Wood stain: antique brown, weathered grey, white wash',
      'Compartment grid: 6 / 9 / 12',
      'Hardware finish: antique brass, matte black',
      'Wall-mount or standing variant',
    ],
    packaging:
      'Foam-corner protection on glass, full unit double-boxed for export.',
    useCases: ['French country interiors', 'Boutique gift shops', 'Vintage style cafés', 'Bed-and-breakfast rooms', 'Wedding decor rental', 'Specialty tea retail'],
    related: ['oak-tea-box-6-compartment-glass-lid', 'whitewashed-tea-box-cutout', 'pine-tea-box-laser-cut-mandala'],
  },

  'whitewashed-tea-box-cutout': {
    slug: 'whitewashed-tea-box-cutout',
    name: 'Whitewashed Tea Box with Decorative Cutouts',
    closure: 'Hinged',
    tagline: 'Distressed whitewashed wood with ornate cutout front panel',
    intro:
      'A distressed whitewashed wood tea box with an ornate cutout front panel and hinged glass lid. Romantic shabby-chic aesthetic for tea retailers, vintage hotels, and country-style gifting. 9-compartment interior, lift-out tray for cleaning.',
    images: [
      img('7', 'ScreenShot_2026-05-07_173549_363.png'),
      img('7', 'ScreenShot_2026-05-07_173556_221.png'),
      img('7', 'ScreenShot_2026-05-07_173602_841.png'),
      img('7', 'ScreenShot_2026-05-07_173615_925.png'),
      img('7', 'ScreenShot_2026-05-07_173626_449.png'),
    ],
    specs: {
      'Closure Type': 'Hinged glass-window lid',
      'Material': 'Solid pine, distressed white finish',
      'Surface Finish': 'Whitewash with raw-wood show-through',
      'Hardware': 'Vintage brass hinges and clasp',
      'Compartments': '9 with lift-out tray',
      'Front Detail': 'Laser-cut decorative cutout panel',
      'MOQ': '200 pcs',
      'Lead Time': '35 days',
      'Branding': 'Engraved nameplate on lid',
    },
    customization: [
      'Cutout pattern: floral, baroque, geometric, custom',
      'Color: whitewash, pale grey wash, distressed pink',
      'Compartment count: 6 / 9 / 12',
      'Glass clear or frosted',
      'Hardware: brass, antique brass, oiled bronze',
    ],
    packaging:
      'Cutout corners reinforced with EVA, full unit OPP-wrapped, double-boxed for export.',
    useCases: ['Vintage tea retailers', 'Country-style boutiques', 'B&B amenities', 'Wedding gifting', 'Café shabby-chic decor', 'Romantic gift sets'],
    related: ['vintage-french-curio-tea-box', 'oak-tea-box-6-compartment-glass-lid', 'pine-tea-box-laser-cut-mandala'],
  },

  'zebrawood-8-compartment-tea-box': {
    slug: 'zebrawood-8-compartment-tea-box',
    name: 'Zebrawood-Pattern 8-Compartment Tea Box',
    closure: 'Hinged',
    tagline: 'Striped-grain wood box with hinged glass lid and 8 compartments',
    intro:
      'A striking striped-grain wood tea box (zebrawood / tigerwood look) with a hinged glass-window lid. 8-compartment interior with removable dividers — fits standard tea bag pouches and pyramid sachets. Dramatic visual presence for premium retail and gifting.',
    images: [
      img('8', 'ScreenShot_2026-05-07_173651_545.png'),
      img('8', 'ScreenShot_2026-05-07_173702_015.png'),
      img('8', 'ScreenShot_2026-05-07_173710_505.png'),
    ],
    specs: {
      'Closure Type': 'Hinged glass-window lid with front clasp',
      'Material': 'Striped-grain wood (zebrawood look) or veneer',
      'Surface Finish': 'Oiled, hand polished',
      'Hardware': 'Brass hinges, antique brass clasp',
      'Compartments': '8 (removable dividers)',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engrave on front or lid corner',
    },
    customization: [
      'Material: real zebrawood, tigerwood, or veneered MDF',
      'Compartment count: 6 / 8 / 12',
      'Glass clear or tinted',
      'Hardware finish: brass, copper, matte black',
      'Optional brass nameplate insert on lid',
    ],
    packaging:
      'EVA-corner glass protection, individual carton, 5-ply master.',
    useCases: ['Premium tea retailers', 'Boutique gift shops', 'Specialty hotels', 'Designer kitchen retail', 'Corporate gifting', 'Tea sommelier kits'],
    related: ['oak-tea-box-6-compartment-glass-lid', 'acacia-tea-bag-box-8-compartment', 'bamboo-8-compartment-clear-lid'],
  },

  'bamboo-12-compartment-spice-tea-box': {
    slug: 'bamboo-12-compartment-spice-tea-box',
    name: 'Bamboo 12-Compartment Spice / Tea Box',
    closure: 'Hinged',
    tagline: 'Wide-format bamboo box with full-glass top and 12 small compartments',
    intro:
      'A wide-format bamboo organizer with a full-glass hinged top revealing 12 small compartments — sized for tea bags, spice pouches, capsule pods, or single-serve sachets. Natural bamboo finish, food-safe lacquer interior.',
    images: [
      img('9', 'ScreenShot_2026-05-07_173754_456.png'),
      img('9', 'ScreenShot_2026-05-07_173801_803.png'),
      img('9', 'ScreenShot_2026-05-07_173809_403.png'),
      img('9', 'ScreenShot_2026-05-07_173817_390.png'),
      img('9', 'ScreenShot_2026-05-07_173828_528.png'),
    ],
    specs: {
      'Closure Type': 'Hinged full-panel glass lid',
      'Material': 'Natural laminated bamboo',
      'Surface Finish': 'Food-safe lacquer interior · oil exterior',
      'Hardware': 'Brass-finish hinges',
      'Compartments': '12 small (custom 8 / 9 / 16 available)',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engrave on bamboo front face',
    },
    customization: [
      'Compartment count: 8 / 9 / 12 / 16',
      'Bamboo color: natural or carbonized',
      'Compartment depth (tea bags vs. spice jars)',
      'Optional clear acrylic vs. tempered glass lid',
      'Hardware: brass, matte black, satin nickel',
    ],
    packaging:
      'EVA glass-corner protection, individual OPP, master carton.',
    useCases: ['Spice retailers', 'Tea brands', 'Hotel kitchenettes', 'Office tea/coffee stations', 'Subscription spice boxes', 'Cooking school kits'],
    related: ['bamboo-8-compartment-clear-lid', 'oak-tea-box-6-compartment-glass-lid', 'bamboo-4-compartment-acrylic-top'],
  },

  'bamboo-sliding-lid-lotus-tea-box': {
    slug: 'bamboo-sliding-lid-lotus-tea-box',
    name: 'Bamboo Sliding-Lid Tea Box with Lotus Engraving',
    closure: 'Sliding',
    tagline: 'Hardware-free sliding bamboo box with laser-engraved lotus motif',
    intro:
      'A minimalist bamboo box with a smooth-sliding lid and a delicate lotus motif laser-engraved on top. Hardware-free construction (no hinges, no clasps), making it perfect for high-volume gift packaging where freight cost matters.',
    images: [
      img('set-2', 'ScreenShot_2026-05-07_175736_768.png'),
      img('set-2', 'ScreenShot_2026-05-07_175743_359.png'),
      img('set-2', 'ScreenShot_2026-05-07_175752_367.png'),
      img('set-2', 'ScreenShot_2026-05-07_175800_154.png'),
    ],
    specs: {
      'Closure Type': 'Sliding lid (CNC-routed grooves)',
      'Material': 'Natural bamboo',
      'Surface Finish': 'Food-safe oil',
      'Hardware': 'None — hardware-free',
      'Lid Engraving': 'Laser-engraved lotus motif (custom artwork available)',
      'MOQ': '300 pcs',
      'Lead Time': '25 days',
      'Branding': 'Laser engrave (large area on lid)',
    },
    customization: [
      'Lid artwork: lotus, geometric, brand logo, custom',
      'Bamboo color: natural or carbonized',
      'Internal layout: open, divided 2 / 3 / 4',
      'Sizes: small jewelry up to large gift box',
      'Optional ribbon hole or finger pull',
    ],
    packaging:
      'Stacked in 12s, OPP-wrapped, 5-ply export master carton. Hardware-free design saves on freight.',
    useCases: ['Yoga / wellness brand gifting', 'Wedding favors', 'Spa amenities', 'Eco gift packaging', 'Tea ceremony sets', 'Subscription wellness boxes'],
    related: ['bamboo-tea-organizer-box', 'pine-tea-box-laser-cut-mandala', 'bamboo-hinged-lid-sugar-box'],
  },

  'bamboo-2-tier-coffee-pod-caddy': {
    slug: 'bamboo-2-tier-coffee-pod-caddy',
    name: 'Bamboo 2-Tier Coffee Pod & Tea Bag Caddy',
    closure: 'Open',
    tagline: 'Open 2-shelf bamboo organizer for K-cups, pods, tea bags',
    intro:
      'A clean open 2-shelf bamboo caddy designed for the home coffee bar — top shelf holds tea boxes upright; lower shelf has divided slots for K-cups, Nespresso pods, and stir sticks. Compact footprint that consolidates the morning routine into a single object.',
    images: [
      img('set-3', 'ScreenShot_2026-05-07_175634_206.png'),
      img('set-3', 'ScreenShot_2026-05-07_175643_291.png'),
      img('set-3', 'ScreenShot_2026-05-07_175651_129.png'),
      img('set-3', 'ScreenShot_2026-05-07_175700_441.png'),
    ],
    specs: {
      'Closure Type': 'Open 2-tier shelf',
      'Material': 'Natural bamboo',
      'Surface Finish': 'Food-safe oil + clear lacquer',
      'Configuration': 'Top shelf for boxes, lower shelf with pod slots',
      'MOQ': '200 pcs',
      'Lead Time': '28 days',
      'Branding': 'Laser engrave on front or back panel',
    },
    customization: [
      'Pod slot count and pod type (K-cup vs. Nespresso vs. Dolce Gusto)',
      'Tier count: 2 or 3',
      'Add lower drawer for grounds / accessories',
      'Bamboo natural or carbonized',
      'Optional cup-hook bar above top shelf',
    ],
    packaging:
      'Flat-packed in disassembled tiers, hardware bagged, 5-ply master carton with assembly card.',
    useCases: ['Home coffee bars', 'Office break rooms', 'Hotel suite kitchenettes', 'AirBnB rentals', 'Co-working spaces', 'Specialty coffee retail'],
    related: ['rustic-coffee-bar-caddy-set', 'black-coffee-bar-station-caddy', 'coffee-machine-stand-drawer'],
  },

  'black-3-drawer-compact-storage': {
    slug: 'black-3-drawer-compact-storage',
    name: 'Black 3-Drawer Compact Tea / Coffee / Spice Storage',
    closure: 'Drawer',
    tagline: 'Stackable matte-black 3-drawer mini cabinet',
    intro:
      'A stackable matte-black mini cabinet with three pull-out drawers for tea bags, coffee pods, spice pouches, or any small kitchen consumable. Compact design fits inside cupboards or stacks on countertops. Soft-touch finish that resists fingerprints.',
    images: [
      img('set-4', 'ScreenShot_2026-05-07_175524_283.png'),
      img('set-4', 'ScreenShot_2026-05-07_175532_318.png'),
      img('set-4', 'ScreenShot_2026-05-07_175541_745.png'),
    ],
    specs: {
      'Closure Type': '3 pull-out drawers',
      'Material': 'MDF or pine, matte black paint',
      'Surface Finish': 'Soft-touch matte black',
      'Hardware': 'Wood ball pulls (paint-matched or contrast)',
      'Drawer Layout': 'Open or with removable internal dividers',
      'MOQ': '300 pcs',
      'Lead Time': '28 days',
      'Branding': 'White screen print or hot foil on top',
    },
    customization: [
      'Drawer count: 2 / 3 / 4',
      'Color: matte black, matte white, custom RAL',
      'Pull style: wood ball, ring, recessed',
      'Internal divider grid for capsules / tea bags',
      'Stackable connectors for multi-unit towers',
    ],
    packaging:
      'Drawers secured with paper insert, soft-cloth wrap to protect matte finish, individual carton.',
    useCases: ['Modern kitchens', 'Home office desks', 'Studio supply storage', 'Designer cafés', 'Hotel premium rooms', 'Subscription accessory boxes'],
    related: ['rustic-2-drawer-tea-storage-box', 'bamboo-mini-2-drawer-box', 'black-coffee-bar-station-caddy'],
  },

  'bamboo-4-compartment-acrylic-top': {
    slug: 'bamboo-4-compartment-acrylic-top',
    name: 'Bamboo 4-Compartment Open Tea Box with Acrylic Top',
    closure: 'Hinged',
    tagline: 'Open-front bamboo organizer with hinged clear acrylic lid',
    intro:
      'A bamboo tea organizer with open compartments visible from the front and a hinged clear acrylic top lid. Fits flat against the back of the counter — display-style storage that lets you see the tea selection without lifting anything.',
    images: [
      img('set-5', 'ScreenShot_2026-05-07_175420_316.png'),
      img('set-5', 'ScreenShot_2026-05-07_175428_671.png'),
      img('set-5', 'ScreenShot_2026-05-07_175437_399.png'),
      img('set-5', 'ScreenShot_2026-05-07_175446_755.png'),
    ],
    specs: {
      'Closure Type': 'Hinged acrylic lid · open front',
      'Material': 'Natural bamboo',
      'Surface Finish': 'Food-safe oil',
      'Hardware': 'Brass-finish hinges',
      'Lid Material': '3 mm clear acrylic',
      'Compartments': '4 (custom 6 available)',
      'MOQ': '200 pcs',
      'Lead Time': '28 days',
      'Branding': 'Laser engrave on bamboo front edge',
    },
    customization: [
      'Compartment count: 4 / 6',
      'Bamboo natural or carbonized',
      'Lid material: clear acrylic, frosted, real glass',
      'Optional name labels per compartment',
      'Compartment depth (tea bags vs. loose leaf canisters)',
    ],
    packaging:
      'Acrylic protected with PE film, OPP-wrapped, master carton.',
    useCases: ['Café tea service', 'Hotel breakfast bars', 'Office tea stations', 'Specialty retail display', 'Tea sampling booths', 'Boutique guesthouses'],
    related: ['bamboo-tea-organizer-clear-lid', 'bamboo-12-compartment-spice-tea-box', 'bamboo-8-compartment-clear-lid'],
  },

  'bamboo-hinged-lid-sugar-box': {
    slug: 'bamboo-hinged-lid-sugar-box',
    name: 'Bamboo Hinged-Lid Sugar / Tea Cube Box',
    closure: 'Hinged',
    tagline: 'Compact bamboo box with side cutout handle and hinged lid',
    intro:
      'A compact bamboo cube-style box with a hinged top lid and a side cutout handle for one-finger lifting. Sized for sugar cubes, tea bags, or small pantry staples. Natural bamboo finish with visible end-grain detail.',
    images: [
      img('set-6', 'ScreenShot_2026-05-07_175315_342.png'),
      img('set-6', 'ScreenShot_2026-05-07_175322_426.png'),
      img('set-6', 'ScreenShot_2026-05-07_175329_158.png'),
    ],
    specs: {
      'Closure Type': 'Hinged top lid',
      'Material': 'Natural bamboo',
      'Surface Finish': 'Food-safe oil',
      'Hardware': 'Hidden bamboo pivot hinge',
      'Handle': 'Cutout side handle',
      'Compartments': 'Single open interior or 2-section',
      'MOQ': '300 pcs',
      'Lead Time': '25 days',
      'Branding': 'Laser engrave on lid or front',
    },
    customization: [
      'Interior: single, 2-section, or 4-section',
      'Lid finish: natural, dark stained, lotus engraved',
      'Sizes: sugar-cube, tea-bag, or larger pantry box',
      'Optional rubber ring seal for moisture-tight closure',
      'Bamboo natural or carbonized',
    ],
    packaging:
      'OPP individual, master carton 24 pcs.',
    useCases: ['Café service', 'Tea ceremony sets', 'Sugar cube packaging', 'Spa amenity', 'Wedding favor', 'Subscription wellness boxes'],
    related: ['bamboo-sliding-lid-lotus-tea-box', 'bamboo-2-compartment-mini-caddy', 'bamboo-tea-organizer-box'],
  },

  'bamboo-mini-2-drawer-box': {
    slug: 'bamboo-mini-2-drawer-box',
    name: 'Bamboo Mini 2-Drawer Tea / Accessory Box',
    closure: 'Drawer',
    tagline: 'Compact bamboo 2-drawer box with engraved lid',
    intro:
      'A small footprint bamboo 2-drawer box with knob pulls and an engraved lid. Sized for tea bags, jewelry, sewing notions, or desk supplies. The clean modern bamboo finish suits both kitchen and office contexts.',
    images: [
      img('set-7', 'ScreenShot_2026-05-07_175226_262.png'),
      img('set-7', 'ScreenShot_2026-05-07_175234_854.png'),
      img('set-7', 'ScreenShot_2026-05-07_175243_200.png'),
      img('set-7', 'ScreenShot_2026-05-07_175251_391.png'),
    ],
    specs: {
      'Closure Type': '2 pull-out drawers',
      'Material': 'Natural bamboo',
      'Surface Finish': 'Food-safe oil',
      'Hardware': 'Bamboo knob pulls',
      'Drawer Layout': 'Open with optional removable dividers',
      'Lid Engraving': 'Custom artwork on top',
      'MOQ': '300 pcs',
      'Lead Time': '25 days',
      'Branding': 'Laser engrave on lid',
    },
    customization: [
      'Drawer count: 2 / 3 / 4',
      'Drawer height to fit tea bags, jewelry, or capsules',
      'Lid engraving: custom logo or stock motifs',
      'Pull material: bamboo, brass, leather tab',
      'Removable dividers per drawer',
    ],
    packaging:
      'Drawers secured with paper insert, individual carton, master carton 24 pcs.',
    useCases: ['Office desk storage', 'Vanity tabletop organizers', 'Tea station', 'Craft / sewing notion storage', 'Pet treat storage', 'Gift sets'],
    related: ['rustic-2-drawer-tea-storage-box', 'black-3-drawer-compact-storage', 'coffee-machine-stand-drawer'],
  },

  'pine-tea-box-laser-cut-mandala': {
    slug: 'pine-tea-box-laser-cut-mandala',
    name: 'Pine Tea Box with Laser-Cut Mandala Lid',
    closure: 'Hinged',
    tagline: 'Solid pine tea box with intricate cut-through mandala lid',
    intro:
      'A solid pine tea box with an intricately laser-cut mandala pattern through the lid. The cutwork casts patterned shadows on the contents and adds visual interest. 8-compartment interior fitted with brass clasp closure.',
    images: [
      img('set-8', 'ScreenShot_2026-05-07_175115_995.png'),
      img('set-8', 'ScreenShot_2026-05-07_175123_326.png'),
      img('set-8', 'ScreenShot_2026-05-07_175131_086.png'),
      img('set-8', 'ScreenShot_2026-05-07_175139_406.png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid with brass clasp',
      'Material': 'Solid pine',
      'Surface Finish': 'Natural pine with clear lacquer',
      'Hardware': 'Brass hinges + brass front clasp',
      'Lid Detail': 'Laser-cut mandala cutwork (through-cut)',
      'Compartments': '8 (custom available)',
      'MOQ': '200 pcs',
      'Lead Time': '32 days',
      'Branding': 'Custom cutwork artwork on lid',
    },
    customization: [
      'Cutwork pattern: mandala, geometric, floral, custom artwork',
      'Wood: pine, paulownia, oak',
      'Compartment count: 6 / 8 / 9 / 12',
      'Stain: natural, walnut, espresso',
      'Hardware: brass, antique brass, matte black',
    ],
    packaging:
      'Cutwork lid corners EVA-protected, individual carton, double-boxed for export.',
    useCases: ['Yoga / wellness retail', 'Boutique tea brands', 'Home decor stores', 'Spa amenities', 'Wedding decor', 'Specialty gift packaging'],
    related: ['vintage-french-curio-tea-box', 'whitewashed-tea-box-cutout', 'bamboo-sliding-lid-lotus-tea-box'],
  },

  'bamboo-2-compartment-mini-caddy': {
    slug: 'bamboo-2-compartment-mini-caddy',
    name: 'Bamboo 2-Compartment Mini Sachet Caddy',
    closure: 'Open',
    tagline: 'Smallest-footprint bamboo caddy for sachets and packets',
    intro:
      'The smallest open-top bamboo caddy in our catalog — 2 internal compartments sized for stick-sachets, sugar packets, or single-serve coffee. Sized to fit cup handles or counter corners. Sold as a coordinated 2-piece set.',
    images: [
      img('set-9', 'ScreenShot_2026-05-07_175030_397.png'),
      img('set-9', 'ScreenShot_2026-05-07_175037_584.png'),
      img('set-9', 'ScreenShot_2026-05-07_175044_991.png'),
      img('set-9', 'ScreenShot_2026-05-07_175052_923.png'),
    ],
    specs: {
      'Closure Type': 'Open-top with single divider',
      'Material': 'Natural bamboo',
      'Surface Finish': 'Food-safe oil',
      'Compartments': '2 (with removable divider)',
      'Set': '2 nesting sizes',
      'Footprint': 'Compact (~12 × 12 cm)',
      'MOQ': '500 pcs (sold in pairs)',
      'Lead Time': '22 days',
      'Branding': 'Laser engrave on front face',
    },
    customization: [
      'Single piece or 2-piece set',
      'Compartment count: 2 / 3 / 4',
      'Bamboo natural or carbonized',
      'Footprint to match specific cup or sachet sizes',
      'Optional logo engraving for branded amenities',
    ],
    packaging:
      'Set packed nested, OPP-wrapped, 48 sets per master carton.',
    useCases: ['Hotel in-room amenities', 'Café table service', 'Office snack stations', 'Restaurant condiment caddy', 'Subscription welcome kits', 'Eco gift sets'],
    related: ['bamboo-4-compartment-snack-caddy', 'bamboo-hinged-lid-sugar-box', 'bamboo-tea-organizer-box'],
  },

  'black-wood-packet-holder-caddy': {
    slug: 'black-wood-packet-holder-caddy',
    name: 'Black Wood "Packets" Holder Caddy',
    closure: 'Open',
    tagline: 'Tilted-front black wood caddy with chalk-style "PACKETS" label',
    intro:
      'A tilted-front black wood caddy designed for grab-and-go packet storage — single-serve sweeteners, condiments, snack bars, and stick-sachets. Front "PACKETS" chalk-style label customizable to brand needs. Sized for office break rooms and café self-service stations.',
    images: [
      img('set-10', 'ScreenShot_2026-05-07_174318_929.png'),
      img('set-10', 'ScreenShot_2026-05-07_174326_098.png'),
      img('set-10', 'ScreenShot_2026-05-07_174333_100.png'),
      img('set-10', 'ScreenShot_2026-05-07_174340_542.png'),
      img('set-10', 'ScreenShot_2026-05-07_174349_155.png'),
    ],
    specs: {
      'Closure Type': 'Open tilted-front',
      'Material': 'MDF or pine, matte black paint',
      'Surface Finish': 'Soft-touch matte black',
      'Compartments': '3 (custom 4 / 5 available)',
      'Front Label': 'Chalk-style "PACKETS" screen-print',
      'MOQ': '300 pcs',
      'Lead Time': '28 days',
      'Branding': 'Custom front text and logo on side',
    },
    customization: [
      'Front text: PACKETS, SUGAR, SNACKS, custom',
      'Compartment count: 3 / 4 / 5',
      'Color: matte black, white, RAL custom',
      'Tilt angle to fit specific packet height',
      'Stackable design for multi-unit display',
    ],
    packaging:
      'Soft-cloth wrap, individual carton, 5-ply master.',
    useCases: ['Office break rooms', 'Café self-service stations', 'Hotel breakfast bars', 'Convention centers', 'Restaurant condiment counters', 'Co-working pantries'],
    related: ['black-coffee-bar-station-caddy', 'black-coffee-bar-3-compartment', 'rustic-coffee-bar-caddy-set'],
  },

  'black-coffee-bar-station-caddy': {
    slug: 'black-coffee-bar-station-caddy',
    name: 'Black "Coffee Bar" Station Caddy',
    closure: 'Open',
    tagline: 'Multi-compartment matte black caddy with white "Coffee Bar" script',
    intro:
      'A wide multi-compartment matte black caddy designed for the full coffee station — pods, sugar canister, stir sticks, cup stack, milk pots. Distinctive "Coffee Bar" script branding. The flagship of our coffee-bar accessory range.',
    images: [
      img('set-11', 'ScreenShot_2026-05-07_174411_122.png'),
      img('set-11', 'ScreenShot_2026-05-07_174420_736.png'),
      img('set-11', 'ScreenShot_2026-05-07_174428_292.png'),
      img('set-11', 'ScreenShot_2026-05-07_174435_888.png'),
    ],
    specs: {
      'Closure Type': 'Open multi-compartment',
      'Material': 'MDF or pine, matte black paint',
      'Surface Finish': 'Soft-touch matte black',
      'Compartments': '5-7 internal divisions',
      'Front Label': 'White "Coffee Bar" script screen-print',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Custom front text and side branding',
    },
    customization: [
      'Front text: "Coffee Bar", "Tea Bar", custom phrase',
      'Compartment layout customized to user item types',
      'Color: matte black, matte white, RAL custom',
      'Sizes from desk-corner to full-counter',
      'Optional cup-hook bar above',
    ],
    packaging:
      'Soft-cloth protection, individual carton, 5-ply master.',
    useCases: ['Home coffee bars', 'Office break rooms', 'AirBnB rentals', 'Hotel suite kitchenettes', 'Modern cafés', 'Specialty coffee retail'],
    related: ['black-coffee-bar-3-compartment', 'black-wood-packet-holder-caddy', 'rustic-coffee-bar-caddy-set'],
  },

  'black-coffee-bar-3-compartment': {
    slug: 'black-coffee-bar-3-compartment',
    name: 'Black "Coffee Bar" 3-Compartment Caddy',
    closure: 'Open',
    tagline: 'Compact 3-compartment matte black caddy with "Coffee Bar" script',
    intro:
      'A compact 3-compartment version of our flagship Coffee Bar caddy. Sized for smaller home counters or office desks. Each compartment 3.7" wide — fits standard coffee pods, tea bag boxes, or small accessory containers.',
    images: [
      img('set-12', 'ScreenShot_2026-05-07_174444_288.png'),
      img('set-12', 'ScreenShot_2026-05-07_174544_051.png'),
      img('set-12', 'ScreenShot_2026-05-07_174551_173.png'),
      img('set-12', 'ScreenShot_2026-05-07_174559_743.png'),
      img('set-12', 'ScreenShot_2026-05-07_174608_139.png'),
      img('set-12', 'ScreenShot_2026-05-07_174617_539.png'),
    ],
    specs: {
      'Closure Type': 'Open 3-compartment',
      'Material': 'MDF or pine, matte black paint',
      'Surface Finish': 'Soft-touch matte black',
      'Compartments': '3 × 3.7" wide compartments',
      'Front Label': 'White "Coffee Bar" script screen-print',
      'MOQ': '300 pcs',
      'Lead Time': '28 days',
      'Branding': 'Custom front text and logo',
    },
    customization: [
      'Front text: "Coffee Bar", "Tea Bar", custom',
      'Compartment count: 2 / 3 / 4',
      'Compartment width to fit specific items',
      'Color: matte black, white, RAL custom',
      'Stackable for multi-unit display',
    ],
    packaging:
      'Soft-cloth protection, individual carton, 5-ply master 24 pcs.',
    useCases: ['Home coffee bars', 'Compact office stations', 'Café tabletops', 'Hotel rooms', 'Catering setups', 'Subscription kits'],
    related: ['black-coffee-bar-station-caddy', 'rustic-coffee-bar-caddy-set', 'black-wood-packet-holder-caddy'],
  },

  'bamboo-8-compartment-clear-lid': {
    slug: 'bamboo-8-compartment-clear-lid',
    name: 'Bamboo 8-Compartment Tea Box with Clear Lid',
    closure: 'Hinged',
    tagline: 'Two-size bamboo tea organizers with full-glass hinged lids',
    intro:
      'Our most popular tea box format, available in 2 sizes — bamboo body with full-glass hinged lid and 8 internal compartments. Removable dividers, brass front clasp, food-safe finish. Versatile workhorse for retail tea brands and hospitality.',
    images: [
      img('set-13', 'ScreenShot_2026-05-07_174643_030.png'),
      img('set-13', 'ScreenShot_2026-05-07_174650_251.png'),
      img('set-13', 'ScreenShot_2026-05-07_174657_199.png'),
      img('set-13', 'ScreenShot_2026-05-07_174704_983.png'),
    ],
    specs: {
      'Closure Type': 'Hinged glass-window lid with brass clasp',
      'Material': 'Natural laminated bamboo',
      'Surface Finish': 'Food-safe oil',
      'Hardware': 'Brass hinges + brass front clasp',
      'Lid Window': 'Full panel tempered glass',
      'Compartments': '8 (removable dividers)',
      'Sizes': 'Available in 2 footprints (small / large)',
      'MOQ': '200 pcs',
      'Lead Time': '28 days',
      'Branding': 'Laser engrave on bamboo front',
    },
    customization: [
      'Compartment count: 6 / 8 / 9 / 12',
      'Bamboo natural or carbonized',
      'Glass clear, frosted, or tinted',
      'Hardware: brass, antique, matte black',
      '2 standard footprint sizes or fully custom',
    ],
    packaging:
      'Glass corners EVA-protected, individual carton, master carton 12 pcs.',
    useCases: ['Tea retailers', 'Hotel mini bars', 'Café service', 'Office tea stations', 'Boutique guesthouses', 'Subscription tea boxes'],
    related: ['bamboo-tea-organizer-clear-lid', 'oak-tea-box-6-compartment-glass-lid', 'bamboo-12-compartment-spice-tea-box'],
  },

  'rotating-360-tea-box': {
    slug: 'rotating-360-tea-box',
    name: 'Rotating 360° Tea Box (Lazy Susan)',
    closure: 'Open',
    tagline: 'Spinning wood tea organizer for 360° access to all compartments',
    intro:
      'A unique rotating wooden tea organizer with smooth 360° spin — every compartment is one quarter-turn away. Holds 8 tea bag types in vertical slots; ideal for café self-service, hotel breakfast bars, and home tea enthusiasts. Walnut-stained finish on solid pine.',
    images: [
      img('set-14', 'ScreenShot_2026-05-07_174732_023.png'),
      img('set-14', 'ScreenShot_2026-05-07_174739_418.png'),
      img('set-14', 'ScreenShot_2026-05-07_174747_543.png'),
      img('set-14', 'ScreenShot_2026-05-07_174755_451.png'),
    ],
    specs: {
      'Closure Type': 'Open vertical slots',
      'Material': 'Solid pine, walnut-stained',
      'Surface Finish': 'Walnut stain + clear matte sealer',
      'Hardware': 'Smooth 360° rotating bearing base',
      'Slot Count': '8 (4 sides × 2 slots)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engrave on top or base',
    },
    customization: [
      'Slot count: 4 / 6 / 8 / 12',
      'Sides: 2 / 4 / 6 / 8',
      'Wood stain: walnut, oak, espresso, ebony',
      'Base material: bamboo, oak, MDF',
      'Optional top handle for lifting',
    ],
    packaging:
      'Bearing base secured with cardboard insert to prevent transit damage. Individual carton, master 12 pcs.',
    useCases: ['Café self-service stations', 'Hotel breakfast bars', 'Home tea enthusiasts', 'Office tea corners', 'Specialty tea retail', 'Gift retail'],
    related: ['oak-tea-box-6-compartment-glass-lid', 'bamboo-2-tier-coffee-pod-caddy', 'wood-metal-tea-station'],
  },

  'acacia-3-compartment-open-tray': {
    slug: 'acacia-3-compartment-open-tray',
    name: 'Acacia 3-Compartment Open Tray Caddy',
    closure: 'Open',
    tagline: 'Long open tray with 3 compartments and side carry cutouts',
    intro:
      'A long open tray with 3 deep compartments and side carry cutouts — perfect for tea bag selection, condiment service, or kitchen prep mise en place. Honey-toned solid acacia with a hand-rubbed oil finish. Reads as both organizer and serving piece.',
    images: [
      img('set-15', 'ScreenShot_2026-05-07_174913_174.png'),
      img('set-15', 'ScreenShot_2026-05-07_174920_679.png'),
      img('set-15', 'ScreenShot_2026-05-07_174927_560.png'),
      img('set-15', 'ScreenShot_2026-05-07_174935_664.png'),
    ],
    specs: {
      'Closure Type': 'Open tray with internal dividers',
      'Material': 'Solid acacia hardwood',
      'Surface Finish': 'Hand-rubbed oil + wax',
      'Compartments': '3 (custom 2 / 4 / 5 available)',
      'Handles': 'Side cutout carry handles',
      'MOQ': '300 pcs',
      'Lead Time': '28 days',
      'Branding': 'Laser engrave or burned-in mark on bottom',
    },
    customization: [
      'Compartment count: 2 / 3 / 4 / 5',
      'Wood: acacia, walnut, oak, bamboo',
      'Surface finish: oil, wax, food-safe lacquer',
      'Handle style: cutout, brass D-ring, leather strap',
      'Length: short, medium, long (custom dimensions)',
    ],
    packaging:
      'OPP-wrapped, individual carton, master 24 pcs.',
    useCases: ['Restaurant table service', 'Kitchen prep mise en place', 'Café condiment trays', 'Coffee service caddies', 'Charcuterie / appetizer service', 'Home tea station'],
    related: ['acacia-tea-bag-box-8-compartment', 'bamboo-4-compartment-snack-caddy', 'rustic-coffee-bar-caddy-set'],
  },
};

export const PRODUCT_SLUGS = Object.keys(PRODUCTS);
export const CLOSURES = Array.from(new Set(Object.values(PRODUCTS).map((p) => p.closure)));
