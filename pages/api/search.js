import {OpenAI} from 'openai'; // 최신 OpenAI 라이브러리

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,  // 환경변수에서 API 키 가져오기
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { query } = req.body;  // 클라이언트에서 전달된 검색어

        const queryText = `
"${query}에 있는 인기 카페 5군데를 추천해 주세요.
각 카페의 정보는 아래 형식으로 제공해주세요:
1. 이름: [카페 이름]
2. 주소: [카페 주소]
3. 특징: [카페 특징]
또한, 최신 정보로 제공해주세요."
`;

        try {
            const completion = await openai.chat.completions.create({
                model: 'gpt-4-turbo',
                messages: [
                    { role: 'user', content: queryText },
                ],
            });

            // OpenAI 응답 받기
            const responseText = completion.choices[0].message.content.trim();
            console.log('########################################################')
            console.log('Received OpenAI response:', responseText);

            // 맛집 항목을 구분하여 파싱
            const restaurants = responseText
                .split("\n\n") // 각 맛집 항목은 빈 줄로 구분되어 있을 것
                .map(item => item.trim()) // 각 항목의 앞뒤 공백 제거
                .filter(item => item.length > 0) // 빈 항목 제거
                .map(item => {
                    const nameMatch = item.match(/이름:\s*(.*)/);
                    const addressMatch = item.match(/주소:\s*(.*)/);
                    const descriptionMatch = item.match(/특징:\s*(.*)/);

                    if (nameMatch && addressMatch && descriptionMatch) {
                        return {
                            name: nameMatch[1].trim(),
                            address: addressMatch[1].trim(),
                            description: descriptionMatch[1].trim(),
                        };
                    }
                    return null;
                })
                .filter(item => item !== null); // 잘못된 항목은 필터링

            console.log('########################################################')
            console.log('Restaurants:', restaurants);

            res.status(200).json({ restaurants });
        } catch (error) {
            console.error("OpenAI 호출 오류:", error);
            res.status(500).json({ error: 'OpenAI 호출 오류' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
