import Link from 'next/link';
import { notFound } from 'next/navigation';
import { postBySlug, posts } from '@/lib/data';

export function generateStaticParams() {
  return posts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = postBySlug(params.slug);
  if (!p) return {};
  return {
    title: p.meta_title || stripHtml(p.title),
    description: p.meta_desc || stripHtml(p.excerpt || p.content).slice(0, 160),
    openGraph: { images: p.featured_image ? [p.featured_image] : [] },
  };
}

export default function BlogPost({ params }) {
  const p = postBySlug(params.slug);
  if (!p) notFound();

  const related = posts().filter(x => x.id !== p.id).slice(0, 3);

  return (
    <article>
      <header className="bg-wood-50 border-b border-wood-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="text-xs text-wood-600 mb-4">
            <Link href="/" className="hover:text-wood-800">Home</Link>
            {' / '}
            <Link href="/blog" className="hover:text-wood-800">Blog</Link>
          </nav>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-wood-900 leading-tight" dangerouslySetInnerHTML={{__html: p.title}} />
          <p className="mt-4 text-sm text-wood-600">
            {new Date(p.date).toLocaleDateString('en-US', {year:'numeric', month:'long', day:'numeric'})}
            {p.author && <> · By {p.author}</>}
          </p>
        </div>
      </header>

      {p.featured_image && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="aspect-[16/9] bg-wood-100 rounded-lg overflow-hidden">
            <img src={p.featured_image} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="wp-content" dangerouslySetInnerHTML={{__html: p.content}} />

        <div className="mt-12 pt-8 border-t border-wood-200">
          <Link href="/contact" className="inline-flex items-center px-6 py-3 rounded-md bg-wood-700 text-wood-50 font-medium hover:bg-wood-800">
            Have a Project? Get a Quote →
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <section className="bg-wood-50 border-t border-wood-200 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-wood-900 mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map(r => (
                <Link key={r.id} href={`/blog/${r.slug}`} className="bg-white border border-wood-200 rounded-lg overflow-hidden hover:shadow-md transition">
                  {r.featured_image && <div className="aspect-[16/10] bg-wood-100"><img src={r.featured_image} alt="" className="w-full h-full object-cover" /></div>}
                  <div className="p-4">
                    <h3 className="font-medium text-wood-800 hover:text-wood-600 line-clamp-3 text-sm leading-snug" dangerouslySetInnerHTML={{__html: r.title}} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

function stripHtml(s) { return (s || '').replace(/<[^>]+>/g, '').replace(/\s+/g,' ').trim(); }
