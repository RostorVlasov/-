import React, { useState } from 'react';
import { Phone, Mail, Send, ArrowUpRight, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createBitrixLead } from '../services/bitrix24';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: '',
  });
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [consentData, setConsentData] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ message: string; isError?: boolean } | null>(null);

  const handleTopicChange = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim()) return;

    if (!consentData) {
      setStatus({
        message: 'Для отправки заявки необходимо согласие на обработку персональных данных.',
        isError: true,
      });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const marketingNote = consentMarketing
        ? ' [Согласен на рекламные рассылки]'
        : ' [Без рекламных рассылок]';
      const consentNote = ' [Согласие на обработку ПД получено]';

      const res = await createBitrixLead({
        name: formData.name.trim(),
        contact: formData.contact.trim(),
        message: formData.message.trim() + consentNote + marketingNote,
        topics: selectedTopics,
      });

      if (res.success) {
        setStatus({
          message: 'Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.',
        });
        setFormData({ name: '', contact: '', message: '' });
        setSelectedTopics([]);
        setConsentData(false);
        setConsentMarketing(false);
      } else {
        setStatus({
          message: res.message || 'Произошла ошибка при отправке. Пожалуйста, напишите нам в Telegram или позвоните.',
          isError: true,
        });
      }
    } catch {
      setStatus({
        message: 'Не удалось отправить заявку. Пожалуйста, свяжитесь по телефону +7 993 116-47-72.',
        isError: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="final contact" id="contact">
      <div className="contact-head" style={{ width: '100%', maxWidth: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2
          className="reveal in-view"
          style={{
            textAlign: 'center',
            width: '100%',
            margin: '0 auto',
            display: 'block',
          }}
        >
          ПЕЧАТАЙТЕ<br />НЕОБЫЧНОЕ.
        </h2>
        <p className="lead reveal in-view d1" style={{ margin: '30px auto 0', textAlign: 'center' }}>
          Готовы заказать партию, подобрать оттенок под интерьер или обсудить
          специальные условия? Напишите нам — мы всегда на связи.
        </p>
      </div>

      <div className="contacts-block reveal in-view d2">
        <a href="tel:+79931164772" className="contact-item">
          <span className="i">
            <Phone />
          </span>
          <span className="label">
            <small>Позвонить</small>
            +7 993 116-47-72
          </span>
          <span className="i arrow">
            <ArrowUpRight />
          </span>
        </a>

        <a href="mailto:hello@kotmone.ru" className="contact-item">
          <span className="i">
            <Mail />
          </span>
          <span className="label">
            <small>Почта</small>
            hello@kotmone.ru
          </span>
          <span className="i arrow">
            <ArrowUpRight />
          </span>
        </a>

        <a href="https://t.me/kotmone" target="_blank" rel="noreferrer" className="contact-item">
          <span className="i">
            <Send />
          </span>
          <span className="label">
            <small>Telegram</small>
            @kotmone
          </span>
          <span className="i arrow">
            <ArrowUpRight />
          </span>
        </a>
      </div>

      <div className="lead-form-title reveal in-view d3">Оставить заявку</div>
      <p className="lead-form-sub reveal in-view d3">
        Расскажите, что вас интересует — пришлём каталог, образцы или подберём цвет под задачу.
      </p>

      <form className="contact-form reveal in-view d3" onSubmit={handleSubmit}>
        <div className="form-chips">
          <label>
            <input
              type="checkbox"
              name="topic"
              value="catalog"
              checked={selectedTopics.includes('Весь каталог цветов')}
              onChange={() => handleTopicChange('Весь каталог цветов')}
            />
            <span>Весь каталог цветов</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="topic"
              value="samples"
              checked={selectedTopics.includes('Образцы цвета')}
              onChange={() => handleTopicChange('Образцы цвета')}
            />
            <span>Образцы цвета</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="topic"
              value="batch"
              checked={selectedTopics.includes('Заказ партии')}
              onChange={() => handleTopicChange('Заказ партии')}
            />
            <span>Заказ партии</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="topic"
              value="partner"
              checked={selectedTopics.includes('Сотрудничество / Опт')}
              onChange={() => handleTopicChange('Сотрудничество / Опт')}
            />
            <span>Сотрудничество / Опт</span>
          </label>
        </div>

        <input
          type="text"
          name="name"
          placeholder="Как вас зовут"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Email или телефон (+7 993 116-47-72)"
          value={formData.contact}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          required
        />
        <textarea
          name="message"
          placeholder="Что печатаете, какие цвета интересуют или адрес доставки"
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        ></textarea>

        {/* Legal Consent Checkboxes */}
        <div className="legal-checkboxes">
          <label className="legal-checkbox-row">
            <input
              type="checkbox"
              required
              checked={consentData}
              onChange={(e) => setConsentData(e.target.checked)}
              className="legal-checkbox-input"
            />
            <span className="legal-checkbox-text">
              Я даю согласие на <strong>обработку персональных данных</strong> (хранение, составление договора, передачу в службы доставки) в соответствии с{' '}
              <Link
                to="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="legal-link"
              >
                Политикой конфиденциальности
              </Link>
              <span className="req-star" title="Обязательно">*</span>
            </span>
          </label>

          <label className="legal-checkbox-row">
            <input
              type="checkbox"
              checked={consentMarketing}
              onChange={(e) => setConsentMarketing(e.target.checked)}
              className="legal-checkbox-input"
            />
            <span className="legal-checkbox-text">
              Я согласен получать новости, информацию о выходе новых оттенков филамента и рекламные рассылки
            </span>
          </label>
        </div>

        <button
          className="cta form-submit btn-anim"
          type="submit"
          disabled={isSubmitting || !consentData}
          style={{
            opacity: isSubmitting || !consentData ? 0.65 : 1,
            cursor: isSubmitting || !consentData ? 'not-allowed' : 'pointer',
          }}
        >
          {isSubmitting ? 'Отправляем...' : 'Отправить заявку'}
          <span className="i">
            {isSubmitting ? <Loader2 className="animate-spin" /> : <ArrowRight />}
          </span>
        </button>

        {status && (
          <div
            className="form-status"
            style={{
              color: status.isError ? '#d32f2f' : '#31564c',
              fontWeight: 500,
              marginTop: '12px',
            }}
          >
            {status.message}
          </div>
        )}
      </form>

      {/* Operator & Legal Footer */}
      <footer className="contact-footer reveal in-view d3">
        <div className="operator-summary">
          <p>
            <strong>Оператор персональных данных:</strong> ИП Юнах Елизавета Игоревна &bull; ИНН: 231520459100 &bull; ОГРНИП: 320302500034997
          </p>
          <p>
            Телефон: <a href="tel:+79931164772">+7 993 116-47-72</a> &bull; Email: <a href="mailto:hello@kotmone.ru">hello@kotmone.ru</a>
          </p>
          <p className="privacy-footer-link-wrap">
            <Link to="/privacy" className="privacy-modal-trigger">
              Политика конфиденциальности и обработки персональных данных
            </Link>
          </p>
        </div>
      </footer>
    </section>
  );
};
