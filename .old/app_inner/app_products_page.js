import Link from 'next/link';
import { products, categoryTree } from '@/lib/data';

export const metadata = {
  title: 'All Products',
  description: 'Browse our full range of custom wooden and bamboo home storage products.',
};

export default function ProductsIndex() {
  const all = products();
  const cats = categoryTree();
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-wood-900">All Products</h1>
        <p className="mt-2 text-wood-600">{all.length} products across {cats.length} categories</p>
      </header>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-semibold text-wood-800 mb-3 text-sm uppercase tracking-wider">Categories</h2>
          <ul className="space-y-1 text-sm">
            {cats.filter(c=>c.slug!=='uncategorized').map(c => (
              <li key={c.id}>
                <Link href={`/categories/${c.slug}`} className="block py-1.5 text-wood-700 hover:text-wood-900">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {all.map(p => (
            <Link key={p.id} href={`/products/${p.slug}`} className="group bg-white border border-wood-200 rounded-lg overflow-hidden hover:shadow-md transition">
              <div className="aspect-square bg-wood-100">
                {p.featured_image ? (
                  <img src={p.featured_image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-wood-400 text-xs">No image</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-wood-800 group-hover:text-wood-600 line-clamp-2">{p.title}</h3>
                {p.categories?.[0] && (
                  <p className="mt-1 text-xs text-wood-500">{p.categories[0].name}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
