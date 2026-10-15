const SITE_ORIGIN = 'https://xmchichomeware.com';
const SITE_HOSTS = new Set(['xmchichomeware.com', 'www.xmchichomeware.com']);
const LOCALES = ['', 'en', 'de', 'es', 'fr', 'ja'];

// Only known migrations belong here. Missing feeds, archives and unrelated
// deleted products must remain 404 rather than redirect to a generic page.
const migrations = Object.create(null);
for (const slug of [
  'desk-office-organizers', 'storage-home-organization',
  'gift-boxes-retail-packaging', 'hospitality-commercial', 'pet-products',
  'wooden-kitchen-dining',
]) migrations[`/${slug}`] = `/products/${slug}`;

const categoryPaths = {
  'wooden-kitchen-dining': ['wooden-serving-tray', 'wooden-cutting-board', 'wooden-cutlery-organizer', 'wooden-spice-rack'],
  'storage-home-organization': ['wooden-countertop-organizers', 'wooden-sofa-tray', 'wooden-pantry-organizers', 'wooden-bathroom-organizer'],
  'gift-boxes-retail-packaging': ['wooden-jewelry-boxes', 'wooden-wine-box', 'wooden-tea-box', 'wooden-gift-box', 'wooden-stash-box'],
  'desk-office-organizers': ['wooden-document-trays', 'wooden-drawer-organizer', 'wooden-pen-holders', 'wooden-valet-trays'],
  'hospitality-commercial': ['airbnb-welcome-trays', 'branded-wooden-promotional-gifts'],
};
for (const [parent, children] of Object.entries(categoryPaths)) {
  for (const slug of children) migrations[`/${parent}/${slug}`] = `/products/${slug}`;
}
// The new category pages show the full collection without archive pagination.
for (const slug of ['wooden-kitchen-dining', 'storage-home-organization']) {
  migrations[`/${slug}/page/2`] = `/products/${slug}`;
}
migrations['/home-organization'] = '/products/storage-home-organization';
migrations['/hidden-costs-sourcing-woodenware-china'] = '/blog/hidden-costs-of-sourcing-woodenware-from-china';
migrations['/the-best-woods-for-your-cheese-board'] = '/blog/best-wood-for-cheese-board';
for (const [oldSlug, slug] of Object.entries({
  'factory-direct-wooden-boxes-vs-trading-sourcing-what-b2b-buyers-should-compare': 'factory-direct-wooden-boxes-vs-trading-sourcing',
  'custom-engraved-wooden-boxes-for-corporate-gifts-2': 'custom-engraved-wooden-boxes-for-corporate-gifts',
  'custom-wooden-watch-box-2': 'custom-wooden-watch-box',
})) migrations[`/blog/${oldSlug}`] = `/blog/${slug}`;
Object.freeze(migrations);

function resolveLegacyHref(href) {
  if (typeof href !== 'string' || !/^(?:\/(?![?#])|https?:\/\/)/i.test(href)) return href;
  let url;
  try { url = new URL(href, SITE_ORIGIN); } catch { return href; }
  if (!SITE_HOSTS.has(url.hostname) || url.port || url.username || url.password) return href;
  const pathname = url.pathname.replace(/\/$/, '');
  const match = pathname.match(/^\/(en|de|es|fr|ja)(?=\/|$)/);
  const locale = match?.[1] || '';
  const source = match ? pathname.slice(match[0].length) : pathname;
  const destination = migrations[source];
  if (!destination) return href;
  const prefix = locale && locale !== 'en' ? `/${locale}` : '';
  return `${prefix}${destination}${url.search}${url.hash}`;
}

function rewriteLegacyLinks(html) {
  if (!html) return html;
  return html.replace(/<a\b[^>]*>/gi, tag => tag.replace(
    /(\s)href\s*=\s*(["'])(.*?)\2/i,
    (attribute, space, quote, href) => {
      const destination = resolveLegacyHref(href);
      return destination === href ? attribute : `${space}href=${quote}${destination}${quote}`;
    }
  ));
}

function buildLegacyRedirects() {
  return Object.entries(migrations).flatMap(([source, destination]) => LOCALES.map(locale => ({
    source: `${locale ? `/${locale}` : ''}${source}`,
    destination: `${locale && locale !== 'en' ? `/${locale}` : ''}${destination}`,
    permanent: true,
  })));
}

module.exports = { migrations, resolveLegacyHref, rewriteLegacyLinks, buildLegacyRedirects };
