// /api/contact — server-side endpoint for the contact form.
//
// Sends an email to sales@xmchichomeware.com via Resend (https://resend.com).
// To enable, set these env vars in .env.local (and on your production host):
//   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxx
//   CONTACT_TO=sales@xmchichomeware.com           (optional — defaults below)
//   CONTACT_FROM=form@your-verified-domain.com    (must be on a Resend-verified domain)
//
// If RESEND_API_KEY is missing, the endpoint returns a structured error
// telling the client to fall back to a mailto: link.

export const runtime = 'nodejs';

const TO   = process.env.CONTACT_TO   || 'sales@xmchichomeware.com';
const FROM = process.env.CONTACT_FROM || 'CHIC Inquiry <onboarding@resend.dev>'; // resend.dev works without domain verification for testing

export async function POST(req) {
  let data;
  try {
    data = await req.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const { name, company, email, phone, message, website_url, elapsed_ms } = data || {};

  // ── Anti-bot layer 1: HONEYPOT ────────────────────────────────────
  // `website_url` is a hidden form field that real humans cannot see.
  // Naive form-stuffing bots autofill every input on the page; if this
  // field has any value, the submitter is almost certainly a bot.
  // We respond with 200 OK so the bot thinks the submission worked and
  // doesn't retry — but we never actually send the email.
  if (website_url && String(website_url).trim() !== '') {
    console.warn('[contact] BLOCKED honeypot triggered', {
      ts: new Date().toISOString(),
      ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
      email,
      honeypot: String(website_url).slice(0, 80),
    });
    return Response.json({ ok: true, _blocked: 'honeypot' });
  }

  // ── Anti-bot layer 2: SUBMIT-TIME FLOOR ───────────────────────────
  // Real B2B buyers take at least a few seconds to fill the form. Bots
  // submit in milliseconds. A 3-second floor catches the majority of
  // automated form-stuffing without inconveniencing any real user.
  if (typeof elapsed_ms === 'number' && elapsed_ms >= 0 && elapsed_ms < 3000) {
    console.warn('[contact] BLOCKED submitted too fast', {
      ts: new Date().toISOString(),
      ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
      email,
      elapsed_ms,
    });
    return Response.json({ ok: true, _blocked: 'too_fast' });
  }

  // Basic validation
  if (!name || !email || !message) {
    return Response.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: 'Invalid email address' }, { status: 400 });
  }
  if (message.length > 5000) {
    return Response.json({ ok: false, error: 'Message too long' }, { status: 400 });
  }

  const subject = `New Inquiry — ${name}${company ? ` (${company})` : ''}`;
  const html = renderHtml({ name, company, email, phone, message });
  const text = renderText({ name, company, email, phone, message });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No backend configured — tell the client to use mailto: fallback.
    return Response.json(
      { ok: false, code: 'no_backend', error: 'Email backend not configured. Use mailto fallback.' },
      { status: 503 },
    );
  }

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:     FROM,
        to:       [TO],
        reply_to: email,
        subject,
        html,
        text,
      }),
    });

    if (!resp.ok) {
      const detail = await resp.text();
      console.error('[contact] Resend error', resp.status, detail);
      return Response.json({ ok: false, error: 'Mail send failed', detail }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('[contact] exception', err);
    return Response.json({ ok: false, error: String(err.message || err) }, { status: 500 });
  }
}

// Plain-text version (for email clients that strip HTML)
function renderText({ name, company, email, phone, message }) {
  return [
    'New inquiry from xmchichomeware.com',
    '─────────────────────────────────',
    `Name:    ${name}`,
    company ? `Company: ${company}` : null,
    `Email:   ${email}`,
    phone ? `Phone:   ${phone}` : null,
    '',
    'Message:',
    message,
    '',
    '─────────────────────────────────',
    `Reply directly to this email to reach ${name}.`,
  ].filter(Boolean).join('\n');
}

// Pretty HTML version
function renderHtml({ name, company, email, phone, message }) {
  const esc = (s) => String(s || '').replace(/[&<>"']/g, (m) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[m]));
  return `<!doctype html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#F5F7F8;padding:24px;color:#1A1A1A">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #E5E7EB;border-radius:16px;overflow:hidden">
    <div style="background:#2C5E3F;color:#fff;padding:20px 28px">
      <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;opacity:.75;margin-bottom:4px">CHIC · New Inquiry</div>
      <div style="font-size:20px;font-weight:800">${esc(name)}${company ? ` · ${esc(company)}` : ''}</div>
    </div>
    <table style="width:100%;border-collapse:collapse;margin:0">
      <tr><td style="padding:14px 28px;border-bottom:1px solid #E5E7EB;color:#6B7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:90px">Email</td>
          <td style="padding:14px 28px;border-bottom:1px solid #E5E7EB"><a href="mailto:${esc(email)}" style="color:#2C5E3F;font-weight:600">${esc(email)}</a></td></tr>
      ${phone ? `<tr><td style="padding:14px 28px;border-bottom:1px solid #E5E7EB;color:#6B7280;font-size:12px;text-transform:uppercase;letter-spacing:1px">Phone</td>
          <td style="padding:14px 28px;border-bottom:1px solid #E5E7EB">${esc(phone)}</td></tr>` : ''}
      ${company ? `<tr><td style="padding:14px 28px;border-bottom:1px solid #E5E7EB;color:#6B7280;font-size:12px;text-transform:uppercase;letter-spacing:1px">Company</td>
          <td style="padding:14px 28px;border-bottom:1px solid #E5E7EB">${esc(company)}</td></tr>` : ''}
    </table>
    <div style="padding:20px 28px">
      <div style="color:#6B7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Message</div>
      <div style="white-space:pre-wrap;line-height:1.6">${esc(message)}</div>
    </div>
    <div style="background:#F5F7F8;padding:14px 28px;color:#6B7280;font-size:12px">
      Reply directly to this email to reach ${esc(name)}. · Sent from xmchichomeware.com contact form
    </div>
  </div>
</body></html>`;
}
