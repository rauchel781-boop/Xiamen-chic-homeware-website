# Hand-translate the acacia-wood-tea-box-material-guide blog post into
# de/es/fr/ja and merge into messages/blogs.<lang>.json.
#
# Aliyun isn't reachable from the sandbox, so we do this by hand.
# Each translation preserves:
#   - WP block comments (<!-- wp:... -->) — required for renderer
#   - Image src paths — unchanged
#   - Brand names (CHIC, Misen, Williams-Sonoma, etc.) — unchanged
#   - Numbers, units, dimensions, currencies — unchanged
#   - HTML entities — unchanged
# Translates: visible text, headings, list items, table cells, image alt, FAQ.

import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
POSTS = os.path.join(ROOT, 'wp-data', 'posts.json')

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
# GERMAN
# ══════════════════════════════════════════════════════════════════════════

DE_TITLE = 'Akazienholz-Teeboxen: Ein 2026er Einkaufsführer für Marken, Hotels und Geschenkprogramme'
DE_META_TITLE = 'Akazienholz-Teebox: Einkaufsführer 2026 (Material, MOQ, Kosten)'
DE_META_DESC = (
    'Einkaufsführer für Akazienholz-Teeboxen für Teemarken, Hotels und '
    'Geschenkprogramme — mit 30-Sekunden-Entscheidungsmatrix, '
    'Lebensmittelsicherheits-Daten, Fachlayouts, Veredelungen, MOQ und '
    'FOB-Preisen unserer Xiamen-Fabrik.'
)
DE_EXCERPT = (
    '<p>Ein 2026er materialorientierter Einkaufsführer für B2B-Marken und '
    'Private-Label-Käufer, die nach Akazienholz-Teeboxen suchen — mit '
    'Härtegraden, Lebensmittelsicherheits-Vergleichen, Fachlayouts, '
    'Oberflächen, Deckelarten, MOQ und FOB-Preisen aus unserer Xiamen-Fabrik.</p>'
)

