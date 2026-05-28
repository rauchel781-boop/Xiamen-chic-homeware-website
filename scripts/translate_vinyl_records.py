# One-off: hand-translate the 14 new vinyl record products and merge into
# messages/products.<lang>.json files. Used because Aliyun API isn't
# reachable from the sandbox; quality is reviewed by hand.
#
# Run once locally:  python scripts/translate_vinyl_records.py

import json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ─── English templates (must match scripts/translate.mjs buildOverview) ───
# Materials & template config matches MATERIALS_TR + TEMPLATES_TR in
# translate.mjs so we know which template each product falls into.

MATERIALS = {'bamboo':'Bamboo','acacia':'Acacia Wood','walnut':'Black Walnut',
             'pine':'Pine Wood','paulownia':'Paulownia','oak':'Oak Wood',
             'beech':'Beech Wood','rubberwood':'Rubberwood','teak':'Teak',
             'sapele':'Sapele','mdf':'MDF','plywood':'Plywood'}

TPL_DEFAULT_APPS = ['premium retail and brand packaging','hospitality and commercial use','gift and promotional programs']
TPL_STORAGE_APPS = ['home organization','closet and pantry storage','retail display']

def strip_html(s): return re.sub(r'\s+',' ',re.sub(r'<[^>]+>','',s or '')).strip()

def detect_material(title):
    t = title.lower()
    for k, v in MATERIALS.items():
        if k in t: return v
    return None

def detect_template(title, cats):
    t = title.lower()
    cs = [c['slug'] for c in cats]
    lookups = [
        ('cheese-board', ['cheese board','charcuterie']),
        ('cutting-board', ['cutting board','chopping board','bread board']),
        ('serving-tray', ['serving tray','sofa tray','breakfast tray','ottoman tray']),
        ('spice-rack', ['spice rack','spice organizer']),
        ('jewelry-box', ['jewelry box','ring box']),
        ('wine-box', ['wine box','wine case']),
        ('tea-box', ['tea box']),
        ('gift-box', ['gift box','keepsake box','memory box']),
        ('storage-box', ['storage box','organizer box','stash box']),
    ]
    for tpl, kws in lookups:
        if any(kw in t for kw in kws) or any(tpl in c for c in cs):
            return tpl
    return 'default'

