// SEO content generator for product detail pages.
//
// Given a WP product (title + category + image), build structured sections
// — Overview, Features, Material, Customization, Applications, FAQ — that
// together give each product 600-1000+ words of unique, keyword-rich content.
//
// All output is derived deterministically from the product's title + category,
// so identical products would produce identical content (no randomness), and
// no AI API is needed at build time.

import { stripHtml } from './wp-data';

// ── Material knowledge base ───────────────────────────────────────────
// When the product title mentions one of these materials, we surface a
// short knowledge paragraph that adds keyword depth + buyer education.
const MATERIALS = {
  bamboo: {
    name: 'Bamboo',
    keywords: ['bamboo'],
    description:
      'Bamboo is a dense, fast-growing grass that performs more like a hardwood — naturally water-resistant, antimicrobial, and harder than maple. It regenerates in 3–5 years (vs. 30+ for traditional hardwoods), making it one of the most eco-conscious materials available for kitchenware and home goods.',
    bestFor: 'Daily kitchen use, eco-friendly retail lines, gift sets, food-contact applications.',
  },
  acacia: {
    name: 'Acacia Wood',
    keywords: ['acacia'],
    description:
      'Acacia is a premium hardwood with rich, contrasting tiger-stripe grain that ranges from warm gold to deep walnut tones. Its natural oils make it water-resistant and food-safe without heavy chemical finishes. Dense and scratch-resistant — built to handle daily use.',
    bestFor: 'Cheese boards, charcuterie platters, serving trays, premium retail packaging.',
  },
  walnut: {
    name: 'Black Walnut',
    keywords: ['walnut', 'black walnut'],
    description:
      'Black walnut is a luxury North American hardwood prized for its rich chocolate-brown color and tight, elegant grain. Its premium feel and timeless appeal make it the top tier choice for high-end gift packaging and collector pieces.',
    bestFor: 'Luxury gift boxes, watch boxes, jewelry presentation, premium charcuterie.',
  },
  pine: {
    name: 'Pine Wood',
    keywords: ['pine'],
    description:
      'Pine is a soft, lightweight wood with prominent knots and a clean, blonde appearance. Its straight grain accepts paint and stain beautifully, making it a versatile choice for farmhouse-style and rustic product lines. The most budget-friendly solid wood option.',
    bestFor: 'Painted finishes, rustic decor, distressed looks, high-volume retail.',
  },
  paulownia: {
    name: 'Paulownia',
    keywords: ['paulownia'],
    description:
      'Often called the "aluminum of timber," Paulownia is roughly 40% lighter than pine but with a high strength-to-weight ratio. Stable, easy to ship, and naturally resistant to warping — ideal for export-heavy programs where freight cost and dimensional stability matter.',
    bestFor: 'Storage boxes, drawer organizers, lightweight gift packaging.',
  },
  oak: {
    name: 'Oak Wood',
    keywords: ['oak'],
    description:
      'Oak is a classic, durable hardwood with strong, open grain and warm honey tones. It develops a beautiful patina over time and is associated with traditional craftsmanship. Heavy, sturdy, and built to last for decades.',
    bestFor: 'Heritage-style products, premium kitchenware, statement pieces.',
  },
  beech: {
    name: 'Beech Wood',
    keywords: ['beech'],
    description:
      'Beech is a hard, close-grained European hardwood with a uniform creamy color and subtle figuring. Smooth, easy to machine, and food-safe — a favorite for utensils, cutting boards, and modern minimalist designs.',
    bestFor: 'Utensils, cutting boards, modern Scandinavian style.',
  },
  rubber: {
    name: 'Rubberwood',
    keywords: ['rubber wood', 'rubberwood'],
    description:
      'Rubberwood is a sustainable hardwood harvested from rubber trees after they finish producing latex. Dense, pale, and uniformly grained — it accepts stain readily and offers excellent cost-to-quality ratio for everyday kitchen and storage products.',
    bestFor: 'Cutting boards, painted boxes, budget-friendly serving pieces.',
  },
  teak: {
    name: 'Teak Wood',
    keywords: ['teak'],
    description:
      'Teak is the gold standard for water resistance and durability — naturally oily, dimensionally stable, and rich golden-brown. It outperforms most woods outdoors and is a luxury material for high-end serving and decor pieces.',
    bestFor: 'Outdoor serving trays, premium kitchenware, hospitality lines.',
  },
  sapele: {
    name: 'Sapele',
    keywords: ['sapele'],
    description:
      'Sapele is a premium African hardwood with a deep red-brown color and shimmering interlocked grain that catches the light. Similar to mahogany but harder and more sustainable — a refined choice for premium presentation pieces.',
    bestFor: 'Luxury gift boxes, watch boxes, presentation cases.',
  },
  mdf: {
    name: 'MDF Veneer',
    keywords: ['mdf'],
    description:
      'MDF (medium-density fiberboard) with real wood veneer offers the look of solid wood with superior dimensional stability and lower cost. Ideal when consistency, painted finishes, or large flat panels are needed.',
    bestFor: 'Painted boxes, large-format storage, retail display pieces.',
  },
  plywood: {
    name: 'Plywood',
    keywords: ['plywood'],
    description:
      'Plywood — multiple thin layers of wood glued cross-grain — offers excellent strength, stability, and resistance to warping. Versatile, cost-effective, and a workhorse material for structural elements in wooden products.',
    bestFor: 'Structural storage boxes, drawer organizers, large flat panels.',
  },
};

