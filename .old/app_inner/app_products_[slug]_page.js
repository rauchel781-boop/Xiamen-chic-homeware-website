import Link from 'next/link';
import { notFound } from 'next/navigation';
import { productBySlug, products } from '@/lib/data';

export function generateStaticParams() {
  return products().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = productBySlug(params.slug);
  if (!p) return {};
  return {
    title: p.meta_title || p.title,
    description: p.meta_desc || stripHtml(p.excerpt || p.content).slice(0, 160),
    openGraph: {
      images: p.featured_image ? [p.featured_image] : [],
    },
  };
}

export default function ProductPage({ params }) {
  const p = productBySlug(params.slug);
  if (!p) notFound();

  const related = products()
    .filter(x => x.id !== p.id && x.categories?.some(c => p.categories?.some(pc => pc.slug === c.slug)))
    .slice(0, 4);

  return (
    <article className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-xs text-wood-600 mb-6">
        <Link href="/" className="hover:text-wood-800">Home</Link>
        {' / '}
        <Link href="/products" className="hover:text-wood-800">Products</Link>
        {p.categories?.[0] && (
          <>
            {' / '}
            <Link href={`/categories/${p.categories[0].slug}`} className="hover:text-wood-800">{p.categories[0].name}</Link>
          </>
        )}
        {' / '}
        <span className="text-wood-800">{p.title}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 mb-12">
        <div>
          <div className="aspect-square bg-wood-100 rounded-lg overflow-hidden">
            {p.featured_image ? (
              <img src={p.featured_image} alt={p.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-wood-400">No image</div>
            )}
          </div>
          {p.gallery?.length > 0 && (
            <div className="grid grid-cols-4 gap-3 mt-4">
              {p.gallery.slice(0, 8).map((g, i) => (
                <div key={i} className="aspect-square bg-wood-100 rounded overflow-hidden">
                  <img src={g} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-wood-900 leading-tight">{p.title}</h1>
          {p.categories?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {p.categories.map(c => (
                <Link key={c.slug} href={`/categories/${c.slug}`} className="text-xs px-2.5 py-1 rounded-full bg-wood-100 text-wood-700 hover:bg-wood-200">
                  {c.name}
                </Link>
              ))}
            </div>
          )}
          {p.excerpt && (
            <div className="mt-5 text-wood-700 wp-content" dangerouslySetInnerHTML={{__html: p.excerpt}} />
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex items-center px-6 py-3 rounded-md bg-wood-700 text-wood-50 font-medium hover:bg-wood-800">
              Request a Quote
            </Link>
            <a href={`mailto:?subject=Inquiry: ${encodeURIComponent(p.title)}`} className="inline-flex items-center px-6 py-3 rounded-md border border-wood-700 text-wood-800 font-medium hover:bg-wood-50">
              Email Inquiry
            </a>
          </div>
        </div>
      </div>

      {p.content && (
        <section className="border-t border-wood-200 pt-10">
          <div className="wp-content max-w-4xl mx-auto" dangerouslySetInnerHTML={{__html: p.content}} />
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-16 border-t border-wood-200 pt-12">
          <h2 className="font-serif text-2xl font-bold text-wood-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map(r => (
              <Link key={r.id} href={`/products/${r.slug}`} className="group bg-white border border-wood-200 rounded-lg overflow-hidden hover:shadow-md transition">
                <div className="aspect-square bg-wood-100">
                  {r.featured_image && <img src={r.featured_image} alt={r.title} className="w-full h-full object-cover" />}
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-wood-800 line-clamp-2">{r.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function stripHtml(s) { return (s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(); }
