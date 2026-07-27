import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ClipboardCheck } from 'lucide-react';
import { sendLead } from '../lib/leads';

/**
 * SchoolTripPack: the free school trip transport checklist, sent against an
 * email address. Captures the school-booker lead early, positions UGO as the
 * compliant, safe operator, and gives genuinely useful material in return.
 */
export function SchoolTripPack({ variant = 'full' }: { variant?: 'full' | 'compact' }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/.+@.+\..+/.test(email)) {
      setError('A school or personal email is all we need to send the pack.');
      return;
    }
    setError(null);
    setSending(true);
    const result = await sendLead({
      type: 'contact',
      name,
      email,
      message: 'School trip pack downloaded (compliance checklist). Warm school-trip lead.',
    });
    setSending(false);
    if (result.ok) {
      setDone(true);
      window.open('/downloads/ugo-school-trip-checklist.pdf', '_blank');
    } else {
      setError('That did not send. Please try again, or call 0845 8333 456 and we will email it over.');
    }
  };

  if (variant === 'compact') {
    return (
      <section className="bg-white border-y border-stone-200 py-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="bg-[#0A1428] rounded-2xl px-6 py-6 md:px-8 flex flex-col lg:flex-row lg:items-center gap-5">
            <div className="flex items-start gap-3.5 flex-1">
              <ClipboardCheck className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-serif text-lg md:text-xl text-white leading-snug">Planning a school trip?</h3>
                <p className="font-sans text-xs text-slate-400 font-light mt-1">
                  Our free transport checklist for organisers: operator vetting, the countdown, and on-the-day essentials. DVSA registered, enhanced DBS drivers.
                </p>
              </div>
            </div>
            {done ? (
              <p className="font-sans text-xs text-emerald-400 font-semibold flex items-center gap-2 shrink-0">
                <CheckCircle2 className="w-4 h-4" /> Sent.{' '}
                <a href="/downloads/ugo-school-trip-checklist.pdf" target="_blank" rel="noopener noreferrer" className="underline text-amber-400">Open the pack</a>
              </p>
            ) : (
              <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2.5 shrink-0 lg:w-[380px]">
                <input
                  type="email"
                  placeholder="Email for the checklist"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(null); }}
                  className="flex-1 bg-black/40 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-[10px] uppercase tracking-[0.15em] font-extrabold py-3 px-5 rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-60"
                >
                  {sending ? 'Sending…' : 'Get it'} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
          {error && <p className="text-xs text-red-600 font-sans mt-2 text-right">{error}</p>}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#0A1428] py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="font-mono text-[9px] font-extrabold text-amber-500 uppercase tracking-[0.3em] block mb-4">
              FREE FOR TRIP ORGANISERS
            </span>
            <h2 className="font-serif text-2xl md:text-4xl text-white leading-snug mb-4">
              The school trip transport checklist
            </h2>
            <p className="font-sans text-slate-400 text-sm leading-relaxed font-light mb-5">
              One page that keeps the transport side of a school trip watertight: what to check about any operator (licence, DBS, seatbelts, insurance), what to confirm at 8 weeks, 4 weeks and the week of travel, and what to have in your pocket on the day. Written by the family team that runs these trips every week.
            </p>
            <ul className="space-y-2">
              {['Operator vetting: the four checks that matter', 'Countdown: 8 weeks, 4 weeks, the week of', 'On-the-day essentials for the trip leader'].map((li) => (
                <li key={li} className="flex items-start gap-2.5 font-sans text-xs text-slate-300">
                  <ClipboardCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /> {li}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-7">
            {done ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="font-serif text-xl text-white mb-2">The pack is opening now.</h3>
                <p className="font-sans text-xs text-slate-400 leading-relaxed">
                  If it did not open,{' '}
                  <a href="/downloads/ugo-school-trip-checklist.pdf" target="_blank" rel="noopener noreferrer" className="text-amber-400 font-bold underline">
                    download it here
                  </a>
                  . When the trip firms up, the quote form takes under a minute.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3.5">
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/40 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500"
                />
                <input
                  type="email"
                  placeholder="Email for the pack"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(null); }}
                  className="w-full bg-black/40 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500"
                />
                {error && <p className="text-xs text-red-400 font-sans">{error}</p>}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans text-xs uppercase tracking-[0.18em] font-extrabold py-3.5 rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-wait"
                >
                  {sending ? 'Sending…' : 'Send me the checklist'} <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-slate-500 font-sans text-center">No spam, no chasing. One useful page, from the family that drives the trips.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
