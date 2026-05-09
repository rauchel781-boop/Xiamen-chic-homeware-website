import { products, posts, pages, productCategories, site } from '@/lib/data';

export default function sitemap() {
  const base = site().home_url || 'https://xmchichomeware.com';
  const u = (path, lastmod) => ({ url: `${base}${path}`, lastModified: lastmod ? new Date(lastmod) : new Date() });
  return [
    u('/'),
    u('/products'),
    u('/blog'),
    ...products().map(p => u(`/products/${p.slug}`, p.date)),
    ...productCategories().filter(c=>c.slug!=='uncategorized').map(c => u(`/categories/${c.slug}`)),
    ...posts().map(p => u(`/blog/${p.slug}`, p.date)),
    ...pages().filter(p => !['home','cart','products'].includes(p.slug)).map(p => u(`/${p.slug}`, p.date)),
  ];
}
