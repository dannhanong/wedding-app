"use client";

import Link from 'next/link';
import { Sacramento } from 'next/font/google';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

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
        <nav 
            className="bg-black bg-opacity-60 py-4 relative"
            style={{ height: '20vh' }}
        >
            <div className="container mx-auto flex justify-around items-center">
            <motion.div
                    className="text-xl font-bold relative"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Link href="/">
                        <span
                            className={`${sacramento.className} text-6xl cursor-pointer text-pink-400 font-bold`}
                        >
                            Wedding
                        </span>
                    </Link>
                    {/* Hiệu ứng hạt sáng quanh logo */}
                    {Array(5)
                        .fill(0)
                        .map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-pink-300 rounded-full opacity-50"
                                style={{
                                    top: `${Math.random() * 100 - 50}%`,
                                    left: `${Math.random() * 100 - 50}%`,
                                }}
                                animate={{ y: [-10, 10, -10], opacity: [0, 1, 0] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                    delay: i * 0.3,
                                }}
                            />
                        ))}
                </motion.div>

                {/* Nút toggle cho mobile */}
                <div className="lg:hidden absolute top-4 right-4 z-50">
                    <motion.button
                        onClick={toggleMenu}
                        className="text-white text-3xl focus:outline-none"
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isMenuOpen ? "✕" : "☰"}
                    </motion.button>
                </div>

                {/* Menu chính cho các thiết bị lớn */}
                <div className={`lg:flex ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
                    {
                        !isMenuOpen && (
                            <ul className="flex space-x-6 text-lg font-medium">
                                <li className={pathname === '/' ? 'text-pink-400' : 'text-white'}>
                                    <Link href="/">
                                        <span className="cursor-pointer hover:text-pink-700">
                                            Trang chủ
                                        </span>
                                    </Link>
                                </li>
                                <li className={pathname === '/stories' ? 'text-pink-400' : 'text-white'}>
                                    <Link href="/stories">
                                        <span className="cursor-pointer hover:text-pink-700">Câu chuyện</span>
                                    </Link>
                                </li>
                                <li className={pathname === '/gallery' ? 'text-pink-400' : 'text-white'}>
                                    <Link href="/gallery">
                                        <span className="cursor-pointer hover:text-pink-700">Trưng bày</span>
                                    </Link>
                                </li>
                                <li className={pathname === '/wishes' ? 'text-pink-400' : 'text-white'}>
                                    <Link href="/wishes">
                                        <span className="cursor-pointer hover:text-pink-700">Lời chúc</span>
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
                            <span className="cursor-pointer hover:text-pink-700">Trang chủ</span>
                        </Link>
                    </li>
                    <li className={pathname === '/stories' ? 'text-pink-400' : 'text-white'}>
                        <Link href="/stories">
                            <span className="cursor-pointer hover:text-pink-700">Câu chuyện</span>
                        </Link>
                    </li>
                    <li className={pathname === '/gallery' ? 'text-pink-400' : 'text-white'}>
                        <Link href="/gallery">
                            <span className="cursor-pointer hover:text-pink-700">Trưng bày</span>
                        </Link>
                    </li>
                    <li className={pathname === '/wishes' ? 'text-pink-400' : 'text-white'}>
                        <Link href="/wishes">
                            <span className="cursor-pointer hover:text-pink-700">Lời chúc</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
