/**
 * Town landing page data — one entry per town the business serves and has
 * historically ranked for (these slugs match the old site's URLs exactly,
 * so existing Google rankings carry straight over with no redirects).
 *
 * St Albans, Watford, Hemel Hempstead and Luton are NOT in this list because
 * they have full bespoke pages at /locations/... — the old town URLs for
 * those four are 301-redirected in vercel.json.
 *
 * Copy rules: local geography and venues only — never name a client or
 * imply a contract that isn't evidenced in writing.
 */

export interface TownFaq {
  q: string;
  a: string;
}

export interface Town {
  slug: string;
  name: string;
  county: string;
  metaDescription: string;
  headline: string;
  intro: string;
  localAngle: string;
  popularJourneys: string[];
  faqs: TownFaq[];
  nearby: Array<{ label: string; slug?: string; locationPage?: string }>;
}

export const TOWNS: Town[] = [
  {
    slug: 'amersham',
    name: 'Amersham',
    county: 'Buckinghamshire',
    metaDescription:
      'Coach and minibus hire in Amersham and the Chalfonts. Family-run, DBS-vetted drivers, unbranded executive fleet. School trips, London theatre runs and airport transfers.',
    headline: 'Coach Hire Amersham: Executive Minibus & Coach Travel in the Chilterns',
    intro:
      'From Old Amersham wedding venues to school trips out of the Chalfonts, our family-run fleet covers Amersham with the same care we give our own neighbours. One call reaches the owners — never a call centre.',
    localAngle:
      'Amersham sits at the end of the Metropolitan line, but for group travel the trains only get you so far. We run regular theatre and event trips into central London, collect from Amersham & Wycombe College and local schools for sports fixtures and residentials, and handle wedding parties across Chiltern venues from Missenden Abbey to Latimer House. Heathrow is under 40 minutes down the M25 in normal traffic, which makes early-morning holiday departures with luggage genuinely painless.',
    popularJourneys: [
      'Amersham to Heathrow & Gatwick airport group transfers',
      'School trips and sports fixtures across Buckinghamshire',
      'London West End theatre and Christmas lights evenings',
      'Wedding guest shuttles for Chiltern venues',
      'Days out to Oxford, Windsor and Bicester Village',
    ],
    faqs: [
      {
        q: 'How much does coach hire in Amersham cost?',
        a: 'It depends on distance, date and vehicle size — a 16-seat executive minibus for a local evening run costs far less than a 53-seat coach to the coast. Use the Smart Quote form or call 0845 8333 456 and the family team will price your exact journey, usually the same day.',
      },
      {
        q: 'Can you provide minibuses for school trips from Amersham?',
        a: 'Yes — school and college transport is one of our core services. Every driver is enhanced-DBS checked, vehicles carry seat belts throughout, and we are happy to work within your school\'s trip-approval paperwork.',
      },
      {
        q: 'Do you cover the villages around Amersham?',
        a: 'We regularly collect from Chesham, the Chalfonts, Great Missenden, Little Chalfont and the surrounding Chiltern villages — anywhere in the area is straightforward for us.',
      },
    ],
    nearby: [
      { label: 'High Wycombe', slug: 'high-wycombe' },
      { label: 'Berkhamsted', slug: 'berkhamsted' },
      { label: 'Aylesbury', slug: 'aylesbury' },
      { label: 'Watford & Elstree', locationPage: '/locations/watford' },
    ],
  },
  {
    slug: 'aylesbury',
    name: 'Aylesbury',
    county: 'Buckinghamshire',
    metaDescription:
      'Coach hire and minibus hire in Aylesbury. 16–53 seat executive vehicles for schools, businesses, weddings and airport transfers across the Vale of Aylesbury.',
    headline: 'Coach Hire Aylesbury: Minibuses & Coaches for the Vale',
    intro:
      'Whether it is a full 53-seater for a school residential or an executive minibus taking a wedding party to a Vale venue, Aylesbury groups get the same deal: pristine unbranded vehicles and a direct line to the owners.',
    localAngle:
      'Aylesbury is one of the busiest towns we serve — a growing population, big secondary schools and grammar schools with packed fixture calendars, and employers spread between the town centre and the business parks off the A41. We run regular staff shuttles, take groups to Waterside Theatre evenings and London shows, and cover weddings at venues like Hartwell House and Notley Abbey. For holidays, Luton airport is barely half an hour away and Heathrow an easy run down the A41/M25.',
    popularJourneys: [
      'Aylesbury to Luton and Heathrow airport transfers',
      'School residentials, sports fixtures and grammar school trips',
      'Staff shuttles for Aylesbury business parks',
      'Wedding transport for Vale of Aylesbury venues',
      'Group days out to London, Oxford and the coast',
    ],
    faqs: [
      {
        q: 'What size vehicles can you supply in Aylesbury?',
        a: 'Executive minibuses from 10 to 16 seats, midi coaches around 29 to 35 seats, and full-size coaches up to 53 seats — all unbranded, seat-belted and climate controlled. Tell us your group size and we will match the vehicle.',
      },
      {
        q: 'Do you handle regular school contract routes in Aylesbury?',
        a: 'Yes. As an experienced family-run operator we welcome invitations to tender for daily school routes and college contracts, and all our drivers are enhanced-DBS vetted.',
      },
      {
        q: 'How far in advance should we book?',
        a: 'For summer weekends and school-trip season, two to four weeks ahead is sensible; for a Tuesday airport run we can often help at short notice. Call 0845 8333 456 — out of hours we answer on 07833 226 623.',
      },
    ],
    nearby: [
      { label: 'Leighton Buzzard', slug: 'leighton-buzzard' },
      { label: 'Amersham', slug: 'amersham' },
      { label: 'High Wycombe', slug: 'high-wycombe' },
      { label: 'Milton Keynes', slug: 'milton-keynes' },
    ],
  },
  {
    slug: 'barnet',
    name: 'Barnet',
    county: 'North London',
    metaDescription:
      'Coach and minibus hire in Barnet, Whetstone and Totteridge. Unbranded executive fleet for schools, synagogues, sports clubs, weddings and airport runs.',
    headline: 'Coach Hire Barnet: North London Group Travel, Done Properly',
    intro:
      'On the doorstep of our London Colney base, Barnet is home turf. Schools, faith groups, sports clubs and families across the borough use our unbranded fleet because the price is honest and the driver actually turns up early.',
    localAngle:
      'Being ten minutes up the A1081 from our depot means Barnet bookings get our best availability — early-morning airport departures from High Barnet, Whetstone and Totteridge are a daily routine for us. We carry school groups across the borough\'s large independent and state schools, run supporters and junior teams to fixtures, and shuttle wedding and simcha guests between venues and receptions across North London. Congestion, school-street restrictions and tight residential turns are exactly why groups here prefer an experienced local driver over a random broker allocation.',
    popularJourneys: [
      'Barnet to Heathrow, Luton and Stansted airport transfers',
      'School trips and sports fixtures across North London',
      'Wedding and celebration guest shuttles',
      'Faith group outings and community trips',
      'Theatre evenings and London days out',
    ],
    faqs: [
      {
        q: 'Are your vehicles suitable for narrow Barnet residential streets?',
        a: 'Yes — we match the vehicle to the pickup. For tight roads we will often suggest two 16-seat executive minibuses rather than one full coach, priced sensibly, so nobody is walking half a mile to a pickup point.',
      },
      {
        q: 'Can you do very early airport pickups from Barnet?',
        a: 'All the time. We are a 24/7 family operation — 4am departures to Heathrow or Luton are standard work for us, and you will have the driver\'s details the evening before.',
      },
      {
        q: 'Do you serve the whole borough?',
        a: 'Everywhere from High Barnet and New Barnet to Whetstone, Totteridge, Finchley and Mill Hill — plus Potters Bar and Enfield next door.',
      },
    ],
    nearby: [
      { label: 'Potters Bar', slug: 'potters-bar' },
      { label: 'Enfield', slug: 'enfield' },
      { label: 'Edgware', slug: 'edgware' },
      { label: 'St Albans base', locationPage: '/locations/st-albans' },
    ],
  },
  {
    slug: 'bedford',
    name: 'Bedford',
    county: 'Bedfordshire',
    metaDescription:
      'Coach hire in Bedford and minibus hire across Bedfordshire. Family-run operator for school trips, corporate shuttles, weddings, river festival events and airport transfers.',
    headline: 'Coach Hire Bedford: Reliable Group Travel Across Bedfordshire',
    intro:
      'From Harpur Trust school trips to corporate moves along the A421 corridor, Bedford groups travel with a family firm that answers its own phone — evenings and weekends included.',
    localAngle:
      'Bedford\'s mix keeps our diaries interesting: strong independent schools with heavy fixture and trip calendars, big distribution and engineering employers around the town needing staff shuttles, and summer events like the River Festival that bring serious group movement. Luton airport is a 25-minute run, which makes us a natural choice for holiday departures, and we regularly take Bedford groups into London for theatre evenings — door to door beats the last train home with thirty people every time.',
    popularJourneys: [
      'Bedford to Luton, Heathrow and Stansted transfers',
      'School trips, fixtures and residentials',
      'Staff and warehouse shuttles along the A421/A6',
      'Bedford River Festival and event transport',
      'London theatre and shopping day trips',
    ],
    faqs: [
      {
        q: 'Do you supply coaches for Bedford school trips?',
        a: 'Yes — schools are a core part of our work. Enhanced-DBS drivers, seat belts throughout, and clear paperwork for your educational visits coordinator come as standard.',
      },
      {
        q: 'Can you run a regular staff shuttle for our Bedford site?',
        a: 'We build custom shuttle timetables matched to shift patterns for employers across Bedfordshire — tell us your site, headcount and shifts and we will propose a schedule and fixed pricing.',
      },
      {
        q: 'What is the best way to get a price?',
        a: 'The Smart Quote form takes under a minute, or call 0845 8333 456 during office hours (08:00–18:00) — you will deal directly with the owners, not a broker.',
      },
    ],
    nearby: [
      { label: 'Milton Keynes', slug: 'milton-keynes' },
      { label: 'Hitchin', slug: 'hitchin' },
      { label: 'Leighton Buzzard', slug: 'leighton-buzzard' },
      { label: 'Luton hub', locationPage: '/locations/luton' },
    ],
  },
  {
    slug: 'berkhamsted',
    name: 'Berkhamsted',
    county: 'Hertfordshire',
    metaDescription:
      'Minibus and coach hire in Berkhamsted and Tring. Executive unbranded vehicles for school trips, weddings at Ashridge House, airport transfers and London evenings.',
    headline: 'Coach Hire Berkhamsted: Executive Travel for the Bulbourne Valley',
    intro:
      'Berkhamsted expects things done well. Our unbranded executive fleet suits the town — wedding parties to Ashridge, school groups away on fixtures, and quiet, punctual 5am airport departures.',
    localAngle:
      'A lot of our Berkhamsted work orbits three things: the town\'s prominent schools, weddings and corporate retreats at Ashridge House and the surrounding estate venues, and commuter families heading to Heathrow or Luton with luggage for the holidays. We know the High Street\'s pinch points and the lanes up to Ashridge well enough to plan pickups that actually work. Tring and the villages along the A4251 are all comfortably inside our patch too.',
    popularJourneys: [
      'Berkhamsted to Heathrow and Luton airport transfers',
      'Wedding guest transport for Ashridge and estate venues',
      'School fixtures, trips and residentials',
      'London theatre and event evenings',
      'Group days out to Oxford and the Cotswolds',
    ],
    faqs: [
      {
        q: 'Can you shuttle wedding guests up to Ashridge House?',
        a: 'Yes — venue shuttles are one of our specialities. We plan a timed loop between hotels, the ceremony and reception so nobody is left waiting in the lane, with an unbranded fleet that photographs beautifully.',
      },
      {
        q: 'Do you cover Tring and the villages?',
        a: 'Tring, Northchurch, Potten End, Aldbury and the villages along the valley are all regular pickups for us.',
      },
      {
        q: 'What makes UGO different from a coach broker?',
        a: 'You book directly with the family that owns and maintains the vehicles. No middlemen, no reallocation to an operator you have never heard of — the people you phone are the people responsible on the day.',
      },
    ],
    nearby: [
      { label: 'Hemel Hempstead hub', locationPage: '/locations/hemel-hempstead' },
      { label: 'Amersham', slug: 'amersham' },
      { label: 'Aylesbury', slug: 'aylesbury' },
      { label: 'St Albans base', locationPage: '/locations/st-albans' },
    ],
  },
  {
    slug: 'edgware',
    name: 'Edgware',
    county: 'North West London',
    metaDescription:
      'Coach and minibus hire in Edgware, Stanmore and Mill Hill. Unbranded fleet for community groups, schools, simchas, weddings and airport transfers.',
    headline: 'Coach Hire Edgware: Group Travel for North West London',
    intro:
      'Edgware, Stanmore and Mill Hill groups have used our family fleet for years — community outings, school runs, celebration shuttles and crack-of-dawn airport departures, all handled directly by the owners.',
    localAngle:
      'This corner of North West London generates constant group travel: active community and faith organisations running outings and events, schools with packed trip calendars, and families flying out of Heathrow — which is only around half an hour away off-peak. Our unbranded executive vehicles are a regular sight outside Edgware\'s halls and schools, and because we are based just up the A41 at London Colney, short-notice cover here is usually possible.',
    popularJourneys: [
      'Edgware to Heathrow and Luton airport transfers',
      'Community and faith group outings',
      'School trips and sports fixtures',
      'Wedding and simcha guest shuttles',
      'Seaside and countryside day trips',
    ],
    faqs: [
      {
        q: 'Can you provide several minibuses at once for a large celebration?',
        a: 'Yes — multi-vehicle bookings are routine for us. We can run two or three 16-seaters as a synchronised shuttle, or combine minibuses with a full coach for bigger guest lists.',
      },
      {
        q: 'Do your drivers know the local venues?',
        a: 'Our drivers work North West London constantly and we brief every job with exact pickup points, venue entrances and timing — no circling the block while your guests wait.',
      },
      {
        q: 'How do I get a quote for an Edgware pickup?',
        a: 'Use the Smart Quote form or call 0845 8333 456 — quotes come from the family team, usually the same day.',
      },
    ],
    nearby: [
      { label: 'Barnet', slug: 'barnet' },
      { label: 'Watford & Elstree hub', locationPage: '/locations/watford' },
      { label: 'Potters Bar', slug: 'potters-bar' },
      { label: 'Enfield', slug: 'enfield' },
    ],
  },
  {
    slug: 'enfield',
    name: 'Enfield',
    county: 'North London',
    metaDescription:
      'Coach hire in Enfield and minibus hire across the borough. Schools, sports clubs, community groups, weddings and airport transfers with a family-run fleet.',
    headline: 'Coach Hire Enfield: Dependable Coaches for the Borough',
    intro:
      'From Enfield Town school gates to Stansted departures, our coaches and executive minibuses give the borough what brokers can\'t: one family, one phone number, total accountability.',
    localAngle:
      'Enfield\'s schools and colleges keep us busy through term time with fixtures, museum trips and residentials, while the borough\'s sports clubs travel with us across London and the South East at weekends. The M25 sitting on the doorstep makes Stansted and Luton equally quick for holiday departures, and our drivers handle the North Circular\'s moods daily. Community groups from across the borough — Palmers Green, Winchmore Hill, Southgate — book their annual outings with us year after year.',
    popularJourneys: [
      'Enfield to Stansted, Luton and Heathrow transfers',
      'School trips and college fixtures',
      'Sports club away-day travel',
      'Community and senior group outings',
      'London shows and shopping evenings',
    ],
    faqs: [
      {
        q: 'Can you handle a whole-year-group school trip from Enfield?',
        a: 'Yes — multi-coach movements are one of our strengths. We can run three or four coaches in convoy with a lead coordinator, which is exactly how large year-group trips should be managed.',
      },
      {
        q: 'Do you do Saturday sports fixtures?',
        a: 'Weekend fixture travel is core work for us — regular clubs get a consistent driver who knows the routine and the grounds.',
      },
      {
        q: 'Which airports work best from Enfield?',
        a: 'Stansted and Luton are usually quickest via the M25, with Heathrow straightforward outside peak hours — we will advise honestly on timings when you book.',
      },
    ],
    nearby: [
      { label: 'Barnet', slug: 'barnet' },
      { label: 'Potters Bar', slug: 'potters-bar' },
      { label: 'Harlow', slug: 'harlow' },
      { label: 'Edgware', slug: 'edgware' },
    ],
  },
  {
    slug: 'harlow',
    name: 'Harlow',
    county: 'Essex',
    metaDescription:
      'Coach and minibus hire in Harlow, Essex. Staff shuttles, school trips, sports travel, weddings and Stansted airport transfers from a family-run operator.',
    headline: 'Coach Hire Harlow: Group Travel for West Essex',
    intro:
      'Harlow\'s employers, schools and clubs need transport that just works. Our family team runs staff shuttles, fixture travel and Stansted transfers across West Essex with zero broker nonsense.',
    localAngle:
      'Harlow\'s science and business parks generate steady shuttle and conference work, and with Stansted just 20 minutes up the M11 we handle a constant stream of early holiday departures and corporate fly-outs. School trips out of Harlow and the villages — Old Harlow, Church Langley, Roydon — plus weekend sports travel round out a patch we have covered for years. When the M11 misbehaves, our drivers know the A414 alternatives better than the sat-nav does.',
    popularJourneys: [
      'Harlow to Stansted, Luton and Heathrow transfers',
      'Staff shuttles for Harlow business and science parks',
      'School trips and residentials',
      'Sports club and supporter travel',
      'London and Cambridge day trips',
    ],
    faqs: [
      {
        q: 'How quickly can you get a group from Harlow to Stansted?',
        a: 'Around 20–25 minutes in normal traffic — we schedule pickups with sensible buffers for check-in, and track flights for return collections so you are not waiting on a delayed landing.',
      },
      {
        q: 'Can you run a fixed daily shuttle for our Harlow site?',
        a: 'Yes — we build recurring shuttle schedules with fixed pricing for employers, matched to shift patterns, with a consistent driver wherever possible.',
      },
      {
        q: 'Do you cover the villages around Harlow?',
        a: 'Roydon, Nazeing, Sheering, Sawbridgeworth and the surrounding villages are all comfortably within our coverage.',
      },
    ],
    nearby: [
      { label: 'Enfield', slug: 'enfield' },
      { label: 'Potters Bar', slug: 'potters-bar' },
      { label: 'Stevenage', slug: 'stevenage' },
      { label: 'Romford', slug: 'romford' },
    ],
  },
  {
    slug: 'harpenden',
    name: 'Harpenden',
    county: 'Hertfordshire',
    metaDescription:
      'Executive minibus and coach hire in Harpenden. Weddings, school trips, golf days, London evenings and airport transfers — minutes from our St Albans base.',
    headline: 'Coach Hire Harpenden: Executive Group Travel on Your Doorstep',
    intro:
      'Harpenden is ten minutes from our base, so you get our sharpest availability and pricing. Unbranded executive vehicles for weddings, school fixtures, golf days and early airport starts.',
    localAngle:
      'Our depot at London Colney means Harpenden enjoys genuinely local service — drivers who live around here, vehicles that arrive early, and short-notice cover that out-of-area operators cannot match. The town\'s schools travel with us for fixtures and trips, wedding parties use our executive minibuses between Harpenden\'s hotels and Hertfordshire venues, and Luton airport being 15 minutes up the A1081 makes us the sensible choice for family holiday departures. Golf societies at the town\'s clubs book us for away days as a matter of routine.',
    popularJourneys: [
      'Harpenden to Luton and Heathrow airport transfers',
      'Wedding guest shuttles across Hertfordshire venues',
      'School fixtures and residential trips',
      'Golf society and club away days',
      'London theatre and dinner evenings',
    ],
    faqs: [
      {
        q: 'How local are you to Harpenden, really?',
        a: 'Our operations base is London Colney, St Albans — about ten minutes away. Harpenden pickups are home-ground work, which shows in availability and price.',
      },
      {
        q: 'Can you do a late-night return from London?',
        a: 'Yes — theatre and event returns after midnight are normal for us; we are a genuine out-of-hours operation with the mobile answered on 07833 226 623.',
      },
      {
        q: 'What vehicles suit a Harpenden wedding?',
        a: 'Most couples choose our unbranded 16-seat executive minibuses for hotel-to-venue loops, adding a midi coach when the guest list grows — pristine, discreet and photograph-friendly.',
      },
    ],
    nearby: [
      { label: 'St Albans base', locationPage: '/locations/st-albans' },
      { label: 'Luton hub', locationPage: '/locations/luton' },
      { label: 'Hitchin', slug: 'hitchin' },
      { label: 'Welwyn Garden City', slug: 'welwyn-garden-city' },
    ],
  },
  {
    slug: 'high-wycombe',
    name: 'High Wycombe',
    county: 'Buckinghamshire',
    metaDescription:
      'Coach hire High Wycombe — minibuses and coaches for schools, businesses, weddings and Heathrow transfers across South Buckinghamshire.',
    headline: 'Coach Hire High Wycombe: South Bucks Group Travel',
    intro:
      'Wycombe groups — schools, employers, wedding parties and clubs — get an owner-run alternative to the big brokers: honest pricing, vetted drivers, and vehicles that arrive early.',
    localAngle:
      'High Wycombe\'s size brings variety: grammar and secondary school trips, staff movement for employers along the A40 corridor, university open-day runs from Bucks New University, and weekend fixture travel throughout South Bucks. Heathrow is a 25-minute run down the M40, making airport work a Wycombe staple for us, and London evenings — shows, dinners, Christmas parties — are an easy door-to-door job. We cover the whole district, from Marlow and Bourne End up to Hazlemere and Princes Risborough.',
    popularJourneys: [
      'High Wycombe to Heathrow and Gatwick transfers',
      'School and grammar school trips and fixtures',
      'Corporate shuttles along the M40/A40 corridor',
      'Marlow and Thames-side wedding transport',
      'London theatre and Christmas party evenings',
    ],
    faqs: [
      {
        q: 'Do you cover Marlow and Bourne End too?',
        a: 'Yes — the whole Wycombe district including Marlow, Bourne End, Flackwell Heath, Hazlemere and Princes Risborough is regular ground for us.',
      },
      {
        q: 'Can you quote for a regular school contract in Wycombe?',
        a: 'We welcome tender invitations for school and college routes — as a DVSA-registered, family-run operator with enhanced-DBS drivers we are well set up for contract work.',
      },
      {
        q: 'What is the best airport from High Wycombe?',
        a: 'Heathrow, almost always — around 25 minutes via the M40. We will advise on timings for your specific flight when you book.',
      },
    ],
    nearby: [
      { label: 'Amersham', slug: 'amersham' },
      { label: 'Aylesbury', slug: 'aylesbury' },
      { label: 'Berkhamsted', slug: 'berkhamsted' },
      { label: 'Watford & Elstree hub', locationPage: '/locations/watford' },
    ],
  },
  {
    slug: 'hitchin',
    name: 'Hitchin',
    county: 'Hertfordshire',
    metaDescription:
      'Coach and minibus hire in Hitchin, North Hertfordshire. School trips, weddings, brewery and market-town events, airport transfers and London evenings.',
    headline: 'Coach Hire Hitchin: North Herts Travel with a Family Touch',
    intro:
      'Hitchin\'s schools, wedding couples and social clubs use our fleet because it is the market-town way of doing business: speak to the owner, agree a fair price, job done properly.',
    localAngle:
      'Hitchin and its neighbours Letchworth and Baldock form a patch we know intimately. The town\'s schools run fixtures and trips with us through the year, and Hitchin\'s popularity as a wedding destination — with the Priory and the town\'s historic venues — keeps our executive minibuses busy most summer weekends. Luton airport is 20 minutes away for holiday departures, and London evenings return door-to-door long after the last train has gone.',
    popularJourneys: [
      'Hitchin to Luton and Stansted airport transfers',
      'Wedding guest shuttles for Hitchin Priory and town venues',
      'School trips and sports fixtures',
      'Social club and society outings',
      'London theatre and event evenings',
    ],
    faqs: [
      {
        q: 'Can you shuttle wedding guests between Hitchin hotels and our venue?',
        a: 'Yes — timed guest loops are a speciality. We plan the schedule with you so the ceremony starts full and the last dance ends with everyone getting home.',
      },
      {
        q: 'Do you cover Letchworth and Baldock from the same base?',
        a: 'Yes — Hitchin, Letchworth and Baldock are all core coverage, with Stevenage next door too.',
      },
      {
        q: 'How do I get a price for a Hitchin pickup?',
        a: 'Smart Quote form or 0845 8333 456 — direct to the family team, with out-of-hours calls answered on 07833 226 623.',
      },
    ],
    nearby: [
      { label: 'Letchworth', slug: 'letchworth' },
      { label: 'Stevenage', slug: 'stevenage' },
      { label: 'Harpenden', slug: 'harpenden' },
      { label: 'Luton hub', locationPage: '/locations/luton' },
    ],
  },
  {
    slug: 'leighton-buzzard',
    name: 'Leighton Buzzard',
    county: 'Bedfordshire',
    metaDescription:
      'Coach and minibus hire in Leighton Buzzard and Linslade. Schools, clubs, weddings, days out and Luton airport transfers from a family-run operator.',
    headline: 'Coach Hire Leighton Buzzard: Group Travel for the Ouzel Valley',
    intro:
      'From Linslade school gates to Luton departures, Leighton Buzzard groups travel with a family firm that prices fairly and turns up early — every time.',
    localAngle:
      'Leighton Buzzard sits in a sweet spot for us: Luton airport is 25 minutes east for holiday flights, Milton Keynes 20 minutes north for arena events and shopping, and London under an hour for theatre evenings. The town\'s schools use us for trips and fixtures, local societies for their annual outings — including steam-railway and heritage days — and wedding parties for venue shuttles across South Bedfordshire\'s barns and manor houses.',
    popularJourneys: [
      'Leighton Buzzard to Luton airport transfers',
      'School trips and fixtures across Bedfordshire',
      'Milton Keynes arena and shopping runs',
      'Wedding shuttles for South Beds venues',
      'Society outings and heritage day trips',
    ],
    faqs: [
      {
        q: 'Can you pick up from Linslade and the villages?',
        a: 'Yes — Linslade, Heath and Reach, Wing and the surrounding villages are all standard pickups for us.',
      },
      {
        q: 'Do you run evening returns from Milton Keynes arena events?',
        a: 'Regularly — we wait for the encore, not the clock, and the vehicle is outside when you come out.',
      },
      {
        q: 'What does a minibus to Luton airport cost from Leighton Buzzard?',
        a: 'It varies by date, time and vehicle size — use the Smart Quote form or call 0845 8333 456 and we will price your exact trip quickly.',
      },
    ],
    nearby: [
      { label: 'Aylesbury', slug: 'aylesbury' },
      { label: 'Milton Keynes', slug: 'milton-keynes' },
      { label: 'Bedford', slug: 'bedford' },
      { label: 'Luton hub', locationPage: '/locations/luton' },
    ],
  },
  {
    slug: 'letchworth',
    name: 'Letchworth',
    county: 'Hertfordshire',
    metaDescription:
      'Coach hire in Letchworth Garden City. Minibuses and coaches for schools, businesses, weddings, community outings and airport transfers across North Herts.',
    headline: 'Coach Hire Letchworth Garden City: North Herts Group Travel',
    intro:
      'The world\'s first Garden City deserves transport with the same attention to detail — pristine unbranded vehicles, vetted local drivers, and the owners on the end of the phone.',
    localAngle:
      'Letchworth\'s schools and colleges keep a steady rhythm of trips and fixtures with us, while the Garden City\'s employers book staff movement and conference transfers through the year. Community organisations — a Letchworth strength — trust us with their annual outings, and families use the 20-minute Luton run for holiday departures. With Hitchin, Baldock and Stevenage all minutes away, multi-town pickups are easy to arrange.',
    popularJourneys: [
      'Letchworth to Luton and Stansted transfers',
      'School and college trips and fixtures',
      'Community group and society outings',
      'Corporate and conference transfers',
      'London and Cambridge day trips',
    ],
    faqs: [
      {
        q: 'Can you collect from several towns for one trip?',
        a: 'Yes — a Letchworth, Hitchin and Baldock multi-pickup for one outing is a routine request and we will sequence it sensibly at quote stage.',
      },
      {
        q: 'Are your drivers DBS checked for school work?',
        a: 'Every driver we deploy is enhanced-DBS vetted, and we are experienced with school trip paperwork and risk-assessment requirements.',
      },
      {
        q: 'Do you do weekend and evening work?',
        a: 'Seven days a week, with out-of-hours cover on 07833 226 623 — late returns and early departures are normal for us.',
      },
    ],
    nearby: [
      { label: 'Hitchin', slug: 'hitchin' },
      { label: 'Stevenage', slug: 'stevenage' },
      { label: 'Bedford', slug: 'bedford' },
      { label: 'Welwyn Garden City', slug: 'welwyn-garden-city' },
    ],
  },
  {
    slug: 'milton-keynes',
    name: 'Milton Keynes',
    county: 'Buckinghamshire',
    metaDescription:
      'Coach hire Milton Keynes — executive coaches and minibuses for corporate events, stadium fixtures, staff shuttles, weddings and airport transfers.',
    headline: 'Coach Hire Milton Keynes: Corporate-Grade Group Travel',
    intro:
      'MK moves at business speed, and so do we: conference transfers, stadium event shuttles, staff transport and airport runs — all with unbranded executive vehicles and direct owner accountability.',
    localAngle:
      'Milton Keynes generates the most corporate work on our patch: conference and exhibition transfers around Central MK, delegate movement for the city\'s hotels, and staff shuttles for the logistics and tech employers spread across the grid. Stadium MK events and arena concerts need disciplined multi-vehicle shuttles, which is exactly the kind of operation our family team enjoys running. Luton is 25 minutes for flights; Heathrow about 50 via the M1.',
    popularJourneys: [
      'Conference and exhibition delegate transfers',
      'Stadium MK and arena event shuttles',
      'Staff shuttles across the MK grid',
      'Milton Keynes to Luton and Heathrow transfers',
      'Christmas party and social evenings',
    ],
    faqs: [
      {
        q: 'Can you manage transport for a multi-day MK conference?',
        a: 'Yes — we run timed delegate shuttles between hotels and venues with a dedicated coordinator, scaling from one minibus to a synchronised multi-coach operation.',
      },
      {
        q: 'Do you offer corporate accounts for MK businesses?',
        a: 'We do — monthly invoicing, agreed rates and a direct line to the management team. See our Corporate Accounts page or call to set one up.',
      },
      {
        q: 'Can you handle event-day traffic around Stadium MK?',
        a: 'Our drivers plan around event traffic orders and drop-off zones in advance — we brief every job with exact routing rather than leaving it to chance.',
      },
    ],
    nearby: [
      { label: 'Bedford', slug: 'bedford' },
      { label: 'Leighton Buzzard', slug: 'leighton-buzzard' },
      { label: 'Northampton', slug: 'northampton' },
      { label: 'Aylesbury', slug: 'aylesbury' },
    ],
  },
  {
    slug: 'northampton',
    name: 'Northampton',
    county: 'Northamptonshire',
    metaDescription:
      'Coach and minibus hire in Northampton. Sports travel, school trips, corporate shuttles, weddings and airport transfers from a family-run executive fleet.',
    headline: 'Coach Hire Northampton: Group Travel Along the M1 Corridor',
    intro:
      'Northampton\'s clubs, schools and businesses get big-fleet capability with small-firm care: one family, pristine unbranded vehicles, and honest M1-corridor pricing.',
    localAngle:
      'Northampton anchors the northern end of our coverage, and the work here leans sporting and corporate: club and supporter travel for the town\'s rugby, football and cricket calendars, staff shuttles for the distribution parks along the M1, and school trips throughout the county. Luton and Heathrow airport runs are well-practised routes, and we regularly bring Northampton groups into London for shows and events with a door-to-door return that beats the trains comfortably.',
    popularJourneys: [
      'Sports club and supporter travel',
      'Staff shuttles for M1-corridor distribution parks',
      'School trips across Northamptonshire',
      'Northampton to Luton and Heathrow transfers',
      'London theatre and event evenings',
    ],
    faqs: [
      {
        q: 'Do you take supporters to away fixtures from Northampton?',
        a: 'Yes — supporter and club travel is regular work, run within the ground rules: no alcohol on board for sporting events, as the law requires, and experienced drivers who know the away-ground drill.',
      },
      {
        q: 'Can you serve our warehouse shift patterns?',
        a: 'We build shuttle timetables around shifts — including nights and weekends — with fixed pricing and consistent drivers.',
      },
      {
        q: 'How far will you take a Northampton group?',
        a: 'Anywhere in the UK — day trips, tours and one-way relocations included. Distance work is priced clearly with driver-hours rules built into the plan.',
      },
    ],
    nearby: [
      { label: 'Milton Keynes', slug: 'milton-keynes' },
      { label: 'Bedford', slug: 'bedford' },
      { label: 'Leighton Buzzard', slug: 'leighton-buzzard' },
      { label: 'Luton hub', locationPage: '/locations/luton' },
    ],
  },
  {
    slug: 'potters-bar',
    name: 'Potters Bar',
    county: 'Hertfordshire',
    metaDescription:
      'Minibus and coach hire in Potters Bar. Local family-run fleet for schools, clubs, weddings, community outings and airport transfers.',
    headline: 'Coach Hire Potters Bar: Your Local Family Fleet',
    intro:
      'Potters Bar is five minutes from our depot — which means first-call availability, local drivers and the kind of service you only get when the owners live up the road.',
    localAngle:
      'No town gets faster cover from us than Potters Bar: our London Colney base is one junction up the M25. Schools here use us for fixtures and trips, community groups for their outings, and families for airport departures — Luton in 20 minutes, Heathrow in 35 via the M25 when it behaves. Because the vehicles pass through daily, short-notice bookings that other operators refuse are often perfectly possible for us.',
    popularJourneys: [
      'Potters Bar to Luton and Heathrow transfers',
      'School trips and sports fixtures',
      'Community and church group outings',
      'Wedding and celebration shuttles',
      'London theatre evenings',
    ],
    faqs: [
      {
        q: 'How quickly can you cover a short-notice Potters Bar booking?',
        a: 'Being one M25 junction away, we can sometimes cover same-day requests that others cannot — always worth a call on 0845 8333 456.',
      },
      {
        q: 'Do you cover Cuffley and Brookmans Park?',
        a: 'Yes — Cuffley, Brookmans Park, Northaw and South Mimms are all home ground.',
      },
      {
        q: 'What size vehicle do most Potters Bar groups take?',
        a: 'The 16-seat executive minibus is the local favourite for airport runs and evenings out, with midi and full coaches available when the group grows.',
      },
    ],
    nearby: [
      { label: 'St Albans base', locationPage: '/locations/st-albans' },
      { label: 'Barnet', slug: 'barnet' },
      { label: 'Enfield', slug: 'enfield' },
      { label: 'Welwyn Garden City', slug: 'welwyn-garden-city' },
    ],
  },
  {
    slug: 'romford',
    name: 'Romford',
    county: 'East London / Essex',
    metaDescription:
      'Coach and minibus hire in Romford and Havering. Schools, sports clubs, weddings, corporate shuttles and Stansted or City airport transfers.',
    headline: 'Coach Hire Romford: Group Travel for Havering',
    intro:
      'Romford groups — from Havering schools to wedding parties and West End theatre nights — travel with a family firm that quotes straight and drives straighter.',
    localAngle:
      'Romford and the wider Havering borough sit at the eastern edge of our patch, connected by the A12 and M25. Schools and colleges here book fixtures and trips with us through term, sports clubs travel at weekends, and the town\'s wedding and party scene keeps our unbranded minibuses busy on Saturdays. For flyers, Stansted is 30 minutes up the M11, City airport half an hour in, and Southend an easy A127 run — we will always recommend the sanest option for your flight times.',
    popularJourneys: [
      'Romford to Stansted, City and Southend transfers',
      'School and college trips across Havering',
      'Sports club away travel',
      'Wedding and party guest shuttles',
      'West End theatre evenings',
    ],
    faqs: [
      {
        q: 'Do you cover the whole of Havering?',
        a: 'Yes — Hornchurch, Upminster, Collier Row, Gidea Park and the surrounding areas are all regular pickups.',
      },
      {
        q: 'Can you do a late Saturday night return from central London?',
        a: 'Late returns are standard for us — the vehicle waits for your group, and our out-of-hours line stays answered.',
      },
      {
        q: 'Which airport is best from Romford?',
        a: 'Usually Stansted via the M11, with City excellent for business flights — we will advise per booking rather than defaulting.',
      },
    ],
    nearby: [
      { label: 'Enfield', slug: 'enfield' },
      { label: 'Harlow', slug: 'harlow' },
      { label: 'Barnet', slug: 'barnet' },
      { label: 'Greater London coverage', locationPage: '/locations/greater-london' },
    ],
  },
  {
    slug: 'stevenage',
    name: 'Stevenage',
    county: 'Hertfordshire',
    metaDescription:
      'Coach hire Stevenage — minibuses and coaches for schools, aerospace and tech employers, sports clubs, weddings and airport transfers.',
    headline: 'Coach Hire Stevenage: Group Travel for the New Town',
    intro:
      'From school fixture runs to shuttles for Stevenage\'s big employers, our family fleet gives the town dependable, owner-accountable group travel at honest rates.',
    localAngle:
      'Stevenage\'s employer base — aerospace, pharma and tech along Gunnels Wood Road — generates steady corporate shuttle and conference work for us, alongside the constant rhythm of school trips and fixtures from the town\'s secondaries. Weekend sport travels with us across the region, and Knebworth\'s big concert weekends bring multi-vehicle shuttle operations right to our doorstep. Luton is 20 minutes for flights; Stansted about 35 via the A602 and A120.',
    popularJourneys: [
      'Staff shuttles for Gunnels Wood Road employers',
      'School trips and fixtures across Hertfordshire',
      'Knebworth event and concert shuttles',
      'Stevenage to Luton and Stansted transfers',
      'London theatre and event evenings',
    ],
    faqs: [
      {
        q: 'Can you run shift-pattern shuttles for Stevenage employers?',
        a: 'Yes — recurring shuttles matched to shift patterns with fixed pricing are one of our core corporate services.',
      },
      {
        q: 'Do you handle Knebworth event days?',
        a: 'Multi-vehicle event shuttles are our kind of operation — planned routes, timed loops and drivers briefed on the event traffic plan.',
      },
      {
        q: 'How do I get a quote for a Stevenage pickup?',
        a: 'Use the Smart Quote form or call 0845 8333 456 — you will be dealing directly with the owners.',
      },
    ],
    nearby: [
      { label: 'Hitchin', slug: 'hitchin' },
      { label: 'Letchworth', slug: 'letchworth' },
      { label: 'Welwyn Garden City', slug: 'welwyn-garden-city' },
      { label: 'Harlow', slug: 'harlow' },
    ],
  },
  {
    slug: 'welwyn-garden-city',
    name: 'Welwyn Garden City',
    county: 'Hertfordshire',
    metaDescription:
      'Coach and minibus hire in Welwyn Garden City. Corporate shuttles, school trips, weddings and airport transfers for WGC and mid-Hertfordshire.',
    headline: 'Coach Hire Welwyn Garden City: Mid-Herts Group Travel',
    intro:
      'WGC\'s employers, schools and families use our unbranded executive fleet for the same reason since day one: direct owner service, minutes from our St Albans base.',
    localAngle:
      'Welwyn Garden City pairs a strong employer base — retail head offices and pharma along the Mundells corridor — with busy schools and an active social calendar, and we serve all of it from 15 minutes away. Corporate shuttles and conference transfers run weekly; school fixtures and trips fill term time; and weekends bring wedding shuttles for mid-Herts venues from Brocket Hall\'s neighbourhood to Tewin\'s barns. Luton is 20 minutes for departures, and London evenings return door to door.',
    popularJourneys: [
      'Corporate shuttles and conference transfers',
      'School trips and fixtures',
      'Wedding guest shuttles for mid-Herts venues',
      'WGC to Luton and Heathrow transfers',
      'London theatre and shopping evenings',
    ],
    faqs: [
      {
        q: 'Do you serve both Welwyn Garden City and old Welwyn?',
        a: 'Yes — WGC, old Welwyn, Digswell and the villages between are all core coverage for us.',
      },
      {
        q: 'Can you provide transport for a WGC head-office event?',
        a: 'Corporate event movement — delegates, staff parties, client hospitality — is one of our strongest suits, with unbranded vehicles and a dedicated coordinator.',
      },
      {
        q: 'Are you really local?',
        a: 'Our base is London Colney, St Albans — about 15 minutes away — and WGC vehicles are on our roads daily.',
      },
    ],
    nearby: [
      { label: 'St Albans base', locationPage: '/locations/st-albans' },
      { label: 'Harpenden', slug: 'harpenden' },
      { label: 'Stevenage', slug: 'stevenage' },
      { label: 'Potters Bar', slug: 'potters-bar' },
    ],
  },
  {
    slug: 'woburn',
    name: 'Woburn',
    county: 'Bedfordshire',
    metaDescription:
      'Coach and minibus hire for Woburn, Woburn Sands and the Abbey estate area. Weddings, golf days, safari park group trips and executive transfers.',
    headline: 'Coach Hire Woburn: Estate-Grade Group Travel',
    intro:
      'Woburn\'s venues expect polish. Our unbranded executive fleet delivers wedding shuttles, golf days and group visits to the estate with the discretion the setting deserves.',
    localAngle:
      'Woburn is a destination patch for us as much as a pickup point: we bring wedding parties, golf societies and corporate groups to the Abbey estate\'s venues year-round, and take Woburn-area residents out to airports and London in return. Group days to the Safari Park are a family-season staple, and the village\'s hotels use us for guest movement during big weekends. Luton airport is 25 minutes; Milton Keynes 15 for arena events and mainline trains.',
    popularJourneys: [
      'Wedding and event shuttles for Woburn estate venues',
      'Golf society days at Woburn',
      'Safari park group visits',
      'Woburn to Luton and Heathrow transfers',
      'Milton Keynes arena and station runs',
    ],
    faqs: [
      {
        q: 'Can you shuttle wedding guests to Woburn venues from nearby hotels?',
        a: 'Yes — timed loops between Milton Keynes or Flitwick hotels and the estate are a well-practised operation for us, with unbranded vehicles that suit the setting.',
      },
      {
        q: 'Do you carry golf clubs and equipment?',
        a: 'Our vehicles have dedicated luggage capacity — golf bags for a full society day are no problem; just tell us numbers at quote stage.',
      },
      {
        q: 'Can a group book you for a Safari Park day out?',
        a: 'Absolutely — schools, families and social clubs book us for Safari Park days regularly; we drop at the gates and collect on your schedule.',
      },
    ],
    nearby: [
      { label: 'Milton Keynes', slug: 'milton-keynes' },
      { label: 'Leighton Buzzard', slug: 'leighton-buzzard' },
      { label: 'Bedford', slug: 'bedford' },
      { label: 'Luton hub', locationPage: '/locations/luton' },
    ],
  },
];

export function getTownBySlug(slug: string): Town | undefined {
  return TOWNS.find((t) => t.slug === slug);
}
