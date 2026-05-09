'use client';

import { useState } from 'react';
import { SITE, isEmailJSConfigured } from '@/data/site-config';
import { useEmailJS } from '@/lib/use-emailjs';

/**
 * NewsletterForm — reusable email subscription form.
 *
 * Props:
 *   source       — string label sent to EmailJS / mailto (e.g. "Footer", "Blog page")
 *   placeholder  — input placeholder text
 *   buttonLabel  — submit button label
 *   className    — optional wrapper class for styling integration
 *
 * Inherits its parent's CSS (e.g. `.news-form`, `.news-input`, `.news-btn`).
 */
export default function NewsletterForm({
  source = 'Newsletter',
  placeholder = 'Your business email',
  buttonLabel = 'Subscribe →',
  inputClassName = 'news-input',
  buttonClassName = 'news-btn',
  rowClassName = 'news-row',
  msgClassName = 'news-msg',
  fineClassName = '',
  showFine = false,
}) {
  const { ready, send } = useEmailJS();
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');
  const [msg, setMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setState('sending');
    setMsg('');

    if (isEmailJSConfigured() && ready) {
      try {
        await send(SITE.emailjs.newsletterTemplateId, { email, source });
        setState('done');
        setMsg('✓ Thanks — you\'re on the list. We\'ll be in touch.');
        setEmail('');
      } catch {
        setState('error');
        setMsg('Something went wrong. Please email us directly.');
      }
    } else {
      const subject = encodeURIComponent('Newsletter subscription');
      const body = encodeURIComponent(`Please subscribe me to the CHIC newsletter.\n\nEmail: ${email}\nSource: ${source}`);
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      setState('done');
      setMsg('Opening your email client…');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="news-form" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div className={rowClassName} style={{ display: 'flex', gap: 10 }}>
        <input
          type="email"
          required
          placeholder={placeholder}
          className={inputClassName}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={state === 'sending'}
          style={{ flex: 1 }}
        />
        <button type="submit" className={buttonClassName} disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : buttonLabel}
        </button>
      </div>
      {msg && <p className={`${msgClassName} ${state === 'error' ? 'error' : ''}`} style={{ margin: 0, fontSize: '0.78rem' }}>{msg}</p>}
      {showFine && (
        <span className={fineClassName} style={{ fontSize: '0.66rem', letterSpacing: 1, color: 'rgba(217,185,143,0.45)' }}>
          We&apos;ll never share your email. Unsubscribe anytime.
        </span>
      )}
    </form>
  );
}
