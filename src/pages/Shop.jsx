import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { PageTitle } from '../components/Bits.jsx';
import { RequestBanner } from '../components/Sections.jsx';
import { PRODUCTS, CATEGORIES, BRANDS, SIZES } from '../data/products.js';

const SORTS = {
  featured: { label: 'Featured', fn: (a, b) => Number(!!b.featured) - Number(!!a.featured) },
  low: { label: 'Price: low to high', fn: (a, b) => a.price - b.price },
  high: { label: 'Price: high to low', fn: (a, b) => b.price - a.price },
  cond: { label: 'Best condition', fn: (a, b) => b.condition - a.condition },
};

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const cat = params.get('cat') || 'all';
  const [q, setQ] = useState('');
  const [brand, setBrand] = useState('all');
  const [size, setSize] = useState('all');
  const [sort, setSort] = useState('featured');
  const [hideSold, setHideSold] = useState(false);

  const setCat = (slug) => {
    const next = new URLSearchParams(params);
    if (slug === 'all') next.delete('cat');
    else next.set('cat', slug);
    setParams(next, { replace: true });
  };

  const catName = CATEGORIES.find((c) => c.slug === cat)?.name;

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return PRODUCTS.filter((p) => (catName ? p.category === catName : true))
      .filter((p) => (brand === 'all' ? true : p.brand === brand))
      .filter((p) => (size === 'all' ? true : p.size === Number(size)))
      .filter((p) => (hideSold ? !p.sold : true))
      .filter((p) => (!term ? true : `${p.brand} ${p.name} ${p.nick || ''} ${p.colorway} ${p.category} ${p.size}`.toLowerCase().includes(term)))
      .sort((a, b) => Number(!!a.sold) - Number(!!b.sold) || SORTS[sort].fn(a, b));
  }, [q, catName, brand, size, sort, hideSold]);

  const reset = () => {
    setQ(''); setBrand('all'); setSize('all'); setSort('featured'); setHideSold(false); setCat('all');
  };
  const filtered = q || brand !== 'all' || size !== 'all' || hideSold || cat !== 'all';

  return (
    <>
      <PageTitle title={catName ? `Shop ${catName}` : 'Shop'} />
      <section className="page-head wrap">
        <p className="label">{PRODUCTS.filter((p) => !p.sold).length} pairs available</p>
        <h1 className="h-xl">{catName || <>The <em>rack</em></>}<sup>{list.length}</sup></h1>
      </section>

      <section className="wrap shop-tools" aria-label="Filters">
        <div className="tabs tabs-scroll" role="group" aria-label="Category">
          <button type="button" className={`tab ${cat === 'all' ? 'tab-on' : ''}`} aria-pressed={cat === 'all'} onClick={() => setCat('all')}>All</button>
          {CATEGORIES.map((c) => (
            <button key={c.slug} type="button" className={`tab ${cat === c.slug ? 'tab-on' : ''}`} aria-pressed={cat === c.slug} onClick={() => setCat(c.slug)}>{c.name}</button>
          ))}
        </div>
        <div className="filters">
          <label className="field field-search">
            <span className="sr-only">Search</span>
            <Icon name="search" size={16} stroke={1.4} />
            <input type="search" placeholder="Search Jordan, Samba, 42" value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
          <label className="field">
            <span className="field-label">Brand</span>
            <select value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value="all">All brands</option>
              {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </label>
          <label className="field">
            <span className="field-label">Size</span>
            <select value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="all">All sizes</option>
              {SIZES.map((s) => <option key={s} value={s}>EU {s}</option>)}
            </select>
          </label>
          <label className="field">
            <span className="field-label">Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </label>
          <label className="check">
            <input type="checkbox" checked={hideSold} onChange={(e) => setHideSold(e.target.checked)} />
            <span>Hide sold</span>
          </label>
          {filtered && <button type="button" className="text-btn" onClick={reset}>Clear all</button>}
        </div>
      </section>

      <section className="wrap">
        {list.length ? (
          <div className="grid-products">
            {list.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        ) : (
          <div className="empty">
            <h2 className="h-md">Nothing in that combination.</h2>
            <p className="muted">Try another size or brand, or ask us on WhatsApp. New pairs come in every week.</p>
            <button type="button" className="btn" onClick={reset}>Clear filters</button>
          </div>
        )}
      </section>
      <RequestBanner />
    </>
  );
}
