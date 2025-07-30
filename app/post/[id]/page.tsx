import { supabase } from '../../../lib/supabase'

export default async function PostPage({ params }: { params: { id: string } }) {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !post) {
    return <p className="text-red-500">해당 글을 찾을 수 없습니다 😥</p>
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}
