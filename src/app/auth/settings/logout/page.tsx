import Logout from '@/src/app/components/logout';
import { supabaseServer } from '@/src/utils/supabaseServer';
import { redirect } from 'next/navigation';

// ログアウトページ
const LogoutPage = async () => {
  const supabase = supabaseServer();

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 未認証の場合、リダイレクト
  if (!session) {
    redirect('/auth/login')
  }

  return <Logout />
}

export default LogoutPage
