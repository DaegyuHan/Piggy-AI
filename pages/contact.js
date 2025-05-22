export default function Contact() {
    return (
        <main className="max-w-3xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">문의하기</h1>

            <section className="mb-6">
                <p className="text-gray-600">
                    Piggy AI에 대한 문의 사항이나 제안, 버그 제보가 있다면 언제든지 아래 연락처로 문의해주세요.
                    <br />
                    빠르게 확인하여 가능한 모든 피드백에 답변 드리겠습니다.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">연락처</h2>
                <ul className="text-gray-600 space-y-2">
                    <li>
                        📧 이메일:{" "}
                        <a href="mailto:bigstarhan33@naver.com" className="text-blue-600 hover:underline">
                            bigstarhan33@naver.com
                        </a>
                    </li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">서비스 제안 및 협업</h2>
                <p className="text-gray-600">
                    카페 데이터를 연동하고 싶거나, 서비스에 광고를 노출하고 싶은 사업자분들도 환영합니다.
                    <br />
                    다양한 파트너십과 제휴 제안을 기다리고 있습니다.
                </p>
            </section>
        </main>
    );
}
