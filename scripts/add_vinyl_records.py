# One-off: add the Wooden Vinyl Record Holders category + 14 products
# to wp-data/products.json and wp-data/product_categories.json.
# Run once locally:  python scripts/add_vinyl_records.py

import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROD_JSON = os.path.join(ROOT, 'wp-data', 'products.json')
CAT_JSON  = os.path.join(ROOT, 'wp-data', 'product_categories.json')
IMG_BASE  = '/wp-images/2026/05/vinyl-record-holders'

# ─── Add the new category ─────────────────────────────────────────────────
cats = json.load(open(CAT_JSON, encoding='utf-8'))
NEW_CAT_SLUG = 'wooden-vinyl-record-holders'
NEW_CAT_NAME = 'Wooden Vinyl Record Holders'
if not any(c['slug'] == NEW_CAT_SLUG for c in cats):
    next_id = max(c['id'] for c in cats) + 1
    cats.append({
        'id': next_id,
        'name': NEW_CAT_NAME,
        'slug': NEW_CAT_SLUG,
        'parent': 'storage-home-organization',
        'description': 'Wholesale wooden vinyl record holders, LP storage racks, '
                       'record flip bins, "Now Playing" stands and turntable display '
                       'racks — OEM / private label by CHIC, a custom wooden homeware '
                       'manufacturer in China. Solid wood, paulownia, walnut and '
                       'acacia options with metal-frame accents. Low MOQ, factory-direct.'
    })
    json.dump(cats, open(CAT_JSON, 'w', encoding='utf-8'),
              indent=2, ensure_ascii=False)
    print(f'Added category {NEW_CAT_SLUG} (id={next_id})')
else:
    print(f'Category {NEW_CAT_SLUG} already exists, skipping')

# ─── Helper to build product JSON ─────────────────────────────────────────

def make_product(pid, slug, title, *, material, capacity, dim, style,
                 use_cases, intro, features, fits_for, audience, sku,
                 meta_title, meta_desc, images, keywords):
    """Build a single product dict that matches the existing schema."""
    feat_html = ''.join(f'<li>{f}</li>' for f in features)
    uc_html   = ''.join(f'<li>{u}</li>' for u in use_cases)
    kw_html   = ', '.join(keywords)
    content = f"""<!-- wp:paragraph -->
<p>The <strong>{title}</strong> is a custom-manufactured wooden vinyl record holder produced by CHIC, a factory-direct wooden homeware manufacturer in China. {intro}</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Material &amp; Construction</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>{material}</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Capacity &amp; Dimensions</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>{capacity} Approximate dimensions: {dim}. Sized for standard 12&quot; LP records (also accepts 7&quot; singles, gatefold albums, magazines and large coffee-table books in the larger configurations).</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Key Features</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>{feat_html}</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>Style &amp; Aesthetic</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>{style}</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Use Cases</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>{uc_html}</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>Fits Which Setups</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>This vinyl record holder is suitable for: <strong>{fits_for}</strong>.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>OEM &amp; Private Label</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>CHIC manufactures this <strong>{title.lower()}</strong> on a B2B / wholesale basis &mdash; OEM, ODM and private label programs welcome. Custom branding options include laser engraving (great for &quot;NOW PLAYING&quot;, band logos, store names), wood burning, hot foil stamping, UV print and screen print. Custom finish (natural oil, walnut stain, dark espresso, rustic distressed, painted matte black), custom sizes (for 7&quot; 45s, 10&quot;, 12&quot; LPs or extended-capacity cabinets), and custom packaging (color box, kraft sleeve, FBA-ready master cartons with barcode) are all available. Typical MOQ starts at 300&ndash;500 pcs. Sample lead time 7&ndash;12 days; mass production 25&ndash;35 days after sample approval. We ship FOB Xiamen direct to Amazon FBA, retail DCs and 3PLs worldwide.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Who This Is For</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>{audience}</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><em>Related keywords:</em> {kw_html}.</p>
<!-- /wp:paragraph -->"""

    return {
        'id': pid,
        'slug': slug,
        'title': title,
        'content': content,
        'excerpt': f'<p>{intro}</p>',
        'date': '2026-05-28 10:00:00',
        'categories': [
            {'slug': 'storage-home-organization', 'name': 'Storage & Home Organization'},
            {'slug': NEW_CAT_SLUG, 'name': NEW_CAT_NAME},
        ],
        'featured_image': images[0],
        'gallery': images[1:] if len(images) > 1 else [],
        'sku': sku,
        'price': '',
        'meta_title': meta_title,
        'meta_desc': meta_desc,
    }


# ─── 14 products ──────────────────────────────────────────────────────────

PRODUCTS = []
START_ID = 7100

def img(folder, files):
    return [f'{IMG_BASE}/{folder}/{f}' for f in files]

