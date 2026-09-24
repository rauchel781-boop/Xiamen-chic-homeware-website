// /wooden-storage-organizer-manufacturer
//
// Commercial landing page for the head term "wooden storage organizer
// manufacturer". Deliberately split from the blog guide at
// /blog/wooden-organizer-manufacturer-china-guide: this page answers
// "who can build this for me", the guide answers "how do I source it".
// Keeping the two on separate intents stops them cannibalising each other.
//
// External links are capped at 10 site-wide policy; this page uses 9, all
// primary regulatory sources, all target="_blank" rel="noopener noreferrer".
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

const SLUG = 'wooden-storage-organizer-manufacturer';
const REVIEWED = '2026-09-24';

const HERO_IMAGE =
  '/homeware-0915/rustic-tiered-organizer-with-label-drawers/rustic-tiered-organizer-with-label-drawers-1.jpg';

// Six product families — our own photography, each linked to a live SKU.
const FAMILIES = [
  {
    image: '/homeware-0915/bamboo-12-compartment-counter-organizer/bamboo-12-compartment-counter-organizer-1.jpg',
    href: '/products/bamboo-12-compartment-counter-organizer',
    cat: '/products/wooden-countertop-organizers',
    priceKey: 'wooden-countertop-organizers',
  },
  {
    image: '/homeware-0915/acacia-stackable-pantry-bin-with-lid/acacia-stackable-pantry-bin-with-lid-1.jpg',
    href: '/products/acacia-stackable-pantry-bin-with-lid',
    cat: '/products/wooden-pantry-organizers',
    priceKey: 'wooden-pantry-organizers',
  },
  {
    image: '/wp-images/2026/03/Wood-Toothbrush-Holder-8.png',
    href: '/products/wooden-bathroom-organizer',
    cat: '/products/wooden-bathroom-organizer',
    priceKey: 'wooden-bathroom-organizer',
  },
  {
    image: '/wp-images/2025/03/982842b0-0c1a-4d1e-b0ec-f5742e0247e4.jpg',
    href: '/products/wooden-jewelry-organizer',
    cat: '/products/wooden-jewelry-organizer',
    priceKey: 'wooden-jewelry-organizer',
  },
  {
    image: '/homeware-0915/plain-paulownia-crate-with-rope-handle/plain-paulownia-crate-with-rope-handle-1.jpg',
    href: '/products/plain-paulownia-crate-with-rope-handle',
    cat: '/products/wooden-storage-box-with-lid',
    priceKey: 'wooden-storage-box-with-lid',
  },
  {
    image: '/homeware-0914/acacia-tiered-spice-drawer-organizer/acacia-tiered-spice-drawer-organizer-1.jpg',
    href: '/products/acacia-tiered-spice-drawer-organizer',
    cat: '/products/wooden-drawer-organizer',
    priceKey: 'wooden-drawer-organizer',
  },
];

const FINISH_IMAGE = '/wp-images/2026/09/acacia-oiled-vs-lacquered.jpg';

