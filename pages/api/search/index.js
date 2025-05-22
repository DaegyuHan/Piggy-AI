import { searchCafesFromKakao } from '@/utils/kakaoApi';
import { getCafeRecommendations } from '@/lib/openaiCafeService';
import { createCafePrompt, parseCafeRecommendations } from "@/utils/openaiUtils";
const { logSearchKeyword } = require('@/lib/searchKeywordLogger');
const { getCachedResult, setCachedResult } = require('@/lib/cache');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { query, page = 1, allCafes, previousRecommendations = [] } = req.body;

    if (page === 1 && !query) {
        return res.status(400).json({ error: '검색어가 필요합니다.' });
    }

    try {
        //  Redis에서 캐시 먼저 조회
        if (page === 1) {
            const cached = await getCachedResult(query);
            if (cached) {
                return res.status(200).json({
                    recommendedCafes: cached.recommendedCafes,
                    allCafes: cached.allCafes,
                });
            }
        }

        // 기존 로직 실행
        const cafes = page === 1
            ? await searchCafesFromKakao(query)
            : allCafes;

        const filtered = cafes.filter(cafe => !previousRecommendations.includes(cafe.place_name));

        if (filtered.length === 0) {
            return res.status(200).json({ recommendedCafes: [] });
        }

        const recommended = await getCafeRecommendations({
            cafes: filtered,
            createPrompt: (cafes) => createCafePrompt(cafes),
            parseResponse: parseCafeRecommendations,
        });

        const responseData = {
            recommendedCafes: recommended,
            ...(page === 1 && { allCafes: cafes }),
        };

        // 첫 요청이라면 캐시에 저장
        if (page === 1) {
            await setCachedResult(query, {
                recommendedCafes: recommended,
                allCafes: cafes,
            });
        }

        console.timeEnd('⏱️ /api/search total');
        res.status(200).json(responseData);
    } catch (error) {
        console.error('오류 발생:', error);
        res.status(500).json({ error: '서버 내부 오류' });
    }
}
