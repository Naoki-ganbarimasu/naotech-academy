import React from 'react'
import { Database } from '@/lib/database.types';
import { SupabaseClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers"
import { YouTubeEmbed } from "@next/third-parties/google"

const getDetailLesson = async (
    id: number,
    supabase: SupabaseClient<Database>
) => {
    const {data: lessons}  = await supabase.
    from('lesson')
    .select("*")
    .eq("id", id)
    .single();

return lessons;
}

const getPremiumContent = async (
  id: number,
  supabase: SupabaseClient<Database>
) => {
  const {data: video}  = await supabase
  .from("premium_content")
  .select("video_url")
  .eq("id", id)
  .single();

  console.log(video)
return video;
}

const LessonDatailLessoon = async ({params}: {params: {id: number}}) => {
const supabase = createServerComponentClient<Database>({ cookies })
const [lesson, video] = await Promise.all([
  await getDetailLesson(params.id, supabase),
  await getPremiumContent(params.id, supabase)
])

  
     return (
    <div className='w-full max-w-3xl mx-auto  py-16 px-8'>
      <h1 className='text-3xl mb-6'>{lesson?.title}</h1>
      <p className='mb-6'>{lesson?.description}</p>
      <YouTubeEmbed height={400} videoid='f_lAEnkn8jI'/>
    </div>
  )
}

export default LessonDatailLessoon;

// exists( 
//   select 1 from profiles
//   where auth.uid() = profiles.id 
//   and
//   profiles.is_subcribed = true
// )