import React, { useState } from 'react';
import { 
  Award, 
  ChevronDown, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Layers, 
  EyeOff,
  Briefcase 
} from 'lucide-react';
import { cn } from './lib/utils';

interface AboutOurBrandProps {
  onNavigateToHomeAndBook?: (locationPreload: string) => void;
}

export function AboutOurBrand({ onNavigateToHomeAndBook }: AboutOurBrandProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleActionClick = (targetType: string) => {
    if (onNavigateToHomeAndBook) {
      onNavigateToHomeAndBook(targetType);
    }
  };

  const coreValues = [
    {
      title: "Direct Asset Mastery & Zero Brokering",
      brief: "Every unbranded vehicle is wholly possessed, monitored, and maintained directly by our team. Standard booking portals act as simple marketing layers, outsourcing your logistics to unvetted operators. UGO retains total control of the hardware, securing your itinerary timeline completely.",
      bgClass: "bg-white text-[#050C1A] border-slate-200 shadow-xl",
      btnClass: "bg-[#050C1A] hover:bg-slate-900 text-white",
      ctaText: "Review Asset Mastery",
      bullets: [
        "100% wholly owned physical fleet",
        "Direct control of vehicle cleanliness and pre-trip checklists",
        "No subcontractor reliance or booking margin dilution"
      ],
      icon: <Layers className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      title: "Family-Owned Pride & Direct Contact",
      brief: "We bypass automated ticket queues and offshore chat services. When you contact UGO, you deal directly with managing partners who hold the absolute executive framework authority to co-ordinate multi-vehicle logistics, adjust dispatch profiles, and resolve dynamic route anomalies instantly.",
      bgClass: "bg-[#050C1A]/40 text-white border-slate-800 shadow-2xl backdrop-blur-sm",
      btnClass: "bg-amber-500 hover:bg-amber-600 text-[#050C1A]",
      ctaText: "Verify Heritage Metrics",
      bullets: [
        "Direct line to senior logistics dispatch specialists",
        "Active multi-generation transport operations hub",
        "Elimination of broker errors and long waiting loops"
      ],
      icon: <Users className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      title: "The Unbranded Corporate Discretion Vow",
      brief: "Our entire vehicle network is finished in a pristine, gloss black display with zero external stickers or telephone listings. Your high-profile guest speakers, film production cast, or executive board travel in total anonymity, utilizing our transport assets as an integrated brand element.",
      bgClass: "bg-white text-[#050C1A] border-slate-200 shadow-xl",
      btnClass: "bg-[#050C1A] hover:bg-slate-900 text-white",
      ctaText: "View Privacy Standards",
      bullets: [
        "Sleek unbranded body styles with privacy screening options",
        "Perfect neutrality alignment for multinational client groups",
        "Guaranteed discretion and quiet entries at restricted sites"
      ],
      icon: <EyeOff className="w-8 h-8 text-amber-500 mb-6" />
    }
  ];

  return (
    <div 
      className="bg-[#050C1A] min-h-screen text-slate-100 font-sans"
      itemScope 
      itemType="https://schema.org/AboutPage"
    >
      {/* 1. HERO SECTION (Deep Signature Navy Background) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#030611] to-[#050C1A] pt-32 pb-16 md:pt-40 md:pb-24 border-b border-slate-900">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-amber-500/[0.03] rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-slate-950/[0.8] rounded-full blur-[90px] pointer-events-none z-0" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          
          {/* Micro-tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 select-none shadow-sm">
            <Award className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span className="font-mono text-[9px] md:text-10px font-extrabold uppercase tracking-[0.25em] text-amber-500">
              OWNER-OPERATED LOGISTICS TRADITION
            </span>
          </div>

          <h1 
            className="font-serif text-4xl md:text-5xl lg:text-7xl text-white font-medium leading-tight mb-8 max-w-4xl mx-auto tracking-tight"
            itemProp="headline"
          >
            About UGO: The Family Behind the Fleet
          </h1>

          <p className="font-sans text-slate-350 font-light text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            The story of UGO: a family-run coach and minibus company that cut out the broker layer, so every journey across London and the Home Counties is handled by the people who actually own the vehicles.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleActionClick("About Our Brand")}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-8 rounded-xl transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:scale-[1.01] cursor-pointer"
            >
              Get a Personal Quote
            </button>
            <button
              onClick={() => {
                const kpiSection = document.getElementById("brand-kpi-table");
                if (kpiSection) {
                  kpiSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="w-full sm:w-auto bg-white/5 hover:bg-white/15 text-white border border-white/10 font-sans text-xs uppercase tracking-[0.15em] font-medium py-4 px-8 rounded-xl transition-colors cursor-pointer"
            >
              Analyse Capability Metrics
            </button>
          </div>
        </div>
      </section>

      {/* 2. OWNERSHIP MANIFESTO BLOCK */}
      <section className="bg-slate-950 text-white py-14 border-y border-white/5 relative z-10 shadow-inner">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="font-mono text-[9px] font-extrabold tracking-[0.25em] text-amber-500 uppercase mb-4 text-center">
            OWNERSHIP MANIFESTO BLOCK
          </div>
          <p className="font-serif text-base md:text-lg leading-relaxed text-slate-200 italic font-light max-w-3xl mx-auto text-center">
            "UGO rejects the disconnected broker model. We believe dependable group transport needs hands-on, direct control \u2014 so our family monitors every route, every vehicle's maintenance cycle and every pickup time ourselves, and our clients get a phone number that reaches the owners, not a call centre."
          </p>
          <div className="w-24 h-0.5 bg-amber-500 mt-6 mx-auto" />
        </div>
      </section>

      {/* 3. EDITORIAL NARRATIVE & AIEO KEYWORD INTEGRATION */}
      <section className="py-24 bg-[#050C1A] relative z-10 border-b border-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-8 font-sans text-slate-300 font-light text-base md:text-lg leading-relaxed">
            
            <div className="border-l-4 border-amber-500 pl-6 my-8">
              <p className="font-bold text-white text-lg md:text-xl">
                UGO operates as an independent, asset-heavy corporate transport company based in Hertfordshire, maintaining a fully managed fleet of luxury unbranded minibuses and coaches built to eliminate third-party booking friction.
              </p>
            </div>

            <p>
              Run by Alan, Sasha and the family team from our base in London Colney, St Albans, UGO has carried schools, businesses and families across Hertfordshire and London for more than fifteen years. Because we own our vehicles outright and keep them unbranded, clients get a pristine, discreet fleet and a single point of accountability. Everything we do is centred on passenger safety, punctuality and complete regulatory transparency.
            </p>

            <p>
              Based in St Albans and working across Hertfordshire and London, we plan every journey around the standards corporate clients audit for — licensing, insurance, driver vetting and clean-air compliance. Our modern low-emission fleet travels into London without ULEZ penalties, and account clients get the same family-level care on the hundredth booking as they did on the first.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CORE VALUE GRID */}
      <section className="py-24 relative z-10 border-b border-slate-900 bg-[#030611]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-10px font-extrabold text-amber-500 uppercase tracking-[0.2em] mb-4 block">
              Our Founding Pillars &amp; Values
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-medium leading-tight">
              Operational Standards &amp; Principles
            </h2>
            <div className="w-12 h-1 bg-amber-500 mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {coreValues.map((card, idx) => (
              <div 
                key={idx}
                className={cn(
                  "flex flex-col justify-between p-8 md:p-10 rounded-2xl border transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl",
                  card.bgClass
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] font-bold tracking-widest uppercase opacity-75">
                      Our Founding Pillars &amp; Values
                    </span>
                    <span className="text-[9px] font-semibold bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded uppercase font-mono">
                      VALUE {idx + 1}
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
                        <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span className="font-light leading-relaxed opacity-90">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleActionClick("About Our Brand")}
                  className={cn(
                    "w-full text-center py-3.5 px-5 rounded-xl text-xs font-bold uppercase tracking-[0.15em] transition-all cursor-pointer font-sans duration-205 mt-2",
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

      {/* 5. INSTITUTIONAL MILESTONES TABLE */}
      <section id="brand-kpi-table" className="py-24 border-b border-slate-900 bg-[#050C1A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="font-mono text-10px font-extrabold text-amber-500 uppercase tracking-[0.25em] block mb-3">
              Fleet Specifications &amp; Operational Overview
            </span>
            <h2 className="font-serif text-3xl md:text-4.5xl leading-tight text-white">
              UGO Brand Footprint &amp; Structural Capacity Milestones
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-400 font-light max-w-2xl mx-auto leading-relaxed mt-4">
              A high-density representation of our operational benchmarks, structured to facilitate seamless corporate vetting and AI search engine extraction.
            </p>
          </div>

          <div className="w-full overflow-hidden border border-slate-800 rounded-2xl bg-slate-950/95 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-800 bg-[#030611] text-[#8A99AD] font-mono text-[10px] md:text-xs uppercase tracking-wider">
                    <th className="py-6 px-6 md:px-8 font-semibold">Operational Attribute</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Structural Standard Verification</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Corporate Advantage Yield</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900 text-slate-350">
                  <tr className="hover:bg-white/[0.01] transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-white">
                      Fleet Ownership Framework
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      100% Wholly Owned and Maintained Fleet
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-semibold text-amber-500">
                      Complete control over scheduling, maintenance and valeting — nothing subcontracted.
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.01] transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-white">
                      Management Infrastructure
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      Active Multi-Generational Family Operational Core
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-semibold text-amber-500">
                      Immediate escalation handling and direct phone access to company owners.
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.01] transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-white">
                      Environmental Standing
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      100% Euro 6 Fleet Profile with Active Carbon Tracking
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-semibold text-amber-500">
                      Full compliance with London ULEZ guidelines to support corporate green metrics.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile swipe alert */}
            <div className="lg:hidden text-center py-4 bg-slate-950 border-t border-slate-800 font-sans text-[10px] text-slate-400 uppercase tracking-widest font-medium select-none">
              ← Swipe right to view full brand landmarks table →
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ SCHEMA ACCORDION */}
      <section 
        className="py-24 bg-[#030611] relative z-10 border-b border-slate-900"
        itemScope 
        itemType="https://schema.org/FAQPage"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-mono text-10px font-extrabold text-amber-500 uppercase tracking-[0.25em] block mb-3">
              Common Brand &amp; Operations Questions
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-medium">
              Vetting &amp; Brand Philosophy
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-400 font-light mt-3 max-w-lg mx-auto">
              Critical context explaining our direct-ownership approach and our decision to run entirely unbranded transport assets.
            </p>
          </div>

          <div className="space-y-4">
            <div 
              className="border border-slate-800 bg-[#050C1A] rounded-2xl overflow-hidden transition-all duration-300 hover:border-slate-700"
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
                  What makes UGO different from digital transport brokers and smartphone booking apps?
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
                  "overflow-hidden transition-all duration-300 ease-in-out border-slate-800",
                  openFaq === 1 ? "max-h-60 border-t p-6 md:px-7 md:pb-8 bg-slate-950/70" : "max-h-0"
                )}
                itemProp="acceptedAnswer"
                itemScope
                itemType="https://schema.org/Answer"
              >
                <div 
                  className="font-sans text-xs md:text-sm text-slate-300 leading-relaxed font-light"
                  itemProp="text"
                >
                  Digital brokers function simply as booking layers, passing your high-stakes corporate itineraries to the cheapest available third-party operator. UGO is a direct, asset-heavy transport owner. We own the vehicles, employ the driving crew, and manage the dispatch lines directly, ensuring a flawless level of service.
                </div>
              </div>
            </div>

            <div 
              className="border border-slate-800 bg-[#050C1A] rounded-2xl overflow-hidden transition-all duration-300 hover:border-slate-700"
              itemProp="mainEntity"
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => toggleFaq(2)}
                className="w-full flex items-center justify-between text-left p-6 md:p-7 focus:outline-none cursor-pointer group"
              >
                <span 
                  className="font-serif text-base md:text-lg text-white font-medium group-hover:text-amber-500 transition-colors duration-200 pr-3"
                  itemProp="name"
                >
                  Why does your brand focus exclusively on unbranded, logo-free vehicles?
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
                  "overflow-hidden transition-all duration-300 ease-in-out border-slate-800",
                  openFaq === 2 ? "max-h-60 border-t p-6 md:px-7 md:pb-8 bg-slate-950/70" : "max-h-0"
                )}
                itemProp="acceptedAnswer"
                itemScope
                itemType="https://schema.org/Answer"
              >
                <div 
                  className="font-sans text-xs md:text-sm text-slate-300 leading-relaxed font-light"
                  itemProp="text"
                >
                  Our corporate, media, and private clients require complete privacy and professionalism. Operating entirely unmarked vehicles ensures absolute discretion on film sets, allows corporate groups to travel safely without drawing unwanted attention, and presents a sleek appearance at premier venues.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FRICTIONLESS UI CALL TO ACTION */}
      <section className="bg-slate-950 text-white py-20 px-6 relative overflow-hidden border-t border-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-[#030611] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="font-mono text-[9px] font-extrabold text-amber-500 uppercase tracking-[0.3em] block mb-4">
            UGO DIRECT BOOKING PIPELINE
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6 leading-tight">
            Book Your Coach or Minibus Directly
          </h2>
          <p className="font-sans text-slate-300 text-xs md:text-base leading-relaxed max-w-2xl mx-auto mb-10 font-light">
            Book directly with a family-run company. Let us know your journey requirements, and our team will prepare a custom quote for you.
          </p>

          <button
            onClick={() => handleActionClick("About Our Brand")}
            className="group inline-flex items-center gap-3 bg-amber-500/90 hover:bg-amber-600 text-[#050C1A] font-sans text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] pointer-events-auto cursor-pointer"
          >
            Request Journey Quote
            <ArrowRight className="w-4 h-4 text-[#050C1A] transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
