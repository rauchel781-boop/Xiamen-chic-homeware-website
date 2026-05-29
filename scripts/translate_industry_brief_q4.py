# Hand-translate the Q4 wooden gift box industry brief into de/es/fr/ja
# and merge into messages/blogs.<lang>.json.

import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SLUG = 'q4-wooden-gift-box-inquiry-timeline-2026'

HERO_IMG = '/wp-images/2026/02/wooden-gift-box-1.jpg'
LOGO_IMG = '/wp-images/2026/02/wooden-drawer-gift-box.jpg'

def make_content(t):
    """Build full content from a translation dict t. Image blocks shared."""
    img1 = (f'<!-- wp:image {{"sizeSlug":"large","linkDestination":"none"}} -->\n'
            f'<figure class="wp-block-image size-large">'
            f'<img src="{HERO_IMG}" alt="{t["alt_hero"]}" /></figure>\n'
            f'<!-- /wp:image -->')
    img2 = (f'<!-- wp:image {{"sizeSlug":"large","linkDestination":"none"}} -->\n'
            f'<figure class="wp-block-image size-large">'
            f'<img src="{LOGO_IMG}" alt="{t["alt_drawer"]}" /></figure>\n'
            f'<!-- /wp:image -->')
    return f"""<!-- wp:paragraph -->
<p>{t['lead']}</p>
<!-- /wp:paragraph -->

{img1}

<!-- wp:heading -->
<h2>{t['h_data']}</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>{t['p_data_intro']}</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>{t['col_period']}</th><th>{t['col_inquiries']}</th><th>{t['col_buyer_type']}</th><th>{t['col_avg_qty']}</th></tr></thead><tbody>
<tr><td>{t['row1_period']}</td><td>9</td><td>{t['row1_buyer']}</td><td>{t['qty']} 2,400</td></tr>
<tr><td>{t['row2_period']}</td><td>14</td><td>{t['row2_buyer']}</td><td>{t['qty']} 3,800</td></tr>
<tr><td>{t['row3_period']}</td><td>22</td><td>{t['row3_buyer']}</td><td>{t['qty']} 5,100</td></tr>
<tr><td>{t['row4_period']}</td><td>31</td><td>{t['row4_buyer']}</td><td>{t['qty']} 4,600</td></tr>
</tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p>{t['p_data_summary']}</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>{t['h_calendar']}</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>{t['p_calendar_intro']}</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li>{t['cal_dec1']}</li>
<li>{t['cal_nov10']}</li>
<li>{t['cal_oct5']}</li>
<li>{t['cal_sep5']}</li>
<li>{t['cal_aug1']}</li>
<li>{t['cal_jul15']}</li>
<li>{t['cal_jun30']}</li>
<li>{t['cal_jun15']}</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>{t['p_calendar_summary']}</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>{t['h_wildcards']}</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>{t['p_wildcards_intro']}</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li>{t['wc_redsea']}</li>
<li>{t['wc_eudr']}</li>
<li>{t['wc_tariff']}</li>
</ul>
<!-- /wp:list -->

{img2}

<!-- wp:heading -->
<h2>{t['h_volume']}</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>{t['p_volume']}</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li>{t['vol_now']}</li>
<li>{t['vol_2w']}</li>
<li>{t['vol_4w']}</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>{t['h_action']}</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<li>{t['act1']}</li>
<li>{t['act2']}</li>
<li>{t['act3']}</li>
<li>{t['act4']}</li>
<li>{t['act5']}</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>{t['h_cta']}</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>{t['p_cta']}</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><em>{t['p_about_series']}</em></p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>{t['h_related']}</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<li><a href="/custom-wooden-gift-box-manufacturer">{t['rel1']}</a></li>
<li><a href="/blog/acacia-wood-tea-box-material-guide">{t['rel2']}</a></li>
<li><a href="/blog/wooden-tea-box-manufacturer">{t['rel3']}</a></li>
<li><a href="/products/wooden-gift-box">{t['rel4']}</a></li>
</ul>
<!-- /wp:list -->
"""

