import { Database } from '@/lib/database.types';
import { supabaseServer } from '@/src/utils/supabaseServer';
import { YouTubeEmbed } from "@next/third-parties/google";
import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { extractYouTubeVideoId } from "../../../utils/extractYoutubeVideoId";
import Link from 'next/link';

const getDetailLesson = async (
    id: number,
    supabase: SupabaseClient<Database>
) => {
    const { data: whos } = await supabase
        .from('who')
        .select("*")
        .eq("id", id)
        .single();

    return whos;
}

const getPremiumContent = async (
    id: number,
    supabase: SupabaseClient<Database>
) => {
    const { data: video } = await supabase
        .from("free_content")
        .select("video_url")
        .eq("id", id)
        .single();

    return video;
}

const WhoDetail = async ({ params }: { params: { id: number } }) => {
  const supabase = supabaseServer();
    const [lesson, video] = await Promise.all([
        getDetailLesson(params.id, supabase),
        getPremiumContent(params.id, supabase)
    ]);

    const videoId = video?.video_url ? extractYouTubeVideoId(video.video_url) : null;

    return (
        <div className='w-full max-w-3xl mx-auto py-16 px-8'>
            <h1 className='text-3xl mb-6'>{lesson?.title}</h1>
            <p className='mb-6'>{lesson?.description}</p>
            {videoId ? (
                <YouTubeEmbed height={400} videoid={videoId}/>
            ) : (
                <p>サブスクリプション会員登録しないとこの動画は見れません。</p>
            )}
            <Link className='template_button' href='/'>ホームに戻る</Link>
        </div>
    );
}

export default WhoDetail;
