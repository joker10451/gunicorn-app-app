"use client"

import { useState, useEffect, useRef } from "react"
import { Send, ShieldCheck, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FormProps {
  defaultAmount?: number
  defaultTerm?: number
}

export function FormSection({ defaultAmount = 15000, defaultTerm = 15 }: FormProps) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ ok: boolean; msg: string; uuid?: string } | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    function onPrefill(e: Event) {
      const { amount, term } = (e as CustomEvent).detail || {}
      const form = formRef.current
      if (!form) return
      if (amount != null) {
        const el = form.elements.namedItem("amount") as HTMLInputElement
        if (el) el.value = String(amount)
      }
      if (term != null) {
        const el = form.elements.namedItem("term") as HTMLInputElement
        if (el) el.value = String(term)
      }
    }
    window.addEventListener("prefill-form", onPrefill)
    return () => window.removeEventListener("prefill-form", onPrefill)
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    const form = e.currentTarget
    const fd = new FormData(form)

    if (fd.get("company")) {
      setResult({ ok: true, msg: "Заявка принята", uuid: "honeypot" })
      setLoading(false)
      return
    }

    if (!fd.get("pers_data_consent")) {
      setResult({ ok: false, msg: "Необходимо дать согласие на обработку персональных данных" })
      setLoading(false)
      return
    }

    const params = new URLSearchParams(window.location.search)
    fd.set("subid1", params.get("utm_source") || "")
    fd.set("subid2", params.get("utm_medium") || "")
    fd.set("subid3", params.get("utm_campaign") || "")
    fd.set("subid4", params.get("utm_content") || "")
    fd.set("subid5", params.get("utm_term") || "")
    fd.set("subid6", document.referrer || "")

    try {
      const body = Object.fromEntries(fd.entries())
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = await res.json()

      if (res.ok && data.uuid) {
        setResult({ ok: true, msg: `Заявка принята. Номер: ${data.uuid}`, uuid: data.uuid })
        form.reset()
      } else {
        setResult({ ok: false, msg: data.error || "Ошибка отправки" })
      }
    } catch {
      setResult({ ok: false, msg: "Ошибка сети. Попробуйте ещё раз." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="form" className="scroll-mt-20 py-16 lg:py-24">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Заявка на подбор
          </span>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Заполните анкету
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Одна заявка — и предложения от нескольких МФО поступят вам на почту и в SMS.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 sm:p-8">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            <div className="absolute left-[-9999px] opacity-0" aria-hidden="true">
              <label>
                Не заполняйте это поле
                <input type="text" name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="last_name" className="mb-1.5 block text-sm font-medium text-muted-foreground">
                  Фамилия *
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  required
                  autoComplete="family-name"
                  placeholder="Иванов"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label htmlFor="first_name" className="mb-1.5 block text-sm font-medium text-muted-foreground">
                  Имя *
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  required
                  autoComplete="given-name"
                  placeholder="Иван"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label htmlFor="patronymic" className="mb-1.5 block text-sm font-medium text-muted-foreground">
                Отчество
              </label>
              <input
                id="patronymic"
                name="patronymic"
                autoComplete="additional-name"
                placeholder="Иванович"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-muted-foreground">
                  Телефон *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+7 (___) ___-__-__"
                  autoComplete="tel"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-muted-foreground">
                  Эл. почта
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="mail@example.com"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="birth_date" className="mb-1.5 block text-sm font-medium text-muted-foreground">
                  Дата рождения
                </label>
                <input
                  id="birth_date"
                  name="birth_date"
                  type="date"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label htmlFor="gender" className="mb-1.5 block text-sm font-medium text-muted-foreground">
                  Пол
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">—</option>
                  <option value="male">Мужской</option>
                  <option value="female">Женский</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="region" className="mb-1.5 block text-sm font-medium text-muted-foreground">
                  Регион (код)
                </label>
                <input
                  id="region"
                  name="region"
                  placeholder="78"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-muted-foreground">
                  Город
                </label>
                <input
                  id="city"
                  name="city"
                  autoComplete="address-level2"
                  placeholder="Санкт-Петербург"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label htmlFor="loan_city" className="mb-1.5 block text-sm font-medium text-muted-foreground">
                  Город получения
                </label>
                <input
                  id="loan_city"
                  name="loan_city"
                  placeholder="Санкт-Петербург"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="amount" className="mb-1.5 block text-sm font-medium text-muted-foreground">
                  Сумма, ₽
                </label>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  min={1000}
                  step={1000}
                  defaultValue={defaultAmount}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label htmlFor="term" className="mb-1.5 block text-sm font-medium text-muted-foreground">
                  Срок, дней
                </label>
                <input
                  id="term"
                  name="term"
                  type="number"
                  min={1}
                  defaultValue={defaultTerm}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label htmlFor="purpose" className="mb-1.5 block text-sm font-medium text-muted-foreground">
                  Цель займа
                </label>
                <select
                  id="purpose"
                  name="purpose"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">—</option>
                  <option value="Car">Автомобиль</option>
                  <option value="Business">Бизнес</option>
                  <option value="DebtConsolidation">Консолидация долга</option>
                  <option value="HomeImprovement">Улучшение жилья</option>
                  <option value="MedicalExpenses">Медицина</option>
                  <option value="Education">Образование</option>
                  <option value="Cash">Наличные</option>
                  <option value="Other">Другое</option>
                </select>
              </div>
            </div>

            <input type="hidden" name="subid1" />
            <input type="hidden" name="subid2" />
            <input type="hidden" name="subid3" />
            <input type="hidden" name="subid4" />
            <input type="hidden" name="subid5" />
            <input type="hidden" name="subid6" />

            <label className="flex items-start gap-3 rounded-2xl border border-border bg-secondary/40 p-4">
              <input
                type="checkbox"
                name="pers_data_consent"
                required
                className="mt-0.5 size-4 shrink-0 accent-primary"
              />
              <span className="text-xs leading-relaxed text-muted-foreground">
                Я даю{" "}
                <a href="/privacy" target="_blank" className="text-primary underline-offset-2 hover:underline">
                  согласие на обработку персональных данных
                </a>{" "}
                в соответствии с ФЗ-152, подтверждаю достоверность указанных сведений и согласие на
                получение рекламных сообщений и запрос кредитной истории в БКИ.
              </span>
            </label>

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="h-12 w-full rounded-xl text-base font-semibold"
            >
              {loading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <>
                  Отправить заявку
                  <Send className="size-4" aria-hidden="true" />
                </>
              )}
            </Button>

            {result && (
              <p className={`text-center text-sm ${result.ok ? "text-primary" : "text-destructive"}`}>
                {result.msg}
                {result.uuid && result.uuid !== "honeypot" && (
                  <> — <a href={`/status/${result.uuid}`} className="underline underline-offset-2">проверить статус</a></>
                )}
              </p>
            )}

            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <ShieldCheck className="size-3.5" aria-hidden="true" />
                SSL
              </span>
              <span>152-ФЗ</span>
              <span>Без оплаты</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
