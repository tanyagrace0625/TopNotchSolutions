'use client';

const TEAM = [
  { name: 'Alexandra Pine', role: 'Chief Business Officer', index: '01' },
  { name: 'Zandra Solis', role: 'Chief Executive Officer', index: '02' },
  { name: 'Andrea Pine', role: 'Chief Operations Officer', index: '03' },
];

export default function Team() {
  return (
    <section id="team" className="team section-padding">
      <div className="team__bg bg-grid" />
      <div className="container">
        <div className="team__intro">
          <div>
            <div className="section-label">Department Heads</div>
            <h2 className="text-h1">Meet Our <span className="text-gradient">Team.</span></h2>
          </div>
          <p className="text-large text-muted">Behind Top-Notch Solutions is a team of creative and digital professionals working together to help businesses grow. Different skills, one connected standard.</p>
        </div>

        <div className="team__grid">
          {TEAM.map((person) => (
            <article className="team__card glass-card" key={person.name}>
              <div className="team__number">{person.index}</div>
              <div className="team__portrait" aria-hidden="true">{person.name.split(' ').map(part => part[0]).join('')}</div>
              <div className="team__name">{person.name}</div>
              <div className="team__role">{person.role}</div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .team { position: relative; background: var(--color-surface-2); overflow: hidden; }
        .team__bg { position: absolute; inset: 0; opacity: .35; }
        .team__intro { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: end; margin-bottom: 48px; }
        .team__intro .text-large { max-width: 520px; line-height: 1.75; }
        .team__grid { position: relative; z-index: 1; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .team__card { min-height: 300px; padding: 28px; display: flex; flex-direction: column; justify-content: flex-end; position: relative; overflow: hidden; }
        .team__card::after { content: ''; position: absolute; inset: auto 0 0; height: 45%; background: linear-gradient(transparent, rgba(3, 10, 28, .9)); pointer-events: none; }
        .team__number { position: absolute; top: 22px; left: 24px; color: var(--color-gold-light); font-family: var(--font-accent); font-size: .75rem; letter-spacing: .16em; }
        .team__portrait { position: absolute; inset: 18% 20% auto; aspect-ratio: 1; display: grid; place-items: center; border: 1px solid rgba(104, 186, 255, .28); border-radius: 50%; color: rgba(159, 214, 255, .88); font-family: var(--font-heading); font-size: clamp(2rem, 5vw, 4rem); letter-spacing: .08em; background: radial-gradient(circle, rgba(63, 141, 255, .2), rgba(7, 20, 49, .1) 68%, transparent 69%); box-shadow: 0 0 70px rgba(30, 113, 255, .18); }
        .team__name, .team__role { position: relative; z-index: 1; }
        .team__name { font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; }
        .team__role { color: var(--color-cyan); font-family: var(--font-accent); font-size: .78rem; letter-spacing: .08em; text-transform: uppercase; margin-top: 6px; }
        @media (max-width: 768px) { .team__intro, .team__grid { grid-template-columns: 1fr; } .team__intro { gap: 20px; } }
      `}</style>
    </section>
  );
}