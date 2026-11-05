'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const exitTimerRef = useRef(null);

  const dismiss = useCallback(() => {
    setLeaving(true);
    exitTimerRef.current = window.setTimeout(() => {
      setVisible(false);
      document.body.classList.remove('preloader-active');
    }, 650);
  }, []);

  useEffect(() => {
    document.body.classList.add('preloader-active');

    const dismissTimer = window.setTimeout(dismiss, 2600);
    return () => {
      window.clearTimeout(dismissTimer);
      if (exitTimerRef.current) window.clearTimeout(exitTimerRef.current);
      document.body.classList.remove('preloader-active');
    };
  }, [dismiss]);

  if (!visible) return null;

  return (
    <div className={`preloader ${leaving ? 'preloader--leaving' : ''}`} role="status" aria-label="Loading TopNotch">
      <div className="preloader__grid" />
      <div className="preloader__halo preloader__halo--one" />
      <div className="preloader__halo preloader__halo--two" />

      <div className="preloader__content">
        <div className="preloader__eyebrow">
          <span className="preloader__eyebrow-line" />
          <span>Business support · managed digital services</span>
          <span className="preloader__eyebrow-line" />
        </div>

        <div className="preloader__logo-wrap">
          <div className="preloader__logo-glow" />
          <img className="preloader__logo" src="/logo.png" alt="TopNotch Solutions" />
        </div>

        <p className="preloader__tagline">The right team, already in motion.</p>

        <div className="preloader__progress" aria-hidden="true">
          <div className="preloader__progress-bar" />
        </div>
        <div className="preloader__meta">
          <span>Preparing your experience</span>
          <span>TOP / 01</span>
        </div>
      </div>

      <button className="preloader__skip" type="button" onClick={dismiss}>
        Skip intro <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}
