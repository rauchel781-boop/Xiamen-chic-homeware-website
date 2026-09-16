'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Interactive product gallery: click a thumbnail (or use the arrows / the
// left-right keys) to change the main image.
//
// Two things to know if you touch this file:
//
//  1. The main image uses `fill` + `object-fit: contain`, NOT a width/height
//     pair with `height: auto`. An inline height:auto beats the stylesheet,
//     which left the <img> sized by its own aspect ratio inside a square
//     container — so a PORTRAIT photo overflowed and got clipped, and
//     object-fit never applied because the box was never constrained. Most
//     of our product photography is portrait, so that mattered.
//
//  2. Thumbnails are <button>s, not divs. They have to be reachable by
//     keyboard, and a div with an onClick is not.

const CSS = `
.gal {
  --gal-border: #E5E7EB;
  --gal-accent: #2C5E3F;
  --gal-surface: #F5F5F4;
  display: flex; flex-direction: column; gap: 14px;
}
.gal-main {
  position: relative;
  aspect-ratio: 1 / 1;
  background: var(--gal-surface);
  border: 1px solid var(--gal-border);
  border-radius: 12px;
  overflow: hidden;
}
.gal-main img { object-fit: contain; background: #fff; }
.gal-counter {
  position: absolute;
  bottom: 12px; right: 14px;
  background: rgba(26,26,26,0.72);
  color: #fff;
  padding: 4px 10px;
  font-size: 0.7rem;
  letter-spacing: 1.5px;
  border-radius: 999px;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  pointer-events: none;
}
.gal-thumbs {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}
.gal-thumb {
  position: relative;
  aspect-ratio: 1 / 1;
  background: var(--gal-surface);
  border: 1px solid var(--gal-border);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  transition: border-color .15s, box-shadow .15s;
}
.gal-thumb img { object-fit: cover; }
.gal-thumb:hover { border-color: var(--gal-accent); }
.gal-thumb:focus-visible {
  outline: 2px solid var(--gal-accent);
  outline-offset: 2px;
}
.gal-thumb.is-active {
  border-color: var(--gal-accent);
  box-shadow: inset 0 0 0 2px var(--gal-accent);
}
.gal-arrow {
  position: absolute;
  top: 50%; transform: translateY(-50%);
  width: 38px; height: 38px;
  border: 1px solid var(--gal-border);
  background: rgba(255,255,255,0.88);
  color: var(--gal-accent);
  font-size: 1.4rem;
  cursor: pointer;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  transition: background .15s, transform .15s;
  font-family: inherit; line-height: 1; padding: 0;
}
.gal-arrow:hover { background: #fff; transform: translateY(-50%) scale(1.05); }
.gal-arrow:focus-visible { outline: 2px solid var(--gal-accent); outline-offset: 2px; }
.gal-prev { left: 12px; }
.gal-next { right: 12px; }

@media (max-width: 640px) {
  .gal-thumbs { grid-template-columns: repeat(4, 1fr); }
  .gal-arrow { width: 32px; height: 32px; font-size: 1.2rem; }
}
`;

export default function ProductGallery({ images, name }) {
  const [idx, setIdx] = useState(0);
  const rootRef = useRef(null);
  const list = (images || []).filter(Boolean);
  const total = list.length;

  // Left/right keys move through the gallery, but only while the focus is
  // inside it — otherwise we would hijack arrow keys for the whole page.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || total < 2) return;
    const onKey = (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      if (!el.contains(document.activeElement)) return;
      e.preventDefault();
      setIdx((i) => (i + (e.key === 'ArrowRight' ? 1 : -1) + total) % total);
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [total]);

  if (total === 0) return null;

  const go = (i) => setIdx(((i % total) + total) % total);

  return (
    <div className="gal" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="gal-main">
        <Image
          key={list[idx]}
          src={list[idx]}
          alt={`${name} — view ${idx + 1} of ${total}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={idx === 0}
        />
        {total > 1 && (
          <>
            <button className="gal-arrow gal-prev" onClick={() => go(idx - 1)} type="button" aria-label="Previous image">‹</button>
            <button className="gal-arrow gal-next" onClick={() => go(idx + 1)} type="button" aria-label="Next image">›</button>
            <div className="gal-counter">{idx + 1} / {total}</div>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="gal-thumbs">
          {list.map((src, i) => (
            <button
              key={src}
              className={`gal-thumb${i === idx ? ' is-active' : ''}`}
              onClick={() => setIdx(i)}
              type="button"
              aria-label={`Show image ${i + 1} of ${total}`}
              aria-current={i === idx ? 'true' : undefined}
            >
              <Image src={src} alt="" fill sizes="(max-width: 640px) 25vw, 110px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
