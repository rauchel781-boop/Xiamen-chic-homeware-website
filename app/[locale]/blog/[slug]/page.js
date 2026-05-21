// /blog/[slug] — Redesigned blog post detail page.
// Sections: Hero (category + title + meta) · Featured image ·
// 2-column layout (article + sticky sidebar) · Mid-article CTA ·
// Author/brand card · Newsletter band · Related articles · Final CTA
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/JsonLd';
import TableOfContents from '@/components/TableOfContents';
import PrintButton from '@/components/PrintButton';
import MermaidLoader from '@/components/MermaidLoader';
import { SITE } from '@/data/site-config';
import { wpPosts, wpPostBySlug, stripHtml } from '@/lib/wp-data';
import { localizePost } from '@/lib/translated-content';
import { routing, canonicalFor } from '@/i18n/routing';
import { schemaLang } from '@/i18n/seo';
import { enhanceArticle } from '@/lib/article-enhance';
import { buildSourcingHowTo } from '@/lib/howto-schema';

// Pick a blog author deterministically from SITE.blogAuthors based on a
// simple hash of the post slug. Same slug always picks the same author,
// so social shares / Schema.org cards stay consistent across renders.
// Two authors (chuan + cassie) → roughly 50/50 distribution across posts.
function pickBlogAuthor(slug) {
  const pool = SITE.blogAuthors;
  let n = 0;
  for (let i = 0; i < slug.length; i++) n = (n * 31 + slug.charCodeAt(i)) | 0;
  const authorSlug = pool[Math.abs(n) % pool.length];
  return SITE.team.find((m) => m.slug === authorSlug);
}

// Build hreflang map for a given path — used in metadata.alternates.languages.
function buildBlogAlternates(path) {
  const langs = {};
  for (const loc of routing.locales) {
    const prefix = loc === routing.defaultLocale ? '' : `/${loc}`;
    langs[loc] = `${SITE.siteUrl}${prefix}${path}`;
  }
  langs['x-default'] = `${SITE.siteUrl}${path}`;
  return langs;
}

export function generateStaticParams() {
  return wpPosts().map(p => ({ slug: p.slug }));
}

