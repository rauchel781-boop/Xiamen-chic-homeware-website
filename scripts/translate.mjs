#!/usr/bin/env node
// Aliyun Machine Translation runner — translates JSON message files and
// product data from English → ES/DE/FR/JA using TranslateGeneral.
//
// Usage:
//   node scripts/translate.mjs test       # quick connection test
//   node scripts/translate.mjs ui         # translate messages/en.json → es/de/fr/ja
//   node scripts/translate.mjs products   # translate product titles + overviews
//
// AccessKey via env (ALI_AK_ID / ALI_AK_SECRET) or .env.local.
// Free quota: 1,000,000 chars/month for TranslateGeneral.
// Pricing past quota: ¥50 per 1M chars.
//
// Translations are cached in .translate-cache.json so re-runs are free.

import crypto from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// --- Load .env.local if present ---
try {
  const envText = await readFile(path.join(ROOT, '.env.local'), 'utf8');
  for (const line of envText.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
} catch {}

const AK_ID = process.env.ALI_AK_ID;
const AK_SECRET = process.env.ALI_AK_SECRET;
if (!AK_ID || !AK_SECRET) {
  console.error('Missing ALI_AK_ID / ALI_AK_SECRET. Set in .env.local or shell.');
  process.exit(1);
}

const ENDPOINT = 'https://mt.aliyuncs.com';
const ALL_LANGS = ['es', 'de', 'fr', 'ja'];
const CACHE_FILE = path.join(ROOT, '.translate-cache.json');

// ── Flags ───────────────────────────────────────────────────────────────
// Every content command is INCREMENTAL by default: it loads the existing
// messages/<file>.<lang>.json, translates only the entries that are missing,
// and merges. That is deliberate. The old behaviour rebuilt each file from
// scratch and overwrote it, so a single run cost the full corpus — which is
// why products.*.json sat untouched from 28 May while the catalogue grew by
// 92 products, and every one of those shipped an English page on a /es/,
// /de/, /fr/ or /ja/ URL.
//
//   --all          retranslate everything, not just what is missing
//   --limit=N      stop after N items per language (stay inside the quota)
//   --langs=es,de  restrict to some locales
//   --dry-run      report what WOULD be sent, call nothing
const FLAGS = Object.fromEntries(
  process.argv.slice(3)
    .filter((a) => a.startsWith('--'))
    .map((a) => {
      const [k, v] = a.replace(/^--/, '').split('=');
      return [k, v === undefined ? true : v];
    })
);
const ONLY_MISSING = !FLAGS.all;

// ── Engine ──────────────────────────────────────────────────────────────
// Two Aliyun engines, and the difference matters a lot for this catalogue.
//
//   general (default)  Action TranslateGeneral, Scene 'general'. Free tier,
//                      1M chars/month. Tuned for everyday prose. It does not
//                      know product vocabulary: "chicken wire door" came back
//                      as "poulet fil porte" in French and "Hühner draht tür"
//                      in German — literally "chicken thread door", with the
//                      German compound noun split into three lowercase words.
//
//   --pro              Action Translate, Scene 'title' or 'description'. The
//                      paid professional edition — 60 CNY per million chars,
//                      with its own separate 1M free chars/month. Trained on
//                      e-commerce titles and descriptions, so product terms
//                      survive.
//
// Professional edition has to be enabled separately in the Aliyun console;
// enabling the general edition does not enable it. Run
// `translate.mjs test --pro` first to confirm the account can call it.
const PRO = !!FLAGS.pro;
// --slugs=a,b,c restricts a run to named entries. Needed because --all is
// too blunt: re-running every blog post through the professional engine is
// 5.5M characters, while redoing the nine posts that the general engine
// produced is about 600k.
const ONLY_SLUGS = FLAGS.slugs
  ? new Set(String(FLAGS.slugs).split(',').map((x) => x.trim()).filter(Boolean))
  : null;
// Scene for the call currently in flight. Commands set it around their loops
// so titles get the title model and body copy gets the description model.
let SCENE = 'description';
function withScene(scene, fn) {
  const prev = SCENE;
  SCENE = scene;
  return Promise.resolve(fn()).finally(() => { SCENE = prev; });
}
const LIMIT   = FLAGS.limit ? parseInt(FLAGS.limit, 10) : Infinity;
const DRY_RUN = !!FLAGS['dry-run'];

const LANGS = FLAGS.langs
  ? String(FLAGS.langs).split(',').map((x) => x.trim()).filter((x) => ALL_LANGS.includes(x))
  : ALL_LANGS;

async function loadExisting(file) {
  try {
    return JSON.parse(await readFile(path.join(ROOT, file), 'utf8'));
  } catch {
    return {};
  }
}

// One place that decides whether an entry still needs work, so every command
// agrees on what "already translated" means.
function needsWork(existing, slug, fields) {
  if (ONLY_SLUGS) return ONLY_SLUGS.has(slug);
  if (!ONLY_MISSING) return true;
  const e = existing[slug];
  if (!e) return true;
  return fields.some((f) => !e[f]);
}

// --- Cache ---
let cache = {};
try {
  cache = JSON.parse(await readFile(CACHE_FILE, 'utf8'));
} catch {}

async function saveCache() {
  await writeFile(CACHE_FILE, JSON.stringify(cache, null, 2));
}

// --- Aliyun RPC v1.0 signature ---
// Encode per RFC 3986 (Aliyun spec is strict about + → %20, * → %2A, etc.).
function percentEncode(str) {
  return encodeURIComponent(str)
    .replace(/\+/g, '%20')
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A');
}

function isoTime() {
  // Aliyun wants ISO 8601 UTC without milliseconds: 2026-05-11T12:34:56Z
  return new Date().toISOString().replace(/\.\d+/, '');
}

async function translateOne(text, source, target) {
  if (!text || typeof text !== 'string' || !text.trim()) return text;
  // Both editions cap a request at 5,000 characters. Text nodes are normally
  // far shorter, but a WP body can carry one enormous paragraph, so split on
  // sentence boundaries rather than letting the call fail.
  if (text.length > 4500) {
    const parts = text.match(/[\s\S]{1,4000}(?:[.!?。！？]\s|$)/g) || [text.slice(0, 4000)];
    const out = [];
    for (const part of parts) out.push(await translateOne(part, source, target));
    return out.join('');
  }

  // Professional edition uses Action=Translate with a vertical Scene;
  // the free general edition uses Action=TranslateGeneral with Scene=general.
  // Everything else about the request — signing, encoding, response shape —
  // is identical, so only these three fields change.
  const params = {
    AccessKeyId: AK_ID,
    Action: PRO ? 'Translate' : 'TranslateGeneral',
    Format: 'JSON',
    FormatType: 'text',
    Scene: PRO ? SCENE : 'general',
    SignatureMethod: 'HMAC-SHA1',
    SignatureNonce: crypto.randomBytes(16).toString('hex'),
    SignatureVersion: '1.0',
    SourceLanguage: source,
    SourceText: text,
    TargetLanguage: target,
    Timestamp: isoTime(),
    Version: '2018-10-12',
  };

  const sortedKeys = Object.keys(params).sort();
  const canonicalQuery = sortedKeys
    .map((k) => `${percentEncode(k)}=${percentEncode(params[k])}`)
    .join('&');

  const stringToSign = `POST&${percentEncode('/')}&${percentEncode(canonicalQuery)}`;
  const signature = crypto
    .createHmac('sha1', AK_SECRET + '&')
    .update(stringToSign)
    .digest('base64');

  const body = `Signature=${percentEncode(signature)}&${canonicalQuery}`;

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  const data = await res.json();
  if (data.Code && data.Code !== '200') {
    throw new Error(
      `Aliyun [${data.Code}] ${data.Message || ''} — for "${text.slice(0, 60)}…"`
    );
  }
  if (!data.Data || !data.Data.Translated) {
    throw new Error(`Aliyun bad response: ${JSON.stringify(data).slice(0, 200)}`);
  }
  return data.Data.Translated;
}

async function tr(text, target, source = 'en') {
  if (!text || typeof text !== 'string') return text;
  // The engine and scene are part of the key: a general-edition result must
  // not be served back when the caller asked for the professional one.
  const key = PRO ? `pro:${SCENE}|${source}|${target}|${text}` : `${source}|${target}|${text}`;
  if (cache[key] != null) return cache[key];

  // Retry once on transient errors
  let lastErr;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const translated = await translateOne(text, source, target);
      cache[key] = translated;
      billedChars += text.length;
      return translated;
    } catch (e) {
      lastErr = e;
      if (attempt === 0) {
        await new Promise((r) => setTimeout(r, 800));
      }
    }
  }
  throw lastErr;
}

