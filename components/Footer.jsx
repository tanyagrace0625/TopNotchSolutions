'use client';

const NAV_COL_1 = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
];
const NAV_COL_2 = [
  { label: 'Why TopNotch', href: '#why-us' },
  { label: 'Team', href: '#team' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];
const SERVICES_FOOTER = [
  'Content Strategy & Social Media', 'Website Design & Development',
  'Lead Generation & Funnels', 'Graphic Design & Video Editing',
];
const SOCIALS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61594283219152',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/_topnotchsolutions/',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  },
  {
    label: 'TikTok',
    href: '#',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.93a8.18 8.18 0 0 0 4.78 1.52V7.01a4.85 4.85 0 0 1-1.01-.32z"/></svg>,
  },
  {
    label: 'YouTube',
    href: '#',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="var(--color-surface)"/></svg>,
  },
];

const scrollTo = (href) => {
  const id = href.slice(1);
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__bg bg-dots"/>

      {/* Top CTA strip */}
      <div className="footer__cta-strip">
        <div className="container">
          <div className="footer__cta-inner">
            <div>
              <h3 className="footer__cta-title">Ready to get the right support?</h3>
              <p className="footer__cta-sub text-muted">Your goals. Our expertise. All on point.</p>
            </div>
            <a href="#contact" className="btn btn-primary btn-lg"
              onClick={e => { e.preventDefault(); scrollTo('#contact'); }}>
              Work With Us
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            {/* Brand column */}
            <div className="footer__brand">
              <div className="footer__logo">
                <img className="footer__logo-image" src="/logo.png" alt="TopNotch Solutions" />
              </div>
              <p className="footer__brand-desc text-muted">
                A digital services company helping businesses build their online presence, strengthen their brand, and attract more customers.
              </p>
              <div className="footer__socials">
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="footer__social-btn" aria-label={s.label}
                    style={s.href === '#' ? { opacity: 0.4, cursor: 'not-allowed', pointerEvents: 'none' } : {}}>
                    {s.icon}
                  </a>
                ))}
              </div>
              <div className="footer__tagline">
                <span className="badge badge-blue">Creative Minds. One Dedicated Team.</span>
              </div>
            </div>

            {/* Quick links */}
            <div className="footer__col">
              <h4 className="footer__col-title">Quick Links</h4>
              <ul className="footer__links">
                {[...NAV_COL_1, ...NAV_COL_2].map(link => (
                  <li key={link.href}>
                    <a href={link.href} className="footer__link"
                      onClick={e => { e.preventDefault(); scrollTo(link.href); }}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="footer__col">
              <h4 className="footer__col-title">Our Services</h4>
              <ul className="footer__links">
                {SERVICES_FOOTER.map(s => (
                  <li key={s}><span className="footer__link-static">{s}</span></li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div className="footer__col">
              <h4 className="footer__col-title">Connect With Us</h4>
              <div className="footer__contact-list">
                <a href="https://www.facebook.com/profile.php?id=61594283219152" target="_blank" rel="noopener noreferrer" className="footer__contact-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#2563EB"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  <span>Facebook Page</span>
                </a>
                <a href="https://www.instagram.com/_topnotchsolutions/" target="_blank" rel="noopener noreferrer" className="footer__contact-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  </svg>
                  <span>@_topnotchsolutions</span>
                </a>
              </div>
              <div className="footer__industry-badge">
                <span className="footer__ind-label">Industry</span>
                <span>Digital Growth Partner / Company Portfolio 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container">
          <div className="flex-between footer__bottom-inner">
            <p className="footer__copy">
              © {year} TopNotch. All rights reserved.
            </p>
            <p className="footer__made text-muted">
              Built with care for growing businesses.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          position: relative;
          background: var(--color-primary);
          border-top: 1px solid var(--color-border);
          overflow: hidden;
        }
        .footer__bg { position: absolute; inset: 0; opacity: 0.2; }

        .footer__cta-strip {
          background: linear-gradient(135deg, rgba(37,99,235,0.12), rgba(6,182,212,0.06));
          border-bottom: 1px solid rgba(37,99,235,0.15);
          padding: 40px 0;
          position: relative;
          z-index: 1;
        }
        .footer__cta-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .footer__cta-title { font-family: var(--font-heading); font-size: 1.4rem; font-weight: 700; }
        .footer__cta-sub { margin-top: 4px; font-size: 0.875rem; }

        .footer__main { padding: 72px 0 48px; position: relative; z-index: 1; }
        .footer__grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.2fr;
          gap: 48px;
        }

        .footer__brand { display: flex; flex-direction: column; gap: 20px; }
        .footer__logo {
          display: flex; align-items: center; gap: 10px;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.3rem;
          color: var(--color-white);
          text-decoration: none;
        }
        .footer__logo-image { display: block; width: 220px; height: auto; max-width: 100%; }
        .footer__brand-desc { font-size: 0.875rem; line-height: 1.7; max-width: 280px; }

        .footer__socials { display: flex; gap: 10px; }
        .footer__social-btn {
          width: 38px; height: 38px;
          background: var(--color-glass);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          color: var(--color-muted);
          text-decoration: none;
          transition: var(--transition-fast);
        }
        .footer__social-btn:hover { color: var(--color-white); border-color: rgba(37,99,235,0.3); background: var(--color-glass-hover); }

        .footer__tagline { margin-top: 4px; }
        .footer__tagline .badge { font-size: 0.7rem; letter-spacing: 0.04em; text-transform: none; }

        .footer__col { display: flex; flex-direction: column; gap: 16px; }
        .footer__col-title { font-family: var(--font-heading); font-weight: 700; font-size: 0.9rem; color: var(--color-white); }
        .footer__links { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .footer__link {
          color: var(--color-muted); font-size: 0.875rem;
          text-decoration: none;
          transition: color 0.2s;
          cursor: pointer;
        }
        .footer__link:hover { color: var(--color-white); }
        .footer__link-static { color: var(--color-muted); font-size: 0.875rem; }

        .footer__contact-list { display: flex; flex-direction: column; gap: 10px; }
        .footer__contact-item {
          display: flex; align-items: center; gap: 10px;
          color: var(--color-muted); font-size: 0.875rem;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer__contact-item:hover { color: var(--color-white); }

        .footer__industry-badge {
          display: flex; flex-direction: column; gap: 4px;
          padding: 12px 14px;
          background: var(--color-glass);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          margin-top: 8px;
        }
        .footer__ind-label { font-size: 0.7rem; font-weight: 700; color: var(--color-cyan); font-family: var(--font-accent); text-transform: uppercase; letter-spacing: 0.08em; }
        .footer__industry-badge span:last-child { font-size: 0.8rem; color: var(--color-muted); }

        .footer__bottom {
          border-top: 1px solid var(--color-border);
          padding: 20px 0;
          position: relative; z-index: 1;
        }
        .footer__bottom-inner { flex-wrap: wrap; gap: 12px; }
        .footer__copy { font-size: 0.82rem; color: var(--color-muted); }
        .footer__made { font-size: 0.82rem; }

        @media (max-width: 1024px) {
          .footer__grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .footer__grid { grid-template-columns: 1fr; }
          .footer__cta-inner { flex-direction: column; align-items: flex-start; }
          .footer__cta-inner .btn { width: 100%; justify-content: center; }
        }
      `}</style>
    </footer>
  );
}
