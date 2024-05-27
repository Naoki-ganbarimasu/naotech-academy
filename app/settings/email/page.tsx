import { redirect } from 'next/navigation'
import Email from '@/app/components/email'
import { supabaseServer } from '@/app/utils/supabaseServer'

// メールアドレス変更ページ
const EmailPage = async () => {
  const supabase = supabaseServer();


  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth/login')
  }

  return <Email email={session.user.email!} />
}

export default EmailPage
