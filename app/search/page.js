import SearchPageWithResults from "@/app/search/SearchPageWithResults";
import SearchInput from "@/components/SearchInput";

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
            <SearchInput/>
            <SearchPageWithResults/>
        </div>
    );
}