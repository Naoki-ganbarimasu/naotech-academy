import  Link  from "next/link"
import React from "react"
const Nologin = () => {
      return (
        <div>
            <div className="relative inline-block text-center">
                <img
                    className="mx-auto"
                    src="/nologin.jpg"
                    alt="nologin"
                />
           
                <p　className="absolute top-1/2 left-1/2 transfrom -translate-x-1/2 -translate-y-1/2 text-gray-500 text-sm">
                webサイト作成に必要な知識を身につけませんか？
                </p>
                <Link className="open_button absolute top-2/3 left-1/2  transfrom -translate-x-1/2 -translate-y-1/2  text-gray-500" href="/auth/signup">はじめてみる</Link>
            </div>
            <div className="mt-5 ml-3">
            <h1 className="border-b  border-gray-300 text-xl">※使用時の注意事項</h1>
            <ul className="mt-1">
                <li className="font-bold">サブスクリプション契約の機能はテスト環境です。登録時は以下の情報を入力してください。</li>
                <li>クレジットカード番号：4242 4242 4242 4242</li>
                <li>氏名：任意の名前を入力してください。※どんな名前でも構いません。</li>                    
                <li>有効期限：現在の日時より後の期限を入力してください。</li>
                <li>セキュリティーコード：任意の3桁の数字を入力してください。※どんな番号でも構いません。</li>
            </ul>
            </div>
            </div>
      )
    }
export default Nologin