// Recursively translate all string leaves in a JSON-like object.
async function translateJson(obj, target, onProgress) {
  if (typeof obj === 'string') {
    const out = await tr(obj, target);
    onProgress?.();
    return out;
  }
  if (Array.isArray(obj)) {
    const out = [];
    for (const v of obj) out.push(await translateJson(v, target, onProgress));
    return out;
  }
  if (obj && typeof obj === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      out[k] = await translateJson(v, target, onProgress);
    }
    return out;
  }
  return obj;
}

// ============================================================================
// COMMANDS
// ============================================================================

async function cmdTest() {
  console.log(`Testing Aliyun connection — engine: ${PRO ? 'PROFESSIONAL (Translate)' : 'general (TranslateGeneral)'}`);
  if (PRO) console.log('If this fails with a permission error, the professional edition is not enabled on the account.\n');

  // Deliberately the phrases the free engine mangled: "chicken wire" came
  // back as chicken + thread in three languages, and German compound nouns
  // were split into separate lowercase words. If the professional engine
  // gets these right, it is worth re-running the catalogue through it.
  const samples = [
    ['title', 'Wall Mounted Wooden Spice Cabinet with Chicken Wire Door'],
    ['title', 'Acacia Stackable Pantry Bin with Lid'],
    ['description', 'The removable dividers sit in routed slots, so the layout can be changed without tools.'],
  ];
  for (const [scene, text] of samples) {
    console.log(`\n[${scene}] ${text}`);
    for (const lang of LANGS) {
      const out = await withScene(scene, () => translateOne(text, 'en', lang));
      console.log(`  ${lang.toUpperCase()}: ${out}`);
    }
  }
  console.log('\n✓ Connection works.');
}

