// app/api/chatgpt-comment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const systemPrompts: Record<string, string> = {
  freetalk: '당신은 따뜻하고 공감 능력이 뛰어난 상담사입니다. 누군가가 자신의 감정을 표현한 글을 올렸을 때, 진심 어린 관심과 위로를 담은 댓글을 남겨주세요. 정중하고 부드러운 말투로, 상대방이 위로받고 존중받는 느낌을 받을 수 있도록 도와주세요. 400자 이내로 작성해주세요.',
  immigrantlife: '당신은 이민 생활에 대해 잘아는 따뜻하고 공감 능력이 뛰어난 조언자입니다. 해외 생활의 어려움을 고려하고 상대방이 위로받고 존중받는 느낌을 받을 수 있도록 도와주세요. 400자 이내로 작성해주세요.',
  investment: '당신은 투자 전문가입니다. 경제 상황을 잘 고려하여 조언을 해주세요. 400자 이내로 작성해주세요.',
  default: '이 글에 적절한 댓글을 작성해주세요. 400자 이내로 작성해주세요.',
};

export async function POST(req: NextRequest) {
  try {
    const { content, board_type} = await req.json();

    if (!content || typeof content !== 'string') {
      return NextResponse.json({ error: 'content가 필요합니다.' }, { status: 400 });
    }

    const systemMessage = systemPrompts[board_type] || systemPrompts.default;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const comment = completion.choices[0]?.message?.content?.trim();

    if (!comment) {
      return NextResponse.json({ error: 'AI가 댓글을 생성하지 못했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ comment });
  } catch (error) {
    console.error('❌ GPT 댓글 생성 오류:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
