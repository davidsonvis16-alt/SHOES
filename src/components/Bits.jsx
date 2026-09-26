import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from './Icon.jsx';
import { useBag } from '../context/BagContext.jsx';
import { conditionLabel } from '../data/products.js';
import { STORE, waLink } from '../data/store.js';

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export function PageTitle({ title }) {
  useEffect(() => {
    document.title = title ? `${title} | ${STORE.name}` : `${STORE.name} | Pre-owned sneakers, Nairobi`;
  }, [title]);
  return null;
}

export function Condition({ value }) {
  return (
    <span className="cond">
      <b>{value}/10</b> · {conditionLabel(value)}
    </span>
  );
}

export function WhatsAppFab() {
  return (
    <a className="wa-fab" href={waLink(`Hi ${STORE.name}, I'm looking at your website.`)} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp">
      <Icon name="chat" size={16} stroke={1.5} />
      <span>WhatsApp</span>
    </a>
  );
}

export function Toast() {
  const { toast } = useBag();
  return (
    <div className={`toast ${toast ? 'toast-show' : ''}`} role="status" aria-live="polite">
      {toast}
    </div>
  );
}

export function SectionHead({ label, title, children }) {
  return (
    <div className="section-head">
      <div>
        {label && <p className="label">{label}</p>}
        <h2 className="h-lg">{title}</h2>
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}
