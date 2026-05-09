// /thank-you — confirmation page shown after the contact form is submitted.
// Designed to feel formal: clear acknowledgement, "what happens next" timeline,
// helpful while-you-wait links, and direct fall-back contact channels.

import { unstable_setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export const metadata = {
  title: 'Thank You — Your Inquiry Has Been Received | CHIC',
  description: 'We have received your inquiry. Our team will review your project and reply within 24 hours.',
  robots: { index: false, follow: false }, // don't index thank-you pages
};

const TIMELINE = [
  { time: 'Just now',  title: 'Your inquiry was received', body: 'A copy has landed in our Xiamen sales inbox and pinged the project manager on duty.' },
  { time: '≤ 1 hour',  title: 'Routed to the right team',  body: 'Depending on the product type, your message goes to the kitchenware, packaging, or organizers project lead.' },
  { time: '≤ 24 hours', title: 'You\'ll hear back',         body: 'A first reply with quote ranges, suggested materials, MOQ and lead-time — plus any clarifying questions.' },
  { time: 'Next steps', title: 'Sample development',       body: 'On PI confirmation we tool a sample, share photos & video, and ship it for your physical approval.' },
];

const WHILE_YOU_WAIT = [
  {
    href: '/products',
    title: 'Browse our 178+ products',
    body:  'See SKUs we already manufacture — every product on the page can be customized.',
    cta:   'Browse Catalog →',
  },
  {
    href: '/material-guide',
    title: 'Pick the right wood',
    body:  '12 wood materials compared side-by-side, with hardness and use-case recommendations.',
    cta:   'Material Guide →',
  },
  {
    href: '/blog',
    title: 'Read sourcing guides',
    body:  '71 articles from our factory team — sourcing tips, packaging know-how, OEM workflow.',
    cta:   'Visit Blog →',
  },
];

export default function ThankYouPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);

  return (
    <article className="bg-white">
      {/* ── Confirmation hero ── */}
      <header className="bg-brand-cream border-b border-brand-line">
        <div className="max-w-[900px] mx-auto px-6 lg:px-8 py-20 lg:py-28 text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-brand-green text-white mb-7 shadow-lg">
            <svg viewBox="0 0 32 32" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 16l6 6 12-12" />
            </svg>
          </div>

          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            Inquiry Received
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-brand-ink leading-[1.1]">
            Thank you — your message{' '}
            <span className="text-brand-green">is in good hands</span>.
          </h1>
          <p className="mt-5 text-brand-mute leading-relaxed text-lg max-w-2xl mx-auto">
            Our team in Xiamen has received your inquiry. A senior project manager will personally
            review the details and get back to you with a quote and next-step plan within 24 hours.
          </p>

          {/* Confirmation chip */}
          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white border border-brand-line px-4 py-2 text-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-brand-green animate-pulse" />
            <span className="text-brand-mute">Confirmation also sent to your email</span>
          </div>
        </div>
      </header>

      {/* ── What happens next — timeline ── */}
      <section className="py-20 lg:py-24 border-b border-brand-line">
        <div className="max-w-[900px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              What Happens Next
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
              Here&apos;s what&apos;s already moving on{' '}
              <span className="text-brand-green">our side</span>.
            </h2>
          </div>

          <ol className="relative space-y-6 lg:space-y-8 before:content-[''] before:absolute before:left-[27px] before:top-2 before:bottom-2 before:w-px before:bg-brand-line">
            {TIMELINE.map((t, i) => (
              <li key={i} className="relative pl-20">
                <div className="absolute left-0 top-0 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-cream border-2 border-brand-green text-brand-green font-extrabold text-base z-10">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="bg-white border border-brand-line rounded-2xl p-5 lg:p-6">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-brand-green font-bold mb-1.5">
                    {t.time}
                  </div>
                  <h3 className="text-lg font-extrabold text-brand-ink mb-2 leading-snug">{t.title}</h3>
                  <p className="text-sm text-brand-mute leading-relaxed">{t.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Direct channels ── */}
      <section className="py-16 lg:py-20 bg-brand-greenDeep text-white border-b border-white/10">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-yellowSoft mb-3">
              Need to Reach Us Faster?
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.15]">
              Skip the queue — message us directly.
            </h2>
            <p className="mt-4 text-white/75 leading-relaxed max-w-2xl mx-auto">
              For urgent projects or follow-ups, WhatsApp is fastest. Mention your name so we
              can match it with the form you just submitted.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <a
              href="https://wa.me/8618960098762"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center bg-white/5 hover:bg-white/10 border border-white/15 rounded-2xl p-5 transition"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-green mb-3">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M17.6 6.32A8.78 8.78 0 0 0 12.05 4c-4.85 0-8.8 3.95-8.8 8.8 0 1.55.4 3.05 1.18 4.38L3.16 21.5l4.45-1.17a8.8 8.8 0 0 0 4.43 1.2h.01c4.85 0 8.8-3.95 8.8-8.8 0-2.35-.92-4.56-2.58-6.21zm-5.55 13.55h-.01a7.3 7.3 0 0 1-3.72-1.02l-.27-.16-2.78.73.74-2.71-.18-.28a7.27 7.27 0 0 1-1.12-3.9c0-4.04 3.29-7.32 7.34-7.32a7.3 7.3 0 0 1 5.18 2.15 7.27 7.27 0 0 1 2.15 5.18c0 4.04-3.29 7.33-7.33 7.33z"/></svg>
              </span>
              <div className="text-[11px] font-bold uppercase tracking-wider text-brand-yellowSoft">WhatsApp</div>
              <div className="font-extrabold mt-1">+86 189 6009 8762</div>
              <div className="text-xs text-white/60 mt-1">Fastest response</div>
            </a>
            <a
              href="mailto:sales@xmchichomeware.com"
              className="group flex flex-col items-center text-center bg-white/5 hover:bg-white/10 border border-white/15 rounded-2xl p-5 transition"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-green mb-3">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </span>
              <div className="text-[11px] font-bold uppercase tracking-wider text-brand-yellowSoft">Email</div>
              <div className="font-extrabold mt-1 text-sm break-all">sales@xmchichomeware.com</div>
              <div className="text-xs text-white/60 mt-1">For attachments</div>
            </a>
            <a
              href="tel:+8618960098762"
              className="group flex flex-col items-center text-center bg-white/5 hover:bg-white/10 border border-white/15 rounded-2xl p-5 transition"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-green mb-3">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 012 4.18 2 2 0 014 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L7.91 9.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>
              </span>
              <div className="text-[11px] font-bold uppercase tracking-wider text-brand-yellowSoft">Phone</div>
              <div className="font-extrabold mt-1">+86 189 6009 8762</div>
              <div className="text-xs text-white/60 mt-1">Mon–Sat office hours</div>
            </a>
          </div>
        </div>
      </section>

      {/* ── While you wait ── */}
      <section className="py-20 lg:py-24">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              While You Wait
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
              Useful pages to{' '}
              <span className="text-brand-green">explore in the meantime</span>.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {WHILE_YOU_WAIT.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group bg-brand-cream rounded-2xl border border-brand-line p-7 hover:border-brand-green/40 hover:shadow-md transition flex flex-col"
              >
                <h3 className="text-lg font-extrabold text-brand-ink mb-2 leading-snug">{c.title}</h3>
                <p className="text-sm text-brand-mute leading-relaxed flex-1">{c.body}</p>
                <span className="mt-5 inline-flex items-center text-sm font-bold text-brand-green group-hover:text-brand-greenDark">
                  {c.cta}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-semibold text-brand-mute hover:text-brand-green"
            >
              ← Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