DE_CONTENT = f"""<!-- wp:paragraph -->
<p>Sie beschaffen Teeboxen. Ihr Kunde (oder Ihr Einkäufer oder Ihr Retail-Planer) möchte, dass die Box hochwertig aussieht, sich hochwertig anfühlt, ohne Verzug transportiert werden kann und eine Lebensmittelsicherheits-Prüfung besteht. Jeder Leitfaden, den Sie lesen, sagt Ihnen, Sie sollen Akazienholz verwenden. Dieser Leitfaden beantwortet die nächste Frage: <strong>Wie bestellen Sie tatsächlich eine, ohne Schiffbruch zu erleiden?</strong></p>
<!-- /wp:paragraph -->

{img(IMG['hero'], 'Nahaufnahme der Akazienholz-Maserung mit honig- bis schokoladenfarbener Farbvariation, dem führenden Material für die Herstellung von Premium-Teeboxen.')}

<!-- wp:paragraph -->
<p>Dies ist das Spielbuch, das wir in unserer Xiamen-Fabrik verwenden, wenn wir Akazien-Teeboxen für Private-Label-Teemarken, Hospitality-Käufer und Corporate-Gift-Programme anbieten. Echte Janka-Härtegrade. Echte Mängel, die wir immer noch in günstigen Importen sehen. Echte FOB-Preise für 2026. Und die 30-Sekunden-Entscheidungsmatrix, damit Sie Ihre Spezifikation selbst auswählen können, bevor Sie ein weiteres Wort lesen.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Die 30-Sekunden-Entscheidungsmatrix</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Finden Sie die Zeile, die zu Ihrem Projekt passt, und lesen Sie nur die markierten Abschnitte.</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>Wenn Sie …</th><th>Bester Spec</th><th>Zu lesende Abschnitte</th></tr></thead><tbody>
<tr><td>Eine Teemarke mit 4–8 Sorten launchen</td><td>6 oder 8 Fächer, Klappdeckel mit Acrylfenster, lasergravierte Logo</td><td>§3, §6, §10, §12</td></tr>
<tr><td>Ein Hotel/B&amp;B/Café-Käufer sind</td><td>10 Fächer, Magnet- oder Schiebedeckel, lebensmittelechtes Öl als Innenfinish</td><td>§4, §6, §7, §10</td></tr>
<tr><td>Manager eines Corporate-Gift-Programms sind</td><td>4 oder 6 Fächer, Heißfolien- oder Gold-Laser-Markenzeichen, geschenkfertige Verpackung</td><td>§6, §12, §15</td></tr>
<tr><td>Eine Abo-/Box-of-the-Month-Marke sind</td><td>6 Fächer, magnetischer Klappdeckel, kundenspezifischer UV-Druck auf dem Deckel</td><td>§6, §12, §13</td></tr>
<tr><td>Ein Einzelhändler mit SKU-Refresh sind</td><td>Gemischte 4/6/8-SKUs, Schiebedeckel, neutrale geölte Oberfläche</td><td>§6, §8, §13</td></tr>
</tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p><strong>Möchten Sie jetzt ein Angebot?</strong> Senden Sie Fächeranzahl, Deckelart, Branding-Methode und Zielmenge über unser <a href="/contact">Kontaktformular</a> &mdash; wir antworten innerhalb eines Werktags mit einem indikativen FOB-Preis.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Drei Käufer, drei reale Szenarien</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Die meiste Verwirrung beim Kauf in dieser Kategorie kommt durch das Verwechseln der Anwendungsfälle. Hier sind die drei Programme, die wir am häufigsten anbieten.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {{"level":3}} -->
<h3>Szenario A &mdash; Teemarken-Gründer launcht eine Sechs-Sorten-Linie</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p><em>&quot;Ich habe sechs SKUs losen Tee, mein Verkaufspreis ist 24 $ pro Box, und ich muss im Regal wie Harney &amp; Sons aussehen, ohne deren Stückkosten zu zahlen.&quot;</em></p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>Empfohlene Spezifikation:</strong> 6-Fach-Akazienbox, ~25&times;19&times;9 cm, Klappdeckel mit Acrylfenster, Mineralöl-Innenfinish, lasergravierte Logo auf dem Deckel.</li>
<li><strong>Warum es funktioniert:</strong> Das Fenster lässt den Käufer alle sechs Teesorten sehen, ohne zu öffnen; das lasergravierte Logo gibt Heritage-Feeling ohne Aufpreis pro Stück; die Akazien-Maserung fotografiert besser als Bambus auf einem Hero-Shot.</li>
<li><strong>Indikativer FOB bei 1.000 Stk.:</strong> 6,50–7,30 $ pro Stück.</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {{"level":3}} -->
<h3>Szenario B &mdash; Hotelgruppe stockt Turn-down-Service auf</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p><em>&quot;200 Zimmer, nächtlicher Turn-down-Service, die Box muss zwei Jahre Housekeeping überstehen und auf einem Tablett noch frisch aussehen.&quot;</em></p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>Empfohlene Spezifikation:</strong> 10-Fach-Akazienbox, Schiebedeckel (keine Hardware, die kaputtgehen kann), Bienenwachs-Öl-Innenfinish, Hotel-Logo lasergraviert auf dem Deckel.</li>
<li><strong>Warum es funktioniert:</strong> Schiebedeckel entfernt den größten Fehlerpunkt (Scharniere). Bienenwachs-Finish lässt sich nach Tee-Verschüttungen leicht abwischen. 10 Fächer decken Grün-, Schwarz-, Kräuter-, Koffeinfreien plus saisonalen Tee ab.</li>
<li><strong>Indikativer FOB bei 500 Stk.:</strong> 8,50–9,20 $ pro Stück.</li>
</ul>
<!-- /wp:list -->

{img(IMG['hospitality'], 'Akazienholz-Teebox im Hotel- oder Hospitality-Einsatz mit Wasserkocher und Teetasse — typisches In-Room-Service-Anwendungsbild.')}

<!-- wp:heading {{"level":3}} -->
<h3>Szenario C &mdash; Manager eines Corporate-Gift-Programms</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p><em>&quot;Q4-Kundengeschenk, 3.000 Boxen, muss sich wie ein 60-$-Geschenk anfühlen, aber gelandet unter 15 $ kosten.&quot;</em></p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>Empfohlene Spezifikation:</strong> 4-Fach-Akazienbox, magnetischer Klappdeckel, heißfoliengeprägtes Logo (gold oder rosé-gold), gebrandete Geschenkhülle, individuelle Color-Box-Master-Kartons.</li>
<li><strong>Warum es funktioniert:</strong> Magnetdeckel liefern den &quot;Premium-Snap&quot;-Unboxing-Moment. Heißfolie liest sich als Luxus. 4-Fach-Footprint hält Stückkosten bei einem hochmargigen Programm niedrig.</li>
<li><strong>Indikativer FOB bei 3.000 Stk.:</strong> 7,20–8,00 $ pro Stück (inkl. Geschenkhülle, exkl. Teeinhalt).</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>Warum Akazie, nicht Bambus oder Kiefer?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Drei Eigenschaften lassen Akazie diese Kategorie gewinnen.</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>Sie ist dicht.</strong> Janka-Härte ~2.300 lbf &mdash; höher als Rot-Eiche (1.290), Walnuss (1.010) und weit über Kiefer (380–870). Übersetzt: Die Fachwände verbeulen nicht, wenn eine Metall-Teedose hineinfällt, und Scharnierkanten halten ihre Form nach Tausenden von Öffnungs-Schließ-Zyklen.</li>
<li><strong>Die Maserung ist eng genug, um keine Tee-Aromen aufzunehmen.</strong> Offenporige Hölzer wie Kiefer nehmen den Geruch eines starken Oolongs innerhalb eines Monats auf. Akazie nicht.</li>
<li><strong>Die natürliche Farbe ist bereits &quot;Premium&quot;.</strong> Honigfarbenes Herzholz bis schokoladenfarbene Streifen &mdash; keine Beize erforderlich, um auf einem Shopify-Hero-Shot hochwertig auszusehen, was die Stückkosten niedrig hält.</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Für den vollständigen Seite-an-Seite-Vergleich siehe unseren <a href="/blog/acacia-vs-bamboo-organizer">Akazie-vs-Bambus-Organizer-Leitfaden</a> und den <a href="/blog/acacia-wood-vs-bamboo-what-weve-learned-after-years-in-our-factory">Vergleich aus der Fabrikhalle</a>. Unten ist die teebox-spezifische Version.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Materialdaten: Akazie vs. Bambus vs. Paulownia vs. Walnuss</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Eine Tabelle, alle Spezifikationen, die Ihr Käufer möglicherweise fragen könnte.</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>Eigenschaft</th><th>Akazie</th><th>Bambus</th><th>Paulownia</th><th>Walnuss</th></tr></thead><tbody>
<tr><td>Dichte (kg/m&sup3;)</td><td>700–900</td><td>~700</td><td>~280</td><td>~640</td></tr>
<tr><td>Janka-Härte (lbf)</td><td>~2.300</td><td>~1.380</td><td>~300</td><td>~1.010</td></tr>
<tr><td>Farbe ohne Beize</td><td>Honig–Schokolade, dramatische Maserung</td><td>Hellgold oder karbonisiertes Karamell</td><td>Hellcreme, flach</td><td>Tiefe Schokolade, feine Maserung</td></tr>
<tr><td>Aroma-Absorption</td><td>Niedrig</td><td>Niedrig (nur massiv)</td><td>Mittel</td><td>Niedrig</td></tr>
<tr><td>Lebensmittelecht ab Werk</td><td>Ja</td><td>Nur einteilige Massivvariante</td><td>Benötigt Versiegelung</td><td>Ja</td></tr>
<tr><td>Verzugsrisiko bei Feuchtigkeit</td><td>Niedrig</td><td>Niedrig</td><td>Niedrig</td><td>Mittel</td></tr>
<tr><td>Typischer FOB-Kostenindex</td><td>1,0&times;</td><td>0,9&times;</td><td>0,7&times;</td><td>1,6&times;</td></tr>
</tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p><strong>Was das für Sie bedeutet:</strong> Bambus ist günstiger, verliert aber das &quot;Premium-Geschenk&quot;-Feeling und bringt Melamin-Auswaschungsrisiken mit sich, wenn es sich um laminierte Variante handelt (siehe nächsten Abschnitt). Paulownia ist viel günstiger, aber visuell flach &mdash; braucht Beize, um hochwertig zu wirken. Walnuss schlägt Akazie ästhetisch, fügt aber 60% zum FOB-Preis hinzu.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Ist Akazie für direkten Tee-Kontakt sicher?</h2>
<!-- /wp:heading -->

{img(IMG['foodsafe'], 'Offene Akazienholz-Teebox mit einem Glas lebensmittelechtem Mineralöl im Inneren — sichere Veredelung für direkten Tee-Kontakt.')}

<!-- wp:paragraph -->
<p>Kurze Antwort: <strong>ja, bei korrekter Veredelung</strong>.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>Die Kochgeschirrmarke <a href="https://misen.com/blogs/news/which-wood-won-t-leach-maple-acacia-bamboo-put-to-the-test" target="_blank" rel="noopener">Misen</a> hat unabhängige Tests durchgeführt, bei denen Akazie, Ahorn und Bambus heißer saurer Flüssigkeit ausgesetzt wurden und gemessen wurde, was ausgewaschen wird. Massive Harthölzer wie Akazie setzten <em>praktisch keine</em> nachweisbaren Chemikalien frei. Etwa 32% der Bambus-Proben setzten Melamin frei &mdash; nicht weil Bambus schlecht ist, sondern weil die meisten Bambus-Kochgeschirre aus Verbundplatten mit Melamin-Formaldehyd-Kleber bestehen.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Für Ihr Teebox-Programm bietet das Akazie drei regulatorische Vorteile gegenüber Verbund-Bambus:</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li>Einfachere <strong>FDA / LFGB / EU 10/2011</strong>-Lebensmittelkontakt-Konformität.</li>
<li>Weniger Fragen bei einer <strong>Prop 65</strong>-Prüfung für kalifornische Einzelhändler.</li>
<li>Eine sauberere Story für <strong>BSCI, FSC und eco-positionierte</strong> Käufer.</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Käufer-Checkliste zur Lebensmittelsicherheit:</strong></p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li>Innenraum muss mit <strong>lebensmittelechtem Mineralöl</strong>, <strong>lebensmittelechtem Pflanzenöl</strong> (oft als &quot;Butcher Block Oil&quot; bezeichnet) oder <strong>Bienenwachs</strong> behandelt sein. Nichts anderes.</li>
<li>Lehnen Sie jede Fabrik ab, die <strong>PU-Lack</strong> im Inneren verwendet &mdash; er ist nicht lebensmittelecht, sieht glänzend aus und schließt Feuchtigkeit ein, wo Schimmel wächst.</li>
<li>Fragen Sie nach dem <strong>COA</strong> (Certificate of Analysis) für das verwendete Öl.</li>
<li>Fordern Sie den unabhängigen <strong>FDA / LFGB-Testbericht</strong> für Ihren Zielmarkt an.</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>Wie viele Fächer brauche ich wirklich?</h2>
<!-- /wp:heading -->

{img(IMG['compartments'], 'Diagramm einer Holz-Teebox mit beschrifteten Fächern und einer Schublade — typische Mehrfach-Layouts.')}

<!-- wp:paragraph -->
<p>Die Fächeranzahl ist die größte SKU-Entscheidung nach dem Material. Hier ist, was tatsächlich in jeder Kategorie verkauft wird, basierend auf Hunderten von SKUs für globale Marken.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>4 Fächer</strong> &mdash; kleiner Heim-/Geschenkmarkt. Footprint ~25&times;15&times;9 cm. Am besten für Teemarken-Samplerpacks. Niedrigste FOB-Kosten. Üblich bei Williams-Sonoma- und Crate &amp; Barrel-Preispunkten.</li>
<li><strong>6 Fächer</strong> &mdash; der Amazon-Volumen-Sweetspot. ~25&times;19&times;9 cm. Passt für praktisch jeden Pyramiden-Beutel oder rechteckigen Teebeutel. Das Format, das die meisten Verbraucher nach &quot;Wochentag&quot; organisieren können.</li>
<li><strong>8 Fächer</strong> &mdash; der Geschenk-/Registry-Tier. ~30&times;19&times;9 cm. Fotografiert wunderschön auf Instagram. Oft mit Glasfensterdeckel kombiniert.</li>
<li><strong>10 Fächer</strong> &mdash; Hospitality-, B&amp;B- und Kaffeestations-Bestellungen. ~38&times;19&times;9 cm. Hält genug Vielfalt für ein Gast-Amenity-Tablett.</li>
<li><strong>12 Fächer</strong> &mdash; Teemarken-Merchandiser. ~38&times;25&times;9 cm. In-Store-Einzelhandelsfixtur für Spezial-Teemarken.</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Das Detail, vor dem niemand warnt:</strong> Die Fach<em>höhe</em> ist wichtiger als die Fächeranzahl. Pyramiden-Beutel brauchen 9 cm; flache Teebeutel brauchen 7 cm. Senden Sie der Fabrik Ihre tatsächlichen Beutelmaße <em>vor</em> dem Werkzeugbau &mdash; sonst schließt der Deckel nicht.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Klappdeckel mit Fenster vs. Schiebedeckel vs. Magnet-Klappdeckel &mdash; welchen wähle ich?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Drei Deckelstile dominieren. Jeder hat andere Kosten, Haltbarkeit und Regal-Appeal.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {{"level":3}} -->
<h3>Klappdeckel mit Acryl- oder Glasfenster (Bestseller)</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Die meistangefragte Spezifikation. 3 mm Acryl sitzt in einer gefrästen Nut auf dem Akazien-Rahmen, gehalten von zwei Messingscharnieren. Käufer sehen die Tee-Auswahl ohne den Deckel anzuheben &mdash; das größte UX-Upgrade, das Sie machen können.</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>Acryl</strong> vs. <strong>Glas</strong>: Acryl überlebt Stürze und spart Fracht. Glas sieht reicher aus, ist aber schwerer und zerbrechlich.</li>
<li><strong>Kostenaufschlag ggü. Schiebedeckel:</strong> ca. 1,20 $/Stk. bei 1.000 Stk. (Acryl), 1,80 $ (Glas).</li>
<li>Empfehlung für: Retail-Markenboxen, Geschenkprogramme.</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {{"level":3}} -->
<h3>Schiebedeckel (sauberste Ästhetik, niedrigste Kosten)</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Keine Hardware. Nur präzisionsgefräste Nuten und ein flacher Akazien-Deckel, der ein- und ausgleitet. Das sauberste Äußere und der kostengünstigste Deckel, den wir herstellen.</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>Pro:</strong> keine Fehlerpunkte. Übersteht Hotel-Housekeeping.</li>
<li><strong>Contra:</strong> keine Sichtbarkeit des Inhalts; kann klemmen, wenn Feuchtigkeitsschwankungen das Holz aufquellen lassen.</li>
<li>Empfehlung für: Hospitality, handnummerierte Geschenk-Chargen, minimalistische Marken.</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {{"level":3}} -->
<h3>Magnet-Klappdeckel (das hochwertigste Gefühl)</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Neodym-Magnete in der Rückwand und am Deckelrand sorgen für ein unsichtbares &quot;Snap&quot;-Schließen. Das hochwertigste Gefühl und die beste Wahl für gehobene Abo-Teemarken &mdash; das Unboxing-Erlebnis ist Teil der Marke.</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>Kostenaufschlag:</strong> +1,20–1,80 $/Stk.</li>
<li><strong>Spezifikation Muss:</strong> N42 oder stärkere Magnete, sonst springt der Deckel auf, wenn Sie die Box kippen.</li>
<li>Empfehlung für: Abo-Marken, Corporate-Geschenke, Registry-Retail.</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>Welche Oberfläche soll ich bestellen? (Überspringen Sie das, wenn die Fabrik &quot;PU&quot; sagt)</h2>
<!-- /wp:heading -->

{img(IMG['finish'], 'Nahaufnahme eines Messingknopfes an einer dunkel veredelten Akazien-Schublade — Hardware-und-Veredelung-Kombination auf einer Premium-Teebox.')}

<!-- wp:paragraph -->
<p>Akazie ist von Natur aus wasserresistent, aber nicht wasserdicht. Eine gute Veredelung bringt die Schokoladenmaserung hervor, sichert Stabilität bei Feuchtigkeitsschwankungen und hält die Box für die gesamte Programmdauer lebensmittelecht.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Drei Veredelungen, die wir empfehlen</strong> (in der Reihenfolge der Käuferreichweite):</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>Lebensmittelechtes Mineralöl</strong> &mdash; der Standard. Dringt in die Maserung ein, vertieft die Farbe leicht, und der Kunde kann es zu Hause für 5+ Jahre Service nachölen. Niedrigste Kosten, voll lebensmittelecht, FDA-anerkannt.</li>
<li><strong>Bienenwachs + Mineralöl-Mischung</strong> (&quot;Butcher Block Conditioner&quot;) &mdash; reicherer Satin-Glanz, leicht bessere Wasserresistenz. Lohnt sich für Geschenkprogramme.</li>
<li><strong>Lebensmittelechter matter Lack</strong> &mdash; <strong>nur außen</strong>, niemals innen. Zwei Lagen wasserbasierter matter Lack fügen Fingerabdruckresistenz hinzu. Mit geöltem Innenraum kombinieren. Am besten für Cafés und Hospitality-Boxen, die ständig abgewischt werden.</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Was zu verweigern ist:</strong> glänzender PU-Lack, lösungsmittelbasierte Beizen zur günstigen Farbvertiefung und jedes &quot;Tungöl&quot;, das nicht lebensmittelecht zertifiziert ist. Die ersten beiden sind unsicher für Tee-Kontakt; das dritte ist oft ein Tungöl-Ersatz mit Schwermetall-Trocknungsmitteln.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Die vier Mängel, die wir noch an günstigen Akazien-Teeboxen sehen</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Dies sind die Probleme, die am häufigsten auftauchen, wenn wir ein Wettbewerbsmuster für eine neue Marke prüfen &mdash; meist genau bevor sie den Lieferanten wechseln.</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>Verleimte Restholzblöcke statt massiver Panele.</strong> Günstige Boxen verwenden kleine Akazien-Abschnitte, kantenverleimt zu einem Panel, oft unter einer Beize versteckt. Die Klebelinien reißen entlang der Fachunterteilungen innerhalb von sechs Monaten. <strong>Fragen Sie nach einer Schnitt-Probe</strong> &mdash; Sie sollten nicht mehr als zwei Klebelinien pro Seitenwand sehen.</li>
<li><strong>Acryl-Fenster im Transit zerkratzt.</strong> Die Schutzfolie sollte während der gesamten Produktionslinie auf dem Acryl bleiben und nur vom Endkunden abgezogen werden. Fragen Sie die Fabrik nach einem Video der Folien-Applikations-Station.</li>
<li><strong>Scharnierschrauben in Hirnholz eingedreht.</strong> Hirnholz-Schrauben ziehen sich bei wiederholtem Deckelöffnen heraus. Scharniere müssen ins Hauptholz geschraubt werden, mit nach Spezifikation vorgebohrten Löchern. <strong>Öffnen Sie den Musterdeckel 100 Mal</strong>, bevor Sie freigeben.</li>
<li><strong>Fächer zu klein für Ihren Beutel.</strong> Wir haben gesehen, wie Bigelow-große rechteckige Beutel zerquetscht wurden, weil die Fabrik Fächer für Lipton-große Quadrate gebaut hat. <strong>Senden Sie die Beutel-Spec vor dem Werkzeugbau.</strong></li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>Kann ich mein Logo darauf bringen? (Laser, UV-Druck, Heißfolie)</h2>
<!-- /wp:heading -->

{img(IMG['logo'], 'Akazien-Teebox mit dem Text &quot;Custom Logo Available&quot; — OEM-ODM-Service, individuelle Verpackung, individuelle Größe — Demonstration der Branding-Optionen.')}

<!-- wp:paragraph -->
<p>Akazie ist eine großzügige Leinwand. Die dunklen Kernholz-Streifen und das hellere Splintholz nehmen Laser und Tinte wunderschön auf &mdash; meist zu Ihren Gunsten.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>Laser-Gravur</strong> &mdash; unser empfohlener Standard. Der CO2-Laser brennt die Oberfläche zu Espresso-Braun, kontrastierend mit dem honigfarbenen Kern. Hält feine Schrift bis 5 pt. <strong>Kein Aufschlag pro Stück.</strong> Am besten für Logos, Markennamen, einzelne Tee-Sorten-Labels auf Trennstücken und Limited-Edition-Nummerierung.</li>
<li><strong>UV-Druck</strong> &mdash; vollfarbiger fotografischer Druck direkt auf dem Holz. Großartig für botanische Kunstwerke. +0,40–0,90 $/Stk. im Maßstab. Sieht etwas flacher aus als Laser, weil der Druck auf der Maserung sitzt, statt sich einzubrennen.</li>
<li><strong>Heißfolien-Prägung</strong> &mdash; gold oder rosé-gold für gehobene Geschenke. Premium-Feeling. Folie kann splittern, wenn die Box im Transit angeschlagen wird, also Folie <em>nur auf dem Deckel</em> verwenden.</li>
<li><strong>Siebdruck</strong> &mdash; weniger üblich auf Akazie; nur für massive Block-Logos verwenden (z.B. ein kreisförmiges Medaillon).</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Profi-Tipp:</strong> Bitten Sie die Fabrik um ein lasergraviertes Muster auf einem Akazien-Restpanel, bevor Sie das Artwork festlegen. Die dunklen Streifen in der Maserung beeinflussen, wie sauber der Laserbrand liest &mdash; ein Logo, das auf einem Pantone-PDF perfekt aussieht, muss auf echtem Holz möglicherweise etwas fetter sein.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>MOQ, Lieferzeiten und FOB-Preise in 2026</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Dies sind die Zahlen, die wir derzeit anbieten, indexiert auf eine Standard-<strong>6-Fach-Akazienbox, Klappdeckel mit Acrylfenster, Mineralöl-Innenfinish, lasergravierte Logo</strong>. Andere Konfigurationen bewegen sich von dieser Basis nach oben oder unten (Aufschläge unter der Tabelle).</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>Volumen</th><th>Indikativer FOB Xiamen (USD)</th><th>Sample-Lieferzeit</th><th>Produktions-Lieferzeit</th></tr></thead><tbody>
<tr><td>300–500 Stk. (Einstiegs-MOQ)</td><td>7,50–8,50 $ / Stk.</td><td>7–12 Tage</td><td>30–35 Tage</td></tr>
<tr><td>1.000–2.000 Stk.</td><td>6,50–7,30 $ / Stk.</td><td>7–12 Tage</td><td>30–35 Tage</td></tr>
<tr><td>5.000 Stk. +</td><td>5,80–6,40 $ / Stk.</td><td>10–14 Tage</td><td>40–45 Tage</td></tr>
<tr><td>20.000 Stk. + (Jahresprogramm)</td><td>5,20–5,80 $ / Stk.</td><td>10–14 Tage</td><td>50–60 Tage, gestaffelt</td></tr>
</tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p><strong>Einzuplanende Aufschläge:</strong></p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li>+0,50–1,20 $ / Stk. &mdash; Premium-Veredelung (Bienenwachs oder matter Lack)</li>
<li>+0,40–0,90 $ / Stk. &mdash; UV-Druck</li>
<li>+1,50 $ / Stk. &mdash; Glasfenster statt Acryl (bei 1.000 Stk.)</li>
<li>+12% pauschal &mdash; Magnet-Deckel-SKUs</li>
<li>+0,08–0,12 $ / Stk. &mdash; retail-fertige Master-Kartons mit Barcodes</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Fazit:</strong> Selbst am oberen Ende ist Akazie immer noch die günstigste Premium-Look-Hartholz-Teebox auf dem Markt &mdash; die anderen sehen entweder günstiger aus (Paulownia, Bambus) oder kosten deutlich mehr (Walnuss, Eiche).</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Wie schützen Sie die Box beim Seetransport?</h2>
<!-- /wp:heading -->

{img(IMG['packaging'], 'Export-Master-Kartons in einem Lager mit einer in Schutzmaterial gewickelten Teebox — Verpackung für Seefracht nach Nordamerika und Europa.')}

<!-- wp:paragraph -->
<p>Einer der am meisten ignorierten Faktoren in dieser Kategorie ist, was mit der Box <em>nach</em> dem Verlassen der Fabrikhalle passiert. Ein 30-tägiger Container mit Feuchtigkeitsschwankungen zwischen 50% RH (Ausgangshafen) und 95% RH (tropischer Äquatorquerung) verzieht jede Teebox, die nicht ordentlich gepackt wurde.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Unsere Standard-Export-Verpackungs-Spec für Akazien-Teeboxen:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>Innen-Pack:</strong> jede Box in einem Polybeutel mit Trockenmittel-Sachet (Silikagel, 5g). Polybeutel ist versiegelt, nicht nur eingesteckt.</li>
<li><strong>Color Box (optional):</strong> markendruckte Geschenkbox um den Polybeutel.</li>
<li><strong>Master-Karton:</strong> 5-lagig Wellpappe, innere Trennwände, max. 24 Stk. pro Karton. Mit Ursprungsland und HS-Code kennzeichnen.</li>
<li><strong>Palette:</strong> hitzebehandelte Holzpalette (ISPM 15 konform), max. 4 Schichten hoch, gegurtet und stretchverpackt.</li>
<li><strong>Falltest:</strong> AQL 2.5 Freigabe. 80-cm-Fall auf Beton, vier Ecken. Kein Innenschaden.</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Was das Ihnen erspart:</strong> Typische Defektrate nach einem 30-tägigen Seecontainer fällt von ~3% (ungeschützt) auf unter 0,5% mit dieser Spezifikation. Bei einer 5.000-Stk.-Sendung sind das 125 weniger reklamierbare Einheiten.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Die Beschaffungs-Checkliste vor der Unterzeichnung der PI</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Die Checkliste, die wir jedem neuen Käufer vor der Unterzeichnung einer Proforma-Rechnung senden. Überspringen Sie einen Schritt auf eigene Gefahr.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li>Senden Sie die exakten <strong>Beutelmaße</strong> (L &times; B &times; H) für den Beutel, den die Box aufnehmen muss &mdash; <em>vor dem Werkzeugbau</em>.</li>
<li>Fragen Sie nach einem <strong>Schnitt-Panel-Muster</strong> &mdash; bestätigt massive Akazie, nicht verleimtes Restholz.</li>
<li>Fordern Sie das <strong>COA für das Innenöl</strong> und den <strong>FDA / LFGB / EU 10/2011-Testbericht</strong> an, wenn Sie auf diesen Märkten listen.</li>
<li>Spezifizieren Sie Scharniertyp, Scharniermaterial (Messing oder verchromtes Zinkdruckguss) und bestätigen Sie das Vorbohren an den Scharnier-Montagen.</li>
<li>Öffnen Sie den Musterdeckel <strong>100 Mal</strong> und kippen Sie die geschlossene Box 10 Mal umgedreht. Deckel sollte nicht aufspringen; kein Fach sollte rasseln.</li>
<li>Bestätigen Sie <strong>Feuchtigkeitsgehalt der Akazien-Panele bei 8–12%</strong> am Schnittmuster. Über 14% und Sie sehen Verzug nach einem 30-tägigen Seecontainer.</li>
<li>Geben Sie den <strong>Master-Karton-Falltest</strong> frei: 80 cm auf Beton, vier Ecken. Kein Innenschaden.</li>
<li>Holen Sie sich den <strong>Endinspektionsbericht (AQL 2.5)</strong> des QC-Partners schriftlich <strong>vor Container-Freigabe</strong>.</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Nichts davon ist CHIC-spezifisch. Es ist dieselbe Checkliste, die Sie vor <em>jeder</em> Holz-Box-Fabrik schützt, einschließlich unserer.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Wie geht es weiter?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Wenn Sie Akazie gegen ein anderes Material abwägen, ist die kurze Antwort: Wählen Sie Akazie, es sei denn, Ihr Stückpreisziel liegt unter 5 $ FOB oder Ihr Käufer hat ausdrücklich Walnuss verlangt. Die Lebensmittelsicherheits-, visuellen und Frachtökonomie-Geschichten stehen alle zu Ihren Gunsten.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Für ein Angebot zu Ihrer Spezifikation senden Sie folgendes über unser <a href="/contact">Kontaktformular</a>:</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li>Fächeranzahl + Beutelmaße</li>
<li>Deckelart (Klappdeckel mit Fenster / Schiebedeckel / Magnet)</li>
<li>Veredelung (Öl / Bienenwachs / matter Lack)</li>
<li>Branding-Methode (Laser / UV-Druck / Heißfolie)</li>
<li>Zielmenge und Liefermonat</li>
<li>Bestimmungshafen (FOB Xiamen standardmäßig)</li>
</ul>
<!-- /wp:list -->
<!-- wp:paragraph -->
<p>Wir antworten innerhalb eines Werktags mit einem indikativen FOB-Preis und einer Sample-Lieferzeit.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Verwandte Leitfäden</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<li><a href="/blog/wooden-tea-box-manufacturer">Holz-Teebox-Herstellungsleitfaden für Distributoren und Geschenkmarken</a> &mdash; das Beschaffungs-Pendant zu diesem Materialleitfaden.</li>
<li><a href="/blog/multi-compartment-wooden-tea-boxes-bulk-orders">Mehrfach-Holz-Teeboxen: Was Käufer vor Großbestellungen prüfen sollten</a> &mdash; QC- und Bulk-Order-Checkliste.</li>
<li><a href="/blog/wooden-tea-bag-organizer-guide">Wie wählt man den richtigen Holz-Teebeutel-Organizer für Kaffeestationen</a> &mdash; Hospitality- und Kaffeestations-Winkel.</li>
<li><a href="/blog/acacia-vs-bamboo-organizer">Akazie vs. Bambus Organizer: Warum die führenden Heimmarken 2026 zu Akazie wechseln</a> &mdash; der breitere Materialvergleich.</li>
<li><a href="/products/wooden-tea-box">Unsere Holz-Teebox-Produktpalette durchsuchen</a></li>
<li><a href="/material-guide">CHIC-Materialleitfaden &mdash; Akazie, Walnuss, Paulownia, Bambus und Kiefer im Vergleich</a></li>
</ul>
<!-- /wp:list -->
"""

