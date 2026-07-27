import React from 'react';
import { ArrowRight, Luggage, PlaneTakeoff, Radar, Users } from 'lucide-react';

/**
 * AirportGuide: airport transfers presented as a premium departures board.
 * Typical drive times from the local patch, what every run includes, and a
 * one-tap quote per airport that prefills the Smart Quote form.
 */

interface Airport {
  code: string;
  name: string;
  dest: string;
  times: Array<{ from: string; mins: string }>;
  note: string;
}

const AIRPORTS: Airport[] = [
  {
    code: 'LTN',
    name: 'London Luton',
    dest: 'Luton Airport (LTN)',
    times: [
      { from: 'St Albans', mins: '20-30' },
      { from: 'Harpenden', mins: '15-20' },
      { from: 'Hemel Hempstead', mins: '20-30' },
    ],
    note: 'Our closest airport. Early flights are easy: we collect at any hour, and the out-of-hours line is a family member, not a machine.',
  },
  {
    code: 'LHR',
    name: 'London Heathrow',
    dest: 'Heathrow Airport (LHR)',
    times: [
      { from: 'St Albans', mins: '40-60' },
      { from: 'Watford', mins: '30-45' },
      { from: 'Luton', mins: '50-70' },
    ],
    note: 'All five terminals covered. We drop as close as each terminal allows, help with luggage, and track your return flight so the vehicle is waiting even when you are late.',
  },
  {
    code: 'STN',
    name: 'London Stansted',
    dest: 'Stansted Airport (STN)',
    times: [
      { from: 'St Albans', mins: '45-60' },
      { from: 'Welwyn Garden City', mins: '35-50' },
      { from: 'Harlow', mins: '20-30' },
    ],
    note: 'The early-hours specialist run. One pickup point for the whole group beats six separate taxis meeting at departures.',
  },
  {
    code: 'LGW',
    name: 'London Gatwick',
    dest: 'Gatwick Airport (LGW)',
    times: [
      { from: 'St Albans', mins: '70-90' },
      { from: 'Watford', mins: '60-80' },
      { from: 'Luton', mins: '75-95' },
    ],
    note: 'North and South terminals, both covered. For the long run round the M25, one comfortable coach with everyone aboard beats a convoy every time.',
  },
];

const INCLUDED = [
  { icon: Luggage, text: 'Luggage help at both ends' },
  { icon: Radar, text: 'Return flight tracked, driver waiting' },
  { icon: Users, text: 'One pickup, one meeting point home' },
];

export function AirportGuide() {
  const book = (dest: string) => {
    window.dispatchEvent(
      new CustomEvent('ugo-book-event', {
        detail: { destination: dest, journeyType: 'Airport Transfer', passengers: '16' },
      })
    );
  };

  return (
    <section className="bg-[#050C1A] py-20 md:py-28 relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[700px] h-[300px] bg-amber-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="font-mono text-[9px] font-extrabold text-amber-500 uppercase tracking-[0.3em] block mb-3">
            DEPARTURES · DOOR TO DOOR
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight">Your airport, from your door</h2>
          <p className="font-sans text-slate-400 text-sm md:text-base mt-3 max-w-2xl mx-auto font-light">
            Typical drive times from our patch, off-peak and traffic dependent. Real departures are planned around your
            check-in, with buffer built in.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {AIRPORTS.map((a) => (
            <div
              key={a.code}
              className="bg-white/[0.04] border border-white/10 hover:border-amber-500/40 rounded-2xl p-6 md:p-7 flex flex-col transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute -top-8 -right-6 font-mono text-[110px] leading-none font-black text-white/[0.03] select-none pointer-events-none group-hover:text-amber-500/[0.05] transition-colors duration-500">
                {a.code}
              </div>

              <div className="flex items-center gap-4 mb-5 relative">
                <div className="w-14 h-12 rounded-lg bg-[#02060F] border border-amber-500/25 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.08)]">
                  <span className="font-mono text-base font-black tracking-[0.08em] text-amber-400">{a.code}</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-white leading-none mb-1">{a.name}</h3>
                  <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-slate-500">
                    <PlaneTakeoff className="w-3 h-3 text-amber-500" /> All terminals served
                  </span>
                </div>
              </div>

              {/* Departures-board rows */}
              <div className="bg-black/30 border border-white/5 rounded-xl px-4 py-3 mb-4 relative">
                {a.times.map((t) => (
                  <div key={t.from} className="flex items-baseline gap-3 py-1.5 font-mono text-[11px] tracking-[0.08em] uppercase">
                    <span className="text-slate-300 shrink-0">{t.from}</span>
                    <span className="flex-1 border-b border-dotted border-slate-700 relative -top-0.5" />
                    <span className="text-amber-400 font-bold shrink-0">{t.mins} MIN</span>
                  </div>
                ))}
              </div>

              <p className="font-sans text-xs text-slate-400 leading-relaxed font-light flex-1 relative">{a.note}</p>

              <button
                onClick={() => book(a.dest)}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-amber-500/10 hover:bg-amber-500 border border-amber-500/40 text-amber-400 hover:text-slate-950 font-sans text-[10px] uppercase tracking-[0.2em] font-extrabold py-3.5 rounded-xl transition-all duration-300 cursor-pointer relative"
              >
                Quote a {a.code} run <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 grid sm:grid-cols-3 gap-3">
          {INCLUDED.map((i) => (
            <div key={i.text} className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 flex items-center gap-3">
              <i.icon className="w-4.5 h-4.5 text-amber-500 shrink-0" />
              <span className="font-sans text-xs text-slate-300 font-light">{i.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
