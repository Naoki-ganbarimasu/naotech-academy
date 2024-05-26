import React from "react"
const Nologin = () => {
      return (
        <div>
            <div>
            <h1 className="border-b border-gray-300 pb-5 mb-5 text-lg font-bold">このポートフォリオの概要</h1>
            <h1 className="border-b border-gray-300 mb-3">使用した技術</h1>
            <ul className="mb-2">
                <li　className="font-bold">フロントエンド</li>
                <li>・Typescript/react/next.js</li>
                <li>・TailwindCSS</li>
                <li>・Material UI</li>
            </ul>
            <ul className="mb-2">
                <li className="font-bold">バックエンド(SaaS)</li>
                <li>・Supabase</li>
                <li>・Stripe</li>
            </ul>
            <h3>上記の言語やフレームワークを使用しました。</h3>
                <a className="text-blue-500" href="https://github.com/Naoki-ganbarimasu/nextjs-supabase-auth-tutorial-master/tree/main">ソースコード</a>
            </div>
            <div className="mt-5">
            <h1 className="border-b  border-gray-300">機能</h1>
            <ul>
                <li className="font-bold">auth認証</li>
                <li>・email認証による新規登録</li>
                <li>・ログイン、ログアウト</li>
                <li>・プロフィール編集</li>
            </ul>
            <div className="mt-5">
            <h1 className="border-b  border-gray-300">機能</h1>
            <ul>
                <li className="font-bold">auth認証</li>
                <li>・email認証による新規登録</li>
                <li>・ログイン、ログアウト</li>
                <li>・プロフィール編集</li>
            </ul>
            <ul>
                <li className="font-bold">※使用の際　以下のテストユーザーを使用してください。</li>
                <li>サブスクリプション登録済み　email: premiumtester@example.com、pass: 12345</li>
                <li>サブスクリプション未登録　　email: freetester@example.com、pass: 12345</li>
            </ul>
            </div>
            </div>
            </div>
      )
    }
export default Nologin
