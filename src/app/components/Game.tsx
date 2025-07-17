"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sacramento } from "next/font/google";

const sacramento = Sacramento({
    subsets: ["latin"],
    weight: "400",
    style: "normal",
});

export default function Game() {
    const [noPosition, setNoPosition] = useState({ top: "0%", left: "100%" });
    const [showDialog, setShowDialog] = useState(false);
    const [selected, setSelected] = useState(false);
    const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);

    const moveNoButton = () => {
        const maxX = window.innerWidth - 97;
        const maxY = window.innerHeight - 97;
        const newX = Math.random() * (maxX / 4);
        const newY = Math.random() * (maxY / 4);
        setNoPosition({ top: `${newY}px`, left: `${newX}px` });
    };

    const handleClickYes = () => {
        setSelected(true);
        setShowDialog(true);
        // Thêm hiệu ứng trái tim
        const audio = new Audio("/audios/wedding-bell.mp3");
        audio.play();
        const newHearts = Array(5)
            .fill(0)
            .map((_, i) => ({ id: i, x: Math.random() * 50 + 25 }));
        setHearts(newHearts);
        setTimeout(() => setHearts([]), 2000);
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center relative shadow-lg bg-gradient-to-b from-pink-50 to-yellow-50"
            style={{ height: "70vh" }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            {/* Tiêu đề */}
            <motion.h1
                className={`${sacramento.className} text-4xl text-pink-600 mb-6`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                Bạn sẽ tham dự đám cưới chứ?
            </motion.h1>

            {/* Nút */}
            <div className="flex gap-6 relative mr-24">
                {selected ? (
                    <motion.button
                        className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full shadow-lg text-lg cursor-not-allowed"
                        style={{ marginRight: '100%' }}
                        disabled
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        Đã chọn
                    </motion.button>
                ) : (
                    <motion.button
                        className="px-6 py-3 bg-gradient-to-r from-green-400 to-yellow-300 text-white rounded-full shadow-lg text-lg"
                        style={{ marginRight: '100%' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClickYes}
                    >
                        Có
                    </motion.button>
                )}
                <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-red-400 to-pink-300 text-white rounded-full shadow-lg text-lg absolute transition-all duration-500 ease-in-out"
                    style={{ top: noPosition.top, left: noPosition.left }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={moveNoButton}
                    onClick={moveNoButton}
                >
                    Không
                </motion.button>
            </div>

            {/* Dialog xác nhận */}
            {showDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <motion.div
                        className="bg-gradient-to-b from-pink-100 to-yellow-100 p-6 rounded-lg shadow-lg text-center relative"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Hiệu ứng trái tim */}
                        {hearts.map((heart) => (
                            <motion.div
                                key={heart.id}
                                className="absolute text-2xl text-pink-500"
                                style={{ top: "10%", left: `${heart.x}%` }}
                                initial={{ opacity: 1, y: 0 }}
                                animate={{ opacity: 0, y: -100 }}
                                transition={{ duration: 2 }}
                            >
                                ♥
                            </motion.div>
                        ))}
                        <h2
                            className={`${sacramento.className} text-2xl text-pink-600 mb-4`}
                        >
                            Cảm ơn bạn đã xác nhận!
                        </h2>
                        <div className="flex justify-center">
                            <Image
                                src="/images/wedding_gif.gif"
                                alt="Wedding GIF"
                                width={0}
                                height={0}
                                sizes="50vh"
                                style={{
                                    width: "50%",
                                    height: "50%",
                                    objectFit: "cover",
                                }}
                                className="object-contain rounded-lg border-4 border-pink-200"
                            />
                        </div>
                        <div className="flex justify-end mt-5">
                            <motion.button
                                className={`${sacramento.className} px-4 py-2 text-pink-600 rounded-lg hover:bg-pink-200 transition`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowDialog(false)}
                            >
                                Đóng
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
}