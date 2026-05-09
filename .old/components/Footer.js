import Link from 'next/link';
import { categoryTree } from '@/lib/data';

export default function Footer() {
  const cats = categoryTree().slice(0, 6);
  return (
    <footer className="bg-wood-900 text-wood-100 mt-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-serif text-2xl font-bold text-wood-50">CHIC</Link>
            <p className="mt-3 text-sm text-wood-200 leading-relaxed">
              Custom wooden &amp; bamboo home storage products. Factory-direct from Xiamen, China.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-wood-50 mb-3 text-sm uppercase tracking-wider">Products</h3>
            <ul className="space-y-2 text-sm">
              {cats.map(c => (
                <li key={c.id}>
                  <Link href={`/categories/${c.slug}`} className="text-wood-200 hover:text-wood-50">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-wood-50 mb-3 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/wooden-products-factory-in-china" className="text-wood-200 hover:text-wood-50">About Us</Link></li>
              <li><Link href="/wooden-box-factory-in-china" className="text-wood-200 hover:text-wood-50">Factory</Link></li>
              <li><Link href="/complete-guide-wood-materials-for-kitchenware" className="text-wood-200 hover:text-wood-50">Materials Guide</Link></li>
              <li><Link href="/blog" className="text-wood-200 hover:text-wood-50">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-wood-50 mb-3 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-2 text-sm text-wood-200">
              <li>Xiamen, China</li>
              <li><Link href="/contact" className="hover:text-wood-50">Get a Quote</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-wood-800 flex flex-col md:flex-row justify-between gap-4 text-xs text-wood-300">
          <p>© {new Date().getFullYear()} CHIC Homeware. All rights reserved.</p>
          <p>Wooden &amp; Bamboo Kitchen Storage, Bread Boxes &amp; Organizers Manufacturer</p>
        </div>
      </div>
    </footer>
  );
}
