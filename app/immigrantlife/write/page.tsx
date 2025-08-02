'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const submitPost = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요!');
      return;
    }

    const { data, error } = await supabase.from('posts').insert({
      board_type: 'immigrantlife',
      title,
      content
    });

    if (error) {
      console.error('🔴 글 저장 오류:', error);
      alert('글 저장에 실패했습니다!');
      return;
    }

    console.log('✅ 저장된 데이터:', data);
    router.push('/immigrantlife');
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">🇺🇸 이민 생활</h1>
        <h2 className="text-2xl font-bold">✏️ 글쓰기</h2>
      </div>
      <input
        className="border-2 border-black bg-white text-black p-2 w-full mb-4 rounded shadow-sm"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full h-40 mb-2"
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={submitPost}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        저장
      </button>
    </div>
  );
}
