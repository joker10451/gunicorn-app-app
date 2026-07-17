# LeadGid Universal Application — лендинг + коннектор (РФ)

Лендинг с формой заявки, который отправляет данные в «Универсальную заявку»
LeadGid через API `https://api.leadgid.com/universal/v1/ru/applications`.

## Стек
- Python 3 + Flask (бэкенд, прячет токен)
- Статический фронтенд (HTML/CSS/JS)
- Токен и настройки — в `.env` (не в коде)

## Установка
```bash
py -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

## Конфигурация (.env)
- `LEADGID_TOKEN` — ваш токен (уже заполнен)
- `LEADGID_OFFER_ID` — оставьте пустым для отправки на ВСЕ подходящие офферы
  (Универсальная заявка), либо укажите конкретный ID для фиксированной отправки

## Запуск (локально)
```bash
flask run --port 5000
# или
py app.py
```
Откройте http://localhost:5000

## Тестирование (без реальных лидов)
Отправка в `test-applications`:
```bash
curl -X POST http://localhost:5000/test-submit \
  -H "Content-Type: application/json" \
  -d '{"phone":"9119100002","first_name":"Иван","last_name":"Иванов","pers_data_consent":"on"}'
```

## Проверка статуса заявки
После успешной отправки LeadGid возвращает `id` (UUID). Статус:
- `GET /v1/ru/applications/status/{uuid}` — одна заявка
- `POST /v1/ru/applications/status` с телом `{"uuid":[...]}` — пакетно

## Соответствие 152-ФЗ
- Чекбокс согласия на обработку ПД обязателен (валидируется на сервере)
- Политика ПД доступна по `/privacy`
- В лог пишутся только метаданные (IP, phone без ПД, оффер) — не сами ПД

## Защита
- Токен только на сервере (не уходит в браузер)
- Honeypot-поле `company` против ботов
- Серверная валидация телефона и имён
