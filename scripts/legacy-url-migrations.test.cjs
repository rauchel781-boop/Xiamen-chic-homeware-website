const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const { migrations, resolveLegacyHref, rewriteLegacyLinks, buildLegacyRedirects } = require('../lib/legacy-url-migrations.cjs');

const root = path.resolve(__dirname, '..');
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const categories = read('wp-data/product_categories.json');
const posts = read('wp-data/posts.json');

test('every migration has a real destination and no chained migration', () => {
  for (const [source, destination] of Object.entries(migrations)) {
    assert.notEqual(source, destination);
    assert.equal(migrations[destination], undefined);
    const slug = destination.split('/').at(-1);
    const collection = destination.startsWith('/products/') ? categories : posts;
    assert.ok(collection.some(row => row.slug === slug), destination);
    if (destination.startsWith('/blog/')) {
      for (const locale of ['de', 'es', 'fr', 'ja']) {
        assert.ok(read(`messages/blogs.${locale}.json`)[slug]?.content, `${locale}: ${slug}`);
      }
    }
  }
});

test('all exact migration rules preserve language and remove the English prefix', () => {
  const rules = buildLegacyRedirects();
  assert.equal(new Set(rules.map(rule => rule.source)).size, rules.length);
  for (const rule of rules) {
    assert.equal(rule.permanent, true);
    assert.equal(resolveLegacyHref(rule.source), rule.destination);
    assert.equal(resolveLegacyHref(`https://www.xmchichomeware.com${rule.source}/?ref=gsc#details`), `${rule.destination}?ref=gsc#details`);
    assert.equal(resolveLegacyHref(rule.destination), rule.destination);
  }
});

test('Next configuration includes every migration without conflicting with existing aliases', async () => {
  const actual = await require('../next.config.js').redirects();
  for (const rule of buildLegacyRedirects()) {
    const matches = actual.filter(candidate => candidate.source === rule.source);
    assert.ok(matches.length > 0, rule.source);
    assert.ok(matches.every(candidate => candidate.destination === rule.destination), rule.source);
  }
});

test('obsolete resources and unknown products are not redirected to unrelated pages', () => {
  for (const href of [
    '/cdn-cgi/l/email-protection', '/upload/2121732251.m3u8', '/embed/',
    '/author/rauchel1hotmail-com/', '/2026/01/23/', '/uncategorized/',
    '/wooden-kitchen-dining/feed/', '/storage-home-organization/not-a-category',
    '/products/bamboo-bathtub-caddy-tray', '/toString', '/constructor',
    '/knowledge/', '/household-supplies/',
    'https://example.com/storage-home-organization',
    '//example.com/storage-home-organization',
    'https://xmchichomeware.com.evil.example/storage-home-organization',
    'https://xmchichomeware.com:8080/storage-home-organization',
    'https://user@xmchichomeware.com/storage-home-organization',
    '#storage-home-organization', 'mailto:sales@example.com',
    'tel:+12345', 'javascript:alert(1)', 'storage-home-organization',
  ]) assert.equal(resolveLegacyHref(href), href);
});

test('HTML normalization changes only anchor hrefs and preserves attributes and query entities', () => {
  const html = '<a class="cta" href="https://xmchichomeware.com/storage-home-organization/?a=1&amp;b=2#range" target="_blank" rel="noopener">Storage</a>'
    + '<a href=\'/fr/blog/custom-wooden-watch-box-2\'>Watches</a>'
    + '<img src="/storage-home-organization" alt="Storage">'
    + '<a data-href="/storage-home-organization" href="https://example.com/storage-home-organization">External</a>';
  const result = rewriteLegacyLinks(html);
  assert.ok(result.includes('href="/products/storage-home-organization?a=1&amp;b=2#range" target="_blank" rel="noopener"'));
  assert.ok(result.includes("href='/fr/blog/custom-wooden-watch-box'"));
  assert.ok(result.includes('<img src="/storage-home-organization" alt="Storage">'));
  assert.ok(result.includes('data-href="/storage-home-organization" href="https://example.com/storage-home-organization"'));
  assert.equal(rewriteLegacyLinks(result), result);
  assert.equal(rewriteLegacyLinks(''), '');
  assert.equal(rewriteLegacyLinks(null), null);
});

test('reported stale links in exported bodies and translations are rewritten', () => {
  let changed = 0;
  for (const file of ['wp-data/posts.json', 'wp-data/products.json', 'wp-data/pages.json',
    ...['de', 'es', 'fr', 'ja'].map(locale => `messages/blogs.${locale}.json`)]) {
    for (const row of Object.values(read(file))) {
      const html = row.content || '';
      const rewritten = rewriteLegacyLinks(html);
      if (html !== rewritten) changed++;
      for (const match of rewritten.matchAll(/<a\b[^>]*\shref\s*=\s*(["'])(.*?)\1/gi)) {
        assert.equal(resolveLegacyHref(match[2]), match[2], `${file}: ${row.slug || row.title}`);
      }
    }
  }
  assert.ok(changed >= 50, `Expected known stale bodies; found ${changed}`);
});