# ─── German ───────────────────────────────────────────────────────────────
DE = {
    'title': 'Wann Q4-Anfragen für Holz-Geschenkboxen wirklich starten: Unsere Mai-2026-Fabrikdaten',
    'meta_title': 'Q4 Holz-Geschenkbox Timeline 2026: Fabrik-Anfragedaten',
    'meta_desc': 'Echte CHIC-Fabrik-Anfragedaten für Q4-/Weihnachts-Holz-Geschenkboxen — wann Käufer schreiben, der Produktionskalender und die drei Wildcards 2026 (Rotes Meer, EUDR, Zölle), die Ihr Fenster verengen.',
    'excerpt': '<p>Q4-Anfragen für Holz-Geschenkboxen haben sich in vier Wochen auf unserem Angebotsschalter verdreifacht. Hier sind die Mai-2026-Daten, der Produktionskalender rückwärts vom 1. Dezember und die drei 2026er Wildcards (Rotes Meer, EUDR, Zölle), die Ihr Beschaffungsfenster verengen.</p>',
    'alt_hero': 'Holzgeschenkboxen aus Paulownia mit individuellen Logo-Branding-Optionen — Lasergravur, UV-Druck, Heißprägung.',
    'alt_drawer': 'Holzgeschenkbox mit Schubladenstil und magnetischem Verschluss — typische Q4-Corporate-Gift-SKU diese Woche.',
    'lead': 'Wenn Sie Q4-Holz-Geschenkboxen beschaffen und es ist bereits nach Mai, sind Sie nicht zu spät &mdash; aber jede Woche kostet Sie Optionalität. Hier ist, was unsere Halle diesen Monat sieht, und wie der Kalender rückwärts von einem 1. Dezember Regaldatum aussieht.',
    'h_data': 'Was unsere Mai-2026-Anfragedaten zeigen',
    'p_data_intro': 'Vom 1. bis 27. Mai haben wir folgende Q4-markierte Anfragen für Holz-Geschenkboxen erfasst (Q4-markiert = Käufer erwähnt explizit Weihnachten, Feiertag, Q4-Launch oder November-/Dezember-Lieferung). Richtungsweisende Daten unseres eigenen Angebotsschalters, keine Branchendurchschnitte.',
    'col_period': 'Zeitraum',
    'col_inquiries': 'Q4-markierte Anfragen',
    'col_buyer_type': 'Primärer Käufertyp',
    'col_avg_qty': 'Durchschnittliche Zielmenge',
    'row1_period': '1.–7. Mai',
    'row2_period': '8.–14. Mai',
    'row3_period': '15.–21. Mai',
    'row4_period': '22.–27. Mai',
    'row1_buyer': 'Abo / DTC-Marken',
    'row2_buyer': 'Mittelständische Einzelhändler + Corporate-Gift',
    'row3_buyer': 'Corporate-Gift-Programme (größte Kohorte)',
    'row4_buyer': 'Mischung: Hospitality + Amazon FBA + Corporate',
    'qty': '',
    'p_data_summary': 'Das Volumen verdreifachte sich in vier Wochen. Auch der Mix verschob sich: frühe Anfragen waren kleine Abo-/DTC-Marken mit Low-MOQ-Retail-SKUs, späte Anfragen wurden von Corporate-Gift-Programmmanagern dominiert, die 3.000–8.000 Stk. Kundengeschenke jagen. Hospitality-Käufer (Hotel-Turn-down-Kits) kamen in Woche vier &mdash; genau auf dem erwarteten Kalender.',
    'h_calendar': 'Der Q4-Produktionskalender &mdash; rückwärts vom 1. Dezember',
    'p_calendar_intro': 'Für einen B2B-Käufer, der die Boxen Anfang Dezember im Regal oder Lager braucht, sieht die Rückwärtsrechnung so aus. Zahlen für eine 3.000–5.000-Stk.-Order mit kundenspezifischem Branding.',
    'cal_dec1': '<strong>1. Dezember</strong> &mdash; Ziel-Regaldatum/Lagereingang.',
    'cal_nov10': '<strong>10. November</strong> &mdash; Container muss US-/EU-Zoll passieren. 2–3 Wochen Hafen-zu-DC-Trucking und Last Mile einrechnen.',
    'cal_oct5': '<strong>5. Oktober</strong> &mdash; Container verlässt Hafen Xiamen (~30 Tage Transit West Coast, 35 Tage East Coast / Rotterdam).',
    'cal_sep5': '<strong>5. September</strong> &mdash; Massenproduktion abgeschlossen; 5 Tage für finale QC-Inspektion + Kartonbeschriftung.',
    'cal_aug1': '<strong>1. August</strong> &mdash; Massenproduktion beginnt (30–35 Tage für 3.000–5.000 Stk. mit kundenspezifischem Branding).',
    'cal_jul15': '<strong>15. Juli</strong> &mdash; Sample genehmigt + PI unterzeichnet + Anzahlung erhalten. Materialien bestellt.',
    'cal_jun30': '<strong>30. Juni</strong> &mdash; Sample-Lieferzeit beginnt (7–12 Tage nach Spec-Lock).',
    'cal_jun15': '<strong>15. Juni</strong> &mdash; Spec muss gesperrt sein (Fächer, Deckelstil, Branding-Artwork, Finish).',
    'p_calendar_summary': '<strong>Anders ausgedrückt:</strong> Wenn Sie nicht bis Mitte Juni ein Spec-Sheet an eine Fabrik gesendet haben, können Sie Q4 noch treffen &mdash; aber Sie verlieren Optionen (kleinere MOQ, einfacheres Branding, Luftfracht zum 4-fachen Stückpreis).',
    'h_wildcards': 'Die drei 2026er Wildcards, die Ihr Fenster verengen',
    'p_wildcards_intro': 'Drei externe Faktoren machen diesen Q4-Kalender enger als 2024 oder 2025. Käufer, die diese in frühen 2026-Angeboten ignoriert haben, kommen jetzt zurück und fordern beschleunigte Samples an.',
    'wc_redsea': '<strong>Rotes-Meer-Routing.</strong> Container-Transit Xiamen → Rotterdam liegt derzeit bei 38–42 Tagen statt der historischen 30–32, weil das Suez-Routing weiterhin zugunsten des Kap der Guten Hoffnung vermieden wird. Eine Woche zur In-Transit-Rechnung für EU-Käufer hinzufügen.',
    'wc_eudr': '<strong>EU-EUDR-Durchsetzung.</strong> Die EU-Entwaldungsverordnung trat am 30. Dezember 2025 in Kraft und wird jetzt an den EU-Einreisehäfen tatsächlich durchgesetzt. Holzprodukte ohne ordentliche FSC-Lieferketten-Dokumentation werden zurückgehalten. 5–7 Tage am Hafen für Papierprüfung bei ersten Sendungen hinzufügen.',
    'wc_tariff': '<strong>US-Zollunsicherheit.</strong> Der Section-301-Plan für Holz-Geschenkboxen (HTS 4420) hat sich 2026 bereits zweimal verschoben. Mehrere Käufer ziehen Q3-Sendungen vor, um vor weiteren Änderungen in Zolllager zu verschiffen. Das verbraucht Fabrik-Kapazität früher als üblich.',
    'h_volume': 'Was "Q4-bereit" tatsächlich in Volumen bedeutet',
    'p_volume': 'Etwa 70% unserer Q4-Holz-Geschenkbox-Buchungen 2026 liegen bei 1.000–5.000 Stk. pro SKU. Die Großvolumen-Käufer (10.000+) haben im März/April gebucht und sind bereits in Produktion. Wenn Sie im 1.000–5.000-Stk.-Tier sind, haben Sie noch ein volles Fenster &mdash; aber Fabrik-Kapazität wird ab Ende Juni progressiv enger.',
    'vol_now': '<strong>Jetzt anfragen, wenn:</strong> Jahresprogramm &gt; 5.000 Stk., Multi-SKU-Launch, retail-fertige Verpackung erforderlich.',
    'vol_2w': '<strong>Innerhalb 2 Wochen anfragen, wenn:</strong> 1.000–5.000 Stk. einmalig, einzelne SKU, Standard-Branding.',
    'vol_4w': '<strong>Sie können noch 4 Wochen warten, wenn:</strong> 300–1.000 Stk. Corporate-Gift, einfacher Schiebedeckel, nur Laser-Logo.',
    'h_action': 'Action-Checkliste für die nächsten 7 Tage',
    'act1': 'Sperren Sie Ihr Ziel-Regaldatum (von dort rückwärts rechnen, nicht vorwärts von heute).',
    'act2': 'Entscheiden Sie sich für den Deckelstil (Klappdeckel mit Fenster / Schiebedeckel / Magnet) vor dem Sampling &mdash; spätere Änderung kostet 10 Tage.',
    'act3': 'Senden Sie die Gift-Insert-Maße (tatsächliche Flasche, Tee-Sachet, Schokolade, Kerze, Uhr) an die Fabrik, damit Fächer richtig dimensioniert werden.',
    'act4': 'Bei Versand in die EU, fordern Sie die <strong>FSC-Lieferketten-Dokumentation</strong> Ihrer Fabrik im Voraus an. Ohne sie kann EUDR-Durchsetzung Ihren Container 5–7 Tage am Hafen verzögern.',
    'act5': 'Holen Sie ein Angebot von mindestens zwei Fabriken ein &mdash; nicht weil wir an Ihrem Bestandslieferanten zweifeln, sondern weil Kapazität gerade die Preisbildung treibt und ein Zweitangebot alle ehrlich hält.',
    'h_cta': 'Holen Sie ein Q4-Holz-Geschenkbox-Angebot von CHIC',
    'p_cta': 'Wir bieten diese Woche Q4-Akazien-/Paulownia-/Kiefer-Holz-Geschenkboxen mit Sample-Lieferzeit von 7–10 Tagen an. Senden Sie Fächeranzahl, Deckelstil, Branding-Methode und Zielmenge über unser <a href="/contact">Kontaktformular</a> &mdash; wir antworten innerhalb eines Werktags mit einem indikativen FOB Xiamen und einer Sample-Timeline.',
    'p_about_series': 'Industry Brief ist ein wöchentlicher Beitrag aus unserer Xiamen-Fabrikhalle. Jeder Brief kombiniert ein externes Marktsignal mit den Daten, die wir tatsächlich am Angebotsschalter sehen &mdash; nützlich für Beschaffung, Sourcing und Category Manager, die eine Fabrik-Sicht auf den Holzhomeware-Markt brauchen.',
    'h_related': 'Verwandte Leitfäden',
    'rel1': 'Hersteller maßgeschneiderter Holzgeschenkboxen &mdash; vollständige Landingpage',
    'rel2': 'Käuferleitfaden für Akazienholz-Teeboxen 2026',
    'rel3': 'Herstellungsleitfaden für Holzteeboxen',
    'rel4': 'Unsere Holzgeschenkbox-Produktpalette durchsuchen',
}

