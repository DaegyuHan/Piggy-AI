'use client';

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function SearchWithResults() {
    const [query, setQuery] = useState("");
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async () => {
        if (!query.trim()) return;

        setLoading(true);
        setHasSearched(true);
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
                setRestaurants(data.recommendedCafes);
            } else {
                setRestaurants([]);
            }
        } catch (error) {
            console.error("에러 발생", error);
            setRestaurants([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-start pt-16 min-h-screen bg-gradient-to-b from-grjay-100 to-gray-100 px-4">
            <div className="w-full max-w-2xl mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="동네를 입력하세요"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full py-4 pl-5 pr-14 text-lg rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />
                    <button
                        onClick={handleSearch}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 transition"
                        aria-label="검색"
                    >
                        <FaSearch size={22} />
                    </button>
                </div>
            </div>

            <div className="w-full max-w-2xl">
                <h2 className="text-xl font-bold mb-4 text-gray-800">추천 맛집</h2>
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <ul className="space-y-4">
                        {restaurants.length > 0 ? (
                            restaurants.map((restaurant, index) => (
                                <li key={index} className="p-5 rounded-lg bg-white shadow hover:shadow-md transition border">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{restaurant.name}</h3>
                                    <p className="text-gray-600 text-sm">{restaurant.address}</p>
                                    <p className="text-gray-700 mt-2">{restaurant.reason}</p>
                                    <a
                                        href={restaurant.placeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block mt-3 text-sm text-blue-600 hover:underline"
                                    >
                                        카카오 맵에서 보기
                                    </a>
                                </li>
                            ))
                        ) : (
                            hasSearched && (
                                <li className="text-center text-gray-500 bg-white py-6 rounded-lg shadow">
                                    검색 결과가 없습니다.
                                </li>
                            )
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
}
