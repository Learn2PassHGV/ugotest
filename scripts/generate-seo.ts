/**
 * Post-build SEO generator. Run automatically via `npm run build` (postbuild).
 *
 * Produces, inside dist/:
 *  1. sitemap.xml           — every route with priority hints
 *  2. <route>/index.html    — a copy of the built index.html for EVERY route,
 *                             with that route's own <title>, meta description,
 *                             canonical URL and Open Graph tags injected.
 *
 * Why: the app is a client-rendered SPA. Without this step every URL serves
 * identical head tags ("one title for the whole site") — bad for Google and
 * broken for social shares. With it, each URL ships correct head metadata in
 * the raw HTML, and React takes over on load as normal.
 */
import fs from 'node:fs';
import path from 'node:path';
import { TOWNS } from '../src/data/towns';
import { POSTS } from '../src/data/posts';

const SITE_URL = 'https://www.coaches.business';
const DIST = path.join(process.cwd(), 'dist');

interface RouteMeta {
  path: string;
  title: string;
  description: string;
  priority: number;
}

const ROUTES: RouteMeta[] = [
  { path: '/', title: 'UGO | Premium Coach & Minibus Hire | Nationwide Transport', description: 'Family-run premium coach and minibus hire based in St Albans. Executive unbranded fleet for corporate travel, schools, weddings, film productions and airport transfers across Hertfordshire, London and the UK.', priority: 1.0 },
  { path: '/our-services', title: 'Our Commercial Services | Premium Fleet Hire | UGO', description: 'Tailored national fleet logistics, school routes, employee shuttles, and commercial contracts. Safe, dependable transit with dedicated direct support.', priority: 0.9 },
  { path: '/the-fleet', title: 'The Executive Fleet | Premium Coach & Minibus Hire | UGO', description: 'Explore our pristine fleet of luxury coaches and chauffeured minibuses — 16 to 53 seats, unbranded, seat-belted and climate controlled.', priority: 0.9 },
  { path: '/corporate-accounts', title: 'Corporate Accounts & Travel Frameworks | UGO', description: 'Corporate coach and minibus hire with monthly invoicing, employee shuttles, roadshows and events — backed by 24/7 direct owner support.', priority: 0.9 },
  { path: '/private-coach-hire', title: 'Private Coach & Minibus Hire | Nationwide Group Travel | UGO', description: 'Bespoke private group hire. Luxury minibuses and coaches for family events, tours, and nationwide group travel with personal, direct family care.', priority: 0.9 },
  { path: '/private-luxury', title: 'Elite Private Luxury Minibus Hire | UGO', description: 'VIP travel in pristine, unbranded luxury minibuses with climate control, leather seating and discreet professional drivers.', priority: 0.8 },
  { path: '/wedding-transport', title: 'Luxury Wedding Guest Transport & Coach Hire | UGO', description: 'Impeccable wedding guest transport. Timed shuttles, unbranded executive vehicles and a family team that makes sure everyone arrives on time.', priority: 0.8 },
  { path: '/strategic-events', title: 'Large-Scale Event Transport Management | UGO', description: 'End-to-end transport planning for major events: route planning, traffic management and high-capacity multi-vehicle operations.', priority: 0.8 },
  { path: '/strategic-event-logistics', title: 'Strategic Event Logistics & Traffic Management | UGO', description: 'Route mapping, marshalling and large-scale passenger movement for festivals, sporting events and national tours.', priority: 0.7 },
  { path: '/film-tv-logistics', title: 'Film & TV Production Unit Logistics | Elite Studio Transit | UGO', description: 'Unbranded crew and cast transport for productions at Hertfordshire studios and on location nationwide, with strict privacy compliance.', priority: 0.8 },
  { path: '/mass-transit-shuttles', title: 'High-Capacity Mass Transit Shuttles & Commutes | UGO', description: 'Scalable shuttle operations for venues and enterprises — multi-vehicle coordination, planned routes and dependable timings.', priority: 0.7 },
  { path: '/workplace-shuttles', title: 'Workplace Shuttles & Corporate Commute Logistics | UGO', description: 'Reliable workforce transport for business parks, offices and distribution centres, with timetables built around your shift patterns.', priority: 0.8 },
  { path: '/corporate-roadshows', title: 'Chauffeured Corporate Roadshows & Executive Transport | UGO', description: 'Multi-stop executive itineraries in premium unbranded vehicles with dedicated operational oversight.', priority: 0.7 },
  { path: '/locations', title: 'Areas We Cover | Coach & Minibus Hire Across Herts, London & Home Counties | UGO', description: 'Every area our family-run fleet serves — St Albans, Watford, Luton, Hemel Hempstead, North London and 20+ towns across the Home Counties.', priority: 0.9 },
  { path: '/locations/greater-london', title: 'Greater London Coach & Minibus Hire | UGO', description: 'Euro 6 / ULEZ-compliant coach hire across Central London and the boroughs — corporate groups, media tours and city transfers.', priority: 0.8 },
  { path: '/locations/home-counties', title: 'The Home Counties Network | Hertfordshire, Beds & Bucks Transport | UGO', description: 'Group transport spanning Hertfordshire, Bedfordshire and Buckinghamshire, with family-managed dispatch and route planning.', priority: 0.8 },
  { path: '/locations/airport-hubs', title: 'UK Airport Transfers | Group Shuttles to Heathrow, Gatwick, Luton & Stansted | UGO', description: 'Group airport transfers with flight tracking, generous luggage capacity and 24/7 dispatch — Heathrow, Gatwick, Luton and Stansted.', priority: 0.8 },
  { path: '/locations/film-and-events', title: 'Nationwide Film & Event Transport Network | UGO', description: 'National group transport for film shoots, sports tournaments and major events across the United Kingdom.', priority: 0.7 },
  { path: '/locations/st-albans', title: 'St Albans Operational Base | Hertfordshire Group Coach Hire | UGO', description: 'Our family dispatch hub in St Albans (AL2): direct 24/7 line, DBS-checked drivers and immediate regional coverage.', priority: 0.9 },
  { path: '/locations/watford', title: 'Watford & Elstree Hub | Coach Hire Watford | UGO', description: 'Coach and minibus hire for Watford and Elstree — studio productions, businesses, schools and events with unbranded executive fleets.', priority: 0.8 },
  { path: '/locations/hemel-hempstead', title: 'Hemel Hempstead | Coach Hire & Staff Shuttles | UGO', description: 'Corporate shuttles and industrial park commutes around Hemel Hempstead, with contract scheduling and volume logistics.', priority: 0.8 },
  { path: '/locations/luton', title: 'Luton Coach Hire & Airport Shuttles | UGO', description: 'Premium passenger transfers and group coach hire across Luton, Dunstable and Bedfordshire, with a convenient airport link.', priority: 0.8 },
  { path: '/compliance', title: 'Regulatory Compliance & Safety Frameworks | UGO', description: 'Enhanced-DBS-checked drivers, Euro 6 clean-air compliance and comprehensive public liability insurance — our safety standards in full.', priority: 0.6 },
  { path: '/about', title: 'About UGO | Family-Run Coach Hire Since the Beginning | UGO', description: 'The story of Alan, Sasha and the family team behind UGO — national fleet capability with direct personal care.', priority: 0.7 },
  { path: '/blog', title: 'Transport Insights & Guides | UGO Blog', description: 'Practical guides on coach hire pricing, school transport compliance and event travel planning from a working coach operator.', priority: 0.6 },
  { path: '/csr', title: 'Corporate Responsibility & Sustainable Logistics | UGO', description: 'Euro 6 vehicles, efficient routing and local community transport support — our commitment to greener travel.', priority: 0.5 },
  { path: '/contact', title: 'Contact Us | UGO Coach & Minibus Hire, St Albans', description: 'Call 0845 8333 456, email sasha@coaches.business, or send your journey details for a fast personal quote from the family team.', priority: 0.9 },
  { path: '/privacy-policy', title: 'Privacy Policy | UGO Coach & Minibus Hire', description: 'How UGO Coach & Minibus Hire (Pullman Direct Ltd) collects, uses and protects your personal data.', priority: 0.3 },
  { path: '/terms', title: 'Terms & Conditions of Hire | UGO Coach & Minibus Hire', description: 'The conditions of hire for Pullman Direct Ltd, trading as UGO Coach & Minibus Hire.', priority: 0.3 },
  ...TOWNS.map((t) => ({
    path: `/coach-hire-${t.slug}`,
    title: `Coach Hire ${t.name} | Minibus Hire ${t.name} | UGO`,
    description: t.metaDescription,
    priority: 0.8,
  })),
  ...POSTS.map((p) => ({
    path: `/blog/${p.slug}`,
    title: `${p.title} | UGO`,
    description: p.metaDescription,
    priority: 0.6,
  })),
];

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ---------- sitemap.xml ----------
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map((r) => `  <url><loc>${SITE_URL}${r.path === '/' ? '/' : r.path}</loc><lastmod>${today}</lastmod><priority>${r.priority.toFixed(1)}</priority></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);
console.log(`sitemap.xml written (${ROUTES.length} URLs)`);

// ---------- per-route index.html with injected head ----------
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

function htmlFor(route: RouteMeta): string {
  const url = SITE_URL + (route.path === '/' ? '/' : route.path);
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`);
  html = html.replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(route.description)}$2`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(route.title)}$2`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(route.description)}$2`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
  return html;
}

let written = 0;
for (const route of ROUTES) {
  if (route.path === '/') {
    fs.writeFileSync(path.join(DIST, 'index.html'), htmlFor(route));
    written++;
    continue;
  }
  const dir = path.join(DIST, route.path.slice(1));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), htmlFor(route));
  written++;
}

// 404 page copy with noindex
let notFound = template
  .replace(/<title>[\s\S]*?<\/title>/, '<title>Page Not Found | UGO Coach &amp; Minibus Hire</title>')
  .replace('</head>', '  <meta name="robots" content="noindex, follow" />\n</head>');
fs.writeFileSync(path.join(DIST, '404.html'), notFound);

console.log(`${written} route HTML files written + 404.html`);