DE_FAQ = [
    {'q': 'Wann ist der absolut letzte Zeitpunkt für eine Q4-Holzgeschenkbox-Bestellung?',
     'a': '<p>Für ein 1.-Dezember-Regaldatum mit Seefracht ist der absolut späteste Spec-Lock Mitte Juli. Danach passen Massenproduktion + Seetransit + Zollabwicklung schlicht nicht mehr. Wenn Sie Mitte Juli verpassen, ist Luftfracht noch möglich, aber Ihr Stückpreis steigt um etwa das 4-Fache.</p>'},
    {'q': 'Warum bietet meine Fabrik längere Lieferzeiten als letztes Jahr an?',
     'a': '<p>Drei Gründe gleichzeitig: (1) Rotes-Meer-Routing hat 6–10 Tage zum Xiamen-Rotterdam-Transit hinzugefügt. (2) EUDR-Durchsetzung fügt 5–7 Tage am EU-Hafen für FSC-Dokumentenprüfungen hinzu. (3) US-Zollunsicherheit hat Q3-Sendungen in Zolllager vorgezogen und verbraucht Fabrik-Kapazität früher als 2025.</p>'},
    {'q': 'Welches MOQ kann ich so spät im Q4-Zyklus noch bekommen?',
     'a': '<p>300–500 Stk. sind für einfache Corporate-Gift-Programme noch buchbar (Schiebedeckel, Laser-Logo, einzelne SKU). 1.000–5.000 Stk. müssen innerhalb 2 Wochen angefragt werden. Multi-SKU-Launches über 5.000 Stk. müssen bis Mitte Juni im Sampling sein.</p>'},
    {'q': 'Braucht mein Käufer FSC-zertifiziertes Holz für den EU-Markt 2026?',
     'a': '<p>Ja &mdash; EU-Entwaldungsverordnung (EUDR) wurde am 30. Dezember 2025 vollziehbar. Holzprodukte, die EU-Märkte erreichen, benötigen eine Sorgfaltspflicht-Erklärung und FSC-Lieferketten-Dokumentation. Wir stellen diese Papiere standardmäßig bei allen EU-Sendungen bereit.</p>'},
    {'q': 'Wie genau sind "richtungsweisende Anfragedaten" aus Ihrer Fabrik?',
     'a': '<p>Es ist ein Datenpunkt einer Fabrik &mdash; keine branchenweite Forschung. Wir teilen ihn, weil es die Daten sind, die <em>wir</em> nutzen, um unsere eigene Produktionskapazität zu planen, und Category-Buyer sagen uns, dass es die Art Signal ist, die sie nicht leicht aus Fachpublikationen bekommen. Wir veröffentlichen monatlich aktualisierte Zahlen bis Q4.</p>'},
]


