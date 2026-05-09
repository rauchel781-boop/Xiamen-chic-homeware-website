import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <p className="text-sm font-semibold text-wood-600 uppercase tracking-wider">404</p>
      <h1 className="mt-3 font-serif text-4xl font-bold text-wood-900">Page Not Found</h1>
      <p className="mt-4 text-wood-600">The page you're looking for doesn't exist or has been moved.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="px-5 py-2.5 rounded-md bg-wood-700 text-wood-50 font-medium hover:bg-wood-800">Home</Link>
        <Link href="/products" className="px-5 py-2.5 rounded-md border border-wood-700 text-wood-800 font-medium hover:bg-wood-50">Browse Products</Link>
      </div>
    </div>
  );
}
