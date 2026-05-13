// Shared template for legacy WP "landing pages" we kept at their original URLs
// to preserve SEO equity. Each page just supplies the data — this component
// renders the brand-consistent shell (breadcrumb, hero, prose body, CTA) and
// emits Breadcrumb + (optional) FAQPage JSON-LD.

import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';

export default function WpLandingPage({ title, kicker, lead, bodyHtml, faqs = [], breadcrumb = [] }) {
  // Build BreadcrumbList JSON-LD
  const crumbs = [
    { name: 'Home', url: '/' },
    ...breadcrumb,
    { name: title },
  ];
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url ? `${SITE.siteUrl}${c.url}` : undefined,
    })),
  };

  // Build FAQPage JSON-LD if any FAQs were detected in the source HTML
  const faqLd = faqs.length === 0 ? null : {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <article className="bg-white">
      <JsonLd data={breadcrumbLd} />
      {faqLd && <JsonLd data={faqLd} />}

      {/* Hero */}
      <header className="bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <nav className="text-xs text-brand-mute mb-4">
            <Link href="/" className="hover:text-brand-green">Home</Link>
            {breadcrumb.map((c, i) => (
              <span key={i}>
                {' / '}
                {c.url ? (
                  <Link href={c.url} className="hover:text-brand-green">{c.name}</Link>
                ) : (
                  <span>{c.name}</span>
                )}
              </span>
            ))}
            {' / '}
            <span className="text-brand-ink">{title}</span>
          </nav>
          {kicker && (
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
              {kicker}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-ink leading-[1.1]">
            {title}
          </h1>
          {lead && (
            <p className="mt-5 text-brand-mute leading-relaxed max-w-2xl">{lead}</p>
          )}
        </div>
      </header>

      {/* Body — original WP content rendered with Tailwind prose */}
      <section className="py-14 lg:py-20">
        <div className="max-w-[860px] mx-auto px-6 lg:px-8">
          <div
            className="wp-content"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-cream border-t border-brand-line">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-14 lg:py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-brand-ink">
                Ready to start your project?
              </h2>
              <p className="mt-2 text-brand-mute max-w-xl">
                Tell us your size, material and packaging needs — we&apos;ll send a
                full quote with samples and lead-time within one business day.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact#form"
                className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition"
              >
                About Our Factory
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
