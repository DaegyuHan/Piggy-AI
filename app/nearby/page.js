'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import SearchInput from "@/components/SearchInput";
import CafeListWithResults from "@/components/CafeListWithResults";
import PopularSearches from "@/components/PopularSearches";

function NearbyContent() {
    const searchParams = useSearchParams();
    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");

    return (
        <CafeListWithResults latitude={latitude} longitude={longitude} />
    );
}

export default function NearbyPage() {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
            <SearchInput />
            <Suspense fallback={<div>내 주변 카페 불러오는 중...</div>}>
                <NearbyContent />
            </Suspense>
            <PopularSearches/>
        </div>
    );
}
