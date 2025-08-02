'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const boardType = 'freetalk';

  const submitPost = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요!');
      return;
    }
  const { data, error } = await supabase
    .from('posts')
    .insert([{ board_type: boardType, title, content }])
    .select();

    if (error || !data || data.length === 0) {
      console.error('🔴 글 저장 오류:', error);
      alert('글 저장에 실패했습니다!');
      return;
    }

    const postId = data[0].id;
    console.log('✅ 저장된 데이터:', postId);

    // 2. ChatGPT API 호출
    try {
      const gptRes = await fetch('/api/chatgpt-comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          boardType
         }),
      });

    if (!gptRes.ok) {
      const errorData = await gptRes.json();
      console.warn('⚠️ AI 댓글 생성 실패:', errorData?.error || '서버 오류');
    } else {
      const gptData = await gptRes.json();
      const reply = gptData.comment?.trim(); // ✅ comment 키 확인

      if (reply) {
        const { error: commentError } = await supabase.from('comments').insert([
          {
            post_id: postId,
            content: reply,
            author: '🤖 AI',
          },
        ]);

        if (commentError) {
          console.warn('⚠️ 댓글 저장 실패:', commentError);
        }
      }
    }
  } catch (err) {
    console.warn('⚠️ GPT API 예외 발생, 댓글 스킵:', err);
  }

    // 4. 글 상세 페이지로 이동
    router.push(`/post/${postId}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">🫶🏻 우리들의 이야기방</h1>
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