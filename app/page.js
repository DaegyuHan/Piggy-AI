import Logo from "@/components/Logo";
import SearchBar from "@/components/SearchWithResults";
import SearchWithResults from "@/components/SearchWithResults";
import Footer from "@/components/Footer";

export default function Home() {

    return (
        <div className="flex flex-col items-center justify-start pt-24 h-screen bg-gray-100">
            <Logo />
            <SearchWithResults />
            <Footer />
        </div>
    );
}
