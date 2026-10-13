import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const categoryFile = path.join(root, 'wp-data', 'product_categories.json');
const productFile = path.join(root, 'wp-data', 'products.json');
const postFile = path.join(root, 'wp-data', 'posts.json');
const pageFile = path.join(root, 'wp-data', 'pages.json');
const proposalFile = path.join(root, 'seo-work', 'category-metadata-proposals.json');
const reportFile = path.join(root, 'seo-work', 'metadata-fix-report.json');

const NOINDEX_PAGE_SLUGS = new Set([
  'cart',
  'thank-you',
  '%e5%bf%83%e6%84%bf%e5%8d%95',
]);

const PAGE_METADATA = {
  home: {
    title: 'Wooden Homeware Manufacturer in China | CHIC',
    desc: 'CHIC manufactures custom wooden homeware, kitchenware, storage organizers and gift packaging in China, with OEM sizing, logo branding and export support.',
  },
  products: {
    title: 'Custom Wooden Homeware Products | OEM Factory CHIC',
    desc: 'Browse CHIC wooden and bamboo homeware products for wholesale and private-label programs, including kitchenware, organizers, trays, boxes and packaging.',
  },
  'wooden-products-factory-in-china': {
    title: 'Wooden Products Factory in China | OEM Supplier CHIC',
    desc: 'Work with CHIC, a China wooden products factory for OEM homeware, kitchenware, packaging and storage programs with quality control and export support.',
  },
  contact: {
    title: 'Contact CHIC Wooden Products Factory | OEM Quotes',
    desc: 'Contact CHIC for custom wooden homeware, kitchenware and packaging quotes. Share sizes, material, logo, quantity and target market for a clear reply.',
  },
  'blog-wooden-homeware-sourcing-blog': {
    title: 'Wooden Homeware Sourcing Blog | CHIC Factory Guides',
    desc: 'Read CHIC sourcing guides for wooden homeware buyers, covering materials, MOQ, pricing, packaging, quality control and private-label production.',
  },
  'wholesale-wooden-serving-trays': {
    title: 'Wholesale Wooden Serving Trays | OEM Factory CHIC',
    desc: 'Source wholesale wooden serving trays from CHIC with acacia, bamboo and pine options, custom handles, logo branding and export packaging for retail buyers.',
  },
  'wholesale-wooden-spice-racks': {
    title: 'Wholesale Wooden Spice Racks | OEM Factory CHIC',
    desc: 'Buy wholesale wooden spice racks from CHIC with countertop, drawer, wall-mounted and tiered styles, plus custom sizes, finishes, jars and packaging.',
  },
  'complete-guide-wood-materials-for-kitchenware': {
    title: 'Wood Materials for Kitchenware | Buyer Guide CHIC',
    desc: 'Compare acacia, bamboo, rubberwood, beech, walnut and pine for wooden kitchenware, with factory notes on durability, finish, cost and sourcing.',
  },
  'wooden-sofa-tray-manufacturer': {
    title: 'Wooden Sofa Tray Manufacturer | OEM Supplier CHIC',
    desc: 'Source custom wooden sofa trays from CHIC with bamboo, acacia and pine options, private-label branding, custom packaging and wholesale export support.',
  },
  'custom-wooden-boxes': {
    title: 'Custom Wooden Boxes Manufacturer | OEM Supplier CHIC',
    desc: 'Order custom wooden boxes from CHIC for retail, gifts, tea, wine, watches and jewelry, with OEM sizing, inserts, finishes, logo branding and packaging.',
  },
  'custom-wooden-products-manufacturer': {
    title: 'Custom Wooden Products Manufacturer | OEM CHIC China',
    desc: 'CHIC manufactures custom wooden and bamboo products in China, including organizers, trays, kitchenware and gift boxes for private-label buyers.',
  },
  'wooden-box-factory-in-china': {
    title: 'Wooden Box Factory in China | OEM Packaging CHIC',
    desc: 'CHIC is a wooden box factory in China for OEM gift, retail and storage packaging, with custom structures, inserts, finishes, branding and export QC.',
  },
  'custom-wooden-storage-boxes-wholesale': {
    title: 'Custom Wooden Storage Boxes Wholesale | CHIC Factory',
    desc: 'Source custom wooden storage boxes wholesale from CHIC with OEM sizes, lids, dividers, inserts, finishes, logo branding and export-ready packaging.',
  },
  'custom-wooden-spice-rack': {
    title: 'Custom Wooden Spice Rack Manufacturer | CHIC Factory',
    desc: 'CHIC manufactures custom wooden spice racks with drawer, countertop, wall and tiered structures, matching jars, OEM branding and wholesale packaging.',
  },
};

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeJson(file, data) {
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function stripHtml(value = '') {
  return String(value)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/&#0?39;|&apos;|&rsquo;|&lsquo;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function fixCase(value) {
  return value
    .split(/( \| | - | – | — )/)
    .map((segment) => (/[A-Z]/.test(segment) ? segment : segment.replace(/\b[a-z]/g, (char) => char.toUpperCase())))
    .join('');
}

function cleanProductTitle(product) {
  let title = stripHtml(product.meta_title || product.title || '')
    .replace(/\s+\|\s*(Chic Homeware|CHIC).*$/i, '')
    .replace(/^Discover\s+/i, '')
    .replace(/^Professional\s+/i, '')
    .replace(/\bPremium\s+/gi, '')
    .replace(/\bHousehold\b/gi, '')
    .replace(/\bKitchen\s+Kitchen\b/gi, 'Kitchen')
    .replace(/\bCutting Board\s+Cutting Board\b/gi, 'Cutting Board')
    .replace(/\bBoard\s+Board\b/gi, 'Board')
    .replace(/\bCoaster\s+Coaster\b/gi, 'Coaster')
    .replace(/\s+/g, ' ')
    .trim();

  title = fixCase(title);
  return title || stripHtml(product.title || product.slug || 'Wooden Product');
}

function clampAtWord(value, max) {
  const text = stripHtml(value);
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const space = cut.lastIndexOf(' ');
  return (space >= max - 28 ? cut.slice(0, space) : cut)
    .replace(/[\s,;:\-–—|]+$/, '')
    .trim();
}

function buildProductTitle(product) {
  const base = cleanProductTitle(product);
  const shortCommercial = `${base} - OEM Wholesale | CHIC`;
  if (base.length + 7 < 30 && shortCommercial.length <= 60) return shortCommercial;
  if (base.length + 7 <= 60) return `${base} | CHIC`;

  const shortBase = clampAtWord(base, 53);
  if (shortBase.length >= 35 && shortBase.length + 7 <= 60) return `${shortBase} | CHIC`;

  return clampAtWord(base, 60);
}

function buildPostTitle(post) {
  let title = stripHtml(post.meta_title || post.title || '')
    .replace(/\s+\|\s*CHIC Industry Brief Vol\.\s*\d+$/i, '')
    .replace(/\s+\|\s*B2B Wholesale Specifications$/i, ' | B2B Specs')
    .replace(/^Professional\s+/i, '')
    .replace(/×/g, 'x')
    .replace(/\s+/g, ' ')
    .trim();

  if (title.length <= 60) return title;
  return clampAtWord(title, 60);
}

function needsPostFix(post) {
  const title = stripHtml(post.meta_title || post.title || '');
  return title.length > 60 || title.length < 30 || !stripHtml(post.meta_title);
}

function buildProductDescription(product) {
  const base = clampAtWord(cleanProductTitle(product), 68);
  const desc = `${base} for wholesale, private-label and retail programs. Custom logo, finish and export packaging options from CHIC.`;
  if (desc.length <= 160) return desc;

  const shorterBase = clampAtWord(cleanProductTitle(product), 52);
  return `${shorterBase} for wholesale and private-label programs. Custom logo, finish and export packaging from CHIC.`;
}

function cleanPageName(page) {
  const title = stripHtml(page.title || page.slug || 'Wooden Product')
    .replace(/^Elementor\s+#\d+$/i, '')
    .replace(/\s+/g, ' ')
    .trim();

  return fixCase(title || String(page.slug || 'Wooden Product').replace(/-/g, ' '));
}

function buildPageTitle(page) {
  const override = PAGE_METADATA[page.slug];
  if (override) return override.title;

  const name = cleanPageName(page);
  const withFactory = `${name} Manufacturer | OEM Wholesale CHIC`;
  if (withFactory.length <= 60) return withFactory;

  const shorter = `${name} Wholesale | OEM Factory CHIC`;
  if (shorter.length <= 60) return shorter;

  return clampAtWord(`${name} | CHIC`, 60);
}

function buildPageDescription(page) {
  const override = PAGE_METADATA[page.slug];
  if (override) return override.desc;

  const name = cleanPageName(page).toLowerCase();
  const desc = `Source ${name} from CHIC, a China wooden products factory. OEM sizes, finishes, logo branding and export packaging for wholesale buyers.`;
  if (desc.length <= 160) return desc;

  return `Source ${name} from CHIC. OEM sizes, finishes, logo branding and export packaging from a China wooden products factory.`;
}

function needsPageFix(page) {
  if (NOINDEX_PAGE_SLUGS.has(page.slug)) return page.noindex !== true || page.nofollow !== true;

  const title = stripHtml(page.meta_title || page.title || '');
  const desc = stripHtml(page.meta_desc || page.excerpt || page.content || '');
  return (
    !stripHtml(page.meta_title) ||
    !stripHtml(page.meta_desc) ||
    title.length > 60 ||
    title.length < 30 ||
    desc.length > 160 ||
    desc.length < 120
  );
}

function needsProductFix(product) {
  const title = stripHtml(product.meta_title || product.title || '');
  const desc = stripHtml(product.meta_desc || product.excerpt || product.content || '');
  return (
    !stripHtml(product.meta_title) ||
    title.length > 60 ||
    title.length < 30 ||
    desc.length > 160 ||
    desc.length < 120 ||
    /[\s,;:\-–—]$/.test(desc) ||
    /\b(a|an|the|global|FOB|per|from|with|and|for|to|of)\.?$/i.test(desc)
  );
}

if (!fs.existsSync(proposalFile)) {
  throw new Error(`Missing ${proposalFile}. Run scripts/generate-category-metadata-proposals.mjs first.`);
}

const categories = readJson(categoryFile);
const categoryProposals = readJson(proposalFile).proposals;
const proposalBySlug = new Map(categoryProposals.map((proposal) => [proposal.slug, proposal]));
const categoryChanges = [];

for (const category of categories) {
  const proposal = proposalBySlug.get(category.slug);
  if (!proposal) continue;

  const before = {
    meta_title: category.meta_title || '',
    meta_desc: category.meta_desc || '',
  };

  category.meta_title = proposal.proposedMetaTitle;
  category.meta_desc = proposal.proposedMetaDescription;

  if (before.meta_title !== category.meta_title || before.meta_desc !== category.meta_desc) {
    categoryChanges.push({
      slug: category.slug,
      before,
      after: {
        meta_title: category.meta_title,
        meta_desc: category.meta_desc,
      },
    });
  }
}

const products = readJson(productFile);
const productChanges = [];

for (const product of products) {
  if (!needsProductFix(product)) continue;

  const before = {
    meta_title: product.meta_title || '',
    meta_desc: product.meta_desc || '',
  };

  product.meta_title = buildProductTitle(product);
  product.meta_desc = buildProductDescription(product);

  productChanges.push({
    slug: product.slug,
    before,
    after: {
      meta_title: product.meta_title,
      meta_desc: product.meta_desc,
    },
  });
}

const posts = readJson(postFile);
const postChanges = [];

for (const post of posts) {
  if (!needsPostFix(post)) continue;

  const before = {
    meta_title: post.meta_title || '',
    meta_desc: post.meta_desc || '',
  };

  post.meta_title = buildPostTitle(post);

  postChanges.push({
    slug: post.slug,
    before,
    after: {
      meta_title: post.meta_title,
      meta_desc: post.meta_desc || '',
    },
  });
}

const pages = readJson(pageFile);
const pageChanges = [];

for (const page of pages) {
  if (!needsPageFix(page)) continue;

  const before = {
    meta_title: page.meta_title || '',
    meta_desc: page.meta_desc || '',
    noindex: page.noindex || false,
    nofollow: page.nofollow || false,
  };

  if (NOINDEX_PAGE_SLUGS.has(page.slug)) {
    page.noindex = true;
    page.nofollow = true;
  } else {
    page.meta_title = buildPageTitle(page);
    page.meta_desc = buildPageDescription(page);
    delete page.noindex;
    delete page.nofollow;
  }

  pageChanges.push({
    slug: page.slug,
    before,
    after: {
      meta_title: page.meta_title || '',
      meta_desc: page.meta_desc || '',
      noindex: page.noindex || false,
      nofollow: page.nofollow || false,
    },
  });
}

writeJson(categoryFile, categories);
writeJson(productFile, products);
writeJson(postFile, posts);
writeJson(pageFile, pages);

const report = {
  generatedAt: new Date().toISOString(),
  categoryChanges: categoryChanges.length,
  productChanges: productChanges.length,
  postChanges: postChanges.length,
  pageChanges: pageChanges.length,
  categories: categoryChanges,
  products: productChanges,
  posts: postChanges,
  pages: pageChanges,
};

fs.mkdirSync(path.dirname(reportFile), { recursive: true });
writeJson(reportFile, report);

console.log(`Updated ${categoryChanges.length} categories, ${productChanges.length} products, ${postChanges.length} posts, and ${pageChanges.length} pages.`);
console.log(`Wrote report to ${reportFile}`);
