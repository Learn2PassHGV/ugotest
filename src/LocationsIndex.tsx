import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { TOWNS } from './data/towns';

interface LocationsIndexProps {
  onNavigate?: (page: string) => void;
}

const REGIONS = [
  { label: 'Greater London Coverage', page: 'greater-london', path: '/locations/greater-london' },
  { label: 'The Home Counties Network', page: 'home-counties', path: '/locations/home-counties' },
  { label: 'UK Airport Hub Connections', page: 'airport-hubs', path: '/locations/airport-hubs' },
  { label: 'Nationwide Film & Events', page: 'film-and-events', path: '/locations/film-and-events' },
];

const BASES = [
  { label: 'St Albans — Operations Base', page: 'st-albans', path: '/locations/st-albans' },
  { label: 'Watford & Elstree Hub', page: 'watford', path: '/locations/watford' },
  { label: 'Hemel Hempstead Core', page: 'hemel', path: '/locations/hemel-hempstead' },
  { label: 'Luton & Regional Access', page: 'luton', path: '/locations/luton' },
];

/** Index of every area page — regions, operational bases, and town pages. */
export function LocationsIndex({ onNavigate }: LocationsIndexProps) {
  return (
    <div className="bg-stone-50 min-h-screen font-sans">
      <section className="bg-stone-50 pt-32 pb-16 md:pt-40 border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-tight mb-6">
            Areas We Cover
          </h1>
          <p className="font-sans text-slate-600 font-light text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Based in St Albans, our family-run fleet serves Hertfordshire, London and the Home Counties
            daily — and travels nationwide for tours, events and productions.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-6xl mx-auto px-6 lg:px-12">
        <h2 className="font-serif text-2xl text-slate-900 mb-6">Regional networks</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {REGIONS.map((r) => (
            <a
              key={r.page}
              href={r.path}
              onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(r.page); }}
              className="group bg-white border border-stone-200 hover:border-amber-500/50 rounded-xl p-6 flex items-center justify-between transition-colors shadow-sm"
            >
              <span className="font-serif text-lg text-slate-900">{r.label}</span>
              <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
            </a>
          ))}
        </div>

        <h2 className="font-serif text-2xl text-slate-900 mb-6">Operational bases</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {BASES.map((b) => (
            <a
              key={b.page}
              href={b.path}
              onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(b.page); }}
              className="group bg-white border border-stone-200 hover:border-amber-500/50 rounded-xl p-6 flex items-center justify-between transition-colors shadow-sm"
            >
              <span className="font-serif text-lg text-slate-900">{b.label}</span>
              <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
            </a>
          ))}
        </div>

        <h2 className="font-serif text-2xl text-slate-900 mb-2">Towns we serve</h2>
        <p className="font-sans text-sm text-slate-600 font-light mb-6 max-w-2xl">
          Dedicated local pages for the towns our vehicles cover every week — each with local journey
          ideas, honest answers and a direct line to the family team.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {TOWNS.map((t) => (
            <a
              key={t.slug}
              href={`/coach-hire-${t.slug}`}
              onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(`town-${t.slug}`); }}
              className="group bg-white border border-stone-200 hover:border-amber-500/50 rounded-lg px-4 py-3 flex items-center gap-2 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="font-sans text-sm text-slate-800 group-hover:text-slate-950">{t.name}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
