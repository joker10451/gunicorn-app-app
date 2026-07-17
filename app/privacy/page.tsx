import { ShieldCheck } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Политика обработки персональных данных",
}

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 sm:px-6">
          <a href="/" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ShieldCheck className="size-5" />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-foreground">
              Займ<span className="text-primary">Гид</span>
            </span>
          </a>
        </div>
      </header>

      <main className="flex-1 py-16 lg:py-24">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Политика обработки персональных данных
          </h1>

          <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground">
            <p>
              Настоящим я, как субъект персональных данных, в соответствии с Федеральным законом
              от 27.07.2006 № 152-ФЗ «О персональных данных», даю своё согласие на обработку моих
              персональных данных, указанных при заполнении формы заявки на данном сайте, а именно:
              фамилия, имя, отчество, дата рождения, пол, номер мобильного телефона, адрес электронной
              почты, регион, город, сведения о запрашиваемой сумме и сроке, а также иные данные,
              предоставленные мной добровольно.
            </p>
            <p>
              Согласие даётся на обработку следующих операций: сбор, запись, систематизацию,
              накопление, хранение, уточнение (обновление, изменение), извлечение, использование,
              передачу (в том числе третьим лицам — партнёрам по предоставлению финансовых услуг),
              обезличивание, блокирование, удаление и уничтожение персональных данных.
            </p>
            <p>
              Согласие действует до момента его отзыва путём направления письменного заявления
              оператору по адресу электронной почты, указанному на сайте. Обработка данных
              осуществляется с применением смешанной (автоматизированной и неавтоматизированной) обработки.
            </p>
            <p>
              Также я выражаю согласие на получение сообщений рекламного характера и на запрос
              моей кредитной истории в бюро кредитных историй (БКИ).
            </p>
          </div>

          <div className="mt-10">
            <a href="/" className="text-sm font-medium text-primary hover:underline">
              ← Вернуться к форме
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
