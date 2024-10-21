import Signup from '@/src/app/components/Signup';
import { redirect } from 'next/navigation';

import { supabaseServer } from '@/src/utils/supabaseServer';

const SignupPage = async () => {
  const supabase = supabaseServer();

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect('/')
  }

  return <Signup />
}

export default SignupPage
