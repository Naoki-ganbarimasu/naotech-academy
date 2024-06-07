'use client'

import type { Database } from '@/lib/database.types'
import type { Session } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useStore from '../../store/index'
import FirstImage from '../components/user_person_profile_avatar_icon_190943.png'
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

type ProfileType = Database['public']['Tables']['profiles']['Row']

// ナビゲーション
const Navigation = ({
  session,
  profile,
}: {
  session: Session | null
  profile: ProfileType | null
}) => {
  const { setUser } = useStore()

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 状態管理にユーザー情報を保存
  useEffect(() => {
    setUser({
      id: session ? session.user.id : '',
      email: session ? session.user.email! : '',
      name: session && profile ? profile.name : '',
      introduce: session && profile ? profile.introduce : '',
      avatar_url: session && profile ? profile.avatar_url : '',
      interval: session && profile ? profile.interval : null, 
      is_subscribed: session && profile ? profile.is_subscribed : null, 
      stripe_customer: session && profile ? profile.stripe_customer : null, 
    })
  }, [session, setUser, profile])


  return (
    <header className="shadow-lg shadow-gray-100">
      <div className="flex py-6 px-3 border-b border-gray-200">
        <Link href="/" className="font-bold my-auto text-xl cursor-pointer mr-auto">
          Naotech Academy
        </Link>
        <div className="flex">
          {session ? (
            <div className="flex items-center space-x-5 ml-auto">
              <Link href="/pricing" className='ml-4'>料金プラン</Link>
             
              <Link href="/auth/settings/profile" className='ml-auto space-x-4'>
                <div className="relative w-10 h-10 ml-auto">
                  <Image
                    src={profile && profile.avatar_url ? profile.avatar_url : FirstImage}
                    className="flex-item text-center w-24 h-24 flex items-center justify-center"
                    alt="avatar"
                    fill
                  />
                </div>
              </Link>
            </div>
          ) : (

            <div className={isMenuOpen ? "burger-menu open" : "burger-menu"}>
                <div className="burger-icon top-0 right-0" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {!isMenuOpen? <FiMenu className="sm:hidden text-3xl top-0 right-0" /> : <RxCross2 className="sm:hidden text-3xl top-0 right-0"/>}
              </div>
             <div className="menu-items flex-col">
                <ul>
                  <li><button className='secert_button'>
                    <Link href="/pricing"  onClick={() => setIsMenuOpen(!isMenuOpen)}>料金プラン</Link>
                  </button></li>
                  <li><button className='secert_button'>
                    <Link href="/auth/login"  onClick={() => setIsMenuOpen(!isMenuOpen)}>ログイン</Link>
                  </button></li>
                  <li><button className='secert_button'>
                      <Link href="/auth/signup"  onClick={() => setIsMenuOpen(!isMenuOpen)}>サインアップ</Link>
                  </button></li>
                 </ul>
              </div>

            <div className="sm:flex hidden">
            <button className='secert_button' >
              <Link href="/pricing">料金プラン</Link>
            </button>
            <button className='secert_button'>
              <Link href="/auth/login">ログイン</Link>
            </button>
            <button className='secert_button'>
            <Link href="/auth/signup">サインアップ</Link>
            </button>
            </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navigation
