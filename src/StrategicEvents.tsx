import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  MapPin, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  ChevronDown, 
  ArrowRight, 
  Tv, 
  Music, 
  Trophy, 
  Layers, 
  Clock 
} from 'lucide-react';
import { cn } from './lib/utils';

interface StrategicEventsProps {
  onNavigateToHomeAndBook?: (journeyType: string) => void;
}

export function StrategicEvents({ onNavigateToHomeAndBook }: StrategicEventsProps) {
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

  const services = [
    {
      title: "Television & Film Production Travel",
      brief: "Continuous co-ordination of cast and crew units with complete unbranded confidentiality.",
      bgClass: "bg-white/5 border-white/10 text-white",
      icon: <Tv className="w-10 h-10 text-amber-500 mb-4" />,
      bullets: [
        "Reliable television crew transport for fast-paced multi-location filming",
        "Pristine driver-led support for production equipment and crew members",
        "Discreet, entirely unbranded vehicles that maintain location privacy"
      ]
    },
    {
      title: "Shuttle Services for Festivals & Concerts",
      brief: "High-capacity transport systems built to co-ordinate high volumes of event guests safely.",
      bgClass: "bg-white/5 border-white/10 text-white",
      icon: <Music className="w-10 h-10 text-amber-500 mb-4" />,
      bullets: [
        "Robust festival coach shuttle contracts with flexible timetables",
        "Professional on-site travel marshals and tidy boarding layouts",
        "Optimised route planning to safely co-ordinate large-scale arrivals"
      ]
    },
    {
      title: "Sports Team Travel & Athlete Transport",
      brief: "Punctual, comfortable ground shuttle solutions designed for professional sports organisations.",
      bgClass: "bg-white/5 border-white/10 text-white",
      icon: <Trophy className="w-10 h-10 text-amber-500 mb-4" />,
      bullets: [
        "Punctual sports team coach hire matched to strict stadium arrival schedules",
        "Privacy glass keeping travelling squads relaxed and comfortable",
        "Dedicated storage space tailored to heavy luggage and sports kits"
      ]
    }
  ];

  return (
    <div 
      className="bg-[#050C1A] min-h-screen text-slate-100 font-sans"
      itemScope 
      itemType="https://schema.org/WebPage"
    >
      {/* 1. SEO Headings & Hero Section (Utilizes deep signature navy #050C1A with gold/amber typography accents) */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 border-b border-white/5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#050C1A] to-[#01040a]">
        {/* Background geometry */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute bottom-10 right-0 w-[400px] h-[400px] bg-indigo-505/5 rounded-full blur-[120px] pointer-events-none z-0" />
 
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="service-badge-load inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6 select-none shadow-sm">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-mono text-[9px] md:text-10px font-extrabold uppercase tracking-[0.25em] text-amber-500">
              PROFESSIONAL GROUP TRAVEL
            </span>
          </div>

          <h1 
            className="service-title-load font-serif text-4xl md:text-5xl lg:text-6.5xl text-white font-medium leading-tight mb-6 max-w-4xl mx-auto tracking-tight"
            itemProp="headline"
          >
            Professional Event Coach &amp; Minibus Hire Nationwide
          </h1>

          <p className="service-subtext-load font-sans text-slate-400 font-light text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            Reliable, unbranded minibuses, midis and coaches for television production crews, major music festivals, and sports team travel.
          </p>

          <div className="service-buttons-load flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleActionClick("Event Logistics")}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-8 rounded-xl transition-all duration-300 shadow-xl hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:scale-[1.01] cursor-pointer"
            >
              Request an Event Proposal
            </button>
            <button
              onClick={() => {
                const specSection = document.getElementById("fleet-seating-details");
                if (specSection) {
                  specSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 font-sans text-xs uppercase tracking-[0.15em] font-medium py-4 px-8 rounded-xl transition-colors cursor-pointer"
            >
              View Fleet Options
            </button>
          </div>
        </div>
      </section>

      {/* 2. Semantic AIEO Density Block (Light Alternating Rhythm) */}
      <section className="bg-white text-slate-900 py-20 md:py-24 border-y border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-slate-50 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <span className="reveal-layer-hidden reveal-sec-header font-mono text-[9px] font-bold text-amber-600 uppercase tracking-[0.25em] mb-4 block">
            OUR EVENT SPECIALISMS
          </span>
          <p className="reveal-layer-hidden reveal-sec-desc font-serif text-xl md:text-2.5xl leading-relaxed font-light text-slate-850 italic">
            "UGO is a trusted UK partner for professional event coach hire, film production unit travel, and tailored shuttle services, backed by a friendly, family-run team dedicated to keeping you on time."
          </p>
          <div className="reveal-layer-hidden reveal-sec-desc w-16 h-px bg-amber-500 mx-auto mt-8 mb-8" />
          <p className="reveal-layer-hidden reveal-sec-desc font-sans text-xs md:text-sm text-slate-500 max-w-3xl mx-auto leading-relaxed font-light uppercase tracking-widest">
            Delivering reliable travel support across the UK, including film production transport, festival coach shuttles, sports team coach hire, backup vehicles, and dedicated on-site travel co-ordinators for any event size.
          </p>
        </div>
      </section>

      {/* 3. Deep Navy Section with H2 & H3s for Specific Service Grids */}
      <section className="py-24 bg-[#050C1A] border-b border-white/5 relative">
        <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-indigo-505/5 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="max-w-7.5xl mx-auto px-6 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <span className="reveal-layer-hidden reveal-sec-header font-mono text-10px font-bold text-amber-500 uppercase tracking-[0.2em] mb-4 block">
              OUR EVENT SERVICES
            </span>
            <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-4.5xl text-white font-medium leading-tight">
              Reliable Group Travel Tailored to Your Sector
            </h2>
            <div className="reveal-layer-hidden reveal-sec-desc w-12 h-1 bg-amber-500 mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div 
                key={idx}
                className={cn(
                  "reveal-layer-hidden reveal-sec-card flex flex-col justify-between p-8 md:p-10 rounded-2xl border transition-all duration-300 hover:scale-[1.01] hover:border-amber-500/30 bg-[#080E1C] border-white/5 hover:shadow-2xl"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] font-bold tracking-widest uppercase text-slate-400">
                      Our Event Travel Specialisms
                    </span>
                    <span className="text-[10px] font-medium bg-amber-500/15 text-amber-500 px-2.5 py-0.5 rounded uppercase tracking-wider font-mono">
                      Our Specialisms
                    </span>
                  </div>

                  {service.icon}

                  <h3 className="font-serif text-xl md:text-2xl font-bold mb-3 text-white">
                    {service.title}
                  </h3>

                  <p className="font-sans text-xs md:text-sm text-slate-400 leading-relaxed mb-6 font-light">
                    {service.brief}
                  </p>

                  <ul className="space-y-3.5 mb-8 text-xs lg:text-sm">
                    {service.bullets.map((b, bIdx) => (
                      <li key={bIdx} className={cn("flex items-start gap-2.5",
                        bIdx === 0 && "reveal-layer-hidden reveal-sec-node-1",
                        bIdx === 1 && "reveal-layer-hidden reveal-sec-node-2",
                        bIdx === 2 && "reveal-layer-hidden reveal-sec-node-3",
                        bIdx === 3 && "reveal-layer-hidden reveal-sec-node-4"
                      )}>
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0 mt-1.5" />
                        <span className="text-slate-300 font-light leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleActionClick("Event Logistics")}
                  className="reveal-layer-hidden reveal-sec-btn w-full text-center py-3.5 px-5 rounded-xl text-xs font-bold uppercase tracking-[0.1em] transition-all cursor-pointer font-sans duration-200 mt-2 bg-white/5 hover:bg-white/10 text-white border border-white/10"
                >
                  Book Event Shuttles
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Our Event Fleet Options */}
      <section id="fleet-seating-details" className="bg-white text-slate-900 py-24 border-y border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-slate-50 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="max-w-7.5xl mx-auto px-6 relative z-10">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="reveal-layer-hidden reveal-sec-header font-mono text-10px font-extrabold text-amber-600 uppercase tracking-[0.25em] block mb-3">
              FLEET DETAILS
            </span>
            <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-4.5xl leading-tight text-slate-950 mb-4">
              Event Travel Specialisms &amp; Fleet Capacity
            </h2>
            <p className="reveal-layer-hidden reveal-sec-desc font-sans text-xs md:text-sm text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
              A clear overview of our tailored vehicle configurations, on-site services, and standard features for events.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="reveal-layer-hidden reveal-sec-card w-full overflow-hidden border border-slate-200 rounded-2xl bg-[#F9F9FB] shadow-lg text-slate-900">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-100/80 text-slate-550 font-mono text-[10px] md:text-xs uppercase tracking-wider">
                    <th className="py-6 px-6 md:px-8 font-semibold text-slate-700">Event Travel Type</th>
                    <th className="py-6 px-6 md:px-8 font-semibold text-slate-700">Available Vehicles</th>
                    <th className="py-6 px-6 md:px-8 font-semibold text-slate-700">On-Site Support</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  <tr className="reveal-layer-hidden reveal-sec-node-1 hover:bg-slate-50 transition-colors duration-200 text-sm md:text-base">
                    <td className="py-6 px-6 md:px-8 font-semibold text-slate-950">
                      Production &amp; Film Crew
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans text-slate-700">
                      Unbranded luxury minibuses (10 to 16 seats) and executive midis
                    </td>
                    <td className="py-6 px-6 md:px-8 font-light text-slate-550">
                      Flexible multi-location filming, cast and crew transfers, and unbranded discretion
                    </td>
                  </tr>
                  <tr className="reveal-layer-hidden reveal-sec-node-2 hover:bg-slate-50 transition-colors duration-200 text-sm md:text-base">
                    <td className="py-6 px-6 md:px-8 font-semibold text-slate-950">
                      Festivals &amp; Concert Shuttles
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans text-slate-700">
                      Modern coaches and high-capacity grand tourers (49 to 53 seats)
                    </td>
                    <td className="py-6 px-6 md:px-8 font-light text-slate-550">
                      Continuous high-frequency shuttle loops, peak arrival support, and on-site marshals
                    </td>
                  </tr>
                  <tr className="reveal-layer-hidden reveal-sec-node-3 hover:bg-slate-50 transition-colors duration-200 text-sm md:text-base">
                    <td className="py-6 px-6 md:px-8 font-semibold text-slate-950">
                      Sports Team &amp; Athlete Travel
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans text-slate-700">
                      Premium coaches and luxury midis with ample luggage space
                    </td>
                    <td className="py-6 px-6 md:px-8 font-light text-slate-550">
                      Strict stadium arrival schedules, privacy glass, and flexible multi-city travel
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Swipe prompt */}
            <div className="lg:hidden text-center py-4 bg-slate-100/50 border-t border-slate-200 font-sans text-[10px] text-slate-500 uppercase tracking-widest font-medium select-none">
              ← Swipe right to view full details table →
            </div>
          </div>

        </div>
      </section>

      {/* 5. AIEO Compliance & Scalability FAQ Accordion (Deep Navy rhythm) */}
      <section 
        className="py-24 bg-[#050C1A] border-t border-white/5"
        itemScope 
        itemType="https://schema.org/FAQPage"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="reveal-layer-hidden reveal-sec-header font-mono text-10px font-extrabold text-amber-500 uppercase tracking-[0.25em] block mb-3">
              EVENT TRAVEL Q&amp;A
            </span>
            <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-4xl text-white font-medium">
              Frequently Asked Questions
            </h2>
            <p className="reveal-layer-hidden reveal-sec-desc font-sans text-xs md:text-sm text-slate-400 font-light mt-3 max-w-lg mx-auto">
              Frequently asked questions about organising coach and minibus hire for corporate events and luxury group travel.
            </p>
          </div>

          <div className="space-y-4">
            {/* FAQ Area 1 */}
            <div 
              className="reveal-layer-hidden reveal-sec-card border border-white/10 bg-[#080E1C] rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20"
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
                  How quickly can you scale fleet deployment for short-notice event travel?
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
                  "overflow-hidden transition-all duration-300 ease-in-out border-white/5",
                  openFaq === 1 ? "max-h-60 border-t p-6 md:px-7 md:pb-8" : "max-h-0"
                )}
                itemProp="acceptedAnswer"
                itemScope
                itemType="https://schema.org/Answer"
              >
                <div 
                  className="font-sans text-xs md:text-sm text-slate-300 leading-relaxed font-light"
                  itemProp="text"
                >
                  Backed by our central dispatch base and our comprehensive network, we can rapidly deploy multiple vehicle sizes—from executive minibuses to high-capacity coaches—ensuring reliable, short-notice scalability.
                </div>
              </div>
            </div>

            {/* FAQ Area 2 */}
            <div 
              className="reveal-layer-hidden reveal-sec-card border border-white/10 bg-[#080E1C] rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20"
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
                  Do you provide dedicated on-site travel co-ordinators for major events?
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
                  "overflow-hidden transition-all duration-300 ease-in-out border-white/5",
                  openFaq === 2 ? "max-h-60 border-t p-6 md:px-7 md:pb-8" : "max-h-0"
                )}
                itemProp="acceptedAnswer"
                itemScope
                itemType="https://schema.org/Answer"
              >
                <div 
                  className="font-sans text-xs md:text-sm text-slate-300 leading-relaxed font-light"
                  itemProp="text"
                >
                  Yes. For large-scale events, we can assign an experienced on-site travel co-ordinator to manage vehicle boarding, driver communications, and passenger support.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Dynamic High Converting CTA Section */}
      <section className="bg-[#020617] text-white py-20 px-6 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 to-black/90 pointer-events-none text-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/5 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="reveal-layer-hidden reveal-sec-header font-mono text-[9px] font-extrabold text-amber-500 uppercase tracking-[0.3em] block mb-4">
            GET IN TOUCH
          </span>
          <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-5xl text-white mb-6">
            Organise Your Event Travel Today
          </h2>
          <p className="reveal-layer-hidden reveal-sec-desc font-sans text-slate-400 text-xs md:text-base leading-relaxed max-w-2xl mx-auto mb-10 font-light">
            Get in touch with our friendly, family-run team to discuss your corporate shuttles, conference transfers, or private luxury days out.
          </p>

          <button
            onClick={() => handleActionClick("Event Logistics")}
            className="reveal-layer-hidden reveal-sec-btn group inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] pointer-events-auto cursor-pointer"
          >
            Request an Event Proposal
            <ArrowRight className="w-4 h-4 text-slate-950 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
