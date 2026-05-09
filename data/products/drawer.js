// ─────────────────────────────────────────────────────────────────────────
// Drawer Wooden Boxes — 8 products
// Image paths reference /public/drawer-wooden-box/<folder>/
// ─────────────────────────────────────────────────────────────────────────

const PARENT = 'Drawer wooden box';
const img = (folder, name) =>
  '/' + [PARENT, folder, name].map(encodeURIComponent).join('/');

export const PRODUCTS = {
  'bamboo-tea-cup-drawer-tray': {
    slug: 'bamboo-tea-cup-drawer-tray',
    name: 'Bamboo Tea Cup Drawer Tray',
    closure: 'Drawer',
    tagline: 'Compartmented tea-tray with hidden drawer below',
    intro:
      'A bamboo tea ceremony tray with multiple cup compartments above and a hidden pull-out drawer below for accessories — tea pet, tongs, gaiwan, or napkins. Designed for Gongfu and Eastern tea-service rituals.',
    images: [
      img('set-1', 'ScreenShot_2026-05-05_145412_489.png'),
      img('set-1', 'ScreenShot_2026-05-05_145425_460.png'),
      img('set-1', 'ScreenShot_2026-05-05_145432_695.png'),
      img('set-1', 'ScreenShot_2026-05-05_145441_264.png'),
    ],
    specs: {
      'Closure Type': 'Open tray + pull-out drawer',
      'Material': 'Carbonized bamboo',
      'Surface Finish': 'Food-safe oil',
      'Hardware': 'Wood drawer slides',
      'Interior Lining': '8 cup compartments + open drawer',
      'Size': '300 × 220 × 100 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on drawer face',
    },
    customization: [
      'Compartment count: 4 / 6 / 8 / 12',
      'Bamboo, walnut, mahogany',
      'Drawer pull: brass / leather / recessed',
      'Engraved tea quote on drawer',
      'Optional starter Gongfu set',
      'Carved-out tea pet ledge',
    ],
    packaging:
      'Drawer secured against shipping shifts, foam-wrapped, retail box, 5-ply export master carton.',
    useCases: ['Tea ceremony', 'Tea retailer gifts', 'Gongfu enthusiasts', 'Cafe display', 'Premium tea gifting', 'Hospitality tea service'],
    related: ['pine-3-tier-drawer-mini-cabinet', 'walnut-tea-caddy-with-drawer', 'bamboo-3-drawer-desk-organizer'],
  },

  'pine-3-tier-drawer-mini-cabinet': {
    slug: 'pine-3-tier-drawer-mini-cabinet',
    name: 'Pine 3-Tier Drawer Mini Cabinet',
    closure: 'Drawer',
    tagline: 'Compact 3-drawer pine cabinet with antique brass pulls',
    intro:
      'A compact 3-drawer pine cabinet with antique brass cup pulls — sized for desktops, vanities, or bedside use. The pale pine grain stays bright; brass hardware adds the heirloom touch.',
    images: [
      img('set-2', 'ScreenShot_2026-05-05_145535_144.png'),
      img('set-2', 'ScreenShot_2026-05-05_145541_453.png'),
      img('set-2', 'ScreenShot_2026-05-05_145547_745.png'),
      img('set-2', 'ScreenShot_2026-05-05_145554_485.png'),
    ],
    specs: {
      'Closure Type': '3 pull-out drawers',
      'Material': 'Solid pine',
      'Surface Finish': 'Natural oil',
      'Hardware': 'Antique brass cup pulls',
      'Interior Lining': 'Sanded wood',
      'Size': '200 × 160 × 280 mm',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on top',
    },
    customization: [
      'Drawer count: 2 / 3 / 4 / 5',
      'Pine, oak, walnut, paulownia',
      'Pull style: cup, knob, recessed, leather',
      'Optional drawer dividers',
      'Stained or natural finish',
      'Engraved logo or label frame',
    ],
    packaging:
      'Drawers taped shut, foam-wrapped, retail box, 5-ply export master carton.',
    useCases: ['Desktop organization', 'Vanity storage', 'Bedside accessory', 'Apothecary retail', 'Wedding gifts', 'Boutique retail'],
    related: ['bamboo-3-drawer-desk-organizer', 'oak-single-drawer-box', 'walnut-tea-caddy-with-drawer'],
  },

  'torched-pine-bread-display-box': {
    slug: 'torched-pine-bread-display-box',
    name: 'Torched Pine Bread Display Box',
    closure: 'Drawer',
    tagline: 'Glass-front display box with pull-out drawer',
    intro:
      'A torched-pine display box with clear glass on three sides and a sliding/pull-out drawer base — ideal for bakery counter display of bread, pastries, or specialty retail merchandise where visibility matters.',
    images: [
      img('set-3', 'ScreenShot_2026-05-05_145631_737.png'),
      img('set-3', 'ScreenShot_2026-05-05_145639_233.png'),
      img('set-3', 'ScreenShot_2026-05-05_145647_002.png'),
      img('set-3', 'ScreenShot_2026-05-05_145654_454.png'),
      img('set-3', 'ScreenShot_2026-05-05_145702_724.png'),
    ],
    specs: {
      'Closure Type': 'Sliding drawer + glass display',
      'Material': 'Torched pine + tempered glass',
      'Surface Finish': 'Torched + waxed',
      'Hardware': 'Wood runners + concealed glass clips',
      'Interior Lining': 'Sealed lacquer (food-safe)',
      'Size': '380 × 220 × 180 mm (custom)',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on frame',
    },
    customization: [
      'Glass: clear / acrylic / smoked',
      'Pine, oak, walnut',
      'Torched, oiled, or stained finish',
      'Drawer or open-base configuration',
      'Optional cutting board base',
      'Sized for retail counter display',
    ],
    packaging:
      'Glass corners protected, foam-wrapped, retail box, 5-ply export master carton.',
    useCases: ['Bakery display', 'Cafe counter', 'Retail merchandising', 'Specialty food retail', 'Hotel breakfast bar', 'Farmer\'s market display'],
    related: ['pine-3-tier-drawer-mini-cabinet', 'bamboo-hat-storage-box-with-drawer', 'walnut-cologne-display-stand'],
  },

  'walnut-tea-caddy-with-drawer': {
    slug: 'walnut-tea-caddy-with-drawer',
    name: 'Walnut Picnic Caddy with Drawer',
    closure: 'Drawer',
    tagline: 'Walnut tea/picnic caddy with arched handle and drawer',
    intro:
      'A walnut caddy with an arched carry handle, a tray top for tea sets or refreshments, and a pull-out drawer at the base for napkins, utensils, or coasters. The kind of piece that earns its place on the dining table.',
    images: [
      img('set-4', 'ScreenShot_2026-05-05_145727_860.png'),
      img('set-4', 'ScreenShot_2026-05-05_145734_421.png'),
      img('set-4', 'ScreenShot_2026-05-05_145741_079.png'),
      img('set-4', 'ScreenShot_2026-05-05_145748_019.png'),
    ],
    specs: {
      'Closure Type': 'Open tray + pull-out drawer',
      'Material': 'Solid walnut',
      'Surface Finish': 'Hand-rubbed oil',
      'Hardware': 'Arched wood handle + brass cup pull',
      'Interior Lining': 'Sanded wood',
      'Size': '300 × 220 × 280 mm (custom)',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on drawer face',
    },
    customization: [
      'Wood: walnut, oak, acacia, mahogany',
      'Tray dividers for cup or food layout',
      'Drawer pull: brass cup / leather / recessed',
      'Engraved logo or family name',
      'Optional matching tea set',
      'Sized for picnic, tea, or coffee service',
    ],
    packaging:
      'Drawer secured, foam-wrapped, retail box, 5-ply export master carton.',
    useCases: ['Premium home gifting', 'Tea ceremony', 'Picnic accessory', 'Restaurant tabletop service', 'Wedding gifts', 'Hotel suite amenity'],
    related: ['bamboo-tea-cup-drawer-tray', 'oak-single-drawer-box', 'pine-3-tier-drawer-mini-cabinet'],
  },

  'walnut-cologne-display-stand': {
    slug: 'walnut-cologne-display-stand',
    name: 'Walnut Cologne / Cosmetic Display Stand',
    closure: 'Drawer',
    tagline: 'Step-tier cologne display with hidden drawer',
    intro:
      'A step-tier walnut display stand designed for cologne and cosmetic bottles — angled tiers present every label face-up, while a hidden drawer at the base keeps refills, samples, or accessories tidy.',
    images: [
      img('set-5', 'ScreenShot_2026-05-05_145806_838.png'),
      img('set-5', 'ScreenShot_2026-05-05_145813_880.png'),
      img('set-5', 'ScreenShot_2026-05-05_145821_870.png'),
    ],
    specs: {
      'Closure Type': 'Open step display + drawer',
      'Material': 'Walnut + black-stained accent',
      'Surface Finish': 'Hand-rubbed oil',
      'Hardware': 'Wood drawer slides',
      'Interior Lining': 'Felt-lined drawer',
      'Size': '280 × 180 × 220 mm (custom)',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on drawer face',
    },
    customization: [
      'Step tier count: 2 / 3 / 4',
      'Wood: walnut, oak, mahogany',
      'Single or double drawer',
      'Felt or leather drawer lining',
      'Custom slot sizes for bottle type',
      'Engraved logo or family name',
    ],
    packaging:
      'Drawer secured, foam-wrapped, retail box, 5-ply export master carton.',
    useCases: ['Men\'s grooming retail', 'Cologne / fragrance display', 'Master bedroom decor', 'Boutique counter display', 'Premium gifting', 'Father\'s Day'],
    related: ['walnut-tea-caddy-with-drawer', 'oak-single-drawer-box', 'walnut-cologne-display-stand'],
  },

  'oak-single-drawer-box': {
    slug: 'oak-single-drawer-box',
    name: 'Oak Single-Drawer Box',
    closure: 'Drawer',
    tagline: 'Minimalist oak box with single recessed-pull drawer',
    intro:
      'A minimalist oak box with a single drawer and recessed finger-pull — clean lines, no visible hardware, and the warm pale grain of European oak. The understated drawer box for desktops and bedside tables.',
    images: [
      img('set-6', 'ScreenShot_2026-05-05_145901_396.png'),
      img('set-6', 'ScreenShot_2026-05-05_145907_437.png'),
      img('set-6', 'ScreenShot_2026-05-05_145913_527.png'),
    ],
    specs: {
      'Closure Type': 'Single pull-out drawer',
      'Material': 'European oak',
      'Surface Finish': 'Natural oil',
      'Hardware': 'Recessed finger pull (no hardware)',
      'Interior Lining': 'Sanded wood (felt optional)',
      'Size': '220 × 160 × 90 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on top',
    },
    customization: [
      'Wood: oak, walnut, ash, maple',
      'Recessed pull, brass knob, or leather tab',
      'Felt-lined drawer interior',
      'Multiple sizes (S / M / L)',
      'Engraved logo on top face',
      'Stackable design',
    ],
    packaging:
      'Drawer secured, OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Desktop accessory', 'Bedside table', 'Office gift', 'Premium retail', 'Apartment living', 'Hotel suite amenity'],
    related: ['walnut-tea-caddy-with-drawer', 'pine-3-tier-drawer-mini-cabinet', 'bamboo-3-drawer-desk-organizer'],
  },

  'bamboo-hat-storage-box-with-drawer': {
    slug: 'bamboo-hat-storage-box-with-drawer',
    name: 'Bamboo Hat Storage Box with Drawer',
    closure: 'Drawer',
    tagline: 'Hat storage drawer with clear-acrylic display top',
    intro:
      'A pull-out hat storage drawer with a clear acrylic display top — keeps caps and hats dust-free while showing them off. Stacks under closet shelves or sits on a dresser.',
    images: [
      img('set-7', 'ScreenShot_2026-05-05_145936_289.png'),
      img('set-7', 'ScreenShot_2026-05-05_145943_793.png'),
      img('set-7', 'ScreenShot_2026-05-05_145950_092.png'),
      img('set-7', 'ScreenShot_2026-05-05_145958_176.png'),
      img('set-7', 'ScreenShot_2026-05-05_150005_875.png'),
    ],
    specs: {
      'Closure Type': 'Pull-out drawer + acrylic display top',
      'Material': 'Bamboo + clear acrylic',
      'Surface Finish': 'Natural satin',
      'Hardware': 'Wood runners + recessed pull',
      'Interior Lining': 'Open hat cavity',
      'Size': '380 × 320 × 180 mm (single-hat capacity)',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on front',
    },
    customization: [
      'Capacity: single, double, or 4-hat configurations',
      'Acrylic or wood top',
      'Bamboo, pine, oak',
      'Stackable for closet use',
      'Engraved logo on front',
      'Optional cap-shape insert',
    ],
    packaging:
      'Acrylic protected with foam, retail box, 5-ply export master carton.',
    useCases: ['Cap collector storage', 'Streetwear retail display', 'Closet organization', 'Boutique shop display', 'Dressing room', 'Premium wardrobe'],
    related: ['torched-pine-bread-display-box', 'walnut-cologne-display-stand', 'oak-single-drawer-box'],
  },

  'bamboo-3-drawer-desk-organizer': {
    slug: 'bamboo-3-drawer-desk-organizer',
    name: 'Bamboo 3-Drawer Desk Organizer',
    closure: 'Drawer',
    tagline: '3-drawer bamboo organizer with open top tray',
    intro:
      'A bamboo 3-drawer desk organizer with an open tray on top for current-use items, and three pull-out drawers below for tucking away supplies. Built to fit between monitor and desk edge in modern workspace footprints.',
    images: [
      img('set-8', 'ScreenShot_2026-05-05_150030_419.png'),
      img('set-8', 'ScreenShot_2026-05-05_150038_031.png'),
      img('set-8', 'ScreenShot_2026-05-05_150044_093.png'),
      img('set-8', 'ScreenShot_2026-05-05_150051_138.png'),
      img('set-8', 'ScreenShot_2026-05-05_150059_171.png'),
    ],
    specs: {
      'Closure Type': '3 pull-out drawers + open tray',
      'Material': 'Carbonized bamboo',
      'Surface Finish': 'Natural satin',
      'Hardware': 'Wood runners + recessed pulls',
      'Interior Lining': 'Sanded wood',
      'Size': '330 × 160 × 130 mm',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on front',
    },
    customization: [
      'Drawer count: 2 / 3 / 4',
      'Bamboo, pine, walnut',
      'Optional cable pass-through',
      'Engraved company logo',
      'Stackable / modular variants',
      'Standard or extra-wide footprint',
    ],
    packaging:
      'Drawers secured, OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Home office', 'Co-working spaces', 'Corporate gifting', 'Stationery retail', 'Modern desk decor', 'Promotional gifts'],
    related: ['oak-single-drawer-box', 'pine-3-tier-drawer-mini-cabinet', 'bamboo-tea-cup-drawer-tray'],
  },

};

export const PRODUCT_SLUGS = Object.keys(PRODUCTS);
export const CLOSURES = Array.from(new Set(Object.values(PRODUCTS).map((p) => p.closure)));
