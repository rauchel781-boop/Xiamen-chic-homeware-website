#!/usr/bin/env node
/**
 * build-product-i18n.mjs — assemble messages/products.{es,de,fr,ja}.json
 * from HAND-WRITTEN translations. No network, no API key, no cost.
 *
 * Why this exists: Aliyun machine translation (both the free and the paid
 * professional engine) mangles this catalogue's vocabulary. It rendered
 * "Pantry Bin" as "Papelera" (waste-paper basket) in Spanish and "Poubelle"
 * (rubbish bin) in French, and "chicken wire" as "alambre de pollo" /
 * "fil de poulet" / "Huehner-Draht" / a katakana transliteration. Those are
 * the H1 and <title> of 292 pages in four languages, so they get written by
 * hand instead.
 *
 * Inputs
 *   wp-data/products.json          source of truth for slug + English title
 *   i18n/product-titles.json       { slug: { es, de, fr, ja } }   hand-written
 *   i18n/overview-templates.json   sentence frames + glossaries    hand-written
 *
 * Output
 *   messages/products.<locale>.json   { slug: { title, overview, ...kept } }
 *   Existing keys other than title/overview are preserved untouched.
 *
 * Usage
 *   node scripts/build-product-i18n.mjs            build all four locales
 *   node scripts/build-product-i18n.mjs --check    verify only, write nothing
 */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LOCALES = ['es', 'de', 'fr', 'ja'];
const CHECK_ONLY = process.argv.includes('--check');

/* ---------------------------------------------------------------------------
 * These two tables MUST stay identical to detectMaterial() / detectTemplate()
 * in scripts/translate.mjs. If you edit one, edit the other — the overview
 * template chosen here has to match the English overview that page copy and
 * the English site are built from.
 * ------------------------------------------------------------------------- */
const MATERIALS = {
  bamboo: 'Bamboo', acacia: 'Acacia Wood', walnut: 'Black Walnut',
  pine: 'Pine Wood', paulownia: 'Paulownia', oak: 'Oak Wood',
  beech: 'Beech Wood', rubberwood: 'Rubberwood', teak: 'Teak',
  sapele: 'Sapele', mdf: 'MDF', plywood: 'Plywood',
};

const TEMPLATE_LOOKUPS = [
  ['cheese-board',  ['cheese board', 'charcuterie']],
  ['cutting-board', ['cutting board', 'chopping board', 'bread board']],
  ['serving-tray',  ['serving tray', 'sofa tray', 'breakfast tray', 'ottoman tray']],
  ['spice-rack',    ['spice rack', 'spice organizer']],
  ['jewelry-box',   ['jewelry box', 'ring box']],
  ['wine-box',      ['wine box', 'wine case']],
  ['tea-box',       ['tea box']],
  ['gift-box',      ['gift box', 'keepsake box', 'memory box']],
  ['storage-box',   ['storage box', 'organizer box', 'stash box']],
];

const stripHtml = (s) => String(s || '').replace(/<[^>]+>/g, '').trim();

