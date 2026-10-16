const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { normalizeBodyHeadings, stripProductEditorialLabels } = require('../lib/imported-html.cjs');

test('imported H1 becomes H2 without losing content, anchors, images or links', () => {
  const body = '<H1 id="specs" data-name="h1-title">A <em>wooden</em> box</H1>'
    + '<h2>Dimensions</h2><p>200 x 150 mm</p><img src="/box.jpg" alt="Box">'
    + '<a href="#specs" target="_blank" rel="noopener">Specifications</a>';
  const actual = normalizeBodyHeadings(body);
  assert.equal(actual, body.replace('<H1 ', '<h2 ').replace('</H1>', '</h2>'));
  assert.equal(normalizeBodyHeadings(actual), actual);
  assert.equal(normalizeBodyHeadings(''), '');
  assert.equal(normalizeBodyHeadings(null), '');
  assert.equal(normalizeBodyHeadings('<h10>Code</h10>&lt;h1&gt;'), '<h10>Code</h10>&lt;h1&gt;');
});

test('remove only exact editorial labels while retaining the quote paragraph and link', () => {
  const quote = '<p>Send size and quantity.</p><a href="/contact">Request a quote</a>';
  assert.equal(stripProductEditorialLabels('<p style="color:red"><strong>Main Keyword:</strong> wooden boxes</p><h2 id="quote">CTA</h2>' + quote), quote);
  const useful = '<h2>CTA packaging specification</h2><p>Main Keyword research is discussed here.</p><h2>FAQ</h2>';
  assert.equal(stripProductEditorialLabels(useful), useful);
  assert.equal(stripProductEditorialLabels(quote), quote);
});

test('real product and article exports retain their links and images when headings are normalized', () => {
  const root = path.resolve(__dirname, '..');
  let changed = 0;
  const files = ['wp-data/products.json', 'wp-data/posts.json', ...['de', 'es', 'fr', 'ja'].flatMap(locale => [`messages/products.${locale}.json`, `messages/blogs.${locale}.json`])];
  for (const file of files) {
    for (const row of Object.values(JSON.parse(fs.readFileSync(path.join(root, file), 'utf8')))) {
      const body = row.content || '';
      const result = normalizeBodyHeadings(body);
      if (result !== body) changed++;
      assert.doesNotMatch(result, /<\/?h1(?=[\s>])/i);
      assert.deepEqual(result.match(/<(?:img|a)\b[^>]*>/gi), body.match(/<(?:img|a)\b[^>]*>/gi));
    }
  }
  assert.ok(changed > 0);
});
