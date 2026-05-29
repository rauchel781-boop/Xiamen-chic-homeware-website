// Industry Brief — homepage section for weekly factory-side market notes.
// Filters posts by the "industry-brief" category, shows the latest 3 in a
// 3-column grid with a "NEW" badge on posts published in the last 14 days.
//
// Sits ABOVE BlogPreview on the homepage because briefs are fresher and
// more time-sensitive than evergreen guides.

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { wpPosts, stripHtml } from '@/lib/wp-data';

const CATEGORY_SLUG = 'industry-brief';
const NEW_BADGE_DAYS = 14;

export default function IndustryBrief() {
  const t = useTranslations('home.industryBrief');

  // Filter posts in the industry-brief category, newest first, take 3.
  const briefs = wpPosts()
    .filter((p) => p.categories?.some((c) => c.slug === CATEGORY_SLUG))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  // Don't render if there's nothing to show yet.
  if (briefs.length === 0) return null;

  return (
    <section className="bg-brand-cream py-20 lg:py-24 border-b border-brand-line">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 text-red-700 text-[11px] font-bold uppercase tracking-[0.15em] px-3 py-1 ring-1 ring-red-200">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                </span>
                {t('badge')}
              </span>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-mute">
                {t('eyebrow')}
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
              {t('titlePre')}{' '}
              <span className="text-brand-green">{t('titleHighlight')}</span>
            </h2>
            <p className="mt-3 text-brand-mute leading-relaxed">{t('intro')}</p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center text-sm font-semibold text-brand-green hover:text-brand-greenDark"
          >
            {t('allBriefs')} →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {briefs.map((p) => {
            const isNew =
              (Date.now() - new Date(p.date).getTime()) /
                (1000 * 60 * 60 * 24) <=
              NEW_BADGE_DAYS;
            return (
              <BriefCard
                key={p.id}
                post={p}
                isNew={isNew}
                newLabel={t('newLabel')}
                readLabel={t('readBrief')}
              />
            );
          })}
        </div>

        <div className="mt-10 sm:hidden flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition"
          >
            {t('allBriefs')} →
          </Link>
        </div>
      </div>
    </section>
  );
}

function BriefCard({ post: p, isNew, newLabel, readLabel }) {
  return (
    <Link
      href={`/blog/${p.slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-brand-line hover:shadow-md hover:border-brand-green/40 transition flex flex-col"
    >
      <div className="relative aspect-[16/10] bg-brand-cream overflow-hidden">
        {p.featured_image && (
          <Image
            src={p.featured_image}
            alt={stripHtml(p.title)}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition duration-500"
          />
        )}
        {isNew && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-[0.12em] px-2.5 py-1 shadow-sm">
            <span className="h-1 w-1 rounded-full bg-white animate-pulse"></span>
            {newLabel}
          </span>
        )}
      </div>
      <div className="p-5 lg:p-6 flex-1 flex flex-col">
        <div className="text-[11px] uppercase tracking-wider text-brand-mute mb-2">
          {new Date(p.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
        <h3
          className="text-base lg:text-[17px] font-extrabold text-brand-ink group-hover:text-brand-green transition leading-snug line-clamp-3"
          dangerouslySetInnerHTML={{ __html: p.title }}
        />
        {p.excerpt && (
          <p className="mt-3 text-sm text-brand-mute leading-relaxed line-clamp-3">
            {stripHtml(p.excerpt)}
          </p>
        )}
        <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand-green group-hover:text-brand-greenDark">
          {readLabel} →
        </span>
      </div>
    </Link>
  );
}
