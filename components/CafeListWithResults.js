'use client';

import { useEffect, useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import LoadingSpinner from "@/components/LoadingSpinner";

export default function CafeListWithResults({ query, latitude, longitude }) {
    const [allCafes, setAllCafes] = useState([]); // Kakao API 전체 카페 목록
    const [recommended, setRecommended] = useState([]); // OpenAI 추천된 카페 누적
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasLoadedMore, setHasLoadedMore] = useState(false); // 딱 1번만 누를 수 있게
    const [hasSearched, setHasSearched] = useState(false);
    const [warning, setWarning] = useState("");
    const [searchTitle, setSearchTitle] = useState("");
    const [favorites, setFavorites] = useState([]);
    const [page, setPage] = useState(1); // 현재 페이지 (1 = 첫 추천, 2 = 추가 추천 등)


    useEffect(() => {
        if (!query && !(latitude && longitude)) return;

        setLoading(true);
        setHasSearched(true);

        const fetchInitial = async () => {
            try {
                const res = await fetch(query ? '/api/search' : '/api/search/nearby', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(query ? { query, page: 1 } : { latitude, longitude, page: 1 }),
                });

                const data = await res.json();
                setAllCafes(data.allCafes || []);
                setRecommended(data.recommendedCafes || []);
                setSearchTitle(query ? query : "내 주변");
                setPage(1);
            } catch (error) {
                console.error('에러 발생:', error);
                setWarning('서버 오류가 발생했습니다. 다시 시도해주세요.');
                setAllCafes([]);
                setRecommended([]);
            } finally {
                setLoading(false);
            }
        };

        fetchInitial();
    }, [query, latitude, longitude]);

    useEffect(() => {
        setFavorites(recommended.map(() => false));
    }, [recommended]);

    const toggleFavorite = (index) => {
        setFavorites(prev => {
            const newFavorites = [...prev];
            newFavorites[index] = !newFavorites[index];
            return newFavorites;
        });
    };

    const handleLoadMore = async () => {
        setLoadingMore(true);
        try {
            const res = await fetch(query ? '/api/search' : '/api/search/nearby', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    page: page + 1,
                    allCafes: allCafes,
                    previousRecommendations: recommended.map(c => c.name),
                    ...(query ? { query } : { latitude, longitude }),
                }),
            });

            const data = await res.json();
            const newRecommendations = data.recommendedCafes || [];
            setRecommended(prev => [...prev, ...newRecommendations]);
            setPage(prev => prev + 1);
            setHasLoadedMore(true);
        } catch (err) {
            console.error("더 보기 에러:", err);
            setWarning("추가 추천에 실패했습니다.");
        } finally {
            setLoadingMore(false);
        }
    };


    return (
        <div className="flex flex-col items-center justify-start pt-1 min-h-screen bg-gradient-to-b from-gray-100 to-gray-100 px-4 w-full max-w-2xl mx-auto">
            <div className="w-full max-w-2xl mb-6">
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        {searchTitle && (
                            <h2 className="text-xl font-bold mb-4 text-gray-800">
                                "{searchTitle}" 카페 검색 결과
                            </h2>
                        )}
                        <ul className="space-y-4">
                            {recommended.length > 0 ? (
                                recommended.map((cafe, index) => (
                                    <li key={index} className="relative p-5 rounded-lg bg-white shadow hover:shadow-md transition border">
                                        <button
                                            onClick={() => toggleFavorite(index)}
                                            className="absolute top-4 right-4 text-blue-600 hover:scale-110 transition"
                                            aria-label="즐겨찾기"
                                        >
                                            {favorites[index] ? <FaBookmark size={20} /> : <FaRegBookmark size={20} />}
                                        </button>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{index+1}. {cafe.name}</h3>
                                        <p className="text-gray-600 text-sm">{cafe.address || cafe.road_address_name}</p>
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

                        {/* 결과 더 보기 버튼 */}
                        {!loading && !hasLoadedMore && (
                            <div className="mt-6 w-full">
                                {loadingMore ? (
                                    <div className="flex justify-center items-center py-6">
                                        <LoadingSpinner />
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleLoadMore}
                                        className="w-full py-3 text-center bg-white border border-gray-300 rounded-xl shadow hover:shadow-md text-gray-800 font-medium transition"
                                    >
                                        결과 더 보기
                                    </button>
                                )}
                            </div>
                        )}

                        {warning && <p className="text-red-500 mt-4">{warning}</p>}
                    </>
                )}
            </div>
        </div>
    );
}