function decodeEntities(s) {
  return String(s || '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;|&#x27;/gi, "'")
    .replace(/&nbsp;/g, ' ').replace(/&mdash;/g, '—').replace(/&ndash;/g, '–');
}

function detectMaterial(title) {
  const t = title.toLowerCase();
  for (const key of Object.keys(MATERIALS)) if (t.includes(key)) return MATERIALS[key];
  return null;
}

function detectTemplateKey(title, cats) {
  const t = title.toLowerCase();
  const catSlugs = (cats || []).map((c) => c.slug || '');
  for (const [key, kws] of TEMPLATE_LOOKUPS) {
    if (kws.some((kw) => t.includes(kw)) || catSlugs.some((c) => c.includes(key))) return key;
  }
  return 'default';
}

/**
 * Join the localized title to the type phrase. An em-dash reads well after a
 * plain title, but 161 of the 292 titles already carry an em-dash or a pipe —
 * a second one in the same line looks like a typo, so those get a full stop
 * and a capitalised type phrase instead.
 */
function buildLead(title, phrase) {
  if (/[—|]/.test(title)) return `${title}. ${phrase.charAt(0).toUpperCase()}${phrase.slice(1)}`;
  return `${title} — ${phrase}`;
}

function fill(frame, vars) {
  return frame.replace(/\{(\w+)\}/g, (m, k) => {
    if (!(k in vars)) throw new Error(`template placeholder {${k}} has no value`);
    return vars[k];
  });
}

const readJson = async (rel) => JSON.parse(await readFile(path.join(ROOT, rel), 'utf8'));

async function main() {
  const products = await readJson('wp-data/products.json');
  const titles   = await readJson('i18n/product-titles.json');
  const tpl      = await readJson('i18n/overview-templates.json');
  const overrides = tpl.typeOverrides || {};

  console.log(`Products in wp-data/products.json : ${products.length}`);
  console.log(`Slugs in i18n/product-titles.json : ${Object.keys(titles).length}`);
  console.log(`Type overrides applied            : ${Object.keys(overrides).length}`);

  const productSlugs = new Set(products.map((p) => p.slug));
  const orphans = Object.keys(titles).filter((s) => !productSlugs.has(s));
  if (orphans.length) {
    console.log(`\n! ${orphans.length} slug(s) in product-titles.json no longer exist in products.json:`);
    orphans.forEach((s) => console.log(`    ${s}`));
  }

  let hardFail = false;

  for (const locale of LOCALES) {
    const L = tpl[locale];
    if (!L) throw new Error(`overview-templates.json has no "${locale}" section`);

    const existing = await readJson(`messages/products.${locale}.json`).catch(() => ({}));
    const out = {};
    const missing = [];

    for (const p of products) {
      const enTitle = decodeEntities(stripHtml(p.title));
      const matKey  = detectMaterial(enTitle);
      const tplKey  = overrides[p.slug] || detectTemplateKey(enTitle, p.categories);

      const t = titles[p.slug]?.[locale];
      if (!t) { missing.push(p.slug); out[p.slug] = existing[p.slug] || undefined; continue; }

      const types = L.types[tplKey];
      const apps  = L.apps[tplKey];
      if (!types || !apps) throw new Error(`${locale}: no type/apps entry for template "${tplKey}"`);

      const material = matKey
        ? (L.materials[matKey] ?? (() => { throw new Error(`${locale}: no material "${matKey}"`); })())
        : null;

      // Japanese needs no joiner: its frame attaches the title with a particle.
      const lead = locale === 'ja'
        ? t
        : buildLead(t, material ? `${types.premium} ${material}` : types.custom);

      const overview = matKey
        ? fill(L.withMaterial, {
            lead, title: t, typePremium: types.premium, material,
            app0: apps[0], app1: apps[1], app2: apps[2],
          })
        : fill(L.noMaterial, {
            lead, title: t, typeCustom: types.custom, app0: apps[0], app1: apps[1],
          });

      out[p.slug] = { ...(existing[p.slug] || {}), title: t, overview };
    }

    for (const k of Object.keys(out)) if (out[k] === undefined) delete out[k];

    const done = Object.keys(out).length;
    console.log(`\n→ ${locale.toUpperCase()}: ${done}/${products.length} products have a title+overview`);
    if (missing.length) {
      hardFail = true;
      console.log(`  ! ${missing.length} still untranslated (kept whatever was there before):`);
      missing.slice(0, 12).forEach((s) => console.log(`      ${s}`));
      if (missing.length > 12) console.log(`      ... and ${missing.length - 12} more`);
    }

    if (!CHECK_ONLY) {
      await writeFile(
        path.join(ROOT, `messages/products.${locale}.json`),
        JSON.stringify(out, null, 2) + '\n'
      );
      console.log(`  ✓ wrote messages/products.${locale}.json`);
    }
  }

  console.log(CHECK_ONLY ? '\n(--check: nothing written)' : '\nDone.');
  if (hardFail) {
    console.log('\nSome products have no hand-written title yet. Re-run after filling them in.');
    process.exit(1);
  }
}

main().catch((e) => { console.error('\n✗', e.message); process.exit(1); });
