import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Music, 
  Sparkles, 
  GlassWater, 
  Plane, 
  HeartHandshake, 
  Check, 
  ChevronDown, 
  ArrowRight, 
  Sliders, 
  Anchor
} from 'lucide-react';
import { cn } from './lib/utils';

interface PrivateCoachHireProps {
  onNavigateToHomeAndBook?: (journeyType: string) => void;
}

export function PrivateCoachHire({ onNavigateToHomeAndBook }: PrivateCoachHireProps) {
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

  // 6 capability cards featuring minimalist system labels and heavy SEO matching
  const capabilityCards = [
    {
      label: "Verified Operational Status",
      title: "The Sporting Calendar",
      copy: "Detail high-status transit to Royal Ascot, Wembley Stadium, Twickenham, and Henley Royal Regatta with pristine itinerary co-ordination. Our dispatch networks make sure your groups experience zero latency.",
      icon: <Trophy className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      label: "Verified Operational Status",
      title: "Festivals & Premium Touring",
      copy: "Focus on long-distance luxury travel, glamping crew transit, and bespoke UK sightseeing excursions. Our systems co-ordinate with regional guides to support robust long distance path matching.",
      icon: <Music className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      label: "Verified Operational Status",
      title: "Weddings & Occasions",
      copy: "Detail flawless wedding guest transport logistics for historic country estates, luxury manor venues, and dedicated photography arrival schedules. Our unbranded assets offer a pristine backdrop.",
      icon: <Sparkles className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      label: "Verified Operational Status",
      title: "Evening & Social Hire",
      copy: "Emphasize premium theatre trips, high-end fine dining transfers, and absolute safety with an elite professional driver at the helm. Perfect for private groups looking for peace of mind.",
      icon: <GlassWater className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      label: "Verified Operational Status",
      title: "Aviation & Airport Transfers",
      copy: "Highlight seamless luxury transitions from private aviation terminals, Heathrow VIP bays, and spacious luggage capacities. Enjoy chauffeur driven group travel formats custom configured for you.",
      icon: <Plane className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      label: "Verified Operational Status",
      title: "Discrete Family Gatherings",
      copy: "Stress highly respectful, deeply empathetic, and family-managed transport during personal milestones and sensitive events. Managed with absolute attention to detail by our close family circle.",
      icon: <HeartHandshake className="w-8 h-8 text-amber-500 mb-6" />
    }
  ];

  return (
    <div 
      className="bg-[#FAFAFC] min-h-screen text-[#0f2142] font-sans"
      itemScope 
      itemType="https://schema.org/WebPage"
    >
      {/* 1. HERO SECTION with Porcelain Background */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#F0F2F6] pt-32 pb-16 md:pt-40 md:pb-24 border-b border-slate-200/80">
        <div className="absolute top-0 left-0 w-[420px] h-[420px] bg-slate-100/50 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-0 right-0 w-[520px] h-[520px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          {/* Minimalist bounding box micro-tag matching images layout */}
          <div className="service-badge-load inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/5 border border-slate-950/15 mb-6 select-none shadow-sm">
            <Sliders className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span className="font-mono text-[9px] md:text-10px font-extrabold uppercase tracking-[0.25em] text-[#0f2142]">
              UK PRIVATE LEISURE GROUND TRAVEL
            </span>
          </div>

          <h1 
            className="service-title-load font-serif text-4xl md:text-5xl lg:text-6.5xl text-slate-950 font-medium leading-tight mb-8 max-w-4xl mx-auto tracking-tight"
            itemProp="headline"
          >
            Private Coach Hire &amp; Luxury Minibus Rental
          </h1>

          <p className="service-subtext-load font-sans text-slate-650 font-light text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            Immaculately presented, unbranded private vehicle hire with professional drivers, tailored for prestigious sporting fixtures, luxury weddings, and bespoke group travel across London and the Home Counties.
          </p>

          <div className="service-subtext-load bg-white/80 backdrop-blur-md border border-slate-200/80 p-6 rounded-2xl max-w-2xl mx-auto mb-10 shadow-sm">
            <p className="font-sans text-xs md:text-sm text-slate-600 leading-relaxed font-light">
              We seamlessly integrate high-intent services including <strong className="font-semibold text-slate-900">private coach hire London</strong>, <strong className="font-semibold text-slate-900">luxury minibus rental Hertfordshire</strong>, and premium <strong className="font-semibold text-slate-900">coach hire with driver</strong> configs to handle luxury wedding guest transport and executive minibus hire Essex requirements.
            </p>
          </div>

          <div className="service-buttons-load flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleActionClick("Private Coach Hire")}
              className="w-full sm:w-auto bg-slate-950 hover:bg-slate-900 text-white font-sans text-xs uppercase tracking-[0.2em] font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] cursor-pointer"
            >
              Start Private Inquiry
            </button>
            <button
              onClick={() => {
                const fleetSection = document.getElementById("fleet-sizes");
                if (fleetSection) {
                  fleetSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-950 border border-slate-200 font-sans text-xs uppercase tracking-[0.15em] font-medium py-4 px-8 rounded-xl transition-colors cursor-pointer"
            >
              Explore Fleet Capacity
            </button>
          </div>
        </div>
      </section>

      {/* 2. THE 6-CARD CAPABILITY GRID SECTION */}
      <section className="py-24 bg-[#FAFAFC] border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <span className="reveal-layer-hidden reveal-sec-header font-mono text-10px font-bold text-amber-600 uppercase tracking-[0.2em] mb-4 block">
              OUR SERVICES
            </span>
            <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-4.5xl text-slate-950 font-medium leading-tight">
              Tailored Group Travel for Holidays, Excursions, and Family Milestones
            </h2>
            <div className="reveal-layer-hidden reveal-sec-desc w-12 h-1 bg-amber-500/80 mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilityCards.map((card, idx) => (
              <div 
                key={idx}
                className="reveal-layer-hidden reveal-sec-card bg-white border border-slate-200/80 p-8 md:p-10 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:scale-[1.01] hover:border-slate-300/80"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] font-bold tracking-widest text-slate-400">
                      {card.label}
                    </span>
                    <span className="text-[9px] font-semibold bg-amber-500/10 text-amber-700 px-2 py-0.5 rounded">
                      ACTIVE
                    </span>
                  </div>

                  {card.icon}

                  <h3 className="font-serif text-xl md:text-2xl text-slate-950 font-medium mb-4">
                    {card.title}
                  </h3>

                  <p className="font-sans text-xs md:text-sm text-slate-600 leading-relaxed font-light">
                    {card.copy}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                    SLA Checked // Punctual
                  </span>
                  <button 
                    onClick={() => handleActionClick(`Private Hire - ${card.title}`)}
                    className="reveal-layer-hidden reveal-sec-btn text-amber-600 hover:text-amber-700 text-xs font-semibold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                  >
                    Select
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PRIVATE FLEET OPTIONS */}
      <section id="fleet-sizes" className="py-24 bg-[#FCFCFD] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="reveal-layer-hidden reveal-sec-header font-mono text-10px font-extrabold text-amber-600 uppercase tracking-[0.25em] block mb-3">
              Our Fleet Sizes
            </span>
            <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-4.5xl leading-tight text-slate-950">
              Coach &amp; Minibus Seating Options
            </h2>
            <p className="reveal-layer-hidden reveal-sec-desc font-sans text-xs md:text-sm text-slate-600 font-light max-w-2xl mx-auto leading-relaxed mt-4">
              Our complete vehicle size and seating guidelines, helping you find the perfect coach or minibus for your group.
            </p>
          </div>

          {/* Table Container - Mobile Responsive */}
          <div className="reveal-layer-hidden reveal-sec-card w-full overflow-hidden border border-slate-200 rounded-2xl bg-white shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-mono text-[10px] md:text-xs uppercase tracking-wider">
                    <th className="py-6 px-6 md:px-8 font-semibold">Fleet Vehicle Tier</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Active Seating Configurations</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Optimal Use Case Profile</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/80 text-slate-700">
                  <tr className="reveal-layer-hidden reveal-sec-node-1 hover:bg-slate-50/50 transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-slate-950">
                      Standard Executive Luxury Minibus
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      9 to 16 seaters with plush leather seating layouts, climate controls, and unbranded black-gloss finishes
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light text-slate-600">
                      Dedicated luxury wedding guest transport and executive minibus hire Essex services with live 24/7 client dispatch base support links
                    </td>
                  </tr>
                  <tr className="reveal-layer-hidden reveal-sec-node-2 hover:bg-slate-50/50 transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-slate-950">
                      Mid-Size VIP Group Coach
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      19 to 30 seating layouts featuring fully integrated climate modules and tinted privacy glass co-ordinates
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light text-slate-600">
                      High status transit to Wembley Stadium, chauffeur driven group travel, and luxury minibus rental Hertfordshire routes
                    </td>
                  </tr>
                  <tr className="reveal-layer-hidden reveal-sec-node-3 hover:bg-slate-50/50 transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-slate-950">
                      Full-Volume Touring Carrier
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      49 to 53 seats utilising supreme unbranded body models and spacious undercarriage luggage storage solutions
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light text-slate-600">
                      Bespoke UK sightseeing excursions, coach hire Royal Ascot events, and long distance festival transit routes with premium co-ordinators
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Swipe Notice */}
            <div className="lg:hidden text-center py-4 bg-slate-50/50 border-t border-slate-100 font-sans text-[10px] text-slate-500 uppercase tracking-widest font-medium select-none">
              ← Swipe right to view full specifications table →
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE NAVY HERITAGE / FAMILY LEGACY SECTION */}
      <section className="reveal-layer-hidden reveal-sec-card bg-[#050C1A] text-white border-y border-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-transparent to-black/65 pointer-events-none z-0" />
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-slate-900/30 rounded-full blur-[130px] pointer-events-none z-0" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 flex flex-col lg:flex-row gap-16 items-center relative z-10">
          <div className="w-full lg:w-1/2 order-2 lg:order-1 flex flex-col items-start text-left">
            <span className="reveal-layer-hidden reveal-sec-header inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-500 mb-6 font-mono">
              The Family Distinction
            </span>
            <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-5xl text-white leading-tight mb-6">
              A Family-Run Legacy of Service
            </h2>
            <p className="reveal-layer-hidden reveal-sec-desc font-sans text-slate-300 font-light text-base md:text-lg leading-relaxed mb-6">
              Unlike anonymous aggregators, UGO is owned and operated by a close-knit circle of family and friends. When you book a private event, you are not just a job number, you are a client of our family business. You receive direct mobile access to management 24/7 to ensure your day goes exactly as planned.
            </p>
            <button 
              onClick={() => handleActionClick("Private Coach Hire Direct")}
              className="reveal-layer-hidden reveal-sec-btn bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.15em] font-bold py-3.5 px-8 rounded-xl transition-all"
            >
              Contact Our Family Office
            </button>
          </div>
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="reveal-layer-hidden reveal-sec-card aspect-[4/3] bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col items-center justify-center p-8 relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-80" />
              <Anchor className="w-12 h-12 text-amber-500 mb-4 animate-bounce" />
              <div className="text-center z-10">
                <span className="font-sans text-slate-400 text-xs uppercase tracking-[0.2em] font-semibold block transition-transform duration-500 group-hover:scale-105">
                  [ Private Leisure Fleet Lineup ]
                </span>
                <span className="font-mono text-[10px] text-slate-550 block mt-2">
                  100% Unbranded Heritage Fleet
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE FAQ Accordion Section */}
      <section 
        className="py-24 bg-[#FAFAFC]"
        itemScope 
        itemType="https://schema.org/FAQPage"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="reveal-layer-hidden reveal-sec-header font-mono text-10px font-extrabold text-amber-600 uppercase tracking-[0.25em] block mb-3">
              COMMON QUESTIONS
            </span>
            <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-4xl text-slate-950 font-medium">
              Private Leisure Travel FAQs
            </h2>
            <p className="reveal-layer-hidden reveal-sec-desc font-sans text-xs md:text-sm text-slate-650 font-light mt-3 max-w-lg mx-auto">
              Clear direct answers regarding bookings, unbranded vehicle policies, and professional transit.
            </p>
          </div>

          <div className="space-y-4">
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
                  Do your private coach hire services operate with unbranded vehicles?
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
                  Yes, all our executive vehicles and coaches are completely unbranded with pristine black gloss premium finishes, deep tinted privacy glass, and zero advertising markings, ensuring total discretion for weddings and events.
                </div>
              </div>
            </div>

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
                  Can we specify custom multi-stop routes for a wedding or sporting excursion?
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
                  Absolutely. Our co-ordinators can custom map precision itineraries for wedding guest logistics and sporting events, specifying exact driver contact protocols, timing alignments, and secondary pickup corridors if schedules change.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FRICTIONLESS CODE CTA PANEL */}
      <section className="bg-[#020617] text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 to-black/80 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-slate-900/30 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="reveal-layer-hidden reveal-sec-header font-mono text-[9px] font-extrabold text-amber-500 uppercase tracking-[0.3em] block mb-4">
            REGULAR DESPATCH PORTAL
          </span>
          <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-5xl text-white mb-6">
            Acquire Seamless Private Leisure Travel
          </h2>
          <p className="reveal-layer-hidden reveal-sec-desc font-sans text-slate-350 text-xs md:text-base leading-relaxed max-w-2xl mx-auto mb-10 font-light">
            Bring supreme family-operated co-ordination and zero-delay multi-vehicle deployment to your coming wedding, sporting, or touring event.
          </p>

          <button
            onClick={() => handleActionClick("Private Coach Hire")}
            className="reveal-layer-hidden reveal-sec-btn group inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] pointer-events-auto cursor-pointer"
          >
            Launch Private Booking Interface
            <ArrowRight className="w-4 h-4 text-slate-950 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
