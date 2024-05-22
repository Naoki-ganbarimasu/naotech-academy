import React from 'react'
import { Button } from '@mui/material';
import { SupabaseClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { profile } from 'console';

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


    const supabase = createServerComponentClient({ cookies });
    const profile = await getProfileData(supabase);

  return (
    <div className='w-full max-w-3xl mx-auto py--16 px-8'>
      <h1>ユーザー管理ダッシュボード</h1>
      <div>
        <div>
            {profile?.is_subcribed ? `プラン契約中:${profile.interval}`:"プラン未加入"}
            </div>
        <Button variant="contained">ユーザーボタン管理をする</Button>
      </div>
    </div>
  )
}

export default Dashboard;