DE_FAQ = [
    {'q': 'Ist Akazienholz für direkten Tee-Kontakt sicher?',
     'a': '<p>Ja &mdash; wenn der Innenraum mit lebensmittelechtem Mineralöl, lebensmittelechtem Pflanzenöl ("Butcher Block Oil") oder Bienenwachs behandelt wird. Unabhängige Tests haben gezeigt, dass massive Harthölzer wie Akazie selbst unter heißen, sauren Bedingungen praktisch keine nachweisbaren Chemikalien freisetzen. Das Risiko ist nicht das Holz selbst, sondern Innen-PU-Lack &mdash; bestehen Sie auf lebensmittelechtem Öl und lehnen Sie jede Fabrik ab, die innen Lack verwendet.</p>'},
    {'q': 'Wie viele Fächer sollte meine Teebox haben?',
     'a': '<p>Passen Sie die Anzahl an Ihr Programm an: 4 für Sampler/Corporate-Gift; 6 für den Amazon-Retail-Volumen-Sweetspot; 8 für Premium-Geschenk/Registry; 10 für Hospitality und Kaffeestation; 12 für Teemarken-Retail-Merchandiser. Wichtiger als die Anzahl ist die Fach<em>höhe</em> &mdash; 9 cm für Pyramiden-Beutel, 7 cm für flache Teebeutel. Senden Sie Ihre Beutelmaße vor dem Werkzeugbau.</p>'},
    {'q': 'Wie verhält sich eine Akazien-Teebox im Vergleich zu einer Bambus-Teebox?',
     'a': '<p>Bambus ist etwas günstiger und gleich stabil und liest sich als "öko". Aber Verbund-/laminierter Bambus kann Melamin freisetzen, wenn er sauren Flüssigkeiten ausgesetzt ist &mdash; für Tee-Aufbewahrung ist nur massiver einteiliger Bambus sicher. Akazie vermeidet dieses Risiko vollständig, sieht direkt aus der Fabrik hochwertiger aus und fotografiert besser auf einem Retail-Hero-Shot. Für mittlere bis Premium-Teemarken gewinnt Akazie bei nahezu gleichen Stückkosten beim wahrgenommenen Wert.</p>'},
    {'q': 'Verzieht sich eine Akazien-Teebox bei einem 30-tägigen Seecontainer?',
     'a': '<p>Nicht, wenn sie richtig gebaut ist. Akazien-Panele müssen auf <strong>8–12% Feuchtigkeitsgehalt</strong> kammergetrocknet und vor dem Packen mit lebensmittelechtem Öl versiegelt sein. Über 14% MC ist Verzug bei tropischer Feuchtigkeit praktisch garantiert. Unser Standard-Export-Pack fügt Trockenmittel-Sachets und 5-lagige Wellpappkartons hinzu &mdash; Defektrate nach Seetransport fällt von ~3% (ungeschützt) auf unter 0,5%.</p>'},
    {'q': 'Was sind MOQ, Sample-Lieferzeit und Produktions-Lieferzeit?',
     'a': '<p>Einstiegs-MOQ ist 300–500 Einheiten pro Design. Samples in 7–12 Tagen; Massenproduktion 30–35 Tage nach Sample-Freigabe. Bei 1.000 Einheiten sparen Sie ca. 10% pro Stück; 5.000+ spart näher 25%. Jahresprogramme von 20.000+ Einheiten laufen auf gestaffelten 50–60-Tage-Produktionszyklen, um Lager-Turn-Over zu halten.</p>'},
    {'q': 'Können Sie mein Logo lasergravieren? Gibt es Aufpreis?',
     'a': '<p>Ja &mdash; Akazie ist eines der besten Hölzer am Markt für CO2-Laser-Gravur. Der honigfarbene Kern kontrastiert wunderschön mit der lasergebrannten dunklen Espresso-Linie, sodass Logos, Markennamen und einzelne Fach-Labels bis 5-pt-Schrift sauber lesen. <strong>Laser-Gravur ist in unserem FOB-Angebot enthalten, ohne Aufschlag pro Stück</strong>, und ist die beliebteste Branding-Methode für B2B-Akazien-Teebox-Programme.</p>'},
    {'q': 'Welche Lebensmittelsicherheits-Zertifizierungen kann ich für das Programm erhalten?',
     'a': '<p>Standard-Dokumentation umfasst FDA-Lebensmittelkontakt-Konformität (USA), LFGB und EU 10/2011 (EU-Märkte), Prop 65-Berichte für kalifornische Regalplatzierung und FSC-Lieferkette, wenn der Käufer Waldzertifizierung verlangt. BSCI-Fabrikaudit ist auf Anfrage ebenfalls verfügbar und deckt Arbeitsstandard-Konformität ab.</p>'},
    {'q': 'Was passiert, wenn eine Charge beschädigt ankommt?',
     'a': '<p>Unser Endinspektionsbericht (AQL 2.5) wird Ihnen vor der Container-Freigabe schriftlich übermittelt &mdash; Sie können die Freigabe verweigern, wenn Defekte den AQL-Schwellenwert überschreiten. Nach Versand unter FOB-Bedingungen geht das Risiko auf Sie über, aber wir decken Ersatzeinheiten bei Herstellungsmängeln (Verzug, Scharnierausfall, gerissene Panele) für 12 Monate kostenlos. Kosmetischer Schaden durch Transit-Handling ist eine Spediteur-Reklamation, weshalb die Verpackungs-Spec oben wichtig ist.</p>'},
]


