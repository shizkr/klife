'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '../../../lib/supabase'

export default function PostPage() {
  const params = useParams()
  const postId = params?.id as string

  const [post, setPost] = useState<any>(null)
  const [comments, setComments] = useState<any[]>([])
  const [newComment, setNewComment] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  // 게시글 + 댓글 로딩
  useEffect(() => {
    if (!postId) return

    const fetchData = async () => {
      setLoading(true)

      const { data: postData, error: postError } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single()

      if (postError || !postData) {
        setError('해당 글을 찾을 수 없습니다 😥')
        setLoading(false)
        return
      }

      setPost(postData)

      const { data: commentData, error: commentError } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true })

      if (commentError) {
        console.error('댓글 불러오기 오류:', commentError)
        setError('댓글을 불러오는 데 실패했습니다 😢')
      } else {
        setComments(commentData)
      }

      setLoading(false)
    }

    fetchData()
  }, [postId])

  // 댓글 작성
  const handleAddComment = async () => {
    if (!newComment.trim()) return

    const { data, error } = await supabase.from('comments').insert([
      {
        post_id: postId,
        content: newComment,
        author: '익명', // 로그인 사용자 정보로 대체 가능
      },
    ])
    .select()

    if (error) {
      console.error('🔴 댓글 등록 실패:', error)
      setError('댓글 저장에 실패했습니다 😢')
    } else if (Array.isArray(data)) {
      setComments((prev) => [...prev, ...data])
      setNewComment('')
    } else if (data) {
      // 혹시라도 data가 단일 객체인 경우
      setComments((prev) => [...prev, data])
      setNewComment('')
    } else {
      // 예외적으로 data가 비어 있을 때를 방지
      console.warn('⚠️ 댓글 등록 성공했지만 반환된 데이터가 없습니다.')
      setNewComment('')
    }
  }

  if (loading) return <p className="text-gray-500">로딩 중...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">
        {post.content}
      </p>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">💬 댓글</h2>

        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="border rounded-md p-3 bg-gray-50 text-sm"
            >
              <p className="text-gray-700 whitespace-pre-line">{comment.content}</p>
              <p className="text-xs text-gray-400 mt-1">
                작성자: {comment.author} |{' '}
                {new Date(comment.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <textarea
            className="w-full p-2 border rounded-md"
            rows={3}
            placeholder="댓글을 입력하세요..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={handleAddComment}
            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            댓글 달기
          </button>
        </div>
      </div>
    </div>
  )
}
