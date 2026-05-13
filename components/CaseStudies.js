// CaseStudies — long-term partnership social proof.
//
// Renders 6 anonymized case studies (US/UK/DE/CA/JP/AU) as a 2-column
// card grid. Each case shows: country flag + name, industry, partnership
// duration, products, annual volume, narrative story, customer quote.
//
// Goal: pass the E-E-A-T Authoritativeness signal that the original
// audit flagged as completely absent. Specific-but-anonymized cases
// are more credible than vague "trusted by global brands" copy.

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function CaseStudies() {
  const t = useTranslations('cases');

  // Indices 1..6 — every case has the same set of fields.
  const CASES = [1, 2, 3, 4, 5, 6].map((i) => ({
    flag:     t(`case${i}Flag`),
    country:  t(`case${i}Country`),
    industry: t(`case${i}Industry`),
    years:    t(`case${i}Years`),
    products: t(`case${i}Products`),
    volume:   t(`case${i}Volume`),
    story:    t(`case${i}Story`),
    quote:    t(`case${i}Quote`),
  }));

  return (
    <section className="bg-white py-20 lg:py-24 border-b border-brand-line">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
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

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {CASES.map((c, i) => (
            <article
              key={i}
              className="relative bg-brand-cream rounded-2xl border border-brand-line p-7 lg:p-8 hover:border-brand-green/40 hover:shadow-md transition flex flex-col"
            >
              {/* Header — country + industry */}
              <div className="flex items-start gap-4 mb-4">
                <span className="text-3xl leading-none" aria-hidden="true">{c.flag}</span>
                <div>
                  <h3 className="text-lg font-extrabold text-brand-ink leading-tight">
                    {c.country}
                  </h3>
                  <p className="text-sm text-brand-mute mt-0.5 leading-snug">
                    {c.industry}
                  </p>
                </div>
              </div>

              {/* Years chip */}
              <div className="inline-flex items-center self-start px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-[11px] font-bold tracking-wider uppercase mb-5">
                {c.years}
              </div>

              {/* Fact pairs */}
              <dl className="space-y-3 text-sm mb-5">
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-brand-mute font-semibold">
                    {t('productsLabel')}
                  </dt>
                  <dd className="text-brand-ink leading-snug mt-0.5">{c.products}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-brand-mute font-semibold">
                    {t('volumeLabel')}
                  </dt>
                  <dd className="text-brand-ink leading-snug mt-0.5">{c.volume}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-brand-mute font-semibold">
                    {t('highlightsLabel')}
                  </dt>
                  <dd className="text-brand-ink/85 leading-relaxed mt-1">{c.story}</dd>
                </div>
              </dl>

              {/* Quote — pushed to bottom of card */}
              <blockquote className="mt-auto pt-5 border-t border-brand-line">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-brand-green/30 mb-2"
                  aria-hidden="true"
                >
                  <path d="M9.583 5C5.93 5 3 7.93 3 11.583v4.834A2.583 2.583 0 005.583 19h2.834A2.583 2.583 0 0011 16.417v-2.834A2.583 2.583 0 008.417 11H7c0-2.21 1.79-4 4-4V5h-1.417zm9 0C15.93 5 13 7.93 13 11.583v4.834A2.583 2.583 0 0015.583 19h2.834A2.583 2.583 0 0021 16.417v-2.834A2.583 2.583 0 0018.417 11H17c0-2.21 1.79-4 4-4V5h-2.417z" />
                </svg>
                <p className="text-[15px] text-brand-ink italic leading-relaxed">
                  &ldquo;{c.quote}&rdquo;
                </p>
              </blockquote>
            </article>
          ))}
        </div>

        {/* CTA band */}
        <div className="mt-14 bg-brand-green text-white rounded-2xl px-6 py-10 lg:px-12 lg:py-12">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-extrabold leading-tight">
                {t('ctaTitle')}
              </h3>
              <p className="mt-3 text-white/85 leading-relaxed max-w-2xl">
                {t('ctaBody')}
              </p>
            </div>
            <div className="lg:justify-self-end">
              <Link
                href="/contact#form"
                className="inline-flex items-center rounded-full bg-brand-wood px-7 py-3 text-[15px] font-semibold text-brand-ink hover:bg-brand-woodSoft transition"
              >
                {t('ctaButton')}
              </Link>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-xs text-brand-mute italic text-center max-w-3xl mx-auto leading-relaxed">
          {t('disclaimer')}
        </p>
      </div>
    </section>
  );
}
