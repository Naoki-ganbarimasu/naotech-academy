import './globals.css'
import { Inter } from 'next/font/google'
import SupabaseListener from './components/SupabaseListener'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Lesson講座販売アプリケーション',
  description: '動画レッスンを販売するアプリケーションポートフォリオ',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className={inter.className}>
        <header className=" w-full fixed top-0 bg-white">
          <SupabaseListener />

        </header>
          <main className="flex-1 container max-w-screen-sm mx-auto px-1 mt-40">{children}</main>

          <footer className="py-5">
            <div className="text-center text-sm">
              naotech
            </div>
          </footer>
      </body>
    </html>
  )
}
