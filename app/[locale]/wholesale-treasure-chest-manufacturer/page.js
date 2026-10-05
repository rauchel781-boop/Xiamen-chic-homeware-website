// /wholesale-treasure-chest-manufacturer
//
// Commercial landing page for "wholesale treasure chest" / "treasure chest
// wholesale". Deliberately split from the blog guide at
// /blog/wholesale-treasure-chest-sourcing-guide: the guide answers "how do I
// judge a chest supplier", this page answers "what can CHIC build, what does
// it cost, how do I order it". Same facts, different intent, so the two do
// not compete for the same query.
//
// Every figure on this page comes from the sourcing guide's own spec tables
// (size bands, species bending behaviour, hardware, finish stack) — nothing
// is invented here. Moisture content is quoted as 15% max, which is the
// published factory figure.
//
// Site-wide policy caps external links at 10; this page uses 7, all primary
// standards bodies, all target="_blank" rel="noopener noreferrer".
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';
import PageFAQ from '@/components/PageFAQ';
import PrintButton from '@/components/PrintButton';
import TableOfContents from '@/components/TableOfContents';
import ProcessVideos from '@/components/ProcessVideos';
import ProofStrip from '@/components/ProofStrip';
import { SITE } from '@/data/site-config';
import { hreflangFor, canonicalFor } from '@/i18n/routing';
import { buildServiceLd } from '@/lib/service-schema';
import { PRICING_BY_CATEGORY } from '@/lib/product-pricing';

const SLUG = 'wholesale-treasure-chest-manufacturer';
const REVIEWED = '2026-10-05';

const HERO_IMAGE = '/wp-images/2026/03/Treasure-Chest-Box-1.png';
const LID_IMAGE  = '/wp-images/2026/03/Treasure-Chest-Box-3.png';
const HW_IMAGE   = '/wp-images/2026/03/Storage-Box-with-Latch-1.png';

// Six chest formats — our own photography, each linked to a live SKU and to
// the category whose pricing band it is quoted from.
const FAMILIES = [
  {
    image: '/wp-images/2026/03/Treasure-Chest-Box-1.png',
    href: '/products/vintage-wooden-treasure-chest-box-wholesale',
    cat: '/products/gift-boxes-retail-packaging',
    priceKey: 'gift-boxes-retail-packaging',
  },
  {
    image: '/wp-images/2026/01/Keepsake-Chest-box-3.png',
    href: '/products/unfinished-wooden-keepsake-box',
    cat: '/products/wooden-keepsake-boxes',
    priceKey: 'wooden-keepsake-boxes',
  },
  {
    image: '/homeware-0914/rustic-hinged-wooden-keepsake-box/rustic-hinged-wooden-keepsake-box-1.jpg',
    href: '/products/rustic-hinged-wooden-keepsake-box',
    cat: '/products/wooden-keepsake-boxes',
    priceKey: 'wooden-keepsake-boxes',
  },
  {
    image: '/wp-images/2026/04/carved-wooden-boxes-3.png',
    href: '/products/carved-wooden-boxes-wholesale',
    cat: '/products/wooden-gift-box',
    priceKey: 'wooden-gift-box',
  },
  {
    image: '/wp-images/2026/01/acacia-wood-stash-box-2.png',
    href: '/products/acacia-wood-stash-box',
    cat: '/products/wooden-stash-box',
    priceKey: 'wooden-stash-box',
  },
  {
    image: '/homeware-0915/plain-paulownia-crate-with-rope-handle/plain-paulownia-crate-with-rope-handle-1.jpg',
    href: '/products/plain-paulownia-crate-with-rope-handle',
    cat: '/products/wooden-storage-box-with-lid',
    priceKey: 'wooden-storage-box-with-lid',
  },
];

// Primary standards bodies only — 7 external links, under the 10 cap.
const SRC = {
  ippc:  'https://www.ippc.int/en/core-activities/capacity-development/ispm-15/',
  epa:   'https://www.epa.gov/formaldehyde/formaldehyde-emission-standards-composite-wood-products',
  carb:  'https://ww2.arb.ca.gov/our-work/programs/composite-wood-products-program',
  reach: 'https://echa.europa.eu/regulations/reach/understanding-reach',
  eudr:  'https://green-forum.ec.europa.eu/nature-and-biodiversity/deforestation-regulation-implementation_en',
  fsc:   'https://fsc.org/en',
  ista:  'https://ista.org/',
};

