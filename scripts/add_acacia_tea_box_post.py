# One-off: append the new acacia-wood tea box blog post to wp-data/posts.json
# Targets the keyword cluster:
#   acacia wood tea box / acacia tea chest / acacia tea storage /
#   wooden tea box with glass window / food-safe tea storage
#
# Differentiated from the 3 existing tea-box posts by being material-first
# (deep dive on acacia specifically) rather than manufacturer-generic.

import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
POSTS = os.path.join(ROOT, 'wp-data', 'posts.json')

SLUG = 'acacia-wood-tea-box-material-guide'
TITLE = 'Acacia Wood Tea Boxes: A 2026 Material & Sourcing Guide for B2B Brands'
META_TITLE = 'Acacia Wood Tea Box Guide: Material, Finish & Sourcing'
META_DESC = (
    'Why acacia is the leading material for premium tea boxes — food-safety, '
    'Janka hardness, compartment layouts, finish options, MOQ and FOB pricing '
    'for B2B and private-label tea-box programs.'
)

CONTENT = """<!-- wp:paragraph -->
<p>Walk any kitchenware aisle from <strong>Williams-Sonoma</strong> and <strong>World Market</strong> down to the Amazon best-sellers, and one shape keeps repeating: a long, low <strong>acacia wood tea box</strong> with six to twelve compartments and a clear lid. Acacia did not win the tea-box category by accident. It is the rare wood that is genuinely food-safe, durable, beautiful out of the can, affordable at retail price points, and short enough to deliver on a six-week production schedule. This guide is the playbook we use at our Xiamen factory when we quote acacia tea boxes for private-label tea brands, hospitality buyers, and gift programs &mdash; with the real density figures, the four most common defects, the MOQs, and the sourcing checklist that protects your bulk order.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>It is also the post you should send to your design or sourcing team <em>before</em> they get talked into bamboo or pine by a cheaper quote. The price difference is real, but so is the return rate when humid air, hot mugs, and acidic herbal teas meet a softwood box.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Why acacia became the default material for premium tea boxes</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Three properties make acacia the workhorse of this category. First, it is <strong>dense</strong> &mdash; Janka hardness in the 2,200&ndash;2,400 lbf range, which puts it well above red oak (1,290), pine (380&ndash;870), and walnut (1,010). That hardness translates directly into compartment walls that do not dent when a customer drops a metal tea tin into the box, and to lid edges that hold their shape after 1,000 open-close cycles. Second, the grain is <strong>tight enough to resist absorbing tea aromas</strong>. Open-pore woods like pine or unsealed oak will pick up the smell of a strong oolong within a month; acacia will not. Third, the natural color range &mdash; honey heart to chocolate streaks &mdash; reads as &quot;premium hand-finished&quot; on a Shopify hero image without any staining or paint, which keeps unit cost down.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The brand signal matters here. Most of the acacia tea boxes that sell on Amazon between $25 and $60 cost &lt;$8 FOB Xiamen. The margin is in the visual story, and acacia carries that story without an upcharge for finishing. Compare that with paulownia &mdash; lovely wood, but pale and bland, so it needs stain to feel premium, which means an extra step in production and an extra failure point in QC.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>The material data: acacia vs bamboo vs paulownia vs walnut</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>If your buyer or category manager asks you to justify acacia over a cheaper alternative, here is the short answer in one table. All figures are typical mill-spec values for the species we run on our floor.</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>Property</th><th>Acacia</th><th>Bamboo</th><th>Paulownia</th><th>Walnut</th></tr></thead><tbody>
<tr><td>Density (kg/m&sup3;)</td><td>700&ndash;900</td><td>~700</td><td>~280</td><td>~640</td></tr>
<tr><td>Janka hardness (lbf)</td><td>~2,300</td><td>~1,380</td><td>~300</td><td>~1,010</td></tr>
<tr><td>Color (no stain)</td><td>Honey&ndash;chocolate, dramatic grain</td><td>Pale gold / carbonized caramel</td><td>Pale cream, flat</td><td>Deep chocolate, fine grain</td></tr>
<tr><td>Aroma absorption</td><td>Low</td><td>Low</td><td>Medium</td><td>Low</td></tr>
<tr><td>Food-safe out of can</td><td>Yes</td><td>Yes (single-piece only)</td><td>Yes, needs sealing</td><td>Yes</td></tr>
<tr><td>Warp risk in humid air</td><td>Low</td><td>Low</td><td>Low</td><td>Medium</td></tr>
<tr><td>Typical FOB cost index</td><td>1.0&times;</td><td>0.9&times;</td><td>0.7&times;</td><td>1.6&times;</td></tr>
</tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p>The takeaways: bamboo is the closest competitor on price and stability but loses on the &quot;premium gift&quot; feel and on the food-safety story (see next section). Paulownia is much cheaper but cannot stand on its own visually. Walnut is the only material that genuinely beats acacia on aesthetic, but it adds about 60% to FOB cost &mdash; it makes sense for $80+ tea brands and corporate gifts, not for mass retail.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Food safety: what acacia does well (and what to watch)</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>The food-safety question matters more than most buyers realise. Independent testing by the kitchenware brand <a href="https://misen.com/blogs/news/which-wood-won-t-leach-maple-acacia-bamboo-put-to-the-test" target="_blank" rel="noopener">Misen</a> exposed acacia, maple, and bamboo to hot acidic liquid and measured what leached out. Single-piece hardwoods like acacia released <em>virtually no</em> detectable chemicals. Roughly 32% of bamboo samples leached melamine above safety thresholds because they used composite boards held together with melamine-formaldehyde adhesive. The lesson is not &quot;bamboo is bad&quot; &mdash; solid one-piece bamboo is fine &mdash; it is that engineered/laminated bamboo and tea boxes do not mix.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Practically, this gives an acacia tea-box program three regulatory advantages. (1) Easier <strong>FDA / LFGB / EU 10/2011</strong> food-contact compliance for the interior surface. (2) Fewer questions on a <strong>Prop 65</strong> review for California shelf placement. (3) A cleaner story for <strong>BSCI, FSC, or eco-positioned</strong> retail buyers, because acacia is a fast-growing tropical hardwood and can be sourced from controlled-rotation plantations.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Things to watch on the factory side: the interior finish must be either food-safe mineral oil, food-grade plant oil (often labelled &quot;butcher block oil&quot;), or beeswax. Avoid PU lacquer on interiors &mdash; some Chinese factories use it because it is cheap and looks glossy, but it is not food-safe and it traps moisture under the surface, where mold can grow if the box ships through a humid container. Insist on the COA (certificate of analysis) for the oil and ask for the inspection report from your QC partner before container release.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Compartments: 4, 6, 8, 10, 12 &mdash; which works for which market</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Compartment count is the single biggest SKU decision after material. After running a few hundred SKUs for global tea brands, here is what we see selling in each lane.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>4 compartments</strong>: small home / gift market. Box footprint ~25&times;15&times;9 cm. Best for tea brands selling a starter sampler (e.g. four-flavor introductory pack). Lowest FOB cost. Common at Williams-Sonoma and Crate &amp; Barrel price points.</li>
<li><strong>6 compartments</strong>: the Amazon volume sweet spot. ~25&times;19&times;9 cm. Fits virtually any standard pyramid sachet or rectangular tea bag, and is the format most consumers can hand-organize by &quot;day&quot;.</li>
<li><strong>8 compartments</strong>: the gift/registry tier. ~30&times;19&times;9 cm. Photographs beautifully on social, often paired with a glass window lid. Margin tier.</li>
<li><strong>10 compartments</strong>: hospitality &amp; cafe coffee-station orders. ~38&times;19&times;9 cm. Holds enough variety for a guest amenity tray or a B&amp;B breakfast spread. Buyers: hotel groups, Airbnb suppliers, cafe chains.</li>
<li><strong>12 compartments</strong>: tea-brand merchandiser. ~38&times;25&times;9 cm. Used as in-store retail fixture by specialty tea brands who want every flavor visible behind a glass window. Higher SKU complexity.</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>One detail that is often missed: <strong>compartment height matters more than compartment count</strong>. If you are packing pyramid sachets, the compartment needs to be at least 9 cm tall &mdash; not 7 cm &mdash; or the lid will not close cleanly over a full stack. Always send the factory the exact sachet specification before they tool the divider grid.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Lid styles: hinged window vs sliding vs magnetic</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Three lid styles dominate the acacia tea-box category. Each has a different cost, durability story, and shelf appeal.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Hinged lid with acrylic or glass window</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>The bestseller and our most-quoted spec. The 3 mm acrylic insert sits inside a routed groove on a solid acacia frame, held by two surface-mount or two concealed brass hinges. The window lets the customer see the tea selection without lifting the lid &mdash; the single biggest UX upgrade you can make. Glass windows look richer but are heavier and more fragile; acrylic survives drops and saves on freight. For private-label retail, we usually quote acrylic; for hospitality (where the box stays on a counter) glass is fine.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Sliding lid (no window)</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>The cleanest aesthetic and the lowest unit cost. No hardware, no glass, just precision-routed grooves on both side walls and a flat acacia lid that slides in and out. Works beautifully for hand-numbered gift batches and corporate gifting. Downside: no visibility into the contents, and the lid can stick if humidity swings cause the wood to swell.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Magnetic flip lid</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Neodymium magnets routed into the back wall and the lid edge, giving an invisible &quot;snap&quot; close. Most premium feel and the best fit for upmarket subscription tea brands &mdash; the unboxing experience is part of the brand. Higher hardware cost (typically +$1.20&ndash;$1.80 per unit), and the magnets must be N42 or stronger or the lid will pop open when you tilt the box.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Finishes that protect acacia (and the ones to avoid)</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Acacia is naturally water-resistant but not waterproof. A good finish brings out the chocolate grain, locks in stability across humidity swings, and keeps the box food-safe for the life of the tea program. The three finishes we recommend, in order of customer reach:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>Food-grade mineral oil</strong> &mdash; the default. Penetrates the grain, deepens the color slightly, and reapplied at home it keeps the box in service for 5+ years. Lowest cost to apply, fully food-safe, FDA-acknowledged.</li>
<li><strong>Beeswax + mineral oil blend</strong> (often called &quot;butcher block conditioner&quot;) &mdash; richer satin sheen, slightly better water resistance. Worth the small upcharge for gift programs and luxury tea brands.</li>
<li><strong>Food-safe matte lacquer</strong> &mdash; only on the exterior, never the interior. A two-coat matte water-based lacquer adds a fingerprint-resistant shell. Pair with oiled interior. Best for cafe and hospitality boxes that get wiped down constantly.</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>What to avoid: gloss PU lacquer, solvent-based stains used to deepen color cheaply, and any &quot;tung oil&quot; that is not food-grade. The first two are unsafe for tea contact; the third is often actually a tung-oil substitute that contains heavy-metal driers.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Four defects we still see on cheap acacia tea boxes</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>These are the four issues that show up most often when we audit a competitor sample for a new brand &mdash; usually before they switch to us.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>Glued-up scrap blocks instead of solid panels.</strong> Cheap boxes use small acacia offcuts edge-glued into a panel, often hidden under a stain. The glue lines crack along the compartment dividers within six months. Insist on solid acacia panels (max two glue lines per side wall) and ask for a cut-through sample.</li>
<li><strong>Acrylic windows scratched in transit.</strong> The film protector should stay on the acrylic through the entire production line and only come off when the customer opens the gift box. Ask the factory to show you the line where the film is applied.</li>
<li><strong>Hinge screws driven into end-grain.</strong> Screws driven into the end-grain of acacia will pull out under repeated lid opening. Hinges must be screwed into face-grain, with pilot holes drilled to spec. Open the sample lid 100 times before signing off.</li>
<li><strong>Compartments under-sized for the customer&rsquo;s sachet.</strong> Buyers send a sachet sample only after tooling. We have seen Bigelow-sized rectangular bags get crushed because the factory built compartments for Lipton-sized squares. Always send the sachet dimensions before sampling.</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>Branding: laser engraving, UV print, and hot foil on acacia</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Acacia is a generous canvas. The dark heartwood streaks and the lighter sapwood take laser and ink differently &mdash; usually in your favor.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>Laser engraving</strong> &mdash; our recommended default. CO2 laser burns the surface to a rich espresso tone that contrasts beautifully with the honey heart. Works at any scale, holds fine type down to 5 pt, and has no per-unit cost beyond the laser time. Best for logos, brand names, tea-variety labels on the compartment dividers, and limited-edition numbering.</li>
<li><strong>UV print</strong> &mdash; full-color, photo-realistic prints directly onto the wood surface. Great for tea-brand artwork (botanicals, watercolor leaves). Adds about $0.40&ndash;$0.90 per unit at scale. Looks slightly flatter than laser because the print sits on top of the grain rather than burning into it.</li>
<li><strong>Hot foil stamping</strong> &mdash; gold or rose-gold foil for high-end gifting. Premium feel but the foil can chip if the box gets banged in transit. Use foil on the lid only, never on the side walls. Best for limited-edition holiday programs.</li>
<li><strong>Screen print</strong> &mdash; less common on acacia because the grain interferes with single-color clarity. Use only for solid blocks of color (e.g. a circular logo medallion).</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>MOQ, lead times, and FOB pricing for 2026</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>These are the numbers we quote at our factory, indexed to a standard 6-compartment acacia box with hinged acrylic window, mineral-oil interior, and laser-engraved logo on the lid.</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>Volume</th><th>Indicative FOB Xiamen</th><th>Sample lead time</th><th>Production lead time</th></tr></thead><tbody>
<tr><td>300&ndash;500 pcs (entry MOQ)</td><td>$7.50&ndash;$8.50 / pc</td><td>7&ndash;12 days</td><td>30&ndash;35 days</td></tr>
<tr><td>1,000&ndash;2,000 pcs</td><td>$6.50&ndash;$7.30 / pc</td><td>7&ndash;12 days</td><td>30&ndash;35 days</td></tr>
<tr><td>5,000 pcs+</td><td>$5.80&ndash;$6.40 / pc</td><td>10&ndash;14 days</td><td>40&ndash;45 days</td></tr>
<tr><td>20,000 pcs+ (annual program)</td><td>$5.20&ndash;$5.80 / pc</td><td>10&ndash;14 days</td><td>50&ndash;60 days, staggered</td></tr>
</tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p>Add about $0.50&ndash;$1.20 per unit for premium finish (beeswax / matte lacquer), $0.40&ndash;$0.90 for UV print, and roughly $1.50 per unit for glass window over acrylic at 1,000 pcs. Magnetic-lid SKUs run about 12% above the table figure. Customer-supplied retail-ready master cartons with barcodes add $0.08&ndash;$0.12 per unit. None of those numbers change the bigger story: even at the high end, acacia is still the cheapest premium-look hardwood tea box on the market.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Sourcing checklist before you place the bulk order</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>The checklist we send every new buyer before they sign a PI. Skip any step at your own risk.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li>Send the exact <strong>sachet dimensions</strong> (length &times; width &times; height) for the tea bag the box must fit &mdash; before tooling.</li>
<li>Ask for a <strong>cut-through panel sample</strong> from the box wall &mdash; confirms solid acacia, not glued-up scrap.</li>
<li>Request the <strong>COA for the interior oil</strong> (food-grade mineral oil or beeswax blend) and the <strong>FDA / LFGB / EU 10/2011 test report</strong> if you are listing on those markets.</li>
<li>Specify hinge type, hinge material (brass or zinc-alloy chromed), and demand pilot-hole drilling on the hinge mount.</li>
<li>Open the sample lid <strong>at least 100 times</strong> and tilt the closed box upside-down 10 times. The lid should not pop, no compartment should rattle.</li>
<li>Confirm the <strong>moisture content of the acacia panels is 8&ndash;12%</strong> on the cut sample. Above 14% and you will see warping after a 30-day ocean container.</li>
<li>Sign off on the <strong>master carton drop test</strong>: 80 cm onto concrete, four corners. No interior damage.</li>
<li>Get the QC partner&rsquo;s <strong>final inspection report (AQL 2.5)</strong> in writing before the container release.</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>None of this is a CHIC-specific list. It is the same checklist that protects you from any wooden-box factory, including ours.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Where to go from here</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>If you are weighing acacia against another material for a tea-box program, the short answer is: pick acacia unless your unit price target is below $5 FOB or your buyer specifically wants the walnut premium tier. The food-safety story, the visual story, and the freight economics line up in your favor.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>If you want a quote against your sachet spec, drop us a line through the <a href="/contact">contact form</a> with the compartment count, lid style, finish, branding method, and target volume. We will send back an indicative FOB and a sample lead time within one business day.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Related guides</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<li><a href="/blog/wooden-tea-box-manufacturer">Wooden Tea Box Manufacturing Guide for Distributors and Gift Brands</a> &mdash; the procurement-side companion to this material guide.</li>
<li><a href="/blog/multi-compartment-wooden-tea-boxes-bulk-orders">Multi-Compartment Wooden Tea Boxes: What Buyers Should Check Before Bulk Orders</a> &mdash; QC and bulk-order checklist.</li>
<li><a href="/blog/wooden-tea-bag-organizer-guide">How to Choose the Right Wooden Tea Bag Organizer for Coffee Stations</a> &mdash; hospitality and coffee-station angle.</li>
<li><a href="/products/wooden-tea-box">Browse our wooden tea box product range</a></li>
<li><a href="/material-guide">CHIC material guide &mdash; acacia, walnut, paulownia, bamboo and pine compared</a></li>
</ul>
<!-- /wp:list -->
"""

