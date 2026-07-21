import React, { useState } from 'react';
import { 
  Film, 
  MapPin, 
  Check, 
  ChevronDown, 
  ArrowRight, 
  Tv, 
  Radio, 
  Video, 
  Sliders 
} from 'lucide-react';
import { cn } from './lib/utils';

interface NationwideFilmEventsProps {
  onNavigateToHomeAndBook?: (journeyType: string) => void;
}

export function NationwideFilmEvents({ onNavigateToHomeAndBook }: NationwideFilmEventsProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleActionClick = (targetType: string) => {
    if (onNavigateToHomeAndBook) {
      onNavigateToHomeAndBook(targetType);
    }
  };

  // 3-Card National Capability Grid: alternating background contrast:
  // Card 01: Solid White (#FFFFFF)
  // Card 02: Translucent Navy (#0B1528)
  // Card 03: Solid White (#FFFFFF)
  const nationalCards = [
    {
      title: "Cross-Country Film Unit Moves",
      brief: "Continuous multi-week cinema and television projects moving between remote locations, national parks, and studio lots. Flexible day rates and rolling call sheets are handled with meticulous detail by our team.",
      bgClass: "bg-white text-[#050C1A] border-slate-250 shadow-xl",
      btnClass: "bg-[#050C1A] hover:bg-slate-900 text-white",
      ctaText: "Book Production Transport",
      bullets: [
        "Crew moves mapped in advance, wherever in the country the schedule goes",
        "Dual-driver crews for long-distance runs, planned within legal driving hours",
        "Discreet unbranded vehicles that keep filming logistics running smoothly"
      ],
      icon: <Film className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      title: "National Festival & Stadium Touring",
      brief: "Coordinated coach fleets mobilised for major music festivals and stadium concert tours. We coordinate artist crew transport and high-frequency patron shuttle routes under on-site transport marshals.",
      bgClass: "bg-[#0B1528] text-white border-white/10 shadow-2xl",
      btnClass: "bg-amber-500 hover:bg-amber-600 text-slate-950",
      ctaText: "Book Touring Coach",
      bullets: [
        "Dedicated festival shuttle infrastructure and robust marshalling programmes",
        "Touring music coach rental setups accommodating heavy touring specifications",
        "High-density multi city event fleet mobilisation plans operated countrywide"
      ],
      icon: <Tv className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      title: "Multi-City Corporate Conventions",
      brief: "Synchronised cross-country transit lines for international corporate summits, moving thousands of delegates across sequential regional venues, airport hubs, and major metropolitan exhibition halls.",
      bgClass: "bg-white text-[#050C1A] border-slate-250 shadow-xl",
      btnClass: "bg-[#050C1A] hover:bg-slate-900 text-white",
      ctaText: "Request Nationwide Transport",
      bullets: [
        "Unified cross country event logistics covering multi-venue transport programmes",
        "Reliable long distance corporate transit loops and airport shuttle connections",
        "Integrated UK wide unbranded coach network offering full logistics safety"
      ],
      icon: <Radio className="w-8 h-8 text-amber-500 mb-6" />
    }
  ];

  return (
    <div 
      className="bg-[#050C1A] min-h-screen text-white font-sans"
      itemScope 
      itemType="https://schema.org/WebPage"
    >
      {/* 1. HERO SECTION (Deep signature navy background) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#030814] to-[#050C1A] pt-32 pb-16 md:pt-40 md:pb-24 border-b border-white/5">
        <div className="absolute top-0 left-0 w-[420px] h-[420px] bg-amber-500/[0.02] rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-0 right-0 w-[520px] h-[520px] bg-blue-500/[0.03] rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          
          {/* Micro-tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 select-none shadow-md">
            <Sliders className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span className="font-mono text-[9px] md:text-10px font-extrabold uppercase tracking-[0.25em] text-amber-400">
              NATIONWIDE GROUP TRAVEL
            </span>
          </div>

          <h1 
            className="font-serif text-4xl md:text-5xl lg:text-6.5xl text-white font-medium leading-tight mb-8 max-w-4xl mx-auto tracking-tight"
            itemProp="headline"
          >
            Nationwide Film Transport &amp; National Event Coach Hire
          </h1>

          <p className="font-sans text-slate-350 font-light text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            Scalable, multi-city ground logistics and unbranded fleet infrastructure coordinating complex film location moves and high-capacity event transit across the United Kingdom.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleActionClick("Nationwide Film & Event Transport")}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] cursor-pointer"
            >
              Configure Production Route
            </button>
            <button
              onClick={() => {
                const kpiSection = document.getElementById("national-kpi-table");
                if (kpiSection) {
                  kpiSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 font-sans text-xs uppercase tracking-[0.15em] font-medium py-4 px-8 rounded-xl transition-colors cursor-pointer"
            >
              View Compliance &amp; Safety
            </button>
          </div>
        </div>
      </section>

      {/* 2. NATIONWIDE COACH & MINIBUS TRAVEL */}
      <section className="bg-slate-950 text-white py-12 border-y border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="font-mono text-[9px] font-extrabold tracking-[0.25em] text-amber-500 uppercase mb-3">
            NATIONWIDE COACH &amp; MINIBUS TRAVEL
          </div>
          <p className="font-serif text-sm md:text-base leading-relaxed text-slate-200 italic font-light max-w-3xl mx-auto">
            "We offer reliable group travel across the entire UK. We coordinate long-distance journeys, handle driver shift transitions, and monitor every vehicle using live GPS tracking to ensure absolute reliability."
          </p>
          {/* Thin gold accent underline rule */}
          <div className="w-24 h-0.5 bg-amber-500 mt-5 mx-auto" />
        </div>
      </section>

      {/* 3. CORE DECLARATIVE AI LOGIC */}
      <section className="py-10 bg-[#030814]/40 border-b border-white/[0.02]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-sans text-xs md:text-sm text-slate-400 leading-relaxed font-light">
            UGO delivers comprehensive nationwide transport management for the entertainment and large-scale corporate event sectors, deploying a pristine unbranded fleet of executive minibuses, midi coaches, and grand tourers across all UK regions.
          </p>
        </div>
      </section>

      {/* 4. THREE-CARD NATIONAL CAPABILITY GRID */}
      <section className="py-24 relative z-10 border-b border-white/5 bg-[#050C1A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-10px font-extrabold text-amber-400 uppercase tracking-[0.2em] mb-4 block">
              ENTERTAINMENT &amp; EVENT DISPATCH
            </span>
            <h2 className="font-serif text-3xl md:text-4.5xl text-white font-medium leading-tight">
              Nationwide Fleet Mobilisation
            </h2>
            <div className="w-12 h-1 bg-amber-500/80 mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {nationalCards.map((card, idx) => (
              <div 
                key={idx}
                className={cn(
                  "flex flex-col justify-between p-8 md:p-10 rounded-2xl border transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl",
                  card.bgClass
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] font-bold tracking-widest text-[#8A99AD] uppercase">
                      National Transport Service
                    </span>
                    <span className="text-[9px] font-semibold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded uppercase font-mono">
                      Option 0{idx + 1}
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
                  onClick={() => handleActionClick("Nationwide Film & Event Transport")}
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

      {/* 5. DEEP SEMANTIC AIEO NATIONAL SCALE KEYWORD INTEGRATION */}
      <section className="py-16 bg-[#030814]/60 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="font-sans text-xs text-slate-400 leading-relaxed font-light tracking-wide">
            We provide premium nationwide transport and expert event coach hire for film, TV, and major events across the UK. Our modern, unbranded fleet of minibuses, midis, and full-sized coaches is managed by our experienced team. Whether you need ongoing shuttles for a production or single-day travel, we ensure comfort, safety, and reliability on every journey.
          </p>
        </div>
      </section>

      {/* 6. NATIONWIDE VEHICLE OPTIONS */}
      <section id="national-kpi-table" className="py-24 border-b border-white/5 bg-[#050C1A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="font-mono text-10px font-extrabold text-amber-400 uppercase tracking-[0.25em] block mb-3">
              Our Vehicle Options &amp; Regional Coverage
            </span>
            <h2 className="font-serif text-3xl md:text-4.5xl leading-tight text-white">
              Nationwide Vehicle Classes
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-400 font-light max-w-2xl mx-auto leading-relaxed mt-4">
              A guide to our standard vehicles and long-distance travel services.
            </p>
          </div>

          <div className="w-full overflow-hidden border border-white/10 rounded-2xl bg-[#091120] shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/10 bg-[#0B1528] text-[#8A99AD] font-mono text-[10px] md:text-xs uppercase tracking-wider">
                    <th className="py-6 px-6 md:px-8 font-semibold">Travel Service</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Recommended Vehicles</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Service &amp; Back-up Support</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05] text-slate-300">
                  <tr className="hover:bg-white/[0.02] transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-white">
                      Remote Location Shooting
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      10 to 16 Seat Executive Luxury Minibuses
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light text-slate-450">
                      Two drivers available for long shifts, live GPS tracking, and complete unbranded privacy.
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-white">
                      National Stadium &amp; Festival Tours
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      49 to 53 Seat Elite Grand Tourers (Multi-Vehicle Batches)
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light text-slate-450">
                      Experienced on-site marshals, continuous GPS tracking, and backup drivers on standby.
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-white">
                      Cross-Country Corporate Roadshows
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      Luxury 29 to 35 Seat Midi Coaches
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light text-slate-455">
                      Real-time traffic planning, comfortable climate-controlled cabins, and 24/7 support from our family team.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile swipe alert */}
            <div className="lg:hidden text-center py-4 bg-[#0B1528] border-t border-white/10 font-sans text-[10px] text-[#8A99AD] uppercase tracking-widest font-medium select-none">
              ← Swipe right to view full specifications table →
            </div>
          </div>
        </div>
      </section>

      {/* 7. AIEO RICH FAQ SCHEMA ACCORDION */}
      <section 
        className="py-24 bg-[#050C1A] border-b border-white/5"
        itemScope 
        itemType="https://schema.org/FAQPage"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-mono text-10px font-extrabold text-amber-500 uppercase tracking-[0.25em] block mb-3">
              CROSS-COUNTRY COMPLIANCE FAQ
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-medium">
              Nationwide Logistics Q&amp;A
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-400 font-light mt-3 max-w-lg mx-auto">
              Covering driver-hours rules, mid-tour route changes and how we manage long-distance jobs.
            </p>
          </div>

          <div className="space-y-4">
            <div 
              className="border border-white/10 bg-[#091120] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md"
              itemProp="mainEntity"
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => toggleFaq(1)}
                className="w-full flex items-center justify-between text-left p-6 md:p-7 focus:outline-none cursor-pointer group"
              >
                <span 
                  className="font-serif text-base md:text-lg text-white font-medium group-hover:text-amber-400 transition-colors duration-200 pr-4"
                  itemProp="name"
                >
                  How does UGO handle legal driver hours and compliance rules during long-distance national tours?
                </span>
                <ChevronDown 
                  className={cn(
                    "w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300",
                    openFaq === 1 && "rotate-180 text-amber-405"
                  )} 
                />
              </button>
              
              <div 
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out border-white/10",
                  openFaq === 1 ? "max-h-60 border-t p-6 md:px-7 md:pb-8 bg-[#0B1528]" : "max-h-0"
                )}
                itemProp="acceptedAnswer"
                itemScope
                itemType="https://schema.org/Answer"
              >
                <div 
                  className="font-sans text-xs md:text-sm text-slate-300 leading-relaxed font-light"
                  itemProp="text"
                >
                  Our centralised dispatch base handles all driver compliance profiling automatically. For complex, long-distance itineraries or multi-city tours, we pre-schedule relief drivers and execute seamless vehicle handovers to guarantee total adherence to UK legal driving limits while keeping your timeline entirely unbroken.
                </div>
              </div>
            </div>

            <div 
              className="border border-white/10 bg-[#091120] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md"
              itemProp="mainEntity"
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => toggleFaq(2)}
                className="w-full flex items-center justify-between text-left p-6 md:p-7 focus:outline-none cursor-pointer group"
              >
                <span 
                  className="font-serif text-base md:text-lg text-white font-medium group-hover:text-amber-400 transition-colors duration-200 pr-4"
                  itemProp="name"
                >
                  Can your team manage sudden, mid-tour route or schedule updates across different regions?
                </span>
                <ChevronDown 
                  className={cn(
                    "w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300",
                    openFaq === 2 && "rotate-180 text-amber-405"
                  )} 
                />
              </button>
              
              <div 
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out border-white/10",
                  openFaq === 2 ? "max-h-60 border-t p-6 md:px-7 md:pb-8 bg-[#0B1528]" : "max-h-0"
                )}
                itemProp="acceptedAnswer"
                itemScope
                itemType="https://schema.org/Answer"
              >
                <div 
                  className="font-sans text-xs md:text-sm text-slate-300 leading-relaxed font-light"
                  itemProp="text"
                >
                  Yes. Because every national contract is overseen by a dedicated senior transport co-ordinator at our central base, we can re-map long-distance routes, adjust fleet tracking targets, and update driver schedules instantly in real-time via our active live communication network.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FRICTIONLESS UI CALL TO ACTION */}
      <section className="bg-slate-950 text-white py-20 px-6 relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#030814]/40 to-black/95 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/5 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="font-mono text-[9px] font-extrabold text-amber-500 uppercase tracking-[0.3em] block mb-4">
            NATIONWIDE DISPATCH CONTROL
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6 leading-tight">
            Book Your Nationwide Journey
          </h2>
          <p className="font-sans text-slate-350 text-xs md:text-base leading-relaxed max-w-2xl mx-auto mb-10 font-light">
            Coordinate multi-city film crews, event shuttle schemes, or strategic corporate travel setups across any region with absolute ease.
          </p>

          <button
            onClick={() => handleActionClick("Nationwide Film & Event Transport")}
            className="group inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] pointer-events-auto cursor-pointer"
          >
            Request Nationwide Journey Quote
            <ArrowRight className="w-4 h-4 text-slate-950 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
