export default function SearchResults({ cafes }) {
    return (
        <div className="mt-8 w-2/3">
            <h2 className="text-xl font-semibold mb-4">추천 맛집</h2>
            <ul>
                {cafes.map((cafe, index) => (
                    <li key={index} className="p-4 border-b">
                        <h3 className="font-semibold">{cafe.name}</h3>
                        <p>{cafe.address}</p>
                        <p>{cafe.description}</p>
                        <a
                            href={"https://map.naver.com/p/search/" + cafe.name}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500"
                        >
                            네이버 지도에서 보기
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
