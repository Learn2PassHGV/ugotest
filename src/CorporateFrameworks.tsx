import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Users, 
  Clock, 
  EyeOff, 
  ChevronDown, 
  ArrowRight, 
  Building2, 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2,
  FileText
} from 'lucide-react';
import { cn } from './lib/utils';

interface CorporateFrameworksProps {
  onNavigateToHomeAndBook?: (journeyType: string) => void;
}

export function CorporateFrameworks({ onNavigateToHomeAndBook }: CorporateFrameworksProps) {
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

  const services = [
    {
      title: "Staff Shuttle Services",
      brief: "Direct commuter routes and shuttle services connecting your offices and local transit hubs.",
      tag: "Staff Shuttles",
      bgClass: "bg-[#050C1A] text-white border-slate-900",
      icon: <Building2 className="w-10 h-10 text-amber-500 mb-4" />,
      bullets: [
        "Direct commuter runs for your employees",
        "Relieves parking pressure and congestion at your offices",
        "Modern, Euro 6 low-emission vehicles",
        "Dependable multi-shift timetables built around your hours"
      ],
      ctaText: "Inquire About Shuttles"
    },
    {
      title: "Executive Travel & VIP Discretion",
      brief: "Discreet executive transport using immaculate, completely unmarked and unbranded vehicles.",
      tag: "Executive Travel",
      bgClass: "bg-white text-slate-900 border-slate-200/80",
      icon: <Briefcase className="w-10 h-10 text-slate-850 mb-4" />,
      bullets: [
        "Strict non-disclosure and discretion from all drivers",
        "Immaculate, unmarked black executive vehicles",
        "Direct line to our family team for last-minute adjustments",
        "Live GPS vehicle tracking on all active journeys"
      ],
      ctaText: "Inquire About Executive Hire"
    },
    {
      title: "Conferences & Major Events",
      brief: "Coordinating transport for large corporate events, client summits, and multi-site conferences.",
      tag: "Event Logistics",
      bgClass: "bg-[#050C1A] text-white border-slate-900",
      icon: <Calendar className="w-10 h-10 text-amber-500 mb-4" />,
      bullets: [
        "Clear passenger lists and direct communication",
        "Experienced coordinators on-site if required",
        "Easily scale from a single minibus to multiple large coaches",
        "Pre-planned backup routes and real-time operational support"
      ],
      ctaText: "Request Event Transport"
    }
  ];

  const handleActionClick = (targetType: string) => {
    if (onNavigateToHomeAndBook) {
      onNavigateToHomeAndBook(targetType);
    }
  };

  return (
    <div 
      className="bg-[#F9F9FB] min-h-screen text-[#0f2142] font-sans"
      itemScope 
      itemType="https://schema.org/WebPage"
    >
      {/* 1. SEO Headings & Hero Section (Light Background for alternating rhythm) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#F9F9FB] pt-32 pb-20 md:pt-40 md:pb-28 border-b border-slate-200/80">
        {/* Background visual geometry */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-100/40 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="service-badge-load inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/10 mb-6 select-none shadow-sm">
            <Shield className="w-3.5 h-3.5 text-amber-600" />
            <span className="font-mono text-[9px] md:text-10px font-extrabold uppercase tracking-[0.2em] text-[#0f2142]">
              ESTABLISHED FAMILY COACH &amp; MINIBUS PROVIDER
            </span>
          </div>
          
          <h1 
            className="service-title-load font-serif text-4xl md:text-5xl lg:text-6.5xl text-slate-950 font-medium leading-tight mb-6 max-w-4xl mx-auto tracking-tight"
            itemProp="headline"
          >
            Corporate Accounts &amp; Staff Shuttle Services
          </h1>
          
          <p className="service-subtext-load font-sans text-slate-650 font-light text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            Reliable corporate coach and minibus hire for business events, airport transfers, and regular staff shuttles. Backed by 24/7 direct owner support and a clean, unmarked executive fleet based in St Albans.
          </p>

          <div className="service-buttons-load flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleActionClick("Corporate Logistics")}
              className="w-full sm:w-auto bg-slate-950 hover:bg-slate-900 text-white font-sans text-xs uppercase tracking-[0.2em] font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] cursor-pointer"
            >
              Set Up a Corporate Account
            </button>
            <button
              onClick={() => {
                const fleetSection = document.getElementById("fleet-capacity-details");
                if (fleetSection) {
                  fleetSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-950 border border-slate-200 font-sans text-xs uppercase tracking-[0.15em] font-medium py-4 px-8 rounded-xl transition-colors cursor-pointer"
            >
              Explore Our Fleet
            </button>
          </div>
        </div>
      </section>

      {/* 2. Authority & Decarative Entity Statement Block (Alternating Dark Rhythm) */}
      <section className="bg-[#050C1A] text-white py-20 md:py-24 border-y border-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-transparent to-black/60 pointer-events-none z-0" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <span className="reveal-layer-hidden reveal-sec-header font-mono text-[9px] font-bold text-amber-500 uppercase tracking-[0.25em] mb-4 block">
            OUR STANDARDS
          </span>
          <p className="reveal-layer-hidden reveal-sec-desc font-serif text-xl md:text-2.5xl leading-relaxed font-light text-slate-250 italic">
            "As a trusted family business, we provide high-compliance coach and minibus hire for companies across London and the Home Counties. We take complete responsibility for your journey, backing our modern unbranded fleet with fully DBS-vetted professional drivers, live GPS tracking, and straightforward corporate accounts."
          </p>
          <div className="reveal-layer-hidden reveal-sec-desc w-16 h-px bg-amber-500 mx-auto mt-8 mb-8" />
          <p className="reveal-layer-hidden reveal-sec-desc font-sans text-xs md:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed font-light uppercase tracking-widest">
            Providing reliable staff shuttle routes, corporate events transport, and direct executive travel for teams of all sizes.
          </p>
        </div>
      </section>

      {/* 3. Managed Transport solutions H2 Section (Porcelain White Rhythm) */}
      <section className="py-24 bg-[#F9F9FB]">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <span className="reveal-layer-hidden reveal-sec-header font-mono text-10px font-bold text-amber-600 uppercase tracking-[0.2em] mb-4 block">
              TAILORED SERVICES
            </span>
            <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-4.5xl text-slate-950 font-medium leading-tight">
              Reliable Coach &amp; Minibus Hire for Your Business
            </h2>
            <div className="reveal-layer-hidden reveal-sec-desc w-12 h-1 bg-amber-500 mx-auto mt-6 rounded-full" />
          </div>

          {/* Three column Service Grid using H3 headers */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div 
                key={idx}
                className={cn(
                  "reveal-layer-hidden reveal-sec-card flex flex-col justify-between p-8 md:p-10 rounded-2xl border transition-all duration-300 hover:scale-[1.01] hover:shadow-xl",
                  service.bgClass
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[9px] font-bold tracking-widest uppercase text-slate-400">
                      OPTION 0{idx + 1}
                    </span>
                    <span className="text-[10px] font-medium bg-amber-500/10 text-amber-600 hover:text-amber-750 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                      {service.tag}
                    </span>
                  </div>
                  
                  {service.icon}
                  
                  <h3 className="font-serif text-xl md:text-2xl font-bold mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="font-sans text-xs md:text-sm leading-relaxed mb-6 opacity-85 font-light">
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
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span className="opacity-90 font-light leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleActionClick("Corporate Logistics")}
                  className={cn(
                    "reveal-layer-hidden reveal-sec-btn w-full text-center py-3.5 px-5 rounded-xl text-xs font-bold uppercase tracking-[0.1em] transition-all cursor-pointer font-sans duration-200 mt-2",
                    idx % 2 === 0 
                      ? "bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm" 
                      : "bg-slate-900 hover:bg-slate-950 text-white shadow-sm hover:shadow-md"
                  )}
                >
                  {service.ctaText}
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Fleet Seating and Capabilities */}
      <section id="fleet-capacity-details" className="bg-[#050C1A] text-white py-24 border-t border-slate-950 relative overflow-hidden">
        {/* Background graphics */}
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-slate-900/30 rounded-full blur-[130px] pointer-events-none z-0" />
        
        <div className="max-w-7.5xl mx-auto px-6 relative z-10">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="reveal-layer-hidden reveal-sec-header font-mono text-10px font-extrabold text-amber-500 uppercase tracking-[0.25em] block mb-3">
              Fleet Options &amp; Operational Detail
            </span>
            <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-4.5xl leading-tight text-white mb-4">
              Our Executive Fleet
            </h2>
            <p className="reveal-layer-hidden reveal-sec-desc font-sans text-xs md:text-sm text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
              Explore our clean, unbranded fleet of coaches and executive minibuses. Compare seating capacities, vehicle features, and travel options to find the perfect fit for your transport needs.
            </p>
          </div>

          {/* Table Container - Mobile Collapse Strategy: Responsive Side scroll with elegant layout */}
          <div className="reveal-layer-hidden reveal-sec-card w-full overflow-hidden border border-slate-900 rounded-2xl bg-[#030712] shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-900 bg-[#080E1C]/80 text-[#94A3B8] font-mono text-[10px] md:text-xs uppercase tracking-wider">
                    <th className="py-6 px-6 md:px-8 font-semibold">Available Vehicles</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Fleet Capabilities</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Typical Travel Services</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/50 text-slate-200">
                  <tr className="reveal-layer-hidden reveal-sec-node-1 hover:bg-[#080E1C]/35 transition-colors duration-200 text-sm md:text-base">
                    <td className="py-6 px-6 md:px-8 font-semibold text-white">
                      Workforce Commuter Links
                    </td>
                    <td className="py-6 px-6 md:px-8 text-slate-350">
                      10 to 53 Seat Versatile Fleet Options
                    </td>
                    <td className="py-6 px-6 md:px-8 font-light text-slate-400">
                      Reliable staff shuttle services with direct support, structured timetables, and consolidated monthly billing.
                    </td>
                  </tr>
                  <tr className="reveal-layer-hidden reveal-sec-node-2 hover:bg-[#080E1C]/35 transition-colors duration-200 text-sm md:text-base">
                    <td className="py-6 px-6 md:px-8 font-semibold text-white">
                      Executive Financial Roadshows
                    </td>
                    <td className="py-6 px-6 md:px-8 text-slate-350">
                      Elite Unbranded Luxury Minibuses
                    </td>
                    <td className="py-6 px-6 md:px-8 font-light text-slate-400">
                      Real-time GPS vehicle tracking and direct phone access to our family management team.
                    </td>
                  </tr>
                  <tr className="reveal-layer-hidden reveal-sec-node-3 hover:bg-[#080E1C]/35 transition-colors duration-200 text-sm md:text-base">
                    <td className="py-6 px-6 md:px-8 font-semibold text-white">
                      Global Conference Movements
                    </td>
                    <td className="py-6 px-6 md:px-8 text-slate-350">
                      High-Capacity Grand Tourers
                    </td>
                    <td className="py-6 px-6 md:px-8 font-light text-slate-400">
                      Coordinated multi-vehicle transfers for large events, including school transport and airport runs.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Helper Flag */}
            <div className="lg:hidden text-center py-4 bg-[#080E1C]/20 border-t border-slate-900/60 font-sans text-[10px] text-slate-500 uppercase tracking-widest font-medium select-none">
              ← Swipe right to view full details →
            </div>
          </div>

          <div className="reveal-layer-hidden reveal-sec-btn mt-10 bg-[#080E1C] border border-slate-900/80 p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <FileText className="w-10 h-10 text-amber-500 shrink-0" />
              <div>
                <h4 className="font-serif text-lg font-bold text-white mb-1">Need to arrange regular corporate travel?</h4>
                <p className="font-sans text-xs text-slate-400 font-light">Get in touch with our team to open a corporate account.</p>
              </div>
            </div>
            <button
              onClick={() => handleActionClick("Corporate Logistics")}
              className="w-full md:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.15em] font-bold py-3.5 px-6 rounded-xl transition-all shadow-md cursor-pointer whitespace-nowrap text-center"
            >
              Open a Corporate Account
            </button>
          </div>

        </div>
      </section>

      {/* 5. Frequently Asked Questions (Light Porcelain rhythm) */}
      <section 
        className="py-24 bg-[#F9F9FB] border-t border-slate-200/50"
        itemScope 
        itemType="https://schema.org/FAQPage"
      >
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <span className="reveal-layer-hidden reveal-sec-header font-mono text-10px font-extrabold text-amber-600 uppercase tracking-[0.25em] block mb-3">
              COMPLIANCE &amp; ACCREDITATIONS
            </span>
            <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-4xl text-slate-950 font-medium">
              Corporate Account Questions &amp; Answers
            </h2>
            <p className="reveal-layer-hidden reveal-sec-desc font-sans text-xs md:text-sm text-slate-600 font-light mt-3 max-w-lg mx-auto">
              Everything you need to know about setting up and managing your corporate transport account.
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
                  How do you structure corporate billing, credit facilities, and invoicing?
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
                  "overflow-hidden transition-all duration-350 ease-in-out border-slate-100",
                  openFaq === 1 ? "max-h-72 border-t p-6 md:px-7 md:pb-8" : "max-h-0"
                )}
                itemProp="acceptedAnswer"
                itemScope
                itemType="https://schema.org/Answer"
              >
                <div 
                  className="font-sans text-xs md:text-sm text-slate-600 leading-relaxed font-light"
                  itemProp="text"
                >
                  Every verified corporate account is assigned a dedicated account specialist. We structure custom credit limits, provide consolidated monthly invoicing streams broken down by department codes, and deliver clear, transparent itemised mileage tracking files for internal auditing.
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
                  What insurance, licensing, and safety standards do you maintain?
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
                  "overflow-hidden transition-all duration-350 ease-in-out border-slate-100",
                  openFaq === 2 ? "max-h-72 border-t p-6 md:px-7 md:pb-8" : "max-h-0"
                )}
                itemProp="acceptedAnswer"
                itemScope
                itemType="https://schema.org/Answer"
              >
                <div 
                  className="font-sans text-xs md:text-sm text-slate-600 leading-relaxed font-light"
                  itemProp="text"
                >
                  Every driver we hire holds a full professional licence, undergoes an Enhanced DBS check, and strictly adheres to legal driving hours. All our coaches and minibuses carry comprehensive commercial insurance and meet Euro 6 emission standards, meaning they are fully compliant with London's ULEZ and LEZ zones.
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. High Converting Call to Action Section (Deep Navy) */}
      <section className="bg-[#020617] text-white py-20 px-6 relative overflow-hidden border-t border-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 to-black/80 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-slate-900/30 rounded-full blur-[110px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="reveal-layer-hidden reveal-sec-header font-mono text-[9px] font-extrabold text-amber-500 uppercase tracking-[0.3em] block mb-4">
            CORPORATE TRAVEL
          </span>
          <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-5xl text-white mb-6">
            Set Up a Corporate Account Today
          </h2>
          <p className="reveal-layer-hidden reveal-sec-desc font-sans text-slate-350 text-xs md:text-base leading-relaxed max-w-2xl mx-auto mb-10 font-light">
            Contact our St Albans office to open your account. Get direct access to our booking team, clear monthly invoicing, and priority vehicle availability.
          </p>

          <button
            onClick={() => handleActionClick("Corporate Logistics")}
            className="reveal-layer-hidden reveal-sec-btn group inline-flex items-center gap-3 bg-gradient-to-r from-amber-505 to-amber-600 bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] pointer-events-auto cursor-pointer"
          >
            Request a Corporate Quote
            <ArrowRight className="w-4 h-4 text-slate-950 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
