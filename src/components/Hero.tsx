import React, { useEffect, useRef } from 'react';
import { Sparkles, ArrowDown } from 'lucide-react';
import reel11 from '../assets/images/11.png';

export const Hero: React.FC = () => {
  const reelRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let ticking = false;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;

      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          if (reelRef.current) {
            reelRef.current.style.transform = `translate(${mouseX * 18}px, ${mouseY * 18}px) rotate(${7 + mouseX * 3}deg)`;
          }
          ticking = false;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="kicker reveal in-view">
          <span className="i">
            <Sparkles />
          </span>
          Филамент для творчества.
        </div>
        <h1 className="reveal in-view d1">НЕОБЫЧНЫЙ.</h1>
        <div className="hero-sub reveal in-view d2">
          Цвета, которые не хочется прятать в каталоге.{' '}
          <strong>Кот Моне</strong> — филамент для тех,
          кто печатает не по шаблону.
        </div>
        <div className="scroll-note reveal in-view d3">
          <span className="scroll-line"></span>
          <span className="i">
            <ArrowDown />
          </span>
          Листайте, чтобы увидеть цвет.
        </div>
      </div>

      <div className="hero-art reveal in-view d2">
        <img
          ref={reelRef}
          className="reel"
          id="heroReel"
          src={reel11}
          alt="Кот Моне — Медная вишня"
        />
      </div>
    </section>
  );
};
