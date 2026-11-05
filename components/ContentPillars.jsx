'use client';
import { useEffect, useRef } from 'react';

const PILLARS = [
  {
    day: '01',
    pillar: 'Brand Identity',
    emoji: '✦',
    color: '#D6B36A',
    desc: 'Clear visual systems that make a business recognizable, credible, and easy to remember.',
    example: 'Your brand should feel as thoughtful and intentional as the business behind it.',
  },
  {
    day: '02',
    pillar: 'Sample Videos',
    emoji: '▶',
    color: '#5EE7FF',
    desc: 'Short-form edits and visual stories designed to earn attention and communicate your message quickly.',
    example: 'Every frame should move the audience closer to understanding your value.',
  },
  {
    day: '03',
    pillar: 'Funnels & Leads',
    emoji: '↗',
    color: '#4F8DFF',
    desc: 'Conversion-focused journeys that turn interest into meaningful conversations and qualified opportunities.',
    example: 'A good funnel gives the right person a clear next step.',
  },
  {
    day: '04',
    pillar: 'Newsletter & Email',
    emoji: '✉',
    color: '#70C9FF',
    desc: 'Useful, well-structured email content that keeps your audience connected to your business.',
    example: 'Stay relevant by giving people a reason to hear from you again.',
  },
  {
    day: '05',
    pillar: 'Analytics',
    emoji: '◒',
    color: '#2F7BFF',
    desc: 'Readable performance insights that help you understand what is working and where to focus next.',
    example: 'Better decisions begin with a clearer view of the signal in the noise.',
  },
  {
    day: '06',
    pillar: 'Graphic Design',
    emoji: '◇',
    color: '#9CCBFF',
    desc: 'Campaign graphics and branded visual assets that make every touchpoint feel considered.',
    example: 'Creative consistency turns separate pieces into one recognizable presence.',
  },
];

export default function ContentPillars() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.fade-up, .scale-up').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 100);
          });
        }
      });
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="pillars section-padding" ref={ref}>
      <div className="pillars__bg bg-grid"/>

      <div className="container">
        {/* Header */}
        <div className="pillars__header fade-up">
          <div className="section-label">Portfolio Highlights</div>
          <div className="pillars__header-grid">
            <div>
              <h2 className="text-h1">
                Work That Makes<br/>
                <span className="text-gradient">Your Brand Visible.</span>
              </h2>
              <p className="text-muted pillars__sub">
                A selection of the strategic, creative, and growth-focused work we bring together for ambitious businesses.
              </p>
              <div className="pillars__social-btns">
                <a href="https://www.facebook.com/profile.php?id=61594283219152" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  Facebook
                </a>
                <a href="https://www.instagram.com/_topnotchsolutions/" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  </svg>
                  Instagram
                </a>
              </div>
            </div>

            {/* Weekly schedule */}
            <div className="pillars__schedule glass-card fade-right delay-2">
              <div className="pillars__sch-title">Selected disciplines</div>
              {[
                { day: '01', pillar: 'Brand Identity', color: '#D6B36A' },
                { day: '02', pillar: 'Sample Videos', color: '#5EE7FF' },
                { day: '03', pillar: 'Funnels & Leads', color: '#4F8DFF' },
                { day: '04', pillar: 'Email Marketing', color: '#70C9FF' },
                { day: '05', pillar: 'Analytics', color: '#2F7BFF' },
              ].map((item, i) => (
                <div key={i} className="pillars__sch-row">
                  <span className="pillars__sch-day">{item.day}</span>
                  <div className="pillars__sch-tag" style={{ color: item.color, background: `${item.color}15`, border: `1px solid ${item.color}25` }}>
                    {item.pillar}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pillar Cards */}
        <div className="pillars__grid">
          {PILLARS.map((p, i) => (
            <div key={i} className="pillar-card glass-card scale-up" style={{ '--pc': p.color }}>
              <div className="pillar-card__header" style={{ background: `${p.color}10`, borderBottom: `1px solid ${p.color}20` }}>
                <div className="pillar-card__emoji">{p.emoji}</div>
                <div>
                  <div className="pillar-card__day" style={{ color: p.color }}>{p.day}</div>
                  <div className="pillar-card__pillar">{p.pillar}</div>
                </div>
              </div>
              <div className="pillar-card__body">
                <p className="pillar-card__desc">{p.desc}</p>
                <div className="pillar-card__example">
                  <div className="pillar-card__ex-label">Sample post:</div>
                  <p className="pillar-card__ex-text">&ldquo;{p.example}&rdquo;</p>
                </div>
              </div>
              <div className="pillar-card__bar" style={{ background: p.color }}/>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .pillars {
          position: relative;
          background: var(--color-surface);
          overflow: hidden;
        }
        .pillars__bg { position: absolute; inset: 0; opacity: 0.3; }
        .pillars__header { margin-bottom: 48px; position: relative; z-index: 1; }
        .pillars__header-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
          margin-top: 24px;
        }
        .pillars__sub { margin-top: 16px; margin-bottom: 24px; line-height: 1.7; }
        .pillars__social-btns { display: flex; gap: 12px; }

        .pillars__schedule { padding: 24px; }
        .pillars__sch-title { font-family: var(--font-heading); font-weight: 700; font-size: 0.9rem; margin-bottom: 16px; }
        .pillars__sch-row { display: flex; align-items: center; gap: 12px; padding: 8px 0; border-bottom: 1px solid var(--color-border); }
        .pillars__sch-row:last-child { border-bottom: none; }
        .pillars__sch-day { font-family: var(--font-accent); font-weight: 700; font-size: 0.8rem; width: 40px; color: var(--color-muted); flex-shrink: 0; }
        .pillars__sch-tag { padding: 3px 12px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 600; font-family: var(--font-accent); }

        .pillars__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          position: relative;
          z-index: 1;
        }
        .pillar-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 0;
          position: relative;
        }
        .pillar-card:hover {
          border-color: color-mix(in srgb, var(--pc) 30%, transparent);
          transform: translateY(-8px);
        }
        .pillar-card__header {
          display: flex; align-items: center; gap: 12px;
          padding: 20px;
        }
        .pillar-card__emoji { font-size: 1.8rem; }
        .pillar-card__day { font-size: 0.72rem; font-weight: 700; font-family: var(--font-accent); letter-spacing: 0.08em; text-transform: uppercase; }
        .pillar-card__pillar { font-family: var(--font-heading); font-weight: 700; font-size: 1rem; margin-top: 2px; }
        .pillar-card__body { padding: 20px; display: flex; flex-direction: column; gap: 14px; flex: 1; }
        .pillar-card__desc { font-size: 0.83rem; color: var(--color-muted); line-height: 1.6; }
        .pillar-card__example {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: 12px;
        }
        .pillar-card__ex-label { font-size: 0.7rem; font-weight: 600; color: var(--color-muted); font-family: var(--font-accent); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.06em; }
        .pillar-card__ex-text { font-size: 0.8rem; color: var(--color-white); line-height: 1.5; font-style: italic; }
        .pillar-card__bar {
          height: 3px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .pillar-card:hover .pillar-card__bar { opacity: 1; }

        @media (max-width: 1024px) {
          .pillars__header-grid { grid-template-columns: 1fr; }
          .pillars__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .pillars__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
