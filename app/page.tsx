import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { 
  Card,
  CardContent,
  Typography
} from '@mui/material';
import Nologin from './components/Nologin';
import { supabaseServer } from './utils/supabaseServer';
import { Database } from '@/lib/database.types';

const getAllLessons = async (supabase: SupabaseClient<Database>) => {
  const { data: lessons, error: lessonsError } = await supabase.from('lesson').select('*');
  const { data: whos, error: whosError } = await supabase.from('who').select('*');

  if (lessonsError) {
    console.error('Error fetching lessons:', lessonsError);
  }
  if (whosError) {
    console.error('Error fetching whos:', whosError);
  }

  return { lessons, whos };
};

// メインページ
const Home = async () => {
  const supabase = supabaseServer();
  const { lessons, whos } = await getAllLessons(supabase);

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div>
      {session ? 
      <div　className="text-center text-xl">
        <main className="w-full max-w-3xl mx-auto my-16 px-2">
          <div className='flex flex-col gap-5'>
            <div className="border-b border-gray-300 pb-5 mb-5">
              <Typography variant="h4" component="div" gutterBottom>
                Lessons
              </Typography>
              <div className="flex justify-center flex-wrap gap-5">
                {lessons?.map((lesson) => (
                  <Link href={`premiumVideo/${lesson.id}`} key={lesson.id}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {lesson.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {lesson.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
            <div className="border-b border-gray-300 pb-5 mb-5">
              <Typography variant="h4" component="div" gutterBottom>
                北島直樹の趣味
              </Typography>
              <div className="flex justify-center flex-wrap gap-5">
                {whos?.map((who) => (
                  <Link href={`freeVideo/${who.id}`} key={who.id}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {who.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Description goes here
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div> : 
      <div>
        <Nologin />
      </div>
}
</div>
  );
};

export default Home;


