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
const LANGS = ['es', 'de', 'fr', 'ja'];
const CACHE_FILE = path.join(ROOT, '.translate-cache.json');

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

  const params = {
    AccessKeyId: AK_ID,
    Action: 'TranslateGeneral',
    Format: 'JSON',
    FormatType: 'text',
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
  const key = `${source}|${target}|${text}`;
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
  console.log('Testing Aliyun connection…');
  const samples = ['Hello, this is a test.', 'Wooden Box Manufacturer'];
  for (const s of samples) {
    for (const lang of LANGS) {
      const out = await translateOne(s, 'en', lang);
      console.log(`  EN → ${lang.toUpperCase()}: "${s}" → "${out}"`);
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

  for (const lang of LANGS) {
    console.log(`\n→ ${lang.toUpperCase()}:`);
    const out = {};
    let i = 0;
    for (const p of products) {
      i++;
      const title = stripHtml(p.title || '');
      const overview = buildOverview(p);
      out[p.slug] = {
        title: title ? await tr(title, lang) : '',
        overview: overview ? await tr(overview, lang) : '',
      };
      process.stdout.write(`\r  ${i}/${products.length}`);
      if (i % 10 === 0) await saveCache();
    }
    await writeFile(
      path.join(ROOT, `messages/products.${lang}.json`),
      JSON.stringify(out, null, 2) + '\n'
    );
    await saveCache();
    console.log(`\n  ✓ messages/products.${lang}.json`);
  }
  console.log('\n✓ Product translation done.');
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

async function cmdBlogs() {
  const posts = JSON.parse(
    await readFile(path.join(ROOT, 'wp-data/posts.json'), 'utf8')
  );
  console.log(`Loaded ${posts.length} blog posts. Using smart-parse mode.\n`);

  for (const lang of LANGS) {
    console.log(`→ ${lang.toUpperCase()}:`);
    const out = {};
    let i = 0;
    const startBilled = billedChars;
    for (const p of posts) {
      i++;
      const title = String(p.title || '').replace(/<[^>]+>/g, '').trim();
      const excerpt = String(p.excerpt || '').replace(/<[^>]+>/g, '').trim();
      const content = p.content || '';
      try {
        out[p.slug] = {
          title: title ? await tr(title, lang) : '',
          excerpt: excerpt ? await tr(excerpt, lang) : '',
          content: content ? await trBlogContent(content, lang) : '',
        };
      } catch (e) {
        console.error(`\n  ✗ Failed post "${p.slug}": ${e.message}`);
        await saveCache();
        throw e;
      }
      const billedThisLang = billedChars - startBilled;
      process.stdout.write(
        `\r  ${i}/${posts.length} posts | sent ${(billedThisLang / 1000).toFixed(0)}k chars | total billed: ${(billedChars / 1000).toFixed(0)}k`
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
  const ui = JSON.parse(await readFile(path.join(ROOT, 'messages/en.json'), 'utf8'));
  const products = JSON.parse(await readFile(path.join(ROOT, 'wp-data/products.json'), 'utf8'));
  const posts = JSON.parse(await readFile(path.join(ROOT, 'wp-data/posts.json'), 'utf8'));

  // UI
  let uiChars = 0;
  (function walk(v) {
    if (typeof v === 'string') uiChars += v.length;
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') Object.values(v).forEach(walk);
  })(ui);

  // Products
  let prodChars = 0;
  for (const p of products) {
    prodChars += String(p.title || '').length;
    prodChars += 500; // rough overview length
  }

  // Blogs
  let blogChars = 0;
  for (const p of posts) {
    blogChars += String(p.title || '').length;
    blogChars += String(p.excerpt || '').length;
    blogChars += String(p.content || '').length;
  }

  const langs = LANGS.length;
  const fmt = (n) => n.toLocaleString();
  const cost = (chars) => {
    // First 1M chars/month free, then ¥50 per 1M
    const billable = Math.max(0, chars - 1_000_000);
    return (billable / 1_000_000 * 50).toFixed(2);
  };

  console.log('\n=== Translation cost estimate ===\n');
  console.log(`Free quota: 1,000,000 chars/month for TranslateGeneral`);
  console.log(`Past quota: ¥50 (~$7) per 1M chars\n`);

  const rows = [
    ['UI strings', uiChars],
    ['Products (178 × title+overview)', prodChars],
    ['Blogs (71 × title+excerpt+content)', blogChars],
  ];
  let total = 0;
  for (const [name, chars] of rows) {
    const tot = chars * langs;
    total += tot;
    console.log(`${name.padEnd(40)} ${fmt(chars).padStart(10)} × ${langs} = ${fmt(tot).padStart(10)} chars`);
  }
  console.log('-'.repeat(70));
  console.log(`${'TOTAL'.padEnd(40)} ${' '.padStart(10)}     ${fmt(total).padStart(10)} chars`);
  console.log(`\nEstimated cost: ¥${cost(total)} (~$${(cost(total) / 7).toFixed(2)})`);
  console.log(`(${total <= 1_000_000 ? '✓ Within free quota' : '⚠ Exceeds free quota'})\n`);
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
    default:
      console.log('Usage: node scripts/translate.mjs <test|count|ui|namespace <ns>|productContent|products|blogs>');
      process.exit(1);
  }
} catch (e) {
  await saveCache();
  console.error('\n\n✗ Error:', e.message);
  process.exit(1);
}
