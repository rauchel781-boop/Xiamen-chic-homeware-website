// ─────────────────────────────────────────────────────────────────
// Migrate WordPress image URLs to local /public/wp-images/
//
// Run once from project root:
//   node scripts/migrate-images.mjs
//
// What it does:
//   1. Reads wp-data/extracted/wp_images_referenced.json — the list of
//      every xmchichomeware.com image URL actually used somewhere.
//   2. Downloads each image (8 parallel) to /public/wp-images/<path>
//      preserving the original 2026/02/xxx.jpg folder layout.
//   3. Skips files already on disk (so you can re-run if it gets
//      interrupted — it'll resume).
//   4. Rewrites every xmchichomeware.com URL in:
//        - wp-data/*.json
//        - components/*.js
//        - app/**/*.js
//        - lib/*.js
//      to /wp-images/<path>. WP size-suffixed URLs (e.g. -300x300.jpg)
//      are remapped to the base file so we only need to host one copy.
//
// Requirements: Node.js 18+ (built-in fetch). No npm packages needed.
// ─────────────────────────────────────────────────────────────────

import fs from 'fs';
import path from 'path';
import { mkdir } from 'fs/promises';

const ROOT = process.cwd();
const REFERENCED = path.join(ROOT, 'wp-data', 'extracted', 'wp_images_referenced.json');
const PUBLIC_ROOT = path.join(ROOT, 'public');
const CONCURRENCY = 8;

// ─── Step 1: Download ─────────────────────────────────────────────
async function downloadAll() {
  if (!fs.existsSync(REFERENCED)) {
    console.error(`✗ Missing ${REFERENCED}`);
    console.error(`  Run the URL-extraction first or restore wp-data/.`);
    process.exit(1);
  }
  const urls = JSON.parse(fs.readFileSync(REFERENCED, 'utf8'));
  console.log(`Total URLs to check: ${urls.length.toLocaleString()}\n`);

  let done = 0, ok = 0, skip = 0, fail = 0;
  const failed = [];

  const queue = [...urls];
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const url = queue.shift();
      const result = await downloadOne(url);
      done++;
      if      (result === 'ok')   ok++;
      else if (result === 'skip') skip++;
      else                        { fail++; failed.push(url); }
      if (done % 10 === 0 || done === urls.length) {
        process.stdout.write(
          `\r  [${done}/${urls.length}]  ok=${ok}  skip=${skip}  fail=${fail}   `
        );
      }
    }
  });
  await Promise.all(workers);
  console.log('');
  if (failed.length) {
    fs.writeFileSync(
      path.join(ROOT, 'wp-data', 'extracted', 'wp_images_failed.json'),
      JSON.stringify(failed, null, 2),
    );
    console.log(`  ✗ ${failed.length} failed — list saved to wp-data/extracted/wp_images_failed.json`);
  }
  return { ok, skip, fail };
}

async function downloadOne(url) {
  const localPath = urlToLocalPath(url);
  if (!localPath) return 'fail';
  const fullPath = path.join(PUBLIC_ROOT, localPath);
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).size > 0) return 'skip';

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ChicMigration/1.0)' },
      redirect: 'follow',
    });
    if (!res.ok) return 'fail';
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length === 0) return 'fail';
    await mkdir(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, buf);
    return 'ok';
  } catch {
    return 'fail';
  }
}

// Map xmchichomeware.com URL → local folder path under /public
function urlToLocalPath(url) {
  // Strip query/fragment
  const clean = url.split(/[?#]/)[0];
  const m = clean.match(/\/wp-content\/uploads\/(.+)$/);
  if (m) return `wp-images/${m[1]}`;
  const m2 = clean.match(/\/wp-content\/(.+)$/);
  if (m2) return `wp-images/_misc/${m2[1]}`;
  return null;
}

// ─── Step 2: Rewrite URLs in source files ────────────────────────
async function rewriteAll() {
  const FILES = [];

  // wp-data/*.json (data files we read at build time)
  if (fs.existsSync(path.join(ROOT, 'wp-data'))) {
    for (const f of fs.readdirSync(path.join(ROOT, 'wp-data'))) {
      if (f.endsWith('.json')) FILES.push(path.join(ROOT, 'wp-data', f));
    }
  }
  // Source code dirs
  walkDir(path.join(ROOT, 'components'), FILES);
  walkDir(path.join(ROOT, 'app'),        FILES);
  walkDir(path.join(ROOT, 'lib'),        FILES);

  console.log(`Scanning ${FILES.length} files...`);
  let changed = 0, totalReplacements = 0;

  for (const f of FILES) {
    const orig = fs.readFileSync(f, 'utf8');
    let count = 0;
    const rewritten = orig.replace(
      /https?:\/\/(?:www\.)?xmchichomeware\.com\/wp-content\/uploads\/([^\s"'<>)\\]+)/g,
      (match, suffix) => {
        count++;
        // Strip query/frag and WP size suffix → point to base file
        const cleaned = suffix.split(/[?#]/)[0];
        const base = cleaned.replace(/-\d+x\d+(\.[a-z0-9]+)$/i, '$1');
        return `/wp-images/${base}`;
      }
    );
    if (count > 0) {
      fs.writeFileSync(f, rewritten);
      changed++;
      totalReplacements += count;
      console.log(`  ✓ ${path.relative(ROOT, f)}  (${count} URLs)`);
    }
  }

  // Also rewrite remotePatterns? No — leave next.config.js alone, having it
  // in remotePatterns doesn't hurt and keeps fallback for any URL we missed.

  return { files: changed, replacements: totalReplacements };
}

function walkDir(dir, out) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const skip = entry.name.startsWith('.') || entry.name === 'node_modules';
    if (skip) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walkDir(p, out);
    else if (/\.(js|jsx|json|css|mjs)$/.test(entry.name)) out.push(p);
  }
}

// ─── Main ────────────────────────────────────────────────────────
console.log('━━━ STEP 1: Download images ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
const dl = await downloadAll();
console.log(`\nDownload summary:  ok=${dl.ok}  skip=${dl.skip}  fail=${dl.fail}`);

console.log('\n━━━ STEP 2: Rewrite URLs in source files ━━━━━━━━━━━━━━━━━━');
const rw = await rewriteAll();
console.log(`\nRewrite summary:  ${rw.files} files updated, ${rw.replacements.toLocaleString()} URLs rewritten`);

console.log('\n✓ Done.');
console.log('  Next: rm -rf .next && npm run dev   (or just rerun npm run dev)');
console.log('  All images now served from /wp-images/ on your own host.');