# ─── Hand-translated titles for each of the 14 vinyl products ─────────────
TITLES = {
    'pine-tabletop-vinyl-record-book-display-bench': {
        'en': 'Pine Tabletop Vinyl Record & Book Display Bench — Open Two-Sided Wooden Holder',
        'de': 'Tisch-Schallplatten- & Buchregal aus Kiefer — Offener zweiseitiger Holzhalter',
        'es': 'Banco Expositor de Vinilos y Libros de Mesa en Madera de Pino — Soporte de Madera Abierto de Dos Lados',
        'fr': 'Banc d\'Exposition Vinyles & Livres de Bureau en Pin — Support en Bois Ouvert Double Face',
        'ja': 'パイン材卓上ビニールレコード&ブックディスプレイベンチ — オープン両面木製ホルダー',
    },
    'walnut-now-playing-vinyl-album-display-stand': {
        'en': 'Walnut Wood "Now Playing" Vinyl Album Display Stand — Single LP Showcase',
        'de': 'Walnussholz "Now Playing" Vinyl-Album-Displayständer — Einzel-LP-Showcase',
        'es': 'Soporte Expositor de Álbumes de Vinilo "Now Playing" en Madera de Nogal — Showcase para un LP',
        'fr': 'Présentoir d\'Album Vinyle "Now Playing" en Bois de Noyer — Vitrine Single LP',
        'ja': 'ウォルナット材「Now Playing」ビニールアルバム ディスプレイスタンド — シングルLPショーケース',
    },
    'rustic-3-tier-vinyl-magazine-desktop-organizer': {
        'en': 'Rustic 3-Tier Vinyl & Magazine Desktop Organizer — Wood + Black Mesh Office Rack',
        'de': 'Rustikaler 3-stufiger Schallplatten- & Magazin-Tischorganizer — Holz + schwarzes Mesh-Büroregal',
        'es': 'Organizador de Escritorio Rústico de 3 Niveles para Vinilos y Revistas — Estante de Oficina de Madera + Malla Negra',
        'fr': 'Organisateur de Bureau Rustique 3 Niveaux pour Vinyles & Magazines — Rack de Bureau Bois + Maille Noire',
        'ja': 'ラスティック3段ビニール&マガジン デスクトップオーガナイザー — 木材+ブラックメッシュ オフィスラック',
    },
    'wooden-flip-bin-vinyl-record-display-metal-arches': {
        'en': 'Wooden Flip-Bin Vinyl Record Display with Metal Arches — Record-Store Style LP Browser',
        'de': 'Holz-Flip-Bin Vinyl-Schallplatten-Display mit Metallbögen — LP-Browser im Plattenladen-Stil',
        'es': 'Expositor de Vinilos Flip-Bin de Madera con Arcos Metálicos — Buscador de LPs Estilo Tienda de Discos',
        'fr': 'Bac à Vinyles en Bois Flip-Bin avec Arches Métalliques — Browser LP Style Disquaire',
        'ja': 'メタルアーチ付き木製フリップビン ビニールレコードディスプレイ — レコードショップスタイル LPブラウザー',
    },
    'engraved-now-playing-wooden-vinyl-album-stand': {
        'en': 'Laser-Engraved "Now Playing" Wooden Vinyl Album Stand — Vinyl-Groove Plaque Design',
        'de': 'Lasergravierter Holz-Vinyl-Album-Ständer "Now Playing" — Schallplattenrillen-Plakette Design',
        'es': 'Soporte de Álbumes de Vinilo de Madera "Now Playing" Grabado con Láser — Diseño de Placa con Surcos de Vinilo',
        'fr': 'Présentoir d\'Album Vinyle en Bois "Now Playing" Gravé au Laser — Design Plaque à Sillons de Vinyle',
        'ja': 'レーザー彫刻「Now Playing」木製ビニールアルバムスタンド — ビニール溝プラークデザイン',
    },
    'x-shape-wooden-multifunction-record-phone-stand': {
        'en': 'X-Shape Wooden Multifunction Vinyl Record / Phone / Menu Stand — Pine Cross-Frame',
        'de': 'X-förmiger Holz-Multifunktionsständer für Schallplatten / Telefone / Menüs — Kiefer-Kreuzrahmen',
        'es': 'Soporte Multifuncional de Madera en Forma de X para Vinilos / Teléfonos / Menús — Marco Cruzado de Pino',
        'fr': 'Support Multifonction en Bois Forme X pour Vinyles / Téléphones / Menus — Cadre Croisé en Pin',
        'ja': 'X字型木製マルチファンクション ビニール/スマホ/メニュースタンド — パイン材クロスフレーム',
    },
    'paulownia-wooden-vinyl-record-crate-handles': {
        'en': 'Paulownia Wooden Vinyl Record Crate with Handle Cutouts — Portable LP Storage Box',
        'de': 'Paulownia-Holz Schallplattenkiste mit Griffaussparungen — Tragbare LP-Aufbewahrungsbox',
        'es': 'Cajón de Vinilos en Madera de Paulownia con Asas Recortadas — Caja de Almacenamiento de LPs Portátil',
        'fr': 'Caisse à Vinyles en Bois de Paulownia avec Poignées Découpées — Boîte de Rangement LP Portable',
        'ja': '桐材ビニールレコードクレート(取っ手切抜き) — ポータブルLP収納ボックス',
    },
    'rustic-wood-mesh-vinyl-record-flip-bin': {
        'en': 'Rustic Wood & Mesh Vinyl Record Flip-Bin — Front-Facing LP Display Box',
        'de': 'Rustikaler Holz- & Mesh-Vinyl-Flip-Bin — LP-Display-Box mit Frontansicht',
        'es': 'Flip-Bin de Vinilos en Madera Rústica y Malla — Caja Expositora de LPs Frontal',
        'fr': 'Bac à Vinyles Rustique en Bois & Maille — Boîte de Présentation LP Frontale',
        'ja': 'ラスティック木材&メッシュ ビニールレコードフリップビン — フロントフェイシング LPディスプレイボックス',
    },
    'led-now-playing-vinyl-record-stand-cafe': {
        'en': 'LED "Now Playing" Vinyl Record Stand — Backlit Cafe Atmosphere Display',
        'de': 'LED "Now Playing" Vinyl-Schallplattenständer — Hinterleuchtetes Café-Atmosphäre-Display',
        'es': 'Soporte de Vinilos LED "Now Playing" — Expositor Retroiluminado de Ambiente para Café',
        'fr': 'Présentoir de Vinyles LED "Now Playing" — Affichage Rétroéclairé Ambiance Café',
        'ja': 'LED「Now Playing」ビニールレコードスタンド — バックライト式カフェアトモスフィアディスプレイ',
    },
    'industrial-wood-iron-lp-vinyl-record-rack': {
        'en': 'Industrial Wood & Iron LP Vinyl Record Rack — Floor-Standing Retro X-Frame Holder',
        'de': 'Industrieller Holz- & Eisen LP-Vinyl-Schallplattenständer — Freistehender Retro X-Rahmen-Halter',
        'es': 'Estante Industrial de Madera y Hierro para LPs de Vinilo — Soporte de Pie Retro con Marco en X',
        'fr': 'Étagère Industrielle Bois & Fer pour Vinyles LP — Support Vintage Cadre en X sur Pied',
        'ja': 'インダストリアル木材&アイアン LPビニールレコードラック — フロアスタンディング レトロX字フレームホルダー',
    },
    'rustic-2-compartment-vinyl-magazine-storage-bin': {
        'en': 'Rustic 2-Compartment Vinyl Record & Magazine Storage Bin — Twin-Bay Tabletop Caddy',
        'de': 'Rustikale 2-Fach Schallplatten- & Magazin-Aufbewahrungsbox — Zweikammer-Tischorganizer',
        'es': 'Caja de Almacenamiento Rústica de 2 Compartimentos para Vinilos y Revistas — Organizador de Mesa de Doble Bahía',
        'fr': 'Bac de Rangement Rustique 2 Compartiments pour Vinyles & Magazines — Caddy de Bureau Double Baie',
        'ja': 'ラスティック2コンパートメント ビニールレコード&マガジン収納ビン — ツインベイ卓上キャディ',
    },
    'reclaimed-wood-vinyl-record-crate-handles': {
        'en': 'Reclaimed-Look Wood Vinyl Record Crate with Side Cutout Handles — Farmhouse LP Box',
        'de': 'Vintage-Look Holz-Schallplattenkiste mit seitlichen Griffaussparungen — Farmhouse-LP-Box',
        'es': 'Cajón de Vinilos en Madera Estilo Reciclado con Asas Recortadas Laterales — Caja de LPs Farmhouse',
        'fr': 'Caisse à Vinyles en Bois Style Récupéré avec Poignées Découpées Latérales — Boîte LP Farmhouse',
        'ja': '再生風木材ビニールレコードクレート(サイド取っ手切抜き付き) — ファームハウスLPボックス',
    },
    'wall-mounted-floating-vinyl-record-shelf-set': {
        'en': 'Wall-Mounted Floating Vinyl Record Shelf Set — Now Playing Album Display Ledges (Pack of 9)',
        'de': 'Wandmontiertes schwebendes Vinyl-Schallplatten-Regal-Set — "Now Playing" Album-Display-Ablagen (9er-Pack)',
        'es': 'Set de Estanterías Flotantes de Vinilos para Pared — Repisas para Exhibir Álbumes "Now Playing" (Pack de 9)',
        'fr': 'Ensemble d\'Étagères Flottantes Murales pour Vinyles — Tablettes de Présentation d\'Albums "Now Playing" (Pack de 9)',
        'ja': '壁掛けフローティング ビニールレコードシェルフセット — 「Now Playing」アルバムディスプレイレッジ(9枚パック)',
    },
    'trapezoid-wood-iron-vinyl-lp-organizer': {
        'en': 'Trapezoid Wood & Iron Vinyl LP Organizer — Geometric Frame Record Bin',
        'de': 'Trapezförmiger Holz- & Eisen-Vinyl-LP-Organizer — Geometrischer Rahmen-Schallplattenbehälter',
        'es': 'Organizador de LPs de Vinilo Trapezoidal de Madera y Hierro — Caja de Vinilos con Marco Geométrico',
        'fr': 'Organisateur LP Vinyle Trapézoïdal Bois & Fer — Bac à Vinyles Cadre Géométrique',
        'ja': 'トラペゾイド木材&アイアン ビニールLPオーガナイザー — ジオメトリックフレーム レコードビン',
    },
}

