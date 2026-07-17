# LeadGid Universal Application — лендинг + коннектор (РФ)

Лендинг с формой заявки, который отправляет данные в «Универсальную заявку»
LeadGid через API `https://api.leadgid.com/universal/v1/ru/applications`.

## Стек
- Python 3 + Flask (бэкенд, прячет токен)
- Статический фронтенд (HTML/CSS/JS)
- Токен и настройки — в переменных окружения (`.env` локально / Vercel Dashboard)

## Деплой на Vercel (бесплатно, без карты)
1. Залейте репозиторий в GitHub
2. https://vercel.com → New Project → Import репозитория
3. Vercel автоматически определит Flask (ищет `app.py` с `app`)
4. В разделе **Environment Variables** добавьте:
   - `LEADGID_TOKEN` = ваш токен
   - `LEADGID_OFFER_ID` = *(пусто — Универсальная заявка на все офферы)*
5. Deploy → готово, получите `https://<project>.vercel.app`

Локально:
```bash
pip install -r requirements.txt
flask run
```

## Конфигурация
- `LEADGID_TOKEN` — ваш токен (в `.env` локально, в Dashboard на Vercel)
- `LEADGID_OFFER_ID` — пусто = все офферы, либо конкретный ID

## Тестирование (без реальных лидов)
`POST /test-submit` шлёт в `/v1/ru/test-applications`.

## Проверка статуса заявки
После отправки LeadGid возвращает `id` (UUID):
- `GET /v1/ru/applications/status/{uuid}` — одна заявка
- `POST /v1/ru/applications/status` с `{"uuid":[...]}` — пакетно

## Соответствие 152-ФЗ
- Чекбокс согласия на обработку ПД обязателен (валидируется на сервере)
- Политика ПД доступна по `/privacy`
- В лог пишутся только метаданные (IP, phone, оффер) — не сами ПД

## Защита
- Токен только на сервере
- Honeypot-поле `company` против ботов
- Серверная валидация телефона и имён

