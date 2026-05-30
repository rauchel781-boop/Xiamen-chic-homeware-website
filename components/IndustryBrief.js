// Industry Brief — homepage section. Filters posts in the "industry-brief"
// category (or type:'brief'), shows the latest 3 as number-first cards.
//
// Visual is deliberately different from BlogPreview:
//   · Dark "newsroom band" header
//   · Big number ★ in the card (not the featured image)
//   · Vol. number + week-of label
//   · NEW badge with pulse animation on briefs from the last 14 days
//   · Links to /briefs/[slug] (not /blog/[slug])

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { wpPosts } from '@/lib/wp-data';

const CATEGORY_SLUG = 'industry-brief';
const NEW_BADGE_DAYS = 14;

export default function IndustryBrief() {
  const t = useTranslations('home.industryBrief');

  const briefs = wpPosts()
    .filter(
      (p) =>
        p.type === 'brief' ||
        p.categories?.some((c) => c.slug === CATEGORY_SLUG)
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  if (briefs.length === 0) return null;

  return (
    <section className="bg-brand-ink text-white py-20 lg:py-24 relative overflow-hidden">
      {/* subtle background — diagonal stripes */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 12px)',
        }}
      />
      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500 text-white text-[11px] font-extrabold uppercase tracking-[0.15em] px-3 py-1">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                </span>
                {t('badge')}
              </span>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/60">
                {t('eyebrow')}
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.15]">
              {t('titlePre')}{' '}
              <span className="text-brand-green">{t('titleHighlight')}</span>
            </h2>
            <p className="mt-3 text-white/70 leading-relaxed">{t('intro')}</p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center text-sm font-semibold text-brand-green hover:text-white"
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
                t={t}
              />
            );
          })}
        </div>

        <div className="mt-10 sm:hidden flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-full border-2 border-brand-green bg-transparent px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition"
          >
            {t('allBriefs')} →
          </Link>
        </div>
      </div>
    </section>
  );
}

function BriefCard({ post: p, isNew, t }) {
  const volStr = String(p.briefNumber || '').padStart(2, '0');
  const bigNum = p.bigNumber?.value || '★';
  const bigLabel = p.bigNumber?.label || p.title;

  return (
    <Link
      href={`/briefs/${p.slug}`}
      className="group relative bg-white text-brand-ink rounded-2xl overflow-hidden border border-white/10 hover:shadow-2xl hover:scale-[1.01] transition flex flex-col"
    >
      {/* Top band — Vol number + NEW badge */}
      <div className="bg-brand-cream/60 px-5 py-3 flex items-center justify-between border-b border-brand-line">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-ink/70">
          {volStr ? `${t('vol')} ${volStr}` : t('eyebrow')}
        </span>
        {isNew && (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-600 text-white text-[9px] font-extrabold uppercase tracking-[0.15em] px-2 py-0.5">
            <span className="h-1 w-1 rounded-full bg-white animate-pulse" />
            {t('newLabel')}
          </span>
        )}
      </div>

      {/* Body — big number focus */}
      <div className="px-6 py-8 flex-1 flex flex-col items-center text-center">
        <div className="text-6xl lg:text-7xl font-black text-brand-green leading-none mb-3 group-hover:scale-110 transition">
          {bigNum}
        </div>
        <p className="text-sm font-semibold text-brand-ink leading-snug mb-1 line-clamp-2">
          {bigLabel}
        </p>
        {p.bigNumber?.context && (
          <p className="text-[11px] text-brand-mute leading-relaxed line-clamp-1">
            {p.bigNumber.context}
          </p>
        )}
      </div>

      {/* Bottom band — title + read time */}
      <div className="px-5 py-4 border-t border-brand-line bg-white">
        <h3
          className="text-[13px] font-bold text-brand-ink leading-snug line-clamp-2 mb-2 group-hover:text-brand-green transition"
          dangerouslySetInnerHTML={{ __html: p.title }}
        />
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-brand-mute">
            {p.weekOf || ''}
          </span>
          <span className="text-[11px] font-semibold text-brand-green">
            {p.readTime
              ? `${p.readTime} ${t('minRead')}`
              : t('readBrief')}{' '}
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
