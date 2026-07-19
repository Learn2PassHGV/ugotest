# UGO Coach & Minibus Hire — coaches.business

Production website for UGO Coach & Minibus Hire (Pullman Direct Ltd), St Albans.
React + Vite + Tailwind SPA with serverless API functions for lead capture and
the AI booking assistant.

## What's in here

| Piece | Where | Notes |
|---|---|---|
| Site pages | `src/*.tsx` | 30+ pages: services, fleet, locations, 20 town landing pages, legal |
| Town page content | `src/data/towns.ts` | One entry per town — edit copy here, not in components |
| Lead capture | `api/lead.ts` | Emails every enquiry (quote form, chat, tender) to the business via Resend |
| AI chat proxy | `api/chat.ts` | Server-side Gemini call — the API key never reaches the browser |
| Shared API logic | `api/_shared.ts` | Prompt, validation, email formatting, rate limiting |
| Local dev server | `server.ts` | Express + Vite middleware, mirrors both API endpoints |
| SEO generator | `scripts/generate-seo.ts` | Runs on build: sitemap.xml + per-route HTML head tags |
| Redirects | `vercel.json` | 301 map for every URL of the old WordPress site |

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in GEMINI_API_KEY (+ Resend vars to test email)
npm run dev                  # http://localhost:3000
```

Without `RESEND_API_KEY` the forms show their graceful "call us" fallback —
everything else works.

## Deploy to Vercel (recommended)

1. Push this folder to a Git repo (GitHub is easiest) and **Import** it in Vercel,
   or run `npx vercel` from this folder.
2. Vercel reads `vercel.json` automatically (build = `npm run build:web`, output = `dist`,
   API functions from `api/`).
3. In **Project → Settings → Environment Variables** add:
   - `GEMINI_API_KEY` — from https://aistudio.google.com/apikey
   - `RESEND_API_KEY` — from https://resend.com (verify the `coaches.business` domain there first)
   - `LEAD_TO` — `sasha@coaches.business`
   - `LEAD_FROM` — `UGO Website <leads@coaches.business>` (address on the verified domain)
   - `LEAD_BCC` — optional copy of every lead
4. **Test before pointing the domain**: on the `*.vercel.app` preview, submit the quote
   form and chat through to giving a phone number — confirm both emails arrive.
5. Domain cutover: in Vercel add `www.coaches.business` + `coaches.business`
   (redirect apex → www), then change the DNS records where the domain is managed
   as Vercel instructs. The 301 redirect map goes live with it.

## Launch-day checklist

- [ ] Quote form email arrives at sasha@ (send a real test)
- [ ] Chat assistant answers AND transcript email arrives once a phone number is given
- [ ] Google Search Console: add property, submit `https://www.coaches.business/sitemap.xml`
- [ ] GA4: create property, paste the gtag snippet into `index.html` where marked
- [ ] Google Business Profile: point website link at `https://www.coaches.business/contact`
- [ ] Spot-check redirects: `/coach-hire-luton/`, `/testimonials-ugo-caoch-minibus-hire/`,
      `/terms-and-conditions-of-booking/` should all 301 to their new homes
- [ ] Client sign-off received on: DVSA/DBS wording, 24/7 wording, testimonials use,
      privacy policy + terms review

## Things intentionally NOT done (awaiting client)

- **Analytics tag** — needs the client's GA4 property (marked slot in `index.html`)
- **Social links** — the old site had no real profiles; add to the footer when they exist
- **Blog articles** — the blog page is honest but thin; 3–5 real guides recommended post-launch
- **Photography** — the three fleet images carry the whole site; a real shoot of the
  actual vehicles (and Alan & Sasha for the About page) would lift conversion further

## Architecture notes

- Hand-rolled router in `src/App.tsx` (`getPageFromPath` / `PAGE_TO_PATH_MAP`) —
  every `href` must match a route; legacy aliases are handled in both the router
  and `vercel.json`. Unknown URLs render the 404 page (noindex).
- Route-level code splitting via `React.lazy` — main bundle ~164 KB gzipped.
- The scroll-reveal system has a safety net (see "Reveal safety net" in `App.tsx`)
  so content can never stay invisible if an IntersectionObserver misses.
- Per-route `<head>` tags are baked into static HTML at build time by
  `scripts/generate-seo.ts`; React updates them again at runtime on navigation.
