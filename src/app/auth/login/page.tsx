import Login from '@/src/app/components/Login';
import { supabaseServer } from '@/src/utils/supabaseServer';
import { redirect } from 'next/navigation';

// ログインページ
const LoginPage = async () => {
  const supabase = supabaseServer();

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 認証している場合、リダイレクト
  if (session) {
    redirect('/')
  }

  return <Login />
}

export default LoginPage
