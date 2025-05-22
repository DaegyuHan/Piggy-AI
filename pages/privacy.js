export default function Privacy() {
    return (
        <main className="max-w-3xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">개인정보 처리방침</h1>

            <p className="text-gray-600 mb-4">
                Piggy AI는 사용자의 개인정보를 수집하거나 저장하지 않습니다.
                <br />
                검색 기능은 익명으로 제공되며, 어떤 사용자 정보도 서버에 저장되지 않습니다.
            </p>

            <p className="text-gray-600">
                본 사이트는 Google AdSense를 사용하여 광고를 제공합니다. 광고 제공 과정에서 쿠키가 사용될 수 있으며,
                이는 Google의 <a href="https://policies.google.com/technologies/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">광고 정책</a>을 따릅니다.
            </p>
        </main>
    );
}
