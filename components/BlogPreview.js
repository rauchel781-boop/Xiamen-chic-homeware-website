// Latest blog posts — bento layout: 1 large featured + 2 smaller stacked.
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { wpBlogPosts, stripHtml } from '@/lib/wp-data';

export default function BlogPreview() {
  const t = useTranslations('home.blogPreview');
  const posts = wpBlogPosts().slice(0, 3);
  if (posts.length === 0) return null;
  const [featured, second, third] = posts;

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
        {/* Centered header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green mb-4">
            {t('eyebrow')}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold tracking-tight text-brand-ink leading-[1.15]">
            {t('titlePre')}{' '}
            <span className="text-brand-green">{t('titleHighlight')}</span>
          </h2>
          <p className="mt-4 text-brand-mute leading-relaxed">
            {t('intro')}
          </p>
        </div>

        {/* Bento — 1 big featured + 2 smaller stacked */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Featured (large) */}
          <FeaturedCard
            post={featured}
            featuredLabel={t('featured')}
            readArticleLabel={t('readArticle')}
          />

          {/* Right column — 2 stacked */}
          <div className="grid gap-6">
            {[second, third].filter(Boolean).map((p) => (
              <SmallCard key={p.id} post={p} readArticleLabel={t('readArticle')} />
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-full border-2 border-brand-green bg-white px-7 py-3 text-[15px] font-semibold text-brand-green hover:bg-brand-green hover:text-white transition"
          >
            {t('allArticles')} →
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ post: p, featuredLabel, readArticleLabel }) {
  return (
    <Link
      href={`/blog/${p.slug}`}
      className="group bg-brand-cream rounded-2xl overflow-hidden border border-brand-line hover:shadow-lg transition flex flex-col"
    >
      {p.featured_image && (
        <div className="relative aspect-[16/10] bg-white overflow-hidden">
          <Image
            src={p.featured_image}
            alt={stripHtml(p.title)}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition duration-500"
          />
        </div>
      )}
      <div className="p-7 lg:p-8 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-brand-mute mb-3">
          <span className="font-bold text-brand-green">{featuredLabel}</span>
          <span>·</span>
          <span>{new Date(p.date).toLocaleDateString('en-US', {year:'numeric', month:'short', day:'numeric'})}</span>
        </div>
        <h3
          className="text-xl lg:text-2xl font-extrabold text-brand-ink group-hover:text-brand-green transition leading-snug"
          dangerouslySetInnerHTML={{__html: p.title}}
        />
        {p.excerpt && (
          <p className="mt-3 text-sm text-brand-mute leading-relaxed line-clamp-3">
            {stripHtml(p.excerpt)}
          </p>
        )}
        <span className="mt-5 inline-flex items-center text-sm font-semibold text-brand-green group-hover:text-brand-greenDark">
          {readArticleLabel} →
        </span>
      </div>
    </Link>
  );
}

function SmallCard({ post: p, readArticleLabel }) {
  return (
    <Link
      href={`/blog/${p.slug}`}
      className="group grid sm:grid-cols-[200px_1fr] gap-5 bg-brand-cream rounded-2xl overflow-hidden border border-brand-line hover:shadow-md transition"
    >
      {p.featured_image && (
        <div className="relative aspect-[16/10] sm:aspect-auto sm:h-full bg-white overflow-hidden">
          <Image
            src={p.featured_image}
            alt={stripHtml(p.title)}
            fill
            sizes="(max-width: 640px) 100vw, 200px"
            className="object-cover group-hover:scale-105 transition duration-500"
          />
        </div>
      )}
      <div className="p-5 sm:py-6 sm:pr-6 sm:pl-0 flex-1 flex flex-col">
        <div className="text-[11px] uppercase tracking-wider text-brand-mute mb-2">
          {new Date(p.date).toLocaleDateString('en-US', {year:'numeric', month:'short', day:'numeric'})}
          {p.categories?.[0] && <span> · {p.categories[0].name}</span>}
        </div>
        <h3
          className="text-base font-bold text-brand-ink group-hover:text-brand-green transition leading-snug line-clamp-3"
          dangerouslySetInnerHTML={{__html: p.title}}
        />
        <span className="mt-3 inline-flex items-center text-sm font-semibold text-brand-green group-hover:text-brand-greenDark">
          {readArticleLabel} →
        </span>
      </div>
    </Link>
  );
}
