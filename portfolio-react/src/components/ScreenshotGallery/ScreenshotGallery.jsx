import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './ScreenshotGallery.css';

const ScreenshotGallery = ({ shots, title }) => {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const go = useCallback(
    (step) => setActive(i => (i + step + shots.length) % shots.length),
    [shots.length]
  );

  /* Keyboard controls while the lightbox is open */
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, go]);

  if (!shots?.length) return null;
  const current = shots[active];

  return (
    <div className="sg">
      <div className="sg-stage">
        <button className="sg-stage__img-btn" onClick={() => setLightbox(true)} aria-label="Open full size">
          <img src={current.src} alt={`${title} — ${current.caption}`} className="sg-stage__img" />
        </button>
        {shots.length > 1 && (
          <>
            <button className="sg-nav sg-nav--prev" onClick={() => go(-1)} aria-label="Previous screenshot">‹</button>
            <button className="sg-nav sg-nav--next" onClick={() => go(1)} aria-label="Next screenshot">›</button>
          </>
        )}
      </div>

      <p className="sg-caption">
        <span className="sg-caption__count">{active + 1} / {shots.length}</span>
        {current.caption}
      </p>

      {shots.length > 1 && (
        <div className="sg-thumbs">
          {shots.map((s, i) => (
            <button
              key={s.src}
              className={`sg-thumb${i === active ? ' sg-thumb--active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={s.caption}
            >
              <img src={s.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <div className="sg-lightbox" onClick={() => setLightbox(false)} role="dialog" aria-modal="true">
          <img
            src={current.src}
            alt={`${title} — ${current.caption}`}
            className="sg-lightbox__img"
            onClick={e => e.stopPropagation()}
          />
          <p className="sg-lightbox__caption">{current.caption}</p>
          <button className="sg-lightbox__close" onClick={() => setLightbox(false)} aria-label="Close">✕</button>
          {shots.length > 1 && (
            <>
              <button className="sg-nav sg-nav--prev sg-nav--fixed" onClick={e => { e.stopPropagation(); go(-1); }} aria-label="Previous screenshot">‹</button>
              <button className="sg-nav sg-nav--next sg-nav--fixed" onClick={e => { e.stopPropagation(); go(1); }} aria-label="Next screenshot">›</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

ScreenshotGallery.propTypes = {
  shots: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    caption: PropTypes.string,
  })).isRequired,
  title: PropTypes.string.isRequired,
};

export default ScreenshotGallery;
