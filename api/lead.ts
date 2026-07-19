/**
 * Vercel serverless function: POST /api/lead
 * Receives every website enquiry (Smart Quote form, chat assistant transcripts,
 * tender/contact enquiries) and emails it to the business.
 */
import { normaliseLead, validateLead, sendLeadEmail, rateLimited } from './_shared';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const ip =
    (req.headers['x-forwarded-for'] || '').toString().split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';
  if (rateLimited(`lead:${ip}`, 10, 10 * 60 * 1000)) {
    res.status(429).json({ ok: false, error: 'rate-limited' });
    return;
  }

  const body = req.body || {};

  // Honeypot: real users never fill this hidden field.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    res.status(200).json({ ok: true }); // pretend success to bots
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
