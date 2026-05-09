import Link from 'next/link';
import { notFound } from 'next/navigation';
import { pageBySlug, pages } from '@/lib/data';
import ContactForm from '@/components/ContactForm';

const RESERVED = new Set(['products', 'blog', 'categories', 'home', 'cart']);

export function generateStaticParams() {
  return pages()
    .filter(p => !RESERVED.has(p.slug))
    .map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = pageBySlug(params.slug);
  if (!p) return {};
  return {
    title: p.meta_title || stripHtml(p.title),
    description: p.meta_desc || stripHtml(p.excerpt).slice(0, 160) || undefined,
  };
}

export default function PageRoute({ params }) {
  if (RESERVED.has(params.slug)) notFound();
  const p = pageBySlug(params.slug);
  if (!p) notFound();

  const isContact = params.slug === 'contact';
  const isElementor = /elementor/i.test(p.content?.slice(0, 500) || '');

  return (
    <article>
      <header className="bg-wood-50 border-b border-wood-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="text-xs text-wood-600 mb-3">
            <Link href="/" className="hover:text-wood-800">Home</Link>
            {' / '}
            <span className="text-wood-800">{stripHtml(p.title)}</span>
          </nav>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-wood-900 leading-tight" dangerouslySetInnerHTML={{__html: p.title}} />
        </div>
      </header>

      {p.featured_image && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="aspect-[21/9] bg-wood-100 rounded-lg overflow-hidden">
            <img src={p.featured_image} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {isElementor && (
          <div className="mb-6 p-4 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-sm">
            <strong>Note:</strong> This page was originally built with Elementor. The HTML is rendered as-is below — visual styling may differ from the original until Elementor's CSS is migrated or the page is rebuilt as a Next.js component.
          </div>
        )}
        <div className="wp-content" dangerouslySetInnerHTML={{__html: p.content || ''}} />

        {isContact && (
          <section className="mt-10 pt-10 border-t border-wood-200">
            <h2 className="font-serif text-2xl font-bold text-wood-900 mb-4">Send Us a Message</h2>
            <ContactForm />
          </section>
        )}
      </div>
    </article>
  );
}

function stripHtml(s) { return (s || '').replace(/<[^>]+>/g, '').replace(/\s+/g,' ').trim(); }
