# Инструкция по деплою сайта «Кот Моне» на сервер

## 1. Защита Bitrix24
Webhook Bitrix24 полностью вынесен на серверную часть (`/server.ts`) и скрыт за эндпоинтом `/api/lead`. 
В браузере посетителя и в клиентском JS-коде **нет никаких токенов, ключей и прямых ссылок на Битрикс24** — их невозможно скопировать через DevTools/Network/Sources.

---

## 2. Быстрый запуск через Docker (рекомендуется)

Сервер слушает порт **2026**.

```bash
# 1. Клонируйте проект или скопируйте файлы на сервер
cd /opt/kotmone

# 2. Запустите через Docker Compose
docker compose up -d --build
```

Сайт будет доступен по адресу: `http://ваш-ip-или-домен:2026`

---

## 3. Запуск без Docker (Node.js + PM2 / Systemd)

Требования: Node.js 20+ или 22+.

```bash
# 1. Установка зависимостей
npm install

# 2. Сборка фронтенда
npm run build

# 3. Запуск продакшн-сервера на порту 2026
npm start
```

### Запуск в фоне через PM2:
```bash
npm install -g pm2
pm2 start "npm start" --name "kotmone"
pm2 save
pm2 startup
```

---

## 4. Конфигурация Nginx (обратный прокси на порт 2026)

Если перед сайтом стоит Nginx:

```nginx
server {
    listen 80;
    server_name kotmone.ru www.kotmone.ru;

    location / {
        proxy_pass http://127.0.0.1:2026;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
