/**
 * Local development / self-hosted Node server.
 * Mirrors the two Vercel serverless functions (/api/chat and /api/lead)
 * so `npm run dev` behaves exactly like production, then serves the app
 * through Vite middleware (dev) or from dist/ (production Node hosting).
 *
 * On Vercel this file is NOT used — api/chat.ts and api/lead.ts run as
 * serverless functions and the built dist/ is served statically.
 */
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import {
  CHAT_MODEL,
  SYSTEM_INSTRUCTION,
  BUSINESS_PHONE_DISPLAY,
  rateLimited,
  clip,
  normaliseLead,
  validateLead,
  sendLeadEmail,
} from './api/_shared';
import { resolveRedirect } from './api/_redirects';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '200kb' }));

  // 301s for every old-WordPress URL (mirrors vercel.json for Node/Cloud Run hosting)
  app.use((req, res, next) => {
    const path = req.path.replace(/\/+$/, '').toLowerCase() || '/';
    const dest = resolveRedirect(path);
    if (dest && dest !== path) {
      res.redirect(301, dest);
      return;
    }
    next();
  });

  const clientIp = (req: express.Request) =>
    (req.headers['x-forwarded-for'] || '').toString().split(',')[0].trim() ||
    req.socket.remoteAddress ||
    'unknown';

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // ---- Chat proxy (key stays server-side) ----
  app.post('/api/chat', async (req, res) => {
    if (rateLimited(`chat:${clientIp(req)}`, 20, 5 * 60 * 1000)) {
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
    const messages = raw.slice(-30).map((m: any) => ({
      role: m?.role === 'user' ? 'user' : 'model',
      parts: [{ text: clip(m?.text, 2000) }],
    }));
    if (!messages.length || messages[messages.length - 1].role !== 'user') {
      res.status(400).json({ error: 'bad-request' });
      return;
    }
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: CHAT_MODEL,
        contents: messages,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.2,
          maxOutputTokens: 1000,
          thinkingConfig: { thinkingBudget: 0 },
        },
      });
      const text =
        response.text ||
        `I am sorry, I could not process that — please call our team on ${BUSINESS_PHONE_DISPLAY}.`;
      res.json({ text });
    } catch (err) {
      console.error('[chat] Gemini error:', err);
      res.status(502).json({
        error: 'chat-upstream-error',
        text: `I am having a technical issue right now — please call our team directly on ${BUSINESS_PHONE_DISPLAY}.`,
      });
    }
  });

  // ---- Lead capture (every enquiry is emailed to the business) ----
  app.post('/api/lead', async (req, res) => {
    if (rateLimited(`lead:${clientIp(req)}`, 10, 10 * 60 * 1000)) {
      res.status(429).json({ ok: false, error: 'rate-limited' });
      return;
    }
    const body = req.body || {};
    if (typeof body.website === 'string' && body.website.trim() !== '') {
      res.json({ ok: true }); // honeypot hit — pretend success
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
    res.json({ ok: true });
  });

  // ---- App serving ----
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