# 1. Pine tabletop record/book bench
PRODUCTS.append(make_product(
    7100,
    'pine-tabletop-vinyl-record-book-display-bench',
    'Pine Tabletop Vinyl Record & Book Display Bench — Open Two-Sided Wooden Holder',
    material='Natural pine plywood with sanded edges and a clear matte-lacquer finish. Side panels are angled outward to create a stable A-frame bench that lets albums and books lean against either side without tipping.',
    capacity='Holds 25&ndash;40 standard 12&quot; vinyl LPs depending on sleeve thickness, or roughly 12&ndash;18 hardback books / magazines.',
    dim='Length 50&ndash;60 cm &middot; Depth 25 cm &middot; Height 18.5 cm',
    style='A bright, casual look in pale pine &mdash; works beautifully on a turntable console, a bedside table, or the open shelving of a Scandinavian-style living room. The open two-sided design lets sleeve artwork show without enclosing the records, encouraging browse-and-pick behaviour.',
    use_cases=[
        'Living-room vinyl display next to a turntable',
        'Tabletop magazine bench for cafes and barbershops',
        'Bedside or office book holder for current reads',
        'Retail merchandising fixture for record stores and gift shops',
    ],
    intro='A bright pine tabletop record and book display bench with handle-cutout side panels and an open two-sided layout, letting LP sleeves and book covers lean visibly while staying stable. A clean, Scandinavian alternative to the heavy boxed crate &mdash; sized to sit on a turntable console or desk.',
    features=[
        'Solid pine plywood with sanded edges and matte clear-lacquer finish',
        'Open two-sided A-frame design &mdash; albums lean instead of squeezing in',
        'Integrated handle cutouts on both side panels for portability',
        '25&ndash;40 LP capacity (or magazines / hardback books)',
        'Stable wide base; will not tip when half-empty',
        'Lightweight (~1.2 kg) &mdash; easy to relocate by a single person',
    ],
    fits_for='vinyl turntable consoles, music rooms, living rooms, cafes, record-store countertop displays, bedside tables',
    audience='Home audio brands, record stores, lifestyle and home-decor retailers, cafes and barbershops who want a light, browseable record display rather than a sealed crate.',
    sku='CHIC-VR-001',
    meta_title='Pine Tabletop Vinyl Record Display Bench | OEM Wholesale',
    meta_desc='Pine wood tabletop vinyl record and book display bench with handle cutouts &mdash; open A-frame design, holds 25&ndash;40 LPs. OEM wholesale, low MOQ.',
    images=img('pine-tabletop-record-book-display-bench',
               ['01.webp', '02.jpg', '03.webp', '04.webp', '05.webp', '06.jpg']),
    keywords=['pine vinyl record holder', 'tabletop record display bench',
              'wooden LP holder', 'open record stand', 'magazine bench wood',
              'Scandinavian vinyl rack'],
))

# 2. Walnut "Now Playing" album display stand
PRODUCTS.append(make_product(
    7101,
    'walnut-now-playing-vinyl-album-display-stand',
    'Walnut Wood "Now Playing" Vinyl Album Display Stand — Single LP Showcase',
    material='Solid American black walnut with a hand-rubbed oil finish, paired with a contrasting laser-engraved "NOW PLAYING" wooden plaque. No visible hardware on the front face.',
    capacity='Designed to display ONE album sleeve at a time at eye level &mdash; the &quot;currently spinning&quot; record. Pair with a separate crate or wall mount for the rest of the collection.',
    dim='Width 19 cm &middot; Depth 12 cm &middot; Height 15 cm',
    style='A small piece with big visual impact: a deep chocolate walnut base cradles a 12&quot; record at the same angle Apple stages a product on a stand. The &quot;NOW PLAYING&quot; cue invites the listener to slow down, sit, and listen to the full side &mdash; the way records are meant to be heard.',
    use_cases=[
        'Statement piece next to the turntable',
        'Music-themed gift for audiophiles and collectors',
        'Window or shelf merchandiser for record stores',
        'Cafe / bar / restaurant interior styling',
    ],
    intro='A walnut "Now Playing" record stand that cradles a single 12&quot; vinyl sleeve at a perfect viewing angle next to the turntable &mdash; the ritual reminder to sit down and actually listen. Solid black walnut, hand-finished with mineral oil, with a laser-engraved &quot;NOW PLAYING&quot; cue.',
    features=[
        'Solid American black walnut, oiled hand-finish',
        'Cradles one 12&quot; LP or gatefold album',
        'Laser-engraved &quot;NOW PLAYING&quot; cue (custom text on request)',
        'Stable weighted base, felt-pad bottom protects furniture',
        'Compact footprint &mdash; fits beside any turntable',
        'No hardware on the front face &mdash; clean look from every angle',
    ],
    fits_for='audiophile listening rooms, turntable consoles, gift programs, hotel and Airbnb styling, record stores',
    audience='High-end audio gift brands, boutique record retailers and lifestyle stores who want a small impulse-buy or gift-with-purchase item that signals taste.',
    sku='CHIC-VR-002',
    meta_title='Walnut "Now Playing" Vinyl Record Stand | Custom OEM',
    meta_desc='Solid walnut "Now Playing" vinyl album display stand &mdash; single LP showcase with laser-engraved cue. OEM, custom branding, low MOQ wholesale.',
    images=img('walnut-now-playing-vinyl-album-display-stand',
               ['01.jpeg', '02.jpeg', '03.jpg', '04.jpg']),
    keywords=['now playing record stand', 'walnut vinyl display',
              'single LP showcase', 'audiophile gift', 'record holder wood',
              'turntable accessory'],
))

