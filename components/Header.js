'use client';

import { useState } from 'react';
import { Link, usePathname } from '@/i18n/navigation';

// Simple header matching xmchichomeware.com layout:
// [logo]              Home  Product▼  Materials Guide  About Us  Blog  Contact   [Get A Free Quote]

const PRODUCT_GROUPS = [
  {
    title: 'Wooden Kitchen & Dining',
    items: [
      { label: 'Wooden Serving Tray',    href: '/products/wooden-serving-tray' },
      { label: 'Wooden Cheese Board',    href: '/products/wooden-cheese-board' },
      { label: 'Wooden Cutting Board',   href: '/products/wooden-cutting-board' },
      { label: 'Wooden Cutlery Organizer', href: '/products/wooden-cutlery-organizer' },
      { label: 'Wooden Bread Box',       href: '/products/wooden-bread-box' },
      { label: 'Wooden Spice Rack',      href: '/products/wooden-spice-rack' },
    ],
  },
  {
    title: 'Storage & Home Organization',
    items: [
      { label: 'Wooden Storage Box With Lid', href: '/products/wooden-storage-box-with-lid' },
      { label: 'Wooden Bathroom Organizer',   href: '/products/wooden-bathroom-organizer' },
      { label: 'Wooden Keepsake Boxes',       href: '/products/wooden-keepsake-boxes' },
      { label: 'Wooden Pantry Organizers',    href: '/products/wooden-pantry-organizers' },
      { label: 'Wooden Sofa Tray',            href: '/products/wooden-sofa-tray' },
    ],
  },
  {
    title: 'Gift Box & Retail Packaging',
    items: [
      { label: 'Wooden Gift Box',     href: '/products/wooden-gift-box' },
      { label: 'Wooden Watch Boxes',  href: '/products/wooden-watch-boxes' },
      { label: 'Wooden Jewelry Boxes', href: '/products/wooden-jewelry-boxes' },
      { label: 'Wooden Tea Box',      href: '/products/wooden-tea-box' },
      { label: 'Wooden Wine Box',     href: '/products/wooden-wine-box' },
    ],
  },
  {
    title: 'Desk & Office Organizers',
    items: [
      { label: 'Wooden Drawer Organizer', href: '/products/wooden-drawer-organizer' },
      { label: 'Wooden Pen Holders',      href: '/products/wooden-pen-holders' },
      { label: 'Wooden Document Trays',   href: '/products/wooden-document-trays' },
      { label: 'Wooden Valet Trays',      href: '/products/wooden-valet-trays' },
    ],
  },
  {
    title: 'Hospitality & Commercial',
    items: [
      { label: 'Hotel Amenity Trays',       href: '/products/hotel-amenity-trays' },
      { label: 'Restaurant Table Caddies',  href: '/products/restaurant-table-caddies' },
      { label: 'Bathroom Vanity Trays',     href: '/products/bathroom-vanity-trays' },
      { label: 'Airbnb Welcome Trays',      href: '/products/airbnb-welcome-trays' },
    ],
  },
  {
    title: 'Pet Products',
    items: [
      { label: 'All Pet Products', href: '/products/pet-products' },
    ],
  },
];

const NAV = [
  { label: 'Home',           href: '/' },
  { label: 'Product',        href: '/products', dropdown: true },
  { label: 'Materials Guide',href: '/material-guide' },
  { label: 'About Us',       href: '/about' },
  { label: 'Blog',           href: '/blog' },
  { label: 'Contact',        href: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-brand-line">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <span className="inline-flex h-10 w-10 items-center justify-center text-brand-green">
              <svg viewBox="0 0 40 40" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round">
                <path d="M20 4 L34 12 L34 28 L20 36 L6 28 L6 12 Z" />
                <path d="M20 4 L20 20 L6 12" />
                <path d="M20 20 L34 12" />
                <path d="M20 20 L20 36" />
              </svg>
            </span>
            <span className="leading-tight">
              <span className="block text-2xl font-extrabold tracking-tight text-brand-ink">CHIC</span>
              <span className="block text-[11px] uppercase tracking-[0.2em] text-brand-mute -mt-0.5">wooden expert</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((item) =>
              item.dropdown ? (
                <ProductDropdown key={item.label} label={item.label} href={item.href} />
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[15px] font-semibold text-brand-ink hover:text-brand-green transition"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white shadow-md hover:bg-brand-greenDark transition"
            >
              Get A Free Quote
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-brand-ink"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-brand-line py-4">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-[15px] font-semibold text-brand-ink hover:text-brand-green border-b border-brand-line/60"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 inline-flex items-center justify-center w-full rounded-full bg-brand-green px-7 py-3 text-[15px] font-semibold text-white"
            >
              Get a Free Quote
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

function ProductDropdown({ label, href }) {
  return (
    <div className="relative group">
      <Link
        href={href}
        className="text-[15px] font-semibold text-brand-ink hover:text-brand-green transition flex items-center gap-1"
      >
        {label}
        <svg className="w-3 h-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </Link>

      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 hidden group-hover:block z-50">
        <div
          className="bg-white border border-brand-line rounded-xl shadow-2xl p-6"
          style={{ width: 'min(900px, 90vw)' }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-5">
            {PRODUCT_GROUPS.map((g) => (
              <div key={g.title}>
                <h4 className="text-[12px] uppercase tracking-wider font-bold text-brand-green mb-2">
                  {g.title}
                </h4>
                <ul className="space-y-1.5">
                  {g.items.map((it) => (
                    <li key={it.href}>
                      <Link
                        href={it.href}
                        className="text-[13px] text-brand-ink hover:text-brand-green block"
                      >
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-brand-line">
            <Link href="/products" className="text-[13px] font-semibold text-brand-green hover:text-brand-greenDark">
              View all products →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
