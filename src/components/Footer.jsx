import { Link } from 'react-router-dom';
import { Wordmark } from './Header.jsx';
import { PaymentLogos } from './Sections.jsx';
import { CATEGORIES } from '../data/products.js';
import { STORE, waLink, telLink, mailLink, mapsLink } from '../data/store.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="footer-intro">
          <Wordmark />
          <p>{STORE.tagline} Cleaned, graded honestly and sold one pair at a time from our shop in {STORE.area}.</p>
          <div className="btn-row">
            <a className="btn btn-light" href={waLink()} target="_blank" rel="noreferrer">WhatsApp</a>
            <a className="btn btn-light" href={STORE.instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>
        <nav aria-label="Shop categories" className="footer-col">
          <h2 className="label">Shop</h2>
          {CATEGORIES.map((c) => (
            <Link key={c.slug} to={`/shop?cat=${c.slug}`}>{c.name}</Link>
          ))}
        </nav>
        <nav aria-label="Help" className="footer-col">
          <h2 className="label">Help</h2>
          <Link to="/how-to-order">How to order</Link>
          <Link to="/how-to-order#grades">Condition grades</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="footer-col">
          <h2 className="label">Visit</h2>
          <a href={mapsLink} target="_blank" rel="noreferrer">{STORE.street}<br />{STORE.area}</a>
          <span>{STORE.hours}</span>
          <a href={telLink}>{STORE.phoneDisplay}</a>
          <a href={mailLink} className="break">{STORE.email}</a>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <PaymentLogos dark />
        <p>© {new Date().getFullYear()} {STORE.name} · <Link to="/credits">Photo credits</Link></p>
      </div>
    </footer>
  );
}
