import axios from 'axios';

export async function searchCafesFromKakao(query) {
    const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}&category_group_code=CE7`;
    const response = await axios.get(url, {
        headers: { Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}` },
    });
    console.log('✅ 전체 검색 결과 수(total_count):', response.data.meta.total_count);
    console.log('✅ 이번에 가져온 개수(pageable_count):', response.data.meta.pageable_count);
    console.log('✅ 실제 받은 items 길이:', response.data.documents.length);

    // 만약 검색 결과가 없으면 에러
    if (response.data.documents.length === 0) {
        throw new Error('검색 결과가 없습니다.');
    }

    return response.data.documents;
}

export async function searchNearbyCafes(lat, lng) {
    const url = `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=CE7&x=${lng}&y=${lat}&radius=1000&size=15`;
    const response = await axios.get(url, {
        headers: { Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}` },
    });
    console.log('✅ 전체 검색 결과 수(total_count):', response.data.meta.total_count);
    console.log('✅ 이번에 가져온 개수(pageable_count):', response.data.meta.pageable_count);
    console.log('✅ 실제 받은 items 길이:', response.data.documents.length);
    return response.data.documents;
}
