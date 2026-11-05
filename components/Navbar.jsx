'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const NAV_LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Why Us',   href: '#why-us' },
  { label: 'Testimonials', href: '#testimonials' },
    { label: 'Team',     href: '#team' },

  { label: 'Portfolio', href: '/works' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // Active section tracking
      const sections = NAV_LINKS.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="navbar">
        <div className="navbar__inner container flex-between">
          {/* Logo */}
          <a href="#hero" className="navbar__logo" onClick={e => { e.preventDefault(); scrollTo('#hero'); }}>
            <Image
              className="navbar__logo-image"
              src="/logo.png"
              alt="TopNotch Solutions"
              width={887}
              height={387}
              priority
            />
          </a>

          {/* Desktop Nav */}
          <ul className="navbar__links">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`navbar__link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                  onClick={e => { if (link.href.startsWith('#')) { e.preventDefault(); scrollTo(link.href); } }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#contact"
            className="btn btn-primary btn-sm navbar__cta"
            onClick={e => { e.preventDefault(); scrollTo('#contact'); }}
          >
            Work With Us
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>

          {/* Hamburger */}
          <button
            className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu__inner">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-menu__link"
              style={{ animationDelay: `${i * 0.06}s` }}
              onClick={e => { if (link.href.startsWith('#')) { e.preventDefault(); scrollTo(link.href); } }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn btn-primary btn-lg"
            style={{ marginTop: 16, animationDelay: '0.4s', width: '100%', justifyContent: 'center' }}
            onClick={e => { e.preventDefault(); scrollTo('#contact'); }}
          >
            Work With Us
          </a>
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          height: var(--navbar-height);
          transition: background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
          border-bottom: 1px solid transparent;
        }
        .navbar--scrolled {
          background: rgba(10,15,44,0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-color: var(--color-border);
          box-shadow: 0 8px 40px rgba(0,0,0,0.4);
        }
        .navbar__inner { height: 100%; gap: 24px; }
        .navbar__logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.3rem;
          letter-spacing: -0.02em;
          color: var(--color-white);
        }
        .navbar__logo-image { display: block; width: 150px; height: 52px; object-fit: contain; object-position: left center; }
        .navbar__links {
          display: flex; align-items: center; gap: 4px;
          list-style: none;
          flex: 1;
          justify-content: center;
        }
        .navbar__link {
          padding: 8px 14px;
          border-radius: var(--radius-full);
          color: var(--color-muted);
          font-size: 0.88rem;
          font-weight: 500;
          font-family: var(--font-accent);
          text-decoration: none;
          transition: color 0.2s, background 0.2s;
          position: relative;
        }
        .navbar__link:hover, .navbar__link.active {
          color: var(--color-white);
          background: rgba(255,255,255,0.07);
        }
        .navbar__link.active::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 50%;
          transform: translateX(-50%);
          width: 4px; height: 4px;
          border-radius: 50%;
          background: var(--color-cyan);
        }
        .navbar__cta { display: flex; }
        .navbar__hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 40px; height: 40px;
          background: rgba(255,255,255,0.07);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          cursor: pointer;
          padding: 8px;
          transition: background 0.2s;
        }
        .navbar__hamburger span {
          display: block;
          width: 20px; height: 2px;
          background: var(--color-white);
          border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .navbar__hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .navbar__hamburger.open span:nth-child(2) { opacity: 0; }
        .navbar__hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: rgba(10,15,44,0.97);
          backdrop-filter: blur(24px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .mobile-menu.open { opacity: 1; pointer-events: all; }
        .mobile-menu__inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 40px 20px;
          width: 100%;
          max-width: 340px;
        }
        .mobile-menu__link {
          color: var(--color-white);
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 700;
          text-decoration: none;
          padding: 12px 20px;
          border-radius: var(--radius-md);
          width: 100%;
          text-align: center;
          transition: background 0.2s, color 0.2s;
          animation: fade-up 0.4s ease both;
        }
        .mobile-menu__link:hover {
          background: rgba(37,99,235,0.15);
          color: var(--color-cyan);
        }

        @media (max-width: 1024px) {
          .navbar__links { display: none; }
          .navbar__cta { display: none; }
          .navbar__hamburger { display: flex; }
        }
      `}</style>
    </>
  );
}
