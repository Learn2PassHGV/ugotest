import React from 'react';
import { ArrowRight, PlaneTakeoff, Clock, Luggage, CheckCircle2 } from 'lucide-react';

/**
 * AirportGuide: practical, concrete airport transfer information in the same
 * "genuinely useful" style as the events carousel. Each card feeds the Smart
 * Quote form prefilled with that airport as the destination.
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
      { from: 'St Albans', mins: '20 to 30 min' },
      { from: 'Harpenden', mins: '15 to 20 min' },
      { from: 'Hemel Hempstead', mins: '20 to 30 min' },
    ],
    note: 'Our closest airport. Early flights are easy: we collect at any hour, and the out-of-hours line is a family member, not a machine.',
  },
  {
    code: 'LHR',
    name: 'London Heathrow',
    dest: 'Heathrow Airport (LHR)',
    times: [
      { from: 'St Albans', mins: '40 to 60 min' },
      { from: 'Watford', mins: '30 to 45 min' },
      { from: 'Luton', mins: '50 to 70 min' },
    ],
    note: 'All five terminals covered. We drop as close as each terminal allows, help with luggage, and track your return flight so the vehicle is waiting even when you are late.',
  },
  {
    code: 'STN',
    name: 'London Stansted',
    dest: 'Stansted Airport (STN)',
    times: [
      { from: 'St Albans', mins: '45 to 60 min' },
      { from: 'Welwyn Garden City', mins: '35 to 50 min' },
      { from: 'Harlow', mins: '20 to 30 min' },
    ],
    note: 'The early-hours specialist run. One pickup point for the whole group beats six separate taxis meeting at departures.',
  },
  {
    code: 'LGW',
    name: 'London Gatwick',
    dest: 'Gatwick Airport (LGW)',
    times: [
      { from: 'St Albans', mins: '70 to 90 min' },
      { from: 'Watford', mins: '60 to 80 min' },
      { from: 'Luton', mins: '75 to 95 min' },
    ],
    note: 'North and South terminals, both covered. For the long run round the M25 a comfortable coach with everyone aboard beats a convoy every time.',
  },
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
    <section className="bg-stone-50 py-20 md:py-28 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <span className="font-mono text-[9px] font-extrabold text-amber-600 uppercase tracking-[0.3em] block mb-3">
            THE PRACTICAL BIT
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-950 leading-tight">Your airport, door to door</h2>
          <p className="font-sans text-slate-500 text-sm md:text-base mt-3 max-w-2xl mx-auto font-light">
            Typical journey times from our patch, and how the run actually works. Times are off-peak and traffic dependent; we plan real departures around your check-in, with buffer built in.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {AIRPORTS.map((a) => (
            <div key={a.code} className="bg-white border border-stone-200 rounded-2xl p-7 flex flex-col hover:border-amber-400/60 transition-colors duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#0A1428] flex items-center justify-center">
                    <PlaneTakeoff className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-slate-950 leading-none">{a.name}</h3>
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-400">{a.code}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1.5 mb-4">
                {a.times.map((t) => (
                  <div key={t.from} className="flex items-center justify-between text-sm border-b border-stone-100 pb-1.5">
                    <span className="font-sans text-slate-600">{t.from}</span>
                    <span className="font-sans font-semibold text-slate-950 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500" /> {t.mins}
                    </span>
                  </div>
                ))}
              </div>
              <p className="font-sans text-xs text-slate-500 leading-relaxed font-light flex-1">{a.note}</p>
              <button
                onClick={() => book(a.dest)}
                className="mt-5 inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-amber-500 border border-stone-200 hover:border-amber-500 text-slate-950 font-sans text-[10px] uppercase tracking-[0.2em] font-extrabold py-3.5 rounded-xl transition-all duration-300 cursor-pointer"
              >
                Quote a {a.code} run <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white border border-stone-200 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
          <Luggage className="w-6 h-6 text-amber-600 shrink-0" />
          <p className="font-sans text-sm text-slate-600 font-light leading-relaxed">
            <strong className="font-semibold text-slate-950">Every airport run includes:</strong> luggage help, a named driver, return flight tracking, and one agreed meeting point for the way home. Group of golfers, stag do, family holiday or a crew flying out for work: one vehicle, nobody left refreshing a taxi app at arrivals.
          </p>
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 hidden md:block" />
        </div>
      </div>
    </section>
  );
}
