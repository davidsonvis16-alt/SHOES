import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Img from '../components/Img.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { Condition, PageTitle, SectionHead } from '../components/Bits.jsx';
import { PaymentLogos } from '../components/Sections.jsx';
import { useBag } from '../context/BagContext.jsx';
import { PRODUCTS, getProduct, CATEGORIES } from '../data/products.js';
import { STORE, formatKES, waLink } from '../data/store.js';
import NotFound from './NotFound.jsx';

export default function Product() {
  const { id } = useParams();
  const p = getProduct(id);
  const [img, setImg] = useState(0);
  const { add, inBag, isSaved, toggleSaved } = useBag();

  useEffect(() => setImg(0), [id]);

  if (!p) return <NotFound />;

  const added = inBag(p.id);
  const saved = isSaved(p.id);
  const cat = CATEGORIES.find((c) => c.name === p.category);
  const related = PRODUCTS.filter((x) => x.id !== p.id && !x.sold && (x.category === p.category || x.brand === p.brand)).slice(0, 4);
  const fullName = `${p.name}${p.nick ? ` "${p.nick}"` : ''}`;
  const askText = `Hi ${STORE.name}, is the ${fullName} in EU ${p.size} (${formatKES(p.price)}) still available?`;

  return (
    <>
      <PageTitle title={`${p.name} EU ${p.size}`} />
      <nav className="wrap crumbs" aria-label="Breadcrumb">
        <Link to="/shop">Shop</Link><span>/</span>
        {cat && <><Link to={`/shop?cat=${cat.slug}`}>{cat.name}</Link><span>/</span></>}
        <span aria-current="page">{p.name}</span>
      </nav>

      <section className="wrap pdp">
        <div className="pdp-gallery">
          <div className="frame">
            <Img src={p.images[img]} alt={`${p.name}, photo ${img + 1}`} fit="cover" eager hint="Product photo" />
            {p.sold && <span className="card-flag">Sold</span>}
          </div>
          {p.images.length > 1 && (
            <div className="pdp-thumbs" role="group" aria-label="Photos">
              {p.images.map((src, k) => (
                <button key={src} type="button" className={`thumb ${k === img ? 'thumb-on' : ''}`} aria-label={`Show photo ${k + 1}`} aria-pressed={k === img} onClick={() => setImg(k)}>
                  <Img src={src} alt="" fit="cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="pdp-info">
          <p className="label">{p.brand} · {p.category}</p>
          <div>
            <h1 className="serif">{p.name}</h1>
            {p.nick && <p className="h-sm"><em>{p.nick}</em></p>}
          </div>
          <p className="pdp-price">{p.sold ? 'Sold' : formatKES(p.price)}</p>

          <dl className="specs">
            <div><dt>Size</dt><dd>EU {p.size} <span className="muted">· one pair only</span></dd></div>
            <div><dt>Colour</dt><dd>{p.colorway}</dd></div>
            <div><dt>Condition</dt><dd><Condition value={p.condition} /> <Link to="/how-to-order#grades" className="link muted small">What this means</Link></dd></div>
            {p.note && <div><dt>Notes</dt><dd>{p.note}</dd></div>}
          </dl>

          <div className="pdp-actions">
            {p.sold ? (
              <button type="button" className="btn btn-block" disabled>Sold</button>
            ) : added ? (
              <Link to="/bag" className="btn btn-solid btn-block">In your bag · check out</Link>
            ) : (
              <button type="button" className="btn btn-solid btn-block" onClick={() => add(p.id)}>Add to bag</button>
            )}
            <a className="btn btn-block" href={waLink(p.sold ? `Hi ${STORE.name}, the ${p.name} (EU ${p.size}) has sold. Do you have anything similar?` : askText)} target="_blank" rel="noreferrer">
              {p.sold ? 'Ask for something similar' : 'Ask on WhatsApp'}
            </a>
            <button type="button" className="text-btn" aria-pressed={saved} onClick={() => toggleSaved(p.id)}>
              {saved ? 'Saved ✓' : 'Save for later'}
            </button>
          </div>

          <ul className="pdp-notes">
            <li>Want more angles or a video? Ask and we’ll send them the same day.</li>
            <li>Pick up in {STORE.area}, or delivery anywhere in Nairobi.</li>
            <li>Pay after we confirm the pair is yours.</li>
          </ul>
          <PaymentLogos />
        </div>
      </section>

      {related.length > 0 && (
        <section className="wrap section">
          <SectionHead title={<>You might <em>also like</em></>} />
          <div className="grid-products">
            {related.map((r) => <ProductCard key={r.id} p={r} />)}
          </div>
        </section>
      )}
    </>
  );
}
