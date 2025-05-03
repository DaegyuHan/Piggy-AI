import { OpenAI } from 'openai';
import axios from 'axios'; // Naver API 호출용

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function searchCafesFromKakao(query) {
    const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query + ' 카페')}&category_group_code=CE7&size=15`;

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}`,
            },
        });

        console.log('✅ 전체 검색 결과 수(total_count):', response.data.meta.total_count);
        console.log('✅ 이번에 가져온 개수(pageable_count):', response.data.meta.pageable_count);
        console.log('✅ 실제 받은 items 길이:', response.data.documents.length);
        // console.log('✅ 실제 받은 items:', JSON.stringify(response.data.documents, null, 2));

        return response.data.documents;
    } catch (error) {
        console.error('카카오 API 오류:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { query } = req.body;

        try {
            // 1. 카카오에서 카페 리스트 가져오기
            const cafes = await searchCafesFromKakao(query);

            // 2. 가져온 카페 리스트를 기반으로 AI 프롬프트 구성
            const cafesInfo = cafes.map((cafe, idx) => `${idx + 1}. 이름: ${cafe.place_name}`).join('\n');

            const prompt = `
                    카페 목록:
                    ${cafesInfo}
                    다음은 ${query} 주변의 카페 목록입니다. 이 카페들을 인터넷으로 검색해서 5곳을 추천해주고 이유도 한 줄로 알려주세요. 아래 형식으로 맞춰주세요.
                    
                    1. 이름: [카페이름]
                    2. 추천 이유: [한줄 추천 이유]
                    `;
            // const prompt = `
            //         카페 목록:
            //         ${cafesInfo}
            //         다음은 ${query} 주변의 카페 목록입니다. 이 중에서 5곳을 아래의 형식으로 추천해주세요. 추천 이유는 개성있게 표현해주세요.
            //         1. 이름: [카페 이름]
            //         2. 추천 이유: [한줄 추천 이유]
            //         `;
            console.log(prompt)

            // 3. OpenAI에 추천 요청
            const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'user', content: prompt },
                ],
            });

            const responseText = completion.choices[0].message.content.trim();
            console.log('########################################################');
            console.log('Received OpenAI response:', responseText);

// 4. AI 응답 파싱
            const recommendedCafes = responseText
                .split("\n\n")
                .map(item => item.trim())
                .filter(item => item.length > 0)
                .map(item => {
                    const nameMatch = item.match(/이름:\s*(.*)/);
                    const reasonMatch = item.match(/추천 이유:\s*(.*)/);

                    if (nameMatch && reasonMatch) {
                        const name = nameMatch[1].trim();
                        const reason = reasonMatch[1].trim();

                        // cafes 리스트에서 이름이 일치하는 카페의 주소 찾기
                        const matchedCafe = cafes.find(cafe => cafe.place_name === name);
                        const address = matchedCafe ? matchedCafe.address_name : '주소 정보 없음';
                        const placeUrl = matchedCafe ? matchedCafe.place_url : null;

                        return {
                            name,
                            address,
                            reason,
                            placeUrl,
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