// ── Product category templates ────────────────────────────────────────
// Each main product type gets its own "Applications" and "FAQ" content.
const CATEGORY_TEMPLATES = {
  'cheese-board': {
    productType: 'cheese board',
    applications: [
      'Charcuterie and wine pairing events',
      'Restaurant and hospitality serving',
      'Gift packaging for housewarming and weddings',
      'Retail kitchenware lines and Amazon FBA programs',
    ],
    faqExtra: [
      { q: 'Are these cheese boards food-safe?', a: 'Yes. All our cheese boards are finished with FDA and LFGB-compliant food-grade oil or wax — safe for direct food contact.' },
      { q: 'Can you include a knife set with the cheese board?', a: 'Yes. We offer cheese boards with matching stainless steel knife sets, slide-out cutlery drawers, and custom presentation packaging.' },
    ],
  },
  'cutting-board': {
    productType: 'cutting board',
    applications: [
      'Daily home kitchen prep',
      'Restaurant and commercial kitchens',
      'Branded retail kitchenware lines',
      'Promotional gift sets and corporate gifting',
    ],
    faqExtra: [
      { q: 'How should I care for a wooden cutting board?', a: 'Hand wash with mild soap and warm water — never soak or dishwash. Apply food-grade mineral oil monthly to maintain the finish and prevent cracking. We can include a Care Instruction Card in your packaging.' },
    ],
  },
  'serving-tray': {
    productType: 'serving tray',
    applications: [
      'Breakfast in bed and ottoman serving',
      'Coffee table styling and decor',
      'Hospitality (hotels, Airbnb, restaurants)',
      'Retail lifestyle and home decor brands',
    ],
    faqExtra: [
      { q: 'Can you customize tray dimensions?', a: 'Yes. We support custom size, handle style, edge profile, and finish. Common dimensions: small (30×20cm), medium (40×30cm), large ottoman trays (60×40cm).' },
    ],
  },
  'spice-rack': {
    productType: 'spice rack',
    applications: [
      'Countertop and wall-mounted kitchen storage',
      'Drawer and cabinet organization',
      'Branded kitchen organizer collections',
      'Spice subscription box gift sets',
    ],
    faqExtra: [
      { q: 'Can you supply the rack with matching glass jars?', a: 'Yes. We can include square or round glass jars with bamboo or metal lids, labels, funnels, and shaker tops — full kitchen organizer kits.' },
    ],
  },
  'storage-box': {
    productType: 'storage box',
    applications: [
      'Closet, vanity, and entryway organization',
      'Kitchen pantry and craft room storage',
      'Branded home organization product lines',
      'Subscription box and e-commerce packaging',
    ],
    faqExtra: [
      { q: 'Can you add custom inserts or dividers?', a: 'Yes. We offer EVA foam, velvet wrap, microfiber lining, molded pulp inserts, and custom dividers cut to your product dimensions.' },
    ],
  },
  'jewelry-box': {
    productType: 'jewelry box',
    applications: [
      'Brand packaging for jewelry collections',
      'Retail and boutique jewelry display',
      'Wedding favor and proposal gift boxes',
      'Watch and accessory presentation',
    ],
    faqExtra: [
      { q: 'What lining options are available?', a: 'Velvet, microfiber, satin, EVA foam, or custom-cut foam inserts. Available in any color to match your brand palette.' },
    ],
  },
  'gift-box': {
    productType: 'gift box',
    applications: [
      'Corporate gifting and promotional campaigns',
      'Holiday and seasonal retail packaging',
      'Subscription box programs',
      'Brand product launch packaging',
    ],
    faqExtra: [
      { q: 'Can you handle holiday-season volume?', a: 'Yes. We typically produce 50,000+ gift boxes monthly during Q4. Book your order by August for guaranteed Q4 delivery.' },
    ],
  },
  'wine-box': {
    productType: 'wine box',
    applications: [
      'Single-bottle and double-bottle wine packaging',
      'Premium wine and spirits gift sets',
      'Corporate gifting and promotional packaging',
      'Wine club subscription programs',
    ],
    faqExtra: [
      { q: 'Can you make wine boxes for specific bottle sizes?', a: 'Yes. We custom-cut bottle compartments for any size — Bordeaux, Burgundy, Champagne, magnums, and miniatures.' },
    ],
  },
  'tea-box': {
    productType: 'tea box',
    applications: [
      'Loose-leaf tea brand packaging',
      'Tea bag organizer and display',
      'Café and hospitality service',
      'Gift sets and premium retail packaging',
    ],
    faqExtra: [
      { q: 'Can you make tea boxes with glass viewing lids?', a: 'Yes. Glass-lid tea boxes are a popular premium option — show off your blend selection while keeping it fresh.' },
    ],
  },
  default: {
    productType: 'wooden product',
    applications: [
      'Premium retail and brand packaging',
      'Hospitality and commercial use',
      'Gift and promotional programs',
      'Private label and OEM product lines',
    ],
    faqExtra: [],
  },
};

