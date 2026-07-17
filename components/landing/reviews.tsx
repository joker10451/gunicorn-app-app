import { Star } from "lucide-react"

const reviews = [
  {
    name: "Анна К.",
    city: "Москва",
    initial: "А",
    text: "Оформила первый займ под 0% буквально за пару минут. Деньги пришли на карту почти сразу. Очень выручило перед зарплатой!",
  },
  {
    name: "Дмитрий С.",
    city: "Екатеринбург",
    initial: "Д",
    text: "Понравилось, что видно сразу несколько предложений и можно выбрать лучшее. Никаких скрытых комиссий, всё честно и прозрачно.",
  },
  {
    name: "Ольга М.",
    city: "Новосибирск",
    initial: "О",
    text: "Была просрочка в прошлом, думала откажут. Но заявку одобрили без вопросов. Спасибо, сервис реально работает.",
  },
  {
    name: "Игорь В.",
    city: "Казань",
    initial: "И",
    text: "Удобный калькулятор — сразу видно, сколько возвращать. Оформил ночью, деньги были на карте через 4 минуты.",
  },
]

export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-20 bg-card py-16 lg:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Отзывы клиентов
            </span>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Нам доверяют более 2 000 000 человек
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-background px-5 py-3">
            <span className="text-3xl font-extrabold text-foreground">4,9</span>
            <div>
              <div className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">12 400 оценок</p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review) => (
            <figure
              key={review.name}
              className="flex flex-col rounded-3xl border border-border bg-background p-6"
            >
              <div className="flex gap-0.5" aria-label="Оценка 5 из 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-primary text-primary" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                {review.text}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <span className="flex size-10 items-center justify-center rounded-full bg-accent font-bold text-accent-foreground">
                  {review.initial}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.city}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
