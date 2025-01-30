"use client";

import Link from 'next/link';
import { Sacramento } from 'next/font/google';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const sacramento = Sacramento({
    subsets: ['latin'],
    weight: '400',
    style: 'normal'
});

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State quản lý trạng thái menu
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Đảo trạng thái menu
    };

    return (
        <nav className="bg-black bg-opacity-60 py-4 relative">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-xl font-bold">
                    <Link href="/">
                        <span className={`${sacramento.className} text-6xl cursor-pointer text-pink-500 font-bold`}>
                            Wedding
                        </span>
                    </Link>
                </div>

                {/* Menu toggle cho thiết bị di động */}
                <div className="lg:hidden absolute top-4 right-4 z-50"> {/* Thêm z-50 cho nút toggle */}
                    <button
                        onClick={toggleMenu}
                        className="text-white text-3xl focus:outline-none"
                    >
                        {isMenuOpen ? '✕' : '☰'}
                    </button>
                </div>

                {/* Menu chính cho các thiết bị lớn */}
                <div className={`lg:flex ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
                    {
                        !isMenuOpen && (
                            <ul className="flex space-x-6 text-lg font-medium">
                                <li className={pathname === '/' ? 'text-pink-400' : 'text-white'}>
                                    <Link href="/">
                                        <span className="cursor-pointer hover:text-pink-700">
                                            Home
                                        </span>
                                    </Link>
                                </li>
                                <li className={pathname === '/stories' ? 'text-pink-400' : 'text-white'}>
                                    <Link href="/stories">
                                        <span className="cursor-pointer hover:text-pink-700">Story</span>
                                    </Link>
                                </li>
                                <li className={pathname === '/gallery' ? 'text-pink-400' : 'text-white'}>
                                    <Link href="/gallery">
                                        <span className="cursor-pointer hover:text-pink-700">Gallery</span>
                                    </Link>
                                </li>
                                <li className={pathname === '/wishes' ? 'text-pink-400' : 'text-white'}>
                                    <Link href="/wishes">
                                        <span className="cursor-pointer hover:text-pink-700">Wish</span>
                                    </Link>
                                </li>
                            </ul>
                        )
                    }
                </div>
            </div>

            {/* Menu mobile: khi kích thước màn hình nhỏ */}
            <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute top-0 left-0 right-0 bg-black bg-opacity-60 z-40 h-screen pt-32`}>
                <ul className="flex flex-col space-y-6 text-lg font-medium text-white">
                    <li className={pathname === '/' ? 'text-pink-400' : 'text-white'}>
                        <Link href="/">
                            <span className="cursor-pointer hover:text-pink-700">Home</span>
                        </Link>
                    </li>
                    <li className={pathname === '/stories' ? 'text-pink-400' : 'text-white'}>
                        <Link href="/stories">
                            <span className="cursor-pointer hover:text-pink-700">Story</span>
                        </Link>
                    </li>
                    <li className={pathname === '/gallery' ? 'text-pink-400' : 'text-white'}>
                        <Link href="/gallery">
                            <span className="cursor-pointer hover:text-pink-700">Gallery</span>
                        </Link>
                    </li>
                    <li className={pathname === '/wishes' ? 'text-pink-400' : 'text-white'}>
                        <Link href="/wishes">
                            <span className="cursor-pointer hover:text-pink-700">Wish</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