// Universal FAQ shared across all products (factory-direct B2B questions)
const UNIVERSAL_FAQ = [
  { q: 'What is the minimum order quantity (MOQ)?', a: 'MOQ is typically 300–500 pieces per design depending on size, material, and customization. Trial orders below MOQ may be possible for first-time partners.' },
  { q: 'Can you produce this with our custom logo and branding?', a: 'Yes. We offer laser engraving, screen printing, hot foil stamping, and UV printing for logos. Custom packaging (color box, kraft sleeve, FBA-ready cartons) is also available.' },
  { q: 'What is your production lead time?', a: 'Sample lead time: 7–10 days. Mass production: 25–35 days after sample approval. We confirm exact timing before each order.' },
  { q: 'Do you ship to Amazon FBA warehouses?', a: 'Yes. We provide FBA-ready packaging with barcode labels, carton markings, and drop-tested cartons. We ship to FBA warehouses in the US, UK, Canada, Germany, and Australia.' },
];

// ── Title parsing helpers ─────────────────────────────────────────────

function detectMaterial(title) {
  const t = title.toLowerCase();
  for (const [key, mat] of Object.entries(MATERIALS)) {
    for (const kw of mat.keywords) {
      if (t.includes(kw)) return { key, ...mat };
    }
  }
  return null;
}