# ══════════════════════════════════════════════════════════════════════════
# SPANISH
# ══════════════════════════════════════════════════════════════════════════

ES_TITLE = 'Cajas de Té de Madera de Acacia: Guía del Comprador 2026 para Marcas, Hoteles y Programas de Regalo'
ES_META_TITLE = 'Caja de Té de Acacia: Guía del Comprador 2026 (Material, MOQ, Coste)'
ES_META_DESC = (
    'Guía del comprador para cajas de té de madera de acacia para marcas '
    'de té, hoteles y programas de regalo — con matriz de decisión en 30 '
    'segundos, datos de seguridad alimentaria, distribuciones de '
    'compartimentos, acabados, MOQ y precios FOB de nuestra fábrica en Xiamen.'
)
ES_EXCERPT = (
    '<p>Una guía de aprovisionamiento orientada al material para 2026, '
    'dirigida a marcas B2B y compradores de marca privada que buscan cajas '
    'de té de madera de acacia — con dureza Janka, comparaciones de '
    'seguridad alimentaria, distribuciones de compartimentos, acabados, '
    'tipos de tapa, MOQ y precios FOB de nuestra fábrica en Xiamen.</p>'
)

ES_CONTENT = f"""<!-- wp:paragraph -->
<p>Está abasteciéndose de cajas de té. Su cliente (o su comprador, o su responsable de retail) quiere que la caja parezca premium, se sienta premium, se transporte sin deformarse y supere una revisión de seguridad alimentaria. Toda guía que lee le dice que use madera de acacia. Esta guía responde la siguiente pregunta: <strong>¿cómo encarga una sin acabar quemándose?</strong></p>
<!-- /wp:paragraph -->

{img(IMG['hero'], 'Primer plano de la veta de madera de acacia mostrando la variación de color de miel a chocolate que la convierte en el material líder para la fabricación de cajas de té premium.')}

<!-- wp:paragraph -->
<p>Este es el libro de jugadas que usamos en nuestra fábrica de Xiamen al cotizar cajas de té de acacia para marcas de té de marca privada, compradores de hostelería y programas de regalos corporativos. Números Janka reales. Defectos reales que seguimos viendo en importaciones baratas. Precios FOB reales para 2026. Y la matriz de decisión en 30 segundos para que pueda autoseleccionar su especificación antes de leer una palabra más.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>La matriz de decisión en 30 segundos</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Encuentre la fila que coincide con su proyecto y lea solo las secciones resaltadas.</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>Si usted es…</th><th>Mejor especificación</th><th>Secciones a leer</th></tr></thead><tbody>
<tr><td>Una marca de té lanzando 4–8 sabores</td><td>6 u 8 compartimentos, tapa abatible con ventana acrílica, logo grabado a láser</td><td>§3, §6, §10, §12</td></tr>
<tr><td>Un comprador de hotel/B&amp;B/café</td><td>10 compartimentos, tapa magnética o corredera, aceite de grado alimentario en el interior</td><td>§4, §6, §7, §10</td></tr>
<tr><td>Responsable de programa de regalos corporativos</td><td>4 o 6 compartimentos, marca con foil caliente o láser dorado, embalaje listo para regalo</td><td>§6, §12, §15</td></tr>
<tr><td>Una marca de suscripción/box-of-the-month</td><td>6 compartimentos, tapa abatible magnética, impresión UV personalizada en la tapa</td><td>§6, §12, §13</td></tr>
<tr><td>Un retailer haciendo refresh de SKU</td><td>SKUs mixtos 4/6/8, tapa corredera, acabado aceitado neutro</td><td>§6, §8, §13</td></tr>
</tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p><strong>¿Quiere una cotización ahora?</strong> Envíe número de compartimentos, tipo de tapa, método de marca y cantidad objetivo a través de nuestro <a href="/contact">formulario de contacto</a> &mdash; respondemos con un FOB indicativo en un día hábil.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Tres compradores, tres escenarios reales</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>La mayor parte de la confusión de compra en esta categoría viene de mezclar qué caso de uso es el suyo. Aquí los tres programas que más cotizamos.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {{"level":3}} -->
<h3>Escenario A &mdash; Fundador de marca de té lanzando una línea de seis sabores</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p><em>&quot;Tengo seis SKUs de té a granel, mi precio de venta es 24 $ por caja, y necesito parecer Harney &amp; Sons en el estante sin pagar su coste por unidad.&quot;</em></p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>Especificación recomendada:</strong> caja de acacia de 6 compartimentos, ~25&times;19&times;9 cm, tapa abatible con ventana acrílica, interior con aceite mineral, logo grabado a láser en la tapa.</li>
<li><strong>Por qué funciona:</strong> la ventana permite al comprador ver las seis selecciones sin abrir; el logo grabado a láser da sensación heritage sin sobrecoste por unidad; la veta de la acacia fotografía mejor que el bambú en un hero shot.</li>
<li><strong>FOB indicativo a 1.000 uds:</strong> 6,50–7,30 $ por unidad.</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {{"level":3}} -->
<h3>Escenario B &mdash; Grupo hotelero reponiendo servicio de turn-down</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p><em>&quot;200 habitaciones, servicio de turn-down nocturno, la caja tiene que aguantar housekeeping dos años y seguir luciendo fresca en una bandeja.&quot;</em></p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>Especificación recomendada:</strong> caja de acacia de 10 compartimentos, tapa corredera (sin hardware que se rompa), interior con cera de abejas y aceite, logo del hotel grabado a láser en la tapa.</li>
<li><strong>Por qué funciona:</strong> la tapa corredera elimina el mayor punto de fallo (bisagras). El acabado con cera de abejas limpia fácilmente tras un derrame de té. 10 compartimentos cubren verde, negro, herbal, descafeinado más estacional.</li>
<li><strong>FOB indicativo a 500 uds:</strong> 8,50–9,20 $ por unidad.</li>
</ul>
<!-- /wp:list -->

{img(IMG['hospitality'], 'Caja de té de madera de acacia en un entorno hotelero u hostelero con tetera y taza de té — caso de uso típico de servicio en habitación.')}

<!-- wp:heading {{"level":3}} -->
<h3>Escenario C &mdash; Responsable de programa de regalos corporativos</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p><em>&quot;Regalo para clientes Q4, 3.000 cajas, tiene que sentirse como un regalo de 60 $ pero costarme menos de 15 $ aterrizado.&quot;</em></p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>Especificación recomendada:</strong> caja de acacia de 4 compartimentos, tapa magnética abatible, logo estampado con foil caliente (oro o oro rosado), funda de regalo marcada, cajas de color individuales en cartones maestros.</li>
<li><strong>Por qué funciona:</strong> las tapas magnéticas entregan el momento &quot;snap premium&quot; del unboxing. El foil caliente se lee como lujo. El footprint de 4 compartimentos mantiene bajo el coste unitario en un programa de alto margen.</li>
<li><strong>FOB indicativo a 3.000 uds:</strong> 7,20–8,00 $ por unidad (incl. funda de regalo, excl. contenido de té).</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>¿Por qué acacia, no bambú o pino?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Tres propiedades hacen que la acacia gane esta categoría.</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>Es densa.</strong> Dureza Janka ~2.300 lbf &mdash; superior al roble rojo (1.290), nogal (1.010) y muy superior al pino (380–870). Traducción: las paredes de los compartimentos no se abollan cuando cae dentro una lata metálica de té, y los bordes de bisagra mantienen su forma tras miles de ciclos de apertura-cierre.</li>
<li><strong>La veta es lo suficientemente apretada como para no absorber aromas de té.</strong> Maderas de poro abierto como el pino recogen el olor de un oolong fuerte en un mes. La acacia no.</li>
<li><strong>El color natural ya es &quot;premium&quot;.</strong> Corazón miel a vetas chocolate &mdash; no requiere teñido para parecer de gama alta en un hero shot de Shopify, lo que mantiene bajo el coste por unidad.</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Para la comparativa completa, vea nuestra guía <a href="/blog/acacia-vs-bamboo-organizer">Acacia vs Bambú organizer</a> y la <a href="/blog/acacia-wood-vs-bamboo-what-weve-learned-after-years-in-our-factory">comparación desde la fábrica</a>. A continuación está la versión específica para uso en cajas de té.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Datos de materiales: acacia vs bambú vs paulownia vs nogal</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Una tabla, todas las especificaciones que su comprador podría preguntar.</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>Propiedad</th><th>Acacia</th><th>Bambú</th><th>Paulownia</th><th>Nogal</th></tr></thead><tbody>
<tr><td>Densidad (kg/m&sup3;)</td><td>700–900</td><td>~700</td><td>~280</td><td>~640</td></tr>
<tr><td>Dureza Janka (lbf)</td><td>~2.300</td><td>~1.380</td><td>~300</td><td>~1.010</td></tr>
<tr><td>Color sin teñido</td><td>Miel–chocolate, veta dramática</td><td>Oro pálido o caramelo carbonizado</td><td>Crema pálido, plano</td><td>Chocolate profundo, veta fina</td></tr>
<tr><td>Absorción de aromas</td><td>Baja</td><td>Baja (solo macizo)</td><td>Media</td><td>Baja</td></tr>
<tr><td>Apto para alimentos de fábrica</td><td>Sí</td><td>Solo macizo de una pieza</td><td>Requiere sellado</td><td>Sí</td></tr>
<tr><td>Riesgo de deformación con humedad</td><td>Bajo</td><td>Bajo</td><td>Bajo</td><td>Medio</td></tr>
<tr><td>Índice típico de coste FOB</td><td>1,0&times;</td><td>0,9&times;</td><td>0,7&times;</td><td>1,6&times;</td></tr>
</tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p><strong>Qué significa esto para usted:</strong> el bambú es más barato pero pierde la sensación de &quot;regalo premium&quot; y trae riesgo de lixiviación de melamina si es del tipo laminado (ver siguiente sección). La paulownia es mucho más barata pero visualmente plana &mdash; necesita teñido para sentirse premium. El nogal supera a la acacia estéticamente pero añade 60% al coste FOB.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>¿Es la acacia segura para contacto directo con el té?</h2>
<!-- /wp:heading -->

{img(IMG['foodsafe'], 'Caja de té de acacia abierta con un frasco de aceite mineral de grado alimentario en el interior — acabado seguro para contacto directo con el té.')}

<!-- wp:paragraph -->
<p>Respuesta corta: <strong>sí, cuando el acabado es correcto</strong>.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>La marca de utensilios de cocina <a href="https://misen.com/blogs/news/which-wood-won-t-leach-maple-acacia-bamboo-put-to-the-test" target="_blank" rel="noopener">Misen</a> realizó pruebas independientes exponiendo acacia, arce y bambú a líquido ácido caliente y midiendo qué se lixiviaba. Las maderas duras macizas como la acacia liberaron <em>prácticamente</em> ningún químico detectable. Aproximadamente 32% de las muestras de bambú liberaron melamina &mdash; no porque el bambú sea malo, sino porque la mayoría del menaje de bambú se hace con tableros compuestos pegados con resinas de melamina-formaldehído.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Para su programa de cajas de té esto da a la acacia tres ventajas regulatorias sobre el bambú compuesto:</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li>Cumplimiento más fácil de <strong>FDA / LFGB / EU 10/2011</strong> de contacto con alimentos.</li>
<li>Menos preguntas en una revisión <strong>Prop 65</strong> para retail en California.</li>
<li>Una historia más limpia para compradores <strong>BSCI, FSC y eco-posicionados</strong>.</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Checklist del comprador sobre seguridad alimentaria:</strong></p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li>El interior debe acabarse con <strong>aceite mineral de grado alimentario</strong>, <strong>aceite vegetal de grado alimentario</strong> (a menudo etiquetado como &quot;butcher block oil&quot;) o <strong>cera de abejas</strong>. Nada más.</li>
<li>Rechace cualquier fábrica que use <strong>laca PU</strong> en el interior &mdash; no es apto para alimentos, parece brillante y atrapa humedad donde crece moho.</li>
<li>Pida el <strong>COA</strong> (certificado de análisis) del aceite usado.</li>
<li>Solicite el <strong>informe de prueba FDA / LFGB</strong> de terceros para su mercado objetivo.</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>¿Cuántos compartimentos necesito realmente?</h2>
<!-- /wp:heading -->

{img(IMG['compartments'], 'Diagrama de una caja de té de madera con compartimentos etiquetados y cajón extraíble debajo — distribuciones típicas de compartimentos múltiples.')}

<!-- wp:paragraph -->
<p>El número de compartimentos es la mayor decisión de SKU después del material. Esto es lo que realmente se vende en cada carril después de varios cientos de SKUs para marcas globales.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>4 compartimentos</strong> &mdash; mercado pequeño hogar/regalo. Footprint ~25&times;15&times;9 cm. Mejor para packs sampler de marcas de té. Coste FOB más bajo. Común en niveles de precio Williams-Sonoma y Crate &amp; Barrel.</li>
<li><strong>6 compartimentos</strong> &mdash; el sweet spot de volumen Amazon. ~25&times;19&times;9 cm. Cabe prácticamente cualquier bolsita piramidal o sobre rectangular. El formato que la mayoría de los consumidores puede organizar a mano por &quot;día de la semana&quot;.</li>
<li><strong>8 compartimentos</strong> &mdash; el nivel regalo/registry. ~30&times;19&times;9 cm. Fotografía magnífica en Instagram. A menudo emparejado con tapa de ventana de vidrio.</li>
<li><strong>10 compartimentos</strong> &mdash; pedidos de hostelería, B&amp;B y estaciones de café. ~38&times;19&times;9 cm. Capacidad para suficiente variedad en una bandeja de amenity de huésped.</li>
<li><strong>12 compartimentos</strong> &mdash; merchandiser de marca de té. ~38&times;25&times;9 cm. Fixture de retail in-store para marcas de té especializadas.</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>El detalle que nadie advierte:</strong> la <em>altura</em> del compartimento importa más que el número de compartimentos. Las bolsitas piramidales necesitan 9 cm; las bolsitas planas, 7 cm. Envíe a la fábrica las dimensiones reales de su bolsita <em>antes</em> de mecanizar la rejilla divisora &mdash; o la tapa no cerrará.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Tapa abatible con ventana vs corredera vs magnética &mdash; ¿cuál elijo?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Tres estilos de tapa dominan. Cada uno tiene diferente coste, durabilidad y atractivo en estantería.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {{"level":3}} -->
<h3>Tapa abatible con ventana acrílica o de vidrio (bestseller)</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>La especificación más cotizada. Acrílico de 3 mm en una ranura mecanizada sobre el marco de acacia, sostenido por dos bisagras de latón. Los compradores ven la selección de té sin levantar la tapa &mdash; la mayor mejora UX que puede hacer.</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>Acrílico</strong> vs <strong>vidrio</strong>: el acrílico sobrevive caídas y ahorra flete. El vidrio luce más rico pero es más pesado y frágil.</li>
<li><strong>Sobrecoste vs tapa corredera:</strong> aproximadamente 1,20 $ por unidad a 1.000 uds (acrílico), 1,80 $ (vidrio).</li>
<li>Recomendado para: cajas de marca retail, programas de regalo.</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {{"level":3}} -->
<h3>Tapa corredera (la estética más limpia, el coste más bajo)</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Sin hardware. Solo ranuras mecanizadas de precisión y una tapa plana de acacia que se desliza dentro y fuera. El exterior más limpio y la tapa más económica que fabricamos.</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>Pro:</strong> sin puntos de fallo. Sobrevive al housekeeping de hotel.</li>
<li><strong>Contra:</strong> sin visibilidad del contenido; puede atascarse si los cambios de humedad hinchan la madera.</li>
<li>Recomendado para: hostelería, lotes de regalo numerados a mano, marcas de estética minimalista.</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {{"level":3}} -->
<h3>Tapa abatible magnética (la sensación más premium)</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Imanes de neodimio mecanizados en la pared trasera y el borde de la tapa producen un &quot;snap&quot; invisible al cerrar. La sensación más premium y la mejor opción para marcas de té de suscripción de gama alta &mdash; la experiencia de unboxing es parte de la marca.</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>Sobrecoste:</strong> +1,20–1,80 $ por unidad.</li>
<li><strong>Especificación obligatoria:</strong> imanes N42 o más fuertes, o la tapa salta al inclinar la caja.</li>
<li>Recomendado para: marcas de suscripción, regalos corporativos, registry retail.</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>¿Qué acabado debo pedir? (Sáltese esto si la fábrica le dice &quot;PU&quot;)</h2>
<!-- /wp:heading -->

{img(IMG['finish'], 'Primer plano de tirador de latón en un cajón de acacia con acabado oscuro — combinación de herraje y acabado en una caja de té premium.')}

<!-- wp:paragraph -->
<p>La acacia es naturalmente resistente al agua pero no impermeable. Un buen acabado realza la veta chocolate, fija la estabilidad ante cambios de humedad y mantiene la caja apta para alimentos durante toda la vida del programa.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Tres acabados que recomendamos</strong> (por orden de alcance al comprador):</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>Aceite mineral de grado alimentario</strong> &mdash; el estándar. Penetra la veta, oscurece ligeramente el color y el cliente puede reaplicarlo en casa para 5+ años de servicio. Coste más bajo, totalmente apto para alimentos, reconocido por FDA.</li>
<li><strong>Mezcla de cera de abejas y aceite mineral</strong> (&quot;butcher block conditioner&quot;) &mdash; brillo satinado más rico, mejor resistencia al agua. Vale la pena el pequeño sobrecoste para programas de regalo.</li>
<li><strong>Laca mate apta para alimentos</strong> &mdash; <strong>solo exterior</strong>, nunca interior. Dos manos de laca mate al agua añaden resistencia a huellas. Combinar con interior aceitado. Lo mejor para cafés y cajas de hostelería que se limpian constantemente.</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Qué rechazar:</strong> laca PU brillante, tintes con base solvente para oscurecer el color barato, y cualquier &quot;aceite de tung&quot; que no esté certificado apto para alimentos. Los dos primeros no son seguros para contacto con té; el tercero es a menudo un sustituto de aceite de tung que contiene secantes de metales pesados.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Los cuatro defectos que seguimos viendo en cajas de té de acacia baratas</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Estos son los problemas que aparecen con más frecuencia cuando auditamos una muestra de la competencia para una marca nueva &mdash; normalmente justo antes de que cambien de proveedor.</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>Bloques de recortes encolados en lugar de paneles macizos.</strong> Las cajas baratas usan pequeños retales de acacia encolados al canto en un panel, a menudo ocultos bajo un tinte. Las líneas de cola se agrietan a lo largo de los divisores en seis meses. <strong>Pida una muestra cortada</strong> &mdash; no debe ver más de dos líneas de cola por pared lateral.</li>
<li><strong>Ventanas acrílicas rayadas en tránsito.</strong> El film protector debe permanecer en el acrílico durante toda la línea de producción y solo retirarlo el cliente final. Pida a la fábrica un vídeo de la estación de aplicación del film.</li>
<li><strong>Tornillos de bisagra en testas.</strong> Los tornillos en testas se salen con la apertura repetida de la tapa. Las bisagras deben atornillarse en grano longitudinal, con agujeros piloto pretaladrados a especificación. <strong>Abra la tapa de la muestra 100 veces</strong> antes de aprobar.</li>
<li><strong>Compartimentos demasiado pequeños para su bolsita.</strong> Hemos visto bolsitas rectangulares tamaño Bigelow quedar aplastadas porque la fábrica construyó compartimentos para cuadrados tamaño Lipton. <strong>Envíe la especificación de la bolsita antes del mecanizado.</strong></li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>¿Puedo poner mi logo? (Láser, impresión UV, foil caliente)</h2>
<!-- /wp:heading -->

{img(IMG['logo'], 'Caja de té de acacia con el texto &quot;Custom Logo Available&quot; — servicio OEM ODM, embalaje personalizado, tamaño personalizado — opciones de marca.')}

<!-- wp:paragraph -->
<p>La acacia es un lienzo generoso. Las vetas oscuras del duramen y la albura más clara aceptan láser y tinta maravillosamente &mdash; normalmente a su favor.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>Grabado láser</strong> &mdash; nuestro estándar recomendado. El láser CO2 quema la superficie a un marrón espresso, contrastando con el corazón miel. Mantiene tipografía fina hasta 5 pt. <strong>Sin sobrecoste por unidad.</strong> Mejor para logos, nombres de marca, etiquetas de variedades en los divisores y numeración de edición limitada.</li>
<li><strong>Impresión UV</strong> &mdash; impresión fotográfica a todo color directamente sobre la madera. Genial para artwork botánico. +0,40–0,90 $ por unidad a escala. Luce ligeramente más plano que el láser porque la impresión queda encima de la veta en lugar de quemarse dentro.</li>
<li><strong>Estampado con foil caliente</strong> &mdash; foil oro o oro rosado para regalo de gama alta. Sensación premium. El foil puede astillarse si la caja recibe golpes en tránsito, así que use foil <em>solo en la tapa</em>.</li>
<li><strong>Serigrafía</strong> &mdash; menos común en acacia; úsela solo para logos de bloque sólido (p.ej. un medallón circular).</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Tip pro:</strong> pida a la fábrica una muestra grabada a láser sobre un panel de acacia de prueba antes de cerrar el arte. Las vetas oscuras de la madera afectan a la limpieza del quemado láser &mdash; un logo que se ve perfecto en un PDF Pantone puede necesitar más grosor sobre madera real.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>MOQ, plazos de entrega y precios FOB en 2026</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Estos son los números que cotizamos actualmente, indexados a una <strong>caja de acacia de 6 compartimentos, tapa abatible con ventana acrílica, interior con aceite mineral, logo grabado a láser</strong> estándar. Otras configuraciones se mueven arriba o abajo desde esta base (incrementos bajo la tabla).</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>Volumen</th><th>FOB Xiamen indicativo (USD)</th><th>Tiempo de muestra</th><th>Tiempo de producción</th></tr></thead><tbody>
<tr><td>300–500 uds (MOQ de entrada)</td><td>7,50–8,50 $ / ud</td><td>7–12 días</td><td>30–35 días</td></tr>
<tr><td>1.000–2.000 uds</td><td>6,50–7,30 $ / ud</td><td>7–12 días</td><td>30–35 días</td></tr>
<tr><td>5.000 uds +</td><td>5,80–6,40 $ / ud</td><td>10–14 días</td><td>40–45 días</td></tr>
<tr><td>20.000 uds + (programa anual)</td><td>5,20–5,80 $ / ud</td><td>10–14 días</td><td>50–60 días, escalonado</td></tr>
</tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p><strong>Sobrecostes a planificar:</strong></p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li>+0,50–1,20 $ / ud &mdash; acabado premium (cera de abejas o laca mate)</li>
<li>+0,40–0,90 $ / ud &mdash; impresión UV</li>
<li>+1,50 $ / ud &mdash; ventana de vidrio sobre acrílico (a 1.000 uds)</li>
<li>+12% global &mdash; SKUs con tapa magnética</li>
<li>+0,08–0,12 $ / ud &mdash; cartones maestros listos para retail con códigos de barras</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Conclusión:</strong> incluso en el extremo alto, la acacia sigue siendo la caja de té de madera dura de aspecto premium más barata del mercado &mdash; las otras o parecen más baratas (paulownia, bambú) o cuestan notablemente más (nogal, roble).</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>¿Cómo protege la caja durante el envío marítimo?</h2>
<!-- /wp:heading -->

{img(IMG['packaging'], 'Cartones maestros de exportación apilados en un almacén con una caja de té envuelta en material protector — embalaje para transporte marítimo a Norteamérica y Europa.')}

<!-- wp:paragraph -->
<p>Uno de los factores más ignorados en esta categoría es lo que le pasa a la caja <em>después</em> de salir de la planta. Un contenedor de 30 días con cambios de humedad entre 50% HR (puerto de origen) y 95% HR (cruce ecuatorial tropical) deformará cualquier caja de té que no se haya empacado correctamente.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Nuestra especificación estándar de embalaje de exportación para cajas de té de acacia:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>Pack interior:</strong> cada caja en una bolsa de polietileno con sobre desecante (gel de sílice, 5g). Bolsa sellada, no solo plegada.</li>
<li><strong>Color box (opcional):</strong> caja de regalo impresa con la marca alrededor de la polybag.</li>
<li><strong>Cartón maestro:</strong> corrugado de 5 capas, divisores internos, máx. 24 uds por cartón. Marcar con país de origen y código HS.</li>
<li><strong>Palet:</strong> palet de madera tratada al calor (ISPM 15), máx. 4 capas de alto, fleje y film estirable.</li>
<li><strong>Prueba de caída:</strong> aprobación AQL 2.5. Caída de 80 cm sobre hormigón, cuatro esquinas. Sin daño interior.</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Lo que esto le ahorra:</strong> la tasa típica de defectos tras un contenedor marítimo de 30 días cae de ~3% (sin protección) a menos del 0,5% con esta especificación. En un envío de 5.000 uds son 125 unidades reclamables menos.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>El checklist de aprovisionamiento antes de firmar la PI</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>El checklist que enviamos a cada nuevo comprador antes de firmar una Proforma. Sáltese cualquier paso bajo su responsabilidad.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li>Envíe las <strong>dimensiones exactas de la bolsita</strong> (L &times; A &times; A) para la bolsa que debe alojar la caja &mdash; <em>antes del mecanizado</em>.</li>
<li>Pida una <strong>muestra cortada del panel</strong> &mdash; confirma acacia maciza, no recortes encolados.</li>
<li>Solicite el <strong>COA del aceite interior</strong> y el <strong>informe de prueba FDA / LFGB / EU 10/2011</strong> si vende en esos mercados.</li>
<li>Especifique tipo y material de bisagra (latón o zamak cromado) y confirme pretaladrado en las fijaciones de bisagra.</li>
<li>Abra la tapa de muestra <strong>100 veces</strong> e incline la caja cerrada 10 veces boca abajo. La tapa no debe abrirse; ningún compartimento debe sonar.</li>
<li>Confirme <strong>contenido de humedad de los paneles de acacia entre 8–12%</strong> en la muestra cortada. Por encima de 14% verá deformación tras un contenedor de 30 días.</li>
<li>Apruebe la <strong>prueba de caída del cartón maestro</strong>: 80 cm sobre hormigón, cuatro esquinas. Sin daño interior.</li>
<li>Obtenga el <strong>informe de inspección final (AQL 2.5)</strong> del partner de QC por escrito <strong>antes de liberar el contenedor</strong>.</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Nada de esto es específico de CHIC. Es el mismo checklist que le protege ante <em>cualquier</em> fábrica de cajas de madera, incluida la nuestra.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>¿Cómo seguir desde aquí?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Si está sopesando la acacia frente a otro material, la respuesta corta es: elija acacia salvo que su objetivo de precio unitario esté por debajo de 5 $ FOB o su comprador haya pedido específicamente nogal. La historia de seguridad alimentaria, la visual y la economía de flete juegan a su favor.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Para una cotización contra su especificación, envíe lo siguiente a través de nuestro <a href="/contact">formulario de contacto</a>:</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li>Número de compartimentos + dimensiones de la bolsita</li>
<li>Tipo de tapa (abatible con ventana / corredera / magnética)</li>
<li>Acabado (aceite / cera de abejas / laca mate)</li>
<li>Método de marca (láser / impresión UV / foil caliente)</li>
<li>Cantidad objetivo y mes de entrega</li>
<li>Puerto de destino (FOB Xiamen por defecto)</li>
</ul>
<!-- /wp:list -->
<!-- wp:paragraph -->
<p>Respondemos con un FOB indicativo y un tiempo de muestra en un día hábil.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Guías relacionadas</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<li><a href="/blog/wooden-tea-box-manufacturer">Guía de fabricación de cajas de té de madera para distribuidores y marcas de regalo</a> &mdash; el complemento del lado del aprovisionamiento.</li>
<li><a href="/blog/multi-compartment-wooden-tea-boxes-bulk-orders">Cajas de té de madera multicompartimento: qué deben verificar los compradores antes de pedidos al por mayor</a> &mdash; QC y checklist de pedido a granel.</li>
<li><a href="/blog/wooden-tea-bag-organizer-guide">Cómo elegir el organizador de bolsitas de té de madera adecuado para estaciones de café</a> &mdash; enfoque hostelería y café.</li>
<li><a href="/blog/acacia-vs-bamboo-organizer">Acacia vs Bambú organizer: por qué las marcas líderes de hogar 2026 están pivotando hacia la acacia</a> &mdash; la comparación de materiales más amplia.</li>
<li><a href="/products/wooden-tea-box">Vea nuestra gama de cajas de té de madera</a></li>
<li><a href="/material-guide">Guía de materiales CHIC &mdash; acacia, nogal, paulownia, bambú y pino comparados</a></li>
</ul>
<!-- /wp:list -->
"""