# ─── Spanish ──────────────────────────────────────────────────────────────
ES = {
    'title': 'Cuándo Empiezan Realmente las Consultas Q4 de Cajas de Regalo de Madera: Nuestros Datos de Fábrica Mayo 2026',
    'meta_title': 'Timeline Cajas Regalo Madera Q4 2026: Datos de Fábrica',
    'meta_desc': 'Datos reales de consultas de la fábrica CHIC para programas Q4/Navidad de cajas de regalo de madera — cuándo escriben los compradores, el calendario de producción y los tres comodines 2026 (Mar Rojo, EUDR, aranceles) que comprimen su ventana.',
    'excerpt': '<p>Las consultas Q4 de cajas de regalo de madera se triplicaron en cuatro semanas en nuestra mesa de cotización. Aquí están los datos de mayo 2026, el calendario de producción trabajando hacia atrás desde el 1 de diciembre y los tres comodines 2026 (Mar Rojo, EUDR, aranceles) que comprimen su ventana de aprovisionamiento.</p>',
    'alt_hero': 'Cajas de regalo de madera de paulownia con opciones de marca personalizada — grabado láser, impresión UV, estampado en caliente.',
    'alt_drawer': 'Caja de regalo de madera estilo cajón con cierre magnético — SKU típica de regalo corporativo Q4 de esta semana.',
    'lead': 'Si está abasteciéndose de cajas de regalo de madera Q4 y ya pasó mayo, no llega tarde &mdash; pero cada semana le cuesta opcionalidad. Aquí está lo que nuestra planta está viendo este mes y cómo se ve el calendario trabajando hacia atrás desde una fecha de estante 1 de diciembre.',
    'h_data': 'Lo que muestran nuestros datos de consultas mayo 2026',
    'p_data_intro': 'Del 1 al 27 de mayo registramos las siguientes consultas etiquetadas Q4 para cajas de regalo de madera (etiquetadas Q4 = el comprador menciona explícitamente Navidad, fiestas, lanzamiento Q4 o entrega noviembre/diciembre). Datos direccionales de nuestra propia mesa de cotización, no promedios de la industria.',
    'col_period': 'Periodo',
    'col_inquiries': 'Consultas etiquetadas Q4',
    'col_buyer_type': 'Tipo de comprador principal',
    'col_avg_qty': 'Cantidad objetivo media',
    'row1_period': '1–7 mayo',
    'row2_period': '8–14 mayo',
    'row3_period': '15–21 mayo',
    'row4_period': '22–27 mayo',
    'row1_buyer': 'Marcas suscripción / DTC',
    'row2_buyer': 'Retailers medianos + regalo corporativo',
    'row3_buyer': 'Programas de regalo corporativo (mayor cohorte)',
    'row4_buyer': 'Mixto: hostelería + Amazon FBA + corporativo',
    'qty': '',
    'p_data_summary': 'El volumen se triplicó en cuatro semanas. El mix también cambió: consultas tempranas eran pequeñas marcas suscripción/DTC con SKUs de retail bajo MOQ, las tardías fueron dominadas por gestores de programas de regalo corporativo buscando regalos de cliente de 3.000–8.000 piezas. Compradores de hostelería (kits de turn-down de hotel) llegaron en la semana cuatro &mdash; justo en el calendario esperado.',
    'h_calendar': 'El calendario de producción Q4 &mdash; trabajar hacia atrás desde 1 de diciembre',
    'p_calendar_intro': 'Para un comprador B2B que necesita las cajas en estante o almacén a principios de diciembre, las matemáticas hacia atrás se ven así. Números para un pedido de 3.000–5.000 piezas con marca personalizada.',
    'cal_dec1': '<strong>1 Dic</strong> &mdash; fecha objetivo en estante / en almacén.',
    'cal_nov10': '<strong>10 Nov</strong> &mdash; el contenedor debe pasar aduanas US/UE. Sumar 2–3 semanas de camión puerto-a-DC y última milla.',
    'cal_oct5': '<strong>5 Oct</strong> &mdash; el contenedor sale del puerto de Xiamen (~30 días tránsito Costa Oeste, 35 días Costa Este / Rotterdam).',
    'cal_sep5': '<strong>5 Sep</strong> &mdash; producción masiva completa; 5 días para inspección QC final + etiquetado de cartones.',
    'cal_aug1': '<strong>1 Ago</strong> &mdash; producción masiva empieza (30–35 días para 3.000–5.000 piezas con marca personalizada).',
    'cal_jul15': '<strong>15 Jul</strong> &mdash; muestra aprobada + PI firmada + anticipo recibido. Materiales pedidos.',
    'cal_jun30': '<strong>30 Jun</strong> &mdash; empieza el plazo de muestra (7–12 días tras cerrar spec).',
    'cal_jun15': '<strong>15 Jun</strong> &mdash; spec debe estar cerrada (compartimentos, tipo de tapa, arte de marca, acabado).',
    'p_calendar_summary': '<strong>En otras palabras:</strong> si no tiene una hoja de spec enviada a una fábrica para mediados de junio, aún puede pillar Q4 &mdash; pero pierde opciones (MOQ menor, marca más simple, envío por avión a 4× el coste unitario).',
    'h_wildcards': 'Los tres comodines 2026 que comprimen su ventana',
    'p_wildcards_intro': 'Tres factores externos están apretando este calendario Q4 más que 2024 o 2025. Compradores que los ignoraron en cotizaciones tempranas de 2026 vuelven ahora pidiendo muestras urgentes.',
    'wc_redsea': '<strong>Ruta del Mar Rojo.</strong> El tránsito de contenedores Xiamen → Rotterdam promedia 38–42 días ahora vs. los históricos 30–32, porque la ruta del Suez sigue evitándose a favor del Cabo de Buena Esperanza. Sume una semana al cálculo en tránsito para compradores UE.',
    'wc_eudr': '<strong>Aplicación EU EUDR.</strong> El Reglamento Europeo de Deforestación entró en aplicación el 30 de diciembre de 2025 y ahora se está aplicando en puertos UE. Productos de madera sin documentación FSC de cadena de custodia adecuada están siendo retenidos. Sume 5–7 días en puerto por verificación de papeles en primeros envíos.',
    'wc_tariff': '<strong>Incertidumbre arancelaria US.</strong> La Sección 301 para cajas de regalo de madera (HTS 4420) ha cambiado dos veces en 2026. Varios compradores están adelantando envíos Q3 a almacenes bonded antes de más cambios. Esto está consumiendo capacidad de fábrica más temprano que de costumbre.',
    'h_volume': 'Qué significa realmente "listo para Q4" en volumen',
    'p_volume': 'Aproximadamente el 70% de nuestras reservas Q4 de cajas de regalo de madera para 2026 están en 1.000–5.000 piezas por SKU. Los compradores de alto volumen (10.000+) reservaron en marzo/abril y ya están en producción. Si está en el tramo 1.000–5.000 piezas, aún tiene ventana completa &mdash; pero la capacidad de fábrica se apretará progresivamente desde finales de junio.',
    'vol_now': '<strong>Cotice ya si:</strong> programa anual &gt; 5.000 piezas, lanzamiento multi-SKU, embalaje retail-ready requerido.',
    'vol_2w': '<strong>Cotice en 2 semanas si:</strong> 1.000–5.000 piezas único, SKU única, marca estándar.',
    'vol_4w': '<strong>Puede esperar 4 semanas si:</strong> 300–1.000 piezas regalo corporativo, tapa corredera simple, solo logo láser.',
    'h_action': 'Checklist de acción para los próximos 7 días',
    'act1': 'Fije su fecha objetivo en estante (trabajando hacia atrás desde ahí, no hacia adelante desde hoy).',
    'act2': 'Decida el estilo de tapa (abatible con ventana / corredera / magnética) antes de muestrear &mdash; cambiarlo después le cuesta 10 días.',
    'act3': 'Envíe las dimensiones del inserto de regalo (botella real, sachet de té, chocolate, vela, reloj) a la fábrica para que los compartimentos se dimensionen correctamente.',
    'act4': 'Si envía a UE, solicite la <strong>documentación FSC de cadena de custodia</strong> de su fábrica desde el inicio. Sin ella, la aplicación EUDR puede retrasar su contenedor 5–7 días en puerto.',
    'act5': 'Obtenga cotización de al menos dos fábricas &mdash; no porque dudemos de su proveedor habitual, sino porque la capacidad está moviendo precios ahora y una segunda cotización mantiene a todos honestos.',
    'h_cta': 'Obtenga una cotización Q4 de cajas de regalo de madera de CHIC',
    'p_cta': 'Cotizamos esta semana cajas de regalo Q4 en acacia/paulownia/pino con plazo de muestra 7–10 días. Envíe número de compartimentos, tipo de tapa, método de marca y cantidad objetivo a través de nuestro <a href="/contact">formulario de contacto</a> &mdash; respondemos con un FOB Xiamen indicativo y plazo de muestra en un día hábil.',
    'p_about_series': 'Industry Brief es un post semanal desde nuestra planta de fábrica en Xiamen. Cada brief combina una señal externa del mercado con datos que realmente vemos en la mesa de cotización &mdash; útil para compras, sourcing y category managers que necesitan visión del mercado de homeware de madera desde la fábrica.',
    'h_related': 'Guías relacionadas',
    'rel1': 'Fabricante de cajas de regalo de madera personalizadas &mdash; página completa',
    'rel2': 'Guía del comprador de cajas de té de acacia 2026',
    'rel3': 'Guía de fabricación de cajas de té de madera',
    'rel4': 'Ver nuestra gama de cajas de regalo de madera',
}

