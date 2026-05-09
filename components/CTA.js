import { Link } from '@/i18n/navigation';

export default function CTA() {
  return (
    <section className="bg-brand-navy text-white">
      <div className="container py-14 md:py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Ready to Start Your Custom Wood Project?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/85">
          Tell us your specs, drawings, and quantity. We&apos;ll send a quote and lead time within
          24 hours on business days.
        </p>
        <div className="mt-8">
          <Link href="/contact" className="btn-yellow">
            Send Us Your Needs Now
          </Link>
        </div>
      </div>
    </section>
  );
}
