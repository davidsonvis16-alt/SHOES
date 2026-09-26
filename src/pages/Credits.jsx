import Img from '../components/Img.jsx';
import { PageTitle } from '../components/Bits.jsx';
import { CREDITS } from '../data/credits.js';

export default function Credits() {
  return (
    <>
      <PageTitle title="Photo credits" />
      <section className="page-head wrap">
        <p className="label">Photographs, film and logos</p>
        <h1 className="h-xl">Credits</h1>
        <p className="lead">The images on this site come from Wikimedia Commons and are used under the licences listed. Brand names and logos belong to their owners.</p>
      </section>
      <section className="wrap credits">
        {CREDITS.map((c) => (
          <div key={c.file} className="credit">
            <div className="frame">
              {c.file.endsWith('.mp4') ? <Img src="/video/care-poster.jpg" alt="" fit="cover" /> : <Img src={c.file} alt="" fit={c.file.endsWith('.svg') ? 'contain' : 'cover'} />}
            </div>
            <p>
              <a href={c.source} target="_blank" rel="noreferrer">{c.title}</a> by {c.author}
              {c.licenseUrl ? <>, <a href={c.licenseUrl} target="_blank" rel="noreferrer">{c.license}</a></> : `, ${c.license}`}
              . Resized for the web.
            </p>
          </div>
        ))}
      </section>
    </>
  );
}
