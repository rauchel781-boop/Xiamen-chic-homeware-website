import './globals.css';
import { site } from '@/lib/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const s = site();

export const metadata = {
  title: { default: s.title, template: `%s | CHIC Homeware` },
  description: s.description,
  metadataBase: new URL(s.home_url || 'https://xmchichomeware.com'),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
