import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FinalCta() {
  return (
    <section className="px-4 pb-16 sm:px-6 lg:pb-24">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] bg-primary px-6 py-14 text-center sm:px-12 lg:py-20">
        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
          Деньги нужны уже сегодня?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-primary-foreground/85">
          Заполните одну заявку и получите до 100 000 ₽ на карту за несколько минут. Первый займ —
          под 0%.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            render={<a href="#calculator" />}
            nativeButton={false}
            size="lg"
            variant="secondary"
            className="h-12 rounded-xl px-8 text-base font-semibold"
          >
            Оформить займ
            <ArrowRight className="size-5" aria-hidden="true" />
          </Button>
          <p className="text-sm text-primary-foreground/80">Без справок · Решение за 2 минуты</p>
        </div>
      </div>
    </section>
  )
}
