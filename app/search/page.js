'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import SearchInput from "@/components/SearchInput";
import CafeListWithResults from "@/components/CafeListWithResults";
import PopularSearches from "@/components/PopularSearches";

function SearchPageContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query");

    return <CafeListWithResults key={query} query={query} />;
}

export default function SearchPage() {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
            <SearchInput />
            <Suspense fallback={<div>검색 결과 불러오는 중...</div>}>
                <SearchPageContent />
            </Suspense>
            <PopularSearches/>
        </div>
    );
}
