'use client'

import Link from 'next/link'
import useStore from '../../store/index'
import Image from 'next/image'
import { useEffect } from 'react'
import type { Session } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'
import FirstImage from '../components/user_person_profile_avatar_icon_190943.png'
import { Button, Chip } from '@mui/material'
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

  // 状態管理にユーザー情報を保存
  useEffect(() => {
    setUser({
      id: session ? session.user.id : '',
      email: session ? session.user.email! : '',
      name: session && profile ? profile.name : '',
      introduce: session && profile ? profile.introduce : '',
      avatar_url: session && profile ? profile.avatar_url : '',
      interval: session && profile ? profile.interval : null, // 追加
      is_subscribed: session && profile ? profile.is_subscribed : null, // 追加
      stripe_customer: session && profile ? profile.stripe_customer : null, // 追加
    })
  }, [session, setUser, profile])


  return (
    <header className="shadow-lg shadow-gray-100">
      <div className="flex py-4 px-6 border-b border-gray-200">
        <Link href="/" className="font-bold text-xl cursor-pointer mr-auto">
          Naotech Academy
        </Link>

        {/* {session && (
          <Link href={"/dashvoard"} className='ml-4'>ダッシュボード</Link>
        )} */}

        <div className="flex space-x-4">
          {session ? (
            <div className="flex items-center space-x-5 ml-auto">
              <Link href="/pricing"　className='ml-4'>料金プラン</Link>
              <Chip
        color="success"
        label={
          <span>ログイン中</span>
        }
      />
              <Link href="/settings/profile" className='ml-auto space-x-4'>
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
            <div className="flex items-center space-x-5">
            <button className='template_button' >
              <Link href="/pricing">料金プラン</Link>
            </button>
            <button className='template_button'>
              <Link href="/auth/login">ログイン</Link>
            </button>
            <button className='template_button'>
            <Link href="/auth/signup">サインアップ</Link>
            </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navigation
