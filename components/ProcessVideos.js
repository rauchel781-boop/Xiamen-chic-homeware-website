// ProcessVideos — embeds short YouTube clips from the CHIC factory floor.
//
// Lazy-loaded iframes from youtube-nocookie.com so:
//   - No GDPR cookies are set unless the user actually presses play
//   - LCP / first paint is not blocked
//   - Videos load only when scrolled into view (loading="lazy")
//
// Each video is also declared as a Schema.org VideoObject so Google
// can surface it as a Video rich result on the page.

import { useTranslations } from 'next-intl';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';
import { schemaLang } from '@/i18n/seo';

// YouTube video IDs (Shorts are 9:16 vertical clips)
const VIDEOS = [
  { id: 'pQSoQqJqttg', titleKey: 'v1Title' },
  { id: 'qmEDFI5IFDk', titleKey: 'v2Title' },
  { id: 'bEHuk8sLksc', titleKey: 'v3Title' },
];

export default function ProcessVideos({ locale }) {
  const t = useTranslations('processVideos');

  // VideoObject schema for each clip
  const videoLds = VIDEOS.map((v) => ({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: t(v.titleKey),
    description: `${t('title')} — ${t(v.titleKey)} at CHIC's wooden products factory in Cao County, Shandong, China.`,
    thumbnailUrl: [`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`],
    contentUrl: `https://www.youtube.com/shorts/${v.id}`,
    embedUrl:   `https://www.youtube-nocookie.com/embed/${v.id}`,
    uploadDate: '2026-04-01',
    publisher: { '@id': `${SITE.siteUrl}/#organization` },
    inLanguage: schemaLang(locale || 'en'),
  }));

  return (
    <section className="bg-white py-20 lg:py-24 border-b border-brand-line">
      {videoLds.map((ld, i) => <JsonLd key={i} data={ld} />)}

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            {t('eyebrow')}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
            {t('title')}
          </h2>
          <p className="mt-4 text-brand-mute leading-relaxed text-[16px]">
            {t('intro')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {VIDEOS.map((v) => (
            <article
              key={v.id}
              className="bg-brand-cream rounded-2xl border border-brand-line overflow-hidden hover:border-brand-green/40 hover:shadow-md transition"
            >
              {/* 9:16 vertical container for Shorts. YouTube serves them
                  natively in this aspect, so no letter-boxing inside. */}
              <div className="relative aspect-[9/16] bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1`}
                  title={t(v.titleKey)}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="p-5">
                <h3 className="text-[15px] font-bold text-brand-ink leading-snug">
                  {t(v.titleKey)}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
