'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function NavBar() {
    return (
        <nav className="w-full bg-cream drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
            <div className="container mx-auto flex justify-center items-center">
                <Link href="/">
                    <Image
                        src="/logo.jpg"
                        alt="로고"
                        width={120}
                        height={40}
                        className="cursor-pointer"
                        priority
                    />
                </Link>
            </div>
        </nav>
    );
}
