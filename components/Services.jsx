'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PARTICLES = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${8 + ((index * 37) % 86)}%`,
  top: `${12 + ((index * 29) % 76)}%`,
  size: 2 + (index % 3),
  delay: index * 0.16,
}));

const SERVICES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    title: 'Content Strategy & Social Media Management',
    desc: 'Strategic content planning and social media management that build your brand, engage your audience, and strengthen your online presence.',
    tags: ['Content', 'Strategy', 'Social'],
    color: '#2563EB',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: 'Website Design & Development',
    desc: 'Professional, user-friendly websites designed to showcase your business, build trust, and turn visitors into potential customers.',
    tags: ['Websites', 'UX', 'Development'],
    color: '#06B6D4',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: 'Lead Generation & Marketing Funnels',
    desc: 'Targeted lead generation strategies and conversion-focused funnels that attract potential customers and guide them toward action.',
    tags: ['Leads', 'Funnels', 'Conversion'],
    color: '#F59E0B',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    title: 'Graphic Design & Video Editing',
    desc: 'Creative visuals and engaging videos that capture attention, communicate your message, and bring your brand to life.',
    tags: ['Branding', 'Graphics', 'Video'],
    color: '#4F8DFF',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
      </svg>
    ),
    title: 'Graphic Design',
    desc: 'Brand visuals, social media graphics, marketing materials, and professional creative assets.',
    tags: ['Branding', 'Visuals', 'Creative'],
    color: '#70C9FF',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polygon points="23 7 16 12 23 17 23 7"/>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
      </svg>
    ),
    title: 'Video Production',
    desc: 'Reels, shorts, promotional videos, editing, and video content strategy for your brand.',
    tags: ['Reels', 'Editing', 'Content'],
    color: '#2F7BFF',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="9" y1="21" x2="9" y2="9"/>
      </svg>
    ),
    title: 'Website Development',
    desc: 'Professional websites, landing pages, e-commerce, and ongoing web maintenance and support.',
    tags: ['Web', 'Landing Pages', 'Dev'],
    color: '#5EE7FF',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'CRM / GHL Support',
    desc: 'GoHighLevel setup, CRM management, pipeline building, automations, and client database support.',
    tags: ['GHL', 'CRM', 'Pipelines'],
    color: '#D6B36A',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    title: 'Research & Data',
    desc: 'Market research, competitor analysis, data collection, reporting, and business intelligence.',
    tags: ['Research', 'Analysis', 'Data'],
    color: '#06B6D4',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: 'Administrative Operations',
    desc: 'Process management, documentation, internal coordination, and operational support across your business.',
    tags: ['Operations', 'Process', 'Docs'],
    color: '#4F8DFF',
  },
];

