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
            style={{
                backgroundImage: "url(/images/gallery-1.jpg)",
                height: "80vh",
            }}
        >
            {/* Overlay mờ với gradient nhẹ */}
            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30" /> */}

            <h1 className={`${sacramento.className} text-3xl md:text-6xl text-white z-10 mb-2 md:mb-4 p-4`}>
                Lê Thành & Minh Khuê
            </h1>
            <p className="text-sm md:text-2xl text-white mb-2 md:mb-4 mt-2 md:mt-4 font-light z-10">
                Cách ngày cưới
            </p>

            {timeLeft ? (
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 text-center relative z-10 mt-8">
                    {/* Ngày */}
                    <motion.div
                        className="bg-gradient-to-br from-pink-400 to-pink-600 text-white px-2 py-2 rounded-lg w-14 md:w-20 h-14 md:h-20 flex flex-col items-center justify-center shadow-lg border-2 border-pink-200"
                        // initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                        whileHover={{ scale: 1.2, boxShadow: "0 0 15px rgba(255, 105, 180, 0.8)" }}
                    >
                        <p className="text-lg md:text-3xl font-bold">{timeLeft.days}</p>
                        <span className={`${sacramento.className} text-xs md:text-sm text-pink-100`}>Ngày</span>
                    </motion.div>

                    {/* Giờ */}
                    <motion.div
                        className="bg-gradient-to-br from-yellow-300 to-pink-500 text-white px-2 py-2 rounded-lg w-14 md:w-20 h-14 md:h-20 flex flex-col items-center justify-center shadow-lg border-2 border-yellow-200"
                        // initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 2.5, delay: 0.2 }}
                        whileHover={{ scale: 1.2, boxShadow: "0 0 15px rgba(255, 165, 0, 0.8)" }}
                    >
                        <p className="text-lg md:text-3xl font-bold">{timeLeft.hours}</p>
                        <span className={`${sacramento.className} text-xs md:text-sm text-yellow-100`}>Giờ</span>
                    </motion.div>

                    {/* Phút */}
                    <motion.div
                        className="bg-gradient-to-br from-pink-300 to-yellow-400 text-white px-2 py-2 rounded-lg w-14 md:w-20 h-14 md:h-20 flex flex-col items-center justify-center shadow-lg border-2 border-pink-200"
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 2.5, delay: 0.4 }}
                        whileHover={{ scale: 1.2, boxShadow: "0 0 15px rgba(255, 105, 180, 0.8)" }}
                    >
                        <p className="text-lg md:text-3xl font-bold">{timeLeft.minutes}</p>
                        <span className={`${sacramento.className} text-xs md:text-sm text-pink-100`}>Phút</span>
                    </motion.div>

                    {/* Giây */}
                    <motion.div
                        className="bg-gradient-to-br from-yellow-200 to-pink-400 text-white px-2 py-2 rounded-lg w-14 md:w-20 h-14 md:h-20 flex flex-col items-center justify-center shadow-lg border-2 border-yellow-200"
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 2.5, delay: 0.6 }}
                        whileHover={{ scale: 1.2, boxShadow: "0 0 15px rgba(255, 165, 0, 0.8)" }}
                    >
                        <p className="text-lg md:text-3xl font-bold">{timeLeft.seconds}</p>
                        <span className={`${sacramento.className} text-xs md:text-sm text-yellow-100`}>Giây</span>
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
                    className={`${sacramento.className} text-lg md:text-3xl text-white mt-2 md:mt-4 z-10`}
                    animate={{ scale: [1, 1.1, 1], opacity: [1, 0.8, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    Hãy tận hưởng ngày tuyệt vời này!
                </motion.p>
            )}

            <div className="relative flex flex-col items-center justify-center bg-cover bg-center z-10" style={{ backgroundImage: "url(/path-to-your-image.jpg)", height: "80vh" }}>
                {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
                {showMessage && (
                    <motion.div
                        className="absolute top-[-60px] bg-white text-pink-500 p-4 rounded-lg shadow-lg z-20"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <p className={`${sacramento.className} text-lg md:text-2xl`}>Hẹn gặp bạn ở ngày vui nhé!</p>
                    </motion.div>
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

                    {/* Thêm ngón tay chỉ click */}
                    <motion.div
                        className="absolute -right-8 -bottom-10 z-20 hidden md:block"
                        initial={{ opacity: 0, x: -15, y: -15 }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            x: [-15, 0, 0, -15],
                            y: [-15, 0, 0, -15],
                            scale: [0.8, 1, 1, 0.8]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 3,
                            times: [0, 0.3, 0.7, 1],
                            delay: 1
                        }}
                    >
                        <div className="relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="white"
                                stroke="#FF69B4"
                                strokeWidth="1"
                                className="w-12 h-12 drop-shadow-lg"
                            >
                                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V14.5a2.5 2.5 0 0 1-2.5 2.5H9a2.5 2.5 0 0 1-2.5-2.5" />
                                <path d="M12 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-8 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4m0-8a2 2 0 1 0 0 4 2 2 0 0 0 0-4m16 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m0 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-8 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                            </svg>
                            <motion.div
                                className="absolute -top-1 -right-1 bg-pink-500 rounded-full w-4 h-4"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                            />
                        </div>
                    </motion.div>

                    {/* Thêm nhãn "Click me!" */}
                    <motion.div
                        className="absolute -right-14 -top-6 bg-white text-pink-500 px-3 py-1 rounded-full text-sm font-bold shadow-md hidden md:block"
                        animate={{
                            rotate: [0, -3, 3, 0],
                            y: [0, -2, 2, 0]
                        }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        Ấn vào!
                    </motion.div>

                    {/* Hiệu ứng tia sáng */}
                    {[...Array(5)].map((_, index) => (
                        <motion.div
                            key={index}
                            className="absolute bg-yellow-200 w-1 h-2 origin-bottom"
                            style={{
                                top: "-20%",
                                left: `${5 + index * 20}%`,
                                rotate: `${-5 + index * 5}deg`,
                                transformOrigin: "bottom"
                            }}
                            animate={{
                                scaleY: [0, 1, 0],
                                opacity: [0, 0.7, 0]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                                delay: index * 0.2,
                                repeatDelay: 1
                            }}
                        />
                    ))}
                </motion.button>
            </div>
        </div>
    );
};

export default Countdown;