# 3. Rustic 3-tier vinyl magazine desktop organizer
PRODUCTS.append(make_product(
    7102,
    'rustic-3-tier-vinyl-magazine-desktop-organizer',
    'Rustic 3-Tier Vinyl & Magazine Desktop Organizer — Wood + Black Mesh Office Rack',
    material='Reclaimed-look engineered wood panels in distressed walnut tone with powder-coated black steel mesh fronts. Solid back panel, reinforced corner brackets.',
    capacity='Three stepped compartments &mdash; lower tier 13.5&quot; deep accepts full-size LPs and large magazines; middle and top tiers hold notebooks, mail, paperbacks or 7&quot; singles.',
    dim='Width 34 cm &middot; Depth 27 cm &middot; Height 40 cm (15.75&quot;)',
    style='A workhorse industrial-farmhouse organizer &mdash; the same vocabulary as the popular Songmics / Vasagle rustic series, but with a stepped 3-tier silhouette that earns its desk space by handling vinyl, magazines and office paperwork at once.',
    use_cases=[
        'Home-office desk organizer that doubles as a vinyl display',
        'Studio / podcast booth storage for records and reference material',
        'Entryway mail + magazine + record drop zone',
        'Living-room console organizer next to the turntable',
    ],
    intro='A 3-tier rustic wood and black mesh desktop organizer with one bay deep enough for full 12&quot; LPs and two upper tiers for magazines, mail and singles &mdash; the industrial-farmhouse look pulling double duty as a vinyl display.',
    features=[
        'Three stepped tiers &mdash; lower bay sized for full 12&quot; LP records',
        'Distressed-walnut MDF panels with reinforced corners',
        'Powder-coated black steel mesh fronts (rust-resistant)',
        'Solid back panel keeps records from sliding through',
        'Felt feet protect desks and floors',
        'Flat-pack ready &mdash; assembles in under 10 minutes',
    ],
    fits_for='home offices, podcast studios, entryways, living rooms, college dorms, rustic / industrial / farmhouse interiors',
    audience='Online home-organization brands (Amazon, Wayfair), industrial-farmhouse retailers, office-supply private-label programs needing a multi-purpose SKU with broad appeal.',
    sku='CHIC-VR-003',
    meta_title='3-Tier Rustic Vinyl & Magazine Desk Organizer | Wholesale OEM',
    meta_desc='3-tier rustic wood + black mesh vinyl record and magazine desktop organizer &mdash; industrial-farmhouse look, fits 12&quot; LPs. OEM B2B wholesale.',
    images=img('rustic-3-tier-vinyl-magazine-desktop-organizer',
               ['01.jpeg', '02.jpeg', '03.jpeg', '04.jpeg']),
    keywords=['vinyl record organizer rack', 'magazine holder wood mesh',
              'rustic desk organizer', 'industrial farmhouse rack',
              'multi-tier LP storage', '3-tier vinyl shelf'],
))

# 4. Wooden flip-bin with metal arches
PRODUCTS.append(make_product(
    7103,
    'wooden-flip-bin-vinyl-record-display-metal-arches',
    'Wooden Flip-Bin Vinyl Record Display with Metal Arches — Record-Store Style LP Browser',
    material='Solid acacia or walnut-stained rubberwood base with black powder-coated steel arch dividers welded to a flat foot. The arches act as both spine support and visual frame.',
    capacity='Holds 40&ndash;60 12&quot; LPs in flip-bin orientation. Front-most record is fully displayed; the rest are browseable spine-up.',
    dim='Width 38 cm &middot; Depth 33 cm &middot; Height 27 cm',
    style='Pure record-store flip-bin energy on a tabletop scale. The metal arch frame is unapologetically retro &mdash; channelling the chrome browsers of 1970s Tower Records but compressed into a piece that sits beautifully on a credenza.',
    use_cases=[
        'Tabletop record-store flip browser at home',
        'Pop-up shop or merch table vinyl display',
        'Cafe / bar background styling',
        'Gift for the obsessive collector who already owns a Kallax',
    ],
    intro='A flip-bin style vinyl display with a solid wooden base and welded black metal arches &mdash; record-store browsing at desktop scale, with the front record displayed face-out and the rest spine-up for easy thumbing.',
    features=[
        'Flip-bin orientation &mdash; one record displayed, the rest browseable',
        'Solid wood base, powder-coated steel arch dividers',
        '40&ndash;60 LP capacity in compact footprint',
        'Removable arch panels for cleaning or restyling',
        'Felt pads on the underside protect wooden furniture',
        'Optional acrylic divider tabs (A&ndash;Z) available as ODM',
    ],
    fits_for='turntable consoles, credenzas, record stores, cafes, pop-up shops, music-themed retail merchandising',
    audience='Record retailers, music-merch private-label brands and home-decor stores wanting a halo SKU that reads &quot;serious collector&quot; without filling a whole wall.',
    sku='CHIC-VR-004',
    meta_title='Wooden Flip-Bin Vinyl Display with Metal Arches | OEM Wholesale',
    meta_desc='Tabletop wooden flip-bin vinyl record display with welded metal arches &mdash; record-store style LP browser. 40&ndash;60 LP capacity, B2B OEM.',
    images=img('wooden-flip-bin-vinyl-record-display-metal-arches',
               ['01.jpg', '02.jpg', '03.jpg', '04.jpeg', '05.jpeg', '06.jpg']),
    keywords=['vinyl flip bin', 'record store display rack',
              'LP browser wooden', 'vinyl record holder metal arch',
              'tabletop record browser', 'record flip rack wholesale'],
))

