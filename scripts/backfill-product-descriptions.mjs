#!/usr/bin/env node
// One-off backfill — fill missing `excerpt` and `meta_desc` on products in
// wp-data/products.json so every product has a hero blurb and a Google SERP
// description. Uses the same material + template detection from
// lib/product-content.js (mirrored inline because that file is ESM-without-
// extensions and not loadable from pure Node).
//
// Run once. Idempotent: only touches products where the field is empty.
//   node scripts/backfill-product-descriptions.mjs

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ── Strip HTML so the meta_desc fallback isn't HTML noise ───────────
function stripHtml(html) {
  return String(html || '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, '–')
    .replace(/\s+/g, ' ')
    .trim();
}

// ── Material detection (mirror of lib/product-content.js) ───────────
const MATERIAL_NAMES = {
  bamboo:    'bamboo',
  acacia:    'acacia wood',
  walnut:    'black walnut',
  pine:      'pine wood',
  paulownia: 'paulownia',
  oak:       'oak wood',
  beech:     'beech wood',
  rubber:    'rubberwood',
  teak:      'teak wood',
  sapele:    'sapele',
  mdf:       'MDF veneer',
  plywood:   'plywood',
};
const MATERIAL_KW = [
  ['bamboo',    ['bamboo']],
  ['acacia',    ['acacia']],
  ['walnut',    ['walnut', 'black walnut']],
  ['pine',      ['pine']],
  ['paulownia', ['paulownia']],
  ['oak',       ['oak']],
  ['beech',     ['beech']],
  ['rubber',    ['rubber wood', 'rubberwood']],
  ['teak',      ['teak']],
  ['sapele',    ['sapele']],
  ['mdf',       ['mdf']],
  ['plywood',   ['plywood']],
];

// ── Product-type detection (mirror of lib/product-content.js) ───────
const TYPE_KW = [
  ['cheese board',  ['cheese board', 'charcuterie']],
  ['cutting board', ['cutting board', 'chopping board', 'bread board']],
  ['serving tray',  ['serving tray', 'sofa tray', 'breakfast tray', 'ottoman tray']],
  ['spice rack',    ['spice rack', 'spice organizer']],
  ['jewelry box',   ['jewelry box', 'ring box']],
  ['wine box',      ['wine box', 'wine case']],
  ['tea box',       ['tea box']],
  ['gift box',      ['gift box', 'keepsake box', 'memory box']],
  ['storage box',   ['storage box', 'organizer box', 'stash box']],
  ['coaster',       ['coaster']],
  ['tray',          ['tray']],
];

function detectMaterial(title) {
  const t = title.toLowerCase();
  for (const [key, kws] of MATERIAL_KW) {
    if (kws.some(kw => t.includes(kw))) return { key, name: MATERIAL_NAMES[key] };
  }
  return null;
}

function detectType(title, categories) {
  const t = title.toLowerCase();
  const cats = (categories || []).map(c => (c.slug || '').toLowerCase());
  for (const [type, kws] of TYPE_KW) {
    if (kws.some(kw => t.includes(kw))) return type;
  }
  // Fall back to category name
  if (cats.length > 0) {
    const slug = cats[0];
    if (slug.includes('tray'))   return 'tray';
    if (slug.includes('box'))    return 'box';
    if (slug.includes('board'))  return 'board';
    if (slug.includes('rack'))   return 'rack';
  }
  return 'wooden product';
}

// ── Templated description generators ────────────────────────────────
// Excerpt: 1-2 sentence "hero blurb" — short, punchy, keyword-rich.
// ~120-200 chars. Renders right under the H1 on the product page.
function buildExcerpt(title, material, productType) {
  const t = title;
  if (material) {
    return `<p>${t} — a premium ${productType} crafted from ${material.name}. Custom OEM manufacturing by CHIC: factory-direct, low MOQ, full branding, FBA-ready packaging.</p>`;
  }
  return `<p>${t} — custom OEM ${productType} by CHIC, a factory-direct wooden products manufacturer in China. Low MOQ, full branding, export-ready packaging.</p>`;
}

// Meta description: 150-160 chars optimized for Google SERP.
// Format: "{type} from CHIC: {material/value-prop} OEM wholesale, custom branding, low MOQ. Get a quote in 24h."
function buildMetaDesc(title, material, productType) {
  // Title can be very long for old CJ-dropshipping imports — clip to 70.
  const shortTitle = title.length > 70 ? title.slice(0, 67).trim() + '…' : title;
  if (material) {
    return `${shortTitle} — ${material.name} ${productType} by CHIC, OEM wholesale wooden products manufacturer in China. Custom branding, low MOQ, 24h quote.`.slice(0, 160);
  }
  return `${shortTitle} — custom OEM ${productType} by CHIC, wholesale wooden products manufacturer in China. Factory-direct pricing, low MOQ, 24h quote.`.slice(0, 160);
}

// ── Run ─────────────────────────────────────────────────────────────
async function run() {
  const file = path.join(ROOT, 'wp-data/products.json');
  const products = JSON.parse(await readFile(file, 'utf8'));

  let excerptFilled = 0, metaFilled = 0, untouched = 0;
  const filledList = [];

  for (const p of products) {
    const title = stripHtml(p.title || '');
    const material = detectMaterial(title);
    const productType = detectType(title, p.categories);

    const needExcerpt = !p.excerpt || p.excerpt.trim() === '';
    const needMeta    = !p.meta_desc || p.meta_desc.trim() === '';

    if (!needExcerpt && !needMeta) {
      untouched++;
      continue;
    }

    if (needExcerpt) {
      p.excerpt = buildExcerpt(title, material, productType);
      excerptFilled++;
    }
    if (needMeta) {
      p.meta_desc = buildMetaDesc(title, material, productType);
      metaFilled++;
    }
    filledList.push({ slug: p.slug, filled: [needExcerpt && 'excerpt', needMeta && 'meta_desc'].filter(Boolean) });
  }

  await writeFile(file, JSON.stringify(products, null, 2) + '\n');

  console.log(`✓ Done.`);
  console.log(`  Untouched (already complete):  ${untouched}`);
  console.log(`  Excerpts backfilled:           ${excerptFilled}`);
  console.log(`  meta_desc backfilled:          ${metaFilled}`);
  console.log(`  Products modified total:       ${filledList.length}`);
  console.log('');
  console.log('First 10 products touched:');
  filledList.slice(0, 10).forEach((p) => {
    console.log(`  - ${p.slug}  [${p.filled.join(', ')}]`);
  });
}

run().catch((e) => {
  console.error('✗ Error:', e.message);
  process.exit(1);
});
