'use client'

import Link from 'next/link'
import useStore from '../../store/index'
import Image from 'next/image'
import { useEffect } from 'react'
import type { Session } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'
import FirstImage from '../components/user_person_profile_avatar_icon_190943.png'
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
    })
  }, [session, setUser, profile])

  return (
    <header className="shadow-lg shadow-gray-100">
      <div className="flex py-4 px-6 border-b border-gray-200">
        <Link href="/" className="font-bold text-xl cursor-pointer mr-auto">
          Naotech Academy
        </Link>

        <div className="flex space-x-4">
          {session ? (
            <div className="flex items-center space-x-5 ml-auto">
              <p>ログイン中</p>
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
              <Link href="/auth/login">ログイン</Link>
              <Link href="/auth/signup">サインアップ</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navigation
