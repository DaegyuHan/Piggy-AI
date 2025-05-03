// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* 기본 Favicon */}
                    <link rel="icon" href="/piggy2.png" />

                    {/* 애플 홈 화면 아이콘 */}
                    <link
                        rel="apple-touch-icon"
                        href="/piggy2.png"
                        sizes="180x180"
                    />

                    {/* Android 홈 화면 아이콘 */}
                    <link
                        rel="icon"
                        href="/piggy2.png"
                        sizes="192x192"
                    />
                    <link
                        rel="icon"
                        href="/piggy2.png"
                        sizes="512x512"
                    />

                    {/* Safari pinned tab 아이콘 */}
                    <link
                        rel="mask-icon"
                        href="/piggy2.png"
                        color="#5bbad5"
                    />

                    {/* theme-color 설정 */}
                    <meta name="theme-color" content="#FBEFD9" />
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