async function cmdUi() {
  const en = JSON.parse(await readFile(path.join(ROOT, 'messages/en.json'), 'utf8'));
  const totalStrings = countStrings(en);
  console.log(`Source has ${totalStrings} strings × ${LANGS.length} languages = ${totalStrings * LANGS.length} translations.\n`);

  for (const lang of LANGS) {
    process.stdout.write(`→ ${lang.toUpperCase()}: `);
    let n = 0;
    const out = await translateJson(en, lang, () => {
      n++;
      process.stdout.write(`\r→ ${lang.toUpperCase()}: ${n}/${totalStrings}`);
    });
    await writeFile(
      path.join(ROOT, `messages/${lang}.json`),
      JSON.stringify(out, null, 2) + '\n'
    );
    await saveCache();
    console.log(`  ✓ messages/${lang}.json`);
  }
  console.log('\n✓ UI translation done.');
}

function countStrings(obj) {
  if (typeof obj === 'string') return 1;
  if (Array.isArray(obj)) return obj.reduce((a, v) => a + countStrings(v), 0);
  if (obj && typeof obj === 'object') {
    return Object.values(obj).reduce((a, v) => a + countStrings(v), 0);
  }
  return 0;
}

// Surgical: translate ONE OR MORE top-level namespaces and merge into
// existing locale JSONs without touching any other keys. Use this when
// you've added a new namespace (e.g., privacy, terms, productContent)
// and don't want to retranslate (and potentially overwrite manual fixes
// in) the rest of the file.
//
// Usage:
//   node scripts/translate.mjs namespace productContent
//   node scripts/translate.mjs namespace privacy terms
async function cmdNamespace(names) {
  if (!names || names.length === 0) {
    throw new Error('Usage: node scripts/translate.mjs namespace <ns1> [ns2 ...]');
  }
  const en = JSON.parse(await readFile(path.join(ROOT, 'messages/en.json'), 'utf8'));

  // Validate all namespaces exist before we hit the API
  for (const name of names) {
    if (!en[name]) {
      throw new Error(`en.json has no top-level key \`${name}\`.`);
    }
  }

  const total = names.reduce((a, name) => a + countStrings(en[name]), 0);
  console.log(`Translating [${names.join(', ')}]: ${total} strings × ${LANGS.length} languages = ${total * LANGS.length} translations.\n`);

  for (const lang of LANGS) {
    process.stdout.write(`→ ${lang.toUpperCase()}: `);
    let n = 0;
    const onProgress = () => {
      n++;
      process.stdout.write(`\r→ ${lang.toUpperCase()}: ${n}/${total}`);
    };

    // Translate each namespace separately
    const translated = {};
    for (const name of names) {
      translated[name] = await translateJson(en[name], lang, onProgress);
    }

    // Merge into the existing locale json — preserve everything else
    const existingPath = path.join(ROOT, `messages/${lang}.json`);
    const existing = JSON.parse(await readFile(existingPath, 'utf8'));
    for (const name of names) {
      existing[name] = translated[name];
    }
    await writeFile(existingPath, JSON.stringify(existing, null, 2) + '\n');
    await saveCache();
    console.log(`  ✓ messages/${lang}.json (merged: ${names.join(', ')})`);
  }
  console.log('\n✓ Namespace translation done.');
}

// Backward-compat shim: `productContent` still works as a standalone command.
async function cmdProductContent() {
  return cmdNamespace(['productContent']);
}

// ── Inline overview generator ─────────────────────────────────────────
// Mirror of lib/product-content.js — kept inline because that file is
// ESM-without-extensions (works in Next.js webpack, but not in pure Node).
const MATERIALS_TR = {
  bamboo: 'Bamboo',
  acacia: 'Acacia Wood',
  walnut: 'Black Walnut',
  pine: 'Pine Wood',
  paulownia: 'Paulownia',
  oak: 'Oak Wood',
  beech: 'Beech Wood',
  rubberwood: 'Rubberwood',
  teak: 'Teak',
  sapele: 'Sapele',
  mdf: 'MDF',
  plywood: 'Plywood',
};

const TEMPLATES_TR = {
  'cheese-board': { productType: 'cheese board', apps: ['charcuterie service', 'wine and cheese events', 'gift sets'] },
  'cutting-board': { productType: 'cutting board', apps: ['daily kitchen prep', 'butcher and food service', 'gift programs'] },
  'serving-tray': { productType: 'serving tray', apps: ['breakfast in bed', 'café and restaurant service', 'home decor'] },
  'spice-rack': { productType: 'spice rack', apps: ['countertop organization', 'cabinet storage', 'restaurant kitchens'] },
  'jewelry-box': { productType: 'jewelry box', apps: ['retail jewelry display', 'bridal gift packaging', 'personal storage'] },
  'wine-box': { productType: 'wine box', apps: ['premium wine gift packaging', 'cellar storage', 'corporate gifts'] },
  'tea-box': { productType: 'tea box', apps: ['loose-leaf tea brand packaging', 'tea bag organizer', 'café service'] },
  'gift-box': { productType: 'gift box', apps: ['retail gift packaging', 'corporate gifts', 'wedding and event favors'] },
  'storage-box': { productType: 'storage box', apps: ['home organization', 'closet and pantry storage', 'retail display'] },
  'default': { productType: 'wooden product', apps: ['premium retail and brand packaging', 'hospitality and commercial use', 'gift and promotional programs'] },
};

