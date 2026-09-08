// /wholesale-pet-urns-manufacturer — hand-coded SEO landing page.
//
// Why this page exists: the pet cluster is the highest-CTR content on the site
// (2.91% vs a 0.62% site average, GSC 28d to 2026-09-04) but had no landing
// page and only one article behind it.
//
// The differentiator is the capacity sizing chart. Competitor research
// (Azule, PetMemora, Kelco, North American Urns) found that none of them
// publish MOQ, price bands, or — more importantly — a pet-weight-to-cubic-inch
// chart, even though "what size urn for a 40 lb dog" is the buyer's first
// question. The industry standard is ~1 cu in per lb of pre-cremation body
// weight plus 10-20% headroom.
//
// Capability accuracy: every technique named here is verified against the 16
// pet SKUs already in wp-data/products.json. We do NOT claim hot foil or
// emboss/deboss, and we explicitly rule out press-fit plug closures on wood.
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { buildServiceLd } from '@/lib/service-schema';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';
import { hreflangFor, canonicalFor } from '@/i18n/routing';
import ProofStrip from '@/components/ProofStrip';

const SLUG = 'wholesale-pet-urns-manufacturer';

const HERO_IMAGE = '/pet/wooden-pet-urn-photo-frame-engraved/wooden-pet-urn-photo-frame-engraved-1.jpg';

// Eight live formats — images are our own product photography.
const FORMAT_IMAGES = [
  '/wp-images/2026/02/memorial.png',
  '/pet/wooden-pet-urn-photo-frame-engraved/wooden-pet-urn-photo-frame-engraved-1.jpg',
  '/pet/wooden-pet-urn-photo-window-engraved/wooden-pet-urn-photo-window-engraved-1.jpg',
  '/pet/bamboo-pet-urn-photo-frame/bamboo-pet-urn-photo-frame-1.jpg',
  '/pet/pyramid-wooden-cremation-urn-tree-of-life/pyramid-wooden-cremation-urn-tree-of-life-1.jpg',
  '/pet/round-wooden-pet-memorial-photo-box/round-wooden-pet-memorial-photo-box-1.jpg',
  '/pet/wooden-pet-memorial-shadow-box-cabinet/wooden-pet-memorial-shadow-box-cabinet-1.jpg',
  '/pet/wooden-pet-casket-burial-box/wooden-pet-casket-burial-box-1.jpg',
];
const FORMAT_HREFS = [
  '/products/wholesale-wooden-pet-urn-house-shape-candle-holder',
  '/products/wooden-pet-urn-photo-frame-engraved',
  '/products/wooden-pet-urn-photo-window-engraved',
  '/products/bamboo-pet-urn-photo-frame',
  '/products/pyramid-wooden-cremation-urn-tree-of-life',
  '/products/round-wooden-pet-memorial-photo-box',
  '/products/wooden-pet-memorial-shadow-box-cabinet',
  '/products/wooden-pet-casket-burial-box',
];
const MATERIAL_IMAGES = [
  '/different%20wood/acacia%20wood.png',
  '/different%20wood/walnut%20wood.png',
  '/different%20wood/pine%20wood.png',
  '/different%20wood/paulownia%20wood.png',
  '/different%20wood/bamboo.png',
];
const KEEPSAKE_IMAGES = [
  '/pet/wooden-pet-fur-keepsake-slide-box/wooden-pet-fur-keepsake-slide-box-1.jpg',
  '/pet/mini-wooden-pet-memorial-box-vial/mini-wooden-pet-memorial-box-vial-1.jpg',
  '/pet/wooden-pet-memorial-shadow-box-cabinet/wooden-pet-memorial-shadow-box-cabinet-2.jpg',
];
const OTHER_IMAGES = [
  '/pet/bamboo-pet-treat-storage-canister-set/bamboo-pet-treat-storage-canister-set-1.jpg',
  '/pet/wooden-moon-small-pet-house/wooden-moon-small-pet-house-1.jpg',
  '/pet/wooden-bat-house/wooden-bat-house-1.jpg',
];

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'landing.petUrns' });
  const description = t('metaDesc');
  const ogTitle = t('ogTitle');
  return {
    // absolute → skip the root layout's brand-suffix title template.
    title: { absolute: t('metaTitle') },
    description,
    alternates: { canonical: canonicalFor(locale, `/${SLUG}`), languages: hreflangFor(SITE.siteUrl, `/${SLUG}`) },
    openGraph: {
      type: 'website', url: `${SITE.siteUrl}/${SLUG}`, title: ogTitle, description,
      images: [{ url: HERO_IMAGE, width: 1200, height: 800, alt: ogTitle }], siteName: SITE.company.brand,
    },
    twitter: { card: 'summary_large_image', title: ogTitle, description },
  };
}

