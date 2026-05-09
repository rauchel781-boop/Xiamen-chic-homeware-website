// ─────────────────────────────────────────────────────────────────────────
// Paulownia Wooden Boxes — 12 products
// Image paths reference /public/paulwnia-wood-box/<folder>/  (parent folder spelling)
// ─────────────────────────────────────────────────────────────────────────

const PARENT = 'paulwnia wood box';
const img = (folder, name) =>
  '/' + [PARENT, folder, name].map(encodeURIComponent).join('/');

export const PRODUCTS = {
  'paulownia-three-tone-keepsake-set': {
    slug: 'paulownia-three-tone-keepsake-set',
    name: 'Paulownia Three-Tone Keepsake Set',
    closure: 'Hinged',
    tagline: 'Natural, walnut, and ebony tone hinged keepsakes',
    intro:
      'A series of paulownia hinged keepsake boxes in three classic tones — pale natural, mid walnut, and deep ebony. Brass hasp clasp, smooth dovetail corners. Sized for jewelry, mementos, watches, or letters; the size scale lets retailers offer a coordinated three-piece set.',
    images: [
      img('set-1', 'ScreenShot_2026-05-06_182900_309.png'),
      img('set-1', 'ScreenShot_2026-05-06_182913_036.png'),
      img('set-1', 'ScreenShot_2026-05-06_182919_987.png'),
      img('set-1', 'ScreenShot_2026-05-06_182927_497.png'),
      img('set-1', 'ScreenShot_2026-05-06_182944_388.png'),
      img('set-1', 'ScreenShot_2026-05-06_182954_829.png'),
    ],
    specs: {
      'Closure Type': 'Hinged lid w/ hasp clasp',
      'Material': 'Solid paulownia',
      'Surface Finish': 'Stained — natural / walnut / ebony',
      'Hardware': 'Antique brass hasp clasp',
      'Interior': 'Sanded wood',
      'Size': '230 × 160 × 80 mm (custom)',
      'MOQ': '500 pcs',
      'Lead Time': '25 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Stain tone: natural, walnut, ebony, custom',
      'Sizes: S / M / L / XL or custom',
      'Engraved monogram or full lid art',
      'Brass / chrome / matte black hasp',
      'Optional felt-lined interior',
      'Bulk-pack volume pricing',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Wedding favors', 'Memory / keepsake retail', 'Premium gift packaging', 'Subscription box', 'Bridal party gift', 'Heirloom storage'],
    related: ['paulownia-sliding-lid-box', 'paulownia-mini-drawer-chest', 'paulownia-mail-organizer'],
  },

  'paulownia-sliding-lid-box': {
    slug: 'paulownia-sliding-lid-box',
    name: 'Paulownia Sliding Lid Box',
    closure: 'Sliding Lid',
    tagline: 'Lightweight paulownia gift box with sliding lid',
    intro:
      'A small paulownia sliding-lid box — perfect for gift sets, craft kits, jewelry presentation, or pen sets. The lightest commercial timber in the world, dimensionally stable, and a clean blank canvas for any branding treatment.',
    images: [
      img('2', 'ScreenShot_2026-05-06_183037_594.png'),
      img('2', 'ScreenShot_2026-05-06_183055_242.png'),
      img('2', 'ScreenShot_2026-05-06_183105_394.png'),
      img('2', 'ScreenShot_2026-05-06_183135_521.png'),
    ],
    specs: {
      'Closure Type': 'Sliding lid (CNC groove)',
      'Material': 'Solid paulownia',
      'Surface Finish': 'Natural sanded',
      'Interior': 'Sanded wood',
      'Lid': 'Flush flat panel',
      'Size': '180 × 100 × 30 mm (custom)',
      'MOQ': '500 pcs',
      'Lead Time': '20 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Multiple sizes (S / M / L / XL)',
      'Stain or paint to any color',
      'Foam or fabric insert',
      'Engraved monogram or full lid art',
      'Optional finger pull or ribbon hole',
      'Bulk-pack pricing for craft retail',
    ],
    packaging:
      'Stacked in groups of 12, OPP polybag, then 5-ply export master carton.',
    useCases: ['Gift packaging', 'Craft kit retail', 'Wedding favors', 'Wine / spirit packaging', 'Pen and tool sets', 'Bulk reseller'],
    related: ['paulownia-three-tone-keepsake-set', 'paulownia-flat-sliding-lid', 'paulownia-three-section-organizer'],
  },

  'paulownia-mini-drawer-chest': {
    slug: 'paulownia-mini-drawer-chest',
    name: 'Paulownia Mini Apothecary Drawer Chest',
    closure: 'Drawer',
    tagline: 'Vintage stained paulownia chest with six drawers',
    intro:
      'A vintage-stained paulownia drawer chest — six small drawers organized in three tiers, perfect for craft supplies, makeup, jewelry, herbs, or odds and ends on a desk or vanity. Tiny brass-look knobs give it a true apothecary feel.',
    images: [
      img('3', 'ScreenShot_2026-05-06_183321_785.png'),
      img('3', 'ScreenShot_2026-05-06_183329_952.png'),
      img('3', 'ScreenShot_2026-05-06_183337_192.png'),
      img('3', 'ScreenShot_2026-05-06_183346_983.png'),
      img('3', 'ScreenShot_2026-05-06_183401_533.png'),
      img('3', 'ScreenShot_2026-05-06_183409_293.png'),
      img('3', 'ScreenShot_2026-05-06_183416_785.png'),
    ],
    specs: {
      'Closure Type': 'Pull-out drawers',
      'Material': 'Solid paulownia',
      'Surface Finish': 'Vintage walnut stain',
      'Drawers': '6 (3-tier configuration)',
      'Hardware': 'Antique-look knobs',
      'Size': '300 × 200 × 280 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraved top',
    },
    customization: [
      'Stain: walnut, ebony, natural',
      'Drawer count: 3 / 4 / 6 / 9 / 12',
      'Custom drawer dimensions',
      'Knob style: brass, ceramic, leather',
      'Engraved drawer-front labels',
      'Optional locking top drawer',
    ],
    packaging:
      'Foam-wrapped, retail box, 5-ply export master carton.',
    useCases: ['Vanity & makeup', 'Craft & hobby storage', 'Apothecary / herbs', 'Jewelry organization', 'Office desk', 'Home decor retail'],
    related: ['paulownia-three-tone-keepsake-set', 'paulownia-stackable-storage-bins', 'paulownia-mail-organizer'],
  },

  'paulownia-storage-crate': {
    slug: 'paulownia-storage-crate',
    name: 'Paulownia Vintage Storage Crate',
    closure: 'Open-Top',
    tagline: 'Distressed paulownia crate with side handles',
    intro:
      'A vintage-stain paulownia open-top storage crate with hand-cutout grips on each end. Lightweight (paulownia is the lightest commercial timber) so it carries easily even when full of books, files, vinyl records, or pantry stock.',
    images: [
      img('4', 'ScreenShot_2026-05-06_183434_151.png'),
      img('4', 'ScreenShot_2026-05-06_183441_384.png'),
      img('4', 'ScreenShot_2026-05-06_183448_250.png'),
      img('4', 'ScreenShot_2026-05-06_183455_670.png'),
    ],
    specs: {
      'Closure Type': 'Open-top crate',
      'Material': 'Solid paulownia',
      'Surface Finish': 'Vintage walnut stain',
      'Handles': 'Side cutouts',
      'Construction': 'Solid panel walls',
      'Size': '400 × 250 × 200 mm (custom)',
      'MOQ': '200 pcs',
      'Lead Time': '25 days',
      'Branding': 'Wood-burned or laser logo',
    },
    customization: [
      'Stain: vintage walnut, ebony, natural',
      'Multiple sizes (S / M / L)',
      'Wood-burned brand mark',
      'Optional rope or leather handles',
      'Stackable nesting layouts',
      'Bulk-pack pricing',
    ],
    packaging:
      'Stacked in nesting pairs, foam-wrapped, 5-ply export master carton.',
    useCases: ['Bookshelf storage', 'Vinyl record storage', 'Closet / pantry organization', 'Magazine / mail crate', 'Home decor retail', 'Event styling'],
    related: ['paulownia-stackable-storage-bins', 'paulownia-mail-organizer', 'paulownia-three-section-organizer'],
  },

  'paulownia-three-section-organizer': {
    slug: 'paulownia-three-section-organizer',
    name: 'Paulownia Three-Section Organizer',
    closure: 'Open-Top',
    tagline: 'Small + large compartment paulownia tray',
    intro:
      'A walnut-stained paulownia tray with three open sections — two small front cells and one large rear cell. Sized for a vanity, kitchen counter, or office desk. The vintage stain hides everyday wear and lends antique character.',
    images: [
      img('set-2', 'ScreenShot_2026-05-06_183539_329.png'),
      img('set-2', 'ScreenShot_2026-05-06_183546_822.png'),
      img('set-2', 'ScreenShot_2026-05-06_183554_331.png'),
    ],
    specs: {
      'Closure Type': 'Open-top tray',
      'Material': 'Solid paulownia',
      'Surface Finish': 'Walnut stain + wax',
      'Sections': '3 (1 large + 2 small)',
      'Hardware': 'Antique brass corner caps',
      'Size': '270 × 240 × 70 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '25 days',
      'Branding': 'Laser engraving',
    },
    customization: [
      'Stain: walnut, ebony, natural',
      'Custom section configuration',
      'Optional corner brackets',
      'Engraved logo on bottom',
      'Felt-lined wells option',
      'Bulk-pack pricing',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Vanity tray', 'Office desk organizer', 'Entryway catch-all', 'Bedroom dresser', 'Hotel room amenity', 'Home decor retail'],
    related: ['paulownia-storage-crate', 'paulownia-mail-organizer', 'paulownia-stackable-storage-bins'],
  },

  'paulownia-cutlery-caddy-engraved': {
    slug: 'paulownia-cutlery-caddy-engraved',
    name: 'Paulownia "Happiness is Homemade" Caddy',
    closure: 'Open-Top',
    tagline: 'Branded paulownia caddy with farmhouse engraving',
    intro:
      'A short-form paulownia cutlery caddy with engraved farmhouse-style branding ("Happiness is Homemade with Love & Butter"). Two compartments, low profile — great for kitchen counter or buffet table styling. Custom engravings welcome for retailers.',
    images: [
      img('set-3', 'ScreenShot_2026-05-06_183611_141.png'),
      img('set-3', 'ScreenShot_2026-05-06_183619_205.png'),
      img('set-3', 'ScreenShot_2026-05-06_183626_233.png'),
      img('set-3', 'ScreenShot_2026-05-06_183633_557.png'),
    ],
    specs: {
      'Closure Type': 'Open-top dual compartment',
      'Material': 'Solid paulownia',
      'Surface Finish': 'Light pine stain',
      'Sections': '2',
      'Branding': 'Engraved on long side',
      'Size': '280 × 130 × 90 mm (custom)',
      'MOQ': '500 pcs',
      'Lead Time': '25 days',
      'Branding Add-On': 'Custom engravings welcome',
    },
    customization: [
      'Custom engraved phrase / quote',
      'Stain: light pine, walnut, natural',
      'Section count: 1 / 2 / 3',
      'Optional center handle',
      'Custom proportions',
      'Bulk-pack pricing for retail brands',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Farmhouse kitchen', 'Cafe condiment station', 'Hospitality FOH', 'Wedding decor', 'Catering event', 'Retail home decor'],
    related: ['paulownia-cutlery-caddy-handled', 'paulownia-three-section-organizer', 'paulownia-mail-organizer'],
  },

  'paulownia-flat-sliding-lid': {
    slug: 'paulownia-flat-sliding-lid',
    name: 'Paulownia Flat-Top Sliding Lid Box',
    closure: 'Sliding Lid',
    tagline: 'Wide, low-profile sliding lid box',
    intro:
      'A wide, low-profile paulownia sliding-lid box — sized for a stack of documents, photos, art prints, or craft kits. Soft pale paulownia takes any finish; the flush flat lid is the largest possible canvas for engraved branding.',
    images: [
      img('set-4', 'ScreenShot_2026-05-06_183708_776.png'),
      img('set-4', 'ScreenShot_2026-05-06_183716_319.png'),
      img('set-4', 'ScreenShot_2026-05-06_183725_091.png'),
      img('set-4', 'ScreenShot_2026-05-06_183733_943.png'),
    ],
    specs: {
      'Closure Type': 'Sliding lid (CNC groove)',
      'Material': 'Solid paulownia',
      'Surface Finish': 'Natural sanded',
      'Interior': 'Sanded wood',
      'Lid': 'Flush flat panel',
      'Size': '300 × 200 × 60 mm (custom)',
      'MOQ': '500 pcs',
      'Lead Time': '20 days',
      'Branding': 'Laser engraving on lid',
    },
    customization: [
      'Multiple sizes (S / M / L / XL)',
      'Stain or paint',
      'Foam or fabric insert',
      'Engraved monogram or full lid art',
      'Optional finger pull or ribbon hole',
      'Bulk-pack pricing',
    ],
    packaging:
      'Stacked in groups of 6, OPP polybag, 5-ply export master carton.',
    useCases: ['Document / photo storage', 'Art print packaging', 'Craft kit retail', 'Wine box outer', 'Subscription box', 'Bulk reseller'],
    related: ['paulownia-sliding-lid-box', 'paulownia-three-tone-keepsake-set', 'paulownia-three-section-organizer'],
  },

  'paulownia-party-plate-caddy': {
    slug: 'paulownia-party-plate-caddy',
    name: 'Paulownia Party Plate & Cutlery Caddy',
    closure: 'Open-Top',
    tagline: 'Multi-compartment caddy for paper plates and disposable utensils',
    intro:
      'A multi-compartment paulownia caddy designed to hold paper plates, napkins, cups, and disposable cutlery — buffet, BBQ, and event-ready. The chevron-pattern front face dresses it up for weddings, baby showers, and rustic-chic table settings.',
    images: [
      img('set-5', 'ScreenShot_2026-05-06_183821_990.png'),
      img('set-5', 'ScreenShot_2026-05-06_183828_992.png'),
      img('set-5', 'ScreenShot_2026-05-06_183835_920.png'),
      img('set-5', 'ScreenShot_2026-05-06_183843_887.png'),
    ],
    specs: {
      'Closure Type': 'Open-top sectioned',
      'Material': 'Solid paulownia',
      'Surface Finish': 'Vintage walnut stain',
      'Compartments': 'Plate slot + cutlery slots',
      'Front Detail': 'Chevron pattern',
      'Size': '380 × 290 × 200 mm (custom)',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving on front',
    },
    customization: [
      'Stain: vintage walnut, natural, painted',
      'Custom plate slot size (paper / 9" / 10")',
      'Custom front pattern or branding',
      'Engraved couple\'s names / event name',
      'Bulk-pack pricing',
      'Custom proportions',
    ],
    packaging:
      'Foam-wrapped, retail box, 5-ply export master carton.',
    useCases: ['Wedding & baby shower', 'Buffet / BBQ', 'Event catering', 'Hospitality FOH', 'Party rental', 'Restaurant tabletop'],
    related: ['paulownia-cutlery-caddy-engraved', 'paulownia-cutlery-caddy-handled', 'paulownia-mail-organizer'],
  },

  'paulownia-stackable-storage-bins': {
    slug: 'paulownia-stackable-storage-bins',
    name: 'Paulownia Stackable Storage Bins',
    closure: 'Open-Top',
    tagline: 'Angled stackable bins for desktop or pantry storage',
    intro:
      'Stackable paulownia storage bins with an open angled front — what magazine racks gave to mid-century, this gives to modern desks and pantries. Stack two, three, or four high; carbonized stain finish gives them a warm walnut tone.',
    images: [
      img('set-6', 'ScreenShot_2026-05-06_183926_958.png'),
      img('set-6', 'ScreenShot_2026-05-06_183933_334.png'),
      img('set-6', 'ScreenShot_2026-05-06_183940_410.png'),
      img('set-6', 'ScreenShot_2026-05-06_183947_842.png'),
    ],
    specs: {
      'Closure Type': 'Open-top stackable bin',
      'Material': 'Solid paulownia',
      'Surface Finish': 'Carbonized walnut stain',
      'Stacking': 'Up to 4 high',
      'Front': 'Angled access opening',
      'Size': '230 × 160 × 110 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '25 days',
      'Branding': 'Laser engraving on front',
    },
    customization: [
      'Stain: carbonized walnut, natural, ebony',
      'Sized for desk / pantry / craft storage',
      'Custom front opening shape',
      'Engraved labels',
      'Bulk-pack pricing',
      'Optional inner dividers',
    ],
    packaging:
      'Stacked in nesting pairs, OPP polybag, 5-ply export master carton.',
    useCases: ['Office desk', 'Craft supply storage', 'Pantry organization', 'Workshop sorting', 'Retail merchandising', 'Home organizing'],
    related: ['paulownia-storage-crate', 'paulownia-three-section-organizer', 'paulownia-mini-drawer-chest'],
  },

  'paulownia-mail-organizer': {
    slug: 'paulownia-mail-organizer',
    name: 'Paulownia Mail Organizer',
    closure: 'Open-Top',
    tagline: 'Vintage paulownia mail sorter with brass label frame',
    intro:
      'A vintage-stained paulownia mail organizer with three compartments and a brass label frame on the front. The classic farmhouse-style mail sorter — perfect for entryways, home offices, and B&B reception desks.',
    images: [
      img('set-7', 'ScreenShot_2026-05-06_184027_182.png'),
      img('set-7', 'ScreenShot_2026-05-06_184034_378.png'),
      img('set-7', 'ScreenShot_2026-05-06_184041_947.png'),
    ],
    specs: {
      'Closure Type': 'Open-top compartments',
      'Material': 'Solid paulownia',
      'Surface Finish': 'Vintage gray stain',
      'Compartments': '3 (custom 2 / 4)',
      'Hardware': 'Brass label frame + corner caps',
      'Size': '300 × 130 × 200 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '25 days',
      'Branding': 'Engraved word art',
    },
    customization: [
      'Stain: vintage gray, walnut, natural',
      'Custom compartment count',
      'Engraved word art / family name',
      'Brass / chrome / black label frame',
      'Optional key hooks underneath',
      'Bulk-pack pricing',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Entryway organization', 'Home office', 'B&B reception desk', 'Home decor retail', 'Co-working spaces', 'Wedding gift'],
    related: ['paulownia-three-section-organizer', 'paulownia-stackable-storage-bins', 'paulownia-storage-crate'],
  },

  'paulownia-cutlery-caddy-handled': {
    slug: 'paulownia-cutlery-caddy-handled',
    name: 'Paulownia Cutlery Caddy with Handles',
    closure: 'Open-Top',
    tagline: 'Engraved farmhouse caddy with metal side handles',
    intro:
      'A "Happiness is Homemade" engraved paulownia cutlery caddy with black metal side handles — built for buffet style service, picnics, or kitchen islands. Solid paulownia is light enough to carry one-handed even when fully loaded.',
    images: [
      img('set-8', 'ScreenShot_2026-05-06_184106_032.png'),
      img('set-8', 'ScreenShot_2026-05-06_184113_352.png'),
      img('set-8', 'ScreenShot_2026-05-06_184121_222.png'),
      img('set-8', 'ScreenShot_2026-05-06_184128_983.png'),
    ],
    specs: {
      'Closure Type': 'Open-top w/ side handles',
      'Material': 'Solid paulownia',
      'Surface Finish': 'Light pine stain',
      'Sections': '4 (custom)',
      'Handles': 'Black metal side grips',
      'Size': '320 × 180 × 200 mm (custom)',
      'MOQ': '300 pcs',
      'Lead Time': '25 days',
      'Branding': 'Engraved phrase on long side',
    },
    customization: [
      'Custom engraved phrase / quote',
      'Stain: light pine, walnut, natural',
      'Section count: 3 / 4 / 5',
      'Handle finish: black, brass, copper',
      'Custom proportions',
      'Bulk-pack pricing',
    ],
    packaging:
      'OPP polybag, retail box, 5-ply export master carton.',
    useCases: ['Buffet & catering', 'Farmhouse kitchen', 'Wedding decor', 'Picnic & BBQ', 'Hospitality FOH', 'Restaurant tabletop'],
    related: ['paulownia-cutlery-caddy-engraved', 'paulownia-party-plate-caddy', 'paulownia-mail-organizer'],
  },

  'paulownia-mini-drawer-pair': {
    slug: 'paulownia-mini-drawer-pair',
    name: 'Paulownia Mini Drawer Pair (Walnut + Natural)',
    closure: 'Drawer',
    tagline: 'Tiny three-drawer paulownia chest in two tones',
    intro:
      'A miniature three-drawer paulownia chest available in two stain tones — vintage walnut and natural — with brass-look pull handles. Great for desk-top storage, craft supplies, or as a quirky display piece. Buy as a pair or individually.',
    images: [
      img('set-9', 'ScreenShot_2026-05-06_184227_990.png'),
      img('set-9', 'ScreenShot_2026-05-06_184236_547.png'),
      img('set-9', 'ScreenShot_2026-05-06_184243_079.png'),
      img('set-9', 'ScreenShot_2026-05-06_184252_077.png'),
    ],
    specs: {
      'Closure Type': 'Pull-out drawers',
      'Material': 'Solid paulownia',
      'Surface Finish': 'Walnut stain or natural',
      'Drawers': '3-tier mini',
      'Hardware': 'Antique-look brass pulls',
      'Size': '120 × 100 × 200 mm (custom)',
      'MOQ': '500 pcs',
      'Lead Time': '25 days',
      'Branding': 'Laser engraved top',
    },
    customization: [
      'Stain: walnut, natural, ebony, painted',
      'Drawer count: 3 / 4 / 5',
      'Knob style: brass, ceramic, leather',
      'Engraved top label',
      'Bulk-pack pricing',
      'Optional locking top drawer',
    ],
    packaging:
      'Foam-wrapped, retail box, 5-ply export master carton.',
    useCases: ['Desktop storage', 'Vanity organization', 'Jewelry storage', 'Craft / hobby supplies', 'Home decor retail', 'Boutique gifting'],
    related: ['paulownia-mini-drawer-chest', 'paulownia-three-tone-keepsake-set', 'paulownia-stackable-storage-bins'],
  },
};

export const PRODUCT_SLUGS = Object.keys(PRODUCTS);
export const CLOSURES = Array.from(new Set(Object.values(PRODUCTS).map((p) => p.closure)));
