import { Database } from "@/lib/database.types";
import { supabaseServer } from "@/src/utils/supabaseServer";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import  Link  from "next/link"
import React from "react"

const getAllLessons = async (supabase: SupabaseClient<Database>) => {
    const { data: lessons, error: lessonsError } = await supabase.from('lesson').select('*');
    const { data: whos, error: whosError } = await supabase.from('who').select('*');
  
    if (lessonsError) {
      console.error('Error fetching lessons:', lessonsError);
    }
    if (whosError) {
      console.error('Error fetching whos:', whosError);
    }
  
    return { lessons, whos };
  };

const Nologin = async () => {
    const supabase = supabaseServer();
    const { lessons, whos } = await getAllLessons(supabase);
      return (
        <div className="flex flex-col text-center">
            <div className="relative w-full h-full">
                <Image
                    className="object-cover opacity-75 hidden sm:block"
                    src="/nologin.png"
                    alt="nologin"
                    width={1500}
                    height={600}
                />
                 <Image
                    className="object-cover opacity-75 sm:hidden"
                    src="/sm:nologin.png"
                    alt="nologin"
                    width={1500}
                    height={600}
                />
           
                <p className="mx-auto absolute top-1/3 left-1/2 transfrom -translate-x-1/2 -translate-y-1/2 text-brack font-bold lg:text-3xl md:text-xl sm:text-sm">
                webサイト作成に必要な知識を身につけませんか？
                </p>
                <Link href={"/auth/signup"} className="template_button mx-auto absolute top-2/3 left-1/2 transfrom -translate-x-1/2 -translate-y-1/2">講座をはじめる</Link>
            </div>
            <div>
                <p className="mt-3 font-bold lg:text-3xl md:text-xl sm:text-sm">コンテンツ内容</p>
                <p className="mt-3 lg:text-3xl md:text-xl sm:text-sm">サブスクリプション契約すると以下の講座が全て閲覧できます。</p>
            </div>
                <div className="xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-1 grid mx-6">
                {lessons?.map((lesson) => (
                <Link href={"/"} key={lesson.id}>
                  <div className="w-80 h-64 mx-auto my-4 border-2 border-gray-300 box-shadow overflow-hidden transform transition-transform duration-300 hover:scale-105">
                    <article className="text-wrap">
                      <h2 className="text-3xl font-semibold mb-4 mt-4">{lesson.title}</h2>
                      <p className="text-gray-500 py-4 text-ms text-left px-2">{lesson.description}</p>
                    </article>
                  </div>
                </Link>
                ))}
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
