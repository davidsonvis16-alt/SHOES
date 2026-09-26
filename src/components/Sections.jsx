import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { STORE, PAYMENTS, waLink, telLink, mailLink, mapsLink, mapsEmbed } from '../data/store.js';

const ROMAN = ['i.', 'ii.', 'iii.', 'iv.'];

export const STEPS = [
  { title: 'Choose a pair', text: 'Every listing is one pair in one size, with its condition out of 10 and the price. What you see is what we have.' },
  { title: 'Send it on WhatsApp', text: 'Add pairs to your bag and tap Order on WhatsApp. Your list arrives with us already written out.' },
  { title: 'We confirm, you pay', text: 'We check the pair is still here, send more photos if you want them, then you pay by M-Pesa or card.' },
  { title: 'Collect or get it delivered', text: `Pick up from the shop in ${STORE.area}, or we send a rider anywhere in Nairobi.` },
];

export function Steps() {
  return (
    <ol className="steps">
      {STEPS.map((s, i) => (
        <li key={s.title} className="step">
          <span className="step-no">{ROMAN[i]}</span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function Facts() {
  return (
    <ul className="facts" aria-label="How we sell">
      <li><b>One of one</b>Each listing is a single pair, a single size.</li>
      <li><b>Graded out of 10</b>Wear is described plainly, flaws included.</li>
      <li><b>Cleaned first</b>Every pair is washed and deodorised before it goes up.</li>
      <li><b>M-Pesa or card</b>Pay after we confirm. Pick up or delivery.</li>
    </ul>
  );
}

export function PaymentLogos({ dark = false }) {
  return (
    <div className={`pay ${dark ? 'pay-dark' : ''}`} aria-label="Payment options">
      {PAYMENTS.map((p) => (
        <span key={p.name} className={`pay-chip ${p.name === 'M-Pesa' ? 'pay-chip-mpesa' : ''}`} title={p.note}>
          <img src={p.logo} alt={p.name} loading="lazy" />
        </span>
      ))}
      <span className="pay-cash">Cash</span>
    </div>
  );
}

export function Film() {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    if (mq.matches) setPlaying(false);
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };

  return (
    <section className="film" aria-label="Every pair is cleaned">
      <video ref={ref} src="/video/care.mp4" poster="/video/care-poster.jpg" autoPlay={!reduced} muted loop playsInline preload="metadata" aria-hidden="true" />
      <div className="wrap film-copy">
        <p className="label">Before it goes up</p>
        <h2 className="h-lg">Brushed, washed, <em>re-laced.</em><br />Then photographed.</h2>
      </div>
      <button type="button" className="film-toggle" onClick={toggle}>{playing ? 'Pause' : 'Play'}</button>
    </section>
  );
}

export function RequestBanner() {
  return (
    <section className="request">
      <div className="wrap request-inner">
        <div>
          <p className="label">Size hunt</p>
          <h2 className="h-lg">Not your size? <em>Ask.</em></h2>
        </div>
        <div className="request-side">
          <p className="lead">New pairs come in every week and most sell before they reach the site. Send us the model, your EU size and a budget, and we’ll message you when one lands.</p>
          <div className="btn-row">
            <a className="btn btn-solid" href={waLink(`Hi ${STORE.name}, I'm looking for:\nShoe: \nSize (EU): \nBudget (KES): `)} target="_blank" rel="noreferrer">Request a pair</a>
            <a className="btn" href={telLink}>Call the shop</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Visit({ title = <>Come by <em>the shop.</em></> }) {
  return (
    <section className="visit wrap section">
      <div className="visit-info">
        <p className="label">Visit</p>
        <h2 className="h-lg">{title}</h2>
        <dl className="visit-list">
          <div><dt>Address</dt><dd><a href={mapsLink} target="_blank" rel="noreferrer">{STORE.street}<br />{STORE.area}</a></dd></div>
          <div><dt>Hours</dt><dd>{STORE.hours}</dd></div>
          <div><dt>Phone</dt><dd><a href={telLink}>{STORE.phoneDisplay}</a> · call or WhatsApp</dd></div>
          <div><dt>Email</dt><dd className="break"><a href={mailLink}>{STORE.email}</a></dd></div>
        </dl>
        <div className="btn-row">
          <a className="btn btn-solid" href={mapsLink} target="_blank" rel="noreferrer">Directions</a>
          <a className="btn" href={waLink()} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </div>
      <div className="visit-map">
        <iframe title={`Map to ${STORE.name}, ${STORE.area}`} src={mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
    </section>
  );
}

export function Follow() {
  return (
    <section className="follow wrap">
      <p className="label">New pairs go up on Instagram first</p>
      <a className="h-lg" href={STORE.instagramUrl} target="_blank" rel="noreferrer">@{STORE.instagram}</a>
      <Link to="/gallery" className="arrow-link">See the gallery <Icon name="arrow" size={14} stroke={1.4} /></Link>
    </section>
  );
}

export function CtaLink({ to, children }) {
  return (
    <Link to={to} className="arrow-link">
      {children} <Icon name="arrow" size={14} stroke={1.4} />
    </Link>
  );
}
