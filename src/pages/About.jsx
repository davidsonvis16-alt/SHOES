import Img from '../components/Img.jsx';
import { PageTitle } from '../components/Bits.jsx';
import { Visit, Follow, CtaLink, Film } from '../components/Sections.jsx';
import { STORE } from '../data/store.js';

const VALUES = [
  { title: 'Picked, not bulk-bought', text: 'We turn down more pairs than we take. If we wouldn’t wear it, it doesn’t go on the rack.' },
  { title: 'Graded in plain words', text: 'A score out of ten and a note on anything you should know: creases, scuffs, a replaced insole.' },
  { title: 'Priced for the condition', text: 'A 6/10 pair costs like a 6/10 pair. No hype markup on second-hand.' },
  { title: 'Here after you buy', text: 'Wrong fit? Message us within three days and we’ll sort an exchange if the pair is unworn since.' },
];

export default function About() {
  return (
    <>
      <PageTitle title="About" />
      <section className="page-head wrap">
        <p className="label">About {STORE.name}</p>
        <h1 className="h-xl">Second-hand, <em>handled with care.</em></h1>
      </section>

      <section className="wrap about-split">
        <div className="frame">
          <Img src="/images/about.jpg" alt="Four pairs of Nike sneakers lined up on a shelf" fit="cover" />
        </div>
        <div className="about-copy">
          <h2 className="h-md">A small shop in {STORE.area} with a simple rule: <em>describe every pair honestly.</em></h2>
          <p className="lead">{STORE.name} sells pre-owned sneakers from Nike, Jordan, adidas, New Balance and a few others. We buy from collectors and from people clearing out their shelves, then we clean, check and photograph each pair ourselves.</p>
          <p className="lead">Each listing is one pair in one size. When it’s gone, it’s gone, and we’d rather you ask us a question than guess.</p>
          <CtaLink to="/shop">Shop the rack</CtaLink>
        </div>
      </section>

      <section className="wrap section">
        <div className="values">
          {VALUES.map((v) => (
            <div key={v.title} className="value">
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </section>
      <Film />
      <Visit />
      <Follow />
    </>
  );
}
