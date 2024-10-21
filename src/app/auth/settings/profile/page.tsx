import Profile from "@/src/app/components/Profile";
import { redirect } from "next/navigation";

import { supabaseServer } from "@/src/utils/supabaseServer";

const ProfilePage = async () => {
  const supabase = supabaseServer();

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return <Profile />;
};

export default ProfilePage;