function detectCategoryTemplate(title, productCategories) {
  const t = title.toLowerCase();
  const catSlugs = (productCategories || []).map(c => c.slug);

  const lookups = [
    { keywords: ['cheese board', 'charcuterie'], template: 'cheese-board' },
    { keywords: ['cutting board', 'chopping board', 'bread board'], template: 'cutting-board' },
    { keywords: ['serving tray', 'sofa tray', 'breakfast tray', 'ottoman tray'], template: 'serving-tray' },
    { keywords: ['spice rack', 'spice organizer'], template: 'spice-rack' },
    { keywords: ['jewelry box', 'ring box'], template: 'jewelry-box' },
    { keywords: ['wine box', 'wine case'], template: 'wine-box' },
    { keywords: ['tea box', 'tea bag'], template: 'tea-box' },
    { keywords: ['gift box', 'keepsake box', 'memory box'], template: 'gift-box' },
    { keywords: ['storage box', 'organizer box', 'stash box'], template: 'storage-box' },
  ];

  for (const { keywords, template } of lookups) {
    for (const kw of keywords) {
      if (t.includes(kw) || catSlugs.some(c => c.includes(template))) {
        return CATEGORY_TEMPLATES[template];
      }
    }
  }
  return CATEGORY_TEMPLATES.default;
}

function extractKeyFeatures(title) {
  const t = title.toLowerCase();
  const features = [];

  const FEATURE_MAP = [
    [['drawer', 'slide-out'], 'Integrated slide-out cutlery / storage drawer'],
    [['knife set', 'with knives', '4 knives', '3 knives'], 'Includes matching stainless steel knife set'],
    [['handle', 'with handles'], 'Built-in carry handles for easy transport'],
    [['glass lid', 'glass cover', 'transparent lid'], 'Premium glass viewing lid'],
    [['magnetic'], 'Magnetic closure for secure, premium feel'],
    [['hinged', 'hinge'], 'Hinged-lid construction with quality hardware'],
    [['sliding lid', 'slide lid'], 'Smooth sliding lid mechanism'],
    [['compartment', 'divider', 'partition'], 'Multiple compartments / dividers for organization'],
    [['lock', 'clasp'], 'Decorative lock or clasp closure'],
    [['rotating', 'lazy susan', 'spinning'], 'Rotating / Lazy Susan design'],
    [['tiered', 'multi-tier'], 'Multi-tier construction for vertical storage'],
    [['expandable', 'adjustable'], 'Expandable / adjustable size'],
    [['wall mount', 'wall-mounted'], 'Wall-mounted design saves countertop space'],
    [['food-grade', 'food safe', 'fda', 'lfgb'], 'Food-grade finish (FDA / LFGB compliant)'],
    [['custom logo', 'engraved', 'engraving'], 'Custom logo engraving available'],
    [['eco-friendly', 'sustainable', 'organic'], 'Eco-friendly and sustainably sourced'],
    [['groove', 'juice channel', 'juice groove'], 'Juice groove around the edge'],
    [['phone slot', 'phone holder'], 'Built-in phone / tablet slot'],
    [['cup holder', 'beverage'], 'Cup holder cutouts'],
    [['hidden'], 'Hidden compartment for added utility'],
    [['set'], 'Complete set with matching accessories'],
  ];

  for (const [keywords, feature] of FEATURE_MAP) {
    if (keywords.some(kw => t.includes(kw))) features.push(feature);
  }

  // Always include these baseline features
  if (features.length < 3) {
    features.push('Factory-direct OEM manufacturing in our 15,000 m² facility');
    features.push('Export-grade quality control and packaging');
  }
  return features.slice(0, 8);
}

