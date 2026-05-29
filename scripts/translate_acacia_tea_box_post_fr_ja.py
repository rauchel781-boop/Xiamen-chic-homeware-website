# Continuation of translate_acacia_tea_box_post.py — adds FR and JA
# translations of the acacia-wood-tea-box-material-guide post.

import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SLUG = 'acacia-wood-tea-box-material-guide'

IMG = {
    'hero':         '/wp-images/2026/01/acacia-wood.png',
    'hospitality':  '/wp-images/2026/03/wooden-tea-bag-organizer-box-5.png',
    'compartments': '/wp-images/2026/03/wooden-tea-bag-organizer-box-4.png',
    'foodsafe':     '/wp-images/2026/03/wooden-tea-bag-organizer-box-9.png',
    'finish':       '/wp-images/2026/03/wooden-tea-bag-organizer-box-8.png',
    'logo':         '/wp-images/2026/03/wooden-tea-bag-organizer-box-6.png',
    'packaging':    '/wp-images/2026/03/wooden-tea-bag-organizer-box-7.png',
}

def img(src, alt):
    return (
        f'<!-- wp:image {{"sizeSlug":"large","linkDestination":"none"}} -->\n'
        f'<figure class="wp-block-image size-large">'
        f'<img src="{src}" alt="{alt}" /></figure>\n'
        f'<!-- /wp:image -->'
    )

# ══════════════════════════════════════════════════════════════════════════
# FRENCH
# ══════════════════════════════════════════════════════════════════════════

FR_TITLE = 'Boîtes à Thé en Bois d\'Acacia : Guide d\'Achat 2026 pour Marques, Hôtels et Programmes Cadeaux'
FR_META_TITLE = 'Boîte à Thé en Acacia : Guide d\'Achat 2026 (Matériau, MOQ, Coût)'
FR_META_DESC = (
    'Guide d\'achat des boîtes à thé en bois d\'acacia pour marques de thé, '
    'hôtels et programmes cadeaux — avec matrice de décision en 30 secondes, '
    'données de sécurité alimentaire, disposition des compartiments, '
    'finitions, MOQ et prix FOB de notre usine de Xiamen.'
)
FR_EXCERPT = (
    '<p>Un guide d\'approvisionnement orienté matériau pour 2026, à '
    'destination des marques B2B et acheteurs en marque blanche cherchant '
    'des boîtes à thé en bois d\'acacia — avec dureté Janka, comparaisons '
    'de sécurité alimentaire, dispositions de compartiments, finitions, '
    'styles de couvercle, MOQ et prix FOB depuis notre usine de Xiamen.</p>'
)

