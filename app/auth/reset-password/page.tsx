import { redirect } from 'next/navigation'
import ResetPassword from '@/app/components/reset-password'
import { supabaseServer } from '@/app/utils/supabaseServer'

// パスワードリセットページ
const ResetPasswordPage = async () => {
  const supabase = supabaseServer();
 
  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 認証している場合、リダイレクト
  if (session) {
    redirect('/')
  }

  return <ResetPassword />
}

export default ResetPasswordPage
