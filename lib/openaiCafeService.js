import { OpenAI } from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 프롬프트 생성, ChatGPT 호출, 결과 파싱 메서드
export async function getCafeRecommendations({ cafes, createPrompt, parseResponse }) {
    const prompt = createPrompt(cafes);
    console.log('Generated prompt:', prompt);

    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
    });

    const responseText = completion.choices[0].message.content.trim();
    console.log('responseText:', responseText);

    return parseResponse(responseText, cafes);
}
