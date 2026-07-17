(function () {
  const form = document.getElementById("lead-form");
  const btn = document.getElementById("submit-btn");
  const msg = document.getElementById("msg");
  const phone = form.querySelector('input[name="phone"]');

  // === UTM-метки: заполняем скрытые поля из URL при загрузке ===
  const params = new URLSearchParams(location.search);
  const utmMap = {
    utm_source: "subid1",
    utm_medium: "subid2",
    utm_campaign: "subid3",
    utm_content: "subid4",
    utm_term: "subid5",
  };
  for (const [utm, field] of Object.entries(utmMap)) {
    const v = params.get(utm);
    if (v) document.getElementById(field).value = v;
  }

  phone.addEventListener("input", function () {
    let d = this.value.replace(/\D/g, "");
    if (d.startsWith("8")) d = "7" + d.slice(1);
    if (d.startsWith("7")) d = d.slice(1);
    d = d.slice(0, 10);
    let out = "+7";
    if (d.length > 0) out += " (" + d.slice(0, 3);
    if (d.length >= 3) out += ") " + d.slice(3, 6);
    if (d.length >= 6) out += "-" + d.slice(6, 8);
    if (d.length >= 8) out += "-" + d.slice(8, 10);
    this.value = out;
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    msg.textContent = "";
    msg.className = "msg";
    btn.disabled = true;
    btn.textContent = "Отправка...";

    const data = new FormData(form);
    try {
      const resp = await fetch("/submit", { method: "POST", body: data });
      const json = await resp.json();
      if (json.ok) {
        msg.textContent = "Заявка успешно отправлена. С вами свяжутся в ближайшее время.";
        msg.className = "msg ok";
        form.reset();
        // Цель в метрики
        if (typeof ym === "function") ym(window.METRIKA_ID || METRIKA_ID, "reachGoal", "lead_sent");
        if (typeof gtag === "function") gtag("event", "lead_sent", { event_category: "conversion" });
      } else {
        const map = {
          no_consent: "Необходимо согласие на обработку персональных данных.",
          bad_phone: "Проверьте корректность номера телефона.",
          bad_name: "Проверьте Фамилию и Имя (только буквы).",
          duplicate: "Заявка с таким номером уже была отправлена недавно.",
          rate_limit: "Слишком много запросов, попробуйте позже.",
          auth: "Ошибка авторизации на стороне сервера.",
          spam: "Запрос отклонён.",
          upstream: "Временная ошибка сервера, попробуйте позже.",
        };
        msg.textContent = map[json.error] || "Произошла ошибка. Попробуйте позже.";
        msg.className = "msg err";
      }
    } catch (err) {
      msg.textContent = "Сетевая ошибка. Проверьте соединение.";
      msg.className = "msg err";
    } finally {
      btn.disabled = false;
      btn.textContent = "Отправить заявку";
    }
  });
})();
