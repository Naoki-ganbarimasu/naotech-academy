import './globals.css'
import { Inter } from 'next/font/google'
import SupabaseListener from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Lesson講座販売アプリケーション',
  description: '動画レッスンを販売するアプリケーションポートフォリオ',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <SupabaseListener />

          <main className="flex-1 container max-w-screen-sm mx-auto px-1 py-5">{children}</main>

          <footer className="py-5">
            <div className="text-center text-sm">
              naotech
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
