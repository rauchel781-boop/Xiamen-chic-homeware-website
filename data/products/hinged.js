// ─────────────────────────────────────────────────────────────────────────
// Hinged Wooden Boxes — 10 products
// Image paths reference /public/hinged-wooden-boxes/<folder>/
// ─────────────────────────────────────────────────────────────────────────

const PARENT = 'Hinged Wooden Boxes';
const img = (folder, name) =>
  '/' + [PARENT, folder, name].map(encodeURIComponent).join('/');

export const PRODUCTS = {
  'acacia-wooden-storage-box': {
    slug: 'acacia-wooden-storage-box',
    name: 'Acacia Wooden Storage Box',
    closure: 'Hinged',
    tagline: 'Solid acacia hinged box for everyday keepsakes',
    intro:
      'A clean-lined acacia hinged storage box with brass butt hinges and a friction-fit lid. The honey-to-chocolate grain pattern of acacia gives every piece its own character — no two are quite alike.',
    images: [
      img('Acacia wooden storage box', 'ScreenShot_2026-05-05_142536_559.png'),
      img('Acacia wooden storage box', 'ScreenShot_2026-05-05_142547_155.png'),
      img('Acacia wooden storage box', 'ScreenShot_2026-05-05_142553_901.png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid',
      'Material': 'Solid acacia hardwood',
      'Surface Finish': 'Hand-rubbed oil + wax',
      'Hardware': 'Antique brass butt hinges',
      'Interior Lining': 'Sanded wood (felt optional)',
      'Size': '250 × 180 × 100 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Wood: acacia, oak, walnut, mahogany',
      'Optional felt or microfiber interior',
      'Hardware: brass / chrome / matte black',
      'Engraved monogram or logo',
      'Optional brass clasp or lock',
      'Custom sizes for SKU consolidation',
    ],
    packaging:
      'OPP polybag, retail box, then 5-ply export master carton.',
    useCases: ['General keepsake storage', 'Premium gifting', 'Home accessories retail', 'Hotel guest amenities', 'Office desk', 'Wedding favors'],
    related: ['plain-wood-keepsake-box', 'small-olive-wood-keepsake-box', 'pine-wood-storage-box'],
  },

  'plain-wood-keepsake-box': {
    slug: 'plain-wood-keepsake-box',
    name: 'Plain Wood Keepsake Chest',
    closure: 'Hinged',
    tagline: 'Unfinished pine keepsake chest — paint, stain, decoupage',
    intro:
      'An unfinished pine keepsake chest sized for personal mementos and craft projects. Smooth-sanded surfaces accept paint, stain, decoupage, or wood-burning — popular with crafters and as a finishing canvas for wedding favors.',
    images: [
      img('Plain Wood Keepsake Box', 'Keepsake Chest box (1).png'),
      img('Plain Wood Keepsake Box', 'Keepsake Chest box (2).png'),
      img('Plain Wood Keepsake Box', 'Keepsake Chest box (3).png'),
      img('Plain Wood Keepsake Box', 'Keepsake Chest box (4).png'),
      img('Plain Wood Keepsake Box', 'Keepsake Chest box (5).png'),
      img('Plain Wood Keepsake Box', 'Keepsake Chest box (6).png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid w/ hook clasp',
      'Material': 'Solid unfinished pine',
      'Surface Finish': 'Sanded raw (paint-ready)',
      'Hardware': 'Brass hinges + hook clasp',
      'Interior Lining': 'Unfinished wood',
      'Size': '230 × 160 × 100 mm (multi-size)',
      'MOQ': '500 pcs',
      'Lead Time': '25 days',
      'Branding': 'Bulk customer-finished',
    },
    customization: [
      'Multiple sizes (S / M / L / XL)',
      'Pine, paulownia, birch ply',
      'Optional pre-stained finishes',
      'Bulk crafting / wedding-favor packs',
      'Engraved logo for retailer brand',
      'Carton-pack quantities',
    ],
    packaging:
      'Stacked in groups of 12, OPP polybag, then 5-ply export master carton — bulk-friendly for crafters.',
    useCases: ['DIY craft retail', 'Wedding favors', 'Bulk reseller', 'Children craft kits', 'Decoupage projects', 'Memory keepsake'],
    related: ['acacia-wooden-storage-box', 'small-olive-wood-keepsake-box', 'wooden-display-box'],
  },

  'small-olive-wood-keepsake-box': {
    slug: 'small-olive-wood-keepsake-box',
    name: 'Small Olive Wood Keepsake Box',
    closure: 'Hinged',
    tagline: 'Hand-finished olive wood mini keepsake',
    intro:
      'A hand-finished olive wood keepsake box small enough to hold a ring or cufflink set. Olive wood\'s dramatic figure makes every piece a one-of-a-kind heirloom; brass pin hinges keep the form clean.',
    images: [
      img('Small Olive Wood Keepsake Box', 'ScreenShot_2025-12-12_141920_625.png'),
      img('Small Olive Wood Keepsake Box', 'ScreenShot_2025-12-12_141936_910.png'),
      img('Small Olive Wood Keepsake Box', 'ScreenShot_2025-12-12_141942_614.png'),
      img('Small Olive Wood Keepsake Box', 'ScreenShot_2025-12-12_141948_380.png'),
      img('Small Olive Wood Keepsake Box', 'ScreenShot_2025-12-12_141954_143.png'),
      img('Small Olive Wood Keepsake Box', 'ScreenShot_2025-12-12_142000_625.png'),
      img('Small Olive Wood Keepsake Box', 'ScreenShot_2025-12-12_142007_253.png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid (pin hinge)',
      'Material': 'Solid olive wood',
      'Surface Finish': 'Hand-rubbed oil',
      'Hardware': 'Brass pin hinges',
      'Interior Lining': 'Velvet or microfiber pad',
      'Size': '90 × 70 × 40 mm (custom)',
      'MOQ': '200 pcs',
      'Lead Time': '35 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Wood: olive, walnut, rosewood',
      'Velvet pad color options',
      'Slot for ring, cufflink, or pendant',
      'Engraved monogram or date',
      'Optional gift sleeve box',
      'Small-batch artisan production',
    ],
    packaging:
      'Wrapped in tissue, individual gift sleeve, retail-ready inner carton, then 5-ply export master carton.',
    useCases: ['Engagement / wedding rings', 'Cufflink presentation', 'Anniversary gifts', 'Heirloom keepsake', 'Premium retail', 'Artisan retail'],
    related: ['plain-wood-keepsake-box', 'wooden-watch-box-with-linen-interior-pillow', 'acacia-wooden-storage-box'],
  },

  'wooden-display-box': {
    slug: 'wooden-display-box',
    name: 'Wooden Display Box with Glass Lid',
    closure: 'Hinged',
    tagline: 'Hinged display box with clear glass top',
    intro:
      'A hinged wooden display box with a clear glass-panel lid — built to showcase coins, medals, taxidermy, watches, or any small collection while keeping it dust-free.',
    images: [
      img('Wooden Display Box', 'ScreenShot_2026-05-05_143817_758.png'),
      img('Wooden Display Box', 'ScreenShot_2026-05-05_143824_102.png'),
      img('Wooden Display Box', 'ScreenShot_2026-05-05_143830_118.png'),
      img('Wooden Display Box', 'ScreenShot_2026-05-05_143840_947.png'),
    ],
    specs: {
      'Closure Type': 'Hinged glass-panel lid',
      'Material': 'Walnut · oak · pine',
      'Surface Finish': 'Stain · natural oil',
      'Hardware': 'Brass hinges + hook clasp',
      'Interior Lining': 'Velvet pad (custom layout)',
      'Size': '300 × 200 × 60 mm (custom)',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraved frame edge',
    },
    customization: [
      'Glass: clear / acrylic / tempered',
      'Wood: walnut, oak, pine, mahogany',
      'Slot, pillow, or open velvet display',
      'Wall-mount option',
      'Lockable hasp option',
      'Custom interior layout per item type',
    ],
    packaging:
      'Glass-protected foam wrap, retail box, then 5-ply export master carton.',
    useCases: ['Coin collection', 'Medal & insignia display', 'Watch showcase', 'Taxidermy / butterflies', 'Retail display', 'Sports memorabilia'],
    related: ['wooden-watch-box-with-linen-interior-pillow', 'wooden-sewing-kit-box', 'acacia-wooden-storage-box'],
  },

  'wooden-sewing-kit-box': {
    slug: 'wooden-sewing-kit-box',
    name: 'Wooden Sewing Kit Box',
    closure: 'Hinged',
    tagline: 'Multi-tier sewing kit with thread, needle and tool slots',
    intro:
      'A hinged sewing kit box with internal trays and slot dividers organized for spools, needles, scissors, and notions. The traditional craft chest, scaled for modern hobbyists.',
    images: [
      img('Wooden Sewing Kit Box', 'ScreenShot_2026-05-05_143726_919.png'),
      img('Wooden Sewing Kit Box', 'ScreenShot_2026-05-05_143733_602.png'),
      img('Wooden Sewing Kit Box', 'ScreenShot_2026-05-05_143739_535.png'),
      img('Wooden Sewing Kit Box', 'ScreenShot_2026-05-05_143746_428.png'),
      img('Wooden Sewing Kit Box', 'ScreenShot_2026-05-05_143753_895.png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid w/ clasp',
      'Material': 'Walnut · pine · MDF veneered',
      'Surface Finish': 'Matte lacquer · stain',
      'Hardware': 'Brass hinges + hook clasp',
      'Interior Lining': 'Multi-tray w/ tool slots',
      'Size': '300 × 200 × 130 mm (custom)',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Engraved logo on lid',
    },
    customization: [
      'Tray layouts: 2 / 3 / 4 tier',
      'Spool, needle, scissor cutout slots',
      'Walnut, pine, MDF veneered',
      'Optional starter sewing kit',
      'Engraved logo or quote',
      'Lockable hasp option',
    ],
    packaging:
      'Foam-wrapped, retail box, then 5-ply export master carton.',
    useCases: ['Hobby retail', 'Sewing class gift', 'Tailor & seamstress gift', 'Holiday craft gift', 'Maker subscription', 'Heritage craft retail'],
    related: ['plain-wood-keepsake-box', 'wooden-stash-box-with-removable-tray', 'wooden-display-box'],
  },

  'wooden-stash-box-with-removable-tray': {
    slug: 'wooden-stash-box-with-removable-tray',
    name: 'Wooden Stash Box with Removable Tray',
    closure: 'Hinged',
    tagline: 'Multi-compartment stash box with lift-out tray',
    intro:
      'A hinged stash box with a removable upper tray — the classic format that gives you organized everyday access on top, with hidden bulk storage below. Generous size for tools, herbs, or general hobbyist supplies.',
    images: [
      img('Wooden Stash Box with Removable Tray', 'Wooden Storage Box (1).png'),
      img('Wooden Stash Box with Removable Tray', 'Wooden Storage Box (2).png'),
      img('Wooden Stash Box with Removable Tray', 'Wooden Storage Box (3).png'),
      img('Wooden Stash Box with Removable Tray', 'Wooden Storage Box (4).png'),
      img('Wooden Stash Box with Removable Tray', 'Wooden Storage Box (5).png'),
      img('Wooden Stash Box with Removable Tray', 'Wooden Storage Box (6).png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid + lift-out tray',
      'Material': 'Acacia or walnut',
      'Surface Finish': 'Hand-rubbed oil',
      'Hardware': 'Brass hinges + hook clasp',
      'Interior Lining': 'Removable divided tray',
      'Size': '270 × 180 × 110 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Tray divider layout (2 / 4 / 6 sections)',
      'Wood: acacia, walnut, oak, pine',
      'Optional lock + key',
      'Felt-lined tray base',
      'Engraved logo on lid',
      'Custom external dimensions',
    ],
    packaging:
      'Wrapped in OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Hobby storage', 'Herbalist / apothecary', 'Personal stash', 'Tool kit organization', 'Office accessory', 'Premium gifting'],
    related: ['acacia-wooden-storage-box', 'wooden-sewing-kit-box', 'plain-wood-keepsake-box'],
  },

  'wooden-watch-box-with-linen-interior-pillow': {
    slug: 'wooden-watch-box-with-linen-interior-pillow',
    name: 'Wooden Watch Box with Linen Pillow',
    closure: 'Hinged',
    tagline: 'Single-watch presentation box with linen pillow',
    intro:
      'A single-watch presentation box with a linen-wrapped pillow that holds the watch upright for display or storage. Walnut shell with concealed soft-close hinges and brass clasp — the standard format for watch retail.',
    images: [
      img('Wooden Watch Box with Linen Interior Pillow', '主图1（3）.png'),
      img('Wooden Watch Box with Linen Interior Pillow', '主图2（5）.png'),
      img('Wooden Watch Box with Linen Interior Pillow', '主图3（0）.png'),
      img('Wooden Watch Box with Linen Interior Pillow', '主图4（2）.png'),
      img('Wooden Watch Box with Linen Interior Pillow', '主图5（1）.png'),
      img('Wooden Watch Box with Linen Interior Pillow', '主图6（4）.png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid (soft-close)',
      'Material': 'Walnut · oak · MDF veneered',
      'Surface Finish': 'Piano lacquer · matte oil',
      'Hardware': 'Concealed soft-close hinges + clasp',
      'Interior Lining': 'Linen-wrapped watch pillow',
      'Size': '120 × 90 × 80 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Hot foil · embossed lining',
    },
    customization: [
      'Single, double, or 6-watch capacity',
      'Wood: walnut, oak, mahogany',
      'Pillow lining: linen, microfiber, leather',
      'Hot-foil branding on lid',
      'Optional brand-printed inner lid',
      'Lockable hasp option',
    ],
    packaging:
      'Each box wrapped in OPP polybag, retail-ready inner carton, then 5-ply export master carton.',
    useCases: ['Watch retail', 'Gift packaging', 'Single-watch presentation', 'Hotel guest amenity', 'Heirloom storage', 'Wedding gifting'],
    related: ['small-olive-wood-keepsake-box', 'wooden-display-box', 'paulownia-wooden-box'],
  },

  'paulownia-wooden-box': {
    slug: 'paulownia-wooden-box',
    name: 'Paulownia Hinged Wooden Box',
    closure: 'Hinged',
    tagline: 'Lightweight paulownia hinged box',
    intro:
      'An ultra-lightweight hinged box in paulownia — the lightest commercial timber in the world. Half the weight of pine, with the same dimensional stability and a pale-cream color that takes any finish beautifully.',
    images: [
      img('paulownia wooden box', 'ScreenShot_2026-05-05_143239_119.png'),
      img('paulownia wooden box', 'ScreenShot_2026-05-05_143245_947.png'),
      img('paulownia wooden box', 'ScreenShot_2026-05-05_143251_906.png'),
      img('paulownia wooden box', 'ScreenShot_2026-05-05_143259_289.png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid',
      'Material': 'Solid paulownia',
      'Surface Finish': 'Stain · paint · natural',
      'Hardware': 'Brass or steel hinges',
      'Interior Lining': 'Sanded wood',
      'Size': '300 × 200 × 100 mm (custom)',
      'MOQ': '500 pcs',
      'Lead Time': '25 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Multiple sizes (S / M / L / XL)',
      'Pre-stained, painted, or natural',
      'Optional hook clasp or lock',
      'Engraved logo or label frame',
      'Bulk-pack volume pricing',
      'Stackable retail packs',
    ],
    packaging:
      'Stacked in groups of 12, OPP polybag, then 5-ply export master carton — best freight cost in the range.',
    useCases: ['Gift packaging', 'Wine & spirit packaging', 'Craft retail', 'Bulk reseller', 'Premium retail', 'Eco gift sets'],
    related: ['pine-wood-box', 'pine-wood-storage-box', 'plain-wood-keepsake-box'],
  },

  'pine-wood-box': {
    slug: 'pine-wood-box',
    name: 'Pine Hinged Wooden Box',
    closure: 'Hinged',
    tagline: 'Classic pine hinged box for everyday use',
    intro:
      'The classic pine hinged box — affordable, recognizable, and endlessly customizable. Smooth-sanded faces accept paint or stain; brass hinges and clasp give it the heirloom feel at workhorse pricing.',
    images: [
      img('pine wood box', 'ScreenShot_2026-05-05_143644_675.png'),
      img('pine wood box', 'ScreenShot_2026-05-05_143651_268.png'),
      img('pine wood box', 'ScreenShot_2026-05-05_143657_459.png'),
      img('pine wood box', 'ScreenShot_2026-05-05_143704_268.png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid w/ hook clasp',
      'Material': 'Solid pine',
      'Surface Finish': 'Natural · stain · paint',
      'Hardware': 'Brass hinges + clasp',
      'Interior Lining': 'Sanded wood',
      'Size': '230 × 160 × 90 mm (custom)',
      'MOQ': '500 pcs',
      'Lead Time': '25 days',
      'Branding': 'Wood-burned · laser engraved',
    },
    customization: [
      'Knot-free or rustic knotty pine',
      'Multiple sizes (S / M / L)',
      'Stained, painted, or natural finish',
      'Engraved logo on lid',
      'Optional lock + key',
      'Bulk-pack pricing for craft retail',
    ],
    packaging:
      'Stacked in groups of 12, OPP polybag, then 5-ply export master carton.',
    useCases: ['DIY craft retail', 'Bulk gifting', 'Wedding favors', 'Wine packaging', 'Tool storage', 'Children craft kits'],
    related: ['paulownia-wooden-box', 'pine-wood-storage-box', 'plain-wood-keepsake-box'],
  },

  'pine-wood-storage-box': {
    slug: 'pine-wood-storage-box',
    name: 'Pine Wood Storage Box',
    closure: 'Hinged',
    tagline: 'Larger-format pine box with reinforced corners',
    intro:
      'A larger-format pine storage box with reinforced dovetail corners and brass hardware — sized for workshop tools, art supplies, or general home storage where strength matters more than presentation.',
    images: [
      img('pine wood storage box', 'ScreenShot_2026-05-05_142802_712.png'),
      img('pine wood storage box', 'ScreenShot_2026-05-05_142811_197.png'),
      img('pine wood storage box', 'ScreenShot_2026-05-05_142820_252.png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid w/ hook clasp',
      'Material': 'Solid pine (dovetail corners)',
      'Surface Finish': 'Natural · stain',
      'Hardware': 'Brass hinges + clasp',
      'Interior Lining': 'Sanded wood',
      'Size': '400 × 280 × 200 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Wood-burned · laser engraving',
    },
    customization: [
      'Reinforced dovetail or finger-joint corners',
      'Optional internal trays',
      'Lock + key option',
      'Stained, painted, or natural',
      'Engraved logo or label frame',
      'Sized for workshop or general storage',
    ],
    packaging:
      'Stacked in pairs, foam-wrapped, packed in 5-ply export master carton.',
    useCases: ['Workshop tools', 'Art supplies', 'Garage storage', 'Garden tools', 'Home utility', 'Hobbyist storage'],
    related: ['pine-wood-box', 'paulownia-wooden-box', 'wooden-stash-box-with-removable-tray'],
  },
};

export const PRODUCT_SLUGS = Object.keys(PRODUCTS);
export const CLOSURES = Array.from(new Set(Object.values(PRODUCTS).map((p) => p.closure)));
