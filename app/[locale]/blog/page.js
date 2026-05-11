// /blog — fully redesigned blog index.
// Sections: Hero · Category chips · Featured article · Recent grid ·
// Browse by topic · Newsletter band · CTA

import { unstable_setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/data/site-config';
import { wpPosts, wpPostCategories, stripHtml } from '@/lib/wp-data';
import { localizePost } from '@/lib/translated-content';
import { hreflangFor } from '@/i18n/routing';

export async function generateMetadata({ params: { locale } = {} }) {
  return {
    title: 'Blog — Wooden Homeware Sourcing & Manufacturing Guides',
    description: 'Sourcing tips, material selection, OEM workflow guides and packaging know-how — written by our factory team for B2B buyers of wooden homeware.',
    alternates: { canonical: `/blog`, languages: hreflangFor(SITE.siteUrl, '/blog') },
    openGraph: {
      type: 'website',
      url: `${SITE.siteUrl}/blog`,
      title: 'Blog — Wooden Homeware Sourcing & Manufacturing Guides',
      description: 'Sourcing tips, material selection, OEM workflow — for B2B buyers of wooden homeware.',
      siteName: SITE.company.brand,
    },
  };
}

// Pretty category meta — icon + tagline per slug.
const CAT_META = {
  'buyer-guides':         { icon: 'list',    blurb: 'How to evaluate factories, samples and quotations.' },
  'knowledge':            { icon: 'book',    blurb: 'Fundamentals of wooden homeware product design.' },
  'wood-materials-guide': { icon: 'leaf',    blurb: 'Pick the right wood for your product and market.' },
  'oem-manufacturing':    { icon: 'factory', blurb: 'Inside our OEM & ODM production workflow.' },
  'packaging-shipping':   { icon: 'box',     blurb: 'Export packaging, FBA prep and global logistics.' },
  'wood-care-quality':    { icon: 'shield',  blurb: 'Care, maintenance and quality control deep-dives.' },
};

export default function BlogIndex({ params: { locale } }) {
  unstable_setRequestLocale(locale);

  // Localize titles + excerpts for the active locale (English passes through).
  const allPosts = wpPosts().map((p) => localizePost(p, locale));
  const cats = wpPostCategories();

  // Counts per category slug
  const counts = {};
  for (const p of allPosts) {
    for (const c of p.categories || []) counts[c.slug] = (counts[c.slug] || 0) + 1;
  }

  const featured = allPosts[0];                  // newest = featured
  const recent   = allPosts.slice(1, 7);         // next 6 in a 3x2 grid

  // Group remaining posts by category for "browse by topic"
  const remaining = allPosts.slice(7);
  const byCategory = {};
  for (const p of remaining) {
    const slug = p.categories?.[0]?.slug || 'uncategorized';
    if (!byCategory[slug]) byCategory[slug] = [];
    byCategory[slug].push(p);
  }

  // Breadcrumb + Blog JSON-LD
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.siteUrl}` },
      { '@type': 'ListItem', position: 2, name: 'Blog' },
    ],
  };
  const blogLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'CHIC Wooden Homeware Sourcing Blog',
    url: `${SITE.siteUrl}/blog`,
    publisher: { '@id': `${SITE.siteUrl}/#organization` },
    blogPost: allPosts.slice(0, 10).map((p) => ({
      '@type': 'BlogPosting',
      headline: stripHtml(p.title),
      url: `${SITE.siteUrl}/blog/${p.slug}`,
      datePublished: p.date,
    })),
  };

  return (
    <article className="bg-white">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={blogLd} />
      {/* ── Hero ── */}
      <header className="bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <nav className="text-xs text-brand-mute mb-4">
            <Link href="/" className="hover:text-brand-green">Home</Link>
            {' / '}
            <span className="text-brand-ink">Blog</span>
          </nav>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
            From the Workshop
          </p>
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-end">
            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-brand-ink leading-[1.1]">
              Sourcing &amp; manufacturing guides{' '}
              <span className="text-brand-green">for wooden homeware buyers</span>.
            </h1>
            <p className="text-brand-mute leading-relaxed lg:pb-3">
              Practical articles written by our factory team — based on actual production
              experience with brands, importers and Amazon FBA sellers across 60+ countries.
            </p>
          </div>

          {/* Category chips */}
          <div className="mt-9 flex flex-wrap gap-2">
            <Link
              href="/blog"
              className="inline-flex items-center rounded-full bg-brand-green text-white px-4 py-2 text-sm font-bold"
            >
              All ({allPosts.length})
            </Link>
            {cats
              .filter((c) => counts[c.slug])
              .sort((a, b) => (counts[b.slug] || 0) - (counts[a.slug] || 0))
              .map((c) => (
                <a
                  key={c.slug}
                  href={`#cat-${c.slug}`}
                  className="inline-flex items-center rounded-full bg-white border border-brand-line px-4 py-2 text-sm font-semibold text-brand-ink hover:border-brand-green hover:text-brand-green transition"
                >
                  {c.name}
                  <span className="ml-2 text-[11px] text-brand-mute">{counts[c.slug]}</span>
                </a>
              ))}
          </div>
        </div>
      </header>

      {/* ── Featured article ── */}
      {featured && (
        <section className="py-14 lg:py-16 border-b border-brand-line">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
              Latest Article
            </p>
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center bg-brand-cream rounded-2xl overflow-hidden border border-brand-line hover:shadow-lg transition"
            >
              <div className="aspect-[4/3] lg:aspect-auto lg:h-full bg-white overflow-hidden order-1 lg:order-2">
                {featured.featured_image && (
                  <img
                    src={featured.featured_image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                )}
              </div>
              <div className="p-7 lg:p-12 order-2 lg:order-1">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider mb-4">
                  <span className="font-bold text-brand-green">Featured</span>
                  <span className="text-brand-mute">·</span>
                  <span className="text-brand-mute">
                    {new Date(featured.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                  {featured.categories?.[0] && (
                    <>
                      <span className="text-brand-mute">·</span>
                      <span className="text-brand-mute">{featured.categories[0].name}</span>
                    </>
                  )}
                </div>
                <h2
                  className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-ink group-hover:text-brand-green transition leading-[1.15]"
                  dangerouslySetInnerHTML={{ __html: featured.title }}
                />
                {featured.excerpt && (
                  <p className="mt-4 text-brand-mute leading-relaxed line-clamp-4">
                    {stripHtml(featured.excerpt)}
                  </p>
                )}
                <span className="mt-6 inline-flex items-center rounded-full bg-brand-green text-white px-6 py-2.5 text-sm font-bold group-hover:bg-brand-greenDark transition">
                  Read article →
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── Recent articles 3×2 ── */}
      {recent.length > 0 && (
        <section className="py-16 lg:py-20 border-b border-brand-line">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-10">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-2">
                  Recent
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-tight">
                  Latest from the team
                </h2>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {recent.map((p) => (
                <ArticleCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Browse by topic ── */}
      <section className="py-16 lg:py-20 bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
              Browse by Topic
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-[1.15]">
              Pick your{' '}
              <span className="text-brand-green">sourcing rabbit hole</span>.
            </h2>
            <p className="mt-4 text-brand-mute leading-relaxed">
              Articles grouped by category. Click any topic to scroll, or use the chips at the top.
            </p>
          </div>

          <div className="space-y-14">
            {cats
              .filter((c) => byCategory[c.slug] && byCategory[c.slug].length > 0)
              .map((c) => (
                <CategoryRow
                  key={c.slug}
                  category={c}
                  meta={CAT_META[c.slug]}
                  posts={byCategory[c.slug]}
                  total={counts[c.slug] || 0}
                />
              ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter band ── */}
      <section className="py-16 lg:py-20 bg-brand-greenDeep text-white border-b border-white/10">
        <div className="max-w-[900px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-yellowSoft mb-3">
            Stay In Touch
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.15]">
            Get new articles &amp; product launches in your inbox.
          </h2>
          <p className="mt-4 text-white/75 leading-relaxed">
            One email a month — sourcing tips, new product releases, factory updates.
            No spam, unsubscribe in one click.
          </p>
          <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your business email"
              className="flex-1 rounded-full bg-white/10 border border-white/20 px-5 py-3 text-white placeholder-white/50 focus:outline-none focus:border-brand-yellowSoft"
            />
            <button
              type="submit"
              className="rounded-full bg-white text-brand-green px-6 py-3 text-sm font-bold hover:bg-brand-cream transition"
            >
              Subscribe →
            </button>
          </form>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 lg:py-24">
        <div className="max-w-[900px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-3">
            Ready to Source?
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-ink mb-4 leading-tight">
            Reading is great — but a real quote moves the project forward.
          </h2>
          <p className="text-brand-mute leading-relaxed mb-8 max-w-2xl mx-auto">
            Have a wooden product in mind? Send us a brief, sketch or reference photo —
            we&apos;ll come back with a quote and a sample timeline within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-brand-green px-8 py-3.5 text-[15px] font-semibold text-white hover:bg-brand-greenDark transition"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-8 py-3.5 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

// ── Helpers ──────────────────────────────────────────────────────

function ArticleCard({ post: p }) {
  return (
    <Link
      href={`/blog/${p.slug}`}
      className="group bg-white border border-brand-line rounded-2xl overflow-hidden hover:shadow-lg transition flex flex-col"
    >
      {p.featured_image && (
        <div className="aspect-[16/10] bg-brand-cream overflow-hidden">
          <img
            src={p.featured_image}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        </div>
      )}
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-[11px] uppercase tracking-wider text-brand-mute mb-2">
          {new Date(p.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          {p.categories?.[0] && <span> · {p.categories[0].name}</span>}
        </p>
        <h3
          className="font-bold text-brand-ink group-hover:text-brand-green transition leading-snug line-clamp-3"
          dangerouslySetInnerHTML={{ __html: p.title }}
        />
        {p.excerpt && (
          <p className="mt-3 text-sm text-brand-mute leading-relaxed line-clamp-2 flex-1">
            {stripHtml(p.excerpt)}
          </p>
        )}
        <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand-green group-hover:text-brand-greenDark">
          Read article →
        </span>
      </div>
    </Link>
  );
}

function CategoryRow({ category, meta, posts, total }) {
  const visible = posts.slice(0, 3);
  return (
    <section id={`cat-${category.slug}`} className="scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-brand-line text-brand-green">
            <CatIcon name={meta?.icon} />
          </span>
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-ink leading-tight">
              {category.name}
            </h3>
            <p className="mt-1 text-sm text-brand-mute">
              {meta?.blurb} <span className="text-brand-mute">· {total} articles</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visible.map((p) => (
          <ArticleCard key={p.id} post={p} />
        ))}
      </div>
    </section>
  );
}

function CatIcon({ name }) {
  const c = 'w-6 h-6';
  switch (name) {
    case 'list':
      return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/></svg>;
    case 'book':
      return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>;
    case 'leaf':
      return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"><path d="M11 20A7 7 0 0 1 4 13C4 8 9 4 17 3c-1 7-3 14-6 17z"/><path d="M11 20c-1-3-1-7 1-11"/></svg>;
    case 'factory':
      return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"><path d="M3 21V10l5 3V10l5 3V10l5 3V21z"/><path d="M3 21h18M7 16v3M12 16v3M17 16v3"/></svg>;
    case 'box':
      return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/></svg>;
    case 'shield':
      return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>;
    default: return null;
  }
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              