function normalizeBodyHeadings(html) {
  if (!html) return '';
  // Page templates own the H1. Preserve imported text, IDs and other attributes.
  return html.replace(/<(\/?)h1(?=[\s>])/gi, '<$1h2');
}

function stripProductEditorialLabels(html) {
  if (!html) return '';
  return html
    .replace(/<p\b[^>]*>\s*<strong>\s*Main Keyword:\s*<\/strong>[^<]*<\/p>/gi, '')
    .replace(/<h([2-6])\b[^>]*>\s*CTA\s*<\/h\1>/gi, '');
}

module.exports = { normalizeBodyHeadings, stripProductEditorialLabels };
