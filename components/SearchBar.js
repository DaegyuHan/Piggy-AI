import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
    return (
        <div className="relative w-2/3">
            <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="w-full py-5 pl-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-2 top-5 text-gray-500">
                <FaSearch size={25} />
            </button>
        </div>
    );
}
