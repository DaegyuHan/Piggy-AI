import { searchCafesFromKakao } from '@/utils/kakaoApi';
import { getCafeRecommendations } from '@/lib/openaiCafeService';
import { createCafePrompt, parseCafeRecommendations } from "@/utils/openaiUtils";
import { increaseSearchCount } from '@/lib/rateLimiter';
const { logSearchKeyword } = require('@/lib/searchKeywordLogger');
const { getCachedResult, setCachedResult } = require('@/lib/cache');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
    const { allowed, ttl, remaining } = await increaseSearchCount(ip);

    if (!allowed) {
        return res.status(429).json({
            error: '검색 횟수 제한 초과',
            retryAfterSeconds: ttl,
            remaining: 0,
        });
    }

    const { query, page = 1, allCafes, previousRecommendations = [] } = req.body;

    if (page === 1 && !query) {
        return res.status(400).json({ error: '검색어가 필요합니다.' });
    }

    try {
        await logSearchKeyword(query);

        //  Redis에서 캐시 먼저 조회
        if (page === 1) {
            const cached = await getCachedResult(query);
            if (cached) {
                return res.status(200).json({
                    recommendedCafes: cached.recommendedCafes,
                    allCafes: cached.allCafes,
                    remaining,
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
            remaining,
        };

        // 캐시에 저장할 allCafes 정제
        if (page === 1) {
            const compactAllCafes = cafes.map(cafe => ({
                name: cafe.place_name,
                address: cafe.road_address_name,
                placeUrl: cafe.place_url,
                x: cafe.x,
                y: cafe.y,
            }));

            await setCachedResult(query, {
                recommendedCafes: recommended,
                allCafes: compactAllCafes,
            });
        }

        res.status(200).json(responseData);
    } catch (error) {
        console.error('오류 발생:', error);
        res.status(500).json({ error: '서버 내부 오류' });
    }
}
