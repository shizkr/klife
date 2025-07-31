import Link from 'next/link'
import { supabase } from '../../lib/supabase'

export default function FreeTalkPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">🫶🏻 우리들의 이야기방</h1>
        <Link
          href="/freetalk/write"
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700">
          ✍️ 글쓰기
        </Link>
        <Link
          href="/freetalk/write"
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700">
          ✍️ 글쓰
        </Link>
      </div>

      <ul className="space-y-2">
        <li>• 오늘 Irvine 날씨 정말 좋네요!</li>
        <li>• 맛집 추천 부탁드려요 😋</li>
        {/* 글 목록들 나중에 map으로 처리 */}
      </ul>
    </div>
  )
}
