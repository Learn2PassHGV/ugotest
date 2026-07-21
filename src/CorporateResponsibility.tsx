import React, { useState } from 'react';
import { 
  Leaf, 
  ChevronDown, 
  ArrowRight, 
  Globe, 
  Heart, 
  ShieldCheck, 
  FileCheck,
  Award 
} from 'lucide-react';
import { cn } from './lib/utils';

interface CorporateResponsibilityProps {
  onNavigateToHomeAndBook?: (locationPreload: string) => void;
}

export function CorporateResponsibility({ onNavigateToHomeAndBook }: CorporateResponsibilityProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleActionClick = (targetType: string) => {
    if (onNavigateToHomeAndBook) {
      onNavigateToHomeAndBook(targetType);
    }
  };

  const esgCards = [
    {
      title: "Environmental Accountability & Carbon Metrics",
      brief: "We record other gas emissions and track mileage to supply corporate sustainability officer roles with exact fuel metrics, simplifying the integration of transport footprints into your regular carbon ledger sheets.",
      bgClass: "bg-white text-[#050C1A] border-slate-200 shadow-xl",
      btnClass: "bg-[#050C1A] hover:bg-slate-900 text-white",
      ctaText: "Request Carbon Metrics",
      bullets: [
        "Itemised carbon fuel-burn monitoring per corporate dispatch",
        "Clear documentation mapping to support climate reporting",
        "Active route modeling configured to reduce global fuel load"
      ],
      icon: <Leaf className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      title: "Ethical Supply Chains & Labor Rights",
      brief: "Every team member operates inside premium employee conditions with proper hourly shift monitoring. UGO rejects gig models and stays aligned with fair compensation guidelines to guard passenger welfare and driver wellness.",
      bgClass: "bg-[#050C1A]/40 text-white border-slate-800 shadow-2xl backdrop-blur-sm",
      btnClass: "bg-amber-500 hover:bg-amber-600 text-[#050C1A]",
      ctaText: "Audit Labor Standards",
      bullets: [
        "Zero hour contracts are avoided completely",
        "Continuous driver safety briefings and physical checks",
        "Strict adherence to official rest schedules and driver rotations"
      ],
      icon: <Globe className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      title: "Local Community Transport Initiatives",
      brief: "Maintaining deep local community integration is a key priority. We offer highly subsidised transport access for historical restoration activities, local sports clubs, and youth programmes throughout our operational districts.",
      bgClass: "bg-white text-[#050C1A] border-slate-200 shadow-xl",
      btnClass: "bg-[#050C1A] hover:bg-slate-900 text-white",
      ctaText: "Review Community Impact",
      bullets: [
        "Active support alignment for localised charity operations",
        "Subsidised group transit allocations for non-profit entities",
        "Socio-economic reinvestment throughout local county bases"
      ],
      icon: <Heart className="w-8 h-8 text-amber-500 mb-6" />
    }
  ];

  return (
    <div 
      className="bg-[#050C1A] min-h-screen text-slate-150 font-sans"
      itemScope 
      itemType="https://schema.org/WebPage"
    >
      {/* 1. HERO SECTION (Deep Signature Navy Background with Gold Accents) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#030611] to-[#050C1A] pt-32 pb-16 md:pt-40 md:pb-24 border-b border-slate-900">
        <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-amber-500/[0.025] rounded-full blur-[110px] pointer-events-none z-0" />
        <div className="absolute bottom-0 right-0 w-[550px] h-[550px] bg-slate-950/[0.7] rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          
          {/* Micro-tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 select-none shadow-sm">
            <Award className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span className="font-mono text-[9px] md:text-10px font-extrabold uppercase tracking-[0.25em] text-amber-500">
              SUSTAINABLE ENTERPRISE METRICS
            </span>
          </div>

          <h1 
            className="font-serif text-4xl md:text-5xl lg:text-7xl text-white font-medium leading-tight mb-8 max-w-4xl mx-auto tracking-tight"
            itemProp="headline"
          >
            Corporate Social Responsibility &amp; Sustainable Fleet Logistics
          </h1>

          <p className="font-sans text-slate-350 font-light text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            Measurable carbon tracking, strict environmental compliance, and ethical social governance protocols engineered to satisfy modern multinational ESG procurement mandates.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleActionClick("Corporate Responsibility Framework")}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-8 rounded-xl transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:scale-[1.01] cursor-pointer"
            >
              Open a Corporate Account
            </button>
            <button
              onClick={() => {
                const kpiSection = document.getElementById("esg-kpi-table");
                if (kpiSection) {
                  kpiSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="w-full sm:w-auto bg-white/5 hover:bg-white/15 text-white border border-white/10 font-sans text-xs uppercase tracking-[0.15em] font-medium py-4 px-8 rounded-xl transition-colors cursor-pointer"
            >
              Examine ESG Parameters
            </button>
          </div>
        </div>
      </section>

      {/* 2. ENVIRONMENTAL STEWARDSHIP MANIFESTO */}
      <section className="bg-slate-950 text-white py-14 border-y border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="font-mono text-[9px] font-extrabold tracking-[0.25em] text-amber-500 uppercase mb-4 text-center">
            ENVIRONMENTAL STEWARDSHIP MANIFESTO
          </div>
          <p className="font-serif text-base md:text-lg leading-relaxed text-slate-200 italic font-light max-w-3xl mx-auto text-center">
            "UGO actively minimises environmental footprints across the commercial transportation sector. Every vehicle in our unbranded fleet complies fully with strict Euro 6 diesel limits, enabling modern enterprises to achieve ambitious Scope 3 greenhouse gas mitigation goals without compromising operational speed or reliability."
          </p>
          <div className="w-24 h-0.5 bg-amber-500 mt-6 mx-auto" />
        </div>
      </section>

      {/* 3. SEMANTIC NARRATIVE SECTION */}
      <section className="py-24 bg-[#050C1A] relative z-10 border-b border-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-8 font-sans text-slate-300 font-light text-base md:text-lg leading-relaxed">
            
            <div className="border-l-4 border-amber-500 pl-6 my-8">
              <p className="font-bold text-white text-lg md:text-xl">
                We operate clean, modern, and low-emission buses and coaches across the United Kingdom, ensuring our unbranded fleet is fully compliant with the latest environmental and safety standards.
              </p>
            </div>

            <p>
              As a proud family-run enterprise with direct vehicle and asset ownership, we reconcile elite logistical reach with absolute human accountability. We are large enough to operate complex nationwide corporate logistics frameworks flawlessly, yet family-run and agile enough to give clients a direct phone line straight to company owners with zero broker delays or automated hurdles.
            </p>

            <p>
              By offering dedicated corporate responsibility coach hire and structured ESG compliant transport UK operations, we support the carbon goals of leading businesses. Our low-emission fleet helps managers plan cleaner group travel. Additionally, any corporate partner requesting sustainable minibus rental London or planning corporate carbon reduction strategies receives verified environmental compliance tracking Hertfordshire data.
            </p>

            <p>
              UGO performs as a strict Euro 6 transport provider. We provide clear, audit ready details to satisfy ethical supply chain transport assessments. Companies implementing green employee commuter shuttles or setting up sustainable group travel can easily integrate our actual data into their Scope 3 emissions transport reporting. This diligent focus on corporate governance passenger transit guarantees a completely transparent, trustworthy travel model.
            </p>
          </div>
        </div>
      </section>

      {/* 4. ESG CAPABILITY GRID */}
      <section className="py-24 relative z-10 border-b border-slate-900 bg-[#030611]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-10px font-extrabold text-amber-500 uppercase tracking-[0.2em] mb-4 block">
              Corporate Responsibility Audit &amp; Compliance
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-medium leading-tight">
              Ethical &amp; Environmental Validation
            </h2>
            <div className="w-12 h-1 bg-amber-500 mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {esgCards.map((card, idx) => (
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
                      Corporate Responsibility Audit &amp; Compliance
                    </span>
                    <span className="text-[9px] font-semibold bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded uppercase font-mono">
                      PILLAR {idx + 1}
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
                        <FileCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span className="font-light leading-relaxed opacity-90">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleActionClick("Corporate Responsibility Framework")}
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

      {/* 5. ENVIRONMENTAL AND SAFETY STANDARDS */}
      <section id="esg-kpi-table" className="py-24 border-b border-slate-900 bg-[#050C1A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="font-mono text-10px font-extrabold text-amber-500 uppercase tracking-[0.25em] block mb-3">
              Our Standards &amp; Compliance
            </span>
            <h2 className="font-serif text-3xl md:text-4.5xl leading-tight text-white">
              Our Environmental &amp; Safety Standards
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-400 font-light max-w-2xl mx-auto leading-relaxed mt-4">
              How we ensure our coach and minibus services stay clean, safe, and fully compliant with local school and business requirements.
            </p>
          </div>

          <div className="w-full overflow-hidden border border-slate-800 rounded-2xl bg-slate-950/95 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-800 bg-[#030611] text-[#8A99AD] font-mono text-[10px] md:text-xs uppercase tracking-wider">
                    <th className="py-6 px-6 md:px-8 font-semibold">Sustainability Discipline</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Active Operational Verification</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Tangible Enterprise Yield</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900 text-slate-350">
                  <tr className="hover:bg-white/[0.01] transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-white">
                      Carbon Management Tracking
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      100% Euro 6 Low-Emission Fleet Composition
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-semibold text-amber-500">
                      Unrestricted entry into London ULEZ perimeters with complete carbon data asset mapping.
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.01] transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-white">
                      Labor &amp; Safety Governance
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      100% Enhanced DBS Personnel Screening Protocols
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-semibold text-amber-500">
                      Zero-risk vendor registration and approval for educational boards and corporate accounts.
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.01] transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-white">
                      Supply Chain Verification
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      Direct Vehicle Ownership & Accountability
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-semibold text-amber-500">
                      Complete transparency with zero third-party broker friction or subcontracting layers.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile swipe alert */}
            <div className="lg:hidden text-center py-4 bg-slate-950 border-t border-slate-800 font-sans text-[10px] text-slate-400 uppercase tracking-widest font-medium select-none">
              ← Swipe right to view full sustainability indicators table →
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
              ESG COMPLIANCE FAQ
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-medium">
              ESG Auditing &amp; Labor Standards
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-400 font-light mt-3 max-w-lg mx-auto">
              Crucial information regarding Scope 3 evaluations and crew employment criteria.
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
                  How does booking with UGO help our enterprise satisfy its corporate Scope 3 emission targets?
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
                  By operating exclusively modern, fuel-optimised Euro 6 compliant vehicles, we significantly minimise passenger-mile carbon outputs compared to individual executive car travel. We supply itemised travel data sheets detailing actual vehicle routing metrics for seamless inclusion in your company annual sustainability audits.
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
                  What social and ethical standards do you maintain for your driving personnel?
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
                  We treat our driving crew as our premier asset. UGO rejects the unstable zero-hour contract frameworks favored by modern app brokers. Every driver operates under strict legal shift monitoring, receives continuous professional development coaching, and is paid a fair wage, resulting in elite service delivery.
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
            GREENER GROUP TRAVEL
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6 leading-tight">
            Travel Greener Without Compromising Comfort
          </h2>
          <p className="font-sans text-slate-300 text-xs md:text-base leading-relaxed max-w-2xl mx-auto mb-10 font-light">
            One modern Euro 6 coach takes dozens of cars off the road. Tell us your journey and we'll plan it cleanly, efficiently and comfortably — with a clear price, not a calculator.
          </p>

          <button
            onClick={() => handleActionClick("Corporate Responsibility Framework")}
            className="group inline-flex items-center gap-3 bg-amber-500/90 hover:bg-amber-600 text-[#050C1A] font-sans text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] pointer-events-auto cursor-pointer"
          >
            Get a Fast Quote
            <ArrowRight className="w-4 h-4 text-[#050C1A] transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
