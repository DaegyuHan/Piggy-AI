const redis = require('@/lib/redis');

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const results = await redis.zrevrange('popular_keywords', 0, 4, 'WITHSCORES');

        const popular = [];
        for (let i = 0; i < results.length; i += 2) {
            popular.push({ keyword: results[i], count: parseInt(results[i + 1], 10) });
        }

        res.status(200).json({ popular });
    } catch (error) {
        console.error('인기 검색어 불러오기 오류:', error);
        res.status(500).json({ error: '서버 내부 오류' });
    }
}
