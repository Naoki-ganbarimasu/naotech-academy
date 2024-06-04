import ResetPassword from '@/src/app/components/reset-password';
import { supabaseServer } from '@/src/utils/supabaseServer';
import { redirect } from 'next/navigation';

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
