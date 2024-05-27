import { redirect } from 'next/navigation'
import Password from '@/app/components/password'
import { supabaseServer } from '@/app/utils/supabaseServer'

// パスワード変更ページ
const PasswordPage = async () => {
  const supabase = supabaseServer();

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 未認証の場合、リダイレクト
  if (!session) {
    redirect('/auth/login')
  }

  return <Password />
}

export default PasswordPage