ES_FAQ = [
    {'q': '¿Cuál es la fecha absolutamente última para colocar un pedido Q4 de cajas de regalo de madera?',
     'a': '<p>Para una fecha de estante 1 de diciembre con flete marítimo, el cierre de spec absolutamente más tardío es mediados de julio. Después de eso, producción masiva + tránsito marítimo + despacho aduanero simplemente no caben. Si pierde mediados de julio, el flete aéreo aún es posible pero sube su coste unitario aproximadamente 4×.</p>'},
    {'q': '¿Por qué mi fábrica está cotizando plazos más largos que el año pasado?',
     'a': '<p>Tres razones a la vez: (1) la ruta del Mar Rojo añadió 6–10 días al tránsito Xiamen-Rotterdam. (2) la aplicación EUDR añade 5–7 días en puerto UE por verificación FSC. (3) la incertidumbre arancelaria US adelantó envíos Q3 a almacenes bonded, consumiendo capacidad de fábrica más temprano que 2025.</p>'},
    {'q': '¿Qué MOQ puedo conseguir tan tarde en el ciclo Q4?',
     'a': '<p>300–500 piezas siguen reservables para programas simples de regalo corporativo (tapa corredera, logo láser, SKU única). 1.000–5.000 piezas hay que cotizarlas en 2 semanas. Lanzamientos multi-SKU sobre 5.000 piezas necesitan estar en muestreo para mediados de junio.</p>'},
    {'q': '¿Necesita mi comprador madera FSC certificada para el mercado UE en 2026?',
     'a': '<p>Sí &mdash; el Reglamento Europeo de Deforestación (EUDR) se hizo exigible el 30 de diciembre de 2025. Productos de madera que entren en mercados UE requieren una Declaración de Diligencia Debida y documentación FSC de cadena de custodia. Proporcionamos esta documentación estándar con todos los envíos a UE.</p>'},
    {'q': '¿Qué precisión tienen los "datos direccionales de consultas" de su fábrica?',
     'a': '<p>Es un punto de datos de una fábrica &mdash; no investigación a nivel industria. Lo compartimos porque son los datos que <em>nosotros</em> usamos para planificar nuestra propia capacidad de producción, y los category buyers nos dicen que es el tipo de señal que no consiguen fácilmente de publicaciones del sector. Publicaremos cifras actualizadas mensualmente hasta Q4.</p>'},
]


