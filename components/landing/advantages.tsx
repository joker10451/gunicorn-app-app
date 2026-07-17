import { Clock4, Lock, Percent, ThumbsUp, UserCheck, Wallet2 } from "lucide-react"

const advantages = [
  {
    icon: Percent,
    title: "Первый займ под 0%",
    text: "Новым клиентам — деньги без переплаты. Возвращаете ровно столько, сколько взяли.",
  },
  {
    icon: Clock4,
    title: "Круглосуточно",
    text: "Оформляйте займ в любое время дня и ночи. Деньги приходят даже в праздники и выходные.",
  },
  {
    icon: UserCheck,
    title: "Плохая история — не проблема",
    text: "Одобряем заявки клиентам с просрочками и низким рейтингом. Мы даём второй шанс.",
  },
  {
    icon: Lock,
    title: "Безопасно",
    text: "Данные защищены шифрованием банковского уровня и не передаются третьим лицам.",
  },
  {
    icon: Wallet2,
    title: "На любую карту",
    text: "Переводим средства на карту Visa, Mastercard или МИР любого российского банка.",
  },
  {
    icon: ThumbsUp,
    title: "Без скрытых комиссий",
    text: "Показываем полную стоимость до оформления. Никаких сюрпризов и мелкого шрифта.",
  },
]

export function Advantages() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Почему нам доверяют
          </span>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Преимущества ЗаймГид
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item) => (
            <div
              key={item.title}
              className="group rounded-3xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <item.icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