function stripHtml(html) {
  return String(html || '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
}

function detectMaterial(title) {
  const t = title.toLowerCase();
  for (const key of Object.keys(MATERIALS_TR)) {
    if (t.includes(key)) return MATERIALS_TR[key];
  }
  return null;
}

function detectTemplate(title, cats) {
  const t = title.toLowerCase();
  const catSlugs = (cats || []).map(c => c.slug || '');
  const lookups = [
    ['cheese-board', ['cheese board', 'charcuterie']],
    ['cutting-board', ['cutting board', 'chopping board', 'bread board']],
    ['serving-tray', ['serving tray', 'sofa tray', 'breakfast tray', 'ottoman tray']],
    ['spice-rack', ['spice rack', 'spice organizer']],
    ['jewelry-box', ['jewelry box', 'ring box']],
    ['wine-box', ['wine box', 'wine case']],
    ['tea-box', ['tea box']],
    ['gift-box', ['gift box', 'keepsake box', 'memory box']],
    ['storage-box', ['storage box', 'organizer box', 'stash box']],
  ];
  for (const [tplKey, kws] of lookups) {
    if (kws.some(kw => t.includes(kw)) || catSlugs.some(c => c.includes(tplKey))) {
      return TEMPLATES_TR[tplKey];
    }
  }
  return TEMPLATES_TR.default;
}

function buildOverview(product) {
  const title = stripHtml(product.title || '');
  const materialName = detectMaterial(title);
  const tpl = detectTemplate(title, product.categories);

  if (materialName) {
    return `The ${title} is a premium ${tpl.productType} crafted from ${materialName.toLowerCase()}, designed for ${tpl.apps[0]} and beyond. Manufactured by CHIC — a factory-direct wooden products manufacturer in China — this piece combines traditional craftsmanship with modern production techniques to deliver consistent quality at wholesale volumes. Whether you're sourcing for ${tpl.apps[1]} or ${tpl.apps[2]}, we support full OEM customization including custom size, finish, logo branding, and private label packaging.`;
  }
  return `The ${title} is a custom ${tpl.productType} manufactured by CHIC, a wooden products manufacturer in China specializing in OEM and private label production for global brands. Designed for ${tpl.apps[0]} and ${tpl.apps[1]}, this piece is fully customizable — size, material, finish, logo, and packaging — to fit your retail program, gift line, or hospitality account.`;
}

async function cmdProducts() {
  const products = JSON.parse(
    await readFile(path.join(ROOT, 'wp-data/products.json'), 'utf8')
  );
  console.log(`Loaded ${products.length} products from wp-data/products.json.`);
  console.log(ONLY_MISSING
    ? 'Mode: incremental (only products with no translation yet). Pass --all to redo everything.'
    : 'Mode: FULL retranslation of every product.');

  for (const lang of LANGS) {
    const out = await loadExisting(`messages/products.${lang}.json`);
    const todo = products.filter((p) => needsWork(out, p.slug, ['title', 'overview']));
    const batch = todo.slice(0, LIMIT);
    console.log(`\n→ ${lang.toUpperCase()}: ${todo.length} missing` +
      (batch.length < todo.length ? `, doing ${batch.length} this run (--limit)` : ''));
    if (DRY_RUN) { console.log('  (dry run, nothing sent)'); continue; }
    if (batch.length === 0) { console.log('  ✓ nothing to do'); continue; }

    let i = 0;
    for (const p of batch) {
      i++;
      const title = stripHtml(p.title || '');
      const overview = buildOverview(p);
      out[p.slug] = {
        ...(out[p.slug] || {}),
        title: title ? await withScene('title', () => tr(title, lang)) : '',
        overview: overview ? await withScene('description', () => tr(overview, lang)) : '',
      };
      process.stdout.write(`\r  ${i}/${batch.length}`);
      if (i % 10 === 0) {
        await saveCache();
        await writeFile(path.join(ROOT, `messages/products.${lang}.json`),
          JSON.stringify(out, null, 2) + '\n');
      }
    }
    await writeFile(path.join(ROOT, `messages/products.${lang}.json`),
      JSON.stringify(out, null, 2) + '\n');
    await saveCache();
    console.log(`\n  ✓ messages/products.${lang}.json (${Object.keys(out).length} entries)`);
  }
  console.log('\n✓ Product title/overview translation done.');
}

// ── Product body copy ───────────────────────────────────────────────────
// The imported WP body ("More about this product") has never been translated
// in any locale — localizeProduct only ever merged title and overview. On a
// localized page that left the longest block of text on the page in English,
// which is a large part of why Google treats the /es/, /de/, /fr/ and /ja/
// product URLs as duplicates of the English one.
//
// The body is HTML, so it goes through trBlogContent(): the same smart-parse
// path the blog uses, which translates text nodes and alt attributes and
// leaves tags, block comments and image paths alone.
//
// This is by far the most expensive command in the file — roughly 134k words
// of English source, so about 4x that across the four locales. Run it with
// --limit and --langs, a slice at a time, and watch the quota.
async function cmdBodies() {
  const products = JSON.parse(
    await readFile(path.join(ROOT, 'wp-data/products.json'), 'utf8')
  );
  const withBody = products.filter((p) => String(p.content || '').trim().length > 0);
  console.log(`${withBody.length} of ${products.length} products have body copy.`);
  console.log(ONLY_MISSING
    ? 'Mode: incremental (only bodies not translated yet).'
    : 'Mode: FULL retranslation of every body.');

  for (const lang of LANGS) {
    const out = await loadExisting(`messages/products.${lang}.json`);
    const todo = withBody.filter((p) => needsWork(out, p.slug, ['content']));
    const batch = todo.slice(0, LIMIT);
    const chars = batch.reduce((a, p) => a + String(p.content).length, 0);
    console.log(`\n→ ${lang.toUpperCase()}: ${todo.length} missing` +
      (batch.length < todo.length ? `, doing ${batch.length} this run (--limit)` : '') +
      ` — about ${(chars / 1000).toFixed(0)}k source chars`);
    if (DRY_RUN) { console.log('  (dry run, nothing sent)'); continue; }
    if (batch.length === 0) { console.log('  ✓ nothing to do'); continue; }

    let i = 0;
    for (const p of batch) {
      i++;
      try {
        out[p.slug] = {
          ...(out[p.slug] || {}),
          content: await withScene('description', () => trBlogContent(p.content, lang)),
        };
      } catch (e) {
        console.error(`\n  ✗ Failed body "${p.slug}": ${e.message}`);
        await writeFile(path.join(ROOT, `messages/products.${lang}.json`),
          JSON.stringify(out, null, 2) + '\n');
        await saveCache();
        throw e;
      }
      process.stdout.write(`\r  ${i}/${batch.length} | billed ${(billedChars / 1000).toFixed(0)}k chars`);
      if (i % 5 === 0) {
        await saveCache();
        await writeFile(path.join(ROOT, `messages/products.${lang}.json`),
          JSON.stringify(out, null, 2) + '\n');
      }
    }
    await writeFile(path.join(ROOT, `messages/products.${lang}.json`),
      JSON.stringify(out, null, 2) + '\n');
    await saveCache();
    console.log(`\n  ✓ messages/products.${lang}.json`);
  }
  console.log('\n✓ Product body translation done.');
}

// ── Product categories ──────────────────────────────────────────────────
// Categories had no translation pipeline at all, which meant 53 category
// pages x 4 locales rendered an English <h1> and description inside
// translated chrome. The four messages/categories.<lang>.json files were
// written by hand; this command exists so a category added later does not
// silently fall back to English again.
//
// It is incremental and it will NOT overwrite an existing entry unless you
// pass --all. Do not pass --all casually: it replaces hand-written copy with
// machine output.
async function cmdCategories() {
  const cats = JSON.parse(
    await readFile(path.join(ROOT, 'wp-data/product_categories.json'), 'utf8')
  ).filter((c) => c.slug !== 'uncategorized');
  console.log(`Loaded ${cats.length} categories.`);
  // The four category files were written by hand and read better than any
  // engine output, so --all alone is not enough to clobber them.
  if (!ONLY_MISSING && !ONLY_SLUGS && !FLAGS.force) {
    console.error('\n✗ --all on categories would replace hand-written translations with machine output.');
    console.error('  If that is really what you want, add --force. To redo a few, use --slugs=a,b,c.\n');
    process.exit(1);
  }

  for (const lang of LANGS) {
    const out = await loadExisting(`messages/categories.${lang}.json`);
    const todo = cats.filter((c) => needsWork(out, c.slug, ['name', 'description']));
    const batch = todo.slice(0, LIMIT);
    console.log(`\n→ ${lang.toUpperCase()}: ${todo.length} missing`);
    if (DRY_RUN) { console.log('  (dry run, nothing sent)'); continue; }
    if (batch.length === 0) { console.log('  ✓ nothing to do'); continue; }

    let i = 0;
    for (const c of batch) {
      i++;
      const name = stripHtml(c.name || '');
      const desc = String(c.description || '');
      const metaTitle = stripHtml(c.meta_title || '');
      out[c.slug] = {
        ...(out[c.slug] || {}),
        name: name ? await withScene('title', () => tr(name, lang)) : '',
        description: desc ? await withScene('description', () => trHtml(desc, lang)) : '',
        ...(metaTitle ? { meta_title: await withScene('title', () => tr(metaTitle, lang)) } : {}),
      };
      process.stdout.write(`\r  ${i}/${batch.length}`);
      if (i % 10 === 0) await saveCache();
    }
    await writeFile(path.join(ROOT, `messages/categories.${lang}.json`),
      JSON.stringify(out, null, 2) + '\n');
    await saveCache();
    console.log(`\n  ✓ messages/categories.${lang}.json (${Object.keys(out).length} entries)`);
  }
  console.log('\n✓ Category translation done.');
}

// ============================================================================
// BLOG TRANSLATION — smart parse mode
// ============================================================================
// WP blog content is ~60% noise (block comments, class attributes, structural
// tags). Sending it raw to Aliyun would cost ~¥300. Instead, we extract just
// the user-visible text inside leaf block elements (<p>, <h1-6>, <li>,
// <blockquote>, <figcaption>) and translate only those. Inline tags
// (<strong>, <a>, <em>) within a leaf are preserved via HTML mode.
//
// Cost reduction vs. naive HTML translation: roughly 60-70%.

// Track actual chars billed (sent as source) for transparency
let billedChars = 0;

const MAX_CHUNK = 4000;

function chunkHtml(html, maxLen = MAX_CHUNK) {
  if (!html) return [];
  if (html.length <= maxLen) return [html];
  const blocks = html.split(/\n\n+/);
  const chunks = [];
  let current = '';
  for (const block of blocks) {
    if (current && current.length + block.length + 2 > maxLen) {
      chunks.push(current);
      current = block;
    } else {
      current = current ? current + '\n\n' + block : block;
    }
    // Hard split if a single block is too big — fall back to <p> boundaries
    while (current.length > maxLen) {
      let cut = current.lastIndexOf('</p>', maxLen);
      if (cut < maxLen / 2) cut = current.lastIndexOf('. ', maxLen);
      if (cut < maxLen / 2) cut = maxLen;
      else cut += 4; // include </p>
      chunks.push(current.slice(0, cut));
      current = current.slice(cut);
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

async function translateOneHtml(text, source, target) {
  if (!text || !text.trim()) return text;
  const params = {
    AccessKeyId: AK_ID,
    Action: 'TranslateGeneral',
    Format: 'JSON',
    FormatType: 'html',
    Scene: 'general',
    SignatureMethod: 'HMAC-SHA1',
    SignatureNonce: crypto.randomBytes(16).toString('hex'),
    SignatureVersion: '1.0',
    SourceLanguage: source,
    SourceText: text,
    TargetLanguage: target,
    Timestamp: isoTime(),
    Version: '2018-10-12',
  };
  const sortedKeys = Object.keys(params).sort();
  const canonicalQuery = sortedKeys
    .map((k) => `${percentEncode(k)}=${percentEncode(params[k])}`).join('&');
  const stringToSign = `POST&${percentEncode('/')}&${percentEncode(canonicalQuery)}`;
  const signature = crypto.createHmac('sha1', AK_SECRET + '&').update(stringToSign).digest('base64');
  const body = `Signature=${percentEncode(signature)}&${canonicalQuery}`;
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const data = await res.json();
  if (data.Code && data.Code !== '200') {
    throw new Error(`Aliyun [${data.Code}] ${data.Message || ''}`);
  }
  return data.Data.Translated;
}

async function trHtml(html, target, source = 'en') {
  if (!html || typeof html !== 'string') return html;
  const cacheKey = `html|${source}|${target}|${html.slice(0, 200)}|${html.length}`;
  if (cache[cacheKey]) return cache[cacheKey];

  const chunks = chunkHtml(html);
  const translated = [];
  for (const chunk of chunks) {
    const chunkKey = `html|${source}|${target}|${chunk}`;
    if (cache[chunkKey]) {
      translated.push(cache[chunkKey]);
    } else {
      let lastErr;
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const out = await translateOneHtml(chunk, source, target);
          cache[chunkKey] = out;
          billedChars += chunk.length;
          translated.push(out);
          lastErr = null;
          break;
        } catch (e) {
          lastErr = e;
          if (attempt === 0) await new Promise((r) => setTimeout(r, 800));
        }
      }
      if (lastErr) throw lastErr;
    }
  }
  const final = translated.join('\n\n');
  cache[cacheKey] = final;
  return final;
}

// ── Leaf-block extraction ─────────────────────────────────────────────
// Find the innermost text-bearing elements. If <li> contains <p>, only the
// <p> is a "leaf"; the <li> is skipped (its content is covered by the <p>).
const TEXT_TAGS = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'blockquote', 'figcaption', 'td', 'th'];

function findLeafBlocks(html) {
  const matches = [];
  for (const tag of TEXT_TAGS) {
    const re = new RegExp(`<${tag}\\b([^>]*)>([\\s\\S]*?)<\\/${tag}>`, 'gi');
    let m;
    while ((m = re.exec(html)) !== null) {
      const fullStart = m.index;
      const fullEnd = m.index + m[0].length;
      // Position of inner content
      const openTagLen = m[0].indexOf('>') + 1;
      const closeTagLen = `</${tag}>`.length;
      const innerStart = fullStart + openTagLen;
      const innerEnd = fullEnd - closeTagLen;
      matches.push({
        start: fullStart,
        end: fullEnd,
        innerStart,
        innerEnd,
        inner: html.slice(innerStart, innerEnd),
        tag,
      });
    }
  }
  // Keep only leaf matches — those that contain no other match strictly inside
  return matches.filter((a) =>
    !matches.some((b) =>
      b !== a && b.start >= a.start && b.end <= a.end && (b.start > a.start || b.end < a.end)
    )
  );
}

// Strip noise attributes that don't affect translation: class, id, style,
// data-*, aria-*. These can be 30-50% of an inline tag's character footprint
// in WordPress blog content — pure overhead for translation billing.
function stripNoiseAttrs(html) {
  return html
    // Strip class="...", id="...", style="...", data-*="...", aria-*="..."
    .replace(/\s+(class|id|style)\s*=\s*"[^"]*"/gi, '')
    .replace(/\s+(class|id|style)\s*=\s*'[^']*'/gi, '')
    .replace(/\s+(data|aria)-[\w-]+\s*=\s*"[^"]*"/gi, '')
    .replace(/\s+(data|aria)-[\w-]+\s*=\s*'[^']*'/gi, '')
    // Collapse whitespace inside tags but not in content
    .replace(/<(\w+)\s+>/g, '<$1>');
}

// Smart blog content translation — only the text inside leaf blocks is sent
// to Aliyun. Noise attributes (class, data-*, etc.) are stripped first so we
// don't pay to translate "wp-block-heading" five thousand times.
async function trBlogContent(html, target, source = 'en') {
  if (!html || typeof html !== 'string') return html;

  // Cache whole-content keyed on hash to make re-runs free
  const contentHash = crypto.createHash('md5').update(`${source}|${target}|${html}`).digest('hex');
  const cacheKey = `blogContent|${contentHash}`;
  if (cache[cacheKey]) return cache[cacheKey];

  const leafs = findLeafBlocks(html);
  // Sort by innerStart DESC so we can replace from end to beginning
  leafs.sort((a, b) => b.innerStart - a.innerStart);

  let result = html;
  for (const leaf of leafs) {
    const inner = leaf.inner;
    const trimmed = inner.trim();
    if (trimmed.length === 0 || !/[A-Za-z]/.test(trimmed)) continue;

    const leading = inner.match(/^\s*/)[0];
    const trailing = inner.match(/\s*$/)[0];
    const core = inner.slice(leading.length, inner.length - trailing.length);

    // CRITICAL: strip noise attrs before sending to Aliyun.
    // Output will have clean tags too (acceptable — these attrs are
    // WordPress internal metadata, not user-visible styling).
    const cleanedCore = stripNoiseAttrs(core);

    let translated;
    if (/<[^>]+>/.test(cleanedCore)) {
      translated = await trHtml(cleanedCore, target, source);
    } else {
      translated = await tr(cleanedCore, target, source);
    }

    result =
      result.slice(0, leaf.innerStart) +
      leading + translated + trailing +
      result.slice(leaf.innerEnd);
  }

  // Translate image alt= attributes (SEO win)
  result = await translateAltAttrs(result, target, source);

  cache[cacheKey] = result;
  return result;
}

async function translateAltAttrs(html, target, source = 'en') {
  // Find all alt="..." with translatable content
  const re = /\balt="([^"]*)"/g;
  const replacements = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    const txt = m[1].trim();
    if (txt.length > 0 && /[A-Za-z]/.test(txt)) {
      replacements.push({ start: m.index, end: m.index + m[0].length, text: m[1] });
    }
  }
  // Replace from end to start
  replacements.sort((a, b) => b.start - a.start);
  let result = html;
  for (const r of replacements) {
    const tr_ = await tr(r.text, target, source);
    result = result.slice(0, r.start) + `alt="${tr_}"` + result.slice(r.end);
  }
  return result;
}

