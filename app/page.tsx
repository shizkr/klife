import Link from 'next/link'
import { supabase } from '../lib/supabase'

export default async function Home() {
  const { data: posts, error } = await supabase.from('posts').select('*')

  if (error) {
    console.error('Supabase Error:', error)
    return (
      <div className="flex min-h-screen">
        {/* 에러 메시지도 중앙에 */}
        <main className="flex-1 flex items-center justify-center">
          <p className="text-red-500 text-lg">⚠️ 에러가 발생했어요 😢</p>
        </main>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <ul className="space-y-2">
        {posts?.map((post) => (
          <li key={post.id}>
            <Link
              href={`/post/${post.id}`}
              className="block bg-blue-50 hover:bg-blue-100 rounded-md p-3 text-blue-700 font-medium shadow-sm"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}