import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const fromBuild = args.includes('--build');
const base = new URL(args.find(a => /^https?:\/\//.test(a)) || 'https://xmchichomeware.com');
const canonicalOrigin = 'https://xmchichomeware.com';
const locales = ['en', 'es', 'de', 'fr', 'ja'];
const results = [];
const posts = JSON.parse(fs.readFileSync('wp-data/posts.json', 'utf8'));
const updated = posts.filter(p => p.content.includes(`<!-- seo-product-link:${p.slug} -->`));
const failed = (label, detail) => results.push({label, ok: false, detail});
const check = (label, ok, detail) => results.push({label, ok: Boolean(ok), ...(ok ? {} : {detail})});

function attrs(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gs)]
    .map(m => [m[1].toLowerCase(), m[3].replace(/&amp;/g, '&')]));
}
function localizedPath(locale, pathname = '') {
  return `${locale === 'en' ? '' : `/${locale}`}${pathname}` || '/';
}
function canonicalUrl(locale, pathname = '') {
  return canonicalOrigin + (localizedPath(locale, pathname) === '/' ? '' : localizedPath(locale, pathname));
}
async function read(pathname) {
  if (fromBuild) {
    const filename = pathname === '/sitemap.xml' ? 'sitemap.xml.body'
      : `${/^\/(es|de|fr|ja)(\/|$)/.test(pathname) ? pathname.slice(1) : `en${pathname === '/' ? '' : pathname}`}.html`;
    return fs.readFileSync(path.join('.next/server/app', filename), 'utf8');
  }
  const url = new URL(pathname, base);
  url.searchParams.set('seo_verify', Date.now().toString());
  const response = await fetch(url, {signal: AbortSignal.timeout(20000), headers: {'cache-control': 'no-cache'}});
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${pathname}`);
  if (new URL(response.url).pathname !== pathname) throw new Error(`Unexpected redirect: ${response.url}`);
  return response.text();
}

for (const locale of locales) {
  try {
    const html = await read(localizedPath(locale));
    const links = [...html.matchAll(/<link\b[^>]*>/gi)].map(m => attrs(m[0]));
    const canonicals = links.filter(a => a.rel === 'canonical').map(a => a.href?.replace(/\/$/, ''));
    check(`${locale}: homepage canonical`, canonicals.length === 1 && canonicals[0] === canonicalUrl(locale), canonicals);
    const lang = attrs(html.match(/<html\b[^>]*>/i)?.[0] || '').lang;
    check(`${locale}: document language`, lang === locale, lang);
    for (const alternate of [...locales, 'x-default']) {
      const expected = canonicalUrl(alternate === 'x-default' ? 'en' : alternate);
      check(`${locale}: hreflang ${alternate}`, links.some(a => a.hreflang === alternate && a.href?.replace(/\/$/, '') === expected), expected);
    }
    const expectedTitle = locale === 'en' ? 'Wooden Products Manufacturer & OEM Supplier in China'
      : JSON.parse(fs.readFileSync(`messages/${locale}.json`, 'utf8')).meta.siteTitle;
    const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1].replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'");
    check(`${locale}: localized title`, title === expectedTitle, title);
  } catch (error) { failed(`${locale}: homepage`, error.message); }
}

try {
  const xml = await read('/sitemap.xml');
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m => ({
    url: m[1].match(/<loc>(.*?)<\/loc>/)?.[1],
    alternates: [...m[1].matchAll(/<xhtml:link\b[^>]*>/g)].map(a => attrs(a[0])),
  }));
  const urls = new Set(entries.map(e => e.url));
  check('sitemap: no duplicate URLs', urls.size === entries.length, `${entries.length - urls.size} duplicates`);
  const counts = Object.fromEntries(locales.map(locale => [locale, 0]));
  const invalid = [];
  for (const entry of entries) {
    try {
      const u = new URL(entry.url);
      const parts = u.pathname.split('/').filter(Boolean);
      const locale = locales.slice(1).includes(parts[0]) ? parts.shift() : 'en';
      counts[locale]++;
      const pathname = parts.length ? `/${parts.join('/')}` : '';
      if (u.origin !== canonicalOrigin || parts[0] === 'en' || ['cart', 'thank-you', 'uncategorized'].includes(parts.at(-1))) {
        invalid.push(entry.url);
      }
      for (const alt of [...locales, 'x-default']) {
        const expected = canonicalUrl(alt === 'x-default' ? 'en' : alt, pathname);
        if (!urls.has(expected) || !entry.alternates.some(a => a.hreflang === alt && a.href === expected)) {
          invalid.push(`${entry.url} -> ${alt}`);
        }
      }
    } catch { invalid.push(entry.url); }
  }
  check('sitemap: valid canonical URLs and reciprocal languages', invalid.length === 0, invalid.slice(0,10));
  check('sitemap: five complete language sets', counts.en > 400 && locales.every(l => counts[l] === counts.en), counts);
  for (const pathname of ['/about/team', '/capabilities', '/wood-fabrication']) {
    check(`sitemap: ${pathname}`, locales.every(l => urls.has(canonicalUrl(l, pathname))), pathname);
  }
  console.log(JSON.stringify({sitemapUrls: entries.length, perLanguage: counts}));
} catch (error) { failed('sitemap', error.message); }

const articleSamples = fromBuild ? updated : updated.filter(p => [
  'custom-wooden-gift-packaging', 'wooden-table-caddies-restaurant-guide', 'how-to-choose-the-right-wooden-sofa-tray',
].includes(p.slug));
const newTargets = new Set();
for (const post of articleSamples) {
  try {
    const html = await read(`/blog/${post.slug}`);
    const rendered = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
    const sourceParagraph = post.content.split(`<!-- seo-product-link:${post.slug} -->`)[1]?.match(/<p>([\s\S]*?)<\/p>/)?.[1];
    const phrase = sourceParagraph?.split('<a ')[0];
    check(`article: ${post.slug}`, Boolean(phrase) && rendered.includes(phrase), 'New paragraph is absent');
    for (const match of sourceParagraph?.matchAll(/<a\b[^>]*>/g) || []) {
      const a = attrs(match[0]);
      newTargets.add(a.href);
      check(`link: ${post.slug} -> ${a.href}`, a.target === '_blank' && /\bnoopener\b/.test(a.rel || ''), a);
    }
  } catch (error) { failed(`article: ${post.slug}`, error.message); }
}
if (fromBuild) {
  for (const target of newTargets) {
    try { await read(target); check(`target: ${target}`, true); }
    catch (error) { failed(`target: ${target}`, error.message); }
  }
}
for (const [slug, phrase] of [
  ['vinyl-record-holders-buyers-guide-b2b-sourcing-2026', 'Related factory pages'],
  ['wooden-homeware-care', 'Care advice should match the product type'],
  ['wooden-gift-box-manufacturing-guide', 'Useful pages for gift-box development'],
]) {
  try {
    const html = await read(`/blog/${slug}`);
    check(`previous release: ${slug}`, html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').includes(phrase), 'Previous internal-link paragraph is absent');
  } catch (error) { failed(`previous release: ${slug}`, error.message); }
}

const failures = results.filter(r => !r.ok);
const report = {checkedAt: new Date().toISOString(), source: fromBuild ? 'production build' : base.href, total: results.length, passed: results.length - failures.length, failures};
const reportAt = args.indexOf('--report');
if (reportAt !== -1) {
  const destination = args[reportAt + 1];
  if (!destination || destination.startsWith('--')) throw new Error('--report needs a file path');
  fs.writeFileSync(destination, JSON.stringify(report, null, 2) + '\n');
}
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;
