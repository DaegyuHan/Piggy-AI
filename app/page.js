import Logo from "@/components/Logo";
import SearchWithResults from "@/components/SearchWithResults";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import AdBanner from "@/components/AdBanner";

export default function Home() {

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
            <NavBar/>
            {/*<Logo/>*/}
            <SearchWithResults/>
            {/* 광고 위치 (예: 페이지 하단) */}
            <AdBanner slot="7010780807" />
            <Footer/>
        </div>
    );
}
