import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categoryBySlug, productsByCategory, productCategories, categoryTree } from '@/lib/data';

export function generateStaticParams() {
  return productCategories().map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const cat = categoryBySlug(params.slug);
  if (!cat) return {};
  return {
    title: cat.name,
    description: cat.description || `Shop our ${cat.name.toLowerCase()} collection — custom wooden and bamboo manufacturing for retailers and brands.`,
  };
}

export default function CategoryPage({ params }) {
  const cat = categoryBySlug(params.slug);
  if (!cat) notFound();
  const items = productsByCategory(params.slug);

  const subCats = categoryTree()
    .flatMap(c => c.id === cat.id ? c.children : c.children?.find(x => x.id === cat.id)?.children || [])
    .filter(Boolean);

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-xs text-wood-600 mb-4">
        <Link href="/" className="hover:text-wood-800">Home</Link>
        {' / '}
        <Link href="/products" className="hover:text-wood-800">Products</Link>
        {' / '}
        <span className="text-wood-800">{cat.name}</span>
      </nav>

      <header className="mb-10">
        <h1 className="font-serif text-4xl font-bold text-wood-900">{cat.name}</h1>
        {cat.description ? (
          <div className="mt-3 text-wood-700 max-w-3xl wp-content" dangerouslySetInnerHTML={{__html: cat.description}} />
        ) : (
          <p className="mt-3 text-wood-600">{items.length} products</p>
        )}
      </header>

      {subCats.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2">
          {subCats.map(sc => (
            <Link key={sc.id} href={`/categories/${sc.slug}`} className="px-3 py-1.5 rounded-full bg-wood-100 text-wood-700 text-sm hover:bg-wood-200">
              {sc.name}
            </Link>
          ))}
        </div>
      )}

      {items.length === 0 ? (
        <p className="text-wood-600">No products in this category yet. <Link href="/products" className="underline">Browse all products</Link>.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map(p => (
            <Link key={p.id} href={`/products/${p.slug}`} className="group bg-white border border-wood-200 rounded-lg overflow-hidden hover:shadow-md transition">
              <div className="aspect-square bg-wood-100">
                {p.featured_image && <img src={p.featured_image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />}
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-wood-800 group-hover:text-wood-600 line-clamp-2">{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
