import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ЗаймГид — умный подбор микрозайма за 2 минуты',
  description:
    'Сравните предложения проверенных МФО и получите деньги на карту онлайн. Первый займ до 30 000 ₽ под 0%. Без справок и визитов в офис.',
  generator: 'v0.app',
  keywords: [
    'микрозайм',
    'займ онлайн',
    'деньги на карту',
    'подбор займа',
    'МФО',
    'займ под 0%',
  ],
  openGraph: {
    title: 'ЗаймГид — умный подбор микрозайма за 2 минуты',
    description:
      'Сравните предложения проверенных МФО и получите деньги на карту онлайн. Первый займ до 30 000 ₽ под 0%.',
    type: 'website',
    locale: 'ru_RU',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0e8a5f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`light ${manrope.variable}`}>
      <body className="bg-background font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
