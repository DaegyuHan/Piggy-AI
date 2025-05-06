import { searchCafesFromKakao } from '@/utils/kakaoApi';
import { createCafePrompt, parseCafeRecommendations } from '@/utils/openaiUtils';
import { getCafeRecommendations } from '@/lib/openaiCafeService';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const { query } = req.body;

    try {
        const cafes = await searchCafesFromKakao(query);
        const recommendedCafes = await getCafeRecommendations({
            cafes,
            createPrompt: (cafes) => createCafePrompt(cafes),
            parseResponse: parseCafeRecommendations,
        });

        res.status(200).json({ query, recommendedCafes });
    } catch (error) {
        console.error('오류 발생:', error);
        res.status(500).json({ error: '서버 오류' });
    }
}
