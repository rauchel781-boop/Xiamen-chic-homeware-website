// ─────────────────────────────────────────────────────────────────────────
// Magnetic Wooden Boxes — 9 products
// Image paths reference /public/magnetic-wooden-box/<folder>/
// ─────────────────────────────────────────────────────────────────────────

const PARENT = 'Magnetic wooden box';
const img = (folder, name) =>
  '/' + [PARENT, folder, name].map(encodeURIComponent).join('/');

export const PRODUCTS = {
  'beech-magnetic-dice-tube-box': {
    slug: 'beech-magnetic-dice-tube-box',
    name: 'Beech Magnetic Dice Tube Box',
    closure: 'Magnetic',
    tagline: 'Oval beech dice rolling tray + magnetic case',
    intro:
      'A two-piece beech dice case with concealed neodymium magnets. Snaps closed for travel; opens flat into a felt-lined rolling tray. Sized for a single set of D&D polyhedral dice.',
    images: [
      img('1', 'ScreenShot_2026-05-05_150512_788.png'),
      img('1', 'ScreenShot_2026-05-05_150518_887.png'),
      img('1', 'ScreenShot_2026-05-05_150525_881.png'),
      img('1', 'ScreenShot_2026-05-05_150534_708.png'),
    ],
    specs: {
      'Closure Type': 'Hidden magnetic two-piece',
      'Material': 'Solid beech',
      'Surface Finish': 'Hand-rubbed oil',
      'Hardware': 'Concealed neodymium magnets',
      'Interior Lining': 'Routed dice cradle (felt optional)',
      'Size': '180 × 60 × 40 mm',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Wood: beech, walnut, oak, maple',
      'Engraved logo or campaign name',
      'Felt or open dice cradle',
      'Single-set or 2-set capacity',
      'Optional dice bundle',
      'Custom shape (oval / rectangular)',
    ],
    packaging:
      'Foam-wrapped, retail box, 5-ply export master carton.',
    useCases: ['D&D / TTRPG players', 'Game store retail', 'Game-night gifting', 'Convention merchandise', 'Hobbyist gift sets', 'Dice subscription boxes'],
    related: ['bamboo-magnetic-hex-dice-box', 'sapele-magnetic-dice-display-box', 'walnut-magnetic-puzzle-mini-box'],
  },

  'walnut-magnetic-puzzle-mini-box': {
    slug: 'walnut-magnetic-puzzle-mini-box',
    name: 'Walnut Magnetic Puzzle Mini Box',
    closure: 'Magnetic',
    tagline: 'Pocket-size walnut box with sliding puzzle interior',
    intro:
      'A pocket-size walnut box with a magnetic flap and an interior sliding puzzle that hides a small chamber underneath — perfect for engagement rings, memory pieces, or thoughtful gifts that require a moment of cleverness to open.',
    images: [
      img('set-1', 'ScreenShot_2026-05-05_150558_047.png'),
      img('set-1', 'ScreenShot_2026-05-05_150605_075.png'),
      img('set-1', 'ScreenShot_2026-05-05_150611_045.png'),
      img('set-1', 'ScreenShot_2026-05-05_150617_975.png'),
    ],
    specs: {
      'Closure Type': 'Magnetic flap + puzzle interior',
      'Material': 'Solid walnut',
      'Surface Finish': 'Hand-rubbed oil',
      'Hardware': 'Concealed neodymium magnets',
      'Interior Lining': 'Routed puzzle chamber',
      'Size': '70 × 50 × 25 mm',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Wood: walnut, mahogany, oak',
      'Puzzle pattern: classic / custom',
      'Felt or velvet inside chamber',
      'Engraved monogram or message',
      'Optional outer gift sleeve',
      'Sized for ring / pendant / memento',
    ],
    packaging:
      'Wrapped in tissue, gift sleeve, retail box, 5-ply export master carton.',
    useCases: ['Engagement rings', 'Anniversary gifts', 'Pendant gifts', 'Promise gifts', 'Puzzle enthusiasts', 'Holiday surprise packaging'],
    related: ['walnut-magnetic-engagement-ring-box', 'beech-magnetic-dice-tube-box', 'walnut-pine-magnetic-pocket-box'],
  },

  'bamboo-magnetic-hex-dice-box': {
    slug: 'bamboo-magnetic-hex-dice-box',
    name: 'Bamboo Hexagonal Magnetic Dice Box',
    closure: 'Magnetic',
    tagline: 'Honeycomb-inspired hexagonal dice display case',
    intro:
      'A hexagonal bamboo dice case with seven recessed slots laid out in a honeycomb pattern — one for each polyhedral D&D die. Magnetic top snaps shut; designed for serious tabletop RPG enthusiasts.',
    images: [
      img('set-2', 'ScreenShot_2026-05-05_151025_954.png'),
      img('set-2', 'ScreenShot_2026-05-05_151033_138.png'),
      img('set-2', 'ScreenShot_2026-05-05_151040_433.png'),
      img('set-2', 'ScreenShot_2026-05-05_151047_752.png'),
    ],
    specs: {
      'Closure Type': 'Hidden magnetic two-piece',
      'Material': 'Carbonized moso bamboo',
      'Surface Finish': 'Natural satin oil',
      'Hardware': 'Concealed neodymium magnets',
      'Interior Lining': 'Routed hex dice slots (×7)',
      'Size': '180 × 160 × 30 mm (hexagonal)',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Bamboo, walnut, mahogany',
      '7-slot or custom layout',
      'Felt or open dice slots',
      'Engraved campaign name or logo',
      'Optional dice bundle (resin or metal)',
      'Sized for polyhedral or 6-sided dice',
    ],
    packaging:
      'Foam-wrapped, retail box, 5-ply export master carton.',
    useCases: ['D&D / TTRPG players', 'Game store retail', 'Convention merch', 'Game-night gifting', 'Dice subscription', 'Geek gifting'],
    related: ['beech-magnetic-dice-tube-box', 'sapele-magnetic-dice-display-box', 'walnut-pine-magnetic-cube-pair'],
  },

  'pine-magnetic-cigar-travel-case': {
    slug: 'pine-magnetic-cigar-travel-case',
    name: 'Pine Magnetic Cigar Travel Case',
    closure: 'Magnetic',
    tagline: 'Pocket cigar travel case with magnetic lid',
    intro:
      'A slim pine cigar travel case with a magnetic hinged lid that holds 4–6 cigars snugly. Built to fit jacket pockets and carry-on bags; lined with cedar veneer for proper aging conditions.',
    images: [
      img('set-3', 'ScreenShot_2026-05-05_151122_530.png'),
      img('set-3', 'ScreenShot_2026-05-05_151130_253.png'),
      img('set-3', 'ScreenShot_2026-05-05_151138_591.png'),
      img('set-3', 'ScreenShot_2026-05-05_151147_834.png'),
    ],
    specs: {
      'Closure Type': 'Magnetic hinged lid',
      'Material': 'Pine + Spanish cedar lining',
      'Surface Finish': 'Natural oil',
      'Hardware': 'Concealed neodymium magnets',
      'Interior Lining': 'Cedar veneer (humidor-grade)',
      'Size': '230 × 110 × 40 mm',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Capacity: 4 / 6 / 8 cigars',
      'Pine, walnut, mahogany',
      'Cedar veneer lining (humidor-grade)',
      'Optional travel humidifier strip',
      'Engraved monogram',
      'Sized for jacket pocket or carry-on',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Cigar enthusiasts', 'Travel humidor', 'Father\'s Day gifts', 'Premium men\'s gifting', 'Cigar lounge retail', 'Wedding party gifts'],
    related: ['pine-groomsman-cigar-sliding-box', 'walnut-pine-magnetic-pocket-box', 'walnut-magnetic-office-watch-tray'],
  },

  'sapele-magnetic-dice-display-box': {
    slug: 'sapele-magnetic-dice-display-box',
    name: 'Sapele Magnetic Dice Display Box',
    closure: 'Magnetic',
    tagline: 'Engraved sapele dice display with magnetic seal',
    intro:
      'A long, slim sapele dice display box with hexagonal slots cut into the body and an engraved monogram on the lid. The magnetic seal keeps a personalized dice set safe between sessions.',
    images: [
      img('set-4', 'ScreenShot_2026-05-05_151202_741.png'),
      img('set-4', 'ScreenShot_2026-05-05_151209_721.png'),
      img('set-4', 'ScreenShot_2026-05-05_151216_684.png'),
      img('set-4', 'ScreenShot_2026-05-05_151223_750.png'),
    ],
    specs: {
      'Closure Type': 'Magnetic sliding lid',
      'Material': 'Solid sapele (mahogany family)',
      'Surface Finish': 'Hand-rubbed oil',
      'Hardware': 'Concealed neodymium magnets',
      'Interior Lining': 'Routed hex dice slots',
      'Size': '230 × 80 × 30 mm',
      'MOQ': '200 pcs',
      'Lead Time': '35 days',
      'Branding': 'Custom engraved player name + dice icon',
    },
    customization: [
      'Wood: sapele, walnut, mahogany',
      'Engraved player name + character',
      '7 or 9 slot layout',
      'Felt or open slots',
      'Optional metal dice bundle',
      'Custom internal arrangement',
    ],
    packaging:
      'Wrapped in tissue, retail box, 5-ply export master carton.',
    useCases: ['Personalized D&D gift', 'Player-name engraved gift', 'Convention merch', 'Premium hobbyist gift', 'Game store retail', 'Birthday gift'],
    related: ['bamboo-magnetic-hex-dice-box', 'beech-magnetic-dice-tube-box', 'walnut-pine-magnetic-cube-pair'],
  },

  'walnut-pine-magnetic-cube-pair': {
    slug: 'walnut-pine-magnetic-cube-pair',
    name: 'Walnut & Oak Magnetic Cube Pair',
    closure: 'Magnetic',
    tagline: 'Pair of two-tone magnetic mini cubes for desktop fidget',
    intro:
      'A pair of solid wood mini cube boxes — one walnut, one oak — that snap together via concealed magnets. A satisfying tactile object for desktops, with a small interior compartment for treasure.',
    images: [
      img('set-5', 'ScreenShot_2026-05-05_151338_748.png'),
      img('set-5', 'ScreenShot_2026-05-05_151345_579.png'),
      img('set-5', 'ScreenShot_2026-05-05_151352_640.png'),
    ],
    specs: {
      'Closure Type': 'Magnetic two-piece cube',
      'Material': 'Walnut + oak (pair)',
      'Surface Finish': 'Hand-rubbed oil',
      'Hardware': 'Concealed neodymium magnets',
      'Interior Lining': 'Open mini cavity',
      'Size': '50 × 50 × 50 mm each',
      'MOQ': '300 sets',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on top face',
    },
    customization: [
      'Wood combinations: walnut+oak, walnut+maple, etc.',
      'Cube size: 40 / 50 / 60 mm',
      'Engraved logo or initials',
      'Open cavity or routed insert',
      'Sold as solo or pair',
      'Premium gift packaging',
    ],
    packaging:
      'Pair packed together in foam tray, retail box, 5-ply export master carton.',
    useCases: ['Desktop fidget', 'Premium corporate gift', 'Desk decor', 'Promise gifts', 'Architect / designer gifting', 'Modern jewelry box'],
    related: ['walnut-magnetic-puzzle-mini-box', 'walnut-pine-magnetic-pocket-box', 'walnut-magnetic-engagement-ring-box'],
  },

  'walnut-pine-magnetic-pocket-box': {
    slug: 'walnut-pine-magnetic-pocket-box',
    name: 'Walnut & Pine Magnetic Pocket Box',
    closure: 'Magnetic',
    tagline: 'Two-tone pocket box with felt-lined interior',
    intro:
      'A two-tone pocket box — a walnut lid over a pine base — sealed with concealed magnets. Sized for everyday carry items: rings, dice, earbuds, or coins. The contrast between dark walnut and pale pine is the design.',
    images: [
      img('set-6', 'ScreenShot_2026-05-05_151415_764.png'),
      img('set-6', 'ScreenShot_2026-05-05_151421_509.png'),
      img('set-6', 'ScreenShot_2026-05-05_151427_650.png'),
      img('set-6', 'ScreenShot_2026-05-05_151434_009.png'),
    ],
    specs: {
      'Closure Type': 'Magnetic lift-off lid',
      'Material': 'Walnut lid + pine base',
      'Surface Finish': 'Natural oil',
      'Hardware': 'Concealed neodymium magnets',
      'Interior Lining': 'Felt or microfiber pad',
      'Size': '120 × 70 × 30 mm',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Wood pairing: walnut+pine, walnut+oak, etc.',
      'Felt color: black / cream / blush',
      'Engraved logo or monogram',
      'Multiple sizes (S / M / L)',
      'Optional ring or earbud cradle',
      'Premium gift packaging',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Everyday carry', 'Ring storage', 'Earbud / AirPods case', 'Coin storage', 'Father\'s Day gift', 'Anniversary gift'],
    related: ['walnut-pine-magnetic-cube-pair', 'walnut-magnetic-engagement-ring-box', 'walnut-magnetic-office-watch-tray'],
  },

  'walnut-magnetic-office-watch-tray': {
    slug: 'walnut-magnetic-office-watch-tray',
    name: 'Walnut Magnetic Office Watch Tray',
    closure: 'Magnetic',
    tagline: 'Office EDC tray with magnetic-lid storage',
    intro:
      'A walnut office desk tray with a magnetic lid that doubles as a watch and EDC catch-all. Open the lid to access the storage chamber; close it to keep desks tidy and minimalist.',
    images: [
      img('set-7', 'ScreenShot_2026-05-05_151505_010.png'),
      img('set-7', 'ScreenShot_2026-05-05_151511_046.png'),
      img('set-7', 'ScreenShot_2026-05-05_151523_623.png'),
      img('set-7', 'ScreenShot_2026-05-05_151532_270.png'),
    ],
    specs: {
      'Closure Type': 'Magnetic lift-off lid',
      'Material': 'Solid walnut',
      'Surface Finish': 'Hand-rubbed oil',
      'Hardware': 'Concealed neodymium magnets',
      'Interior Lining': 'Felt-lined tray with compartments',
      'Size': '230 × 130 × 50 mm',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Wood: walnut, oak, mahogany',
      'Compartment layout (custom)',
      'Felt color options',
      'Engraved company logo',
      'Optional charging dock cutout',
      'Set with matching pen tray',
    ],
    packaging:
      'Wrapped in OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Office desktop', 'EDC catch-all', 'Watch storage', 'Corporate gifting', 'Home office', 'Hotel suite'],
    related: ['walnut-pine-magnetic-pocket-box', 'walnut-pine-magnetic-cube-pair', 'walnut-magnetic-engagement-ring-box'],
  },

  'walnut-magnetic-engagement-ring-box': {
    slug: 'walnut-magnetic-engagement-ring-box',
    name: 'Walnut Engraved Engagement Ring Box',
    closure: 'Magnetic',
    tagline: 'Personalized walnut ring box with hessian ring cradle',
    intro:
      'A petite walnut engagement ring box with concealed magnetic flap and an engraved couple-name and date on the lid. Inside, a hessian (burlap) ring cradle presents the ring at the perfect tilt.',
    images: [
      img('set-8', 'ScreenShot_2026-05-05_151615_092.png'),
      img('set-8', 'ScreenShot_2026-05-05_151621_181.png'),
      img('set-8', 'ScreenShot_2026-05-05_151626_934.png'),
      img('set-8', 'ScreenShot_2026-05-05_151633_209.png'),
    ],
    specs: {
      'Closure Type': 'Magnetic flap',
      'Material': 'Solid walnut',
      'Surface Finish': 'Hand-rubbed oil',
      'Hardware': 'Concealed neodymium magnets',
      'Interior Lining': 'Hessian ring cradle (felt available)',
      'Size': '70 × 60 × 35 mm',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Custom engraved couple name + date',
    },
    customization: [
      'Custom engraved couple name + date',
      'Wood: walnut, oak, mahogany',
      'Cradle: hessian / velvet / suede',
      'Single, double, or set ring slots',
      'Optional outer gift sleeve',
      'Bridal-favor bulk packaging',
    ],
    packaging:
      'Wrapped in tissue, retail-ready inner gift sleeve, 5-ply export master carton.',
    useCases: ['Engagement rings', 'Wedding bands', 'Anniversary gifts', 'Promise rings', 'Bridal favors', 'Premium jewelry retail'],
    related: ['walnut-magnetic-puzzle-mini-box', 'walnut-pine-magnetic-pocket-box', 'walnut-pine-magnetic-cube-pair'],
  },
};

export const PRODUCT_SLUGS = Object.keys(PRODUCTS);
export const CLOSURES = Array.from(new Set(Object.values(PRODUCTS).map((p) => p.closure)));
