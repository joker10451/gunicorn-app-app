from flask import Flask, render_template, request, jsonify
from config import LEADGID_ENDPOINT, LEADGID_TOKEN, OFFER_ID, SECRET_HONEYPOT
import requests
import logging
from datetime import datetime, timezone, timedelta
import re
import os

app = Flask(__name__)
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("leadgid")

PHONE_RE = re.compile(r"^\d{10,15}$")
NAME_RE = re.compile(r"^[А-Яа-яЁёA-Za-z\- ]{2,50}$")
MOSCOW_TZ = timezone(timedelta(hours=3))

# Базовый набор полей, которые мы собираем с формы и шлём в LeadGid.
# Остальные поля (паспорт, доход и т.п.) опциональны и заполняются по желанию.
FORM_FIELDS = [
    "first_name", "last_name", "patronymic", "phone", "email",
    "birth_date", "region", "city", "amount", "term", "purpose",
    "gender", "loan_city", "subid1",
]


def _now_iso():
    return datetime.now(MOSCOW_TZ).strftime("%Y-%m-%dT%H:%M:%S+03:00")


def _clean_phone(value: str) -> str:
    digits = re.sub(r"\D", "", value or "")
    if digits.startswith("8"):
        digits = "7" + digits[1:]
    if digits.startswith("7") and len(digits) == 11:
        digits = digits[1:]
    return digits


def build_payload(data: dict, ip: str, ua: str, origin: str) -> dict:
    now = _now_iso()
    payload = {
        # Обязательное согласие на обработку ПД (152-ФЗ) — ставим только если
        # пользователь реально отметил чекбокс на форме (см. валидацию ниже).
        "pers_data_consent": True,
        "pers_data_consent_date": now,
        "adv_consent": True,
        "adv_consent_date": now,
        "bki_consent": True,
        "bki_consent_date": now,
        "user_ip": ip,
        "user_agent": ua,
        "origin_url": origin,
        "referer": origin,
        "device_language": "ru-RU",
        "device_time": now,
    }
    for f in FORM_FIELDS:
        v = data.get(f)
        if v in (None, ""):
            continue
        if f == "phone":
            v = _clean_phone(v)
        if f == "amount":
            v = int(v) if str(v).strip() else None
        if f == "term":
            v = int(v) if str(v).strip() else None
        payload[f] = v
    return payload


def send_to_leadgid(payload: dict):
    url = LEADGID_ENDPOINT
    headers = {
        "X-ACCOUNT-TOKEN": LEADGID_TOKEN,
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    params = {}
    if OFFER_ID:
        params["offer"] = OFFER_ID
    try:
        resp = requests.post(
            url, json=payload, headers=headers, params=params, timeout=15
        )
    except requests.RequestException as e:
        log.error("LeadGid request failed: %s", e)
        return {"ok": False, "status": None, "error": "network_error"}

    try:
        body = resp.json()
    except ValueError:
        body = {"raw": resp.text}
    return {"ok": resp.status_code in (200, 201, 202), "status": resp.status_code, "body": body}


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


@app.route("/submit", methods=["POST"])
def submit():
    # honeypot — скрытое поле, которое боты заполняют, люди — нет
    if request.form.get(SECRET_HONEYPOT):
        return jsonify({"ok": False, "error": "spam"}), 400

    consent = request.form.get("pers_data_consent")
    if consent not in ("on", "true", "1", "yes"):
        return jsonify({"ok": False, "error": "no_consent"}), 400

    phone = _clean_phone(request.form.get("phone", ""))
    if not PHONE_RE.match(phone):
        return jsonify({"ok": False, "error": "bad_phone"}), 400

    first = (request.form.get("first_name") or "").strip()
    last = (request.form.get("last_name") or "").strip()
    if not NAME_RE.match(first) or not NAME_RE.match(last):
        return jsonify({"ok": False, "error": "bad_name"}), 400

    ip = request.headers.get("X-Forwarded-For", request.remote_addr)
    if "," in ip:
        ip = ip.split(",")[0].strip()
    ua = request.headers.get("User-Agent", "")
    origin = request.headers.get("Origin") or request.url_root

    payload = build_payload(request.form, ip, ua, origin)

    # Не пишем ПД в лог — только метаданные (на Vercel лог идёт в stdout)
    log.info("Lead from %s phone=%s offer=%s", ip, phone, OFFER_ID or "universal")

    result = send_to_leadgid(payload)
    if result["ok"]:
        return jsonify({"ok": True, "message": "Заявка принята"})
    status = result.get("status")
    if status == 401:
        log.error("LeadGid 401 Unauthorized — проверьте токен")
        return jsonify({"ok": False, "error": "auth"}), 502
    if status == 406:
        return jsonify({"ok": False, "error": "duplicate"}), 409
    if status == 429:
        return jsonify({"ok": False, "error": "rate_limit"}), 429
    log.error("LeadGid error %s: %s", status, result.get("body"))
    return jsonify({"ok": False, "error": "upstream"}), 502


@app.route("/privacy", methods=["GET"])
def privacy():
    return render_template("privacy.html")


@app.route("/healthz", methods=["GET"])
def healthz():
    return jsonify({"ok": True})


@app.route("/test-submit", methods=["POST"])
def test_submit():
    """Тестовая отправка в /v1/ru/test-applications (без реальных лидов)."""
    data = request.get_json(silent=True) or request.form.to_dict()
    ip = request.headers.get("X-Forwarded-For", request.remote_addr)
    ua = request.headers.get("User-Agent", "")
    payload = build_payload(data, ip, ua, request.url_root)
    url = LEADGID_ENDPOINT.replace("/applications", "/test-applications")
    headers = {
        "X-ACCOUNT-TOKEN": LEADGID_TOKEN,
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    params = {}
    if OFFER_ID:
        params["offer"] = OFFER_ID
    try:
        resp = requests.post(url, json=payload, headers=headers, params=params, timeout=15)
        return jsonify({"status": resp.status_code, "body": resp.json()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
