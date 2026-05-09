'use client';
import { useState, useEffect } from 'react';

const SLIDES = [
  { src: '/factory/wooden-box-4.jpg', label: 'Bulk Production' },
  { src: '/wooden-box-5.jpg', label: 'Drawer Box Assembly' },
  { src: '/factory/wooden-box-6.jpg', label: 'Multi-Drawer Cabinets' },
  { src: '/wooden-box-7.jpg', label: 'Final Packaging' },
  { src: '/wooden-box-8.jpg', label: 'Storage Series' },
  { src: '/wooden-box-9.jpg', label: 'Burnt Pine Boxes' },
  { src: '/wooden-box-10.jpg', label: 'Glass-Top Display Box' },
  { src: '/wooden-box-1.jpg', label: 'Acacia Wall Holder' },
];

export default function IntroCarousel() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), 3800);
    return () => clearInterval(id);
  }, [paused]);

  const go = (i) => setIdx(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);

  return (
    <div
      className="ic-wrap"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="ic-track"
        style={{ transform: `translateX(-${idx * 100}%)` }}
      >
        {SLIDES.map((s, i) => (
          <div className="ic-slide" key={i}>
            <img
              src={s.src}
              alt={s.label}
              loading={i === 0 ? 'eager' : 'lazy'} width="1200" height="900"
            />
            <div className="ic-overlay" />
            <div className="ic-caption">
              <div className="ic-num">
                {String(i + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
              </div>
              <div className="ic-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="ic-arrow ic-prev"
        onClick={() => go(idx - 1)}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        className="ic-arrow ic-next"
        onClick={() => go(idx + 1)}
        aria-label="Next slide"
      >
        ›
      </button>

      <div className="ic-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`ic-dot ${i === idx ? 'is-active' : ''}`}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="ic-tag">Xiamen + Cao County · China</div>
    </div>
  );
}