// ── Main generator ────────────────────────────────────────────────────
export function generateProductContent(product) {
  const title = stripHtml(product.title || '');
  const material = detectMaterial(title);
  const template = detectCategoryTemplate(title, product.categories);
  const features = extractKeyFeatures(title);

  const productType = template.productType;
  const category = product.categories?.[0]?.name || 'Wooden Product';

  // Overview paragraph (unique per product based on title + material + type)
  const overview = material
    ? `The ${title} is a premium ${productType} crafted from ${material.name.toLowerCase()}, designed for ${template.applications[0].toLowerCase()} and beyond. Manufactured by CHIC — a factory-direct wooden products manufacturer in China — this piece combines traditional craftsmanship with modern production techniques to deliver consistent quality at wholesale volumes. Whether you're sourcing for ${template.applications[1].toLowerCase()} or ${template.applications[2].toLowerCase()}, we support full OEM customization including custom size, finish, logo branding, and private label packaging.`
    : `The ${title} is a custom ${productType} manufactured by CHIC, a wooden products manufacturer in China specializing in OEM and private label production for global brands. Designed for ${template.applications[0].toLowerCase()} and ${template.applications[1].toLowerCase()}, this piece is fully customizable — size, material, finish, logo, and packaging — to fit your retail program, gift line, or hospitality account.`;

  // Material section (only if we detected a known material)
  const materialSection = material
    ? {
        title: `Why ${material.name}?`,
        body: material.description,
        bestFor: material.bestFor,
      }
    : null;

  // Customization section (universal)
  const customization = [
    'Custom size and structure — built to your spec drawings or reference samples',
    'Wood material upgrade — bamboo, acacia, walnut, pine, paulownia, oak, teak available',
    'Logo branding — laser engraving, hot foil stamping, screen print, UV print',
    'Surface finish — natural oil, matte lacquer, stained, painted, distressed',
    'Custom packaging — color box, kraft sleeve, gift box, FBA-ready master cartons',
    'Interior inserts — EVA foam, velvet, microfiber, molded pulp, custom dividers',
  ];

  // Why CHIC (universal)
  const whyChic = `CHIC (Xiamen Chic Homeware Co., Ltd.) is a wooden products manufacturer with a 15,000 m² production base in Cao County, Shandong — one of China's most established wooden products clusters. We export to 60+ countries with full OEM and private label support, dedicated quality control, and FBA-ready packaging. Our typical sample lead time is 7–10 days; mass production runs 25–35 days. MOQ starts at 300–500 pcs.`;

  // FAQ — combine category-specific + universal
  const faqs = [...(template.faqExtra || []), ...UNIVERSAL_FAQ];

  return {
    overview,
    features,
    materialSection,
    customization,
    applications: template.applications,
    whyChic,
    faqs,
    detectedMaterial: material?.name || null,
    productType,
  };
}

// Clean existing WP content — strip Elementor cruft, broken HTML attributes,
// and dropshipping spec dumps that don't add SEO value.
export function cleanProductWpContent(html) {
  if (!html) return '';
  let h = html;
  // Strip Elementor / paste-from-Word attributes
  h = h.replace(/\s+data-(path-to-node|index-in-node|start|end|para)="[^"]*"/g, '');
  h = h.replace(/\s+style="[^"]*"/g, '');
  h = h.replace(/\s+class="[^"]*"/g, '');
  // Strip raw spec dumps that follow "Material: bamboo Shape: square" pattern
  // (typical CJ Dropshipping content) — these don't help SEO and look unprofessional
  h = h.replace(/^[\s\S]{0,400}?Material:\s*[\w\s]+(?:\n|<br\s*\/?>)+/i, '');
  // Drop &nbsp; runs
  h = h.replace(/(?:&nbsp;\s*){2,}/g, ' ');
  // Drop empty paragraphs
  h = h.replace(/<p>\s*<\/p>/g, '');
  return h.trim();
}