# ─── French ───────────────────────────────────────────────────────────────
FR = {
    'title': 'Quand les Demandes Q4 de Boîtes Cadeaux en Bois Démarrent Vraiment : Nos Données Usine Mai 2026',
    'meta_title': 'Timeline Boîtes Cadeaux Bois Q4 2026 : Données Usine',
    'meta_desc': 'Données réelles de demandes de l\'usine CHIC pour les programmes Q4/Noël de boîtes cadeaux en bois — quand les acheteurs écrivent, le calendrier de production et les trois jokers 2026 (Mer Rouge, EUDR, droits de douane) qui compriment votre fenêtre.',
    'excerpt': '<p>Les demandes Q4 de boîtes cadeaux en bois ont triplé en quatre semaines sur notre bureau de devis. Voici les données de mai 2026, le calendrier de production à rebours du 1er décembre et les trois jokers 2026 (Mer Rouge, EUDR, droits de douane) qui compriment votre fenêtre d\'approvisionnement.</p>',
    'alt_hero': 'Boîtes cadeaux en bois de paulownia avec options de marquage personnalisé — gravure laser, impression UV, dorure à chaud.',
    'alt_drawer': 'Boîte cadeau en bois style tiroir avec fermeture magnétique — SKU cadeau corporate Q4 typique cette semaine.',
    'lead': 'Si vous sourcez des boîtes cadeaux en bois Q4 et que mai est déjà passé, vous n\'êtes pas en retard &mdash; mais chaque semaine vous coûte de l\'optionalité. Voici ce que notre atelier voit ce mois-ci, et à quoi ressemble le calendrier à rebours depuis une date de rayon 1er décembre.',
    'h_data': 'Ce que montrent nos données de demandes mai 2026',
    'p_data_intro': 'Du 1er au 27 mai, nous avons enregistré les demandes Q4-marquées suivantes pour boîtes cadeaux en bois (Q4-marquée = l\'acheteur mentionne explicitement Noël, fêtes, lancement Q4, ou livraison novembre/décembre). Données directionnelles de notre propre bureau de devis, pas des moyennes sectorielles.',
    'col_period': 'Période',
    'col_inquiries': 'Demandes Q4-marquées',
    'col_buyer_type': 'Type d\'acheteur principal',
    'col_avg_qty': 'Quantité cible moyenne',
    'row1_period': '1–7 mai',
    'row2_period': '8–14 mai',
    'row3_period': '15–21 mai',
    'row4_period': '22–27 mai',
    'row1_buyer': 'Marques abonnement / DTC',
    'row2_buyer': 'Retailers de taille moyenne + cadeau corporate',
    'row3_buyer': 'Programmes cadeaux corporate (plus grande cohorte)',
    'row4_buyer': 'Mixte : hôtellerie + Amazon FBA + corporate',
    'qty': '',
    'p_data_summary': 'Le volume a triplé en quatre semaines. Le mix a aussi évolué : demandes tôt dans le mois venaient de petites marques abonnement/DTC avec des SKUs retail à MOQ faible, fin de mois était dominée par les responsables programmes cadeaux corporate cherchant des cadeaux client de 3 000–8 000 pcs. Les acheteurs hôtellerie (kits turn-down) sont arrivés en semaine quatre &mdash; pile sur le calendrier attendu.',
    'h_calendar': 'Le calendrier de production Q4 &mdash; à rebours du 1er décembre',
    'p_calendar_intro': 'Pour un acheteur B2B ayant besoin des boîtes en rayon ou en entrepôt début décembre, les maths à rebours ressemblent à ça. Chiffres pour une commande 3 000–5 000 pcs avec marquage personnalisé.',
    'cal_dec1': '<strong>1er déc</strong> &mdash; date cible en rayon / en entrepôt.',
    'cal_nov10': '<strong>10 nov</strong> &mdash; le conteneur doit passer la douane US/UE. Prévoir 2–3 semaines de camion port-à-DC et dernier kilomètre.',
    'cal_oct5': '<strong>5 oct</strong> &mdash; le conteneur quitte le port de Xiamen (~30 jours transit Côte Ouest, 35 jours Côte Est / Rotterdam).',
    'cal_sep5': '<strong>5 sep</strong> &mdash; production de masse achevée ; 5 jours pour inspection QC finale + marquage cartons.',
    'cal_aug1': '<strong>1er août</strong> &mdash; production de masse commence (30–35 jours pour 3 000–5 000 pcs avec marquage personnalisé).',
    'cal_jul15': '<strong>15 juil</strong> &mdash; échantillon approuvé + PI signée + acompte reçu. Matériaux commandés.',
    'cal_jun30': '<strong>30 juin</strong> &mdash; délai d\'échantillonnage commence (7–12 jours après verrouillage spec).',
    'cal_jun15': '<strong>15 juin</strong> &mdash; spec doit être verrouillée (compartiments, style de couvercle, artwork marquage, finition).',
    'p_calendar_summary': '<strong>Autrement dit :</strong> si vous n\'avez pas envoyé une fiche spec à une usine d\'ici mi-juin, vous pouvez encore atteindre Q4 &mdash; mais vous perdez des options (MOQ plus petit, marquage plus simple, fret aérien à 4× le coût unitaire).',
    'h_wildcards': 'Les trois jokers 2026 qui compriment votre fenêtre',
    'p_wildcards_intro': 'Trois facteurs externes resserrent ce calendrier Q4 par rapport à 2024 ou 2025. Les acheteurs qui les ont ignorés sur les premiers devis 2026 reviennent maintenant demander des échantillons accélérés.',
    'wc_redsea': '<strong>Routage Mer Rouge.</strong> Le transit conteneur Xiamen → Rotterdam est en moyenne à 38–42 jours actuellement contre les 30–32 historiques, parce que le routage Suez reste évité au profit du Cap de Bonne-Espérance. Ajoutez une semaine à votre maths en transit pour les acheteurs UE.',
    'wc_eudr': '<strong>Application EUDR UE.</strong> Le Règlement européen sur la déforestation est applicable depuis le 30 décembre 2025 et est maintenant réellement appliqué aux ports d\'entrée UE. Les produits en bois sans documentation FSC chaîne de contrôle adéquate sont retenus. Ajoutez 5–7 jours au port pour vérification documentaire sur les premières expéditions.',
    'wc_tariff': '<strong>Incertitude tarifaire US.</strong> Le calendrier Section 301 pour les boîtes cadeaux en bois (HTS 4420) a déjà bougé deux fois en 2026. Plusieurs acheteurs avancent les expéditions Q3 vers entrepôts sous douane avant nouveaux changements. Cela consomme la capacité usine plus tôt que d\'habitude.',
    'h_volume': 'Ce que "prêt pour Q4" signifie réellement en volume',
    'p_volume': 'Environ 70 % de nos réservations Q4 de boîtes cadeaux en bois pour 2026 sont à 1 000–5 000 pcs par SKU. Les acheteurs gros volume (10 000+) ont réservé en mars/avril et sont déjà en production. Si vous êtes au palier 1 000–5 000 pcs, vous avez encore une fenêtre complète &mdash; mais la capacité usine se resserrera progressivement à partir de fin juin.',
    'vol_now': '<strong>Demandez devis maintenant si :</strong> programme annuel &gt; 5 000 pcs, lancement multi-SKU, emballage retail-ready requis.',
    'vol_2w': '<strong>Demandez sous 2 semaines si :</strong> 1 000–5 000 pcs ponctuel, SKU unique, marquage standard.',
    'vol_4w': '<strong>Vous pouvez attendre 4 semaines si :</strong> 300–1 000 pcs cadeau corporate, couvercle coulissant simple, logo laser seul.',
    'h_action': 'Checklist action pour les 7 prochains jours',
    'act1': 'Verrouillez votre date cible en rayon (à rebours depuis là, pas en avant depuis aujourd\'hui).',
    'act2': 'Décidez du style de couvercle (charnière à fenêtre / coulissant / magnétique) avant l\'échantillonnage &mdash; le changer après vous coûte 10 jours.',
    'act3': 'Envoyez les dimensions de l\'insert cadeau (bouteille réelle, sachet de thé, chocolat, bougie, montre) à l\'usine pour que les compartiments soient bien dimensionnés.',
    'act4': 'Si expédition UE, demandez la <strong>documentation FSC chaîne de contrôle</strong> de votre usine en amont. Sans elle, l\'application EUDR peut retarder votre conteneur 5–7 jours au port.',
    'act5': 'Obtenez un devis d\'au moins deux usines &mdash; non parce que nous doutons de votre fournisseur, mais parce que la capacité pilote les prix maintenant et un second devis garde tout le monde honnête.',
    'h_cta': 'Obtenez un devis Q4 boîtes cadeaux bois de CHIC',
    'p_cta': 'Nous chiffrons cette semaine des boîtes cadeaux Q4 en acacia/paulownia/pin avec délai d\'échantillon de 7–10 jours. Envoyez nombre de compartiments, style de couvercle, méthode de marquage et quantité cible via notre <a href="/contact">formulaire de contact</a> &mdash; nous répondons sous un jour ouvré avec un FOB Xiamen indicatif et un délai d\'échantillon.',
    'p_about_series': 'Industry Brief est un post hebdomadaire depuis notre atelier d\'usine de Xiamen. Chaque brief combine un signal externe du marché avec les données que nous voyons réellement au bureau des devis &mdash; utile pour acheteurs, sourcing et category managers qui ont besoin d\'une vue côté usine du marché du homeware en bois.',
    'h_related': 'Guides connexes',
    'rel1': 'Fabricant de boîtes cadeaux en bois sur mesure &mdash; landing page complète',
    'rel2': 'Guide d\'achat boîte à thé en bois d\'acacia 2026',
    'rel3': 'Guide de fabrication de boîtes à thé en bois',
    'rel4': 'Parcourir notre gamme de boîtes cadeaux en bois',
}