# 5. Engraved Now Playing wooden vinyl album stand
PRODUCTS.append(make_product(
    7104,
    'engraved-now-playing-wooden-vinyl-album-stand',
    'Laser-Engraved "Now Playing" Wooden Vinyl Album Stand — Vinyl-Groove Plaque Design',
    material='Two-tone solid hardwood: deep walnut-stained back plaque with a contrasting natural maple inlay carved as a vinyl-groove disc pattern. CNC routing and laser engraving combined for the &quot;NOW PLAYING&quot; tag.',
    capacity='Cradles one 12&quot; LP or gatefold sleeve at a 75&deg; leaning angle. The vinyl-groove engraving on the back plaque shows around the album, framing it like a poster.',
    dim='Width 18 cm &middot; Depth 11 cm &middot; Height 24 cm',
    style='A more graphic, illustrative take on the &quot;now playing&quot; trend &mdash; the back plaque doubles as wall art when no record is loaded. Reads beautifully in modern, mid-century and farmhouse interiors thanks to the two-tone wood contrast.',
    use_cases=[
        'Audiophile listening corner / man-cave decor',
        'Music-store window styling',
        'Gift for collectors, DJs and music lovers',
        'Cafe and lounge interior detailing',
    ],
    intro='A laser-engraved "Now Playing" vinyl stand with a two-tone wood plaque carved in a vinyl-groove disc pattern &mdash; functions as a single-album display when loaded and as graphic wall art when empty.',
    features=[
        'CNC-carved vinyl-groove disc inlay (natural maple + walnut)',
        'Laser-engraved &quot;NOW PLAYING&quot; nameplate',
        'Cradles one 12&quot; LP or gatefold sleeve',
        'Doubles as standalone graphic wood art when no record loaded',
        'Hand-rubbed oil finish on solid hardwood',
        'Optional custom text engraving (band names, store branding)',
    ],
    fits_for='home audio rooms, music stores, gift retail, cafes, lounges, mid-century / modern / farmhouse interiors',
    audience='Music gift brands, audiophile e-commerce retailers and lifestyle stores looking for a high-perceived-value impulse item under $50 retail.',
    sku='CHIC-VR-005',
    meta_title='Laser-Engraved Now Playing Vinyl Stand | Wholesale OEM',
    meta_desc='Two-tone wooden "Now Playing" vinyl record stand with CNC-carved vinyl groove and laser engraving. Single-LP showcase, custom branding, OEM.',
    images=img('engraved-now-playing-wooden-vinyl-album-stand',
               ['01.jpg', '02.jpeg', '03.jpeg', '04.jpeg', '05.jpeg']),
    keywords=['now playing stand wood', 'engraved vinyl record holder',
              'vinyl groove plaque', 'audiophile gift stand',
              'CNC vinyl display', 'laser engraved record stand'],
))

# 6. X-shape wooden multifunction stand
PRODUCTS.append(make_product(
    7105,
    'x-shape-wooden-multifunction-record-phone-stand',
    'X-Shape Wooden Multifunction Vinyl Record / Phone / Menu Stand — Pine Cross-Frame',
    material='Solid pine boards joined in an interlocking X-cross with mortise-and-tenon style notches &mdash; no screws, no nails. Hand-burnished torch finish brings out the grain.',
    capacity='Holds one 12&quot; vinyl sleeve in display mode, OR a phone / tablet in horizontal orientation, OR a folded restaurant menu / cookbook / iPad standing up.',
    dim='Width 22 cm &middot; Depth 18 cm &middot; Height 14 cm',
    style='A genuinely clever piece: the X-cross silhouette reads as sculpture even when empty. Lazy multifunction by design &mdash; one stand serves the turntable in the morning, the kitchen recipe at lunch, and the phone-watching couch in the evening.',
    use_cases=[
        'Vinyl &quot;now playing&quot; display next to turntable',
        'Kitchen cookbook / tablet stand',
        'Restaurant menu / specials-board holder',
        'Lazy phone / tablet stand for couch or bedside',
    ],
    intro='An X-cross interlocking wooden stand that holds a vinyl sleeve, a phone, a tablet, a cookbook or a restaurant menu equally well &mdash; one piece, four jobs. Solid pine with a torched grain finish, no hardware, ships flat.',
    features=[
        'Interlocking X-cross design &mdash; assembles without tools',
        'Multi-function: vinyl, phone, tablet, cookbook, menu',
        'Solid pine with torched grain finish',
        'Ships flat &mdash; ideal for low-cost ocean freight',
        'No screws, no hardware &mdash; pure wood-on-wood',
        'Adjustable angle by repositioning the cross-piece notch',
    ],
    fits_for='turntables, kitchens, restaurant tables, cafe counters, bedsides, lazy couch surfing',
    audience='Cross-border e-commerce brands (Amazon / TikTok Shop / Temu) and gift retailers looking for a high-margin, low-shipping-cost SKU with multiple use-case marketing angles.',
    sku='CHIC-VR-006',
    meta_title='X-Shape Wooden Vinyl / Phone / Menu Stand | Flat-Pack OEM',
    meta_desc='X-cross interlocking pine wood stand &mdash; holds vinyl records, phones, tablets, cookbooks or menus. Flat-pack, no tools, OEM wholesale.',
    images=img('x-shape-wooden-multifunction-record-phone-stand',
               ['01.jpg', '02.jpg', '03.jpg', '04.jpg']),
    keywords=['multifunction wooden stand', 'vinyl phone tablet holder',
              'cookbook menu stand wood', 'X-cross flat-pack stand',
              'lazy phone stand wood', 'pine vinyl record display'],
))

