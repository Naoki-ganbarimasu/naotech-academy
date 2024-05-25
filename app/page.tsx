import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/database.types'
import Link from 'next/link'
import { 
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';

const supabase = createServerComponentClient<Database>({ cookies })

const getAllLessons = async () => {
  const { data: lessons, error: lessonsError } = await supabase.from('lesson').select("*");
  const { data: whos, error: whosError } = await supabase.from('who').select("*");

  if (lessonsError) {
    console.error('Error fetching lessons:', lessonsError);
  }
  if (whosError) {
    console.error('Error fetching whos:', whosError);
  }

  return { lessons, whos };
}

// メインページ
const Home = async () => {
  const { lessons, whos } = await getAllLessons();

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div className="text-center text-xl">
      {session ? 
      <div>
        <main className="w-full max-w-3xl mx-auto my-16 px-2">
          <div className='flex flex-col gap-5'>
            <div className="border-b border-gray-300 pb-5 mb-5">
              <Typography variant="h4" component="div" gutterBottom>
                Lessons
              </Typography>
              <div className="flex justify-center flex-wrap gap-5">
                {lessons?.map((lesson) => (
                  <Link href={`/${lesson.id}`} key={lesson.id}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        component="img"
                        alt="lesson image"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                      />
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
                  <Link href={`/${who.id}`} key={who.id}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        component="img"
                        alt="who image"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {who.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {who.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div> : <div>未ログイン</div>}
    </div>
  )
}

export default Home
