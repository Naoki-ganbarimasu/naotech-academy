import Profile from '@/src/app/components/Profile';
import { redirect } from 'next/navigation';

import { supabaseServer } from '@/src/utils/supabaseServer';

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
