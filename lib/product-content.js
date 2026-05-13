// SEO content generator for product detail pages.
//
// Given a WP product (title + category), this returns:
//   - the i18n key for the detected MATERIAL (or null)
//   - the i18n key for the detected category TEMPLATE
//   - an array of i18n keys for detected FEATURES
//
// The caller (ProductSEOSections in app/[locale]/products/[slug]/page.js)
// then maps these keys through `useTranslations('productContent')` so the
// actual rendered text is in the user's locale — not hardcoded English.
//
// All detection is keyword-based on the (English) product title, so the
// classification is locale-independent. Only the rendered strings change
// per locale.

import { stripHtml } from './wp-data';

// ── Material detection table ──────────────────────────────────────────
// `key` matches productContent.materials.{key}Name / .{key}Desc / .{key}BestFor
const MATERIAL_KEYS = [
  { key: 'bamboo',    keywords: ['bamboo'] },
  { key: 'acacia',    keywords: ['acacia'] },
  { key: 'walnut',    keywords: ['walnut', 'black walnut'] },
  { key: 'pine',      keywords: ['pine'] },
  { key: 'paulownia', keywords: ['paulownia'] },
  { key: 'oak',       keywords: ['oak'] },
  { key: 'beech',     keywords: ['beech'] },
  { key: 'rubber',    keywords: ['rubber wood', 'rubberwood'] },
  { key: 'teak',      keywords: ['teak'] },
  { key: 'sapele',    keywords: ['sapele'] },
  { key: 'mdf',       keywords: ['mdf'] },
  { key: 'plywood',   keywords: ['plywood'] },
];

// ── Category template detection table ─────────────────────────────────
// `key` matches productContent.templates.{key}Type / .{key}App1..4 / .{key}Faq{n}Q/A
// `faqCount` = how many template-specific FAQs exist in en.json for this key
const TEMPLATE_KEYS = [
  { key: 'cheeseBoard',  catSlugContains: 'cheese-board',  faqCount: 2,
    keywords: ['cheese board', 'charcuterie'] },
  { key: 'cuttingBoard', catSlugContains: 'cutting-board', faqCount: 1,
    keywords: ['cutting board', 'chopping board', 'bread board'] },
  { key: 'servingTray',  catSlugContains: 'serving-tray',  faqCount: 1,
    keywords: ['serving tray', 'sofa tray', 'breakfast tray', 'ottoman tray'] },
  { key: 'spiceRack',    catSlugContains: 'spice-rack',    faqCount: 1,
    keywords: ['spice rack', 'spice organizer'] },
  { key: 'jewelryBox',   catSlugContains: 'jewelry-box',   faqCount: 1,
    keywords: ['jewelry box', 'ring box'] },
  { key: 'wineBox',      catSlugContains: 'wine-box',      faqCount: 1,
    keywords: ['wine box', 'wine case'] },
  { key: 'teaBox',       catSlugContains: 'tea-box',       faqCount: 1,
    keywords: ['tea box', 'tea bag'] },
  { key: 'giftBox',      catSlugContains: 'gift-box',      faqCount: 1,
    keywords: ['gift box', 'keepsake box', 'memory box'] },
  { key: 'storageBox',   catSlugContains: 'storage-box',   faqCount: 1,
    keywords: ['storage box', 'organizer box', 'stash box'] },
];

const DEFAULT_TEMPLATE = { key: 'default', faqCount: 0 };

// ── Feature detection table ───────────────────────────────────────────
// Each entry's `key` matches productContent.features.{key}
const FEATURE_KEYS = [
  { key: 'drawer',       keywords: ['drawer', 'slide-out'] },
  { key: 'knifeSet',     keywords: ['knife set', 'with knives', '4 knives', '3 knives'] },
  { key: 'handle',       keywords: ['handle', 'with handles'] },
  { key: 'glassLid',     keywords: ['glass lid', 'glass cover', 'transparent lid'] },
  { key: 'magnetic',     keywords: ['magnetic'] },
  { key: 'hinged',       keywords: ['hinged', 'hinge'] },
  { key: 'slidingLid',   keywords: ['sliding lid', 'slide lid'] },
  { key: 'compartment',  keywords: ['compartment', 'divider', 'partition'] },
  { key: 'lock',         keywords: ['lock', 'clasp'] },
  { key: 'rotating',     keywords: ['rotating', 'lazy susan', 'spinning'] },
  { key: 'tiered',       keywords: ['tiered', 'multi-tier'] },
  { key: 'expandable',   keywords: ['expandable', 'adjustable'] },
  { key: 'wallMount',    keywords: ['wall mount', 'wall-mounted'] },
  { key: 'foodGrade',    keywords: ['food-grade', 'food safe', 'fda', 'lfgb'] },
  { key: 'customLogo',   keywords: ['custom logo', 'engraved', 'engraving'] },
  { key: 'ecoFriendly',  keywords: ['eco-friendly', 'sustainable', 'organic'] },
  { key: 'groove',       keywords: ['groove', 'juice channel', 'juice groove'] },
  { key: 'phoneSlot',    keywords: ['phone slot', 'phone holder'] },
  { key: 'cupHolder',    keywords: ['cup holder', 'beverage'] },
  { key: 'hidden',       keywords: ['hidden'] },
  { key: 'set',          keywords: ['set'] },
];

// ── Detectors ─────────────────────────────────────────────────────────

function detectMaterial(title) {
  const t = title.toLowerCase();
  for (const m of MATERIAL_KEYS) {
    if (m.keywords.some(kw => t.includes(kw))) return m;
  }
  return null;
}

function detectTemplate(title, productCategories) {
  const t = title.toLowerCase();
  const catSlugs = (productCategories || []).map(c => c.slug);
  for (const tpl of TEMPLATE_KEYS) {
    const titleHit = tpl.keywords.some(kw => t.includes(kw));
    const catHit   = catSlugs.some(c => c.includes(tpl.catSlugContains));
    if (titleHit || catHit) return tpl;
  }
  return DEFAULT_TEMPLATE;
}

function extractFeatureKeys(title) {
  const t = title.toLowerCase();
  const keys = [];
  for (const f of FEATURE_KEYS) {
    if (f.keywords.some(kw => t.includes(kw))) keys.push(f.key);
  }
  // Always pad to at least 3 with baseline features
  if (keys.length < 3) {
    keys.push('factoryDirect');
    keys.push('exportQc');
  }
  return keys.slice(0, 8);
}

// ── Main generator ────────────────────────────────────────────────────
// Returns: { title, materialKey, templateKey, templateFaqCount, featureKeys }
// All textual content is built by the caller via t(`productContent.*`).
export function generateProductContent(product) {
  const title = stripHtml(product.title || '');
  const material = detectMaterial(title);
  const template = detectTemplate(title, product.categories);
  const featureKeys = extractFeatureKeys(title);

  return {
    title,
    materialKey: material?.key || null,
    templateKey: template.key,
    templateFaqCount: template.faqCount,
    featureKeys,
  };
}

// ──────────────────────────────────────────────────────────────────────
// Clean existing WP content — strip Elementor cruft, broken HTML attrs,
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
