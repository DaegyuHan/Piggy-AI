// components/PopularSearches.tsx

export default function PopularSearches() {
    // 더미 데이터
    const popularKeywords = ["수원 행궁동", "강남역", "제주 구좌", "제주 애월", "수원역"];

    return (
        <div className="w-full max-w-2xl mt-4 p-4 bg-white rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">인기 검색어 TOP 5</h2>
            <ul className="space-y-2">
                {popularKeywords.map((keyword, index) => (
                    <li key={index} className="flex items-center space-x-3">
                        <span className="text-lg font-bold text-indigo-600">{index + 1}</span>
                        <span className="text-gray-700">{keyword}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
