import { supabaseServer } from '@/src/utils/supabaseServer';
import { redirect } from 'next/navigation';
import Login from '../../components/Login';

const LoginPage = async () => {
  const supabase = supabaseServer();

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect('/')
  }

  return <Login />
}

export default LoginPage
