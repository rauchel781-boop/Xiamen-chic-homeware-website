// Timeline — company milestones in a vertical layout.
// 5 milestones rendered as alternating cards along a center spine on
// desktop, stacked left-aligned on mobile. Year + title + body each
// from the `timeline` i18n namespace so this works in all 5 locales.

import { useTranslations } from 'next-intl';

export default function Timeline() {
  const t = useTranslations('timeline');

  const MILESTONES = [1, 2, 3, 4, 5].map((i) => ({
    year:  t(`m${i}Year`),
    title: t(`m${i}Title`),
    body:  t(`m${i}Body`),
  }));

  return (
    <section className="bg-brand-cream py-20 lg:py-28 border-b border-brand-line">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            {t('eyebrow')}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
            {t('title')}
          </h2>
          <p className="mt-5 text-brand-mute leading-relaxed text-[16px]">
            {t('intro')}
          </p>
        </div>

        {/* Vertical timeline. The spine is the absolutely-positioned
            green vertical line; cards alternate sides on desktop and
            stack on mobile. */}
        <div className="relative">
          {/* Spine */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-brand-green/30 lg:-translate-x-1/2" aria-hidden="true" />

          <ol className="space-y-10 lg:space-y-14">
            {MILESTONES.map((m, i) => {
              const isRight = i % 2 === 1; // desktop: even on left, odd on right
              return (
                <li key={i} className="relative pl-12 lg:pl-0">
                  {/* Dot on the spine */}
                  <span
                    className="absolute left-4 top-2 w-3 h-3 rounded-full bg-brand-green ring-4 ring-brand-cream lg:left-1/2 lg:-translate-x-1/2"
                    aria-hidden="true"
                  />
                  <div
                    className={`lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start ${
                      isRight ? 'lg:[&>*:first-child]:col-start-2' : ''
                    }`}
                  >
                    <div className={`bg-white rounded-2xl border border-brand-line p-6 lg:p-7 hover:border-brand-green/40 hover:shadow-md transition ${
                      isRight ? '' : 'lg:text-right'
                    }`}>
                      <p className="text-2xl lg:text-3xl font-extrabold tracking-tight text-brand-green leading-none mb-2">
                        {m.year}
                      </p>
                      <h3 className="text-lg font-extrabold text-brand-ink mb-3 leading-snug">
                        {m.title}
                      </h3>
                      <p className="text-[15px] text-brand-ink/85 leading-relaxed">
                        {m.body}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}

            {/* "Today" marker at the end */}
            <li className="relative pl-12 lg:pl-0">
              <span
                className="absolute left-4 top-2 w-4 h-4 rounded-full bg-brand-wood ring-4 ring-brand-cream lg:left-1/2 lg:-translate-x-1/2"
                aria-hidden="true"
              />
              <div className="lg:text-center">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-wood text-brand-ink text-[11px] font-bold uppercase tracking-wider">
                  {t('todayLabel')}
                </span>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