// Translate a faq[] array: question as plain text, answer as HTML so the
// <p> wrapper is preserved. Cached per string like everything else.
async function translateFaq(faq, target, source = 'en') {
  const out = [];
  for (const item of faq) {
    if (!item) { out.push(item); continue; }
    const q = item.q ? await tr(String(item.q), target, source) : item.q;
    const a = item.a ? await trHtml(String(item.a), target, source) : item.a;
    out.push({ q, a });
  }
  return out;
}

async function cmdBlogs() {
  const posts = JSON.parse(
    await readFile(path.join(ROOT, 'wp-data/posts.json'), 'utf8')
  );
  console.log(`Loaded ${posts.length} blog posts. Using smart-parse mode.`);
  console.log(ONLY_MISSING
    ? 'Mode: incremental (only posts with no translation yet). Pass --all to redo everything.\n'
    : 'Mode: FULL retranslation of every post.\n');

  for (const lang of LANGS) {
    const out = await loadExisting(`messages/blogs.${lang}.json`);
    const todo = posts.filter((p) => needsWork(out, p.slug, ['title', 'content']));
    const batch = todo.slice(0, LIMIT);
    console.log(`→ ${lang.toUpperCase()}: ${todo.length} missing` +
      (batch.length < todo.length ? `, doing ${batch.length} this run (--limit)` : ''));
    if (DRY_RUN) { console.log('  (dry run, nothing sent)'); continue; }
    if (batch.length === 0) { console.log('  ✓ nothing to do'); continue; }
    let i = 0;
    const startBilled = billedChars;
    for (const p of batch) {
      i++;
      const title = String(p.title || '').replace(/<[^>]+>/g, '').trim();
      const excerpt = String(p.excerpt || '').replace(/<[^>]+>/g, '').trim();
      const content = p.content || '';
      const metaTitle = String(p.meta_title || '').replace(/<[^>]+>/g, '').trim();
      const metaDesc = String(p.meta_desc || '').replace(/<[^>]+>/g, '').trim();
      try {
        out[p.slug] = {
          title: title ? await tr(title, lang) : '',
          excerpt: excerpt ? await tr(excerpt, lang) : '',
          content: content ? await trBlogContent(content, lang) : '',
          meta_title: metaTitle ? await tr(metaTitle, lang) : '',
          meta_desc: metaDesc ? await tr(metaDesc, lang) : '',
          faq: (Array.isArray(p.faq) && p.faq.length) ? await translateFaq(p.faq, lang) : undefined,
        };
      } catch (e) {
        console.error(`\n  ✗ Failed post "${p.slug}": ${e.message}`);
        await saveCache();
        throw e;
      }
      const billedThisLang = billedChars - startBilled;
      process.stdout.write(
        `\r  ${i}/${batch.length} posts | sent ${(billedThisLang / 1000).toFixed(0)}k chars | total billed: ${(billedChars / 1000).toFixed(0)}k`
      );
      // Save every post — blog content is expensive to redo
      await saveCache();
      await writeFile(
        path.join(ROOT, `messages/blogs.${lang}.json`),
        JSON.stringify(out, null, 2) + '\n'
      );
    }
    console.log(`\n  ✓ messages/blogs.${lang}.json\n`);
  }

  console.log(`\n──────────────────────────────────────`);
  console.log(`Total chars billed in this run: ${billedChars.toLocaleString()}`);
  console.log(`Estimated cost (after 1M free): ¥${Math.max(0, (billedChars - 1_000_000) / 1_000_000 * 50).toFixed(2)}`);
  console.log(`✓ Blog translation done.`);
}

