import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outDir = path.join(root, 'seo-work');
const outFile = path.join(outDir, 'category-metadata-proposals.json');

const SPECIAL_TITLES = {
  'desk-office-organizers': 'Wooden Desk Organizers - OEM Office Storage | CHIC',
  'gift-boxes-retail-packaging': 'Wooden Gift Boxes - Retail Packaging OEM | CHIC',
  'hospitality-commercial': 'Hotel Wooden Supplies - Trays and Caddies | CHIC',
  'pet-products': 'Wooden Pet Products - Urns and Keepsakes | CHIC',
  'storage-home-organization': 'Wooden Storage Organizers - OEM Homeware | CHIC',
  'wooden-kitchen-dining': 'Wooden Kitchenware - Boards, Trays and Racks | CHIC',
};

const SPECIAL_DESCRIPTIONS = {
  'wooden-bathtub-caddy-tray':
    'Custom wooden bath caddy trays in bamboo, acacia and walnut for spa, hotel and retail buyers. OEM sizing, logo options and export packaging.',
  'wooden-vinyl-record-holders':
    'Wholesale wooden vinyl record holders, LP storage racks and now-playing stands for retail and gift brands. OEM sizing, finish and packaging options.',
};

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function stripHtml(value = '') {
  return String(value)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeName(name) {
  return stripHtml(name)
    .replace(/\s*&\s*/g, ' and ')
    .replace(/\bWith\b/g, 'with')
    .replace(/\s+/g, ' ')
    .trim();
}

function keywordBase(category) {
  const name = normalizeName(category.name);
  if (/\b(wooden|bamboo|wicker|pet|hotel|restaurant|room|airbnb|bathroom|branded|entryway|picnic)\b/i.test(name)) {
    return name;
  }
  return `Wooden ${name}`;
}

function pickTitle(category) {
  if (SPECIAL_TITLES[category.slug]) return SPECIAL_TITLES[category.slug];

  const base = keywordBase(category);
  const candidates = [
    `${base} - OEM Wholesale Manufacturer | CHIC`,
    `${base} - Custom OEM Wholesale | CHIC`,
    `${base} - OEM Factory Supply | CHIC`,
    `${base} - Wholesale Supplier | CHIC`,
    `${base} - Factory Direct | CHIC`,
    `${base} | CHIC`,
  ];

  const scored = candidates.map((title) => {
    const len = title.length;
    const inRangePenalty = len >= 50 && len <= 60 ? 0 : 100;
    return { title, len, score: inRangePenalty + Math.abs(55 - len) };
  });

  scored.sort((a, b) => a.score - b.score);
  return scored[0].title;
}

function clampDescription(value, max = 158) {
  let text = stripHtml(value)
    .replace(/\borganisers\b/gi, 'organizers')
    .replace(/\borganiser\b/gi, 'organizer')
    .replace(/,\s*FOB Xiamen(?:,?\s*CARB P2 on request)?\.?$/i, '.')
    .replace(/,\s*FOB Xiamen\.?$/i, '.')
    .replace(/,\s*FOB\.?$/i, '.')
    .replace(/\s+per\.?$/i, '.')
    .replace(/\s+from\.?$/i, '.')
    .replace(/\bMOQ 300\.?$/i, 'MOQ 300 pcs.')
    .replace(/\s+/g, ' ')
    .trim();

  if (!text) return '';
  if (text.length <= max) return text;

  const cut = text.slice(0, max);
  const space = cut.lastIndexOf(' ');
  text = (space >= max - 35 ? cut.slice(0, space) : cut)
    .replace(/[\s,;:\-–—]+$/, '')
    .replace(/\b(FOB|per|from|with|and|for|to|of)$/i, '')
    .replace(/\bMOQ 300$/i, 'MOQ 300 pcs')
    .replace(/[\s,;:\-–—]+$/, '')
    .trim();
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function improveDescription(category, productCount) {
  if (SPECIAL_DESCRIPTIONS[category.slug]) return SPECIAL_DESCRIPTIONS[category.slug];

  const source = stripHtml(category.description);
  const fallback = `${keywordBase(category)} for B2B buyers, private label brands and importers. OEM sizes, finishes, logo options and export packaging from CHIC.`;
  let desc = clampDescription(source || fallback);

  if (desc.length < 130) {
    const addOn = productCount > 0
      ? ` Explore ${productCount} designs and request OEM pricing.`
      : ' Request OEM pricing and custom packaging options.';
    if (desc.length + addOn.length <= 160) desc += addOn;
  }

  return clampDescription(desc, 160);
}

const categories = readJson('wp-data/product_categories.json')
  .filter((category) => category.slug !== 'uncategorized');
const products = readJson('wp-data/products.json');

const proposals = categories.map((category) => {
  const productCount = products.filter((product) =>
    (product.categories || []).some((item) => item.slug === category.slug)
  ).length;
  const proposedMetaTitle = pickTitle(category);
  const proposedMetaDescription = improveDescription(category, productCount);

  return {
    slug: category.slug,
    name: category.name,
    parent: category.parent || '',
    productCount,
    currentMetaTitle: category.meta_title || '',
    currentMetaDescription: category.meta_desc || '',
    currentDescription: stripHtml(category.description),
    proposedMetaTitle,
    proposedMetaDescription,
    titleLength: proposedMetaTitle.length,
    metaDescriptionLength: proposedMetaDescription.length,
    action: {
      setMetaTitle: category.meta_title !== proposedMetaTitle,
      setMetaDescription: category.meta_desc !== proposedMetaDescription,
    },
  };
});

const report = {
  generatedAt: new Date().toISOString(),
  targetFile: 'wp-data/product_categories.json',
  count: proposals.length,
  rules: {
    titleTarget: '50-60 characters where practical',
    metaDescriptionTarget: '150-160 characters where practical',
    noUnsupportedClaims: true,
    noKeywordStuffing: true,
  },
  proposals,
};

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(`Wrote ${proposals.length} category metadata proposals to ${outFile}`);
