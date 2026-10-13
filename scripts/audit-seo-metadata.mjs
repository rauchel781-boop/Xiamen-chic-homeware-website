import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(relativePath) {
  const file = path.join(root, relativePath);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function stripHtml(value = '') {
  return String(value)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function titleSource(item) {
  return stripHtml(item.meta_title || item.title || item.name || '');
}

function descSource(item) {
  return stripHtml(item.meta_desc || item.excerpt || item.description || item.content || '');
}

function itemId(item) {
  return item.slug || item.id || item.title || item.name || 'unknown';
}

function isNoindex(item) {
  return item.noindex === true || item.robots === 'noindex' || item.robots?.index === false;
}

function auditCollection(label, items) {
  const indexableItems = items.filter((item) => !isNoindex(item));
  const noindexItems = items.filter(isNoindex);
  const rows = indexableItems.map((item) => {
    const title = titleSource(item);
    const desc = descSource(item);
    const issues = [];

    if (!stripHtml(item.meta_title)) issues.push('missing_meta_title');
    if (!stripHtml(item.meta_desc)) issues.push('missing_meta_desc');
    if (title.length > 60) issues.push(`title_too_long:${title.length}`);
    if (title.length > 0 && title.length < 30) issues.push(`title_too_short:${title.length}`);
    if (desc.length > 160) issues.push(`meta_too_long:${desc.length}`);
    if (desc.length > 0 && desc.length < 120) issues.push(`meta_too_short:${desc.length}`);
    if (!desc) issues.push('missing_description_source');

    return {
      id: itemId(item),
      titleLength: title.length,
      metaLength: desc.length,
      issues,
      title,
      metaDescription: desc,
    };
  });

  const problemRows = rows.filter((row) => row.issues.length > 0);
  return {
    label,
    total: items.length,
    auditedTotal: rows.length,
    excludedNoindex: noindexItems.length,
    issueCount: problemRows.length,
    missingMetaTitle: rows.filter((row) => row.issues.includes('missing_meta_title')).length,
    missingMetaDescription: rows.filter((row) => row.issues.includes('missing_meta_desc')).length,
    longTitle: rows.filter((row) => row.issues.some((issue) => issue.startsWith('title_too_long'))).length,
    longMetaDescription: rows.filter((row) => row.issues.some((issue) => issue.startsWith('meta_too_long'))).length,
    shortTitle: rows.filter((row) => row.issues.some((issue) => issue.startsWith('title_too_short'))).length,
    shortMetaDescription: rows.filter((row) => row.issues.some((issue) => issue.startsWith('meta_too_short'))).length,
    samples: problemRows.slice(0, 15),
  };
}

const collections = [
  ['products', readJson('wp-data/products.json')],
  ['product_categories', readJson('wp-data/product_categories.json').filter((item) => item.slug !== 'uncategorized')],
  ['posts', readJson('wp-data/posts.json')],
  ['pages', readJson('wp-data/pages.json')],
];

const report = {
  generatedAt: new Date().toISOString(),
  rules: {
    titleTarget: '50-60 characters',
    metaTarget: '150-160 characters',
    note: 'Missing meta_title/meta_desc is counted even if a fallback title or description source exists. noindex pages are excluded from metadata issue counts.',
  },
  collections: Object.fromEntries(collections.map(([label, items]) => [label, auditCollection(label, items)])),
};

console.log(JSON.stringify(report, null, 2));
