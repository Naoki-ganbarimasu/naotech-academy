import { redirect } from 'next/navigation'
import Login from '@/app/components/login'
import { supabaseServer } from '@/app/utils/supabaseServer'

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
