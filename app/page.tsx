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
    <div className="flex min-h-screen">
      {/* 왼쪽 메뉴 */}
      <aside className="w-64 bg-gray-100 pl-2 shadow-md h-screen overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 pl-4">📂 메뉴</h2>
    <ul className="space-y-2 text-sm">


  </ul>
      </aside>

      {/* 오른쪽 콘텐츠 중앙 정렬 */}
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-6">📋 게시글 목록</h1>
          <ul className="space-y-3">
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
      </main>
    </div>
  )
}
