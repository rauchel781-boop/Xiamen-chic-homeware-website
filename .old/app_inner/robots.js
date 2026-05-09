import { site } from '@/lib/data';

export default function robots() {
  const base = site().home_url || 'https://xmchichomeware.com';
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/cart'] }],
    sitemap: `${base}/sitemap.xml`,
  };
}
