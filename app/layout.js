import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Piggy AI",
  description: "AI 기반 지역별 카페 추천 웹 서비스",
  manifest: "/manifest.json",
  icons: {
    icon: "/piggy-icon-192.png",
    apple: "/piggy-icon-192.png",
  },
};

export const viewport = {
  themeColor: "#FBEFD9",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
      <meta name="google-adsense-account" content="ca-pub-4773424574264862"/>
      <meta name="google-site-verification" content="8CZfFFGQ5phRRqwGFpQ0mIFvbnU68tqWSHoI06_hoCM"/>
      <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4773424574264862"
          crossOrigin="anonymous"
      ></script>
    </head>
    <body className={`${geistSans.variable} ${geistMono.variable}`}>
    {children}
    </body>
    </html>
  );
}
