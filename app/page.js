import Logo from "@/components/Logo";
import SearchWithResults from "@/components/SearchWithResults";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function Home() {

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
            <NavBar/>
            {/*<Logo/>*/}
            <SearchWithResults/>
            <Footer/>
        </div>
    );
}
