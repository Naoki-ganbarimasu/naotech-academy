import Password from '@/src/app/components/Passworda';
import { supabaseServer } from '@/src/utils/supabaseServer';
import { redirect } from 'next/navigation';

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
