import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Icon from './Icon.jsx';
import { useBag } from '../context/BagContext.jsx';
import { STORE, waLink, telLink } from '../data/store.js';

const LINKS = [
  { to: '/shop', label: 'Shop' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/how-to-order', label: 'How to order' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export function Wordmark({ size = 'md' }) {
  return (
    <span className={`wordmark ${size === 'lg' ? 'wordmark-lg' : ''}`}>
      {STORE.wordmark}
      <sup>{STORE.wordmarkSup}</sup>
    </span>
  );
}

export default function Header() {
  const { count } = useBag();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <p className="notice">
        {STORE.area} · Order on <a href={waLink()} target="_blank" rel="noreferrer">WhatsApp</a><span className="notice-more"> · Pay with M-Pesa</span>
      </p>
      <header className="nav">
        <div className="wrap nav-inner">
          <button type="button" className="icon-btn show-md" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
            <Icon name="menu" size={20} stroke={1.4} />
          </button>
          <nav className="nav-links" aria-label="Main">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <Link to="/" className="nav-logo" aria-label={`${STORE.name} home`}>
            <Wordmark />
          </Link>
          <div className="nav-actions">
            <Link to="/shop" className="hide-md">Search</Link>
            <Link to="/bag" aria-label={`Bag, ${count} ${count === 1 ? 'item' : 'items'}`}>Bag ({count})</Link>
          </div>
        </div>
      </header>

      <div className={`drawer ${open ? 'drawer-open' : ''}`} aria-hidden={!open}>
        <div className="drawer-top wrap">
          <Wordmark />
          <button type="button" className="icon-btn" aria-label="Close menu" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            <Icon name="close" size={22} stroke={1.4} />
          </button>
        </div>
        <nav className="drawer-links wrap" aria-label="Mobile">
          <NavLink to="/" end tabIndex={open ? 0 : -1}>Home</NavLink>
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} tabIndex={open ? 0 : -1}>{l.label}</NavLink>
          ))}
          <NavLink to="/bag" tabIndex={open ? 0 : -1}>Bag <small>({count})</small></NavLink>
        </nav>
        <div className="drawer-foot wrap">
          <a className="btn btn-solid" href={waLink()} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>WhatsApp us</a>
          <a className="btn" href={telLink} tabIndex={open ? 0 : -1}>Call {STORE.phoneDisplay}</a>
          <p className="label drawer-meta">{STORE.area}</p>
        </div>
      </div>
    </>
  );
}
