import { Database } from "@/lib/database.types";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { supabaseServer } from "../utils/supabaseServer";
import Nologin from "./components/Nologin";

const getAllLessons = async (supabase: SupabaseClient<Database>) => {
  const { data: lessons, error: lessonsError } = await supabase
    .from("lesson")
    .select("*");
  const { data: whos, error: whosError } = await supabase
    .from("who")
    .select("*");

  if (lessonsError) {
    console.error("Error fetching lessons:", lessonsError);
  }
  if (whosError) {
    console.error("Error fetching whos:", whosError);
  }

  return { lessons, whos };
};

const Home = async () => {
  const supabase = supabaseServer();
  const { lessons, whos } = await getAllLessons(supabase);

  const {
    data: { session }
  } = await supabase.auth.getSession();

  return (
    <div className="text-center text-xl">
      {session ? (
        <main className="w-full mx-auto my-16 px-2">
          <div className="gap-5">
            <div className="border-b pb-5 mb-5">
              <div>Lessons</div>
              <div>※サブスクリプション会員限定</div>
              <div className="xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-1 grid mx-6">
                {lessons?.map((lesson) => (
                  <Link href={`premiumVideo/${lesson.id}`} key={lesson.id}>
                    <div className="w-80 h-64 mx-auto my-4 border-2 border-gray-300 box-shadow overflow-hidden transform transition-transform duration-300 hover:scale-105">
                      <article className="text-wrap">
                        <h2 className="text-3xl font-semibold mb-4 mt-4">
                          {lesson.title}
                        </h2>
                        <p className="text-gray-500 text-ms text-left px-2">
                          {lesson.description}
                        </p>
                      </article>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
      ) : (
        <Nologin />
      )}
    </div>
  );
};

export default Home;
