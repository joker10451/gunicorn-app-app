import { ShieldCheck } from "lucide-react"

const columns = [
  {
    title: "Продукты",
    links: ["Займы онлайн", "Займы под 0%", "Долгосрочные займы", "Займы на карту"],
  },
  {
    title: "Компания",
    links: ["О сервисе", "Партнёрам МФО", "Вакансии", "Контакты"],
  },
  {
    title: "Помощь",
    links: ["Как это работает", "Частые вопросы", "Служба поддержки", "Обратная связь"],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <a href="#" className="flex items-center gap-2" aria-label="ЗаймГид, на главную">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ShieldCheck className="size-5" aria-hidden="true" />
              </span>
              <span className="text-lg font-extrabold tracking-tight text-foreground">
                Займ<span className="text-primary">Гид</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Сервис умного подбора микрозаймов среди проверенных МФО. Помогаем найти деньги на
              выгодных условиях.
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-sm font-bold text-foreground">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            ЗаймГид не является кредитором и не выдаёт займы. Сервис предоставляет информацию о
            предложениях микрофинансовых организаций. Условия предоставления займов уточняйте на
            сайтах МФО. Ставка в процентах годовых зависит от выбранного продукта.
          </p>
          <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} ЗаймГид. Все права защищены.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a href="#" className="text-xs text-muted-foreground transition-colors hover:text-primary">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-xs text-muted-foreground transition-colors hover:text-primary">
                Пользовательское соглашение
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
