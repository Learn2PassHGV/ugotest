import React, { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import { cn } from '../lib/utils';
import { sendLead } from '../lib/leads';

/**
 * QuickQuoteStrip: a compact, prefilled, two-tap enquiry card rendered on
 * every content page (the home page has the full Smart Quote instead).
 * The journey, date and group size arrive already filled with a sensible
 * guess for the page being viewed, so the visitor only checks the details
 * and adds a name and number.
 */

interface QuickContext {
  label: string;
  journey: string;
  journeyType: string;
  pax: string;
}

const SERVICE_CONTEXT: Record<string, QuickContext> = {
  corporate: { label: 'corporate accounts', journey: 'Head office to venue', journeyType: 'Corporate Logistics', pax: '33' },
  commercial: { label: 'commercial contracts', journey: 'Depot or office to site', journeyType: 'Corporate Logistics', pax: '49' },
  private: { label: 'private coach hire', journey: 'St Albans to Central London', journeyType: 'Private Event', pax: '16' },
  'private-luxury': { label: 'luxury minibus hire', journey: 'Home address to venue', journeyType: 'Private Event', pax: '8' },
  'wedding-transport': { label: 'wedding transport', journey: 'Ceremony venue to reception', journeyType: 'Private Event', pax: '33' },
  'strategic-events': { label: 'event transport', journey: 'Hotel to event venue', journeyType: 'Sports/Music Event', pax: '49' },
  'strategic-event-logistics': { label: 'event logistics', journey: 'Hotel to event venue', journeyType: 'Sports/Music Event', pax: '49' },
  'film-tv-logistics': { label: 'film & TV crew transport', journey: 'Unit base to set', journeyType: 'Corporate Logistics', pax: '16' },
  'mass-transit-shuttles': { label: 'shuttle operations', journey: 'Park & ride to venue', journeyType: 'Staff Transport', pax: '70' },
  'workplace-shuttles': { label: 'workplace shuttles', journey: 'Station to workplace', journeyType: 'Staff Transport', pax: '33' },
  'corporate-roadshows': { label: 'corporate roadshows', journey: 'City to city, multi-stop', journeyType: 'Corporate Logistics', pax: '16' },
  fleet: { label: 'the UGO fleet', journey: 'St Albans to Central London', journeyType: 'Private Event', pax: '16' },
  'airport-hubs': { label: 'airport transfers', journey: 'St Albans to Heathrow Terminal 5', journeyType: 'Airport Transfer', pax: '16' },
  'film-and-events': { label: 'film & events cover', journey: 'Unit base to location', journeyType: 'Corporate Logistics', pax: '16' },
  'greater-london': { label: 'Greater London coverage', journey: 'North London to Central London', journeyType: 'Private Event', pax: '16' },
  'home-counties': { label: 'Home Counties coverage', journey: 'Hertfordshire to London', journeyType: 'Private Event', pax: '16' },
  'st-albans': { label: 'St Albans hire', journey: 'St Albans to Central London', journeyType: 'Private Event', pax: '16' },
  watford: { label: 'Watford & Elstree hire', journey: 'Watford to Central London', journeyType: 'Private Event', pax: '16' },
  hemel: { label: 'Hemel Hempstead hire', journey: 'Hemel Hempstead to London', journeyType: 'Private Event', pax: '16' },
  luton: { label: 'Luton & regional hire', journey: 'Luton to Central London', journeyType: 'Private Event', pax: '16' },
  'locations-index': { label: 'your area', journey: 'Your town to London', journeyType: 'Private Event', pax: '16' },
  compliance: { label: 'a compliant operator', journey: 'School or office to venue', journeyType: 'Corporate Logistics', pax: '49' },
  about: { label: 'the family team', journey: 'St Albans to Central London', journeyType: 'Private Event', pax: '16' },
  csr: { label: 'responsible group travel', journey: 'St Albans to Central London', journeyType: 'Corporate Logistics', pax: '33' },
  blog: { label: 'your journey', journey: 'Your town to your venue', journeyType: 'Private Event', pax: '16' },
};

const HIDDEN_PAGES = new Set(['home', 'contact', 'not-found', 'privacy', 'terms']);

function titleCase(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function contextFor(page: string): QuickContext {
  if (page.startsWith('town-')) {
    const town = titleCase(page.slice(5));
    return { label: `${town} coach & minibus hire`, journey: `${town} to Central London`, journeyType: 'Private Event', pax: '16' };
  }
  if (page.startsWith('post-')) {
    return SERVICE_CONTEXT.blog;
  }
  return SERVICE_CONTEXT[page] || { label: 'your journey', journey: 'Your town to your venue', journeyType: 'Private Event', pax: '16' };
}

function nextSaturdayIso(): string {
  const d = new Date();
  const add = (6 - d.getDay() + 7) % 7 || 7;
  d.setDate(d.getDate() + add);
  return d.toISOString().slice(0, 10);
}

const PAX_CHIPS = ['8', '16', '24', '33', '49', '70'];

export function QuickQuoteStrip({ page }: { page: string }) {
  const ctx = useMemo(() => contextFor(page), [page]);
  const [journey, setJourney] = useState(ctx.journey);
  const [date, setDate] = useState(nextSaturdayIso());
  const [pax, setPax] = useState(ctx.pax);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Re-seed prefills when the visitor moves between pages.
  const [seededFor, setSeededFor] = useState(page);
  if (seededFor !== page) {
    setSeededFor(page);
    setJourney(ctx.journey);
    setPax(ctx.pax);
    setDone(false);
    setError(null);
  }

  if (HIDDEN_PAGES.has(page)) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.replace(/\D/g, '').length < 7) {
      setError('A phone number is all we need to send your price. Landline or mobile, either is fine.');
      return;
    }
    setError(null);
    setSending(true);
    const result = await sendLead({
      type: 'quote',
      name,
      phone,
      pickup: journey,
      date,
      passengers: pax,
      journeyType: ctx.journeyType,
      message: `Quick quote card (${ctx.label}).`,
    });
    setSending(false);
    if (result.ok) setDone(true);
    else setError('That did not send. Please try again, or call 0845 8333 456 and we will price it on the phone.');
  };

  return (
    <section className="bg-stone-100 border-y border-stone-200 py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="bg-white rounded-3xl shadow-[0_25px_70px_rgba(15,23,42,0.08)] border border-stone-200 overflow-hidden">
          <div className="grid lg:grid-cols-5">
            {/* Left: reassurance */}
            <div className="lg:col-span-2 bg-[#0A1428] p-8 md:p-10 flex flex-col justify-center">
              <span className="font-mono text-[9px] font-extrabold text-amber-500 uppercase tracking-[0.3em] block mb-4">
                QUICK QUOTE · NO FORMS TO FIGHT
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-white leading-snug mb-4">
                We have filled most of this in for you.
              </h2>
              <p className="font-sans text-slate-400 text-sm leading-relaxed font-light mb-6">
                Check the journey matches yours, add a name and number, and it goes straight to Alan and Sasha. A rough idea is plenty. Replies usually the same day.
              </p>
              <a href="tel:08458333456" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-sans text-xs font-bold tracking-wider transition-colors">
                <Phone className="w-3.5 h-3.5" /> Rather talk? 0845 8333 456
              </a>
            </div>

            {/* Right: the two-tap form */}
            <div className="lg:col-span-3 p-8 md:p-10">
              {done ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="font-serif text-2xl text-slate-950 mb-2">Done. It is with the family team.</h3>
                  <p className="font-sans text-sm text-slate-500 max-w-sm">
                    Your quote request has gone straight to the owners. If it is urgent, call <a href="tel:08458333456" className="font-bold text-amber-600">0845 8333 456</a>.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500 mb-1.5 font-mono">The journey (edit if different)</label>
                    <input
                      type="text"
                      value={journey}
                      onChange={(e) => setJourney(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 focus:border-amber-500 rounded-xl px-4 py-3 text-sm font-medium text-slate-950 outline-none transition-colors"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500 mb-1.5 font-mono">Rough date</label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 focus:border-amber-500 rounded-xl px-4 py-3 text-sm font-medium text-slate-950 outline-none transition-colors cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500 mb-1.5 font-mono">Roughly how many?</label>
                      <div className="flex flex-wrap gap-1.5">
                        {PAX_CHIPS.map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setPax(p)}
                            className={cn(
                              'px-3 py-2 rounded-lg text-xs font-bold border transition-all duration-200 cursor-pointer',
                              pax === p
                                ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-sm'
                                : 'bg-white border-stone-200 text-slate-500 hover:border-amber-400 hover:text-slate-950'
                            )}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your name (optional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 focus:border-amber-500 rounded-xl px-4 py-3 text-sm font-medium text-slate-950 outline-none transition-colors placeholder:text-slate-400"
                    />
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={phone}
                      onChange={(e) => { setPhone(e.target.value); setError(null); }}
                      className="w-full bg-stone-50 border border-stone-200 focus:border-amber-500 rounded-xl px-4 py-3 text-sm font-medium text-slate-950 outline-none transition-colors placeholder:text-slate-400"
                    />
                  </div>

                  {error && (
                    <p className="text-xs text-red-600 font-sans font-medium bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
                    <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.18em] font-extrabold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-[1.01] shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-60 disabled:cursor-wait"
                    >
                      {sending ? 'Sending…' : 'Get my quote'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-[10px] text-slate-400 font-sans leading-snug">
                      No account, no spam, never sold on.<br className="hidden sm:block" /> Straight to the owners' inbox.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
