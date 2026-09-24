import React from 'react';

export const Intro: React.FC = () => {
  return (
    <section className="intro">
      <div className="intro-inner">
        <div className="outline reveal in-view">ЦВЕТ.</div>
        <p className="reveal in-view d1">
          Мы оставили интерфейс чёрно-белым,<br />
          чтобы цвет принадлежал самому филаменту.
        </p>
        <div className="intro-swatches reveal in-view d2">
          <a
            href="#colors"
            style={{ background: '#b8383e' }}
            title="Медная вишня"
            aria-label="Медная вишня"
          ></a>
          <a
            href="#colors"
            style={{ background: '#588554' }}
            title="Древний нефрит"
            aria-label="Древний нефрит"
          ></a>
          <a
            href="#colors"
            style={{ background: '#366970' }}
            title="Грозовое море"
            aria-label="Грозовое море"
          ></a>
          <a
            href="#colors"
            style={{
              background: 'linear-gradient(135deg, #b8383e 0%, #588554 50%, #366970 100%)',
            }}
            title="Вся палитра оттенков"
            aria-label="Вся палитра оттенков"
          ></a>
        </div>
        <div className="brush-reveal reveal in-view d3"></div>
      </div>
    </section>
  );
};
