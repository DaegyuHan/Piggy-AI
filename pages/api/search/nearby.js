import {searchNearbyCafes} from '@/utils/kakaoApi';
import {getCafeRecommendations} from '@/lib/openaiCafeService';
import {createCafePrompt, parseCafeRecommendations} from "@/utils/openaiUtils";

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({error: 'Method Not Allowed'});

    const {latitude, longitude} = req.body;
    if (!latitude || !longitude) {
        return res.status(400).json({error: '위도, 경도 정보가 필요합니다.'});
    }

    try {
        const cafes = await searchNearbyCafes(latitude, longitude);
        const recommendedCafes = await getCafeRecommendations({
            cafes,
            createPrompt: (cafes) => createCafePrompt(cafes),
            parseResponse: parseCafeRecommendations,
        });

        res.status(200).json({recommendedCafes});
    } catch (error) {
        console.error('오류 발생:', error);
        res.status(500).json({error: '서버 내부 오류'});
    }
}