FAQ = [
    {
        'q': 'Is acacia wood food-safe for storing tea bags and loose tea?',
        'a': '<p>Yes. Acacia is a single-piece dense hardwood with very low chemical leaching when finished with food-grade mineral oil or beeswax. Independent testing has shown solid hardwoods like acacia release virtually no detectable chemicals even under hot, acidic conditions &mdash; well above what tea storage requires. The risk is not the wood; it is the interior finish, so insist on food-grade oil and never PU lacquer on the inside.</p>',
    },
    {
        'q': 'How does an acacia tea box compare to a bamboo tea box?',
        'a': '<p>Bamboo is slightly cheaper, equally stable, and reads as &quot;eco&quot;. But composite/laminated bamboo can leach melamine from its adhesive when exposed to acidic liquids, so for tea storage you must specify <em>solid one-piece</em> bamboo. Acacia avoids that risk entirely, looks more premium out of the can, and photographs better on a retail hero shot. For mid-to-premium tea brands, acacia wins on perceived value at almost the same unit cost.</p>',
    },
    {
        'q': 'How many compartments should I order for my tea-box program?',
        'a': '<p>4-compartment boxes work for entry-level samplers and corporate gifts. 6 compartments is the Amazon volume sweet spot. 8&ndash;10 compartments hit the gift / hospitality / coffee-station tier. 12 compartments suit specialty tea brand retail merchandisers. Match the compartment <em>height</em> to your sachet (typically 9 cm for pyramid sachets, 7 cm for flat tea bags) before locking the spec.</p>',
    },
    {
        'q': 'Will acacia warp in humid climates or during ocean shipping?',
        'a': '<p>Acacia is dimensionally stable when the panels are kiln-dried to 8&ndash;12% moisture content and the box is sealed with food-grade oil. Above 14% MC you will see warping after a 30-day ocean container in tropical humidity. Always ask the factory to show you the moisture content reading on the cut sample before approving tooling.</p>',
    },
    {
        'q': 'Can you laser-engrave logos and tea-variety labels on acacia tea boxes?',
        'a': '<p>Yes &mdash; acacia is one of the best woods on the market for CO2 laser engraving. The honey heart contrasts beautifully with the laser-burned dark espresso line, so logos, brand names, and individual compartment labels read crisply down to 5 pt type. Laser is included in our FOB quote (no per-unit upcharge) and is the most popular branding method for B2B acacia tea-box programs.</p>',
    },
    {
        'q': 'What is the MOQ, sample lead time, and production lead time for custom acacia tea boxes?',
        'a': '<p>Entry MOQ is 300&ndash;500 units per design. Samples take 7&ndash;12 days; mass production 30&ndash;35 days after sample approval. At 1,000 units you save roughly 10% per unit; at 5,000+ you save closer to 25%. Annual programs of 20,000+ units run on staggered 50&ndash;60 day production cycles to keep inventory turning.</p>',
    },
    {
        'q': 'What food-safety certifications can I get for an acacia tea-box program?',
        'a': '<p>Standard documentation includes FDA food-contact compliance (US), LFGB and EU 10/2011 (EU markets), Prop 65 reports for California shelf placement, and FSC chain-of-custody if the buyer requires forest-certification. BSCI factory audit is also available on request and covers labor-standards compliance.</p>',
    },
]

