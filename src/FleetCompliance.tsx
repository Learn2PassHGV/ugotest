import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ChevronDown, 
  ArrowRight, 
  BookOpen, 
  Scale, 
  Users, 
  FileCheck,
  Award 
} from 'lucide-react';
import { cn } from './lib/utils';

interface FleetComplianceProps {
  onNavigateToHomeAndBook?: (locationPreload: string) => void;
}

export function FleetCompliance({ onNavigateToHomeAndBook }: FleetComplianceProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleActionClick = (targetType: string) => {
    if (onNavigateToHomeAndBook) {
      onNavigateToHomeAndBook(targetType);
    }
  };

  const complianceCards = [
    {
      title: "DVSA Operational Licensing",
      brief: "Detail our active Driver and Vehicle Standards Agency alignment. Highlight rigorous regular maintenance intervals, strict vehicle safety inspections, and complete tachograph monitoring to prevent driver fatigue.",
      bgClass: "bg-[#050C1A] text-white border-[#050C1A] shadow-2xl",
      btnClass: "bg-amber-500 hover:bg-amber-600 text-[#050C1A]",
      ctaText: "Review Licensing Standards",
      bullets: [
        "Full Driver and Vehicle Standards Agency (DVSA) standards compliance",
        "Mandatory multi-point fleet inspections every 42 days",
        "Active digital tachograph auditing and rest break enforcement"
      ],
      icon: <BookOpen className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      title: "Corporate Liability & Risk Indemnity",
      brief: "Focus copy entirely on our comprehensive insurance tracking. Explicitly state our £10,000,000 corporate public liability insurance threshold and full fleet motor policies built to shield client operations.",
      bgClass: "bg-white text-[#050C1A] border-slate-200 shadow-xl",
      btnClass: "bg-[#050C1A] hover:bg-slate-900 text-white",
      ctaText: "Verify Insurance Caps",
      bullets: [
        "£10,000,000 public coverage bounds verified per corporate asset",
        "Complete passenger transit indemnification for business sectors",
        "Integrated corporate risk planning built for international clients"
      ],
      icon: <Scale className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      title: "Enhanced Crew Vetting & Safety Vows",
      brief: "Focus copy on driver background verification. Outline that 100% of our operating staff undergo regular enhanced DBS check protocols, hold pristine commercial driving credentials, and are subject to random drug and alcohol screenings.",
      bgClass: "bg-[#050C1A] text-white border-[#050C1A] shadow-2xl",
      btnClass: "bg-amber-500 hover:bg-amber-600 text-[#050C1A]",
      ctaText: "Audit Vetting Protocols",
      bullets: [
        "Rigorous verification through enhanced disclosures and checks",
        "Pristine PCV vocational credentials held by all operators",
        "Mandatory active drug, alcohol, and health checks conducted regularly"
      ],
      icon: <Users className="w-8 h-8 text-amber-500 mb-6" />
    }
  ];

  return (
    <div 
      className="bg-[#F9F9FB] min-h-screen text-[#050C1A] font-sans"
      itemScope 
      itemType="https://schema.org/WebPage"
    >
      {/* 1. HERO SECTION (Light Porcelain Background) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EFEEF3] to-[#F9F9FB] pt-32 pb-16 md:pt-40 md:pb-24 border-b border-slate-200">
        <div className="absolute top-0 left-0 w-[420px] h-[420px] bg-slate-900/[0.02] rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-0 right-0 w-[520px] h-[520px] bg-blue-500/[0.01] rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          
          {/* Micro-tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#050C1A]/5 border border-[#050C1A]/10 mb-6 select-none shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span className="font-mono text-[9px] md:text-10px font-extrabold uppercase tracking-[0.25em] text-[#050C1A]">
              REGULATORY AUDIT &amp; OPERATIONAL TRANSPARENCY
            </span>
          </div>

          <h1 
            className="font-serif text-4xl md:text-5xl lg:text-6.5xl text-[#050C1A] font-medium leading-tight mb-8 max-w-4xl mx-auto tracking-tight"
            itemProp="headline"
          >
            Fleet Compliance Portal: Risk & Safety Standards
          </h1>

          <p className="font-sans text-slate-600 font-light text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            Verified operational accreditations, tier 1 insurance thresholds, environmental emission certificates, and comprehensive Duty of Care mitigation tracking for UGO logistics frameworks.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleActionClick("Fleet Compliance Standards")}
              className="w-full sm:w-auto bg-[#050C1A] hover:bg-slate-900 text-white font-sans text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] cursor-pointer"
            >
              Read Compliance Standards
            </button>
            <button
              onClick={() => {
                const kpiSection = document.getElementById("compliance-kpi-table");
                if (kpiSection) {
                  kpiSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="w-full sm:w-auto bg-[#050C1A]/5 hover:bg-[#050C1A]/10 text-[#050C1A] border border-[#050C1A]/10 font-sans text-xs uppercase tracking-[0.15em] font-medium py-4 px-8 rounded-xl transition-colors cursor-pointer"
            >
              View Performance Data
            </button>
          </div>
        </div>
      </section>

      {/* 2. DUTY OF CARE MANDATE (High-contrast dark navy background panel) */}
      <section className="bg-[#050C1A] text-white py-12 border-y border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="font-mono text-[9px] font-extrabold tracking-[0.25em] text-amber-500 uppercase mb-3 text-center">
            DUTY OF CARE MANDATE
          </div>
          <p className="font-serif text-sm md:text-base leading-relaxed text-slate-200 italic font-light max-w-3xl mx-auto text-center">
            "We operate with complete openness and strict adherence to safety regulations. We protect your company from risk by holding our entire unmarked fleet and professional drivers to rigorous safety audits, regular inspections, and absolute compliance."
          </p>
          <div className="w-24 h-0.5 bg-amber-500 mt-5 mx-auto" />
        </div>
      </section>

      {/* 3. COMPLIANCE PILLAR GRID */}
      <section className="py-24 relative z-10 border-b border-slate-200 bg-[#F9F9FB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-10px font-extrabold text-amber-600 uppercase tracking-[0.2em] mb-4 block">
              Operational Compliance &amp; Audit Records
            </span>
            <h2 className="font-serif text-3xl md:text-4.5xl text-[#050C1A] font-medium leading-tight">
              Verified Compliance &amp; Security Pillars
            </h2>
            <div className="w-12 h-1 bg-amber-500/80 mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {complianceCards.map((card, idx) => (
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
                      Operational Compliance &amp; Audit Records
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
                  onClick={() => handleActionClick("Fleet Compliance Standards")}
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

      {/* 4. HIGH-DENSITY TECHNICAL AUDIT TABLE */}
      <section id="compliance-kpi-table" className="py-24 border-b border-slate-200 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="font-mono text-10px font-extrabold text-amber-600 uppercase tracking-[0.25em] block mb-3">
              Fleet Specifications &amp; Operational Overview
            </span>
            <h2 className="font-serif text-3xl md:text-4.5xl leading-tight text-[#050C1A]">
              Verified Regulatory Parameters &amp; Environmental Thresholds
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-500 font-light max-w-2xl mx-auto leading-relaxed mt-4">
              A comprehensive dataset showcasing strict operational indicators to satisfy legal validation systems or automated enterprise crawler loops.
            </p>
          </div>

          <div className="w-full overflow-hidden border border-slate-200 rounded-2xl bg-[#F9F9FB] shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-[#050C1A] text-slate-300 font-mono text-[10px] md:text-xs uppercase tracking-wider">
                    <th className="py-6 px-6 md:px-8 font-semibold">Compliance Category</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Active Operational Threshold</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Regulatory Governing Authority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-250 text-slate-750">
                  <tr className="hover:bg-slate-100/50 transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-[#050C1A]">
                      Public Liability Protection
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      £10,000,000 Comprehensive Corporate Indemnity Cap per individual dispatch deployment
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-semibold text-slate-600">
                      UK Commercial Insurance & Standards
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-100/50 transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-[#050C1A]">
                      Environmental Emission Status
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      100% Euro 6 Fleet Compliance supporting unrestricted entries into any Low Emission boundary
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-semibold text-slate-600">
                      Transport for London (TfL) Environmental Standards
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-100/50 transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-[#050C1A]">
                      Operator Background Vetting
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      Mandatory Enhanced DBS Checked Status required for 100% of driver profiles and operating staff
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-semibold text-slate-600">
                      Disclosure and Barring Service Mandate
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile swipe alert */}
            <div className="lg:hidden text-center py-4 bg-[#EFEEF3] border-t border-slate-200 font-sans text-[10px] text-[#050C1A]/60 uppercase tracking-widest font-medium select-none">
              ← Swipe right to view full specifications table →
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ SCHEMA ACCORDION */}
      <section 
        className="py-24 bg-[#F9F9FB] border-b border-slate-200"
        itemScope 
        itemType="https://schema.org/FAQPage"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-mono text-10px font-extrabold text-[#050C1A] uppercase tracking-[0.25em] block mb-3">
              ENTERPRISE COMPLIANCE FAQ
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#050C1A] font-medium">
              Duty of Care &amp; Risk Mitigation Q&amp;A
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-600 font-light mt-3 max-w-lg mx-auto">
              Clear verification of London ULEZ parameters, commercial insurance filings, and vendor registration.
            </p>
          </div>

          <div className="space-y-4">
            <div 
              className="border border-slate-200 bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md"
              itemProp="mainEntity"
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => toggleFaq(1)}
                className="w-full flex items-center justify-between text-left p-6 md:p-7 focus:outline-none cursor-pointer group"
              >
                <span 
                  className="font-serif text-base md:text-lg text-[#050C1A] font-medium group-hover:text-amber-600 transition-colors duration-200 pr-4"
                  itemProp="name"
                >
                  How does UGO guarantee compliance with the London Low Emission Zone and ULEZ environmental guidelines?
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
                  "overflow-hidden transition-all duration-300 ease-in-out border-slate-150",
                  openFaq === 1 ? "max-h-60 border-t p-6 md:px-7 md:pb-8 bg-slate-50" : "max-h-0"
                )}
                itemProp="acceptedAnswer"
                itemScope
                itemType="https://schema.org/Answer"
              >
                <div 
                  className="font-sans text-xs md:text-sm text-slate-600 leading-relaxed font-light"
                  itemProp="text"
                >
                  Our entire fleet consists exclusively of modern vehicles meeting strict Euro 6 diesel and environmental criteria. This ensures our executive minibuses and coaches possess permanent, unrestricted access to transit within all active London emission parameters without incurring clean air penalties.
                </div>
              </div>
            </div>

            <div 
              className="border border-slate-200 bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md"
              itemProp="mainEntity"
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => toggleFaq(2)}
                className="w-full flex items-center justify-between text-left p-6 md:p-7 focus:outline-none cursor-pointer group"
              >
                <span 
                  className="font-serif text-base md:text-lg text-[#050C1A] font-medium group-hover:text-amber-600 transition-colors duration-200 pr-3"
                  itemProp="name"
                >
                  Can your team supply formal compliance documentation and insurance certificates for corporate portal setup?
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
                  "overflow-hidden transition-all duration-300 ease-in-out border-slate-150",
                  openFaq === 2 ? "max-h-60 border-t p-6 md:px-7 md:pb-8 bg-slate-50" : "max-h-0"
                )}
                itemProp="acceptedAnswer"
                itemScope
                itemType="https://schema.org/Answer"
              >
                <div 
                  className="font-sans text-xs md:text-sm text-slate-600 leading-relaxed font-light"
                  itemProp="text"
                >
                  Yes. Our corporate account specialists routinely provide verified public liability tracking files, operator licensing details, and driver risk assessment reports directly to your vendor registration portal to ensure swift corporate clearance.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FRICTIONLESS UI CALL TO ACTION */}
      <section className="bg-[#050C1A] text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#050C1A]/80 to-black/95 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/5 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="font-mono text-[9px] font-extrabold text-amber-500 uppercase tracking-[0.3em] block mb-4">
            COMPLIANCE AND SAFETY
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6 leading-tight">
            Book Safe and Reliable Journeys
          </h2>
          <p className="font-sans text-slate-300 text-xs md:text-base leading-relaxed max-w-2xl mx-auto mb-10 font-light">
            Our family-run team is committed to the highest standards of safety and comfort. Request a friendly, obligation-free quote today.
          </p>

          <button
            onClick={() => handleActionClick("Fleet Compliance Standards")}
            className="group inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] pointer-events-auto cursor-pointer"
          >
            Request Journey Quote
            <ArrowRight className="w-4 h-4 text-slate-950 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