ES_FAQ = [
    {'q': '¿Es segura la madera de acacia para contacto directo con el té?',
     'a': '<p>Sí &mdash; cuando el interior está acabado con aceite mineral de grado alimentario, aceite vegetal de grado alimentario ("butcher block oil") o cera de abejas. Pruebas independientes han demostrado que las maderas duras macizas como la acacia liberan prácticamente cero químicos detectables incluso bajo condiciones calientes y ácidas. El riesgo no es la madera; es la laca PU interior, así que exija aceite apto para alimentos y rechace cualquier fábrica que use laca en el interior.</p>'},
    {'q': '¿Cuántos compartimentos debería tener mi caja de té?',
     'a': '<p>Adapte el número a su programa: 4 para sampler/regalo corporativo; 6 para el sweet spot de volumen retail Amazon; 8 para regalo premium/registry; 10 para hostelería y estación de café; 12 para merchandiser retail de marca de té. Más importante que el número es la <em>altura</em> del compartimento &mdash; 9 cm para bolsitas piramidales, 7 cm para bolsitas planas. Envíe las dimensiones de su bolsita antes del mecanizado.</p>'},
    {'q': '¿Cómo se compara una caja de té de acacia con una de bambú?',
     'a': '<p>El bambú es algo más barato e igualmente estable y se lee como "eco". Pero el bambú compuesto/laminado puede lixiviar melamina cuando se expone a líquidos ácidos &mdash; para almacenamiento de té solo es seguro el bambú macizo de una pieza. La acacia evita ese riesgo por completo, luce más premium directamente de fábrica y fotografía mejor en un hero shot retail. Para marcas de té de gama media a premium, la acacia gana en valor percibido por coste unitario casi igual.</p>'},
    {'q': '¿Se deformará una caja de té de acacia en un contenedor marítimo de 30 días?',
     'a': '<p>No si está bien construida. Los paneles de acacia deben secarse en cámara hasta <strong>8–12% de contenido de humedad</strong> y sellarse con aceite apto para alimentos antes del empaque. Por encima del 14% MC la deformación está prácticamente garantizada en humedad tropical. Nuestro pack de exportación estándar añade sobres desecantes y cartones maestros corrugados de 5 capas &mdash; la tasa de defectos tras envío marítimo cae de ~3% (sin protección) a menos de 0,5%.</p>'},
    {'q': '¿Cuál es el MOQ, el tiempo de muestra y el tiempo de producción?',
     'a': '<p>MOQ de entrada 300–500 unidades por diseño. Muestras en 7–12 días; producción masiva 30–35 días tras aprobación de muestra. A 1.000 unidades ahorra aproximadamente 10% por unidad; 5.000+ ahorra cerca del 25%. Programas anuales de 20.000+ unidades corren en ciclos de producción escalonados de 50–60 días para mantener el inventario rotando.</p>'},
    {'q': '¿Pueden grabar mi logo con láser? ¿Hay coste extra?',
     'a': '<p>Sí &mdash; la acacia es una de las mejores maderas del mercado para grabado láser CO2. El corazón miel contrasta maravillosamente con la línea oscura espresso del láser, así que logos, nombres de marca y etiquetas individuales se leen nítidos hasta tipografía 5 pt. <strong>El grabado láser está incluido en nuestra cotización FOB sin recargo por unidad</strong> y es el método de marca más popular para programas B2B de cajas de té de acacia.</p>'},
    {'q': '¿Qué certificaciones de seguridad alimentaria puedo obtener para el programa?',
     'a': '<p>La documentación estándar incluye conformidad de contacto con alimentos FDA (EE. UU.), LFGB y EU 10/2011 (mercados UE), informes Prop 65 para colocación en estantería de California y cadena de custodia FSC si el comprador requiere certificación forestal. La auditoría de fábrica BSCI también está disponible a petición y cubre conformidad de estándares laborales.</p>'},
    {'q': '¿Qué pasa si un lote llega dañado?',
     'a': '<p>Nuestro informe de inspección final (AQL 2.5) se comparte con usted por escrito antes de liberar el contenedor &mdash; puede rechazar la liberación si los defectos exceden el umbral AQL. Una vez enviado bajo términos FOB el riesgo se transfiere a usted, pero cubrimos unidades de reemplazo contra defectos de fabricación (deformación, fallo de bisagra, paneles agrietados) sin coste durante 12 meses. El daño cosmético por manipulación en tránsito es una reclamación al transitario, por eso la especificación de embalaje de arriba importa.</p>'},
]


# ──────────────────────────────────────────────────────────────────────────
# Merge all 3 (de, es) into the JSON files now, FR and JA will be added in
# a second-half script to keep this file under the writer's manageable size.
# ──────────────────────────────────────────────────────────────────────────

ENTRIES = {
    'de': {'title': DE_TITLE, 'excerpt': DE_EXCERPT, 'content': DE_CONTENT,
           'meta_title': DE_META_TITLE, 'meta_desc': DE_META_DESC, 'faq': DE_FAQ},
    'es': {'title': ES_TITLE, 'excerpt': ES_EXCERPT, 'content': ES_CONTENT,
           'meta_title': ES_META_TITLE, 'meta_desc': ES_META_DESC, 'faq': ES_FAQ},
}

for lang, entry in ENTRIES.items():
    path = os.path.join(ROOT, f'messages/blogs.{lang}.json')
    data = json.load(open(path, encoding='utf-8'))
    data[SLUG] = entry
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f'{lang}: merged {SLUG} → messages/blogs.{lang}.json (now {len(data)} slugs)')
