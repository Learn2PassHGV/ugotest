import React from 'react';

/**
 * UK GDPR privacy policy written for what this website actually does:
 * enquiry forms, an AI chat assistant whose transcripts are emailed to the
 * team, optional analytics, and nothing else. No advertising, no data sales.
 * The client should have this glanced over by their legal adviser at launch.
 */
export function PrivacyPolicy() {
  return (
    <div className="bg-stone-50 min-h-screen font-sans">
      <section className="bg-stone-50 pt-32 pb-12 md:pt-40 border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <h1 className="font-serif text-4xl md:text-5xl text-slate-900 leading-tight mb-4">Privacy Policy</h1>
          <p className="font-sans text-slate-600 font-light text-base">
            UGO Coach &amp; Minibus Hire (UGO is a trading name of Pullman Direct Ltd) — last updated July 2026.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 space-y-10 font-sans text-slate-700 font-light leading-relaxed text-[15px]">
          <div>
            <h2 className="font-serif text-2xl text-slate-900 mb-3">Who we are</h2>
            <p>
              This website, www.coaches.business, is operated by Pullman Direct Ltd, trading as UGO Coach &amp;
              Minibus Hire ("we", "us"). Registered office: Wellington House, 273-275 High Street, London Colney,
              St Albans, Hertfordshire AL2 1HA. For anything relating to your personal data, contact us at{' '}
              <a href="mailto:sasha@coaches.business" className="text-amber-700 hover:underline">sasha@coaches.business</a>{' '}
              or on 0845 8333 456.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-slate-900 mb-3">What we collect and why</h2>
            <p className="mb-4">
              We collect personal information only when you choose to give it to us, and only so that we can
              respond to you and provide our transport services:
            </p>
            <p className="mb-2">
              <strong className="font-medium text-slate-900">Quote and enquiry forms.</strong> Name, email address, phone
              number and your journey details (pickup, destination, dates, group size). These are emailed
              securely to our management team so we can prepare and send your quote. Lawful basis: taking steps
              at your request before entering into a contract.
            </p>
            <p className="mb-2">
              <strong className="font-medium text-slate-900">Chat assistant.</strong> Our website chat assistant is powered by
              Google's Gemini API. Messages you type are processed by Google to generate replies, and if you
              share contact details in the chat, the conversation is emailed to our team so a real person can
              follow up on your enquiry. Please do not enter sensitive personal information into the chat.
            </p>
            <p>
              <strong className="font-medium text-slate-900">Booking and account records.</strong> If you book with us we keep
              records of the hire (contact details, itinerary, payments) to fulfil the contract and to meet
              legal and accounting obligations.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-slate-900 mb-3">Who we share it with</h2>
            <p>
              We never sell your data, and we do not share it with brokers or marketing companies. Limited data
              is processed on our behalf by service providers who help us run the website and the business: our
              email delivery provider (to deliver enquiry emails to us), Google (to power the chat assistant),
              our website hosting provider, and — where you make a payment — banks and payment processors.
              Each provider is bound to process data only on our instructions.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-slate-900 mb-3">How long we keep it</h2>
            <p>
              Enquiries that do not lead to a booking are kept for up to 12 months so we can deal with follow-up
              questions, then deleted. Booking and invoicing records are kept for 6 years as required for tax
              purposes.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-slate-900 mb-3">Cookies and analytics</h2>
            <p>
              This site does not use advertising cookies. If we use privacy-respecting analytics to understand
              how the site is used, the data is aggregated and is not used to identify you. Your browser
              settings let you block or delete cookies at any time.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-slate-900 mb-3">Your rights</h2>
            <p>
              Under UK GDPR you have the right to access the personal data we hold about you, to have it
              corrected or deleted, to object to or restrict our processing of it, and to data portability.
              To exercise any of these rights, email{' '}
              <a href="mailto:sasha@coaches.business" className="text-amber-700 hover:underline">sasha@coaches.business</a>.
              If you are unhappy with how we have handled your data, you can complain to the Information
              Commissioner's Office at{' '}
              <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline">ico.org.uk</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
