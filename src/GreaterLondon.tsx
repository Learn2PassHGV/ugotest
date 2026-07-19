import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Check, 
  ChevronDown, 
  ArrowRight, 
  Coins, 
  Crown, 
  Compass, 
  Sliders 
} from 'lucide-react';
import { cn } from './lib/utils';

interface GreaterLondonProps {
  onNavigateToHomeAndBook?: (journeyType: string) => void;
}

export function GreaterLondon({ onNavigateToHomeAndBook }: GreaterLondonProps) {
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

  // 3-Card Capital Capability Grid alternating contrast:
  // Card 01: Deep Navy (#050C1A)
  // Card 02: Solid White (#FFFFFF)
  // Card 03: Deep Navy (#050C1A)
  const capitalCards = [
    {
      title: "Financial Districts Core: City & Canary Wharf",
      brief: "Reliable travel planning for financial roadshows, executive shuttles, and real-time route coordination to keep your group on schedule.",
      bgClass: "bg-[#050C1A] text-white border-white/5 shadow-2xl",
      btnClass: "bg-amber-500 hover:bg-amber-600 text-slate-950",
      ctaText: "Request a London Quote",
      bullets: [
        "Time-critical Canary Wharf corporate transport loops and multi-stop transfers",
        "Impeccable City of London financial roadshow travel with vetted, professional drivers",
        "Unbranded executive vehicles built for team trips and corporate events"
      ],
      icon: <Building2 className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      title: "Royal Boroughs Discretion: Mayfair, Kensington & Chelsea",
      brief: "Pristine, completely unmarked luxury fleet deployment for shopping trips, diplomatic travel, private airport transfers, and hospitality events.",
      bgClass: "bg-white text-[#050C1A] border-slate-250/80 shadow-xl",
      btnClass: "bg-[#050C1A] hover:bg-slate-900 text-white",
      ctaText: "Reserve Private Hire",
      bullets: [
        "Exclusive Mayfair private chauffeur minibus options featuring absolute privacy glass",
        "Kensington luxury group travel solutions tailored for high-profile guests",
        "Discreet unbranded VIP vehicles operating on highly confidential schedules"
      ],
      icon: <Crown className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      title: "Civic & Cultural Hubs: Westminster & The West End",
      brief: "High capacity transport coordination for conferences, theatre group travel, media campaigns, and large-scale hospitality events across central London.",
      bgClass: "bg-[#050C1A] text-white border-white/5 shadow-2xl",
      btnClass: "bg-amber-500 hover:bg-amber-600 text-slate-950",
      ctaText: "Get a London Quote",
      bullets: [
        "Dynamic Westminster event ground logistics designed for large delegate summits",
        "Highly coordinated West End theatre coach hire arrays operating flawlessly at peak times",
        "Flexible Southwark and Camden executive shuttles adapted to restricted historic roads"
      ],
      icon: <Compass className="w-8 h-8 text-amber-500 mb-6" />
    }
  ];

  return (
    <div 
      className="bg-[#F9F9FB] min-h-screen text-[#050C1A] font-sans"
      itemScope 
      itemType="https://schema.org/WebPage"
    >
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#F0F2F6] pt-32 pb-16 md:pt-40 md:pb-24 border-b border-slate-200">
        <div className="absolute top-0 left-0 w-[420px] h-[420px] bg-slate-100/80 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-0 right-0 w-[520px] h-[520px] bg-slate-200/50 rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          
          {/* Micro-tag */}
          <div className="hero-badge-load inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/15 mb-6 select-none shadow-sm">
            <Sliders className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span className="font-mono text-[9px] md:text-10px font-extrabold uppercase tracking-[0.25em] text-[#050C1A]">
              LONDON GROUP TRAVEL
            </span>
          </div>

          <h1 
            className="hero-title-load font-serif text-4xl md:text-5xl lg:text-6.5xl text-slate-950 font-medium leading-tight mb-8 max-w-4xl mx-auto tracking-tight"
            itemProp="headline"
          >
            Greater London Coach &amp; Minibus Hire
          </h1>

          <p className="hero-subtext-load font-sans text-slate-600 font-light text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            Premium, unbranded coaches and minibuses for business and private group travel across the City of London, Canary Wharf, Westminster, and the surrounding areas.
          </p>

          <div className="hero-buttons-load flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleActionClick("Greater London Central Coverage")}
              className="w-full sm:w-auto bg-slate-950 hover:bg-slate-900 text-white font-sans text-xs uppercase tracking-[0.2em] font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] cursor-pointer"
            >
              Get a London Quote
            </button>
            <button
              onClick={() => {
                const kpiSection = document.getElementById("london-kpi-table");
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

      {/* 2. LONDON TRAVEL COVERAGE PANEL (Dedicated dark navy background) */}
      <section className="bg-[#050C1A] text-white py-12 border-y border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="font-mono text-[9px] font-extrabold tracking-[0.25em] text-amber-500 uppercase mb-3 reveal-layer-hidden reveal-label-node">
            LONDON TRAVEL COVERAGE
          </div>
          <p className="font-serif text-sm md:text-base leading-relaxed text-slate-200 italic font-light max-w-3xl mx-auto reveal-layer-hidden reveal-desc-node">
            "We handle travel across London with absolute precision. Our fleet is fully Euro 6 and ULEZ compliant, combining real-time GPS tracking with clean, unbranded vehicles that are perfect for high-profile business boards and corporate events."
          </p>
          {/* Thin gold accent underline rule */}
          <div className="w-24 h-0.5 bg-amber-500 mt-5 mx-auto reveal-layer-hidden reveal-desc-node" />
        </div>
      </section>

      {/* 3. CORE SERVICE OVERVIEW */}
      <section className="py-10 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed font-light reveal-layer-hidden reveal-desc-node">
            We are a trusted coach and minibus hire company serving Greater London. We provide clean, unmarked luxury vehicles to make travel around the capital straightforward and stress-free.
          </p>
        </div>
      </section>

      {/* 4. THREE-CARD CAPITAL CAPABILITY GRID */}
      <section className="py-24 relative z-10 border-b border-slate-200 bg-[#F9F9FB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 id-card-grid-header">
            <span className="font-mono text-10px font-extrabold text-amber-600 uppercase tracking-[0.2em] mb-4 block reveal-layer-hidden reveal-label-node">
              METROPOLITAN SEGMENTS
            </span>
            <h2 className="font-serif text-3xl md:text-4.5xl text-slate-950 font-medium leading-tight reveal-layer-hidden reveal-header-node">
              Strategic London Ground Operations
            </h2>
            <div className="w-12 h-1 bg-amber-500/80 mx-auto mt-6 rounded-full reveal-layer-hidden reveal-desc-node" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {capitalCards.map((card, idx) => (
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
                      London Service Area
                    </span>
                    <span className="text-[9px] font-semibold bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded uppercase font-mono">
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
                  onClick={() => handleActionClick("Greater London Central Coverage")}
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

      {/* 5. BOROUGH & VICINITY TARGET INTEGRATION (SEO Anchor Points) */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="font-sans text-xs text-slate-500 leading-relaxed font-light tracking-wide reveal-layer-hidden reveal-desc-node">
            We provide professional coach hire and minibus services across Greater London. Our unbranded vehicles are perfect for City of London events, corporate commutes, private groups, and school transfers. Fully ULEZ compliant and managed by our experienced team, we ensure smooth travel across all London boroughs.
          </p>
        </div>
      </section>

      {/* 6. GREATER LONDON TRAVEL SUMMARY */}
      <section id="london-kpi-table" className="py-24 border-b border-slate-200 bg-[#F9F9FB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="font-mono text-10px font-extrabold text-amber-600 uppercase tracking-[0.25em] block mb-3 reveal-layer-hidden reveal-label-node">
              Our London Fleet &amp; Services
            </span>
            <h2 className="font-serif text-3xl md:text-4.5xl leading-tight text-slate-950 reveal-layer-hidden reveal-header-node">
              London Vehicle &amp; Area Access
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-600 font-light max-w-2xl mx-auto leading-relaxed mt-4 reveal-layer-hidden reveal-desc-node">
              Our unbranded coaches and minibuses are fully compliant with London's low emission zones and local regulations.
            </p>
          </div>

          <div className="w-full overflow-hidden border border-slate-200 rounded-2xl bg-white shadow-xl reveal-layer-hidden reveal-card-node">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-mono text-[10px] md:text-xs uppercase tracking-wider">
                    <th className="py-6 px-6 md:px-8 font-semibold">London Areas Served</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Recommended Vehicles</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Environmental Compliance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="hover:bg-slate-50/50 transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-slate-950">
                      Central Banking Core (EC/E14 Postcodes)
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      10 to 16 Seat Executive Minibuses featuring premium leather layouts and climate command boards
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light text-slate-600">
                      Full London ULEZ and Congestion Zone Compliant Tracking with unbranded premium graphics
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-slate-950">
                      Historic West End &amp; Civic Hubs
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      Luxury 29 to 35 Seat Midi Coaches with privacy window layouts and spacious aisle storage
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light text-slate-600">
                      Easy navigation of narrow city streets with real-time route updates and a dedicated support team
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-slate-950">
                      Metro Greater London Perimeter
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      49 to 53 Seat Elite Grand Tourers built for bulk corporate shuttle patterns and travel arrays
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light text-slate-600">
                      Reliable staff shuttles and multi-coach event loops with live GPS tracking
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
              METROPOLITAN COORDINATION FAQ
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-slate-950 font-medium reveal-layer-hidden reveal-header-node">
              Metropolitan Logistics Q&amp;A
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-600 font-light mt-3 max-w-lg mx-auto reveal-layer-hidden reveal-desc-node">
              Answering regulatory emission guidelines, congestion billing structures, and central London historic access restrictions.
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
                  How does UGO handle the London Congestion Charge and ULEZ emission zones?
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
                  Every single vehicle in our modern fleet is fully compliant with London Low Emission Zone guidelines. Our family team handles all congestion and low-emission zone charges automatically, including them directly in your initial quote so you face no hidden fees.
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
                  Can your executive midi coaches access tight historic drop-off zones in Central London?
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
                  Yes. While our grand tourers are perfect for open thoroughfares, we deploy specialised, agile luxury midi coaches and minibuses explicitly engineered to navigate restricted West End loading areas and historic hotel entrances safely.
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
            METROPOLITAN DISPATCH CONTROL
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6 leading-tight reveal-layer-hidden reveal-header-node">
            Book Your London Journey
          </h2>
          <p className="font-sans text-slate-300 text-xs md:text-base leading-relaxed max-w-2xl mx-auto mb-10 font-light reveal-layer-hidden reveal-desc-node">
            Coordinate event transport, pristine unbranded hotel transit loops, or large conference transfers with ease. Fill out our simple form to get started.
          </p>

          <button
            onClick={() => handleActionClick("Greater London Central Coverage")}
            className="group inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] pointer-events-auto cursor-pointer reveal-layer-hidden reveal-btn-node"
          >
            Request London Journey Quote
            <ArrowRight className="w-4 h-4 text-slate-950 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
