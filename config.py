import os

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# === LeadGid Universal Application API (Россия) ===
# Токен берётся из переменной окружения. Никогда не коммитьте токен в git.
LEADGID_TOKEN = os.environ.get("LEADGID_TOKEN", "")

# Базовый endpoint из документации
LEADGID_ENDPOINT = "https://api.leadgid.com/universal/v1/ru/applications"

# Оставьте пустым ("") или значением none/null/0 для отправки на ВСЕ
# подходящие офферы (Универсальная заявка). Либо укажите конкретный ID оффера
# для фиксированной отправки. Значения-заглушки нужны, т.к. Vercel не даёт
# сохранять по-настоящему пустую переменную окружения.
_raw_offer = (os.environ.get("LEADGID_OFFER_ID", "") or "").strip().lower()
OFFER_ID = "" if _raw_offer in ("", "none", "null", "0", "false") else _raw_offer

# Имя скрытого honeypot-поля (защита от ботов)
SECRET_HONEYPOT = "company"

# Лог заявок (без персональных данных)
LOG_FILE = os.path.join(BASE_DIR, "logs", "leads.log")
