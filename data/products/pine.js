// ─────────────────────────────────────────────────────────────────────────
// Pine Wooden Boxes — 16 products
// Image paths reference /public/pine-wood-box/<folder>/
// ─────────────────────────────────────────────────────────────────────────

const PARENT = 'pine wood box';
const img = (folder, name) =>
  '/' + [PARENT, folder, name].map(encodeURIComponent).join('/');

export const PRODUCTS = {
  'pine-classic-hinged-clasp-box': {
    slug: 'pine-classic-hinged-clasp-box',
    name: 'Pine Classic Hinged Clasp Box',
    closure: 'Hinged',
    tagline: 'Natural pine box with antique brass hinges and hasp',
    intro:
      'A classic pine hinged keepsake box with antique-finish brass hinges and a hook-clasp closure. Smooth-sanded faces accept paint, stain, or decoupage; popular as a bulk craft blank and as ready-to-fill jewelry / memory storage.',
    images: [
      img('set-1', 'ScreenShot_2026-05-06_184529_690.png'),
      img('set-1', 'ScreenShot_2026-05-06_184540_519.png'),
      img('set-1', 'ScreenShot_2026-05-06_184548_107.png'),
      img('set-1', 'ScreenShot_2026-05-06_184555_409.png'),
      img('set-1', 'ScreenShot_2026-05-06_184608_669.png'),
      img('set-1', 'ScreenShot_2026-05-06_184616_162.png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid w/ hook clasp',
      'Material': 'Solid pine',
      'Surface Finish': 'Natural sanded',
      'Hardware': 'Antique brass hinges + clasp',
      'Interior': 'Sanded wood',
      'Size': '180 × 100 × 60 mm (custom)',
      'MOQ': '500 pcs',
      'Lead Time': '25 days',
      'Branding': 'Wood-burned · laser engraved',
    },
    customization: [
      'Multiple sizes (S / M / L)',
      'Knot-free or rustic knotty pine',
      'Stained, painted, or natural finish',
      'Engraved logo on lid',
      'Optional lock + key',
      'Bulk-pack pricing for craft retail',
    ],
    packaging:
      'Stacked in groups of 12, OPP polybag, then 5-ply export master carton.',
    useCases: ['DIY craft retail', 'Wedding favors', 'Bulk gifting', 'Children craft kits', 'Memory keepsake', 'Decoupage projects'],
    related: ['pine-hexagonal-hinged-box', 'pine-set-of-three-clasp-boxes', 'pine-square-sliding-lid-box'],
  },

  'pine-hexagonal-hinged-box': {
    slug: 'pine-hexagonal-hinged-box',
    name: 'Pine Hexagonal Hinged Box',
    closure: 'Hinged',
    tagline: 'Six-sided pine keepsake with brass clasp',
    intro:
      'A hexagonal pine hinged box with antique brass clasp — a fun departure from rectangular norms. Sized for ring presentation, special keepsakes, or as a custom retail blank where shape itself is the differentiator.',
    images: [
      img('set-2', 'ScreenShot_2026-05-06_184634_516.png'),
      img('set-2', 'ScreenShot_2026-05-06_184641_295.png'),
      img('set-2', 'ScreenShot_2026-05-06_184648_387.png'),
      img('set-2', 'ScreenShot_2026-05-06_184655_706.png'),
      img('set-2', 'ScreenShot_2026-05-06_184703_353.png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid w/ hook clasp',
      'Material': 'Solid pine',
      'Surface Finish': 'Natural sanded',
      'Hardware': 'Antique brass hinges + clasp',
      'Interior': 'Sanded wood (felt optional)',
      'Size': '120 × 100 × 60 mm (custom)',
      'MOQ': '500 pcs',
      'Lead Time': '25 days',
      'Branding': 'Laser engraved lid',
    },
    customization: [
      'Hex / octagonal / round shapes',
      'Multiple sizes',
      'Felt / velvet lining option',
      'Engraved monogram or art',
      'Stain, paint, or natural finish',
      'Bulk-pack pricing',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Ring presentation', 'Special keepsake', 'Wedding favors', 'Boutique retail', 'Craft blank', 'Memory storage'],
    related: ['pine-classic-hinged-clasp-box', 'pine-set-of-three-clasp-boxes', 'pine-fruit-storage-box'],
  },

  'pine-fruit-storage-box': {
    slug: 'pine-fruit-storage-box',
    name: 'Pine Fruit / Apple Storage Box',
    closure: 'Lift-Off Lid',
    tagline: 'Single-piece pine cube with lift-off lid',
    intro:
      'A simple square pine box with a lift-off flat lid — sized to hold a single apple, a small candle, a watch, or any small gift. Honest joinery, smooth-sanded surfaces, and the low-cost appeal of clean pine.',
    images: [
      img('set-3', 'ScreenShot_2026-05-06_184738_001.png'),
      img('set-3', 'ScreenShot_2026-05-06_184745_227.png'),
      img('set-3', 'ScreenShot_2026-05-06_184752_282.png'),
    ],
    specs: {
      'Closure Type': 'Lift-off flat lid',
      'Material': 'Solid pine',
      'Surface Finish': 'Natural sanded',
      'Interior': 'Sanded wood',
      'Construction': 'Solid panel walls',
      'Size': '120 × 120 × 120 mm (custom)',
      'MOQ': '500 pcs',
      'Lead Time': '20 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Multiple sizes / cubes',
      'Stain or paint',
      'Foam or fabric insert',
      'Engraved logo on lid',
      'Optional finger pull',
      'Bulk-pack pricing',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Gift cube', 'Apple / produce gift', 'Candle packaging', 'Watch single-pack', 'Craft blank', 'Wedding favors'],
    related: ['pine-square-sliding-lid-box', 'pine-classic-hinged-clasp-box', 'pine-letter-opener-gift-box'],
  },

  'pine-tea-box-chalkboard-lid': {
    slug: 'pine-tea-box-chalkboard-lid',
    name: 'Pine Tea Box with Chalkboard Lid',
    closure: 'Hinged',
    tagline: '6-section pine tea organizer with writeable chalk panel',
    intro:
      'A pine tea organizer with a hinged glass-and-chalkboard lid — six sections for tea bag selections, with a chalk-writeable header panel that says "Today\'s Tea". Charming kitchen organization with a touch of cafe styling.',
    images: [
      img('set-4', 'ScreenShot_2026-05-06_184817_603.png'),
      img('set-4', 'ScreenShot_2026-05-06_184823_645.png'),
      img('set-4', 'ScreenShot_2026-05-06_184831_050.png'),
      img('set-4', 'ScreenShot_2026-05-06_184838_734.png'),
    ],
    specs: {
      'Closure Type': 'Hinged glass + chalkboard lid',
      'Material': 'Solid pine',
      'Surface Finish': 'Natural sanded',
      'Compartments': '6 (custom 4 / 8)',
      'Hardware': 'Brass hinges + clasp',
      'Size': '320 × 200 × 80 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Engraved or chalk-printed',
    },
    customization: [
      'Compartments: 4 / 6 / 8 / 9',
      'Glass / acrylic / chalkboard panels',
      'Custom chalk header text',
      'Stain or natural finish',
      'Engraved logo on long side',
      'Bulk-pack pricing',
    ],
    packaging:
      'Glass-protected foam wrap, retail box, 5-ply export master carton.',
    useCases: ['Cafe / hotel breakfast bar', 'Tea-brand retail', 'Home kitchen', 'Specialty grocery', 'Hospitality FOH', 'Tea-subscription gifting'],
    related: ['pine-multi-drawer-essential-oil-box', 'pine-bracelet-display-box', 'pine-tea-box-glass-jars'],
  },

  'pine-set-of-three-clasp-boxes': {
    slug: 'pine-set-of-three-clasp-boxes',
    name: 'Pine Hinged Box Set (3 Sizes)',
    closure: 'Hinged',
    tagline: 'Trio of nesting pine clasp boxes — S / M / L',
    intro:
      'A coordinated trio of pine hinged keepsake boxes in three sizes — small, medium, large — with antique brass clasps. Sold as a set or individually. Perfect for retailers offering tiered SKU options.',
    images: [
      img('set-5', 'ScreenShot_2026-05-06_184857_937.png'),
      img('set-5', 'ScreenShot_2026-05-06_184905_098.png'),
      img('set-5', 'ScreenShot_2026-05-06_184912_523.png'),
      img('set-5', 'ScreenShot_2026-05-06_184920_988.png'),
      img('set-5', 'ScreenShot_2026-05-06_184929_826.png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid w/ hook clasp',
      'Material': 'Solid pine',
      'Surface Finish': 'Natural sanded',
      'Hardware': 'Antique brass hinges + clasp',
      'Set': 'S / M / L (3 sizes)',
      'Size': 'S 80×60×40 / M 140×100×60 / L 200×140×80 mm',
      'MOQ': '300 sets',
      'Lead Time': '25 days',
      'Branding': 'Laser engraving',
    },
    customization: [
      'Custom set composition (1 / 2 / 3 / 4 boxes)',
      'Sizes adjustable',
      'Stain or paint',
      'Engraved logo',
      'Felt / velvet lining option',
      'Bulk-pack pricing',
    ],
    packaging:
      'Nested S inside M inside L, OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['DIY craft retail', 'Wedding favors', 'Bulk gifting', 'Memory keepsake retail', 'Tiered gift sets', 'Boutique retail'],
    related: ['pine-classic-hinged-clasp-box', 'pine-hexagonal-hinged-box', 'pine-multi-drawer-essential-oil-box'],
  },

  'pine-multi-drawer-essential-oil-box': {
    slug: 'pine-multi-drawer-essential-oil-box',
    name: 'Pine Multi-Drawer Essential Oil Box',
    closure: 'Drawer',
    tagline: 'Three-tier pine drawer chest sized for essential oil bottles',
    intro:
      'A three-tier pine drawer chest with compartmented drawers sized for 5–15 ml essential oil bottles. Each drawer holds 16+ bottles in pre-cut compartments; perfect for aromatherapists, herbalists, and home wellness retail.',
    images: [
      img('set-6', 'ScreenShot_2026-05-06_185021_021.png'),
      img('set-6', 'ScreenShot_2026-05-06_185032_582.png'),
      img('set-6', 'ScreenShot_2026-05-06_185040_397.png'),
      img('set-6', 'ScreenShot_2026-05-06_185048_105.png'),
    ],
    specs: {
      'Closure Type': 'Pull-out drawers',
      'Material': 'Solid pine',
      'Surface Finish': 'Natural sanded',
      'Drawers': '3-tier (custom 2 / 4 / 5)',
      'Capacity': '~48 essential oil bottles total',
      'Size': '230 × 200 × 250 mm (custom)',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraved drawer fronts',
    },
    customization: [
      'Drawer count: 2 / 3 / 4 / 5',
      'Compartment sizes: 5 / 10 / 15 / 30 ml',
      'Stain or natural finish',
      'Engraved drawer-front labels',
      'Knob style: brass, ceramic, leather',
      'Optional locking top drawer',
    ],
    packaging:
      'Foam-wrapped, retail box, 5-ply export master carton.',
    useCases: ['Aromatherapist storage', 'Herbalist supplies', 'Home wellness retail', 'Boutique apothecary', 'Spa retail', 'Essential oil subscription'],
    related: ['pine-tea-box-chalkboard-lid', 'pine-bracelet-display-box', 'pine-tea-box-glass-jars'],
  },

  'pine-nesting-tray-set': {
    slug: 'pine-nesting-tray-set',
    name: 'Pine Nesting Tray Set',
    closure: 'Open-Top',
    tagline: 'Set of 4 pine trays in graduated sizes',
    intro:
      'A nesting set of pine trays in graduated sizes — S / M / L / XL — for craft, retail merchandising, or kitchen service. Stacks compactly when not in use; pulls apart for tabletop styling, market booth display, or coffee service.',
    images: [
      img('set-7', 'ScreenShot_2026-05-06_185110_875.png'),
      img('set-7', 'ScreenShot_2026-05-06_185119_281.png'),
    ],
    specs: {
      'Closure Type': 'Open-top trays (set of 4)',
      'Material': 'Solid pine',
      'Surface Finish': 'Natural sanded',
      'Set': '4 nesting sizes',
      'Construction': 'Solid panel walls',
      'Size': 'XL 280 × 200 × 35 → S 130 × 100 × 30 mm',
      'MOQ': '300 sets',
      'Lead Time': '25 days',
      'Branding': 'Laser engraved bottom',
    },
    customization: [
      'Set count: 2 / 3 / 4 / 5 trays',
      'Stain or paint',
      'Engraved logo',
      'Custom dimensions',
      'Non-slip rubber feet',
      'Bulk-pack pricing',
    ],
    packaging:
      'Nested into single stack, OPP polybag, 5-ply export master carton.',
    useCases: ['Tabletop styling', 'Market booth display', 'Coffee service', 'Retail merchandising', 'Bathroom & vanity', 'Photography prop'],
    related: ['pine-fruit-storage-box', 'pine-square-sliding-lid-box', 'pine-set-of-three-clasp-boxes'],
  },

  'pine-desktop-file-organizer': {
    slug: 'pine-desktop-file-organizer',
    name: 'Pine Desktop File Organizer',
    closure: 'Open-Top',
    tagline: 'Magazine slot + pen wells + bottom drawer',
    intro:
      'A pine desktop organizer combining a magazine / file slot, two pen wells, and a small bottom drawer for paperclips, sticky notes, or business cards. The honey-tone finish reads warm and modern on a home office desk.',
    images: [
      img('set-8', 'ScreenShot_2026-05-06_185315_837.png'),
      img('set-8', 'ScreenShot_2026-05-06_185322_920.png'),
      img('set-8', 'ScreenShot_2026-05-06_185331_043.png'),
      img('set-8', 'ScreenShot_2026-05-06_185339_189.png'),
    ],
    specs: {
      'Closure Type': 'Open-top + bottom drawer',
      'Material': 'Solid pine',
      'Surface Finish': 'Honey lacquer',
      'Compartments': 'Magazine slot + 2 pen wells',
      'Drawer': '1 small bottom drawer',
      'Size': '260 × 130 × 200 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraved side',
    },
    customization: [
      'Stain: honey, walnut, natural',
      'Custom compartment layout',
      'Optional locking drawer',
      'Engraved logo / name',
      'Custom dimensions',
      'Bulk-pack pricing',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Home office', 'Co-working space', 'Student desk', 'Hotel writing desk', 'Boutique retail', 'Promotional gift'],
    related: ['pine-glass-top-display-box', 'pine-multi-drawer-essential-oil-box', 'pine-letter-opener-gift-box'],
  },

  'pine-glass-top-display-box': {
    slug: 'pine-glass-top-display-box',
    name: 'Pine Glass-Top Display Box',
    closure: 'Hinged',
    tagline: 'Hinged glass-lid pine box for two-cell display',
    intro:
      'A pine hinged display box with a clear glass top — divided into two cells for paired display of medals, coins, miniatures, or small specimens. Brass clasp closure; pine takes any stain to coordinate with collection theming.',
    images: [
      img('set-9', 'ScreenShot_2026-05-06_185429_370.png'),
      img('set-9', 'ScreenShot_2026-05-06_185435_520.png'),
      img('set-9', 'ScreenShot_2026-05-06_185442_486.png'),
    ],
    specs: {
      'Closure Type': 'Hinged glass lid w/ clasp',
      'Material': 'Solid pine',
      'Surface Finish': 'Natural sanded',
      'Cells': '2 (custom 4 / 6)',
      'Hardware': 'Brass hinges + clasp',
      'Size': '230 × 90 × 50 mm (custom)',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraved frame',
    },
    customization: [
      'Cells: 1 / 2 / 4 / 6',
      'Glass or clear acrylic top',
      'Stain or natural finish',
      'Engraved frame edge',
      'Optional velvet pad insert',
      'Wall-mount option',
    ],
    packaging:
      'Glass-protected foam wrap, retail box, 5-ply export master carton.',
    useCases: ['Medal & coin display', 'Specimen collection', 'Wedding-ring presentation', 'Retail showcase', 'Watch display', 'Memorabilia presentation'],
    related: ['pine-bracelet-display-box', 'pine-tea-box-chalkboard-lid', 'pine-desktop-file-organizer'],
  },

  'pine-branded-gift-box-set': {
    slug: 'pine-branded-gift-box-set',
    name: 'Pine Branded Gift Box (Custom Print)',
    closure: 'Lift-Off Lid',
    tagline: 'Pine retail box with full custom branding',
    intro:
      'A clean pine lift-off-lid box ready for full retail branding — laser engraving, hot foil stamping, or full-color UV print on the lid. Felt-padded interior in 4 cells suits jewelry, accessories, or curated retail kits.',
    images: [
      img('set-10', 'ScreenShot_2026-05-06_185639_505.png'),
      img('set-10', 'ScreenShot_2026-05-06_185646_680.png'),
      img('set-10', 'ScreenShot_2026-05-06_185653_992.png'),
      img('set-10', 'ScreenShot_2026-05-06_185701_370.png'),
      img('set-10', 'ScreenShot_2026-05-06_185711_690.png'),
    ],
    specs: {
      'Closure Type': 'Lift-off flat lid',
      'Material': 'Solid pine',
      'Surface Finish': 'Light lacquer',
      'Interior': 'Felt-padded 4-cell tray',
      'Branding': 'Laser / foil / UV print',
      'Size': '180 × 180 × 70 mm (custom)',
      'MOQ': '500 pcs',
      'Lead Time': '30 days',
      'Branding Add-On': 'Full retail branding',
    },
    customization: [
      'Custom external dimensions',
      'Tray cells: 1 / 2 / 4 / 6',
      'Felt color customization',
      'Lid branding: engrave, foil, UV print',
      'Magnetic closure option',
      'Bulk-pack pricing',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Jewelry retail', 'Premium gift packaging', 'Beauty / cosmetics', 'Subscription boxes', 'Wedding favors', 'Brand kits'],
    related: ['pine-fruit-storage-box', 'pine-classic-hinged-clasp-box', 'pine-set-of-three-clasp-boxes'],
  },

  'pine-kitchen-utensil-spice-caddy': {
    slug: 'pine-kitchen-utensil-spice-caddy',
    name: 'Pine Kitchen Utensil & Spice Caddy',
    closure: 'Open-Top',
    tagline: 'Branded farmhouse caddy with utensil + spice slots',
    intro:
      'A multifunctional pine kitchen caddy — utensil compartments on top with engraved fork / spoon / knife icons, plus a row of small spice jar slots along the bottom front. Includes paper-towel holder mount on the side. The complete farmhouse-kitchen statement piece.',
    images: [
      img('11', 'ScreenShot_2026-05-06_185941_995.png'),
      img('11', 'ScreenShot_2026-05-06_185948_900.png'),
      img('11', 'ScreenShot_2026-05-06_185957_798.png'),
      img('11', 'ScreenShot_2026-05-06_190005_403.png'),
    ],
    specs: {
      'Closure Type': 'Open-top w/ paper-towel side mount',
      'Material': 'Solid pine',
      'Surface Finish': 'Honey lacquer',
      'Utensil Slots': '3 (with engraved icons)',
      'Spice Slots': '6 jar slots front',
      'Size': '380 × 180 × 280 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Engraved logo on front',
    },
    customization: [
      'Stain: honey, walnut, painted',
      'Custom slot count & sizes',
      'Engraved kitchen / brand name',
      'Optional spice-jar starter set',
      'Custom proportions',
      'Bulk-pack pricing',
    ],
    packaging:
      'Foam-wrapped, retail box, 5-ply export master carton.',
    useCases: ['Farmhouse kitchen', 'Cooking-class supply', 'Wedding registry', 'Hospitality kitchen', 'Premium chef gift', 'Home decor retail'],
    related: ['pine-large-hinged-storage-box', 'pine-tea-box-glass-jars', 'pine-tea-box-chalkboard-lid'],
  },

  'pine-large-hinged-storage-box': {
    slug: 'pine-large-hinged-storage-box',
    name: 'Pine Large Hinged Storage Box',
    closure: 'Hinged',
    tagline: 'Heavy-duty pine storage box for tools and bulk items',
    intro:
      'A large-format pine storage box with reinforced corners and brass hardware — sized for workshop tools, art supplies, or general home storage where strength matters more than fine presentation. Solid 12 mm pine walls, hinged lid that lays open flat.',
    images: [
      img('12', 'ScreenShot_2026-05-06_190034_613.png'),
      img('12', 'ScreenShot_2026-05-06_190041_794.png'),
      img('12', 'ScreenShot_2026-05-06_190049_414.png'),
      img('12', 'ScreenShot_2026-05-06_190057_382.png'),
      img('12', 'ScreenShot_2026-05-06_190212_208.png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid w/ hook clasp',
      'Material': 'Solid pine (12 mm walls)',
      'Surface Finish': 'Natural sanded',
      'Hardware': 'Brass hinges + clasp',
      'Construction': 'Reinforced corner joints',
      'Size': '400 × 280 × 200 mm (custom)',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Wood-burned · laser engraved',
    },
    customization: [
      'Multiple sizes (M / L / XL)',
      'Reinforced dovetail or finger-joint corners',
      'Optional internal trays',
      'Lock + key option',
      'Stained, painted, or natural',
      'Custom external dimensions',
    ],
    packaging:
      'Stacked in pairs, foam-wrapped, packed in 5-ply export master carton.',
    useCases: ['Workshop tools', 'Art supplies', 'Garage storage', 'Garden tools', 'Home utility', 'Hobbyist storage'],
    related: ['pine-kitchen-utensil-spice-caddy', 'pine-classic-hinged-clasp-box', 'pine-fruit-storage-box'],
  },

  'pine-letter-opener-gift-box': {
    slug: 'pine-letter-opener-gift-box',
    name: 'Pine Letter Opener Gift Box',
    closure: 'Hinged',
    tagline: 'Slim pine book-style box for letter openers and pens',
    intro:
      'A book-style hinged pine box with a felt-lined inner tray sized for a single letter opener, fountain pen, or magnifying glass. Premium gift presentation at workhorse pricing — pine takes engraving cleanly for branded retail.',
    images: [
      img('set-11', 'ScreenShot_2026-05-06_190219_015.png'),
      img('set-11', 'ScreenShot_2026-05-06_190226_037.png'),
      img('set-11', 'ScreenShot_2026-05-06_190233_394.png'),
    ],
    specs: {
      'Closure Type': 'Book-style hinged',
      'Material': 'Solid pine',
      'Surface Finish': 'Natural sanded',
      'Interior Lining': 'Brown felt insert',
      'Hardware': 'Brass pin hinges',
      'Size': '230 × 130 × 25 mm (custom)',
      'MOQ': '500 pcs',
      'Lead Time': '25 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Custom insert shape (pen, opener, etc.)',
      'Felt color: brown, black, navy, red',
      'Stain or natural finish',
      'Engraved logo / monogram',
      'Magnetic closure option',
      'Bulk-pack pricing',
    ],
    packaging:
      'Tissue-wrapped, retail box, 5-ply export master carton.',
    useCases: ['Stationery retail', 'Pen retail', 'Letter opener gift sets', 'Corporate gifting', 'Wedding party gifts', 'Boutique gifting'],
    related: ['pine-desktop-file-organizer', 'pine-glass-top-display-box', 'pine-square-sliding-lid-box'],
  },

  'pine-tea-box-glass-jars': {
    slug: 'pine-tea-box-glass-jars',
    name: 'Pine Tea Box with Glass Jars',
    closure: 'Hinged',
    tagline: 'Pine tea station with included glass canisters',
    intro:
      'A pine tea / coffee station with a hinged top compartment for tea bags or single-origin coffee, plus two paired glass storage jars on the side. Sold complete with the jars; ideal for kitchen counters, breakfast bars, or as a wedding registry kit.',
    images: [
      img('set-12', 'ScreenShot_2026-05-06_190349_658.png'),
      img('set-12', 'ScreenShot_2026-05-06_190356_517.png'),
      img('set-12', 'ScreenShot_2026-05-06_190404_687.png'),
      img('set-12', 'ScreenShot_2026-05-06_190413_596.png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid + open jar shelf',
      'Material': 'Solid pine + glass jars',
      'Surface Finish': 'Honey stain',
      'Compartments': '4 inside box + 2 jars',
      'Hardware': 'Magnetic latch',
      'Size': '300 × 150 × 120 mm (custom)',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Engraved front',
    },
    customization: [
      'Glass jar count: 0 / 1 / 2 / 3',
      'Stain: honey, walnut, natural',
      'Custom inner divider count',
      'Engraved cafe / kitchen name',
      'Custom proportions',
      'Optional starter tea / coffee gift pack',
    ],
    packaging:
      'Foam-cradled retail box, 5-ply export master carton.',
    useCases: ['Home tea / coffee station', 'Cafe retail', 'Office breakroom', 'Wedding registry', 'Hotel mini bar', 'Hospitality FOH'],
    related: ['pine-tea-box-chalkboard-lid', 'pine-multi-drawer-essential-oil-box', 'pine-kitchen-utensil-spice-caddy'],
  },

  'pine-bracelet-display-box': {
    slug: 'pine-bracelet-display-box',
    name: 'Pine Bracelet Display Box (4 Poles)',
    closure: 'Hinged',
    tagline: 'Vintage pine bracelet box with 4 display poles',
    intro:
      'A vintage pine display box with 4 internal poles for stacking 150+ stretch bracelets — popular with bracelet retailers, boho jewelry brands, and craft markets. Glass top so the entire collection stays visible while protected from dust.',
    images: [
      img('set-13', 'ScreenShot_2026-05-06_190518_183.png'),
      img('set-13', 'ScreenShot_2026-05-06_190525_374.png'),
      img('set-13', 'ScreenShot_2026-05-06_190533_623.png'),
    ],
    specs: {
      'Closure Type': 'Hinged glass lid',
      'Material': 'Solid pine',
      'Surface Finish': 'Vintage walnut stain',
      'Poles': '4 (custom 2 / 6)',
      'Capacity': '~150 stretch bracelets',
      'Size': '280 × 200 × 180 mm (custom)',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Engraved frame',
    },
    customization: [
      'Pole count: 2 / 4 / 6',
      'Stain: walnut, ebony, natural',
      'Glass / acrylic top',
      'Engraved brand on frame',
      'Optional velvet base pad',
      'Custom proportions',
    ],
    packaging:
      'Glass-protected foam wrap, retail box, 5-ply export master carton.',
    useCases: ['Bracelet retail', 'Boho jewelry brand', 'Craft market display', 'Personal bracelet collection', 'Boutique merchandising', 'Trade show display'],
    related: ['pine-glass-top-display-box', 'pine-multi-drawer-essential-oil-box', 'pine-tea-box-chalkboard-lid'],
  },

  'pine-square-sliding-lid-box': {
    slug: 'pine-square-sliding-lid-box',
    name: 'Pine Sliding Lid Box with Mesh',
    closure: 'Sliding Lid',
    tagline: 'Pine sliding-lid box with decorative side mesh',
    intro:
      'A pine sliding-lid box with a decorative perforated metal mesh insert on one side — gives ventilation for cigar storage, soap drying, or simply a more sophisticated look than plain wood. Sturdy CNC-routed groove gives the lid a smooth slide.',
    images: [
      img('set-14', 'ScreenShot_2026-05-06_190600_185.png'),
      img('set-14', 'ScreenShot_2026-05-06_190606_620.png'),
      img('set-14', 'ScreenShot_2026-05-06_190613_854.png'),
      img('set-14', 'ScreenShot_2026-05-06_190621_250.png'),
    ],
    specs: {
      'Closure Type': 'Sliding lid (CNC groove)',
      'Material': 'Solid pine + perforated metal',
      'Surface Finish': 'Natural sanded',
      'Mesh Side': 'Decorative ventilation panel',
      'Lid': 'Flush flat panel',
      'Size': '180 × 120 × 60 mm (custom)',
      'MOQ': '500 pcs',
      'Lead Time': '25 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Mesh material: brass, copper, black',
      'Stain or paint',
      'Engraved monogram or full lid art',
      'Optional finger pull',
      'Custom proportions',
      'Bulk-pack pricing',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Cigar storage', 'Soap drying', 'Tea storage', 'Gift packaging', 'Specialty retail', 'Boutique craft'],
    related: ['pine-fruit-storage-box', 'pine-letter-opener-gift-box', 'pine-classic-hinged-clasp-box'],
  },
};

export const PRODUCT_SLUGS = Object.keys(PRODUCTS);
export const CLOSURES = Array.from(new Set(Object.values(PRODUCTS).map((p) => p.closure)));
