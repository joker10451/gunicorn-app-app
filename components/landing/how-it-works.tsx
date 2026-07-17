import { CreditCard, FileText, SlidersHorizontal, Wallet } from "lucide-react"

const steps = [
  {
    icon: SlidersHorizontal,
    title: "Выберите условия",
    text: "Укажите нужную сумму и срок в калькуляторе. Мы подберём подходящие предложения.",
  },
  {
    icon: FileText,
    title: "Заполните заявку",
    text: "Одна короткая анкета на все МФО сразу. Нужен только паспорт — без справок и поручителей.",
  },
  {
    icon: CreditCard,
    title: "Получите решение",
    text: "Ответ приходит за пару минут. Одобрение по 96% заявок даже с плохой кредитной историей.",
  },
  {
    icon: Wallet,
    title: "Деньги на карту",
    text: "Средства поступают на карту любого банка мгновенно, круглосуточно и без выходных.",
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 bg-card py-16 lg:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Всего 4 шага
          </span>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Как получить деньги
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            От заявки до денег на карте — меньше пяти минут. Весь процесс проходит онлайн.
          </p>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="relative rounded-3xl border border-border bg-background p-6"
            >
              <span className="absolute right-5 top-5 text-5xl font-extrabold text-secondary">
                {i + 1}
              </span>
              <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                <step.icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