FR_CONTENT = f"""<!-- wp:paragraph -->
<p>Vous sourcez des boîtes à thé. Votre client (ou votre acheteur, ou votre responsable retail) veut une boîte qui ait l'air premium, qui sente le premium, qui se transporte sans gondoler, et qui passe un contrôle de sécurité alimentaire. Tous les guides que vous lisez vous disent d'utiliser du bois d'acacia. Ce guide répond à la question suivante : <strong>comment en commander une sans se faire piéger ?</strong></p>
<!-- /wp:paragraph -->

{img(IMG['hero'], "Gros plan sur la veinure du bois d'acacia montrant la variation de couleur miel à chocolat qui en fait le matériau de référence pour la fabrication de boîtes à thé premium.")}

<!-- wp:paragraph -->
<p>Voici le playbook que nous utilisons dans notre usine de Xiamen lorsque nous chiffrons des boîtes à thé en acacia pour des marques de thé en marque privée, des acheteurs hôtellerie et des programmes cadeaux d'entreprise. De vrais chiffres Janka. De vrais défauts que nous voyons encore dans les imports bon marché. De vrais prix FOB pour 2026. Et la matrice de décision en 30 secondes pour que vous puissiez sélectionner vous-même votre spec avant de lire un mot de plus.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>La matrice de décision en 30 secondes</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Trouvez la ligne qui correspond à votre projet, puis lisez uniquement les sections surlignées.</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>Si vous êtes…</th><th>Meilleure spec</th><th>Sections à lire</th></tr></thead><tbody>
<tr><td>Une marque de thé lançant 4 à 8 parfums</td><td>6 ou 8 compartiments, couvercle à charnière avec fenêtre acrylique, logo gravé au laser</td><td>§3, §6, §10, §12</td></tr>
<tr><td>Un acheteur hôtel/B&amp;B/café</td><td>10 compartiments, couvercle magnétique ou coulissant, huile alimentaire en intérieur</td><td>§4, §6, §7, §10</td></tr>
<tr><td>Responsable de programme cadeau d'entreprise</td><td>4 ou 6 compartiments, marquage dorure à chaud ou laser or, emballage prêt à offrir</td><td>§6, §12, §15</td></tr>
<tr><td>Une marque box-of-the-month / abonnement</td><td>6 compartiments, couvercle magnétique à rabat, impression UV personnalisée sur le couvercle</td><td>§6, §12, §13</td></tr>
<tr><td>Un retailer faisant un refresh de SKU</td><td>SKUs mixtes 4/6/8, couvercle coulissant, finition huile naturelle</td><td>§6, §8, §13</td></tr>
</tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p><strong>Vous voulez un devis maintenant ?</strong> Envoyez le nombre de compartiments, le style de couvercle, la méthode de marquage et la quantité cible via notre <a href="/contact">formulaire de contact</a> &mdash; nous répondons sous un jour ouvré avec un prix FOB indicatif.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Trois acheteurs, trois scénarios réels</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>La plupart de la confusion d'achat dans cette catégorie vient du mélange des cas d'usage. Voici les trois programmes que nous chiffrons le plus.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {{"level":3}} -->
<h3>Scénario A &mdash; Fondateur de marque de thé lançant une ligne six parfums</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p><em>&quot;J'ai six SKUs de thé en vrac, mon prix de vente est de 24 $ par boîte, je dois avoir l'air d'un Harney &amp; Sons en rayon sans payer leur prix unitaire.&quot;</em></p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>Spec recommandée :</strong> boîte acacia 6 compartiments, ~25&times;19&times;9 cm, couvercle à charnière avec fenêtre acrylique, intérieur huile minérale, logo gravé au laser sur le couvercle.</li>
<li><strong>Pourquoi ça marche :</strong> la fenêtre laisse le client voir les six sélections sans ouvrir ; le logo gravé au laser donne le sentiment heritage sans surcoût unitaire ; la veinure acacia photographie mieux que le bambou sur un hero shot.</li>
<li><strong>FOB indicatif à 1.000 pcs :</strong> 6,50–7,30 $ par pièce.</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {{"level":3}} -->
<h3>Scénario B &mdash; Groupe hôtelier réapprovisionnant son turn-down service</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p><em>&quot;200 chambres, turn-down service de nuit, la boîte doit tenir deux ans de housekeeping et toujours faire frais sur un plateau.&quot;</em></p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>Spec recommandée :</strong> boîte acacia 10 compartiments, couvercle coulissant (pas de quincaillerie qui casse), intérieur cire d'abeille et huile, logo de l'hôtel gravé au laser sur le couvercle.</li>
<li><strong>Pourquoi ça marche :</strong> le couvercle coulissant supprime le plus gros point de défaillance (les charnières). La finition cire d'abeille s'essuie facilement après un débordement de thé. 10 compartiments couvrent vert, noir, infusion, déca plus saisonnier.</li>
<li><strong>FOB indicatif à 500 pcs :</strong> 8,50–9,20 $ par pièce.</li>
</ul>
<!-- /wp:list -->

{img(IMG['hospitality'], "Boîte à thé en bois d'acacia dans un cadre hôtelier avec bouilloire et tasse — cas d'usage typique de service en chambre.")}

<!-- wp:heading {{"level":3}} -->
<h3>Scénario C &mdash; Responsable de programme cadeau d'entreprise</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p><em>&quot;Cadeau client Q4, 3.000 boîtes, doit donner l'impression d'un cadeau à 60 $ mais me coûter moins de 15 $ rendus.&quot;</em></p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>Spec recommandée :</strong> boîte acacia 4 compartiments, couvercle magnétique à rabat, logo dorure à chaud (or ou or rose), pochette cadeau marquée, color box individuelles en cartons maîtres.</li>
<li><strong>Pourquoi ça marche :</strong> les couvercles magnétiques offrent le &quot;snap&quot; premium du déballage. La dorure à chaud se lit comme du luxe. L'empreinte 4 compartiments maintient bas le coût unitaire sur un programme à forte marge.</li>
<li><strong>FOB indicatif à 3.000 pcs :</strong> 7,20–8,00 $ par pièce (incl. pochette cadeau, hors contenu thé).</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>Pourquoi l'acacia, pas le bambou ni le pin ?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Trois propriétés font gagner l'acacia dans cette catégorie.</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>Il est dense.</strong> Dureté Janka ~2.300 lbf &mdash; supérieure au chêne rouge (1.290), noyer (1.010) et bien au-dessus du pin (380–870). Traduction : les parois des compartiments ne s'écaillent pas quand une boîte métallique de thé tombe dedans, et les bords de charnière conservent leur forme après des milliers de cycles d'ouverture-fermeture.</li>
<li><strong>La veinure est assez serrée pour ne pas absorber les arômes de thé.</strong> Les bois à pores ouverts comme le pin captent l'odeur d'un oolong puissant en un mois. Pas l'acacia.</li>
<li><strong>La couleur naturelle est déjà &quot;premium&quot;.</strong> Cœur miel à veines chocolat &mdash; pas besoin de teinture pour faire haut de gamme sur un hero shot Shopify, ce qui maintient le coût unitaire bas.</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Pour la comparaison complète côte à côte, voyez notre <a href="/blog/acacia-vs-bamboo-organizer">guide Acacia vs Bambou organizer</a> et la <a href="/blog/acacia-wood-vs-bamboo-what-weve-learned-after-years-in-our-factory">comparaison usine</a>. Ci-dessous la version spécifique boîte à thé.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Données matériau : acacia vs bambou vs paulownia vs noyer</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Un tableau, toutes les spécifications que votre acheteur pourrait demander.</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>Propriété</th><th>Acacia</th><th>Bambou</th><th>Paulownia</th><th>Noyer</th></tr></thead><tbody>
<tr><td>Densité (kg/m&sup3;)</td><td>700–900</td><td>~700</td><td>~280</td><td>~640</td></tr>
<tr><td>Dureté Janka (lbf)</td><td>~2.300</td><td>~1.380</td><td>~300</td><td>~1.010</td></tr>
<tr><td>Couleur sans teinture</td><td>Miel–chocolat, veinure spectaculaire</td><td>Or pâle ou caramel carbonisé</td><td>Crème pâle, plat</td><td>Chocolat profond, veine fine</td></tr>
<tr><td>Absorption d'arômes</td><td>Faible</td><td>Faible (massif uniquement)</td><td>Moyenne</td><td>Faible</td></tr>
<tr><td>Contact alimentaire sortie d'usine</td><td>Oui</td><td>Massif d'une pièce uniquement</td><td>Nécessite scellement</td><td>Oui</td></tr>
<tr><td>Risque de gauchissement à l'humidité</td><td>Faible</td><td>Faible</td><td>Faible</td><td>Moyen</td></tr>
<tr><td>Indice de coût FOB typique</td><td>1,0&times;</td><td>0,9&times;</td><td>0,7&times;</td><td>1,6&times;</td></tr>
</tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p><strong>Ce que cela signifie pour vous :</strong> le bambou est moins cher mais perd le ressenti &quot;cadeau premium&quot; et amène un risque de migration de mélamine si c'est la variante laminée (voir section suivante). Le paulownia est bien moins cher mais visuellement plat &mdash; il faut le teindre pour qu'il fasse premium. Le noyer bat l'acacia esthétiquement mais ajoute 60% au coût FOB.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>L'acacia est-il sûr au contact direct du thé ?</h2>
<!-- /wp:heading -->

{img(IMG['foodsafe'], "Boîte à thé en acacia ouverte avec un pot d'huile minérale alimentaire à l'intérieur — finition sûre pour contact direct avec le thé.")}

<!-- wp:paragraph -->
<p>Réponse courte : <strong>oui, avec la bonne finition</strong>.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>La marque d'ustensiles de cuisine <a href="https://misen.com/blogs/news/which-wood-won-t-leach-maple-acacia-bamboo-put-to-the-test" target="_blank" rel="noopener">Misen</a> a réalisé des tests indépendants en exposant acacia, érable et bambou à un liquide acide chaud, et en mesurant ce qui migrait. Les feuillus massifs comme l'acacia ont libéré <em>pratiquement aucun</em> produit chimique détectable. Environ 32% des échantillons de bambou ont relâché de la mélamine &mdash; non pas parce que le bambou est mauvais, mais parce que la plupart des ustensiles en bambou sont faits de panneaux composites collés avec de la résine mélamine-formaldéhyde.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Pour votre programme de boîtes à thé cela donne trois avantages réglementaires à l'acacia sur le bambou composite :</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li>Conformité <strong>FDA / LFGB / EU 10/2011</strong> contact alimentaire plus facile.</li>
<li>Moins de questions lors d'une revue <strong>Prop 65</strong> pour la mise en rayon en Californie.</li>
<li>Un récit plus propre pour les acheteurs <strong>BSCI, FSC et éco-positionnés</strong>.</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Checklist acheteur sur la sécurité alimentaire :</strong></p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li>L'intérieur doit être fini à l'<strong>huile minérale alimentaire</strong>, l'<strong>huile végétale alimentaire</strong> (souvent étiquetée &quot;butcher block oil&quot;) ou la <strong>cire d'abeille</strong>. Rien d'autre.</li>
<li>Refusez toute usine qui utilise un <strong>vernis PU</strong> à l'intérieur &mdash; il n'est pas alimentaire, il a l'air brillant, et il piège l'humidité où la moisissure se développe.</li>
<li>Demandez le <strong>COA</strong> (certificat d'analyse) de l'huile utilisée.</li>
<li>Demandez le <strong>rapport de test FDA / LFGB</strong> tiers pour votre marché cible.</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>De combien de compartiments ai-je vraiment besoin ?</h2>
<!-- /wp:heading -->

{img(IMG['compartments'], "Schéma d'une boîte à thé en bois avec compartiments étiquetés et tiroir coulissant en dessous — dispositions typiques multi-compartiments.")}

<!-- wp:paragraph -->
<p>Le nombre de compartiments est la plus grosse décision SKU après le matériau. Voici ce qui se vend vraiment dans chaque couloir après plusieurs centaines de SKUs pour des marques mondiales.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>4 compartiments</strong> &mdash; petit marché maison/cadeau. Empreinte ~25&times;15&times;9 cm. Idéal pour les packs sampler de marques de thé. Coût FOB le plus bas. Courant aux niveaux de prix Williams-Sonoma et Crate &amp; Barrel.</li>
<li><strong>6 compartiments</strong> &mdash; le sweet spot volume Amazon. ~25&times;19&times;9 cm. Convient à pratiquement n'importe quel sachet pyramidal ou rectangulaire. Le format que la plupart des consommateurs peuvent organiser à la main par &quot;jour de la semaine&quot;.</li>
<li><strong>8 compartiments</strong> &mdash; le tier cadeau/registry. ~30&times;19&times;9 cm. Photographie magnifiquement sur Instagram. Souvent associé à un couvercle à fenêtre en verre.</li>
<li><strong>10 compartiments</strong> &mdash; commandes hôtellerie, B&amp;B et stations café. ~38&times;19&times;9 cm. Tient assez de variété pour un plateau d'amenity client.</li>
<li><strong>12 compartiments</strong> &mdash; merchandiser marque de thé. ~38&times;25&times;9 cm. Mobilier retail in-store pour marques de thé spécialisées.</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Le détail dont personne ne vous parle :</strong> la <em>hauteur</em> du compartiment compte plus que le nombre de compartiments. Les sachets pyramidaux ont besoin de 9 cm ; les sachets plats de 7 cm. Envoyez à l'usine les vraies dimensions de votre sachet <em>avant</em> qu'elle ne réalise la grille de séparateurs &mdash; sinon le couvercle ne fermera pas.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Charnière à fenêtre vs couvercle coulissant vs magnétique &mdash; lequel choisir ?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Trois styles de couvercle dominent. Chacun a coût, durabilité et attrait étagère différents.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {{"level":3}} -->
<h3>Couvercle à charnière avec fenêtre acrylique ou verre (bestseller)</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>La spec la plus chiffrée. Acrylique 3 mm dans une rainure fraisée sur le cadre acacia, tenue par deux charnières en laiton. Les acheteurs voient la sélection de thé sans soulever le couvercle &mdash; la plus grosse amélioration UX que vous puissiez faire.</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>Acrylique</strong> vs <strong>verre</strong> : l'acrylique survit aux chutes et économise du fret. Le verre fait plus riche mais est plus lourd et fragile.</li>
<li><strong>Surcoût vs couvercle coulissant :</strong> environ 1,20 $ par unité à 1.000 pcs (acrylique), 1,80 $ (verre).</li>
<li>Recommandé pour : boîtes de marque retail, programmes cadeaux.</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {{"level":3}} -->
<h3>Couvercle coulissant (esthétique la plus propre, coût le plus bas)</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Aucune quincaillerie. Juste des rainures fraisées de précision et un couvercle plat en acacia qui glisse dedans et dehors. L'extérieur le plus propre et le couvercle le moins cher que nous fabriquions.</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>Pro :</strong> aucun point de défaillance. Survit au housekeeping d'hôtel.</li>
<li><strong>Con :</strong> aucune visibilité du contenu ; peut coincer si les variations d'humidité font gonfler le bois.</li>
<li>Recommandé pour : hôtellerie, lots cadeaux numérotés à la main, marques d'esthétique minimaliste.</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {{"level":3}} -->
<h3>Couvercle magnétique à rabat (le ressenti le plus premium)</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Des aimants néodyme fraisés dans la paroi arrière et le bord du couvercle donnent un &quot;clip&quot; invisible à la fermeture. Le ressenti le plus premium et la meilleure option pour les marques de thé en abonnement haut de gamme &mdash; l'expérience de déballage fait partie de la marque.</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>Surcoût :</strong> +1,20–1,80 $ par unité.</li>
<li><strong>Spec obligatoire :</strong> aimants N42 ou plus forts, sinon le couvercle s'ouvre quand vous inclinez la boîte.</li>
<li>Recommandé pour : marques d'abonnement, cadeaux d'entreprise, retail registry.</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>Quelle finition commander ? (Sautez cette section si l'usine vous dit &quot;PU&quot;)</h2>
<!-- /wp:heading -->

{img(IMG['finish'], "Gros plan d'un bouton en laiton sur un tiroir en acacia à finition sombre — combinaison quincaillerie et finition sur une boîte à thé premium.")}

<!-- wp:paragraph -->
<p>L'acacia est naturellement résistant à l'eau mais pas imperméable. Une bonne finition fait ressortir la veinure chocolat, verrouille la stabilité face aux variations d'humidité et garde la boîte au contact alimentaire pendant toute la durée du programme.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Trois finitions que nous recommandons</strong> (par ordre de portée acheteur) :</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>Huile minérale alimentaire</strong> &mdash; le standard. Pénètre la veinure, fonce légèrement la couleur, et le client peut la réappliquer à la maison pour 5+ ans de service. Coût le plus bas, entièrement alimentaire, reconnue FDA.</li>
<li><strong>Mélange cire d'abeille + huile minérale</strong> (&quot;butcher block conditioner&quot;) &mdash; satiné plus riche, meilleure résistance à l'eau. Vaut le petit surcoût pour les programmes cadeaux.</li>
<li><strong>Vernis mat alimentaire</strong> &mdash; <strong>extérieur uniquement</strong>, jamais l'intérieur. Deux couches de mat à l'eau ajoutent la résistance aux empreintes. À combiner avec un intérieur huilé. Idéal pour cafés et boîtes hôtellerie essuyées constamment.</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Ce qu'il faut refuser :</strong> vernis PU brillant, teintures solvantes pour foncer la couleur à bas prix, et toute &quot;huile de tung&quot; qui n'est pas certifiée alimentaire. Les deux premières sont dangereuses au contact du thé ; la troisième est souvent un substitut d'huile de tung contenant des siccatifs aux métaux lourds.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Les quatre défauts qu'on voit encore sur les boîtes à thé en acacia bon marché</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Ce sont les problèmes qui apparaissent le plus souvent quand nous auditons un échantillon concurrent pour une nouvelle marque &mdash; généralement juste avant qu'elle ne change de fournisseur.</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>Blocs de chutes collés à la place de panneaux massifs.</strong> Les boîtes bon marché utilisent de petites chutes d'acacia abouée bord à bord en panneau, souvent cachées sous une teinture. Les lignes de colle craquent le long des séparateurs en six mois. <strong>Demandez un échantillon coupé</strong> &mdash; vous ne devriez pas voir plus de deux lignes de colle par paroi latérale.</li>
<li><strong>Fenêtres acryliques rayées en transit.</strong> Le film protecteur doit rester sur l'acrylique tout au long de la ligne de production et n'être retiré que par le client final. Demandez à l'usine une vidéo du poste d'application du film.</li>
<li><strong>Vis de charnière vissées dans le bois de bout.</strong> Les vis dans le bois de bout s'arrachent à force d'ouvertures répétées. Les charnières doivent être vissées dans le fil du bois, avec des avant-trous percés à la spec. <strong>Ouvrez le couvercle de l'échantillon 100 fois</strong> avant validation.</li>
<li><strong>Compartiments sous-dimensionnés pour votre sachet.</strong> Nous avons vu des sachets rectangulaires taille Bigelow se faire écraser parce que l'usine avait construit des compartiments pour des carrés taille Lipton. <strong>Envoyez la spec du sachet avant l'outillage.</strong></li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>Puis-je mettre mon logo dessus ? (Laser, impression UV, dorure à chaud)</h2>
<!-- /wp:heading -->

{img(IMG['logo'], "Boîte à thé acacia avec le texte &quot;Custom Logo Available&quot; — service OEM ODM, emballage personnalisé, taille personnalisée — options de marquage.")}

<!-- wp:paragraph -->
<p>L'acacia est une toile généreuse. Les stries sombres du duramen et l'aubier plus clair prennent superbement le laser et l'encre &mdash; généralement à votre avantage.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>Gravure laser</strong> &mdash; notre standard recommandé. Le laser CO2 brûle la surface en un brun espresso qui contraste avec le cœur miel. Tient une typo fine jusqu'à 5 pt. <strong>Aucun surcoût par unité.</strong> Idéal pour logos, noms de marque, étiquettes individuelles de variétés sur les séparateurs, et numérotation édition limitée.</li>
<li><strong>Impression UV</strong> &mdash; impression photographique pleine couleur directement sur le bois. Excellent pour les illustrations botaniques. +0,40–0,90 $ par unité à l'échelle. Rendu un peu plus plat que le laser car l'impression se pose sur la veinure au lieu d'y brûler.</li>
<li><strong>Dorure à chaud</strong> &mdash; feuille or ou or rose pour le cadeau haut de gamme. Ressenti premium. La feuille peut s'écailler si la boîte prend des chocs en transit, donc utilisez la feuille <em>sur le couvercle uniquement</em>.</li>
<li><strong>Sérigraphie</strong> &mdash; moins commune sur l'acacia ; à n'utiliser que pour des logos en aplat (ex. un médaillon circulaire).</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Astuce pro :</strong> demandez à l'usine un échantillon gravé laser sur un panneau d'acacia de récup avant de figer l'artwork. Les stries sombres dans la veinure affectent la propreté de la brûlure laser &mdash; un logo qui rend parfaitement sur un PDF Pantone peut nécessiter d'être légèrement plus gras sur du vrai bois.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>MOQ, délais et prix FOB en 2026</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Voici les chiffres que nous chiffrons actuellement, indexés sur une <strong>boîte acacia standard 6 compartiments, couvercle à charnière à fenêtre acrylique, intérieur huile minérale, logo gravé laser</strong>. Les autres configurations bougent depuis cette base (suppléments sous le tableau).</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>Volume</th><th>FOB Xiamen indicatif (USD)</th><th>Délai échantillon</th><th>Délai production</th></tr></thead><tbody>
<tr><td>300–500 pcs (MOQ d'entrée)</td><td>7,50–8,50 $ / pc</td><td>7–12 jours</td><td>30–35 jours</td></tr>
<tr><td>1.000–2.000 pcs</td><td>6,50–7,30 $ / pc</td><td>7–12 jours</td><td>30–35 jours</td></tr>
<tr><td>5.000 pcs +</td><td>5,80–6,40 $ / pc</td><td>10–14 jours</td><td>40–45 jours</td></tr>
<tr><td>20.000 pcs + (programme annuel)</td><td>5,20–5,80 $ / pc</td><td>10–14 jours</td><td>50–60 jours, échelonné</td></tr>
</tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p><strong>Suppléments à anticiper :</strong></p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li>+0,50–1,20 $ / pc &mdash; finition premium (cire d'abeille ou vernis mat)</li>
<li>+0,40–0,90 $ / pc &mdash; impression UV</li>
<li>+1,50 $ / pc &mdash; fenêtre en verre au lieu d'acrylique (à 1.000 pcs)</li>
<li>+12% global &mdash; SKUs couvercle magnétique</li>
<li>+0,08–0,12 $ / pc &mdash; cartons maîtres retail-ready avec codes-barres</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Conclusion :</strong> même en haut de la fourchette, l'acacia reste la boîte à thé en bois dur d'allure premium la moins chère du marché &mdash; les autres soit ont l'air moins cher (paulownia, bambou) soit coûtent nettement plus (noyer, chêne).</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Comment protéger la boîte pendant le transport maritime ?</h2>
<!-- /wp:heading -->

{img(IMG['packaging'], "Cartons maîtres d'export empilés en entrepôt avec une boîte à thé enveloppée dans un matériau de protection — emballage pour fret maritime vers Amérique du Nord et Europe.")}

<!-- wp:paragraph -->
<p>L'un des facteurs les plus ignorés dans cette catégorie, c'est ce qui arrive à la boîte <em>après</em> sa sortie d'usine. Un conteneur de 30 jours avec des variations d'humidité entre 50% HR (port d'origine) et 95% HR (traversée équatoriale tropicale) gondolera toute boîte à thé qui n'a pas été emballée correctement.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Notre spec standard d'emballage export pour les boîtes à thé en acacia :</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>Pack intérieur :</strong> chaque boîte dans un sachet polyéthylène avec sachet déshydratant (gel de silice, 5g). Sachet scellé, pas seulement rabattu.</li>
<li><strong>Color box (optionnel) :</strong> boîte cadeau imprimée marque autour du polybag.</li>
<li><strong>Carton maître :</strong> ondulé 5 plis, séparateurs internes, max 24 pcs par carton. Marquer avec pays d'origine et code HS.</li>
<li><strong>Palette :</strong> palette bois traitée thermiquement (ISPM 15 conforme), max 4 couches de haut, sanglée et filmée.</li>
<li><strong>Test de chute :</strong> validation AQL 2.5. Chute de 80 cm sur béton, quatre coins. Aucun dommage intérieur.</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Ce que ça vous économise :</strong> le taux de défauts typique après un conteneur maritime de 30 jours passe de ~3% (non protégé) à moins de 0,5% avec cette spec. Sur un envoi de 5.000 pcs ça fait 125 unités réclamables en moins.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>La checklist d'approvisionnement avant de signer la PI</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>La checklist que nous envoyons à chaque nouvel acheteur avant de signer un Proforma. Sautez une étape à vos risques.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li>Envoyez les <strong>dimensions exactes du sachet</strong> (L &times; l &times; h) que la boîte doit accueillir &mdash; <em>avant l'outillage</em>.</li>
<li>Demandez un <strong>échantillon de panneau coupé</strong> &mdash; confirme l'acacia massif, pas des chutes collées.</li>
<li>Demandez le <strong>COA de l'huile intérieure</strong> et le <strong>rapport de test FDA / LFGB / EU 10/2011</strong> si vous distribuez sur ces marchés.</li>
<li>Spécifiez le type et le matériau de charnière (laiton ou zamak chromé) et confirmez le pré-perçage aux fixations.</li>
<li>Ouvrez le couvercle de l'échantillon <strong>100 fois</strong> et inclinez la boîte fermée 10 fois à l'envers. Le couvercle ne doit pas s'ouvrir ; aucun compartiment ne doit cliqueter.</li>
<li>Confirmez l'<strong>humidité des panneaux d'acacia à 8–12%</strong> sur l'échantillon coupé. Au-dessus de 14% MC, vous verrez du gauchissement après un conteneur de 30 jours.</li>
<li>Validez le <strong>test de chute du carton maître</strong> : 80 cm sur béton, quatre coins. Aucun dommage intérieur.</li>
<li>Obtenez le <strong>rapport d'inspection finale (AQL 2.5)</strong> du partenaire QC par écrit <strong>avant la mise à disposition du conteneur</strong>.</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Rien de tout ça n'est spécifique à CHIC. C'est la même checklist qui vous protège face à <em>n'importe quelle</em> usine de boîtes en bois, y compris la nôtre.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Et maintenant ?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Si vous arbitrez l'acacia contre un autre matériau, la réponse courte est : choisissez l'acacia, sauf si votre prix unitaire cible est sous 5 $ FOB ou si votre acheteur a explicitement demandé du noyer. La sécurité alimentaire, le visuel et l'économie de fret jouent tous en votre faveur.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Pour un devis sur votre spec, envoyez ce qui suit via notre <a href="/contact">formulaire de contact</a> :</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li>Nombre de compartiments + dimensions du sachet</li>
<li>Style de couvercle (charnière à fenêtre / coulissant / magnétique)</li>
<li>Finition (huile / cire d'abeille / vernis mat)</li>
<li>Méthode de marquage (laser / impression UV / dorure à chaud)</li>
<li>Quantité cible et mois de livraison</li>
<li>Port de destination (FOB Xiamen par défaut)</li>
</ul>
<!-- /wp:list -->
<!-- wp:paragraph -->
<p>Nous répondons sous un jour ouvré avec un FOB indicatif et un délai d'échantillon.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Guides connexes</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<li><a href="/blog/wooden-tea-box-manufacturer">Guide de fabrication de boîtes à thé en bois pour distributeurs et marques cadeaux</a> &mdash; le pendant côté approvisionnement.</li>
<li><a href="/blog/multi-compartment-wooden-tea-boxes-bulk-orders">Boîtes à thé en bois multi-compartiments : que vérifier avant une commande en gros</a> &mdash; QC et checklist commande en gros.</li>
<li><a href="/blog/wooden-tea-bag-organizer-guide">Comment choisir le bon organisateur de sachets de thé en bois pour stations café</a> &mdash; angle hôtellerie et café.</li>
<li><a href="/blog/acacia-vs-bamboo-organizer">Acacia vs Bambou organizer : pourquoi les top marques maison 2026 basculent vers l'acacia</a> &mdash; la comparaison matériau plus large.</li>
<li><a href="/products/wooden-tea-box">Parcourez notre gamme de boîtes à thé en bois</a></li>
<li><a href="/material-guide">Guide matériaux CHIC &mdash; acacia, noyer, paulownia, bambou et pin comparés</a></li>
</ul>
<!-- /wp:list -->
"""