// Decode the handful of HTML entities WP stores in meta_title / meta_desc
// (e.g. "OEM &amp; Custom" → "OEM & Custom"). stripHtml only removes tags.
function decodeEntities(s) {
  return (s || '')
    .replace(/&amp;/g, '&')
    .replace(/&#0?39;|&apos;|&rsquo;|&lsquo;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/&#8211;|&ndash;/g, '–')
    .replace(/&#8212;|&mdash;/g, '—')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

export async function generateMetadata({ params }) {
  const rawP = wpPostBySlug(params.slug);
  if (!rawP) return {};
  const p = localizePost(rawP, params.locale);
  const isEn = params.locale === 'en';

  // Prefer the hand-written, keyword-tuned meta_title / meta_desc on the
  // English site (English is where all our search demand is). For translated
  // locales keep the in-language snippet derived from the translated post so
  // we never show an English description on a German/Spanish/French/JP page.
  const metaTitle = decodeEntities(stripHtml(rawP.meta_title || ''));
  const metaDesc  = decodeEntities(stripHtml(rawP.meta_desc  || ''));
  const localizedDesc = stripHtml(p.excerpt || p.content).slice(0, 160);

  const title = (isEn && metaTitle) ? metaTitle : stripHtml(p.title);
  const desc  = isEn
    ? (metaDesc || localizedDesc)
    : (localizedDesc || metaDesc);
  const path  = `/blog/${p.slug}`;
  const img   = p.featured_image || `${SITE.siteUrl}${SITE.defaultOgImage}`;
  return {
    title,
    description: desc,
    alternates: { canonical: canonicalFor(params.locale, path), languages: buildBlogAlternates(path) },
    openGraph: {
      type: 'article',
      url: `${SITE.siteUrl}${path}`,
      title,
      description: desc,
      siteName: SITE.company.brand,
      publishedTime: p.date,
      images: [{ url: img, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description: desc, images: [img] },
  };
}

// Estimate reading time from content (~200 wpm)
function readingTime(html) {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default function BlogPost({ params }) {
  unstable_setRequestLocale(params.locale);
  const tTeam = useTranslations('team');
  const rawP = wpPostBySlug(params.slug);
  if (!rawP) notFound();
  const p = localizePost(rawP, params.locale);

  // Resolve the named blog author for this post (Person schema + visible
  // byline + author card). Replaces the old "Factory Team" Organization
  // attribution, which Google E-E-A-T evaluators flag as low-authority.
  const author = pickBlogAuthor(p.slug);
  const authorRole = tTeam(author.roleKey);
  const authorBio  = tTeam(author.bioKey);
  const authorUrl  = `${SITE.siteUrl}/about/team#${author.slug}`;

  // Related — prefer same category, fall back to most recent
  const sameCategory = wpPosts().filter(x =>
    x.id !== p.id &&
    x.categories?.some(c => p.categories?.some(pc => pc.slug === c.slug))
  );
  const fallback = wpPosts().filter(x => x.id !== p.id);
  const related = [...sameCategory, ...fallback]
    .filter((x, i, arr) => arr.findIndex(y => y.id === x.id) === i)
    .slice(0, 3)
    .map((x) => localizePost(x, params.locale));

  const minutes = readingTime(p.content);
  const date = new Date(p.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const cat = p.categories?.[0];

  // Server-side enhance: inject h2/h3 ids for TOC anchors, add
  // target="_blank" rel="noopener nofollow" on every external link,
  // and count externals (build-time warning if >10). The TOC array
  // is fed to the <TableOfContents> component below.
  const { html: enhancedHtml, toc } = enhanceArticle(p.content);

  // Optional FAQ data attached to a post — used to emit FAQPage schema
  // and visible FAQ block in the article. Authors include this in
  // wp-data/posts.json as: { ..., faq: [{ q: "...", a: "..." }, ...] }
  const faqItems = Array.isArray(p.faq) ? p.faq : [];

  // JSON-LD
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.siteUrl}` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE.siteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: stripHtml(p.title) },
    ],
  };
  // For non-default-locale variants (de/es/fr/ja) the content WAS modified
  // when we ran the machine-translation pipeline. Reflecting that honestly
  // via dateModified gives Google a real freshness signal instead of the
  // "datePublished === dateModified" red flag the original audit flagged.
  // English variant keeps post.date because the source content is unchanged.
  const isTranslated = params.locale !== routing.defaultLocale;
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: stripHtml(p.title),
    description: (!isTranslated && decodeEntities(stripHtml(rawP.meta_desc || '')))
      || stripHtml(p.excerpt || p.content).slice(0, 200),
    image: p.featured_image ? [p.featured_image.startsWith('http') ? p.featured_image : `${SITE.siteUrl}${p.featured_image}`] : undefined,
    datePublished: p.date,
    dateModified: isTranslated ? SITE.lastLocalizationDate : p.date,
    inLanguage: schemaLang(params.locale),
    // Named Person author (was Organization). Google's E-E-A-T evaluators
    // explicitly weight named human authors above corporate attribution.
    // The author Person entity is also emitted as schema in /about/team.
    author: {
      '@type': 'Person',
      '@id': authorUrl,
      name: author.name,
      jobTitle: authorRole,
      image: `${SITE.siteUrl}${author.photo}`,
      worksFor: { '@id': `${SITE.siteUrl}/#organization` },
      url: authorUrl,
    },
    publisher: { '@id': `${SITE.siteUrl}/#organization` },
    mainEntityOfPage: `${SITE.siteUrl}/blog/${p.slug}`,
    articleSection: cat?.name || 'Wooden Homeware',
    // Transparency about machine translation on non-English variants —
    // Schema.org's translator field gives Google an honest signal and
    // avoids the page being flagged as low-quality auto-translated content.
    ...(isTranslated && {
      translator: {
        '@type': 'Organization',
        name: 'CHIC Localization (Aliyun Machine Translation, human-reviewed)',
      },
    }),
  };

  // FAQPage schema — separate Schema.org block, surfaces in Google as
  // rich-result accordion. Only emitted if the post has faq[] data.
  const faqLd = faqItems.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: stripHtml(f.a),
          },
        })),
      }
    : null;

  // HowTo schema — auto-emitted for any sourcing-guide tagged article.
  // Google retired the visual step-card rich result in late 2023 but the
  // schema still feeds the Knowledge Panel and AI Overviews pipelines.
  // Shared 9-step factory workflow lives in lib/howto-schema.js.
  const howtoLd = buildSourcingHowTo(p, schemaLang(params.locale));

  return (
    <article className="bg-white">
      <JsonLd data={breadcrumb} />
      <JsonLd data={articleLd} />
      {faqLd && <JsonLd data={faqLd} />}
      {howtoLd && <JsonLd data={howtoLd} />}
      <MermaidLoader />

      {/* ── HERO ── */}
      <header className="bg-brand-cream border-b border-brand-line">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <nav className="text-xs text-brand-mute mb-5">
            <Link href="/" className="hover:text-brand-green">Home</Link>
            {' / '}
            <Link href="/blog" className="hover:text-brand-green">Blog</Link>
            {cat && <>{' / '}<span className="text-brand-mute">{cat.name}</span></>}
          </nav>

          {cat && (
            <Link
              href="/blog"
              className="inline-flex items-center rounded-full bg-white border border-brand-line px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-green hover:border-brand-green transition mb-5"
            >
              {cat.name}
            </Link>
          )}

          <h1
            className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-brand-ink leading-[1.15] max-w-4xl"
            dangerouslySetInnerHTML={{ __html: p.title }}
          />

          {p.excerpt && (
            <p className="mt-5 text-brand-mute leading-relaxed text-[17px] max-w-3xl">
              {stripHtml(p.excerpt).slice(0, 220)}
            </p>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-brand-mute">
            <span className="inline-flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {date}
            </span>
            <span className="inline-flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              {minutes} min read
            </span>
            <span className="inline-flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              By <Link href="/about/team" className="hover:text-brand-green underline-offset-2 hover:underline">{author.name}</Link>
            </span>
            <span className="ml-auto print:hidden">
              <PrintButton label="Print / Save PDF" />
            </span>
          </div>
        </div>
      </header>

      {/* ── FEATURED IMAGE ── */}
      {p.featured_image && (
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 -mt-2 lg:-mt-6 relative z-10">
          <div className="relative aspect-[16/9] bg-brand-cream rounded-2xl overflow-hidden border border-brand-line shadow-sm">
            <Image
              src={p.featured_image}
              alt={stripHtml(p.title)}
              fill
              sizes="(max-width: 1100px) 100vw, 1100px"
              priority
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* ── ARTICLE BODY + SIDEBAR ── */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_280px] gap-10 lg:gap-14">
            {/* MAIN ARTICLE */}
            <div className="min-w-0">
              {/* Mobile-only TOC accordion (the desktop TOC lives in the sidebar) */}
              {toc.length >= 3 && (
                <TableOfContents toc={toc} title="On this page" />
              )}

              <div
                className="wp-content blog-prose"
                dangerouslySetInnerHTML={{ __html: enhancedHtml }}
              />

              {/* Inline FAQ block — visible Q&A list. Companion FAQPage
                  schema is emitted at the top of the page so Google can
                  surface these in rich results. */}
              {faqItems.length > 0 && (
                <section id="faq" className="mt-12 pt-8 border-t border-brand-line">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-green mb-2">
                    Frequently asked questions
                  </p>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-brand-ink leading-tight mb-6">
                    Questions buyers ask before placing an order
                  </h2>
                  <div className="blog-faq">
                    {faqItems.map((f, i) => (
                      <details key={i} {...(i === 0 ? { open: true } : {})}>
                        <summary>{f.q}</summary>
                        <div dangerouslySetInnerHTML={{ __html: f.a }} />
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* Mid-article CTA card */}
              <aside className="mt-10 mb-2 bg-brand-cream border border-brand-line rounded-2xl p-6 lg:p-7 flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-green mb-1">From the factory</p>
                  <p className="font-bold text-brand-ink leading-snug">
                    Need a custom wooden product like this for your brand?
                  </p>
                  <p className="text-sm text-brand-mute mt-1">
                    Send a brief — quote within 24h, samples in 7–10 days.
                  </p>
                </div>
                <Link
                  href="/contact#form"
                  className="shrink-0 inline-flex items-center justify-center rounded-full bg-brand-green text-white font-semibold text-sm px-5 py-2.5 hover:bg-brand-greenDark transition"
                >
                  Get a Quote →
                </Link>
              </aside>

              {/* Tags / categories */}
              {p.categories && p.categories.length > 0 && (
                <div className="mt-10 pt-6 border-t border-brand-line flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-mute mr-2">Topics:</span>
                  {p.categories.map(c => (
                    <Link
                      key={c.slug}
                      href="/blog"
                      className="inline-flex items-center rounded-full bg-brand-cream border border-brand-line px-3 py-1 text-[12px] font-semibold text-brand-ink hover:border-brand-green hover:text-brand-green transition"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* SIDEBAR */}
            <aside className="lg:sticky lg:top-24 lg:self-start space-y-5">
              {/* TOC — desktop only, hides on mobile (the article body
                  renders a mobile accordion instead). Only shows when
                  the article has at least 3 headings. */}
              {toc.length >= 3 && (
                <div className="bg-white border border-brand-line rounded-2xl p-5 print:hidden">
                  <TableOfContents toc={toc} title="On this page" />
                </div>
              )}

              {/* Author card — named Person from /about/team */}
              <div className="bg-brand-cream border border-brand-line rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-white shrink-0">
                    <Image
                      src={author.photo}
                      alt={author.name}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-brand-ink leading-tight text-[15px]">
                      {author.name}
                    </p>
                    <p className="text-[11px] text-brand-green uppercase tracking-wider font-semibold mt-0.5">
                      {authorRole}
                    </p>
                  </div>
                </div>
                <p className="text-[13px] text-brand-mute leading-relaxed line-clamp-5">
                  {authorBio}
                </p>
                <Link
                  href="/about/team"
                  className="mt-3 inline-flex items-center text-[13px] font-semibold text-brand-green hover:text-brand-greenDark"
                >
                  Meet the team →
                </Link>
              </div>

              {/* Quick CTA */}
              <div className="bg-brand-green text-white rounded-2xl p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-wood mb-2">
                  Custom Project?
                </p>
                <p className="font-bold leading-snug mb-3">
                  Get a wholesale quote in 24 hours.
                </p>
                <Link
                  href="/contact#form"
                  className="inline-flex items-center rounded-full bg-white text-brand-green font-semibold text-sm px-4 py-2 hover:bg-brand-cream transition"
                >
                  Contact Us →
                </Link>
              </div>

              {/* Quick links */}
              <div className="bg-white border border-brand-line rounded-2xl p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green mb-3">
                  Explore
                </p>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/products" className="text-brand-ink hover:text-brand-green flex items-center gap-2"><span className="text-brand-green">›</span> All Products</Link></li>
                  <li><Link href="/material-guide" className="text-brand-ink hover:text-brand-green flex items-center gap-2"><span className="text-brand-green">›</span> Material Guide</Link></li>
                  <li><Link href="/about" className="text-brand-ink hover:text-brand-green flex items-center gap-2"><span className="text-brand-green">›</span> About Factory</Link></li>
                  <li><Link href="/blog" className="text-brand-ink hover:text-brand-green flex items-center gap-2"><span className="text-brand-green">›</span> All Articles</Link></li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── RELATED ARTICLES ── */}
      {related.length > 0 && (
        <section className="bg-brand-cream border-t border-brand-line py-16 lg:py-20">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-10">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-2">Continue Reading</p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-ink leading-tight">Related articles</h2>
              </div>
              <Link
                href="/blog"
                className="hidden md:inline-flex items-center rounded-full border-2 border-brand-green px-5 py-2 text-sm font-semibold text-brand-green hover:bg-brand-green hover:text-white transition"
              >
                Browse all articles →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(r => (
                <Link
                  key={r.id}
                  href={`/blog/${r.slug}`}
                  className="group bg-white border border-brand-line rounded-2xl overflow-hidden hover:border-brand-green/40 hover:shadow-lg transition flex flex-col"
                >
                  {r.featured_image && (
                    <div className="relative aspect-[16/10] bg-brand-cream overflow-hidden">
                      <Image
                        src={r.featured_image}
                        alt={stripHtml(r.title)}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-[1.03] transition duration-500"
                      />
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col">
                    <p className="text-[11px] uppercase tracking-wider text-brand-mute mb-2">
                      {new Date(r.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      {r.categories?.[0] && <span> · {r.categories[0].name}</span>}
                    </p>
                    <h3
                      className="font-bold text-brand-ink group-hover:text-brand-green transition leading-snug line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: r.title }}
                    />
                    {r.excerpt && (
                      <p className="mt-3 text-sm text-brand-mute leading-relaxed line-clamp-2 flex-1">
                        {stripHtml(r.excerpt)}
                      </p>
                    )}
                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand-green">
                      Read article →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="md:hidden mt-8 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center rounded-full border-2 border-brand-green px-5 py-2 text-sm font-semibold text-brand-green"
              >
                Browse all articles →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── FINAL CTA BAND ── */}
      <section className="bg-brand-green text-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-wood mb-3">Ready to source?</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                Reading is great — but a real quote moves the project forward.
              </h2>
              <p className="mt-4 text-white/85 leading-relaxed text-[16px] max-w-xl">
                Have a wooden product in mind? Send us a brief, sketch or reference photo —
                we&apos;ll come back with a quote and a sample timeline within 24 hours.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                href="/contact#form"
                className="inline-flex items-center rounded-full bg-brand-wood px-7 py-3 text-[15px] font-semibold text-brand-ink hover:bg-brand-woodSoft transition"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center rounded-full border-2 border-white px-7 py-3 text-[15px] font-semibold text-white hover:bg-white hover:text-brand-green transition"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
