// "Why Choose Us" — editorial 2-column layout.
// Left: section title + intro + CTA (sticky on lg+).
// Right: 4 horizontal numbered rows with icon, title, body — separated by hairlines.
import { Link } from '@/i18n/navigation';

const REASONS = [
  {
    icon: 'factory',
    title: 'Factory Direct Manufacturing',
    body: 'Direct production in our own factory — stable quality, competitive pricing and reliable delivery without middlemen.',
  },
  {
    icon: 'gears',
    title: 'OEM & ODM Custom Service',
    body: 'Logo branding, size adjustments, material selection and custom packaging built for your retail or marketplace requirements.',
  },
  {
    icon: 'shield',
    title: 'Strict Quality Control',
    body: 'Every order goes through multi-step QC — material inspection, in-process check and final pre-shipment AQL audit.',
  },
  {
    icon: 'globe',
    title: 'Global Export Experience',
    body: 'Exporting to 60+ countries with hands-on Amazon FBA, retail-chain compliance, EU REACH and door-to-door logistics.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-brand-cream py-20 lg:py-28">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16">
          {/* LEFT — title block */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
              Why Choose Us
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-brand-ink leading-[1.1]">
              Why brands choose our wooden products factory
            </h2>
            <p className="mt-5 text-brand-mute leading-relaxed max-w-md">
              We help brands and distributors source reliable, well-made wooden products
              with factory-direct pricing and flexible customization — at every order size.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center text-[15px] font-semibold text-brand-green hover:text-brand-greenDark px-2 py-3"
              >
                Learn About Our Factory →
              </Link>
            </div>
          </div>

          {/* RIGHT — numbered feature rows */}
          <div className="bg-white rounded-2xl border border-brand-line overflow-hidden">
            {REASONS.map((r, i) => (
              <Row key={r.title} index={i + 1} icon={r.icon} title={r.title} body={r.body} last={i === REASONS.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ index, icon, title, body, last }) {
  return (
    <article
      className={`group relative grid grid-cols-[auto_auto_1fr] gap-5 lg:gap-7 items-start p-6 lg:p-8 ${last ? '' : 'border-b border-brand-line'} hover:bg-brand-cream/40 transition`}
    >
      {/* Number */}
      <div className="font-extrabold text-3xl lg:text-4xl text-brand-green/30 tabular-nums leading-none mt-1 group-hover:text-brand-green transition">
        {String(index).padStart(2, '0')}
      </div>

      {/* Icon */}
      <div className="inline-flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-xl bg-brand-cream text-brand-green shrink-0 group-hover:bg-brand-green group-hover:text-white transition">
        <Icon name={icon} />
      </div>

      {/* Text */}
      <div>
        <h3 className="text-base lg:text-lg font-bold text-brand-ink mb-2 leading-snug">{title}</h3>
        <p className="text-sm text-brand-mute leading-relaxed">{body}</p>
      </div>
    </article>
  );
}

function Icon({ name }) {
  const c = 'w-6 h-6 lg:w-7 lg:h-7';
  switch (name) {
    case 'factory':
      return (
        <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
          <path d="M3 21V10l5 3V10l5 3V10l5 3V21z" />
          <path d="M3 21h18" />
          <path d="M7 16v3M12 16v3M17 16v3" />
        </svg>
      );
    case 'gears':
      return (
        <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19 12a7 7 0 00-.1-1.2l2.1-1.6-2-3.4-2.4.8a7 7 0 00-2.1-1.2L14 3h-4l-.5 2.4a7 7 0 00-2.1 1.2l-2.4-.8-2 3.4 2.1 1.6A7 7 0 005 12c0 .4 0 .8.1 1.2l-2.1 1.6 2 3.4 2.4-.8a7 7 0 002.1 1.2L10 21h4l.5-2.4a7 7 0 002.1-1.2l2.4.8 2-3.4-2.1-1.6c.1-.4.1-.8.1-1.2z"/>
        </svg>
      );
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
          <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case 'globe':
      return (
        <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <ellipse cx="12" cy="12" rx="4.5" ry="9" />
          <path d="M3 12h18" />
        </svg>
      );
    default: return null;
  }
}
