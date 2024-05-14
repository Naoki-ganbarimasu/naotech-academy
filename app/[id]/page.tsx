import React from 'react'
import { Database } from '@/lib/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers"

const supabase = createServerComponentClient<Database>({ cookies })

const getAllLessons = async (id: number) => {
    const {data: lessons}  = await supabase.
    from('lesson')
    .select("*")
    .eq("id", id)
    .single();

return lessons;
}
const LessonDatailLessoon = async ({params}: {params: {id: number}}) => {
    const lesson = await getAllLessons(params.id);
  return (
    <div className='w-full max-w-3xl mx-auto  py-16 px-8'>
      <h1 className='text-3xl mb-6'>{lesson?.title}</h1>
      <p className='mb-6'>{lesson?.description}</p>
    </div>
  )
}

export default LessonDatailLessoon;
