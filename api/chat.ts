/**
 * Vercel serverless function: POST /api/chat
 * Server-side Gemini proxy for the website chat assistants.
 * Uses the plain REST API via fetch — no SDK import, nothing to break.
 * The API key stays on the server; it is never shipped to the browser.
 */
/**
 * SELF-CONTAINED ON PURPOSE: Vercel type-strips function files without
 * bundling relative imports, so this file imports nothing. The same logic
 * lives in api/_shared.ts for the local dev server — keep them in sync.
 */
const CHAT_MODEL = 'gemini-3.5-flash';
const BUSINESS_PHONE_DISPLAY = '0845 8333 456';

const SYSTEM_INSTRUCTION = `
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

const hits = new Map<string, number[]>();
function rateLimited(ip: string, limit = 20, windowMs = 5 * 60 * 1000): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > limit;
}

function clip(v: unknown, max = 2000): string {
  return String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const ip =
    (req.headers['x-forwarded-for'] || '').toString().split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';
  if (rateLimited(`chat:${ip}`, 20, 5 * 60 * 1000)) {
    res.status(429).json({
      error: 'rate-limited',
      text: `You are sending messages a little quickly — please call us directly on ${BUSINESS_PHONE_DISPLAY} and we will help straight away.`,
    });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(503).json({ error: 'chat-not-configured' });
    return;
  }

  const raw = Array.isArray(req.body?.messages) ? req.body.messages : [];
  const contents = raw.slice(-30).map((m: any) => ({
    role: m?.role === 'user' ? 'user' : 'model',
    parts: [{ text: clip(m?.text, 2000) }],
  }));
  if (!contents.length || contents[contents.length - 1].role !== 'user') {
    res.status(400).json({ error: 'bad-request' });
    return;
  }

  try {
    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${CHAT_MODEL}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          // thinkingBudget 0: this is a two-sentence concierge — reasoning tokens
          // would eat the output budget and truncate replies mid-sentence.
          generationConfig: { temperature: 0.2, maxOutputTokens: 1000, thinkingConfig: { thinkingBudget: 0 } },
        }),
      }
    );
    const data: any = await upstream.json().catch(() => null);
    const text =
      data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text || '').join('') ||
      `I am sorry, I could not process that — please call our team on ${BUSINESS_PHONE_DISPLAY}.`;
    if (!upstream.ok) {
      console.error('[chat] Gemini REST error:', upstream.status, JSON.stringify(data)?.slice(0, 300));
      res.status(502).json({
        error: 'chat-upstream-error',
        text: `I am having a technical issue right now — please call our team directly on ${BUSINESS_PHONE_DISPLAY}.`,
      });
      return;
    }
    res.status(200).json({ text });
  } catch (err) {
    console.error('[chat] Gemini error:', err);
    res.status(502).json({
      error: 'chat-upstream-error',
      text: `I am having a technical issue right now — please call our team directly on ${BUSINESS_PHONE_DISPLAY}.`,
    });
  }
}