// ============================================================================
// COUNT — estimate character usage before running
// ============================================================================
async function cmdCount() {
  const products = JSON.parse(await readFile(path.join(ROOT, 'wp-data/products.json'), 'utf8'));
  const posts    = JSON.parse(await readFile(path.join(ROOT, 'wp-data/posts.json'), 'utf8'));
  const cats     = JSON.parse(await readFile(path.join(ROOT, 'wp-data/product_categories.json'), 'utf8'))
    .filter((c) => c.slug !== 'uncategorized');

  const fmt = (n) => n.toLocaleString();
  console.log('\n=== What is still untranslated ===');
  console.log(`English source: ${products.length} products, ${posts.length} posts, ${cats.length} categories`);
  console.log(`Free quota: 1,000,000 chars/month. Past that, about ¥50 per 1M.\n`);

  let grand = 0;
  for (const lang of ALL_LANGS) {
    const tp = await loadExisting(`messages/products.${lang}.json`);
    const tb = await loadExisting(`messages/blogs.${lang}.json`);
    const tc = await loadExisting(`messages/categories.${lang}.json`);

    const pMissing = products.filter((p) => !tp[p.slug] || !tp[p.slug].title);
    const bodyMissing = products.filter((p) => String(p.content || '').trim() && (!tp[p.slug] || !tp[p.slug].content));
    const postMissing = posts.filter((p) => !tb[p.slug] || !tb[p.slug].title);
    const catMissing  = cats.filter((c) => !tc[c.slug] || !tc[c.slug].name);

    const pChars = pMissing.reduce((a, p) => a + String(p.title || '').length + 500, 0);
    const bodyChars = bodyMissing.reduce((a, p) => a + String(p.content || '').length, 0);
    const postChars = postMissing.reduce((a, p) => a + String(p.title || '').length + String(p.excerpt || '').length + String(p.content || '').length, 0);
    const catChars  = catMissing.reduce((a, c) => a + String(c.name || '').length + String(c.description || '').length + String(c.meta_title || '').length, 0);
    const total = pChars + bodyChars + postChars + catChars;
    grand += total;

    console.log(`${lang.toUpperCase()}`);
    console.log(`  product title+overview  ${String(pMissing.length).padStart(4)} missing  ${fmt(pChars).padStart(9)} chars`);
    console.log(`  product body copy       ${String(bodyMissing.length).padStart(4)} missing  ${fmt(bodyChars).padStart(9)} chars`);
    console.log(`  blog posts              ${String(postMissing.length).padStart(4)} missing  ${fmt(postChars).padStart(9)} chars`);
    console.log(`  categories              ${String(catMissing.length).padStart(4)} missing  ${fmt(catChars).padStart(9)} chars`);
    console.log(`  ${'subtotal'.padEnd(23)}${' '.repeat(14)}${fmt(total).padStart(9)} chars\n`);
  }

  console.log('─'.repeat(58));
  console.log(`TOTAL still to send${' '.repeat(18)}${fmt(grand).padStart(9)} chars`);
  const over = Math.max(0, grand - 1_000_000);
  console.log(`Beyond the free 1M: ${fmt(over)} chars → about ¥${(over / 1_000_000 * 50).toFixed(2)}`);
  console.log(`\nSuggested order (cheapest and highest impact first):`);
  console.log(`  node scripts/translate.mjs categories`);
  console.log(`  node scripts/translate.mjs products`);
  console.log(`  node scripts/translate.mjs blogs`);
  console.log(`  node scripts/translate.mjs bodies --langs=de --limit=50   # then repeat\n`);
}

