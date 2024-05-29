import React from 'react'
import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import SubscriptionManagementButton from '../components/checkout/SubscriptionManagementButton';
import { supabaseServer } from '../utils/supabaseServer';
import { Database } from '@/lib/database.types';

const getProfileData = async (supabase: SupabaseClient<Database>) => {
    const { data: profiles, error } = await supabase.from('profiles').select('*').single();
    if (error) throw error;
    return profiles;
};

const Dashboard = async () => {
  const supabase = supabaseServer();
  const profiles = await getProfileData(supabase);

  return (
    <div className='w-full max-w-3xl mx-auto py-16 px-8'>
      <h1>ユーザー管理ダッシュボード</h1>
      <div className='mb-3'>
        {profiles?.is_subscribed ? (
          <div>プラン契約中: {profiles.interval}</div>
        ) : (
          <div>プラン未加入</div>
        )}
        <SubscriptionManagementButton />
      </div>
    </div>
  )
}

export default Dashboard;
