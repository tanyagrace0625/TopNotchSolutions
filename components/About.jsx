'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      const frame = section.querySelector('.about__image-frame');
      const image = section.querySelector('.about__image');
      const orb = section.querySelector('.about__orb');
      const grid = section.querySelector('.about__bg');
      const particles = gsap.utils.toArray('.about__particle');

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 72%',
          once: true,
        },
      })
        .from(grid, { opacity: 0, scale: 1.12, duration: 1.4, ease: 'power3.out' })
        .from('.about__label', { x: -24, opacity: 0, duration: 0.55, ease: 'back.out(2)' }, '-=1.05')
        .from('.about__index', { y: 16, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.45')
        .from('.about__title-line', {
          y: 70,
          opacity: 0,
          rotate: 3,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power4.out',
        }, '-=0.25')
        .from('.about__divider', { scaleX: 0, transformOrigin: 'left center', duration: 0.65, ease: 'power2.out' }, '-=0.35')
        .from('.about__copy:not(.about__focus-line)', { y: 24, opacity: 0, duration: 0.65, stagger: 0.08, ease: 'power2.out' }, '-=0.45')
        .fromTo('.about__focus-line',
          { autoAlpha: 0, x: -30 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.7,
            ease: 'power3.out',
            clearProps: 'transform',
          },
          '-=0.35'
        )
        .from(frame, {
          x: -80,
          y: 35,
          rotate: 4,
          scale: 0.92,
          clipPath: 'inset(12% 0 12% 100%)',
          duration: 1.1,
          ease: 'power4.out',
        }, '-=0.85')
        .from('.about__image-kicker', { y: -12, opacity: 0, duration: 0.45 }, '-=0.35')
        .from('.about__status', { x: 28, opacity: 0, duration: 0.55, ease: 'back.out(1.7)' }, '-=0.25');

      gsap.from(particles, {
        scale: 0,
        opacity: 0,
        duration: gsap.utils.random(1, 2),
        stagger: { amount: 1, from: 'random' },
        ease: 'back.out(2)',
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      });

      particles.forEach((particle, index) => {
        gsap.to(particle, {
          y: gsap.utils.random(-24, 24),
          x: gsap.utils.random(-18, 18),
          opacity: gsap.utils.random(0.25, 0.8),
          duration: gsap.utils.random(2.8, 5),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.12,
        });
      });

      gsap.to(image, {
        yPercent: 7,
        scale: 1.09,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      gsap.to(orb, {
        yPercent: -35,
        xPercent: 18,
        scale: 1.18,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.to('.about__beam', {
        xPercent: 190,
        opacity: 0.9,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.about__text', {
        yPercent: -4,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.6,
        },
      });

      gsap.to('.about__ring', {
        rotate: 360,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
    }, section);

    const onMouseMove = (event) => {
      if (prefersReducedMotion || !ref.current) return;
      const frame = ref.current.querySelector('.about__image-frame');
      const glow = ref.current.querySelector('.about__cursor-glow');
      const bounds = frame?.getBoundingClientRect();
      if (!bounds || !frame || !glow) return;

      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const rotateY = ((x / bounds.width) - 0.5) * 8;
      const rotateX = ((y / bounds.height) - 0.5) * -8;

      gsap.to(frame, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        duration: 0.7,
        ease: 'power3.out',
      });
      gsap.to(glow, { x, y, opacity: 1, duration: 0.45, ease: 'power2.out' });
    };

    const onMouseLeave = () => {
      if (prefersReducedMotion || !ref.current) return;
      const frame = ref.current.querySelector('.about__image-frame');
      const glow = ref.current.querySelector('.about__cursor-glow');
      gsap.to(frame, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' });
      gsap.to(glow, { opacity: 0, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    ref.current.addEventListener('mouseleave', onMouseLeave);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', onMouseMove);
      ref.current?.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section id="about" className="about section-padding" ref={ref}>
      {/* Background */}
      <div className="about__bg bg-grid"/>
      <div className="about__orb"/>
      <div className="about__beam" aria-hidden="true"/>
      <div className="about__mesh" aria-hidden="true"/>
      {[0, 1, 2, 3, 4, 5, 6].map((particle) => (
        <span key={particle} className={`about__particle about__particle--${particle}`} aria-hidden="true"/>
      ))}

      <div className="container">
        <div className="about__grid">
          {/* Left: Team image */}
          <div className="about__visual">
            <div className="about__image-frame">
              <div className="about__image-kicker">Top-Notch Solutions / Inside the work</div>
              <Image
                src="/about-us-team.png"
                alt="Top-Notch Solutions team collaborating around a table"
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="about__image"
              />
              <div className="about__image-overlay" />
              <div className="about__cursor-glow" />
              <div className="about__image-note">01 / Team in motion</div>
            </div>
            <div className="about__status">
              <span className="about__status-dot" />
              <span>One connected team</span>
            </div>
            <div className="about__ring" aria-hidden="true" />
          </div>

          {/* Right: Text */}
          <div className="about__text">
            <div className="about__label-row">
              <div className="section-label about__label">About Us</div>
              <span className="about__index">01 — Who we are</span>
            </div>
            <h2 className="text-h1 about__title">
              <span className="about__title-line">One Team.</span>
              <span className="about__title-line">Multiple Solutions.</span>
              <span className="text-gradient about__title-line about__title-accent">All on Point.</span>
            </h2>
            <div className="divider about__divider"/>
            <p className="text-large text-muted about__copy">
              <span className="about__word-highlight">Top-Notch Solutions</span> is a digital services company helping businesses build their online presence, strengthen their brand, and attract more customers.
            </p>
            <p className="about__body about__copy">
              We bring together <span>content strategy</span>, <span>creative design</span>, <span>website development</span>, and <span>lead generation</span> under one team — giving businesses a simpler, more connected way to manage their digital needs.
            </p>
            <div className="about__focus-line">
              <span className="about__focus-number">01</span>
              <p><strong>Our focus is simple.</strong> Thoughtful strategies, quality execution, and solutions built around your business goals.</p>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .about {
          position: relative;
          background: var(--color-surface);
          overflow: hidden;
          isolation: isolate;
        }
        .about::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -2;
          background:
            radial-gradient(circle at 12% 38%, rgba(37,99,235,.16), transparent 24%),
            radial-gradient(circle at 88% 72%, rgba(6,182,212,.10), transparent 18%),
            linear-gradient(135deg, rgba(10,15,44,.96), rgba(13,17,23,.98));
        }
        .about__bg { position: absolute; inset: 0; opacity: 0.34; mask-image: linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%); }
        .about__orb {
          position: absolute;
          width: 600px; height: 600px;
          top: -20%; right: -10%;
          background: radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .about__mesh {
          position: absolute;
          inset: 0;
          opacity: .28;
          pointer-events: none;
          background-image:
            linear-gradient(115deg, transparent 0 49.8%, rgba(143,214,255,.08) 50%, transparent 50.2%),
            linear-gradient(65deg, transparent 0 49.8%, rgba(143,214,255,.05) 50%, transparent 50.2%);
          background-size: 130px 130px;
          mask-image: radial-gradient(circle at 20% 50%, black 0%, transparent 64%);
        }
        .about__beam {
          position: absolute;
          z-index: 0;
          left: -35%;
          top: 18%;
          width: 28%;
          height: 1px;
          opacity: .45;
          transform-origin: left center;
          transform: rotate(-16deg);
          background: linear-gradient(90deg, transparent, rgba(87,196,255,.9), transparent);
          box-shadow: 0 0 18px rgba(87,196,255,.5);
          pointer-events: none;
        }
        .about__particle {
          position: absolute;
          z-index: 0;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--color-cyan);
          box-shadow: 0 0 14px rgba(6,182,212,.9);
          pointer-events: none;
        }
        .about__particle--0 { left: 5%; top: 18%; }
        .about__particle--1 { left: 11%; top: 72%; width: 7px; height: 7px; }
        .about__particle--2 { left: 42%; top: 12%; }
        .about__particle--3 { left: 48%; top: 82%; width: 6px; height: 6px; }
        .about__particle--4 { right: 6%; top: 24%; }
        .about__particle--5 { right: 13%; bottom: 11%; width: 7px; height: 7px; }
        .about__particle--6 { right: 40%; top: 68%; width: 3px; height: 3px; }
        .about__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .about__text { display: flex; flex-direction: column; gap: 18px; position: relative; z-index: 3; }
        .about__label-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .about__index { color: rgba(217,236,255,.48); font: .64rem var(--font-accent); letter-spacing: .14em; text-transform: uppercase; }
        .about__title { line-height: .98; letter-spacing: -.045em; }
        .about__body { color: var(--color-muted); line-height: 1.75; font-size: 1rem; }
        .about__body span { color: #cbdcf4; font-weight: 600; }
        .about__ctas { display: flex; gap: 16px; flex-wrap: wrap; margin-top: 8px; }
        .about__label { width: fit-content; }
        .about__title-line { display: block; overflow: hidden; padding-bottom: .07em; }
        .about__title-accent { position: relative; width: fit-content; filter: drop-shadow(0 12px 28px rgba(37,99,235,.18)); }
        .about__title-accent::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: .04em;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, var(--color-blue), var(--color-cyan), transparent);
          transform-origin: left center;
        }
        .about__divider { transform-origin: left center; }
        .about__word-highlight {
          color: var(--color-white);
          font-weight: 800;
          background: linear-gradient(180deg, transparent 62%, rgba(37,99,235,.28) 62%);
        }
        .about__focus-line {
          display: grid;
          grid-template-columns: 46px 1fr;
          gap: 14px;
          align-items: center;
          margin-top: 5px;
          padding: 16px 18px;
          opacity: 1;
          visibility: visible;
          border-left: 2px solid var(--color-cyan);
          background: linear-gradient(90deg, rgba(6,182,212,.09), transparent);
        }
        .about__focus-line p { color: var(--color-muted); line-height: 1.65; font-size: .92rem; }
        .about__focus-line strong { color: var(--color-white); }
        .about__focus-number {
          display: grid;
          place-items: center;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: 1px solid rgba(143,214,255,.25);
          color: var(--color-gold-light);
          font: 700 .75rem var(--font-accent);
          box-shadow: inset 0 0 20px rgba(37,99,235,.12), 0 0 24px rgba(37,99,235,.08);
        }

        .about__visual { position: relative; min-height: 580px; }
        .about__image-frame { position: absolute; inset: -40px 0 0 0; min-height: 580px; overflow: hidden; border: 1px solid rgba(143, 214, 255, .25); background: #0a1833; box-shadow: 0 28px 90px rgba(0,0,0,.35); transform-style: preserve-3d; will-change: transform; }
        .about__image-frame::before {
          content: '';
          position: absolute;
          z-index: 3;
          inset: 12px;
          border: 1px solid rgba(255,255,255,.09);
          pointer-events: none;
        }
        .about__image-frame::after {
          content: '';
          position: absolute;
          z-index: 3;
          width: 80px;
          height: 80px;
          left: 12px;
          top: 12px;
          border-left: 2px solid var(--color-cyan);
          border-top: 2px solid var(--color-cyan);
          opacity: .85;
          pointer-events: none;
        }
        .about__image { object-fit: cover; object-position: center; filter: saturate(.86) contrast(1.04); will-change: transform; }
        .about__image-overlay { position: absolute; inset: 0; z-index: 1; background: linear-gradient(180deg, rgba(5,11,29,.04), rgba(5,11,29,.62)), linear-gradient(90deg, rgba(5,11,29,.2), transparent 45%); pointer-events: none; }
        .about__cursor-glow {
          position: absolute;
          z-index: 2;
          left: 0;
          top: 0;
          width: 220px;
          height: 220px;
          margin-left: -110px;
          margin-top: -110px;
          border-radius: 50%;
          opacity: 0;
          pointer-events: none;
          background: radial-gradient(circle, rgba(87, 196, 255, .22) 0%, rgba(37, 99, 235, .08) 38%, transparent 72%);
          mix-blend-mode: screen;
        }
        .about__image-kicker, .about__image-note { position: absolute; z-index: 2; color: #d9ecff; font: .63rem var(--font-accent); letter-spacing: .16em; text-transform: uppercase; }
        .about__image-kicker { top: 22px; left: 24px; }
        .about__image-note { right: 22px; bottom: 22px; color: var(--color-gold-light); writing-mode: vertical-rl; transform: rotate(180deg); }
        .about__status {
          position: absolute;
          z-index: 4;
          left: -24px;
          bottom: 34px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border: 1px solid rgba(143, 214, 255, .22);
          border-radius: var(--radius-full);
          background: rgba(8, 18, 42, .88);
          box-shadow: 0 16px 40px rgba(0, 0, 0, .28);
          backdrop-filter: blur(14px);
          color: #d9ecff;
          font: 600 .72rem var(--font-accent);
          letter-spacing: .06em;
        }
        .about__status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-cyan);
          box-shadow: 0 0 0 4px rgba(6, 182, 212, .12), 0 0 18px rgba(6, 182, 212, .8);
          animation: aboutPulse 2s ease-in-out infinite;
        }
        @keyframes aboutPulse {
          50% { box-shadow: 0 0 0 7px rgba(6, 182, 212, .04), 0 0 24px rgba(6, 182, 212, .95); }
        }
        .about__hero-card { padding: 36px; position: relative; overflow: hidden; }
        .about__hero-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(6,182,212,0.04));
        }
        .about__quote-mark {
          font-family: Georgia, serif;
          font-size: 6rem;
          line-height: 0.7;
          color: rgba(37,99,235,0.3);
          position: absolute;
          top: 20px; left: 24px;
        }
        .about__quote {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          line-height: 1.3;
          position: relative;
          z-index: 1;
          padding-top: 24px;
        }
        .about__quote-author {
          display: flex; align-items: center; gap: 8px;
          margin-top: 16px;
          font-size: 0.78rem;
          color: var(--color-muted);
          font-family: var(--font-accent);
          position: relative; z-index: 1;
        }
        .about__author-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--color-cyan);
        }

        .about__supporting-card { padding: 24px; }
        .about__sc-title { font-weight: 700; font-size: 0.9rem; margin-bottom: 16px; font-family: var(--font-heading); }
        .about__sc-flow { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .about__sc-step { display: flex; align-items: center; gap: 8px; }
        .about__sc-num {
          width: 26px; height: 26px;
          background: var(--gradient-brand);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.72rem; font-weight: 700;
          flex-shrink: 0;
        }
        .about__sc-step span { font-size: 0.78rem; font-weight: 500; white-space: nowrap; }
        .about__sc-arrow { color: var(--color-muted); font-size: 0.8rem; }

        .about__social-card { padding: 16px 20px; }
        .about__social-icon {
          width: 36px; height: 36px;
          background: var(--color-glass);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          color: var(--color-muted);
          text-decoration: none;
          transition: var(--transition-fast);
        }
        .about__social-icon:hover { color: var(--color-cyan); border-color: rgba(6,182,212,0.3); }

        .about__ring {
          position: absolute;
          width: 300px; height: 300px;
          top: -80px; right: -80px;
          border: 1px dashed rgba(37,99,235,0.15);
          border-radius: 50%;
          pointer-events: none;
        }

        @media (max-width: 1024px) {
          .about__grid { grid-template-columns: 1fr; gap: 48px; }
          .about__visual { min-height: 520px; }
          .about__image-frame { inset: 0; min-height: 520px; }
          .about__status { left: 18px; bottom: 18px; }
        }
        @media (max-width: 600px) {
          .about__visual, .about__image-frame { min-height: 420px; }
          .about__image-kicker { top: 16px; left: 16px; max-width: 220px; line-height: 1.6; }
          .about__ring { width: 220px; height: 220px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .about__status-dot { animation: none; }
        }
      `}</style>
    </section>
  );
}
