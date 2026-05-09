'use client';
import { useState } from 'react';

const CSS = `
.gal {
  --gal-border: #DDE5EE;
  --gal-blue-warm: #4A8AC4;
  --gal-cream: #EFF5FB;
  display: flex; flex-direction: column; gap: 14px;
}
.gal-main {
  position: relative;
  aspect-ratio: 1 / 1;
  background: var(--gal-cream);
  border: 1px solid var(--gal-border);
  border-radius: 4px;
  overflow: hidden;
}
.gal-main img {
  width: 100%; height: 100%;
  object-fit: contain;
  display: block;
  background: white;
}
.gal-counter {
  position: absolute;
  bottom: 12px; right: 14px;
  background: rgba(14,30,61,0.78);
  color: white;
  padding: 4px 10px;
  font-size: 0.7rem;
  letter-spacing: 1.5px;
  border-radius: 2px;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}
.gal-thumbs {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
}
.gal-thumb {
  aspect-ratio: 1 / 1;
  background: var(--gal-cream);
  border: 1px solid var(--gal-border);
  border-radius: 3px;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  transition: border-color .15s, transform .15s;
  position: relative;
}
.gal-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.gal-thumb:hover { border-color: var(--gal-blue-warm); }
.gal-thumb.is-active { border-color: var(--gal-blue-warm); border-width: 2px; }
.gal-thumb.is-active::after {
  content: '';
  position: absolute; inset: 0;
  border: 1px solid rgba(74,138,196,0.3);
  border-radius: 3px;
  pointer-events: none;
}

.gal-arrow {
  position: absolute;
  top: 50%; transform: translateY(-50%);
  width: 38px; height: 38px;
  border: 1px solid var(--gal-border);
  background: rgba(255,255,255,0.85);
  color: #1E4A7B;
  font-size: 1.4rem;
  cursor: pointer;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  transition: background .15s, transform .15s;
  font-family: inherit; line-height: 1; padding: 0;
}
.gal-arrow:hover { background: white; transform: translateY(-50%) scale(1.05); }
.gal-prev { left: 12px; }
.gal-next { right: 12px; }

@media (max-width: 800px) {
  .gal-thumbs { grid-template-columns: repeat(5, 1fr); }
}
`;

export default function ProductGallery({ images, name }) {
  const [idx, setIdx] = useState(0);
  const total = images.length;

  if (total === 0) return null;

  const go = (i) => setIdx(((i % total) + total) % total);

  return (
    <div className="gal">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="gal-main">
        <img src={images[idx]} alt={`${name} — view ${idx + 1}`} width="1200" height="900" />
        {total > 1 && (
          <>
            <button
              className="gal-arrow gal-prev"
              onClick={() => go(idx - 1)}
              type="button"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              className="gal-arrow gal-next"
              onClick={() => go(idx + 1)}
              type="button"
              aria-label="Next image"
            >
              ›
            </button>
            <div className="gal-counter">
              {idx + 1} / {total}
            </div>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="gal-thumbs">
          {images.map((src, i) => (
            <button
              key={i}
              className={`gal-thumb${i === idx ? ' is-active' : ''}`}
              onClick={() => setIdx(i)}
              type="button"
              aria-label={`View image ${i + 1}`}
            >
              <img src={src} alt="" loading="lazy" width="1200" height="900" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