# ─── Per-language template substitutions ─────────────────────────────────
# productType: 'default' = "wooden product", 'storage-box' = "storage box"
# materials: lowercase versions used in the with-material template
# apps: positional list of 3 apps for default; 3 for storage-box

L10N = {
    'de': {
        'productType': {'default': 'Holzprodukt', 'storage-box': 'Aufbewahrungsbox'},
        'materials': {'Pine Wood': 'Kiefernholz', 'Black Walnut': 'Schwarznussholz', 'Paulownia': 'Paulownia-Holz'},
        'apps_default': ['Premium-Einzelhandels- und Markenverpackungen', 'Hospitality- und gewerbliche Anwendungen', 'Geschenk- und Werbeprogramme'],
        'apps_storage': ['Haushaltsorganisation', 'Kleiderschrank- und Speisekammeraufbewahrung', 'Einzelhandelsdisplays'],
        'tpl_with_mat': 'Das {title} ist ein Premium-{pt} aus {mat}, entwickelt für {app0} und mehr. Hergestellt von CHIC — einem werksdirekten Hersteller von Holzprodukten in China — kombiniert dieses Stück traditionelle Handwerkskunst mit modernen Produktionstechniken, um auch bei Großhandelsmengen eine gleichbleibende Qualität zu liefern. Ob Sie für {app1} oder {app2} einkaufen — wir bieten vollständige OEM-Anpassung inklusive individueller Größen, Oberflächen, Logo-Branding und Private-Label-Verpackung.',
        'tpl_default':  'Das {title} ist ein maßgeschneidertes {pt}, hergestellt von CHIC, einem Hersteller von Holzprodukten in China, spezialisiert auf OEM- und Private-Label-Produktion für globale Marken. Konzipiert für {app0} und {app1}, ist dieses Stück voll anpassbar — Größe, Material, Oberfläche, Logo und Verpackung — passend für Ihr Einzelhandelsprogramm, Ihre Geschenklinie oder Ihr Hospitality-Konto.',
    },
    'es': {
        'productType': {'default': 'producto de madera', 'storage-box': 'caja de almacenamiento'},
        'materials': {'Pine Wood': 'madera de pino', 'Black Walnut': 'nogal negro', 'Paulownia': 'madera de paulownia'},
        'apps_default': ['el embalaje minorista y de marca premium', 'el uso comercial y de hostelería', 'los programas de regalos y promocionales'],
        'apps_storage': ['la organización del hogar', 'el almacenamiento de armario y despensa', 'la exhibición minorista'],
        'tpl_with_mat': 'El {title} es un {pt} premium elaborado en {mat}, diseñado para {app0} y mucho más. Fabricado por CHIC — un fabricante directo de productos de madera en China — esta pieza combina la artesanía tradicional con técnicas de producción modernas para ofrecer una calidad constante a volúmenes mayoristas. Tanto si lo busca para {app1} como para {app2}, ofrecemos personalización OEM completa, incluyendo tamaño a medida, acabado, marcado de logo y embalaje de marca blanca.',
        'tpl_default':  'El {title} es un {pt} personalizado fabricado por CHIC, un fabricante de productos de madera en China especializado en producción OEM y de marca blanca para marcas globales. Diseñado para {app0} y {app1}, esta pieza es totalmente personalizable — tamaño, material, acabado, logo y embalaje — para adaptarse a su programa minorista, su línea de regalos o su cuenta de hostelería.',
    },
    'fr': {
        'productType': {'default': 'produit en bois', 'storage-box': 'boîte de rangement'},
        'materials': {'Pine Wood': 'bois de pin', 'Black Walnut': 'noyer noir', 'Paulownia': 'bois de paulownia'},
        'apps_default': ['l\'emballage de vente au détail et de marque premium', 'l\'usage hôtelier et commercial', 'les programmes cadeaux et promotionnels'],
        'apps_storage': ['l\'organisation domestique', 'le rangement de placard et de garde-manger', 'la présentation en magasin'],
        'tpl_with_mat': 'Le {title} est un {pt} premium fabriqué en {mat}, conçu pour {app0} et bien plus. Fabriqué par CHIC — un fabricant direct d\'usine de produits en bois en Chine — cette pièce combine l\'artisanat traditionnel et les techniques de production modernes pour offrir une qualité constante en volumes de gros. Que vous achetiez pour {app1} ou {app2}, nous proposons une personnalisation OEM complète, incluant taille sur mesure, finition, marquage de logo et conditionnement en marque blanche.',
        'tpl_default':  'Le {title} est un {pt} sur mesure fabriqué par CHIC, un fabricant de produits en bois en Chine spécialisé dans la production OEM et marque blanche pour les marques mondiales. Conçue pour {app0} et {app1}, cette pièce est entièrement personnalisable — taille, matériau, finition, logo et emballage — pour s\'adapter à votre programme de vente au détail, votre ligne de cadeaux ou votre compte hôtellerie.',
    },
    'ja': {
        'productType': {'default': '木製品', 'storage-box': '収納ボックス'},
        'materials': {'Pine Wood': 'パイン材', 'Black Walnut': 'ブラックウォルナット材', 'Paulownia': '桐材'},
        'apps_default': ['プレミアム小売・ブランドパッケージ', 'ホスピタリティ・商業利用', 'ギフト・販促プログラム'],
        'apps_storage': ['家庭の整理整頓', 'クローゼットやパントリーの収納', '小売ディスプレイ'],
        'tpl_with_mat': '{title}は、{mat}を使用したプレミアム{pt}で、{app0}などに最適です。中国の工場直営木製品メーカー、CHICが製造する当商品は、伝統的な職人技と現代の生産技術を融合させることで、卸売規模でも一貫した品質を実現しています。{app1}や{app2}向けの調達をお考えの方には、カスタムサイズ、仕上げ、ロゴブランディング、プライベートラベル包装を含む完全なOEMカスタマイズに対応しています。',
        'tpl_default':  '{title}は、CHICが製造するカスタム{pt}です。CHICは中国の木製品メーカーで、世界中のブランド向けにOEMおよびプライベートラベル生産を専門としています。{app0}や{app1}向けに設計され、サイズ、素材、仕上げ、ロゴ、包装まで完全にカスタマイズ可能 — 御社の小売プログラム、ギフトライン、ホスピタリティアカウントに合わせて対応いたします。',
    },
}

