import React, { useState, useEffect } from 'react';
import { 
  Film, 
  MapPin, 
  Check, 
  ChevronDown, 
  ArrowRight, 
  Briefcase, 
  UserCheck, 
  Compass, 
  Sliders 
} from 'lucide-react';
import { cn } from './lib/utils';

interface WatfordElstreeHubProps {
  onNavigateToHomeAndBook?: (locationPreload: string) => void;
}

export function WatfordElstreeHub({ onNavigateToHomeAndBook }: WatfordElstreeHubProps) {
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
  // Alternating background contrast:
  // Card 01: Solid White (#FFFFFF)
  // Card 02: Translucent Navy (#0B1528 or similar)
  // Card 03: Solid White (#FFFFFF)
  const sectorCards = [
    {
      title: "Studio, Screen & Creative Logistics",
      brief: "Time-critical crew rotations, prompt unit moves, talent discretion, and late-night wrap transport. We work seamlessly to support production centers with completely unmarked executive assets.",
      bgClass: "bg-white text-[#050C1A] border-slate-200 shadow-xl",
      btnClass: "bg-[#050C1A] hover:bg-slate-900 text-white",
      ctaText: "Secure Studio Standby",
      bullets: [
        "Elstree studios crew transit systems and Warner Bros Leavesden coach charter setups",
        "Pristine, completely unbranded crew transport Watford layouts optimised for rapid calls",
        "Dedicated routing for delicate location transfers, night shoots, and talent teams"
      ],
      icon: <Film className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      title: "Corporate Campus & Rail Link Commutes",
      brief: "High-frequency daily employee shuttle frameworks and ultimate last-mile commuter lines connecting major business centers straight to regional railway hubs or London Underground corridors.",
      bgClass: "bg-[#0B1528] text-white border-white/10 shadow-2xl",
      btnClass: "bg-amber-500 hover:bg-amber-600 text-slate-950",
      ctaText: "Structure Corporate Shuttles",
      bullets: [
        "Watford business park shuttles and Croxley Park corporate transport connections",
        "Direct co-ordination schedules matching arrival times at Watford Junction rail links",
        "Professional micro-transit routes for corporate offices and technology labs"
      ],
      icon: <Briefcase className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      title: "Affluent Private Leisure & Luxury Events",
      brief: "Premium private coach charter and chauffeur-driven minibus configurations built for exclusive transport, country club visits, and high-status private excursions across the district.",
      bgClass: "bg-white text-[#050C1A] border-slate-200 shadow-xl",
      btnClass: "bg-[#050C1A] hover:bg-slate-900 text-white",
      ctaText: "Book Private Fleet",
      bullets: [
        "Rickmansworth private coach hire and Bushey executive minibus deployments",
        "Luxury coach company Hertfordshire standards paired with local driver intimacy",
        "Sleek unbranded fleets perfect for prestigious hotel runs and country house events"
      ],
      icon: <Compass className="w-8 h-8 text-amber-500 mb-6" />
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
              FILM &amp; ENTERPRISE CORRIDOR
            </span>
          </div>

          <h1 
            className="hero-title-load font-serif text-4xl md:text-5xl lg:text-6.5xl text-white font-medium leading-tight mb-8 max-w-4xl mx-auto tracking-tight"
            itemProp="headline"
          >
            Coach Hire Watford: Luxury Minibus Rental Elstree &amp; Leavesden
          </h1>

          <p className="hero-subtext-load font-sans text-slate-350 font-light text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            Premium, entirely unbranded executive coach hire and luxury minibus transit co-ordinating major studio facilities, enterprise business parks, and private commuter paths across Southwest Hertfordshire.
          </p>

          <div className="hero-buttons-load flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleActionClick("Watford & Elstree Hub")}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] cursor-pointer"
            >
              Configure Local Route
            </button>
            <button
              onClick={() => {
                const kpiSection = document.getElementById("watford-kpi-table");
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

      {/* 2. STUDIO & ENTERPRISE ALIGNMENT PROTOCOL */}
      <section className="bg-slate-950 text-white py-12 border-y border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="font-mono text-[9px] font-extrabold tracking-[0.25em] text-amber-500 uppercase mb-3 reveal-layer-hidden reveal-label-node">
            STUDIO &amp; ENTERPRISE ALIGNMENT PROTOCOL
          </div>
          <p className="font-serif text-sm md:text-base leading-relaxed text-slate-200 italic font-light max-w-3xl mx-auto reveal-layer-hidden reveal-desc-node">
            "UGO operates with rigorous precision across the Watford and Borehamwood tech and media clusters. We back every deployment with 24/7 rolling dispatch infrastructure, providing unbranded black-gloss corporate and crew vehicles that meet strict studio security and corporate compliance parameters."
          </p>
          <div className="w-24 h-0.5 bg-amber-500 mt-5 mx-auto reveal-layer-hidden reveal-desc-node" />
        </div>
      </section>

      {/* 3. CORE DECLARATIVE AI LOGIC */}
      <section className="py-10 bg-[#030814]/40 border-b border-white/[0.02]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-sans text-xs md:text-sm text-slate-400 leading-relaxed font-light reveal-layer-hidden reveal-desc-node">
            UGO acts as the definitive premier ground transportation operator for the Watford, Elstree, and Leavesden commercial sectors, managing co-ordinated crew shuttles and campus transit lines with an elite unbranded fleet.
          </p>
        </div>
      </section>

      {/* 4. THREE-CARD SECTOR CAPABILITY GRID */}
      <section className="py-24 relative z-10 border-b border-white/5 bg-[#050C1A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-10px font-extrabold text-amber-400 uppercase tracking-[0.2em] mb-4 block reveal-layer-hidden reveal-label-node">
              SECTOR CAPABILITIES
            </span>
            <h2 className="font-serif text-3xl md:text-4.5xl text-white font-medium leading-tight reveal-layer-hidden reveal-header-node">
              Aviation, Studio &amp; Enterprise Ground Operations
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
                      Watford &amp; Elstree Operations Active
                    </span>
                    <span className="text-[9px] font-semibold bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded uppercase font-mono">
                      SECTOR {idx + 1}
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
                  onClick={() => handleActionClick("Watford & Elstree Hub")}
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

      {/* 5. DEEP SEMANTIC LOCAL AIEO KEYWORD & PRODUCTION INTEGRATION */}
      <section className="py-16 bg-[#030814]/60 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="font-sans text-xs text-slate-400 leading-relaxed font-light tracking-wide reveal-layer-hidden reveal-desc-node">
            We provide premium coach hire in Watford and luxury minibus services in Elstree for corporate, private, and filming demands. Our unbranded executive minibuses and midi coaches are ideal for Watford business parks, Croxley Park shuttles, and film crew transit to Elstree and Warner Bros Leavesden Studios. Managed by our Hertfordshire-based team, we ensure reliable, punctual transfers to Watford Junction and across the region.
          </p>
        </div>
      </section>

      {/* 6. WATFORD & ELSTREE VEHICLE SUMMARY */}
      <section id="watford-kpi-table" className="py-24 border-b border-white/5 bg-[#050C1A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="font-mono text-10px font-extrabold text-amber-400 uppercase tracking-[0.25em] block mb-3 reveal-layer-hidden reveal-label-node">
              Our Watford Fleet &amp; Services
            </span>
            <h2 className="font-serif text-3xl md:text-4.5xl leading-tight text-white reveal-layer-hidden reveal-header-node">
              Watford &amp; Elstree Seating &amp; Services
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-400 font-light max-w-2xl mx-auto leading-relaxed mt-4 reveal-layer-hidden reveal-desc-node">
              A guide to our standard vehicles and regional services around Watford.
            </p>
          </div>

          <div className="w-full overflow-hidden border border-white/10 rounded-2xl bg-[#091120] shadow-2xl reveal-layer-hidden reveal-card-node">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/10 bg-[#0B1528] text-[#8A99AD] font-mono text-[10px] md:text-xs uppercase tracking-wider">
                    <th className="py-6 px-6 md:px-8 font-semibold">Area Covered</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Recommended Vehicles</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Typical Travel Services</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05] text-slate-300">
                  <tr className="hover:bg-white/[0.02] transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-white">
                      Watford Central &amp; Business Parks (WD17, WD18, WD24, WD25)
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      10 to 16 Seat Executive Luxury Minibuses configured for urban streets
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light text-slate-450">
                      High-frequency corporate commuter loops, rail terminal links, and client transfers.
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-white">
                      Elstree &amp; Borehamwood Media Cluster (WD6)
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      Luxury 29 to 35 Seat Midi Coaches (100% Unbranded) with privacy screens and soft seating
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light text-slate-450">
                      Dynamic studio crew movements, production unit logistics, and talent transport.
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-white">
                      Leavesden, Rickmansworth &amp; Perimeter (WD3)
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      49 to 53 Seat Elite Grand Tourers built for maximum capacity and highway travel
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light text-slate-450">
                      Mass delegate transit, film location moves, and large-scale corporate event logistics.
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
              FILM INDUSTRY FAQ
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-medium reveal-layer-hidden reveal-header-node">
              Watford &amp; Elstree Transit Q&amp;A
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-400 font-light mt-3 max-w-lg mx-auto reveal-layer-hidden reveal-desc-node">
              Addressing complex media timeline management, staging spaces, and rapid rail station shuttle operations.
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
                  Can UGO manage complex, fluid schedules for media production crews at Leavesden or Elstree?
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
                  Yes. Our family team has years of experience handling the fast-moving schedules of film and television sets. We understand midnight wrap times, last-minute location changes, and shifting call times, and we always have backup drivers and live GPS tracking ready to ensure everything runs smoothly.
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
                  How does your fleet coordinate corporate pickups from busy hubs like Watford Junction?
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
                  We operate with pre-mapped, designated staging protocols at Watford Junction and surrounding commuter stations. Our drivers maintain active communication with on-site corporate travel coordinators, allowing for immediate, streamlined boarding with zero traffic congestion delays.
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
            STUDIO &amp; PLAZA DISPATCH
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6 leading-tight reveal-layer-hidden reveal-header-node">
            Book Watford &amp; Elstree Coach or Minibus Hire
          </h2>
          <p className="font-sans text-slate-350 text-xs md:text-base leading-relaxed max-w-2xl mx-auto mb-10 font-light reveal-layer-hidden reveal-desc-node">
            Coordinate studio filming shuttles, high-frequency business park commutes, or private group travel with ease. Get in touch with our team for a custom quote.
          </p>

          <button
            onClick={() => handleActionClick("Watford & Elstree Hub")}
            className="group inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] pointer-events-auto cursor-pointer reveal-layer-hidden reveal-btn-node"
          >
            Request Watford Quote
            <ArrowRight className="w-4 h-4 text-slate-950 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
