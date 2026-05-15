'use client';

import { useState, useRef } from 'react';
import { useRouter } from '@/i18n/navigation';

const TARGET_EMAIL = 'sales@xmchichomeware.com';

export default function ContactClient() {
  const formRef = useRef(null);
  const router = useRouter();
  const [status, setStatus] = useState('idle');     // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');

  // Anti-bot timestamp: when the form first mounted. Real users take at
  // least a few seconds to read + fill out a B2B inquiry form; bots fire
  // in milliseconds. The /api/contact route compares this against a 3s
  // floor and silently drops faster submissions.
  const loadedAtRef = useRef(typeof window !== 'undefined' ? Date.now() : 0);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    const fd = new FormData(formRef.current);
    const payload = {
      name:    fd.get('name'),
      company: fd.get('company'),
      email:   fd.get('email'),
      phone:   fd.get('phone'),
      message: fd.get('message'),
      // Anti-bot pair (server-side validated):
      //   website_url → honeypot field (real users can't see it, bots autofill)
      //   elapsed_ms  → time from page-load to submit
      website_url: fd.get('website_url') || '',
      elapsed_ms:  Date.now() - (loadedAtRef.current || 0),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus('sent');
        formRef.current.reset();
        // Redirect to the formal thank-you page after a short flash
        // of "Sent ✓" so the user has visual confirmation here too.
        setTimeout(() => router.push('/thank-you'), 600);
        return;
      }

      const body = await res.json().catch(() => ({}));
      // Backend not configured → fall back to mailto
      if (body?.code === 'no_backend') {
        window.location.href = buildMailtoLink(payload);
        setStatus('sent'); // assume the user will hit send
        return;
      }
      setStatus('error');
      // Surface Resend's actual error message (e.g. "from must be a verified domain")
      // so the user can fix the underlying problem instead of just seeing "Send failed".
      let detail = body?.detail || '';
      try { const j = JSON.parse(detail); detail = j?.message || detail; } catch {}
      setErrorMsg(detail || body?.error || `Send failed (HTTP ${res.status})`);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err?.message || 'Network error');
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-4">
      {/* ── HONEYPOT ──
          Hidden field that real visitors never see or fill. Naive crawlers
          / form-stuffing bots autofill every input on the page → the field
          gets a value → server silently rejects the submission. We use
          position:absolute+offscreen instead of display:none because some
          smarter bots skip display:none traps. tabIndex={-1} + aria-hidden
          keep this invisible to keyboard users and screen readers, and
          autoComplete="off" prevents password managers from filling it. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden"
      >
        <label htmlFor="website_url">Website URL (leave this empty)</label>
        <input
          type="text"
          id="website_url"
          name="website_url"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <Field label="Your Name *" name="name" required />
      <Field label="Company" name="company" />
      <Field label="Email *" name="email" type="email" required />
      <Field label="Phone / WhatsApp" name="phone" />
      <div className="sm:col-span-2">
        <label className="block text-sm font-semibold text-brand-ink mb-1.5">
          Product / Project Details *
        </label>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Tell us about quantity, materials, custom branding, target launch date, etc."
          className="w-full rounded-lg border border-brand-line bg-white px-4 py-3 text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
        />
      </div>

      <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center rounded-full bg-brand-green px-8 py-3 text-[15px] font-semibold text-white hover:bg-brand-greenDark disabled:opacity-60 transition"
        >
          {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent ✓' : 'Send Inquiry'}
        </button>

        {status === 'sent' && (
          <span className="text-sm text-green-700 font-medium">
            Thanks — we&apos;ll reply within 24 hours.
          </span>
        )}
        {status === 'error' && (
          <span className="text-sm text-red-600">
            {errorMsg ? `Error: ${errorMsg} — ` : ''}
            <a href={`mailto:${TARGET_EMAIL}`} className="underline font-semibold hover:text-red-700">
              email us directly →
            </a>
          </span>
        )}
      </div>
    </form>
  );
}

function Field({ label, name, type = 'text', required }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-brand-ink mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-lg border border-brand-line bg-white px-4 py-3 text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
      />
    </div>
  );
}

// Build a mailto: link with prefilled body — used as a fallback when the
// API returns "no_backend" (i.e. the host hasn't configured an email service).
function buildMailtoLink({ name, company, email, phone, message }) {
  const subject = `New Inquiry — ${name}${company ? ` (${company})` : ''}`;
  const body = [
    `Name:    ${name}`,
    company ? `Company: ${company}` : null,
    `Email:   ${email}`,
    phone   ? `Phone:   ${phone}` : null,
    '',
    'Message:',
    message,
  ].filter(Boolean).join('\n');
  return `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
