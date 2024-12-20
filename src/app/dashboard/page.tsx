export const dynamic = "force-dynamic";

import { Database } from "@/lib/database.types";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { supabaseServer } from "../../utils/supabaseServer";
import SubscriptionManagementButton from "../components/checkout/SubscriptionManagementButton";
import Image from "next/image";

const getProfileData = async (
  supabase: SupabaseClient<Database>,
  userId: string
) => {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return profile;
};

const Dashboard = async () => {
  const supabase = supabaseServer();
  const {
    data: { session }
  } = await supabase.auth.getSession();
  if (!session) {
    redirect("/login");
  }

  const profile = await getProfileData(supabase, session.user.id);

  return (
    <div className="w-full max-w-3xl mx-auto py-16 px-8 min-h-screen">
      <h1 className="text-3xl mb-6">ユーザー管理ダッシュボード</h1>
      <div className="mb-3">
        {profile?.is_subscribed
          ? `プラン契約中: ${profile.interval}`
          : "プラン未加入"}
      </div>
      <div>
        <Image
          className="h-auto w-auto rounded"
          src={profile.interval === "month" ? "/month.jpg" : "/year.jpg"}
          alt={'price'}
          width={500}
          height={500}
        />
      </div>
      <div>
        <SubscriptionManagementButton />
      </div>
    </div>
  );
};

export default Dashboard;
