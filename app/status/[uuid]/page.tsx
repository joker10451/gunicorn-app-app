import { ShieldCheck } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Статус заявки",
}

interface PageProps {
  params: Promise<{ uuid: string }>
}

async function getStatus(uuid: string) {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"
    const res = await fetch(`${baseUrl}/api/status/${uuid}`, { cache: "no-store" })
    if (!res.ok) return { error: `Статус HTTP ${res.status}` }
    return await res.json()
  } catch {
    return { error: "Не удалось получить статус" }
  }
}

export default async function StatusPage({ params }: PageProps) {
  const { uuid } = await params
  const result = await getStatus(uuid)

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
            Статус заявки
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            UUID: <code className="rounded bg-secondary px-2 py-0.5 text-foreground">{uuid}</code>
          </p>

          <div className="mt-8 rounded-3xl border border-border bg-card p-6 sm:p-8">
            {result.error ? (
              <p className="text-destructive">{result.error}</p>
            ) : result.data?.conversions ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-3 text-left font-medium text-muted-foreground">Оффер</th>
                      <th className="pb-3 text-left font-medium text-muted-foreground">Статус</th>
                      <th className="pb-3 text-left font-medium text-muted-foreground">Lead ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(result.data.conversions).map(([offerId, conv]: [string, any]) => (
                      <tr key={offerId} className="border-b border-border">
                        <td className="py-3 font-medium">{offerId}</td>
                        <td className="py-3">
                          {conv.status === "accepted" ? (
                            <span className="font-medium text-primary">Принята</span>
                          ) : conv.status === "rejected" ? (
                            <span className="font-medium text-destructive">Отклонена</span>
                          ) : (
                            <span className="text-muted-foreground">{conv.status}</span>
                          )}
                        </td>
                        <td className="py-3 text-muted-foreground">{conv.lead_id || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Заявка получена, ожидаем распределение по офферам…
              </p>
            )}
          </div>

          <div className="mt-8">
            <a href="/" className="text-sm font-medium text-primary hover:underline">
              ← Новая заявка
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
