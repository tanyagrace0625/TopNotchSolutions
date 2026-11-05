'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 9, suffix: '+', label: 'Specializations', desc: 'In-house expertise areas' },
  { value: 100, suffix: '%', label: 'Coordinated', desc: 'Every task stays connected' },
  { value: 1, suffix: '', label: 'Client Manager', desc: 'Your dedicated point of contact' },
  { value: 24, suffix: '/7', label: 'Availability', desc: 'Support when you need it' },
];

function Counter({ value, suffix, duration = 2000 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const counter = { current: 0 };
    const tween = gsap.to(counter, {
      current: value,
      duration: duration / 1000,
      ease: 'power3.out',
      snap: { current: 1 },
      onUpdate: () => {
        el.textContent = Math.round(counter.current) + suffix;
      },
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    });
    return () => tween.kill();
  }, [value, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Stats() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          once: true,
        },
      })
        .from('.stats__card', {
          y: 70,
          opacity: 0,
          scale: 0.86,
          rotateX: -18,
          transformOrigin: 'center bottom',
          duration: 0.85,
          stagger: 0.12,
          ease: 'back.out(1.45)',
        })
        .from('.stats__num', {
          scale: 0.4,
          opacity: 0,
          filter: 'blur(12px)',
          duration: 0.7,
          stagger: 0.12,
          ease: 'elastic.out(1, 0.55)',
        }, '-=0.55')
        .from('.stats__label', {
          y: 14,
          opacity: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power3.out',
        }, '-=0.5')
        .from('.stats__desc', {
          y: 10,
          opacity: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power3.out',
        }, '-=0.38')
        .from('.stats__bar', {
          scaleX: 0,
          transformOrigin: 'center',
          duration: 0.55,
          stagger: 0.08,
          ease: 'power4.out',
        }, '-=0.35')
        .from('.stats__bar-fill', {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.8,
          stagger: 0.08,
          ease: 'power4.out',
        }, '-=0.4');

      gsap.to('.stats__orb--one', {
        xPercent: 45,
        yPercent: -30,
        scale: 1.25,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      });
      gsap.to('.stats__orb--two', {
        xPercent: -40,
        yPercent: 35,
        scale: 0.8,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      });
      gsap.to('.stats__grid', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 2 },
      });
      gsap.to('.stats__aurora--one', {
        x: '18vw',
        y: 40,
        rotate: 18,
        scaleX: 1.25,
        ease: 'sine.inOut',
        duration: 7,
        repeat: -1,
        yoyo: true,
      });
      gsap.to('.stats__aurora--two', {
        x: '-14vw',
        y: -30,
        rotate: -12,
        scale: 1.18,
        ease: 'sine.inOut',
        duration: 9,
        repeat: -1,
        yoyo: true,
      });
      gsap.to('.stats__grid-plane', {
        yPercent: 18,
        rotate: 1.2,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.4 },
      });
      gsap.to('.stats__depth-ribbon--back', {
        xPercent: -28,
        yPercent: 22,
        rotate: -12,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 2.2 },
      });
      gsap.to('.stats__depth-ribbon--middle', {
        xPercent: 38,
        yPercent: -18,
        rotate: 9,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.45 },
      });
      gsap.to('.stats__depth-ribbon--front', {
        xPercent: -48,
        yPercent: 12,
        rotate: -5,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
      });
      gsap.to('.stats__horizon', {
        yPercent: -70,
        scaleX: 1.35,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.8 },
      });
      gsap.fromTo('.stats__flare',
        { xPercent: -220, opacity: 0 },
        {
          xPercent: 900,
          opacity: 0.8,
          stagger: 0.35,
          duration: 3.8,
          repeat: -1,
          repeatDelay: 1.8,
          ease: 'power1.inOut',
        }
      );

      gsap.utils.toArray('.stats__dust').forEach((dust, index) => {
        gsap.to(dust, {
          x: gsap.utils.random(-45, 45),
          y: gsap.utils.random(-35, 35),
          opacity: gsap.utils.random(0.15, 0.65),
          scale: gsap.utils.random(0.7, 1.8),
          duration: gsap.utils.random(4, 8),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.18,
        });
      });

      const cards = gsap.utils.toArray('.stats__card');
      const showcase = gsap.timeline({ repeat: -1, paused: true });

      cards.forEach((card, index) => {
        showcase.call(() => {
          cards.forEach((item, itemIndex) => {
            item.classList.toggle('stats__card--active', itemIndex === index);
          });
          cards.forEach((item) => {
            gsap.set(item.querySelector('.stats__num'), { scale: 1, filter: 'blur(0px)' });
            gsap.set(item.querySelector('.stats__bar-fill'), { scaleX: 1 });
            if (!item.classList.contains('stats__card--hovered')) {
              gsap.set(item, { y: 0, scale: 1 });
            }
          });
          gsap.set(card, { '--pointer-x': '50%', '--pointer-y': '50%' });
        });
        showcase.to(card, {
          y: -8,
          scale: 1.025,
          duration: 0.55,
          ease: 'back.out(1.6)',
        });
        showcase.fromTo(card.querySelector('.stats__num'),
          { scale: 0.82, filter: 'blur(4px)' },
          { scale: 1.08, filter: 'blur(0px)', duration: 0.7, ease: 'back.out(2)' },
          '<0.05'
        );
        showcase.to(card.querySelector('.stats__bar-fill'), {
          scaleX: 1.35,
          transformOrigin: 'center center',
          duration: 0.55,
          ease: 'power2.inOut',
          yoyo: true,
          repeat: 1,
        }, '<');
        showcase.to(card, { y: 0, scale: 1, duration: 0.5, ease: 'power2.inOut' }, '+=1.25');
      });

      showcase.call(() => {
        cards.forEach(card => card.classList.remove('stats__card--active'));
      });

      ScrollTrigger.create({
        trigger: section,
        start: 'top 90%',
        end: 'bottom 10%',
        onEnter: () => showcase.play(),
        onEnterBack: () => showcase.play(),
        onLeave: () => showcase.pause(),
        onLeaveBack: () => showcase.pause(),
      });
    }, section);

    const handleSectionMove = (event) => {
      if (prefersReducedMotion) return;
      const bounds = section.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const glow = section.querySelector('.stats__cursor-glow');
      gsap.to(glow, { x, y, opacity: 1, duration: 0.55, ease: 'power3.out' });
      gsap.to('.stats__grid-plane', {
        x: (x / bounds.width - 0.5) * 18,
        y: (y / bounds.height - 0.5) * 12,
        duration: 1,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };
    const handleSectionLeave = () => {
      gsap.to('.stats__cursor-glow', { opacity: 0, duration: 0.35 });
      gsap.to('.stats__grid-plane', { x: 0, y: 0, duration: 0.9, ease: 'power3.out' });
    };

    section.addEventListener('mousemove', handleSectionMove, { passive: true });
    section.addEventListener('mouseleave', handleSectionLeave);

    return () => {
      section.removeEventListener('mousemove', handleSectionMove);
      section.removeEventListener('mouseleave', handleSectionLeave);
      ctx.revert();
    };
  }, []);

  const handleMove = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const card = event.currentTarget;
    card.classList.add('stats__card--hovered');
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    gsap.to(card, {
      rotateY: (x - 0.5) * 12,
      rotateX: (0.5 - y) * 12,
      y: -10,
      transformPerspective: 900,
      transformOrigin: 'center',
      duration: 0.45,
      ease: 'power3.out',
    });
    card.style.setProperty('--pointer-x', `${x * 100}%`);
    card.style.setProperty('--pointer-y', `${y * 100}%`);
  };

  const handleLeave = (event) => {
    event.currentTarget.classList.remove('stats__card--hovered');
    gsap.to(event.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.75,
      ease: 'elastic.out(1, 0.45)',
    });
  };

  return (
    <section className="stats" ref={sectionRef}>
      <div className="stats__bg bg-dots"/>
      <div className="stats__aurora stats__aurora--one" aria-hidden="true"/>
      <div className="stats__aurora stats__aurora--two" aria-hidden="true"/>
      <div className="stats__grid-plane" aria-hidden="true"/>
      <div className="stats__depth-ribbon stats__depth-ribbon--back" aria-hidden="true"/>
      <div className="stats__depth-ribbon stats__depth-ribbon--middle" aria-hidden="true"/>
      <div className="stats__depth-ribbon stats__depth-ribbon--front" aria-hidden="true"/>
      <div className="stats__horizon" aria-hidden="true"/>
      <div className="stats__cursor-glow" aria-hidden="true"/>
      <div className="stats__orb stats__orb--one" aria-hidden="true"/>
      <div className="stats__orb stats__orb--two" aria-hidden="true"/>
      {[0,1,2,3,4,5,6,7,8,9,11].map((index) => (
        <span key={index} className={`stats__dust stats__dust--${index}`} aria-hidden="true"/>
      ))}
      {[0,1,2].map((index) => (
        <span key={index} className={`stats__flare stats__flare--${index}`} aria-hidden="true"/>
      ))}
      <div className="stats__rail stats__rail--top" aria-hidden="true"/>
      <div className="stats__rail stats__rail--bottom" aria-hidden="true"/>
      <div className="container">
        <div className="stats__grid" ref={gridRef}>
          {STATS.map((stat, i) => (
            <article
              key={stat.label}
              className="stats__card glass-card"
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
            >
              <span className="stats__corner stats__corner--tl" aria-hidden="true"/>
              <span className="stats__corner stats__corner--br" aria-hidden="true"/>
              <div className="stats__num">
                <Counter value={stat.value} suffix={stat.suffix}/>
              </div>
              <div className="stats__label">{stat.label}</div>
              <div className="stats__desc">{stat.desc}</div>
              <div className="stats__bar">
                <div className="stats__bar-fill" style={{ animationDelay: `${i * 0.2}s` }}/>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .stats {
          position: relative;
          padding: 80px 0;
            background:
              radial-gradient(circle at 12% 50%, rgba(37,99,235,.16), transparent 22%),
              radial-gradient(circle at 88% 50%, rgba(6,182,212,.12), transparent 20%),
              linear-gradient(135deg, #0b1227 0%, var(--color-surface-2) 48%, #09111e 100%);
            border-top: 1px solid var(--color-border);
            border-bottom: 1px solid var(--color-border);
            overflow: hidden;
            isolation: isolate;
          }
          .stats__bg { position: absolute; inset: 0; opacity: 0.4; mask-image: linear-gradient(90deg, transparent, black 12%, black 88%, transparent); }
          .stats__aurora {
            position: absolute;
            z-index: 0;
            width: 48%;
            height: 210%;
            top: -55%;
            border-radius: 50%;
            filter: blur(45px);
            pointer-events: none;
            transform-origin: center;
            will-change: transform;
          }
          .stats__aurora--one {
            left: -18%;
            background: radial-gradient(ellipse, rgba(37,99,235,.20), rgba(37,99,235,.04) 48%, transparent 72%);
            transform: rotate(-18deg);
          }
          .stats__aurora--two {
            right: -22%;
            background: radial-gradient(ellipse, rgba(6,182,212,.18), rgba(37,99,235,.03) 46%, transparent 72%);
            transform: rotate(16deg);
          }
          .stats__grid-plane {
            position: absolute;
            z-index: 0;
            left: -8%;
            top: -20%;
            width: 116%;
            height: 140%;
            opacity: .16;
            pointer-events: none;
            transform: perspective(700px) rotateX(58deg);
            transform-origin: center bottom;
            background-image:
              linear-gradient(rgba(143,214,255,.24) 1px, transparent 1px),
              linear-gradient(90deg, rgba(143,214,255,.18) 1px, transparent 1px);
            background-size: 54px 54px;
            mask-image: linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%);
          }
          .stats__cursor-glow {
            position: absolute;
            z-index: 0;
            left: 0;
            top: 0;
            width: 260px;
            height: 260px;
            margin-left: -130px;
            margin-top: -130px;
            border-radius: 50%;
            opacity: 0;
            pointer-events: none;
            background: radial-gradient(circle, rgba(87,196,255,.15), rgba(37,99,235,.07) 34%, transparent 70%);
            mix-blend-mode: screen;
          }
          .stats__depth-ribbon {
            position: absolute;
            z-index: 0;
            left: 8%;
            width: 84%;
            height: 150px;
            pointer-events: none;
            border-radius: 50%;
            filter: blur(3px);
            transform-origin: center;
            background:
              linear-gradient(102deg, transparent 8%, rgba(37,99,235,.10) 32%, rgba(87,196,255,.30) 50%, rgba(6,182,212,.08) 68%, transparent 92%);
            mask-image: linear-gradient(90deg, transparent, black 18%, black 82%, transparent);
            -webkit-mask-image: linear-gradient(90deg, transparent, black 18%, black 82%, transparent);
          }
          .stats__depth-ribbon::after {
            content: '';
            position: absolute;
            left: 12%;
            right: 12%;
            top: 50%;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(191,230,255,.55), rgba(87,196,255,.18), transparent);
            box-shadow: 0 0 24px rgba(87,196,255,.22);
          }
          .stats__depth-ribbon--back { top: 8%; opacity: .38; transform: rotate(-9deg) scale(.72); }
          .stats__depth-ribbon--middle { top: 34%; opacity: .55; transform: rotate(7deg) scale(.88); }
          .stats__depth-ribbon--front { bottom: 2%; opacity: .72; transform: rotate(-4deg) scale(1.05); }
          .stats__horizon {
            position: absolute;
            z-index: 0;
            left: -10%;
            top: 48%;
            width: 120%;
            height: 140px;
            pointer-events: none;
            opacity: .24;
            transform: rotate(-3deg);
            background:
              radial-gradient(ellipse at center, rgba(87,196,255,.32), rgba(37,99,235,.08) 28%, transparent 68%);
            filter: blur(14px);
          }
          .stats__dust {
            position: absolute;
            z-index: 0;
            width: 3px;
            height: 3px;
            border-radius: 50%;
            background: rgba(151,220,255,.9);
            box-shadow: 0 0 12px rgba(87,196,255,.72);
            pointer-events: none;
            opacity: .35;
          }
          .stats__dust--0 { left: 4%; top: 16%; } .stats__dust--1 { left: 15%; bottom: 18%; }
          .stats__dust--2 { left: 27%; top: 9%; } .stats__dust--3 { left: 38%; bottom: 12%; }
          .stats__dust--4 { left: 49%; top: 18%; } .stats__dust--5 { left: 61%; bottom: 8%; }
          .stats__dust--6 { left: 72%; top: 12%; } .stats__dust--7 { left: 84%; bottom: 21%; }
          .stats__dust--8 { right: 4%; top: 38%; } .stats__dust--9 { left: 52%; top: 72%; }
          .stats__dust--11 { right: 18%; top: 8%; width: 5px; height: 5px; }
          .stats__flare {
            position: absolute;
            z-index: 0;
            left: -10%;
            width: 10%;
            height: 1px;
            opacity: 0;
            pointer-events: none;
            background: linear-gradient(90deg, transparent, white, rgba(87,196,255,.8), transparent);
            box-shadow: 0 0 16px rgba(87,196,255,.7);
          }
          .stats__flare--0 { top: 20%; transform: rotate(-12deg); }
          .stats__flare--1 { top: 50%; transform: rotate(8deg); }
          .stats__flare--2 { top: 78%; transform: rotate(-5deg); }
          .stats__orb {
            position: absolute;
            width: 420px;
            height: 420px;
            border-radius: 50%;
            filter: blur(18px);
            pointer-events: none;
          }
          .stats__orb--one {
            left: -220px;
            top: -260px;
            background: radial-gradient(circle, rgba(37,99,235,.24), transparent 68%);
          }
          .stats__orb--two {
            right: -240px;
            bottom: -280px;
            background: radial-gradient(circle, rgba(6,182,212,.18), transparent 68%);
          }
          .stats__rail {
            position: absolute;
            left: 0;
            width: 100%;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(143,214,255,.18), transparent);
          }
          .stats__rail--top { top: 18px; }
          .stats__rail--bottom { bottom: 18px; }
          .stats__grid {
            display: grid;
            grid-template-columns: repeat(4,1fr);
            gap: 20px;
            position: relative;
            z-index: 1;
            perspective: 1000px;
          }
          .stats__card {
            --pointer-x: 50%;
            --pointer-y: 50%;
            position: relative;
            padding: 32px 24px;
            text-align: center;
            display: flex;
            flex-direction: column;
            gap: 8px;
            align-items: center;
            overflow: hidden;
            min-height: 178px;
            transform-style: preserve-3d;
            cursor: default;
            border-color: rgba(143,214,255,.09);
            background:
              radial-gradient(circle at var(--pointer-x) var(--pointer-y), rgba(87,196,255,.16), transparent 24%),
              rgba(255,255,255,.035);
            backdrop-filter: blur(18px);
            transition: border-color .35s ease, box-shadow .35s ease, background-color .35s ease;
          }
          .stats__card--active {
            z-index: 2;
            border-color: rgba(87,196,255,.58);
            box-shadow:
              0 20px 55px rgba(37,99,235,.24),
              0 0 38px rgba(6,182,212,.12),
              inset 0 0 0 1px rgba(143,214,255,.12);
            background:
              radial-gradient(circle at 50% 35%, rgba(87,196,255,.24), transparent 42%),
              rgba(255,255,255,.055);
          }
          .stats__card--active::after {
            content: '';
            position: absolute;
            left: -35%;
            top: -20%;
            width: 28%;
            height: 140%;
            opacity: .8;
            transform: rotate(18deg);
            background: linear-gradient(90deg, transparent, rgba(255,255,255,.16), transparent);
            animation: statsCardSweep 1.9s ease-in-out;
          }
          @keyframes statsCardSweep {
            0% { left: -35%; }
            100% { left: 115%; }
          }
          .stats__card::before {
            content: '';
            position: absolute;
            inset: 0;
            opacity: 0;
            background: linear-gradient(115deg, transparent 20%, rgba(255,255,255,.09) 48%, transparent 70%);
            transform: translateX(-100%);
            transition: opacity .25s ease;
            pointer-events: none;
          }
          .stats__card:hover {
            border-color: rgba(87,196,255,.42);
            box-shadow: 0 24px 60px rgba(4,12,36,.48), inset 0 1px rgba(255,255,255,.08);
          }
          .stats__card:hover::before {
            opacity: 1;
            animation: statsShine 1.2s ease;
          }
          @keyframes statsShine {
            to { transform: translateX(100%); }
          }
          .stats__num {
            position: relative;
            z-index: 1;
            font-family: var(--font-heading);
            font-size: clamp(2.4rem,4vw,3.5rem);
          font-weight: 900;
          background: var(--gradient-brand);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
            filter: drop-shadow(0 10px 24px rgba(37,99,235,.16));
          }
          .stats__label {
            font-family: var(--font-heading);
            font-size: 1rem;
            font-weight: 700;
            color: var(--color-white);
            position: relative;
            z-index: 1;
          }
          .stats__desc { font-size: 0.8rem; color: var(--color-muted); position: relative; z-index: 1; }
          .stats__bar {
            width: 40px; height: 3px;
            background: var(--color-border);
            border-radius: var(--radius-full);
            overflow: hidden;
            margin-top: 8px;
            position: relative;
            z-index: 1;
          }
          .stats__bar-fill {
            height: 100%;
            background: var(--gradient-brand);
            border-radius: inherit;
            width: 100%;
          }
          .stats__corner {
            position: absolute;
            width: 18px;
            height: 18px;
            opacity: .65;
            pointer-events: none;
          }
          .stats__corner--tl { left: 10px; top: 10px; border-left: 1px solid var(--color-cyan); border-top: 1px solid var(--color-cyan); }
          .stats__corner--br { right: 10px; bottom: 10px; border-right: 1px solid var(--color-gold-light); border-bottom: 1px solid var(--color-gold-light); }
          .stats__card--hovered {
            border-color: rgba(87,196,255,.52) !important;
          }

          @media (max-width: 768px) {
            .stats__grid { grid-template-columns: repeat(2,1fr); }
          }
          @media (max-width: 480px) {
            .stats__grid { grid-template-columns: 1fr 1fr; gap: 12px; }
            .stats__card { padding: 24px 16px; }
            .stats__grid-plane { opacity: .08; background-size: 38px 38px; }
            .stats__aurora { width: 80%; filter: blur(34px); }
            .stats__cursor-glow { width: 180px; height: 180px; margin-left: -90px; margin-top: -90px; }
          }
          @media (prefers-reduced-motion: reduce) {
            .stats__card--active::after { animation: none; }
          }
      `}</style>
    </section>
  );
}
