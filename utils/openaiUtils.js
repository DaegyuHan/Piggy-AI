export function createCafePrompt(cafes) {
    const cafesInfo = cafes
        .map((cafe, idx) => `${idx + 1}. ${cafe.place_name}`)
        .join('\n');

    return `
카페 목록:
${cafesInfo}
다음 카페들 중 5곳을 추천해주고 이유도 한 줄로 알려주세요. 아래 형식으로 맞춰주세요. 보드게임, 벌툰, 설빙, 이디야, 투썸, 메가커피, 컴포즈커피 등 프랜차이즈 브랜드는 제외해주세요.

1. 이름: [카페이름]
2. 추천 이유: [한줄 추천 이유]
`;
}

export function parseCafeRecommendations(responseText, cafes) {
    const lines = responseText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const recommendations = [];

    for (let i = 0; i < lines.length; i += 2) {
        const nameMatch = lines[i]?.match(/이름:\s*(.*)/);
        const reasonMatch = lines[i + 1]?.match(/추천 이유:\s*(.*)/);

        if (nameMatch && reasonMatch) {
            const name = nameMatch[1].trim();
            const reason = reasonMatch[1].trim();
            const matchedCafe = cafes.find(cafe => cafe.place_name === name);

            recommendations.push({
                name,
                address: matchedCafe?.address_name || '주소 정보 없음',
                reason,
                placeUrl: matchedCafe?.place_url || null,
            });
        }
    }

    return recommendations;
}
