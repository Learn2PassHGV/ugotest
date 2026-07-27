/**
 * Upcoming events UGO can service with group transport.
 * Shown in the UpcomingEvents carousel on event-relevant pages.
 * Dates: label is what visitors see; iso is used to prefill the quote form.
 * Keep this list fresh: drop past events, add new confirmed ones monthly.
 */

export interface UgoEvent {
  id: string;
  name: string;
  venue: string;
  destination: string; // what gets prefilled as the quote destination
  dateLabel: string;
  iso: string; // representative date for the form prefill
  kind: 'music' | 'sport' | 'racing' | 'festive';
  blurb: string;
  pax: string;
}

export const UPCOMING_EVENTS: UgoEvent[] = [
  {
    id: 'weeknd-wembley',
    name: 'The Weeknd',
    venue: 'Wembley Stadium',
    destination: 'Wembley Stadium, London',
    dateLabel: '14 to 19 August 2026',
    iso: '2026-08-14',
    kind: 'music',
    blurb: 'Five stadium nights. Skip the tube crush, arrive and leave together in one vehicle.',
    pax: '16',
  },
  {
    id: 'aew-wembley',
    name: 'AEW All In: London',
    venue: 'Wembley Stadium',
    destination: 'Wembley Stadium, London',
    dateLabel: '30 August 2026',
    iso: '2026-08-30',
    kind: 'sport',
    blurb: 'Wrestling fans travel in packs. Door to door beats three train changes with the crowd.',
    pax: '16',
  },
  {
    id: 'bonjovi-wembley',
    name: 'Bon Jovi',
    venue: 'Wembley Stadium',
    destination: 'Wembley Stadium, London',
    dateLabel: '4, 6 & 9 September 2026',
    iso: '2026-09-04',
    kind: 'music',
    blurb: 'Three nights at Wembley. Group returns to Herts and Beds after the encore, no last-train panic.',
    pax: '16',
  },
  {
    id: 'diljit-wembley',
    name: 'Diljit Dosanjh',
    venue: 'Wembley Stadium',
    destination: 'Wembley Stadium, London',
    dateLabel: '12 September 2026',
    iso: '2026-09-12',
    kind: 'music',
    blurb: 'One huge night. Family and friends together from your door to the stadium and back.',
    pax: '24',
  },
  {
    id: 'eng-spain',
    name: 'England v Spain',
    venue: 'Wembley Stadium',
    destination: 'Wembley Stadium, London',
    dateLabel: '26 September 2026',
    iso: '2026-09-26',
    kind: 'sport',
    blurb: 'International matchday. Supporters clubs and workmates, one pickup, straight to the ground.',
    pax: '33',
  },
  {
    id: 'nfl-jaguars',
    name: 'NFL London: Jacksonville Jaguars',
    venue: 'Wembley Stadium',
    destination: 'Wembley Stadium, London',
    dateLabel: '18 October 2026',
    iso: '2026-10-18',
    kind: 'sport',
    blurb: 'Gameday the American way: tailgate with your group, let someone else do the driving.',
    pax: '16',
  },
  {
    id: 'autumn-internationals',
    name: 'Autumn Rugby Internationals',
    venue: 'Allianz Stadium, Twickenham',
    destination: 'Allianz Stadium, Twickenham',
    dateLabel: 'November 2026',
    iso: '2026-11-07',
    kind: 'sport',
    blurb: 'England home tests. Rugby clubs and corporate groups, pitch-side by kick-off.',
    pax: '49',
  },
  {
    id: 'winter-wonderland',
    name: 'Winter Wonderland & Christmas Lights',
    venue: 'Hyde Park, London',
    destination: 'Hyde Park Winter Wonderland, London',
    dateLabel: 'November 2026 to January 2027',
    iso: '2026-12-05',
    kind: 'festive',
    blurb: 'Office parties and family evenings. Mulled wine for everyone, because nobody is driving.',
    pax: '24',
  },
];
