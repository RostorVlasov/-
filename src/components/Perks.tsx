import React from 'react';
import { Palette, Ruler, Package, ShieldCheck, Layers } from 'lucide-react';

export const Perks: React.FC = () => {
  return (
    <section className="perks" id="perks">
      <div className="perks-head">
        <h2 className="perks-title reveal in-view">ЗАЧЕМ ЭТО ВАМ.</h2>
        <p className="reveal in-view d1">
          Пять вещей, которые отличают катушку от катушки, когда дело доходит до реальной печати.
        </p>
      </div>

      <div className="perks-bento">
        <article className="perk perk-big reveal in-view">
          <div className="bwheel" aria-hidden="true"></div>
          <div className="perk-head">
            <span className="perk-num">01 / ЦВЕТ</span>
            <span className="perk-icon">
              <span className="i"><Palette /></span>
            </span>
          </div>
          <div className="perk-body">
            <h3 className="perk-title">RAL<br />или Pantone.</h3>
            <p className="perk-text">
              Подберём и сварим цвет под задачу — по каталогу RAL или Pantone, а не только из готовой палитры. Присылаем образец до партии.
            </p>
          </div>
        </article>

        <article className="perk perk-b2 reveal in-view d1">
          <div className="perk-head">
            <span className="perk-num">02 / ТОЧНОСТЬ</span>
            <span className="perk-icon">
              <span className="i"><Ruler /></span>
            </span>
          </div>
          <div className="perk-body">
            <h3 className="perk-title">± 0,02 мм.</h3>
            <p className="perk-text">
              Жёсткий контроль диаметра прутка на всей катушке — меньше засоров и пропусков экструзии.
            </p>
          </div>
        </article>

        <article className="perk perk-b3 reveal in-view d2">
          <div className="perk-head">
            <span className="perk-num">03 / ГИБКОСТЬ</span>
            <span className="perk-icon">
              <span className="i"><Package /></span>
            </span>
          </div>
          <div className="perk-body">
            <h3 className="perk-title">От 1 катушки.</h3>
            <p className="perk-text">
              Тестовая катушка перед оптовым заказом — без минимальных партий на пробу цвета.
            </p>
          </div>
        </article>

        <article className="perk perk-b4 reveal in-view d3">
          <div className="perk-head">
            <span className="perk-num">04 / ХРАНЕНИЕ</span>
            <span className="perk-icon">
              <span className="i"><ShieldCheck /></span>
            </span>
          </div>
          <div className="perk-body">
            <h3 className="perk-title">Вакуумная упаковка.</h3>
            <p className="perk-text">
              Катушка запаяна с осушителем — филамент не тянет влагу на складе и в пути.
            </p>
          </div>
        </article>

        <article className="perk perk-b5 reveal in-view d4">
          <div className="perk-head">
            <span className="perk-num">05 / ПЕЧАТЬ</span>
            <span className="perk-icon">
              <span className="i"><Layers /></span>
            </span>
          </div>
          <div className="perk-body">
            <h3 className="perk-title">Виток к витку.</h3>
            <p className="perk-text">
              Ровная намотка без перехлёстов — катушка спокойно отрабатывает в AMS и CFS без вмешательства.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};
