import { useState } from 'react';
import { Link } from 'react-router-dom';
import Img from '../components/Img.jsx';
import { Condition, PageTitle } from '../components/Bits.jsx';
import { PaymentLogos } from '../components/Sections.jsx';
import { useBag } from '../context/BagContext.jsx';
import { STORE, formatKES, waLink, telLink } from '../data/store.js';

export default function Bag() {
  const { items, subtotal, remove, clear } = useBag();
  const [method, setMethod] = useState('pickup');
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [note, setNote] = useState('');

  const lines = items.map((p, k) => `${k + 1}. ${p.name}${p.nick ? ` "${p.nick}"` : ''}, EU ${p.size}, ${formatKES(p.price)}`);
  const message = [
    `Hi ${STORE.name}, I'd like to order:`,
    '',
    ...lines,
    '',
    `Subtotal: ${formatKES(subtotal)}`,
    `Collection: ${method === 'pickup' ? `Pick up in ${STORE.area}` : `Delivery to ${area || '(my area)'}`}`,
    name ? `Name: ${name}` : null,
    note ? `Note: ${note}` : null,
    '',
    'Please confirm and send payment details. Thanks!',
  ].filter((l) => l !== null).join('\n');

  if (!items.length) {
    return (
      <>
        <PageTitle title="Your bag" />
        <section className="wrap empty empty-page">
          <p className="label">Your bag</p>
          <h1 className="h-lg">Nothing here <em>yet.</em></h1>
          <p className="muted">Every pair is one of one, so if you see it, it’s there to take.</p>
          <Link to="/shop" className="btn btn-solid">Shop the rack</Link>
        </section>
      </>
    );
  }

  return (
    <>
      <PageTitle title="Your bag" />
      <section className="page-head wrap">
        <p className="label">Every pair is one of one</p>
        <h1 className="h-xl">Your <em>bag</em><sup>{items.length}</sup></h1>
      </section>

      <section className="wrap bag">
        <ul className="bag-list">
          {items.map((p) => (
            <li key={p.id} className="bag-item">
              <Link to={`/product/${p.id}`} className="bag-thumb"><Img src={p.images[0]} alt={p.name} fit="cover" hint="Photo" /></Link>
              <div className="bag-info">
                <p className="label">{p.brand}</p>
                <h2><Link to={`/product/${p.id}`}>{p.name}</Link></h2>
                <p className="muted small">{p.colorway} · EU {p.size}</p>
                <Condition value={p.condition} />
              </div>
              <div className="bag-side">
                <span>{formatKES(p.price)}</span>
                <button type="button" className="text-btn" onClick={() => remove(p.id)} aria-label={`Remove ${p.name}`}>Remove</button>
              </div>
            </li>
          ))}
          <li className="bag-clear"><button type="button" className="text-btn" onClick={clear}>Clear bag</button></li>
        </ul>

        <aside className="summary" aria-label="Order summary">
          <h2 className="h-md">Summary</h2>
          <fieldset className="method">
            <legend className="field-label">How do you want it?</legend>
            <label className={`method-opt ${method === 'pickup' ? 'method-on' : ''}`}>
              <input type="radio" name="method" value="pickup" checked={method === 'pickup'} onChange={() => setMethod('pickup')} />
              <span><strong>Pick up in {STORE.area}</strong><small>Free · {STORE.hours}</small></span>
            </label>
            <label className={`method-opt ${method === 'delivery' ? 'method-on' : ''}`}>
              <input type="radio" name="method" value="delivery" checked={method === 'delivery'} onChange={() => setMethod('delivery')} />
              <span><strong>Delivery in Nairobi</strong><small>Rider fee confirmed on WhatsApp</small></span>
            </label>
          </fieldset>

          <label className="field field-block">
            <span className="field-label">Your name</span>
            <input type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Brian" />
          </label>
          {method === 'delivery' && (
            <label className="field field-block">
              <span className="field-label">Delivery area</span>
              <input type="text" value={area} onChange={(e) => setArea(e.target.value)} placeholder="e.g. Karen, Kilimani, CBD" />
            </label>
          )}
          <label className="field field-block">
            <span className="field-label">Note (optional)</span>
            <textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Anything we should know?" />
          </label>

          <dl className="totals">
            <div><dt>Subtotal</dt><dd>{formatKES(subtotal)}</dd></div>
            <div><dt>{method === 'pickup' ? 'Pick up' : 'Delivery'}</dt><dd>{method === 'pickup' ? 'Free' : 'On WhatsApp'}</dd></div>
            <div className="total"><dt>Total</dt><dd>{formatKES(subtotal)}{method === 'delivery' ? ' +' : ''}</dd></div>
          </dl>

          <a className="btn btn-solid btn-block" href={waLink(message)} target="_blank" rel="noreferrer">Order on WhatsApp</a>
          <a className="btn btn-block" href={telLink}>Or call {STORE.phoneDisplay}</a>
          <PaymentLogos />
          <p className="small muted">
            {STORE.mpesaTill ? `M-Pesa Till ${STORE.mpesaTill}. ` : ''}
            We confirm your pair first, then you pay. Nothing is charged on this site.
          </p>
        </aside>
      </section>
    </>
  );
}
