"use client";

import React, { useState, useEffect } from 'react';
import { Sacramento } from 'next/font/google';

const sacramento = Sacramento({
    subsets: ['latin'],
    weight: '400'
});

const Countdown = () => {
    // Thời điểm đếm ngược: Ngày cưới (cấu hình từ file config)
    const weddingDate = new Date('2026-01-29T12:00:00'); // Ví dụ: 1 tháng 3 năm 2025

    // State lưu trữ thời gian còn lại
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    // Hàm tính toán thời gian còn lại
    function calculateTimeLeft() {
        const difference = weddingDate.getTime() - new Date().getTime();
        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            return null; // Hết thời gian
        }
    }

    // Cập nhật bộ đếm mỗi giây
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/path-to-your-image.jpg)' }}>
            <h1 className={`${sacramento.className} text-7xl text-white`}>
                Lê Thành & Lê Khuê
            </h1>
            <p className="text-lg md:text-2xl text-white mb-8 mt-7 font-light">Cùng đếm ngược nào!</p>
            {timeLeft ? (
                <div className="flex space-x-4 text-center">
                    <div className="bg-pink-500 text-white px-4 py-2 rounded-lg">
                        <p className="text-3xl font-bold">{timeLeft.days}</p>
                        <span className="text-sm">Ngày</span>
                    </div>
                    <div className="bg-pink-500 text-white px-4 py-2 rounded-lg">
                        <p className="text-3xl font-bold">{timeLeft.hours}</p>
                        <span className="text-sm">Giờ</span>
                    </div>
                    <div className="bg-pink-500 text-white px-4 py-2 rounded-lg">
                        <p className="text-3xl font-bold">{timeLeft.minutes}</p>
                        <span className="text-sm">Phút</span>
                    </div>
                    <div className="bg-pink-500 text-white px-4 py-2 rounded-lg">
                        <p className="text-3xl font-bold">{timeLeft.seconds}</p>
                        <span className="text-sm">Giây</span>
                    </div>
                </div>
            ) : (
                <p className="text-2xl font-bold text-white mt-8">Hãy tận hưởng ngày tuyệt vời này!</p>
            )}
            <button className="mt-8 bg-white text-pink-500 px-6 py-3 rounded-lg shadow-md hover:bg-pink-100 transition">
                Save the Date
            </button>
        </div>
    );
};

export default Countdown;