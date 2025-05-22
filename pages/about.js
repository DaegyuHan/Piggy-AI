export default function About() {
    return (
        <main className="max-w-3xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Piggy AI 소개</h1>

            <section className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">서비스 목적</h2>
                <p className="text-gray-600">
                    Piggy AI는 주변에 있는 카페를 단순히 나열하는 것이 아니라,
                    <strong>AI를 통해 사용자에게 맞춤형 추천</strong>을 제공하는 서비스입니다.
                    <br />
                    단순 검색 이상의 경험을 제공하기 위해, Kakao Map 데이터를 기반으로
                    <strong>OpenAI의 언어 모델</strong>을 활용해 추천 카페를 선별합니다.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">핵심 기능</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>키워드 기반 주변 카페 검색</li>
                    <li>AI 추천 알고리즘을 통한 카페 큐레이션</li>
                    <li>즐겨찾기, 인기 검색어 기능 제공 (예정)</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">운영자 소개</h2>
                <p className="text-gray-600">
                    안녕하세요, 개발자 <strong>한대규</strong>입니다.
                    <br />
                    Piggy AI는 카페를 좋아하는 사람들이 더 쉽게 좋은 공간을 발견할 수 있도록 돕기 위해 만들었습니다.
                    <br />
                    현재 개인이 운영하고 있으며, 더 나은 추천 경험을 위해 지속적으로 개선하고 있습니다.
                </p>
            </section>
        </main>
    );
}
