/**
 * 301 redirect map: every URL from the old WordPress site → its new home.
 * Used by server.ts (AI Studio / Cloud Run / any Node hosting).
 * On Vercel the same map lives in vercel.json and is applied at the edge.
 * Keep both in sync if you change destinations.
 */
export const REDIRECT_MAP: Record<string, string> = {
  '/gallery': '/the-fleet',
  '/get-started': '/',
  '/how-quick-can-you-provide-us-with-a-coach-or-minibus': '/about',
  '/our-on-board-technology': '/the-fleet',
  '/sitemap': '/locations',
  '/ugo-coach-minibus-privacy-policy': '/privacy-policy',
  '/contact-ugo-coach-and-minibus-hire': '/contact',
  '/coach-and-minibus-hire-for-airport-transfers': '/locations/airport-hubs',
  '/ugo-booking-facility': '/',
  '/business-travel-page': '/corporate-accounts',
  '/celebration-events-weddings-party-tours': '/wedding-transport',
  '/events-minibus-and-coach-hire': '/strategic-events',
  '/evenings-out-coach-hire': '/private-coach-hire',
  '/private-hire-coach-minibus': '/private-coach-hire',
  '/school-trips-school-day-trips': '/our-services',
  '/coach-minibus-hire-sporting-events': '/strategic-events',
  '/stag-hen-party-minibus-and-coach-hire': '/private-coach-hire',
  '/uk-tour-minibus-and-coach-hire': '/private-coach-hire',
  '/weekend-and-day-trip-coach-and-minibus-hire': '/private-coach-hire',
  '/what-areas-of-the-country-do-you-cover': '/locations',
  '/what-services-do-ugo-provide': '/our-services',
  '/why-should-we-use-ugo-coach-minibus-hire': '/about',
  '/testimonials-ugo-caoch-minibus-hire': '/',
  '/terms-and-conditions-of-booking': '/terms',
  '/about-ugo-coach-and-minibus-hire-company': '/about',
  '/chauffer-hire-services': '/private-luxury',
  '/film-tv-location-services': '/film-tv-logistics',
  '/corporate-minibus-and-coach-hire': '/corporate-accounts',
  '/coach-hire-amersham-2': '/coach-hire-amersham',
  '/coach-hire-st-albans': '/locations/st-albans',
  '/coach-hire-watford': '/locations/watford',
  '/coach-hire-hemel-hempstead': '/locations/hemel-hempstead',
  '/coach-hire-luton': '/locations/luton',
  '/the-ugo-blog': '/blog',
};

/** Prefix redirects (old WordPress taxonomy/content paths → new page). */
export const REDIRECT_PREFIXES: Array<[string, string]> = [
  ['/latest-news/', '/blog'],
  ['/uncategorized/', '/blog'],
  ['/category/', '/blog'],
  ['/tag/', '/blog'],
  ['/wp-content/', '/'],
];

/** Resolve a redirect for a path (already lowercased, no trailing slash), or null. */
export function resolveRedirect(path: string): string | null {
  if (REDIRECT_MAP[path]) return REDIRECT_MAP[path];
  for (const [prefix, dest] of REDIRECT_PREFIXES) {
    if (path.startsWith(prefix)) return dest;
  }
  return null;
}
