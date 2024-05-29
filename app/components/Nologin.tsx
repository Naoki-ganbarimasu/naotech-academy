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
            <h1 className="border-b  border-gray-300">使用時</h1>
            <ul>
                <li className="font-bold">サブスクリプション契約の機能はテスト環境です。登録時は以下の情報を入力してください。</li>
                <li>クレジットカード番号：4242 4242 4242 4242</li>
                <li>氏名：任意の名前を入力してください。※どんな名前でも構いません。</li>                    
                <li>有効期限：現在の日時より後の期限を入力してください。</li>
                <li>セキュリティーコード：任意の3桁の数字を入力してください。※どんな番号でも構いません。</li>
            </ul>
            </div>
            </div>
            </div>
      )
    }
export default Nologin
