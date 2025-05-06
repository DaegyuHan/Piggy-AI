import { searchCafesFromKakao } from '@/utils/kakaoApi';
import { getCafeRecommendations } from '@/lib/openaiCafeService';
import { createCafePrompt, parseCafeRecommendations } from "@/utils/openaiUtils";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { query, page = 1, allCafes, previousRecommendations = [] } = req.body;

    if (page === 1 && !query) {
        return res.status(400).json({ error: '검색어가 필요합니다.' });
    }

    try {
        // 첫 요청이면 Kakao API로부터 새로 가져오기
        const cafes = page === 1
            ? await searchCafesFromKakao(query)
            : allCafes;

        // 이전 추천 제외
        const filtered = cafes.filter(cafe => !previousRecommendations.includes(cafe.place_name));

        if (filtered.length === 0) {
            return res.status(200).json({ recommendedCafes: [] });
        }

        const recommended = await getCafeRecommendations({
            cafes: filtered,
            createPrompt: (cafes) => createCafePrompt(cafes),
            parseResponse: parseCafeRecommendations,
        });

        // page === 1인 경우는 allCafes도 같이 내려보냄
        const responseData = {
            recommendedCafes: recommended,
            ...(page === 1 && { allCafes: cafes })
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error('오류 발생:', error);
        res.status(500).json({ error: '서버 내부 오류' });
    }
}
