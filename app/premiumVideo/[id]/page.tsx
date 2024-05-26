import { Database } from '@/lib/database.types';
import { YouTubeEmbed } from "@next/third-parties/google";
import { SupabaseClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { extractYouTubeVideoId } from "../../utils/extractYoutubeVideoId";

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

return video;
}

const LessonDatailLessoon = async ({params}: {params: {id: number}}) => {
const supabase = createServerComponentClient<Database>({ cookies })
const [lesson, video] = await Promise.all([
  await getDetailLesson(params.id, supabase),
  await getPremiumContent(params.id, supabase)
])

const videoId = extractYouTubeVideoId(video?.video_url!) 

  
     return (
    <div className='w-full max-w-3xl mx-auto  py-16 px-8'>
      <h1 className='text-3xl mb-6'>{lesson?.title}</h1>
      <p className='mb-6'>{lesson?.description}</p>
      <YouTubeEmbed height={400} videoid={videoId}/>
    </div>
  )
}

export default LessonDatailLessoon;










// import { SupabaseClient, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { YouTubeEmbed } from "@next/third-parties/google";
// import { extractYouTubeVideoId } from "../utils/extractYoutubeVideoId";
// import { Database } from "@/lib/database.types";
// import { cookies } from 'next/headers';
// // import { supabaseServer } from "../utils/supabaseServer";

// const LessonDetails = async ({ params }: { params: { id: number } }) => {
//   const supabase = createClientComponentClient<Database>({cookies});

//   const getDetailLesson = async (
//     id: number,
//     supabase: SupabaseClient<Database>
//   ) => {
//     const { data: lesson } = await supabase
//       .from("lesson")
//       .select("*")
//       .eq("id", id)
//       .single();
//     return lesson;
//   };

//   const getPremiumContent = async (
//     id: number,
//     supabase: SupabaseClient<Database>
//   ) => {
//     const { data: video } = await supabase
//       .from("premium_content")
//       .select("video_url")
//       .eq("id", id)
//       .single();

//     return video;
//   };

//   const [detailLesson, video] = await Promise.all([
//     await getDetailLesson(params.id, supabase),
//     await getPremiumContent(params.id, supabase),
//   ]);
//   const videoId = extractYouTubeVideoId(video?.video_url!) as string;

//   return (
//     <div className="w-full max-w-3xl mx-auto py-16 px-8">
//       <h1 className="text-3xl mb-6">{detailLesson?.title}</h1>
//       <p className="mb-8">{detailLesson?.description}</p>
//       <YouTubeEmbed height={400} videoid={videoId} />
//     </div>
//   );
// };

// export default LessonDetails;