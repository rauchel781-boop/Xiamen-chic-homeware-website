const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const root = path.join(__dirname, '..');
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const locales = ['en', 'de', 'es', 'fr', 'ja'];
const categories = read('wp-data/product_categories.json');
const enCategory = categories.find(c => c.slug === 'wooden-valet-trays');

test('five languages have complete buyer copy and distinct, bounded metadata', () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const locale of locales) {
    const carved = read(`messages/${locale}.json`).landing.carvedBox;
    const valet = locale === 'en' ? enCategory : read(`messages/categories.${locale}.json`)['wooden-valet-trays'];
    assert.ok(carved.modified && valet.modified);
    assert.equal(carved.modified, valet.modified);
    for (const [title, description] of [[carved.metaTitle, carved.metaDesc], [valet.meta_title, valet.meta_desc]]) {
      assert.ok(title.length <= 60 && description.length <= 160, locale + ' maximum metadata length');
      if (locale !== 'ja') assert.ok(title.length >= 50 && description.length >= 150, locale + ' Latin metadata targets');
      assert.ok(!titles.has(title) && !descriptions.has(description));
      titles.add(title);
      descriptions.add(description);
    }
    for (const key of ['rfqTitle', 'rfqIntro', 'rfqNote', 'heroAlt', ...[1, 2, 3, 4, 5].map(i => `rfqItem${i}`)]) assert.ok(carved[key], locale + ' ' + key);
    assert.equal(valet.faq.length, 5);
    assert.equal(new Set(valet.faq.map(f => f.q)).size, 5);
    assert.ok(valet.faq.every(f => f.q && f.a));
    assert.equal((valet.buying_guide.match(/<h2>/g) || []).length, 4);
    assert.equal((valet.buying_guide.match(/<table>/g) || []).length, 1);
    assert.doesNotMatch(valet.description + valet.buying_guide, /<h1\b|<script\b|javascript:/i);
  }
});

test('target copy does not invent fixed minimums, dates, stock or certification', () => {
  for (const locale of locales) {
    const carved = read(`messages/${locale}.json`).landing.carvedBox;
    const valet = locale === 'en' ? enCategory : read(`messages/categories.${locale}.json`)['wooden-valet-trays'];
    assert.doesNotMatch(JSON.stringify(carved), /300[–-]500|7[–-]14|25[–-]35|FSC-certified|ISPM-15|Low MOQ|within one business day/);
    assert.doesNotMatch(JSON.stringify(valet), /MOQ\s?300|7[–~-]10|FOB Xiamen|schema.org\/InStock/);
  }
});

test('new category description and guide links stay in their language and open safely', () => {
  for (const locale of locales) {
    const cat = locale === 'en' ? enCategory : read(`messages/categories.${locale}.json`)[enCategory.slug];
    const links = (cat.description + cat.buying_guide).match(/<a\b[^>]+>/g) || [];
    assert.equal(links.length, 6);
    for (const tag of links) {
      assert.match(tag, /target="_blank"/);
      assert.match(tag, /rel="noopener noreferrer"/);
      const href = tag.match(/href="([^"]+)"/)[1];
      assert.ok(href.startsWith(locale === 'en' ? '/' : `/${locale}/`));
    }
  }
});

test('localized category loading returns a translated guide and FAQ', async () => {
  const {localizeCategory, translatedLanding} = await import(pathToFileURL(path.join(root, 'lib/translated-content.js')).href);
  for (const locale of locales.slice(1)) {
    const tr = read(`messages/categories.${locale}.json`)[enCategory.slug];
    const category = localizeCategory(enCategory, locale);
    assert.equal(category.buying_guide, tr.buying_guide);
    assert.deepEqual(category.faq, tr.faq);
    assert.equal(category.faq_title, tr.faq_title);
    assert.notEqual(category.buying_guide, enCategory.buying_guide);
    assert.equal(translatedLanding('carvedBox', locale).modified, enCategory.modified);
    const other = localizeCategory(categories.find(c => c.slug === 'wooden-gift-box'), locale);
    assert.ok(!other.buying_guide && !other.faq);
  }
});

test('carved manufacturer buttons point to the photographed box without changing routes', () => {
  const source = fs.readFileSync(path.join(root, 'app/[locale]/carved-wooden-boxes-manufacturer/page.js'), 'utf8');
  assert.equal((source.match(/href="\/products\/carved-wooden-boxes-wholesale"/g) || []).length, 2);
  assert.match(source, /id="carved-box-rfq"/);
  assert.match(source, /alt=\{t\('heroAlt'\)\}/);
  assert.doesNotMatch(source, /wholesale-leaf-shaped-wood-tray-hand-carved-acacia-serving-platter/);
});

test('sitemap uses image URL strings rather than unsupported image objects', () => {
  const source = fs.readFileSync(path.join(root, 'app/sitemap.js'), 'utf8');
  assert.doesNotMatch(source, /\{ url: abs\(/);
  assert.match(source, /imgs\.push\(abs\(p\.featured_image\)\)/);
  assert.match(source, /images: imgs\.slice\(0, 6\)/);
});

test('category card and ItemList titles decode WordPress entities as text', () => {
  const source = fs.readFileSync(path.join(root, 'app/[locale]/products/[slug]/page.js'), 'utf8');
  const decoder = source.match(/function decodeEntities\(s\) \{[\s\S]*?\n\}/)[0];
  const decode = require('node:vm').runInNewContext(`(${decoder})`);
  assert.equal(decode('Walnut &amp; Bamboo &mdash; Tray'), 'Walnut & Bamboo \u2014 Tray');
  assert.equal(decode('Schale mit F\u00e4chern'), 'Schale mit F\u00e4chern');
  assert.match(source, /name: decodeEntities\(stripHtml\(p\.title\)\)/);
  assert.match(source, /<h3[^>]+>\{decodeEntities\(stripHtml\(p\.title\)\)\}<\/h3>/);
});
