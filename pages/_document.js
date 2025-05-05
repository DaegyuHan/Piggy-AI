import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                {/* AdSense 스크립트 (전역 삽입) */}
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4773424574264862"
                    crossOrigin="anonymous"
                ></script>
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    );
}
