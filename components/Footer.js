import React from 'react';
import Link from 'next/link';

function Footer() {
    return (
        <div className="bg-gray-800 text-white py-6 mt-12 w-full">
            <div className="max-w-4xl mx-auto text-center">
                {/* 페이지 링크 섹션 */}
                <div className="flex justify-center space-x-6 mb-2 text-sm">
                    <Link href="/about" className="hover:underline">About</Link>
                    <Link href="/contact" className="hover:underline">Contact</Link>
                    <Link href="/privacy" className="hover:underline">Privacy</Link>
                </div>

                {/* 연락처 및 정보 */}
                <p className="text-sm">
                    <strong>contact:</strong> bigstarhan33@naver.com
                </p>
                <p className="text-sm mt-2">
                    © {new Date().getFullYear()} Piggy AI. All rights reserved.
                </p>
                <p className="text-sm mt-2">
                    tv0.4.5
                </p>
            </div>
        </div>
    );
}

export default Footer;
