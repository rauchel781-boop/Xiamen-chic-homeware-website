// ─────────────────────────────────────────────────────────────────────────
// Gift & Packaging Box products (sample 5 — covers all 5 closure types)
// Image paths reference /public/gift-packaging-box/<product-slug>/
// & is URL-encoded as %26, space as %20.
// ─────────────────────────────────────────────────────────────────────────

const FOLDER = '/Gift%26Packaging%20Box';

export const PRODUCTS = {
  'luxury-magnetic-gift-box': {
    slug: 'luxury-magnetic-gift-box',
    name: 'Luxury Magnetic Gift Box',
    closure: 'Magnetic',
    tagline: 'Hidden magnetic closure for premium retail packaging',
    intro:
      'A premium gift box with concealed neodymium magnets in the lid. The cleanest possible exterior with a satisfying snap-close feel — ideal for cosmetics, watches, and high-end retail packaging where the unboxing experience matters.',
    images: [
      `${FOLDER}/luxury-magnetic-gift-box/ScreenShot_2026-05-04_105232_123.png`,
      `${FOLDER}/luxury-magnetic-gift-box/ScreenShot_2026-05-04_105240_017.png`,
      `${FOLDER}/luxury-magnetic-gift-box/ScreenShot_2026-05-04_105246_480.png`,
      `${FOLDER}/luxury-magnetic-gift-box/ScreenShot_2026-05-04_105253_494.png`,
    ],
    specs: {
      'Closure Type': 'Hidden magnetic (neodymium)',
      'Material': 'MDF / paulownia core with paper or PU surface wrap',
      'Surface Finish': 'Matte lacquer · hot foil · debossing · soft-touch coating',
      'Hardware': 'Concealed magnetic flap, optional ribbon pull',
      'Interior Lining': 'Velvet · microfiber · molded EVA foam',
      'Size': 'Custom',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Logo print · hot foil · deboss · custom emboss',
    },
    customization: [
      'Custom external dimensions and proportions',
      'Choice of paper, fabric, or PU exterior wrap',
      '1–6 color print, hot foil (gold/silver/copper), spot UV, deboss',
      'Custom EVA foam, velvet, or microfiber inserts',
      'Magnetic flap or book-style opening',
      'Inner ribbon pull, label window, retail-ready packaging',
    ],
    packaging:
      'Each box wrapped in OPP polybag → individual white inner carton → 5-ply export master carton. Master carton labeled with customer SKU and barcode if required.',
    useCases: ['Cosmetics & fragrance', 'Premium gift sets', 'Subscription boxes', 'Wedding favors', 'Tech accessories', 'Press kits'],
    related: ['hinged-wooden-gift-box', 'drawer-wooden-gift-box', 'liftoff-lid-gift-box'],
  },

  'hinged-wooden-gift-box': {
    slug: 'hinged-wooden-gift-box',
    name: 'Hinged Wooden Gift Box',
    closure: 'Hinged',
    tagline: 'Solid wood with brass hinges and clasp',
    intro:
      'A classic hinged wooden gift box made from solid pine or paulownia. Brass-finish hinges and a hook clasp give it the substantial, reusable feel that turns the packaging itself into part of the gift.',
    images: [
      `${FOLDER}/hinged-wooden-gift-box/ScreenShot_2026-04-17_183406_927.png`,
      `${FOLDER}/hinged-wooden-gift-box/ScreenShot_2026-04-17_183520_113.png`,
      `${FOLDER}/hinged-wooden-gift-box/ScreenShot_2026-04-17_183541_582.png`,
    ],
    specs: {
      'Closure Type': 'Hinged lid with hook clasp',
      'Material': 'Solid pine · paulownia · MDF veneered',
      'Surface Finish': 'Natural oil · matte lacquer · stained',
      'Hardware': 'Brass-finish butt hinges · hook clasp',
      'Interior Lining': 'Optional foam · velvet · unfinished wood',
      'Size': 'Custom',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraving · wood burning · screen print',
    },
    customization: [
      'Wood: pine, paulownia, walnut, oak, or bamboo',
      'Finish: natural / oiled / stained / lacquered',
      'Hinges: brass / antique brass / matte black',
      'Optional padlock, lock & key, or magnetic catch',
      'Foam-cut bottle, glass, or accessory holders',
      'Logo: laser engraved, wood-burned, or hot foil',
    ],
    packaging:
      'Individually bubble-wrapped, then placed into 5-layer export master cartons. Carton spec, count, and labeling per customer requirements.',
    useCases: ['Wine & spirit gifting', 'Watch & jewelry', 'Tea & coffee', 'Tools & craft kits', 'Memory / keepsake', 'Corporate gifting'],
    related: ['luxury-magnetic-gift-box', 'sliding-lid-gift-box', 'drawer-wooden-gift-box'],
  },

  'sliding-lid-gift-box': {
    slug: 'sliding-lid-gift-box',
    name: 'Sliding Lid Gift Box',
    closure: 'Sliding',
    tagline: 'Hardware-free with CNC-routed grooves',
    intro:
      'A hardware-free wooden box with a precision-grooved sliding lid. The cleanest possible look — just wood, with a smooth-gliding lid that doubles as a large branding canvas. Perfect for craft kits, tea selections, and pen sets.',
    images: [
      `${FOLDER}/sliding-lid-gift-box/ScreenShot_2026-05-04_105827_786.png`,
      `${FOLDER}/sliding-lid-gift-box/ScreenShot_2026-05-04_105838_234.png`,
      `${FOLDER}/sliding-lid-gift-box/ScreenShot_2026-05-04_105854_280.png`,
      `${FOLDER}/sliding-lid-gift-box/ScreenShot_2026-05-04_105912_614.png`,
      `${FOLDER}/sliding-lid-gift-box/ScreenShot_2026-05-04_105937_192.png`,
      `${FOLDER}/sliding-lid-gift-box/ScreenShot_2026-05-04_105947_460.png`,
    ],
    specs: {
      'Closure Type': 'Sliding lid with CNC-routed grooves',
      'Material': 'Pine · bamboo · paulownia · poplar',
      'Surface Finish': 'Raw · natural oil · lacquer · painted',
      'Hardware': 'None — hardware-free construction',
      'Interior': 'Open compartment · divided · fitted insert',
      'Size': 'Custom',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser engraved · screen print · hot foil',
    },
    customization: [
      'Wood: pine, bamboo, paulownia, poplar, walnut',
      'Lid finger pull / ribbon hole / magnetic catch',
      'Removable internal dividers',
      'Lid surface engraving (large flat surface)',
      'Stackable design with locating ridges',
      'Multi-pack sliding-lid sets',
    ],
    packaging:
      'Stacked in groups of 12–24, OPP-wrapped, packed in master cartons. Hardware-free design saves on freight cost.',
    useCases: ['Craft kits & DIY', 'Tea & coffee', 'Pen / stationery sets', 'Children gift sets', 'Wedding favors', 'Retail packaging'],
    related: ['hinged-wooden-gift-box', 'liftoff-lid-gift-box', 'drawer-wooden-gift-box'],
  },

  'drawer-wooden-gift-box': {
    slug: 'drawer-wooden-gift-box',
    name: 'Drawer Wooden Gift Box',
    closure: 'Drawer',
    tagline: 'Pull-out drawer for high-end presentations',
    intro:
      'A drawer-style gift box that pulls out smoothly to reveal the contents. Combines the substantial feel of a hinged box with the surprise reveal of a presentation drawer. Single or multi-tier configurations available.',
    images: [
      `${FOLDER}/drawer-wooden-gift-box/ScreenShot_2026-05-04_110326_654.png`,
      `${FOLDER}/drawer-wooden-gift-box/ScreenShot_2026-05-04_110342_517.png`,
      `${FOLDER}/drawer-wooden-gift-box/ScreenShot_2026-05-04_110351_917.png`,
    ],
    specs: {
      'Closure Type': 'Pull-out drawer',
      'Material': 'Solid wood or MDF veneered',
      'Surface Finish': 'Matte lacquer · soft-touch coating · stained wood',
      'Drawer Slides': 'Wood-on-wood · ball-bearing · soft-close',
      'Interior Lining': 'Velvet · microfiber · EVA foam',
      'Pull / Handle': 'Recessed finger hole · ribbon pull · brass cup',
      'Size': 'Custom',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Laser · hot foil · screen print · deboss',
    },
    customization: [
      'Single drawer or 2–6 tier drawer towers',
      'Smooth wood-on-wood, soft-close, or full-extension slides',
      'Pull: recessed finger, ribbon, or brass cup',
      'Custom velvet / microfiber drawer interior',
      'Optional lock on top drawer',
      'Brass label frame on drawer face',
    ],
    packaging:
      'Individually bubble-wrapped with drawer secured against opening in transit, then packed in 5-layer export master cartons.',
    useCases: ['Watch & jewelry presentation', 'Premium gift sets', 'Cosmetics travel kits', 'Spirit & wine sets', 'Hotel amenities', 'Award presentation'],
    related: ['luxury-magnetic-gift-box', 'hinged-wooden-gift-box', 'liftoff-lid-gift-box'],
  },

  'liftoff-lid-gift-box': {
    slug: 'liftoff-lid-gift-box',
    name: 'Lift-off Lid Gift Box',
    closure: 'Lift-off',
    tagline: 'Simple two-piece construction, classic and clean',
    intro:
      'A traditional lift-off lid box — a separate top that lifts cleanly off the base. The simplest, cleanest gift box format, with a generous flat lid for branding. Ideal for cosmetics, craft sets, and any application that prefers a "reveal" opening.',
    images: [
      `${FOLDER}/liftoff-lid-gift-box/ScreenShot_2026-05-04_110542_433.png`,
      `${FOLDER}/liftoff-lid-gift-box/ScreenShot_2026-05-04_110603_613.png`,
      `${FOLDER}/liftoff-lid-gift-box/ScreenShot_2026-05-04_110619_622.png`,
      `${FOLDER}/liftoff-lid-gift-box/ScreenShot_2026-05-04_110627_934.png`,
      `${FOLDER}/liftoff-lid-gift-box/ScreenShot_2026-05-04_110634_192.png`,
      `${FOLDER}/liftoff-lid-gift-box/ScreenShot_2026-05-04_110640_797.png`,
    ],
    specs: {
      'Closure Type': 'Lift-off two-piece (lid + base)',
      'Material': 'Pine · paulownia · MDF · solid hardwood',
      'Surface Finish': 'Natural · oiled · lacquered · printed',
      'Hardware': 'None — friction or lip-fit closure',
      'Interior Lining': 'Open · foam-cut insert · fitted tray',
      'Size': 'Custom',
      'MOQ': '200 pcs',
      'Lead Time': '30 days',
      'Branding': 'Print · laser · foil — all surfaces',
    },
    customization: [
      'Wood: pine, paulownia, walnut, oak, or MDF veneered',
      'Lid lip depth (deep / shallow / flush)',
      'Optional tray or insert inside the base',
      'Full lid surface available for printing or engraving',
      'Stackable lid design for retail display',
      'Telescoping or shouldered lid styles',
    ],
    packaging:
      'Lid and base stacked together with foam separator, OPP-wrapped, packed in master cartons.',
    useCases: ['Cosmetics & beauty', 'Apparel / accessory boxes', 'Craft & hobby kits', 'Cigar boxes', 'Photo / album storage', 'Promotional giftware'],
    related: ['sliding-lid-gift-box', 'hinged-wooden-gift-box', 'luxury-magnetic-gift-box'],
  },
};

export const PRODUCT_SLUGS = Object.keys(PRODUCTS);
export const CLOSURES = Array.from(new Set(Object.values(PRODUCTS).map((p) => p.closure)));
