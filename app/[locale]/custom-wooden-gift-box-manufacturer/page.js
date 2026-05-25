// /custom-wooden-gift-box-manufacturer — hand-coded SEO landing page.
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { buildServiceLd } from '@/lib/service-schema';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';
import { hreflangFor, canonicalFor } from '@/i18n/routing';

const SLUG = 'custom-wooden-gift-box-manufacturer';
const HERO_IMAGE = '/wp-images/2026/02/wooden-gift-box-.jpg';

const MATERIAL_IMAGES = [
  '/different%20wood/acacia%20wood.png',
  '/different%20wood/walnut%20wood.png',
  '/different%20wood/bamboo.png',
  '/different%20wood/pine%20wood.png',
];
const GALLERY_IMAGES = [
  '/wp-images/2026/02/wooden-gift-box-.jpg',
  '/wp-images/2026/02/wooden-drawer-gift-box.jpg',
  '/wp-images/2026/02/dark-color-chocolate-box-2.jpg',
  '/wp-images/2026/02/drawer-chocolate-box-1.jpg',
  '/wp-images/2026/01/Walnut-Wood-Cufflink-Box-2.png',
  '/wp-images/2026/01/Keepsake-Chest-box-2.png',
  '/wp-images/2026/03/Keepsake-Box-2.png',
  '/wp-images/2026/04/Custom-Unfinished-Wooden-Boxes-Wholesale-Linen-Lined-Wooden-Gift-Storage-Box-with-Decorative-Cut-Lid-2.jpg',
];

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'landing.giftBox' });
  const description = t('metaDesc');
  const ogTitle = t('ogTitle');
  return {
    title: t('metaTitle'),
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
  const t = useTranslations('landing.giftBox');
  const tCta = useTranslations('cta');

  const MATERIALS = MATERIAL_IMAGES.map((image, i) => ({
    name: t(`mat${i + 1}Name`), label: t(`mat${i + 1}Label`), body: t(`mat${i + 1}Body`), image,
  }));
  const GALLERY = GALLERY_IMAGES.map((image, i) => ({ image, alt: t(`galleryAlt${i + 1}`) }));
  const LIDS = [1, 2, 3, 4].map(i => ({ type: t(`lid${i}Type`), feel: t(`lid${i}Feel`), best: t(`lid${i}Best`), cost: t(`lid${i}Cost`) }));
  const BRANDING = [1, 2, 3, 4, 5].map(i => ({ method: t(`brand${i}Method`), effect: t(`brand${i}Effect`), color: t(`brand${i}Color`), best: t(`brand${i}Best`) }));
  const LASER = [
    { title: t('eff1Title'), body: t('eff1Body'), image: '/logo/laser-logo-bamboo.png' },
    { title: t('eff2Title'), body: t('eff2Body'), image: '/logo/laser-logo-acacia.jpg' },
    { title: t('eff3Title'), body: t('eff3Body'), image: '/logo/laser-logo-paulownia.png' },
    { title: t('eff4Title'), body: t('eff4Body'), image: '/logo/laser-logo-dark-wood.png' },
  ];
  const INSERTS = [
    { title: t('insert1Title'), body: t('insert1Body') },
    { title: t('insert2Title'), body: t('insert2Body') },
    { title: t('insert3Title'), body: t('insert3Body') },
  ];
  const COSTS = [1, 2, 3, 4, 5].map(i => ({ title: t(`cost${i}Title`), body: t(`cost${i}Body`) }));
  const CUSTOMIZATION = [
    { title: t('custom1Title'), body: t('custom1Body') },
    { title: t('custom2Title'), body: t('custom2Body') },
    { title: t('custom3Title'), body: t('custom3Body') },
  ];
  const SPECS = [1, 2, 3, 4, 5, 6, 7, 8].map(i => ({ label: t(`spec${i}Label`), value: t(`spec${i}Value`) }));
  const PROCESS = [1, 2, 3, 4].map(i => ({ title: t(`step${i}Title`), body: t(`step${i}Body`) }));
  const OCCASIONS = [1, 2, 3, 4].map(i => ({ title: t(`ind${i}Title`), body: t(`ind${i}Body`) }));
  const RELATED = [
    { label: t('relProd1'), href: '/products/wooden-gift-box-wholesale' },
    { label: t('relProd2'), href: '/products/premium-magnetic-wooden-chocolate-gift-box' },
    { label: t('relBlog1'), href: '/blog/custom-wooden-gift-boxes-wholesale-guide' },
    { label: t('relBlog2'), href: '/blog/wooden-gift-box-manufacturing-guide' },
  ];
  const FAQS = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => ({ q: t(`faq${i}Q`), a: t(`faq${i}A`) }));
  const BREADCRUMB = [{ name: 'Home', url: '/' }, { name: t('breadcrumb') }];

  const breadcrumbLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: BREADCRUMB.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url ? `${SITE.siteUrl}${c.url}` : `${SITE.siteUrl}/${SLUG}` })),
  };
  const faqLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  const serviceLd = buildServiceLd({
    slug: SLUG, serviceType: 'Custom Wooden Gift Box Manufacturing',
    name: t('ogTitle'), description: t('metaDesc'), locale: params.locale,
    offerItems: LIDS.map(l => ({ name: l.type, description: l.best })),
  });

  const Eyebrow = ({ children }) => (
    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">{children}</p>
  );

  return (
    <article className="bg-white">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={faqLd} />
      <JsonLd data={serviceLd} />

      <header className="bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <nav className="text-xs text-brand-mute mb-4">
            <Link href="/" className="hover:text-brand-green">Home</Link>{' / '}
            <span className="text-brand-ink">{t('breadcrumb')}</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">{t('heroKicker')}</p>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-brand-ink leading-[1.1]">
                {t('heroH1Pre')} <span className="text-brand-green">{t('heroH1Highlight')}</span> {t('heroH1Post')}
              </h1>
              <p className="mt-5 text-brand-mute leading-relaxed text-[17px] max-w-xl">{t('heroLead')}</p>
              <ul className="mt-6 grid sm:grid-cols-3 gap-3">
                {[t('heroBadge1'), t('heroBadge2'), t('heroBadge3')].map(b => (
                  <li key={b} className="flex items-center gap-2 bg-white border border-brand-line rounded-full px-4 py-2 text-sm font-semibold text-brand-ink">
                    <span className="w-2 h-2 rounded-full bg-brand-green" />{b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact#form" className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition">{t('ctaPrice')}</Link>
                <Link href="/products" className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition">{t('ctaBrowse')}</Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] bg-white rounded-2xl overflow-hidden border border-brand-line shadow-sm">
              <Image src={HERO_IMAGE} alt={t('ogTitle')} fill sizes="(max-width: 1024px) 100vw, 600px" priority fetchPriority="high" className="object-cover" />
            </div>
          </div>
        </div>
      </header>

      {/* OVERVIEW */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[820px] mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-ink leading-tight mb-4">{t('introTitle')}</h2>
          <p className="text-brand-mute leading-relaxed text-[16px] mb-3">{t('introBody1')}</p>
          <p className="text-brand-mute leading-relaxed text-[16px] mb-3">{t('introBody2')}</p>
          <p className="text-brand-mute leading-relaxed text-[16px]">{t('introBody3')}</p>
        </div>
      </section>

      {/* LID MECHANISM COMPARISON */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[960px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-12">
            <Eyebrow>{t('lidEyebrow')}</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('lidTitle')}</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">{t('lidIntro')}</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-brand-line bg-white">
            <table className="w-full text-left text-[14px] min-w-[640px]">
              <thead>
                <tr className="bg-brand-green/10 text-brand-ink">
                  <th className="py-3 px-5 font-bold">{t('lidColType')}</th>
                  <th className="py-3 px-5 font-bold">{t('lidColFeel')}</th>
                  <th className="py-3 px-5 font-bold">{t('lidColBest')}</th>
                  <th className="py-3 px-5 font-bold">{t('lidColCost')}</th>
                </tr>
              </thead>
              <tbody>
                {LIDS.map((l, i) => (
                  <tr key={l.type} className={i % 2 ? 'bg-brand-cream/40' : 'bg-white'}>
                    <th className="py-4 px-5 font-semibold text-brand-ink align-top border-t border-brand-line">{l.type}</th>
                    <td className="py-4 px-5 text-brand-mute align-top border-t border-brand-line">{l.feel}</td>
                    <td className="py-4 px-5 text-brand-mute align-top border-t border-brand-line">{l.best}</td>
                    <td className="py-4 px-5 text-brand-mute align-top border-t border-brand-line">{l.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* MATERIALS */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <Eyebrow>{t('materialsEyebrow')}</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('materialsTitle')}</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">{t('materialsIntro')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MATERIALS.map(m => (
              <article key={m.name} className="group bg-brand-cream rounded-2xl border border-brand-line overflow-hidden hover:border-brand-green/40 hover:shadow-lg transition flex flex-col">
                <div className="relative aspect-square bg-white overflow-hidden">
                  <Image src={m.image} alt={m.name} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover group-hover:scale-[1.03] transition duration-500" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green mb-1">{m.label}</p>
                  <h3 className="text-lg font-bold text-brand-ink mb-2">{m.name}</h3>
                  <p className="text-sm text-brand-mute leading-relaxed flex-1">{m.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* INSERTS & PRESENTATION */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <Eyebrow>{t('insertsEyebrow')}</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('insertsTitle')}</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">{t('insertsIntro')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {INSERTS.map((s, i) => (
              <article key={s.title} className="bg-white rounded-2xl border border-brand-line p-7 hover:border-brand-green/40 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mb-4 font-bold text-sm">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-lg font-bold text-brand-ink mb-2 leading-snug">{s.title}</h3>
                <p className="text-sm text-brand-mute leading-relaxed">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDING METHODS COMPARISON */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-12">
            <Eyebrow>{t('brandEyebrow')}</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('brandTitle')}</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">{t('brandIntro')}</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-brand-line bg-white">
            <table className="w-full text-left text-[14px] min-w-[680px]">
              <thead>
                <tr className="bg-brand-green/10 text-brand-ink">
                  <th className="py-3 px-5 font-bold">{t('brandColMethod')}</th>
                  <th className="py-3 px-5 font-bold">{t('brandColEffect')}</th>
                  <th className="py-3 px-5 font-bold">{t('brandColColor')}</th>
                  <th className="py-3 px-5 font-bold">{t('brandColBest')}</th>
                </tr>
              </thead>
              <tbody>
                {BRANDING.map((b, i) => (
                  <tr key={b.method} className={i % 2 ? 'bg-brand-cream/40' : 'bg-white'}>
                    <th className="py-4 px-5 font-semibold text-brand-ink align-top border-t border-brand-line">{b.method}</th>
                    <td className="py-4 px-5 text-brand-mute align-top border-t border-brand-line">{b.effect}</td>
                    <td className="py-4 px-5 text-brand-mute align-top border-t border-brand-line">{b.color}</td>
                    <td className="py-4 px-5 text-brand-mute align-top border-t border-brand-line">{b.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* LOGO EFFECTS */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-12">
            <Eyebrow>{t('effEyebrow')}</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('effTitle')}</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">{t('effIntro')}</p>
          </div>
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-brand-ink mb-2 leading-snug">{t('effLaserLabel')}</h3>
            <p className="text-brand-mute leading-relaxed text-[15px]">{t('effLaserNote')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {LASER.map(l => (
              <article key={l.title} className="bg-white rounded-2xl border border-brand-line overflow-hidden flex flex-col hover:border-brand-green/40 hover:shadow-md transition">
                <div className="relative aspect-[4/3] bg-brand-cream"><Image src={l.image} alt={l.title} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover" /></div>
                <div className="p-5 flex-1 flex flex-col">
                  <h4 className="text-base font-bold text-brand-ink mb-2">{l.title}</h4>
                  <p className="text-sm text-brand-mute leading-relaxed flex-1">{l.body}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center mb-6 bg-white rounded-2xl border border-brand-line p-6 lg:p-8">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-brand-cream border border-brand-line"><Image src="/logo/uv-printing.png" alt={t('effUvTitle')} fill sizes="(max-width: 1024px) 100vw, 480px" className="object-cover" /></div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-ink mb-2 leading-snug">{t('effUvTitle')}</h3>
              <p className="text-brand-mute leading-relaxed text-[15px]">{t('effUvBody')}</p>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center bg-white rounded-2xl border border-brand-line p-6 lg:p-8">
            <div className="lg:order-2 relative aspect-[4/3] rounded-xl overflow-hidden bg-brand-cream border border-brand-line"><Image src="/logo/gold-logo.jpg" alt={t('effGoldTitle')} fill sizes="(max-width: 1024px) 100vw, 480px" className="object-cover" /></div>
            <div className="lg:order-1">
              <h3 className="text-xl md:text-2xl font-bold text-brand-ink mb-2 leading-snug">{t('effGoldTitle')}</h3>
              <p className="text-brand-mute leading-relaxed text-[15px]">{t('effGoldBody')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT GALLERY */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <Eyebrow>{t('galleryEyebrow')}</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('galleryTitle')}</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">{t('galleryIntro')}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {GALLERY.map(g => (
              <div key={g.image} className="relative aspect-square rounded-2xl overflow-hidden border border-brand-line bg-white group">
                <Image src={g.image} alt={g.alt} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover group-hover:scale-[1.04] transition duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COST FACTORS */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <Eyebrow>{t('costEyebrow')}</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('costTitle')}</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">{t('costIntro')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {COSTS.map((c, i) => (
              <article key={c.title} className="bg-brand-cream rounded-2xl border border-brand-line p-5">
                <div className="text-3xl font-extrabold text-brand-green/30 mb-2">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-[15px] font-bold text-brand-ink mb-2 leading-snug">{c.title}</h3>
                <p className="text-sm text-brand-mute leading-relaxed">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMIZATION */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <Eyebrow>{t('customEyebrow')}</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('customTitle')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {CUSTOMIZATION.map((c, i) => (
              <article key={c.title} className="bg-white rounded-2xl border border-brand-line p-7 hover:border-brand-green/40 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mb-4 font-bold text-sm">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-lg font-bold text-brand-ink mb-2 leading-snug">{c.title}</h3>
                <p className="text-sm text-brand-mute leading-relaxed">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SPECS TABLE */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[860px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-10 lg:mb-12">
            <Eyebrow>{t('specsEyebrow')}</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('specsTitle')}</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">{t('specsIntro')}</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-brand-line bg-white">
            <table className="w-full text-left text-[15px]">
              <tbody>
                {SPECS.map((s, i) => (
                  <tr key={s.label} className={i % 2 ? 'bg-brand-cream/50' : 'bg-white'}>
                    <th className="py-4 px-5 font-semibold text-brand-ink align-top w-2/5 border-b border-brand-line">{s.label}</th>
                    <td className="py-4 px-5 text-brand-mute border-b border-brand-line">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <Eyebrow>{t('procEyebrow')}</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('procTitle')}</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">{t('procIntro')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS.map((p, i) => (
              <article key={p.title} className="bg-white rounded-2xl border border-brand-line p-6">
                <div className="text-3xl font-extrabold text-brand-green/30 mb-2">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-base font-bold text-brand-ink mb-2 leading-snug">{p.title}</h3>
                <p className="text-sm text-brand-mute leading-relaxed">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OCCASIONS */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <Eyebrow>{t('indEyebrow')}</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('indTitle')}</h2>
            <p className="mt-4 leading-relaxed text-[16px] text-brand-mute">{t('indIntro')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {OCCASIONS.map((n) => (
              <article key={n.title} className="bg-brand-cream rounded-2xl border border-brand-line p-6 hover:border-brand-green/40 hover:shadow-md transition">
                <h3 className="text-base font-bold text-brand-ink mb-2 leading-snug">{n.title}</h3>
                <p className="text-sm text-brand-mute leading-relaxed">{n.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="py-16 lg:py-20 bg-brand-cream border-t border-brand-line">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <Eyebrow>{t('relatedEyebrow')}</Eyebrow>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('relatedTitle')}</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {RELATED.map(r => (
              <Link key={r.href} href={r.href} className="flex items-center justify-between gap-4 bg-white border border-brand-line rounded-2xl px-6 py-5 hover:border-brand-green/40 hover:shadow-md transition">
                <span className="font-semibold text-brand-ink leading-snug">{r.label}</span>
                <span className="shrink-0 text-brand-green font-bold">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[820px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-10 lg:mb-14">
            <Eyebrow>{t('faqEyebrow')}</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-brand-ink">{t('faqTitle')}</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <details key={i} className="group bg-brand-cream rounded-2xl border border-brand-line hover:border-brand-green/40 transition overflow-hidden">
                <summary className="flex items-start justify-between cursor-pointer p-5 lg:p-6 gap-4 list-none">
                  <span className="font-semibold text-brand-ink leading-snug">{f.q}</span>
                  <span className="shrink-0 w-7 h-7 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center text-sm font-bold transition group-open:bg-brand-green group-open:text-white group-open:rotate-45">+</span>
                </summary>
                <div className="px-5 lg:px-6 pb-5 lg:pb-6 -mt-1 text-brand-mute leading-relaxed text-[15px]">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-green text-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-wood mb-3">{t('bottomCtaEyebrow')}</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">{t('bottomCtaTitle')}</h2>
              <p className="mt-4 text-white/85 leading-relaxed text-[16px] max-w-xl">{t('bottomCtaBody')}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/contact#form" className="inline-flex items-center rounded-full bg-brand-wood px-7 py-3 text-[15px] font-semibold text-brand-ink hover:bg-brand-woodSoft transition">{tCta('getFreeQuote')}</Link>
              <Link href="/products" className="inline-flex items-center rounded-full border-2 border-white px-7 py-3 text-[15px] font-semibold text-white hover:bg-white hover:text-brand-green transition">{t('ctaBrowse')}</Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