FR_FAQ = [
    {'q': 'L\'acacia est-il sûr au contact direct du thé ?',
     'a': '<p>Oui &mdash; quand l\'intérieur est fini à l\'huile minérale alimentaire, l\'huile végétale alimentaire ("butcher block oil") ou la cire d\'abeille. Des tests indépendants ont montré que les feuillus massifs comme l\'acacia ne libèrent pratiquement aucun produit chimique détectable, même dans des conditions chaudes et acides. Le risque, ce n\'est pas le bois ; c\'est le vernis PU intérieur, donc exigez une huile alimentaire et refusez toute usine qui vernisse l\'intérieur.</p>'},
    {'q': 'Combien de compartiments doit avoir ma boîte à thé ?',
     'a': '<p>Adaptez le nombre à votre programme : 4 pour sampler/cadeau d\'entreprise ; 6 pour le sweet spot volume retail Amazon ; 8 pour cadeau premium/registry ; 10 pour hôtellerie et station café ; 12 pour merchandiser retail marque de thé. Plus important que le nombre est la <em>hauteur</em> du compartiment &mdash; 9 cm pour les sachets pyramidaux, 7 cm pour les sachets plats. Envoyez vos dimensions de sachet avant l\'outillage.</p>'},
    {'q': 'Comment une boîte à thé en acacia se compare-t-elle à une en bambou ?',
     'a': '<p>Le bambou est un peu moins cher et tout aussi stable, et se lit comme "éco". Mais le bambou composite/laminé peut migrer la mélamine au contact de liquides acides &mdash; pour le stockage de thé, seul le bambou massif d\'une pièce est sûr. L\'acacia évite ce risque entièrement, fait plus premium en sortie d\'usine et photographie mieux sur un hero shot retail. Pour les marques de thé moyen à premium, l\'acacia gagne en valeur perçue pour un coût unitaire quasi identique.</p>'},
    {'q': 'Une boîte à thé en acacia se déformera-t-elle pendant un conteneur maritime de 30 jours ?',
     'a': '<p>Pas si elle est bien construite. Les panneaux d\'acacia doivent être séchés en chambre à <strong>8–12% d\'humidité</strong> et scellés à l\'huile alimentaire avant emballage. Au-dessus de 14% MC, le gauchissement est pratiquement garanti en humidité tropicale. Notre pack export standard ajoute des sachets déshydratants et des cartons maîtres ondulés 5 plis &mdash; le taux de défaut après transport maritime tombe de ~3% (non protégé) à moins de 0,5%.</p>'},
    {'q': 'Quels sont MOQ, délai échantillon et délai de production ?',
     'a': '<p>MOQ d\'entrée 300–500 unités par design. Échantillons en 7–12 jours ; production de masse 30–35 jours après validation échantillon. À 1.000 unités, vous économisez environ 10% par pièce ; 5.000+ économise plus près de 25%. Les programmes annuels de 20.000+ unités tournent sur des cycles de production échelonnés de 50–60 jours pour faire tourner les stocks.</p>'},
    {'q': 'Pouvez-vous graver mon logo au laser ? Y a-t-il un surcoût ?',
     'a': '<p>Oui &mdash; l\'acacia est l\'un des meilleurs bois du marché pour la gravure laser CO2. Le cœur miel contraste magnifiquement avec la ligne sombre espresso du laser, donc logos, noms de marque et étiquettes individuelles lisent net jusqu\'à 5 pt. <strong>La gravure laser est incluse dans notre devis FOB sans surcoût par unité</strong> et c\'est la méthode de marquage la plus populaire pour les programmes B2B de boîtes à thé acacia.</p>'},
    {'q': 'Quelles certifications de sécurité alimentaire puis-je obtenir pour le programme ?',
     'a': '<p>La documentation standard inclut la conformité contact alimentaire FDA (USA), LFGB et EU 10/2011 (marchés UE), les rapports Prop 65 pour la mise en rayon en Californie et la chaîne de contrôle FSC si l\'acheteur exige une certification forestière. L\'audit d\'usine BSCI est aussi disponible sur demande et couvre la conformité aux standards du travail.</p>'},
    {'q': 'Que se passe-t-il si un lot arrive endommagé ?',
     'a': '<p>Notre rapport d\'inspection finale (AQL 2.5) vous est transmis par écrit avant la mise à disposition du conteneur &mdash; vous pouvez refuser la mise à disposition si les défauts dépassent le seuil AQL. Une fois expédié sous conditions FOB, le risque vous est transféré, mais nous couvrons les unités de remplacement contre les défauts de fabrication (gauchissement, défaillance de charnière, panneaux fissurés) sans frais pendant 12 mois. Les dommages cosmétiques dus à la manutention transit sont une réclamation au transitaire, c\'est pourquoi la spec d\'emballage ci-dessus compte.</p>'},
]


