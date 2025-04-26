import { OpenAI } from 'openai';
import axios from 'axios'; // Naver API 호출용

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function searchCafesFromNaver(query) {
    const url = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(query + ' 주변 카페')}&display=10&start=1`;

    const response = await axios.get(url, {
        headers: {
            'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
            'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
        },
    });

    console.log('✅ 전체 검색 결과 수(total):', response.data.total);
    console.log('✅ 이번에 가져온 개수(display):', response.data.display);
    console.log('✅ 실제 받은 items 길이:', response.data.items.length);
    console.log('✅ 실제 받은 items:', JSON.stringify(response.data.items, null, 2));

    return response.data.items; // 카페 리스트
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { query } = req.body;

        try {
            // 1. 네이버에서 카페 리스트 가져오기
            const cafes = await searchCafesFromNaver(query);

            // 2. 가져온 카페 리스트를 기반으로 AI 프롬프트 구성
            const cafesInfo = cafes.map((cafe, idx) => `${idx + 1}. 이름: ${cafe.title.replace(/<[^>]*>?/g, '')}, 주소: ${cafe.address}`).join('\n');

            const prompt = `
                    카페 목록:
                    ${cafesInfo}
                    다음은 ${query} 주변의 카페 목록입니다. 이 중에서 5곳을 아래의 형식으로 추천해주세요.
                    1. 이름: [카페 이름]
                    2. 주소: [카페 주소]
                    3. 추천 이유: [한줄 추천 이유]
                    `;
            // console.log(prompt)

            // 3. OpenAI에 추천 요청
            const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'user', content: prompt },
                ],
            });

            const responseText = completion.choices[0].message.content.trim();
            console.log('########################################################');
            // console.log('Received OpenAI response:', responseText);

            // 4. AI 응답 파싱
            const recommendedCafes = responseText
                .split("\n\n")
                .map(item => item.trim())
                .filter(item => item.length > 0)
                .map(item => {
                    const nameMatch = item.match(/이름:\s*(.*)/);
                    const addressMatch = item.match(/주소:\s*(.*)/);
                    const reasonMatch = item.match(/추천 이유:\s*(.*)/);

                    if (nameMatch && addressMatch && reasonMatch) {
                        return {
                            name: nameMatch[1].trim(),
                            address: addressMatch[1].trim(),
                            reason: reasonMatch[1].trim(),
                        };
                    }
                    return null;
                })
                .filter(item => item !== null);

            res.status(200).json({ recommendedCafes });
        } catch (error) {
            console.error('오류 발생:', error);
            res.status(500).json({ error: '서버 오류' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