export default function Services() {
  const ref = useRef(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      section.querySelectorAll('.scale-up, .fade-up, .fade-left, .fade-right').forEach((element) => {
        element.classList.add('visible');
      });
      return;
    }

    const cleanups = [];
    const context = gsap.context(() => {
      gsap.set('.service-card', { transformPerspective: 900, transformStyle: 'preserve-3d' });

      const intro = gsap.timeline({
        defaults: { ease: 'power4.out' },
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          once: true,
        },
      });

      intro
        .from('.services__header .section-label', { y: 18, opacity: 0, scale: 0.88, duration: 0.55 })
        .from('.services__header h2', { y: 55, rotateX: -12, opacity: 0, filter: 'blur(10px)', duration: 0.85 }, '-=0.25')
        .from('.services__sub', { y: 24, opacity: 0, duration: 0.65 }, '-=0.45');

      gsap.to('.services__orb--1', {
        xPercent: 24,
        yPercent: 18,
        scale: 1.12,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.services__orb--2', {
        xPercent: -22,
        yPercent: -16,
        scale: 1.18,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.services__particle', {
        y: 'random(-32,32)',
        x: 'random(-18,18)',
        opacity: 'random(.18,.8)',
        scale: 'random(.75,1.35)',
        duration: 'random(2.8,5.5)',
        repeat: -1,
        yoyo: true,
        stagger: { amount: 1.8, from: 'random' },
        ease: 'sine.inOut',
      });
      gsap.to('.services__ribbon', {
        xPercent: 120,
        opacity: 0.8,
        duration: 7,
        repeat: -1,
        repeatDelay: 3,
        ease: 'power1.inOut',
      });
      gsap.to('.services__bg-drift', {
        yPercent: 28,
        rotate: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
      gsap.to('.services__header', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
      gsap.fromTo('.services__grid', { yPercent: 8 }, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.25,
        },
      });
      gsap.to('.service-card', {
        y: (index) => -45 - (index * 18),
        x: (index) => (index % 2 === 0 ? -24 : 24),
        scale: 0.82,
        opacity: 0,
        rotateX: -12,
        filter: 'blur(7px)',
        stagger: {
          each: 0.12,
          from: 'start',
        },
        ease: 'power2.in',
        scrollTrigger: {
          trigger: section,
          start: 'bottom 58%',
          end: 'bottom 15%',
          scrub: 1.2,
        },
      });
      gsap.fromTo('.services__parallax-bg', { yPercent: -12, scale: 1.08 }, {
        yPercent: 12,
        scale: 1.16,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.4,
        },
      });

      const cards = gsap.utils.toArray('.service-card');
      gsap.fromTo(cards, {
        x: (index) => (index % 2 === 0 ? -110 : 110),
        y: 120,
        scale: 0.78,
        opacity: 0,
        rotateX: -16,
        rotateY: (index) => (index % 2 === 0 ? -12 : 12),
        filter: 'blur(9px)',
      }, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        rotateX: 0,
        rotateY: 0,
        filter: 'blur(0px)',
        stagger: {
          each: 0.16,
          from: 'start',
        },
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services__grid',
          start: 'top 88%',
          end: 'top 42%',
          scrub: 1.25,
        },
      });

      const showcase = gsap.timeline({ repeat: -1, repeatDelay: 0.5, paused: true });
      cards.forEach((card, index) => {
        showcase.call(() => {
          cards.forEach((item) => item.classList.remove('service-card--active'));
          card.classList.add('service-card--active');
          gsap.fromTo(card.querySelector('.service-card__sheen'), { xPercent: -180 }, {
            xPercent: 240,
            duration: 1.25,
            ease: 'power2.inOut',
          });
          gsap.fromTo(card.querySelector('.service-card__icon'), { scale: 1 }, { scale: 1.09, rotate: 5, duration: 0.45, yoyo: true, repeat: 1, ease: 'back.out(2)' });
        }, [], index * 1.35);
      });

      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => showcase.play(),
        onLeave: () => showcase.pause(),
        onEnterBack: () => showcase.play(),
        onLeaveBack: () => showcase.pause(),
      });

      cards.forEach((card) => {
        const onEnter = () => {
          card.classList.add('service-card--active');
        };
        const onMove = (event) => {
          const bounds = card.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;
          card.style.setProperty('--cursor-x', `${(x + 0.5) * 100}%`);
          card.style.setProperty('--cursor-y', `${(y + 0.5) * 100}%`);
          gsap.to(card, {
            rotateX: y * -10,
            rotateY: x * 12,
            y: -10,
            z: 16,
            duration: 0.45,
            ease: 'power2.out',
          });
        };
        const onLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            y: 0,
            z: 0,
            duration: 0.9,
            ease: 'elastic.out(1, 0.48)',
          });
          if (!showcase.isActive()) card.classList.remove('service-card--active');
        };
        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          card.removeEventListener('mouseenter', onEnter);
          card.removeEventListener('mousemove', onMove);
          card.removeEventListener('mouseleave', onLeave);
        });
      });

    }, section);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, []);

  return (
    <section
      id="services"
      className="services section-padding"
      ref={ref}
      data-bg="/services-bg.png"
      data-rate="0.3"
      data-effect="slide-up"
    >
      <div className="services__bg bg-dots"/>
      <div className="services__parallax-bg" aria-hidden="true"/>
      <div className="services__bg-drift" aria-hidden="true"/>
      <div className="services__orb services__orb--1"/>
      <div className="services__orb services__orb--2"/>
      <div className="services__particles" aria-hidden="true">
        {PARTICLES.map((particle) => (
          <span
            key={particle.id}
            className="services__particle"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="services__ribbon" aria-hidden="true"/>

      <div className="container">
        {/* Header */}
        <div className="services__header text-center fade-up visible">
          <div className="section-label">What We Do</div>
          <h2 className="text-h1">
            Everything Your Business Needs<br/>
            <span className="text-gradient">to Grow Online.</span>
          </h2>
          <p className="text-large text-muted services__sub">
            Four connected solutions, delivered by one dedicated team. Strategy, creativity, technology, and growth working together around your goals.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services__grid" data-effect="slide-up">
          {SERVICES.slice(0, 4).map((service, i) => (
            <div
              key={i}
              className="service-card glass-card"
              data-effect={['slide-left', 'zoom', 'flip-y', 'slide-right'][i]}
              style={{ '--card-color': service.color, animationDelay: `${i * 0.08}s` }}
            >
              <span className="service-card__number">0{i + 1}</span>
              <span className="service-card__sheen"/>
              <div className="service-card__spotlight"/>
              <div className="service-card__top">
                <div className="service-card__icon" style={{ color: service.color, background: `${service.color}18`, borderColor: `${service.color}30` }}>
                  {service.icon}
                </div>
                <div className="service-card__glow" style={{ background: `radial-gradient(circle at center, ${service.color}15, transparent 70%)` }}/>
              </div>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__desc">{service.desc}</p>
              <div className="service-card__tags">
                {service.tags.map((tag, j) => (
                  <span key={j} className="service-card__tag" style={{ color: service.color, background: `${service.color}12`, borderColor: `${service.color}25` }}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="service-card__hover-bar" style={{ background: service.color }}/>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .services {
          position: relative;
          background: var(--color-surface-2);
          overflow: hidden;
        }
        .services__bg { position: absolute; inset: 0; opacity: 0.4; }
        .services__parallax-bg {
          position: absolute;
          z-index: 0;
          inset: -18% -5%;
          background-image:
            linear-gradient(180deg, rgba(19,26,46,.82), rgba(19,26,46,.62)),
            url('/services-bg.png');
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          opacity: .3;
          filter: saturate(.85) contrast(1.08);
          mask-image: linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%);
          pointer-events: none;
        }
        .services__bg-drift {
          position: absolute;
          width: 700px;
          height: 700px;
          left: 50%;
          top: 12%;
          margin-left: -350px;
          border-radius: 50%;
          opacity: .16;
          background:
            radial-gradient(circle, transparent 28%, rgba(87,196,255,.12) 29%, transparent 30%),
            repeating-radial-gradient(circle, rgba(143,214,255,.18) 0 1px, transparent 1px 36px);
          mask-image: radial-gradient(circle, black, transparent 68%);
          pointer-events: none;
        }
        .services__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
        }
        .services__orb--1 { width: 500px; height: 500px; top: -10%; left: -10%; background: rgba(37,99,235,0.1); }
        .services__orb--2 { width: 400px; height: 400px; bottom: -5%; right: -5%; background: rgba(6,182,212,0.08); }
        .services__particles { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
        .services__particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(143,214,255,.75);
          box-shadow: 0 0 14px rgba(87,196,255,.9);
          opacity: .35;
        }
        .services__ribbon {
          position: absolute;
          z-index: 0;
          left: -38%;
          top: 58%;
          width: 32%;
          height: 1px;
          opacity: .18;
          transform: rotate(-12deg);
          background: linear-gradient(90deg, transparent, var(--color-cyan), transparent);
          box-shadow: 0 0 24px rgba(87,196,255,.45);
        }

        .services__header { max-width: 700px; margin: 0 auto 60px; }
        .services__header .section-label { margin-bottom: 18px; }
        .services__sub { margin-top: 20px; max-width: 580px; margin-left: auto; margin-right: auto; }

        .services__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          position: relative;
          z-index: 1;
        }

        .service-card {
          min-height: 330px;
          padding: 30px 26px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          border-color: rgba(143,214,255,.12);
          opacity: 1;
          background:
            linear-gradient(145deg, rgba(15,30,58,.82), rgba(8,18,38,.72));
          transform-style: preserve-3d;
          will-change: transform;
        }
        .service-card:hover {
          border-color: color-mix(in srgb, var(--card-color) 42%, transparent);
        }
        .service-card--active {
          border-color: color-mix(in srgb, var(--card-color) 55%, transparent);
          box-shadow:
            0 24px 65px color-mix(in srgb, var(--card-color) 18%, transparent),
            inset 0 1px rgba(255,255,255,.08);
        }
        .service-card__number {
          position: absolute;
          right: 16px;
          top: 12px;
          color: color-mix(in srgb, var(--card-color) 48%, transparent);
          font: 800 3rem var(--font-heading);
          line-height: 1;
          letter-spacing: -.08em;
          opacity: .16;
          transition: opacity .35s ease, transform .5s cubic-bezier(.2,.8,.2,1);
        }
        .service-card--active .service-card__number,
        .service-card:hover .service-card__number {
          opacity: .45;
          transform: translateY(-5px);
        }
        .service-card__spotlight {
          position: absolute;
          inset: 0;
          opacity: 0;
          pointer-events: none;
          background: radial-gradient(circle at var(--cursor-x, 50%) var(--cursor-y, 50%), color-mix(in srgb, var(--card-color) 18%, transparent), transparent 38%);
          transition: opacity .35s ease;
        }
        .service-card--active .service-card__spotlight,
        .service-card:hover .service-card__spotlight { opacity: 1; }
        .service-card__sheen {
          position: absolute;
          z-index: 5;
          top: -30%;
          left: 0;
          width: 35%;
          height: 160%;
          opacity: 0;
          transform: rotate(18deg);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.14), transparent);
          pointer-events: none;
        }
        .service-card--active .service-card__sheen { opacity: 1; }
        .service-card__top { position: relative; }
        .service-card__icon {
          width: 60px; height: 60px;
          border-radius: var(--radius-md);
          border: 1px solid;
          display: flex; align-items: center; justify-content: center;
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
          transform-style: preserve-3d;
        }
        .service-card:hover .service-card__icon { transform: scale(1.1) rotate(-3deg); }
        .service-card__glow {
          position: absolute;
          inset: -20px;
          opacity: 0;
          transition: opacity 0.4s;
        }
        .service-card:hover .service-card__glow { opacity: 1; }
        .service-card__title { font-family: var(--font-heading); font-size: 1.05rem; font-weight: 700; line-height: 1.3; }
        .service-card__desc { color: var(--color-muted); font-size: 0.875rem; line-height: 1.65; flex: 1; }
        .service-card__tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .service-card__tag {
          padding: 3px 10px;
          border-radius: var(--radius-full);
          font-size: 0.7rem;
          font-weight: 600;
          font-family: var(--font-accent);
          border: 1px solid;
          letter-spacing: 0.04em;
          transition: transform .3s ease, border-color .3s ease;
        }
        .service-card:hover .service-card__tag { transform: translateY(-2px); }
        .service-card__hover-bar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          opacity: 0;
          transition: opacity 0.3s;
          border-radius: 0 0 var(--radius-lg) var(--radius-lg);
        }
        .service-card:hover .service-card__hover-bar { opacity: 1; }
        @media (max-width: 1024px) {
          .services__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .services__grid { grid-template-columns: 1fr; }
          .service-card { min-height: 300px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .services__particle,
          .services__ribbon { display: none; }
        }
      `}</style>
    </section>
  );
}
