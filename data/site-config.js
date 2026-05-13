// ─────────────────────────────────────────────────────────────────────────
// SITE CONFIG — single source of truth for contact, social, and EmailJS.
// Update values here and they propagate to Header, Footer, Contact, Blog, Home CTA.
// ─────────────────────────────────────────────────────────────────────────

export const SITE = {
  // 站点 URL — SEO/sitemap/robots/canonical/OG 全都从这里取（不要带末尾斜杠）。
  siteUrl: 'https://xmchichomeware.com',

  company: {
    legalName: 'Xiamen Chic Homeware Co.,Ltd.',
    brand: 'CHIC',
    tagline: 'Wooden Expert',
  },

  email: 'info@xmchichomeware.com',

  whatsapp: {
    // Raw number (no spaces/dashes/+) used to build wa.me link
    number: '8618960098762',
    // Pretty version shown on the page
    display: '+86 189 6009 8762',
    // Click-to-chat URL — opens WhatsApp / WhatsApp Web
    chatUrl: 'https://wa.me/8618960098762',
  },

  wechat: {
    // The user's WeChat ID
    id: '86-18960098762',
    // Note shown next to the ID
    note: 'Search this ID in WeChat to add us',
  },

  social: {
    linkedin: 'https://www.linkedin.com/company/105598253',
    youtube:  'https://www.youtube.com/@XiamenChic',
    alibaba:  'https://quke.en.alibaba.com',
  },

  hours: 'Mon–Sat · 9:00–18:00 (GMT+8)',

  addresses: {
    salesOffice: {
      label: 'Sales Office',
      city: 'Xiamen, Fujian',
      lines: [
        '101, No. 8 Houweizhaiding Road, Maluan,',
        'Xinglin, Jimei District, Xiamen,',
        'Fujian, China',
      ],
      role: 'Sales · design · export documentation · sample coordination',
    },
    factory: {
      label: 'Factory · 15,000 m²',
      city: 'Cao County, Shandong',
      lines: [
        'North of the Administration for Market Regulation Office,',
        'Pulianji Village, Pulianji Town, Cao County,',
        'Heze City, Shandong Province, China',
      ],
      role: 'Manufacturing · finishing · QC · packing · 120+ skilled workers',
    },
  },

  // ─────────────────────────────────────────────────────────────────────
  // EmailJS — fill these from your EmailJS dashboard
  // (https://dashboard.emailjs.com → Account → API Keys, and the IDs
  // from the Email Services and Email Templates pages).
  //
  // SETUP:
  //   1. Sign up at https://www.emailjs.com (free tier: 200 emails/month)
  //   2. Add an Email Service connected to info@xmchichomeware.com
  //      (Gmail, Outlook, or "Other SMTP" — copy the Service ID)
  //   3. Create TWO Email Templates:
  //        a) "Contact Form"     — variables: name, email, company, message, source
  //        b) "Newsletter Sub"   — variables: email, source
  //      Copy each Template ID.
  //   4. Get your Public Key from Account → API Keys.
  //   5. Replace the YOUR_… placeholders below.
  //
  // While placeholders remain, all forms gracefully fall back to mailto.
  // ─────────────────────────────────────────────────────────────────────
  emailjs: {
    publicKey:           'pRCcl_i5yn6UkOPJR',
    serviceId:           'service_pnqxbpa',
    contactTemplateId:   'template_gua3mo9',
    newsletterTemplateId:'template_51pc4th',
  },

  // ─────────────────────────────────────────────────────────────────────
  // Google Analytics 4 — site-wide page-view + event tracking.
  // The measurement ID lives in GA4 dashboard → Admin → Data streams.
  // GA4 auto-tracks SPA route changes via Enhanced Measurement, so the
  // basic gtag.js install is enough — no manual router.events wiring.
  // Set measurementId to '' to disable GA entirely (useful for dev/staging).
  // ─────────────────────────────────────────────────────────────────────
  googleAnalytics: {
    measurementId: 'G-3B2XSYMNC6',
  },

  // ─────────────────────────────────────────────────────────────────────
  // Microsoft Clarity — free heatmaps + session recordings.
  // Project ID lives at clarity.microsoft.com → Settings → Setup.
  // Complements GA4: GA gives the "what" (numbers), Clarity gives the
  // "why" (actual user behavior — rage clicks, dead clicks, scroll depth).
  // Set projectId to '' to disable.
  // ─────────────────────────────────────────────────────────────────────
  microsoftClarity: {
    projectId: 'wq9r1ngdo9',
  },

  // ─────────────────────────────────────────────────────────────────────
  // Team — named individuals behind the company.
  // Each entry is rendered as a Person schema.org card on /about/team and
  // (for `chuan` and `cassie`) used as the author on blog posts.
  // The `slug` is the i18n key prefix in messages/en.json `team` namespace.
  // ─────────────────────────────────────────────────────────────────────
  team: [
    { slug: 'chuan',    name: 'Chuan Pu',       photo: '/people/chuan-pu.png',       roleKey: 'chuanRole',    bioKey: 'chuanBio'    },
    { slug: 'cassie',   name: 'Cassie Zhang',   photo: '/people/cassie-zhang.jpg',   roleKey: 'cassieRole',   bioKey: 'cassieBio'   },
    { slug: 'yucheng',  name: 'Yucheng Lu',     photo: '/people/yucheng-lu.png',     roleKey: 'yuchengRole',  bioKey: 'yuchengBio'  },
    { slug: 'vivi',     name: 'Vivi Cheng',     photo: '/people/vivi-cheng.png',     roleKey: 'viviRole',     bioKey: 'viviBio'     },
    { slug: 'lingling', name: 'Lingling Zhang', photo: '/people/lingling-zhang.png', roleKey: 'linglingRole', bioKey: 'linglingBio' },
  ],

  // Blog authors — rotation pool. Each post's author is picked
  // deterministically from this list based on slug hash (see
  // app/[locale]/blog/[slug]/page.js). All entries must also exist in
  // the `team` array above so their bios are reachable.
  blogAuthors: ['chuan', 'cassie'],

  // ─────────────────────────────────────────────────────────────────────
  // Alibaba — verified-supplier status to display in trust strips.
  // tier: 'gold' shows the Gold Supplier badge text + year on join.
  // ─────────────────────────────────────────────────────────────────────
  alibaba: {
    tier: 'gold',
    joinYear: 2025,
    url: 'https://quke.en.alibaba.com',
  },

  // Bump this date whenever we re-run scripts/translate.mjs to regenerate
  // de/es/fr/ja content. It becomes the BlogPosting.dateModified value on
  // translated locale variants and the basis for honest "freshness" signals.
  // English version uses the original WP post.date because the source
  // content hasn't changed.
  lastLocalizationDate: '2026-05-13',

  // Default Open Graph image used for pages without their own image
  // (home, generic landing pages, error fallbacks). Should be a 1200×630
  // factory photo so social shares look like a real B2B manufacturer
  // instead of just a logo card. Path is relative to /public.
  //
  // NOTE: if you want to update this, drop a 1200×630 image into
  // /public/og-default.jpg and change the path here. The filename uses a
  // hyphen (no spaces) so the URL stays clean across all crawlers/CDNs.
  defaultOgImage: '/CHIC%20Factory.jpg',
};

// Helper — true while EmailJS still has placeholder values, false once configured.
export function isEmailJSConfigured() {
  const e = SITE.emailjs;
  return !(
    e.publicKey.startsWith('YOUR_') ||
    e.serviceId.startsWith('YOUR_') ||
    e.contactTemplateId.startsWith('YOUR_') ||
    e.newsletterTemplateId.startsWith('YOUR_')
  );
}
