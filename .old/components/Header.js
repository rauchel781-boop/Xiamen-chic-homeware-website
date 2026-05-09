import Link from 'next/link';
import { mainMenu, site } from '@/lib/data';

export default function Header() {
  const menu = mainMenu();
  const s = site();
  return (
    <header className="bg-wood-50 border-b border-wood-200 sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-wood-50/90">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-serif text-2xl font-bold text-wood-800 group-hover:text-wood-600 transition">
              CHIC
            </span>
            <span className="hidden sm:inline text-xs text-wood-600 leading-tight">
              Homeware<br/>Manufacturer
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {menu.map(item => (
              <NavItem key={item.id} item={item} />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-md bg-wood-700 text-wood-50 text-sm font-medium hover:bg-wood-800 transition"
            >
              Get a Quote
            </Link>
            <button className="lg:hidden p-2" aria-label="Menu">
              <svg className="w-6 h-6 text-wood-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavItem({ item }) {
  const hasChildren = item.children?.length > 0;
  const href = normalizeHref(item.url);
  if (!hasChildren) {
    return (
      <Link href={href} className="px-3 py-2 text-sm font-medium text-wood-800 hover:text-wood-600 transition">
        {item.title}
      </Link>
    );
  }
  return (
    <div className="relative group">
      <Link
        href={href}
        className="px-3 py-2 text-sm font-medium text-wood-800 hover:text-wood-600 transition flex items-center gap-1"
      >
        {item.title}
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </Link>
      <div className="absolute left-0 top-full pt-2 hidden group-hover:block z-50 min-w-[260px]">
        <div className="bg-white border border-wood-200 rounded-md shadow-lg py-2">
          {item.children.map(child => (
            <SubItem key={child.id} item={child} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SubItem({ item }) {
  const href = normalizeHref(item.url);
  const hasChildren = item.children?.length > 0;
  if (!hasChildren) {
    return (
      <Link href={href} className="block px-4 py-2 text-sm text-wood-800 hover:bg-wood-50 hover:text-wood-600">
        {item.title}
      </Link>
    );
  }
  return (
    <div className="relative group/sub">
      <Link href={href} className="flex items-center justify-between px-4 py-2 text-sm text-wood-800 hover:bg-wood-50 hover:text-wood-600">
        <span>{item.title}</span>
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L10.94 10 7.23 6.29a.75.75 0 011.04-1.08l4.25 4.25a.75.75 0 010 1.08l-4.25 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
        </svg>
      </Link>
      <div className="absolute left-full top-0 hidden group-hover/sub:block min-w-[240px]">
        <div className="bg-white border border-wood-200 rounded-md shadow-lg py-2 ml-1">
          {item.children.map(c => (
            <Link key={c.id} href={normalizeHref(c.url)} className="block px-4 py-2 text-sm text-wood-800 hover:bg-wood-50 hover:text-wood-600">
              {c.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function normalizeHref(url) {
  if (!url) return '/';
  if (url.startsWith('http')) return url;
  if (url === '/home') return '/';
  return url;
}
