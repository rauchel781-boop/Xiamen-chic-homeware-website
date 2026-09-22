// Contextual product → article linking.
//
// Why this exists: an audit of the content layer found 285 of 292 product
// pages with zero outbound links in their body, and every article reachable
// only from /blog. The product template already rendered a "related products"
// strip, but it called .slice(0, 4) on the category list — so inside a
// 30-product category the same four products absorbed every internal link and
// the other 26 received none. Products and articles were two islands.
//
// This module scores the blog corpus against a product and returns the few
// articles a buyer on that page would actually want next, so the link is
// editorially defensible rather than a link farm.

import { wpBlogPosts, wpProducts, stripHtml } from '@/lib/wp-data';

// Words that appear on nearly every page here and therefore carry no signal.
const STOP = new Set([
  'a', 'an', 'and', 'the', 'of', 'for', 'with', 'to', 'in', 'on', 'from', 'by',
  'your', 'our', 'best', 'top', 'new', 'how', 'what', 'why', 'guide', 'guides',
  'buyer', 'buyers', 'complete', 'ultimate', 'china', 'chinese', 'factory',
  'manufacturer', 'manufacturers', 'supplier', 'suppliers', 'wholesale',
  'custom', 'customised', 'customized', 'oem', 'odm', 'bulk', 'set', 'sets',
  'piece', 'pieces', 'premium', 'quality', 'natural', 'solid', 'wood', 'wooden',
  'woodenware', 'homeware', 'home', 'kitchen', 'sourcing', 'source', 'choose',
  'choosing', 'cost', 'costs', 'price', 'pricing', 'moq', '2024', '2025', '2026',
]);

// Material and product-type tokens are what actually make a link relevant:
// a buyer looking at an acacia serving tray wants the acacia guide or the
// tray guide, not a generic "sourcing from China" piece.
const HIGH_VALUE = new Set([
  'acacia', 'walnut', 'bamboo', 'beech', 'oak', 'pine', 'paulownia', 'teak',
  'ebony', 'rubberwood', 'mango', 'birch', 'plywood', 'mdf',
  'tray', 'trays', 'board', 'boards', 'box', 'boxes', 'organizer', 'organiser',
  'organizers', 'organisers', 'rack', 'racks', 'urn', 'urns', 'coaster',
  'coasters', 'caddy', 'crate', 'crates', 'chest', 'chests', 'bowl', 'bowls',
  'stand', 'stands', 'holder', 'holders', 'case', 'cases', 'cutting',
  'chopping', 'serving', 'charcuterie', 'cheese', 'spice', 'tea', 'coffee',
  'wine', 'whiskey', 'jewelry', 'jewellery', 'desk', 'memorial', 'pet',
  'keepsake', 'packaging', 'gift', 'engraving', 'engraved', 'hotel',
  'hospitality', 'vinyl', 'record', 'watch', 'bread', 'salad', 'platter',
  'drawer', 'dividers', 'lid', 'hinge', 'finish', 'oiled', 'lacquer',
]);

function tokenize(s) {
  return String(s || '')
    .replace(/<[^>]*>/g, ' ')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter((w) => w.length > 2 && !STOP.has(w));
}

function weight(token) {
  return HIGH_VALUE.has(token) ? 3 : 1;
}

// Singular/plural collapse so "trays" matches "tray".
function stem(w) {
  if (w.length > 4 && w.endsWith('ies')) return w.slice(0, -3) + 'y';
  if (w.length > 3 && w.endsWith('es') && !w.endsWith('ses')) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith('s')) return w.slice(0, -1);
  return w;
}

let POST_INDEX = null;
function postIndex() {
  if (POST_INDEX) return POST_INDEX;
  POST_INDEX = wpBlogPosts().map((post) => {
    const raw = [
      post.meta_title || post.title,
      post.slug.replace(/-/g, ' '),
      (post.categories || []).map((c) => c.slug.replace(/-/g, ' ')).join(' '),
    ].join(' ');
    const tokens = new Map();
    for (const t of tokenize(raw)) {
      const s = stem(t);
      tokens.set(s, Math.max(tokens.get(s) || 0, weight(t)));
    }
    return {
      slug: post.slug,
      title: stripHtml(post.meta_title || post.title),
      image: post.featured_image || null,
      tokens,
    };
  });
  return POST_INDEX;
}

