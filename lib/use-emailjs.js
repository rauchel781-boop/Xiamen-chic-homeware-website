'use client';

// ─────────────────────────────────────────────────────────────────────────
// useEmailJS — loads the EmailJS browser SDK from CDN and initializes it.
// Returns { ready, send } where send(templateId, params) resolves to
// EmailJS's response. If keys are placeholders or the script fails,
// `ready` stays false and the caller should fall back to mailto.
// ─────────────────────────────────────────────────────────────────────────

import { useEffect, useState, useCallback } from 'react';
import { SITE, isEmailJSConfigured } from '@/data/site-config';

const CDN = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';

export function useEmailJS() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isEmailJSConfigured()) return;
    if (typeof window === 'undefined') return;
    if (window.emailjs) {
      try { window.emailjs.init(SITE.emailjs.publicKey); } catch {}
      setReady(true);
      return;
    }
    const existing = document.querySelector(`script[src="${CDN}"]`);
    if (existing) {
      existing.addEventListener('load', () => {
        try { window.emailjs.init(SITE.emailjs.publicKey); } catch {}
        setReady(true);
      });
      return;
    }
    const s = document.createElement('script');
    s.src = CDN;
    s.async = true;
    s.onload = () => {
      try { window.emailjs.init(SITE.emailjs.publicKey); } catch {}
      setReady(true);
    };
    s.onerror = () => setReady(false);
    document.head.appendChild(s);
  }, []);

  const send = useCallback(async (templateId, params) => {
    if (!ready || !window.emailjs) {
      throw new Error('EmailJS not ready');
    }
    return window.emailjs.send(SITE.emailjs.serviceId, templateId, params);
  }, [ready]);

  return { ready, send };
}
