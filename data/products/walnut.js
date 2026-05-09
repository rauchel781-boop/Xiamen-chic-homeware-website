// ─────────────────────────────────────────────────────────────────────────
// Walnut Wooden Boxes — 12 products
// Image paths reference /public/walnut-wooden-box/<folder>/
// ─────────────────────────────────────────────────────────────────────────

const PARENT = 'walnut wooden box';
const img = (folder, name) =>
  '/' + [PARENT, folder, name].map(encodeURIComponent).join('/');

export const PRODUCTS = {
  'walnut-storage-tray-with-handles': {
    slug: 'walnut-storage-tray-with-handles',
    name: 'Walnut Storage Tray with Handles',
    closure: 'Open-Top',
    tagline: 'Open walnut tray with metal hand-loop pulls',
    intro:
      'A solid walnut open-top tray with brass-tone metal hand-loop pulls. The deep chocolate walnut grain reads premium on a coffee table, vanity, or desk; sized to corral remotes, books, mail, magazines, or magazines and a candle.',
    images: [
      img('set-1', '134.png'),
      img('set-1', 'ScreenShot_2026-05-06_194617_127.png'),
      img('set-1', 'image (25).png'),
    ],
    specs: {
      'Closure Type': 'Open-top tray',
      'Material': 'Solid American black walnut',
      'Surface Finish': 'Hand-rubbed oil',
      'Handles': 'Brass-tone metal loops',
      'Construction': 'Solid panel walls',
      'Size': '300 × 210 × 120 mm',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving',
    },
    customization: [
      'Wood: walnut, oak, mahogany',
      'Handle finish: brass, chrome, black',
      'Multiple sizes (M / L / XL)',
      'Engraved logo on side',
      'Optional felt-pad base',
      'Custom external dimensions',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Coffee table styling', 'Vanity / dresser', 'Office desk', 'Hospitality FOH', 'Hotel guestroom', 'Home decor retail'],
    related: ['walnut-jewelry-keepsake-box', 'walnut-tissue-box-collection', 'walnut-cable-management-box'],
  },

  'walnut-jewelry-keepsake-box': {
    slug: 'walnut-jewelry-keepsake-box',
    name: 'Walnut Square Jewelry Keepsake Box',
    closure: 'Hinged',
    tagline: 'Velvet-lined walnut box for jewelry presentation',
    intro:
      'A square walnut jewelry keepsake box with hidden hinges and a black velvet lining. Compact 10×10 cm footprint sized for a single ring, pendant, or pair of earrings. The dramatic walnut grain frames the velvet interior beautifully.',
    images: [
      img('set-2', 'ScreenShot_2026-05-06_194530_307.png'),
      img('set-2', 'ScreenShot_2026-05-06_194540_921.png'),
      img('set-2', 'ScreenShot_2026-05-06_194549_531.png'),
      img('set-2', 'ScreenShot_2026-05-06_194558_801.png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid (concealed hinge)',
      'Material': 'Solid American black walnut',
      'Surface Finish': 'Hand-rubbed oil',
      'Interior Lining': 'Black velvet',
      'Hardware': 'Concealed brass pin hinge',
      'Size': '103 × 103 × 40 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Wood: walnut, oak, mahogany',
      'Velvet color: black, navy, red, cream',
      'Slot for ring / pendant / earrings',
      'Engraved monogram or date',
      'Optional embroidered logo on lining',
      'Magnetic closure option',
    ],
    packaging:
      'Wrapped in tissue, individual gift sleeve, retail-ready inner carton, 5-ply export master carton.',
    useCases: ['Engagement / wedding rings', 'Pendant presentation', 'Anniversary gifts', 'Heirloom keepsake', 'Premium retail', 'Wedding party gifts'],
    related: ['walnut-storage-tray-with-handles', 'walnut-small-hinged-jewelry-box', 'walnut-keepsake-with-key-lock'],
  },

  'walnut-tissue-box-collection': {
    slug: 'walnut-tissue-box-collection',
    name: 'Walnut Tissue Box Collection',
    closure: 'Lift-Off Lid',
    tagline: 'Multi-shape walnut tissue covers — rectangular, oval, square',
    intro:
      'A collection of walnut tissue covers in coordinated shapes — rectangular, oval, square — that fit standard tissue cartons. The deep chocolate walnut grain elevates everyday tissues to bedroom, hotel, and spa-grade decor.',
    images: [
      img('set-3', 'ScreenShot_2026-05-06_194829_658.png'),
      img('set-3', 'ScreenShot_2026-05-06_194837_247.png'),
      img('set-3', 'ScreenShot_2026-05-06_194844_470.png'),
      img('set-3', 'ScreenShot_2026-05-06_194854_605.png'),
    ],
    specs: {
      'Closure Type': 'Lift-off lid w/ slot',
      'Material': 'Solid American black walnut',
      'Surface Finish': 'Hand-rubbed oil',
      'Fits': 'Standard rectangular / square tissue cartons',
      'Shapes': 'Rectangular · oval · square',
      'Size': '260 × 130 × 90 mm (rectangular)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving',
    },
    customization: [
      'Wood: walnut, oak, mahogany',
      'Shape: rectangular, oval, square, hex',
      'Custom dimensions for boutique tissue brands',
      'Engraved monogram',
      'Optional felt foot pads',
      'Bulk-pack pricing for hospitality',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Bedroom / nightstand', 'Hotel guestroom', 'Spa & salon', 'Office reception', 'Boutique retail', 'Wedding / housewarming gift'],
    related: ['walnut-tissue-box-with-organizer', 'walnut-storage-tray-with-handles', 'walnut-cotton-swab-box'],
  },

  'walnut-small-hinged-jewelry-box': {
    slug: 'walnut-small-hinged-jewelry-box',
    name: 'Walnut Small Hinged Jewelry Box',
    closure: 'Hinged',
    tagline: 'Compact walnut box with traditional hinge',
    intro:
      'A compact walnut hinged jewelry box — sized for cufflinks, a watch, or a small jewelry collection. Brass pin hinges and a clean exterior; can be left raw inside for hardwood feel or felt-lined for jewelry presentation.',
    images: [
      img('set-4', 'ScreenShot_2026-05-06_194920_196.png'),
      img('set-4', 'ScreenShot_2026-05-06_194927_413.png'),
      img('set-4', 'ScreenShot_2026-05-06_194935_073.png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid',
      'Material': 'Solid American black walnut',
      'Surface Finish': 'Hand-rubbed oil',
      'Hardware': 'Brass pin hinges',
      'Interior': 'Sanded wood (felt optional)',
      'Size': '120 × 100 × 80 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Wood: walnut, oak, mahogany',
      'Optional felt or velvet lining',
      'Engraved monogram',
      'Soft-close hinge upgrade',
      'Custom dimensions',
      'Magnetic closure option',
    ],
    packaging:
      'Wrapped in tissue, retail box, 5-ply export master carton.',
    useCases: ['Cufflink presentation', 'Watch storage', 'Compact jewelry storage', 'Engagement / wedding gift', 'Hotel guestroom amenity', 'Boutique retail'],
    related: ['walnut-jewelry-keepsake-box', 'walnut-keepsake-with-key-lock', 'walnut-ring-pebble-box'],
  },

  'walnut-round-spice-box': {
    slug: 'walnut-round-spice-box',
    name: 'Walnut Round Spice / Salt Box',
    closure: 'Lift-Off Lid',
    tagline: 'Oval walnut salt cellar with brass knob',
    intro:
      'A small oval walnut salt or spice cellar with a polished brass top knob. Sized for finishing salts, peppercorns, or a single tea blend; the rich walnut grain looks beautiful on a stove-side counter or dining table.',
    images: [
      img('set-5', 'ScreenShot_2026-05-06_195043_862.png'),
      img('set-5', 'ScreenShot_2026-05-06_195053_354.png'),
      img('set-5', 'ScreenShot_2026-05-06_195101_090.png'),
      img('set-5', 'ScreenShot_2026-05-06_195120_802.png'),
      img('set-5', 'ScreenShot_2026-05-06_195135_062.png'),
    ],
    specs: {
      'Closure Type': 'Lift-off lid w/ brass knob',
      'Material': 'Solid American black walnut',
      'Surface Finish': 'Food-safe oil',
      'Hardware': 'Brass knob',
      'Capacity': '~50 g',
      'Size': '120 × 100 × 50 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Wood: walnut, oak, mahogany',
      'Knob finish: brass, chrome, black',
      'Round / oval / square shape',
      'Engraved logo on lid',
      'Optional swivel-pin lid',
      'Bulk-pack pricing',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Home cook', 'Restaurant tabletop', 'Hospitality FOH', 'Wedding registry', 'Premium chef gift', 'Home kitchen retail'],
    related: ['walnut-tissue-box-collection', 'walnut-storage-tray-with-handles', 'walnut-cotton-swab-box'],
  },

  'walnut-keepsake-with-key-lock': {
    slug: 'walnut-keepsake-with-key-lock',
    name: 'Walnut Keepsake Box with Key Lock',
    closure: 'Hinged',
    tagline: 'Locking walnut box with brass key',
    intro:
      'A walnut hinged keepsake box with a brass cam lock and matching brass key — for documents, valuables, or anything that needs to stay secure. Solid American black walnut with hand-rubbed oil; the key threads on a brass tassel for keeping with the box.',
    images: [
      img('set-6', 'ScreenShot_2026-05-06_195147_493.png'),
      img('set-6', 'ScreenShot_2026-05-06_195154_343.png'),
      img('set-6', 'ScreenShot_2026-05-06_195202_886.png'),
      img('set-6', 'ScreenShot_2026-05-06_195210_750.png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid w/ brass cam lock',
      'Material': 'Solid American black walnut',
      'Surface Finish': 'Hand-rubbed oil',
      'Hardware': 'Brass cam lock + 2 keys',
      'Interior': 'Sanded wood (felt optional)',
      'Size': '260 × 180 × 90 mm (custom)',
      'MOQ': '200 pcs',
      'Lead Time': '35 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Wood: walnut, oak, mahogany',
      'Lock: brass, chrome, antique brass',
      'Optional felt or velvet lining',
      'Engraved monogram or date',
      'Custom external dimensions',
      'Optional combination lock',
    ],
    packaging:
      'Wrapped in tissue, retail-ready inner carton, 5-ply export master carton.',
    useCases: ['Document storage', 'Valuables / keepsake', 'Watch + jewelry secure', 'Heirloom protection', 'Home office', 'Premium retail'],
    related: ['walnut-treasure-box-with-key', 'walnut-jewelry-keepsake-box', 'walnut-small-hinged-jewelry-box'],
  },

  'walnut-treasure-box-with-key': {
    slug: 'walnut-treasure-box-with-key',
    name: 'Walnut Treasure Box with Brass Key',
    closure: 'Hinged',
    tagline: 'Heirloom-grade walnut chest with antique brass key',
    intro:
      'An heirloom-format walnut chest with a brass cam lock and antique-style key threaded on a leather pull. Built thick and finished to a satin glow — the walnut grain alone makes it a centerpiece. Inside: a sanded wood floor that takes a watch, jewelry, or a set of letters.',
    images: [
      img('set-7', 'ScreenShot_2026-05-06_195243_725.png'),
      img('set-7', 'ScreenShot_2026-05-06_195251_267.png'),
      img('set-7', 'ScreenShot_2026-05-06_195258_478.png'),
      img('set-7', 'ScreenShot_2026-05-06_195312_140.png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid w/ antique brass cam lock',
      'Material': 'Solid American black walnut',
      'Surface Finish': 'Satin oil + wax',
      'Hardware': 'Antique brass lock + leather-tassel key',
      'Interior': 'Sanded wood floor',
      'Size': '280 × 200 × 110 mm (custom)',
      'MOQ': '200 pcs',
      'Lead Time': '35 days',
      'Branding': 'Engraved lid',
    },
    customization: [
      'Wood: walnut, oak, mahogany',
      'Lock & key finish: antique brass / chrome / black',
      'Velvet / felt lining option',
      'Engraved monogram or heirloom dedication',
      'Custom external dimensions',
      'Hidden compartment option',
    ],
    packaging:
      'Wrapped in tissue, foam cradled, retail-ready inner carton, 5-ply export master carton.',
    useCases: ['Heirloom storage', 'Watch / jewelry chest', 'Anniversary gifting', 'Document & letter storage', 'Premium retail', 'Hospitality safe alternative'],
    related: ['walnut-keepsake-with-key-lock', 'walnut-jewelry-keepsake-box', 'walnut-storage-tray-with-handles'],
  },

  'walnut-tissue-box-with-organizer': {
    slug: 'walnut-tissue-box-with-organizer',
    name: 'Walnut Tissue Box with Desk Organizer',
    closure: 'Open-Top',
    tagline: 'Combo tissue cover and desk-side caddy',
    intro:
      'A walnut piece that does double duty — tissue cover on one half, three-cell desk organizer on the other for remotes, glasses, pens, or a phone stand. Lives perfectly on a nightstand, sofa armrest, or office desk.',
    images: [
      img('set-8', 'ScreenShot_2026-05-06_195345_545.png'),
      img('set-8', 'ScreenShot_2026-05-06_195352_788.png'),
    ],
    specs: {
      'Closure Type': 'Tissue slot + open-top organizer',
      'Material': 'Solid American black walnut',
      'Surface Finish': 'Hand-rubbed oil',
      'Compartments': '1 tissue + 3 organizer cells',
      'Profile': 'Low and wide',
      'Size': '300 × 130 × 100 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on top',
    },
    customization: [
      'Wood: walnut, oak, mahogany',
      'Custom organizer-side layout',
      'Engraved logo / dedication',
      'Optional felt-pad base',
      'Custom proportions',
      'Bulk-pack pricing',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Office desk', 'Nightstand', 'Sofa / TV bench', 'Hospitality FOH', 'Hotel guestroom', 'Home decor retail'],
    related: ['walnut-tissue-box-collection', 'walnut-tissue-box-multi-organizer', 'walnut-storage-tray-with-handles'],
  },

  'walnut-tissue-box-multi-organizer': {
    slug: 'walnut-tissue-box-multi-organizer',
    name: 'Walnut Tissue Box + Multi-Cell Organizer',
    closure: 'Open-Top',
    tagline: 'Walnut tissue cover with 3 organizer compartments',
    intro:
      'A walnut tissue cover combined with three cells of open-top organizer space — designed for living rooms or guestrooms where remotes, pens, glasses, and a tissue carton all need a single home. Solid American black walnut, hand-rubbed oil finish.',
    images: [
      img('set-9', 'ScreenShot_2026-05-06_195400_378.png'),
      img('set-9', 'ScreenShot_2026-05-06_195408_058.png'),
    ],
    specs: {
      'Closure Type': 'Tissue slot + open compartments',
      'Material': 'Solid American black walnut',
      'Surface Finish': 'Hand-rubbed oil',
      'Compartments': '1 tissue + 3 cells',
      'Tissue Fits': 'Standard rectangular cartons',
      'Size': '300 × 150 × 100 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving',
    },
    customization: [
      'Wood: walnut, oak, mahogany',
      'Custom organizer-cell sizes',
      'Engraved logo on top',
      'Optional felt base',
      'Custom proportions',
      'Bulk-pack pricing',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Living room', 'Guest room', 'Home office', 'Hospitality FOH', 'Hotel guestroom', 'Home decor retail'],
    related: ['walnut-tissue-box-with-organizer', 'walnut-tissue-box-collection', 'walnut-storage-tray-with-handles'],
  },

  'walnut-cable-management-box': {
    slug: 'walnut-cable-management-box',
    name: 'Walnut Cable Management Box',
    closure: 'Lift-Off Lid',
    tagline: 'Premium walnut cover for power strips and cords',
    intro:
      'A premium walnut cable management box — hides power strips, surge protectors, and cords from view. Side cutouts let cables exit cleanly. The deep walnut grain elevates a workspace far above the typical fiberboard cable boxes.',
    images: [
      img('set-10', 'ScreenShot_2026-05-06_195426_680.png'),
      img('set-10', 'ScreenShot_2026-05-06_195435_032.png'),
      img('set-10', 'ScreenShot_2026-05-06_195446_948.png'),
      img('set-10', 'ScreenShot_2026-05-06_195457_423.png'),
    ],
    specs: {
      'Closure Type': 'Lift-off lid',
      'Material': 'Solid American black walnut',
      'Surface Finish': 'Hand-rubbed oil',
      'Cord Slots': 'Two side cutouts',
      'Interior': 'Sized for 6-outlet power strip',
      'Size': '320 × 130 × 120 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Wood: walnut, oak, mahogany',
      'Sized for 4 / 6 / 8-outlet strips',
      'Custom cord-cutout count & shape',
      'Engraved logo on lid',
      'Felt-padded base',
      'Bulk-pack pricing',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Premium home office', 'Bedroom nightstand', 'Living-room TV bench', 'Hotel desk amenity', 'Co-working spaces', 'Tech-tidy gifting'],
    related: ['walnut-storage-tray-with-handles', 'walnut-tissue-box-with-organizer', 'walnut-tissue-box-collection'],
  },

  'walnut-ring-pebble-box': {
    slug: 'walnut-ring-pebble-box',
    name: 'Walnut Ring / Pebble Mini Box',
    closure: 'Hinged',
    tagline: 'Tiny pebble-shape walnut box for a single ring',
    intro:
      'A tiny walnut ring box with an organic pebble silhouette and a hand-carved ring slot inside the lid. Single-piece walnut, hand-finished with hand-rubbed oil. The size and shape make it the perfect proposal box.',
    images: [
      img('set-11', 'ScreenShot_2026-05-06_195547_536.png'),
      img('set-11', 'ScreenShot_2026-05-06_195554_126.png'),
      img('set-11', 'ScreenShot_2026-05-06_195601_418.png'),
      img('set-11', 'ScreenShot_2026-05-06_195608_474.png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid (pin hinge)',
      'Material': 'Solid American black walnut',
      'Surface Finish': 'Hand-rubbed oil',
      'Interior': 'Hand-carved ring slot in lid',
      'Hardware': 'Brass pin hinge',
      'Size': '60 × 60 × 40 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '35 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Wood: walnut, olive, rosewood',
      'Single ring or pair-ring slot',
      'Engraved date / initials inside lid',
      'Optional velvet pad',
      'Custom shape (pebble, square, hex)',
      'Magnetic closure option',
    ],
    packaging:
      'Wrapped in tissue, individual gift sleeve, retail-ready inner carton, 5-ply export master carton.',
    useCases: ['Engagement proposal', 'Wedding-ring presentation', 'Anniversary gift', 'Boutique jeweler', 'Heirloom keepsake', 'Premium gift'],
    related: ['walnut-jewelry-keepsake-box', 'walnut-small-hinged-jewelry-box', 'walnut-cotton-swab-box'],
  },

  'walnut-cotton-swab-box': {
    slug: 'walnut-cotton-swab-box',
    name: 'Walnut Cotton Swab / Q-Tip Box',
    closure: 'Lift-Off Lid',
    tagline: 'Walnut bath box for cotton swabs, pads, and toiletries',
    intro:
      'A walnut lift-off-lid box for cotton swabs, makeup pads, or small toiletries — compact enough for a vanity, beautifully grained enough to leave on display. Hand-finished walnut takes splashes and humidity in stride.',
    images: [
      img('set-12', 'ScreenShot_2026-05-06_195636_686.png'),
      img('set-12', 'ScreenShot_2026-05-06_195643_998.png'),
      img('set-12', 'ScreenShot_2026-05-06_195651_553.png'),
      img('set-12', 'ScreenShot_2026-05-06_195659_383.png'),
    ],
    specs: {
      'Closure Type': 'Lift-off lid',
      'Material': 'Solid American black walnut',
      'Surface Finish': 'Water-resistant hand-rubbed oil',
      'Interior': 'Sanded wood',
      'Construction': 'Solid panel walls',
      'Size': '110 × 110 × 70 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Wood: walnut, oak, mahogany',
      'Custom dimensions for soaps / cottons',
      'Engraved logo or quote',
      'Set composition: swabs / pads / soap bars',
      'Optional inner divider',
      'Bulk-pack pricing for hospitality',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Bathroom & vanity', 'Hotel guestroom', 'Spa retail', 'Wedding registry', 'Boutique amenity', 'Skincare retail'],
    related: ['walnut-tissue-box-collection', 'walnut-round-spice-box', 'walnut-ring-pebble-box'],
  },
};

export const PRODUCT_SLUGS = Object.keys(PRODUCTS);
export const CLOSURES = Array.from(new Set(Object.values(PRODUCTS).map((p) => p.closure)));
