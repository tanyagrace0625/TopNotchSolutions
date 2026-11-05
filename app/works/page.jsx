'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const PROJECTS = [
  {
    number: '01',
    name: 'Brand Identity',
    category: 'Strategy / Creative Direction',
    description: 'A sharper visual point of view for businesses ready to be remembered.',
    image: '/about-visual.png',
    tone: 'works-project--blue',
  },
  {
    number: '02',
    name: 'Digital Presence',
    category: 'Website Design / Development',
    description: 'Clear, considered digital experiences that turn attention into confidence.',
    image: '/hero-bg.png',
    tone: 'works-project--cyan',
  },
  {
    number: '03',
    name: 'Growth Systems',
    category: 'Funnels / Lead Generation',
    description: 'Connected journeys that make it easier for the right people to take action.',
    image: '/services-bg.png',
    tone: 'works-project--gold',
  },
  {
    number: '04',
    name: 'Content in Motion',
    category: 'Video / Social Content',
    description: 'A repeatable visual language built to keep a brand moving forward.',
    image: '/cta-bg.png',
    tone: 'works-project--deep',
  },
];

export default function WorksPage() {
  const [progress, setProgress] = useState(0);
  const pageRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const opening = pageRef.current?.querySelector('.works-opening');
      const max = opening ? opening.offsetHeight - window.innerHeight : 1;
      const start = opening?.offsetTop || 0;
      setProgress(Math.min(1, Math.max(0, (window.scrollY - start) / max)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="works-page" ref={pageRef}>
      <header className="works-nav">
        <Link href="/" className="works-nav__back"><span aria-hidden="true">↖</span> TopNotch</Link>
        <div className="works-nav__label">Selected work / 2026</div>
        <Link href="/#contact" className="works-nav__contact">Start a project <span aria-hidden="true">↗</span></Link>
      </header>

      <section className="works-opening" style={{ '--split': `${progress * 52}%`, '--reveal': progress }}>
        <div className="works-opening__stage">
          <div className="works-opening__reveal">
            <p className="works-kicker">Top-Notch Solutions · Company Portfolio 2026</p>
            <h1>Work that puts<br /><em>businesses</em> on point.</h1>
            <p>Strategy, design, development, and growth support brought together under one dedicated team.</p>
          </div>
          <div className="works-opening__reel">
            <div className="works-opening__half works-opening__half--left">
              <video autoPlay muted loop playsInline poster="/hero-bg.png" aria-label="TopNotch creative work reel">
                <source src="/showreel.mp4" type="video/mp4" />
              </video>
              <div className="works-opening__image-fallback" />
            </div>
            <div className="works-opening__half works-opening__half--right">
              <video autoPlay muted loop playsInline poster="/hero-bg.png" aria-hidden="true">
                <source src="/showreel.mp4" type="video/mp4" />
              </video>
              <div className="works-opening__image-fallback" />
            </div>
            <div className="works-opening__scanline" />
            <div className="works-opening__video-label">TopNotch / Motion reel</div>
          </div>
          <div className="works-opening__prompt"><span>Scroll to open</span><span className="works-opening__line" /><span>01 / 04</span></div>
        </div>
      </section>

      <section className="works-statement">
        <p className="works-kicker">The work behind the growth</p>
        <h2>Good work should feel<br /><span>clear before it feels clever.</span></h2>
        <p>Every project starts with the business goal, then finds the right mix of strategy, creative, technology, and momentum to move it forward.</p>
      </section>

      <section className="works-projects">
        {PROJECTS.map((project, index) => (
          <article className={`works-project ${project.tone}`} key={project.name}>
            <div className="works-project__media" style={{ '--project-image': `url(${project.image})` }}>
              <div className="works-project__media-label">{index === 3 ? 'Motion / visual system' : 'Case study / selected frame'}</div>
              <div className="works-project__media-index">{project.number}</div>
            </div>
            <div className="works-project__copy">
              <div className="works-kicker">{project.category}</div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <Link href="/#contact" className="works-project__link">Discuss a similar project <span aria-hidden="true">↗</span></Link>
            </div>
          </article>
        ))}
      </section>

      <section className="works-index">
        <div className="works-index__header">
          <div>
            <p className="works-kicker">The index</p>
            <h2>Selected<br /><span>capabilities.</span></h2>
          </div>
          <p>Not a catalogue of deliverables. A connected set of ways to make your business more visible, more trusted, and easier to choose.</p>
        </div>
        <div className="works-index__list">
          {[
            ['01', 'Brand identity', 'Positioning · Visual systems · Direction'],
            ['02', 'Websites', 'UX · UI · Development · Maintenance'],
            ['03', 'Content systems', 'Social · Video · Email · Editorial'],
            ['04', 'Growth engines', 'Funnels · Leads · Analytics · Conversion'],
          ].map(([number, title, detail]) => (
            <div className="works-index__row" key={number}>
              <span>{number}</span><strong>{title}</strong><small>{detail}</small><span aria-hidden="true">↗</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="works-footer">
        <Image src="/logo.png" alt="TopNotch Solutions" width={220} height={90} />
        <p>Creative minds. One dedicated team.</p>
        <Link href="/#contact" className="btn btn-primary">Build something on point <span aria-hidden="true">↗</span></Link>
      </footer>

      <style>{`
        .works-page { --ink: #f4f8ff; --soft: #9aacc8; --line: rgba(159,198,255,.2); background: #050b1d; color: var(--ink); min-height: 100vh; overflow: hidden; }
        .works-page a { color: inherit; }
        .works-progress { position: fixed; top: 0; left: 0; right: 0; z-index: 20; height: 3px; transform-origin: left; background: linear-gradient(90deg, #2f7bff, #5ee7ff, #d6b36a); }
        .works-nav { position: absolute; top: 0; left: 0; right: 0; z-index: 10; display: flex; justify-content: space-between; align-items: center; padding: 26px clamp(20px, 5vw, 76px); font: 500 .72rem var(--font-accent); letter-spacing: .13em; text-transform: uppercase; }
        .works-nav a { text-decoration: none; }
        .works-nav__back { display: flex; align-items: center; gap: 10px; }
        .works-nav__back span, .works-nav__contact span { color: #d6b36a; font-size: 1rem; }
        .works-nav__label { color: var(--soft); }
        .works-nav__contact { border-bottom: 1px solid rgba(159,198,255,.45); padding-bottom: 8px; }
        .works-opening { position: relative; height: 190vh; background: #071126; }
        .works-opening__stage { position: sticky; top: 0; height: 100svh; overflow: hidden; isolation: isolate; }
        .works-opening__reveal { position: absolute; inset: 0; z-index: 1; display: grid; place-content: center; padding: 140px clamp(20px, 9vw, 150px) 70px; background: radial-gradient(circle at 50% 45%, rgba(34,118,255,.18), transparent 36%), #071126; }
        .works-opening__reveal h1 { max-width: 900px; margin-top: 24px; font: 700 clamp(3.2rem, 9vw, 9.2rem)/.92 var(--font-heading); letter-spacing: -.045em; }
        .works-opening__reveal h1 em { color: #5ee7ff; font-style: normal; }
        .works-opening__reveal > p:last-child { max-width: 440px; margin-top: 34px; color: #b5c6df; font-size: clamp(1rem, 1.7vw, 1.25rem); line-height: 1.7; }
        .works-opening__reel { position: absolute; inset: 0; z-index: 2; overflow: hidden; background: #050b1d; clip-path: inset(0); transition: clip-path .05s linear; }
        .works-opening__half { position: absolute; top: 0; bottom: 0; z-index: 1; width: 50%; overflow: hidden; transition: transform .05s linear; }
        .works-opening__half--left { left: 0; transform: translateX(calc(var(--split) * -1)); }
        .works-opening__half--right { right: 0; transform: translateX(var(--split)); }
        .works-opening__half video, .works-opening__image-fallback { position: absolute; inset: -5%; width: 210%; height: 110%; object-fit: cover; animation: works-opening-drift 18s ease-in-out infinite alternate; }
        .works-opening__half--right video, .works-opening__half--right .works-opening__image-fallback { left: -110%; }
        .works-opening__image-fallback { z-index: -1; background: linear-gradient(180deg, rgba(5,11,29,.18), rgba(5,11,29,.78)), url('/hero-bg.png') center / cover; }
        .works-opening__reel::after { content: ''; position: absolute; inset: 0; z-index: 2; background: linear-gradient(180deg, rgba(5,11,29,.14), rgba(5,11,29,.5)); pointer-events: none; }
        .works-opening__scanline { position: absolute; left: 0; right: 0; height: 1px; top: 20%; background: rgba(143,220,255,.35); box-shadow: 0 0 20px #5ee7ff; animation: works-scan 7s linear infinite; }
        .works-kicker { color: #8fc6ff; font: 600 .68rem var(--font-accent); letter-spacing: .2em; text-transform: uppercase; }
        .works-opening h1 { max-width: 900px; margin-top: 24px; font: 700 clamp(3.2rem, 9vw, 9.2rem)/.92 var(--font-heading); letter-spacing: -.045em; }
        .works-opening h1 em { color: #5ee7ff; font-style: normal; }
        .works-opening__prompt { position: absolute; z-index: 4; bottom: 42px; left: clamp(20px, 9vw, 150px); right: clamp(20px, 9vw, 150px); display: flex; align-items: center; gap: 16px; color: var(--soft); font: .68rem var(--font-accent); letter-spacing: .16em; text-transform: uppercase; pointer-events: none; }
        .works-opening__prompt span:last-child { margin-left: auto; }
        .works-opening__line { width: 100px; height: 1px; background: linear-gradient(90deg, #d6b36a, transparent); }
        .works-opening__video-label { position: absolute; z-index: 3; right: 28px; top: 50%; writing-mode: vertical-rl; transform: translateY(-50%); color: rgba(220,235,255,.75); font: .62rem var(--font-accent); letter-spacing: .17em; text-transform: uppercase; }
        .works-statement { max-width: 900px; padding: 18vh clamp(20px, 9vw, 150px); }
        .works-statement h2, .works-index h2 { margin-top: 20px; font: 600 clamp(2.7rem, 6vw, 6.8rem)/.96 var(--font-heading); letter-spacing: -.04em; }
        .works-statement h2 span, .works-index h2 span { color: #5ee7ff; }
        .works-statement > p:last-child { max-width: 450px; margin: 34px 0 0 auto; color: var(--soft); font-size: 1.05rem; line-height: 1.8; }
        .works-projects { display: flex; flex-direction: column; gap: 16vh; padding: 8vh clamp(20px, 6vw, 100px) 20vh; }
        .works-project { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(260px, .65fr); gap: clamp(28px, 7vw, 120px); align-items: center; min-height: 78vh; }
        .works-project:nth-child(even) { grid-template-columns: minmax(260px, .65fr) minmax(0, 1.35fr); }
        .works-project:nth-child(even) .works-project__media { order: 2; }
        .works-project__media { position: relative; min-height: 62vh; overflow: hidden; background: var(--project-image) center / cover; border: 1px solid var(--line); box-shadow: 0 30px 100px rgba(0,0,0,.35); }
        .works-project__media::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(47,123,255,.25), rgba(5,11,29,.18) 48%, rgba(5,11,29,.7)); mix-blend-mode: screen; }
        .works-project--cyan .works-project__media::before { background: linear-gradient(135deg, rgba(94,231,255,.25), rgba(5,11,29,.2) 48%, rgba(5,11,29,.7)); }
        .works-project--gold .works-project__media::before { background: linear-gradient(135deg, rgba(214,179,106,.26), rgba(5,11,29,.2) 48%, rgba(5,11,29,.72)); }
        .works-project__media-label, .works-project__media-index { position: absolute; z-index: 1; color: #dbeaff; font: .62rem var(--font-accent); letter-spacing: .15em; text-transform: uppercase; }
        .works-project__media-label { top: 22px; left: 24px; }
        .works-project__media-index { right: 24px; bottom: 22px; color: #d6b36a; font-size: 1.1rem; }
        .works-project__copy { max-width: 380px; }
        .works-project__copy h3 { margin: 22px 0 18px; font: 600 clamp(2.2rem, 4.5vw, 5rem)/.98 var(--font-heading); letter-spacing: -.035em; }
        .works-project__copy p { color: var(--soft); font-size: 1.02rem; line-height: 1.75; }
        .works-project__link { display: inline-block; margin-top: 34px; padding-bottom: 10px; border-bottom: 1px solid rgba(159,198,255,.4); text-decoration: none; font: .72rem var(--font-accent); letter-spacing: .12em; text-transform: uppercase; }
        .works-project__link span { color: #d6b36a; margin-left: 8px; }
        .works-index { padding: 18vh clamp(20px, 9vw, 150px); background: #081735; }
        .works-index__header { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: end; }
        .works-index__header > p { max-width: 400px; color: var(--soft); line-height: 1.8; }
        .works-index__list { margin-top: 80px; border-top: 1px solid var(--line); }
        .works-index__row { display: grid; grid-template-columns: 70px 1fr 1.5fr 30px; gap: 20px; align-items: center; padding: 25px 0; border-bottom: 1px solid var(--line); }
        .works-index__row > span:first-child { color: #d6b36a; font: .7rem var(--font-accent); }
        .works-index__row strong { font: 600 clamp(1.1rem, 2vw, 1.7rem) var(--font-heading); }
        .works-index__row small { color: var(--soft); font: .78rem var(--font-accent); letter-spacing: .05em; }
        .works-index__row > span:last-child { color: #5ee7ff; text-align: right; font-size: 1.3rem; }
        .works-footer { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 48px clamp(20px, 6vw, 100px); border-top: 1px solid var(--line); }
        .works-footer img { width: 170px; height: auto; }
        .works-footer p { margin-right: auto; color: var(--soft); font: .8rem var(--font-accent); letter-spacing: .08em; text-transform: uppercase; }
        .works-footer .btn { text-decoration: none; }
        @keyframes works-opening-drift { from { transform: scale(1.02) translate3d(0,0,0); } to { transform: scale(1.12) translate3d(-1.5%, -2%, 0); } }
        @keyframes works-scan { from { transform: translateY(-10vh); } to { transform: translateY(80vh); } }
        @media (max-width: 800px) { .works-nav__label { display: none; } .works-opening { height: 170vh; } .works-opening__reveal { padding-top: 120px; } .works-project, .works-project:nth-child(even) { grid-template-columns: 1fr; min-height: auto; gap: 28px; } .works-project:nth-child(even) .works-project__media { order: 0; } .works-project__media { min-height: 58vh; } .works-index__header { grid-template-columns: 1fr; gap: 24px; } .works-index__row { grid-template-columns: 40px 1fr 24px; } .works-index__row small { display: none; } .works-footer { flex-wrap: wrap; } .works-footer p { margin-right: 0; } }
        @media (prefers-reduced-motion: reduce) { .works-opening__image-fallback, .works-opening__scanline { animation: none; } }
      `}</style>
    </main>
  );
}
