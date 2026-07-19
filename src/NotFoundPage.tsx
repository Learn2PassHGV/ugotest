import React from 'react';
import { Phone, Home, MapPin } from 'lucide-react';

/** 404 page — shown for any URL that doesn't match a route. */
export function NotFoundPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  return (
    <div className="bg-stone-50 min-h-[80vh] font-sans flex items-center">
      <div className="max-w-2xl mx-auto px-6 lg:px-12 text-center py-32">
        <span className="font-mono text-xs font-bold tracking-[0.3em] text-amber-600 uppercase block mb-6">
          404 — Page not found
        </span>
        <h1 className="font-serif text-4xl md:text-5xl text-slate-900 leading-tight mb-6">
          This road doesn't go anywhere.
        </h1>
        <p className="font-sans text-slate-600 font-light text-lg leading-relaxed mb-10">
          The page you are looking for has moved or never existed. Our drivers would re-route —
          here are the sensible turnings:
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('home'); }}
            className="bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs uppercase tracking-[0.15em] font-semibold py-4 px-8 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Back to the homepage
          </a>
          <a
            href="/locations"
            onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('locations-index'); }}
            className="border border-stone-300 hover:border-amber-500/60 text-slate-800 font-sans text-xs uppercase tracking-[0.15em] font-semibold py-4 px-8 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <MapPin className="w-4 h-4 text-amber-600" /> Areas we cover
          </a>
          <a
            href="tel:08458333456"
            className="border border-stone-300 hover:border-amber-500/60 text-slate-800 font-sans text-xs uppercase tracking-[0.15em] font-semibold py-4 px-8 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-amber-600" /> 0845 8333 456
          </a>
        </div>
      </div>
    </div>
  );
}
