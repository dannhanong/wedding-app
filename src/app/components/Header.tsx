"use client";

import Link from 'next/link';
import { Sacramento } from 'next/font/google';
import { useState } from 'react';

const sacramento = Sacramento({
    subsets: ['latin'],
    weight: '400',
    style: 'normal'
});

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State quản lý trạng thái menu

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Đảo trạng thái menu
    };

    return (
        <nav className="bg-black bg-opacity-60 py-4 relative">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-xl font-bold">
                    <Link href="/">
                        <span className={`${sacramento.className} text-6xl cursor-pointer text-pink-400 font-bold`}>
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
                        {isMenuOpen ? '✕' : '☰'} {/* Dấu '☰' là biểu tượng menu, '✕' là dấu đóng */}
                    </button>
                </div>

                {/* Menu chính cho các thiết bị lớn */}
                <div className={`lg:flex ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
                    {
                        !isMenuOpen && (
                            <ul className="flex space-x-6 text-lg font-medium">
                                <li className="text-pink-400">
                                    <Link href="/">
                                        <span className="cursor-pointer hover:text-pink-400 text-white">Home</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about">
                                        <span className="cursor-pointer hover:text-pink-400 text-white">Story</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/gallery">
                                        <span className="cursor-pointer hover:text-pink-400 text-white">Gallery</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact">
                                        <span className="cursor-pointer hover:text-pink-400 text-white">Contact</span>
                                    </Link>
                                </li>
                            </ul>
                        )
                    }
                </div>
            </div>

            {/* Menu mobile: khi kích thước màn hình nhỏ */}
            <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute top-0 left-0 right-0 bg-black bg-opacity-60 z-40`}>
                <ul className="flex flex-col space-y-6 text-lg font-medium text-white">
                    <li>
                        <Link href="/">
                            <span className="cursor-pointer hover:text-pink-400">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/about">
                            <span className="cursor-pointer hover:text-pink-400">Story</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/gallery">
                            <span className="cursor-pointer hover:text-pink-400">Gallery</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact">
                            <span className="cursor-pointer hover:text-pink-400">Contact</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