// Primary regulatory sources only — 9 external links, under the 10 cap.
const SRC = {
  epa:   'https://www.epa.gov/formaldehyde/formaldehyde-emission-standards-composite-wood-products',
  ecfr:  'https://www.ecfr.gov/current/title-40/chapter-I/subchapter-R/part-770',
  carb:  'https://ww2.arb.ca.gov/our-work/programs/composite-wood-products-program',
  fda:   'https://www.fda.gov/food/food-ingredients-packaging/packaging-food-contact-substances-fcs',
  eu1935:'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32004R1935',
  eudr:  'https://green-forum.ec.europa.eu/nature-and-biodiversity/deforestation-regulation-implementation_en',
  reach: 'https://echa.europa.eu/regulations/reach/understanding-reach',
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
  const t = await getTranslations({ locale, namespace: 'landing.storageOrganizer' });
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
  const t = useTranslations('landing.storageOrganizer');

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

  const materials = [1, 2, 3, 4, 5].map((i) => ({
    name: t(`mat${i}Name`),
    character: t(`mat${i}Character`),
    cost: t(`mat${i}Cost`),
    best: t(`mat${i}Best`),
    watch: t(`mat${i}Watch`),
  }));

  const construction = [1, 2, 3, 4, 5].map((i) => ({
    title: t(`con${i}Title`),
    body: t(`con${i}Body`),
  }));

  const steps = [1, 2, 3, 4, 5, 6, 7].map((i) => ({
    title: t(`step${i}Title`),
    body: t(`step${i}Body`),
  }));

  const quality = [1, 2, 3, 4].map((i) => ({
    title: t(`qc${i}Title`),
    body: t(`qc${i}Body`),
  }));

  const faqs = Array.from({ length: 10 }, (_, i) => ({
    q: t(`q${i + 1}`),
    a: t(`a${i + 1}`),
  }));

  // Compliance rows carry an optional primary source link per row.
  const compliance = [
    { i: 1, links: [{ label: 'EPA', href: SRC.epa }, { label: '40 CFR 770', href: SRC.ecfr }, { label: 'CARB', href: SRC.carb }] },
    { i: 2, links: [{ label: 'FDA', href: SRC.fda }] },
    { i: 3, links: [{ label: 'EC 1935/2004', href: SRC.eu1935 }] },
    { i: 4, links: [{ label: 'ECHA', href: SRC.reach }] },
    { i: 5, links: [{ label: 'European Commission', href: SRC.eudr }] },
    { i: 6, links: [{ label: 'FSC', href: SRC.fsc }] },
    { i: 7, links: [{ label: 'ISTA', href: SRC.ista }] },
  ].map((r) => ({
    market: t(`cmp${r.i}Market`),
    rule: t(`cmp${r.i}Rule`),
    applies: t(`cmp${r.i}Applies`),
    weDo: t(`cmp${r.i}WeDo`),
    links: r.links,
  }));

  const team = SITE.team.filter((m) => ['vivi', 'lingling', 'yucheng'].includes(m.slug));
  const teamRole = { vivi: t('bylineRole1'), lingling: t('bylineRole2'), yucheng: t('bylineRole3') };

  const toc = [
    { id: 'families',     text: t('famTitle'),  level: 2 },
    { id: 'materials',    text: t('matTitle'),  level: 2 },
    { id: 'finish',       text: t('finTitle'),  level: 2 },
    { id: 'construction', text: t('conTitle'),  level: 2 },
    { id: 'compliance',   text: t('cmpTitle'),  level: 2 },
    { id: 'process',      text: t('prcTitle'),  level: 2 },
    { id: 'video',        text: t('vidTitle'),  level: 2 },
    { id: 'cost',         text: t('costTitle'), level: 2 },
    { id: 'branding',     text: t('pkgTitle'),  level: 2 },
    { id: 'quality',      text: t('qcTitle'),   level: 2 },
    { id: 'faq',          text: t('faqTitle'),  level: 2 },
  ];

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('breadcrumbHome'), item: `${SITE.siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: t('breadcrumbProducts'), item: `${SITE.siteUrl}/products` },
      { '@type': 'ListItem', position: 3, name: t('breadcrumbCategory'), item: `${SITE.siteUrl}/products/storage-home-organization` },
      { '@type': 'ListItem', position: 4, name: t('breadcrumbCurrent'), item: `${SITE.siteUrl}/${SLUG}` },
    ],
  };

  const serviceLd = buildServiceLd({
    slug: SLUG,
    serviceType: 'Wooden Storage Organizer Manufacturing',
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
          <li><Link href="/products/storage-home-organization" className="hover:text-brand-green">{t('breadcrumbCategory')}</Link></li>
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
              <Link href="/products/storage-home-organization" className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition">
                {t('heroCta2')}
              </Link>
            </div>
          </div>
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-brand-line bg-white">
            <Image src={HERO_IMAGE} alt={t('heroAlt')} fill priority fetchPriority="high"
                   sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>

        {/* Proof numbers */}
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
        {/* ── Main column ────────────────────────────────────────────── */}
        <div className="min-w-0 space-y-20">

          <p className="text-[15px] leading-relaxed text-brand-mute border-l-2 border-brand-line pl-5">
            {t('bylineNote')}
          </p>

          {/* Families */}
          <section>
            <Eyebrow>{t('famEyebrow')}</Eyebrow>
            <H2 id="families">{t('famTitle')}</H2>
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

          {/* Materials */}
          <section>
            <Eyebrow>{t('matEyebrow')}</Eyebrow>
            <H2 id="materials">{t('matTitle')}</H2>
            <p className="mt-4 text-[17px] leading-relaxed text-brand-ink/85">{t('matIntro')}</p>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-brand-line">
              <table className="w-full min-w-[720px] text-left text-[14px]">
                <thead className="bg-brand-cream text-brand-ink">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">{t('matColMaterial')}</th>
                    <th scope="col" className="px-4 py-3 font-bold">{t('matColCharacter')}</th>
                    <th scope="col" className="px-4 py-3 font-bold whitespace-nowrap">{t('matColCost')}</th>
                    <th scope="col" className="px-4 py-3 font-bold">{t('matColBest')}</th>
                    <th scope="col" className="px-4 py-3 font-bold">{t('matColWatch')}</th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map((m) => (
                    <tr key={m.name} className="border-t border-brand-line align-top">
                      <th scope="row" className="px-4 py-4 font-bold text-brand-ink whitespace-nowrap">{m.name}</th>
                      <td className="px-4 py-4 text-brand-ink/80">{m.character}</td>
                      <td className="px-4 py-4 font-bold text-brand-green">{m.cost}</td>
                      <td className="px-4 py-4 text-brand-ink/80">{m.best}</td>
                      <td className="px-4 py-4 text-brand-ink/80">{m.watch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 rounded-xl bg-brand-cream border border-brand-line px-5 py-4 text-[15px] leading-relaxed text-brand-ink/85">
              {t('matNote')}
            </p>
            <p className="mt-4 text-[14px]">
              <Link href="/material-guide" className="font-semibold text-brand-green underline underline-offset-4">
                {t('matGuideLink')} →
              </Link>
            </p>
          </section>

          {/* Finish comparison */}
          <section>
            <Eyebrow>{t('finEyebrow')}</Eyebrow>
            <H2 id="finish">{t('finTitle')}</H2>
            <p className="mt-4 text-[17px] leading-relaxed text-brand-ink/85">{t('finIntro')}</p>
            <figure className="mt-8">
              <div className="relative w-full overflow-hidden rounded-2xl border border-brand-line bg-brand-cream">
                <Image src={FINISH_IMAGE} alt={t('finImgAlt')} width={1400} height={900}
                       sizes="(max-width: 1024px) 100vw, 900px" className="w-full h-auto object-contain" />
              </div>
              <figcaption className="mt-3 text-[13px] text-brand-mute">{t('finCaption')}</figcaption>
            </figure>
            <div className="mt-8 grid sm:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="rounded-2xl border border-brand-line p-6">
                  <h3 className="text-[17px] font-bold text-brand-ink">{t(`fin${i}Title`)}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-brand-ink/80">{t(`fin${i}Body`)}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[15px] leading-relaxed text-brand-ink/85">{t('finNote')}</p>
          </section>

          {/* Construction */}
          <section>
            <Eyebrow>{t('conEyebrow')}</Eyebrow>
            <H2 id="construction">{t('conTitle')}</H2>
            <p className="mt-4 text-[17px] leading-relaxed text-brand-ink/85">{t('conIntro')}</p>

            {/* Divider cross-section — fixed dado vs removable slot */}
            <figure className="mt-8 rounded-2xl border border-brand-line bg-brand-cream p-6">
              <svg viewBox="0 0 640 210" role="img" aria-labelledby="dividerDiagramTitle" className="w-full h-auto">
                <title id="dividerDiagramTitle">{t('con1Title')}</title>
                <g fill="none" stroke="#2C5E3F" strokeWidth="2">
                  {/* Fixed dado */}
                  <rect x="30" y="60" width="240" height="100" rx="4" fill="#ffffff" />
                  <path d="M120 60 V160 M180 60 V160" />
                  <rect x="112" y="150" width="16" height="10" fill="#2C5E3F" stroke="none" />
                  <rect x="172" y="150" width="16" height="10" fill="#2C5E3F" stroke="none" />
                  {/* Removable slot */}
                  <rect x="370" y="60" width="240" height="100" rx="4" fill="#ffffff" />
                  <path d="M460 52 V160 M520 52 V160" />
                  <path d="M452 158 h16 M512 158 h16" strokeWidth="6" />
                </g>
                <g fontSize="13" fill="#5b5b55" fontFamily="system-ui, sans-serif">
                  <text x="30" y="40" fontWeight="700" fill="#1f1f1c">A</text>
                  <text x="48" y="40">{t('diagATitle')}</text>
                  <text x="30" y="186">{t('diagANote')}</text>
                  <text x="370" y="40" fontWeight="700" fill="#1f1f1c">B</text>
                  <text x="388" y="40">{t('diagBTitle')}</text>
                  <text x="370" y="186">{t('diagBNote')}</text>
                </g>
              </svg>
              <figcaption className="sr-only">{t('con1Body')}</figcaption>
            </figure>

            <div className="mt-8 space-y-5">
              {construction.map((c, i) => (
                <div key={c.title} className="rounded-2xl border border-brand-line p-6">
                  <h3 className="text-[17px] font-bold text-brand-ink">
                    <span className="text-brand-green mr-2">{String(i + 1).padStart(2, '0')}</span>{c.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-brand-ink/80">{c.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Compliance */}
          <section>
            <Eyebrow>{t('cmpEyebrow')}</Eyebrow>
            <H2 id="compliance">{t('cmpTitle')}</H2>
            <p className="mt-4 text-[17px] leading-relaxed text-brand-ink/85">{t('cmpIntro')}</p>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-brand-line">
              <table className="w-full min-w-[820px] text-left text-[14px]">
                <thead className="bg-brand-cream text-brand-ink">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold whitespace-nowrap">{t('cmpColMarket')}</th>
                    <th scope="col" className="px-4 py-3 font-bold">{t('cmpColRule')}</th>
                    <th scope="col" className="px-4 py-3 font-bold">{t('cmpColApplies')}</th>
                    <th scope="col" className="px-4 py-3 font-bold">{t('cmpColWeDo')}</th>
                  </tr>
                </thead>
                <tbody>
                  {compliance.map((c) => (
                    <tr key={c.rule + c.market} className="border-t border-brand-line align-top">
                      <th scope="row" className="px-4 py-4 font-bold text-brand-ink whitespace-nowrap">{c.market}</th>
                      <td className="px-4 py-4 text-brand-ink/80">
                        {c.rule}
                        <span className="block mt-1.5 text-[12px] text-brand-mute">
                          {c.links.map((l, i) => (
                            <span key={l.href}>
                              {i > 0 && ' · '}
                              <Ext href={l.href}>{l.label}</Ext>
                            </span>
                          ))}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-brand-ink/80">{c.applies}</td>
                      <td className="px-4 py-4 text-brand-ink/80">{c.weDo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 rounded-xl bg-brand-cream border border-brand-line px-5 py-4 text-[15px] leading-relaxed text-brand-ink/85">
              {t('cmpNote')}
            </p>
          </section>

          {/* Process flow */}
          <section>
            <Eyebrow>{t('prcEyebrow')}</Eyebrow>
            <H2 id="process">{t('prcTitle')}</H2>
            <p className="mt-4 text-[17px] leading-relaxed text-brand-ink/85">{t('prcIntro')}</p>
            <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <li key={s.title} className="relative rounded-2xl border border-brand-line bg-white p-5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-white text-[13px] font-bold">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 text-[15px] font-bold text-brand-ink">{s.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-brand-ink/80">{s.body}</p>
                  {i < steps.length - 1 && (
                    <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"
                         className="absolute -bottom-3 left-1/2 -translate-x-1/2 md:bottom-auto md:left-auto md:top-1/2 md:-right-3 md:translate-x-0 md:-translate-y-1/2 text-brand-line rotate-90 md:rotate-0">
                      <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-6 text-[15px] leading-relaxed text-brand-mute">{t('prcNote')}</p>
          </section>

          {/* Video */}
          <section>
            <Eyebrow>{t('vidEyebrow')}</Eyebrow>
            <H2 id="video">{t('vidTitle')}</H2>
            <p className="mt-4 text-[17px] leading-relaxed text-brand-ink/85">{t('vidIntro')}</p>
            <div className="mt-8">
              {/* emitSchema={false} — /material-guide is the canonical schema owner
                  for these three clips. Swap in the organizer-specific clip here
                  with its own VideoObject once the footage is available. */}
              <ProcessVideos locale={params.locale} emitSchema={false} />
            </div>
            <p className="mt-4 text-[13px] text-brand-mute">{t('vidCaption')}</p>
          </section>

          {/* Cost */}
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
                    <tr key={f.priceKey} className="border-t border-brand-line align-top">
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

          {/* Branding & packaging */}
          <section>
            <Eyebrow>{t('pkgEyebrow')}</Eyebrow>
            <H2 id="branding">{t('pkgTitle')}</H2>
            <p className="mt-4 text-[17px] leading-relaxed text-brand-ink/85">{t('pkgIntro')}</p>
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border-2 border-brand-green/25 bg-brand-cream p-6">
                <h3 className="text-[15px] font-bold uppercase tracking-wider text-brand-green">{t('pkgCanTitle')}</h3>
                <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-brand-ink/85">
                  {[1, 2, 3, 4].map((i) => (
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

          {/* Quality */}
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
          </section>
        </div>

        {/* ── Sticky TOC ─────────────────────────────────────────────── */}
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
            { href: '/blog/wooden-organizer-manufacturer-china-guide', label: t('guide1Label') },
            { href: '/blog/best-wood-for-wooden-organizers', label: t('guide2Label') },
            { href: '/blog/custom-wooden-storage-boxes-with-removable-dividers-buyers-guide', label: t('guide3Label') },
          ].map((g) => (
            <Link key={g.href} href={g.href}
                  className="rounded-xl border border-brand-line bg-white p-5 hover:border-brand-green hover:shadow-md transition">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-wood">{t('guideEyebrow')}</span>
              <span className="mt-2 block text-[15px] font-semibold text-brand-ink leading-snug">{g.label}</span>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-[14px]">
          <Link href="/products/storage-home-organization" className="font-semibold text-brand-green underline underline-offset-4">
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
