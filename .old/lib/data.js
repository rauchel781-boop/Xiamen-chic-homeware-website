import fs from 'fs';
import path from 'path';

const root = process.cwd();
const read = (n) => JSON.parse(fs.readFileSync(path.join(root, 'data', n), 'utf8'));

let _site, _pages, _posts, _products, _prodCats, _postCats, _menus;

export function site()      { return _site      ??= read('site.json'); }
export function pages()     { return _pages     ??= read('pages.json'); }
export function posts()     { return _posts     ??= read('posts.json'); }
export function products()  { return _products  ??= read('products.json'); }
export function productCategories() { return _prodCats ??= read('product_categories.json'); }
export function postCategories()    { return _postCats ??= read('post_categories.json'); }
export function menus()     { return _menus     ??= read('menus.json'); }
export function mainMenu()  { return menus()['main-menu'] || []; }

export function pageBySlug(slug)    { return pages().find(p => p.slug === slug); }
export function postBySlug(slug)    { return posts().find(p => p.slug === slug); }
export function productBySlug(slug) { return products().find(p => p.slug === slug); }
export function categoryBySlug(slug){ return productCategories().find(c => c.slug === slug); }

export function productsByCategory(slug) {
  return products().filter(p => p.categories?.some(c => c.slug === slug));
}

export function postsByCategory(slug) {
  return posts().filter(p => p.categories?.some(c => c.slug === slug));
}

export function categoryTree() {
  const cats = productCategories();
  const byId = Object.fromEntries(cats.map(c => [c.id, { ...c, children: [] }]));
  const roots = [];
  for (const c of Object.values(byId)) {
    const pid = parseInt(c.parent || '0', 10);
    if (pid && byId[pid]) byId[pid].children.push(c);
    else roots.push(c);
  }
  return roots;
}
