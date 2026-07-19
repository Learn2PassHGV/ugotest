import React from 'react';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';

/**
 * Contact page — the site's canonical NAP (name/address/phone) page for
 * local SEO and the natural link target for the Google Business Profile.
 */
export function ContactPage({ onRequestQuote }: { onRequestQuote?: () => void }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'UGO Coach & Minibus Hire',
    legalName: 'Pullman Direct Ltd',
    url: 'https://www.coaches.business/contact',
    telephone: '+448458333456',
    email: 'sasha@coaches.business',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Wellington House, 273-275 High Street, London Colney',
      addressLocality: 'St Albans',
      addressRegion: 'Hertfordshire',
      postalCode: 'AL2 1HA',
      addressCountry: 'GB',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
  };

  return (
    <div className="bg-stone-50 min-h-screen font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-stone-50 pt-32 pb-16 md:pt-40 border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-tight mb-6">
            Contact UGO Coach &amp; Minibus Hire
          </h1>
          <p className="font-sans text-slate-600 font-light text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Call, email or send your journey details — you will always be dealing directly with our
            family management team, never a call centre.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm space-y-7">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <h2 className="font-serif text-lg text-slate-900 mb-1">Phone</h2>
                <p className="font-sans text-sm text-slate-700">
                  Office: <a href="tel:08458333456" className="font-semibold text-slate-900 hover:text-amber-700">0845 8333 456</a>
                </p>
                <p className="font-sans text-sm text-slate-700">
                  Out-of-hours mobile: <a href="tel:07833226623" className="font-semibold text-slate-900 hover:text-amber-700">07833 226 623</a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <h2 className="font-serif text-lg text-slate-900 mb-1">Email</h2>
                <p className="font-sans text-sm text-slate-700">
                  <a href="mailto:sasha@coaches.business" className="font-semibold text-slate-900 hover:text-amber-700">sasha@coaches.business</a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <h2 className="font-serif text-lg text-slate-900 mb-1">Registered office</h2>
                <p className="font-sans text-sm text-slate-700 leading-relaxed">
                  Wellington House,<br />273-275 High Street, London Colney,<br />St Albans, Hertfordshire AL2 1HA
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <h2 className="font-serif text-lg text-slate-900 mb-1">Hours</h2>
                <p className="font-sans text-sm text-slate-700 leading-relaxed">
                  Office 08:00–18:00, seven days a week.<br />
                  Out of hours, weekends and bank holidays: call the mobile line — a member of the family
                  answers, not a machine.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 text-stone-50 rounded-2xl p-8 shadow-lg flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-amber-400 mb-3 block">
                Fastest way to a price
              </span>
              <h2 className="font-serif text-3xl leading-tight mb-4">Send your journey details</h2>
              <p className="font-sans text-slate-300 font-light text-sm leading-relaxed mb-8">
                Use our Smart Quote form — it takes under a minute, goes straight to Alan and Sasha's own
                inbox, and you will get a personal quote back, usually the same day. UGO is a trading name
                of Pullman Direct Ltd, a DVSA-registered operator with enhanced-DBS vetted drivers.
              </p>
            </div>
            <button
              onClick={onRequestQuote}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold tracking-[0.15em] text-xs uppercase py-4 px-8 rounded-xl shadow-lg hover:scale-[1.01] transition-transform cursor-pointer flex items-center justify-center gap-2"
            >
              Request a Smart Quote <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
