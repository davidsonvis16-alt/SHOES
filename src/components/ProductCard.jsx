import { Link } from 'react-router-dom';
import Img from './Img.jsx';
import { useBag } from '../context/BagContext.jsx';
import { formatKES } from '../data/store.js';

export default function ProductCard({ p }) {
  const { add, inBag } = useBag();
  const added = inBag(p.id);

  return (
    <article className={`card ${p.sold ? 'card-sold' : ''}`}>
      <div className="card-media">
        <Link to={`/product/${p.id}`} aria-label={`${p.name}, EU ${p.size}`}>
          <div className="frame">
            <Img src={p.images[0]} alt={`${p.name}, ${p.colorway}`} fit="cover" hint="Product photo" />
            {p.sold ? <span className="card-flag">Sold</span> : p.condition >= 10 && <span className="card-flag">Deadstock</span>}
          </div>
        </Link>
        {!p.sold && (
          <button type="button" className={`card-quick ${added ? 'on' : ''}`} onClick={() => add(p.id)} disabled={added} aria-label={`Add ${p.name} to bag`}>
            {added ? 'In bag' : 'Add to bag'}
          </button>
        )}
      </div>
      <div className="card-body">
        <h3 className="card-name">
          <Link to={`/product/${p.id}`}>{p.name}{p.nick && <> <em>{p.nick}</em></>}</Link>
        </h3>
        <p className="card-color">{p.colorway}</p>
        <p className="card-meta">
          <span>EU {p.size} <span className="muted">· {p.condition}/10</span></span>
          <span>{p.sold ? 'Sold' : formatKES(p.price)}</span>
        </p>
      </div>
    </article>
  );
}