// --- Dispatch ---
const cmd = process.argv[2];
try {
  switch (cmd) {
    case 'test':           await cmdTest();           break;
    case 'count':          await cmdCount();          break;
    case 'ui':             await cmdUi();             break;
    case 'namespace':      await cmdNamespace(process.argv.slice(3)); break;
    case 'productContent': await cmdProductContent(); break;
    case 'products':       await cmdProducts();       break;
    case 'blogs':          await cmdBlogs();          break;
    case 'bodies':         await cmdBodies();         break;
    case 'categories':     await cmdCategories();     break;
    default:
      console.log(`Usage: node scripts/translate.mjs <command> [flags]

Commands
  count        Report what is still untranslated, per locale, in characters
  test         Check the Aliyun credentials and connection
  categories   Product category name + description + meta title
  products     Product title + generated overview
  bodies       Product body copy (the imported WP "More about this product")
  blogs        Blog post title, excerpt, body, meta and FAQ
  ui           Whole messages/en.json (rarely what you want)
  namespace <ns>  One top-level namespace of messages/en.json

Flags
  --pro          Use the paid professional engine (Scene title/description)
                 instead of the free general one. Needs the professional
                 edition enabled in the Aliyun console. Its free quota is
                 separate: 1M chars/month, then 60 CNY per million.
  --all          Retranslate everything, not only what is missing
  --slugs=a,b    Only these entries, by slug (use instead of --all to redo
                 a named subset without paying for the whole corpus)
  --limit=N      Stop after N items per locale
  --langs=es,de  Restrict to some locales
  --dry-run      Report what would be sent without calling the API

Content commands are incremental by default and merge into the existing
file, so it is safe to stop a run and resume it later.`);
      process.exit(1);
  }
} catch (e) {
  await saveCache();
  console.error('\n\n✗ Error:', e.message);
  process.exit(1);
}
