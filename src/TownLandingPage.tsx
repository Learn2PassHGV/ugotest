import React from 'react';
import { Phone, MapPin, CheckCircle2, ChevronRight, ShieldCheck, Users, Clock, EyeOff } from 'lucide-react';
import type { Town } from './data/towns';

interface TownLandingPageProps {
  town: Town;
  onNavigate?: (page: string) => void;
  onRequestQuote?: () => void;
}

/**
 * Template for the town landing pages (/coach-hire-<slug>).
 * These carry the local-SEO equity of the old site's town pages, rebuilt in
 * the new design. All copy comes from src/data/towns.ts.
 */
export function TownLandingPage({ town, onNavigate, onRequestQuote }: TownLandingPageProps) {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: town.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Coach & Minibus Hire ${town.name}`,
    serviceType: 'Coach hire and minibus hire with driver',
    areaServed: { '@type': 'Place', name: `${town.name}, ${town.county}, UK` },
    provider: {
      '@type': 'LocalBusiness',
      name: 'UGO Coach & Minibus Hire',
      legalName: 'Pullman Direct Ltd',
      telephone: '+448458333456',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Wellington House, 273-275 High Street, London Colney',
        addressLocality: 'St Albans',
        addressRegion: 'Hertfordshire',
        postalCode: 'AL2 1HA',
        addressCountry: 'GB',
      },
    },
  };

  return (
    <div className="bg-stone-50 min-h-screen font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      {/* Hero */}
      <section className="bg-slate-950 text-stone-50 pt-32 pb-20 md:pt-40 md:pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400 mb-6">
            <MapPin className="w-3.5 h-3.5" />
            {town.name} · {town.county}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            {town.headline}
          </h1>
          <p className="font-sans text-slate-300 font-light text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            {town.intro}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onRequestQuote}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold tracking-[0.15em] text-xs uppercase py-4 px-8 rounded-xl shadow-lg hover:scale-[1.02] transition-transform cursor-pointer"
            >
              Get a Fast Quote
            </button>
            <a
              href="tel:08458333456"
              className="border border-white/20 hover:border-amber-500/60 text-white font-semibold tracking-[0.15em] text-xs uppercase py-4 px-8 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-500" />
              0845 8333 456
            </a>
          </div>
        </div>
      </section>

      {/* Credentials strip */}
      <section className="bg-white border-b border-stone-200 py-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: ShieldCheck, title: 'DVSA Registered', sub: 'Licensed operator' },
            { icon: Users, title: 'Enhanced DBS', sub: 'Vetted drivers' },
            { icon: Clock, title: 'Out-of-hours Line', sub: 'Evenings & weekends' },
            { icon: EyeOff, title: 'Unbranded Fleet', sub: 'Discreet & pristine' },
          ].map((c) => (
            <div key={c.title} className="flex flex-col items-center text-center">
              <c.icon className="w-6 h-6 text-amber-600 mb-2" />
              <span className="font-serif font-semibold text-slate-900 text-base">{c.title}</span>
              <span className="font-sans text-[11px] uppercase tracking-widest text-slate-500">{c.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Local angle + journeys */}
      <section className="py-20 md:py-24 bg-stone-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-600 mb-4">
              Local knowledge, family standards
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-slate-900 leading-tight mb-6">
              Coach &amp; minibus hire in {town.name}, from a genuinely local family firm
            </h2>
            <p className="font-sans text-slate-700 font-light leading-relaxed text-base lg:text-lg mb-6">
              {town.localAngle}
            </p>
            <p className="font-sans text-slate-700 font-light leading-relaxed text-base lg:text-lg">
              Every journey is backed by our family management team in St Albans — direct phone access,
              professionally vetted drivers, and an unbranded executive fleet from 16-seat minibuses to
              53-seat coaches.
            </p>
          </div>
          <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
            <h3 className="font-serif text-xl text-slate-900 mb-6">
              Popular journeys from {town.name}
            </h3>
            <ul className="space-y-4">
              {town.popularJourneys.map((j) => (
                <li key={j} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-1" />
                  <span className="font-sans text-sm text-slate-700 font-light">{j}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={onRequestQuote}
              className="mt-8 w-full bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs uppercase tracking-[0.15em] font-semibold py-4 px-6 rounded-xl transition-colors cursor-pointer"
            >
              Price My {town.name} Journey
            </button>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white border-t border-stone-200">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <h2 className="font-serif text-3xl md:text-4xl text-slate-900 leading-tight mb-10 text-center">
            {town.name} coach hire — common questions
          </h2>
          <div className="space-y-6">
            {town.faqs.map((f) => (
              <details key={f.q} className="group bg-stone-50 border border-stone-200 rounded-xl p-6 open:shadow-sm">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
                  <span className="font-serif text-lg text-slate-900">{f.q}</span>
                  <ChevronRight className="w-4 h-4 text-amber-600 transition-transform group-open:rotate-90 shrink-0" />
                </summary>
                <p className="mt-4 font-sans text-sm text-slate-700 font-light leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby + CTA */}
      <section className="py-16 bg-slate-950 text-stone-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div>
            <h3 className="font-serif text-2xl mb-3">Also covering the {town.name} area</h3>
            <div className="flex flex-wrap gap-3">
              {town.nearby.map((n) => (
                <a
                  key={n.label}
                  href={n.locationPage || `/coach-hire-${n.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate(n.locationPage ? `path:${n.locationPage}` : `town-${n.slug}`);
                  }}
                  className="text-xs uppercase tracking-widest font-semibold text-slate-300 border border-white/15 hover:border-amber-500/60 hover:text-amber-400 rounded-full px-4 py-2 transition-colors"
                >
                  {n.label}
                </a>
              ))}
            </div>
          </div>
          <div className="text-center lg:text-right shrink-0">
            <p className="font-sans text-sm text-slate-400 mb-3">
              Speak directly with our family management team
            </p>
            <a href="tel:08458333456" className="font-serif text-3xl text-amber-500 hover:text-amber-400 transition-colors">
              0845 8333 456
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
