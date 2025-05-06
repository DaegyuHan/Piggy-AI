'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import PopularSearches from "@/components/PopularSearches";

export default function SearchInput() {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [warning, setWarning] = useState("");

    const handleSearch = () => {
        if (!query.trim()) return;
        router.push(`/search?query=${encodeURIComponent(query)}`);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        if (value.length <= 10) {
            setQuery(value);
            setWarning("");
        } else {
            setWarning("입력할 수 있는 글자 수는 10자 이하로 제한됩니다.");
        }
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
        try {
            const pos = await getCurrentPosition();
            const { latitude, longitude } = pos.coords;

            // 위치 기반 검색 API 호출
            const response = await fetch('/api/search/nearby', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ latitude, longitude }),
            });

            if (response.ok) {
                const data = await response.json();
                // 검색된 결과를 보여주는 페이지로 리다이렉트
                router.push(`/nearby?latitude=${latitude}&longitude=${longitude}`);
            } else {
                alert("위치 기반 검색에 실패했습니다.");
            }
        } catch (err) {
            console.error("위치 정보 가져오기 실패:", err);
            alert("위치 정보를 가져올 수 없습니다.");
        }
    };

    return (
        <div className="w-full max-w-2xl mb-6 px-4">
            <h2 className="text-xl font-bold mt-4 mb-4 text-gray-800">동네를 입력해주세요</h2>
            <div className="relative flex items-center">
                <input
                    type="text"
                    placeholder="ex) 수원 행궁동"
                    value={query}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch();
                    }}
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
            {warning && (
                <p className="text-red-500 mt-2 text-sm">{warning}</p>
            )}

            <div className="w-full mt-2 mb-2">
                <button
                    onClick={handleLocationSearch}
                    className="text-blue-600 hover:underline"
                >
                    내 주변 검색하기
                </button>
            </div>
        </div>
    );
}