const Ext = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer"
     className="underline underline-offset-2 decoration-brand-line hover:decoration-brand-green hover:text-brand-green">
    {children}
  </a>
);

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'landing.treasureChest' });
  const description = t('metaDesc');
  const title = t('metaTitle');
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: canonicalFor(locale, `/${SLUG}`),
      languages: hreflangFor(SITE.siteUrl, `/${SLUG}`),
    },
    openGraph: {
      type: 'website',
      url: `${SITE.siteUrl}/${SLUG}`,
      title,
      description,
      images: [{ url: HERO_IMAGE, width: 1200, height: 1200, alt: t('heroAlt') }],
      siteName: SITE.company.brand,
    },
    twitter: { card: 'summary_large_image', title, description, images: [HERO_IMAGE] },
  };
}

export default function Page({ params }) {
  unstable_setRequestLocale(params.locale);
  const t = useTranslations('landing.treasureChest');

  const money = (n) => `$${n.toFixed(2)}`;
  const band = (key) => {
    const p = PRICING_BY_CATEGORY[key];
    return p ? { moq: `${p.moq} pcs`, fob: `${money(p.lowPrice)} – ${money(p.highPrice)}` } : null;
  };

  const families = FAMILIES.map((f, i) => ({
    ...f,
    name: t(`fam${i + 1}Name`),
    desc: t(`fam${i + 1}Desc`),
    spec: t(`fam${i + 1}Spec`),
    driver: t(`cost${i + 1}Driver`),
    price: band(f.priceKey),
  }));

  // Lid construction — the one spec that decides whether a chest survives.
  const lids = [1, 2, 3, 4].map((i) => ({
    build: t(`lid${i}Build`),
    spot: t(`lid${i}Spot`),
    best: t(`lid${i}Best`),
    watch: t(`lid${i}Watch`),
  }));

  // Size bands we tool for, and what each one retails as.
  const sizes = [1, 2, 3, 4, 5].map((i) => ({
    dim: t(`size${i}Dim`),
    sells: t(`size${i}Sells`),
    retail: t(`size${i}Retail`),
    note: t(`size${i}Note`),
  }));

  // Species behaviour on a curved lid.
  const woods = [1, 2, 3, 4, 5].map((i) => ({
    name: t(`wood${i}Name`),
    bend: t(`wood${i}Bend`),
    best: t(`wood${i}Best`),
  }));

  const hardware = [1, 2, 3].map((i) => ({
    part: t(`hw${i}Part`),
    spec: t(`hw${i}Spec`),
    why: t(`hw${i}Why`),
  }));

  const finishes = [1, 2, 3, 4].map((i) => ({
    title: t(`fin${i}Title`),
    body: t(`fin${i}Body`),
  }));

  const steps = [1, 2, 3, 4, 5, 6, 7].map((i) => ({
    title: t(`step${i}Title`),
    body: t(`step${i}Body`),
  }));

  const quality = [1, 2, 3, 4].map((i) => ({
    title: t(`qc${i}Title`),
    body: t(`qc${i}Body`),
  }));

  const faqs = Array.from({ length: 9 }, (_, i) => ({
    q: t(`q${i + 1}`),
    a: t(`a${i + 1}`),
  }));

  const team = SITE.team.filter((m) => ['yucheng', 'vivi', 'cassie'].includes(m.slug));
  const teamRole = { yucheng: t('bylineRole1'), vivi: t('bylineRole2'), cassie: t('bylineRole3') };

  const toc = [
    { id: 'formats',   text: t('famTitle'),  level: 2 },
    { id: 'lid',       text: t('lidTitle'),  level: 2 },
    { id: 'sizes',     text: t('sizeTitle'), level: 2 },
    { id: 'wood',      text: t('woodTitle'), level: 2 },
    { id: 'hardware',  text: t('hwTitle'),   level: 2 },
    { id: 'finish',    text: t('finTitle'),  level: 2 },
    { id: 'branding',  text: t('pkgTitle'),  level: 2 },
    { id: 'process',   text: t('prcTitle'),  level: 2 },
    { id: 'video',     text: t('vidTitle'),  level: 2 },
    { id: 'cost',      text: t('costTitle'), level: 2 },
    { id: 'quality',   text: t('qcTitle'),   level: 2 },
    { id: 'faq',       text: t('faqTitle'),  level: 2 },
  ];

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('breadcrumbHome'), item: `${SITE.siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: t('breadcrumbProducts'), item: `${SITE.siteUrl}/products` },
      { '@type': 'ListItem', position: 3, name: t('breadcrumbCategory'), item: `${SITE.siteUrl}/products/gift-boxes-retail-packaging` },
      { '@type': 'ListItem', position: 4, name: t('breadcrumbCurrent'), item: `${SITE.siteUrl}/${SLUG}` },
    ],
  };

  const serviceLd = buildServiceLd({
    slug: SLUG,
    serviceType: 'Wooden Treasure Chest Manufacturing',
    name: t('h1'),
    description: t('metaDesc'),
    locale: params.locale,
    offerItems: families.map((f) => ({ name: f.name, description: f.desc })),
  });

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t('famTitle'),
    itemListElement: families.map((f, i) => ({
      '@type': 'ListItem', position: i + 1, name: f.name, url: `${SITE.siteUrl}${f.href}`,
    })),
  };

  const Eyebrow = ({ children }) => (
    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{children}</p>
  );
  const H2 = ({ id, children }) => (
    <h2 id={id} className="scroll-mt-28 text-3xl md:text-4xl font-extrabold text-brand-ink tracking-tight">
      {children}
    </h2>
  );

  return (
    <article className="bg-white">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={serviceLd} />
      <JsonLd data={itemListLd} />

      {/* ── Breadcrumb ───────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="bg-brand-cream border-b border-brand-line">
        <ol className="max-w-[1200px] mx-auto px-6 lg:px-8 py-3 flex flex-wrap items-center gap-2 text-[13px] text-brand-mute">
          <li><Link href="/" className="hover:text-brand-green">{t('breadcrumbHome')}</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/products" className="hover:text-brand-green">{t('breadcrumbProducts')}</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/products/gift-boxes-retail-packaging" className="hover:text-brand-green">{t('breadcrumbCategory')}</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-brand-ink font-semibold" aria-current="page">{t('breadcrumbCurrent')}</li>
        </ol>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <header className="bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-14 lg:py-20 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <Eyebrow>{t('heroEyebrow')}</Eyebrow>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-ink leading-[1.1]">
              {t('h1')}
            </h1>
            <p className="mt-5 text-[17px] leading-relaxed text-brand-ink/85 max-w-xl">{t('heroSub')}</p>
            <div className="mt-8 flex flex-wrap gap-3 print:hidden">
              <Link href="/contact#form" className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition">
                {t('heroCta1')}
              </Link>
              <Link href="/products/gift-boxes-retail-packaging" className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition">
                {t('heroCta2')}
              </Link>
            </div>
          </div>
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-brand-line bg-white">
            <Image src={HERO_IMAGE} alt={t('heroAlt')} fill priority fetchPriority="high"
                   sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>

        <div className="border-t border-brand-line">
          <dl className="max-w-[1200px] mx-auto px-6 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <dt className="sr-only">{t(`proof${i}Label`)}</dt>
                <dd>
                  <span className="block text-2xl md:text-3xl font-extrabold text-brand-green">{t(`proof${i}Num`)}</span>
                  <span className="block mt-1 text-[13px] text-brand-mute">{t(`proof${i}Label`)}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* ── Byline + print ───────────────────────────────────────────── */}
      <div className="border-b border-brand-line bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-6 flex flex-wrap items-center gap-x-8 gap-y-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {team.map((m) => (
                <Image key={m.slug} src={m.photo} alt={m.name} width={44} height={44}
                       className="h-11 w-11 rounded-full border-2 border-white object-cover bg-brand-cream" />
              ))}
            </div>
            <div className="text-[13px] leading-snug">
              <p className="text-brand-mute">{t('bylineLabel')}</p>
              <p className="font-semibold text-brand-ink">
                {team.map((m, i) => (
                  <span key={m.slug}>
                    {i > 0 && <span className="text-brand-mute font-normal"> · </span>}
                    <Link href="/about/team" className="hover:text-brand-green">{m.name}</Link>
                    <span className="text-brand-mute font-normal"> — {teamRole[m.slug]}</span>
                  </span>
                ))}
              </p>
              <p className="text-brand-mute mt-0.5">
                {t('bylineUpdated')} <time dateTime={REVIEWED}>{REVIEWED}</time>
              </p>
            </div>
          </div>
          <PrintButton label={t('printLabel')} />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-14 lg:py-20 grid lg:grid-cols-[minmax(0,1fr)_260px] gap-12 lg:gap-16 items-start">
        <div className="min-w-0 space-y-20">

          <p className="text-[15px] leading-relaxed text-brand-mute border-l-2 border-brand-line pl-5">
            {t('bylineNote')}
          </p>

          {/* ── Formats ───────────────────────────────────────────────── */}
          <section>
            <Eyebrow>{t('famEyebrow')}</Eyebrow>
            <H2 id="formats">{t('famTitle')}</H2>
            <p className="mt-4 text-[17px] leading-relaxed text-brand-ink/85">{t('famIntro')}</p>
            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              {families.map((f) => (
                <Link key={f.href} href={f.href}
                      className="group rounded-2xl border border-brand-line bg-white overflow-hidden hover:border-brand-green hover:shadow-md transition">
                  <div className="relative aspect-[4/3] bg-brand-cream">
                    <Image src={f.image} alt={f.name} fill sizes="(max-width: 640px) 100vw, 50vw"
                           className="object-cover group-hover:scale-[1.03] transition duration-500" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-[17px] font-bold text-brand-ink group-hover:text-brand-green">{f.name}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-brand-ink/80">{f.desc}</p>
                    <p className="mt-3 text-[12px] font-semibold uppercase tracking-wider text-brand-mute">{f.spec}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Lid construction ──────────────────────────────────────── */}
          <section>
            <Eyebrow>{t('lidEyebrow')}</Eyebrow>
            <H2 id="lid">{t('lidTitle')}</H2>
            <p className="mt-4 text-[17px] leading-relaxed text-brand-ink/85">{t('lidIntro')}</p>

            <figure className="mt-8">
              <div className="relative w-full overflow-hidden rounded-2xl border border-brand-line bg-brand-cream">
                <Image src={LID_IMAGE} alt={t('lidImgAlt')} width={1200} height={900}
                       sizes="(max-width: 1024px) 100vw, 900px" className="w-full h-auto object-contain" />
              </div>
              <figcaption className="mt-3 text-[13px] text-brand-mute">{t('lidCaption')}</figcaption>
            </figure>

            {/* Kerf-cut vs laminated stave — cross-section through the lid */}
            <figure className="mt-8 rounded-2xl border border-brand-line bg-brand-cream p-6">
              <svg viewBox="0 0 640 230" role="img" aria-labelledby="lidDiagramTitle" className="w-full h-auto">
                <title id="lidDiagramTitle">{t('lidDiagramTitle')}</title>
                <g fill="none" stroke="#2C5E3F" strokeWidth="2">
                  {/* Kerf-cut: one board, saw slots on the inside face */}
                  <path d="M40 130 A 110 110 0 0 1 260 130" fill="#ffffff" />
                  <path d="M40 130 h220" />
                  <path d="M72 118 v-14 M104 102 v-16 M150 94 v-18 M196 102 v-16 M228 118 v-14" strokeWidth="3" />
                  {/* Laminated stave: separate strips glued up */}
                  <path d="M380 130 A 110 110 0 0 1 600 130" fill="#ffffff" />
                  <path d="M380 130 h220" />
                  <path d="M412 124 L420 96 M444 104 L450 80 M490 92 L490 70 M536 104 L530 80 M568 124 L560 96" strokeWidth="2" />
                </g>
                <g fontSize="13" fill="#5b5b55" fontFamily="system-ui, sans-serif">
                  <text x="150" y="162" textAnchor="middle" fontWeight="700" fill="#2C5E3F">{t('lidDiagramA')}</text>
                  <text x="150" y="182" textAnchor="middle">{t('lidDiagramANote')}</text>
                  <text x="490" y="162" textAnchor="middle" fontWeight="700" fill="#2C5E3F">{t('lidDiagramB')}</text>
                  <text x="490" y="182" textAnchor="middle">{t('lidDiagramBNote')}</text>
                  <text x="320" y="215" textAnchor="middle" fontStyle="italic">{t('lidDiagramFoot')}</text>
                </g>
              </svg>
            </figure>

            <div className="mt-8 overflow-x-auto rounded-2xl border border-brand-line">
              <table className="w-full min-w-[760px] text-left text-[14px]">
                <thead className="bg-brand-cream text-brand-ink">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">{t('lidColBuild')}</th>
                    <th scope="col" className="px-4 py-3 font-bold">{t('lidColSpot')}</th>
                    <th scope="col" className="px-4 py-3 font-bold">{t('lidColBest')}</th>
                    <th scope="col" className="px-4 py-3 font-bold">{t('lidColWatch')}</th>
                  </tr>
                </thead>
                <tbody>
                  {lids.map((l) => (
                    <tr key={l.build} className="border-t border-brand-line align-top">
                      <th scope="row" className="px-4 py-4 font-bold text-brand-ink">{l.build}</th>
                      <td className="px-4 py-4 text-brand-ink/80">{l.spot}</td>
                      <td className="px-4 py-4 text-brand-ink/80">{l.best}</td>
                      <td className="px-4 py-4 text-brand-ink/80">{l.watch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 rounded-xl bg-brand-cream border border-brand-line px-5 py-4 text-[15px] leading-relaxed text-brand-ink/85">
              {t('lidNote')}
            </p>
          </section>

          {/* ── Sizes ─────────────────────────────────────────────────── */}
          <section>
            <Eyebrow>{t('sizeEyebrow')}</Eyebrow>
            <H2 id="sizes">{t('sizeTitle')}</H2>
            <p className="mt-4 text-[17px] leading-relaxed text-brand-ink/85">{t('sizeIntro')}</p>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-brand-line">
              <table className="w-full min-w-[720px] text-left text-[14px]">
                <thead className="bg-brand-cream text-brand-ink">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold whitespace-nowrap">{t('sizeColDim')}</th>
                    <th scope="col" className="px-4 py-3 font-bold">{t('sizeColSells')}</th>
                    <th scope="col" className="px-4 py-3 font-bold whitespace-nowrap">{t('sizeColRetail')}</th>
                    <th scope="col" className="px-4 py-3 font-bold">{t('sizeColNote')}</th>
                  </tr>
                </thead>
                <tbody>
                  {sizes.map((s) => (
                    <tr key={s.dim} className="border-t border-brand-line align-top">
                      <th scope="row" className="px-4 py-4 font-bold text-brand-ink whitespace-nowrap">{s.dim}</th>
                      <td className="px-4 py-4 text-brand-ink/80">{s.sells}</td>
                      <td className="px-4 py-4 font-semibold text-brand-green whitespace-nowrap">{s.retail}</td>
                      <td className="px-4 py-4 text-brand-ink/80">{s.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 text-[14px] leading-relaxed text-brand-mute">{t('sizeDisclaimer')}</p>
          </section>

          {/* ── Wood ──────────────────────────────────────────────────── */}
          <section>
            <Eyebrow>{t('woodEyebrow')}</Eyebrow>
            <H2 id="wood">{t('woodTitle')}</H2>
            <p className="mt-4 text-[17px] leading-relaxed text-brand-ink/85">{t('woodIntro')}</p>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-brand-line">
              <table className="w-full min-w-[640px] text-left text-[14px]">
                <thead className="bg-brand-cream text-brand-ink">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">{t('woodColName')}</th>
                    <th scope="col" className="px-4 py-3 font-bold">{t('woodColBend')}</th>
                    <th scope="col" className="px-4 py-3 font-bold">{t('woodColBest')}</th>
                  </tr>
                </thead>
                <tbody>
                  {woods.map((w) => (
                    <tr key={w.name} className="border-t border-brand-line align-top">
                      <th scope="row" className="px-4 py-4 font-bold text-brand-ink whitespace-nowrap">{w.name}</th>
                      <td className="px-4 py-4 text-brand-ink/80">{w.bend}</td>
                      <td className="px-4 py-4 text-brand-ink/80">{w.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 text-[15px] leading-relaxed text-brand-ink/85">{t('woodNote')}</p>
            <p className="mt-4 text-[14px]">
              <Link href="/blog/paulownia-vs-pine-vs-acacia-storage-boxes" className="font-semibold text-brand-green underline underline-offset-4">
                {t('woodGuideLink')} →
              </Link>
            </p>
          </section>

          {/* ── Hardware ──────────────────────────────────────────────── */}
          <section>
            <Eyebrow>{t('hwEyebrow')}</Eyebrow>
            <H2 id="hardware">{t('hwTitle')}</H2>
            <p className="mt-4 text-[17px] leading-relaxed text-brand-ink/85">{t('hwIntro')}</p>
            <figure className="mt-8">
              <div className="relative w-full overflow-hidden rounded-2xl border border-brand-line bg-brand-cream">
                <Image src={HW_IMAGE} alt={t('hwImgAlt')} width={1200} height={900}
                       sizes="(max-width: 1024px) 100vw, 900px" className="w-full h-auto object-contain" />
              </div>
              <figcaption className="mt-3 text-[13px] text-brand-mute">{t('hwCaption')}</figcaption>
            </figure>
            <div className="mt-8 grid gap-6">
              {hardware.map((h) => (
                <div key={h.part} className="rounded-2xl border border-brand-line p-6">
                  <h3 className="text-[17px] font-bold text-brand-ink">{h.part}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-brand-ink/85">
                    <span className="font-semibold text-brand-green">{t('hwSpecLabel')} </span>{h.spec}
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-brand-ink/80">{h.why}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Finish ────────────────────────────────────────────────── */}
          <section>
            <Eyebrow>{t('finEyebrow')}</Eyebrow>
            <H2 id="finish">{t('finTitle')}</H2>
            <p className="mt-4 text-[17px] leading-relaxed text-brand-ink/85">{t('finIntro')}</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-6">
              {finishes.map((f) => (
                <div key={f.title} className="rounded-2xl border border-brand-line p-6">
                  <h3 className="text-[17px] font-bold text-brand-ink">{f.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-brand-ink/80">{f.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 rounded-xl bg-brand-cream border border-brand-line px-5 py-4 text-[15px] leading-relaxed text-brand-ink/85">
              {t('finNote')} <Ext href={SRC.reach}>{t('finReachLabel')}</Ext>.
            </p>
          </section>

          {/* ── Branding: what we can and cannot do ───────────────────── */}
          <section>
            <Eyebrow>{t('pkgEyebrow')}</Eyebrow>
            <H2 id="branding">{t('pkgTitle')}</H2>
            <p className="mt-4 text-[17px] leading-relaxed text-brand-ink/85">{t('pkgIntro')}</p>
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border-2 border-brand-green/25 bg-brand-cream p-6">
                <h3 className="text-[15px] font-bold uppercase tracking-wider text-brand-green">{t('pkgCanTitle')}</h3>
                <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-brand-ink/85">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <li key={i} className="flex gap-3">
                      <span aria-hidden="true" className="mt-1 text-brand-green font-bold">✓</span>
                      <span>{t(`pkgCan${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border-2 border-brand-line p-6">
                <h3 className="text-[15px] font-bold uppercase tracking-wider text-brand-mute">{t('pkgCantTitle')}</h3>
                <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-brand-ink/85">
                  {[1, 2, 3].map((i) => (
                    <li key={i} className="flex gap-3">
                      <span aria-hidden="true" className="mt-1 text-brand-mute font-bold">—</span>
                      <span>{t(`pkgCant${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-5 text-[15px] leading-relaxed text-brand-ink/85">{t('pkgNote')}</p>
          </section>

          {/* ── Process ───────────────────────────────────────────────── */}
          <section>
            <Eyebrow>{t('prcEyebrow')}</Eyebrow>
            <H2 id="process">{t('prcTitle')}</H2>
            <p className="mt-4 text-[17px] leading-relaxed text-brand-ink/85">{t('prcIntro')}</p>

            {/* The curved-lid decision is what makes a chest order different */}
            <figure className="mt-8 rounded-2xl border border-brand-line bg-brand-cream p-6">
              <svg viewBox="0 0 660 250" role="img" aria-labelledby="flowDiagramTitle" className="w-full h-auto">
                <title id="flowDiagramTitle">{t('prcDiagramTitle')}</title>
                <g fill="#ffffff" stroke="#2C5E3F" strokeWidth="2">
                  <rect x="12"  y="20"  width="140" height="44" rx="8" />
                  <path d="M250 20 l60 22 l-60 22 l-60 -22 z" />
                  <rect x="340" y="4"   width="150" height="38" rx="8" />
                  <rect x="340" y="56"  width="150" height="38" rx="8" />
                  <rect x="520" y="20"  width="128" height="44" rx="8" />
                  <rect x="520" y="110" width="128" height="44" rx="8" />
                  <rect x="340" y="110" width="150" height="44" rx="8" />
                  <rect x="160" y="110" width="150" height="44" rx="8" />
                  <rect x="12"  y="110" width="130" height="44" rx="8" />
                  <rect x="12"  y="186" width="636" height="40" rx="8" />
                </g>
                <g fill="none" stroke="#2C5E3F" strokeWidth="2" markerEnd="url(#ah)">
                  <path d="M152 42 h36" />
                  <path d="M310 36 h26 M310 50 h26" />
                  <path d="M490 23 h26 M490 75 q 20 0 20 -20 l0 -8" />
                  <path d="M584 64 v40" />
                  <path d="M520 132 h-26" />
                  <path d="M340 132 h-26" />
                  <path d="M160 132 h-14" />
                  <path d="M77 154 v28" />
                </g>
                <defs>
                  <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M0 0 L10 5 L0 10 z" fill="#2C5E3F" />
                  </marker>
                </defs>
                <g fontSize="11.5" fill="#1d1d1b" fontFamily="system-ui, sans-serif" textAnchor="middle">
                  <text x="82"  y="47">{t('flow1')}</text>
                  <text x="250" y="46">{t('flow2')}</text>
                  <text x="415" y="27">{t('flow3')}</text>
                  <text x="415" y="79">{t('flow4')}</text>
                  <text x="584" y="47">{t('flow5')}</text>
                  <text x="584" y="137">{t('flow6')}</text>
                  <text x="415" y="137">{t('flow7')}</text>
                  <text x="235" y="137">{t('flow8')}</text>
                  <text x="77"  y="137">{t('flow9')}</text>
                  <text x="330" y="211">{t('flow10')}</text>
                </g>
              </svg>
              <figcaption className="mt-3 text-[13px] text-brand-mute">{t('prcDiagramCaption')}</figcaption>
            </figure>

            <ol className="mt-10 space-y-6">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-5">
                  <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-green text-[14px] font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-[17px] font-bold text-brand-ink">{s.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-brand-ink/80">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-[15px] leading-relaxed text-brand-mute">
              {t('prcNote')} <Ext href={SRC.ippc}>{t('prcIspmLabel')}</Ext>.
            </p>
          </section>

          {/* ── Video ─────────────────────────────────────────────────── */}
          <section>
            <Eyebrow>{t('vidEyebrow')}</Eyebrow>
            <H2 id="video">{t('vidTitle')}</H2>
            <p className="mt-4 text-[17px] leading-relaxed text-brand-ink/85">{t('vidIntro')}</p>
            <div className="mt-8">
              {/* emitSchema={false} — /material-guide owns the VideoObject schema
                  for these clips. Give this page its own clip and its own
                  VideoObject once chest-line footage exists. */}
              <ProcessVideos locale={params.locale} emitSchema={false} />
            </div>
            <p className="mt-4 text-[13px] text-brand-mute">{t('vidCaption')}</p>
          </section>

          {/* ── Cost ──────────────────────────────────────────────────── */}
          <section>
            <Eyebrow>{t('costEyebrow')}</Eyebrow>
            <H2 id="cost">{t('costTitle')}</H2>
            <p className="mt-4 text-[17px] leading-relaxed text-brand-ink/85">{t('costIntro')}</p>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-brand-line">
              <table className="w-full min-w-[720px] text-left text-[14px]">
                <thead className="bg-brand-cream text-brand-ink">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">{t('costColFamily')}</th>
                    <th scope="col" className="px-4 py-3 font-bold whitespace-nowrap">{t('costColMoq')}</th>
                    <th scope="col" className="px-4 py-3 font-bold whitespace-nowrap">{t('costColFob')}</th>
                    <th scope="col" className="px-4 py-3 font-bold">{t('costColDriver')}</th>
                  </tr>
                </thead>
                <tbody>
                  {families.map((f) => (
                    <tr key={f.href} className="border-t border-brand-line align-top">
                      <th scope="row" className="px-4 py-4 font-bold text-brand-ink">
                        <Link href={f.cat} className="hover:text-brand-green">{f.name}</Link>
                      </th>
                      <td className="px-4 py-4 text-brand-ink/80 whitespace-nowrap">{f.price?.moq}</td>
                      <td className="px-4 py-4 font-semibold text-brand-green whitespace-nowrap">{f.price?.fob}</td>
                      <td className="px-4 py-4 text-brand-ink/80">{f.driver}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 text-[14px] leading-relaxed text-brand-mute">{t('costDisclaimer')}</p>
            <p className="mt-5 print:hidden">
              <Link href="/contact#form" className="inline-flex items-center rounded-full bg-brand-green px-6 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition">
                {t('costCtaLabel')}
              </Link>
            </p>
          </section>

          {/* ── Quality & compliance ──────────────────────────────────── */}
          <section>
            <Eyebrow>{t('qcEyebrow')}</Eyebrow>
            <H2 id="quality">{t('qcTitle')}</H2>
            <p className="mt-4 text-[17px] leading-relaxed text-brand-ink/85">{t('qcIntro')}</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-6">
              {quality.map((q) => (
                <div key={q.title} className="rounded-2xl border border-brand-line p-6">
                  <h3 className="text-[17px] font-bold text-brand-ink">{q.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-brand-ink/80">{q.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[15px] leading-relaxed text-brand-ink/85">
              {t('qcStandards')}{' '}
              <Ext href={SRC.epa}>{t('qcEpaLabel')}</Ext>{' · '}
              <Ext href={SRC.carb}>{t('qcCarbLabel')}</Ext>{' · '}
              <Ext href={SRC.eudr}>{t('qcEudrLabel')}</Ext>{' · '}
              <Ext href={SRC.fsc}>{t('qcFscLabel')}</Ext>{' · '}
              <Ext href={SRC.ista}>{t('qcIstaLabel')}</Ext>
            </p>
          </section>
        </div>

        {/* ── Sticky TOC ───────────────────────────────────────────────── */}
        <aside className="print:hidden">
          <div className="lg:sticky lg:top-28">
            <TableOfContents toc={toc} title={t('tocTitle')} />
          </div>
        </aside>
      </div>

      <ProofStrip cases={[1, 2]} />

      {/* ── FAQ (emits its own FAQPage schema) ───────────────────────── */}
      <div id="faq" className="scroll-mt-28">
        <PageFAQ
          eyebrow={t('faqEyebrow')}
          title={t('faqTitle')}
          intro={t('faqIntro')}
          items={faqs}
          ctaHref="/contact#form"
          background="bg-brand-cream"
        />
      </div>

      {/* ── Related guides ───────────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 print:hidden">
        <h2 className="text-2xl font-extrabold text-brand-ink tracking-tight">{t('guidesTitle')}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { href: '/blog/wholesale-treasure-chest-sourcing-guide', label: t('guide1Label') },
            { href: '/blog/wooden-keepsake-boxes-wholesale-guide', label: t('guide2Label') },
            { href: '/blog/paulownia-vs-pine-vs-acacia-storage-boxes', label: t('guide3Label') },
          ].map((g) => (
            <Link key={g.href} href={g.href}
                  className="rounded-xl border border-brand-line bg-white p-5 hover:border-brand-green hover:shadow-md transition">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-wood">{t('guideEyebrow')}</span>
              <span className="mt-2 block text-[15px] font-semibold text-brand-ink leading-snug">{g.label}</span>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-[14px]">
          <Link href="/products/wooden-keepsake-boxes" className="font-semibold text-brand-green underline underline-offset-4">
            {t('relCta')}
          </Link>
        </p>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section className="print:hidden bg-brand-green text-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold leading-tight">{t('ctaTitle')}</h2>
            <p className="mt-3 text-white/85 text-[16px] leading-relaxed">{t('ctaBody')}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link href="/contact#form" className="inline-flex items-center rounded-full bg-brand-wood px-7 py-3 text-[15px] font-semibold text-brand-ink hover:bg-brand-woodSoft transition">
              {t('ctaBtn1')}
            </Link>
            <a href={SITE.whatsapp.chatUrl} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center rounded-full border-2 border-white px-7 py-3 text-[15px] font-semibold text-white hover:bg-white hover:text-brand-green transition">
              {t('ctaBtn2')}
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
