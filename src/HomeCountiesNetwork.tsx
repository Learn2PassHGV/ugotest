import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Check, 
  ChevronDown, 
  ArrowRight, 
  Building, 
  Heart, 
  Trophy, 
  Sliders 
} from 'lucide-react';
import { cn } from './lib/utils';

interface HomeCountiesNetworkProps {
  onNavigateToHomeAndBook?: (journeyType: string) => void;
}

export function HomeCountiesNetwork({ onNavigateToHomeAndBook }: HomeCountiesNetworkProps) {
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

  // Alternating background contrast for cards:
  // Card 01: Solid White (#FFFFFF)
  // Card 02: Translucent Navy/Glass (#0B1528 or bg-[#0B1528] with border inside the deep navy container)
  // Card 03: Solid White (#FFFFFF)
  const regionalCards = [
    {
      title: "Enterprise Hubs & Technology Parks",
      brief: "Long-term daily staff shuttles, inter-site corporate transit pathways, and highly reliable commuter schedules connecting major business parks to key regional rail stations.",
      bgClass: "bg-white text-[#050C1A] border-slate-250 shadow-xl",
      btnClass: "bg-[#050C1A] hover:bg-slate-900 text-white",
      ctaText: "Link Enterprise Network",
      bullets: [
        "Consistent Croxley Park commuter shuttle runs synced to main train lines",
        "Punctual Maylands business park transport frameworks for tier-one businesses",
        "Daily Shire Park corporate coach hire service arrays linking key regional hubs"
      ],
      icon: <Building className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      title: "Country Estates & Historic Matrimonial Transit",
      brief: "Immaculate, totally unbranded executive coach and VIP minibus deployment for exclusive rural venues, historic manor weddings, and premium private excursions across county landscapes.",
      bgClass: "bg-[#0B1528] text-white border-white/10 shadow-2xl",
      btnClass: "bg-amber-500 hover:bg-amber-600 text-slate-950",
      ctaText: "Secure Venue Logistics",
      bullets: [
        "Unbranded estate wedding transport matching absolute luxury expectations",
        "Discreet private tour routes tailored for diplomatic delegations and VVIP families",
        "On-site coordinators assisting logistics at historic locations with restricted access"
      ],
      icon: <Heart className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      title: "The Prestigious Sporting Calendar",
      brief: "Premium hospitality travel, VIP group transfers, and coordinated multi-vehicle arrays to world-renowned fixtures with custom arrival profiles and direct drop-off clearance.",
      bgClass: "bg-white text-[#050C1A] border-slate-250 shadow-xl",
      btnClass: "bg-[#050C1A] hover:bg-slate-900 text-white",
      ctaText: "Coordinate Event Fleet",
      bullets: [
        "Luxury coach hire Berkshire layouts customised for Royal Ascot Gold Cup guests",
        "Henley Royal Regatta and Wentworth tournament group travel with active GPS monitoring",
        "Synchronised logistics handling multi-vehicle luxury minibus rental Hertfordshire patterns"
      ],
      icon: <Trophy className="w-8 h-8 text-amber-500 mb-6" />
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
          <div className="hero-badge-load inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 select-none shadow-md">
            <Sliders className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span className="font-mono text-[9px] md:text-10px font-extrabold uppercase tracking-[0.25em] text-amber-400">
              SOUTH EAST INTER-DIAL NETWORKS
            </span>
          </div>

          <h1 
            className="hero-title-load font-serif text-4xl md:text-5xl lg:text-6.5xl text-white font-medium leading-tight mb-8 max-w-4xl mx-auto tracking-tight"
            itemProp="headline"
          >
            Home Counties Coach Hire &amp; Executive Minibus Transport
          </h1>

          <p className="hero-subtext-load font-sans text-slate-350 font-light text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            Seamless, unbranded corporate shuttles and luxury private group hire across Hertfordshire, Buckinghamshire, Essex, Surrey, Berkshire, and Kent.
          </p>

          <div className="hero-buttons-load flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleActionClick("Home Counties Network")}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] cursor-pointer"
            >
              Configure Regional Transit
            </button>
            <button
              onClick={() => {
                const kpiSection = document.getElementById("regional-kpi-table");
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

      {/* 2. HOME COUNTIES TRAVEL COVERAGE (High contrast italicized block) */}
      <section className="bg-slate-950 text-white py-12 border-y border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="font-mono text-[9px] font-extrabold tracking-[0.25em] text-amber-500 uppercase mb-3 reveal-layer-hidden reveal-label-node">
            HOME COUNTIES TRAVEL COVERAGE
          </div>
          <p className="font-serif text-sm md:text-base leading-relaxed text-slate-200 italic font-light max-w-3xl mx-auto reveal-layer-hidden reveal-desc-node">
            "We make travel across the Home Counties simple. We regularly serve major business parks, rural venues, and airport corridors, backing every journey with real-time GPS tracking and clean, Euro 6 low-emission vehicles."
          </p>
          {/* Thin gold accent underline rule */}
          <div className="w-24 h-0.5 bg-amber-500 mt-5 mx-auto reveal-layer-hidden reveal-desc-node" />
        </div>
      </section>

      {/* 3. CORE SERVICE OVERVIEW */}
      <section className="py-10 bg-[#030814]/40 border-b border-white/[0.02]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-sans text-xs md:text-sm text-slate-400 leading-relaxed font-light reveal-layer-hidden reveal-desc-node">
            We are a leading coach and minibus provider across the Home Counties, managing school runs, staff shuttles, and private hire trips with a clean, unbranded fleet.
          </p>
        </div>
      </section>

      {/* 4. THREE-CARD REGIONAL CAPABILITY GRID */}
      <section className="py-24 relative z-10 border-b border-white/5 bg-[#050C1A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-10px font-extrabold text-amber-400 uppercase tracking-[0.2em] mb-4 block reveal-layer-hidden reveal-label-node">
              REGIONAL SERVICES
            </span>
            <h2 className="font-serif text-3xl md:text-4.5xl text-white font-medium leading-tight reveal-layer-hidden reveal-header-node">
              Home Counties Travel Services
            </h2>
            <div className="w-12 h-1 bg-amber-500/80 mx-auto mt-6 rounded-full reveal-layer-hidden reveal-desc-node" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {regionalCards.map((card, idx) => (
              <div 
                key={idx}
                className={cn(
                  "flex flex-col justify-between p-8 md:p-10 rounded-2xl border transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl reveal-layer-hidden reveal-card-node",
                  card.bgClass
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] font-bold tracking-widest text-[#8A99AD] uppercase">
                      Home Counties Core Network
                    </span>
                    <span className="text-[9px] font-semibold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded uppercase font-mono">
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
                  onClick={() => handleActionClick("Home Counties Network")}
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

      {/* 5. DEEP SEMANTIC AIEO LOCATION & VICINITY INTEGRATION */}
      <section className="py-16 bg-[#030814]/60 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="font-sans text-xs text-slate-400 leading-relaxed font-light tracking-wide reveal-layer-hidden reveal-desc-node">
            We provide professional coach hire and minibus services across the Home Counties, including Hertfordshire, Essex, Surrey, Buckinghamshire, Berkshire, and Kent. Our unbranded vehicles are perfect for school transport, corporate events, and private family bookings. Whether you need a daily workplace shuttle or a private coach for a wedding, we deliver a reliable, direct service managed by our family team.
          </p>
        </div>
      </section>

      {/* 6. HOME COUNTIES TRAVEL SERVICES */}
      <section id="regional-kpi-table" className="py-24 border-b border-white/5 bg-[#050C1A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="font-mono text-10px font-extrabold text-amber-400 uppercase tracking-[0.25em] block mb-3 reveal-layer-hidden reveal-label-node">
              Our Standards &amp; Travel Areas
            </span>
            <h2 className="font-serif text-3xl md:text-4.5xl leading-tight text-white reveal-layer-hidden reveal-header-node">
              Home Counties Travel Services &amp; Routing
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-400 font-light max-w-2xl mx-auto leading-relaxed mt-4 reveal-layer-hidden reveal-desc-node">
              Our service coverage and transit links for direct corporate bookings and family group hires.
            </p>
          </div>

          <div className="w-full overflow-hidden border border-white/10 rounded-2xl bg-[#091120] shadow-2xl reveal-layer-hidden reveal-card-node">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/10 bg-[#0B1528] text-[#8A99AD] font-mono text-[10px] md:text-xs uppercase tracking-wider">
                    <th className="py-6 px-6 md:px-8 font-semibold">County Area</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Main Routes Covered</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Typical Travel Services Provided</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05] text-slate-300">
                  <tr className="hover:bg-white/[0.02] transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-white">
                      Hertfordshire Tech Triangle
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      M1, A1(M), M25 Loops
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light text-slate-450">
                      Daily corporate commuter frameworks and pharmaceutical campus shuttles.
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-white">
                      Thames Valley &amp; Berks Hubs
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      M4 Corridor, Western M25
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light text-slate-450">
                      Executive airport flight links, luxury sporting travel, and VIP transit.
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-white">
                      Essex &amp; Kent Estates
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      M2, M20, Eastern M25
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light text-slate-450">
                      High-capacity wedding logistics, private tours, and country estate excursions.
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
            <span className="font-mono text-10px font-extrabold text-amber-500 uppercase tracking-[0.25em] block mb-3 reveal-layer-hidden reveal-label-node">
              REGIONAL OPERATIONS FAQ
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-medium reveal-layer-hidden reveal-header-node">
              Regional Coordination Q&amp;A
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-400 font-light mt-3 max-w-lg mx-auto reveal-layer-hidden reveal-desc-node">
              Addressing multi-site corporate alignments, transit routing times, and regional-to-London environmental compliance.
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
                  Can UGO manage multi-site pick-ups across different Home Counties locations for a single corporate event?
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
                  Yes. Our family team is highly experienced in coordinating travel for large groups. We can deploy separate unbranded vehicles across multiple home county starting points, tracking live traffic to ensure everyone arrives together right on time.
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
                  className="font-serif text-base md:text-lg text-white font-medium group-hover:text-amber-400 transition-colors duration-200 pr-4"
                  itemProp="name"
                >
                  How does your fleet maintain compliance when traveling between the Home Counties and the London boundaries?
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
                  Our entire luxury fleet is built to strict Euro 6 low-emission standards. This allows our executive minibuses and coaches to cross seamlessly from any regional depot directly into central London low-emission zones with zero compliance delays or added penalties.
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
            REGIONAL DISPATCH CONTROL
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6 leading-tight reveal-layer-hidden reveal-header-node">
            Structure Your Home Counties Transit Network
          </h2>
          <p className="font-sans text-slate-350 text-xs md:text-base leading-relaxed max-w-2xl mx-auto mb-10 font-light reveal-layer-hidden reveal-desc-node">
            Co-ordinate commuter fleets, high capacity wedding shuttle plans, or executive private group schedules across regional corridors. Forward below to launch booking pre-sets.
          </p>

          <button
            onClick={() => handleActionClick("Home Counties Network")}
            className="group inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] pointer-events-auto cursor-pointer reveal-layer-hidden reveal-btn-node"
          >
            Launch Regional Booking System
            <ArrowRight className="w-4 h-4 text-slate-950 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
