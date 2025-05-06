import { searchNearbyCafes } from '@/utils/kakaoApi';
import { getCafeRecommendations } from '@/lib/openaiCafeService';
import { createCafePrompt, parseCafeRecommendations } from "@/utils/openaiUtils";

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const {
        latitude,
        longitude,
        page = 1,
        allCafes = [],
        previousRecommendations = []
    } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: '위도, 경도 정보가 필요합니다.' });
    }

    try {
        const cafes = page === 1
            ? await searchNearbyCafes(latitude, longitude)
            : allCafes;

        // 이전 추천 제거
        const remaining = cafes.filter(cafe =>
            !previousRecommendations.includes(cafe.place_name)
        );

        if (remaining.length === 0) {
            return res.status(200).json({ recommendedCafes: [] });
        }

        const recommendedCafes = await getCafeRecommendations({
            cafes: remaining,
            createPrompt: (cafes) => createCafePrompt(cafes),
            parseResponse: parseCafeRecommendations,
        });

        const responseData = {
            recommendedCafes,
            ...(page === 1 && { allCafes: cafes }),
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error('오류 발생:', error);
        res.status(500).json({ error: '서버 내부 오류' });
    }
}
