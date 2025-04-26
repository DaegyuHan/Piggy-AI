import Logo from "@/components/Logo";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-start pt-24 bg-gray-100">
            <Logo/>
            <SearchBar/>
            <SearchResults/>
            <Footer/>
        </div>
    );
}
