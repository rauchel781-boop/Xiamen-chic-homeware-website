// Materials section — split out from WhoWeServe.
// 2-col layout: title/intro/CTA on left, wood swatch grid on right.
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

// Swatch colors are locale-neutral visual data; name/desc come from i18n.
const SWATCHES = ['#7B4A2A', '#4E3624', '#D4B280', '#C9A66B', '#E5CFA0', '#B58E5A', '#C9966C', '#8E7050'];

export default function MaterialsSection() {
  const t = useTranslations('home.materials');
  const WOODS = SWATCHES.map((swatch, i) => ({
    name: t(`wood${i + 1}Name`),
    swatch,
    desc: t(`wood${i + 1}Desc`),
  }));

  return (
    <section className="bg-brand-cream py-20 lg:py-28">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-start">
          {/* LEFT — title block */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
              {t('eyebrow')}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold tracking-tight text-brand-ink leading-[1.1]">
              {t('titlePre')}{' '}
              <span className="text-brand-green">{t('titleHighlight')}</span>
            </h2>
            <p className="mt-5 text-brand-mute leading-relaxed max-w-md">
              {t('intro')}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/material-guide"
                className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition"
              >
                {t('exploreGuide')} →
              </Link>
              <Link
                href="/contact#form"
                className="inline-flex items-center text-[15px] font-semibold text-brand-green hover:text-brand-greenDark px-2 py-3"
              >
                {t('askEngineers')}
              </Link>
            </div>
          </div>

          {/* RIGHT — wood swatch grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {WOODS.map((w) => (
              <div
                key={w.name}
                className="group bg-white rounded-xl border border-brand-line overflow-hidden hover:border-brand-green/40 hover:shadow-md transition"
              >
                <div
                  className="aspect-[4/3] relative"
                  style={{ background: `linear-gradient(135deg, ${w.swatch}, ${shade(w.swatch, -20)})` }}
                >
                  {/* faux wood-grain stripes */}
                  <div
                    className="absolute inset-0 opacity-30 mix-blend-overlay"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.18) 0 1px, transparent 1px 6px, rgba(255,255,255,0.07) 6px 7px, transparent 7px 14px)',
                    }}
                  />
                </div>
                <div className="p-3 lg:p-4">
                  <div className="text-sm font-bold text-brand-ink leading-tight">{w.name}</div>
                  <div className="mt-0.5 text-[11px] text-brand-mute">{w.desc}</div>
                </div>
              </div>
            ))}

            {/* "more on request" cell */}
            <div className="rounded-xl border border-dashed border-brand-line/80 bg-white/60 flex flex-col items-center justify-center text-center p-4 min-h-[140px]">
              <span className="text-2xl text-brand-green/60">+</span>
              <span className="mt-1 text-xs uppercase tracking-wider font-semibold text-brand-mute">
                {t('moreOnRequest')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Quick hex shade utility — shifts the input hex by `pct` percent (negative = darker).
function shade(hex, pct) {
  const f = parseInt(hex.slice(1), 16);
  const t = pct < 0 ? 0 : 255;
  const p = Math.abs(pct) / 100;
  const R = f >> 16, G = (f >> 8) & 0x00ff, B = f & 0x0000ff;
  const r = Math.round((t - R) * p) + R;
  const g = Math.round((t - G) * p) + G;
  const b = Math.round((t - B) * p) + B;
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
