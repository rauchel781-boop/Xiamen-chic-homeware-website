// Visual grid of top product categories.
// Each card uses the first product's featured image as the cover.
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { wpProducts, wpProductCategories } from '@/lib/wp-data';

// Slugs are locale-neutral (URL identifiers). label/blurb come from i18n.
const TOP_CAT_SLUGS = [
  'wooden-kitchen-dining',
  'storage-home-organization',
  'gift-boxes-retail-packaging',
  'desk-office-organizers',
  'pet-products',
  'hospitality-commercial',
];

export default function CategoriesGrid() {
  const t = useTranslations('home.categoriesGrid');
  const products = wpProducts();
  const cats = wpProductCategories();

  const TOP_CATS = TOP_CAT_SLUGS.map((slug, i) => ({
    slug,
    label: t(`cat${i + 1}Label`),
    blurb: t(`cat${i + 1}Blurb`),
  }));

  // Build category → first available product image
  const coverFor = (slug) => {
    // direct match
    let p = products.find(p => p.categories?.some(c => c.slug === slug && p.featured_image));
    if (p) return p.featured_image;
    // child match (find category id, then any descendant slug)
    const cat = cats.find(c => c.slug === slug);
    if (!cat) return '';
    const childSlugs = cats.filter(c => String(c.parent) === String(cat.id)).map(c => c.slug);
    p = products.find(p => p.categories?.some(c => childSlugs.includes(c.slug)) && p.featured_image);
    return p?.featured_image || '';
  };

  return (
    <section className="bg-brand-cream py-20 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide text-brand-ink uppercase">
            {t('title')}
          </h2>
          <p className="mt-3 text-brand-mute max-w-2xl mx-auto">
            {t('intro')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOP_CATS.map((cat) => {
            const cover = coverFor(cat.slug);
            return (
              <Link
                key={cat.slug}
                href={`/products/${cat.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-brand-line hover:shadow-xl transition"
              >
                <div className="relative aspect-[4/3] bg-white overflow-hidden">
                  {cover ? (
                    <Image
                      src={cover}
                      alt={cat.label}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-mute text-sm">{t('noImage')}</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <h3 className="text-xl font-extrabold">{cat.label}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-brand-mute leading-relaxed">{cat.blurb}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand-green group-hover:text-brand-greenDark">
                    {t('viewCategory')} →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