# ══════════════════════════════════════════════════════════════════════════
# JAPANESE
# ══════════════════════════════════════════════════════════════════════════

JA_TITLE = 'アカシア材ティーボックス：ブランド・ホテル・ギフトプログラム向け2026年購入ガイド'
JA_META_TITLE = 'アカシア材ティーボックス購入ガイド2026（材質・MOQ・コスト）'
JA_META_DESC = (
    'ティーブランド、ホテル、ギフトプログラム向けアカシア材ティー'
    'ボックスの購入ガイド — 30秒判断マトリクス、食品安全データ、'
    '仕切りレイアウト、仕上げ、MOQ、廈門工場からのFOB価格を解説。'
)
JA_EXCERPT = (
    '<p>アカシア材ティーボックスを探しているB2Bブランドおよびプライ'
    'ベートラベルバイヤー向けの2026年版・素材重視のソーシングガイド '
    '— Janka硬度、食品安全比較、仕切りレイアウト、仕上げ、蓋スタイル、'
    'MOQ、廈門工場からのFOB価格を網羅。</p>'
)

JA_CONTENT = f"""<!-- wp:paragraph -->
<p>あなたはティーボックスを調達しようとしています。お客様（あるいはバイヤー、リテールプランナー）は、プレミアムに見え、プレミアムに感じられ、輸送中に反りなく、食品安全審査も通るボックスを求めています。どのガイドを読んでも「アカシア材を使え」と書かれています。本ガイドは次の問いに答えます——<strong>痛い目を見ずに、実際にどう発注するか。</strong></p>
<!-- /wp:paragraph -->

{img(IMG['hero'], "アカシア材の木目クローズアップ。ハニーからチョコレートへのカラーバリエーションが、プレミアムティーボックス製造のリーディング素材たる所以。")}

<!-- wp:paragraph -->
<p>これは、廈門工場でアカシア製ティーボックスをプライベートラベルのティーブランド、ホスピタリティバイヤー、コーポレートギフトプログラム向けに見積もる際の実用プレイブックです。本物のJanka数値。安価な輸入品で今も見られる本物の欠陥。2026年の本物のFOB価格。そして次の段落を読む前に、あなた自身が仕様を選定できる30秒判断マトリクスを掲載しています。</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>30秒判断マトリクス</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>あなたのプロジェクトに合う行を見つけて、ハイライトされたセクションだけを読んでください。</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>あなたが…</th><th>最適仕様</th><th>読むべきセクション</th></tr></thead><tbody>
<tr><td>4〜8フレーバーをローンチするティーブランド</td><td>6または8仕切り、アクリル窓付きヒンジ蓋、レーザー刻印ロゴ</td><td>§3, §6, §10, §12</td></tr>
<tr><td>ホテル/B&amp;B/カフェのバイヤー</td><td>10仕切り、マグネット蓋またはスライド蓋、食品グレードオイル仕上げ</td><td>§4, §6, §7, §10</td></tr>
<tr><td>コーポレートギフトプログラム責任者</td><td>4または6仕切り、ホットフォイルまたは金レーザーのブランドマーク、ギフト対応梱包</td><td>§6, §12, §15</td></tr>
<tr><td>サブスクリプション/月替わりボックスブランド</td><td>6仕切り、マグネットフリップ蓋、蓋にカスタムUV印刷</td><td>§6, §12, §13</td></tr>
<tr><td>SKUリフレッシュ中のリテーラー</td><td>4/6/8の混合SKU、スライド蓋、ニュートラルなオイル仕上げ</td><td>§6, §8, §13</td></tr>
</tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p><strong>今すぐ見積りをご希望ですか？</strong> 仕切り数、蓋スタイル、ブランディング方法、目標数量を<a href="/contact">お問い合わせフォーム</a>からお送りください — 1営業日以内に指標FOB価格でご返信します。</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>3人のバイヤー、3つのリアルなシナリオ</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>このカテゴリーで購入時の混乱が起きる最大の原因は、自分のユースケースを取り違えることです。最も多く見積もる3プログラムを紹介します。</p>
<!-- /wp:paragraph -->

<!-- wp:heading {{"level":3}} -->
<h3>シナリオA &mdash; 6フレーバーのティーブランド創業者</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p><em>「リーフティーのSKUが6種、小売価格はボックスあたり24ドル。Harney &amp; Sonsの単価を払わずに、棚で同等の印象を出したい。」</em></p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>推奨仕様：</strong>6仕切りアカシアボックス、約25&times;19&times;9 cm、アクリル窓付きヒンジ蓋、内部ミネラルオイル仕上げ、蓋にレーザー刻印ロゴ。</li>
<li><strong>うまくいく理由：</strong>窓により6種の選択肢を開けずに視認可能。レーザー刻印ロゴは単価アップなしでヘリテージ感を演出。アカシアの木目はバンブーよりヒーローショットで映える。</li>
<li><strong>1,000個時の指標FOB：</strong>1個あたり6.50〜7.30ドル。</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {{"level":3}} -->
<h3>シナリオB &mdash; ターンダウンサービスを再補充するホテルグループ</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p><em>「200室、毎晩のターンダウンサービス、ボックスは2年のハウスキーピングに耐え、トレイの上で新品同様に見え続ける必要がある。」</em></p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>推奨仕様：</strong>10仕切りアカシアボックス、スライド蓋（壊れる金具なし）、ビーズワックス＋オイル仕上げ、蓋にホテルロゴをレーザー刻印。</li>
<li><strong>うまくいく理由：</strong>スライド蓋は最大の故障点（ヒンジ）を排除。ビーズワックス仕上げは茶こぼれを簡単に拭き取れる。10仕切りで緑茶・紅茶・ハーブ・ノンカフェイン＋季節物をカバー。</li>
<li><strong>500個時の指標FOB：</strong>1個あたり8.50〜9.20ドル。</li>
</ul>
<!-- /wp:list -->

{img(IMG['hospitality'], "ホスピタリティ環境でケトルとティーカップとともに使用されるアカシア材ティーボックス — 客室サービスの典型的ユースケース。")}

<!-- wp:heading {{"level":3}} -->
<h3>シナリオC &mdash; コーポレートギフトプログラム責任者</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p><em>「Q4顧客ギフト、3,000ボックス、60ドルのギフトに感じさせつつ、ランディングコストは15ドル以下に。」</em></p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>推奨仕様：</strong>4仕切りアカシアボックス、マグネットフリップ蓋、ホットフォイル押しロゴ（ゴールドまたはローズゴールド）、ブランドギフトスリーブ、個別カラーボックス入りマスターカートン。</li>
<li><strong>うまくいく理由：</strong>マグネット蓋は「プレミアムスナップ」の開封体験を提供。ホットフォイルはラグジュアリーとして読まれる。4仕切りのフットプリントが、高マージンプログラムの単価を低く抑える。</li>
<li><strong>3,000個時の指標FOB：</strong>1個あたり7.20〜8.00ドル（ギフトスリーブ込、茶葉除く）。</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>なぜアカシアなのか？バンブーやパインではダメ？</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>このカテゴリーでアカシアが勝つ理由は3つの特性です。</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>密度が高い。</strong>Janka硬度約2,300 lbf — レッドオーク（1,290）、ウォルナット（1,010）を上回り、パイン（380〜870）よりはるかに高い。つまり、金属製ティー缶を落としても仕切り壁がへこまず、ヒンジエッジは数千回の開閉サイクルを経ても形状を維持する。</li>
<li><strong>木目が緻密で茶葉の香りを吸収しにくい。</strong>パインのようなオープンポア材は強いウーロン茶の香りを1ヶ月で吸い込む。アカシアはそうならない。</li>
<li><strong>天然色がすでに「プレミアム」。</strong>ハニー色の心材からチョコレート色の縞模様まで — 染色なしでShopifyのヒーローショットで高級感を演出でき、単価を抑えられる。</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>並列比較の完全版は<a href="/blog/acacia-vs-bamboo-organizer">アカシア vs バンブー オーガナイザーガイド</a>と<a href="/blog/acacia-wood-vs-bamboo-what-weve-learned-after-years-in-our-factory">工場現場からの比較</a>をご覧ください。以下はティーボックス用途に特化した版です。</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>素材データ：アカシア vs バンブー vs キリ vs ウォルナット</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>1つの表で、バイヤーが聞きそうなすべての仕様を網羅。</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>特性</th><th>アカシア</th><th>バンブー</th><th>キリ</th><th>ウォルナット</th></tr></thead><tbody>
<tr><td>密度 (kg/m&sup3;)</td><td>700〜900</td><td>約700</td><td>約280</td><td>約640</td></tr>
<tr><td>Janka硬度 (lbf)</td><td>約2,300</td><td>約1,380</td><td>約300</td><td>約1,010</td></tr>
<tr><td>染色なしの色合い</td><td>ハニー〜チョコレート、ダイナミックな木目</td><td>淡い金色または炭化キャラメル</td><td>淡いクリーム、フラット</td><td>深いチョコレート、繊細な木目</td></tr>
<tr><td>香り吸収</td><td>低</td><td>低（無垢のみ）</td><td>中</td><td>低</td></tr>
<tr><td>出荷時点で食品接触可能</td><td>はい</td><td>無垢一体物のみ</td><td>シーリング要</td><td>はい</td></tr>
<tr><td>湿度下での反り発生リスク</td><td>低</td><td>低</td><td>低</td><td>中</td></tr>
<tr><td>典型的FOBコスト指数</td><td>1.0&times;</td><td>0.9&times;</td><td>0.7&times;</td><td>1.6&times;</td></tr>
</tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p><strong>あなたにとっての意味：</strong>バンブーは安いが「プレミアムギフト」感を失い、ラミネート品ならメラミン溶出リスクをはらむ（次セクション参照）。キリははるかに安いが見た目がフラット — プレミアムに見せるには染色が必要。ウォルナットは美観でアカシアを上回るがFOBコストが60%高くなる。</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>アカシアは茶葉との直接接触に安全か？</h2>
<!-- /wp:heading -->

{img(IMG['foodsafe'], "アカシア材ティーボックスを開けて中に食品グレードのミネラルオイル瓶を置いた写真 — 茶葉と直接接触する場合の安全な仕上げ。")}

<!-- wp:paragraph -->
<p>短答：<strong>正しい仕上げをすれば、はい</strong>。</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>キッチンウェアブランドの<a href="https://misen.com/blogs/news/which-wood-won-t-leach-maple-acacia-bamboo-put-to-the-test" target="_blank" rel="noopener">Misen</a>は独立テストを実施し、アカシア、メープル、バンブーを高温の酸性液体にさらし、何が溶出するかを測定しました。アカシアのような無垢の硬材は<em>事実上検出されないレベル</em>の化学物質しか放出しませんでした。バンブーサンプルの約32%はメラミンを溶出 — バンブーが悪いのではなく、ほとんどのバンブーキッチンウェアはメラミン-ホルムアルデヒド接着剤で固められた複合ボードでできているからです。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>御社のティーボックスプログラムにとってアカシアは、複合バンブーに対し3つの規制上の優位性をもたらします：</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>FDA / LFGB / EU 10/2011</strong>食品接触適合がより容易。</li>
<li>カリフォルニア小売向けの<strong>Prop 65</strong>レビューでの質問が少ない。</li>
<li><strong>BSCI、FSC、エコポジショニング</strong>バイヤー向けのよりクリーンなストーリー。</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>食品安全に関するバイヤーチェックリスト：</strong></p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li>内部は<strong>食品グレードミネラルオイル</strong>、<strong>食品グレード植物油</strong>（「バッチャーブロックオイル」と表示されることが多い）、<strong>ビーズワックス</strong>のいずれかで仕上げる必要があります。それ以外は不可。</li>
<li>内部に<strong>PUラッカー</strong>を使う工場は拒絶 — 食品安全ではなく、光沢があるように見えても湿気を閉じ込めてカビを発生させる。</li>
<li>使用油の<strong>COA</strong>（分析証明書）を要求。</li>
<li>ターゲット市場向けの第三者<strong>FDA / LFGBテストレポート</strong>を要求。</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>実際何個の仕切りが必要か？</h2>
<!-- /wp:heading -->

{img(IMG['compartments'], "ラベル付き仕切りと下部の引き出しを示す木製ティーボックスの図 — 典型的な複数仕切りレイアウト。")}

<!-- wp:paragraph -->
<p>仕切り数は素材に次ぐ最大のSKU決定事項です。グローバルブランド向けに数百のSKUを手がけた結果、各レーンで実際に売れている構成を紹介します。</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>4仕切り</strong> — 小規模ホーム/ギフト市場。フットプリント約25&times;15&times;9 cm。ティーブランドのサンプラーパックに最適。FOBコスト最安。Williams-SonomaやCrate &amp; Barrelの価格帯で一般的。</li>
<li><strong>6仕切り</strong> — Amazonのボリュームスイートスポット。約25&times;19&times;9 cm。あらゆるピラミッド型サシェや長方形ティーバッグに対応。多くの消費者が「曜日別」で手動整理できる形式。</li>
<li><strong>8仕切り</strong> — ギフト/レジストリ層。約30&times;19&times;9 cm。Instagramで美しく映える。多くの場合ガラス窓付き蓋とペア。</li>
<li><strong>10仕切り</strong> — ホスピタリティ、B&amp;B、コーヒーステーション発注。約38&times;19&times;9 cm。ゲストアメニティトレイ用に十分なバラエティを収容。</li>
<li><strong>12仕切り</strong> — ティーブランドマーチャンダイザー。約38&times;25&times;9 cm。専門ティーブランド用の店頭リテールフィクスチャー。</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>誰も警告しない詳細：</strong>仕切りの<em>高さ</em>は仕切り数より重要。ピラミッド型サシェは9 cm必要、平型ティーバッグは7 cm。仕切りグリッドを設計する<em>前</em>に、実際のサシェ寸法を工場に送ってください — でないと蓋が閉まりません。</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>窓付きヒンジ蓋 vs スライド蓋 vs マグネットフリップ — どれを選ぶ？</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>3つの蓋スタイルが主流です。それぞれコスト、耐久性、棚での訴求力が異なります。</p>
<!-- /wp:paragraph -->

<!-- wp:heading {{"level":3}} -->
<h3>アクリルまたはガラス窓付きヒンジ蓋（ベストセラー）</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>最も多く見積もられる仕様。3 mmアクリルをアカシアフレーム上の溝に2つの真鍮ヒンジで固定。蓋を持ち上げずに茶葉のセレクションを確認できる — 最大のUX改善。</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>アクリル</strong> vs <strong>ガラス</strong>：アクリルは落下に強く運賃を抑える。ガラスは高級感があるが重く割れやすい。</li>
<li><strong>スライド蓋との価格差：</strong>1,000個時で約1.20ドル/個（アクリル）、1.80ドル（ガラス）。</li>
<li>推奨用途：リテールブランドボックス、ギフトプログラム。</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {{"level":3}} -->
<h3>スライド蓋（最もクリーンな美観、最低コスト）</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>金具なし。精密に削った溝とスライドする平らなアカシア蓋のみ。最もクリーンな外観で、当社が製造する蓋の中で最安。</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>長所：</strong>故障点なし。ホテルのハウスキーピングに耐える。</li>
<li><strong>短所：</strong>中身が見えない。湿度変動で木が膨張すると引っかかる場合あり。</li>
<li>推奨用途：ホスピタリティ、手番号入りギフトバッチ、ミニマル系ブランド。</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {{"level":3}} -->
<h3>マグネットフリップ蓋（最もプレミアムな感触）</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>背面壁と蓋エッジに埋め込まれたネオジム磁石が見えない「スナップ」クロージャーを生む。最もプレミアムな感触で、ハイエンドのサブスクリプションティーブランドに最適 — 開封体験はブランドの一部です。</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>価格差：</strong>+1.20〜1.80ドル/個。</li>
<li><strong>必須仕様：</strong>N42以上の磁石。さもないとボックスを傾けると蓋が開く。</li>
<li>推奨用途：サブスクリプションブランド、コーポレートギフト、レジストリリテール。</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>どの仕上げを発注するか？（工場が「PU」と言ったら飛ばしてOK）</h2>
<!-- /wp:heading -->

{img(IMG['finish'], "ダーク仕上げのアカシア引き出しに付いた真鍮ノブのクローズアップ — プレミアムティーボックスのハードウェアと仕上げの組み合わせ。")}

<!-- wp:paragraph -->
<p>アカシアは天然耐水性があるが防水ではありません。良い仕上げはチョコレートの木目を引き立て、湿度変動下での安定性を確保し、プログラム期間中ずっと食品安全に保ちます。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>推奨する3つの仕上げ</strong>（バイヤーリーチ順）：</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>食品グレードミネラルオイル</strong> — デフォルト。木目に浸透し、色をわずかに深め、顧客が自宅で再塗布すれば5年以上使える。最安、完全食品安全、FDA認定。</li>
<li><strong>ビーズワックス＋ミネラルオイル配合</strong>（「バッチャーブロックコンディショナー」）— よりリッチなサテン光沢、わずかに優れた耐水性。ギフトプログラム向けには小幅な追加コストの価値あり。</li>
<li><strong>食品安全マットラッカー</strong> — <strong>外側のみ</strong>、絶対に内側に塗らない。水性マット2コートが指紋耐性をプラス。オイル仕上げ内側と組み合わせる。常時拭き取りされるカフェ・ホスピタリティ用ボックスに最適。</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>拒絶すべき仕上げ：</strong>光沢PUラッカー、色を安く深めるための溶剤系ステイン、食品グレード認定のない「桐油」。最初の2つは茶葉接触に不安全。3つ目は重金属乾燥剤を含む桐油代替品であることが多い。</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>安価なアカシア製ティーボックスで今も見る4つの欠陥</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>新ブランドの競合サンプルを監査するときに最も頻繁に現れる問題 — たいてい彼らがサプライヤーを変更する直前に見つけます。</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>無垢パネルではなく端材を接着した寄せ集めブロック。</strong>安価ボックスはアカシアの端材を端接ぎでパネル化し、ステインで隠していることが多い。接着ラインは6ヶ月以内に仕切り沿いで割れる。<strong>切断断面サンプルを要求</strong> — 側壁あたり接着ラインは2本以下であるべき。</li>
<li><strong>輸送中に傷ついたアクリル窓。</strong>保護フィルムは生産ライン全体を通してアクリル上に残し、エンドユーザーのみが剥がすべき。フィルム貼付ステーションの動画を工場に要求。</li>
<li><strong>木口にねじ込まれたヒンジねじ。</strong>木口ねじは蓋を繰り返し開けると抜ける。ヒンジは木目方向に、仕様通りの下穴を開けて固定すること。<strong>サインオフ前にサンプル蓋を100回開閉</strong>してください。</li>
<li><strong>サシェに対して小さすぎる仕切り。</strong>工場がLiptonサイズの正方形用に作った仕切りに、Bigelowサイズの長方形バッグが押し潰された例がある。<strong>ツーリング前にサシェ仕様を送信。</strong></li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>ロゴは入れられるか？（レーザー、UV印刷、ホットフォイル）</h2>
<!-- /wp:heading -->

{img(IMG['logo'], "アカシア製ティーボックスに「Custom Logo Available」の文字 — OEM ODMサービス、カスタム包装、カスタムサイズ — ブランディングオプション。")}

<!-- wp:paragraph -->
<p>アカシアは寛大なキャンバスです。心材の濃い縞と辺材の明るい部分はレーザーとインクを美しく受け止める — 多くの場合あなたに有利に。</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>レーザー刻印</strong> — 推奨デフォルト。CO2レーザーが表面をエスプレッソブラウンに焼き、ハニー色の心材とコントラストを作る。5 ptまでの細字を保持。<strong>個別単価アップなし。</strong>ロゴ、ブランド名、仕切り上の個別ティー種類ラベル、限定版番号付けに最適。</li>
<li><strong>UV印刷</strong> — フルカラー写真品質を木材表面に直接印刷。植物画アートワークに最適。スケールで+0.40〜0.90ドル/個。レーザーよりわずかにフラットに見える — 印刷は木目の上に乗り、焼き込まれないため。</li>
<li><strong>ホットフォイルスタンピング</strong> — ハイエンドギフト向けのゴールドまたはローズゴールド箔。プレミアムな感触。輸送中にぶつかるとフォイルが欠ける場合あるため、<em>蓋のみ</em>に使用。</li>
<li><strong>シルクスクリーン印刷</strong> — アカシアではあまり一般的でない。ソリッドブロックロゴ（例：円形メダリオン）にのみ使用。</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>プロのヒント：</strong>アートワークを確定する前に、アカシア端材へのレーザー刻印サンプルを工場に依頼。木目の濃い縞がレーザーバーンの読みやすさに影響 — Pantone PDFで完璧に見えるロゴが、実木材では少し太めにする必要があるかも。</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>2026年のMOQ、リードタイム、FOB価格</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>これらが現在見積もる数字です。標準の<strong>6仕切りアカシアボックス、アクリル窓付きヒンジ蓋、内部ミネラルオイル仕上げ、レーザー刻印ロゴ</strong>を基準として算出。他の構成はこの基準から上下します（表の下に追加コスト記載）。</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>数量</th><th>指標FOB廈門 (USD)</th><th>サンプルリードタイム</th><th>生産リードタイム</th></tr></thead><tbody>
<tr><td>300〜500個（入門MOQ）</td><td>$7.50〜$8.50 / 個</td><td>7〜12日</td><td>30〜35日</td></tr>
<tr><td>1,000〜2,000個</td><td>$6.50〜$7.30 / 個</td><td>7〜12日</td><td>30〜35日</td></tr>
<tr><td>5,000個 +</td><td>$5.80〜$6.40 / 個</td><td>10〜14日</td><td>40〜45日</td></tr>
<tr><td>20,000個 +（年間プログラム）</td><td>$5.20〜$5.80 / 個</td><td>10〜14日</td><td>50〜60日、段階的</td></tr>
</tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p><strong>計画すべき追加コスト：</strong></p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li>+$0.50〜$1.20 / 個 — プレミアム仕上げ（ビーズワックスまたはマットラッカー）</li>
<li>+$0.40〜$0.90 / 個 — UV印刷</li>
<li>+$1.50 / 個 — アクリルではなくガラス窓（1,000個時）</li>
<li>+12%一律 — マグネット蓋SKU</li>
<li>+$0.08〜$0.12 / 個 — バーコード付きリテール対応マスターカートン</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>結論：</strong>上限価格でも、アカシアは市場で最も安価なプレミアム外観硬材ティーボックス — 他はより安く見えるか（キリ、バンブー）、かなり高い（ウォルナット、オーク）。</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>海上輸送中にボックスをどう守るか？</h2>
<!-- /wp:heading -->

{img(IMG['packaging'], "倉庫に積まれた輸出マスターカートンと保護材で包まれたティーボックス — 北米・欧州向け海上輸送用包装。")}

<!-- wp:paragraph -->
<p>このカテゴリーで最も無視されがちな要素は、ボックスが工場を<em>離れた後</em>に何が起こるかです。湿度が50%RH（積出港）と95%RH（熱帯赤道横断）の間で変動する30日間のコンテナは、正しく梱包されていないティーボックスを必ず反らせます。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>当社のアカシアティーボックス用標準輸出包装仕様：</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>内装パック：</strong>各ボックスをポリ袋に入れ、乾燥剤サシェ（シリカゲル5g）を同梱。ポリ袋はシール（折り込みのみは不可）。</li>
<li><strong>カラーボックス（任意）：</strong>ポリ袋の周囲をブランド印刷ギフトボックスで包む。</li>
<li><strong>マスターカートン：</strong>5層段ボール、内部仕切り、カートンあたり最大24個。原産国とHSコードを表示。</li>
<li><strong>パレット：</strong>熱処理木製パレット（ISPM 15準拠）、最大4段積み、ストラップ＋ストレッチラップ。</li>
<li><strong>落下試験：</strong>AQL 2.5でサインオフ。コンクリート床に80 cm落下、四隅。内部損傷なし。</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>あなたが得る節約：</strong>30日間の海上コンテナ後の典型的不良率が、この仕様で約3%（未保護）から0.5%未満に低下。5,000個出荷で125個の請求対象品が減ります。</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>PIサイン前のソーシングチェックリスト</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Proforma Invoiceサイン前に新規バイヤー全員に送るチェックリスト。どのステップも飛ばすのは自己責任。</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li>収納すべきバッグの<strong>正確なサシェ寸法</strong>（L &times; W &times; H）を <em>ツーリング前に</em> 送信。</li>
<li><strong>パネル切断サンプル</strong>を要求 — 無垢アカシアであり、端材接着でないことを確認。</li>
<li><strong>内部オイルのCOA</strong>と、これらの市場で販売する場合は<strong>FDA / LFGB / EU 10/2011テストレポート</strong>を要求。</li>
<li>ヒンジタイプとヒンジ素材（真鍮またはクロームメッキ亜鉛合金）を指定し、ヒンジ取付の下穴穿孔を確認。</li>
<li>サンプル蓋を<strong>100回</strong>開閉し、閉じた状態のボックスを10回逆さに傾ける。蓋が外れず、仕切りもガタつかないこと。</li>
<li>切断サンプルでアカシアパネルの<strong>含水率が8〜12%</strong>であることを確認。14%超だと30日間のコンテナ後に反りが発生。</li>
<li><strong>マスターカートン落下試験</strong>にサインオフ：コンクリート床80 cm、四隅。内部損傷なし。</li>
<li>QCパートナーの<strong>最終検査レポート（AQL 2.5）</strong>を <strong>コンテナリリース前に</strong> 書面で取得。</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>これらは当社特有ではありません。当社を含むあらゆる木製ボックス工場から身を守る同じチェックリストです。</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>次のステップは？</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>アカシアを他の素材と天秤にかけているなら、短答はこうです：単価ターゲットがFOB 5ドル未満、あるいはバイヤーが明確にウォルナットを指定していない限り、アカシアを選んでください。食品安全、ビジュアル、運賃経済性のストーリーすべてがあなたに有利に働きます。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>仕様に対する見積りは、<a href="/contact">お問い合わせフォーム</a>から以下を送信してください：</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li>仕切り数 + サシェ寸法</li>
<li>蓋スタイル（窓付きヒンジ / スライド / マグネット）</li>
<li>仕上げ（オイル / ビーズワックス / マットラッカー）</li>
<li>ブランディング方法（レーザー / UV印刷 / ホットフォイル）</li>
<li>目標数量と納期月</li>
<li>仕向港（デフォルトFOB廈門）</li>
</ul>
<!-- /wp:list -->
<!-- wp:paragraph -->
<p>1営業日以内に指標FOBとサンプルリードタイムをご返信します。</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>関連ガイド</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<li><a href="/blog/wooden-tea-box-manufacturer">ディストリビューター・ギフトブランド向け木製ティーボックス製造ガイド</a> — 本素材ガイドの調達側コンパニオン。</li>
<li><a href="/blog/multi-compartment-wooden-tea-boxes-bulk-orders">複数仕切り木製ティーボックス：バルク発注前にバイヤーが確認すべきこと</a> — QCとバルク注文チェックリスト。</li>
<li><a href="/blog/wooden-tea-bag-organizer-guide">コーヒーステーション向け木製ティーバッグオーガナイザーの選び方</a> — ホスピタリティとコーヒーステーション視点。</li>
<li><a href="/blog/acacia-vs-bamboo-organizer">アカシア vs バンブー オーガナイザー：2026年のトップホームブランドがアカシアに移行する理由</a> — より広範な素材比較。</li>
<li><a href="/products/wooden-tea-box">当社の木製ティーボックス製品ラインを見る</a></li>
<li><a href="/material-guide">CHIC素材ガイド — アカシア、ウォルナット、キリ、バンブー、パイン比較</a></li>
</ul>
<!-- /wp:list -->
"""

