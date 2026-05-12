// Full-bleed image banner with overlay headline + supporting numbers.
// Replaces the previous "TrustedManufacturer" 4-card dark band — provides
// the home page with a visual break from cards/grids.
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const BG = '/wp-images/2026/01/production.jpg';

export default function ImpactBanner() {
  const t = useTranslations('home.impactBanner');
  const PILLARS = [
    { n: t('pillar1Name'), label: t('pillar1Label') },
    { n: t('pillar2Name'), label: t('pillar2Label') },
    { n: t('pillar3Name'), label: t('pillar3Label') },
    { n: t('pillar4Name'), label: t('pillar4Label') },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BG})` }}
        aria-hidden="true"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-greenDeep/95 via-brand-greenDeep/80 to-brand-greenDeep/40" aria-hidden="true" />

      {/* Content */}
      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-8 py-20 lg:py-28 text-white">
        <div className="max-w-xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-yellowSoft mb-4">
            {t('eyebrow')}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]">
            {t('headline')}
          </h2>
          <p className="mt-5 text-white/80 leading-relaxed text-[15px]">
            {t('body')}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-white text-brand-green px-7 py-3 text-[15px] font-bold hover:bg-brand-cream transition"
            >
              {t('startProject')} →
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center rounded-full border-2 border-white/60 px-7 py-3 text-[15px] font-semibold text-white hover:bg-white hover:text-brand-green transition"
            >
              {t('aboutFactory')}
            </Link>
          </div>
        </div>

        {/* Pillars strip */}
        <div className="mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10 max-w-3xl">
          {PILLARS.map((p) => (
            <div key={p.n} className="bg-brand-greenDeep/60 backdrop-blur-sm px-5 py-5 text-center">
              <div className="text-lg font-extrabold tracking-tight text-white">{p.n}</div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-white/65">{p.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
