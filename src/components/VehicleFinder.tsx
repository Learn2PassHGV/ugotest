import React, { useMemo, useState } from 'react';
import { ArrowRight, Users, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { FleetImage } from './FleetImage';

/**
 * VehicleFinder: "Which vehicle fits your group?"
 * Group size + occasion in, recommended vehicle out, with honest per-person
 * arithmetic (a divider on an adjustable example figure, never a promised
 * price) and a one-tap jump into the prefilled Smart Quote form.
 */

interface Vehicle {
  slot: string;
  name: string;
  seats: number;
  seatLabel: string;
  line: string;
  fallback?: string;
}

const VEHICLES: Vehicle[] = [
  {
    slot: 'fleet-minibus-16',
    name: 'Executive Minibus',
    seats: 16,
    seatLabel: 'Up to 16 seats',
    line: 'The workhorse for nights out, airport runs and small team travel. One driver, everyone together.',
    fallback: '/images/executive-minibus-for-16-passengers.webp',
  },
  {
    slot: 'fleet-midi-35',
    name: 'Luxury Midi Coach',
    seats: 35,
    seatLabel: 'Up to 35 seats',
    line: 'The sweet spot for weddings, school trips and bigger social groups. Coach comfort without the full-size footprint.',
    fallback: '/images/executive-midi-coach-35-passengers.webp',
  },
  {
    slot: 'fleet-coach-53',
    name: 'Executive Coach',
    seats: 53,
    seatLabel: 'Up to 53 seats',
    line: 'Full-size comfort for stadium days, corporate movements and whole-year school trips. Luggage swallowed whole.',
  },
  {
    slot: 'fleet-highcap-70',
    name: 'High-Capacity Coach',
    seats: 70,
    seatLabel: 'Up to 70 seats',
    line: 'When the whole company or the whole club travels at once. One vehicle, one arrival time, zero stragglers.',
  },
];

const OCCASIONS: Array<{ key: string; label: string; journeyType: string; dest: string }> = [
  { key: 'night', label: 'Night out / Event', journeyType: 'Sports/Music Event', dest: 'Central London' },
  { key: 'airport', label: 'Airport', journeyType: 'Airport Transfer', dest: 'Heathrow Terminal 5' },
  { key: 'wedding', label: 'Wedding', journeyType: 'Private Event', dest: 'Ceremony venue' },
  { key: 'school', label: 'School trip', journeyType: 'Private Event', dest: 'Trip destination' },
  { key: 'corporate', label: 'Corporate', journeyType: 'Corporate Logistics', dest: 'Head office or venue' },
  { key: 'daytrip', label: 'Day trip', journeyType: 'Private Event', dest: 'Day trip destination' },
];

const GROUP_CHIPS = [8, 12, 16, 24, 33, 49, 60, 70];

export function VehicleFinder() {
  const [group, setGroup] = useState(16);
  const [occasion, setOccasion] = useState(OCCASIONS[0]);
  const [example, setExample] = useState(450);

  const vehicle = useMemo(() => VEHICLES.find((v) => v.seats >= group) || VEHICLES[VEHICLES.length - 1], [group]);
  const spare = vehicle.seats - group;
  const perHead = (example / group).toFixed(2).replace(/\.00$/, '');

  const book = () => {
    window.dispatchEvent(
      new CustomEvent('ugo-book-event', {
        detail: { passengers: String(group), journeyType: occasion.journeyType, destination: occasion.dest },
      })
    );
  };

  return (
    <section className="bg-stone-100 py-20 md:py-28 border-y border-stone-200" id="vehicle-finder">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <span className="font-mono text-[9px] font-extrabold text-amber-600 uppercase tracking-[0.3em] block mb-3">
            TWO TAPS, NO WRONG ANSWERS
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-950 leading-tight">Which vehicle fits your group?</h2>
          <p className="font-sans text-slate-500 text-sm md:text-base mt-3 max-w-xl mx-auto font-light">
            Tell us how many and what for. We will show you what we would send, and what the maths per person looks like.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-stone-200 shadow-[0_25px_70px_rgba(15,23,42,0.08)] overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Controls */}
            <div className="p-8 md:p-10">
              <span className="block text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500 mb-2.5 font-mono">
                How many of you?
              </span>
              <div className="flex flex-wrap gap-1.5 mb-7">
                {GROUP_CHIPS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGroup(g)}
                    className={cn(
                      'px-3.5 py-2.5 rounded-xl text-sm font-bold border transition-all duration-200 cursor-pointer',
                      group === g
                        ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-sm'
                        : 'bg-white border-stone-200 text-slate-500 hover:border-amber-400 hover:text-slate-950'
                    )}
                  >
                    {g}
                  </button>
                ))}
              </div>

              <span className="block text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500 mb-2.5 font-mono">
                What is the occasion?
              </span>
              <div className="flex flex-wrap gap-1.5 mb-8">
                {OCCASIONS.map((o) => (
                  <button
                    key={o.key}
                    type="button"
                    onClick={() => setOccasion(o)}
                    className={cn(
                      'px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer',
                      occasion.key === o.key
                        ? 'bg-slate-950 border-slate-950 text-white shadow-sm'
                        : 'bg-white border-stone-200 text-slate-500 hover:border-slate-400 hover:text-slate-950'
                    )}
                  >
                    {o.label}
                  </button>
                ))}
              </div>

              {/* Per-head arithmetic: an adjustable example, never a promised price */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5">
                <div className="flex items-baseline justify-between gap-3 mb-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-[0.18em] text-slate-500 font-mono">
                    The per-person maths
                  </span>
                  <span className="font-serif text-lg text-slate-950">
                    £{perHead} <span className="font-sans text-[11px] text-slate-500">each</span>
                  </span>
                </div>
                <input
                  type="range"
                  min={250}
                  max={950}
                  step={25}
                  value={example}
                  onChange={(e) => setExample(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                  aria-label="Example total quote"
                />
                <p className="font-sans text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                  If the whole vehicle quoted at <strong className="text-slate-950">£{example}</strong>, that is{' '}
                  <strong className="text-slate-950">£{perHead} per person</strong> for {group} of you, door to door,
                  everyone together. Compare that with each person sorting trains, taxis and parking. Your real quote
                  comes from Alan and Sasha, personally.
                </p>
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-[#0A1428] p-8 md:p-10 flex flex-col">
              <span className="font-mono text-[9px] font-extrabold text-amber-500 uppercase tracking-[0.3em] block mb-4">
                WE WOULD SEND
              </span>
              <div className="rounded-2xl overflow-hidden border border-white/10 mb-5">
                <FleetImage slot={vehicle.slot} alt={`${vehicle.name}, ${vehicle.seatLabel}`} fallbackSrc={vehicle.fallback} ratio="16 / 9" />
              </div>
              <h3 className="font-serif text-2xl text-white mb-1">{vehicle.name}</h3>
              <p className="flex items-center gap-2 text-[11px] text-amber-400 font-bold uppercase tracking-wider mb-3">
                <Users className="w-3.5 h-3.5" /> {vehicle.seatLabel}
                {spare > 0 && <span className="text-slate-400 font-semibold normal-case tracking-normal">· {spare} spare for bags and mates</span>}
              </p>
              <p className="font-sans text-sm text-slate-400 font-light leading-relaxed flex-1">{vehicle.line}</p>
              <button
                onClick={book}
                className="mt-6 inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.18em] font-extrabold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-[1.01] shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                Price this for {group} people <ArrowRight className="w-4 h-4" />
              </button>
              <p className="mt-3 text-[10px] text-slate-500 font-sans flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Jumps to the quote form with your group size already filled in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
