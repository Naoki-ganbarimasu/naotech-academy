import React from 'react'
import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import SubscriptionManagementButton from '../components/checkout/SubscriptionManagementButton';
import { supabaseServer } from '../utils/supabaseServer';

const getProfileData = async (supabase: SupabaseClient) => {
    const { data: profiles, error } = await supabase.from('profiles').select('*').single();

    if (error) {
        console.error('Error fetching profile data:', error);
        return null;
    }

    if (profiles.length === 0) {
        console.error('No profiles found');
        return null;
    }

    return profiles;
};


const Dashboard = async () => {


  const supabase = supabaseServer();
    const profile = await getProfileData(supabase);
    

  return (
    <div className='w-full max-w-3xl mx-auto py--16 px-8'>
      <h1>ユーザー管理ダッシュボード</h1>
      <div className='mb-3'>
        <div className='mb-3'>
            {profile?.is_subscribed ? `プラン契約中:${profile.interval}` : "プラン未加入"}
            </div>
            <SubscriptionManagementButton />
      </div>
    </div>
  )
}

export default Dashboard;
