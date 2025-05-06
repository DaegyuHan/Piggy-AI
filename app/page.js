import SearchWithResults from "@/components/SearchInput";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import AdBanner from "@/components/AdBanner";
import PopularSearches from "@/components/PopularSearches";

export default function Home() {

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
            {/*<Logo/>*/}
            <SearchWithResults/>
            <PopularSearches/>
            {/* 광고 */}
            <AdBanner slot="7010780807"/>
        </div>
    );
}
