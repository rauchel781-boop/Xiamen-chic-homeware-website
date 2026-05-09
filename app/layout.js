// Pass-through root layout. The real <html><body> + Header/Footer live in
// app/[locale]/layout.js so the lang attribute matches the active locale.
//
// We still export `metadata` here so files that don't live under [locale]
// (sitemap.js, robots.js) inherit the metadataBase & icons.
import './globals.css';
import { SITE } from '@/data/site-config';

export const metadata = {
  metadataBase: new URL(SITE.siteUrl),
  icons: { icon: '/logo.png', apple: '/logo.png' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#3D2A1F',
};

export default function RootLayout({ children }) {
  return children;
}
