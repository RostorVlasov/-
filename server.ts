import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// In AI Studio preview environment, DEFAULT_APP_PORT is 3000 and internal reverse proxy expects port 3000.
// In standalone production server / custom deployment, the site runs on port 2026 by default.
const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.DEFAULT_APP_PORT && isDev
  ? 3000
  : Number(process.env.PORT || 2026);

// Bitrix24 Webhook URL is kept strictly server-side. It is NEVER exposed to the frontend.
const BITRIX24_WEBHOOK_URL =
  process.env.BITRIX24_WEBHOOK_URL ||
  'https://b24-dakcpn.bitrix24.ru/rest/74/loxxe0nb4o344nz3/crm.lead.add.json';

// Server-side proxy for creating Bitrix24 leads
app.post('/api/lead', async (req, res) => {
  try {
    const { name, contact, message, topics } = req.body || {};

    if (!contact || typeof contact !== 'string' || !contact.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Не указан контакт для связи (телефон или email).',
      });
    }

    const cleanName = typeof name === 'string' && name.trim() ? name.trim() : 'Посетитель с сайта';
    const cleanContact = contact.trim();
    const cleanMessage = typeof message === 'string' ? message.trim() : '';
    const cleanTopics = Array.isArray(topics) ? topics.filter(Boolean) : [];

    const isEmail = cleanContact.includes('@');
    const topicsText = cleanTopics.length > 0 ? `Интересует: ${cleanTopics.join(', ')}` : '';
    const comments = [topicsText, cleanMessage].filter(Boolean).join('\n\n');

    const bitrixFields: Record<string, unknown> = {
      TITLE: `Заявка с сайта Кот Моне: ${cleanName}`,
      NAME: cleanName,
      COMMENTS: comments,
      SOURCE_ID: 'WEB',
      STATUS_ID: 'NEW',
    };

    if (isEmail) {
      bitrixFields.EMAIL = [{ VALUE: cleanContact, VALUE_TYPE: 'WORK' }];
    } else {
      bitrixFields.PHONE = [{ VALUE: cleanContact, VALUE_TYPE: 'WORK' }];
    }

    const response = await fetch(BITRIX24_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: bitrixFields,
        params: { REGISTER_SONET_EVENT: 'Y' },
      }),
    });

    const data = (await response.json().catch(() => ({}))) as {
      result?: number;
      error?: string;
      error_description?: string;
    };

    if (response.ok && data.result) {
      return res.json({ success: true, leadId: data.result });
    }

    console.error('[Bitrix24 Error]', data.error || response.statusText, data.error_description);
    return res.status(502).json({
      success: false,
      message: 'Не удалось передать заявку в CRM. Пожалуйста, напишите нам в Telegram или позвоните.',
    });
  } catch (error) {
    console.error('[Server Lead Error]', error);
    return res.status(500).json({
      success: false,
      message: 'Ошибка при отправке заявки на сервере. Пожалуйста, свяжитесь по телефону +7 993 116-47-72.',
    });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', port: PORT, mode: isDev ? 'development' : 'production' });
});

// Client serving setup: Vite middleware in dev, static build in prod
if (isDev) {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  const distPath = path.resolve(__dirname, 'dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Кот Моне Server] Running on http://0.0.0.0:${PORT} (${isDev ? 'development' : 'production'})`);
});
