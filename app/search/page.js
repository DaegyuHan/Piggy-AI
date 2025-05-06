// app/search/page.js
'use client';

import { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark, FaSearch } from "react-icons/fa";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useSearchParams } from 'next/navigation'; // Next.js에서 searchParams를 다루기 위한 hook

export default function SearchWithResults() {
    const searchParams = useSearchParams(); // searchParams를 useSearchParams로 받기
    const query = searchParams.get('query') || ""; // searchParams에서 'query'를 가져오기

    const [cafes, setCafes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [warning, setWarning] = useState("");
    const [searchTitle, setSearchTitle] = useState("");
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (!query) return;

        setLoading(true);
        setHasSearched(true);

        const fetchData = async () => {
            try {
                const response = await fetch(`/api/search`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setCafes(data.recommendedCafes);
                    setSearchTitle(query); // 검색한 제목을 기록
                } else {
                    setCafes([]);
                }
            } catch (error) {
                console.error('에러 발생:', error);
                setWarning('서버 오류가 발생했습니다. 다시 시도해주세요.');
                setCafes([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query]);  // 쿼리 값이 변경될 때마다 검색 실행

    useEffect(() => {
        setFavorites(cafes.map(() => false)); // cafes가 바뀔 때마다 초기화
    }, [cafes]);

    return (
        <div className="flex flex-col items-center justify-start pt-16 min-h-screen bg-gradient-to-b from-grjay-100 to-gray-100 px-4 w-full max-w-2xl mx-auto">
            <div className="w-full max-w-2xl mb-6">
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        {searchTitle && (
                            <h2 className="text-xl font-bold mb-4 text-gray-800">
                                "{searchTitle}" 주변 카페 검색 결과
                            </h2>
                        )}
                        <ul className="space-y-4">
                            {cafes.length > 0 ? (
                                cafes.map((cafe, index) => (
                                    <li key={index} className="relative p-5 rounded-lg bg-white shadow hover:shadow-md transition border">
                                        <button
                                            onClick={() => toggleFavorite(index)}
                                            className="absolute top-4 right-4 text-blue-600 hover:scale-110 transition"
                                            aria-label="즐겨찾기"
                                        >
                                            {favorites[index] ? <FaBookmark size={20} /> : <FaRegBookmark size={20} />}
                                        </button>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{cafe.name}</h3>
                                        <p className="text-gray-600 text-sm">{cafe.address}</p>
                                        <p className="text-gray-700 mt-2">{cafe.reason}</p>
                                        <a
                                            href={cafe.placeUrl}
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
                    </>
                )}
            </div>
        </div>
    );
}
