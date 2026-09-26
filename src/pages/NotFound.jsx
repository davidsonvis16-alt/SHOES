import { Link } from 'react-router-dom';
import { PageTitle } from '../components/Bits.jsx';

export default function NotFound() {
  return (
    <>
      <PageTitle title="Page not found" />
      <section className="wrap notfound">
        <p className="label">404</p>
        <h1 className="h-xl">This pair <em>walked off.</em></h1>
        <p className="muted">The page isn’t here. The pair may have sold, or the link may be old.</p>
        <div className="btn-row">
          <Link to="/shop" className="btn btn-solid">Back to the shop</Link>
          <Link to="/" className="btn">Home</Link>
        </div>
      </section>
    </>
  );
}
