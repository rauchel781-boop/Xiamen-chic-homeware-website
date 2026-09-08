// ProofStrip — compact customer-proof band for commercial landing pages.
//
// The full CaseStudies grid (6 cards) lived only on /about, so the pages that
// actually have to win commercial "manufacturer / wholesale" queries carried
// no social proof at all. This is a two-case condensed version meant to sit
// inside a landing page without dominating it.
//
// Each page passes a different `cases` pair so the same quote is not repeated
// across the whole site.
//
// Deliberately NO Review / aggregateRating JSON-LD: these case studies are
// anonymised (country + industry, no named reviewer), and Google requires a
// review to be attributable to an identifiable reviewer. Marking anonymised
// quotes up as Review risks a structured-data manual action. The semantic
// <blockquote> + <cite> is what parsers and AI crawlers read here.
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function ProofStrip({ cases = [1, 2] }) {
  const t = useTranslations('cases');
  const items = cases.map((i) => ({
    flag: t(`case${i}Flag`),
    country: t(`case${i}Country`),
    industry: t(`case${i}Industry`),
    years: t(`case${i}Years`),
    quote: t(`case${i}Quote`),
  }));

  return (
    <section className="bg-brand-cream border-y border-brand-line">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-14 lg:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-2">
              {t('proofEyebrow')}
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
              {t('proofTitle')}
            </h2>
          </div>
          <Link href="/about#cases" className="text-sm font-semibold text-brand-green hover:underline">
            {t('proofLink')}
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {items.map((c) => (
            <figure key={c.country} className="bg-white rounded-2xl border border-brand-line p-6 lg:p-7 flex flex-col">
              <blockquote className="text-[15px] text-brand-ink italic leading-relaxed">
                &ldquo;{c.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 pt-4 border-t border-brand-line flex items-center gap-3">
                <span className="text-2xl leading-none" aria-hidden="true">{c.flag}</span>
                <cite className="not-italic">
                  <span className="block text-sm font-bold text-brand-ink">{c.country}</span>
                  <span className="block text-xs text-brand-mute leading-snug">{c.industry} · {c.years}</span>
                </cite>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-5 text-xs text-brand-mute">{t('disclaimer')}</p>
      </div>
    </section>
  );
}
