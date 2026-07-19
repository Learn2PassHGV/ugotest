import React, { useState, useEffect, useRef } from 'react';
import { Shield, CheckCircle2, Clock, EyeOff, ArrowRight } from 'lucide-react';

export function FleetPage() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-layer-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -5% 0px',
      threshold: 0.12
    });

    const targets = document.querySelectorAll('.reveal-layer-hidden');
    targets.forEach((el) => observer.observe(el));

    return () => {
      targets.forEach((el) => observer.unobserve(el));
    };
  }, []);
  const fleet = [
    {
      title: "Executive Minibuses",
      capacity: "10 TO 16 PASSENGERS",
      capacityValue: "16",
      imgAlt: "Executive Minibus for 16 passengers",
      imgSrc: "/images/executive-minibus-for-16-passengers.webp",
      description: "Optimised for elite small group travel, corporate roadshows, and rapid executive airport transfers.",
      specs: [
        "100% Unbranded Black-Gloss Canvas",
        "Extended Rear Luggage Capacity Drop",
        "Individual USB Charging Port Arrays",
        "Plush Leather Executive Reclining Seating",
        "Euro 6 Low-Emission Zone Compliance"
      ]
    },
    {
      title: "Luxury Midi Coaches",
      capacity: "29 TO 35 PASSENGERS",
      capacityValue: "35",
      imgAlt: "Executive Midi coach 35 passengers",
      imgSrc: "/images/executive-midi-coach-35-passengers.webp",
      description: "The ideal balance of agility and high-capacity luxury for corporate site shifts and country estate venue access.",
      specs: [
        "100% Unbranded Black-Gloss Canvas",
        "Generous Under-Floor Luggage Vaults",
        "Intelligent Dual-Zone Climate Control",
        "Restricted Narrow-Lane Routing Agility",
        "Real-Time GPS Vehicle Tracking"
      ]
    },
    {
      title: "Elite Grand Tourers",
      capacity: "49 TO 53 PASSENGERS",
      capacityValue: "53",
      imgAlt: "Executive Coach",
      imgSrc: "/images/executive-coach.webp",
      description: "High-capacity long-distance tourers engineered for mass conference movements and heavy festival logistics loops.",
      specs: [
        "100% Unbranded Black-Gloss Canvas",
        "Live GPS Central Dispatch Integration",
        "Maximum Volume Double-Tier Baggage Cells",
        "Onboard Restroom and Presentation Facilities",
        "Advanced Safety Braking and Electronic Stability Arrays"
      ]
    }
  ];

  const handleQuoteClick = (capacityValue: string) => {
    window.dispatchEvent(new CustomEvent('select-capacity-quote-trigger', {
      detail: { passengers: capacityValue }
    }));
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen font-sans">
      <style>{`
        :root {
          --elite-inertia: cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Base State: Hidden completely, sitting lower in virtual 3D space, unrendered by GPU */
        .reveal-layer-hidden {
          opacity: 0 !important;
          visibility: hidden !important;
          transform: translate3d(0, 70px, 0) scale3d(0.97, 0.97, 1) !important;
          filter: blur(8px) !important;
          transition: opacity 1.2s ease-out, transform 1.2s var(--elite-inertia), filter 1.2s var(--elite-inertia), visibility 1.2s !important;
          will-change: transform, opacity, filter !important;
          backface-visibility: hidden !important;
          -webkit-font-smoothing: antialiased !important;
        }

        /* Active State: The exact millisecond the element crosses into the viewport */
        .reveal-layer-visible {
          opacity: 1 !important;
          visibility: visible !important;
          transform: translate3d(0, 0, 0) scale3d(1, 1, 1) !important;
          filter: blur(0px) !important;
        }

        /* Stagger Delays mapped to semantic nodes */
        .reveal-header-node {
          transition-delay: 0.0s !important;
          line-height: 1.35 !important;
        }

        .reveal-desc-node {
          transition-delay: 0.15s !important;
        }

        .reveal-card-node {
          transition-delay: 0.22s !important;
        }

        .reveal-spec-node:nth-child(1) {
          transition-delay: 0.35s !important;
        }

        .reveal-spec-node:nth-child(2) {
          transition-delay: 0.45s !important;
        }

        .reveal-spec-node:nth-child(3) {
          transition-delay: 0.55s !important;
        }

        .reveal-spec-node:nth-child(4) {
          transition-delay: 0.65s !important;
        }

        .reveal-spec-node:nth-child(n+5) {
          transition-delay: 0.75s !important;
        }

        .reveal-btn-node {
          transition-delay: 0.75s !important;
        }

        .vehicle-canvas-media {
          transition-delay: 0.22s !important;
          max-width: 100% !important;
          height: auto !important;
        }

        /* Hero Page Header Entry */
        @keyframes heroReveal {
          0% { opacity: 0; transform: translate3d(0, 35px, 0); filter: blur(4px); }
          100% { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0px); }
        }

        .fleet-header-label, .fleet-header-title, .fleet-header-desc {
          will-change: transform, opacity, filter !important;
          backface-visibility: hidden !important;
        }

        .fleet-header-label {
          animation: heroReveal 1s var(--elite-inertia) both;
          animation-delay: 0.1s;
        }

        .fleet-header-title {
          animation: heroReveal 1.3s var(--elite-inertia) both;
          animation-delay: 0.22s;
        }

        .fleet-header-desc {
          animation: heroReveal 1.4s var(--elite-inertia) both;
          animation-delay: 0.35s;
        }
      `}</style>
      {/* 1. The Editorial Page Header */}
      <section className="bg-slate-950 pt-32 pb-16 md:pt-40 md:pb-24 border-b border-slate-900 relative overflow-hidden">
        {/* Subtle glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] max-w-5xl aspect-square md:aspect-video bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08)_0%,rgba(245,158,11,0.02)_40%,transparent_80%)] blur-3xl pointer-events-none animate-pulse" />

        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10">
          <span className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-amber-500 mb-4 font-mono fleet-header-label">
            INSTITUTIONAL FLEET SPECIFICATIONS
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6 fleet-header-title">
            The Elite Unbranded Fleet: Executive Minibuses &amp; Luxury Coaches
          </h1>
          <p className="font-sans text-slate-300 font-light text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto fleet-header-desc">
            Explore our clean, modern fleet. Every vehicle operates entirely unbranded, combining pristine presentation with real-time GPS tracking, Euro 6 low-emission compliance, and advanced safety standards for corporate trips and events across the UK.
          </p>
        </div>
      </section>

      {/* 2. Deep-Dive Specification Showcase */}
      <section className="py-24 bg-slate-900 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* 3-Column Interactive Card Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
            {fleet.map((item, index) => (
              <div 
                key={index}
                className="group bg-slate-950/80 border border-slate-900/90 rounded-3xl p-6 lg:p-8 flex flex-col justify-between transition-all duration-500 hover:border-amber-500/35 hover:shadow-[0_25px_50px_rgba(0,0,0,0.8)] class-container reveal-layer-hidden reveal-card-node"
              >
                <div>
                  {/* High-Fidelity Vehicle Image Showcase */}
                  <div className="overflow-hidden aspect-[16/10] relative bg-slate-900 border border-slate-800/60 rounded-2xl flex items-center justify-center mb-6">
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
                    <img 
                      src={item.imgSrc} loading="lazy" decoding="async" width={1536} height={1024} 
                      alt={item.imgAlt} 
                      referrerPolicy="no-referrer"
                      className="reveal-layer-hidden vehicle-canvas-media w-full h-full object-cover"
                      style={{ transitionDelay: '0.22s' }}
                    />
                  </div>

                  {/* Info & Branding */}
                  <h3 className="font-serif text-2xl lg:text-3xl text-stone-100 tracking-tight leading-tight mb-2 reveal-layer-hidden reveal-header-node">
                    {item.title}
                  </h3>
                  
                  <div className="inline-block border border-amber-600/20 bg-amber-505/5 px-3 py-1.5 rounded-sm mb-6">
                    <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-amber-500">
                      {item.capacity}
                    </span>
                  </div>

                  {/* MOBILE OPTIMIZATION: Static scannable rows */}
                  <div className="block lg:hidden space-y-3.5 pt-6 border-t border-slate-900">
                    {item.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-3 text-slate-300 reveal-layer-hidden reveal-spec-node">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                        <span className="font-sans text-xs md:text-sm font-light tracking-wide">{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* DESKTOP OPTIMIZATION: Hover spec-reveal container */}
                  <div className="hidden lg:block relative h-28 overflow-hidden pt-6 border-t border-slate-900">
                    {/* Default State: Short Grounded Description */}
                    <div className="absolute inset-0 transition-all duration-500 ease-out transform group-hover:-translate-y-full group-hover:opacity-0">
                      <p className="text-sm font-light text-slate-400 leading-relaxed italic reveal-layer-hidden reveal-desc-node">
                        {item.description}
                      </p>
                    </div>

                    {/* Hovered State: Crisp Micro-spec Reveal */}
                    <div className="absolute inset-0 transition-all duration-500 ease-out transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 grid grid-cols-2 gap-4">
                      {item.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2.5 text-slate-200 reveal-layer-hidden reveal-spec-node">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <span className="font-sans text-[11px] font-semibold tracking-wide leading-snug">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Clean, High-ROI quote action anchor */}
                <div className="pt-8 mt-8 border-t border-slate-900 flex justify-start">
                  <button
                    type="button"
                    onClick={() => handleQuoteClick(item.capacityValue)}
                    className="text-slate-400 hover:text-amber-500 transition-all duration-300 font-sans text-xs uppercase tracking-[0.2em] font-semibold flex items-center gap-2 group/anchor cursor-pointer min-h-[44px] px-2 text-left reveal-layer-hidden reveal-btn-node"
                  >
                    <span>Select Capacity &amp; Quote</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/anchor:translate-x-1 text-amber-500 shrink-0" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. The Institutional Rigor Charter */}
      <section className="bg-slate-950 py-24 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-500 mb-4 font-mono reveal-layer-hidden reveal-desc-node">
              Institutional Standard
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-100 leading-tight reveal-layer-hidden reveal-header-node">
              Uncompromising Safety. Zero Corners Cut.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
            <div className="flex items-start gap-5 p-6 rounded-xl border border-slate-900 bg-slate-900/50 hover:border-slate-800 hover:bg-slate-900 hover:scale-[1.01] transition-all duration-300 group reveal-layer-hidden reveal-card-node">
               <Shield className="w-8 h-8 text-amber-500 shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110" />
               <div>
                 <h3 className="font-sans text-base md:text-lg font-bold text-stone-100 mb-2">Vetted Operators</h3>
                 <p className="font-sans text-sm md:text-base text-slate-400 font-light leading-relaxed">
                   100% of driving crews undergo rigorous enhanced DBS check protocols and continuous driver training modules to satisfy premium corporate and private school compliance frameworks.
                 </p>
               </div>
            </div>
            
            <div className="flex items-start gap-5 p-6 rounded-xl border border-slate-900 bg-slate-900/50 hover:border-slate-800 hover:bg-slate-900 hover:scale-[1.01] transition-all duration-300 group reveal-layer-hidden reveal-card-node">
               <Shield className="w-8 h-8 text-amber-500 shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110" />
               <div>
                 <h3 className="font-sans text-base md:text-lg font-bold text-stone-100 mb-2">Absolute Insurance</h3>
                 <p className="font-sans text-sm md:text-base text-slate-400 font-light leading-relaxed">
                   Fully backed by comprehensive, high-tier corporate fleet liability frameworks providing complete passenger protection and ironclad enterprise structural security.
                 </p>
               </div>
            </div>

            <div className="flex items-start gap-5 p-6 rounded-xl border border-slate-900 bg-slate-900/50 hover:border-slate-800 hover:bg-slate-900 hover:scale-[1.01] transition-all duration-300 group reveal-layer-hidden reveal-card-node">
               <EyeOff className="w-8 h-8 text-amber-500 shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110" />
               <div>
                 <h3 className="font-sans text-base md:text-lg font-bold text-stone-100 mb-2">Discreet Operations</h3>
                 <p className="font-sans text-sm md:text-base text-slate-400 font-light leading-relaxed">
                   Zero external commercial graphics, company signage, or phone numbers across the entire fleet layout, ensuring total privacy for celebrity talent and high-profile corporate boards.
                 </p>
               </div>
            </div>

            <div className="flex items-start gap-5 p-6 rounded-xl border border-slate-900 bg-slate-900/50 hover:border-slate-800 hover:bg-slate-900 hover:scale-[1.01] transition-all duration-300 group reveal-layer-hidden reveal-card-node">
               <Clock className="w-8 h-8 text-amber-500 shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110" />
               <div>
                 <h3 className="font-sans text-base md:text-lg font-bold text-stone-100 mb-2">24/7 Direct Support</h3>
                 <p className="font-sans text-sm md:text-base text-slate-400 font-light leading-relaxed">
                   Monitored 24/7 by our family team with live GPS tracking and direct owner phone lines for real-time route adjustments.
                 </p>
               </div>
            </div>
          </div>

          {/* Fleet Specifications & Industry Data Table */}
          <div className="mt-16 border border-slate-900 bg-[#060D1A] p-6 md:p-10 rounded-3xl relative overflow-hidden shadow-2xl">
            <div className="mb-6">
              <span className="font-mono text-[9px] font-extrabold text-amber-500 uppercase tracking-[0.2em] block mb-2 reveal-layer-hidden reveal-desc-node">
                Verified Fleet Specifications &amp; Industry Data
              </span>
              <h3 className="font-serif text-2xl text-white font-medium reveal-layer-hidden reveal-header-node">
                Our Fleet Specifications
              </h3>
            </div>
            
            <div className="w-full overflow-hidden border border-slate-900 rounded-2xl bg-slate-950/80 shadow-inner reveal-layer-hidden reveal-card-node">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left min-w-[700px]">
                  <thead>
                    <tr className="border-b border-slate-900 bg-slate-950/90 text-[#8A99AD] font-mono text-[10px] uppercase tracking-wider">
                      <th className="py-5 px-6 font-semibold">Vehicle Class</th>
                      <th className="py-5 px-6 font-semibold">Seating Bounds</th>
                      <th className="py-5 px-6 font-semibold">Luggage Vault Volume</th>
                      <th className="py-5 px-6 font-semibold">Climate Control Type</th>
                      <th className="py-5 px-6 font-semibold">Compliance Zone Clearances</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/50 text-slate-300 font-sans text-xs leading-relaxed">
                    <tr className="hover:bg-white/[0.01] transition-colors duration-200">
                      <td className="py-5 px-6 font-semibold text-white">Executive Minibuses</td>
                      <td className="py-5 px-6 font-semibold text-amber-500">10 to 16 Seats</td>
                      <td className="py-5 px-6">Extended Rear Drop Case Vault</td>
                      <td className="py-5 px-6">Individual Passenger Multi-Zone A/C</td>
                      <td className="py-5 px-6">Euro 6 &amp; London ULEZ Compliant</td>
                    </tr>
                    <tr className="hover:bg-white/[0.01] transition-colors duration-200">
                      <td className="py-5 px-6 font-semibold text-white">Luxury Midi Coaches</td>
                      <td className="py-5 px-6 font-semibold text-amber-500">29 to 35 Seats</td>
                      <td className="py-5 px-6">Generous Under-Floor Baggage Compartments</td>
                      <td className="py-5 px-6">Intelligent Dual-Zone Air Conditioning</td>
                      <td className="py-5 px-6">Euro 6 &amp; London ULEZ Compliant</td>
                    </tr>
                    <tr className="hover:bg-white/[0.01] transition-colors duration-200">
                      <td className="py-5 px-6 font-semibold text-white">Elite Grand Tourers</td>
                      <td className="py-5 px-6 font-semibold text-amber-500">49 to 53 Seats</td>
                      <td className="py-5 px-6">Ultra High Capacity Double-Tier Baggage Cells</td>
                      <td className="py-5 px-6">Central Climate Optimisation Console</td>
                      <td className="py-5 px-6">Euro 6 &amp; London ULEZ Compliant</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. The Fleet Availability Call-to-Action */}
      <section className="bg-slate-900 py-24 border-y border-slate-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-stone-100 leading-tight mb-6 animate-pulse reveal-layer-hidden reveal-header-node">
            Choose Your Vehicle
          </h2>
          <p className="font-sans text-slate-400 font-light leading-relaxed text-base lg:text-lg mb-10 reveal-layer-hidden reveal-desc-node">
            Planning a daily school contract, corporate transport route, or private milestone? Connect with our dispatch team to confirm real-time fleet availability.
          </p>
          <button 
            type="button"
            onClick={() => handleQuoteClick("35")} 
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-widest font-bold px-8 py-4 rounded-sm transition-colors shadow-lg cursor-pointer min-h-[44px] reveal-layer-hidden reveal-btn-node"
          >
            Check Fleet Availability
          </button>
        </div>
      </section>
    </div>
  );
}
