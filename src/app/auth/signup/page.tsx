import Signup from '@/src/app/components/Signupa';
import { redirect } from 'next/navigation';

import { supabaseServer } from '@/src/utils/supabaseServer';

// サインアップページ
const SignupPage = async () => {
  const supabase = supabaseServer();

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 認証している場合、リダイレクト
  if (session) {
    redirect('/')
  }

  return <Signup />
}

export default SignupPage
