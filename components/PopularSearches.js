'use client';

import { useEffect, useState } from 'react';

export default function PopularSearches() {
    const [popularKeywords, setPopularKeywords] = useState([]);

    useEffect(() => {
        const fetchPopular = async () => {
            try {
                const res = await fetch('/api/popular');
                const data = await res.json();
                setPopularKeywords(data.popular); // [{ keyword, count }]
            } catch (error) {
                console.error('인기 검색어 불러오기 실패:', error);
            }
        };

        fetchPopular();
    }, []);

    return (
        <div className="flex flex-col items-center justify-start pt-1 bg-gradient-to-b from-grjay-100 to-gray-100 px-4 w-full max-w-2xl mx-auto">
            <div className="w-full p-4 bg-white rounded-2xl shadow">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">🔥 인기 동네 검색 TOP 5</h2>
                <ul className="space-y-2">
                    {popularKeywords.map((item, index) => (
                        <li key={index} className="flex items-center space-x-3">
                            <span className="text-lg font-bold text-indigo-600">{index + 1}</span>
                            <span className="font-bold text-gray-700">{item.keyword}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
