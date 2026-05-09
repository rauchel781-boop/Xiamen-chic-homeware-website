// /contact — fully redesigned Contact page.
// Sections: Hero · Quick channels · Form + side panel · What happens next ·
//           Office locations · FAQ · Final reassurance

import { unstable_setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';
import ContactClient from './ContactClient';

export async function generateMetadata({ params: { locale } = {} }) {
  const title = 'Contact CHIC — Get a Free Quote on Custom Wooden Products';
  const description = 'Send your specs, sketches or reference samples — we typically reply within 24 hours with a quote and sample timeline. Email, WhatsApp, WeChat or contact form.';
  return {
    title, description,
    alternates: { canonical: `/${locale || 'en'}/contact` },
    openGraph: {
      type: 'website',
      url: `${SITE.siteUrl}/${locale || 'en'}/contact`,
      title, description, siteName: SITE.company.brand,
    },
  };
}

const CHANNELS = [
  {
    label: 'Email',
    value: 'sales@xmchichomeware.com',
    href:  'mailto:sales@xmchichomeware.com',
    note:  'Best for detailed briefs &amp; attachments',
    icon:  'mail',
  },
  {
    label: 'WhatsApp',
    value: '+86 189 6009 8762',
    href:  'https://wa.me/8618960098762',
    note:  'Fastest reply during 09:00 – 22:00 (UTC+8)',
    icon:  'whatsapp',
  },
  {
    label: 'WeChat',
    value: '18960098762',
    href:  '#wechat',
    note:  'Add for ongoing project chat',
    icon:  'wechat',
  },
  {
    label: 'Phone',
    value: '+86 189 6009 8762',
    href:  'tel:+8618960098762',
    note:  'Mon – Sat, 09:00 – 18:00 (UTC+8)',
    icon:  'phone',
  },
];

const STEPS = [
  { n: 1, title: 'You send a brief',    body: 'Describe the product, target quantity, market and any reference photos or sketches.' },
  { n: 2, title: 'We reply in ≤ 24h',   body: 'Quote, suggested materials, MOQ and lead time. Questions if anything is unclear.' },
  { n: 3, title: 'Sample development',  body: 'On PI we tool a sample, share photos & video, and ship for your physical approval.' },
  { n: 4, title: 'Production & ship',   body: 'On sample sign-off we run bulk production with QC at every stage. We ship and you receive.' },
];

const OFFICES = [
  {
    tag: 'Sales & Export Office',
    city: 'Xiamen, Fujian',
    address: 'Siming District, Xiamen, Fujian, China',
    image: '/sales%20office.jpg',
    contact: { email: 'sales@xmchichomeware.com', phone: '+86 189 6009 8762' },
  },
  {
    tag: 'Production Base',
    city: 'Cao County, Shandong',
    address: 'Cao County, Heze, Shandong, China',
    image: '/CHIC%20Factory.jpg',
    contact: { email: 'factory@xmchichomeware.com', phone: '+86 189 6009 8762' },
  },
];

const FAQ = [
  {
    q: 'How quickly do you reply to inquiries?',
    a: 'Within 24 hours on weekdays. WhatsApp messages during our office hours (Mon–Sat, 09:00–18:00 UTC+8) usually get a reply in under 30 minutes.',
  },
  {
    q: 'What information should I include in my first message?',
    a: 'Product type, reference photo or sketch, target quantity (MOQ), wood material preference (if any), target market, and your timeline. The more detail you share upfront, the more useful our first reply will be.',
  },
  {
    q: 'Do I need a finished design to get a quote?',
    a: 'No. We can quote off a rough sketch, a competitor product photo, or even a written description. If you don\'t have a design yet, our team can suggest 2–3 directions based on your market and target price.',
  },
  {
    q: 'Are your samples free?',
    a: 'Standard samples are paid (refundable on bulk order). Custom-tooled samples are paid and the cost depends on complexity. We share an exact sample fee in the first quote.',
  },
  {
    q: 'What languages does your team work in?',
    a: 'English, Mandarin Chinese, and Japanese (for Japanese clients). Our project managers are bilingual EN/CN — no translator middleman.',
  },
];

export default function ContactPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.siteUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Contact' },
    ],
  };
  const contactLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: `${SITE.siteUrl}/${locale}/contact`,
    name: 'Contact CHIC',
    isPartOf: { '@id': `${SITE.siteUrl}/#website` },
    about: { '@id': `${SITE.siteUrl}/#organization` },
  };

  return (
    <article className="bg-white">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={contactLd} />
      {/* ── Hero ── */}
      <header className="bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <nav className="text-xs text-brand-mute mb-4">
            <Link href="/" className="hover:text-brand-green">Home</Link>
            {' / '}
            <span className="text-brand-ink">Contact</span>
          </nav>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
            Get In Touch
          </p>
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-end">
            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-brand-ink leading-[1.1]">
              Let&apos;s build your next{' '}
              <span className="text-brand-green">wooden product together</span>.
            </h1>
            <p className="text-brand-mute leading-relaxed lg:pb-3">
              Share your specs, sketches or reference samples. Our team typically replies
              within 24 hours with a quote and a sample timeline — and we always ask the
              questions a real factory should ask.
            </p>
          </div>

          {/* Quick stats */}
          <div className="mt-9 flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center rounded-full bg-white border border-brand-line px-4 py-2">
              <span className="font-extrabold text-brand-ink mr-2">≤ 24h</span>
              <span className="text-brand-mute">Quote turnaround</span>
            </span>
            <span className="inline-flex items-center rounded-full bg-white border border-brand-line px-4 py-2">
              <span className="font-extrabold text-brand-ink mr-2">EN · CN · JP</span>
              <span className="text-brand-mute">Languages</span>
            </span>
            <span className="inline-flex items-center rounded-full bg-white border border-brand-line px-4 py-2">
              <span className="font-extrabold text-brand-ink mr-2">60+</span>
              <span className="text-brand-mute">Export markets</span>
            </span>
            <span className="inline-flex items-center rounded-full bg-white border border-brand-line px-4 py-2">
              <span className="font-extrabold text-brand-ink mr-2">Mon–Sat</span>
              <span className="text-brand-mute">09:00 – 18:00 UTC+8</span>
            </span>
          </div>
        </div>
      </header>

      {/* ── Quick channels strip ── */}
      <section className="py-10 lg:py-12 border-b border-brand-line">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {CHANNELS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-start gap-4 bg-brand-cream rounded-2xl border border-brand-line p-5 lg:p-6 hover:border-brand-green/40 hover:shadow-md transition"
              >
                <span className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand-green border border-brand-green/15 group-hover:bg-brand-green group-hover:text-white transition">
                  <ChannelIcon name={c.icon} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-mute mb-0.5">{c.label}</p>
                  <p className="font-bold text-brand-ink truncate group-hover:text-brand-green transition">{c.value}</p>
                  <p className="mt-1 text-[12px] text-brand-mute leading-snug" dangerouslySetInnerHTML={{__html: c.note}} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + side panel ── */}
      <section className="py-16 lg:py-20 border-b border-brand-line">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-14">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
                Send a Detailed Inquiry
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.15] mb-6">
                Tell us what you need.{' '}
                <span className="text-brand-green">We&apos;ll do the rest.</span>
              </h2>
              <p className="text-brand-mute leading-relaxed mb-8">
                The more you share — quantity, materials, target price, deadline — the more
                actionable our first reply will be. Attach sketches or reference photos by
                email if you have them.
              </p>
              <ContactClient />
            </div>

            {/* Side panel */}
            <aside className="space-y-6">
              {/* What we'll ask */}
              <div className="bg-brand-cream rounded-2xl border border-brand-line p-6 lg:p-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-green mb-3">
                  Helpful to include
                </p>
                <h3 className="font-extrabold text-brand-ink mb-3">A good first inquiry has:</h3>
                <ul className="space-y-2">
                  {[
                    'Product type or reference photo',
                    'Target quantity (MOQ)',
                    'Wood material preference (if any)',
                    'Target market &amp; price level',
                    'Timeline / launch date',
                    'Custom branding / packaging needs',
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2 text-sm text-brand-ink/85">
                      <CheckBadge />
                      <span dangerouslySetInnerHTML={{__html: line}} />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reassurance */}
              <div className="bg-brand-greenDeep text-white rounded-2xl p-6 lg:p-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-yellowSoft mb-3">
                  Privacy &amp; Trust
                </p>
                <h3 className="text-lg font-extrabold mb-3 leading-snug">We don&apos;t share your designs.</h3>
                <p className="text-sm text-white/75 leading-relaxed">
                  Briefs, sketches and reference samples stay confidential. We can sign an NDA before
                  the first quote — just let us know in your message.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── What happens next — 4 steps ── */}
      <section className="py-16 lg:py-20 bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              What Happens Next
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
              Four steps from{' '}
              <span className="text-brand-green">first message to delivered order</span>.
            </h2>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s) => (
              <article key={s.n} className="bg-white rounded-2xl border border-brand-line p-6 lg:p-7 hover:border-brand-green/40 hover:shadow-md transition">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-white text-sm font-extrabold tabular-nums">
                    {String(s.n).padStart(2, '0')}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-green">
                    Step {s.n}
                  </span>
                </div>
                <h3 className="text-base font-bold text-brand-ink mb-2 leading-snug">{s.title}</h3>
                <p className="text-sm text-brand-mute leading-relaxed">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Offices ── */}
      <section className="py-16 lg:py-20 border-b border-brand-line">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              Our Locations
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
              Two bases.{' '}
              <span className="text-brand-green">One supply chain</span>.
            </h2>
            <p className="mt-4 text-brand-mute leading-relaxed">
              Visit us in person or over a video call — both bases are open to factory tours.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {OFFICES.map((o) => (
              <article key={o.city} className="bg-brand-cream rounded-2xl overflow-hidden border border-brand-line">
                <div className="aspect-[16/9] bg-white overflow-hidden">
                  <img src={o.image} alt={o.city} className="w-full h-full object-cover" />
                </div>
                <div className="p-7 lg:p-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-green mb-2">{o.tag}</p>
                  <h3 className="text-2xl font-extrabold text-brand-ink mb-3">{o.city}</h3>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white border border-brand-line text-brand-green">
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      </span>
                      <span className="text-brand-ink/85">{o.address}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white border border-brand-line text-brand-green">
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      </span>
                      <a href={`mailto:${o.contact.email}`} className="text-brand-green hover:text-brand-greenDark font-semibold">{o.contact.email}</a>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white border border-brand-line text-brand-green">
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 012 4.18 2 2 0 014 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L7.91 9.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>
                      </span>
                      <a href={`tel:${o.contact.phone.replace(/\s/g,'')}`} className="text-brand-green hover:text-brand-greenDark font-semibold">{o.contact.phone}</a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 lg:py-20 bg-brand-cream border-b border-brand-line">
        <div className="max-w-[900px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
              Common questions about{' '}
              <span className="text-brand-green">contacting us</span>.
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ.map((it, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-brand-line bg-white overflow-hidden open:border-brand-green/40 open:bg-white"
                open={i === 0}
              >
                <summary className="cursor-pointer list-none flex items-start gap-4 p-5 lg:p-6 hover:bg-brand-cream/40 transition">
                  <span className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-cream text-brand-green text-xs font-extrabold tabular-nums group-open:bg-brand-green group-open:text-white transition">
                    Q{i + 1}
                  </span>
                  <span className="flex-1 text-base lg:text-[17px] font-bold text-brand-ink leading-snug pt-1.5">
                    {it.q}
                  </span>
                  <span className="shrink-0 mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-line text-brand-mute group-open:border-brand-green group-open:bg-brand-green group-open:text-white group-open:rotate-180 transition">
                    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l5 5 5-5" />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 lg:px-6 pb-6 pl-[68px] lg:pl-[80px] text-sm lg:text-[15px] text-brand-mute leading-relaxed">
                  {it.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final reassurance ── */}
      <section className="py-20 lg:py-24">
        <div className="max-w-[900px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            Why Buyers Pick CHIC
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-ink mb-4 leading-tight">
            A real factory, not another middleman in your inbox.
          </h2>
          <p className="text-brand-mute leading-relaxed mb-8 max-w-2xl mx-auto">
            We answer every inquiry from our own team in Xiamen — no agents, no resellers.
            If the project fits our factory, you get a quote that stands. If it doesn&apos;t, we say so.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="mailto:sales@xmchichomeware.com"
              className="inline-flex items-center rounded-full bg-brand-green px-8 py-3.5 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition"
            >
              Email Sales
            </a>
            <a
              href="https://wa.me/8618960098762"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-8 py-3.5 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition"
            >
              WhatsApp Now
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}

// ── Helpers ──────────────────────────────────────────────────────

function CheckBadge() {
  return (
    <span className="shrink-0 inline-flex h-4 w-4 mt-0.5 items-center justify-center rounded-full bg-brand-green text-white">
      <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 8.5l3 3 6-6" />
      </svg>
    </span>
  );
}

function ChannelIcon({ name }) {
  const c = 'w-6 h-6';
  switch (name) {
    case 'mail':
      return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
    case 'whatsapp':
      return <svg viewBox="0 0 24 24" className={c} fill="currentColor"><path d="M17.6 6.32A8.78 8.78 0 0 0 12.05 4c-4.85 0-8.8 3.95-8.8 8.8 0 1.55.4 3.05 1.18 4.38L3.16 21.5l4.45-1.17a8.8 8.8 0 0 0 4.43 1.2h.01c4.85 0 8.8-3.95 8.8-8.8 0-2.35-.92-4.56-2.58-6.21zm-5.55 13.55h-.01a7.3 7.3 0 0 1-3.72-1.02l-.27-.16-2.78.73.74-2.71-.18-.28a7.27 7.27 0 0 1-1.12-3.9c0-4.04 3.29-7.32 7.34-7.32a7.3 7.3 0 0 1 5.18 2.15 7.27 7.27 0 0 1 2.15 5.18c0 4.04-3.29 7.33-7.33 7.33z"/></svg>;
    case 'wechat':
      return <svg viewBox="0 0 24 24" className={c} fill="currentColor"><path d="M8.5 13.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm5 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM9.7 3C5.45 3 2 5.85 2 9.36c0 1.87.97 3.55 2.55 4.7-.13.4-.5 1.55-.55 1.78-.06.3.27.46.49.32.18-.11 1.6-1.05 1.99-1.31.65.18 1.33.28 2.04.3-.1-.45-.16-.92-.16-1.4C8.36 10.5 11.85 8 16.13 8c.32 0 .63.02.93.05C16.31 5.07 13.31 3 9.7 3zm12.3 11.06c0-2.91-2.91-5.27-6.5-5.27S9 11.15 9 14.06c0 2.92 2.91 5.27 6.5 5.27.74 0 1.45-.1 2.1-.28.34.21 1.55.94 1.7 1.03.18.11.45-.01.4-.27-.04-.18-.36-1.1-.46-1.43A4.99 4.99 0 0 0 22 14.06zm-8.45-.81a.81.81 0 1 1 0-1.62.81.81 0 0 1 0 1.62zm4 0a.81.81 0 1 1 0-1.62.81.81 0 0 1 0 1.62z"/></svg>;
    case 'phone':
      return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 012 4.18 2 2 0 014 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L7.91 9.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>;
    default: return null;
  }
}
