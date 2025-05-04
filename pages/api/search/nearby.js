import { OpenAI } from 'openai';
import axios from 'axios';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function searchNearbyCafes(lat, lng) {
    const url = `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=CE7&x=${lng}&y=${lat}&radius=1000&size=15`;

    const response = await axios.get(url, {
        headers: { Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}` },
    });

    return response.data.documents;
}

function createPrompt(cafes) {
    const cafesInfo = cafes
        .map((cafe, idx) => `${idx + 1}. 이름: ${cafe.place_name}`)
        .join('\n');

    return `
카페 목록:
${cafesInfo}
다음은 현재 위치 주변 1km 이내의 카페 목록입니다. 이 중 5곳을 추천해주시고, 한 줄 추천 이유도 알려주세요. 프랜차이즈 카페는 제외해주세요.

1. 이름: [카페이름]
2. 추천 이유: [한줄 이유]
    `;
}

function parseAIResponse(responseText, cafes) {
    return responseText
        .split("\n\n")
        .map(item => item.trim())
        .filter(item => item)
        .map(item => {
            const nameMatch = item.match(/이름:\s*(.*)/);
            const reasonMatch = item.match(/추천 이유:\s*(.*)/);

            if (nameMatch && reasonMatch) {
                const name = nameMatch[1].trim();
                const reason = reasonMatch[1].trim();
                const matched = cafes.find(c => c.place_name === name);

                return {
                    name,
                    reason,
                    address: matched?.address_name || '주소 정보 없음',
                    placeUrl: matched?.place_url || null,
                };
            }
            return null;
        })
        .filter(Boolean);
}

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: '위도, 경도 정보가 필요합니다.' });
    }

    try {
        const cafes = await searchNearbyCafes(latitude, longitude);
        const prompt = createPrompt(cafes);

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        });

        const responseText = completion.choices[0].message.content.trim();
        console.log('responseText : ', responseText)
        const recommendedCafes = parseAIResponse(responseText, cafes);

        res.status(200).json({ recommendedCafes });
    } catch (error) {
        console.error('오류 발생:', error);
        res.status(500).json({ error: '서버 내부 오류' });
    }
}
