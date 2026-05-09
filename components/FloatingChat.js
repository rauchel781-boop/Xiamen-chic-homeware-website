'use client';

// Floating chat / contact widget — bottom-right corner of every page.
// Click the green button to open a small panel with 4 contact channels:
// WhatsApp · Email · Phone · WeChat. No third-party service needed.

import { useState, useEffect, useRef } from 'react';

const CHANNELS = [
  {
    key:   'whatsapp',
    label: 'WhatsApp Chat',
    value: '+86 189 6009 8762',
    note:  'Fastest reply · 09:00 – 22:00 UTC+8',
    href:  'https://wa.me/8618960098762?text=Hi%20CHIC%2C%20I%27m%20interested%20in%20your%20wooden%20products.',
    accent: 'from-emerald-500 to-emerald-600',
    icon:  'whatsapp',
    external: true,
  },
  {
    key:   'email',
    label: 'Email Us',
    value: 'sales@xmchichomeware.com',
    note:  'Best for detailed briefs &amp; attachments',
    href:  'mailto:sales@xmchichomeware.com?subject=Wooden%20Product%20Inquiry',
    accent: 'from-amber-500 to-orange-500',
    icon:  'mail',
  },
  {
    key:   'phone',
    label: 'Call Us',
    value: '+86 189 6009 8762',
    note:  'Mon – Sat, 09:00 – 18:00 UTC+8',
    href:  'tel:+8618960098762',
    accent: 'from-blue-500 to-sky-600',
    icon:  'phone',
  },
  {
    key:   'wechat',
    label: 'WeChat ID',
    value: '18960098762',
    note:  'Tap to copy — add us on WeChat',
    href:  null, // handled with copy-to-clipboard
    accent: 'from-green-600 to-green-700',
    icon:  'wechat',
    copyable: '18960098762',
  },
];

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(null);
  const [pulse, setPulse] = useState(true);
  const panelRef = useRef(null);
  const btnRef   = useRef(null);

  // Stop the attention-pulse after first interaction
  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 6000);
    return () => clearTimeout(t);
  }, []);

  // Close on click-outside / Esc
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (panelRef.current?.contains(e.target)) return;
      if (btnRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const handleCopy = (text, key) => {
    navigator.clipboard?.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <>
      {/* Panel */}
      <div
        ref={panelRef}
        className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[360px] bg-white rounded-2xl shadow-2xl border border-brand-line overflow-hidden transition-all duration-300 origin-bottom-right ${
          open ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
        }`}
        role="dialog"
        aria-label="Contact options"
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-brand-greenDark to-brand-greenDeep text-white p-5 relative">
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 6l12 12M6 18L18 6"/></svg>
          </button>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </span>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-brand-yellowSoft">CHIC · Wooden Expert</div>
              <div className="font-extrabold text-lg leading-tight">Hi! How can we help?</div>
            </div>
          </div>
          <p className="mt-3 text-sm text-white/80 leading-relaxed">
            Pick the channel that suits you best — we typically reply within a few hours
            during office time.
          </p>
        </div>

        {/* Channel list */}
        <div className="p-3">
          {CHANNELS.map((c) => {
            const Wrapper = c.href ? 'a' : 'button';
            const wrapperProps = c.href
              ? { href: c.href, target: c.external ? '_blank' : undefined, rel: c.external ? 'noopener noreferrer' : undefined }
              : { onClick: () => handleCopy(c.copyable, c.key), type: 'button' };
            return (
              <Wrapper
                key={c.key}
                {...wrapperProps}
                className="group flex items-center gap-3 w-full text-left rounded-xl p-3 hover:bg-brand-cream transition"
              >
                <span className={`shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${c.accent} text-white shadow-sm`}>
                  <ChatIcon name={c.icon} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-bold text-brand-ink leading-tight">{c.label}</span>
                  <span className="block text-[13px] text-brand-ink/85 truncate">{c.value}</span>
                  <span className="block text-[11px] text-brand-mute mt-0.5" dangerouslySetInnerHTML={{__html: c.note}} />
                </span>
                <span className="shrink-0 text-brand-mute group-hover:text-brand-green transition">
                  {c.copyable ? (
                    copied === c.key ? (
                      <span className="text-[11px] font-bold text-brand-green">Copied ✓</span>
                    ) : (
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                    )
                  ) : (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                  )}
                </span>
              </Wrapper>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 pt-2">
          <a
            href="/contact"
            className="block w-full text-center rounded-xl bg-brand-green text-white font-bold py-3 text-sm hover:bg-brand-greenDark transition"
          >
            Send a Detailed Inquiry →
          </a>
          <p className="mt-3 text-[11px] text-brand-mute text-center">
            Xiamen Chic Homeware Co., Ltd. · Cao County factory · Xiamen office
          </p>
        </div>
      </div>

      {/* Floating button */}
      <button
        ref={btnRef}
        onClick={() => { setOpen((v) => !v); setPulse(false); }}
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
        className="fixed bottom-5 right-4 sm:right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-green text-white shadow-xl hover:bg-brand-greenDark transition active:scale-95"
      >
        {/* attention pulse */}
        {pulse && !open && (
          <span className="absolute inset-0 rounded-full bg-brand-green animate-ping opacity-60" aria-hidden="true" />
        )}
        <span className="relative">
          {open ? (
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 6l12 12M6 18L18 6"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          )}
        </span>
        {/* unread dot — visible while pulse is on */}
        {pulse && !open && (
          <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-brand-yellowSoft border-2 border-white" aria-hidden="true" />
        )}
      </button>
    </>
  );
}

function ChatIcon({ name }) {
  const c = 'w-5 h-5';
  switch (name) {
    case 'whatsapp':
      return <svg viewBox="0 0 24 24" className={c} fill="currentColor"><path d="M17.6 6.32A8.78 8.78 0 0 0 12.05 4c-4.85 0-8.8 3.95-8.8 8.8 0 1.55.4 3.05 1.18 4.38L3.16 21.5l4.45-1.17a8.8 8.8 0 0 0 4.43 1.2h.01c4.85 0 8.8-3.95 8.8-8.8 0-2.35-.92-4.56-2.58-6.21zm-5.55 13.55h-.01a7.3 7.3 0 0 1-3.72-1.02l-.27-.16-2.78.73.74-2.71-.18-.28a7.27 7.27 0 0 1-1.12-3.9c0-4.04 3.29-7.32 7.34-7.32a7.3 7.3 0 0 1 5.18 2.15 7.27 7.27 0 0 1 2.15 5.18c0 4.04-3.29 7.33-7.33 7.33z"/></svg>;
    case 'mail':
      return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
    case 'phone':
      return <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 012 4.18 2 2 0 014 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L7.91 9.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>;
    case 'wechat':
      return <svg viewBox="0 0 24 24" className={c} fill="currentColor"><path d="M8.5 13.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm5 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM9.7 3C5.45 3 2 5.85 2 9.36c0 1.87.97 3.55 2.55 4.7-.13.4-.5 1.55-.55 1.78-.06.3.27.46.49.32.18-.11 1.6-1.05 1.99-1.31.65.18 1.33.28 2.04.3-.1-.45-.16-.92-.16-1.4C8.36 10.5 11.85 8 16.13 8c.32 0 .63.02.93.05C16.31 5.07 13.31 3 9.7 3zm12.3 11.06c0-2.91-2.91-5.27-6.5-5.27S9 11.15 9 14.06c0 2.92 2.91 5.27 6.5 5.27.74 0 1.45-.1 2.1-.28.34.21 1.55.94 1.7 1.03.18.11.45-.01.4-.27-.04-.18-.36-1.1-.46-1.43A4.99 4.99 0 0 0 22 14.06zm-8.45-.81a.81.81 0 1 1 0-1.62.81.81 0 0 1 0 1.62zm4 0a.81.81 0 1 1 0-1.62.81.81 0 0 1 0 1.62z"/></svg>;
    default: return null;
  }
}
