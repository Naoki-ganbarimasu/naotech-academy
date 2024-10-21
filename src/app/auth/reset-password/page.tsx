import ResetPassword from "@/src/app/components/Reset-password";
import { supabaseServer } from "@/src/utils/supabaseServer";
import { redirect } from "next/navigation";

const ResetPasswordPage = async () => {
  const supabase = supabaseServer();

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return <ResetPassword />;
};

export default ResetPasswordPage;
