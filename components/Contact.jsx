'use client';
import { useEffect, useRef, useState } from 'react';
import { submitInquiry } from '@/lib/firestore';

const SERVICES_LIST = [
  'Content Strategy & Social Media Management',
  'Website Design & Development',
  'Lead Generation & Marketing Funnels',
  'Graphic Design & Video Editing',
  'Other / Not Sure Yet',
];

export default function Contact() {
  const ref = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', business: '', service: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [error, setError] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 120);
          });
        }
      });
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setStatus('sending');
    setError('');
    try {
      await submitInquiry({ ...form, submittedAt: new Date().toISOString() });
      setStatus('success');
      setForm({ name: '', email: '', business: '', service: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
      setError('Something went wrong. Please try again or reach out to us directly on Facebook.');
    }
  };

  return (
    <section id="contact" className="contact section-padding" ref={ref}>
      <div className="contact__bg"/>
      <div className="contact__orb contact__orb--1"/>
      <div className="contact__orb contact__orb--2"/>

      <div className="container">
        <div className="contact__grid">
          {/* Left: Info */}
          <div className="contact__info fade-left">
            <div className="section-label">Get In Touch</div>
            <h2 className="text-h1">
              Let&apos;s Build Your<br/>
              <span className="text-gradient">Digital Growth.</span>
            </h2>
            <div className="divider"/>
            <p className="contact__desc text-muted">
              Tell us about your business, your goals, and what you want to improve. We&apos;ll help shape the right digital solution around it.
            </p>

            {/* Contact Options */}
            <div className="contact__options">
              <a href="https://www.facebook.com/profile.php?id=61594283219152" target="_blank" rel="noopener noreferrer" className="contact__opt glass-card">
                <div className="contact__opt-icon" style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.25)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#2563EB"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </div>
                <div>
                  <div className="contact__opt-label">Message us on Facebook</div>
                  <div className="contact__opt-val">TopNotch Solutions</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
              <a href="https://www.instagram.com/_topnotchsolutions/" target="_blank" rel="noopener noreferrer" className="contact__opt glass-card">
                <div className="contact__opt-icon" style={{ background: 'rgba(236,72,153,0.15)', border: '1px solid rgba(236,72,153,0.25)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </div>
                <div>
                  <div className="contact__opt-label">DM us on Instagram</div>
                  <div className="contact__opt-val">@_topnotchsolutions</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>

            {/* Core message */}
            <div className="contact__tagline glass-card">
              <div className="contact__tagline-q">&ldquo;</div>
              <p>Your goals.<br/>Our expertise.<br/>All on point.</p>
              <div className="contact__tagline-sub">Creative Minds. One Dedicated Team.</div>
            </div>

            <div className="contact__details">
              <a href="mailto:info.solutionstopnotch@gmail.com">info.solutionstopnotch@gmail.com</a>
              <a href="tel:+639763426407">+63 976 342 6407</a>
              <a href="tel:+639120164978">+63 912 016 4978</a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact__form-wrap fade-right delay-2">
            <div className="contact__form-card glass-card">
              <h3 className="contact__form-title">Send Us a Message</h3>
              <p className="contact__form-sub text-muted">We&apos;ll get back to you within 24 hours.</p>

              {status === 'success' ? (
                <div className="contact__success">
                  <div className="contact__success-icon">🎉</div>
                  <h4>Message Sent!</h4>
                  <p>We&apos;ve received your inquiry. Our team will be in touch with you shortly.</p>
                  <button className="btn btn-outline btn-sm" onClick={() => setStatus('idle')}>Send Another</button>
                </div>
              ) : (
                <form className="contact__form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Your Name <span className="req">*</span></label>
                    <input id="name" name="name" type="text" placeholder="Juan dela Cruz" value={form.name} onChange={handleChange} className="form-input" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address <span className="req">*</span></label>
                    <input id="email" name="email" type="email" placeholder="you@yourbusiness.com" value={form.email} onChange={handleChange} className="form-input" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="business">Business / Company Name</label>
                    <input id="business" name="business" type="text" placeholder="Your Business" value={form.business} onChange={handleChange} className="form-input"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="service">What Do You Need Help With?</label>
                    <select id="service" name="service" value={form.service} onChange={handleChange} className="form-input form-select">
                      <option value="">Select a service area...</option>
                      {SERVICES_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Tell Us More <span className="req">*</span></label>
                    <textarea id="message" name="message" placeholder="Tell us what your business needs. The more detail, the better we can coordinate the right support for you." value={form.message} onChange={handleChange} className="form-input form-textarea" rows={4} required/>
                  </div>
                  {error && <div className="contact__error">{error}</div>}
                  <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} disabled={status === 'sending'}>
                    {status === 'sending' ? (
                      <>
                        <div className="spinner"/>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact {
          position: relative;
          background: var(--color-surface);
          overflow: hidden;
        }
        .contact__bg {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 100%, rgba(37,99,235,0.08) 0%, transparent 60%);
        }
        .contact__orb {
          position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none;
        }
        .contact__orb--1 { width: 600px; height: 600px; top: -20%; left: -10%; background: rgba(6,182,212,0.06); }
        .contact__orb--2 { width: 400px; height: 400px; bottom: 0; right: -5%; background: rgba(37,99,235,0.08); }

        .contact__grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 80px;
          align-items: start;
          position: relative;
          z-index: 1;
        }
        .contact__info { display: flex; flex-direction: column; gap: 24px; }
        .contact__desc { line-height: 1.75; }

        .contact__options { display: flex; flex-direction: column; gap: 12px; }
        .contact__opt {
          display: flex; align-items: center; gap: 16px;
          padding: 16px 20px;
          text-decoration: none;
          color: var(--color-white);
          transition: var(--transition-smooth);
        }
        .contact__opt:hover { border-color: rgba(37,99,235,0.3); transform: translateX(4px); }
        .contact__opt-icon {
          width: 44px; height: 44px;
          border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .contact__opt-label { font-size: 0.78rem; color: var(--color-muted); font-family: var(--font-accent); }
        .contact__opt-val { font-weight: 600; font-size: 0.9rem; }
        .contact__opt > svg { margin-left: auto; flex-shrink: 0; }

        .contact__tagline {
          padding: 24px 28px;
          position: relative;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.15rem;
          line-height: 1.4;
        }
        .contact__tagline-q {
          position: absolute; top: 8px; left: 16px;
          font-size: 4rem; line-height: 1; color: rgba(37,99,235,0.2);
          font-family: Georgia, serif;
        }
        .contact__tagline-sub { font-size: 0.78rem; color: var(--color-muted); margin-top: 8px; font-weight: 500; font-family: var(--font-body); }

        /* Form */
        .contact__form-card { padding: 40px; }
        .contact__form-title { font-family: var(--font-heading); font-size: 1.3rem; font-weight: 700; margin-bottom: 6px; }
        .contact__form-sub { font-size: 0.875rem; margin-bottom: 28px; }

        .contact__form { display: flex; flex-direction: column; gap: 18px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group label { font-size: 0.82rem; font-weight: 600; font-family: var(--font-accent); color: var(--color-muted); letter-spacing: 0.04em; }
        .req { color: var(--color-gold); }
        .form-input {
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          color: var(--color-white);
          font-family: var(--font-body);
          font-size: 0.95rem;
          padding: 12px 16px;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
          width: 100%;
        }
        .form-input:focus {
          border-color: rgba(37,99,235,0.5);
          box-shadow: 0 0 0 3px rgba(37,99,235,0.15);
        }
        .form-input::placeholder { color: rgba(148,163,184,0.5); }
        .form-select { cursor: pointer; }
        .form-select option { background: var(--color-primary); }
        .form-textarea { resize: vertical; min-height: 110px; }
        .contact__error {
          padding: 12px 16px;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.25);
          border-radius: var(--radius-md);
          color: #FCA5A5;
          font-size: 0.875rem;
        }
        .contact__success {
          display: flex; flex-direction: column; align-items: center; gap: 16px;
          text-align: center; padding: 40px 20px;
        }
        .contact__success-icon { font-size: 3rem; }
        .contact__success h4 { font-family: var(--font-heading); font-size: 1.3rem; font-weight: 700; }
        .contact__success p { color: var(--color-muted); max-width: 300px; line-height: 1.6; }

        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin-slow 0.7s linear infinite;
        }

        @media (max-width: 1024px) {
          .contact__grid { grid-template-columns: 1fr; gap: 48px; }
        }
      `}</style>
    </section>
  );
}
