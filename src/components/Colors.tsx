import React, { useEffect, useRef, useState } from 'react';
import { Droplet, Sparkles, Flame, LayoutGrid, ArrowRight } from 'lucide-react';
import reel11 from '../assets/images/11.png';
import reel22 from '../assets/images/22.png';
import reel33 from '../assets/images/33.png';
import reel44 from '../assets/images/44.png';

export const Colors: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [curIndex, setCurIndex] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    let max = 0;
    let ticking = false;
    const total = 4;

    const measure = () => {
      max = Math.max(0, track.scrollWidth - window.innerWidth);
    };

    const update = () => {
      if (!wrap || !track) return;
      const rect = wrap.getBoundingClientRect();
      const dist = wrap.offsetHeight - window.innerHeight;

      let p = dist > 0 ? -rect.top / dist : 0;
      p = Math.max(0, Math.min(1, p));

      track.style.transform = `translate3d(${-p * max}px, 0, 0)`;

      const idx = Math.min(total - 1, Math.floor(p * total * 0.9999));
      setCurIndex(idx);

      const winW = window.innerWidth || 1;
      const scrollRatio = winW > 0 ? max / winW : 0;

      for (let i = 0; i < total; i++) {
        const v = imgRefs.current[i];
        if (!v) continue;
        const off = i - p * scrollRatio;
        v.style.transform = `translate3d(${off * -42}px, ${off * 14}px, 0) rotate(${off * -4}deg)`;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
      }
    };

    measure();
    update();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      measure();
      update();
    }, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollToCard = (index: number) => {
    if (!wrapRef.current) return;
    const wrapRect = wrapRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const dist = wrapRef.current.offsetHeight - window.innerHeight;
    const target = scrollTop + wrapRect.top + (index / 3) * dist;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  const currentNumStr = String(curIndex + 1).padStart(2, '0');

  return (
    <section className="colors" id="colors">
      <div className="colors-head">
        <h2 className="reveal in-view">ПАЛИТРА.</h2>
        <p className="reveal in-view d1">
          Здесь представлены лишь некоторые из наших оттенков — в каталоге их гораздо больше! Каждый цвет наделён своим характером и безупречной глубиной.
        </p>
      </div>

      <div className="colors-scroll" id="colorsScroll" ref={wrapRef}>
        <div className="colors-sticky">
          <div className="colors-track" id="colorsTrack" ref={trackRef}>
            {/* 01: Медная вишня */}
            <article className="color-card" data-num="01" style={{ '--c': '184,56,62' } as React.CSSProperties}>
              <div className="color-card-bg"></div>
              <div className="color-card-info">
                <div className="number">
                  <span className="i"><Flame /></span>01 / PETG
                </div>
                <h3 className="color-name">МЕДНАЯ<br />ВИШНЯ.</h3>
                <div className="color-meta">
                  Глубокий оттенок спелой вишни с тёплым медным отблеском. Изысканный, сочный и выразительный в готовых изделиях.
                </div>
                <div className="swatch" style={{ background: '#b8383e' }} title="Медная вишня"></div>
              </div>
              <div className="color-card-visual">
                <img
                  ref={(el) => { imgRefs.current[0] = el; }}
                  src={reel11}
                  alt="Медная вишня"
                />
              </div>
            </article>

            {/* 02: Древний нефрит */}
            <article className="color-card" data-num="02" style={{ '--c': '88,133,84' } as React.CSSProperties}>
              <div className="color-card-bg"></div>
              <div className="color-card-info">
                <div className="number">
                  <span className="i"><Sparkles /></span>02 / PETG
                </div>
                <h3 className="color-name">ДРЕВНИЙ<br />НЕФРИТ.</h3>
                <div className="color-meta">
                  Мистический глубокий нефритовый оттенок с мягким минеральным отливом. Спокойный, природный и шелковистый.
                </div>
                <div className="swatch" style={{ background: '#588554' }} title="Древний нефрит"></div>
              </div>
              <div className="color-card-visual">
                <img
                  ref={(el) => { imgRefs.current[1] = el; }}
                  src={reel22}
                  alt="Древний нефрит"
                />
              </div>
            </article>

            {/* 03: Грозовое море */}
            <article className="color-card" data-num="03" style={{ '--c': '54,105,112' } as React.CSSProperties}>
              <div className="color-card-bg"></div>
              <div className="color-card-info">
                <div className="number">
                  <span className="i"><Droplet /></span>03 / PETG
                </div>
                <h3 className="color-name">ГРОЗОВОЕ<br />МОРЕ.</h3>
                <div className="color-meta">
                  Глубокий тёмно-сизый оттенок свинцовых морских волн перед штормом. Сдержанный, строгий и благородный.
                </div>
                <div className="swatch" style={{ background: '#366970' }} title="Грозовое море"></div>
              </div>
              <div className="color-card-visual">
                <img
                  ref={(el) => { imgRefs.current[2] = el; }}
                  src={reel33}
                  alt="Грозовое море"
                />
              </div>
            </article>

            {/* 04: Каталог */}
            <article className="color-card" data-num="04" data-rainbow style={{ '--c': '49,86,76' } as React.CSSProperties}>
              <div className="color-card-bg"></div>
              <div className="color-card-info">
                <div className="number">
                  <span className="i"><LayoutGrid /></span>04 / КАТАЛОГ
                </div>
                <h3 className="color-name">ДРУГИХ<br />БОЛЬШЕ!</h3>
                <div className="color-meta">
                  Это только одни из цветов — в каталоге их намного больше! Оставьте заявку, чтобы получить полную палитру и образцы.
                </div>
                <a href="#contact" className="catalog-link btn-anim">
                  Смотреть весь каталог
                  <span className="i"><ArrowRight /></span>
                </a>
                <div className="swatch swatch--rainbow" title="Полная палитра"></div>
              </div>
              <div className="color-card-visual">
                <img
                  ref={(el) => { imgRefs.current[3] = el; }}
                  src={reel44}
                  alt="Полная палитра"
                />
              </div>
            </article>
          </div>

          <div className="colors-ui">
            <span className="colors-count">
              <b id="colorsCur">{currentNumStr}</b> / 04
            </span>
            <div className="colors-dots" id="colorsDots" aria-hidden="true">
              {[0, 1, 2, 3].map((idx) => (
                <span
                  key={idx}
                  className={`dot ${curIndex === idx ? 'active' : ''}`}
                  onClick={() => scrollToCard(idx)}
                />
              ))}
            </div>
            <span className="colors-hint">Скролл → цвет</span>
          </div>
        </div>
      </div>
    </section>
  );
};
