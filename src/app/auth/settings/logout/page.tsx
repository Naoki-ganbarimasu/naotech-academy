import Logout from "@/src/app/components/Logout";
import { supabaseServer } from "@/src/utils/supabaseServer";
import { redirect } from "next/navigation";

const LogoutPage = async () => {
  const supabase = supabaseServer();

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return <Logout />;
};

export default LogoutPage;
