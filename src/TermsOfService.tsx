import React from 'react';

/**
 * Conditions of hire — ported from the business's established Terms and
 * Conditions of Booking (previously published on the old site), with
 * spelling and formatting cleaned up. Substance unchanged.
 */
const TERMS: Array<{ title: string; body: string }> = [
  {
    title: 'The contract',
    body: 'These are the conditions of hire of Pullman Direct Ltd, trading as UGO Coach & Minibus Hire ("the company"). They form the basis of the contract under which the company agrees to hire its vehicles to the customer ("the hirer"), and apply whether the contract has been made verbally or in writing.',
  },
  {
    title: 'Breakdown and delay',
    body: 'The company will use its best endeavours to provide advice on journey times in good faith. However, breakdowns, traffic congestion or other events outside the company\'s control may cause journeys to take longer than predicted. In those circumstances the company will not be liable for any loss or inconvenience suffered by the hirer as a result.',
  },
  {
    title: 'Passenger safety',
    body: 'The company will not accept liability for any damage, injury or loss for any passenger not wearing a seat belt, or standing up or walking around the vehicle whilst it is in motion. No passenger may be carried in excess of the seating capacity of the vehicle, and passengers must wear the seat belts provided at all times.',
  },
  {
    title: 'Other operators\' vehicles',
    body: 'The company reserves the right to substitute other operators\' vehicles in place of its own for any journey or part thereof.',
  },
  {
    title: 'Payment',
    body: 'A deposit is required at the time of booking. The balance is payable fourteen days prior to the date of hire, unless other payment terms are agreed. The company reserves the right to decline a booking where this condition has not been met, in which case the deposit becomes forfeited.',
  },
  {
    title: 'Drivers\' hours regulations',
    body: 'All driver hours are regulated by law. The hirer accepts responsibility for ensuring the hire keeps to the hours and times agreed with the company. Neither the hirer nor any passenger shall delay or otherwise interrupt the journey in such a way that the driver is at risk of breaching regulations relating to driving hours. If any breach is likely to occur, the hirer will be responsible for any additional costs incurred, unless the cause is outside the hirer\'s control.',
  },
  {
    title: 'Conduct of passengers',
    body: 'The driver is responsible for the safety of the vehicle at all times. At the driver\'s discretion, any passenger whose behaviour affects the safety of the vehicle, or who is in breach of the Public Service Vehicle (Conduct of Drivers, Inspectors, Conductors and Passengers) Regulations 1990, may be removed. Full details of these regulations are available from the company on request. The hirer is responsible for any damage caused to the vehicle by any passenger for the duration of the hire.',
  },
  {
    title: 'Cancellation by the hirer',
    body: 'Should the contract be cancelled by the hirer in advance of the due date of hire, any deposit paid will not be refunded. Where full payment has been made, the company is entitled to withhold 50% of the payment on any cancellation by the hirer; where the cancellation occurs within 14 days of the intended hire date, no refund will be made. The hirer will also be liable to pay for any additional items or services bought and paid for on the hirer\'s behalf in advance of the hire. Every effort will be made by the company to reduce this liability; however, all non-retrievable charges remain the responsibility of the hirer.',
  },
  {
    title: 'Consumption of alcohol',
    body: 'No alcohol may be carried or consumed on the vehicle without the prior written consent of the operator. Where the hire is to a sporting event, no alcohol consumption is permitted on the vehicle in any event, and the hirer should be aware of the legal requirements of the Sporting Events (Control of Alcohol etc.) Act 1985. The hirer will indemnify the operator for any fines and related costs, expenses or other losses incurred as a result of any breach by passengers.',
  },
  {
    title: 'Returnable additional deposits',
    body: 'The company reserves the right to require a returnable additional deposit in addition to the hire charge. This deposit will be returned to the hirer following completion of the hire, provided no additional expenses were incurred by the company as a direct result of the hirer\'s or the passengers\' actions.',
  },
  {
    title: 'Additional charges',
    body: 'The company reserves the right to impose additional charges following completion of the hire if passengers have left the vehicle in an unreasonably untidy condition, or where additional time or mileage was required that was not included in the original booking.',
  },
  {
    title: 'No smoking',
    body: 'The company operates a strict no-smoking policy on all vehicles. Hirers are asked to bring this condition to the attention of all passengers travelling.',
  },
  {
    title: 'Airport and ferry transfers',
    body: 'On collecting passengers from airports, ferry ports and similar locations, the vehicle will wait for one hour after the prearranged collection time free of charge. Thereafter, additional waiting time will be charged at the discretion of the company.',
  },
  {
    title: 'Passengers\' property and lost property',
    body: 'For safety reasons the driver is the sole arbiter of the carriage and storage of passengers\' luggage. Luggage may only be carried in the seating area if it fits safely in the overhead lockers; large or bulky items may not be able to be carried, and the hirer should notify the company of such requirements in advance. It is the hirer\'s responsibility to minimise the risk of damage to or loss of property on the vehicle and to ensure items are insured. The company will not accept liability for damage to or loss of property on or left on a vehicle (including the hold), howsoever caused. Recovered lost property is held at the company\'s premises subject to the Public Service Vehicles (Lost Property) Regulations, details of which are available on request.',
  },
  {
    title: 'Complaints',
    body: 'In the event of a complaint about the company\'s services, the hirer should first seek a solution at the time from the driver, or from the company by calling 0845 8333 456. If this has not provided a remedy, complaints should be submitted in writing within 14 days of the end of the hire. The company will reply to any complaint within 48 hours of receipt.',
  },
  {
    title: 'Acceptance',
    body: 'Acceptance of our quotation implies acceptance of the above conditions.',
  },
];

export function TermsOfService() {
  return (
    <div className="bg-stone-50 min-h-screen font-sans">
      <section className="bg-stone-50 pt-32 pb-12 md:pt-40 border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <h1 className="font-serif text-4xl md:text-5xl text-slate-900 leading-tight mb-4">
            Terms &amp; Conditions of Hire
          </h1>
          <p className="font-sans text-slate-600 font-light text-base">
            Pullman Direct Ltd, trading as UGO Coach &amp; Minibus Hire.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 space-y-8">
          {TERMS.map((t, i) => (
            <div key={t.title}>
              <h2 className="font-serif text-xl text-slate-900 mb-2">
                <span className="text-amber-600 font-sans text-sm font-bold mr-3">{String(i + 1).padStart(2, '0')}</span>
                {t.title}
              </h2>
              <p className="font-sans text-slate-700 font-light leading-relaxed text-[15px]">{t.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
