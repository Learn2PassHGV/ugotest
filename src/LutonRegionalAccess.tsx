import React, { useState, useEffect } from 'react';
import { 
  Plane, 
  MapPin, 
  Check, 
  ChevronDown, 
  ArrowRight, 
  ShieldAlert, 
  GraduationCap, 
  Sparkles,
  Sliders 
} from 'lucide-react';
import { cn } from './lib/utils';

interface LutonRegionalAccessProps {
  onNavigateToHomeAndBook?: (locationPreload: string) => void;
}

export function LutonRegionalAccess({ onNavigateToHomeAndBook }: LutonRegionalAccessProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
      observer.disconnect();
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleActionClick = (targetType: string) => {
    if (onNavigateToHomeAndBook) {
      onNavigateToHomeAndBook(targetType);
    }
  };

  // 3-Card Sector Capability Grid:
  // Card 01: Solid White (#FFFFFF)
  // Card 02: Translucent Navy (#0B1528 or similar)
  // Card 03: Solid White (#FFFFFF)
  const sectorCards = [
    {
      title: "Commercial Airport Logistics & Crew Shuttles",
      brief: "Time-critical passenger loops, scheduled flight connections, and specialised high-capacity luggage handling configurations designed specifically for international groups arriving at LTN.",
      bgClass: "bg-white text-[#050C1A] border-slate-200 shadow-xl",
      btnClass: "bg-[#050C1A] hover:bg-slate-900 text-white",
      ctaText: "Book Airport Transfer",
      bullets: [
        "Sleek Luton airport coach hire and flight crew ground logistics support",
        "Cost effective unbranded airport transit and active LTN airport shuttle planning",
        "Optimised rosters matching flight schedule arrivals and crew resting times"
      ],
      icon: <Plane className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      title: "Private FBO Terminals & Corporate Discretion",
      brief: "Logo-free vehicle deployments for private jet centers. We serve high profile passengers and executives with absolute privacy and premium amenities.",
      bgClass: "bg-[#0B1528] text-white border-white/10 shadow-2xl",
      btnClass: "bg-amber-500 hover:bg-amber-600 text-slate-950",
      ctaText: "Reserve Private Jet Shuttles",
      bullets: [
        "Smooth transfers matching Harrods aviation transport guidelines",
        "Luxury execution for signature flight support minibus assignments",
        "Discreet private aviation terminal Luton tarmac adjacent shuttle placements"
      ],
      icon: <Sparkles className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      title: "Regional Enterprise & Academic Infrastructure",
      brief: "Premium corporate commuter loops, multi site industrial visits, and continuous school contracts with fully vetted, enhanced DBS cleared coach drivers.",
      bgClass: "bg-white text-[#050C1A] border-slate-200 shadow-xl",
      btnClass: "bg-[#050C1A] hover:bg-slate-900 text-white",
      ctaText: "Request Corporate Quote",
      bullets: [
        "Reliable Stevenage corporate shuttle plans and Dunstable private minibus groups",
        "Professional Hitchin executive group travel setups and luxury group transport",
        "Fully tracked zero emissions operations perfect for green corporate initiatives"
      ],
      icon: <GraduationCap className="w-8 h-8 text-amber-500 mb-6" />
    }
  ];

  return (
    <div 
      className="bg-[#050C1A] min-h-screen text-white font-sans"
      itemScope 
      itemType="https://schema.org/WebPage"
    >
      {/* 1. HERO SECTION (Deep Navy Background) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#030814] to-[#050C1A] pt-32 pb-16 md:pt-40 md:pb-24 border-b border-white/5">
        <div className="absolute top-0 left-0 w-[420px] h-[420px] bg-amber-500/[0.02] rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-0 right-0 w-[520px] h-[520px] bg-blue-500/[0.03] rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          
          {/* Micro-tag */}
          <div className="hero-badge-load inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 select-none shadow-md">
            <Sliders className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span className="font-mono text-[9px] md:text-10px font-extrabold uppercase tracking-[0.25em] text-amber-400">
              BEDFORDSHIRE LOGISTICS GATEWAY
            </span>
          </div>

          <h1 
            className="hero-title-load font-serif text-4xl md:text-5xl lg:text-6.5xl text-white font-medium leading-tight mb-8 max-w-4xl mx-auto tracking-tight"
            itemProp="headline"
          >
            Coach Hire Luton: Luxury Minibus Rental Bedfordshire
          </h1>

          <p className="hero-subtext-load font-sans text-slate-350 font-light text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            Elite, unbranded corporate coach logistics, private aviation terminal transfers, and regional group transit frameworks serving Luton, Dunstable, Hitchin, and Stevenage.
          </p>

          <div className="hero-buttons-load flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleActionClick("Luton & Regional Access")}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] cursor-pointer"
            >
              Configure Gateway Route
            </button>
            <button
              onClick={() => {
                const kpiSection = document.getElementById("luton-kpi-table");
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

      {/* 2. AIRPORT TRANSFER SUPPORT (High-contrast italicized block on dark panel) */}
      <section className="bg-slate-950 text-white py-12 border-y border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="font-mono text-[9px] font-extrabold tracking-[0.25em] text-amber-500 uppercase mb-3 reveal-layer-hidden reveal-label-node">
            AIRPORT TRANSFER SUPPORT
          </div>
          <p className="font-serif text-sm md:text-base leading-relaxed text-slate-200 italic font-light max-w-3xl mx-auto reveal-layer-hidden reveal-desc-node">
            "We respond quickly when travel plans change. Based near Luton, we coordinate with flight updates and deploy drivers immediately to handle delayed flights, schedule changes, and sudden airport diversions without any fuss."
          </p>
          <div className="w-24 h-0.5 bg-amber-500 mt-5 mx-auto reveal-layer-hidden reveal-desc-node" />
        </div>
      </section>

      {/* 3. CORE SERVICE OVERVIEW */}
      <section className="py-10 bg-[#030814]/40 border-b border-white/[0.02]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-sans text-xs md:text-sm text-slate-400 leading-relaxed font-light reveal-layer-hidden reveal-desc-node">
            We provide reliable airport transfers and contract coach hire across Bedfordshire and North Hertfordshire. Our modern, unmarked fleet of executive minibuses and coaches is ready to keep your group moving smoothly.
          </p>
        </div>
      </section>

      {/* 4. THREE-CARD CAPABILITY GRID */}
      <section className="py-24 relative z-10 border-b border-white/5 bg-[#050C1A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-10px font-extrabold text-amber-400 uppercase tracking-[0.2em] mb-4 block reveal-layer-hidden reveal-label-node">
              Luton Gateway Operations Active
            </span>
            <h2 className="font-serif text-3xl md:text-4.5xl text-white font-medium leading-tight reveal-layer-hidden reveal-header-node">
              Airport &amp; Regional Travel Services
            </h2>
            <div className="w-12 h-1 bg-amber-500/80 mx-auto mt-6 rounded-full reveal-layer-hidden reveal-desc-node" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {sectorCards.map((card, idx) => (
              <div 
                key={idx}
                className={cn(
                  "flex flex-col justify-between p-8 md:p-10 rounded-2xl border transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl reveal-layer-hidden reveal-card-node",
                  card.bgClass
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                      Luton Gateway Operations Active
                    </span>
                    <span className="text-[9px] font-semibold bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded uppercase font-mono">
                      SERVICE {idx + 1}
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
                  onClick={() => handleActionClick("Luton & Regional Access")}
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

      {/* 5. DEEP SEMANTIC LOCAL AIEO KEYWORD & AVIATION INTEGRATION */}
      <section className="py-16 bg-[#030814]/60 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="font-sans text-xs text-slate-400 leading-relaxed font-light tracking-wide reveal-layer-hidden reveal-desc-node">
            We provide premium Luton airport coach hire and luxury minibus services across Bedfordshire and Hertfordshire. Our unmarked vehicles support group travel, corporate events, and direct airport transfers. Whether you are arranging standard coach travel or require minibus hire for a private group, our experienced team ensures a reliable and professional service from start to finish.
          </p>
        </div>
      </section>

      {/* 6. COCH & MINIBUS TRAVEL SERVICES */}
      <section id="luton-kpi-table" className="py-24 border-b border-white/5 bg-[#050C1A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="font-mono text-10px font-extrabold text-amber-400 uppercase tracking-[0.25em] block mb-3 reveal-layer-hidden reveal-label-node">
              Our Fleet and Services Overview
            </span>
            <h2 className="font-serif text-3xl md:text-4.5xl leading-tight text-white reveal-layer-hidden reveal-header-node">
              Luton Airport Transfer Coverage
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-400 font-light max-w-2xl mx-auto leading-relaxed mt-4 reveal-layer-hidden reveal-desc-node">
              Reliable flight and crew transport options built for airport terminals, hotels, and businesses across the region.
            </p>
          </div>

          <div className="w-full overflow-hidden border border-white/10 rounded-2xl bg-[#091120] shadow-2xl reveal-layer-hidden reveal-card-node">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/10 bg-[#0B1528] text-[#8A99AD] font-mono text-[10px] md:text-xs uppercase tracking-wider">
                    <th className="py-6 px-6 md:px-8 font-semibold">Coverage Area</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Allocated Vehicle Types</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Typical Group Travel Services</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05] text-slate-300">
                  <tr className="hover:bg-white/[0.02] transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-white">
                      Luton Core &amp; Airport Perimeter (LU1, LU2, LU3, LU4)
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      10 to 16 Seat Executive Luxury Minibuses configured for high volume transfers
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light text-slate-450">
                      High-capacity airport flight links, crew shuttles, and FBO terminal movements.
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-white">
                      Dunstable Industrial Zones (LU5, LU6)
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      Luxury 29 to 35 Seat Midi Coaches (100% Unbranded) with ergonomic seats and overhead compartments
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light text-slate-450">
                      Corporate employee shuttles, shift rotations, and logistics facility transit.
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-white">
                      Hitchin &amp; Stevenage Hubs (SG1, SG4, SG5)
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      49 to 53 Seat Elite Grand Tourers for premium high volume movements
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light text-slate-450">
                      Long-distance corporate event movements, academic charters, and festival loops.
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

      {/* 7. FAQ SCHEMA ACCORDION */}
      <section 
        className="py-24 bg-[#050C1A] border-b border-white/5"
        itemScope 
        itemType="https://schema.org/FAQPage"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-mono text-10px font-extrabold text-amber-500 uppercase tracking-[0.25em] block mb-3 reveal-layer-hidden reveal-label-node">
              AVIATION OPERATIONS FAQ
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-medium reveal-layer-hidden reveal-header-node">
              Luton Airport Logistics Q&amp;A
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-400 font-light mt-3 max-w-lg mx-auto reveal-layer-hidden reveal-desc-node">
              Addressing airline flight rescue logistics, FBO terminal clearance standards, and unbranded fleet placements.
            </p>
          </div>

          <div className="space-y-4">
            <div 
              className="border border-white/10 bg-[#091120] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md reveal-layer-hidden reveal-card-node"
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
                  How does UGO respond to sudden airline flight diversions or short-notice scheduling updates at Luton Airport?
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
                  Our centralised human dispatch base functions 24/7 to counter regional transit disruptions. We maintain immediate standby asset availability, enabling us to mobilise large-capacity unbranded coaches and executive minibuses at short notice to rescue delayed flight groups or misplaced airline crews.
                </div>
              </div>
            </div>

            <div 
              className="border border-white/10 bg-[#091120] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md reveal-layer-hidden reveal-card-node"
              itemProp="mainEntity"
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => toggleFaq(2)}
                className="w-full flex items-center justify-between text-left p-6 md:p-7 focus:outline-none cursor-pointer group"
              >
                <span 
                  className="font-serif text-base md:text-lg text-white font-medium group-hover:text-amber-400 transition-colors duration-200 pr-3"
                  itemProp="name"
                >
                  Do your vehicles possess specialised clearance to service private jet terminals (FBOs) at Luton?
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
                  Yes. Our professional driving network is deeply experienced with the security screening and staging requirements at Harrods Aviation and Signature Flight Support terminals. We guarantee seamless, completely unbranded vehicle placement directly at private aviation gateways for ultimate confidentiality.
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
          <span className="font-mono text-[9px] font-extrabold text-amber-500 uppercase tracking-[0.3em] block mb-4 reveal-layer-hidden reveal-label-node">
            FLIGHT GATEWAY ACTIVATION
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6 leading-tight reveal-layer-hidden reveal-header-node">
            Structure Local Luton Transit
          </h2>
          <p className="font-sans text-slate-350 text-xs md:text-base leading-relaxed max-w-2xl mx-auto mb-10 font-light reveal-layer-hidden reveal-desc-node">
            Co-ordinate high volume airline rescues, Harrods FBO delegations, or regional Stevenage commuter grids with absolute security. Transition below to align flight co-ordinates.
          </p>

          <button
            onClick={() => handleActionClick("Luton & Regional Access")}
            className="group inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] pointer-events-auto cursor-pointer reveal-layer-hidden reveal-btn-node"
          >
            Launch Gateway Booking Engine
            <ArrowRight className="w-4 h-4 text-slate-950 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
