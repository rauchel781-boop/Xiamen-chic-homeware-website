import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const args = process.argv.slice(2);
const built = args.includes('--build');
const origin = args.find(a => /^https?:\/\//.test(a)) || 'https://xmchichomeware.com';
const reportIndex = args.indexOf('--report');
const box = 'custom-wooden-storage-boxes-with-removable-dividers-buyers-guide';
const vinyl = 'vinyl-record-holders-buyers-guide-b2b-sourcing-2026';
const targets = { de: [box, vinyl], es: [box, vinyl], fr: [vinyl], ja: [box] };
const results = [];
const check = (label, ok, detail) => results.push({ label, ok: Boolean(ok), ...(ok ? {} : { detail }) });
const decode = s => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)=["']([^"']*)["']/g)].map(m => [m[1], decode(m[2])]));
const posts = JSON.parse(fs.readFileSync('wp-data/posts.json', 'utf8'));

async function read(route) {
  if (built) return fs.readFileSync(path.join('.next/server/app', route === '/sitemap.xml' ? 'sitemap.xml.body' : `${route.slice(1)}.html`), 'utf8');
  const url = new URL(route, origin);
  url.searchParams.set('localization_verify', String(Date.now()));
  const response = await fetch(url, { signal: AbortSignal.timeout(45000), headers: { 'cache-control': 'no-cache' } });
  assert(response.ok, `${route}: HTTP ${response.status}`);
  assert.equal(new URL(response.url).pathname, route, `Unexpected redirect: ${response.url}`);
  return response.text();
}

const sitemap = await read('/sitemap.xml');
for (const [locale, slugs] of Object.entries(targets)) {
  const translations = JSON.parse(fs.readFileSync(`messages/blogs.${locale}.json`, 'utf8'));
  for (const slug of slugs) {
    const label = `${locale}/${slug}`;
    const tr = translations[slug];
    const source = posts.find(p => p.slug === slug);
    for (const key of ['title', 'meta_title', 'meta_desc', 'excerpt', 'content']) {
      check(`${label}: localized ${key}`, Boolean(tr?.[key]) && tr[key] !== source[key]);
    }
    check(`${label}: eight localized FAQs`, tr.faq?.length === 8 && tr.faq.every((q, i) => q.q !== source.faq[i].q && q.a !== source.faq[i].a));
    check(`${label}: valid modification date`, !Number.isNaN(Date.parse(tr.modified)) && Date.parse(tr.modified) <= Date.now());
    check(`${label}: no replacement characters`, !Object.values(tr).filter(v => typeof v === 'string').some(v => v.includes('\uFFFD')));
    const sourceLinks = [...(tr.content + tr.faq.map(f => f.a).join('')).matchAll(/<a\b[^>]*>/g)].map(m => attributes(m[0]));
    check(`${label}: new-window links`, sourceLinks.every(a => a.target === '_blank' && a.rel?.includes('noopener')));
    check(`${label}: localized internal links`, sourceLinks.filter(a => a.href?.startsWith('/')).every(a => a.href.startsWith(`/${locale}/`)));
    for (const image of tr.content.matchAll(/<img\b[^>]*>/g)) {
      const a = attributes(image[0]);
      check(`${label}: image ${a.src}`, a.alt && a.width && a.height && fs.existsSync(path.join('public', a.src)));
    }
    try {
      const html = await read(`/${locale}/blog/${slug}`);
      const h1s = [...html.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gs)].map(m => decode(m[1].replace(/<[^>]*>/g, '')));
      check(`${label}: single localized H1`, h1s.length === 1 && h1s[0] === tr.title, h1s);
      check(`${label}: document language`, html.includes(`<html lang="${locale}"`));
      const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map(m => attributes(m[0]));
      const desc = metas.find(m => m.name === 'description')?.content;
      check(`${label}: localized search description`, desc && tr.meta_desc.startsWith(desc));
      const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map(m => attributes(m[0])).find(a => a.rel === 'canonical')?.href;
      check(`${label}: self canonical`, canonical === `https://xmchichomeware.com/${locale}/blog/${slug}`, canonical);
      const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
      const article = schemas.find(s => s['@type'] === 'BlogPosting');
      const faq = schemas.find(s => s['@type'] === 'FAQPage');
      check(`${label}: article modification date`, article?.dateModified === tr.modified, article?.dateModified);
      check(`${label}: FAQ schema matches`, faq?.mainEntity?.length === tr.faq.length && faq.mainEntity.every((q, i) => q.name === tr.faq[i].q));
      check(`${label}: visible FAQ translations`, tr.faq.every(f => decode(html).includes(f.q)));
      const route = `https://xmchichomeware.com/${locale}/blog/${slug}`;
      const entry = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].find(m => m[1].includes(`<loc>${route}</loc>`))?.[1];
      const mapDate = entry?.match(/<lastmod>(.*?)<\/lastmod>/)?.[1];
      check(`${label}: sitemap modification date`, mapDate && Date.parse(mapDate) === Date.parse(tr.modified), mapDate);
    } catch (error) {
      check(`${label}: page accessible and parseable`, false, error.message);
    }
  }
}
const report = { mode: built ? 'build' : 'live', origin, checkedAt: new Date().toISOString(), pages: 6, passed: results.filter(r => r.ok).length, failed: results.filter(r => !r.ok).length, results };
if (reportIndex >= 0) fs.writeFileSync(args[reportIndex + 1], JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ ...report, results: results.filter(r => !r.ok) }, null, 2));
if (report.failed) process.exitCode = 1;
