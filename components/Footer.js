'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

// Clean, simple footer matching the xmchichomeware.com aesthetic.
// Replaces the previous translation-driven, EmailJS-dependent footer.

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');

  // Built inside the component so labels resolve in the active locale.
  const productLinks = [
    { label: t('footer.productKitchen'),     href: '/products/wooden-kitchen-dining' },
    { label: t('footer.productStorage'),     href: '/products/storage-home-organization' },
    { label: t('footer.productGift'),        href: '/products/gift-boxes-retail-packaging' },
    { label: t('footer.productDesk'),        href: '/products/desk-office-organizers' },
    { label: t('footer.productPet'),         href: '/products/pet-products' },
    { label: t('footer.productHospitality'), href: '/products/hospitality-commercial' },
  ];

  const companyLinks = [
    { label: t('footer.linkAbout'),       href: '/about' },
    { label: t('footer.linkMaterials'),   href: '/material-guide' },
    { label: t('footer.linkCustomBoxes'), href: '/custom-wooden-boxes' },
    { label: t('footer.linkFactory'),     href: '/wooden-box-factory-in-china' },
    { label: t('footer.linkBlog'),        href: '/blog' },
    { label: t('footer.linkContact'),     href: '/contact' },
  ];

  function subscribe(e) {
    e.preventDefault();
    if (!email) return;
    setState('sending');
    // TODO: wire to your newsletter endpoint or mailto fallback
    setTimeout(() => {
      setState('done');
      setEmail('');
    }, 700);
  }

  return (
    <footer className="bg-brand-greenDeep text-white/80 mt-20">
      {/* Newsletter band */}
      <div className="bg-brand-greenDark border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-10 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-brand-yellowSoft font-semibold">
              {t('footer.newsletterEyebrow')}
            </p>
            <h3 className="mt-2 text-2xl font-extrabold text-white">
              {t('footer.newsletterTitle')}
            </h3>
          </div>
          <form onSubmit={subscribe} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={t('footer.newsletterPlaceholder')}
              className="flex-1 rounded-full bg-white/10 border border-white/20 px-5 py-3 text-white placeholder-white/50 focus:outline-none focus:border-brand-yellowSoft"
            />
            <button
              type="submit"
              disabled={state === 'sending'}
              className="rounded-full bg-white text-brand-green px-6 py-3 text-sm font-bold hover:bg-brand-cream disabled:opacity-60 transition shrink-0"
            >
              {state === 'sending'
                ? t('cta.sending')
                : state === 'done'
                ? t('footer.subscribedConfirm')
                : t('footer.subscribeArrow')}
            </button>
          </form>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <span className="inline-flex h-9 w-9 items-center justify-center text-white">
              <svg viewBox="0 0 40 40" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round">
                <path d="M20 4 L34 12 L34 28 L20 36 L6 28 L6 12 Z" />
                <path d="M20 4 L20 20 L6 12" />
                <path d="M20 20 L34 12" />
                <path d="M20 20 L20 36" />
              </svg>
            </span>
            <span className="leading-tight">
              <span className="block text-xl font-extrabold tracking-tight text-white">CHIC</span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-white/60 -mt-0.5">wooden expert</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-white/65 max-w-xs">
            {t('footer.brandBlurb')}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge>FSC Sourced</Badge>
            <Badge>EU REACH</Badge>
            <Badge>ISO 9001</Badge>
          </div>
        </div>

        {/* Products */}
        <div>
          <h4 className="text-[11px] uppercase tracking-[0.25em] text-brand-yellowSoft font-bold mb-4">
            {t('footer.products')}
          </h4>
          <ul className="space-y-2.5 text-sm">
            {productLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/70 hover:text-white">{l.label}</Link>
              </li>
            ))}
            <li><Link href="/products" className="text-brand-yellowSoft hover:text-white">{t('footer.viewAllArrow')}</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-[11px] uppercase tracking-[0.25em] text-brand-yellowSoft font-bold mb-4">
            {t('footer.company')}
          </h4>
          <ul className="space-y-2.5 text-sm">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/70 hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[11px] uppercase tracking-[0.25em] text-brand-yellowSoft font-bold mb-4">
            {t('footer.getInTouch')}
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <div className="text-white/50 text-[11px] uppercase tracking-wider">{t('footer.email')}</div>
              <a href="mailto:sales@xmchichomeware.com" className="text-white hover:text-brand-yellowSoft">
                sales@xmchichomeware.com
              </a>
            </li>
            <li>
              <div className="text-white/50 text-[11px] uppercase tracking-wider">{t('footer.whatsapp')}</div>
              <a href="https://wa.me/8618960098762" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-yellowSoft">
                +86 189 6009 8762
              </a>
            </li>
            <li>
              <div className="text-white/50 text-[11px] uppercase tracking-wider">{t('footer.salesOffice')}</div>
              <span className="text-white/70">{t('footer.xiamenAddress')}</span>
            </li>
            <li>
              <div className="text-white/50 text-[11px] uppercase tracking-wider">{t('footer.factoryLabel')}</div>
              <span className="text-white/70">{t('footer.caoAddress')}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/50">
          <span>© {year} Xiamen Chic Homeware Co.,Ltd. {t('footer.allRightsReserved')}</span>
          <span className="uppercase tracking-wider">✦ {t('footer.madeInXiamen')}</span>
        </div>
      </div>
    </footer>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold border border-white/20 text-white/70">
      {children}
    </span>
  );
}
