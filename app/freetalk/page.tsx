import Link from 'next/link'
import { supabase } from '../../lib/supabase'

const boardTitle = '🫶🏻 자유 이야기방';
const boardType = 'freetalk';

export default async function FreeTalkPage() {
  const { data: posts, error } = await supabase
  .from('posts')
  .select('*')
  .eq('board_type', boardType)
  .order('created_at', { ascending: false });


  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{boardTitle}</h1>
        <Link
          href={{
            pathname: '/write',
            query: {
              board_type: boardType,
              board_title: boardTitle,
            },
          }}
          className="bg-blue-800 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
        >
          ✍️ 글쓰기
        </Link>
      </div>

    <div className="max-w-5xl mx-auto">
      <ul className="space-y-4">
        {posts?.map((post) => (
          <li key={post.id}>
            <Link
              href={`/post/${post.id}`}
              className="block bg-blue-50 hover:bg-blue-100 rounded-md p-4 text-indigo-600 font-medium shadow-sm"
            >
              <h2 className="text-lg font-bold mb-2">{post.title}</h2>
              <p className="text-gray-700 text-sm line-clamp-5">{post.content}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
}
