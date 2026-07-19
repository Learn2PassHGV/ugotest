import React, { useEffect } from 'react';
import { Shield, Users, Clock, EyeOff, Building2, HardHat, Factory, Film, PlaneTakeoff, Navigation } from 'lucide-react';
import { cn } from './lib/utils';
import { sendLead } from './lib/leads';

export function CommercialLogisticsPage({ onRequestQuote }: { onRequestQuote?: () => void } = {}) {
  const [tenderContact, setTenderContact] = React.useState('');
  const [tenderState, setTenderState] = React.useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const submitTender = async () => {
    const v = tenderContact.trim();
    if (!v) return;
    setTenderState('sending');
    const isEmail = /.+@.+\..+/.test(v);
    const result = await sendLead({
      type: 'tender',
      email: isEmail ? v : undefined,
      phone: isEmail ? undefined : v,
      message: 'Tender / contract enquiry sent from the Our Services page. Please contact to discuss requirements.',
    });
    setTenderState(result.ok ? 'sent' : 'error');
  };

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

  return (
    <div className="bg-stone-50 min-h-screen font-sans">
      {/* 1. The Editorial Page Header */}
      <section className="bg-stone-50 pt-32 pb-16 md:pt-40 md:pb-24 border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h1 className="service-title-load font-serif text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-tight mb-6">
            Corporate, School &amp; Event Transport.
          </h1>
          <p className="service-subtext-load font-sans text-slate-650 font-light text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Reliable contract transport and single-event hire for companies, schools, and production crews across Hertfordshire and Greater London.
          </p>
        </div>
      </section>

      {/* 2. The Corporate Credentials Bar */}
      <section className="reveal-layer-hidden reveal-sec-card bg-white border-b border-stone-200 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-6 border border-transparent hover:border-stone-200/50 hover:bg-stone-50/50 hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-sm">
              <Shield className="w-6 h-6 text-amber-600 mb-3" />
              <span className="font-serif font-semibold text-slate-900 text-lg mb-1">100% Euro 6</span>
              <span className="font-sans text-xs uppercase tracking-widest text-slate-500">ULEZ Compliant Fleet</span>
            </div>
            <div className="flex flex-col items-center text-center p-6 border border-transparent hover:border-stone-200/50 hover:bg-stone-50/50 hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-sm">
              <Users className="w-6 h-6 text-amber-600 mb-3" />
              <span className="font-serif font-semibold text-slate-900 text-lg mb-1">Enhanced DBS</span>
              <span className="font-sans text-xs uppercase tracking-widest text-slate-500">Fully Vetted Drivers</span>
            </div>
            <div className="flex flex-col items-center text-center p-6 border border-transparent hover:border-stone-200/50 hover:bg-stone-50/50 hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-sm">
              <Clock className="w-6 h-6 text-amber-600 mb-3" />
              <span className="font-serif font-semibold text-slate-900 text-lg mb-1">24/7 Support</span>
              <span className="font-sans text-xs uppercase tracking-widest text-slate-500">Direct Owner Access</span>
            </div>
            <div className="flex flex-col items-center text-center p-6 border border-transparent hover:border-stone-200/50 hover:bg-stone-50/50 hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-sm">
              <EyeOff className="w-6 h-6 text-amber-600 mb-3" />
              <span className="font-serif font-semibold text-slate-900 text-lg mb-1">Unbranded Fleet</span>
              <span className="font-sans text-xs uppercase tracking-widest text-slate-500">Total Transport Discretion</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Deep-Dive Sector Breakdowns */}
      <section className="py-24 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-32">
          
          {/* Block A: Education & Local Authorities */}
          <div className="reveal-layer-hidden reveal-sec-card flex flex-col lg:flex-row gap-16 items-center p-8 rounded-2xl bg-white border border-transparent hover:border-stone-200/50 hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="aspect-[4/3] border border-stone-300 relative overflow-hidden group rounded-sm">
                <img src="/images/executive-coach.webp" alt="Full-size executive coach used for school and college transport" loading="lazy" decoding="async" width={1536} height={1024} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2 flex flex-col items-start gap-6">
              <span className="reveal-layer-hidden reveal-sec-header inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-600">
                School &amp; College Transport
              </span>
              <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl lg:text-4xl text-slate-900 leading-tight">
                Safe and Reliable School Coach Hire
              </h2>
              <p className="reveal-layer-hidden reveal-sec-desc font-sans text-slate-650 font-light leading-relaxed text-base lg:text-lg">
                We manage daily school routes, sports travel, and educational trips. Our family team works closely with schools and local authorities, ensuring all drivers are fully DBS-vetted and our vehicles pass strict safety inspections.
              </p>
              <button onClick={onRequestQuote} className="reveal-layer-hidden reveal-sec-btn mt-4 text-amber-600 border border-amber-600/50 px-8 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-amber-600 hover:text-white transition-colors rounded-sm shadow-sm whitespace-nowrap cursor-pointer">
                Enquire About School Transport
              </button>
            </div>
          </div>

          {/* Block B: Workplace & Workforce Shuttles */}
          <div className="reveal-layer-hidden reveal-sec-card flex flex-col lg:flex-row gap-16 items-center p-8 rounded-2xl bg-white border border-transparent hover:border-stone-200/50 hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
            <div className="w-full lg:w-1/2 flex flex-col items-start gap-6">
              <span className="reveal-layer-hidden reveal-sec-header inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-600">
                Workplace &amp; Staff Shuttles
              </span>
              <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl lg:text-4xl text-slate-900 leading-tight">
                Staff Commuter Shuttles for Business
              </h2>
              <p className="reveal-layer-hidden reveal-sec-desc font-sans text-slate-650 font-light leading-relaxed text-base lg:text-lg">
                Reduce car park congestion and support your team with regular staff shuttles. We build custom timetables to match your shift patterns, serving offices, business parks, and distribution centres across the region.
              </p>
              <button onClick={onRequestQuote} className="reveal-layer-hidden reveal-sec-btn mt-4 text-amber-600 border border-amber-600/50 px-8 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-amber-600 hover:text-white transition-colors rounded-sm shadow-sm whitespace-nowrap cursor-pointer">
                Enquire About Shuttles
              </button>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="aspect-[4/3] border border-stone-300 relative overflow-hidden group rounded-sm">
                <img src="/images/executive-midi-coach-35-passengers.webp" alt="Executive midi coach used for workplace staff shuttles" loading="lazy" decoding="async" width={1536} height={1024} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
            </div>
          </div>

          {/* Block C: Media, Film & Event Production */}
          <div className="reveal-layer-hidden reveal-sec-card flex flex-col lg:flex-row gap-16 items-center p-8 rounded-2xl bg-white border border-transparent hover:border-stone-200/50 hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="aspect-[4/3] border border-stone-300 relative overflow-hidden group rounded-sm">
                <img src="/images/executive-minibus-for-16-passengers.webp" alt="Unbranded black executive minibus used for film and TV crew transport" loading="lazy" decoding="async" width={1536} height={1024} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2 flex flex-col items-start gap-6">
              <span className="reveal-layer-hidden reveal-sec-header inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-600">
                Media &amp; Film Production
              </span>
              <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl lg:text-4xl text-slate-900 leading-tight">
                Discreet Crew &amp; Cast Logistics
              </h2>
              <p className="reveal-layer-hidden reveal-sec-desc font-sans text-slate-650 font-light leading-relaxed text-base lg:text-lg">
                Based in St Albans near major Hertfordshire film studios, we provide discreet, unbranded coach and minibus transport for production crews and cast. Our vehicles are entirely unmarked for maximum privacy.
              </p>
              <button onClick={onRequestQuote} className="reveal-layer-hidden reveal-sec-btn mt-4 text-amber-600 border border-amber-600/50 px-8 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-amber-600 hover:text-white transition-colors rounded-sm shadow-sm whitespace-nowrap cursor-pointer">
                Contact Our Production Team
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. The Contract Bid & Tender Portal */}
      <section className="reveal-layer-hidden reveal-sec-card bg-slate-900 py-24 border-t border-slate-800 text-stone-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="reveal-layer-hidden reveal-sec-header font-serif text-3xl md:text-4xl text-white leading-tight mb-6">
            Invite Us to Tender
          </h2>
          <p className="reveal-layer-hidden reveal-sec-desc font-sans text-slate-400 font-light leading-relaxed text-base lg:text-lg mb-10">
            We are always happy to review and price regular transport tenders for schools, councils, and corporate accounts. Contact our management team directly to discuss your requirements.
          </p>
          
          <div className="reveal-layer-hidden reveal-sec-btn w-full max-w-xl mx-auto">
            {tenderState === 'sent' ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-sm px-6 py-5 text-emerald-300 font-sans text-sm">
                Thank you — your details are with our management team, who will contact you to discuss your tender.
              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
                  <input
                    type="text"
                    value={tenderContact}
                    onChange={(e) => setTenderContact(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') submitTender(); }}
                    placeholder="Your work email or phone number"
                    aria-label="Your work email or phone number"
                    className="flex-1 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 px-6 py-4 rounded-sm focus:outline-none focus:border-amber-600 transition-colors font-sans text-sm"
                  />
                  <button
                    onClick={submitTender}
                    disabled={tenderState === 'sending' || !tenderContact.trim()}
                    className="bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white font-sans text-xs uppercase tracking-widest font-semibold px-8 py-4 rounded-sm transition-colors shadow-lg whitespace-nowrap cursor-pointer"
                  >
                    {tenderState === 'sending' ? 'Sending…' : 'Contact Our Team'}
                  </button>
                </div>
                {tenderState === 'error' && (
                  <p className="mt-3 text-xs text-red-300 font-sans">
                    We couldn't send that just now — please call us directly on <a href="tel:08458333456" className="underline font-semibold">0845 8333 456</a>.
                  </p>
                )}
                <p className="mt-3 text-[11px] text-slate-500 font-sans">
                  Goes straight to Alan &amp; Sasha's team. See our <span className="underline">privacy policy</span> for how we handle your details.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
