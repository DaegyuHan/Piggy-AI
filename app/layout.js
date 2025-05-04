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
  themeColor: "#FBEFD9",
  icons: {
    icon: "/piggy-icon-192.png",
    apple: "/piggy-icon-192.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
