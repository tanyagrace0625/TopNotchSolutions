'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PARTICLES = Array.from({ length: 42 }, (_, index) => ({
  id: index,
  x: ((index * 47) % 100) + ((index % 5) * 0.7),
  y: ((index * 31 + 7) % 100),
  size: 1 + (index % 4),
  delay: (index % 9) * 0.18,
  color: index % 3 === 0 ? '#FCD34D' : index % 3 === 1 ? '#57C4FF' : '#2563EB',
}));

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const context = gsap.context(() => {
      if (reducedMotion) return;

      const entrance = gsap.timeline({ defaults: { ease: 'power4.out' } });

      entrance
        .from('.hero__eyebrow', {
          y: -24,
          opacity: 0,
          scale: 0.92,
          duration: 0.75,
        })
        .from('.hero__title-line', {
          yPercent: 115,
          rotateX: -38,
          opacity: 0,
          transformOrigin: 'left bottom',
          duration: 1,
          stagger: 0.12,
        }, '-=0.3')
        .from('.hero__sub', {
          x: -32,
          opacity: 0,
          filter: 'blur(8px)',
          duration: 0.75,
        }, '-=0.58')
        .from('.hero__ctas', {
          y: 24,
          opacity: 0,
          duration: 0.65,
        }, '-=0.48')
        .from('.hero__proof-item', {
          y: 18,
          opacity: 0,
          scale: 0.8,
          stagger: 0.09,
          duration: 0.55,
          ease: 'back.out(1.8)',
        }, '-=0.35')
        .from('.hero__visual', {
          x: 90,
          rotateY: -12,
          opacity: 0,
          scale: 0.88,
          duration: 1.15,
          ease: 'power4.out',
        }, '-=0.95');

      gsap.from('.hero__sub-word', {
        y: 14,
        rotateX: 35,
        opacity: 0,
        filter: 'blur(5px)',
        stagger: 0.018,
        duration: 0.72,
        delay: 0.65,
        ease: 'power3.out',
      });

      gsap.to('.hero__aurora--blue', {
        xPercent: 32,
        yPercent: 18,
        scale: 1.18,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.hero__aurora--cyan', {
        xPercent: -38,
        yPercent: -12,
        scale: 1.25,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.hero__particle', {
        y: 'random(-35,35)',
        x: 'random(-18,18)',
        opacity: 'random(0.25,0.8)',
        duration: 'random(3,7)',
        repeat: -1,
        yoyo: true,
        stagger: { amount: 1.5, from: 'random' },
        ease: 'sine.inOut',
      });
      gsap.to('.hero__orbit-ring--one', { rotate: 360, duration: 24, repeat: -1, ease: 'none' });
      gsap.to('.hero__orbit-ring--two', { rotate: -360, duration: 17, repeat: -1, ease: 'none' });
      gsap.to('.hero__orbit-ring--three', { rotate: 360, duration: 31, repeat: -1, ease: 'none' });

      gsap.to('.hero__bg', {
        yPercent: 18,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
      gsap.to('.hero__depth-grid', {
        yPercent: 38,
        rotateX: 52,
        scale: 1.12,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.4,
        },
      });
      gsap.to('.hero__inner', {
        yPercent: 22,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
      gsap.to('.hero__visual', {
        yPercent: 12,
        scale: 0.94,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.1,
        },
      });
      gsap.to('.hero__horizon', {
        yPercent: 120,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      gsap.utils.toArray('.hero__proof-num').forEach((counter) => {
        const value = counter.dataset.value;
        if (!value) return;
        const state = { value: 0 };
        gsap.to(state, {
          value: Number(value),
          duration: 1.8,
          delay: 0.8,
          snap: { value: 1 },
          ease: 'power3.out',
          onUpdate: () => {
            counter.textContent = `${Math.round(state.value)}${counter.dataset.suffix || ''}`;
          },
        });
      });

      gsap.to('.hero__title-line', {
        backgroundPosition: '200% center',
        duration: 4.5,
        repeat: -1,
        ease: 'sine.inOut',
      });

      gsap.utils.toArray('.hero__proof-item').forEach((card, index) => {
        gsap.to(card, {
          y: index % 2 === 0 ? -7 : 7,
          duration: 1.8 + index * 0.35,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      gsap.to('.hero__mini-card--1', { y: -12, rotation: -2, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.hero__mini-card--2', { y: 10, rotation: 2, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.25 });
      gsap.to('.hero__mini-card--3', { y: -8, rotation: 1.5, duration: 3.1, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5 });

      const proofItems = gsap.utils.toArray('.hero__proof-item');
      const showcase = gsap.timeline({ repeat: -1, repeatDelay: 0.65 });
      proofItems.forEach((item, index) => {
        showcase.call(() => {
          proofItems.forEach((card) => card.classList.remove('hero__proof-item--active'));
          item.classList.add('hero__proof-item--active');
        }, [], index * 1.35);
      });
    }, hero);

    const handleMove = (event) => {
      if (reducedMotion) return;
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      gsap.utils.toArray('.hero__proof-item').forEach((card) => {
        const cardBounds = card.getBoundingClientRect();
        const localX = ((event.clientX - cardBounds.left) / cardBounds.width) * 100;
        const localY = ((event.clientY - cardBounds.top) / cardBounds.height) * 100;
        card.style.setProperty('--spot-x', `${localX}%`);
        card.style.setProperty('--spot-y', `${localY}%`);
      });
      gsap.to('.hero__cursor-glow', {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
        opacity: 1,
        duration: 0.55,
        ease: 'power3.out',
      });
      gsap.to('.hero__main-card', {
        rotateX: y * -12,
        rotateY: x * 14,
        x: x * 12,
        y: y * 8,
        transformPerspective: 900,
        duration: 0.7,
        ease: 'power3.out',
      });
      gsap.to('.hero__mini-card--1', { x: x * -22, y: y * -18, duration: 0.9, ease: 'power2.out' });
      gsap.to('.hero__mini-card--2', { x: x * 26, y: y * -12, duration: 0.9, ease: 'power2.out' });
      gsap.to('.hero__mini-card--3', { x: x * 18, y: y * 20, duration: 0.9, ease: 'power2.out' });
      gsap.to('.hero__orb', { xPercent: x * 12, yPercent: y * 10, duration: 1, ease: 'power2.out' });
    };

    const handleLeave = () => {
      if (reducedMotion) return;
      gsap.to('.hero__cursor-glow', { opacity: 0, duration: 0.35 });
      gsap.to('.hero__main-card', { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.55)' });
      gsap.to('.hero__mini-card', { x: 0, y: 0, duration: 0.8, ease: 'power3.out' });
      gsap.to('.hero__orb', { xPercent: 0, yPercent: 0, duration: 0.8, ease: 'power3.out' });
    };

    const magneticButtons = hero.querySelectorAll('.hero__ctas .btn');
    const cleanups = [];
    magneticButtons.forEach((button) => {
      const move = (event) => {
        if (reducedMotion) return;
        const bounds = button.getBoundingClientRect();
        const x = event.clientX - (bounds.left + bounds.width / 2);
        const y = event.clientY - (bounds.top + bounds.height / 2);
        gsap.to(button, { x: x * 0.18, y: y * 0.22, duration: 0.45, ease: 'power3.out' });
      };
      const reset = () => gsap.to(button, { x: 0, y: 0, duration: 0.75, ease: 'elastic.out(1, 0.4)' });
      button.addEventListener('mousemove', move);
      button.addEventListener('mouseleave', reset);
      cleanups.push(() => {
        button.removeEventListener('mousemove', move);
        button.removeEventListener('mouseleave', reset);
      });
    });

    gsap.utils.toArray('.hero__proof-item').forEach((card) => {
      const tilt = (event) => {
        if (reducedMotion) return;
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        gsap.to(card, {
          rotateX: y * -9,
          rotateY: x * 11,
          z: 18,
          transformPerspective: 700,
          duration: 0.45,
          ease: 'power2.out',
        });
      };
      const resetCard = () => gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        z: 0,
        duration: 0.75,
        ease: 'elastic.out(1, 0.5)',
      });
      card.addEventListener('mousemove', tilt);
      card.addEventListener('mouseleave', resetCard);
      cleanups.push(() => {
        card.removeEventListener('mousemove', tilt);
        card.removeEventListener('mouseleave', resetCard);
      });
    });

    hero.addEventListener('mousemove', handleMove, { passive: true });
    hero.addEventListener('mouseleave', handleLeave);

    return () => {
      hero.removeEventListener('mousemove', handleMove);
      hero.removeEventListener('mouseleave', handleLeave);
      cleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, []);

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__aurora hero__aurora--blue"/>
        <div className="hero__aurora hero__aurora--cyan"/>
        <div className="hero__depth-grid"/>
        <div className="hero__orb hero__orb--blue"/>
        <div className="hero__orb hero__orb--cyan"/>
        <div className="hero__orb hero__orb--gold"/>
      </div>

      <div className="hero__horizon" aria-hidden="true"/>
      <div className="hero__cursor-glow" aria-hidden="true"/>
      <div className="hero__particles" aria-hidden="true">
        {PARTICLES.map((particle) => (
          <span
            key={particle.id}
            className="hero__particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              background: particle.color,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="hero__content container">
        <div className="hero__inner">
          <div className="hero__eyebrow">
            <span className="hero__eyebrow-dot"/>
            <span>Company Portfolio · 2026</span>
            <span className="hero__eyebrow-line"/>
          </div>

          <h1 className="hero__headline">
            <span className="hero__title-mask"><span className="hero__title-line">Your All-in-One</span></span>
            <span className="hero__title-mask"><span className="text-gradient hero__title-line">Digital Growth Partner.</span></span>
          </h1>

          <p className="hero__sub">
            <span className="hero__sub-word">Top-Notch</span>{' '}
            <span className="hero__sub-word">Solutions</span>{' '}
            <span className="hero__sub-word">helps</span>{' '}
            <span className="hero__sub-word">businesses</span>{' '}
            <span className="hero__sub-word">build</span>{' '}
            <span className="hero__sub-word">their</span>{' '}
            <span className="hero__sub-word">online</span>{' '}
            <span className="hero__sub-word">presence,</span>{' '}
            <span className="hero__sub-word">strengthen</span>{' '}
            <span className="hero__sub-word">their</span>{' '}
            <span className="hero__sub-word">brand,</span>{' '}
            <span className="hero__sub-word">and</span>{' '}
            <span className="hero__sub-word">attract</span>{' '}
            <span className="hero__sub-word">more</span>{' '}
            <span className="hero__sub-word">customers</span>{' '}
            <span className="hero__sub-word">through</span>{' '}
            <span className="hero__sub-word">one</span>{' '}
            <span className="hero__sub-word">connected</span>{' '}
            <span className="hero__sub-word">team.</span>
          </p>

          <div className="hero__ctas">
            <a href="#contact" className="btn btn-primary btn-lg" onClick={(event) => { event.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <span className="hero__btn-label">Work With Us</span>
              <span className="hero__btn-arrow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </a>
            <a href="#services" className="btn btn-outline btn-lg" onClick={(event) => { event.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <span className="hero__btn-label">Explore Services</span>
              <span className="hero__btn-orbit" aria-hidden="true"/>
            </a>
          </div>

          <div className="hero__proof">
            <div className="hero__proof-item">
              <span className="hero__proof-index">01</span>
              <span className="hero__proof-num" data-value="4">0</span>
              <span className="hero__proof-label">Core solutions</span>
            </div>
            <div className="hero__proof-item">
              <span className="hero__proof-index">02</span>
              <span className="hero__proof-num" data-value="1">0</span>
              <span className="hero__proof-label">Dedicated team</span>
            </div>
            <div className="hero__proof-item">
              <span className="hero__proof-index">03</span>
              <span className="hero__proof-num" data-value="360" data-suffix="°">0°</span>
              <span className="hero__proof-label">Digital support</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__orbit-ring hero__orbit-ring--one" aria-hidden="true"/>
          <div className="hero__orbit-ring hero__orbit-ring--two" aria-hidden="true"/>
          <div className="hero__orbit-ring hero__orbit-ring--three" aria-hidden="true"/>
          <div className="hero__card-stack">
            <div className="hero__main-card glass-card">
              <div className="hero__card-sheen"/>
              <div className="hero__card-status"><span/> Creative operations online</div>
              <img className="hero__card-logo" src="/logo.png" alt="TopNotch Solutions"/>
              <div className="hero__card-caption">
                <span>Digital growth partner</span>
                <span>TOP / 2026</span>
              </div>
            </div>

            <div className="hero__mini-card hero__mini-card--1 glass-card">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              <span>Coordinated Support</span>
            </div>
            <div className="hero__mini-card hero__mini-card--2 glass-card">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <span>One Client Manager</span>
            </div>
            <div className="hero__mini-card hero__mini-card--3 glass-card">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>Always On</span>
            </div>
          </div>
        </div>
      </div>

      <a className="hero__scroll" href="#stats" aria-label="Scroll to company statistics" onClick={(event) => { event.preventDefault(); document.querySelector('.stats')?.scrollIntoView({ behavior: 'smooth' }); }}>
        <span>Explore</span>
        <span className="hero__scroll-line"/>
      </a>
      <div className="hero__fade-bottom"/>

      <style>{`
        .hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          padding-top: var(--navbar-height);
          overflow: hidden;
          isolation: isolate;
          background: linear-gradient(135deg, #080d20 0%, #091a38 52%, #07111f 100%);
        }
        .hero__bg { position: absolute; inset: -12%; z-index: -3; overflow: hidden; }
        .hero__aurora {
          position: absolute;
          width: 58vw;
          height: 58vw;
          max-width: 780px;
          max-height: 780px;
          border-radius: 50%;
          filter: blur(70px);
          opacity: .34;
        }
        .hero__aurora--blue { left: -18%; top: 8%; background: radial-gradient(circle, rgba(37,99,235,.72), transparent 68%); }
        .hero__aurora--cyan { right: -18%; bottom: -28%; background: radial-gradient(circle, rgba(6,182,212,.48), transparent 68%); }
        .hero__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(28px);
          pointer-events: none;
        }
        .hero__orb--blue { width: 310px; height: 310px; left: 12%; top: 8%; background: rgba(37,99,235,.13); }
        .hero__orb--cyan { width: 220px; height: 220px; right: 8%; top: 38%; background: rgba(6,182,212,.11); }
        .hero__orb--gold { width: 170px; height: 170px; left: 42%; bottom: 4%; background: rgba(245,158,11,.07); }
        .hero__depth-grid {
          position: absolute;
          left: -15%;
          bottom: -42%;
          width: 130%;
          height: 78%;
          opacity: .16;
          transform: perspective(700px) rotateX(58deg);
          transform-origin: center bottom;
          background-image: linear-gradient(rgba(143,214,255,.22) 1px, transparent 1px), linear-gradient(90deg, rgba(143,214,255,.18) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: linear-gradient(to bottom, transparent, black 42%, transparent 95%);
        }
        .hero__cursor-glow {
          position: absolute;
          z-index: 0;
          left: 0;
          top: 0;
          width: 300px;
          height: 300px;
          margin-left: -150px;
          margin-top: -150px;
          border-radius: 50%;
          opacity: 0;
          pointer-events: none;
          background: radial-gradient(circle, rgba(87,196,255,.14), transparent 68%);
          mix-blend-mode: screen;
        }
        .hero__horizon {
          position: absolute;
          left: 5%;
          right: 5%;
          top: 64%;
          height: 1px;
          opacity: .38;
          background: linear-gradient(90deg, transparent, rgba(143,214,255,.7), transparent);
          box-shadow: 0 0 28px rgba(87,196,255,.28);
        }
        .hero__particles { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
        .hero__particle { position: absolute; border-radius: 50%; box-shadow: 0 0 12px currentColor; }
        .hero__content {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1.08fr .92fr;
          gap: 28px;
          align-items: center;
          padding-top: clamp(40px, 6vh, 64px);
          padding-bottom: clamp(48px, 7vh, 72px);
        }
        .hero__inner { display: flex; flex-direction: column; gap: 18px; min-width: 0; }
        .hero__eyebrow {
          width: fit-content;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #c0d5ee;
          font: 700 .68rem var(--font-accent);
          letter-spacing: .16em;
          text-transform: uppercase;
        }
        .hero__eyebrow-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--color-cyan); box-shadow: 0 0 18px rgba(6,182,212,.9); }
        .hero__eyebrow-line { width: 36px; height: 1px; background: linear-gradient(90deg, var(--color-cyan), transparent); }
        .hero__headline { perspective: 900px; }
        .hero__title-mask { display: block; overflow: hidden; padding: 0 .05em .08em 0; }
        .hero__title-line { display: block; transform-origin: left bottom; }
        .hero__headline { font-size: clamp(2.45rem, 4.8vw, 4rem); font-weight: 900; line-height: 1.02; letter-spacing: -.05em; }
        .hero__sub { max-width: 520px; font-size: clamp(.9rem, 1.15vw, 1rem); line-height: 1.65; color: var(--color-muted); }
        .hero__sub-word { display: inline-block; transform-origin: left center; }
        .hero__headline .text-gradient {
          background-size: 220% auto;
          animation: hero-text-glow 7s linear infinite;
        }
        @keyframes hero-text-glow {
          0%, 100% { filter: brightness(.95) drop-shadow(0 0 0 transparent); }
          50% { filter: brightness(1.18) drop-shadow(0 8px 28px rgba(87,196,255,.22)); }
        }
        .hero__ctas { display: flex; gap: 14px; flex-wrap: wrap; }
        .hero__ctas .btn {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          will-change: transform;
          transition: border-color .35s ease, box-shadow .35s ease, background .35s ease;
        }
        .hero__ctas .btn::before {
          content: '';
          position: absolute;
          z-index: -1;
          width: 140%;
          height: 220%;
          left: -170%;
          top: -60%;
          transform: rotate(18deg);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.24), transparent);
          transition: left .65s cubic-bezier(.22,.61,.36,1);
        }
        .hero__ctas .btn:hover::before { left: 120%; }
        .hero__ctas .btn-primary {
          box-shadow: 0 12px 34px rgba(37,99,235,.28), inset 0 1px rgba(255,255,255,.16);
        }
        .hero__ctas .btn-primary:hover { box-shadow: 0 18px 44px rgba(37,99,235,.48), 0 0 0 5px rgba(87,196,255,.08); }
        .hero__ctas .btn-outline:hover { border-color: rgba(87,196,255,.7); box-shadow: 0 16px 38px rgba(6,182,212,.12); }
        .hero__btn-label { position: relative; z-index: 2; }
        .hero__btn-arrow {
          display: inline-grid;
          place-items: center;
          width: 28px;
          height: 28px;
          margin-left: 4px;
          border-radius: 50%;
          background: rgba(255,255,255,.12);
          transition: transform .35s ease, background .35s ease;
        }
        .hero__ctas .btn:hover .hero__btn-arrow { transform: translateX(5px) rotate(-8deg); background: rgba(255,255,255,.2); }
        .hero__btn-orbit {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--color-cyan);
          box-shadow: 0 0 14px var(--color-cyan);
          animation: hero-button-orbit 2.1s ease-in-out infinite;
        }
        @keyframes hero-button-orbit { 50% { transform: translateY(-3px) scale(1.35); opacity: .55; } }
        .hero__proof { display: flex; align-items: stretch; gap: 10px; margin-top: 4px; perspective: 700px; }
        .hero__proof-item {
          position: relative;
          min-width: 96px;
          min-height: 68px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 10px 12px;
          overflow: hidden;
          border: 1px solid rgba(143,214,255,.12);
          border-radius: 14px;
          background:
            radial-gradient(circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(87,196,255,.14), transparent 42%),
            linear-gradient(145deg, rgba(15,35,70,.72), rgba(8,18,38,.58));
          box-shadow: inset 0 1px rgba(255,255,255,.04), 0 12px 30px rgba(0,0,0,.08);
          transform-style: preserve-3d;
          will-change: transform;
          transition: border-color .35s ease, box-shadow .35s ease, background .35s ease;
        }
        .hero__proof-item::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          background: linear-gradient(115deg, transparent 20%, rgba(255,255,255,.12) 45%, transparent 70%);
          transform: translateX(-100%);
          transition: opacity .2s ease;
        }
        .hero__proof-item--active {
          border-color: rgba(87,196,255,.48);
          box-shadow: inset 0 1px rgba(255,255,255,.08), 0 16px 38px rgba(37,99,235,.18), 0 0 0 1px rgba(87,196,255,.06);
        }
        .hero__proof-item--active::before { opacity: 1; animation: hero-proof-scan 1.35s ease forwards; }
        @keyframes hero-proof-scan { to { transform: translateX(100%); } }
        .hero__proof-index { position: absolute; right: 8px; top: 7px; color: rgba(143,214,255,.38); font: 700 .55rem var(--font-accent); letter-spacing: .08em; }
        .hero__proof-num { font: 900 1.35rem var(--font-heading); line-height: 1; background: var(--gradient-brand); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .hero__proof-label { margin-top: 5px; color: var(--color-muted); font-size: .68rem; }
        .hero__proof-item--active .hero__proof-num {
          filter: brightness(1.2) drop-shadow(0 6px 16px rgba(87,196,255,.22));
        }
        .hero__proof-sep { width: 1px; height: 38px; background: linear-gradient(transparent, var(--color-border), transparent); }

        .hero__visual { position: relative; height: 390px; perspective: 1000px; transform-style: preserve-3d; }
        .hero__card-stack { position: relative; height: 100%; transform-style: preserve-3d; }
        .hero__main-card {
          position: absolute;
          left: 50%;
          top: 50%;
          width: min(320px, 78%);
          min-height: 230px;
          transform: translate(-50%, -50%);
          transform-style: preserve-3d;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 22px;
          overflow: hidden;
          border-color: rgba(143,214,255,.18);
          background: linear-gradient(145deg, rgba(18,38,78,.92), rgba(9,17,32,.88));
          box-shadow: 0 32px 90px rgba(0,0,0,.38), 0 0 50px rgba(37,99,235,.08);
        }
        .hero__main-card::before { content: ''; position: absolute; inset: 10px; border: 1px solid rgba(143,214,255,.14); pointer-events: none; }
        .hero__card-status { position: relative; z-index: 3; display: flex; align-items: center; gap: 8px; color: #c4d7ed; font: 700 .62rem var(--font-accent); letter-spacing: .09em; text-transform: uppercase; }
        .hero__card-status span { width: 7px; height: 7px; border-radius: 50%; background: var(--color-cyan); box-shadow: 0 0 16px rgba(6,182,212,.9); animation: hero-status-pulse 1.8s ease-in-out infinite; }
        .hero__card-logo { position: relative; z-index: 2; width: 100%; max-height: 120px; object-fit: contain; filter: drop-shadow(0 12px 28px rgba(37,99,235,.32)); transform: translateZ(30px); }
        .hero__card-caption { position: relative; z-index: 3; display: flex; justify-content: space-between; color: #9bb8d7; font: .58rem var(--font-accent); letter-spacing: .13em; text-transform: uppercase; }
        .hero__card-sheen { position: absolute; z-index: 2; inset: -50% 20%; width: 35%; transform: rotate(18deg); opacity: .45; background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent); animation: hero-sheen 5s ease-in-out infinite; pointer-events: none; }
        @keyframes hero-status-pulse { 50% { box-shadow: 0 0 0 7px rgba(6,182,212,.08), 0 0 24px rgba(6,182,212,.95); } }
        @keyframes hero-sheen { 0%,20% { left: -45%; } 55%,100% { left: 115%; } }
        .hero__orbit-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          border-radius: 50%;
          border: 1px solid rgba(143,214,255,.15);
          pointer-events: none;
          transform-origin: center;
        }
        .hero__orbit-ring--one { width: 430px; height: 430px; margin: -215px; border-style: dashed; }
        .hero__orbit-ring--two { width: 340px; height: 340px; margin: -170px; border-color: rgba(37,99,235,.22); }
        .hero__orbit-ring--three { width: 240px; height: 240px; margin: -120px; border-color: rgba(245,158,11,.16); }
        .hero__mini-card {
          position: absolute;
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          white-space: nowrap;
          font-size: .76rem;
          font-weight: 700;
          border-color: rgba(143,214,255,.16);
          backdrop-filter: blur(14px);
        }
        .hero__mini-card--1 { left: 0; top: 18%; }
        .hero__mini-card--2 { right: -2%; top: 12%; }
        .hero__mini-card--3 { right: 2%; bottom: 13%; }
        .hero__fade-bottom { position: absolute; z-index: 3; left: 0; right: 0; bottom: 0; height: 180px; pointer-events: none; background: linear-gradient(transparent, var(--color-surface)); }
        .hero__scroll {
          position: absolute;
          z-index: 4;
          left: 50%;
          bottom: 22px;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(217,236,255,.7);
          text-decoration: none;
          font: 700 .62rem var(--font-accent);
          letter-spacing: .14em;
          text-transform: uppercase;
        }
        .hero__scroll-line { width: 36px; height: 1px; background: linear-gradient(90deg, var(--color-cyan), transparent); animation: hero-scroll-line 1.8s ease-in-out infinite; transform-origin: left; }
        @keyframes hero-scroll-line { 50% { transform: scaleX(.35); opacity: .45; } }

        @media (max-width: 1024px) {
          .hero__content { grid-template-columns: 1fr; text-align: center; padding-top: 110px; }
          .hero__inner { align-items: center; }
          .hero__sub { margin-inline: auto; }
          .hero__ctas, .hero__proof { justify-content: center; }
          .hero__visual { height: 360px; }
          .hero__headline { font-size: clamp(2.35rem, 7vw, 3.8rem); }
          .hero__main-card { width: min(340px, 72%); }
        }
        @media (max-width: 600px) {
          .hero { min-height: 680px; }
          .hero__content { padding-top: 72px; padding-bottom: 56px; }
          .hero__inner { gap: 16px; }
          .hero__headline { font-size: clamp(2rem, 9vw, 3rem); }
          .hero__sub { font-size: .82rem; line-height: 1.55; }
          .hero__ctas { width: 100%; flex-direction: column; }
          .hero__ctas .btn { width: 100%; justify-content: center; }
          .hero__proof { gap: 12px; width: 100%; }
          .hero__proof-item { min-width: 0; flex: 1; min-height: 82px; padding: 12px 8px; }
          .hero__proof-sep { height: 34px; }
          .hero__proof-label { font-size: .64rem; }
          .hero__visual { display: none; }
          .hero__eyebrow-line { width: 18px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero__card-status span, .hero__card-sheen, .hero__scroll-line { animation: none; }
        }
      `}</style>
    </section>
  );
}
