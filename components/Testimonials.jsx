'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote: "You guys did your thing with this one! This melts my heart. I'm so excited about this project! Your expertise is amazing! Thank you again.",
    author: "Shalondra",
    role: "Client",
    rating: 5,
  },
  {
    quote: "Omgggg I need this badddd! I have the content, I just need structure for you to put it out. I need the community support especially in my lives and in groups on Facebook too. Let's do this!",
    author: "Roechika",
    role: "Client",
    rating: 5,
  },
  {
    quote: "Yes! This is exactly the kind of support I've been looking for. I have the vision, but I need someone who can help execute and keep everything organized.",
    author: "Kimesha",
    role: "Client",
    rating: 5,
  },
];

function StarRating({ count = 5 }) {
  return (
    <div className="tst__rating" style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const intervalRef = useRef(null);
  const transitionMounted = useRef(false);

  const next = () => setActive(a => (a + 1) % TESTIMONIALS.length);
  const prev = () => setActive(a => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    intervalRef.current = setInterval(next, 6000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups = [];
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('.tst__header, .tst__carousel, .tst__main, .tst__controls, .tst__social-bar', {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          filter: 'none',
        });
        return;
      }

      gsap.set('.tst__main', { transformPerspective: 1200, transformStyle: 'preserve-3d' });

      gsap.timeline({
        defaults: { ease: 'power4.out' },
        scrollTrigger: {
          trigger: section,
          start: 'top 72%',
          once: true,
        },
      })
        .from('.tst__header .section-label', { y: 18, opacity: 0, scale: 0.88, duration: 0.55 })
        .from('.tst__header h2', { y: 55, opacity: 0, rotateX: -12, filter: 'blur(8px)', duration: 0.85 }, '-=0.25')
        .from('.tst__main', { y: 110, scale: 0.88, opacity: 0, rotateX: -14, clipPath: 'inset(12% 8% 12% 8% round 24px)', duration: 1 }, '-=0.45')
        .from('.tst__controls', { y: 24, opacity: 0, duration: 0.55 }, '-=0.55')
        .from('.tst__social-bar', { y: 40, opacity: 0, scale: 0.94, duration: 0.75 }, '-=0.35');

      gsap.to('.tst__orb--one', {
        xPercent: 45,
        yPercent: -35,
        scale: 1.2,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.7 },
      });
      gsap.to('.tst__orb--two', {
        xPercent: -40,
        yPercent: 30,
        scale: 0.82,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.7 },
      });
      gsap.to('.tst__beam--one', {
        xPercent: 170,
        rotate: 12,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.4 },
      });
      gsap.to('.tst__beam--two', {
        xPercent: -170,
        rotate: -12,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.4 },
      });
      gsap.to('.tst__ring', {
        rotate: 360,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
      });
      gsap.to('.tst__particle', {
        y: 'random(-60,60)',
        x: 'random(-30,30)',
        opacity: 'random(.15,.7)',
        duration: 'random(3,5.5)',
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.1, from: 'random' },
        ease: 'sine.inOut',
      });

      gsap.to('.tst__carousel', {
        yPercent: -5,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.3 },
      });
      gsap.to('.tst__social-bar', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      });

      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom 18%',
          scrub: 1.4,
        },
      })
        .fromTo('.tst__header', { y: 55, opacity: 0.45 }, { y: 0, opacity: 1 }, 0)
        .to('.tst__header', { y: -45, opacity: 0.35 }, 0.72)
        .to('.tst__main', { y: -38, scale: 0.94, rotateX: 6, filter: 'blur(3px)' }, 0.78)
        .to('.tst__controls, .tst__social-bar', { y: -28, opacity: 0 }, 0.82);

      const card = section.querySelector('.tst__main');
      const onMove = (event) => {
        if (!card) return;
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        card.style.setProperty('--tst-x', `${x * 100}%`);
        card.style.setProperty('--tst-y', `${y * 100}%`);
        gsap.to(card, {
          rotateX: (y - 0.5) * -8,
          rotateY: (x - 0.5) * 10,
          y: -8,
          duration: 0.55,
          ease: 'power3.out',
        });
      };
      const onLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          y: 0,
          duration: 0.9,
          ease: 'elastic.out(1, 0.48)',
        });
      };
      card?.addEventListener('mousemove', onMove);
      card?.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        card?.removeEventListener('mousemove', onMove);
        card?.removeEventListener('mouseleave', onLeave);
      });

    }, section);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const card = ref.current?.querySelector('.tst__main');
    if (!card || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!transitionMounted.current) {
      transitionMounted.current = true;
      gsap.set(card, { clearProps: 'opacity,visibility,display' });
      gsap.set(card.querySelectorAll('.tst__quote-icon, .tst__rating, .tst__quote, .tst__author, .tst__frame-number'), {
        opacity: 1,
        x: 0,
        filter: 'none',
        clearProps: 'visibility',
      });
      return;
    }

    const iris = card.querySelector('.tst__iris');
    const flash = card.querySelector('.tst__flash');
    const frame = card.querySelector('.tst__frame-number');
    const content = card.querySelectorAll('.tst__quote-icon, .tst__rating, .tst__quote, .tst__author');

    gsap.timeline({ defaults: { ease: 'power3.inOut' } })
      .set(iris, { opacity: 0, scale: 0, clipPath: 'circle(0% at 50% 50%)' })
      .set(flash, { opacity: 0 })
      .set(frame, { opacity: 0, scale: 0.75 })
      .set(card, { opacity: 1, visibility: 'visible' })
      .to(card, { scale: 0.975, rotateY: active % 2 === 0 ? -2.5 : 2.5, duration: 0.18 })
      .to(iris, { opacity: 1, scale: 1, clipPath: 'circle(74% at 50% 50%)', duration: 0.24, ease: 'power4.inOut' }, '<')
      .set(card, { transformOrigin: 'center center' })
      .to(flash, { opacity: 0.95, duration: 0.06 }, '-=0.03')
      .to(flash, { opacity: 0, duration: 0.24 })
      .to(iris, { opacity: 0, clipPath: 'circle(0% at 50% 50%)', scale: 1.04, duration: 0.32, ease: 'power4.out' })
      .to(card, { scale: 1, rotateY: 0, duration: 0.38, ease: 'power2.out' })
      .to(frame, { opacity: 1, scale: 1, duration: 0.22 }, '-=0.25')
      .to(content, {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 0.48,
        stagger: 0.07,
        ease: 'power2.out',
      }, '-=0.18');
  }, [active]);

  const goTo = (i) => {
    setActive(i);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 6000);
  };

  return (
    <section id="testimonials" className="tst section-padding" ref={ref}>
      <div className="tst__bg"/>
      <div className="tst__grid" aria-hidden="true"/>
      <div className="tst__orb tst__orb--one" aria-hidden="true"/>
      <div className="tst__orb tst__orb--two" aria-hidden="true"/>
      <div className="tst__ring tst__ring--one" aria-hidden="true"/>
      <div className="tst__ring tst__ring--two" aria-hidden="true"/>
      <div className="tst__beam tst__beam--one" aria-hidden="true"/>
      <div className="tst__beam tst__beam--two" aria-hidden="true"/>
      <div className="tst__side-label tst__side-label--left" aria-hidden="true">CLIENT STORY</div>
      <div className="tst__side-label tst__side-label--right" aria-hidden="true">TOP-NOTCH</div>
      <div className="tst__particles" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => (
          <span
            key={index}
            className="tst__particle"
            style={{
              left: `${6 + ((index * 37) % 88)}%`,
              top: `${8 + ((index * 43) % 82)}%`,
              width: 2 + (index % 3),
              height: 2 + (index % 3),
            }}
          />
        ))}
      </div>

      <div className="container">
        {/* Header */}
        <div className="tst__header text-center">
          <div className="section-label">What They Say</div>
          <h2 className="text-h1">
            Real Businesses.<br/>
            <span className="text-gradient">Real Results.</span>
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div className="tst__carousel">
          <div className="tst__main glass-card">
            <span className="tst__corner tst__corner--tl" aria-hidden="true"/>
            <span className="tst__corner tst__corner--tr" aria-hidden="true"/>
            <span className="tst__corner tst__corner--bl" aria-hidden="true"/>
            <span className="tst__corner tst__corner--br" aria-hidden="true"/>
            <span className="tst__iris" aria-hidden="true"/>
            <span className="tst__flash" aria-hidden="true"/>
            <span className="tst__frame-number" aria-hidden="true">
              {String(active + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
            </span>
            <div className="tst__quote-icon">&ldquo;</div>
            <StarRating count={TESTIMONIALS[active].rating}/>
            <p className="tst__quote">{TESTIMONIALS[active].quote}</p>
            <div className="tst__author">
              <div className="tst__avatar">
                <span>{TESTIMONIALS[active].author.charAt(0)}</span>
              </div>
              <div>
                <div className="tst__name">{TESTIMONIALS[active].author}</div>
                <div className="tst__role">{TESTIMONIALS[active].role}</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="tst__controls">
            <button className="tst__arrow" onClick={prev} aria-label="Previous">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <div className="tst__dots">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} className={`tst__dot ${i === active ? 'active' : ''}`} onClick={() => goTo(i)} aria-label={`Go to testimonial ${i+1}`}/>
              ))}
            </div>
            <button className="tst__arrow" onClick={next} aria-label="Next">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

      </div>

      <style>{`
        .tst {
          position: relative;
          padding-top: 72px;
          padding-bottom: 72px;
          background:
            radial-gradient(circle at 50% 0%, rgba(74, 157, 255, .18), transparent 28%),
            linear-gradient(135deg, #071735 0%, #0a2c62 48%, #07162f 100%);
          overflow: hidden;
        }
        .tst::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: .42;
          background:
            linear-gradient(115deg, transparent 0 58%, rgba(91, 188, 255, .09) 58.2%, transparent 58.7%),
            radial-gradient(circle at 18% 72%, rgba(35, 116, 255, .2), transparent 20%),
            radial-gradient(circle at 82% 28%, rgba(0, 208, 255, .12), transparent 18%);
          pointer-events: none;
        }
        .tst__bg {
          position: absolute; inset: 0;
          background:
            linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px),
            radial-gradient(ellipse 70% 60% at 50% 50%, rgba(37,99,235,.12), transparent 72%);
          background-size: 64px 64px, 64px 64px, auto;
          mask-image: radial-gradient(ellipse at center, black 10%, transparent 82%);
        }
        .tst > .container { position: relative; z-index: 5; }
        .tst__grid {
          position: absolute;
          inset: -20% -12%;
          opacity: .12;
          transform: perspective(800px) rotateX(58deg) scale(1.08);
          transform-origin: center bottom;
          background-image:
            linear-gradient(rgba(112,194,255,.38) 1px, transparent 1px),
            linear-gradient(90deg, rgba(112,194,255,.38) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse at center, black 0%, transparent 72%);
          pointer-events: none;
        }
        .tst__orb {
          position: absolute;
          width: 520px;
          height: 520px;
          border-radius: 50%;
          filter: blur(110px);
          pointer-events: none;
        }
        .tst__orb--one { left: -300px; top: 10%; background: rgba(37,99,235,.24); }
        .tst__orb--two { right: -280px; bottom: -5%; background: rgba(6,182,212,.16); }
        .tst__ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(112,194,255,.12);
          pointer-events: none;
        }
        .tst__ring--one { width: 580px; height: 580px; left: -390px; top: 18%; }
        .tst__ring--two { width: 400px; height: 400px; right: -230px; bottom: 12%; }
        .tst__beam {
          position: absolute;
          width: 36%;
          height: 1px;
          opacity: .14;
          background: linear-gradient(90deg, transparent, rgba(112,214,255,.9), transparent);
          box-shadow: 0 0 18px rgba(87,196,255,.5);
          pointer-events: none;
        }
        .tst__beam--one { left: -22%; top: 30%; transform: rotate(8deg); }
        .tst__beam--two { right: -22%; bottom: 26%; transform: rotate(-8deg); }
        .tst__particles { position: absolute; inset: 0; pointer-events: none; }
        .tst__particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(143,214,255,.85);
          box-shadow: 0 0 12px rgba(87,196,255,.8);
          opacity: .35;
        }
        .tst__side-label {
          position: absolute;
          z-index: 3;
          top: 50%;
          color: rgba(157, 211, 255, .38);
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: .32em;
          writing-mode: vertical-rl;
          pointer-events: none;
        }
        .tst__side-label--left { left: 32px; transform: translateY(-50%) rotate(180deg); }
        .tst__side-label--right { right: 32px; transform: translateY(-50%); }
        .tst__header { max-width: 600px; margin: 0 auto 32px; }

        .tst__carousel { max-width: 760px; margin: 0 auto; position: relative; z-index: 1; }
        .tst__main {
          padding: 40px 44px 32px;
          position: relative;
          overflow: hidden;
          opacity: 1;
          visibility: visible;
          min-height: 280px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          --tst-x: 50%;
          --tst-y: 50%;
          isolation: isolate;
          border: 1px solid rgba(133, 196, 255, .24);
          box-shadow:
            0 28px 80px rgba(1, 9, 28, .46),
            inset 0 1px rgba(255,255,255,.09),
            0 0 0 8px rgba(107, 179, 255, .025);
        }
        .tst__corner {
          position: absolute;
          width: 26px;
          height: 26px;
          z-index: 4;
          pointer-events: none;
        }
        .tst__corner--tl { top: 14px; left: 14px; border-top: 2px solid #79c8ff; border-left: 2px solid #79c8ff; }
        .tst__corner--tr { top: 14px; right: 14px; border-top: 2px solid #79c8ff; border-right: 2px solid #79c8ff; }
        .tst__corner--bl { bottom: 14px; left: 14px; border-bottom: 2px solid #79c8ff; border-left: 2px solid #79c8ff; }
        .tst__corner--br { bottom: 14px; right: 14px; border-bottom: 2px solid #79c8ff; border-right: 2px solid #79c8ff; }
        .tst__iris {
          position: absolute;
          inset: -3%;
          z-index: 7;
          border-radius: inherit;
          opacity: 0;
          transform: scale(0);
          clip-path: circle(0% at 50% 50%);
          background:
            radial-gradient(circle at 50% 50%, rgba(18, 67, 126, .98) 0%, rgba(7, 35, 75, .98) 58%, rgba(3, 14, 35, .99) 100%);
          pointer-events: none;
          transform-origin: center center;
          will-change: clip-path, transform, opacity;
        }
        .tst__flash {
          position: absolute;
          inset: 0;
          z-index: 8;
          opacity: 0;
          background:
            radial-gradient(circle at 50% 45%, white 0%, rgba(211,238,255,.95) 12%, rgba(117,198,255,.45) 38%, transparent 72%);
          pointer-events: none;
        }
        .tst__frame-number {
          position: absolute;
          right: 24px;
          bottom: 20px;
          z-index: 6;
          color: rgba(174, 216, 255, .72);
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: .18em;
          font-family: var(--font-accent);
          pointer-events: none;
        }
        .tst__main::before {
          content: '';
          position: absolute;
          inset: -1px;
          z-index: -1;
          opacity: 0.75;
          background:
            radial-gradient(circle 260px at var(--tst-x) var(--tst-y), rgba(112,194,255,.16), transparent 72%);
          pointer-events: none;
        }
        .tst__main::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(120deg, transparent 20%, rgba(255,255,255,.06) 48%, transparent 72%);
          transform: translateX(-140%);
          animation: tst-shine 7s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes tst-shine {
          0%, 68% { transform: translateX(-140%); }
          100% { transform: translateX(140%); }
        }
        .tst__quote-icon {
          position: absolute;
          top: 20px; left: 32px;
          font-family: Georgia, serif;
          font-size: 8rem;
          line-height: 1;
          color: rgba(37,99,235,0.15);
          user-select: none;
        }
        .tst__quote {
          font-family: var(--font-heading);
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          font-weight: 500;
          line-height: 1.6;
          color: var(--color-white);
          position: relative;
          z-index: 1;
          flex: 1;
        }
        .tst__author { display: flex; align-items: center; gap: 16px; }
        .tst__avatar {
          width: 48px; height: 48px;
          border-radius: 50%;
          background: var(--gradient-brand);
          border: 2px solid rgba(180, 220, 255, .38);
          box-shadow: 0 0 24px rgba(74, 157, 255, .28);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.1rem;
          flex-shrink: 0;
        }
        .tst__name { font-family: var(--font-heading); font-weight: 700; font-size: 0.95rem; }
        .tst__role { font-size: 0.8rem; color: var(--color-muted); margin-top: 2px; }

        .tst__controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: 18px;
        }
        .tst__arrow {
          width: 44px; height: 44px;
          background: var(--color-glass);
          border: 1px solid var(--color-border);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: var(--color-white);
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .tst__arrow:hover {
          background: var(--color-glass-hover);
          border-color: rgba(37,99,235,0.3);
          transform: scale(1.1);
        }
        .tst__dots { display: flex; gap: 8px; }
        .tst__dot {
          width: 8px; height: 8px;
          border-radius: var(--radius-full);
          background: var(--color-border);
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }
        .tst__dot.active {
          background: var(--color-blue);
          width: 28px;
        }

        @media (max-width: 768px) {
          .tst { padding-top: 48px; padding-bottom: 48px; }
          .tst__header { margin-bottom: 24px; }
          .tst__main { padding: 36px 28px 28px; }
          .tst__side-label { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tst__main::after,
          .tst__particle { animation: none; }
          .tst__main { transform: none !important; }
        }
      `}</style>
    </section>
  );
}