function productTokens(product) {
  const raw = [
    stripHtml(product.title || ''),
    product.slug ? product.slug.replace(/-/g, ' ') : '',
    (product.categories || []).map((c) => `${c.name} ${c.slug.replace(/-/g, ' ')}`).join(' '),
  ].join(' ');
  const mine = new Map();
  for (const t of tokenize(raw)) {
    const st = stem(t);
    mine.set(st, Math.max(mine.get(st) || 0, weight(t)));
  }
  return mine;
}

function scoreAgainst(mine, post) {
  let score = 0;
  let strong = false;
  for (const [tok, w] of mine) {
    const pw = post.tokens.get(tok);
    if (!pw) continue;
    const pair = Math.min(w, pw);
    score += pair;
    // Require at least one material or product-type match, so a product never
    // links to an article that merely shares filler vocabulary with it.
    if (pair >= 3) strong = true;
  }
  return strong && score >= 4 ? score : 0;
}

// ── Global assignment, built once per process ────────────────────────────
//
// Scoring each product independently and taking its top 3 concentrated the
// links badly: one article collected 49 inbound links while 34 articles got
// none, which is the same link-equity problem the .slice(0, 4) bug caused on
// the sibling strip. So the assignment is computed for the whole catalogue at
// once, with a penalty that grows as an article accumulates links.
//
// Products are walked in slug order and the data is static, so the result is
// deterministic — the same build always produces the same link graph.
const LINKS_PER_PRODUCT = 3;
const CROWDING_PENALTY  = 0.8;

let ASSIGNMENT = null;
function assignment() {
  if (ASSIGNMENT) return ASSIGNMENT;
  const posts = postIndex();
  const byslug = new Map(posts.map((p) => [p.slug, p]));
  const used = new Map();
  const out = new Map();

  const products = [...wpProducts()].sort((a, b) =>
    String(a.slug).localeCompare(String(b.slug)));

  for (const product of products) {
    const mine = productTokens(product);
    const cands = [];
    for (const post of posts) {
      const raw = scoreAgainst(mine, post);
      if (raw > 0) cands.push({ slug: post.slug, raw });
    }
    cands.sort((a, b) => b.raw - a.raw || a.slug.localeCompare(b.slug));

    const picked = [];
    // Re-rank on every pick so the penalty from one choice affects the next.
    const pool = cands.slice(0, 12);
    while (picked.length < LINKS_PER_PRODUCT && pool.length) {
      let bestI = -1;
      let best = -Infinity;
      for (let i = 0; i < pool.length; i++) {
        const adj = pool[i].raw - CROWDING_PENALTY * (used.get(pool[i].slug) || 0);
        if (adj > best) { best = adj; bestI = i; }
      }
      const [chosen] = pool.splice(bestI, 1);
      picked.push(chosen.slug);
      used.set(chosen.slug, (used.get(chosen.slug) || 0) + 1);
    }
    out.set(product.slug, picked.map((sl) => byslug.get(sl)).filter(Boolean));
  }

  ASSIGNMENT = out;
  return ASSIGNMENT;
}

/**
 * Up to `limit` articles genuinely related to this product, balanced across
 * the corpus so link equity is not dumped on a handful of posts.
 */
export function relatedGuidesFor(product, limit = LINKS_PER_PRODUCT) {
  if (!product || !product.slug) return [];
  return (assignment().get(product.slug) || []).slice(0, limit);
}

/**
 * Sibling products for the "related products" strip.
 *
 * The old implementation took the first four matches in every category, which
 * concentrated all sibling links on four products per category. This walks a
 * rotating window starting at the current product's own position, so links
 * spread evenly across the category and every product picks up inbound links
 * from its neighbours.
 */
export function relatedProductsFor(product, allProducts, limit = 4) {
  if (!product) return [];
  const catSlugs = new Set((product.categories || []).map((c) => c.slug));
  const siblings = allProducts.filter(
    (x) => x.id !== product.id && (x.categories || []).some((c) => catSlugs.has(c.slug))
  );
  if (siblings.length <= limit) return siblings;

  const pool = allProducts.filter((x) => (x.categories || []).some((c) => catSlugs.has(c.slug)));
  const self = Math.max(0, pool.findIndex((x) => x.id === product.id));
  const out = [];
  for (let step = 1; out.length < limit && step <= pool.length; step++) {
    const cand = pool[(self + step) % pool.length];
    if (cand && cand.id !== product.id) out.push(cand);
  }
  return out;
}
