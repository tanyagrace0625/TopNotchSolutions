'use client';

import { useEffect, useState } from 'react';

export default function GlobalProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div className="site-progress" aria-hidden="true">
      <div className="site-progress__fill" style={{ width: `${progress}%` }} />
      <div className="site-progress__glow" style={{ left: `${progress}%` }} />
    </div>
  );
}
