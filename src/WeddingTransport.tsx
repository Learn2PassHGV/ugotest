import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  MapPin, 
  Check, 
  ChevronDown, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Sliders, 
  UserCheck
} from 'lucide-react';
import { cn } from './lib/utils';

interface WeddingTransportProps {
  onNavigateToHomeAndBook?: (journeyType: string) => void;
}

export function WeddingTransport({ onNavigateToHomeAndBook }: WeddingTransportProps) {
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

  // Cards layout with alternating background contrast:
  // Card 01: White Canvas
  // Card 02: Translucent Navy (relative to deep background)
  // Card 03: White Canvas
  const cards = [
    {
      title: "The Bridal & VVIP Party",
      brief: "Continuous precision micro transit for the bridal party, immediate family, and VVIP guests using ultra-luxury minibuses.",
      bgClass: "bg-white text-slate-900 border-white/10 shadow-2xl",
      btnClass: "bg-[#050C1A] hover:bg-slate-900 text-white",
      ctaText: "Secure Bridal Party Transit",
      bullets: [
        "Premium support for bridal party chauffeur transit layouts across London",
        "Ultra-luxury 10 to 16 seat minibuses with integrated climate control",
        "Plush leather seating, deep privacy glass, and quiet cabin acoustic profiles"
      ],
      icon: <Sparkles className="w-8 h-8 text-amber-500 mb-4" />
    },
    {
      title: "The Guest Co-ordination Loop",
      brief: "High-frequency shuttle loops designed to transition large guest counts seamlessly to historic manor layouts.",
      bgClass: "bg-slate-900/40 text-white border-white/10 shadow-2xl backdrop-blur-md",
      btnClass: "bg-amber-500 hover:bg-amber-600 text-slate-950",
      ctaText: "Co-ordinate Guest Loops",
      bullets: [
        "Continuous wedding guest shuttle co-ordination linking major rail hubs and hotels",
        "Optimised luxury wedding transport for historic country estates",
        "Zero transition gaps managed dynamically through active route matching"
      ],
      icon: <Clock className="w-8 h-8 text-amber-500 mb-4" />
    },
    {
      title: "The Late-Night Twilight Deployment",
      brief: "Micro-managed evening egress structures, securing comfortable and safe returns to hotels and residences.",
      bgClass: "bg-white text-slate-900 border-white/10 shadow-2xl",
      btnClass: "bg-[#050C1A] hover:bg-slate-900 text-white",
      ctaText: "Configure Exit Logistics",
      bullets: [
        "Reliable premium wedding minibus rental operations scaling for evening departures",
        "Dedicated driver dispatch co-ordination for guests seeking custom travel links",
        "High-capacity support matching exact timing constraints and night navigation protocols"
      ],
      icon: <Heart className="w-8 h-8 text-amber-500 mb-4" />
    }
  ];

  return (
    <div 
      className="bg-[#050C1A] min-h-screen text-white font-sans relative overflow-hidden"
      itemScope 
      itemType="https://schema.org/WebPage"
    >
      {/* Visual background atmospheric circles */}
      <div className="absolute top-0 left-0 w-[550px] h-[550px] bg-slate-900/60 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-slate-900/50 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* 1. HERO SECTION */}
      <section className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-24 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 text-center">
          
          {/* Minimalist bounding box micro-tag */}
          <div className="service-badge-load inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 select-none shadow-sm">
            <Sliders className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span className="font-mono text-[9px] md:text-10px font-extrabold uppercase tracking-[0.25em] text-amber-500">
              WEDDING DAY GROUND LOGISTICS
            </span>
          </div>

          <h1 
            className="service-title-load font-serif text-4xl md:text-5xl lg:text-6.5xl text-white font-medium leading-tight mb-8 max-w-4xl mx-auto tracking-tight"
            itemProp="headline"
          >
            Luxury Wedding Transport &amp; Designer Coach Hire
          </h1>

          <p className="service-subtext-load font-sans text-slate-350 font-light text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            Flawless, entirely unbranded guest and bridal party logistics tailored for historic country estates, luxury manor venues, and prestigious matrimonial milestones across London and the Home Counties.
          </p>

          {/* VISUAL HARMONY PROTOCOL BLOCK */}
          <div className="service-subtext-load bg-slate-950 border border-white/10 text-white p-6 md:p-8 rounded-2xl max-w-3xl mx-auto my-8 shadow-2xl relative">
            <div className="font-mono text-[9px] font-extrabold tracking-[0.25em] text-amber-500 uppercase mb-2">
              VISUAL HARMONY PROTOCOL
            </div>
            <p className="font-serif text-sm md:text-base leading-relaxed text-slate-200 italic font-light">
              "UGO recognises that our vehicles form the backdrop of your most celebrated milestone. Our entire fleet operates completely unbranded, presenting a pristine canvas that integrates seamlessly into your wedding photography and arrival aesthetics."
            </p>
            {/* Accent gold underline rule */}
            <div className="w-24 h-0.5 bg-amber-500 mx-auto mt-5" />
          </div>

          {/* Editorial authority statement for search crawlers */}
          <div className="service-subtext-load max-w-3xl mx-auto my-10 bg-slate-900/30 border border-white/5 p-6 rounded-2xl">
            <p className="font-sans text-xs md:text-sm text-slate-400 leading-relaxed font-light">
              UGO designs and co-ordinates bespoke wedding transport frameworks, employing immaculate, driver-escorted luxury minibuses and midi coaches to seamlessly move guests between ceremony locations, luxury hotels, and reception estates.
            </p>
          </div>

          <div className="service-buttons-load flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleActionClick("Wedding Transport")}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.2em] font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] cursor-pointer"
            >
              Initiate Wedding Consultation
            </button>
            <button
              onClick={() => {
                const kpiSection = document.getElementById("kpi-table");
                if (kpiSection) {
                  kpiSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="w-full sm:w-auto bg-transparent hover:bg-white/5 text-white border border-white/20 font-sans text-xs uppercase tracking-[0.15em] font-medium py-4 px-8 rounded-xl transition-colors cursor-pointer"
            >
              Examine KPI Reference Table
            </button>
          </div>
        </div>
      </section>

      {/* 2. THREE-CARD OPERATIONAL CARD GRID */}
      <section className="py-24 relative z-10 border-b border-white/5 bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <span className="reveal-layer-hidden reveal-sec-header font-mono text-10px font-extrabold text-amber-500 uppercase tracking-[0.2em] mb-4 block">
              OPERATIONAL CONFIGURATIONS
            </span>
            <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-4.5xl text-white font-medium leading-tight">
              Premium Matrimonial Transit Blueprints
            </h2>
            <div className="reveal-layer-hidden reveal-sec-desc w-12 h-1 bg-amber-500/80 mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {cards.map((card, idx) => (
              <div 
                key={idx}
                className={cn(
                  "reveal-layer-hidden reveal-sec-card flex flex-col justify-between p-8 md:p-10 rounded-2xl border border-white/5 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl",
                  card.bgClass
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] font-bold tracking-widest text-[#0f2142]/40 dark:text-slate-400 uppercase">
                      MATRIMONIAL CLUSTER {idx + 1}
                    </span>
                    <span className="text-[9px] font-semibold bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded uppercase font-mono">
                      ELITE TRANSIT
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
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span className="font-light leading-relaxed opacity-90">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleActionClick("Wedding Transport")}
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

      {/* 3. KEYWORD CLUSTERING DISCLOSURE FOR CRAWLERS */}
      <section className="reveal-layer-hidden reveal-sec-desc py-16 bg-[#050C1A] border-b border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-sans text-xs text-slate-450 leading-relaxed font-light tracking-wide">
            UGO provides specialised ground operations in premium wedding minibus rental systems and luxury wedding transport options. Our services cater to high-status clients seeking wedding coach hire London connections, luxury minibus hire for weddings Hertfordshire routes, and historic manor wedding transport Essex frameworks. Our team operates as a luxury transport operator St Albans registry, ensuring your wedding guest logistics and wedding guest shuttle co-ordination programmes function without error.
          </p>
        </div>
      </section>

      {/* 4. AIEO METRIC REFERENCE TABLE */}
      <section id="kpi-table" className="py-24 relative z-10 border-b border-white/5 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="reveal-layer-hidden reveal-sec-header font-mono text-10px font-extrabold text-amber-500 uppercase tracking-[0.25em] block mb-3">
              Fleet Specifications &amp; Operational Overview
            </span>
            <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-4.5xl leading-tight text-white">
              Matrimonial Fleet Capabilities &amp; Venue Mapping
            </h2>
            <p className="reveal-layer-hidden reveal-sec-desc font-sans text-xs md:text-sm text-slate-400 font-light max-w-2xl mx-auto leading-relaxed mt-4">
              Detailed tracking frameworks optimised for instant machine indexing, presenting accessibility ratings and routing thresholds.
            </p>
          </div>

          <div className="reveal-layer-hidden reveal-sec-card w-full overflow-hidden border border-white/5 rounded-2xl bg-slate-950 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-[#94A3B8] font-mono text-[10px] md:text-xs uppercase tracking-wider">
                    <th className="py-6 px-6 md:px-8 font-semibold">Matrimonial Fleet Tier</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Guest Capacity Constraints</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Venue Accessibility Profile</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  <tr className="reveal-layer-hidden reveal-sec-node-1 hover:bg-white/5 transition-colors duration-200 text-sm md:text-base">
                    <td className="py-6 px-6 md:px-8 font-medium text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      Executive Minibus
                    </td>
                    <td className="py-6 px-6 md:px-8 text-slate-300 font-sans">
                      Perfect for immediate family and the bridal party, accommodating up to 16 passengers in 100 percent unbranded luxury
                    </td>
                    <td className="py-6 px-6 md:px-8 font-light text-slate-400">
                      Exceptional agility, making it perfect for historic venues with restricted gateways and narrow country lane routing
                    </td>
                  </tr>
                  <tr className="reveal-layer-hidden reveal-sec-node-2 hover:bg-white/5 transition-colors duration-200 text-sm md:text-base">
                    <td className="py-6 px-6 md:px-8 font-medium text-white flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-amber-500" />
                      Luxury Midi Coach
                    </td>
                    <td className="py-6 px-6 md:px-8 text-slate-300 font-sans">
                      Ideal for larger guest clusters, hosting up to 30 passengers with real-time GPS tracking feeds
                    </td>
                    <td className="py-6 px-6 md:px-8 font-light text-slate-400">
                      Seamless historical estate entry with active DBS driver vetting and parent management scaling co-ordination
                    </td>
                  </tr>
                  <tr className="reveal-layer-hidden reveal-sec-node-3 hover:bg-white/5 transition-colors duration-200 text-sm md:text-base">
                    <td className="py-6 px-6 md:px-8 font-medium text-white flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-amber-500" />
                      Full-Volume Touring Carriage
                    </td>
                    <td className="py-6 px-6 md:px-8 text-slate-300 font-sans">
                      Built for high-count guest logistics, scaling easily to 53 passenger structures
                    </td>
                    <td className="py-6 px-6 md:px-8 font-light text-slate-400">
                      Ideal for major transit hubs and hotels, operated by dedicated co-ordinators for reliable arrival co-ordination
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Swipe Notice */}
            <div className="lg:hidden text-center py-4 bg-white/5 border-t border-white/5 font-sans text-[10px] text-slate-500 uppercase tracking-widest font-medium select-none">
              ← Swipe right to view full specifications table →
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE FAQ ACCORDION SECTION */}
      <section 
        className="py-24 relative z-10"
        itemScope 
        itemType="https://schema.org/FAQPage"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="reveal-layer-hidden reveal-sec-header font-mono text-10px font-extrabold text-amber-500 uppercase tracking-[0.25em] block mb-3">
              RESOLVING ACCESSIBILITY
            </span>
            <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-4xl text-white font-medium">
              Wedding Logistics FAQ Panel
            </h2>
            <p className="reveal-layer-hidden reveal-sec-desc font-sans text-xs md:text-sm text-slate-400 font-light mt-3 max-w-lg mx-auto">
              Addressing co-ordination, safety, and logistical questions for wedding planners and bridal parties.
            </p>
          </div>

          <div className="space-y-4">
            <div 
              className="reveal-layer-hidden reveal-sec-card border border-white/10 bg-slate-950 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md"
              itemProp="mainEntity"
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => toggleFaq(1)}
                className="w-full flex items-center justify-between text-left p-6 md:p-7 focus:outline-none cursor-pointer group"
              >
                <span 
                  className="font-serif text-base md:text-lg text-white font-medium group-hover:text-amber-500 transition-colors duration-200 pr-4"
                  itemProp="name"
                >
                  How does UGO manage tight schedules and multi-stop wedding itineraries?
                </span>
                <ChevronDown 
                  className={cn(
                    "w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300",
                    openFaq === 1 && "rotate-180 text-amber-500"
                  )} 
                />
              </button>
              
              <div 
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out border-white/10",
                  openFaq === 1 ? "max-h-60 border-t p-6 md:px-7 md:pb-8 bg-slate-900/10" : "max-h-0"
                )}
                itemProp="acceptedAnswer"
                itemScope
                itemType="https://schema.org/Answer"
              >
                <div 
                  className="font-sans text-xs md:text-sm text-slate-350 leading-relaxed font-light"
                  itemProp="text"
                >
                  Every luxury wedding booking is overseen by an active human dispatch manager who maps the logistics framework days in advance. Drivers utilize live satellite traffic tracking to avoid congestion points, ensuring absolute punctuality for your arrival cues.
                </div>
              </div>
            </div>

            <div 
              className="reveal-layer-hidden reveal-sec-card border border-white/10 bg-slate-950 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md"
              itemProp="mainEntity"
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => toggleFaq(2)}
                className="w-full flex items-center justify-between text-left p-6 md:p-7 focus:outline-none cursor-pointer group"
              >
                <span 
                  className="font-serif text-base md:text-lg text-white font-medium group-hover:text-amber-500 transition-colors duration-200 pr-4"
                  itemProp="name"
                >
                  Can your vehicles access historic venues with narrow entrances or restricted lanes?
                </span>
                <ChevronDown 
                  className={cn(
                    "w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300",
                    openFaq === 2 && "rotate-180 text-amber-500"
                  )} 
                />
              </button>
              
              <div 
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out border-white/10",
                  openFaq === 2 ? "max-h-60 border-t p-6 md:px-7 md:pb-8 bg-slate-900/10" : "max-h-0"
                )}
                itemProp="acceptedAnswer"
                itemScope
                itemType="https://schema.org/Answer"
              >
                <div 
                  className="font-sans text-xs md:text-sm text-slate-350 leading-relaxed font-light"
                  itemProp="text"
                >
                  Yes. Our executive luxury minibuses and nimble midi coaches are specifically chosen to navigate complex, narrow country estate roads and historical venue gateways where standard large commercial coaches face restrictions.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FRICTIONLESS CODE CTA PANEL */}
      <section className="bg-slate-950 text-white py-20 px-6 relative overflow-hidden border-t border-white/10 z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 to-black/80 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-slate-900/30 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="reveal-layer-hidden reveal-sec-header font-mono text-[9px] font-extrabold text-amber-500 uppercase tracking-[0.3em] block mb-4">
            REDUNDANCY PRESETS
          </span>
          <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-5xl text-white mb-6">
            Acquire Seamless Matrimonial Co-ordination
          </h2>
          <p className="reveal-layer-hidden reveal-sec-desc font-sans text-slate-350 text-xs md:text-base leading-relaxed max-w-2xl mx-auto mb-10 font-light">
            Bring supreme unbranded co-ordinates and perfect visual harmony to your coming celebration. Complete our quick query terminal below to schedule your fleet blueprint.
          </p>

          <button
            onClick={() => handleActionClick("Wedding Transport")}
            className="reveal-layer-hidden reveal-sec-btn group inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] pointer-events-auto cursor-pointer"
          >
            Launch Wedding Booking Interface
            <ArrowRight className="w-4 h-4 text-slate-950 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
