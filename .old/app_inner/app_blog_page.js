import Link from 'next/link';
import { posts } from '@/lib/data';

export const metadata = {
  title: 'Blog — Wooden Homeware Sourcing',
  description: 'Sourcing guides, manufacturing know-how and material insights for wooden homeware buyers.',
};

export default function BlogIndex() {
  const all = posts();
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-10">
        <h1 className="font-serif text-4xl font-bold text-wood-900">Blog</h1>
        <p className="mt-2 text-wood-600">Sourcing guides &amp; manufacturing know-how — {all.length} articles</p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {all.map(p => (
          <article key={p.id} className="bg-white border border-wood-200 rounded-lg overflow-hidden hover:shadow-md transition">
            {p.featured_image && (
              <Link href={`/blog/${p.slug}`} className="block aspect-[16/10] bg-wood-100 overflow-hidden">
                <img src={p.featured_image} alt="" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
              </Link>
            )}
            <div className="p-5">
              <Link href={`/blog/${p.slug}`}>
                <h2 className="font-semibold text-wood-800 hover:text-wood-600 line-clamp-3 leading-snug" dangerouslySetInnerHTML={{__html: p.title}} />
              </Link>
              <p className="mt-3 text-xs text-wood-500">
                {new Date(p.date).toLocaleDateString('en-US', {year:'numeric', month:'short', day:'numeric'})}
                {p.categories?.[0] && <span> · {p.categories[0].name}</span>}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
