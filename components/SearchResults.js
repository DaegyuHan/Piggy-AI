import React from 'react';

function SearchResults() {
    const restaurants = [
        {
            name: "본지르르",
            address: "수원 팔달구",
            description: "정통 한식 맛집",
        },
        {
            name: "맛집2",
            address: "서울 마포구",
            description: "피자 전문점",
        },
        {
            name: "맛집3",
            address: "서울 송파구",
            description: "일식당",
        },
        {
            name: "맛집4",
            address: "서울 용산구",
            description: "중식 레스토랑",
        },
        {
            name: "맛집5",
            address: "서울 강서구",
            description: "베트남 음식점",
        }
    ];

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg flex-grow w-full">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">추천 맛집</h2>
            <ul className="space-y-4">
                {restaurants.map((restaurant, index) => (
                    <li key={index} className="border p-4 rounded-lg hover:bg-gray-50 transition-colors">
                        <h3 className="text-xl font-semibold text-gray-800">{restaurant.name}</h3>
                        <p className="text-gray-600">{restaurant.address}</p>
                        <p className="text-gray-600 mb-2">{restaurant.description}</p>
                        <a
                            href={"https://map.naver.com/p/search/" + restaurant.name}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            네이버 지도에서 보기
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchResults;