JA_FAQ = [
    {'q': 'アカシア材は茶葉との直接接触に安全ですか？',
     'a': '<p>はい — 内部が食品グレードミネラルオイル、食品グレード植物油（「バッチャーブロックオイル」）、またはビーズワックスで仕上げられている場合に限ります。独立試験により、アカシアのような無垢硬材は高温・酸性条件下でも事実上検出されないレベルの化学物質しか放出しないことが示されています。リスクは木材そのものではなく内部のPUラッカーにあるため、食品グレードオイルを必須とし、内側にラッカーを使う工場は拒否してください。</p>'},
    {'q': 'ティーボックスの仕切り数は何個にすべきですか？',
     'a': '<p>プログラムに合わせてください：サンプラー/コーポレートギフトは4、Amazon小売ボリュームのスイートスポットは6、プレミアムギフト/レジストリは8、ホスピタリティ・コーヒーステーションは10、ティーブランド小売マーチャンダイザーは12。数より重要なのは仕切りの<em>高さ</em> — ピラミッド型サシェは9 cm、平型ティーバッグは7 cm。ツーリング前にサシェ寸法を送信してください。</p>'},
    {'q': 'アカシア製ティーボックスはバンブー製と比べてどうですか？',
     'a': '<p>バンブーはわずかに安く、安定性も同等で、「エコ」として読まれます。しかし複合/ラミネートバンブーは酸性液体に触れるとメラミンが溶出する可能性があり、茶葉保管には無垢一体物のバンブーしか安全ではありません。アカシアはこのリスクを完全に回避し、工場出荷時点で見た目がプレミアムで、リテールヒーローショットでより映えます。中〜プレミアム価格帯のティーブランドにとって、ほぼ同じ単価で知覚価値の面でアカシアが勝ります。</p>'},
    {'q': '30日間の海上コンテナでアカシア製ティーボックスは反りますか？',
     'a': '<p>正しく作られていれば反りません。アカシアパネルは<strong>含水率8〜12%</strong>に乾燥室処理し、梱包前に食品グレードオイルでシールする必要があります。MC 14%超では熱帯湿度下で反りはほぼ確実。当社の標準輸出パックは乾燥剤サシェと5層段ボールマスターカートンを追加 — 海上輸送後の不良率は約3%（未保護）から0.5%未満に低下します。</p>'},
    {'q': 'MOQ、サンプルリードタイム、生産リードタイムは？',
     'a': '<p>入門MOQはデザインあたり300〜500個。サンプル7〜12日、サンプル承認後30〜35日で量産。1,000個で個あたり約10%節約、5,000個以上で約25%節約。20,000個以上の年間プログラムは在庫回転を保つため段階的に50〜60日の生産サイクルで走ります。</p>'},
    {'q': 'ロゴをレーザー刻印できますか？追加コストはかかりますか？',
     'a': '<p>はい — アカシアはCO2レーザー刻印に最適な木材の一つです。ハニー色の心材がレーザーで焼かれたダークエスプレッソラインと美しくコントラストし、ロゴ、ブランド名、個別仕切りラベルが5 ptの細字までクリアに読めます。<strong>レーザー刻印は当社FOB見積りに含まれており、個あたり追加コストはありません。</strong>B2Bアカシアティーボックスプログラムで最も人気のブランディング方法です。</p>'},
    {'q': 'プログラムに対してどの食品安全認証を取得できますか？',
     'a': '<p>標準ドキュメントには、FDA食品接触適合（米国）、LFGBおよびEU 10/2011（EU市場）、カリフォルニア店頭配置向けProp 65レポート、バイヤーが森林認証を要求する場合のFSCチェーンオブカストディが含まれます。BSCI工場監査もご要望に応じて提供可能で、労働基準適合をカバーします。</p>'},
    {'q': 'バッチが損傷して到着した場合どうなりますか？',
     'a': '<p>当社の最終検査レポート（AQL 2.5）はコンテナリリース前に書面で共有 — 欠陥がAQLしきい値を超えればリリースを拒否できます。FOB条件で出荷後はリスクが移転しますが、製造欠陥（反り、ヒンジ故障、パネルひび割れ）に対する交換ユニットを12ヶ月間無償でカバーします。輸送中のハンドリングによる外観上の損傷はフォワーダーへの請求案件です。だから上記の梱包仕様が重要なのです。</p>'},
]


# ─── Merge FR + JA into the blog translation files ─────────────────────
ENTRIES = {
    'fr': {'title': FR_TITLE, 'excerpt': FR_EXCERPT, 'content': FR_CONTENT,
           'meta_title': FR_META_TITLE, 'meta_desc': FR_META_DESC, 'faq': FR_FAQ},
    'ja': {'title': JA_TITLE, 'excerpt': JA_EXCERPT, 'content': JA_CONTENT,
           'meta_title': JA_META_TITLE, 'meta_desc': JA_META_DESC, 'faq': JA_FAQ},
}

for lang, entry in ENTRIES.items():
    path = os.path.join(ROOT, f'messages/blogs.{lang}.json')
    data = json.load(open(path, encoding='utf-8'))
    data[SLUG] = entry
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f'{lang}: merged {SLUG} → messages/blogs.{lang}.json (now {len(data)} slugs)')
