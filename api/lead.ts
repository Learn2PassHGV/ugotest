/**
 * Vercel serverless function: POST /api/lead
 * Emails every website enquiry (Smart Quote form, chat transcripts, tenders)
 * to the business via Resend.
 *
 * SELF-CONTAINED ON PURPOSE: Vercel type-strips function files without
 * bundling relative imports, so this file imports nothing. The same logic
 * lives in api/_shared.ts for the local dev server — keep them in sync.
 */

const LEAD_TO_DEFAULT = 'sasha@coaches.business';

const hits = new Map<string, number[]>();
function rateLimited(ip: string, limit = 10, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > limit;
}

function clip(v: unknown, max = 400): string {
  return String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function normaliseLead(body: any) {
  return {
    type: ['quote', 'concierge', 'tender', 'contact'].includes(String(body.type)) ? String(body.type) : 'enquiry',
    name: clip(body.name, 120),
    email: clip(body.email, 200),
    phone: clip(body.phone, 40),
    pickup: clip(body.pickup, 300),
    destination: clip(body.destination, 300),
    date: clip(body.date, 40),
    time: clip(body.time, 20),
    passengers: clip(body.passengers, 20),
    journeyType: clip(body.journeyType, 80),
    message: clip(body.message, 3000),
    transcript: Array.isArray(body.transcript)
      ? body.transcript.slice(0, 60).map((m: any) => ({
          role: m?.role === 'user' ? 'Customer' : 'Assistant',
          text: clip(m?.text, 1200),
        }))
      : [],
    page: clip(body.page, 200),
  };
}
type Lead = ReturnType<typeof normaliseLead>;

function validateLead(lead: Lead): string | null {
  const hasContact = lead.phone.length >= 7 || /.+@.+\..+/.test(lead.email);
  const hasTranscriptContact = lead.transcript.some(
    (m: any) => /(\+?\d[\d\s().-]{6,})/.test(m.text) || /.+@.+\..+/.test(m.text)
  );
  if (!hasContact && !hasTranscriptContact) {
    return 'An enquiry needs at least a phone number or an email address.';
  }
  return null;
}

const TYPE_LABEL: Record<string, string> = {
  quote: 'Smart Quote request',
  concierge: 'Chat assistant enquiry',
  tender: 'Tender enquiry',
  contact: 'Contact enquiry',
  enquiry: 'Website enquiry',
};

function leadSubject(lead: Lead): string {
  const label = TYPE_LABEL[lead.type] || 'Website enquiry';
  const who = lead.name || lead.phone || lead.email || 'new customer';
  const route = lead.pickup && lead.destination ? ` — ${lead.pickup} → ${lead.destination}` : '';
  return `UGO website: ${label} from ${who}${route}`;
}

function leadHtml(lead: Lead): string {
  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:6px 12px 6px 0;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:.05em;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:6px 0;color:#0f172a;font-size:14px">${escapeHtml(value)}</td></tr>`
      : '';
  const transcriptHtml = lead.transcript.length
    ? `<h3 style="font-size:13px;color:#334155;margin:24px 0 8px;text-transform:uppercase;letter-spacing:.05em">Chat transcript</h3>` +
      lead.transcript
        .map(
          (m: any) =>
            `<p style="margin:0 0 10px;font-size:13px;line-height:1.5"><strong style="color:${m.role === 'Customer' ? '#b45309' : '#475569'}">${m.role}:</strong> ${escapeHtml(m.text)}</p>`
        )
        .join('')
    : '';
  return `
  <div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;border:1px solid #e2e8f0;border-radius:12px">
    <p style="margin:0 0 4px;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#b45309;font-weight:700">UGO website enquiry</p>
    <h2 style="margin:0 0 16px;font-size:20px;color:#0f172a">${escapeHtml(leadSubject(lead))}</h2>
    <table style="border-collapse:collapse;width:100%">
      ${row('Name', lead.name)}${row('Phone', lead.phone)}${row('Email', lead.email)}
      ${row('Pickup', lead.pickup)}${row('Destination', lead.destination)}
      ${row('Date', lead.date)}${row('Time', lead.time)}
      ${row('Passengers', lead.passengers)}${row('Journey type', lead.journeyType)}
      ${row('Message', lead.message)}${row('Sent from page', lead.page)}
    </table>
    ${transcriptHtml}
    <p style="margin:24px 0 0;font-size:11px;color:#94a3b8">Sent automatically by the coaches.business website. Reply directly to the customer using the details above.</p>
  </div>`;
}

function leadText(lead: Lead): string {
  const lines = [
    `New ${lead.type} enquiry from the UGO website`,
    lead.name && `Name: ${lead.name}`,
    lead.phone && `Phone: ${lead.phone}`,
    lead.email && `Email: ${lead.email}`,
    lead.pickup && `Pickup: ${lead.pickup}`,
    lead.destination && `Destination: ${lead.destination}`,
    lead.date && `Date: ${lead.date}`,
    lead.time && `Time: ${lead.time}`,
    lead.passengers && `Passengers: ${lead.passengers}`,
    lead.journeyType && `Journey type: ${lead.journeyType}`,
    lead.message && `Message: ${lead.message}`,
    lead.page && `Page: ${lead.page}`,
  ].filter(Boolean) as string[];
  if (lead.transcript.length) {
    lines.push('', 'Chat transcript:');
    for (const m of lead.transcript) lines.push(`${m.role}: ${m.text}`);
  }
  return lines.join('\n');
}

async function sendLeadEmail(lead: Lead): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO || LEAD_TO_DEFAULT;
  const from = process.env.LEAD_FROM || 'UGO Website <onboarding@resend.dev>';
  const bcc = process.env.LEAD_BCC;
  if (!apiKey) {
    console.error('[lead] RESEND_API_KEY is not set — enquiry NOT delivered:', leadText(lead));
    return { ok: false, error: 'email-not-configured' };
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: to.split(',').map((s) => s.trim()),
        ...(bcc ? { bcc: bcc.split(',').map((s) => s.trim()) } : {}),
        reply_to: /.+@.+\..+/.test(lead.email) ? lead.email : undefined,
        subject: leadSubject(lead),
        html: leadHtml(lead),
        text: leadText(lead),
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error('[lead] Resend rejected the email:', res.status, body);
      return { ok: false, error: `email-send-failed-${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    console.error('[lead] Email send error:', err);
    return { ok: false, error: 'email-send-error' };
  }
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }
  const ip =
    (req.headers['x-forwarded-for'] || '').toString().split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';
  if (rateLimited(`lead:${ip}`)) {
    res.status(429).json({ ok: false, error: 'rate-limited' });
    return;
  }
  const body = req.body || {};
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    res.status(200).json({ ok: true }); // honeypot — pretend success to bots
    return;
  }
  const lead = normaliseLead(body);
  const problem = validateLead(lead);
  if (problem) {
    res.status(400).json({ ok: false, error: problem });
    return;
  }
  const sent = await sendLeadEmail(lead);
  if (!sent.ok) {
    res.status(502).json({ ok: false, error: sent.error });
    return;
  }
  res.status(200).json({ ok: true });
}
