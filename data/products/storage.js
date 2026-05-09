// ─────────────────────────────────────────────────────────────────────────
// Storage Boxes — 12 products
// Image paths reference /public/storage-box/<folder>/
// ─────────────────────────────────────────────────────────────────────────

const PARENT = 'Storage Box';
const img = (folder, name) =>
  '/' + [PARENT, folder, name].map(encodeURIComponent).join('/');

export const PRODUCTS = {
  'wooden-3-drawer-desktop-organizer': {
    slug: 'wooden-3-drawer-desktop-organizer',
    name: 'Wooden 3-Drawer Desktop Organizer',
    closure: 'Drawer',
    tagline: 'Solid-wood 3-tier drawer cabinet for desktop storage',
    intro:
      'A classic 3-tier solid wood drawer cabinet built for desktop and dressing-table use. Smooth wood-on-wood drawer slides, brass cup pulls, and matched-grain drawer faces give it the heirloom look at production scale.',
    images: [
      img('Wooden 3-Drawer Desktop Organizer', 'Solid Wood Multi Drawer (1).png'),
      img('Wooden 3-Drawer Desktop Organizer', 'Solid Wood Multi Drawer (2).png'),
      img('Wooden 3-Drawer Desktop Organizer', 'Solid Wood Multi Drawer (3).png'),
      img('Wooden 3-Drawer Desktop Organizer', 'Solid Wood Multi Drawer (4).png'),
      img('Wooden 3-Drawer Desktop Organizer', 'Solid Wood Multi Drawer (5).png'),
      img('Wooden 3-Drawer Desktop Organizer', 'Solid Wood Multi Drawer (6).png'),
    ],
    specs: {
      'Closure Type': '3 pull-out drawers',
      'Material': 'Solid pine (oak / walnut available)',
      'Surface Finish': 'Natural oil · stain · matte lacquer',
      'Hardware': 'Antique brass cup pulls',
      'Interior Lining': 'Sanded wood interior',
      'Size': '300 × 200 × 320 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on top or drawer face',
    },
    customization: [
      '2 / 3 / 5 / 7 drawer configurations',
      'Pine, oak, walnut, or paulownia',
      'Brass cup pulls, knobs, or recessed handles',
      'Optional dividers per drawer',
      'Stackable matching units',
      'Engraved logo or label frames',
    ],
    packaging:
      'Each drawer secured against opening, foam-wrapped, retail box, then 5-ply export master carton.',
    useCases: ['Desktop organization', 'Dressing tables', 'Hotel guest rooms', 'Apothecary retail', 'Art studio', 'Workshop tools'],
    related: ['wooden-desktop-organizer', 'wooden-desktop-storage', 'wooden-jewelry-storage-box'],
  },

  'wooden-desktop-organizer': {
    slug: 'wooden-desktop-organizer',
    name: 'Wooden Desktop Organizer',
    closure: 'Drawer',
    tagline: 'Compact pen + drawer combo organizer',
    intro:
      'A compact desktop organizer that combines a pen tray, phone stand, and small drawer in one footprint. Built from solid wood with a clear oil finish to highlight the natural grain.',
    images: [
      img('Wooden Desktop Organizer', 'Drawer Organizer  (1).png'),
      img('Wooden Desktop Organizer', 'Drawer Organizer  (2).png'),
      img('Wooden Desktop Organizer', 'Drawer Organizer  (3).png'),
      img('Wooden Desktop Organizer', 'Drawer Organizer  (4).png'),
    ],
    specs: {
      'Closure Type': 'Drawer + open compartments',
      'Material': 'Solid pine or oak',
      'Surface Finish': 'Natural oil',
      'Hardware': 'Recessed finger pull',
      'Interior Lining': 'Sanded wood',
      'Size': '250 × 130 × 100 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on top face',
    },
    customization: [
      'Pen / phone / drawer configurations',
      'Pine, oak, walnut, or bamboo',
      'Recessed pull or brass knob',
      'Optional cable pass-through',
      'Engraved company branding',
      'Color staining options',
    ],
    packaging:
      'OPP polybag, retail box, then 5-ply export master carton.',
    useCases: ['Office gift sets', 'Corporate gifting', 'Home office decor', 'Co-working spaces', 'Stationery retail', 'Promotional gifts'],
    related: ['wooden-3-drawer-desktop-organizer', 'wooden-desktop-storage', 'wooden-essential-oil-storage-box'],
  },

  'wooden-desktop-storage': {
    slug: 'wooden-desktop-storage',
    name: 'Three-Layer Wooden Desktop Storage',
    closure: 'Drawer',
    tagline: 'Three-tier desktop tray + drawer combination',
    intro:
      'A three-layer desktop storage unit with open trays on top and a pull-out drawer at the base — designed to keep papers, devices, and small accessories within reach without cluttering the desk.',
    images: [
      img('Wooden Desktop Storage', 'Three Layer Wooden  Organizer (1).jpg'),
      img('Wooden Desktop Storage', 'Three Layer Wooden  Organizer (2).jpg'),
      img('Wooden Desktop Storage', 'Three Layer Wooden  Organizer (3).jpg'),
      img('Wooden Desktop Storage', 'Three Layer Wooden  Organizer (4).jpg'),
      img('Wooden Desktop Storage', 'Three Layer Wooden  Organizer (5).jpg'),
    ],
    specs: {
      'Closure Type': 'Open trays + drawer',
      'Material': 'Solid pine or bamboo',
      'Surface Finish': 'Clear lacquer',
      'Hardware': 'Recessed drawer pull',
      'Interior Lining': 'Sanded wood',
      'Size': '300 × 200 × 220 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on drawer face',
    },
    customization: [
      '2 / 3 / 4 tier configurations',
      'Pine, bamboo, oak',
      'Open tray or covered tray combinations',
      'Cable management cutouts',
      'Optional A4-paper sized layer',
      'Stained or natural finishes',
    ],
    packaging:
      'Drawer secured, foam-wrapped, retail box, then 5-ply export master carton.',
    useCases: ['Home office', 'Co-working hubs', 'Hotel front desk', 'Stationery retail', 'Boutique offices', 'Paperwork management'],
    related: ['wooden-desktop-organizer', 'wooden-3-drawer-desktop-organizer', 'wooden-essential-oil-storage-box'],
  },

  'acacia-wood-memory-keepsake-box': {
    slug: 'acacia-wood-memory-keepsake-box',
    name: 'Acacia Wood Memory Keepsake Box',
    closure: 'Hinged',
    tagline: 'Heirloom keepsake chest in solid acacia',
    intro:
      'A solid acacia keepsake box with concealed brass hinges and a felt-lined interior — designed to safeguard letters, photos, baby mementos, and other family heirlooms for generations.',
    images: [
      img('Acacia Wood Memory Keepsake Box', 'acacia wooden box (1).png'),
      img('Acacia Wood Memory Keepsake Box', 'acacia wooden box (2).jpg'),
      img('Acacia Wood Memory Keepsake Box', 'acacia wooden box (3).jpg'),
      img('Acacia Wood Memory Keepsake Box', 'acacia wooden box (4).jpg'),
      img('Acacia Wood Memory Keepsake Box', 'acacia wooden box (5).jpg'),
    ],
    specs: {
      'Closure Type': 'Hinged lid',
      'Material': 'Solid acacia hardwood',
      'Surface Finish': 'Hand-rubbed oil + wax',
      'Hardware': 'Concealed brass hinges',
      'Interior Lining': 'Felt or microfiber pad',
      'Size': '300 × 200 × 130 mm (custom)',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving · brass plate',
    },
    customization: [
      'Wood: acacia, walnut, oak, mahogany',
      'Felt or microfiber interior in 8 colors',
      'Optional removable tray',
      'Personalized engraving (name + date)',
      'Lock & key option (brass)',
      'Custom size for photo-album fit',
    ],
    packaging:
      'Wrapped in tissue, gift-ready inner box, packed in 5-ply export master carton.',
    useCases: ['Wedding gifts', 'Baby memory keepsake', 'Heirloom storage', 'Anniversary gifts', 'Memorial keepsake', 'Photo album storage'],
    related: ['wooden-jewelry-storage-box', 'wooden-yarn-storage-box', 'wooden-essential-oil-storage-box'],
  },

  'wooden-jewelry-storage-box': {
    slug: 'wooden-jewelry-storage-box',
    name: 'Wooden Jewelry Storage Box',
    closure: 'Hinged',
    tagline: 'Compact wooden gift box for bracelets and jewelry',
    intro:
      'A compact wooden jewelry box with a magnetic flap, suede pad interior, and brand-ready surfaces. Sized for bracelets, watches, and other tabletop jewelry display or gift presentation.',
    images: [
      img('Wooden Jewelry Storage Box', 'Wooden Bracelet Gift Box (1).png'),
      img('Wooden Jewelry Storage Box', 'Wooden Bracelet Gift Box (2).png'),
      img('Wooden Jewelry Storage Box', 'Wooden Bracelet Gift Box (3).png'),
      img('Wooden Jewelry Storage Box', 'Wooden Bracelet Gift Box (4).png'),
      img('Wooden Jewelry Storage Box', 'gift box (1).png'),
      img('Wooden Jewelry Storage Box', 'gift box (2).png'),
      img('Wooden Jewelry Storage Box', 'gift box (3).png'),
      img('Wooden Jewelry Storage Box', 'gift box (4).png'),
    ],
    specs: {
      'Closure Type': 'Magnetic / hinged',
      'Material': 'Walnut · maple · MDF veneered',
      'Surface Finish': 'Matte lacquer',
      'Hardware': 'Concealed magnet · brass hinges',
      'Interior Lining': 'Suede or microfiber pad',
      'Size': '120 × 90 × 50 mm (custom)',
      'MOQ': '500 pcs',
      'Lead Time': '30 days',
      'Branding': 'Hot foil · laser · debossing',
    },
    customization: [
      'Wood: walnut, maple, MDF veneered',
      'Suede color: black / cream / blush / custom',
      'Slot configuration: bracelet / ring / watch',
      'Hot foil logo on lid',
      'Optional outer sleeve box',
      'Sized for small or display jewelry',
    ],
    packaging:
      'Each box wrapped in OPP polybag, packed in retail-ready inner carton, then 5-ply export master carton.',
    useCases: ['Jewelry retail', 'Wedding bands', 'Anniversary gifts', 'Bridal favors', 'Gift program packaging', 'E-commerce drop-ship'],
    related: ['acacia-wood-memory-keepsake-box', 'wooden-essential-oil-storage-box', 'wooden-3-drawer-desktop-organizer'],
  },

  'wooden-essential-oil-storage-box': {
    slug: 'wooden-essential-oil-storage-box',
    name: 'Wooden Essential Oil Storage Box',
    closure: 'Hinged',
    tagline: 'Slotted box for 25–50 essential oil bottles',
    intro:
      'A bamboo essential oil storage box with foam-cushioned slots that hold standard 5/10/15 ml dropper bottles upright. Hinged lid with brass clasp, available in 25 / 36 / 50 bottle capacities.',
    images: [
      img('Wooden Essential Oil Storage Box', 'essential oil box (1).png'),
      img('Wooden Essential Oil Storage Box', 'essential oil box (2).png'),
      img('Wooden Essential Oil Storage Box', 'essential oil box (3).png'),
      img('Wooden Essential Oil Storage Box', 'essential oil box (4).png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid w/ brass clasp',
      'Material': 'Bamboo or pine',
      'Surface Finish': 'Natural oil · stain',
      'Hardware': 'Brass hinges + hook clasp',
      'Interior Lining': 'Foam-cushioned bottle slots',
      'Size': 'Holds 25 / 36 / 50 bottles',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Capacity: 25 / 36 / 50 / 64 bottles',
      'Slot diameter for 5 / 10 / 15 ml bottles',
      'Bamboo, pine, walnut',
      'Foam or felt cushioning',
      'Engraved logo or oil-blend recipe',
      'Tiered or single-layer designs',
    ],
    packaging:
      'OPP polybag, retail box, then 5-ply export master carton.',
    useCases: ['Essential oil retail', 'Aromatherapy professionals', 'Spa storage', 'Massage therapy', 'Reseller gift packs', 'Subscription box programs'],
    related: ['wooden-jewelry-storage-box', 'wooden-yarn-storage-box', 'acacia-wood-memory-keepsake-box'],
  },

  'wooden-yarn-storage-box': {
    slug: 'wooden-yarn-storage-box',
    name: 'Wooden Yarn Storage Box',
    closure: 'Hinged',
    tagline: 'Knitter\'s yarn box with feed-through holes',
    intro:
      'A knitter and crocheter\'s yarn storage box with feed-through holes in the lid that let yarn dispense cleanly without tangling. Holds multiple skeins; ideal as a thoughtful gift for fiber-craft enthusiasts.',
    images: [
      img('Wooden Yarn Storage Box', 'yarn storage box (1).png'),
      img('Wooden Yarn Storage Box', 'yarn storage box (2).png'),
      img('Wooden Yarn Storage Box', 'yarn storage box (3).png'),
      img('Wooden Yarn Storage Box', 'yarn storage box (4).png'),
      img('Wooden Yarn Storage Box', 'yarn storage box (5).png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid w/ yarn feed holes',
      'Material': 'Bamboo or pine',
      'Surface Finish': 'Natural oil',
      'Hardware': 'Brass hinges',
      'Interior Lining': 'Sanded wood',
      'Size': '320 × 220 × 150 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Number of feed holes: 2 / 4 / 6',
      'Bamboo, pine, walnut',
      'Optional needle storage groove',
      'Engraved knit-quote on lid',
      'Magnetic or hook clasp',
      'Sized for skeins, balls, or bobbins',
    ],
    packaging:
      'OPP polybag, retail box, then 5-ply export master carton.',
    useCases: ['Knitting hobby retail', 'Crochet gifting', 'Maker subscription boxes', 'Fiber arts workshops', 'Craft store inventory', 'Holiday hobby gifts'],
    related: ['wooden-essential-oil-storage-box', 'acacia-wood-memory-keepsake-box', 'wooden-jewelry-storage-box'],
  },

  '3-tier-bamboo-spice-rack-organizer': {
    slug: '3-tier-bamboo-spice-rack-organizer',
    name: '3-Tier Bamboo Spice Rack Organizer',
    closure: 'Lift-off',
    tagline: 'Step-tier countertop spice rack',
    intro:
      'A 3-tier stepped bamboo spice rack designed to display 12–24 jars on a countertop with every label visible. Carbonized bamboo finish blends with any kitchen palette.',
    images: [
      img('3-Tier Bamboo Spice Rack Organizer', 'spice jar 1 (1).jpg'),
      img('3-Tier Bamboo Spice Rack Organizer', 'spice jar 1 (2).jpg'),
      img('3-Tier Bamboo Spice Rack Organizer', 'spice jar 1 (3).jpg'),
      img('3-Tier Bamboo Spice Rack Organizer', 'spice jar 1 (5).jpg'),
      img('3-Tier Bamboo Spice Rack Organizer', 'spice jar 1 (6).jpg'),
    ],
    specs: {
      'Closure Type': 'Open step-tier rack',
      'Material': 'Carbonized moso bamboo',
      'Surface Finish': 'Food-safe oil',
      'Hardware': 'Concealed brad fasteners',
      'Interior Lining': 'N/A (display)',
      'Size': '380 × 160 × 120 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '25 days',
      'Branding': 'Laser engraving on front step',
    },
    customization: [
      '2 / 3 / 4 tier rack heights',
      'Bamboo, pine, walnut',
      'Includes spice jar set option',
      'Custom logo engraving',
      'Wall-mount or countertop',
      'Standard or extra-wide footprint',
    ],
    packaging:
      'Flat-pack for shipping efficiency, OPP polybag, retail carton, 5-ply export master carton.',
    useCases: ['Modern kitchens', 'Spice merchant retail', 'Cooking gift sets', 'Wedding registry', 'Cooking class kits', 'Cafe back-of-house'],
    related: ['drawer-spice-organizer', 'wooden-desktop-storage', 'wooden-essential-oil-storage-box'],
  },

  'smiley-face-bamboo-tissue-box': {
    slug: 'smiley-face-bamboo-tissue-box',
    name: 'Smiley Face Bamboo Tissue Box',
    closure: 'Sliding',
    tagline: 'Cheerful bamboo tissue cover with cutout face',
    intro:
      'A cheerful bamboo tissue box cover with a smiley-face cutout on top. The sliding base loads quickly, and the bamboo construction lifts a humble tissue dispenser into something worth displaying.',
    images: [
      img('Smiley Face Bamboo Tissue Box', 'Tissue Box (1).png'),
      img('Smiley Face Bamboo Tissue Box', 'Tissue Box (2).png'),
      img('Smiley Face Bamboo Tissue Box', 'Tissue Box (3).png'),
      img('Smiley Face Bamboo Tissue Box', 'Tissue Box (4).png'),
      img('Smiley Face Bamboo Tissue Box', 'Tissue Box (5).png'),
      img('Smiley Face Bamboo Tissue Box', 'Tissue Box (6).png'),
    ],
    specs: {
      'Closure Type': 'Sliding base loader',
      'Material': 'Carbonized bamboo',
      'Surface Finish': 'Natural satin',
      'Hardware': 'None — wood-on-wood slide',
      'Interior Lining': 'Open tissue cavity',
      'Size': '260 × 130 × 95 mm (standard tissue box)',
      'MOQ': '500 pcs',
      'Lead Time': '25 days',
      'Branding': 'Laser-cut face / custom cutout',
    },
    customization: [
      'Cutout: smiley / star / heart / brand logo',
      'Bamboo, pine, oak',
      'Standard or facial-tissue size',
      'Sliding or lift-off base',
      'Fits cube or rectangle tissue boxes',
      'Optional matching trash can',
    ],
    packaging:
      'OPP polybag, retail color box, then 5-ply export master carton.',
    useCases: ['Home decor retail', 'Bedside accessory', 'Office gift', 'Hotel guest amenities', 'Boutique retail', 'Holiday gift sets'],
    related: ['wooden-sofa-armrest-tray', 'wooden-dress-up-storage-cart', 'wooden-essential-oil-storage-box'],
  },

  'vintage-pirate-wooden-treasure-chest-box': {
    slug: 'vintage-pirate-wooden-treasure-chest-box',
    name: 'Vintage Pirate Treasure Chest Box',
    closure: 'Hinged',
    tagline: 'Curved-lid treasure chest with antique brass hardware',
    intro:
      'A theatrical curved-lid treasure chest with antique brass strap hinges and clasp — equally at home as a kids\' toy chest, a costume prop, or a quirky decor piece in a bar or game room.',
    images: [
      img('Vintage Pirate Wooden Treasure Chest Box', 'Treasure Chest Box (1).png'),
      img('Vintage Pirate Wooden Treasure Chest Box', 'Treasure Chest Box (2).png'),
      img('Vintage Pirate Wooden Treasure Chest Box', 'Treasure Chest Box (3).png'),
      img('Vintage Pirate Wooden Treasure Chest Box', 'Treasure Chest Box (4).png'),
      img('Vintage Pirate Wooden Treasure Chest Box', 'Treasure Chest Box (5).png'),
    ],
    specs: {
      'Closure Type': 'Hinged curved lid w/ clasp',
      'Material': 'Solid pine + iron straps',
      'Surface Finish': 'Distressed stain · torched',
      'Hardware': 'Antique brass strap hinges + clasp',
      'Interior Lining': 'Open or felt-lined',
      'Size': '300 × 200 × 200 mm (multi-size sets)',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Wood-burned or engraved on lid',
    },
    customization: [
      'Single chest or 3-piece nested set',
      'Optional padlock with key',
      'Distressed, torched, or painted finish',
      'Custom engraving or pirate skull plate',
      'Felt-lined interior option',
      'Indoor decor or kid-safe edge profile',
    ],
    packaging:
      'Stacked / nested for shipping efficiency, foam-wrapped, packed in 5-ply export master carton.',
    useCases: ['Kids playroom decor', 'Costume props', 'Bar / pub decor', 'Game room storage', 'Themed retail merch', 'Holiday gift sets'],
    related: ['acacia-wood-memory-keepsake-box', 'wooden-dress-up-storage-cart', 'wooden-jewelry-storage-box'],
  },

  'wooden-dress-up-storage-cart': {
    slug: 'wooden-dress-up-storage-cart',
    name: 'Wooden Dress-Up Storage Cart',
    closure: 'Drawer',
    tagline: 'Rolling kids\' dress-up storage cart',
    intro:
      'A rolling wooden cart designed for kids\' dress-up clothes, costumes, and accessories — open hanging rod up top, drawers and bins below. Heavy-duty casters with brakes; tip-over safety bracket included.',
    images: [
      img('Wooden Dress-Up Storage Cart', '主图1（1）.png'),
      img('Wooden Dress-Up Storage Cart', '主图2（3）.png'),
      img('Wooden Dress-Up Storage Cart', '主图3（4）.png'),
      img('Wooden Dress-Up Storage Cart', '主图4（2）.png'),
      img('Wooden Dress-Up Storage Cart', '主图5（0）.png'),
    ],
    specs: {
      'Closure Type': 'Open hanging + drawers',
      'Material': 'Pine + birch ply',
      'Surface Finish': 'Painted (kid-safe lacquer)',
      'Hardware': 'Locking swivel casters · brass pulls',
      'Interior Lining': 'Open bins + lined drawer',
      'Size': '600 × 400 × 1100 mm',
      'MOQ': '100 pcs',
      'Lead Time': '40 days',
      'Branding': 'Stenciled · laser-engraved nameplate',
    },
    customization: [
      'Painted color (white / pastel / custom)',
      'Optional mirror panel',
      'Hanging rod height',
      'Drawer count: 2 / 3 / 4',
      'Tip-over safety bracket included',
      'Engraved kid name plate',
    ],
    packaging:
      'Flat-packed, foam corners, 5-ply export master carton with assembly instructions.',
    useCases: ['Kids bedrooms', 'Daycare centers', 'Boutique kids retail', 'Theatre costume storage', 'Studio props', 'Birthday gifts'],
    related: ['vintage-pirate-wooden-treasure-chest-box', 'wooden-sofa-armrest-tray', 'wooden-3-drawer-desktop-organizer'],
  },

  'wooden-sofa-armrest-tray': {
    slug: 'wooden-sofa-armrest-tray',
    name: 'Wooden Sofa Armrest Tray',
    closure: 'Lift-off',
    tagline: 'Bamboo armrest organizer with cup and remote slots',
    intro:
      'A bamboo sofa armrest tray with cutouts for cup, remote, and phone — turning the arm of any sofa into a tidy, no-spill side table. Folds flat for storage when not in use.',
    images: [
      img('Wooden Sofa Armrest Tray', '主图1.jpg'),
      img('Wooden Sofa Armrest Tray', '主图2.jpg'),
      img('Wooden Sofa Armrest Tray', '主图3.jpg'),
      img('Wooden Sofa Armrest Tray', '主图4.jpg'),
      img('Wooden Sofa Armrest Tray', '主图5.jpg'),
    ],
    specs: {
      'Closure Type': 'Open tray w/ saddle base',
      'Material': 'Bamboo',
      'Surface Finish': 'Natural oil',
      'Hardware': 'Folding hinge connectors',
      'Interior Lining': 'Cutout cup + remote + phone slots',
      'Size': '500 × 250 × 35 mm (folded flat)',
      'MOQ': '500 pcs',
      'Lead Time': '25 days',
      'Branding': 'Laser engraving on top',
    },
    customization: [
      'Cup / remote / phone slot layouts',
      'Bamboo or walnut',
      'Standard or extra-wide armrest fit',
      'Engraved branding on top',
      'Foldable or fixed design',
      'Optional non-slip base',
    ],
    packaging:
      'OPP polybag, retail color box, then 5-ply export master carton.',
    useCases: ['Living room accessory', 'Home theater', 'Couch potato gifts', 'Hotel suite amenity', 'Tech accessory retail', 'Father\'s Day gifts'],
    related: ['smiley-face-bamboo-tissue-box', 'wooden-essential-oil-storage-box', 'wooden-desktop-organizer'],
  },
};

export const PRODUCT_SLUGS = Object.keys(PRODUCTS);
export const CLOSURES = Array.from(new Set(Object.values(PRODUCTS).map((p) => p.closure)));
