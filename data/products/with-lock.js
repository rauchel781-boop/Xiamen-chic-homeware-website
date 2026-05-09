// ─────────────────────────────────────────────────────────────────────────
// Wooden Boxes with Lock — 9 products
// Image paths reference /public/wooden-boxes-with-lock/<folder>/
// ─────────────────────────────────────────────────────────────────────────

const PARENT = 'wooden boxes with lock';
const img = (folder, name) =>
  '/' + [PARENT, folder, name].map(encodeURIComponent).join('/');

export const PRODUCTS = {
  'acacia-wood-all-in-one-stash-box-with-lock': {
    slug: 'acacia-wood-all-in-one-stash-box-with-lock',
    name: 'Acacia All-in-One Stash Box with Lock',
    closure: 'Lock',
    tagline: 'Multi-compartment acacia stash box with combination lock',
    intro:
      'A premium all-in-one acacia stash box with a 3-digit combination lock, multiple compartments, and a roll-out tray for organized storage of personal supplies, herbs, and small accessories.',
    images: [
      img('Acacia Wood All-in-One Stash Box with Lock', 'acacia wood stash box (1).png'),
      img('Acacia Wood All-in-One Stash Box with Lock', 'acacia wood stash box (2).png'),
      img('Acacia Wood All-in-One Stash Box with Lock', 'acacia wood stash box (3).png'),
      img('Acacia Wood All-in-One Stash Box with Lock', 'acacia wood stash box (4).png'),
      img('Acacia Wood All-in-One Stash Box with Lock', 'acacia wood stash box (5).png'),
      img('Acacia Wood All-in-One Stash Box with Lock', 'acacia wood stash box (6).png'),
    ],
    specs: {
      'Closure Type': 'Combination lock + hinged lid',
      'Material': 'Solid acacia',
      'Surface Finish': 'Hand-rubbed oil',
      'Hardware': '3-digit combination lock + brass hinges',
      'Interior Lining': 'Multi-compartment + rolling tray',
      'Size': '300 × 200 × 110 mm',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Lock: combination / brass key / cam',
      'Wood: acacia, walnut, oak',
      'Compartment layouts (custom)',
      'Engraved logo or monogram',
      'Optional rolling tray, grinder slot',
      'Felt-lined or open compartments',
    ],
    packaging:
      'Wrapped in OPP polybag, retail-ready inner box, 5-ply export master carton.',
    useCases: ['Adult personal storage', 'Herbalist storage', 'Premium gifting', 'Document storage', 'Workshop organizing', 'Hobbyist storage'],
    related: ['bamboo-stash-box-with-combination-lock', 'large-black-wooden-stash-box-kit', 'pine-combination-lock-lid-box'],
  },

  'bamboo-stash-box-with-combination-lock': {
    slug: 'bamboo-stash-box-with-combination-lock',
    name: 'Bamboo Stash Box with Combination Lock',
    closure: 'Lock',
    tagline: 'Sustainable bamboo stash box with 3-digit combo',
    intro:
      'A bamboo stash box with a 3-digit combination lock and a divided interior for organized storage. Sustainable, naturally antibacterial, and lockable — the modern choice for adult personal storage.',
    images: [
      img('Bamboo Stash Box with Combination Lock', 'stash box (2).png'),
      img('Bamboo Stash Box with Combination Lock', 'stash box (3).png'),
      img('Bamboo Stash Box with Combination Lock', 'stash box (4).png'),
      img('Bamboo Stash Box with Combination Lock', 'stash box (5).png'),
      img('Bamboo Stash Box with Combination Lock', 'stash box (6).png'),
    ],
    specs: {
      'Closure Type': '3-digit combination lock',
      'Material': 'Carbonized moso bamboo',
      'Surface Finish': 'Natural satin oil',
      'Hardware': '3-digit combination lock',
      'Interior Lining': 'Divided compartments',
      'Size': '270 × 180 × 100 mm',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Lock: combination / brass key',
      'Bamboo, pine, walnut',
      'Compartment count: 2 / 4 / 6',
      'Engraved logo on lid',
      'Optional rolling tray insert',
      'Sized for personal or professional use',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Adult personal storage', 'Office secure storage', 'Hobbyist storage', 'Eco gifting', 'Home apothecary', 'Travel valuables'],
    related: ['acacia-wood-all-in-one-stash-box-with-lock', 'large-black-wooden-stash-box-kit', 'pine-rabbit-kids-cash-box'],
  },

  'large-black-wooden-stash-box-kit': {
    slug: 'large-black-wooden-stash-box-kit',
    name: 'Large Black Wooden Stash Box Kit',
    closure: 'Lock',
    tagline: 'Large black-stained stash box with full accessory kit',
    intro:
      'A larger-format black-stained stash box bundled as a complete kit — with rolling tray, lock, and a bundled accessory set. Built for serious personal storage; sized to hold everything in one tidy chest.',
    images: [
      img('Large Black Wooden Stash Box Kit', 'stash box (11).jpg'),
      img('Large Black Wooden Stash Box Kit', 'stash box (12).jpg'),
      img('Large Black Wooden Stash Box Kit', 'stash box (13).jpg'),
      img('Large Black Wooden Stash Box Kit', 'stash box (14).jpg'),
      img('Large Black Wooden Stash Box Kit', 'stash box (15).jpg'),
      img('Large Black Wooden Stash Box Kit', 'stash box (16).jpg'),
    ],
    specs: {
      'Closure Type': 'Combination lock + hinged lid',
      'Material': 'Black-stained pine',
      'Surface Finish': 'Matte black stain',
      'Hardware': '3-digit combination lock + brass hinges',
      'Interior Lining': 'Multi-compartment + rolling tray',
      'Size': '350 × 230 × 130 mm',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Stain color: black, walnut, ebony',
      'Pine, oak, walnut construction',
      'Lock: combination / brass key',
      'Engraved logo on lid',
      'Optional accessory bundle',
      'Custom compartment layouts',
    ],
    packaging:
      'Wrapped in OPP polybag, retail-ready inner box, 5-ply export master carton.',
    useCases: ['Adult personal storage', 'Premium personal kit', 'Hobbyist storage', 'Workshop organization', 'Home apothecary', 'Document storage'],
    related: ['acacia-wood-all-in-one-stash-box-with-lock', 'bamboo-stash-box-with-combination-lock', 'pine-3-size-lock-box-set'],
  },

  'pine-combination-lock-lid-box': {
    slug: 'pine-combination-lock-lid-box',
    name: 'Pine Combination-Lock Storage Box',
    closure: 'Lock',
    tagline: 'Spacious pine box with side-mounted combination lock',
    intro:
      'A spacious pine storage box with a 3-digit combination lock mounted on the side and a hinged lid that opens fully. Great as a desk-side cash box, document storage, or general home valuables locker.',
    images: [
      img('3', 'ScreenShot_2026-05-05_152800_577.png'),
      img('3', 'ScreenShot_2026-05-05_152809_684.png'),
      img('3', 'ScreenShot_2026-05-05_152816_931.png'),
    ],
    specs: {
      'Closure Type': 'Combination lock + hinged lid',
      'Material': 'Solid pine',
      'Surface Finish': 'Natural · stain',
      'Hardware': 'Side-mount 3-digit combination lock',
      'Interior Lining': 'Open or divided',
      'Size': '300 × 200 × 130 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Pine, paulownia, oak',
      'Lock: combination / brass key',
      'Optional internal divider',
      'Stained or natural finish',
      'Engraved logo or label frame',
      'Multiple sizes (S / M / L)',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Cash box', 'Document storage', 'Home valuables', 'Office secure storage', 'Medication safe', 'Heirloom protection'],
    related: ['pine-3-size-lock-box-set', 'pine-hasp-lock-stacking-trio', 'torched-pine-dovetail-storage'],
  },

  'torched-pine-dovetail-storage': {
    slug: 'torched-pine-dovetail-storage',
    name: 'Torched Pine Dovetail Storage Box',
    closure: 'Lock',
    tagline: 'Torched pine box with dovetail corners and concealed lock',
    intro:
      'A torched pine storage box built with traditional dovetail corner joinery and a discreet hidden cam lock. The torched finish gives it a vintage feel; the dovetails make it strong enough to last generations.',
    images: [
      img('set-1', 'nano_task_7f1ecb39b68c4adf85684240a9971a68.png'),
      img('set-1', 'nano_task_8a326e1e14f84c09ba76bd2a6e0cdaaf.png'),
    ],
    specs: {
      'Closure Type': 'Concealed cam lock + hinged lid',
      'Material': 'Torched pine (dovetail corners)',
      'Surface Finish': 'Torched + waxed',
      'Hardware': 'Concealed cam lock',
      'Interior Lining': 'Sanded wood',
      'Size': '300 × 200 × 150 mm',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Wood: pine, oak, walnut',
      'Lock: concealed cam / brass key',
      'Torched, oiled, or stained finish',
      'Dovetail or finger-joint corners',
      'Engraved logo on lid',
      'Multiple sizes (S / M / L)',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Heritage home decor', 'Document chest', 'Heirloom protection', 'Memory keepsake', 'Premium home storage', 'Vintage gift'],
    related: ['pine-combination-lock-lid-box', 'pine-3-size-lock-box-set', 'pine-hasp-lock-stacking-trio'],
  },

  'pine-combo-and-hasp-lock-trio-set': {
    slug: 'pine-combo-and-hasp-lock-trio-set',
    name: 'Pine Combo & Hasp Lock Trio Set',
    closure: 'Lock',
    tagline: 'Three pine boxes with mixed combination + hasp locks',
    intro:
      'A trio of small pine boxes — one with a brass hasp clasp, one with a combination lock, and one with a hidden compartment — sold as a set for sample-collecting, kids\' allowance banks, or budget-envelope organization.',
    images: [
      img('set-2', 'ScreenShot_2026-05-05_152723_822.png'),
      img('set-2', 'ScreenShot_2026-05-05_152740_158.png'),
    ],
    specs: {
      'Closure Type': 'Mixed: hasp clasp + combo + key',
      'Material': 'Pine',
      'Surface Finish': 'Natural',
      'Hardware': 'Brass hasp + combination lock + key',
      'Interior Lining': 'Sanded wood',
      'Size': 'Set of 3 (180 × 100 × 80 mm)',
      'MOQ': '200 sets',
      'Lead Time': '25 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Set of 3 / 5 / 7 boxes',
      'Mix of lock types or single style',
      'Pine, paulownia, oak',
      'Stained or natural finish',
      'Engraved labels per box',
      'Bulk-pack for craft retailers',
    ],
    packaging:
      'Set bundled in retail-ready box, 5-ply export master carton.',
    useCases: ['Kids allowance / banking', 'Budget envelope system', 'Collector storage', 'Hobbyist sample storage', 'Bulk craft retail', 'Educational gifts'],
    related: ['pine-3-size-lock-box-set', 'pine-hasp-lock-stacking-trio', 'pine-rabbit-kids-cash-box'],
  },

  'pine-rabbit-kids-cash-box': {
    slug: 'pine-rabbit-kids-cash-box',
    name: 'Pine "Rabbit" Kids Cash Box',
    closure: 'Lock',
    tagline: 'Cute kids cash box with combo lock and coin slot',
    intro:
      'A pine kids\' money-saving box decorated with a cute rabbit-themed design, with a combination lock to teach kids about saving, plus a coin slot in the lid for daily deposits. Stickers included for personalizing.',
    images: [
      img('set-3', 'ScreenShot_2026-05-05_152844_006.png'),
      img('set-3', 'ScreenShot_2026-05-05_152853_032.png'),
    ],
    specs: {
      'Closure Type': 'Combination lock + coin slot',
      'Material': 'Pine',
      'Surface Finish': 'Natural · printed graphics',
      'Hardware': '3-digit combination lock',
      'Interior Lining': 'Open',
      'Size': '230 × 160 × 130 mm',
      'MOQ': '300 pcs',
      'Lead Time': '25 days',
      'Branding': 'Custom printed character / graphic',
    },
    customization: [
      'Character themes (rabbit / bear / dinosaur / custom)',
      'Pine, paulownia construction',
      'Coin slot, bill slot, or both',
      'Engraved kid name plate',
      'Sticker set bundle',
      'Combo or hasp lock',
    ],
    packaging:
      'OPP polybag, retail-ready color box, 5-ply export master carton.',
    useCases: ['Kids piggy bank', 'Savings education', 'Birthday gifts', 'Holiday gifts', 'Boutique kids retail', 'Educational toys'],
    related: ['pine-combo-and-hasp-lock-trio-set', 'pine-3-size-lock-box-set', 'pine-hasp-lock-stacking-trio'],
  },

  'pine-hasp-lock-stacking-trio': {
    slug: 'pine-hasp-lock-stacking-trio',
    name: 'Pine Hasp-Lock Stacking Trio',
    closure: 'Lock',
    tagline: 'Three nesting pine boxes with brass hasp clasps',
    intro:
      'Three pine boxes in graduated sizes, each with a brass hasp clasp — designed to nest for shipping and stack on a shelf. Hasps accept padlocks if needed; otherwise the clasps alone keep contents secure.',
    images: [
      img('set-4', 'ScreenShot_2026-05-05_152951_499.png'),
      img('set-4', 'ScreenShot_2026-05-05_153001_351.png'),
    ],
    specs: {
      'Closure Type': 'Brass hasp clasp (padlock-ready)',
      'Material': 'Solid pine',
      'Surface Finish': 'Natural',
      'Hardware': 'Brass hasp clasps + brass hinges',
      'Interior Lining': 'Sanded wood',
      'Size': 'Nesting set of 3',
      'MOQ': '200 sets',
      'Lead Time': '25 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Set of 3 / 5 graduated sizes',
      'Pine, paulownia, oak',
      'Hasp finish: brass / black / antique',
      'Stained or natural finish',
      'Engraved logo on each lid',
      'Bulk-pack for craft retail',
    ],
    packaging:
      'Sets nested for shipping efficiency, OPP polybag, then 5-ply export master carton.',
    useCases: ['Workshop tools', 'Document storage', 'Kids project storage', 'Bulk craft retail', 'Garage storage', 'Outdoor / travel storage'],
    related: ['pine-3-size-lock-box-set', 'pine-combo-and-hasp-lock-trio-set', 'pine-combination-lock-lid-box'],
  },

  'pine-3-size-lock-box-set': {
    slug: 'pine-3-size-lock-box-set',
    name: 'Pine 3-Size Lock Box Set',
    closure: 'Lock',
    tagline: 'Three lock boxes (combo + hasp + key)',
    intro:
      'A graduated 3-size pine lock box set — small with brass hasp, medium with combination lock, and large with brass key lock. The starter set for organized secure storage at multiple scales.',
    images: [
      img('set-5', 'ScreenShot_2026-05-05_153021_414.png'),
      img('set-5', 'ScreenShot_2026-05-05_153027_149.png'),
      img('set-5', 'ScreenShot_2026-05-05_153033_292.png'),
      img('set-5', 'ScreenShot_2026-05-05_153039_819.png'),
    ],
    specs: {
      'Closure Type': 'Mixed: hasp + combo + brass key',
      'Material': 'Solid pine',
      'Surface Finish': 'Natural · stain',
      'Hardware': 'Brass hasp · combo lock · brass key',
      'Interior Lining': 'Sanded wood',
      'Size': 'Set of 3 (S / M / L)',
      'MOQ': '200 sets',
      'Lead Time': '25 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Set of 3 / 5 / 7 graduated sizes',
      'Pine, paulownia, oak',
      'Lock combinations (custom)',
      'Stained or natural finish',
      'Engraved logo on each box',
      'Bulk-pack pricing for retail',
    ],
    packaging:
      'Sets nested for shipping efficiency, OPP polybag, then 5-ply export master carton.',
    useCases: ['Multi-purpose secure storage', 'Workshop tools', 'Document chest', 'Office cash & valuables', 'Hobbyist storage', 'Premium gifting'],
    related: ['pine-hasp-lock-stacking-trio', 'pine-combo-and-hasp-lock-trio-set', 'pine-combination-lock-lid-box'],
  },
};

export const PRODUCT_SLUGS = Object.keys(PRODUCTS);
export const CLOSURES = Array.from(new Set(Object.values(PRODUCTS).map((p) => p.closure)));
