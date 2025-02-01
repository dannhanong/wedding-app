"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';
import { TbReportAnalytics } from 'react-icons/tb';
import { isAuthenticated } from '@/services/auth';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { MdOutlineHistoryEdu } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { SiWish } from "react-icons/si";

interface SidebarProps {
    onToggle: (isOpen: boolean) => void;
}

export default function Sidebar({ onToggle }: SidebarProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        onToggle(newState); // Gửi trạng thái về DashboardLayout
    };

    const handleToHome = () => {
        window.location.href = '/';
    };

    const handleLogout = async () => {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn đăng xuất?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Đăng xuất',
            confirmButtonColor: '#d33',
            cancelButtonText: 'Hủy',
            cancelButtonColor: '#3085d6',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    router.push('/auth/login');
                    localStorage.clear();
                    sessionStorage.clear();
                } catch (error) {
                    console.error('Error logging out:', error);
                }
            }
        });
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsOpen(false);
                onToggle(false);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [onToggle]);

    return (
        isAuthenticated() ? (
            <>
                {/* Sidebar for large screens */}
                <aside
                    className={`bg-gray-800 text-white w-64 fixed h-screen overflow-y-auto transform transition-transform duration-300 lg:block ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:w-20 md:translate-x-0`}
                    style={{ minWidth: '16rem' }}
                >
                    <div className="p-4">
                        <ul className="space-y-2 mt-5">
                            <li>
                                <div 
                                    className="flex items-center px-4 py-2 hover:bg-gray-700 rounded hover:cursor-pointer"
                                    onClick={handleToHome}
                                >
                                    <FaHome className="mr-2" /> Trang chủ
                                </div>
                            </li>
                            <li>
                                <Link href="/dashboard/galleries" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
                                    <TbReportAnalytics className="mr-2" /> Gallery
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/stories" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
                                    <MdOutlineHistoryEdu className="mr-2" /> Story
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/wishes" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
                                    <SiWish className="mr-2" /> Wish
                                </Link>
                            </li>
                            <li>
                                <div
                                    className="flex items-center px-4 py-2 hover:bg-gray-700 rounded hover:cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    <CiLogout className="mr-2" /> Logout
                                </div>
                            </li>
                        </ul>
                    </div>
                </aside>

                {/* Mobile Sidebar toggle button */}
                <button
                    className={`lg:hidden absolute top-4 left-4 ${isOpen ? 'text-white' : 'text-black'}`}
                    onClick={toggleSidebar}  // Sử dụng hàm toggleSidebar để cập nhật cả isOpen và gọi onToggle
                >
                    {isOpen ? '✕' : '☰'}
                </button>
            </>
        ) : null
    );
}