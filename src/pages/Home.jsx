import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import Img from '../components/Img.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { PageTitle, SectionHead } from '../components/Bits.jsx';
import { Facts, Film, RequestBanner, Visit, Follow, Steps, CtaLink } from '../components/Sections.jsx';
import { PRODUCTS, CATEGORIES } from '../data/products.js';
import { STORE, formatKES } from '../data/store.js';

const AVAILABLE = PRODUCTS.filter((p) => !p.sold);
const FEATURED = AVAILABLE.filter((p) => p.featured);

function Hero() {
  const [cover, ...side] = FEATURED;
  return (
    <section className="wrap hero">
      <div className="hero-copy">
        <p className="label">{STORE.area} · {AVAILABLE.length} pairs in stock</p>
        <h1 className="h-xl">Pre-owned sneakers, chosen <em>one pair</em> at a time.</h1>
        <p className="lead">Jordans, Dunks, Sambas, New Balance and the odd pair of Timbs. Every one cleaned, graded out of ten and priced for what it is.</p>
        <div className="btn-row">
          <Link to="/shop" className="btn btn-solid">Shop the rack</Link>
          <Link to="/how-to-order" className="btn">How it works</Link>
        </div>
        <div className="hero-side">
          {side.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`}>
              <div className="frame"><Img src={p.images[0]} alt={p.name} fit="cover" eager /></div>
              <p>{p.name} · EU {p.size}</p>
            </Link>
          ))}
        </div>
      </div>
      {cover && (
        <Link to={`/product/${cover.id}`} className="hero-cover">
          <div className="frame"><Img src={cover.images[0]} alt={`${cover.name} ${cover.nick || ''}`} fit="cover" eager /></div>
          <p className="caption">
            <span><span className="label">This week</span><br />{cover.name} {cover.nick && <em>{cover.nick}</em>}</span>
            <span>EU {cover.size} · {formatKES(cover.price)}</span>
          </p>
        </Link>
      )}
    </section>
  );
}

function Rack() {
  const [brand, setBrand] = useState('All');
  const pool = useMemo(() => AVAILABLE.filter((p) => !p.featured), []);
  const brands = useMemo(() => ['All', ...new Set(pool.map((p) => p.brand))], [pool]);
  const list = pool.filter((p) => brand === 'All' || p.brand === brand).slice(0, 8);
  return (
    <section className="wrap section">
      <SectionHead label="Just in" title={<>On the <em>rack</em></>}>
        <CtaLink to="/shop">All {AVAILABLE.length} pairs</CtaLink>
      </SectionHead>
      <div className="tabs tabs-scroll" role="group" aria-label="Filter by brand" style={{ marginBottom: 28 }}>
        {brands.map((b) => (
          <button key={b} type="button" className={`tab ${brand === b ? 'tab-on' : ''}`} aria-pressed={brand === b} onClick={() => setBrand(b)}>{b}</button>
        ))}
      </div>
      <div className="grid-products">
        {list.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </section>
  );
}

function Index() {
  return (
    <section className="wrap section">
      <SectionHead label="Browse" title={<>By <em>category</em></>} />
      <nav className="index" aria-label="Categories">
        {CATEGORIES.map((c, k) => {
          const pairs = AVAILABLE.filter((p) => p.category === c.name);
          return (
            <Link key={c.slug} to={`/shop?cat=${c.slug}`} className="index-row">
              <span className="no">{String(k + 1).padStart(2, '0')}</span>
              <span className="name">{c.name}</span>
              <span className="count">{pairs.length} {pairs.length === 1 ? 'pair' : 'pairs'}</span>
              <Icon name="arrow" size={18} stroke={1.2} />
              {pairs[0] && <span className="index-peek" aria-hidden="true"><Img src={pairs[0].images[0]} alt="" fit="cover" /></span>}
            </Link>
          );
        })}
      </nav>
    </section>
  );
}

function Story() {
  return (
    <section className="wrap section story">
      <div className="frame"><Img src="/images/story.jpg" alt="A pair of worn black adidas Sambas on a wooden floor" fit="cover" /></div>
      <div className="story-copy">
        <p className="label">Why second-hand</p>
        <h2 className="h-lg">Good shoes deserve a <em>second owner.</em></h2>
        <p className="lead">Most of the pairs that pass through {STORE.name} have years left in them. We buy carefully, clean everything, and write down exactly what we see, so the condition you read is the condition you get.</p>
        <p className="lead">No hype pricing, no mystery bundles. One pair, one size, one fair number.</p>
        <CtaLink to="/about">Our story</CtaLink>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <PageTitle />
      <Hero />
      <Facts />
      <Rack />
      <Film />
      <Index />
      <Story />
      <section className="wrap section">
        <SectionHead label="No account, no card details online" title={<>How to <em>order</em></>}>
          <CtaLink to="/how-to-order">Full details</CtaLink>
        </SectionHead>
        <Steps />
      </section>
      <RequestBanner />
      <Visit />
      <Follow />
    </>
  );
}
