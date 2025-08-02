import Link from 'next/link'
import { supabase } from '../../lib/supabase'

export default async function ImmigrantlifePage() {
  const { data: posts, error } = await supabase
  .from('posts')
  .select('*')
  .eq('board_type', 'immigrantlife')
  .order('created_at', { ascending: false });

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold"> 🇺🇸이민 생활</h1>
        <Link
          href="/immigrantlife/write"
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700">
          ✍️ 글쓰기
        </Link>
      </div>

    <div className="max-w-2xl mx-auto">
      <ul className="space-y-4">
        {posts?.map((post) => (
          <li key={post.id}>
            <Link
              href={`/post/${post.id}`}
              className="block bg-blue-50 hover:bg-blue-100 rounded-md p-4 text-indigo-600 font-medium shadow-sm"
            >
              <h2 className="text-lg font-bold mb-2">{post.title}</h2>
              <p className="text-gray-700 text-sm line-clamp-2">{post.content}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
}
