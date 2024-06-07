import Email from '@/src/app/components/Email';
import { supabaseServer } from '@/src/utils/supabaseServer';
import { redirect } from 'next/navigation';

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
