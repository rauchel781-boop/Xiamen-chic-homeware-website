'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState('idle');

  function onSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    // Wire to your email/CRM endpoint, e.g. /api/contact
    setTimeout(() => setStatus('sent'), 600);
  }

  return (
    <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-4 max-w-2xl">
      <Field name="name" label="Your Name" required />
      <Field name="company" label="Company" />
      <Field name="email" label="Email" type="email" required />
      <Field name="phone" label="Phone / WhatsApp" />
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-wood-800 mb-1">Project Details *</label>
        <textarea name="message" required rows={5} className="w-full rounded-md border border-wood-300 bg-white px-3 py-2 text-wood-900 focus:outline-none focus:ring-2 focus:ring-wood-500" />
      </div>
      <div className="sm:col-span-2 flex items-center gap-4">
        <button type="submit" disabled={status==='sending'} className="px-6 py-2.5 rounded-md bg-wood-700 text-wood-50 font-medium hover:bg-wood-800 disabled:opacity-60">
          {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent ✓' : 'Send Inquiry'}
        </button>
        {status === 'sent' && <span className="text-sm text-green-700">Thanks — we'll reply within 24 hours.</span>}
      </div>
    </form>
  );
}

function Field({ name, label, type='text', required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-wood-800 mb-1">{label}{required && ' *'}</label>
      <input type={type} name={name} required={required} className="w-full rounded-md border border-wood-300 bg-white px-3 py-2 text-wood-900 focus:outline-none focus:ring-2 focus:ring-wood-500" />
    </div>
  );
}
