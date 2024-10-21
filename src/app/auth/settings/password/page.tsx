import Password from "@/src/app/components/Password";
import { supabaseServer } from "@/src/utils/supabaseServer";
import { redirect } from "next/navigation";

const PasswordPage = async () => {
  const supabase = supabaseServer();

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return <Password />;
};

export default PasswordPage;
