"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    q: "Кто может получить займ?",
    a: "Гражданин РФ от 18 лет с действующим паспортом и банковской картой. Постоянная регистрация и справки о доходах не требуются.",
  },
  {
    q: "Действительно ли первый займ под 0%?",
    a: "Да. Новым клиентам мы подбираем предложения со ставкой 0% на первый займ. При погашении в срок вы возвращаете ровно ту сумму, которую взяли, без переплат.",
  },
  {
    q: "Как быстро приходят деньги?",
    a: "После одобрения заявки деньги поступают на карту в среднем за 4 минуты. Переводы работают круглосуточно, включая ночь, выходные и праздники.",
  },
  {
    q: "Одобрят ли займ с плохой кредитной историей?",
    a: "В большинстве случаев да. Мы работаем с МФО, которые лояльно относятся к клиентам с просрочками и низким рейтингом. Одобрение получают до 96% заявок.",
  },
  {
    q: "Это безопасно?",
    a: "Да. Все данные передаются по защищённому соединению и шифруются по банковским стандартам. Мы не передаём вашу информацию третьим лицам без согласия.",
  },
  {
    q: "Сколько стоит подбор займа?",
    a: "Сервис ЗаймГид полностью бесплатен для пользователей. Мы не берём комиссию за подбор и оформление заявки.",
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="scroll-mt-20 py-16 lg:py-24">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Вопросы и ответы
          </span>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Частые вопросы
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold text-card-foreground">{faq.q}</span>
                    <ChevronDown
                      className={`size-5 shrink-0 text-primary transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  className={`grid transition-all duration-200 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
