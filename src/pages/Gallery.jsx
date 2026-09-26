import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import Img from '../components/Img.jsx';
import { PageTitle } from '../components/Bits.jsx';
import { Film, Follow } from '../components/Sections.jsx';
import { PRODUCTS } from '../data/products.js';
import { formatKES } from '../data/store.js';

const SHOTS = [
  { src: '/images/story.jpg', caption: 'Sambas, broken in' },
  ...PRODUCTS.flatMap((p) =>
    p.images.map((src) => ({
      src,
      caption: `${p.name}${p.nick ? ` “${p.nick}”` : ''}`,
      meta: p.sold ? 'Sold' : `EU ${p.size} · ${formatKES(p.price)}`,
      to: `/product/${p.id}`,
    }))
  ),
  { src: '/images/about.jpg', caption: 'Nike, four ways' },
];

function Lightbox({ index, onClose, onMove }) {
  const shot = SHOTS[index];
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onMove(1);
      if (e.key === 'ArrowLeft') onMove(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onMove]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={shot.caption}>
      <div className="lightbox-top">
        <span>{String(index + 1).padStart(2, '0')} / {SHOTS.length}</span>
        <button type="button" className="icon-btn" aria-label="Close" onClick={onClose} autoFocus>
          <Icon name="close" size={22} stroke={1.4} />
        </button>
      </div>
      <div className="lightbox-stage" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <img src={shot.src} alt={shot.caption} />
        <button type="button" className="lightbox-nav lightbox-prev" aria-label="Previous photo" onClick={() => onMove(-1)}><Icon name="arrowLeft" size={18} stroke={1.4} /></button>
        <button type="button" className="lightbox-nav lightbox-next" aria-label="Next photo" onClick={() => onMove(1)}><Icon name="arrow" size={18} stroke={1.4} /></button>
      </div>
      <div className="lightbox-foot">
        <span>{shot.caption}{shot.meta ? ` · ${shot.meta}` : ''}</span>
        {shot.to && <Link to={shot.to} onClick={onClose}>View pair</Link>}
      </div>
    </div>
  );
}

export default function Gallery() {
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);
  const move = useCallback((d) => setOpen((i) => (i + d + SHOTS.length) % SHOTS.length), []);

  return (
    <>
      <PageTitle title="Gallery" />
      <section className="page-head wrap">
        <p className="label">{SHOTS.length} photographs</p>
        <h1 className="h-xl">The <em>gallery</em></h1>
      </section>
      <section className="wrap">
        <div className="gallery">
          {SHOTS.map((s, i) => (
            <figure key={s.src} className="gallery-item" role="button" tabIndex={0} onClick={() => setOpen(i)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setOpen(i))} aria-label={`Open ${s.caption}`}>
              <Img src={s.src} alt={s.caption} fit="cover" />
              <figcaption><span>{s.caption}</span>{s.meta && <span className="muted">{s.meta}</span>}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <Film />
      <Follow />
      {open !== null && <Lightbox index={open} onClose={close} onMove={move} />}
    </>
  );
}
