import React from 'react';
import { Box, Ruler, Weight, Layers, Shield, Cpu } from 'lucide-react';

export const Tech: React.FC = () => {
  return (
    <section className="tech" id="tech">
      <div>
        <h2 className="tech-title reveal in-view">
          МАТЕРИАЛ<br />ВНУТРИ.
        </h2>

        <div className="spec reveal in-view d1">
          <span className="spec-num">01</span>
          <span className="spec-icon">
            <span className="i"><Box /></span>
          </span>
          <span className="spec-value">PETG</span>
          <span className="spec-note">Материал</span>
        </div>

        <div className="spec reveal in-view d2">
          <span className="spec-num">02</span>
          <span className="spec-icon">
            <span className="i"><Ruler /></span>
          </span>
          <span className="spec-value">1,75 мм</span>
          <span className="spec-note">Диаметр</span>
        </div>

        <div className="spec reveal in-view d3">
          <span className="spec-num">03</span>
          <span className="spec-icon">
            <span className="i"><Weight /></span>
          </span>
          <span className="spec-value">1 кг, 300 г</span>
          <span className="spec-note">Вес катушки</span>
        </div>

        <div className="spec reveal in-view d4">
          <span className="spec-num">04</span>
          <span className="spec-icon">
            <span className="i"><Layers /></span>
          </span>
          <span className="spec-value">Виток к витку</span>
          <span className="spec-note">Намотка</span>
        </div>

        <div className="spec reveal in-view d5">
          <span className="spec-num">05</span>
          <span className="spec-icon">
            <span className="i"><Shield /></span>
          </span>
          <span className="spec-value">Сухой (в вакууме)</span>
          <span className="spec-note">Состояние</span>
        </div>

        <div className="spec reveal in-view d6">
          <span className="spec-num">06</span>
          <span className="spec-icon">
            <span className="i"><Cpu /></span>
          </span>
          <span className="spec-value">AMS / CFS</span>
          <span className="spec-note">Совместимость</span>
        </div>
      </div>
    </section>
  );
};
