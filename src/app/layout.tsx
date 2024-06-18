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
        <header className=" w-full fixed top-0 bg-white z-40">
          <SupabaseListener />
 
        </header>
          <main className='mt-28 bg-white w-full h-full'>{children}</main>

          <footer className="py-5 bottom-0 bg-gray-100 ">
            <div className="w-full text-center text-sm">
              naotech
            </div>
          </footer>
      </body>
    </html>
  )
}
