"use client";

import React, { useState, useEffect } from "react";
import { Sacramento } from "next/font/google";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const sacramento = Sacramento({
    subsets: ["latin"],
    weight: "400",
});

const Countdown = () => {
    const weddingDate = new Date("2026-01-29T12:00:00");
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [showConfetti, setShowConfetti] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

    useEffect(() => {
        const newParticles = Array(10).fill(0).map((_, i) => ({
            id: i,
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
        }));
        setParticles(newParticles);
    }, []);

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
            return null;
        }
    }

    const handleClick = () => {
        setShowConfetti(true);
        setShowMessage(true);
        const audio = new Audio("/audios/wedding-bell.mp3");
        audio.play();
        window.open(
            "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Đám+cưới+Lê+Thành+%26+Minh+Khuê&dates=20260129T120000/20260129T140000",
            "_blank"
        );
        setTimeout(() => {
            setShowConfetti(false);
            setShowMessage(false);
        }, 3000);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div
            className="flex flex-col items-center justify-center bg-cover bg-center relative"
            style={{ backgroundImage: "url(/path-to-your-image.jpg)", height: "80vh" }}
        >
            <h1 className={`${sacramento.className} text-6xl text-white`}>
                Lê Thành & Minh Khuê
            </h1>
            <p className="text-lg md:text-2xl text-white mb-8 mt-7 font-light">
                Cách ngày cưới
            </p>
            {timeLeft ? (
                <div className="flex space-x-4 text-center relative">
                    {/* Các khối đếm ngược */}
                    <motion.div
                        className="bg-gradient-to-br from-pink-400 to-pink-600 text-white px-2 py-3 rounded-lg w-24 h-24 flex flex-col items-center justify-center shadow-lg border-2 border-pink-200"
                        animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                        whileHover={{ scale: 1.2, boxShadow: "0 0 15px rgba(255, 105, 180, 0.8)" }}
                    >
                        <p className="text-3xl font-bold">{timeLeft.days}</p>
                        <span className={`${sacramento.className} text-sm text-pink-100`}>Ngày</span>
                    </motion.div>
                    <motion.div
                        className="bg-gradient-to-br from-yellow-300 to-pink-500 text-white px-2 py-3 rounded-lg w-24 h-24 flex flex-col items-center justify-center shadow-lg border-2 border-yellow-200"
                        animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 2.5, delay: 0.2 }}
                        whileHover={{ scale: 1.2, boxShadow: "0 0 15px rgba(255, 165, 0, 0.8)" }}
                    >
                        <p className="text-3xl font-bold">{timeLeft.hours}</p>
                        <span className={`${sacramento.className} text-sm text-yellow-100`}>Giờ</span>
                    </motion.div>
                    <motion.div
                        className="bg-gradient-to-br from-pink-300 to-yellow-400 text-white px-2 py-3 rounded-lg w-24 h-24 flex flex-col items-center justify-center shadow-lg border-2 border-pink-200"
                        animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 2.5, delay: 0.4 }}
                        whileHover={{ scale: 1.2, boxShadow: "0 0 15px rgba(255, 105, 180, 0.8)" }}
                    >
                        <p className="text-3xl font-bold">{timeLeft.minutes}</p>
                        <span className={`${sacramento.className} text-sm text-pink-100`}>Phút</span>
                    </motion.div>
                    <motion.div
                        className="bg-gradient-to-br from-yellow-200 to-pink-400 text-white px-2 py-3 rounded-lg w-24 h-24 flex flex-col items-center justify-center shadow-lg border-2 border-yellow-200"
                        animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 2.5, delay: 0.6 }}
                        whileHover={{ scale: 1.2, boxShadow: "0 0 15px rgba(255, 165, 0, 0.8)" }}
                    >
                        <p className="text-3xl font-bold">{timeLeft.seconds}</p>
                        <span className={`${sacramento.className} text-sm text-yellow-100`}>Giây</span>
                    </motion.div>

                    {/* Hiệu ứng hạt nhỏ xung quanh */}
                    {Array(8)
                        .fill(0)
                        .map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-pink-300 rounded-full opacity-70"
                                style={{
                                    top: `${Math.random() * 100 - 50}%`,
                                    left: `${Math.random() * 100 - 50}%`,
                                }}
                                animate={{ y: [-10, 10, -10], opacity: [0, 1, 0] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 3,
                                    delay: i * 0.3,
                                }}
                            />
                        ))}
                </div>
            ) : (
                <motion.p
                    className={`${sacramento.className} text-3xl text-white mt-8`}
                    animate={{ scale: [1, 1.1, 1], opacity: [1, 0.8, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    Hãy tận hưởng ngày tuyệt vời này!
                </motion.p>
            )}

            {/* Button nổi bật */}
            <div className="relative mt-12">
                {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
                {showMessage ? (
                    <motion.div
                        className="absolute top-[-60px] bg-white text-pink-500 p-4 rounded-lg shadow-lg"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <p className={`${sacramento.className} text-2xl`}>
                            Hẹn gặp bạn ở ngày vui nhé!
                        </p>
                    </motion.div>
                ) : (
                    particles.map((particle) => (
                        <motion.div
                            key={particle.id}
                            className="absolute w-2 h-2 bg-pink-300 rounded-full"
                            style={{ left: `calc(50% + ${particle.x}px)`, top: `calc(50% + ${particle.y}px)` }}
                            animate={{ opacity: [0, 1, 0], y: -50 }}
                            transition={{ repeat: Infinity, duration: 2, delay: particle.id * 0.2 }}
                        />
                    ))
                )}
                <motion.button
                    className={`${sacramento.className} relative bg-gradient-to-r from-pink-400 to-yellow-300 text-white px-8 py-4 rounded-full shadow-lg text-xl font-bold border-4 border-white hover:from-pink-500 hover:to-yellow-400 transition-all z-10`}
                    animate={{
                        scale: [1, 1.1, 1], // Pulse effect
                        boxShadow: [
                            "0 0 0 rgba(255, 105, 180, 0.8)",
                            "0 0 20px rgba(255, 105, 180, 0.8)",
                            "0 0 0 rgba(255, 105, 180, 0.8)",
                        ],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut",
                    }}
                    whileHover={{ scale: 1.15, rotate: 1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClick}
                    title="Lưu ngay để không bỏ lỡ ngày vui!"
                >
                    <span className="flex items-center space-x-2">
                        <span>Thêm vào lịch</span>
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    </span>
                    {/* Vòng sáng xung quanh */}
                    <motion.div
                        className="absolute inset-0 rounded-full bg-pink-300 opacity-30"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    />
                </motion.button>
            </div>
        </div>
    );
};

export default Countdown;