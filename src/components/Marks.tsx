import React, { useEffect, useRef } from 'react';

export const Marks: React.FC = () => {
  const paintARef = useRef<HTMLDivElement>(null);
  const paintBRef = useRef<HTMLDivElement>(null);
  const paintCRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const sy = window.scrollY;
          if (paintARef.current) {
            paintARef.current.style.transform = `translate(${-sy * 0.025}px, ${sy * 0.018}px) rotate(-7deg)`;
          }
          if (paintBRef.current) {
            paintBRef.current.style.transform = `translate(${sy * 0.025}px, ${sy * 2 * 0.018}px) rotate(8deg)`;
          }
          if (paintCRef.current) {
            paintCRef.current.style.transform = `translate(${-sy * 0.025}px, ${sy * 3 * 0.018}px) rotate(-12deg)`;
          }
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="marks">
      <div ref={paintARef} className="paint a"></div>
      <div ref={paintBRef} className="paint b"></div>
      <div ref={paintCRef} className="paint c"></div>
      <div className="mark one"></div>
      <div className="mark two"></div>
      <div className="mark three"></div>
    </div>
  );
};
