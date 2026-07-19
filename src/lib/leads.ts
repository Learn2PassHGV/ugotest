/**
 * Client helpers for sending enquiries to /api/lead and for detecting
 * when a chat conversation contains contact details worth forwarding.
 */

export interface LeadData {
  type: 'quote' | 'concierge' | 'tender' | 'contact';
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
  transcript?: Array<{ role: string; text: string }>;
}

export async function sendLead(data: LeadData): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, page: window.location.pathname, website: '' }),
    });
    const body = await res.json().catch(() => ({}));
    return { ok: res.ok && body?.ok === true, error: body?.error };
  } catch {
    return { ok: false, error: 'network' };
  }
}

const PHONE_RE = /(\+?\d[\d\s().-]{6,}\d)/;
const EMAIL_RE = /[\w.+-]+@[\w-]+\.[\w.-]+/;

/** True when a piece of text contains a phone number or email address. */
export function containsContactDetails(text: string): boolean {
  return PHONE_RE.test(text) || EMAIL_RE.test(text);
}

/** Ask /api/chat for the assistant's reply. Returns null on hard failure. */
export async function fetchChatReply(
  messages: Array<{ role: 'user' | 'bot'; text: string }>
): Promise<{ text: string } | null> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
    const body = await res.json().catch(() => null);
    if (body?.text) return { text: body.text };
    return null;
  } catch {
    return null;
  }
}
