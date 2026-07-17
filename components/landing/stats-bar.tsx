const stats = [
  { value: "2 млн+", label: "выданных займов" },
  { value: "96%", label: "заявок одобряем" },
  { value: "4 мин", label: "среднее время выдачи" },
  { value: "38", label: "проверенных МФО" },
]

export function StatsBar() {
  return (
    <section className="border-y border-border bg-card" aria-label="Показатели сервиса">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center lg:text-left">
            <p className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
