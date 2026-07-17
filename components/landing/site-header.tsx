"use client"

import { useState } from "react"
import { Menu, ShieldCheck, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "Калькулятор", href: "#calculator" },
  { label: "Предложения", href: "#offers" },
  { label: "Как это работает", href: "#how" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Вопросы", href: "#faq" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2" aria-label="ЗаймГид, на главную">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShieldCheck className="size-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-foreground">
            Займ<span className="text-primary">Гид</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Основная навигация">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#calculator"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Войти
          </a>
          <Button
            render={<a href="#calculator" />}
            nativeButton={false}
            className="rounded-full font-semibold"
          >
            Получить деньги
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex size-10 items-center justify-center rounded-lg text-foreground md:hidden"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-4" aria-label="Мобильная навигация">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-secondary"
              >
                {link.label}
              </a>
            ))}
            <Button
              render={<a href="#calculator" onClick={() => setOpen(false)} />}
              nativeButton={false}
              className="mt-2 rounded-full font-semibold"
            >
              Получить деньги
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
