'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PRINCIPLES = [
  {
    eyebrow: 'Where we are going',
    title: 'Our Vision',
    text: 'To become a trusted digital solutions partner for businesses worldwide, empowering growth through creativity, innovation, and strategic execution.',
    accent: '#2563EB',
  },
  {
    eyebrow: 'What guides our work',
    title: 'Our Mission',
    text: 'To help businesses build their brands, strengthen their online presence, and reach their growth goals through quality digital services delivered by one dedicated team.',
    accent: '#06B6D4',
  },
];

export default function WhyUs() {
  const ref = useRef(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups = [];
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('.why__reveal, .why__card', { clearProps: 'all', opacity: 1, y: 0, x: 0 });
        return;
      }

      gsap.set('.why__card', { transformPerspective: 1100, transformStyle: 'preserve-3d' });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 72%',
          once: true,
        },
      });

      timeline
        .from('.why__label', { y: 14, opacity: 0, duration: 0.45, ease: 'power3.out' })
        .from('.why__title-line', { y: 38, opacity: 0, rotateX: -10, duration: 0.75, stagger: 0.08, ease: 'power4.out' }, '-=0.15')
        .from('.why__card-icon', {
          scale: 0.4,
          opacity: 0,
          rotate: -20,
          duration: 0.65,
          stagger: 0.16,
          ease: 'back.out(2)',
        }, '-=0.7');

      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
        .fromTo('.why__card--left', {
          xPercent: -115,
          yPercent: 4,
          rotateY: -10,
          rotateX: 3,
          scale: 0.94,
          opacity: 0.15,
          filter: 'blur(8px)',
        }, {
          xPercent: 0,
          yPercent: 0,
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.28,
        }, 0)
        .fromTo('.why__card--right', {
          xPercent: 115,
          yPercent: 4,
          rotateY: 10,
          rotateX: 3,
          scale: 0.94,
          opacity: 0.15,
          filter: 'blur(8px)',
        }, {
          xPercent: 0,
          yPercent: 0,
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.28,
        }, 0)
        .to('.why__card--left', {
          xPercent: -135,
          yPercent: 14,
          rotateY: -14,
          rotateX: -5,
          scale: 0.88,
          opacity: 0,
          filter: 'blur(9px)',
          duration: 0.22,
        }, 0.78)
        .to('.why__card--right', {
          xPercent: 135,
          yPercent: 14,
          rotateY: 14,
          rotateX: -5,
          scale: 0.88,
          opacity: 0,
          filter: 'blur(9px)',
          duration: 0.22,
        }, 0.78);

      gsap.to('.why__orb--one', {
        xPercent: 38,
        yPercent: 24,
        scale: 1.18,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.6 },
      });
      gsap.to('.why__orb--two', {
        xPercent: -32,
        yPercent: -24,
        scale: 0.85,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.6 },
      });
      gsap.to('.why__ring', {
        rotate: 180,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
      });
      gsap.to('.why__grid-plane', {
        yPercent: 22,
        rotateX: 4,
        scale: 1.08,
        transformOrigin: 'center bottom',
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.3 },
      });
      gsap.to('.why__beam--one', {
        xPercent: 180,
        rotate: 12,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      });
      gsap.to('.why__beam--two', {
        xPercent: -180,
        rotate: -12,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      });
      gsap.to('.why__particle', {
        y: 'random(-70,70)',
        x: 'random(-45,45)',
        opacity: 'random(.18,.8)',
        duration: 'random(3,6)',
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.12, from: 'random' },
        ease: 'sine.inOut',
      });
      gsap.to('.why__card--left .why__card-copy', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.4 },
      });
      gsap.to('.why__card--right .why__card-copy', {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.4 },
      });

      section.querySelectorAll('.why__card').forEach((card) => {
        const onMove = (event) => {
          const bounds = card.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width;
          const y = (event.clientY - bounds.top) / bounds.height;
          card.style.setProperty('--pointer-x', `${x * 100}%`);
          card.style.setProperty('--pointer-y', `${y * 100}%`);
          gsap.to(card, {
            rotateX: (y - 0.5) * -7,
            rotateY: (x - 0.5) * 9,
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
            duration: 0.85,
            ease: 'elastic.out(1, 0.48)',
          });
        };
        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          card.removeEventListener('mousemove', onMove);
          card.removeEventListener('mouseleave', onLeave);
        });
      });
    }, section);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return (
    <section id="why-us" className="why section-padding" ref={ref}>
      <div className="why__grid-bg bg-grid" aria-hidden="true"/>
      <div className="why__grid-plane" aria-hidden="true"/>
      <div className="why__scanline" aria-hidden="true"/>
      <div className="why__orb why__orb--one" aria-hidden="true"/>
      <div className="why__orb why__orb--two" aria-hidden="true"/>
      <div className="why__ring why__ring--one" aria-hidden="true"/>
      <div className="why__ring why__ring--two" aria-hidden="true"/>
      <div className="why__beam why__beam--one" aria-hidden="true"/>
      <div className="why__beam why__beam--two" aria-hidden="true"/>
      <div className="why__particles" aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => (
          <span
            key={index}
            className="why__particle"
            style={{
              left: `${8 + ((index * 31) % 84)}%`,
              top: `${12 + ((index * 47) % 76)}%`,
              width: 2 + (index % 3),
              height: 2 + (index % 3),
            }}
          />
        ))}
      </div>

      <div className="container">
        <div className="why__header text-center">
          <div className="section-label why__label why__reveal">The Direction Behind Our Work</div>
          <h2 className="text-h1 why__title">
            <span className="why__title-line">Purpose That Shapes</span>
            <span className="why__title-line text-gradient">Every Solution.</span>
          </h2>
        </div>

        <div className="why__cards">
          {PRINCIPLES.map((principle, index) => (
            <article
              key={principle.title}
              className={`why__card why__card--${index === 0 ? 'left' : 'right'} glass-card`}
              style={{ '--principle-accent': principle.accent }}
            >
              <div className="why__card-glow" aria-hidden="true"/>
              <div className="why__card-shine" aria-hidden="true"/>
              <div className="why__card-icon" aria-hidden="true">
                {index === 0 ? (
                  <svg viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="23"/>
                    <circle cx="32" cy="32" r="15"/>
                    <path d="M32 9v46M9 32h46"/>
                    <path className="why__card-icon-arrow" d="M38 26l-3.5 11.5L23 41l3.5-11.5L38 26z"/>
                    <circle cx="32" cy="32" r="2.5"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="23"/>
                    <circle cx="32" cy="32" r="14"/>
                    <circle cx="32" cy="32" r="5"/>
                    <path d="M32 32l18-18"/>
                    <path d="M44 14h8v8"/>
                  </svg>
                )}
              </div>
              <div className="why__card-copy">
                <p className="why__card-eyebrow">{principle.eyebrow}</p>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </div>
              <div className="why__card-line" aria-hidden="true"/>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .why {
          position: relative;
          background: var(--color-surface);
          overflow: hidden;
          isolation: isolate;
        }
        .why__grid-bg { position: absolute; inset: 0; opacity: .22; mask-image: linear-gradient(to bottom, transparent, black 18%, black 82%, transparent); }
        .why__grid-plane {
          position: absolute;
          left: -15%;
          right: -15%;
          bottom: -32%;
          height: 65%;
          opacity: .13;
          transform-origin: center bottom;
          transform: perspective(700px) rotateX(62deg);
          background-image:
            linear-gradient(rgba(112,194,255,.42) 1px, transparent 1px),
            linear-gradient(90deg, rgba(112,194,255,.42) 1px, transparent 1px);
          background-size: 54px 54px;
          mask-image: linear-gradient(to top, black 10%, transparent 80%);
          pointer-events: none;
        }
        .why__scanline {
          position: absolute;
          z-index: 1;
          left: 0;
          right: 0;
          top: -20%;
          height: 1px;
          opacity: .5;
          background: linear-gradient(90deg, transparent 4%, rgba(112,214,255,.8) 50%, transparent 96%);
          box-shadow: 0 0 24px rgba(87,196,255,.8), 0 0 80px rgba(37,99,235,.3);
          animation: whyScan 9s linear infinite;
          pointer-events: none;
        }
        @keyframes whyScan {
          from { transform: translateY(0); }
          to { transform: translateY(1050px); }
        }
        .why__orb {
          position: absolute;
          width: 520px;
          height: 520px;
          border-radius: 50%;
          filter: blur(110px);
          pointer-events: none;
          opacity: .28;
        }
        .why__orb--one { left: -280px; top: 15%; background: rgba(37,99,235,.32); }
        .why__orb--two { right: -260px; bottom: 0; background: rgba(6,182,212,.22); }
        .why__ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(112,194,255,.13);
          pointer-events: none;
        }
        .why__ring--one { width: 620px; height: 620px; left: -390px; top: 34%; }
        .why__ring--two { width: 440px; height: 440px; right: -250px; top: 8%; }
        .why__beam {
          position: absolute;
          z-index: 1;
          width: 38%;
          height: 1px;
          opacity: .16;
          pointer-events: none;
          background: linear-gradient(90deg, transparent, rgba(112,214,255,.9), transparent);
          box-shadow: 0 0 18px rgba(87,196,255,.5);
        }
        .why__beam--one { left: -25%; top: 28%; transform: rotate(10deg); }
        .why__beam--two { right: -25%; bottom: 22%; transform: rotate(-8deg); }
        .why__particles { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
        .why__particle {
          position: absolute;
          border-radius: 50%;
          opacity: .35;
          background: rgba(143,214,255,.85);
          box-shadow: 0 0 12px rgba(87,196,255,.8);
        }
        .why__header { position: relative; z-index: 2; max-width: 760px; margin: 0 auto 56px; }
        .why__label { margin-bottom: 18px; }
        .why__title { line-height: 1.08; }
        .why__title-line { display: block; }
        .why__cards {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
        }
        .why__card {
          min-height: 390px;
          padding: 44px;
          position: relative;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          opacity: 1;
          background:
            linear-gradient(145deg, rgba(18,38,76,.82), rgba(7,16,35,.78));
          border-color: rgba(137,196,255,.16);
          border-radius: var(--radius-lg);
          cursor: default;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .why__card::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          background: radial-gradient(circle at var(--pointer-x, 50%) var(--pointer-y, 50%), color-mix(in srgb, var(--principle-accent) 20%, transparent), transparent 35%);
          transition: opacity .35s ease;
        }
        .why__card:hover::before { opacity: 1; }
        .why__card-glow {
          position: absolute;
          width: 250px;
          height: 250px;
          right: -90px;
          top: -110px;
          border-radius: 50%;
          background: var(--principle-accent);
          filter: blur(90px);
          opacity: .12;
        }
        .why__card-shine {
          position: absolute;
          width: 170px;
          height: 600px;
          left: -300px;
          top: -120px;
          transform: rotate(18deg);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.11), transparent);
          transition: left .8s cubic-bezier(.2,.8,.2,1);
        }
        .why__card:hover .why__card-shine { left: 115%; }
        .why__card-icon {
          position: absolute;
          right: 34px;
          top: 22px;
          width: 88px;
          height: 88px;
          display: grid;
          place-items: center;
          color: var(--principle-accent);
          border: 1px solid color-mix(in srgb, var(--principle-accent) 28%, transparent);
          border-radius: 50%;
          background: color-mix(in srgb, var(--principle-accent) 7%, transparent);
          box-shadow: 0 0 32px color-mix(in srgb, var(--principle-accent) 12%, transparent);
          opacity: .72;
          transition: transform .55s cubic-bezier(.2,.8,.2,1), opacity .35s ease;
        }
        .why__card-icon svg { width: 58px; height: 58px; stroke: currentColor; stroke-width: 1.5; }
        .why__card-icon svg circle:nth-of-type(2) { opacity: .7; }
        .why__card-icon-arrow { fill: color-mix(in srgb, var(--principle-accent) 16%, transparent); }
        .why__card:hover .why__card-icon { transform: rotate(8deg) scale(1.08); opacity: 1; }
        .why__card-copy { position: relative; z-index: 2; max-width: 520px; }
        .why__card-eyebrow {
          color: var(--principle-accent);
          font-family: var(--font-accent);
          font-size: .75rem;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .why__card h3 {
          font-size: clamp(2rem, 4vw, 3.25rem);
          margin-bottom: 18px;
        }
        .why__card-copy > p:last-child {
          color: var(--color-muted);
          font-size: clamp(.95rem, 1.4vw, 1.08rem);
          line-height: 1.75;
        }
        .why__card-line {
          position: absolute;
          left: 44px;
          right: 44px;
          bottom: 0;
          height: 3px;
          transform: scaleX(.12);
          transform-origin: left;
          background: var(--principle-accent);
          box-shadow: 0 0 24px var(--principle-accent);
          transition: transform .55s cubic-bezier(.2,.8,.2,1);
        }
        .why__card:hover .why__card-line { transform: scaleX(1); }
        @media (max-width: 900px) {
          .why__cards { grid-template-columns: 1fr; }
          .why__card { min-height: 330px; }
        }
        @media (max-width: 600px) {
          .why__header { margin-bottom: 40px; }
          .why__card { min-height: 350px; padding: 32px 26px; }
          .why__card-line { left: 26px; right: 26px; }
          .why__card-icon { right: 22px; width: 72px; height: 72px; }
          .why__card-icon svg { width: 48px; height: 48px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .why__card-shine { display: none; }
          .why__scanline { display: none; }
        }
      `}</style>
    </section>
  );
}