# ─── Build per-product, per-language entries ─────────────────────────────
prods = json.load(open(os.path.join(ROOT, 'wp-data/products.json'), encoding='utf-8'))
new_prods = [p for p in prods if 7100 <= p['id'] <= 7113]
assert len(new_prods) == 14, f'expected 14 vinyl products, got {len(new_prods)}'

for lang in ['de', 'es', 'fr', 'ja']:
    cfg = L10N[lang]
    out_path = os.path.join(ROOT, f'messages/products.{lang}.json')
    data = json.load(open(out_path, encoding='utf-8'))
    added = 0
    for p in new_prods:
        slug = p['slug']
        en_title = strip_html(p['title'])
        mat_en = detect_material(en_title)
        tpl_key = detect_template(en_title, p['categories'])
        pt_local = cfg['productType']['storage-box' if tpl_key == 'storage-box' else 'default']
        apps = cfg['apps_storage'] if tpl_key == 'storage-box' else cfg['apps_default']
        title_local = TITLES[slug][lang]
        if mat_en:
            mat_local = cfg['materials'][mat_en]
            overview = cfg['tpl_with_mat'].format(
                title=title_local, pt=pt_local, mat=mat_local,
                app0=apps[0], app1=apps[1], app2=apps[2])
        else:
            overview = cfg['tpl_default'].format(
                title=title_local, pt=pt_local, app0=apps[0], app1=apps[1])
        data[slug] = {'title': title_local, 'overview': overview}
        added += 1
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')
    print(f'{lang}: +{added} entries → {out_path}')

print('Done.')