FR_FAQ = [
    {'q': 'Quelle est la date absolument la plus tardive pour passer une commande Q4 de boîtes cadeaux en bois ?',
     'a': '<p>Pour une date rayon 1er décembre en fret maritime, le verrouillage de spec absolument plus tardif est mi-juillet. Après, production de masse + transit maritime + dédouanement ne tiennent simplement pas. Si vous ratez mi-juillet, le fret aérien reste possible mais multiplie votre coût unitaire par environ 4.</p>'},
    {'q': 'Pourquoi mon usine cite-t-elle des délais plus longs que l\'an dernier ?',
     'a': '<p>Trois raisons en même temps : (1) le routage Mer Rouge a ajouté 6–10 jours au transit Xiamen-Rotterdam. (2) l\'application EUDR ajoute 5–7 jours au port UE pour vérifications FSC. (3) l\'incertitude tarifaire US a avancé les expéditions Q3 vers entrepôts sous douane, consommant la capacité usine plus tôt que 2025.</p>'},
    {'q': 'Quel MOQ puis-je obtenir si tard dans le cycle Q4 ?',
     'a': '<p>300–500 pcs restent réservables pour des programmes simples cadeau corporate (couvercle coulissant, logo laser, SKU unique). 1 000–5 000 pcs doivent être chiffrés sous 2 semaines. Les lancements multi-SKU au-dessus de 5 000 pcs doivent être en échantillonnage d\'ici mi-juin.</p>'},
    {'q': 'Mon acheteur a-t-il besoin de bois FSC certifié pour le marché UE en 2026 ?',
     'a': '<p>Oui &mdash; le Règlement européen sur la déforestation (EUDR) est devenu exécutoire le 30 décembre 2025. Les produits en bois entrant sur les marchés UE nécessitent une Déclaration de Diligence Raisonnable et une documentation FSC chaîne de contrôle. Nous fournissons ces documents par défaut sur toutes les expéditions UE.</p>'},
    {'q': 'À quel point les "données directionnelles de demandes" de votre usine sont-elles précises ?',
     'a': '<p>C\'est un point de données d\'une usine &mdash; pas une recherche sectorielle. Nous le partageons parce que ce sont les données que <em>nous</em> utilisons pour planifier notre propre capacité de production, et les category buyers nous disent que c\'est le type de signal qu\'ils ne peuvent pas facilement obtenir des publications professionnelles. Nous publierons des chiffres actualisés mensuellement jusqu\'à Q4.</p>'},
]


# ─── Japanese ─────────────────────────────────────────────────────────────
JA = {
    'title': 'Q4木製ギフトボックスの問い合わせは実際いつ始まる？当社2026年5月の工場データ',
    'meta_title': 'Q4木製ギフトボックスタイムライン2026：工場データ',
    'meta_desc': 'Q4/クリスマス向け木製ギフトボックスプログラムに関するCHIC工場の実問い合わせデータ — バイヤーが連絡してくるタイミング、生産カレンダー、調達ウィンドウを圧縮する3つの2026年ワイルドカード（紅海、EUDR、関税）。',
    'excerpt': '<p>Q4向け木製ギフトボックスの問い合わせ件数が4週間で3倍に。2026年5月のデータ、12月1日から逆算した生産カレンダー、調達ウィンドウを圧縮する3つの2026年ワイルドカード（紅海、EUDR、関税）を公開。</p>',
    'alt_hero': '桐材製木製ギフトボックスとカスタムロゴブランディングオプション — レーザー刻印、UV印刷、ホットスタンプ。',
    'alt_drawer': 'マグネット式引き出しタイプの木製ギフトボックス — 今週見積中の典型的Q4コーポレートギフトSKU。',
    'lead': 'Q4向け木製ギフトボックスを調達中で、すでに5月を過ぎている方 — 遅れているわけではありませんが、毎週オプションが減っていきます。今月当工場フロアで起きていること、そして12月1日の店頭日から逆算したカレンダーをお見せします。',
    'h_data': '2026年5月の問い合わせデータが示すもの',
    'p_data_intro': '5月1日〜27日に記録したQ4フラグ付き木製ギフトボックス問い合わせ（Q4フラグ＝バイヤーがクリスマス、ホリデー、Q4ローンチ、11月/12月納期を明示）。業界平均ではなく、当社見積デスクからの方向性データ。',
    'col_period': '期間',
    'col_inquiries': 'Q4フラグ付き問い合わせ',
    'col_buyer_type': '主要バイヤータイプ',
    'col_avg_qty': '平均目標数量',
    'row1_period': '5月1〜7日',
    'row2_period': '5月8〜14日',
    'row3_period': '5月15〜21日',
    'row4_period': '5月22〜27日',
    'row1_buyer': 'サブスクリプション/DTCブランド',
    'row2_buyer': '中規模リテーラー＋コーポレートギフト',
    'row3_buyer': 'コーポレートギフトプログラム（最大コホート）',
    'row4_buyer': '混合：ホスピタリティ＋Amazon FBA＋コーポレート',
    'qty': '',
    'p_data_summary': '4週間で件数が3倍に。構成も変化：月初はサブスクリプション/DTC系の低MOQリテールSKU中心、月末はコーポレートギフト責任者による3,000〜8,000個の顧客ギフト案件が支配的に。ホスピタリティバイヤー（ホテルのターンダウンキット）は予想通り第4週に到着。',
    'h_calendar': 'Q4生産カレンダー — 12月1日から逆算',
    'p_calendar_intro': '12月初頭までに店頭/倉庫到着が必要なB2Bバイヤー向けの逆算は以下の通り。3,000〜5,000個でカスタムブランディングの想定。',
    'cal_dec1': '<strong>12月1日</strong> — 目標の店頭/倉庫到着日。',
    'cal_nov10': '<strong>11月10日</strong> — コンテナが米/EU税関を通過。港から物流センターへのトラック輸送＋ラストマイル2〜3週間を見込む。',
    'cal_oct5': '<strong>10月5日</strong> — コンテナが廈門港を出港（西海岸まで約30日、東海岸/ロッテルダムまで35日）。',
    'cal_sep5': '<strong>9月5日</strong> — 量産完了。最終QC検査＋カートン表示に5日。',
    'cal_aug1': '<strong>8月1日</strong> — 量産開始（カスタムブランディング付き3,000〜5,000個で30〜35日）。',
    'cal_jul15': '<strong>7月15日</strong> — サンプル承認＋PI署名＋デポジット受領。資材発注。',
    'cal_jun30': '<strong>6月30日</strong> — サンプルリードタイム開始（仕様確定後7〜12日）。',
    'cal_jun15': '<strong>6月15日</strong> — 仕様確定（仕切り、蓋スタイル、ブランディングアートワーク、仕上げ）。',
    'p_calendar_summary': '<strong>言い換えると：</strong>6月中旬までに仕様書を工場へ送らなければ、Q4には間に合いますが — オプションを失います（MOQ縮小、ブランディング簡素化、エアフレイト4倍の単価）。',
    'h_wildcards': '2026年の3つのワイルドカード — ウィンドウを圧縮する要因',
    'p_wildcards_intro': '3つの外部要因が2024年や2025年よりこのQ4カレンダーをタイトにしています。2026年初頭の見積でこれらを無視したバイヤーが、今になって緊急サンプルを依頼してきています。',
    'wc_redsea': '<strong>紅海ルート。</strong>廈門→ロッテルダムのコンテナトランジットは現在38〜42日（過去30〜32日）— スエズ経由を避け喜望峰経由が続いているため。EUバイヤーは輸送中計算に1週間追加してください。',
    'wc_eudr': '<strong>EU EUDR施行。</strong>EU森林破壊防止規則が2025年12月30日に施行され、現在EU入港時に実際に執行されています。FSCチェーンオブカストディ書類が不備な木材製品は留置されます。初回出荷では書類確認のため港で5〜7日追加。',
    'wc_tariff': '<strong>米国関税の不確実性。</strong>木製ギフトボックス（HTS 4420）のSection 301スケジュールは2026年だけですでに2回変更。複数のバイヤーが追加変更前にQ3便を保税倉庫へ前倒し中。これにより工場キャパが例年より早く消費されています。',
    'h_volume': '「Q4対応可能」の数量レベル',
    'p_volume': '当社の2026年Q4木製ギフトボックス予約の約70％はSKUあたり1,000〜5,000個。大口バイヤー（10,000個以上）は3月/4月に予約済みで、すでに生産中。1,000〜5,000個レンジなら、まだフルウィンドウあり — ただし工場キャパは6月末から段階的にタイトに。',
    'vol_now': '<strong>すぐに見積依頼すべき条件：</strong>年間プログラム＞5,000個、マルチSKUローンチ、リテール対応梱包必須。',
    'vol_2w': '<strong>2週間以内に見積依頼すべき条件：</strong>1,000〜5,000個の単発、単一SKU、標準ブランディング。',
    'vol_4w': '<strong>あと4週間待てる条件：</strong>300〜1,000個コーポレートギフト、シンプルなスライド蓋、レーザーロゴのみ。',
    'h_action': '今後7日間のアクションチェックリスト',
    'act1': '目標店頭日を確定（今日から先送りではなく、店頭日から逆算）。',
    'act2': 'サンプル前に蓋スタイル（窓付きヒンジ／スライド／マグネット）を決定 — 後から変えると10日ロス。',
    'act3': 'ギフトインサート寸法（実際のボトル、ティーサシェ、チョコ、キャンドル、時計）を工場に送信し、仕切りを正しくサイジング。',
    'act4': 'EU向け出荷の場合、工場の<strong>FSCチェーンオブカストディ書類</strong>を事前に要求。これがないとEUDR執行で港で5〜7日遅延の可能性。',
    'act5': '少なくとも2工場から見積を取得 — 既存サプライヤーを疑うのではなく、現在キャパが価格を動かしており、相見積で全員を誠実に保つため。',
    'h_cta': 'CHICからQ4木製ギフトボックス見積を取得',
    'p_cta': '今週、サンプルリードタイム7〜10日でアカシア/桐/パイン木製ギフトボックスのQ4見積に対応中。仕切り数、蓋スタイル、ブランディング方法、目標数量を<a href="/contact">お問い合わせフォーム</a>から送信 — 1営業日以内に指標FOB廈門とサンプルタイムラインで返信します。',
    'p_about_series': 'Industry Briefは廈門工場フロアからの週次投稿です。各ブリーフは市場外部シグナル1つと当社見積デスクの実データを組み合わせ — 木製ホームウェア市場の工場側ビューが必要な調達、ソーシング、カテゴリーマネージャーに有益。',
    'h_related': '関連ガイド',
    'rel1': 'カスタム木製ギフトボックスメーカー — 完全ランディングページ',
    'rel2': 'アカシア材ティーボックス購入ガイド2026',
    'rel3': '木製ティーボックス製造ガイド',
    'rel4': '当社の木製ギフトボックス製品ラインを見る',
}

