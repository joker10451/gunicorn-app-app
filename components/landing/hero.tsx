"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { ArrowRight, BadgeCheck, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const AMOUNT_MIN = 1000
const AMOUNT_MAX = 100000
const AMOUNT_STEP = 1000
const TERM_MIN = 5
const TERM_MAX = 30

function formatRub(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value)
}

function pct(value: number, min: number, max: number) {
  return ((value - min) / (max - min)) * 100
}

export function Hero() {
  const [amount, setAmount] = useState(15000)
  const [term, setTerm] = useState(15)

  // Первый займ — под 0%, к возврату ровно сумма займа.
  const toReturn = amount

  const sliderStyle = (percentage: number) => ({
    background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${percentage}%, var(--secondary) ${percentage}%, var(--secondary) 100%)`,
  })

  const returnDate = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + term)
    return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long" })
  }, [term])

  return (
    <section id="calculator" className="relative overflow-hidden">
      {/* мягкий фон */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-40 size-80 rounded-full bg-accent/50 blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        {/* Левая колонка */}
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent/60 px-3 py-1 text-sm font-semibold text-accent-foreground">
            <BadgeCheck className="size-4" aria-hidden="true" />
            Первый займ — под 0%
          </span>

          <h1 className="mt-5 text-pretty text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Деньги на карту <span className="text-primary">за 2 минуты</span>
          </h1>

          <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            Подберём лучшее предложение среди проверенных МФО. Без справок, поручителей и визитов в
            офис — решение приходит мгновенно.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Clock className="size-5 text-primary" aria-hidden="true" />
              Деньги за 4 минуты
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <BadgeCheck className="size-5 text-primary" aria-hidden="true" />
              Одобрение 96%
            </div>
            <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <Star className="size-5 fill-primary text-primary" aria-hidden="true" />
              4,9 из 5 — 12 400 отзывов
            </div>
          </div>
        </div>

        {/* Правая колонка — калькулятор */}
        <div className="relative">
          <div className="pointer-events-none absolute -right-6 -top-10 hidden w-40 lg:block">
            <Image
              src="/hero-phone.png"
              alt="Мобильное приложение с одобренным займом"
              width={320}
              height={320}
              className="h-auto w-full drop-shadow-xl"
              priority
            />
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 sm:p-8">
            <h2 className="text-lg font-bold text-card-foreground">Рассчитайте свой займ</h2>

            {/* Сумма */}
            <div className="mt-6">
              <div className="flex items-baseline justify-between">
                <label htmlFor="amount" className="text-sm font-medium text-muted-foreground">
                  Сумма займа
                </label>
                <span className="text-2xl font-extrabold tracking-tight text-foreground">
                  {formatRub(amount)} ₽
                </span>
              </div>
              <input
                id="amount"
                type="range"
                min={AMOUNT_MIN}
                max={AMOUNT_MAX}
                step={AMOUNT_STEP}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                style={sliderStyle(pct(amount, AMOUNT_MIN, AMOUNT_MAX))}
                className="loan-range mt-3 w-full"
                aria-label="Сумма займа в рублях"
              />
              <div className="mt-1.5 flex justify-between text-xs text-muted-foreground">
                <span>{formatRub(AMOUNT_MIN)} ₽</span>
                <span>{formatRub(AMOUNT_MAX)} ₽</span>
              </div>
            </div>

            {/* Срок */}
            <div className="mt-6">
              <div className="flex items-baseline justify-between">
                <label htmlFor="term" className="text-sm font-medium text-muted-foreground">
                  Срок
                </label>
                <span className="text-2xl font-extrabold tracking-tight text-foreground">
                  {term} дн.
                </span>
              </div>
              <input
                id="term"
                type="range"
                min={TERM_MIN}
                max={TERM_MAX}
                step={1}
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
                style={sliderStyle(pct(term, TERM_MIN, TERM_MAX))}
                className="loan-range mt-3 w-full"
                aria-label="Срок займа в днях"
              />
              <div className="mt-1.5 flex justify-between text-xs text-muted-foreground">
                <span>{TERM_MIN} дней</span>
                <span>{TERM_MAX} дней</span>
              </div>
            </div>

            {/* Итог */}
            <div className="mt-6 flex items-center justify-between rounded-2xl bg-accent/50 p-4">
              <div>
                <p className="text-sm text-accent-foreground/80">К возврату {returnDate}</p>
                <p className="text-xl font-extrabold text-foreground">{formatRub(toReturn)} ₽</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-accent-foreground/80">Ставка</p>
                <p className="text-xl font-extrabold text-primary">0%</p>
              </div>
            </div>

            <Button
              render={<a href="#offers" />}
              nativeButton={false}
              size="lg"
              className="mt-5 h-12 w-full rounded-xl text-base font-semibold"
            >
              Получить {formatRub(amount)} ₽
              <ArrowRight className="size-5" aria-hidden="true" />
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Нажимая кнопку, вы соглашаетесь с условиями обработки данных
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
