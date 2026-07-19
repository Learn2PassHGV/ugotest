import React, { useState } from 'react';
import { 
  FileText, 
  ChevronDown, 
  ArrowRight, 
  Settings, 
  MapPin, 
  BookOpen, 
  Activity, 
  CheckCircle 
} from 'lucide-react';
import { cn } from './lib/utils';

interface TransportLogisticsBlogProps {
  onNavigateToHomeAndBook?: (locationPreload: string) => void;
}

export function TransportLogisticsBlog({ onNavigateToHomeAndBook }: TransportLogisticsBlogProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleActionClick = (targetType: string) => {
    if (onNavigateToHomeAndBook) {
      onNavigateToHomeAndBook(targetType);
    }
  };

  const articles = [
    {
      title: "Organising Large-Scale Coach Transfers: Preventing Event Delays",
      brief: "A practical guide to coordinating smooth group arrivals and departures for major events. Learn how to design loading zones, manage peak passenger hours, and coordinate multiple coaches without delays.",
      bgClass: "bg-[#050C1A] text-white border-[#050C1A] shadow-2xl",
      btnClass: "bg-amber-500 hover:bg-amber-600 text-slate-950",
      btnText: "Plan Event Transport With Us",
      bullets: [
        "Designing efficient coach loading zones",
        "Managing high-volume arrival and departure schedules",
        "Live GPS tracking and professional marshals on-site"
      ],
      icon: <Activity className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      title: "Regulatory Access: London Low Emission Compliance",
      brief: "What London's ULEZ and low emission zones mean for group travel: which vehicles comply, who pays what, and why our Euro 6 fleet travels into central London without surcharges or penalties.",
      bgClass: "bg-white text-[#050C1A] border-slate-200 shadow-xl",
      btnClass: "bg-[#050C1A] hover:bg-slate-900 text-white",
      btnText: "Ask About ULEZ-Compliant Hire",
      bullets: [
        "TfL low emission zone and ULEZ boundary rules",
        "Euro 6 diesel mechanical emission performance audits",
        "Corporate penalty avoidance frameworks of commercial fleets"
      ],
      icon: <BookOpen className="w-8 h-8 text-amber-500 mb-6" />
    },
    {
      title: "Logistics Case Study: Studio Crew Routing Dynamics",
      brief: "How production unit moves actually work: early call times, split shifts, unbranded vehicles for cast privacy, and drivers who understand that a schedule slip costs a production real money.",
      bgClass: "bg-[#050C1A] text-white border-[#050C1A] shadow-2xl",
      btnClass: "bg-amber-500 hover:bg-amber-600 text-slate-950",
      btnText: "Talk To Our Production Team",
      bullets: [
        "Unbranded vehicle dispatching discretion models",
        "24/7 call time monitoring and real time routing adjustments",
        "Seamless driver handovers keeping production schedules intact"
      ],
      icon: <Settings className="w-8 h-8 text-amber-500 mb-6" />
    }
  ];

  return (
    <div 
      className="bg-[#F9F9FB] min-h-screen text-[#050C1A] font-sans"
      itemScope 
      itemType="https://schema.org/Blog"
    >
      {/* 1. HERO SECTION (Light Porcelain Background) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EFEEF3] to-[#F9F9FB] pt-32 pb-16 md:pt-40 md:pb-24 border-b border-slate-200">
        <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-slate-900/[0.02] rounded-full blur-[110px] pointer-events-none z-0" />
        <div className="absolute bottom-0 right-0 w-[550px] h-[550px] bg-amber-500/[0.01] rounded-full blur-[130px] pointer-events-none z-0" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          
          {/* Micro-tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#050C1A]/5 border border-[#050C1A]/10 mb-6 select-none shadow-sm">
            <FileText className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span className="font-mono text-[9px] md:text-10px font-extrabold uppercase tracking-[0.25em] text-[#050C1A]">
              ENTERPRISE INTEL &amp; OPERATIONAL INSIGHTS
            </span>
          </div>

          <h1 
            className="font-serif text-4xl md:text-5xl lg:text-7xl text-[#050C1A] font-medium leading-tight mb-8 max-w-4xl mx-auto tracking-tight"
            itemProp="headline"
          >
            Transport Logistics Blog: Corporate Fleet &amp; Event Operations Intel
          </h1>

          <p className="font-sans text-slate-600 font-light text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            Technical optimisation strategies, regulatory compliance briefings, and large-scale passenger transit research compiled explicitly for UK procurement directors, corporate travel desks, and event logistics managers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleActionClick("Logistics Blog Reference")}
              className="w-full sm:w-auto bg-[#050C1A] hover:bg-slate-900 text-white font-sans text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] cursor-pointer"
            >
              Access Reference Index
            </button>
            <button
              onClick={() => {
                const kpiSection = document.getElementById("blog-resource-table");
                if (kpiSection) {
                  kpiSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="w-full sm:w-auto bg-[#050C1A]/5 hover:bg-[#050C1A]/10 text-[#050C1A] border border-[#050C1A]/10 font-sans text-xs uppercase tracking-[0.15em] font-medium py-4 px-8 rounded-xl transition-colors cursor-pointer"
            >
              Explore Our Guides
            </button>
          </div>
        </div>
      </section>

      {/* 2. OPERATIONAL KNOWLEDGE BASE (High-contrast dark navy background panel) */}
      <section className="bg-[#050C1A] text-white py-12 border-y border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="font-mono text-[9px] font-extrabold tracking-[0.25em] text-amber-500 uppercase mb-3 text-center">
            OPERATIONAL KNOWLEDGE BASE
          </div>
          <p className="font-serif text-sm md:text-base leading-relaxed text-slate-200 italic font-light max-w-3xl mx-auto text-center">
            "UGO establishes clear industry authority. We go beyond basic vehicle provision by publishing data-dense logistics frameworks, real-time routing analysis, and compliance reporting guides to ensure your group transit operations run with absolute timeline efficiency."
          </p>
          <div className="w-24 h-0.5 bg-amber-500 mt-5 mx-auto" />
        </div>
      </section>

      {/* 3. SEMANTIC CONTENT SECTION */}
      <section className="py-16 bg-[#F9F9FB] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 font-sans text-slate-650 text-sm md:text-base leading-relaxed space-y-6">
          <div className="border-l-4 border-amber-500 pl-6 my-8">
            <p className="font-bold text-[#050C1A] text-base md:text-lg">
              UGO provides comprehensive technical breakdowns and regulatory tracking guides regarding nationwide corporate ground transportation, delivering actionable data metrics to streamline enterprise fleet procurement.
            </p>
          </div>
          
          <p>
            Practical guidance from a working coach operator. We write about the things our customers actually ask us: how event transport is planned so nobody stands waiting in a car park, what London's emissions rules mean for group travel, and how school and corporate transport contracts work in practice.
          </p>

          <p>
            Everything here comes from real jobs run by our family team out of St Albans — corporate shuttles, film unit moves, school routes and wedding transport across Hertfordshire and London. If a question isn't covered, call us on 0845 8333 456 and we'll give you a straight answer.
          </p>
        </div>
      </section>

      {/* 4. TECHNICAL ARTICLE GRID */}
      <section className="py-24 relative z-10 border-b border-slate-200 bg-[#F9F9FB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-10px font-extrabold text-amber-600 uppercase tracking-[0.2em] mb-4 block">
              Latest Insights &amp; Regular Dispatch
            </span>
            <h2 className="font-serif text-3xl md:text-4.5xl text-[#050C1A] font-medium leading-tight">
              Featured Operational Research Case Studies
            </h2>
            <div className="w-12 h-1 bg-amber-500/80 mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {articles.map((item, idx) => (
              <div 
                key={idx}
                className={cn(
                  "flex flex-col justify-between p-8 md:p-10 rounded-2xl border transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl",
                  item.bgClass
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] font-bold tracking-widest uppercase opacity-75">
                      Latest Insights &amp; Regular Dispatch
                    </span>
                    <span className="text-[9px] font-semibold bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded uppercase font-mono">
                      INDEX {idx + 1}
                    </span>
                  </div>

                  {item.icon}

                  <h3 className="font-serif text-xl md:text-2xl font-bold mb-4 leading-snug">
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs md:text-sm leading-relaxed mb-6 font-light opacity-90">
                    {item.brief}
                  </p>

                  <ul className="space-y-4 mb-8 text-xs lg:text-sm text-inherit">
                    {item.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span className="font-light leading-relaxed opacity-90">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleActionClick("Logistics Blog Reference")}
                  className={cn(
                    "w-full text-center py-3.5 px-5 rounded-xl text-xs font-bold uppercase tracking-[0.15em] transition-all cursor-pointer font-sans duration-200 mt-2",
                    item.btnClass
                  )}
                >
                  {item.btnText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EDITORIAL ARCHITECTURE REFERENCE DETAILS */}
      <section id="blog-resource-table" className="py-24 border-b border-slate-200 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="font-mono text-10px font-extrabold text-amber-600 uppercase tracking-[0.25em] block mb-3">
              OUR RESOURCE HUB
            </span>
            <h2 className="font-serif text-3xl md:text-4.5xl leading-tight text-[#050C1A]">
              Industry News &amp; Guides
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-500 font-light max-w-2xl mx-auto leading-relaxed mt-4">
              A guide to our industry articles, safety topics, and corporate transport frameworks.
            </p>
          </div>

          <div className="w-full overflow-hidden border border-slate-200 rounded-2xl bg-[#F9F9FB] shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-[#050C1A] text-slate-300 font-mono text-[10px] md:text-xs uppercase tracking-wider">
                    <th className="py-6 px-6 md:px-8 font-semibold">Topic</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Key Themes</th>
                    <th className="py-6 px-6 md:px-8 font-semibold">Who It Is For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-250 text-slate-750">
                  <tr className="hover:bg-slate-100/50 transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-[#050C1A]">
                      Workforce Commuter Loops
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      Employee shuttle optimisation and site route co-ordination tracking
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-semibold text-slate-600">
                      Facilities and Human Resources procurement managers
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-100/50 transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-[#050C1A]">
                      Regulatory &amp; Environmental Access
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      London ULEZ protocols and Euro 6 low emission compliance data
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-semibold text-slate-600">
                      Corporate risk management and legal compliance desks
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-100/50 transition-colors duration-200 text-sm">
                    <td className="py-6 px-6 md:px-8 font-semibold text-[#050C1A]">
                      Strategic Mass Event Transit
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-light">
                      High frequency loop calculations and crowd flow management plans
                    </td>
                    <td className="py-6 px-6 md:px-8 font-sans font-semibold text-slate-600">
                      Festival operations directors and stadium logistics co-ordinators
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile swipe alert */}
            <div className="lg:hidden text-center py-4 bg-[#EFEEF3] border-t border-slate-200 font-sans text-[10px] text-[#050C1A]/60 uppercase tracking-widest font-medium select-none">
              ← Swipe right to view full indexing table specifications →
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ SCHEMA ACCORDION */}
      <section 
        className="py-24 bg-[#F9F9FB] border-b border-slate-200"
        itemScope 
        itemType="https://schema.org/FAQPage"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-mono text-10px font-extrabold text-[#050C1A] uppercase tracking-[0.25em] block mb-3">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#050C1A] font-medium">
              Blog and Article FAQ
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-600 font-light mt-3 max-w-lg mx-auto">
              Answers to common questions about our articles and resources.
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
                  How often does the UGO logistics team publish regulatory and compliance updates?
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
                  Our senior transit co-ordinators monitor DVSA framework revisions, Transport for London environmental policy adjustments, and major arterial road grid changes in real-time. We publish immediate, actionable technical briefings the moment regulatory variances affect corporate fleet logistics.
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
                  Can we share these logistics case studies and passenger flow guides with our internal board for procurement tenders?
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
                  Yes. Every piece of research and operational data published in our transport logistics repository is fully open-access, specifically designed to help corporate travel desks draft comprehensive risk assessments and vendor registration applications.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FRICTIONLESS UI CALL TO ACTION */}
      <section className="bg-[#050C1A] text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#050C1A]/80 to-black/95 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/5 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="font-mono text-[9px] font-extrabold text-amber-500 uppercase tracking-[0.3em] block mb-4">
            OPERATIONAL LOGISTICS INTERPRETATION
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6 leading-tight">
            Structure Your Fleet Routing Compliantly
          </h2>
          <p className="font-sans text-slate-300 text-xs md:text-base leading-relaxed max-w-2xl mx-auto mb-10 font-light">
            Connect directly with verified transport assets. Enter route, frequency, and fleet capacities on our booking platform to view instant operational availabilities.
          </p>

          <button
            onClick={() => handleActionClick("Logistics Blog Reference")}
            className="group inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] pointer-events-auto cursor-pointer"
          >
            Launch Audited Booking Engine
            <ArrowRight className="w-4 h-4 text-slate-950 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
