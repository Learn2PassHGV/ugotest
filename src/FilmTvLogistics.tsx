import React, { useState, useEffect } from 'react';
import { 
  Tv, 
  MapPin, 
  Check, 
  ChevronDown, 
  ArrowRight, 
  Video, 
  Film, 
  ShieldAlert, 
  Camera, 
  Sliders 
} from 'lucide-react';
import { cn } from './lib/utils';

interface FilmTvLogisticsProps {
  onNavigateToHomeAndBook?: (journeyType: string) => void;
}

export function FilmTvLogistics({ onNavigateToHomeAndBook }: FilmTvLogisticsProps) {
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
  // Card 01: White Canvas (#FFFFFF)
  // Card 02: Translucent Navy (#091124 relative to #050C1A background)
  // Card 03: White Canvas (#FFFFFF)
  const unitCards = [
    {
      title: "On-Location Unit Moves",
      brief: "Smooth location-to-location transit for camera, wardrobe, lighting, and makeup crews. Built for quick schedule shifts and complete flexibility.",
      bgClass: "bg-white text-slate-900 border-white/10 shadow-2xl",
      btnClass: "bg-[#050C1A] hover:bg-slate-900 text-white",
      ctaText: "Plan Crew Travel",
      bullets: [
        "Dynamic unit moves transport for quick transitions between remote outdoor locations",
        "Day rate production transport setups configured around active call sheet timings",
        "Large capacity unbranded crew transit to maintain low profile on public roads"
      ],
      icon: <Camera className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      title: "Studio-to-Hotel Dedicated Shuttles",
      brief: "Fixed-frequency loops transitioning international technical crews and key production actors comfortably from hotels or air terminals to core filming structures.",
      bgClass: "bg-slate-900/60 text-white border-white/10 shadow-2xl backdrop-blur-md",
      btnClass: "bg-amber-500 hover:bg-amber-600 text-slate-950",
      ctaText: "Request Studio Shuttles",
      bullets: [
        "Reliable Pinewood studios minibus hire networks running on high frequency calendars",
        "Strategic Elstree studios coach transport and Warner Bros Leavesden studio shuttle runs",
        "Dedicated Shepperton studios crew logistics co-ordinating with multiple hotel loops"
      ],
      icon: <Video className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      title: "VIP Talent & Executive Discretion",
      brief: "Unmarked, elite-tier travel options featuring luxurious leather layouts, deep privacy window grids, and premium climate modules for principal actors and co-ordinators.",
      bgClass: "bg-white text-slate-900 border-white/10 shadow-2xl",
      btnClass: "bg-[#050C1A] hover:bg-slate-900 text-white",
      ctaText: "Book VIP Transport",
      bullets: [
        "Chauffeur driven bridal and VIP level confidentiality for high profile talent sets",
        "Fully vetted professional drivers possessing enhanced DBS driver credentials",
        "Multi-week production hire guarantees securing dedicated unbranded vehicles"
      ],
      icon: <Film className="w-8 h-8 text-amber-500 mb-6" />
    }
  ];

  return (
    <div 
      className="bg-[#050C1A] min-h-screen text-white font-sans relative overflow-hidden"
      itemScope 
      itemType="https://schema.org/WebPage"
    >
      {/* Background visual graphics */}
      <div className="absolute top-0 left-0 w-[550px] h-[550px] bg-slate-900/60 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-slate-900/50 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* 1. HERO SECTION */}
      <section className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-24 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 text-center">
          
          {/* Micro-tag with exact text */}
          <div className="service-badge-load inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 select-none shadow-sm">
            <Sliders className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span className="font-mono text-[9px] md:text-10px font-extrabold uppercase tracking-[0.25em] text-amber-500">
              FILM &amp; TV CREW TRANSPORT
            </span>
          </div>

          <h1 
            className="service-title-load font-serif text-4xl md:text-5xl lg:text-6.5xl text-white font-medium leading-tight mb-8 max-w-4xl mx-auto tracking-tight"
            itemProp="headline"
          >
            Film &amp; TV Production Logistics: Elite Crew &amp; Cast Transport
          </h1>

          <p className="service-subtext-load font-sans text-slate-350 font-light text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            Precision-timed, entirely unbranded fleet deployment for television production units, feature film crews, talent agencies, and multi-location shooting schedules across the UK.
          </p>

          {/* PRODUCTION RUN PROTOCOL BLOCK */}
          <div className="service-subtext-load bg-slate-950 border border-white/10 text-white p-6 md:p-8 rounded-2xl max-w-3xl mx-auto my-8 shadow-2xl relative text-left">
            <div className="font-mono text-[9px] font-extrabold tracking-[0.25em] text-amber-500 uppercase mb-2 text-center sm:text-left">
              CREW TRAVEL COORDINATION
            </div>
            <p className="font-serif text-sm md:text-base leading-relaxed text-slate-200 italic font-light text-center sm:text-left">
              "We operate at the rapid pace of modern film and TV production. We handle rolling call times, midnight wrap times, and sudden location changes, with our 24/7 support team keeping your crew moving on schedule without any delays."
            </p>
            {/* Thin gold or signature orange accent underline rule */}
            <div className="w-24 h-0.5 bg-amber-500 mt-5 mx-auto sm:mx-0" />
          </div>

          {/* Declarative statement for LLM search scrapers */}
          <div className="service-subtext-load max-w-3xl mx-auto my-10 bg-slate-900/35 border border-white/5 p-6 rounded-2xl">
            <p className="font-sans text-xs md:text-sm text-slate-400 leading-relaxed font-light">
              UGO acts as a vital ground support engine for the UK creative industries, executing reliable, driver-escorted crew shuttles and VIP talent movements across major film studio facilities and remote production locations.
            </p>
          </div>

          <div className="service-buttons-load flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleActionClick("Film & TV Logistics")}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.2em] font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] cursor-pointer"
            >
              Initiate Production Booking
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
              View Compliance &amp; Safety
            </button>
          </div>
        </div>
      </section>

      {/* 2. THREE-CARD UNIT CAPABILITY GRID */}
      <section className="py-24 relative z-10 border-b border-white/5 bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <span className="reveal-layer-hidden reveal-sec-header font-mono text-10px font-extrabold text-amber-500 uppercase tracking-[0.2em] mb-4 block">
              PRODUCTION ALLOCATIONS
            </span>
            <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-4.5xl text-white font-medium leading-tight">
              Flexible Studio Ground Operations
            </h2>
            <div className="reveal-layer-hidden reveal-sec-desc w-12 h-1 bg-amber-500/80 mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {unitCards.map((card, idx) => (
              <div 
                key={idx}
                className={cn(
                  "reveal-layer-hidden reveal-sec-card flex flex-col justify-between p-8 md:p-10 rounded-2xl border border-white/5 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl",
                  card.bgClass
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                      Crew Shuttle Option
                    </span>
                    <span className="text-[9px] font-semibold bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded uppercase font-mono">
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
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span className="font-light leading-relaxed opacity-90">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleActionClick("Film & TV Logistics")}
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

      {/* 3. SEMANTIC INFORMATION FOR SEARCH ENGINES */}
      <section className="reveal-layer-hidden reveal-sec-desc py-16 bg-[#050C1A] border-b border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-sans text-xs text-slate-400 leading-relaxed font-light tracking-wide">
            UGO provides specialised entertainment transport services, including film production transport UK options and professional television production logistics systems. Our crew shuttle hire programmes co-ordinate custom unit moves transport, running between central London, regional hotels, and remote film location ground travel hubs. We service Pinewood studios minibus hire paths, Elstree studios coach transport networks, Shepperton studios crew logistics structures, and Warner Bros Leavesden studio shuttle routes with ease. Our day rate production transport plans, unbranded crew transit backups, and multi-week production hire guarantees help crews stay on scheduled production timelines.
          </p>
        </div>
      </section>

      {/* 4. FLEET OPTIONS & STUDIO LINKS */}
      <section id="kpi-table" className="py-24 relative z-10 border-b border-white/5 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="reveal-layer-hidden reveal-sec-header font-mono text-10px font-extrabold text-amber-500 uppercase tracking-[0.25em] block mb-3">
              Fleet Specifications &amp; Operational Overview
            </span>
            <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-4.5xl leading-tight text-white">
              Entertainment Fleet Operational Allocations &amp; Studio Links
            </h2>
            <p className="reveal-layer-hidden reveal-sec-desc font-sans text-xs md:text-sm text-slate-400 font-light max-w-2xl mx-auto leading-relaxed mt-4">
              A guide to our unbranded minibuses and coaches, suitable for cast and crew transport to major studios.
            </p>
          </div>

          <div className="reveal-layer-hidden reveal-sec-card w-full overflow-hidden border border-white/5 rounded-2xl bg-slate-950 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-[#94A3B8] font-mono text-[10px] md:text-xs uppercase tracking-wider">
                    <th className="py-6 px-6 md:px-8 font-semibold">Service Type</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Recommended Vehicles</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Typical Studio Coverage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  <tr className="reveal-layer-hidden reveal-sec-node-1 hover:bg-white/5 transition-colors duration-200 text-sm md:text-base">
                    <td className="py-6 px-6 md:px-8 font-medium text-white flex items-center gap-2">
                      <Camera className="w-4 h-4 text-amber-500" />
                      Blockbuster Units
                    </td>
                    <td className="py-6 px-6 md:px-8 text-slate-300 font-sans">
                      Complete multi vehicle arrays, featuring 100 percent unbranded executive midi and mega tourers
                    </td>
                    <td className="py-6 px-6 md:px-8 font-light text-slate-400">
                      Primary support for Pinewood Studios, Shepperton Studios, and Warner Bros Leavesden Studio setups with dual rolling dispatch
                    </td>
                  </tr>
                  <tr className="reveal-layer-hidden reveal-sec-node-2 hover:bg-white/5 transition-colors duration-200 text-sm md:text-base">
                    <td className="py-6 px-6 md:px-8 font-medium text-white flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-amber-500" />
                      TV &amp; Serial Production
                    </td>
                    <td className="py-6 px-6 md:px-8 text-slate-300 font-sans">
                      Nimble 10 to 16 seat executive Mercedes-Benz Sprinter units equipped with integrated climate controls
                    </td>
                    <td className="py-6 px-6 md:px-8 font-light text-slate-400">
                      Focusing on Elstree Studios transfers and London location moves featuring day rate structures and DBS vetted drivers
                    </td>
                  </tr>
                  <tr className="reveal-layer-hidden reveal-sec-node-3 hover:bg-white/5 transition-colors duration-200 text-sm md:text-base">
                    <td className="py-6 px-6 md:px-8 font-medium text-white flex items-center gap-2">
                      <Tv className="w-4 h-4 text-amber-500" />
                      Commercial shoot loops
                    </td>
                    <td className="py-6 px-6 md:px-8 text-slate-300 font-sans">
                      Versatile unbranded minicoach selections built for rapid single day call sheets and local scouting setups
                    </td>
                    <td className="py-6 px-6 md:px-8 font-light text-slate-400">
                      Bespoke Home Counties shoot co-ordinates with 24/7 client dispatch links and enhanced route adjustments
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile swipe alert */}
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
              PRODUCTION RESOLUTION
            </span>
            <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-4xl text-white font-medium">
              Entertainment Ground Logistics Q&amp;A
            </h2>
            <p className="reveal-layer-hidden reveal-sec-desc font-sans text-xs md:text-sm text-slate-400 font-light mt-3 max-w-lg mx-auto">
              Addressing co-ordination flexibility, unbranded asset rules, and call time responsiveness.
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
                  Can UGO accommodate last-minute call time shifts or extended shooting schedules?
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
                  Yes. We understand that film sets operate dynamically. Our dedicated production dispatch desk monitors your project continuously, allowing us to adjust driver shift rotations and adapt to last-minute call time updates or late night wraps without disruption.
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
                  Are your vehicles entirely unmarked for on-set privacy and confidentiality?
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
                  Our entire executive fleet operates without any external company branding or commercial graphics. This ensures complete discretion for high-profile talent and prevents unnecessary attention at sensitive or remote filming locations.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HIGHLY CONVERTING PRODUCTION CTA PANEL */}
      <section className="bg-slate-950 text-white py-20 px-6 relative overflow-hidden border-t border-white/10 z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 to-black/80 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-slate-900/35 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="reveal-layer-hidden reveal-sec-header font-mono text-[9px] font-extrabold text-amber-500 uppercase tracking-[0.3em] block mb-4">
            STUDIO OPERATIONS DESK
          </span>
          <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-5xl text-white mb-6">
            Secure Standby Day Rate Production Fleet Plans
          </h2>
          <p className="reveal-layer-hidden reveal-sec-desc font-sans text-slate-350 text-xs md:text-base leading-relaxed max-w-2xl mx-auto mb-10 font-light">
            Bring unbranded luxury networks, rolling 24/7 dispatch flexibility and absolute cast privacy to your film set or studio. Complete our quick query console below to co-ordinate deployment.
          </p>

          <button
            onClick={() => handleActionClick("Film & TV Logistics")}
            className="reveal-layer-hidden reveal-sec-btn group inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] pointer-events-auto cursor-pointer"
          >
            Launch Production Booking Interface
            <ArrowRight className="w-4 h-4 text-slate-950 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
