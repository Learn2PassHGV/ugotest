import React, { useState, useEffect } from 'react';
import { 
  Bus, 
  MapPin, 
  Check, 
  ChevronDown, 
  ArrowRight, 
  Activity, 
  Users, 
  ShieldAlert, 
  Clock, 
  Sliders 
} from 'lucide-react';
import { cn } from './lib/utils';

interface MassTransitShuttlesProps {
  onNavigateToHomeAndBook?: (journeyType: string) => void;
}

export function MassTransitShuttles({ onNavigateToHomeAndBook }: MassTransitShuttlesProps) {
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

  // Alternating background pattern:
  // Card 01: Deep Navy (#050C1A)
  // Card 02: Solid White (#FFFFFF)
  // Card 03: Deep Navy (#050C1A)
  const capacityCards = [
    {
      title: "Festival & Public Event Loops",
      brief: "Continuous group transport loops moving attendees smoothly during peak times between central rail hubs, remote car parks, and event main gates.",
      bgClass: "bg-[#050C1A] text-white border-white/5 shadow-2xl",
      btnClass: "bg-amber-500 hover:bg-amber-600 text-slate-950",
      ctaText: "Request Shuttle Quote",
      bullets: [
        "High frequency shuttle loops designed to transition peak passenger volumes",
        "Expert music festival coach hire routing around temporary remote terminals",
        "Dedicated festival coach operations preventing arrival gridlocks"
      ],
      icon: <Activity className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      title: "Stadium & High-Density Ingress",
      brief: "High-frequency shuttle operations with absolute schedule adherence, perfectly timed to match precise venue gates, stadium arrival sequences, and fast post-event crowd clearance.",
      bgClass: "bg-white text-[#050C1A] border-slate-200 shadow-xl",
      btnClass: "bg-[#050C1A] hover:bg-slate-900 text-white",
      ctaText: "Plan Stadium Travel",
      bullets: [
        "Efficient passenger loading systems for high-capacity event transport",
        "Coordinated shuttle links between stadiums, rail hubs and park-and-ride sites",
        "On-site transport marshals managing crowd flow and passenger safety"
      ],
      icon: <Users className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      title: "Emergency Rail & Standby Services",
      brief: "Immediate vehicle replacement, short-notice transport dispatch for public networks, and large corporate backups.",
      bgClass: "bg-[#050C1A] text-white border-white/5 shadow-2xl",
      btnClass: "bg-amber-500 hover:bg-amber-600 text-slate-950",
      ctaText: "Contact Standby Team",
      bullets: [
        "Rapid emergency fleet deployment across regional and urban UK transport lines",
        "Strategic park and ride shuttle contracts safeguarding peak public commuting lines",
        "Active 24/7 central co-ordination handling sudden fleet allocation updates"
      ],
      icon: <ShieldAlert className="w-8 h-8 text-amber-500 mb-6" />
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
        <div className="absolute top-0 left-0 w-[420px] h-[420px] bg-slate-100 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-0 right-0 w-[520px] h-[520px] bg-slate-200/40 rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          
          {/* Micro-tag */}
          <div className="service-badge-load inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/15 mb-6 select-none shadow-sm">
            <Sliders className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span className="font-mono text-[9px] md:text-10px font-extrabold uppercase tracking-[0.25em] text-[#050C1A]">
              HIGH-CAPACITY SHUTTLE OPERATIONS
            </span>
          </div>

          <h1 
            className="service-title-load font-serif text-4xl md:text-5xl lg:text-6.5xl text-slate-950 font-medium leading-tight mb-8 max-w-4xl mx-auto tracking-tight"
            itemProp="headline"
          >
            Mass Transit Shuttles: High-Capacity Event Fleet Operations
          </h1>

          <p className="service-subtext-load font-sans text-slate-650 font-light text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            Scalable, high-frequency shuttle networks and managed coach transit systems engineered for music festivals, major stadium fixtures, public exhibitions, and emergency rail infrastructure support across the United Kingdom.
          </p>

          {/* EVENT PASSENGER FLOW BLOCK */}
          <div className="service-subtext-load bg-slate-950 text-white border border-white/5 p-6 md:p-8 rounded-2xl max-w-3xl mx-auto my-8 shadow-2xl relative text-left">
            <div className="font-mono text-[9px] font-extrabold tracking-[0.25em] text-amber-500 uppercase mb-2 text-center sm:text-left">
              HIGH-VOLUME PASSENGER FLOW
            </div>
            <p className="font-serif text-sm md:text-base leading-relaxed text-slate-200 italic font-light text-center sm:text-left">
              "We handle the challenges of moving large crowds smoothly. We prevent arrival delays by using coordinated coach fleets, experienced on-site loading marshals, and real-time GPS tracking to transport thousands of event-goers seamlessly."
            </p>
            {/* Thin gold or signature orange accent underline rule */}
            <div className="w-24 h-0.5 bg-amber-500 mt-5 mx-auto sm:mx-0" />
          </div>

          {/* Service description */}
          <div className="service-subtext-load max-w-3xl mx-auto my-10 bg-slate-150/40 border border-slate-200 p-6 rounded-2xl">
            <p className="font-sans text-xs md:text-sm text-slate-600 leading-relaxed font-light">
              We design and run high-capacity event shuttle services, coordinating clean, unbranded coaches and midi coaches to bridge the gap between public transport hubs and large venues.
            </p>
          </div>

          <div className="service-buttons-load flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleActionClick("Mass Transit Shuttles")}
              className="w-full sm:w-auto bg-slate-950 hover:bg-slate-900 text-white font-sans text-xs uppercase tracking-[0.2em] font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] cursor-pointer"
            >
              Plan My Shuttle Operation
            </button>
            <button
              onClick={() => {
                const kpiSection = document.getElementById("transit-kpi-table");
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

      {/* 2. THREE-CARD CAPACITY GRID */}
      <section className="py-24 relative z-10 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <span className="reveal-layer-hidden reveal-sec-header font-mono text-10px font-extrabold text-amber-600 uppercase tracking-[0.2em] mb-4 block">
              OPERATIONAL MODES
            </span>
            <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-4.5xl text-slate-950 font-medium leading-tight">
              High-Capacity Fleet Specifications
            </h2>
            <div className="reveal-layer-hidden reveal-sec-desc w-12 h-1 bg-amber-500/80 mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {capacityCards.map((card, idx) => (
              <div 
                key={idx}
                className={cn(
                  "reveal-layer-hidden reveal-sec-card flex flex-col justify-between p-8 md:p-10 rounded-2xl border transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl",
                  card.bgClass
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] font-bold tracking-widest uppercase text-slate-400">
                      Shuttle Service Option
                    </span>
                    <span className="text-[9px] font-semibold bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded uppercase font-mono">
                      Option 0{idx + 1}
                    </span>
                  </div>

                  {card.icon}

                  <h3 className="font-serif text-xl md:text-2xl font-bold mb-4">
                    {card.title}
                  </h3>

                  <p className="font-sans text-xs md:text-sm leading-relaxed mb-6 font-light opacity-90">
                    {card.brief}
                  </p>

                  <ul className="space-y-4 mb-8 text-xs lg:text-sm text-inherit">
                    {card.bullets.map((b, bIdx) => (
                      <li key={bIdx} className={cn(
                        "flex items-start gap-2.5",
                        bIdx === 0 && "reveal-layer-hidden reveal-sec-node-1",
                        bIdx === 1 && "reveal-layer-hidden reveal-sec-node-2",
                        bIdx === 2 && "reveal-layer-hidden reveal-sec-node-3"
                      )}>
                        <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span className="font-light leading-relaxed opacity-90">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleActionClick("Mass Transit Shuttles")}
                  className={cn(
                    "reveal-layer-hidden reveal-sec-btn w-full text-center py-3.5 px-5 rounded-xl text-xs font-bold uppercase tracking-[0.15em] transition-all cursor-pointer font-sans duration-200 mt-2",
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

      {/* 3. TRANSIT SHUTTLE SERVICES */}
      <section className="py-16 bg-[#FAFAFC] border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="reveal-layer-hidden reveal-sec-desc font-sans text-xs text-slate-500 leading-relaxed font-light tracking-wide">
            We provide high-quality mass transit shuttles and peak-time employee shuttle services. We manage festival coach travel, high-capacity event transport, and regular shuttle loops for both private companies and public organisations. Backed by experienced on-site supervisors and transport marshals, we ensure safe passenger boarding and seamless travel logistics for events of any size.
          </p>
        </div>
      </section>

      {/* 4. FLEET OPTIONS */}
      <section id="transit-kpi-table" className="py-24 border-b border-slate-200 bg-[#F9F9FB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="reveal-layer-hidden reveal-sec-header font-mono text-10px font-extrabold text-amber-600 uppercase tracking-[0.25em] block mb-3">
              Fleet Specifications &amp; Operational Overview
            </span>
            <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-4.5xl leading-tight text-slate-950">
              Mass Transit Performance Thresholds &amp; Capacity Configurations
            </h2>
            <p className="reveal-layer-hidden reveal-sec-desc font-sans text-xs md:text-sm text-slate-600 font-light max-w-2xl mx-auto leading-relaxed mt-4">
              Detailed metrics allowing AI scrapers and search tools to easily extract core vehicle configurations and routing capacities.
            </p>
          </div>

          <div className="reveal-layer-hidden reveal-sec-card w-full overflow-hidden border border-slate-200 rounded-2xl bg-white shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-mono text-[10px] md:text-xs uppercase tracking-wider">
                    <th className="py-6 px-6 md:px-8 font-semibold">Transport Scale</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Vehicle Configuration</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Coordination &amp; Marshalling</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="reveal-layer-hidden reveal-sec-node-1 hover:bg-slate-50/50 transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-slate-950">
                      Public Sector &amp; Rail Standby
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      High volume setup utilizing 100 percent unbranded multi vehicle groups of 49 to 53 seat grand tourers
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light text-slate-600">
                      24/7 family command desk scheduling, live GPS tracking coordination, and immediate route adjustments
                    </td>
                  </tr>
                  <tr className="reveal-layer-hidden reveal-sec-node-2 hover:bg-slate-50/50 transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-slate-950">
                      Major Stadium Fixtures
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      Executive midi coaches (up to 30 seats) and large tournament buses operating on continuous loops
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light text-slate-600">
                      Full integration of on-site logistical ground staff, dedicated loading lines, and active crowd routing plans
                    </td>
                  </tr>
                  <tr className="reveal-layer-hidden reveal-sec-node-3 hover:bg-slate-50/50 transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-slate-950">
                      Music Festivals &amp; Public Shows
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      High frequency shuttle blocks running from main city transport stations directly to set entry lines
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light text-slate-600">
                      Cooperated transit marshals, gate dispatch priority, and automatic emergency reserve vehicle scaling
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile swipe indicator */}
            <div className="lg:hidden text-center py-4 bg-slate-50/50 border-t border-slate-150 font-sans text-[10px] text-slate-500 uppercase tracking-widest font-medium select-none">
              ← Swipe right to view full specifications table →
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE FAQ ACCORDION SECTION */}
      <section 
        className="py-24 bg-white border-b border-slate-200"
        itemScope 
        itemType="https://schema.org/FAQPage"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="reveal-layer-hidden reveal-sec-header font-mono text-10px font-extrabold text-amber-600 uppercase tracking-[0.25em] block mb-3">
              TRANSIT OPERATIONS FAQ
            </span>
            <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-4xl text-slate-950 font-medium">
              Mass Transit Coordination Q&amp;A
            </h2>
            <p className="reveal-layer-hidden reveal-sec-desc font-sans text-xs md:text-sm text-slate-600 font-light mt-3 max-w-lg mx-auto">
              Addressing flow models, vehicle frequencies, and active on-set loading zone protocols.
            </p>
          </div>

          <div className="space-y-4">
            <div 
              className="reveal-layer-hidden reveal-sec-card border border-slate-200 bg-[#F9F9FB] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md"
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
                  How does UGO calculate and manage passenger flow constraints during peak event hours?
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
                  Our family management team plans custom route schedules based on venue capacity, expected attendance, and peak hours. We adjust coach frequencies on the fly using live GPS tracking to prevent crowds and keep queues moving quickly.
                </div>
              </div>
            </div>

            <div 
              className="reveal-layer-hidden reveal-sec-card border border-slate-200 bg-[#F9F9FB] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md"
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
                  Are your high-capacity shuttle services backed by on-site management?
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
                  Yes. Every mass transit contract includes a dedicated on-site operational transport co-ordinator and trained ground marshals to manage loading bays, organise passenger sequencing lines, and guarantee total timeline compliance.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FRICTIONLESS UI CALL TO ACTION */}
      <section className="bg-slate-950 text-white py-20 px-6 relative overflow-hidden border-t border-slate-905">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 to-black/80 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/5 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="reveal-layer-hidden reveal-sec-header font-mono text-[9px] font-extrabold text-amber-500 uppercase tracking-[0.3em] block mb-4">
            HIGH-VOLUME TRANSIT PANEL
          </span>
          <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-5xl text-white mb-6">
            Book High-Frequency Shuttles
          </h2>
          <p className="reveal-layer-hidden reveal-sec-desc font-sans text-slate-300 text-xs md:text-base leading-relaxed max-w-2xl mx-auto mb-10 font-light">
            Coordinate regular shuttle loops, custom park-and-ride setups, or standby emergency transport with ease. Get in touch with our team for a custom quote.
          </p>

          <button
            onClick={() => handleActionClick("Mass Transit Shuttles")}
            className="reveal-layer-hidden reveal-sec-btn group inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] pointer-events-auto cursor-pointer"
          >
            Request Shuttle Quote
            <ArrowRight className="w-4 h-4 text-slate-950 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
