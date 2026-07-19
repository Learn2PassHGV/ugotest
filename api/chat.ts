/**
 * Vercel serverless function: POST /api/chat
 * Server-side Gemini proxy for the website chat assistants.
 * Uses the plain REST API via fetch — no SDK import, nothing to break.
 * The API key stays on the server; it is never shipped to the browser.
 */
import { CHAT_MODEL, SYSTEM_INSTRUCTION, rateLimited, clip, BUSINESS_PHONE_DISPLAY } from './_shared';

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
          generationConfig: { temperature: 0.2, maxOutputTokens: 400 },
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
