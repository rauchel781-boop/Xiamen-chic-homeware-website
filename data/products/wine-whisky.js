// ─────────────────────────────────────────────────────────────────────────
// Wine & Whisky Box products (sample 5)
// Image paths reference /public/wine-whisky-boxes/<product-folder>/
// ─────────────────────────────────────────────────────────────────────────

const PARENT = 'Wine & Whisky Boxes';
const img = (folder, name) =>
  '/' + [PARENT, folder, name].map(encodeURIComponent).join('/');

export const PRODUCTS = {
  'bamboo-wine-gift-set': {
    slug: 'bamboo-wine-gift-set',
    name: 'Bamboo Single-Bottle Wine Gift Set',
    closure: 'Hinged',
    tagline: 'Single-bottle bamboo box with 4-piece sommelier kit',
    intro:
      'A premium single-bottle wine presentation box in solid bamboo with a hinged lid and brass clasp. Foam-cut lid recess holds a 4-piece sommelier kit — corkscrew, drip ring, foil cutter, and pour spout — turning the box itself into a complete gift.',
    images: [
      img('bamboo wine box', 'ScreenShot_2026-05-04_200210_373.png'),
      img('bamboo wine box', 'ScreenShot_2026-05-04_200220_049.png'),
      img('bamboo wine box', 'ScreenShot_2026-05-04_200228_834.png'),
      img('bamboo wine box', 'ScreenShot_2026-05-04_200236_185.png'),
      img('bamboo wine box', 'ScreenShot_2026-05-04_200244_603.png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid with brass clasp',
      'Material': 'Solid bamboo (carbonized or natural)',
      'Surface Finish': 'Food-safe oil · clear lacquer',
      'Hardware': 'Brass-finish butt hinges · hook clasp',
      'Capacity': '1 bottle (standard 750ml) + 4-piece accessory kit',
      'Accessories Included': 'Corkscrew · drip ring · foil cutter · pour spout',
      'Size': 'Custom',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving · brass nameplate · screen print',
    },
    customization: [
      'Bamboo color: pale gold or warm carbonized caramel',
      'Hinge color: brass / antique brass / matte black',
      '4-piece, 5-piece, or no-accessory configurations',
      'Custom foam-cut accessory layout',
      'Logo: laser engraved or brass nameplate',
      'Optional retail outer sleeve / gift bag',
    ],
    packaging:
      'Each box wrapped in OPP polybag, accessories pre-fitted, packed in individual carton with foam corner protection. 5-ply export master cartons.',
    useCases: ['Wineries', 'Corporate gifting', 'Anniversary gifts', 'Wine clubs', 'Hotel concierge', 'Bridal / wedding gifts'],
    related: ['paulownia-wine-chest', 'pine-single-bottle-wine-box', 'pine-whisky-crate-rope-handle'],
  },

  'paulownia-wine-chest': {
    slug: 'paulownia-wine-chest',
    name: 'Rustic Paulownia Wine Storage Chest',
    closure: 'Hinged',
    tagline: 'Large hinged storage chest in paulownia with rope handles',
    intro:
      'A vintage-rustic storage chest in lightweight paulownia, with a hinged lid, brass-finish hardware, and natural rope side handles. Sized for multi-bottle wine storage, gift-set assemblies, or as a presentation crate for spirit launches.',
    images: [
      img('paulownia wooden-box', 'ScreenShot_2026-05-04_195900_650.png'),
      img('paulownia wooden-box', 'ScreenShot_2026-05-04_195912_229.png'),
      img('paulownia wooden-box', 'ScreenShot_2026-05-04_195920_592.png'),
      img('paulownia wooden-box', 'ScreenShot_2026-05-04_195940_400.png'),
      img('paulownia wooden-box', 'ScreenShot_2026-05-04_195948_205.png'),
      img('paulownia wooden-box', 'ScreenShot_2026-05-04_195957_064.png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid (full-width)',
      'Material': 'Solid paulownia',
      'Surface Finish': 'Natural · stained · oiled · torched',
      'Hardware': 'Brass-finish hinges · corner brackets · jute rope handles',
      'Capacity': 'Multi-bottle / general storage',
      'Size': 'Custom',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Wood burning · laser engraving · stencil print',
    },
    customization: [
      'Wood: paulownia (light) / pine (heavier, more grain)',
      'Stain: natural / honey / walnut / ebony / torched',
      'Handle: jute rope / leather / metal',
      'Optional foam-cut bottle inserts (3 / 6 / 12 bottles)',
      'Brass corner reinforcements',
      'Wood-burned brand logo for authentic look',
    ],
    packaging:
      'Each chest individually bubble-wrapped with rope handles secured against transit damage. 5-ply export master cartons.',
    useCases: ['Wine cellars', 'Spirit launches', 'Rustic retail packaging', 'Farm-to-table brands', 'Treasure hunt / event props', 'Memory chests'],
    related: ['bamboo-wine-gift-set', 'pine-whisky-crate-rope-handle', 'pine-3-bottle-glass-lid'],
  },

  'pine-3-bottle-glass-lid': {
    slug: 'pine-3-bottle-glass-lid',
    name: 'Pine 3-Bottle Wine Box with Glass Lid',
    closure: 'Sliding',
    tagline: '3-bottle pine box with sliding clear-acrylic lid',
    intro:
      'A pine wine box sized for 3 standard bottles (350 × 135 × 140 mm), with a sliding lid featuring a clear acrylic window. The transparent top showcases the bottles inside — perfect for retail display, wine subscription gifts, or curated tasting sets.',
    images: [
      img('pine-wine-crate-sliding', 'ScreenShot_2026-05-04_195630_945.png'),
      img('pine-wine-crate-sliding', 'ScreenShot_2026-05-04_195647_897.png'),
      img('pine-wine-crate-sliding', 'ScreenShot_2026-05-04_195657_086.png'),
      img('pine-wine-crate-sliding', 'ScreenShot_2026-05-04_195705_193.png'),
      img('pine-wine-crate-sliding', 'ScreenShot_2026-05-04_195712_995.png'),
      img('pine-wine-crate-sliding', 'ScreenShot_2026-05-04_195719_426.png'),
    ],
    specs: {
      'Closure Type': 'Sliding lid with acrylic window',
      'Material': 'Solid pine',
      'Surface Finish': 'Raw · clear lacquer · stained',
      'Hardware': 'None — hardware-free sliding lid',
      'Lid Window': '3 mm clear acrylic insert',
      'Capacity': '3 bottles (350 × 135 × 140 mm)',
      'Size': 'Custom (1 / 3 / 6 bottle configurations)',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving · screen print · burned-in mark on lid',
    },
    customization: [
      'Bottle capacity: 1 / 2 / 3 / 6',
      'Lid: clear acrylic window or solid pine',
      'Internal foam dividers (snug-fit per bottle)',
      'Wood: pine (default), oak (premium), paulownia (lightweight)',
      'Finish: raw / oiled / lacquered / stained',
      'Logo: laser, screen-print, or hot-foil on lid',
    ],
    packaging:
      'Acrylic window protected with peel-off PE film, full unit OPP-wrapped, packed in 5-ply export cartons.',
    useCases: ['Wine retailers', 'Subscription wine boxes', 'Tasting flight gifts', 'Hotel mini-bar', 'Retail shelf display', 'Wedding favors (curated)'],
    related: ['pine-single-bottle-wine-box', 'pine-whisky-crate-rope-handle', 'paulownia-wine-chest'],
  },

  'pine-single-bottle-wine-box': {
    slug: 'pine-single-bottle-wine-box',
    name: 'Pine Single-Bottle Wine Box',
    closure: 'Sliding',
    tagline: 'Classic rustic single-bottle wine box with sliding lid',
    intro:
      'The classic rustic wine box — solid pine, sliding top, and burned-in branding. The simplest, most cost-effective single-bottle format. Hardware-free construction means lower cost, easier shipping, and a clean exterior canvas for branding.',
    images: [
      img('single-bottle-wine-box', 'ScreenShot_2026-05-04_195301_120.png'),
      img('single-bottle-wine-box', 'ScreenShot_2026-05-04_195316_240.png'),
      img('single-bottle-wine-box', 'ScreenShot_2026-05-04_195323_922.png'),
      img('single-bottle-wine-box', 'ScreenShot_2026-05-04_195331_035.png'),
      img('single-bottle-wine-box', 'ScreenShot_2026-05-04_195339_872.png'),
    ],
    specs: {
      'Closure Type': 'Sliding lid (CNC-routed grooves)',
      'Material': 'Solid pine',
      'Surface Finish': 'Raw / clear lacquer / stained',
      'Hardware': 'None — hardware-free construction',
      'Capacity': '1 bottle (standard 750ml)',
      'Size': 'Custom (375 × 110 × 110 mm typical)',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Wood burning · laser engraving · screen print',
    },
    customization: [
      'Wood: pine, paulownia, oak, walnut',
      'Finish: raw / oiled / stained / torched',
      'Brand: large-format burn-in or laser logo on lid and sides',
      'Optional foam bottle cradle inside',
      'Lid finger pull or ribbon hole',
      'Optional rope handle on top',
    ],
    packaging:
      'OPP-wrapped, stacked in groups of 12, packed in master cartons. Hardware-free design saves on freight cost.',
    useCases: ['Wineries (private label)', 'Wine retailers', 'Vintage gift sets', 'Restaurants (table service)', 'Promotional giveaways', 'Wedding favors'],
    related: ['bamboo-wine-gift-set', 'pine-3-bottle-glass-lid', 'pine-whisky-crate-rope-handle'],
  },

  'pine-whisky-crate-rope-handle': {
    slug: 'pine-whisky-crate-rope-handle',
    name: 'Multi-Bottle Whisky Crate with Rope Handle',
    closure: 'Lift-off',
    tagline: 'Brand-stamped pine crate with lift-off lid and rope handle',
    intro:
      'A multi-bottle whisky/wine crate in solid pine with a lift-off lid and natural rope handle. The flat lid surface is a generous canvas for screen-printed branding (shown here with Balcones Distilling). Carry-friendly, distinctive, and durable enough to be reused as decor.',
    images: [
      img('sliding-wine-presentation-set', 'ScreenShot_2026-05-04_195454_342.png'),
      img('sliding-wine-presentation-set', 'ScreenShot_2026-05-04_195505_061.png'),
      img('sliding-wine-presentation-set', 'ScreenShot_2026-05-04_195513_315.png'),
      img('sliding-wine-presentation-set', 'ScreenShot_2026-05-04_195521_792.png'),
      img('sliding-wine-presentation-set', 'ScreenShot_2026-05-04_195530_982.png'),
    ],
    specs: {
      'Closure Type': 'Lift-off lid (separate top + base)',
      'Material': 'Solid pine',
      'Surface Finish': 'Stained · oiled · clear lacquer',
      'Hardware': 'Natural rope handle · optional brass corner brackets',
      'Capacity': '2-3 bottles (multi-configuration)',
      'Size': 'Custom',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Screen print · burned-in mark · stenciled logo',
    },
    customization: [
      'Capacity: 2 / 3 / 6-bottle configurations',
      'Stain: natural / honey / walnut / torched',
      'Handle: jute rope / leather / metal',
      'Internal foam-cut bottle holders',
      'Brand printing in 1-3 colors on lid and front',
      'Stackable design with locating ridges',
    ],
    packaging:
      'Lid and base stacked together with foam separator, OPP-wrapped, packed in master cartons. Sized to fit standard pallets at full capacity.',
    useCases: ['Distilleries', 'Limited-edition whisky', 'Retail crate-style packaging', 'Wine clubs', 'Bar / restaurant decor', 'Branded promo events'],
    related: ['paulownia-wine-chest', 'pine-3-bottle-glass-lid', 'bamboo-wine-gift-set'],
  },
};

export const PRODUCT_SLUGS = Object.keys(PRODUCTS);
export const CLOSURES = Array.from(new Set(Object.values(PRODUCTS).map((p) => p.closure)));
