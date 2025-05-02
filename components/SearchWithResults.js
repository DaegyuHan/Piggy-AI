'use client'

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchWithResults() {
    const [query, setQuery] = useState("");
    const [restaurants, setRestaurants] = useState([]);

    const handleSearch = async () => {
        if (!query.trim()) return; // 빈 문자열이면 리턴

        try {
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Data from server:', data);
                setRestaurants(data.recommendedCafes); // 서버에서 받은 맛집 정보로 상태 업데이트
            } else {
                console.error("호출 실패");
            }
        } catch (error) {
            console.error("에러 발생", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-start pt-16 h-screen bg-gray-100 w-full">
            <div className="relative w-2/3">
                <input
                    type="text"
                    placeholder="동네를 입력하세요"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full py-5 pl-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSearch}
                    className="absolute right-2 top-5 text-gray-500">
                    <FaSearch size={25} />
                </button>
            </div>

            <div className="mt-8 w-2/3">
                <h2>추천 맛집</h2>
                <ul>
                    {restaurants.length > 0 ? (
                        restaurants.map((restaurant, index) => (
                            <li key={index} className="p-4 border-b">
                                <h3 className="font-semibold">{restaurant.name}</h3>
                                <p>{restaurant.address}</p>
                                <p>{restaurant.reason}</p>
                                <a
                                    href={restaurant.placeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500"
                                >
                                    카카오 맵에서 보기
                                </a>
                            </li>
                        ))
                    ) : (
                        <li>검색 결과가 없습니다.</li>
                    )}
                </ul>
            </div>
        </div>
    );
}
