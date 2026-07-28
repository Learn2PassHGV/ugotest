import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, MapPin, Music, Sparkles, Trophy, Users } from 'lucide-react';
import { UPCOMING_EVENTS } from '../data/events';
import { cn } from '../lib/utils';

const KIND_META: Record<string, { label: string; icon: React.ComponentType<{ className?: string }>; art: string }> = {
  music: {
    label: 'STADIUM SHOW',
    icon: Music,
    art: 'radial-gradient(ellipse at 20% 0%, rgba(168,85,247,0.35), transparent 60%), radial-gradient(ellipse at 90% 100%, rgba(245,158,11,0.28), transparent 55%), #0A1428',
  },
  sport: {
    label: 'MATCHDAY',
    icon: Trophy,
    art: 'radial-gradient(ellipse at 15% 0%, rgba(16,185,129,0.30), transparent 60%), radial-gradient(ellipse at 85% 100%, rgba(245,158,11,0.25), transparent 55%), #0A1428',
  },
  racing: {
    label: 'RACEDAY',
    icon: Trophy,
    art: 'radial-gradient(ellipse at 20% 0%, rgba(59,130,246,0.30), transparent 60%), radial-gradient(ellipse at 85% 100%, rgba(245,158,11,0.25), transparent 55%), #0A1428',
  },
  festive: {
    label: 'SEASONAL',
    icon: Sparkles,
    art: 'radial-gradient(ellipse at 20% 0%, rgba(239,68,68,0.30), transparent 60%), radial-gradient(ellipse at 85% 100%, rgba(245,158,11,0.30), transparent 55%), #0A1428',
  },
};

/**
 * Carousel of real upcoming events UGO can service, with arrows, edge fades
 * and scroll snapping. Clicking a card fires `ugo-book-event`: the app shell
 * navigates home, scrolls to the Smart Quote form and prefills destination,
 * date and a sensible group size.
 */
export function UpcomingEvents() {
  const railRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = () => {
    const el = railRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    updateArrows();
    const el = railRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, []);

  const nudge = (dir: number) => {
    railRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  const book = (destination: string, iso: string, pax: string) => {
    window.dispatchEvent(
      new CustomEvent('ugo-book-event', {
        detail: { destination, date: iso, passengers: pax, journeyType: 'Sports/Music Event' },
      })
    );
  };

  return (
    <section className="bg-[#050C1A] py-20 md:py-28 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-[9px] font-extrabold text-amber-500 uppercase tracking-[0.3em] block mb-3">
              GROUP TRANSPORT, SORTED
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight">Big days coming up</h2>
            <p className="font-sans text-slate-400 text-sm md:text-base mt-3 max-w-xl font-light">
              Real events, real dates. Tap one, the form fills itself.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button
              onClick={() => nudge(-1)}
              disabled={!canLeft}
              aria-label="Previous events"
              className={cn(
                'w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer',
                canLeft ? 'border-amber-500/50 text-amber-400 hover:bg-amber-500 hover:text-slate-950' : 'border-white/10 text-slate-600 cursor-default'
              )}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => nudge(1)}
              disabled={!canRight}
              aria-label="More events"
              className={cn(
                'w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer',
                canRight ? 'border-amber-500/50 text-amber-400 hover:bg-amber-500 hover:text-slate-950' : 'border-white/10 text-slate-600 cursor-default'
              )}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative">
          {/* Edge fades so it reads as a carousel with more to see */}
          {canLeft && <div className="hidden md:block absolute left-0 top-0 bottom-4 w-16 bg-gradient-to-r from-[#050C1A] to-transparent z-10 pointer-events-none" />}
          {canRight && <div className="hidden md:block absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-[#050C1A] to-transparent z-10 pointer-events-none" />}

          <div
            ref={railRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {UPCOMING_EVENTS.map((ev) => {
              const meta = KIND_META[ev.kind] || KIND_META.sport;
              const Icon = meta.icon;
              return (
                <div
                  key={ev.id}
                  className="snap-start shrink-0 w-[280px] md:w-[310px] bg-white/[0.04] border border-white/10 hover:border-amber-500/40 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 group"
                >
                  {/* Art header */}
                  <div className="h-24 relative flex items-end px-5 pb-3" style={{ background: meta.art }}>
                    <div className="absolute top-3.5 left-5 flex items-center gap-2">
                      <Icon className="w-4 h-4 text-amber-400" />
                      <span className="font-mono text-[8px] font-extrabold text-amber-400 uppercase tracking-[0.25em]">{meta.label}</span>
                    </div>
                    <span className="relative flex items-center gap-1.5 text-[10px] font-semibold text-white bg-black/40 backdrop-blur-sm border border-white/15 rounded-full px-3 py-1">
                      <CalendarDays className="w-3 h-3 text-amber-400" />
                      {ev.dateLabel}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-serif text-xl text-white leading-snug mb-1">{ev.name}</h3>
                    <p className="flex items-center gap-1.5 text-[11px] text-slate-400 font-sans mb-3">
                      <MapPin className="w-3 h-3 text-amber-500 shrink-0" /> {ev.venue}
                    </p>
                    <p className="font-sans text-xs text-slate-400 leading-relaxed font-light flex-1">{ev.blurb}</p>
                    <p className="flex items-center gap-1.5 font-sans text-[10px] text-slate-500 mt-3">
                      <Users className="w-3 h-3 text-amber-500/70" /> Groups of 8 to 70 · door to door, there and back
                    </p>
                    <button
                      onClick={() => book(ev.destination, ev.iso, ev.pax)}
                      className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-amber-500/10 hover:bg-amber-500 border border-amber-500/40 text-amber-400 hover:text-slate-950 font-sans text-[10px] uppercase tracking-[0.2em] font-extrabold py-3 rounded-xl transition-all duration-300 cursor-pointer"
                    >
                      Get group transport
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="font-sans text-[11px] text-slate-500">
            Going somewhere not listed? Quote it anyway, we go where you go.
          </p>
          <div className="flex md:hidden items-center gap-2">
            <button onClick={() => nudge(-1)} aria-label="Previous events" className="w-10 h-10 rounded-full border border-amber-500/40 text-amber-400 flex items-center justify-center active:bg-amber-500 active:text-slate-950 cursor-pointer">
              <ChevronLeft className="w-4.5 h-4.5" />
            </button>
            <button onClick={() => nudge(1)} aria-label="More events" className="w-10 h-10 rounded-full border border-amber-500/40 text-amber-400 flex items-center justify-center active:bg-amber-500 active:text-slate-950 cursor-pointer">
              <ChevronRight className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