POST = {
    'id': 6750,
    'slug': SLUG,
    'title': TITLE,
    'content': CONTENT,
    'excerpt': '<p>A 2026 material-first sourcing guide for B2B brands and private-label buyers shopping for acacia wood tea boxes — with hardness data, food-safety comparisons, compartment layouts, finishes, lid styles, MOQ and FOB pricing from our Xiamen factory.</p>',
    'date': '2026-05-28T16:00:00',
    'author': 'rauchel1@hotmail.com',
    'categories': [
        {'slug': 'wood-materials-guide', 'name': 'Wood Materials Guide'},
        {'slug': 'buyer-guides', 'name': 'Buyer Guides'},
    ],
    'tags': [],
    'featured_image': '/wp-images/2026/01/acacia-wood.png',
    'meta_title': META_TITLE,
    'meta_desc': META_DESC,
    'faq': FAQ,
}

# ─── Append to posts.json ──────────────────────────────────────────────
posts = json.load(open(POSTS, encoding='utf-8'))
existing = {p['slug'] for p in posts}
existing_ids = {p['id'] for p in posts}

if POST['slug'] in existing:
    print(f'Slug {POST["slug"]} already exists, skipping.')
elif POST['id'] in existing_ids:
    POST['id'] = max(existing_ids) + 1
    posts.append(POST)
    print(f'ID bumped to {POST["id"]}. Added.')
else:
    posts.append(POST)
    print(f'Added: {POST["slug"]} (id={POST["id"]}, content={len(POST["content"])} chars)')

with open(POSTS, 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)

print(f'Total posts now: {len(posts)}')
