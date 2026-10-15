import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const postsPath = path.join(root, 'wp-data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
const products = JSON.parse(fs.readFileSync(path.join(root, 'wp-data/products.json'), 'utf8'));
const categories = JSON.parse(fs.readFileSync(path.join(root, 'wp-data/product_categories.json'), 'utf8'));
const validTargets = new Set([
  '/contact',
  ...products.map(p => `/products/${p.slug}`),
  ...categories.filter(c => c.slug !== 'uncategorized').map(c => `/products/${c.slug}`),
]);
const targets = new Set();
function link(slug, label) {
  const href = `/products/${slug}`;
  if (!validTargets.has(href)) throw new Error(`Unknown product/category: ${href}`);
  targets.add(href);
  return `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
}

// Curated by article topic, not by a minimum link quota.
const paragraphs = {
  'custom-wooden-gift-packaging':
    `For a packaging brief, compare the closure and insert options in our ${link('custom-wooden-packaging-box', 'custom wooden packaging range')}. A ${link('magnetic-wooden-chocolate-box-manufacturer', 'magnetic wooden chocolate box')} is a useful reference when the contents need fitted compartments and a reusable outer box.`,
  'preventing-wood-cracking-in-exports':
    `Apply the moisture and construction checks below to the product you plan to order. For ${link('wooden-serving-tray', 'wooden serving trays')}, inspect the base and handle joints; for ${link('wooden-storage-box-with-lid', 'lidded wooden storage boxes')}, include lid fit and hinge alignment in the sample review.`,
  'oem-wooden-packaging-boxes-guide':
    `Start with a structure from our ${link('custom-wooden-packaging-box', 'custom wooden packaging boxes')} and compare it with the ${link('wooden-gift-box', 'wooden gift box range')}. Specify the cosmetic container dimensions, insert material and closure before asking suppliers to price the same design.`,
  'where-to-buy-wooden-chocolate-boxes-wholesale':
    `Compare a ${link('paulownia-wooden-chocolate-box-supplier', 'paulownia chocolate box')} with a ${link('drawer-wooden-chocolate-box-manufacturer', 'drawer-style wooden chocolate box')} before choosing a supplier. These two formats raise different questions about insert fit, opening clearance and packing protection.`,
  'wooden-stash-box-guide-analysis':
    `Use the ${link('wooden-stash-box', 'wooden stash box range')} to compare layouts, then check the construction against our ${link('wooden-storage-box-with-lid', 'lidded storage boxes')}. Confirm the intended contents, dividers and closure requirements rather than choosing a material on appearance alone.`,
  'wooden-box-vs-paper-packaging':
    `For the wooden option in your comparison, use our ${link('wooden-gift-box', 'gift box designs')} and ${link('custom-wooden-packaging-box', 'custom packaging boxes')} as structural references. Compare both materials at the same internal dimensions and protection level, including inserts and the shipping carton.`,
  'wooden-box-for-mini-bottle-tasting-sets':
    `The ${link('wooden-wine-box', 'wooden wine box range')} provides useful references for bottle separation and closures. For smaller tasting formats, compare our ${link('custom-wooden-packaging-box', 'custom wooden packaging boxes')} and specify each bottle's diameter, height and filled weight before developing the insert.`,
  'wooden-table-caddies-restaurant-guide':
    `Compare the compartments in our ${link('restaurant-table-caddies', 'restaurant table caddies')} with the layouts in our ${link('wooden-cutlery-organizer', 'wooden cutlery organizers')}. Base the sample brief on the actual napkins, condiment bottles and utensils your team needs to carry or replenish.`,
  'multi-compartment-wooden-tea-boxes-bulk-orders':
    `Use our ${link('wooden-tea-box', 'wooden tea box range')} to choose a starting layout. Compare it with ${link('wooden-coffee-box', 'wooden coffee boxes')} when developing a coordinated beverage collection, and measure the actual sachets before setting compartment dimensions.`,
  'how-to-choose-a-wooden-products-factory-in-china-in-2026':
    `Shortlist factories against a specific product family, such as ${link('wooden-cutting-board', 'wooden cutting boards')} or ${link('wooden-gift-box', 'wooden gift boxes')}. A board and a hinged box require different construction checks, so request examples relevant to your own order.`,
  'wooden-document-trays':
    `Compare the formats in our ${link('wooden-document-trays', 'wooden document tray range')} with our ${link('wooden-desk-organizer', 'desk organizers')} when planning an office collection. Specify paper size, stack clearance and the space needed for a hand to retrieve documents.`,
  'how-to-evaluate-finish-quality-on-custom-wooden-boxes':
    `Build your finish approval around a real box format. Our ${link('wooden-jewelry-boxes', 'wooden jewelry boxes')} and ${link('wooden-keepsake-boxes', 'keepsake boxes')} provide references for checking exterior color, interior surfaces and the finish around hinges and closures.`,
  'prevent-color-variation-in-stained-wooden-products':
    `For a matching collection of ${link('wooden-serving-tray', 'wooden serving trays')} and ${link('wooden-storage-box-with-lid', 'wooden storage boxes')}, approve samples together under the same lighting. State the acceptable grain and color range instead of relying on one photograph as the only reference.`,
  'wooden-tea-box-manufacturer':
    `Review our ${link('wooden-tea-box', 'wooden tea boxes')} for compartment and lid options. If the box is part of a wider gifting program, compare the ${link('wooden-gift-box', 'wooden gift box collection')} so that the outer finish, branding and packing can be specified consistently.`,
  'wooden-box-factory-inquiry-guide':
    `A product reference makes an inquiry easier to assess. Choose a starting point from our ${link('wooden-gift-box', 'wooden gift boxes')} or ${link('custom-wooden-packaging-box', 'custom packaging boxes')}, then list the dimensions, material, closure and quantity that differ from that reference.`,
  'fsc-wooden-product-sourcing':
    `Define the actual product scope first, whether it is ${link('wooden-cutting-board', 'wooden cutting boards')} or ${link('wooden-gift-box', 'wooden gift boxes')}. A product listing alone does not establish certification: request current evidence covering the supplier, material and claim required for your order.`,
  'mdf-veneer-vs-solid-wood-boxes':
    `Compare both construction routes against the same ${link('custom-wooden-packaging-box', 'packaging box design')}. Our ${link('wooden-keepsake-boxes', 'wooden keepsake boxes')} offer another reference for deciding how visible edges, hinges and the intended lifespan affect material selection.`,
  'wooden-box-sampling-guide':
    `Choose a reference from our ${link('wooden-storage-box-with-lid', 'lidded storage boxes')} or ${link('wooden-gift-box', 'wooden gift boxes')} before requesting samples. Record which dimensions and details are approved and which still need revision before releasing a bulk order.`,
  'blank-wooden-boxes-wholesale-unfinished-boxes':
    `Compare an ${link('unfinished-wooden-keepsake-box', 'unfinished wooden keepsake chest')} with our ${link('unfinished-wooden-boxes-wholesale', 'unfinished gift box with linen lining')}. Confirm which surfaces remain unfinished and whether the lining, hardware or adhesive must be protected during your own decoration process.`,
  'hidden-costs-of-sourcing-woodenware-from-china':
    `Compare packing assumptions on real product types: ${link('wooden-cutting-board', 'wooden cutting boards')} and ${link('wooden-gift-box', 'wooden gift boxes')} can use container space very differently. Ask for unit weight, carton dimensions and units per carton before comparing freight estimates.`,
  'carved-wooden-boxes-wholesale':
    `Start the drawing review with our ${link('wooden-gift-box', 'wooden gift box formats')} and ${link('wooden-keepsake-boxes', 'keepsake boxes')}. Define the carving area, remaining wall thickness and edge clearance so that the decoration can be reviewed together with the box structure.`,
  'custom-engraved-wooden-boxes-for-corporate-gifts':
    `Review the available formats for ${link('branded-wooden-promotional-gifts', 'branded wooden promotional gifts')} alongside our ${link('wooden-gift-box', 'wooden gift boxes')}. Provide the logo artwork and engraving position with the sample brief so the branding can be checked at its actual size.`,
  'how-to-compare-wooden-box-suppliers':
    `Use the same reference from our ${link('custom-wooden-packaging-box', 'custom packaging boxes')} or ${link('wooden-storage-box-with-lid', 'wooden storage boxes')} in each supplier inquiry. Comparing one defined construction makes differences in materials, inserts and packing easier to identify.`,
  'customized-wooden-gift-box-sourcing-guide':
    `Compare the layouts in our ${link('wooden-gift-box', 'wooden gift box collection')} and ${link('custom-wooden-packaging-box', 'custom packaging range')} before specifying artwork. The lid, insert and usable internal space should be settled before the branding sample is approved.`,
  'blogs-industry-trends-wooden-kinetic-flip-photo-box-viral-gift-2026':
    `See our ${link('products-custom-kinetic-flip-photo-box-manufacturer-wholesale', 'wooden kinetic flip photo box')} for a product reference, then compare the display format with our ${link('wooden-photo-frame', 'wooden photo frames')}. For a moving design, include repeated operation and protection of the mechanism in the sample checks.`,
  'custom-wooden-jewelry-box-manufacturer':
    `Compare our ${link('wooden-jewelry-boxes', 'wooden jewelry boxes')} with ${link('wooden-jewelry-organizer', 'open jewelry organizers')} before choosing the layout. Closed storage, visible display and easy daily access call for different compartments, linings and packing protection.`,
  'laser-engraving-vs-uv-printing-wood-coasters-cost':
    `Start with the substrate in our ${link('wooden-coasters', 'wooden coaster range')}; the ${link('pine-wood-coaster-wholesale', 'pine wood coaster set')} is one product reference for your artwork brief. Approve the decoration on the selected wood and finish rather than on an unrelated sample panel.`,
  'china-made-wooden-stash-box-manufacturer':
    `Review our ${link('wooden-stash-box', 'wooden stash boxes')} alongside ${link('wooden-storage-box-with-lid', 'lidded wooden storage boxes')} to define the base structure. Specify the insert layout and intended contents separately so that the sample review covers fit as well as appearance.`,
  'how-to-choose-the-right-wooden-sofa-tray':
    `Compare the formats in our ${link('wooden-sofa-tray', 'wooden sofa tray range')} with the ${link('wooden-bamboo-sofa-tray-with-phone-holder', 'sofa tray with phone holder and compartments')}. Check armrest dimensions and the intended load before choosing between a serving surface and a storage layout.`,
  'custom-wooden-spice-rack-with-glass-jars':
    `Use our ${link('wooden-spice-rack', 'wooden spice rack range')} and ${link('wooden-pantry-organizers', 'pantry organizers')} to compare footprints. Confirm jar diameter, lid clearance and packed weight using the actual glassware before approving the rack dimensions.`,
  'wooden-organizer-manufacturer-china-guide':
    `Define the use case with our ${link('wooden-desk-organizer', 'wooden desk organizers')} or ${link('wooden-bathroom-organizer', 'bathroom organizers')}. A supplier comparison should reflect the intended contents and cleaning conditions, not just the number of compartments.`,
  'acacia-wood-storage-boxes':
    `Review the ${link('premium-solid-acacia-wood-storage-box-with-gold-latch-hinged-lid-decorative-keepsake-organizer-for-photos-memories', 'acacia storage box with a hinged lid and latch')} alongside our ${link('wooden-storage-box-with-lid', 'lidded wooden storage range')}. Compare wall thickness, lid fit and the acceptable grain variation on a physical sample.`,
  'best-wood-for-wooden-organizers':
    `Apply the material comparison to a defined format from our ${link('wooden-desk-organizer', 'desk organizer range')} or ${link('wooden-drawer-organizer', 'drawer organizers')}. Internal dimensions, dividers and cleaning conditions help determine whether the proposed wood suits the job.`,
  'kitchen-storage-trends-2026':
    `Translate a collection idea into measurable formats using our ${link('wooden-pantry-organizers', 'wooden pantry organizers')} and ${link('wooden-spice-rack', 'wooden spice racks')}. Compare shelf depth, jar clearance and packing dimensions before deciding which designs belong in the same range.`,
  'guide-wholesale-wooden-artist-sketchbox':
    `Use our ${link('portable-wooden-sketch-box-wholesale', 'portable wooden sketch box')} as a reference for the strap, hinges and interior layout. Compare it with ${link('wooden-storage-box-with-lid', 'lidded wooden storage boxes')} to distinguish ordinary storage requirements from the extra checks needed for a carried product.`,
  'ultimate-guide-wholesale-wooden-jewelry-box':
    `Compare our ${link('wooden-jewelry-boxes', 'wooden jewelry boxes')} with the ${link('wooden-jewelry-organizer', 'jewelry organizer range')} when choosing between enclosed storage and display. Confirm compartment sizes and lining specifications against the pieces the buyer intends to store.`,
};

const apply = process.argv.includes('--apply');
const changed = [];
for (const [slug, paragraph] of Object.entries(paragraphs)) {
  const post = posts.find(p => p.slug === slug);
  if (!post) throw new Error(`Unknown article: ${slug}`);
  const marker = `<!-- seo-product-link:${slug} -->`;
  if (post.content.includes(marker)) continue;
  const intro = [...post.content.matchAll(/<p\b[^>]*>[\s\S]*?<\/p>(?:\s*<!-- \/wp:paragraph -->)?/gi)]
    .find(m => m[0].replace(/<[^>]+>/g, '').trim().length >= 160);
  if (!intro) throw new Error(`No suitable introduction in ${slug}`);
  const contact = /href=["'][^"']*\/contact(?:[/?#"'])/i.test(post.content) ? ''
    : ' For a project quote, include your dimensions, quantity and destination in the <a href="/contact" target="_blank" rel="noopener noreferrer">inquiry form</a>.';
  const insertion = `\n\n${marker}\n<!-- wp:paragraph -->\n<p>${paragraph}${contact}</p>\n<!-- /wp:paragraph -->`;
  const offset = intro.index + intro[0].length;
  post.content = post.content.slice(0, offset) + insertion + post.content.slice(offset);
  post.modified = new Date().toISOString();
  changed.push(slug);
}
if (apply && changed.length) fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2) + '\n');
console.log(JSON.stringify({mode: apply ? 'apply' : 'preview', changedCount: changed.length, changed, targets: [...targets]}, null, 2));
