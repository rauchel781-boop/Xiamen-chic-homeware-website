const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const locales = ['en', 'de', 'es', 'fr', 'ja'];

test('eyewear case is curated, quote-only and no longer a wine box', () => {
  const p = read('wp-data/products.json').find(p => p.slug === 'wooden-glasses-case');
  assert.equal(p.content_complete, true);
  assert.equal(p.quote_only, true);
  assert.deepEqual(p.categories.map(c => c.slug), ['storage-home-organization']);
  assert.equal(p.gallery.length, 6);
  assert.match(p.featured_image, /7520489395633\.jpg$/);
  for (const locale of locales) {
    const content = locale === 'en' ? p : read(`messages/products.${locale}.json`)[p.slug];
    assert.equal(content.content_complete, true);
    assert.ok((content.content.match(/<h2>/g) || []).length >= 4);
    assert.equal(content.faq.length, 4);
    assert.ok(content.faq.every(item => item.q && item.a));
    assert.ok(content.meta_title && content.meta_desc);
    assert.doesNotMatch(content.content, /<h1\b|cjdropshipping|wineBox/i);
    const links = content.content.match(/<a\b[^>]+>/g);
    assert.equal(links.length, 3);
    for (const link of links) {
      assert.match(link, /target="_blank"/);
      assert.match(link, /rel="noopener noreferrer"/);
      if (locale !== 'en') assert.ok(link.includes(`href="/${locale}/`));
    }
  }
});

test('active language files use confirmed 20,000 square metre area', () => {
  for (const locale of locales) {
    const data = read(`messages/${locale}.json`);
    const raw = JSON.stringify(data);
    assert.doesNotMatch(raw, /15[,. ]000\s*m\s*[²2]/);
    assert.match(data.productContent.whyChic, /20[,. ]000\s*m\s*²/);
    assert.match(data.landing.storageOrganizer.proof1Num, /20[,. ]000/);
    assert.equal(data.cases.case6Quote, '');
    assert.doesNotMatch(data.cases.case6Story, /We hold stock|Wir halten Aktien|Tenemos existencias|Nous détenons des stocks|トップセラー3社の在庫/);
  }
});

test('gift-box category does not promise an outdated fixed design count', () => {
  const c = read('wp-data/product_categories.json').find(c => c.slug === 'wooden-gift-box');
  assert.doesNotMatch(c.description + c.meta_desc, /Twenty-one/i);
  for (const locale of locales.slice(1)) {
    const tr = read(`messages/categories.${locale}.json`)[c.slug];
    assert.doesNotMatch(JSON.stringify(tr), /21|Einundzwanzig|Veintiún|Vingt-et-un/);
  }
});

test('shared product schema does not fabricate inventory status', () => {
  const source = fs.readFileSync(path.join(root, 'app/[locale]/products/[slug]/page.js'), 'utf8');
  assert.doesNotMatch(source, /availability\s*:|schema\.org\/(InStock|OutOfStock|PreOrder|Discontinued)/);
  assert.match(source, /p\.quote_only \? null : getPriceRangeForProduct\(p\)/);
  assert.match(source, /offers: pricing \?/);
  assert.match(fs.readFileSync(path.join(root, 'components/CaseStudies.js'), 'utf8'), /c\.quote && <blockquote/);
  assert.match(fs.readFileSync(path.join(root, 'components/ProofStrip.js'), 'utf8'), /filter\(c => c\.quote\)/);
});

test('metadata casing preserves accented uppercase and existing English behavior', () => {
  const source = fs.readFileSync(path.join(root, 'app/[locale]/products/[slug]/page.js'), 'utf8');
  const start = source.indexOf('function fixCase(t)');
  const end = source.indexOf('function productSeoTitle', start);
  const fixCase = vm.runInNewContext(source.slice(start, end) + '; fixCase;');
  assert.equal(fixCase('Étui à lunettes en bambou - Devis grossiste | CHIC'), 'Étui à lunettes en bambou - Devis grossiste | CHIC');
  assert.equal(fixCase('wooden watch box wholesale | Custom Logo Display Case'), 'Wooden Watch Box Wholesale | Custom Logo Display Case');
  assert.equal(fixCase('Bamboo OEM - CHIC'), 'Bamboo OEM - CHIC');
});
