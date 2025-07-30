import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const submitPost = async () => {
    const { data, error } = await supabase.from('posts').insert({
      board_type: 'free',
      title,
      content
    });
  
    if (error) {
      console.error('🔴 글 저장 오류:', error);
      alert('글 저장에 실패했습니다!');
      return;
    }

    console.log('저장된 데이터:', data);
    router.push('/');
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">✏️ 글 작성</h1>
      <input
        className="border p-2 w-full mb-2"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 w-full h-40 mb-2"
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={submitPost} className="bg-blue-500 text-white px-4 py-2">저장</button>
    </div>
  );
}

