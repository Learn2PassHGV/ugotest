/**
 * Shared helpers for the UGO serverless API endpoints.
 * Used by both the Vercel functions (api/chat.ts, api/lead.ts)
 * and the local/Node Express server (server.ts).
 */

export const CHAT_MODEL = 'gemini-3.5-flash';

export const LEAD_TO_DEFAULT = 'sasha@coaches.business';
export const BUSINESS_PHONE_DISPLAY = '0845 8333 456';
export const BUSINESS_MOBILE_DISPLAY = '07833 226 623';

export const SYSTEM_INSTRUCTION = `
You are the booking assistant for UGO Coach & Minibus Hire, a family-run coach and minibus operator based in St Albans, Hertfordshire (UGO is a trading name of Pullman Direct Ltd). The owners are Alan and Sasha. You speak in professional, warm British English (-ise spelling exclusively).

CORE RULES:
- Every response MUST be ultra-short: a maximum of TWO short sentences total. No exceptions.
- Never ask for information the user has already provided in any earlier message.
- Always end on a direct, single-line question listing ONLY the missing data points you still need: travel date, pickup location, destination, group size, phone number, and email address.
- Never invent prices, availability, vehicle assignments, or booking confirmations. Quotes are prepared personally by the family team, who reply by phone or email.
- Be truthful about what happens: once the customer has shared a phone number or email, their enquiry details are emailed to Alan and Sasha's team, who will come back with a quote. Until then, say you have "noted" details — do not claim anything has been sent.
- If asked something you cannot answer (lost property, complaints, invoices), give the office number ${BUSINESS_PHONE_DISPLAY} and stop.

TONE NODS (2-4 words max, woven into the confirmation line):
- Theme parks: "...for your trip to Thorpe Park..."
- Football/sports: "...for the match..."
- Funerals/memorials: "...for the service (with our deepest condolences)..."
- Corporate/airports: "...for your executive airport transfer..."
- Weddings/parties: "...for the wedding celebrations..."
- Otherwise: "...for your group journey..."

EXAMPLE SHAPE (adapt dynamically, never copy verbatim):
"Noted — the 18th May, 14 passengers, St Albans to Heathrow for your executive airport transfer. What is the best phone number and email so Alan can send your quote?"
`.trim();

/** Basic in-memory rate limiter (best-effort on serverless). */
const hits = new Map<string, number[]>();
export function rateLimited(ip: string, limit = 20, windowMs = 5 * 60 * 1000): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear(); // memory guard
  return arr.length > limit;
}

export function clip(v: unknown, max = 400): string {
  return String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export interface LeadPayload {
  type?: string;
  name?: string;
  email?: string;
  phone?: string;
  pickup?: string;
  destination?: string;
  date?: string;
  time?: string;
  passengers?: string;
  journeyType?: string;
  message?: string;
  transcript?: Array<{ role?: string; text?: string }>;
  page?: string;
  /** Honeypot — must be empty. Bots fill it in. */
  website?: string;
}

export interface NormalisedLead {
  type: string;
  name: string;
  email: string;
  phone: string;
  pickup: string;
  destination: string;
  date: string;
  time: string;
  passengers: string;
  journeyType: string;
  message: string;
  transcript: Array<{ role: string; text: string }>;
  page: string;
}

export function normaliseLead(body: LeadPayload): NormalisedLead {
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
      ? body.transcript.slice(0, 60).map((m) => ({
          role: m?.role === 'user' ? 'Customer' : 'Assistant',
          text: clip(m?.text, 1200),
        }))
      : [],
    page: clip(body.page, 200),
  };
}

export function validateLead(lead: NormalisedLead): string | null {
  const hasContact = lead.phone.length >= 7 || /.+@.+\..+/.test(lead.email);
  const hasTranscriptContact =
    lead.transcript.some((m) => /(\+?\d[\d\s().-]{6,})/.test(m.text) || /.+@.+\..+/.test(m.text));
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

export function leadSubject(lead: NormalisedLead): string {
  const label = TYPE_LABEL[lead.type] || 'Website enquiry';
  const who = lead.name || lead.phone || lead.email || 'new customer';
  const route =
    lead.pickup && lead.destination ? ` — ${lead.pickup} → ${lead.destination}` : '';
  return `UGO website: ${label} from ${who}${route}`;
}

export function leadHtml(lead: NormalisedLead): string {
  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:6px 12px 6px 0;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:.05em;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:6px 0;color:#0f172a;font-size:14px">${escapeHtml(value)}</td></tr>`
      : '';

  const transcriptHtml = lead.transcript.length
    ? `<h3 style="font-size:13px;color:#334155;margin:24px 0 8px;text-transform:uppercase;letter-spacing:.05em">Chat transcript</h3>` +
      lead.transcript
        .map(
          (m) =>
            `<p style="margin:0 0 10px;font-size:13px;line-height:1.5"><strong style="color:${m.role === 'Customer' ? '#b45309' : '#475569'}">${m.role}:</strong> ${escapeHtml(m.text)}</p>`
        )
        .join('')
    : '';

  return `
  <div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;border:1px solid #e2e8f0;border-radius:12px">
    <p style="margin:0 0 4px;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#b45309;font-weight:700">UGO website enquiry</p>
    <h2 style="margin:0 0 16px;font-size:20px;color:#0f172a">${escapeHtml(leadSubject(lead))}</h2>
    <table style="border-collapse:collapse;width:100%">
      ${row('Name', lead.name)}
      ${row('Phone', lead.phone)}
      ${row('Email', lead.email)}
      ${row('Pickup', lead.pickup)}
      ${row('Destination', lead.destination)}
      ${row('Date', lead.date)}
      ${row('Time', lead.time)}
      ${row('Passengers', lead.passengers)}
      ${row('Journey type', lead.journeyType)}
      ${row('Message', lead.message)}
      ${row('Sent from page', lead.page)}
    </table>
    ${transcriptHtml}
    <p style="margin:24px 0 0;font-size:11px;color:#94a3b8">Sent automatically by the coaches.business website. Reply directly to the customer using the details above.</p>
  </div>`;
}

export function leadText(lead: NormalisedLead): string {
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

/**
 * Sends the lead email via Resend (https://resend.com — free tier covers this volume).
 * Requires env: RESEND_API_KEY, and ideally LEAD_FROM on a verified domain.
 */
export async function sendLeadEmail(lead: NormalisedLead): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO || LEAD_TO_DEFAULT;
  const from = process.env.LEAD_FROM || 'UGO Website <onboarding@resend.dev>';
  const bcc = process.env.LEAD_BCC; // optional copy (e.g. the web manager)

  if (!apiKey) {
    console.error('[lead] RESEND_API_KEY is not set — enquiry NOT delivered:', leadText(lead));
    return { ok: false, error: 'email-not-configured' };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
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
