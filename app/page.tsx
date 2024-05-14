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
        const {data: lessons}  = await supabase.from('lesson').select("*");
        return lessons;
       }


// メインページ
const Home = async () => {
  const lessons = await getAllLessons();

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
          {lessons?.map((lesson) => (
            <Link href={`/${lesson.id}`} key={lesson.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                 component="img"
                 alt="green iguana"
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
        </main>
      </div> : <div>未ログイン</div>}
    </div>
  )
}

export default Home
