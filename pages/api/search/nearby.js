import { searchNearbyCafes } from '@/utils/kakaoApi';
import { getCafeRecommendations } from '@/lib/openaiCafeService';
import { createCafePrompt, parseCafeRecommendations } from "@/utils/openaiUtils";
import { increaseSearchCount } from '@/lib/rateLimiter';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
    const { allowed, ttl, remaining } = await increaseSearchCount(ip);

    if (!allowed) {
        return res.status(429).json({
            error: '검색 횟수 제한 초과',
            retryAfterSeconds: ttl,
            remaining: 0,
        });
    }

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

        const filtered = cafes.filter(cafe =>
            !previousRecommendations.includes(cafe.place_name)
        );

        if (filtered.length === 0) {
            return res.status(200).json({
                recommendedCafes: [],
                remaining, // ✅ 여기도 포함
            });
        }

        const recommendedCafes = await getCafeRecommendations({
            cafes: filtered,
            createPrompt: createCafePrompt,
            parseResponse: parseCafeRecommendations,
        });

        const responseData = {
            recommendedCafes,
            ...(page === 1 && { allCafes: cafes }),
            remaining, // ✅ 프론트에 검색 가능 횟수 전달
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error('오류 발생:', error);
        res.status(500).json({ error: '서버 내부 오류' });
    }
}
