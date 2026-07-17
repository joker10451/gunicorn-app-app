import { ArrowRight, Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

type Offer = {
  name: string
  initial: string
  rate: string
  rateNote: string
  amount: string
  term: string
  approval: string
  rating: string
  featured?: boolean
  perks: string[]
}

const offers: Offer[] = [
  {
    name: "МаниФлоу",
    initial: "М",
    rate: "0%",
    rateNote: "первый займ",
    amount: "до 30 000 ₽",
    term: "5–30 дней",
    approval: "98%",
    rating: "4,9",
    featured: true,
    perks: ["Без отказа новым клиентам", "Деньги за 3 минуты", "Только паспорт"],
  },
  {
    name: "КэшЛайн",
    initial: "К",
    rate: "0,8%",
    rateNote: "в день",
    amount: "до 50 000 ₽",
    term: "7–60 дней",
    approval: "94%",
    rating: "4,8",
    perks: ["Продление онлайн", "На карту любого банка", "Без скрытых комиссий"],
  },
  {
    name: "БыстроДеньги+",
    initial: "Б",
    rate: "0,5%",
    rateNote: "в день",
    amount: "до 100 000 ₽",
    term: "10–90 дней",
    approval: "91%",
    rating: "4,7",
    perks: ["Крупные суммы", "Досрочное погашение", "Кэшбэк за возврат в срок"],
  },
]

export function Offers() {
  return (
    <section id="offers" className="scroll-mt-20 py-16 lg:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Актуальные предложения
          </span>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Лучшие займы под ваши условия
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Мы сравнили десятки МФО и отобрали предложения с высоким процентом одобрения и честными
            ставками.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {offers.map((offer) => (
            <div
              key={offer.name}
              className={`relative flex flex-col rounded-3xl border bg-card p-6 transition-shadow hover:shadow-xl hover:shadow-primary/5 ${
                offer.featured
                  ? "border-primary shadow-lg shadow-primary/10 lg:-mt-4 lg:mb-4"
                  : "border-border"
              }`}
            >
              {offer.featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                  Выбор клиентов
                </span>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-lg font-extrabold text-accent-foreground">
                    {offer.initial}
                  </span>
                  <div>
                    <p className="font-bold text-card-foreground">{offer.name}</p>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="size-3.5 fill-primary text-primary" aria-hidden="true" />
                      {offer.rating}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-extrabold text-primary">{offer.rate}</p>
                  <p className="text-xs text-muted-foreground">{offer.rateNote}</p>
                </div>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-secondary/60 p-4">
                <div>
                  <dt className="text-xs text-muted-foreground">Сумма</dt>
                  <dd className="font-bold text-foreground">{offer.amount}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Срок</dt>
                  <dd className="font-bold text-foreground">{offer.term}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-xs text-muted-foreground">Одобрение</dt>
                  <dd className="font-bold text-foreground">{offer.approval} заявок</dd>
                </div>
              </dl>

              <ul className="mt-6 space-y-3">
                {offer.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    {perk}
                  </li>
                ))}
              </ul>

              <Button
                render={<a href="#calculator" />}
                nativeButton={false}
                size="lg"
                variant={offer.featured ? "default" : "outline"}
                className="mt-6 h-12 w-full rounded-xl text-base font-semibold"
              >
                Оформить займ
                <ArrowRight className="size-5" aria-hidden="true" />
              </Button>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
          Информация не является публичной офертой. Условия по займам уточняйте на сайте конкретной
          МФО. Ставка 0% действует для новых клиентов при своевременном погашении первого займа.
        </p>
      </div>
    </section>
  )
}
