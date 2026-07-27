import React from 'react';
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { UPCOMING_EVENTS } from '../data/events';

const KIND_LABEL: Record<string, string> = {
  music: 'STADIUM SHOW',
  sport: 'MATCHDAY',
  racing: 'RACEDAY',
  festive: 'SEASONAL',
};

/**
 * Horizontal carousel of real upcoming events UGO can service.
 * Clicking a card fires `ugo-book-event`, which the app shell listens for:
 * it navigates home, scrolls to the Smart Quote form and prefills it
 * with the event destination, date and a sensible group size.
 */
export function UpcomingEvents() {
  const book = (destination: string, iso: string, pax: string) => {
    window.dispatchEvent(
      new CustomEvent('ugo-book-event', {
        detail: {
          destination,
          date: iso,
          passengers: pax,
          journeyType: 'Sports/Music Event',
        },
      })
    );
  };

  return (
    <section className="bg-[#050C1A] py-20 md:py-28 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-[9px] font-extrabold text-amber-500 uppercase tracking-[0.3em] block mb-3">
              GROUP TRANSPORT, SORTED
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight">
              Big days coming up
            </h2>
            <p className="font-sans text-slate-400 text-sm md:text-base mt-3 max-w-xl font-light">
              Real events on real dates that we already run groups to. Tap one and the quote form fills itself in.
            </p>
          </div>
          <p className="font-sans text-[11px] text-slate-500 md:text-right shrink-0">
            Going somewhere not listed?<br className="hidden md:block" /> Quote it anyway, we go where you go.
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [-webkit-overflow-scrolling:touch] [scrollbar-width:thin] [scrollbar-color:rgba(245,158,11,0.3)_transparent]">
          {UPCOMING_EVENTS.map((ev) => (
            <div
              key={ev.id}
              className="snap-start shrink-0 w-[270px] md:w-[300px] bg-white/[0.04] border border-white/10 hover:border-amber-500/40 rounded-2xl p-6 flex flex-col transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[8px] font-extrabold text-amber-500 uppercase tracking-[0.25em]">
                  {KIND_LABEL[ev.kind] || 'EVENT'}
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-300 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                  <CalendarDays className="w-3 h-3 text-amber-500" />
                  {ev.dateLabel}
                </span>
              </div>
              <h3 className="font-serif text-xl text-white leading-snug mb-1">{ev.name}</h3>
              <p className="flex items-center gap-1.5 text-[11px] text-slate-400 font-sans mb-3">
                <MapPin className="w-3 h-3 text-amber-500 shrink-0" /> {ev.venue}
              </p>
              <p className="font-sans text-xs text-slate-400 leading-relaxed font-light flex-1">{ev.blurb}</p>
              <button
                onClick={() => book(ev.destination, ev.iso, ev.pax)}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-amber-500/10 hover:bg-amber-500 border border-amber-500/40 text-amber-400 hover:text-slate-950 font-sans text-[10px] uppercase tracking-[0.2em] font-extrabold py-3 rounded-xl transition-all duration-300 cursor-pointer"
              >
                Get group transport
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
