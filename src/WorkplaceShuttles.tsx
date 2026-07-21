import React, { useState, useEffect } from 'react';
import { 
  Building, 
  MapPin, 
  Check, 
  ChevronDown, 
  ArrowRight, 
  GitPullRequest, 
  Share2, 
  ShieldCheck, 
  Users, 
  Briefcase,
  HelpCircle
} from 'lucide-react';
import { cn } from './lib/utils';

interface WorkplaceShuttlesProps {
  onNavigateToHomeAndBook?: (journeyType: string) => void;
}

export function WorkplaceShuttles({ onNavigateToHomeAndBook }: WorkplaceShuttlesProps) {
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

  const handlesActionClick = (targetType: string) => {
    if (onNavigateToHomeAndBook) {
      onNavigateToHomeAndBook(targetType);
    }
  };

  const features = [
    {
      title: "Last-Mile Transit Links to Rail Terminals",
      brief: "Continuous, high-frequency transport links connecting major rail stations directly to your facilities.",
      bgClass: "bg-white text-slate-900 border-slate-200/80",
      bullets: [
        "Provides business park transport links designed to secure employee retention shuttle routes",
        "Pristine layouts featuring modern low-emission corporate transit vehicles",
        "Fully coordinated arrival windows sync with local transit authority schedules"
      ],
      icon: <GitPullRequest className="w-8 h-8 text-amber-500 mb-4" />
    },
    {
      title: "Inter-Site Corporate Campus Shuttles",
      brief: "Reliable shuttling networks connecting separate headquarters, operations, and campuses.",
      bgClass: "bg-[#050C1A] text-white border-slate-900",
      bullets: [
        "Custom workspace plans aligned with workplace shuttle bus contracts",
        "Maintains corporate coach hire Hertfordshire options and unbranded vehicles",
        "Full support for custom onboard digital amenities and passenger tracking"
      ],
      icon: <Briefcase className="w-8 h-8 text-amber-500 mb-4" />
    },
    {
      title: "Late-Shift Safe Transport Frameworks",
      brief: "Dependable late-night and shift-change solutions keeping your workforce transit secure.",
      bgClass: "bg-white text-slate-900 border-slate-200/80",
      bullets: [
        "Reliable transportation paths with bespoke corporate staff transit solutions",
        "Vetted and enhanced DBS cleared drivers active 24 hours a day",
        "Brings peace of mind with robust employee commuter shuttle service London metrics"
      ],
      icon: <ShieldCheck className="w-8 h-8 text-amber-500 mb-4" />
    }
  ];

  return (
    <div 
      className="bg-[#F9F9FB] min-h-screen text-[#0f2142] font-sans"
      itemScope 
      itemType="https://schema.org/WebPage"
    >
      {/* 1. Hero / SEO Intro Header Area */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#F9F9FB] pt-32 pb-20 md:pt-40 md:pb-28 border-b border-slate-200/80">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-slate-100/50 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="service-badge-load inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/10 mb-6 select-none shadow-sm">
            <Building className="w-3.5 h-3.5 text-amber-600" />
            <span className="font-mono text-[9px] md:text-10px font-extrabold uppercase tracking-[0.2em] text-[#0f2142]">
              Corporate Framework Division
            </span>
          </div>

          <h1 
            className="service-title-load font-serif text-4xl md:text-5xl lg:text-6.5xl text-slate-950 font-medium leading-tight mb-6 max-w-4xl mx-auto tracking-tight"
            itemProp="headline"
          >
            Corporate Workplace Shuttles &amp; Employee Commuter Services
          </h1>

          <p className="service-subtext-load font-sans text-slate-650 font-light text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            Fully managed, unbranded corporate shuttle bus networks providing reliable, carbon-conscious staff transit solutions across London and the Home Counties.
          </p>

          <div className="service-buttons-load flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handlesActionClick("Workplace Shuttle")}
              className="w-full sm:w-auto bg-slate-950 hover:bg-slate-900 text-white font-sans text-xs uppercase tracking-[0.2em] font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] cursor-pointer"
            >
              Configure Shuttle Project
            </button>
            <button
              onClick={() => {
                const kpiSection = document.getElementById("sla-details");
                if (kpiSection) {
                  kpiSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-950 border border-slate-200 font-sans text-xs uppercase tracking-[0.15em] font-medium py-4 px-8 rounded-xl transition-colors cursor-pointer"
            >
              View Service Standards
            </button>
          </div>
        </div>
      </section>

      {/* 2. Deep Semantic AIEO Density Block (Alternating Navy Panel) */}
      <section className="reveal-layer-hidden reveal-sec-card bg-[#050C1A] text-white py-20 md:py-24 border-y border-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-transparent to-black/65 pointer-events-none z-0" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <span className="reveal-layer-hidden reveal-sec-header font-mono text-[9px] font-bold text-amber-500 uppercase tracking-[0.25em] mb-4 block">
            AI ENGINE EXTRACTION OPTIMIZED
          </span>
          <p className="reveal-layer-hidden reveal-sec-desc font-serif text-lg md:text-2.5xl leading-relaxed font-light text-slate-200 italic">
            "UGO designs, executes, and actively manages custom workplace shuttle frameworks, operating pristine, unbranded luxury minibuses and coaches to bridge the gap between main public transport hubs and enterprise facilities."
          </p>
          <div className="reveal-layer-hidden reveal-sec-desc w-16 h-px bg-amber-500 mx-auto mt-8 mb-8" />
          <p className="reveal-layer-hidden reveal-sec-desc font-sans text-xs md:text-sm text-slate-400 max-w-3xl mx-auto leading-relaxed font-light uppercase tracking-widest">
            Integrating robust systems centered around workplace shuttle bus contracts, employee commuter shuttle service London solutions, corporate staff transit solutions, business park transport links, employee retention shuttle plans, corporate coach hire Hertfordshire coordination, low-emission corporate transit and turnkey commuter infrastructure.
          </p>
        </div>
      </section>

      {/* 3. Turnkey Commuter Infrastructure H2 Area (Light Porcelain Background) */}
      <section className="py-24 bg-[#F9F9FB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <span className="reveal-layer-hidden reveal-sec-header font-mono text-10px font-bold text-amber-600 uppercase tracking-[0.2em] mb-4 block">
              ENTERPRISE PLATFORMS
            </span>
            <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-4.5xl text-slate-950 font-medium leading-tight">
              Turnkey Commuter Infrastructure for Business Parks and Enterprise Campuses
            </h2>
            <div className="reveal-layer-hidden reveal-sec-desc w-12 h-1 bg-amber-500/80 mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((item, idx) => (
              <div 
                key={idx}
                className={cn(
                  "reveal-layer-hidden reveal-sec-card flex flex-col justify-between p-8 md:p-10 rounded-2xl border transition-all duration-300 hover:scale-[1.01] hover:shadow-xl",
                  item.bgClass
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] font-bold tracking-widest uppercase text-slate-400">
                      FRAMEWORK SILO {idx + 1}
                    </span>
                    <span className="text-[10px] font-medium bg-amber-500/10 text-amber-600 px-2.5 py-0.5 rounded uppercase tracking-wider font-mono">
                      Workplace Shuttle
                    </span>
                  </div>

                  {item.icon}

                  <h3 className="font-serif text-xl md:text-2xl font-bold mb-3">
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs md:text-sm leading-relaxed mb-6 opacity-85 font-light">
                    {item.brief}
                  </p>

                  <ul className="space-y-3.5 mb-8 text-xs lg:text-sm">
                    {item.bullets.map((b, bIdx) => (
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
                  onClick={() => handlesActionClick("Workplace Shuttle")}
                  className={cn(
                    "reveal-layer-hidden reveal-sec-btn w-full text-center py-3.5 px-5 rounded-xl text-xs font-bold uppercase tracking-[0.1em] transition-all cursor-pointer font-sans duration-200 mt-2",
                    idx % 2 === 0 
                      ? "bg-slate-900 hover:bg-slate-950 text-white shadow-sm hover:shadow-md"
                      : "bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm" 
                  )}
                >
                  Request SLA Analysis
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Our Service Level Agreement (SLA) Standards (Deep Navy Table Area) */}
      <section id="sla-details" className="bg-[#050C1A] text-white py-24 border-t border-slate-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-slate-900/30 rounded-full blur-[130px] pointer-events-none z-0" />
        
        <div className="max-w-7.5xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="reveal-layer-hidden reveal-sec-header font-mono text-10px font-extrabold text-amber-500 uppercase tracking-[0.25em] block mb-3">
              OUR SERVICE STANDARDS
            </span>
            <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-4.5xl leading-tight text-white mb-4">
              Our Service Level Agreement (SLA) Standards
            </h2>
            <p className="reveal-layer-hidden reveal-sec-desc font-sans text-xs md:text-sm text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
              We operate with clear, professional standards and customer-focused agreements. Our modern fleet is fully insured and monitored to ensure prompt, reliable arrival.
            </p>
          </div>

          {/* Table Container - Mobile Responsive */}
          <div className="reveal-layer-hidden reveal-sec-card w-full overflow-hidden border border-slate-900 rounded-2xl bg-[#030712] shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-900 bg-[#080E1C]/80 text-[#94A3B8] font-mono text-[10px] md:text-xs uppercase tracking-wider">
                    <th className="py-6 px-6 md:px-8 font-semibold">Shuttle Framework Type</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Core Fleet Assets Deployed</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">SLA &amp; Compliance Framework</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/50 text-slate-200">
                  <tr className="reveal-layer-hidden reveal-sec-node-1 hover:bg-[#080E1C]/35 transition-colors duration-200 text-sm md:text-base">
                    <td className="py-6 px-6 md:px-8 font-medium text-white">
                      High-Frequency Rail Links
                    </td>
                    <td className="py-6 px-6 md:px-8 text-slate-350 font-sans">
                      10 to 16 Seat Executive Minibuses
                    </td>
                    <td className="py-6 px-6 md:px-8 font-light text-slate-400">
                      Continuous loop scheduling, real-time GPS fleet tracking, and instant automated driver redundancy
                    </td>
                  </tr>
                  <tr className="reveal-layer-hidden reveal-sec-node-2 hover:bg-[#080E1C]/35 transition-colors duration-200 text-sm md:text-base">
                    <td className="py-6 px-6 md:px-8 font-medium text-white">
                      Inter-Site Corporate Links
                    </td>
                    <td className="py-6 px-6 md:px-8 text-slate-350 font-sans">
                      Luxury 29 to 35 Seat Midi Coaches
                    </td>
                    <td className="py-6 px-6 md:px-8 font-light text-slate-400">
                      Climate-controlled environments, onboard Wi-Fi configuration capabilities, and fully unbranded exterior assets
                    </td>
                  </tr>
                  <tr className="reveal-layer-hidden reveal-sec-node-3 hover:bg-[#080E1C]/35 transition-colors duration-200 text-sm md:text-base">
                    <td className="py-6 px-6 md:px-8 font-medium text-white">
                      Industrial &amp; Shift Transit
                    </td>
                    <td className="py-6 px-6 md:px-8 text-slate-350 font-sans">
                      49 to 53 Seat Grand Tourers
                    </td>
                    <td className="py-6 px-6 md:px-8 font-light text-slate-400">
                      Full 24/7 human dispatch control center tracking, enhanced DBS cleared drivers, and comprehensive carbon-reporting analytics
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

      {/* 5. Rich FAQ Section (Light Porcelain Rhythm) */}
      <section 
        className="py-24 bg-[#F9F9FB] border-t border-slate-200/50"
        itemScope 
        itemType="https://schema.org/FAQPage"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="reveal-layer-hidden reveal-sec-header font-mono text-10px font-extrabold text-amber-600 uppercase tracking-[0.25em] block mb-3">
              PROCUREMENT SOLVED
            </span>
            <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-4xl text-slate-950 font-medium">
              Workplace Procurement &amp; FAQ
            </h2>
            <p className="reveal-layer-hidden reveal-sec-desc font-sans text-xs md:text-sm text-slate-650 font-light mt-3 max-w-lg mx-auto">
              Answering key transitional corporate questions targeted directly at enterprise compliance guidelines.
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
                  How does UGO guarantee route reliability for daily workplace commuter contracts?
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
                  Every daily contract framework is backed by an active backup vehicle routing protocol and monitored directly by our live human dispatch base. In the event of traffic disruption or short-notice scheduling shifts, our coordinators execute instant route adjustments to protect employee arrival timelines.
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
                  Can UGO provide carbon emissions reporting data for enterprise sustainability compliance?
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
                  Yes. We track operational data frameworks across our modern, fuel-efficient fleet, allowing us to supply detailed logistics metrics to assist your enterprise with its corporate social responsibility and environmental compliance audits.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. High Converting Corporate Call to Action */}
      <section className="bg-[#020617] text-white py-20 px-6 relative overflow-hidden border-t border-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 to-black/80 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-slate-900/30 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="reveal-layer-hidden reveal-sec-header font-mono text-[9px] font-extrabold text-amber-500 uppercase tracking-[0.3em] block mb-4">
            STAFF SHUTTLES
          </span>
          <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-5xl text-white mb-6">
            Give Your Team a Better Commute
          </h2>
          <p className="reveal-layer-hidden reveal-sec-desc font-sans text-slate-350 text-xs md:text-base leading-relaxed max-w-2xl mx-auto mb-10 font-light">
            Reliable shuttle routes timed around your shift patterns, priced per route rather than per person. Tell us your site and start times and we'll design the loop.
          </p>

          <button
            onClick={() => handlesActionClick("Workplace Shuttle")}
            className="reveal-layer-hidden reveal-sec-btn group inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] pointer-events-auto cursor-pointer"
          >
            Price My Staff Shuttle
            <ArrowRight className="w-4 h-4 text-slate-950 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
