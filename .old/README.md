# CHIC Homeware — Next.js Migration

Next.js port of the WordPress site `xmchichomeware.com`.

## Setup

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

## Structure

```
app/                 Next.js App Router routes
  page.js            Home
  products/          Products list + detail
  categories/        Category pages
  blog/              Blog list + post detail
  [slug]/            Catch-all for static pages (about, contact, materials guide…)
components/          Header, Footer, ContactForm
data/                JSON exported from WordPress (single source of truth)
  pages.json         36 pages (Elementor HTML)
  posts.json         71 blog posts (Gutenberg HTML)
  products.json      178 products (clean inline-styled HTML)
  product_categories.json
  menus.json
  media_index.json   Map of all 3,785 media items
lib/data.js          Data accessors
public/              Static assets (drop migrated images here later)
```

## Known issues

1. **Elementor pages** (Home / About / Materials Guide / Contact / a few others) are
   rendered via `dangerouslySetInnerHTML` from the WP export — they need either
   Elementor's compiled CSS migrated, or rebuilding as native Next.js components.
   The Home page has been rebuilt cleanly; other Elementor pages still need work.

2. **Images** still point to `xmchichomeware.com/wp-content/...`. Either:
   - Keep them remote (already allowed in `next.config.js`)
   - Bulk-download to `/public/images/` and rewrite URLs

3. **Contact form** is a stub — wire `components/ContactForm.js` to your endpoint
   (`/api/contact`, Formspree, your CRM, etc.).

## Re-importing content

If you re-export from WordPress, replace the XML/JSON in the project root and
re-run the import script (see `scripts/` — to be added).