# 7. Paulownia vinyl record crate w/ handle cutouts
PRODUCTS.append(make_product(
    7106,
    'paulownia-wooden-vinyl-record-crate-handles',
    'Paulownia Wooden Vinyl Record Crate with Handle Cutouts — Portable LP Storage Box',
    material='Lightweight solid paulownia (kiri) wood &mdash; the same wood used for traditional Japanese kimono boxes. Hand-sanded, sealed with a clear matte finish that lets the natural pale-blonde grain show.',
    capacity='Holds 50&ndash;70 standard 12&quot; LPs in vertical orientation &mdash; full DJ-crate capacity, but at a fraction of the weight of pine or oak.',
    dim='Width 36 cm &middot; Depth 38 cm &middot; Height 32 cm',
    style='Pure Japandi minimalism: pale paulownia grain, butted joints, recessed handle cutouts on both ends, nothing else. The crate that looks the same in a Tokyo apartment as in a Brooklyn loft.',
    use_cases=[
        'Portable DJ / home vinyl crate',
        'Bookshelf / Kallax-cube vinyl storage insert',
        'Stackable record collection storage',
        'Magazine / cookbook / coffee-table-book bin',
    ],
    intro='A lightweight paulownia wood vinyl record crate sized to hold a full 50&ndash;70 LP collection, with recessed handle cutouts on both ends for easy carrying. Pure Japandi minimalism &mdash; pale blonde grain, butted joints, no metal hardware.',
    features=[
        'Solid paulownia wood &mdash; lightest commercial timber (~280 kg/m&sup3;)',
        'Holds 50&ndash;70 12&quot; LPs in vertical orientation',
        'Recessed handle cutouts on both ends for two-hand carry',
        'Stackable footprint &mdash; multiple crates align cleanly',
        'Fits inside IKEA Kallax 33&times;33 cube apertures',
        'Hand-sanded with clear matte sealant &mdash; food-safe finish',
    ],
    fits_for='home vinyl rooms, DJ booths, apartments, Kallax-cube storage systems, minimalist / Japandi / Scandinavian interiors',
    audience='Lifestyle and music brands targeting young apartment-dwelling collectors who care about freight weight and minimalist aesthetics; ideal for DTC e-commerce.',
    sku='CHIC-VR-007',
    meta_title='Paulownia Wood Vinyl Record Crate with Handles | OEM Wholesale',
    meta_desc='Lightweight paulownia wood vinyl record crate &mdash; 50&ndash;70 LP capacity, recessed handles, Kallax-fit. Japandi style. OEM B2B wholesale.',
    images=img('paulownia-wooden-vinyl-record-crate-handles',
               ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg']),
    keywords=['paulownia vinyl crate', 'wooden record crate handles',
              'LP storage box wood', 'Kallax vinyl insert',
              'lightweight record crate', 'DJ crate paulownia'],
))

# 8. Rustic wood + mesh vinyl flip-bin
PRODUCTS.append(make_product(
    7107,
    'rustic-wood-mesh-vinyl-record-flip-bin',
    'Rustic Wood & Mesh Vinyl Record Flip-Bin — Front-Facing LP Display Box',
    material='Reclaimed-look distressed walnut MDF panels with two opposing powder-coated black steel mesh side panels. Solid back panel, brand-burnished side handles.',
    capacity='Front-loading flip-bin holds 30&ndash;50 12&quot; LPs with the front album face-out and the rest displayed at a 15&deg; lean for easy browsing.',
    dim='Width 36 cm &middot; Depth 36 cm &middot; Height 26 cm',
    style='Industrial-farmhouse meets record-store fixture &mdash; the dark walnut grain plus matte black mesh is one of the strongest-selling silhouettes on Amazon and Wayfair in this category.',
    use_cases=[
        'Tabletop or floor flip-bin for a vinyl collection',
        'Cafe / restaurant feature display for &quot;album of the month&quot;',
        'Retail merch fixture in record / book / gift stores',
        'Coffee-table book and magazine bin',
    ],
    intro='A front-loading flip-bin in distressed walnut wood with two opposing black mesh side panels and recessed grab handles &mdash; the album in front is displayed face-out while the rest of the collection sits at a browse-friendly 15&deg; lean.',
    features=[
        'Front-facing flip-bin display with 15&deg; back-lean',
        'Distressed walnut MDF panels &mdash; popular industrial-farmhouse look',
        'Powder-coated black steel mesh side panels',
        'Recessed side handles for carrying when empty',
        '30&ndash;50 LP capacity',
        'Felt feet protect tabletops and floors',
    ],
    fits_for='living rooms, cafes, record stores, bookshops, gift retail, industrial / rustic / farmhouse interiors',
    audience='Amazon / Wayfair / Walmart home-organization private label brands looking for a proven-converting silhouette in this category.',
    sku='CHIC-VR-008',
    meta_title='Rustic Wood Mesh Vinyl Record Flip-Bin | OEM Wholesale',
    meta_desc='Industrial-farmhouse vinyl record flip-bin in distressed walnut wood with black mesh sides &mdash; 30&ndash;50 LP capacity. OEM B2B wholesale.',
    images=img('rustic-wood-mesh-vinyl-record-flip-bin',
               ['01.jpeg', '02.jpg', '03.png', '04.jpg']),
    keywords=['vinyl flip bin rustic', 'wood mesh record holder',
              'industrial farmhouse vinyl rack', 'front facing LP display',
              'walnut wood record bin', 'Amazon vinyl crate'],
))

# 9. LED Now Playing vinyl stand for cafes
PRODUCTS.append(make_product(
    7108,
    'led-now-playing-vinyl-record-stand-cafe',
    'LED "Now Playing" Vinyl Record Stand — Backlit Cafe Atmosphere Display',
    material='Solid acacia wood base routed for an LED light strip, with a chrome / brushed-stainless wire frame back support. Warm-white LED backlights the engraved &quot;NOW PLAYING&quot; lettering. USB or 5V wall plug.',
    capacity='Cradles one 12&quot; LP or gatefold sleeve. Designed as a feature piece, not bulk storage.',
    dim='Width 30 cm &middot; Depth 18 cm &middot; Height 26 cm',
    style='The reason every speciality coffee shop and natural-wine bar on Instagram looks the same right now &mdash; warm wood, amber light, a single record floating on display. Pure ambient retail merchandising.',
    use_cases=[
        'Cafe / coffee-shop counter feature display',
        'Natural wine bar / cocktail bar atmosphere piece',
        'Boutique hotel lobby / lounge styling',
        'Audiophile listening room centrepiece',
    ],
    intro='A backlit "Now Playing" vinyl stand &mdash; solid acacia wood base routed with a warm-white LED strip that glows behind the engraved lettering, with a brushed-steel wire frame holding one 12&quot; album. Built for cafe and bar interior atmosphere.',
    features=[
        'Warm-white LED light strip routed into acacia base',
        'Engraved &quot;NOW PLAYING&quot; lettering glows when lit',
        'Brushed stainless steel wire frame back-supports the album',
        'USB-C or 5V wall-plug power (specify market)',
        'Cradles one 12&quot; LP or gatefold sleeve',
        'Optional custom text engraving (cafe name, bar logo)',
    ],
    fits_for='speciality cafes, natural wine bars, cocktail bars, boutique hotels, lounges, audiophile listening rooms',
    audience='Hospitality interior-design programs, cafe-equipment suppliers, boutique-hotel furnishings buyers and Etsy / Amazon retailers selling premium audiophile gifts.',
    sku='CHIC-VR-009',
    meta_title='LED "Now Playing" Vinyl Record Stand for Cafes | OEM Wholesale',
    meta_desc='Backlit "Now Playing" vinyl record stand in acacia wood with warm-white LED &mdash; cafe / bar atmosphere display, USB powered. OEM B2B wholesale.',
    images=img('led-now-playing-vinyl-record-stand-cafe',
               ['01.webp', '02.jpg', '03.jpg', '04.jpg', '05.jpg']),
    keywords=['LED vinyl record stand', 'now playing backlit display',
              'cafe record holder', 'illuminated LP stand',
              'wine bar vinyl decor', 'USB vinyl display'],
))

# 10. Industrial wood + iron LP rack
PRODUCTS.append(make_product(
    7109,
    'industrial-wood-iron-lp-vinyl-record-rack',
    'Industrial Wood & Iron LP Vinyl Record Rack — Floor-Standing Retro X-Frame Holder',
    material='Distressed walnut MDF shelving panels with welded matte-black steel X-frame side supports and central spine bar. Designed for the same industrial-meets-vintage vocabulary as the popular Songmics / VASAGLE retro lines.',
    capacity='Holds 80&ndash;120 12&quot; LPs across a two-tier vertical layout, with the front record displayed face-out and the rest spine-up.',
    dim='Width 56 cm &middot; Depth 38 cm &middot; Height 32 cm',
    style='The retro industrial look that dominates the &quot;vinyl record storage&quot; category on Amazon / Wayfair / Walmart &mdash; X-frame welded steel, distressed walnut shelves, matte-black hardware, optional brass label tags.',
    use_cases=[
        'Floor-standing vinyl collection display in a living room or den',
        'Record-store retail merch fixture',
        'Music studio / podcast booth statement piece',
        'Industrial / retro / loft / man-cave interiors',
    ],
    intro='A floor-standing industrial wood and iron vinyl record rack &mdash; matte black welded X-frames flank two distressed walnut shelves that together hold 80&ndash;120 LPs with the front album face-out and the rest spine-up for browsing.',
    features=[
        'Welded matte-black steel X-frame side supports',
        'Two distressed walnut MDF shelves with central spine bar',
        '80&ndash;120 LP capacity (two-tier)',
        'Front album displayed face-out; rest spine-up at 15&deg; lean',
        'Adjustable foot pads for uneven floors',
        'Flat-packs for low-cost LCL ocean freight',
    ],
    fits_for='living rooms, music dens, podcast studios, retail floors, loft / industrial / retro interiors',
    audience='Amazon FBA private-label brands, Wayfair / Walmart drop-ship sellers and big-box home-organization buyers needing a proven retro-industrial vinyl SKU.',
    sku='CHIC-VR-010',
    meta_title='Industrial Wood & Iron LP Vinyl Record Rack | OEM Wholesale',
    meta_desc='Industrial floor-standing vinyl record rack with welded iron X-frames and distressed walnut shelves &mdash; 80&ndash;120 LP capacity. OEM wholesale.',
    images=img('industrial-wood-iron-lp-vinyl-record-rack',
               ['01.webp', '02.jpeg', '03.jpeg']),
    keywords=['industrial vinyl record rack', 'iron wood LP holder',
              'X frame record stand', 'retro vinyl shelf',
              'Songmics style vinyl rack', 'floor vinyl record storage'],
))

# 11. Rustic 2-compartment vinyl + magazine storage bin
PRODUCTS.append(make_product(
    7110,
    'rustic-2-compartment-vinyl-magazine-storage-bin',
    'Rustic 2-Compartment Vinyl Record & Magazine Storage Bin — Twin-Bay Tabletop Caddy',
    material='Reclaimed-look distressed walnut MDF body with solid wood centre divider and integrated cutout handles at both top corners. Optional brass label-tag plates on each compartment.',
    capacity='Two side-by-side compartments, each holds 20&ndash;30 LPs / magazines &mdash; about 40&ndash;60 total. Useful for sorting (e.g. &quot;Listened&quot; vs &quot;To Listen&quot;, or current month vs back issues).',
    dim='Width 38 cm &middot; Depth 32 cm &middot; Height 28 cm',
    style='The classic farmhouse magazine bin silhouette, scaled up and reinforced to handle the weight of full-size LPs. Industrial-rustic walnut tones, soft-rounded corners, simple handle cutouts &mdash; reads instantly as a known shape on listing thumbnails.',
    use_cases=[
        'Living-room vinyl &amp; magazine drop zone',
        'Coffee-table-book bin',
        'Salon / barbershop / waiting room magazine caddy',
        'Office mail + back-issue sorting bin',
    ],
    intro='A twin-bay rustic walnut wood bin with a central divider, sized for splitting a vinyl collection or magazine pile into two organized compartments. Reinforced for the weight of full 12&quot; LP records, with handle cutouts top corners.',
    features=[
        'Two equal compartments separated by solid wood divider',
        'Reinforced bottom &mdash; handles full-LP load weight',
        'Recessed handle cutouts at both top corners',
        'Distressed walnut MDF body &mdash; industrial-farmhouse look',
        'Optional brass label-tag plates for sorting',
        'Felt feet protect side-tables and floors',
    ],
    fits_for='living rooms, salons, waiting rooms, home offices, coffee tables, magazine retail displays',
    audience='Home-organization e-commerce brands and salon / hospitality buyers wanting a known-good magazine-bin silhouette with extra duty handling LPs.',
    sku='CHIC-VR-011',
    meta_title='Twin-Bay Rustic Vinyl & Magazine Storage Bin | OEM Wholesale',
    meta_desc='2-compartment rustic walnut wood vinyl record and magazine storage bin &mdash; twin-bay tabletop caddy with handle cutouts. OEM B2B wholesale.',
    images=img('rustic-2-compartment-vinyl-magazine-storage-bin',
               ['01.png', '02.png', '03.png']),
    keywords=['2 compartment magazine bin', 'twin bay vinyl caddy',
              'rustic wood record sorter', 'farmhouse magazine holder',
              'vinyl magazine divider', 'wooden waiting room caddy'],
))

# 12. Reclaimed wood vinyl record crate (Sons of Slum style)
PRODUCTS.append(make_product(
    7111,
    'reclaimed-wood-vinyl-record-crate-handles',
    'Reclaimed-Look Wood Vinyl Record Crate with Side Cutout Handles — Farmhouse LP Box',
    material='Reclaimed-look distressed pine boards with a hand-rubbed dark walnut wash. Visible grain, planking lines and slight tonal variation board-to-board to mimic salvaged barn wood.',
    capacity='Holds 40&ndash;60 12&quot; LPs with the front sleeve fully face-out and the rest of the collection visible at a soft browse angle.',
    dim='Width 35 cm &middot; Depth 35 cm &middot; Height 30 cm',
    style='Pure barn-wood farmhouse character &mdash; the warm reclaimed-look that converts well to mid-western, ranch and rustic-coastal interior buyers. The front cutout doubles as a face-out album display and an upper grab handle for one-hand carry.',
    use_cases=[
        'Farmhouse-style living-room vinyl display',
        'Rustic-coastal short-term-rental decor',
        'Folk / Americana record store fixture',
        'Heirloom-gift packaging for a record collection',
    ],
    intro='A farmhouse-style reclaimed-look wood vinyl record crate with a tall front cutout that doubles as a face-out album display and a one-hand carry handle. Distressed pine boards with a dark walnut wash &mdash; warm, weathered, ready for the cabin or the Brooklyn loft.',
    features=[
        'Reclaimed-look distressed pine with dark walnut wash',
        'Tall front cutout &mdash; face-out album display + carry handle',
        'Side handle cutouts for two-hand transport',
        '40&ndash;60 LP capacity, front sleeve fully displayed',
        'Visible plank lines and tonal variation board-to-board',
        'Reinforced corner blocks &mdash; built to last under full LP load',
    ],
    fits_for='farmhouse, ranch, rustic-coastal and Americana interiors; cabins, lofts, short-term-rental hosts',
    audience='Farmhouse home-decor retailers, short-term rental / Airbnb supply brands, folk / Americana record stores and rustic-gift programs.',
    sku='CHIC-VR-012',
    meta_title='Reclaimed Wood Farmhouse Vinyl Record Crate | OEM Wholesale',
    meta_desc='Farmhouse reclaimed-look wood vinyl record crate &mdash; distressed pine, dark walnut wash, face-out album cutout. 40&ndash;60 LP. OEM wholesale.',
    images=img('reclaimed-wood-vinyl-record-crate-handles',
               ['01.png', '02.png', '03.png']),
    keywords=['farmhouse vinyl record crate', 'reclaimed wood LP holder',
              'rustic record box', 'distressed pine vinyl crate',
              'face-out album crate', 'Americana record storage'],
))

# 13. Wall-mounted floating vinyl record shelf set
PRODUCTS.append(make_product(
    7112,
    'wall-mounted-floating-vinyl-record-shelf-set',
    'Wall-Mounted Floating Vinyl Record Shelf Set — Now Playing Album Display Ledges (Pack of 9)',
    material='Solid acacia or walnut-stained rubberwood ledges with concealed steel mounting brackets and pre-drilled wall-anchor holes. Each ledge has a routed front lip that holds a 12&quot; sleeve face-out without slipping.',
    capacity='Each ledge displays ONE album face-out. Sold as a set of 9 (typical) or 6 / 12 / 24 wall-mount packs &mdash; mix-and-match grid layouts on request.',
    dim='Per ledge: Width 14 cm &middot; Depth 4 cm &middot; Height 4 cm (front lip 2 cm tall)',
    style='Treat your records like art &mdash; the wall-mounted floating ledge has become the dominant vinyl-display pattern on Instagram and TikTok. Concealed brackets give a true floating look; each sleeve becomes a rotating piece of gallery art that you can swap weekly.',
    use_cases=[
        'Vinyl-as-art gallery wall in a living room or studio',
        'Rotating &quot;album of the week&quot; display',
        'Record-store retail wall fixture',
        'Cafe / bar / record-club interior styling',
    ],
    intro='A multi-pack of wall-mounted floating wooden ledges sized to display one 12&quot; vinyl sleeve each, face-out, with concealed brackets that hide the hardware. Hang a 3&times;3 grid, a stair-step, or a full gallery wall.',
    features=[
        'Set of 9 wall-mount floating ledges (custom pack sizes available)',
        'Each ledge holds one 12&quot; LP face-out via a routed front lip',
        'Concealed steel mounting bracket &mdash; true floating look',
        'Solid hardwood with warm matte finish',
        'Pre-drilled, pre-anchored kit included',
        'Each ledge swaps in seconds &mdash; rotate the &quot;album of the week&quot;',
    ],
    fits_for='living-room gallery walls, music studios, record stores, cafes, bars, music clubs',
    audience='Music gift retailers, audiophile lifestyle brands and home-decor stores; popular Etsy / Amazon multi-pack SKU.',
    sku='CHIC-VR-013',
    meta_title='Wall-Mounted Floating Vinyl Record Shelf Set (Pack of 9) | OEM Wholesale',
    meta_desc='Wall-mounted floating wooden vinyl record display ledges &mdash; pack of 9, concealed brackets, holds 12&quot; LPs face-out. OEM B2B wholesale.',
    images=img('wall-mounted-floating-vinyl-record-shelf-set',
               ['01.png', '02.png', '03.png', '04.png']),
    keywords=['wall mounted vinyl shelf', 'floating record display',
              'vinyl ledge wall mount', 'now playing wall shelf',
              'album wall mount wood', 'vinyl gallery shelf set'],
))

# 14. Trapezoid wood + iron vinyl LP organizer
PRODUCTS.append(make_product(
    7113,
    'trapezoid-wood-iron-vinyl-lp-organizer',
    'Trapezoid Wood & Iron Vinyl LP Organizer — Geometric Frame Record Bin',
    material='Distressed walnut MDF body cradled inside a welded matte-black iron trapezoidal outer frame. The frame protects the wooden bin edges and adds a geometric architectural silhouette.',
    capacity='Holds 30&ndash;45 12&quot; LPs in vertical orientation, or 25&ndash;35 magazines / large books.',
    dim='Width 50 cm &middot; Depth 26 cm &middot; Height 30 cm',
    style='An architectural take on the industrial-farmhouse vinyl crate &mdash; the trapezoid iron silhouette reads as design-led furniture rather than utility storage. Stronger geometric profile than the X-frame and 3-tier siblings; competes with mid-century-modern lookalike SKUs.',
    use_cases=[
        'Mid-century modern living-room vinyl display',
        'Designer record-store fixture',
        'Architecture / design studio reception piece',
        'Geometric-style coffee-table-book / magazine bin',
    ],
    intro='A geometric trapezoidal iron frame cradles a distressed walnut wooden record bin &mdash; an architectural take on the vinyl crate that reads as designer furniture rather than utility storage. Holds 30&ndash;45 LPs or 25&ndash;35 magazines.',
    features=[
        'Welded matte-black iron trapezoidal outer frame',
        'Distressed walnut MDF inner record bin',
        '30&ndash;45 LP capacity (or magazines / large books)',
        'Architectural geometric silhouette &mdash; designer-look fixture',
        'Stable wide-base trapezoid form &mdash; will not tip when half-empty',
        'Felt floor pads protect hardwood floors',
    ],
    fits_for='mid-century modern, designer, architecture-studio, gallery and high-end retail interiors',
    audience='Design-led furniture e-commerce brands, gallery and architecture-studio suppliers, premium home-decor retailers wanting an elevated alternative to the generic rustic crate.',
    sku='CHIC-VR-014',
    meta_title='Trapezoid Wood & Iron Vinyl Record Organizer | OEM Wholesale',
    meta_desc='Designer trapezoid iron-frame and distressed walnut wood vinyl record organizer &mdash; 30&ndash;45 LP capacity, geometric silhouette. OEM wholesale.',
    images=img('trapezoid-wood-iron-vinyl-lp-organizer',
               ['01.png', '02.png', '03.png', '04.png']),
    keywords=['trapezoid vinyl record holder', 'iron frame LP organizer',
              'mid century modern vinyl rack', 'geometric record bin',
              'designer vinyl crate', 'architectural record storage'],
))

# ─── Append to products.json ──────────────────────────────────────────────
prods = json.load(open(PROD_JSON, encoding='utf-8'))
existing_slugs = {p['slug'] for p in prods}
existing_ids   = {p['id'] for p in prods}

added = 0
for np in PRODUCTS:
    if np['slug'] in existing_slugs:
        print(f'Skip (slug exists): {np["slug"]}')
        continue
    if np['id'] in existing_ids:
        # bump
        np['id'] = max(existing_ids) + 1 + added
    prods.append(np)
    added += 1
    print(f'Added: {np["slug"]} (id={np["id"]})')

json.dump(prods, open(PROD_JSON, 'w', encoding='utf-8'),
          indent=2, ensure_ascii=False)
print(f'\nTotal products now: {len(prods)} (+{added})')
