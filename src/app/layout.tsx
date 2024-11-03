import { Inter } from "next/font/google";
import SupabaseListener from "./components/SupabaseListener";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lesson講座販売アプリケーション",
  description: "動画レッスンを販売するアプリケーションポートフォリオ"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>{metadata.title}</title>
        <meta
          name="description"
          content="Naotech Academyでプログラミング初心者向けのレッスン動画をチェックしましょう。分かりやすく学べるWEBサイト。"
        />
        <meta
          name="keywords"
          content="プログラミング, レッスン, 動画サイト, Naotech, Naotech Academy, WEBサイト, 初心者"
        />
        <meta
          property="og:title"
          content="Naotech Academy - プログラミングレッスン動画サイト"
        />
        <meta
          property="og:description"
          content="初心者でも簡単に学べるプログラミングレッスン動画を提供するNaotech Academyです。"
        />
        <meta property="og:image" content="URL_TO_YOUR_IMAGE" />
        <meta property="og:url" content="YOUR_SITE_URL" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body className={inter.className}>
        <header className=" w-full fixed top-0 bg-white z-40">
          <SupabaseListener />
        </header>
        <main className="mt-28 bg-white w-full h-full">{children}</main>

        <footer className="py-5 bottom-0 bg-gray-100 ">
          <div className="w-full text-center text-sm">naotech</div>
        </footer>
      </body>
    </html>
  );
}
