'use client';

import {useEffect, useState} from "react";
import {FaBookmark, FaRegBookmark, FaSearch} from "react-icons/fa";
import LoadingSpinner from "@/components/LoadingSpinner";
import PopularSearches from "@/components/PopularSearches";

export default function SearchWithResults() {
    const [query, setQuery] = useState("");
    const [cafes, setCafes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [warning, setWarning] = useState("");
    const [favorites, setFavorites] = useState([]); // 각 카페의 즐겨찾기 여부를 저장

    useEffect(() => {
        setFavorites(cafes.map(() => false)); // cafes가 바뀔 때마다 초기화
    }, [cafes]);

    const toggleFavorite = (index) => {
        setFavorites((prev) => {
            const updated = [...prev];
            updated[index] = !updated[index];
            return updated;
        });
    };

    const getCurrentPosition = () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error("Geolocation is not supported"));
            } else {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            }
        });
    };

    const handleLocationSearch = async () => {
        setLoading(true);
        setHasSearched(true);

        try {
            const pos = await getCurrentPosition();
            const {latitude, longitude} = pos.coords;

            const response = await fetch('/api/search/nearby', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({latitude, longitude}),
            });

            if (response.ok) {
                const data = await response.json();
                setCafes(data.recommendedCafes);
            } else {
                setCafes([]);
            }
        } catch (err) {
            console.error("위치 기반 검색 실패", err);
            alert("위치 정보를 가져올 수 없습니다. 권한을 허용했는지 확인하세요.");
            setCafes([]);
        } finally {
            setLoading(false);
        }
    };

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
                body: JSON.stringify({query}),
            });

            if (response.ok) {
                const data = await response.json();
                setCafes(data.recommendedCafes);
            } else {
                setCafes([]);
            }
        } catch (error) {
            console.error('에러 발생:', error);
            if (error.message === '검색 결과가 없습니다.') {
                setWarning(error.message);
            } else {
                setWarning('서버 오류가 발생했습니다. 다시 시도해주세요.');
            }
            setCafes([]);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        if (value.length <= 10) {
            setQuery(value);
            setWarning(""); // 입력이 정상적으로 진행되면 경고 메시지 초기화
        } else {
            setWarning("입력할 수 있는 글자 수는 10자 이하로 제한됩니다.");
        }
    };

    return (
        <div
            className="flex flex-col items-center justify-start pt-16 min-h-screen bg-gradient-to-b from-grjay-100 to-gray-100 px-4 w-full max-w-2xl mx-auto">
            <div className="w-full max-w-2xl mb-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800">동네를 입력해주세요</h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="ex) 수원 행궁동"
                        value={query}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                        className="w-full py-4 pl-5 pr-14 text-lg rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />
                    <button
                        onClick={handleSearch}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 transition"
                        aria-label="검색"
                    >
                        <FaSearch size={22}/>
                    </button>
                </div>
                {warning && (
                    <p className="text-red-500 mt-2 text-sm">{warning}</p> // 경고 메시지 출력
                )}
            </div>

            <div className="w-full max-w-2xl mb-6">
                <button
                    onClick={handleLocationSearch}
                    className="text-blue-600 hover:underline"
                >
                    내 주변 검색하기
                </button>
            </div>

            <div className="w-full max-w-2xl">
                {loading ? (
                    <LoadingSpinner/>
                ) : (
                    <ul className="space-y-4">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">
                            {query ? `'${query}' 주변 카페 검색 결과` : "주변 카페 검색 결과"}
                        </h2>
                        {cafes.length > 0 ? (
                            cafes.map((cafe, index) => (
                                <li
                                    key={index}
                                    className="relative p-5 rounded-lg bg-white shadow hover:shadow-md transition border"
                                >
                                    <button
                                        onClick={() => toggleFavorite(index)}
                                        className="absolute top-4 right-4 text-blue-600 hover:scale-110 transition"
                                        aria-label="즐겨찾기"
                                    >
                                        {favorites[index] ? <FaBookmark size={20}/> : <FaRegBookmark size={20}/>}
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
                )}
            </div>
            <PopularSearches/>
        </div>
    );
}
