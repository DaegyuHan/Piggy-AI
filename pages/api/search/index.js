import { OpenAI } from 'openai';
import { searchCafesFromKakao } from '@/utils/kakaoApi';
import { createCafePrompt, parseCafeRecommendations } from '@/utils/openaiUtils';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { query } = req.body;

    try {
        const cafes = await searchCafesFromKakao(query);
        const prompt = createCafePrompt(cafes, query);
        console.log('prompt : ', prompt)

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        });

        const responseText = completion.choices[0].message.content.trim();
        console.log('responseText : ', responseText)

        const recommendedCafes = parseCafeRecommendations(responseText, cafes);

        return res.status(200).json({ recommendedCafes });
    } catch (error) {
        console.error('오류 발생:', error);
        return res.status(500).json({ error: '서버 오류' });
    }
}
