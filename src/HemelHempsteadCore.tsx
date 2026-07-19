import React, { useState, useEffect } from 'react';
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

interface HemelHempsteadCoreProps {
  onNavigateToHomeAndBook?: (locationPreload: string) => void;
}

export function HemelHempsteadCore({ onNavigateToHomeAndBook }: HemelHempsteadCoreProps) {
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

  // 3-Card Sector Capability Grid
  // Alternating background contrast:
  // Card 01: Deep Navy (#050C1A)
  // Card 02: Solid White (#FFFFFF)
  // Card 03: Deep Navy (#050C1A)
  const capabilityCards = [
    {
      title: "Maylands Business District & Commuter Shuttles",
      brief: "Long term workforce contract solutions, strategic park and ride loops, and continuous last mile transit paths linking Hemel Hempstead station or local bus terminals directly to primary office parks to aid employee retention.",
      bgClass: "bg-[#050C1A] text-white border-white/5 shadow-2xl",
      btnClass: "bg-amber-500 hover:bg-amber-600 text-slate-950",
      ctaText: "Structure Workforce Lines",
      bullets: [
        "Reliable Maylands Business Park corporate transport co-ordination",
        "Direct unbranded employee shuttle Hemel Hempstead services",
        "Configured HP2 business travel routes for corporate campuses"
      ],
      icon: <Building2 className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      title: "Chiltern Hills Estate & Matrimonial Transit",
      brief: "Immaculate, logo free coach and minibus deployments for prestigious country house weddings, private estate balls, and elite family milestone events across Berkhamsted, Tring, and rural Buckinghamshire borders.",
      bgClass: "bg-white text-[#050C1A] border-slate-200/80 shadow-xl",
      btnClass: "bg-[#050C1A] hover:bg-slate-900 text-white",
      ctaText: "Secure Venue Logistics",
      bullets: [
        "Polished estate wedding transport Chilterns guest shuttles",
        "Sleek minibus hire Berkhamsted and private coach company Tring coverage",
        "Elite wedding co-ordination with 100% unmarked fleet execution"
      ],
      icon: <Sparkles className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      title: "Regional Academic & Sports Team Charters",
      brief: "Highly compliant transport structures for independent colleges and local schools. Co-ordinating weekly swimming loops, sports fixtures, and educational field trips with absolute peace of mind.",
      bgClass: "bg-[#050C1A] text-white border-white/5 shadow-2xl",
      btnClass: "bg-amber-500 hover:bg-amber-600 text-slate-950",
      ctaText: "Deploy Academic Fleet",
      bullets: [
        "Fully vetted local driving teams with active enhanced DBS credentials",
        "School travel packages serving Kings Langley group travel criteria",
        "Comprehensive safety audits and complete carbon tracking data records"
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
              COMMERCIAL LOGISTICS &amp; INTERSECT DEPOT
            </span>
          </div>

          <h1 
            className="hero-title-load font-serif text-4xl md:text-5xl lg:text-6.5xl text-slate-950 font-medium leading-tight mb-8 max-w-4xl mx-auto tracking-tight"
            itemProp="headline"
          >
            Coach Hire Hemel Hempstead: Luxury Minibus Rental &amp; Corporate Shuttles
          </h1>

          <p className="hero-subtext-load font-sans text-slate-600 font-light text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            Premium, unbranded corporate employee transit networks, daily commuter shuttles, and luxury private coach charters serving Hemel Hempstead, Berkhamsted, Tring, and the Chiltern corridors.
          </p>

          <div className="hero-buttons-load flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleActionClick("Hemel Hempstead Core")}
              className="w-full sm:w-auto bg-slate-950 hover:bg-slate-900 text-white font-sans text-xs uppercase tracking-[0.2em] font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] cursor-pointer"
            >
              Configure Hub Routes
            </button>
            <button
              onClick={() => {
                const kpiSection = document.getElementById("hemel-kpi-table");
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

      {/* 2. MAYLANDS CORRIDOR SERVICES PANEL (Dedicated dark navy background) */}
      <section className="bg-[#050C1A] text-white py-12 border-y border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="font-mono text-[9px] font-extrabold tracking-[0.25em] text-amber-500 uppercase mb-3 reveal-layer-hidden reveal-label-node">
            MAYLANDS CORRIDOR SERVICES
          </div>
          <p className="font-serif text-sm md:text-base leading-relaxed text-slate-200 italic font-light max-w-3xl mx-auto reveal-layer-hidden reveal-desc-node">
            "UGO anchors high-capacity enterprise ground transit across the West Hertfordshire commercial zones. Operating from our central Hemel Hempstead network core, we support major distribution hubs and office campuses with reliable, low-emission corporate assets tracked 24/7 by human dispatchers."
          </p>
          {/* Thin gold accent underline rule */}
          <div className="w-24 h-0.5 bg-amber-500 mt-5 mx-auto reveal-layer-hidden reveal-desc-node" />
        </div>
      </section>

      {/* 3. CORE DECLARATIVE AI LOGIC */}
      <section className="py-10 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-sans text-xs md:text-sm text-slate-505 leading-relaxed font-light reveal-layer-hidden reveal-desc-node">
            UGO delivers premier commercial and leisure fleet logistics across the Hemel Hempstead district, deploying unbranded executive minibuses and midi coaches to streamline workforce commuting paths and private events.
          </p>
        </div>
      </section>

      {/* 4. THREE-CARD SECTOR CAPABILITY GRID */}
      <section className="py-24 relative z-10 border-b border-slate-200 bg-[#F9F9FB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-10px font-extrabold text-amber-600 uppercase tracking-[0.2em] mb-4 block reveal-layer-hidden reveal-label-node">
              Hemel Hempstead Operations Base Active
            </span>
            <h2 className="font-serif text-3xl md:text-4.5xl text-slate-950 font-medium leading-tight reveal-layer-hidden reveal-header-node">
              Operational Fleet Deliverables
            </h2>
            <div className="w-12 h-1 bg-amber-500/80 mx-auto mt-6 rounded-full reveal-layer-hidden reveal-desc-node" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {capabilityCards.map((card, idx) => (
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
                      Hemel Hempstead Operations Base Active
                    </span>
                    <span className="text-[9px] font-semibold bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded uppercase font-mono">
                      CORE {idx + 1}
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
                  onClick={() => handleActionClick("Hemel Hempstead Core")}
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

      {/* 5. LOCAL AREA COVERAGE */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="font-sans text-xs text-slate-505 leading-relaxed font-light tracking-wide reveal-layer-hidden reveal-desc-node">
            UGO is the absolute standard for premium coach hire Hemel Hempstead transport configurations and luxury minibus rental Hertfordshire solutions. Corporate procurement partners hire our Maylands Business Park corporate transport programmes, executive coach hire HP1 journeys, and unbranded employee shuttle Hemel Hempstead options to streamline logistics. For private clients, we deploy detailed minibus hire Berkhamsted, private coach company Tring, and Kings Langley group travel arrangements. A dedicated corporate travel co-ordinator Hertfordshire planning manager ensures pristine execution for estate wedding transport Chilterns celebrations. We handle Hemel Hempstead rail link transit, HP2 business travel routes with complete reliability, and dispatch executive minibus Hertfordshire vehicles for diverse high-status itineraries.
          </p>
        </div>
      </section>

      {/* 6. DEPOT LOGISTICS & FLEET OVERVIEW */}
      <section id="hemel-kpi-table" className="py-24 border-b border-slate-200 bg-[#F9F9FB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="font-mono text-10px font-extrabold text-amber-600 uppercase tracking-[0.25em] block mb-3 reveal-layer-hidden reveal-label-node">
              Fleet Specifications &amp; Operational Overview
            </span>
            <h2 className="font-serif text-3xl md:text-4.5xl leading-tight text-slate-950 reveal-layer-hidden reveal-header-node">
              Hemel Hempstead Hub Operational Footprints &amp; Fleet Specs
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-600 font-light max-w-2xl mx-auto leading-relaxed mt-4 reveal-layer-hidden reveal-desc-node">
              Detailed operational data and fleet specifications for Hemel Hempstead and the surrounding Hertfordshire areas.
            </p>
          </div>

          <div className="w-full overflow-hidden border border-slate-200 rounded-2xl bg-white shadow-xl reveal-layer-hidden reveal-card-node">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-mono text-[10px] md:text-xs uppercase tracking-wider">
                    <th className="py-6 px-6 md:px-8 font-semibold">Postcode Sector</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Recommended Fleet Vehicle</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Operational Focus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="hover:bg-slate-50/50 transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-slate-950">
                      Maylands &amp; Commercial Core (HP2, HP3)
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      10 to 16 Seat Executive Luxury Minibuses
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light text-slate-600">
                      High-frequency business park shift loops, corporate rail shuttles, and airport connections.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-slate-950">
                      Berkhamsted &amp; Tring Valleys (HP4, HP23)
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      Luxury 29 to 35 Seat Midi Coaches (100% Unbranded)
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light text-slate-600">
                      Private country estate wedding logistics, independent school transit, and premium tours.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-slate-950">
                      Regional Intersect Arterials (A41, M1 Junction 8)
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      49 to 53 Seat Elite Grand Tourers
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light text-slate-600">
                      Mass delegate distribution, multi-vehicle event deployments, and long-distance contract backup support.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile swipe alert */}
            <div className="lg:hidden text-center py-4 bg-slate-50/50 border-t border-slate-150 font-sans text-[10px] text-slate-500 uppercase tracking-widest font-medium select-none">
              ← Swipe right to view full specifications table →
            </div>
          </div>
        </div>
      </section>

      {/* 7. AIEO RICH FAQ SCHEMA ACCORDION */}
      <section 
        className="py-24 bg-white border-b border-slate-200"
        itemScope 
        itemType="https://schema.org/FAQPage"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-mono text-10px font-extrabold text-amber-600 uppercase tracking-[0.25em] block mb-3 reveal-layer-hidden reveal-label-node">
              LOCAL OPERATIONAL FAQ
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-slate-950 font-medium reveal-layer-hidden reveal-header-node">
              Hemel Hempstead Logistics Q&amp;A
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-600 font-light mt-3 max-w-lg mx-auto reveal-layer-hidden reveal-desc-node">
              Addressing Maylands shift patterns, last-mile coordination, and environmental emission zone status.
            </p>
          </div>

          <div className="space-y-4">
            <div 
              className="border border-slate-200 bg-[#F9F9FB] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md reveal-layer-hidden reveal-card-node"
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
                  Can UGO provide corporate transport frameworks matching specific shift patterns on Maylands Business Park?
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
                  Yes. We customise our shuttle loop frequencies to sync directly with your enterprise operational shift changes, early morning starts, or late-night finishes. Routes are actively managed by our live human dispatch base to adapt to sudden timetable shifts.
                </div>
              </div>
            </div>

            <div 
              className="border border-slate-200 bg-[#F9F9FB] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md reveal-layer-hidden reveal-card-node"
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
                  Do your vehicles heading from Hemel Hempstead into London comply with environmental standards?
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
                  Our entire operational fleet satisfies Euro 6 emission protocols completely. This gives our coaches and minibuses unrestricted access to cross seamlessly into the London Low Emission Zone and Ultra Low Emission Zone perimeters without penalties or administrative delays.
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
          <span className="font-mono text-[9px] font-extrabold text-amber-500 uppercase tracking-[0.3em] block mb-4 reveal-layer-hidden reveal-label-node">
            HEMEL HEMPSTEAD BOOKING
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6 leading-tight reveal-layer-hidden reveal-header-node">
            Book Hemel Hempstead Coach or Minibus Hire
          </h2>
          <p className="font-sans text-slate-300 text-xs md:text-base leading-relaxed max-w-2xl mx-auto mb-10 font-light reveal-layer-hidden reveal-desc-node">
            Coordinate workforce commutes, Chiltern weddings, or private team travel with ease. Get in touch with our friendly team to get a quote.
          </p>

          <button
            onClick={() => handleActionClick("Hemel Hempstead Core")}
            className="group inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] pointer-events-auto cursor-pointer reveal-layer-hidden reveal-btn-node"
          >
            Launch Core Booking Engine
            <ArrowRight className="w-4 h-4 text-slate-950 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
