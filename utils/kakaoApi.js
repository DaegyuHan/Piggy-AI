const axios = require('axios');

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

        return response.data.documents;
    } catch (error) {
        console.error('카카오 API 오류:', error.response ? error.response.data : error.message);
        throw error;
    }
}

module.exports = {
    searchCafesFromKakao,
};
