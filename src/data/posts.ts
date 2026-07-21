/**
 * Blog guides — real, useful articles written from the operator's point of
 * view. Each targets a high-intent search the business can win:
 *   1. "coach hire cost / minibus hire price"  → the money query
 *   2. "school trip transport / school coach hire checklist" → schools & contracts
 *   3. "wedding guest transport" → weddings
 * Edit or add posts here; routes, sitemap and meta update automatically.
 */

export interface PostSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Post {
  slug: string;
  title: string;
  metaDescription: string;
  kicker: string;
  intro: string;
  datePublished: string;
  readingMinutes: number;
  sections: PostSection[];
  faqs: Array<{ q: string; a: string }>;
  cta: { heading: string; text: string };
}

export const POSTS: Post[] = [
  {
    slug: 'coach-hire-cost-guide',
    title: 'How Much Does Coach & Minibus Hire Cost? An Honest 2026 Guide',
    metaDescription:
      'What coach and minibus hire really costs in Hertfordshire and London in 2026: the factors that set the price, example scenarios, and how to get an accurate quote fast — from a family-run operator.',
    kicker: 'Pricing, explained by an operator',
    intro:
      'It is the first question everyone asks and the one most websites dodge. As a family-run operator, we would rather explain honestly how coach and minibus pricing actually works — so you can budget properly and spot a quote that is too good to be true.',
    datePublished: '2026-07-20',
    readingMinutes: 6,
    sections: [
      {
        heading: 'The five things that set the price',
        paragraphs: [
          'Every quote we produce comes down to the same handful of factors. Understanding them puts you in control of the cost before you even enquire.',
        ],
        bullets: [
          'Vehicle size — a 16-seat executive minibus costs less to run than a 53-seat coach, but per person the big coach is usually the better value once your group passes about 30.',
          'Distance and duration — pricing reflects mileage, driver time and, on long days, legally required driver breaks. A local evening runs very differently to a full-day tour.',
          'Date and time — Saturdays in wedding season, school-trip season weekdays, and December evenings are peak. A flexible date can genuinely move the price.',
          'Waiting time and itinerary shape — a straight A-to-B transfer is the cheapest shape; a driver staying with you all day at an event costs more but is often worth it.',
          'Special requirements — extra luggage capacity for airport runs, multiple pickup points, or accessible vehicles all factor in. Tell us upfront and the quote will be right first time.',
        ],
      },
      {
        heading: 'Realistic ballparks (and why we quote individually)',
        paragraphs: [
          'Treat these as orientation, not prices: a short local transfer in an executive minibus typically lands in the low hundreds; a full-day 49-seat coach for a school trip or day excursion commonly runs mid-hundreds to around a thousand pounds depending on mileage; and multi-vehicle wedding or event shuttles are built as bespoke packages.',
          'The honest reason operators quote individually is that two "coach to Heathrow" jobs can differ by hours of driver time and dozens of miles of positioning. A firm that quotes a flat price without asking questions is either padding heavily or planning to add extras later.',
        ],
      },
      {
        heading: 'How to keep the cost down without cutting corners',
        paragraphs: [
          'Book early for peak dates — vehicles, not willingness, are the constraint in summer. Consolidate pickup points rather than touring half the county. Consider a midi coach if your group sits between minibus and full coach sizes. And always check what is included: with us, the driver, fuel, tolls where applicable and standard waiting are in the price we give you — the number you see is the number you pay.',
          'The corner not to cut is compliance. A licensed operator with vetted drivers, proper insurance and maintained vehicles will rarely be the absolute cheapest quote you receive. It will be the one that turns up, on time, with your group insured.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do you charge for a quote?',
        a: 'No — quotes are free, individual, and usually with you the same day. Use the Smart Quote form or call 0845 8333 456 (or the owners direct on 07833 226 623).',
      },
      {
        q: 'Is a deposit required?',
        a: 'Yes, a deposit secures the booking, with the balance due fourteen days before travel unless we agree otherwise — full details are in our terms of hire.',
      },
      {
        q: 'Is per-person or whole-vehicle pricing better?',
        a: 'We price per vehicle, which almost always works out cheaper for organised groups than per-seat services — and the vehicle is exclusively yours.',
      },
    ],
    cta: {
      heading: 'Get your exact price in under a minute',
      text: 'Send your journey through the Smart Quote form and Alan and Sasha’s team will come back with a personal quote — usually the same day.',
    },
  },
  {
    slug: 'school-trip-transport-checklist',
    title: 'School Trip Transport: The Compliance Checklist Every Organiser Should Use',
    metaDescription:
      'Booking coaches for a school trip? The exact compliance checklist trip organisers should run: DBS checks, seat belts, licensing, driver hours, insurance and the questions to ask any operator.',
    kicker: 'For teachers, EVCs and trip organisers',
    intro:
      'If you are organising school transport, the paperwork matters as much as the price. This is the checklist we would want a school to run on any operator — including us. Print it, send it to your educational visits coordinator, and ask every question on it.',
    datePublished: '2026-07-20',
    readingMinutes: 5,
    sections: [
      {
        heading: 'The non-negotiables',
        paragraphs: [
          'These are the items no reputable operator will hesitate to evidence. If you get vague answers on any of them, walk away — the cheapest quote is expensive the day something goes wrong.',
        ],
        bullets: [
          'Operator licence — the company should hold a valid PSV operator licence and be registered with the DVSA (the regulator for coach operators).',
          'Enhanced DBS-checked drivers — every driver working school routes or trips should hold an enhanced DBS check, not a basic one.',
          'Seat belts throughout — every seat belted, and a policy that they are worn; for younger children, discuss seating plans and supervision ratios in advance.',
          'Insurance — comprehensive passenger liability cover; ask for confirmation in writing and keep it with your trip paperwork.',
          'Maintained vehicles — regular safety inspections beyond the annual MOT are the industry standard; a good operator services on a rolling schedule.',
          'Driver hours compliance — for long trips, the operator should plan the day within legal driving-hours limits, including breaks, before quoting.',
        ],
      },
      {
        heading: 'Questions worth asking beyond the legal minimum',
        paragraphs: [
          'What happens if the vehicle breaks down mid-trip — is there backup cover? Who do staff phone on the day, and is that line answered by a person? Can the same driver cover a regular route so pupils see a familiar face? Does the operator carry out risk assessments for the pickup and drop-off points?',
          'The answers tell you more than any brochure. Operators who do genuine school work answer them instantly, because they solve these problems every week of term.',
        ],
      },
      {
        heading: 'Regular routes and contract tenders',
        paragraphs: [
          'For daily home-to-school routes or SEND transport contracts, the same checklist applies plus consistency: named drivers, communication protocols with the school office, and clear escalation when traffic or weather disrupts a run. As an experienced family-run provider we welcome formal invitations to tender for school and college routes — and we are happy to complete your county or trust’s compliance paperwork as part of any bid.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Are your drivers DBS checked?',
        a: 'Yes — every driver we deploy is enhanced-DBS vetted, and we are happy to evidence this to your school or trust as part of the booking.',
      },
      {
        q: 'Can you provide transport for a whole year group?',
        a: 'Yes. Multi-coach movements with a lead coordinator are one of our specialities — three or four vehicles moving together, planned as one operation.',
      },
      {
        q: 'How far ahead should schools book?',
        a: 'For summer-term trip season, four to six weeks gives the best choice of vehicles; for one-off fixtures we can often help at much shorter notice.',
      },
    ],
    cta: {
      heading: 'Send us your trip or tender details',
      text: 'Share your route, dates and group size and our management team will respond with a straightforward, compliant quote — usually the same day.',
    },
  },
  {
    slug: 'wedding-guest-transport-planning',
    title: 'Wedding Guest Transport: How to Plan Shuttles, Timings and Costs',
    metaDescription:
      'A working operator’s guide to wedding guest transport: how shuttle loops work, the timings that actually hold, how many vehicles you need, and what it costs in Hertfordshire and London.',
    kicker: 'Weddings, done punctually',
    intro:
      'Nobody remembers the transport at a wedding that runs perfectly — and nobody forgets it at one that doesn’t. After years of moving wedding parties around Hertfordshire’s venues, here is how we plan guest transport that simply works, and what it realistically costs.',
    datePublished: '2026-07-20',
    readingMinutes: 5,
    sections: [
      {
        heading: 'The shuttle loop: the shape that works',
        paragraphs: [
          'For most weddings the right answer is not one giant coach but a timed loop: an executive minibus (or two) circulating between the guest hotels and the venue in the hour before the ceremony, then again at the end of the night. Guests wait minutes, not half an hour, and nobody is herded onto a single departure.',
          'The planning questions that matter: how many guests genuinely need transport (usually fewer than you think — poll your RSVPs), how far the hotels are from the venue, and what time the venue asks everyone to leave. From those three numbers we can design the loop and tell you exactly how many vehicles it takes.',
        ],
      },
      {
        heading: 'Timings that actually hold',
        paragraphs: [
          'Work backwards from the ceremony: guests seated fifteen minutes before, last shuttle arriving twenty-five minutes before, first shuttle leaving the hotel about an hour ahead for a typical fifteen-minute run. At the end of the night, two staged departures — one just after the last dance for the sensible, one at close for the stalwarts — beats a single scrum for seats.',
          'Build in slack for country-lane venues: gates, gravel and one-track roads eat minutes. This is exactly the local knowledge a nearby operator brings — we know which Hertfordshire venues need the extra ten minutes and which lane the sat-nav gets wrong.',
        ],
      },
      {
        heading: 'What it costs and what changes the price',
        paragraphs: [
          'Wedding transport is priced as a bespoke package: vehicle size, hours of cover, and how late the final pickup runs are the main drivers. A single-minibus hotel loop sits at the affordable end; multi-vehicle operations with late finishes cost more but replace a fleet of unreliable late-night taxis for your entire guest list.',
          'Two things worth paying for: unbranded vehicles that look right in the photographs, and a driver who stays with the job rather than a distant company juggling three bookings that evening. Both come as standard with us.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can guests leave at different times at the end of the night?',
        a: 'Yes — we usually plan two staged departures, and the vehicle waits for your schedule, not the other way round.',
      },
      {
        q: 'Do you cover venues outside Hertfordshire?',
        a: 'Regularly — London, the Home Counties and further afield. Wherever the venue, the loop-planning approach is the same.',
      },
      {
        q: 'How far ahead should we book wedding transport?',
        a: 'Peak-season Saturdays go first: three to six months ahead is comfortable. For off-peak dates we can often accommodate much later.',
      },
    ],
    cta: {
      heading: 'Tell us your venue and hotels',
      text: 'Send the venue, guest numbers and hotels through the Smart Quote form and we’ll come back with a shuttle plan and a clear price.',
    },
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
