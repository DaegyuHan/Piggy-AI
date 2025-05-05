import axios from 'axios';

export async function searchCafesFromKakao(query) {
    const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}&category_group_code=CE7`;
    const response = await axios.get(url, {
        headers: { Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}` },
    });

    const allCafes = response.data.documents;

    console.log('✅ 전체 검색 결과 수(total_count):', response.data.meta.total_count);
    console.log('✅ 이번에 가져온 개수(pageable_count):', response.data.meta.pageable_count);
    console.log('✅ 실제 받은 items 길이:', response.data.documents.length);

    // 필터링: 프랜차이즈 제거
    const blacklist = ['스타벅스', '투썸플레이스', '이디야커피', '메가커피', '컴포즈커피', '설빙', '벌툰', '보드게임', '빽다방'];
    const filtered = allCafes.filter(cafe => {
        return !blacklist.some(b => cafe.place_name.includes(b));
    });

    console.log('✅ 필터링 후 남은 카페 수:', filtered.length);

    // 만약 검색 결과가 없으면 에러
    if (filtered.length === 0) {
        throw new Error('검색 결과가 없습니다.');
    }

    return filtered;
}

export async function searchNearbyCafes(lat, lng) {
    const url = `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=CE7&x=${lng}&y=${lat}&radius=1000&size=15`;
    const response = await axios.get(url, {
        headers: { Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}` },
    });
    console.log('✅ 전체 검색 결과 수(total_count):', response.data.meta.total_count);
    console.log('✅ 이번에 가져온 개수(pageable_count):', response.data.meta.pageable_count);
    console.log('✅ 실제 받은 items 길이:', response.data.documents.length);

    const allCafes = response.data.documents;

    // 필터링: 프랜차이즈 제거
    const blacklist = ['스타벅스', '투썸플레이스', '이디야커피', '메가MGC커피', '컴포즈커피', '설빙', '벌툰', '보드게임', '빽다방'];
    const filtered = allCafes.filter(cafe => {
        return !blacklist.some(b => cafe.place_name.includes(b));
    });

    console.log('✅ 필터링 후 남은 카페 수:', filtered.length);

    // 만약 검색 결과가 없으면 에러
    if (filtered.length === 0) {
        throw new Error('검색 결과가 없습니다.');
    }
    return filtered;

}
