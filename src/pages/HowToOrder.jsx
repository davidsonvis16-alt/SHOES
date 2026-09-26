import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PageTitle } from '../components/Bits.jsx';
import { Steps, RequestBanner, CtaLink, PaymentLogos } from '../components/Sections.jsx';
import { conditionLabel } from '../data/products.js';
import { STORE } from '../data/store.js';

const GRADES = [10, 9, 8, 7, 6];
const GRADE_TEXT = {
  10: 'Never worn. Usually with the box and the paper.',
  9: 'Worn a handful of times. You’d have to look hard for marks.',
  8: 'Light wear. Clean uppers, a little creasing, soles in good shape.',
  7: 'Clearly worn, with plenty of life left. Any flaws are in the notes.',
  6: 'Well used and priced to match. Cleaned and fully wearable.',
};

const FAQ = [
  ['Is every pair one size only?', 'Yes. Each listing is a single second-hand pair, so the size shown is the only one. Looking for something else? Send us a size request on WhatsApp.'],
  ['Can I see more photos first?', 'Always. Tap Ask on WhatsApp on any pair and we’ll send close-ups of the soles, heels and insoles, or a short video.'],
  ['How do I pay?', `Once we confirm the pair is yours, pay by M-Pesa${STORE.mpesaTill ? ` (Till ${STORE.mpesaTill})` : ''}. Card and cash are accepted in the shop.`],
  ['Where do I collect?', `At the shop: ${STORE.address}. ${STORE.hours}.`],
  ['Do you deliver?', 'Yes, anywhere in Nairobi by rider, usually the same or next day. The fee depends on your area and we confirm it before you pay.'],
  ['Can I return a pair?', 'If the fit is wrong, message us within three days. As long as the pair hasn’t been worn since, we’ll exchange it or hold credit for you.'],
];

export default function HowToOrder() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  return (
    <>
      <PageTitle title="How to order" />
      <section className="page-head wrap">
        <p className="label">No account. No card details online.</p>
        <h1 className="h-xl">How to <em>order</em></h1>
      </section>
      <section className="wrap section-tight"><Steps /></section>

      <section className="wrap section" id="grades">
        <div className="section-head"><h2 className="h-lg">Condition <em>grades</em></h2></div>
        <div className="grades">
          {GRADES.map((g) => (
            <div key={g} className="grade">
              <b>{g}<small>/10</small></b>
              <strong>{conditionLabel(g)}</strong>
              <p>{GRADE_TEXT[g]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2 className="h-lg">Payment</h2>
          <PaymentLogos />
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head"><h2 className="h-lg">Questions</h2></div>
        <div className="faq">
          {FAQ.map(([q, a]) => (
            <details key={q}>
              <summary>{q}<span aria-hidden="true">+</span></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
        <div className="center-cta"><CtaLink to="/shop">Start shopping</CtaLink></div>
      </section>
      <RequestBanner />
    </>
  );
}