JA_FAQ = [
    {'q': 'Q4木製ギフトボックスの発注、絶対最終期限はいつですか？',
     'a': '<p>12月1日店頭日・海上輸送の場合、仕様確定の絶対最終期限は7月中旬。これを過ぎると量産＋海上輸送＋通関がそもそも収まりません。7月中旬を逃すと航空便はまだ可能ですが単価が約4倍に。</p>'},
    {'q': 'なぜ私の工場は昨年より長いリードタイムを出してきますか？',
     'a': '<p>3つの理由が同時発生：（1）紅海ルートで廈門〜ロッテルダム輸送に6〜10日追加。（2）EUDR施行でEU港のFSC書類確認に5〜7日追加。（3）米国関税不確実性によりQ3便が保税倉庫へ前倒しされ、工場キャパが2025年より早く消費。</p>'},
    {'q': 'Q4サイクル後期でもどのMOQが取れますか？',
     'a': '<p>シンプルなコーポレートギフトプログラム（スライド蓋、レーザーロゴ、単一SKU）なら300〜500個はまだ予約可能。1,000〜5,000個は2週間以内に見積必要。マルチSKUの5,000個超ローンチは6月中旬までにサンプリング段階に入る必要あり。</p>'},
    {'q': '2026年のEU市場ではFSC認証木材が必要ですか？',
     'a': '<p>はい — EU森林破壊防止規則（EUDR）が2025年12月30日から執行可能になりました。EU市場に入る木材製品はDue Diligence Statementと FSCチェーンオブカストディ書類が必要。当社は全EU向け出荷で標準提供しています。</p>'},
    {'q': '工場の「方向性問い合わせデータ」はどの程度正確ですか？',
     'a': '<p>これは1工場の1データポイントであり、業界全体の調査ではありません。これは当社が<em>自社</em>生産キャパ計画に使っているデータで、業界誌から簡単に取得できないシグナルだとカテゴリーバイヤーから言われるため共有しています。Q4までは月次で更新数字を公開予定です。</p>'},
]


# ─── Merge all 4 into messages/blogs.<lang>.json ──────────────────────────
ENTRIES = {
    'de': (DE, DE_FAQ),
    'es': (ES, ES_FAQ),
    'fr': (FR, FR_FAQ),
    'ja': (JA, JA_FAQ),
}

for lang, (t, faq) in ENTRIES.items():
    path = os.path.join(ROOT, f'messages/blogs.{lang}.json')
    data = json.load(open(path, encoding='utf-8'))
    data[SLUG] = {
        'title': t['title'],
        'excerpt': t['excerpt'],
        'content': make_content(t),
        'meta_title': t['meta_title'],
        'meta_desc': t['meta_desc'],
        'faq': faq,
    }
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f'{lang}: merged → messages/blogs.{lang}.json ({len(data)} slugs)')