export default function Page({ params }) {
  unstable_setRequestLocale(params.locale);
  const t = useTranslations('landing.petUrns');

  const STATS   = [1, 2, 3, 4].map(i => ({ value: t(`stat${i}Value`), label: t(`stat${i}Label`) }));
  const SEGMENTS= [1, 2, 3, 4].map(i => ({ title: t(`seg${i}Title`), body: t(`seg${i}Body`) }));
  const SIZES   = [1, 2, 3, 4, 5].map(i => [1, 2, 3, 4].map(j => t(`size${i}c${j}`)));
  const FORMATS = [1, 2, 3, 4, 5, 6, 7, 8].map(i => ({
    name: t(`fmt${i}Name`), body: t(`fmt${i}Body`),
    image: FORMAT_IMAGES[i - 1], href: FORMAT_HREFS[i - 1],
  }));
  const CLOSURES= [1, 2, 3].map(i => ({ title: t(`clos${i}Title`), body: t(`clos${i}Body`) }));
  const MATERIALS=[1, 2, 3, 4, 5].map(i => ({ name: t(`mat${i}Name`), body: t(`mat${i}Body`), image: MATERIAL_IMAGES[i - 1] }));
  const PERS    = [1, 2, 3, 4].map(i => ({ title: t(`pers${i}Title`), body: t(`pers${i}Body`) }));
  const KEEPS   = [1, 2, 3].map(i => ({ title: t(`keep${i}Title`), body: t(`keep${i}Body`), image: KEEPSAKE_IMAGES[i - 1] }));
  const OTHERS  = [1, 2, 3].map(i => ({ title: t(`other${i}Title`), body: t(`other${i}Body`), image: OTHER_IMAGES[i - 1] }));
  const COMS    = [1, 2, 3, 4, 5].map(i => [1, 2, 3, 4].map(j => t(`com${i}c${j}`)));
  const PROCESS = [1, 2, 3, 4, 5].map(i => ({ title: t(`proc${i}Title`), body: t(`proc${i}Body`) }));
  const QUALITY = [1, 2, 3, 4].map(i => ({ title: t(`qual${i}Title`), body: t(`qual${i}Body`) }));
  const FAQS    = Array.from({ length: 10 }, (_, i) => ({ q: t(`faq${i + 1}Q`), a: t(`faq${i + 1}A`) }));
  const RELATED = [
    { label: t('relProd1'), href: '/products/pet-urns' },
    { label: t('relProd2'), href: '/products/pet-products' },
    { label: t('relBlog1'), href: '/blog/how-to-choose-wood-pet-memorial-boxes-urns' },
    { label: t('relBlog2'), href: '/blog/wooden-keepsake-boxes-wholesale-guide' },
  ];

  const breadcrumbLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: t('breadcrumb'), item: `${SITE.siteUrl}/${SLUG}` },
    ],
  };
  const faqLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  const serviceLd = buildServiceLd({
    slug: SLUG, serviceType: 'Wooden Pet Urn & Memorial Product Manufacturing',
    name: t('ogTitle'), description: t('metaDesc'), locale: params.locale,
    offerItems: FORMATS.map(x => ({ name: x.name, description: x.body })),
  });
  const itemListLd = {
    '@context': 'https://schema.org', '@type': 'ItemList',
    name: t('fmtTitle'),
    itemListElement: FORMATS.map((f, i) => ({
      '@type': 'ListItem', position: i + 1, name: f.name, url: `${SITE.siteUrl}${f.href}`,
    })),
  };

  const Eyebrow = ({ children }) => (
    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{children}</p>
  );

  return (
    <article className="bg-white">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={faqLd} />
      <JsonLd data={serviceLd} />
      <JsonLd data={itemListLd} />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <header className="bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <nav className="text-xs text-brand-mute mb-4">
            <Link href="/" className="hover:text-brand-green">Home</Link>{' / '}
            <Link href="/products/pet-products" className="hover:text-brand-green">Pet Products</Link>{' / '}
            <span className="text-brand-ink">{t('breadcrumb')}</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">{t('heroKicker')}</p>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-brand-ink leading-[1.1]">
                {t('heroH1Pre')} <span className="text-brand-green">{t('heroH1Highlight')}</span> {t('heroH1Post')}
              </h1>
              <p className="mt-5 text-brand-mute leading-relaxed">{t('heroLead')}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/contact" className="rounded-full bg-brand-green text-white px-7 py-3 text-sm font-bold hover:bg-brand-greenDark transition">
                  {t('heroCta')}
                </Link>
                <Link href="/products/pet-products" className="rounded-full border border-brand-green text-brand-green px-7 py-3 text-sm font-bold hover:bg-white transition">
                  {t('heroCta2')}
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image src={HERO_IMAGE} alt={t('ogTitle')} fill sizes="(max-width: 1024px) 100vw, 560px" className="object-cover" priority />
            </div>
          </div>
          <dl className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 border-t border-brand-line pt-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="text-2xl font-extrabold text-brand-green">{s.value}</dt>
                <dd className="mt-1 text-xs text-brand-mute leading-snug">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* ── Who we supply ────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <Eyebrow>{t('segEyebrow')}</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-ink tracking-tight">{t('segTitle')}</h2>
          <p className="mt-4 max-w-3xl text-brand-mute leading-relaxed">{t('segLead')}</p>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {SEGMENTS.map((s) => (
              <div key={s.title} className="rounded-2xl border border-brand-line p-6 bg-brand-cream/40">
                <h3 className="font-bold text-brand-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-brand-mute leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capacity sizing chart ────────────────────────────────────── */}
      <section className="bg-brand-cream border-y border-brand-line">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <Eyebrow>{t('sizeEyebrow')}</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-ink tracking-tight">{t('sizeTitle')}</h2>
          <p className="mt-4 max-w-3xl text-brand-mute leading-relaxed">{t('sizeLead')}</p>
          <p className="mt-3 max-w-3xl text-brand-mute leading-relaxed">{t('sizeLead2')}</p>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-brand-line bg-white">
            <table className="w-full text-sm min-w-[720px]">
              <thead className="bg-brand-greenDeep text-white">
                <tr>
                  <th className="text-left font-semibold px-4 py-3">{t('sizeCol1')}</th>
                  <th className="text-left font-semibold px-4 py-3">{t('sizeCol2')}</th>
                  <th className="text-left font-semibold px-4 py-3">{t('sizeCol3')}</th>
                  <th className="text-left font-semibold px-4 py-3">{t('sizeCol4')}</th>
                </tr>
              </thead>
              <tbody>
                {SIZES.map((r, i) => (
                  <tr key={r[0]} className={i % 2 ? 'bg-brand-cream/40' : ''}>
                    {r.map((c, j) => (
                      <td key={j} className={`px-4 py-3 align-top ${j === 0 ? 'font-semibold text-brand-ink' : 'text-brand-mute'}`}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 max-w-3xl text-sm text-brand-mute leading-relaxed">{t('sizeNote')}</p>
        </div>
      </section>

      {/* ── Formats ──────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <Eyebrow>{t('fmtEyebrow')}</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-ink tracking-tight">{t('fmtTitle')}</h2>
          <p className="mt-4 max-w-3xl text-brand-mute leading-relaxed">{t('fmtLead')}</p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FORMATS.map((f) => (
              <Link key={f.name} href={f.href} className="group rounded-2xl border border-brand-line overflow-hidden hover:shadow-lg transition">
                <div className="relative aspect-square bg-brand-cream">
                  <Image src={f.image} alt={f.name} fill sizes="(max-width: 640px) 100vw, 280px" className="object-cover group-hover:scale-[1.03] transition-transform duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-brand-ink text-sm group-hover:text-brand-green">{f.name}</h3>
                  <p className="mt-2 text-xs text-brand-mute leading-relaxed">{f.body}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closure engineering ──────────────────────────────────────── */}
      <section className="bg-brand-cream border-y border-brand-line">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <Eyebrow>{t('closEyebrow')}</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-ink tracking-tight">{t('closTitle')}</h2>
          <p className="mt-4 max-w-3xl text-brand-mute leading-relaxed">{t('closLead')}</p>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {CLOSURES.map((c, i) => (
              <div key={c.title} className="rounded-2xl bg-white border border-brand-line p-6">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-white text-sm font-bold">{i + 1}</span>
                <h3 className="mt-4 font-bold text-brand-ink">{c.title}</h3>
                <p className="mt-2 text-sm text-brand-mute leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm text-brand-mute leading-relaxed border-l-2 border-brand-green pl-4">{t('closNote')}</p>
        </div>
      </section>

      {/* ── Materials ────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <Eyebrow>{t('matEyebrow')}</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-ink tracking-tight">{t('matTitle')}</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {MATERIALS.map((m) => (
              <div key={m.name} className="rounded-2xl border border-brand-line overflow-hidden">
                <div className="relative aspect-[4/3] bg-brand-cream">
                  <Image src={m.image} alt={m.name} fill sizes="(max-width: 640px) 100vw, 220px" className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-brand-ink text-sm">{m.name}</h3>
                  <p className="mt-2 text-xs text-brand-mute leading-relaxed">{m.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Personalisation ──────────────────────────────────────────── */}
      <section className="bg-brand-cream border-y border-brand-line">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <Eyebrow>{t('persEyebrow')}</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-ink tracking-tight">{t('persTitle')}</h2>
          <p className="mt-4 max-w-3xl text-brand-mute leading-relaxed">{t('persLead')}</p>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {PERS.map((p) => (
              <div key={p.title} className="rounded-2xl bg-white border border-brand-line p-6">
                <h3 className="font-bold text-brand-ink">{p.title}</h3>
                <p className="mt-2 text-sm text-brand-mute leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm text-brand-mute leading-relaxed">{t('persPhoto')}</p>
          <p className="mt-4 max-w-3xl text-sm text-brand-mute leading-relaxed border-l-2 border-brand-green pl-4">{t('persNote')}</p>
        </div>
      </section>

      {/* ── Keepsakes ────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <Eyebrow>{t('keepEyebrow')}</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-ink tracking-tight">{t('keepTitle')}</h2>
          <p className="mt-4 max-w-3xl text-brand-mute leading-relaxed">{t('keepLead')}</p>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {KEEPS.map((k) => (
              <div key={k.title} className="rounded-2xl border border-brand-line overflow-hidden">
                <div className="relative aspect-[4/3] bg-brand-cream">
                  <Image src={k.image} alt={k.title} fill sizes="(max-width: 768px) 100vw, 360px" className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-brand-ink text-sm">{k.title}</h3>
                  <p className="mt-2 text-xs text-brand-mute leading-relaxed">{k.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other pet lines ──────────────────────────────────────────── */}
      <section className="bg-brand-cream border-y border-brand-line">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <Eyebrow>{t('otherEyebrow')}</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-ink tracking-tight">{t('otherTitle')}</h2>
          <p className="mt-4 max-w-3xl text-brand-mute leading-relaxed">{t('otherLead')}</p>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {OTHERS.map((o) => (
              <div key={o.title} className="rounded-2xl bg-white border border-brand-line overflow-hidden">
                <div className="relative aspect-[4/3] bg-brand-cream">
                  <Image src={o.image} alt={o.title} fill sizes="(max-width: 768px) 100vw, 360px" className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-brand-ink text-sm">{o.title}</h3>
                  <p className="mt-2 text-xs text-brand-mute leading-relaxed">{o.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Commercials ──────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <Eyebrow>{t('comEyebrow')}</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-ink tracking-tight">{t('comTitle')}</h2>
          <p className="mt-4 max-w-3xl text-brand-mute leading-relaxed">{t('comLead')}</p>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-brand-line">
            <table className="w-full text-sm min-w-[720px]">
              <thead className="bg-brand-greenDeep text-white">
                <tr>
                  <th className="text-left font-semibold px-4 py-3">{t('comCol1')}</th>
                  <th className="text-left font-semibold px-4 py-3">{t('comCol2')}</th>
                  <th className="text-left font-semibold px-4 py-3">{t('comCol3')}</th>
                  <th className="text-left font-semibold px-4 py-3">{t('comCol4')}</th>
                </tr>
              </thead>
              <tbody>
                {COMS.map((r, i) => (
                  <tr key={r[0]} className={i % 2 ? 'bg-brand-cream/40' : ''}>
                    {r.map((c, j) => (
                      <td key={j} className={`px-4 py-3 align-top ${j === 0 ? 'font-semibold text-brand-ink' : 'text-brand-mute'}`}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 max-w-3xl text-sm text-brand-mute leading-relaxed">{t('comNote')}</p>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────────── */}
      <section className="bg-brand-cream border-y border-brand-line">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <Eyebrow>{t('procEyebrow')}</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-ink tracking-tight">{t('procTitle')}</h2>
          <ol className="mt-10 grid md:grid-cols-5 gap-5">
            {PROCESS.map((p, i) => (
              <li key={p.title} className="rounded-2xl bg-white border border-brand-line p-5">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-white text-sm font-bold">{i + 1}</span>
                <h3 className="mt-4 font-bold text-brand-ink text-sm">{p.title}</h3>
                <p className="mt-2 text-xs text-brand-mute leading-relaxed">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Quality ──────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <Eyebrow>{t('qualEyebrow')}</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-ink tracking-tight">{t('qualTitle')}</h2>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {QUALITY.map((q) => (
              <div key={q.title} className="rounded-2xl border border-brand-line p-6 bg-brand-cream/40">
                <h3 className="font-bold text-brand-ink">{q.title}</h3>
                <p className="mt-2 text-sm text-brand-mute leading-relaxed">{q.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="bg-brand-cream border-y border-brand-line">
        <div className="max-w-[900px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-ink tracking-tight">{t('fmtEyebrow')} &amp; sourcing questions</h2>
          <div className="mt-8 divide-y divide-brand-line rounded-2xl bg-white border border-brand-line">
            {FAQS.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="cursor-pointer list-none font-semibold text-brand-ink flex justify-between gap-4">
                  {f.q}
                  <span className="text-brand-green shrink-0 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm text-brand-mute leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related + CTA ────────────────────────────────────────────── */}
      {/* Customer proof. The full 6-case grid lives on /about; these two
          are the pair most relevant to this page's buyer. */}
      <ProofStrip cases={[6, 1]} />

      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-mute">{t('relTitle')}</h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {RELATED.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="text-brand-green hover:underline font-semibold">{r.label} →</Link>
              </li>
            ))}
          </ul>
          <div className="mt-12 rounded-2xl bg-brand-greenDeep text-white p-8 lg:p-12">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{t('ctaTitle')}</h2>
            <p className="mt-4 max-w-2xl text-white/75 leading-relaxed">{t('ctaBody')}</p>
            <Link href="/contact" className="mt-7 inline-flex rounded-full bg-white text-brand-green px-8 py-3 text-sm font-bold hover:bg-brand-cream transition">
              {t('ctaButton')}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
