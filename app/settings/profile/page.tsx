import { redirect } from 'next/navigation'
import Profile from '@/app/components/profile'

import type { Database } from '@/lib/database.types'
import { supabaseServer } from '@/app/utils/supabaseServer';

const ProfilePage = async () => {
  const supabase = supabaseServer();

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 未認証の場合、リダイレクト
  if (!session) {
    redirect('/auth/login')
  }

  return <Profile />
}

export default ProfilePage
