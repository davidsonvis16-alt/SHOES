import { useState } from 'react';
import Icon from '../components/Icon.jsx';
import { PageTitle } from '../components/Bits.jsx';
import { Visit } from '../components/Sections.jsx';
import { STORE, waLink, telLink, mailLink } from '../data/store.js';

export default function Contact() {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const text = `Hi ${STORE.name},${name ? ` this is ${name}.` : ''}\n${msg}`;

  const rows = [
    { label: 'WhatsApp', value: STORE.phoneDisplay, href: waLink(), ext: true },
    { label: 'Call', value: STORE.phoneDisplay, href: telLink },
    { label: 'Email', value: STORE.email, href: mailLink },
    { label: 'Instagram', value: `@${STORE.instagram}`, href: STORE.instagramUrl, ext: true },
  ];

  return (
    <>
      <PageTitle title="Contact" />
      <section className="page-head wrap">
        <p className="label">{STORE.hours}</p>
        <h1 className="h-xl">Talk to <em>us.</em></h1>
      </section>

      <section className="wrap contact-list">
        {rows.map((r) => (
          <a key={r.label} className="contact-row" href={r.href} {...(r.ext ? { target: '_blank', rel: 'noreferrer' } : {})}>
            <span className="label">{r.label}</span>
            <strong className="break">{r.value}</strong>
            <Icon name="arrow" size={18} stroke={1.2} />
          </a>
        ))}
      </section>

      <section className="wrap section">
        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            window.open(waLink(text), '_blank', 'noopener');
          }}
        >
          <h2 className="h-md">Send a <em>quick note</em></h2>
          <p className="muted">This opens WhatsApp with your message written out. Nothing is stored here.</p>
          <label className="field field-block">
            <span className="field-label">Your name</span>
            <input type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Wanjiru" />
          </label>
          <label className="field field-block">
            <span className="field-label">Message</span>
            <textarea rows={4} required value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Looking for Jordan 4s in EU 43, budget around 8k" />
          </label>
          <button type="submit" className="btn btn-solid">Send on WhatsApp</button>
        </form>
      </section>
      <Visit />
    </>
  );
}
