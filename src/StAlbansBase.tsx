import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Check, 
  ChevronDown, 
  ArrowRight, 
  ShieldCheck, 
  GraduationCap, 
  Sparkles,
  Sliders 
} from 'lucide-react';
import { cn } from './lib/utils';

interface StAlbansBaseProps {
  onNavigateToHomeAndBook?: (locationPreload: string) => void;
}

export function StAlbansBase({ onNavigateToHomeAndBook }: StAlbansBaseProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleActionClick = (targetType: string) => {
    if (onNavigateToHomeAndBook) {
      onNavigateToHomeAndBook(targetType);
    }
  };

  // 3-Card District Capability Grid
  // Alternating background contrast:
  // Card 01: Deep Navy (#050C1A)
  // Card 02: Solid White (#FFFFFF)
  // Card 03: Deep Navy (#050C1A)
  const capabilityCards = [
    {
      title: "Hertfordshire Enterprise & Business Park Shuttles",
      brief: "Reliable co-ordination for daily corporate staff commutes, last-mile rail links, and corporate travel connecting commercial hubs directly to central London, Heathrow Airport, or regional technology corridors.",
      bgClass: "bg-[#050C1A] text-white border-white/5 shadow-2xl",
      btnClass: "bg-amber-500 hover:bg-amber-600 text-slate-950",
      ctaText: "Request Corporate Quote",
      bullets: [
        "Reliable St Albans corporate travel and corporate minibus services",
        "Efficient corporate staff commutes for local enterprise campuses",
        "Direct Harpenden and Hatfield corridor coordination"
      ],
      icon: <Building2 className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      title: "Matrimonial Discretion & Private Estate Logistics",
      brief: "Flawless guest transportation coordination for premium local weddings, luxury hotels, and historic estate locations featuring pristine, unbranded vehicles and exceptional timing.",
      bgClass: "bg-white text-[#050C1A] border-slate-200/80 shadow-xl",
      btnClass: "bg-[#050C1A] hover:bg-slate-900 text-white",
      ctaText: "Book Wedding Transport",
      bullets: [
        "Wedding transport St Albans wedding guest operations",
        "Elite setups for Gorhambury Estate travel co-ordination and Sopwell House executive transport",
        "Prestigious luxury vehicles for Hatfield House events and private garden receptions"
      ],
      icon: <Sparkles className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      title: "Civic, Academic & Private School Excursions",
      brief: "Fully certified school coach hire Hertfordshire transport packages. This ensures academic trips, school outings, and local historical excursions proceed with total safety.",
      bgClass: "bg-[#050C1A] text-white border-white/5 shadow-2xl",
      btnClass: "bg-amber-500 hover:bg-amber-600 text-slate-950",
      ctaText: "Plan School Travel",
      bullets: [
        "Highly vetted local driving crews holding active enhanced DBS clearances",
        "Safe school coach hire Hertfordshire parameters serving prominent private schools",
        "Accommodating local civic groups, museum tours, and academic team journeys"
      ],
      icon: <GraduationCap className="w-8 h-8 text-amber-500 mb-6" />
    }
  ];

  return (
    <div 
      className="bg-[#F9F9FB] min-h-screen text-[#050C1A] font-sans"
      itemScope 
      itemType="https://schema.org/WebPage"
    >
      {/* 1. HERO SECTION (Porcelain white background) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#F0F2F6] pt-32 pb-16 md:pt-40 md:pb-24 border-b border-slate-200">
        <div className="absolute top-0 left-0 w-[420px] h-[420px] bg-slate-100/80 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-0 right-0 w-[520px] h-[520px] bg-slate-200/50 rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          
          {/* Micro-tag */}
          <div className="hero-badge-load inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/15 mb-6 select-none shadow-sm">
            <Sliders className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span className="font-mono text-[9px] md:text-10px font-extrabold uppercase tracking-[0.25em] text-[#050C1A]">
              HERTFORDSHIRE SERVICE AREA
            </span>
          </div>

          <h1 
            className="hero-title-load font-serif text-4xl md:text-5xl lg:text-6.5xl text-slate-950 font-medium leading-tight mb-8 max-w-4xl mx-auto tracking-tight"
            itemProp="headline"
          >
            Coach Hire St Albans: Luxury Minibus Rental Hertfordshire
          </h1>

          <p className="hero-subtext-load font-sans text-slate-600 font-light text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            Premium, unmarked private coach and minibus hire serving St Albans, Harpenden, Radlett, and the surrounding districts with professional drivers.
          </p>

          <div className="hero-buttons-load flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleActionClick("St Albans Base")}
              className="w-full sm:w-auto bg-slate-950 hover:bg-slate-900 text-white font-sans text-xs uppercase tracking-[0.2em] font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] cursor-pointer"
            >
              Configure St Albans Route
            </button>
            <button
              onClick={() => {
                const kpiSection = document.getElementById("stalbans-kpi-table");
                if (kpiSection) {
                  kpiSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-950 border border-slate-200 font-sans text-xs uppercase tracking-[0.15em] font-medium py-4 px-8 rounded-xl transition-colors cursor-pointer"
            >
              View Compliance &amp; Safety
            </button>
          </div>
        </div>
      </section>

      {/* 2. LOCAL TRAVEL COORDINATION PANEL (Dedicated dark navy background) */}
      <section className="bg-[#050C1A] text-white py-12 border-y border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="font-mono text-[9px] font-extrabold tracking-[0.25em] text-amber-500 uppercase mb-3">
            LOCAL TRAVEL COORDINATION
          </div>
          <p className="font-serif text-sm md:text-base leading-relaxed text-slate-200 italic font-light max-w-3xl mx-auto">
            "We coordinate local travel directly from our Hertfordshire depot. We connect business campuses, private estates, and London transit links using our clean, unbranded fleet, all backed by 24/7 support from our family team."
          </p>
          {/* Thin gold accent underline rule */}
          <div className="w-24 h-0.5 bg-amber-500 mt-5 mx-auto" />
        </div>
      </section>

      {/* 3. CORE SERVICE OVERVIEW */}
      <section className="py-10 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed font-light">
            We provide reliable, high-quality coach and minibus hire across St Albans and Hertfordshire. Our unbranded executive minibuses and coaches are perfect for corporate travel, school runs, weddings, and private events.
          </p>
        </div>
      </section>

      {/* 4. THREE-CARD DISTRICT CAPABILITY GRID */}
      <section className="py-24 relative z-10 border-b border-slate-200 bg-[#F9F9FB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-10px font-extrabold text-amber-600 uppercase tracking-[0.2em] mb-4 block">
              St Albans Operations Base Active
            </span>
            <h2 className="font-serif text-3xl md:text-4.5xl text-slate-950 font-medium leading-tight">
              Localised District Capabilities
            </h2>
            <div className="w-12 h-1 bg-amber-500/80 mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {capabilityCards.map((card, idx) => (
              <div 
                key={idx}
                className={cn(
                  "flex flex-col justify-between p-8 md:p-10 rounded-2xl border transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl",
                  card.bgClass
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                      St Albans Service
                    </span>
                    <span className="text-[9px] font-semibold bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded uppercase font-mono">
                      Service {idx + 1}
                    </span>
                  </div>

                  {card.icon}

                  <h3 className="font-serif text-xl md:text-2xl font-bold mb-4 leading-snug">
                    {card.title}
                  </h3>

                  <p className="font-sans text-xs md:text-sm leading-relaxed mb-6 font-light opacity-90">
                    {card.brief}
                  </p>

                  <ul className="space-y-4 mb-8 text-xs lg:text-sm text-inherit">
                    {card.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span className="font-light leading-relaxed opacity-90">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleActionClick("St Albans Base")}
                  className={cn(
                    "w-full text-center py-3.5 px-5 rounded-xl text-xs font-bold uppercase tracking-[0.15em] transition-all cursor-pointer font-sans duration-200 mt-2",
                    card.btnClass
                  )}
                >
                  {card.ctaText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DEEP SEMANTIC LOCAL KEYWORD & VICINITY INTEGRATION */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="font-sans text-xs text-slate-505 leading-relaxed font-light tracking-wide">
            We provide reliable coach hire and executive minibus services in St Albans and across Hertfordshire. Our clean, unmarked vehicles are ideal for family trips, school transfers, and local business hire in Harpenden, Radlett, Hatfield, and the surrounding areas. Managed by our family team, we focus on delivering a friendly and professional service you can trust.
          </p>
        </div>
      </section>

      {/* 6. LOCAL TRAVEL DETAILS */}
      <section id="stalbans-kpi-table" className="py-24 border-b border-slate-200 bg-[#F9F9FB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="font-mono text-10px font-extrabold text-amber-600 uppercase tracking-[0.25em] block mb-3">
              Our Local Fleet Details
            </span>
            <h2 className="font-serif text-3xl md:text-4.5xl leading-tight text-slate-950">
              St Albans Local Areas &amp; Seating Options
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-600 font-light max-w-2xl mx-auto leading-relaxed mt-4">
              A guide to our standard vehicles and transit coverage across Hertfordshire.
            </p>
          </div>

          <div className="w-full overflow-hidden border border-slate-200 rounded-2xl bg-white shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-mono text-[10px] md:text-xs uppercase tracking-wider">
                    <th className="py-6 px-6 md:px-8 font-semibold">Local Areas Covered</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Vehicle Class</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Typical Route Timing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="hover:bg-slate-50/50 transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-slate-950">
                      St Albans Core (AL1, AL2, AL3, AL4)
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      10 to 16 Seat Executive Luxury Minibuses configured for tight town corridors
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light text-slate-600">
                      Reliable and punctual service managed by our local dispatch team.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-slate-950">
                      Harpenden &amp; Radlett Rings (AL5, WD7)
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      Luxury 29 to 35 Seat Midi Coaches (100% Unbranded) for regional business campuses
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light text-slate-600">
                      Direct and comfortable travel via the local road networks.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-slate-950">
                      Wider Hertfordshire Perimeter
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      49 to 53 Seat Elite Grand Tourers for dense corporate conventions or private excursions
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light text-slate-600">
                      Large group travel and custom private hire options for events.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile swipe alert */}
            <div className="lg:hidden text-center py-4 bg-slate-50/50 border-t border-slate-150 font-sans text-[10px] text-slate-500 uppercase tracking-widest font-medium select-none">
              ← Swipe right to view full details table →
            </div>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section 
        className="py-24 bg-white border-b border-slate-200"
        itemScope 
        itemType="https://schema.org/FAQPage"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-mono text-10px font-extrabold text-amber-600 uppercase tracking-[0.25em] block mb-3">
              LOCAL OPERATIONAL FAQ
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-slate-950 font-medium">
              St Albans Logistics Q&amp;A
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-600 font-light mt-3 max-w-lg mx-auto">
              Addressing historic town center access requirements and London LEZ compliance constraints.
            </p>
          </div>

          <div className="space-y-4">
            <div 
              className="border border-slate-200 bg-[#F9F9FB] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md"
              itemProp="mainEntity"
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => toggleFaq(1)}
                className="w-full flex items-center justify-between text-left p-6 md:p-7 focus:outline-none cursor-pointer group"
              >
                <span 
                  className="font-serif text-base md:text-lg text-slate-900 font-medium group-hover:text-amber-600 transition-colors duration-200 pr-4"
                  itemProp="name"
                >
                  Can your coaches easily navigate the historic or narrow streets around central St Albans?
                </span>
                <ChevronDown 
                  className={cn(
                    "w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300",
                    openFaq === 1 && "rotate-180 text-amber-600"
                  )} 
                />
              </button>
              
              <div 
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out border-slate-200",
                  openFaq === 1 ? "max-h-60 border-t p-6 md:px-7 md:pb-8 bg-white" : "max-h-0"
                )}
                itemProp="acceptedAnswer"
                itemScope
                itemType="https://schema.org/Answer"
              >
                <div 
                  className="font-sans text-xs md:text-sm text-slate-650 leading-relaxed font-light"
                  itemProp="text"
                >
                  Yes. While our grand tourers handle wide arterial roads and mass group movements, our localised fleet features highly nimble luxury midi coaches and executive minibuses explicitly selected to safely navigate historic town centres, narrow medieval streets, and restricted estate entrances.
                </div>
              </div>
            </div>

            <div 
              className="border border-slate-200 bg-[#F9F9FB] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md"
              itemProp="mainEntity"
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => toggleFaq(2)}
                className="w-full flex items-center justify-between text-left p-6 md:p-7 focus:outline-none cursor-pointer group"
              >
                <span 
                  className="font-serif text-base md:text-lg text-slate-900 font-medium group-hover:text-amber-600 transition-colors duration-200 pr-4"
                  itemProp="name"
                >
                  Are your St Albans vehicles fully compliant with the London Low Emission Zone boundaries?
                </span>
                <ChevronDown 
                  className={cn(
                    "w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300",
                    openFaq === 2 && "rotate-180 text-amber-600"
                  )} 
                />
              </button>
              
              <div 
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out border-slate-200",
                  openFaq === 2 ? "max-h-60 border-t p-6 md:px-7 md:pb-8 bg-white" : "max-h-0"
                )}
                itemProp="acceptedAnswer"
                itemScope
                itemType="https://schema.org/Answer"
              >
                <div 
                  className="font-sans text-xs md:text-sm text-slate-650 leading-relaxed font-light"
                  itemProp="text"
                >
                  Every vehicle dispatched from our central Hertfordshire depot is built to strict Euro 6 low-emission standards. This allows our executive minibuses and coaches to cross seamlessly from St Albans directly into the London ULEZ and Congestion zones with zero regulatory friction or compliance penalties.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FRICTIONLESS UI CALL TO ACTION */}
      <section className="bg-[#050C1A] text-white py-20 px-6 relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/40 to-black/90 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/5 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="font-mono text-[9px] font-extrabold text-amber-500 uppercase tracking-[0.3em] block mb-4">
            ST ALBANS SERVICES
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6 leading-tight">
            Book St Albans Coach or Minibus Hire
          </h2>
          <p className="font-sans text-slate-300 text-xs md:text-base leading-relaxed max-w-2xl mx-auto mb-10 font-light">
            Coordinate school trips, corporate shuttles, or wedding guest transfers with ease. Fill out our simple form to get a custom quote.
          </p>

          <button
            onClick={() => handleActionClick("St Albans Base")}
            className="group inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] pointer-events-auto cursor-pointer"
          >
            Launch Core Booking Engine
            <ArrowRight className="w-4 h-4 text-slate-950 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
