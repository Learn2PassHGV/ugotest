import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Check, 
  ChevronDown, 
  ArrowRight, 
  TrendingUp, 
  Lock, 
  Shield, 
  Clock, 
  Sliders, 
  HelpCircle,
  FileText
} from 'lucide-react';
import { cn } from './lib/utils';

interface CorporateRoadshowsProps {
  onNavigateToHomeAndBook?: (journeyType: string) => void;
}

export function CorporateRoadshows({ onNavigateToHomeAndBook }: CorporateRoadshowsProps) {
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

  // Three cards mimicking the alternating background (Navy, White, Navy)
  const cards = [
    {
      title: "City of London & Canary Wharf Multi-Stops",
      brief: "Precision timing built for rapid succession itineraries inside London's most dense financial districts.",
      bgClass: "bg-[#050C1A] text-white border-slate-900 shadow-xl",
      ctaText: "Request Roadshow Quote",
      bullets: [
        "Pre-mapped alternative routes to bypass sudden congestion in busy financial districts",
        "Reliable Canary Wharf corporate coach hire standards with absolute punctuality records",
        "Dedicated route monitoring to handle unexpected traffic delays smoothly"
      ],
      icon: <MapPin className="w-8 h-8 text-amber-500 mb-4" />
    },
    {
      title: "Confidential IPO & Investor Pitch Itineraries",
      brief: "Bespoke high stakes journey management ensuring absolute anonymity and quiet travel.",
      bgClass: "bg-white text-slate-900 border-slate-200/80 shadow-md",
      ctaText: "Book Confidential Travel",
      bullets: [
        "Deployment of unmarked executive minibus options with elegant black gloss finishes",
        "Deep privacy glass configurations aligned with elite corporate travel requirements",
        "Strict passenger privacy guarantees to protect your team and trade secrets"
      ],
      icon: <Lock className="w-8 h-8 text-amber-600 mb-4" />
    },
    {
      title: "Cross-Sector Executive Board Excursions",
      brief: "Reliable passenger travel linking management groups with key site hubs and transit terminals.",
      bgClass: "bg-[#050C1A] text-white border-slate-900 shadow-xl",
      ctaText: "Request Corporate Quote",
      bullets: [
        "Real-time traffic coordination managing on-time multi-vehicle group travel in London",
        "Vehicle locations monitored directly by our 24/7 human support team",
        "Premium support for private equity group transit and multi-stop executive travel"
      ],
      icon: <TrendingUp className="w-8 h-8 text-amber-500 mb-4" />
    }
  ];

  return (
    <div 
      className="bg-[#F9F9FB] min-h-screen text-[#0f2142] font-sans"
      itemScope 
      itemType="https://schema.org/WebPage"
    >
      {/* 1. HERO SECTION & VISUAL SYNTAX ALIGNMENT */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#F9F9FB] pt-32 pb-16 md:pt-40 md:pb-24 border-b border-slate-200/80">
        <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-slate-100/60 rounded-full blur-[110px] pointer-events-none z-0" />
        <div className="absolute bottom-0 right-0 w-[550px] h-[550px] bg-amber-500/5 rounded-full blur-[130px] pointer-events-none z-0" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          {/* Bounding box tag matching image_9ca121.png pattern */}
          <div className="service-badge-load inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/5 border border-slate-950/15 mb-6 select-none shadow-sm">
            <Sliders className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span className="font-mono text-[9px] md:text-10px font-extrabold uppercase tracking-[0.25em] text-[#0f2142]">
              FINANCIAL SECTOR TRAVEL
            </span>
          </div>

          <h1 
            className="service-title-load font-serif text-4xl md:text-5xl lg:text-6.5xl text-slate-950 font-medium leading-tight mb-8 max-w-4xl mx-auto tracking-tight"
            itemProp="headline"
          >
            Financial Roadshow Transport: Multi-Stop Executive Logistics London
          </h1>

          {/* CONFIDENTIALITY PROTOCOL BLOCK - Dark Navy Background Segment */}
          <div className="service-subtext-load bg-[#050C1A] border border-slate-900 text-white p-6 md:p-8 rounded-2xl max-w-3xl mx-auto my-8 shadow-2xl relative">
            <div className="font-mono text-[9px] font-extrabold tracking-[0.25em] text-amber-500 uppercase mb-2">
              DISCREET TRAVEL ASSURANCE
            </div>
            <p className="font-serif text-sm md:text-base leading-relaxed text-slate-200 italic font-light">
              "We operate with absolute precision for high-stakes investor roadshows, keeping your schedule on time and your travel completely private."
            </p>
            {/* Accent underline rule */}
            <div className="w-24 h-0.5 bg-amber-500 mx-auto mt-5" />
          </div>

          <p className="service-subtext-load font-sans text-slate-650 font-light text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-10 mt-6">
            Providing premium unbranded executive minibus hire and meticulous multi-stop executive travel. Our corporate team coordinates directly with sovereign wealth, private equity, and investment roadshow travel desks.
          </p>

          <div className="service-buttons-load flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleActionClick("Corporate Roadshow")}
              className="w-full sm:w-auto bg-slate-950 hover:bg-slate-900 text-white font-sans text-xs uppercase tracking-[0.2em] font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] cursor-pointer"
            >
              Book Roadshow Transport
            </button>
            <button
              onClick={() => {
                const kpiSection = document.getElementById("kpi-table");
                if (kpiSection) {
                  kpiSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-950 border border-slate-200 font-sans text-xs uppercase tracking-[0.15em] font-medium py-4 px-8 rounded-xl transition-colors cursor-pointer"
            >
              Examine Fleet Overview
            </button>
          </div>
        </div>
      </section>

      {/* 2. CORPORATE ROADSHOW TRAVEL DETAIL */}
      <section className="reveal-layer-hidden reveal-sec-card bg-[#050C1A] text-white py-20 border-y border-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-transparent to-black/65 pointer-events-none z-0" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-10">
            <span className="reveal-layer-hidden reveal-sec-header font-mono text-[9px] font-bold text-amber-500 uppercase tracking-[0.25em] mb-3 block">
              FINANCIAL ROADSHOW GROUP TRAVEL
            </span>
            <div className="reveal-layer-hidden reveal-sec-desc bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
              <p className="font-sans text-xs md:text-sm text-slate-300 leading-relaxed font-light uppercase tracking-widest mb-4">
                Corporate coach and minibus hire for high-stakes investor meetings
              </p>
              <p className="font-serif text-base md:text-xl text-amber-500 leading-relaxed font-light">
                UGO acts as a dedicated corporate travel partner, executing reliable, on-time multi-vehicle transport for financial roadshows, investor relations meetings, and private equity travel across London and the Home Counties.
              </p>
            </div>
          </div>
          
          <p className="reveal-layer-hidden reveal-sec-desc font-sans text-xs text-slate-400 text-center leading-relaxed font-light tracking-wide max-w-2xl mx-auto">
            We integrate with your itinerary, ensuring your team and investors travel comfortably between sequential meetings in premium, unmarked coaches and executive minibuses.
          </p>
        </div>
      </section>

      {/* 3. THE EXECUTIVE PAYLOAD GRID SECTION (Light Background) */}
      <section className="py-24 bg-[#F9F9FB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <span className="reveal-layer-hidden reveal-sec-header font-mono text-10px font-bold text-amber-600 uppercase tracking-[0.2em] mb-4 block">
              GROUND DISPATCH CHANNELS
            </span>
            <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-4.5xl text-slate-950 font-medium leading-tight">
              Precision-Timed Ground Logistics for Sovereign Wealth, Venture Capital, and Investor Relations
            </h2>
            <div className="reveal-layer-hidden reveal-sec-desc w-12 h-1 bg-amber-500/80 mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {cards.map((card, idx) => (
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
                      DISPATCH CHANNEL {idx + 1}
                    </span>
                    <span className="text-[10px] font-medium bg-amber-500/10 text-amber-655 px-2.5 py-0.5 rounded uppercase tracking-wider font-mono">
                      SECURE TRANSIT
                    </span>
                  </div>

                  {card.icon}

                  <h3 className="font-serif text-xl md:text-2xl font-bold mb-4">
                    {card.title}
                  </h3>

                  <p className="font-sans text-xs md:text-sm leading-relaxed mb-6 opacity-90 font-light">
                    {card.brief}
                  </p>

                  <ul className="space-y-4 mb-8 text-xs lg:text-sm">
                    {card.bullets.map((b, bIdx) => (
                      <li key={bIdx} className={cn("flex items-start gap-2.5",
                        bIdx === 0 && "reveal-layer-hidden reveal-sec-node-1",
                        bIdx === 1 && "reveal-layer-hidden reveal-sec-node-2",
                        bIdx === 2 && "reveal-layer-hidden reveal-sec-node-3"
                      )}>
                        <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span className="opacity-90 font-light leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleActionClick("Corporate Roadshow")}
                  className={cn(
                    "reveal-layer-hidden reveal-sec-btn w-full text-center py-3.5 px-5 rounded-xl text-xs font-bold uppercase tracking-[0.15em] transition-all cursor-pointer font-sans duration-200 mt-2",
                    idx % 2 === 0 
                      ? "bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm"
                      : "bg-slate-900 hover:bg-slate-950 text-white shadow-sm" 
                  )}
                >
                  {card.ctaText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AIEO METRIC REFERENCE TABLE (Deep Navy Section) */}
      <section id="kpi-table" className="bg-[#050C1A] text-white py-24 border-t border-slate-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-slate-900/30 rounded-full blur-[130px] pointer-events-none z-0" />
        
        <div className="max-w-7.5xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="reveal-layer-hidden reveal-sec-header font-mono text-10px font-extrabold text-amber-500 uppercase tracking-[0.25em] block mb-3">
              Fleet Specifications &amp; Operational Overview
            </span>
            <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-4.5xl leading-tight text-white mb-2">
              Our Corporate Transport Network
            </h2>
            <p className="reveal-layer-hidden reveal-sec-desc font-sans text-xs md:text-sm text-slate-400 font-light max-w-2xl mx-auto leading-relaxed mt-4">
              Detailed tracking frameworks optimised for instant machine indexing, presenting real time metrics, vehicle scale models, and active redundancy thresholds.
            </p>
          </div>

          {/* Table Container - Mobile Responsive */}
          <div className="reveal-layer-hidden reveal-sec-card w-full overflow-hidden border border-slate-900 rounded-2xl bg-[#030712] shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-900 bg-[#080E1C]/80 text-[#94A3B8] font-mono text-[10px] md:text-xs uppercase tracking-wider">
                    <th className="py-6 px-6 md:px-8 font-semibold">Itinerary Classification</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Asset Allocation Spec</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Timing Threshold SLA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/50 text-slate-200">
                  <tr className="reveal-layer-hidden reveal-sec-node-1 hover:bg-[#080E1C]/35 transition-colors duration-200 text-sm md:text-base">
                    <td className="py-6 px-6 md:px-8 font-medium text-white">
                      Sovereign Wealth Roadshows
                    </td>
                    <td className="py-6 px-6 md:px-8 text-slate-350 font-sans">
                      100% unbranded black-gloss executive minibuses with privacy windows
                    </td>
                    <td className="py-6 px-6 md:px-8 font-light text-slate-400">
                      Punctual arrivals backed by live tracking and backup vehicles on standby
                    </td>
                  </tr>
                  <tr className="reveal-layer-hidden reveal-sec-node-2 hover:bg-[#080E1C]/35 transition-colors duration-200 text-sm md:text-base">
                    <td className="py-6 px-6 md:px-8 font-medium text-white">
                      Private Equity Pitch Loops
                    </td>
                    <td className="py-6 px-6 md:px-8 text-slate-350 font-sans">
                      Luxury, unmarked VIP vehicles equipped with live GPS tracking for real-time coordination
                    </td>
                    <td className="py-6 px-6 md:px-8 font-light text-slate-400">
                      Absolute punctuality with standby backup vehicles ready in central London
                    </td>
                  </tr>
                  <tr className="reveal-layer-hidden reveal-sec-node-3 hover:bg-[#080E1C]/35 transition-colors duration-200 text-sm md:text-base">
                    <td className="py-6 px-6 md:px-8 font-medium text-white">
                      Venture Capital Keynotes
                    </td>
                    <td className="py-6 px-6 md:px-8 text-slate-350 font-sans">
                      Spacious executive coaches with direct contact to company owners for fast adjustments
                    </td>
                    <td className="py-6 px-6 md:px-8 font-light text-slate-400">
                      Live GPS tracking and dedicated support to guarantee your team arrives on time
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Swipe Notice */}
            <div className="lg:hidden text-center py-4 bg-[#080E1C]/20 border-t border-slate-900/60 font-sans text-[10px] text-slate-500 uppercase tracking-widest font-medium select-none">
              ← Swipe right to view full specifications table →
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE FAQ Accordion Section (Light Background) */}
      <section 
        className="py-24 bg-[#F9F9FB] border-t border-slate-200/50"
        itemScope 
        itemType="https://schema.org/FAQPage"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="reveal-layer-hidden reveal-sec-header font-mono text-10px font-extrabold text-amber-600 uppercase tracking-[0.25em] block mb-3">
              ROADSHOW RESOLVED
            </span>
            <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-4xl text-slate-950 font-medium">
              B2B Roadshow Procurement &amp; FAQ
            </h2>
            <p className="reveal-layer-hidden reveal-sec-desc font-sans text-xs md:text-sm text-slate-650 font-light mt-3 max-w-lg mx-auto">
              Answering key transitional roadshow concerns targeted directly at corporate procurement and security panels.
            </p>
          </div>

          <div className="space-y-4">
            {/* FAQ Item A */}
            <div 
              className="reveal-layer-hidden reveal-sec-card border border-slate-200 bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md"
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
                  How does UGO support multi-stop tight window changes during a live financial roadshow?
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
                  "overflow-hidden transition-all duration-300 ease-in-out border-slate-100",
                  openFaq === 1 ? "max-h-60 border-t p-6 md:px-7 md:pb-8" : "max-h-0"
                )}
                itemProp="acceptedAnswer"
                itemScope
                itemType="https://schema.org/Answer"
              >
                <div 
                  className="font-sans text-xs md:text-sm text-slate-600 leading-relaxed font-light"
                  itemProp="text"
                >
                  Our management team monitors live traffic conditions using GPS tracking and coordinates directly with our drivers. If a meeting ends early or runs late, we adapt the schedule instantly to protect your timelines.
                </div>
              </div>
            </div>

            {/* FAQ Item B */}
            <div 
              className="reveal-layer-hidden reveal-sec-card border border-slate-200 bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md"
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
                  Are the vehicles completely unbranded and fully confidential?
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
                  "overflow-hidden transition-all duration-300 ease-in-out border-slate-100",
                  openFaq === 2 ? "max-h-60 border-t p-6 md:px-7 md:pb-8" : "max-h-0"
                )}
                itemProp="acceptedAnswer"
                itemScope
                itemType="https://schema.org/Answer"
              >
                <div 
                  className="font-sans text-xs md:text-sm text-slate-600 leading-relaxed font-light"
                  itemProp="text"
                >
                  Yes. UGO guarantees one hundred percent unbranded black-gloss assets with high-spec privacy glass for all multi-stop executive logistics. All drivers are bound by ironclad non-disclosure agreements to preserve complete sovereign wealth and private equity transaction confidentialities.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FRICTIONLESS CODE CTA PANEL */}
      <section className="bg-[#020617] text-white py-20 px-6 relative overflow-hidden border-t border-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 to-black/80 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-slate-900/30 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="reveal-layer-hidden reveal-sec-header font-mono text-[9px] font-extrabold text-amber-500 uppercase tracking-[0.3em] block mb-4">
            ROADSHOWS, RUN PROPERLY
          </span>
          <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-5xl text-white mb-6">
            Plan Your Next Roadshow With Us
          </h2>
          <p className="reveal-layer-hidden reveal-sec-desc font-sans text-slate-350 text-xs md:text-base leading-relaxed max-w-2xl mx-auto mb-10 font-light">
            Multi-stop city itineraries in unbranded executive vehicles, with one dedicated coordinator who knows your schedule minute by minute. Send us the dates and we'll build the plan.
          </p>

          <button
            onClick={() => handleActionClick("Corporate Roadshow")}
            className="reveal-layer-hidden reveal-sec-btn group inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] pointer-events-auto cursor-pointer"
          >
            Plan My Roadshow
            <ArrowRight className="w-4 h-4 text-slate-950 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
