"use client";

import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { Sacramento } from "next/font/google";
import { createWish, getAllWishes } from "@/services/wish";
import Swal from "sweetalert2";
import { Client } from "@stomp/stompjs";
// import { FaPause, FaPlay, FaArrowUp, FaArrowDown } from "react-icons/fa";

const sacramento = Sacramento({
    subsets: ["latin"],
    weight: "400",
    style: "normal",
});

interface Wish {
    id: string;
    name: string;
    message: string;
    roleFriend: boolean;
}

const Wish: React.FC = () => {
    const [name, setName] = useState("");
    const [roleFriend, setRoleFriend] = useState<boolean>(false);
    const [message, setMessage] = useState("");
    const [wishes, setWishes] = useState<Wish[]>([]);
    const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);
    // const [isPaused, setIsPaused] = useState(false);
    const controls = useAnimation();
    const scrollRef = useRef<HTMLDivElement>(null);
    // const [scrollPosition, setScrollPosition] = useState(0);

    const fetchAllWishes = async () => {
        try {
            const response = await getAllWishes();
            setWishes(response);
        } catch (error) {
            console.error("Error during wish fetch:", error);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await createWish(name, message, roleFriend);
            if (response) {
                setName("");
                setRoleFriend(false);
                setMessage("");
                fetchAllWishes();
                Swal.fire({
                    icon: "success",
                    title: "Lời chúc của bạn đã được gửi!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                const newHearts = Array(5)
                    .fill(0)
                    .map((_, i) => ({ id: i, x: Math.random() * 50 + 25 }));
                setHearts(newHearts);
                setTimeout(() => setHearts([]), 2000);
            }
        } catch (error) {
            console.error("Error during wish creation:", error);
        }
    };

    const stompClientRef = useRef<Client | null>(null);

    useEffect(() => {
        const stompClient = new Client({
            brokerURL: "ws://wedding-app-4nfg.onrender.com/ws",
            debug: (str) => console.log("STOMP Debug:", str),
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("Connected to WebSocket");
                stompClient.subscribe("/topic/wishes", () => {
                    fetchAllWishes();
                });
            },
            onStompError: (frame) => {
                console.error("STOMP Error:", frame);
            },
        });

        stompClient.activate();
        stompClientRef.current = stompClient;

        return () => {
            stompClient.deactivate();
        };
    }, []);

    useEffect(() => {
        fetchAllWishes();
    }, []);

    // Auto-scroll logic
    useEffect(() => {
        if (wishes.length > 0) {
            controls.start({
                y: ["20%", "-100%"],
                transition: {
                    ease: "linear",
                    duration: 65,
                    repeat: Infinity,
                    repeatType: "loop",
                },
            });
        } else {
            controls.stop();
        }
    }, [wishes.length, controls]);

    // const scrollUp = () => {
    //     setIsPaused(true); // Pause auto-scroll khi điều khiển thủ công
    //     const newPosition = Math.min(scrollPosition + 100, 0); // Giới hạn scroll lên
    //     setScrollPosition(newPosition);
    //     controls.start({
    //         y: newPosition,
    //         transition: { duration: 0.5 },
    //     });
    // };

    // const scrollDown = () => {
    //     setIsPaused(true); // Pause auto-scroll khi điều khiển thủ công
    //     const containerHeight = scrollRef.current?.scrollHeight || 0;
    //     const viewportHeight = scrollRef.current?.clientHeight || 0;
    //     const maxScroll = -(containerHeight - viewportHeight);
    //     const newPosition = Math.max(scrollPosition - 100, maxScroll); // Giới hạn scroll xuống
    //     setScrollPosition(newPosition);
    //     controls.start({
    //         y: newPosition,
    //         transition: { duration: 0.5 },
    //     });
    // };

    // const togglePause = () => {
    //     setIsPaused((prev) => !prev);
    // };

    return (
        <div
            id="fh5co-testimonial"
            className="pt-10 pb-6 bg-gradient-to-br from-pink-50 via-rose-50 to-yellow-50 min-h-[100vh]"
        >
            <div className="container mx-auto px-4 relative">
                {/* Tiêu đề và danh sách lời chúc */}
                <div className="text-center mb-12 mt-5">
                    <motion.h2
                        className={`${sacramento.className} text-5xl text-pink-600 drop-shadow-md`}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Cảm ơn {wishes.length} lời chúc
                    </motion.h2>

                    <div className="relative overflow-hidden h-[80vh] mt-5 rounded-xl shadow-xl bg-white/50 backdrop-blur-sm border border-pink-100">
                        <motion.div
                            ref={scrollRef}
                            className="flex flex-col gap-6 absolute w-full p-4"
                            animate={controls}
                            // drag="y"
                            // dragConstraints={{
                            //     top: -(scrollRef.current?.scrollHeight || 0) + (scrollRef.current?.clientHeight || 0),
                            //     bottom: 0,
                            // }}
                            // onDrag={() => setIsPaused(true)} // Pause auto-scroll khi kéo
                        >
                            {Array.from(
                                { length: Math.ceil(wishes.length / 3) },
                                (_, index) => (
                                    <motion.div
                                        key={index}
                                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.3 }}
                                    >
                                        {wishes
                                            .slice(index * 3, index * 3 + 3)
                                            .map((wish, i) => (
                                                <motion.div
                                                    key={i}
                                                    className={`text-center p-6 bg-gradient-to-br from-pink-100/80 via-white to-yellow-100/80 rounded-xl shadow-lg relative border border-pink-200/50 backdrop-blur-md hover:shadow-xl ${
                                                        i === 0
                                                            ? "mt-0 mb-12"
                                                            : i === 1
                                                            ? "mt-10 mb-6"
                                                            : "mt-20 mb-0"
                                                    }`}
                                                    style={{ minHeight: "245px" }}
                                                    whileHover={{
                                                        scale: 1.05,
                                                        // rotate: 1,
                                                        boxShadow: "0 10px 30px rgba(244, 114, 182, 0.3)",
                                                    }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <span className="block mt-3 text-sm text-gray-600 font-medium">
                                                        Người chúc:{" "}
                                                        <span className="text-pink-600 font-semibold">
                                                            {wish.name}
                                                        </span>
                                                    </span>
                                                    <blockquote className="mt-3 text-gray-700 italic text-sm p-4 bg-white/50 rounded-lg">
                                                        <p>{wish.message}</p>
                                                    </blockquote>
                                                    <div className="absolute bottom-2 right-2 text-pink-500 font-medium">
                                                        {wish.roleFriend
                                                            ? "Bạn của 🤵"
                                                            : "Bạn của 👰"}
                                                    </div>
                                                </motion.div>
                                            ))}
                                    </motion.div>
                                )
                            )}
                        </motion.div>
                        {/* Nút điều khiển */}
                        {/* <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-10">
                            <motion.button
                                className="bg-pink-500 text-white p-3 rounded-full shadow-lg"
                                whileHover={{ scale: 1.1 }}
                                onClick={scrollUp}
                            >
                                <FaArrowUp />
                            </motion.button>
                            <motion.button
                                className="bg-pink-500 text-white p-3 rounded-full shadow-lg"
                                whileHover={{ scale: 1.1 }}
                                onClick={togglePause}
                            >
                                {isPaused ? <FaPlay /> : <FaPause />}
                            </motion.button>
                            <motion.button
                                className="bg-pink-500 text-white p-3 rounded-full shadow-lg"
                                whileHover={{ scale: 1.1 }}
                                onClick={scrollDown}
                            >
                                <FaArrowDown />
                            </motion.button>
                        </div> */}
                    </div>
                </div>

                {/* Form gửi lời chúc */}
                <motion.div
                    className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 to-yellow-100 relative rounded-2xl shadow-2xl"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {hearts.map((heart) => (
                        <motion.div
                            key={heart.id}
                            className="absolute text-3xl text-pink-500 drop-shadow-md"
                            style={{ bottom: 100, left: `${heart.x}%` }}
                            initial={{ opacity: 1, y: 0, scale: 0.5 }}
                            animate={{ opacity: 0, y: -150, scale: 1.5 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                        >
                            ♥
                        </motion.div>
                    ))}
                    <div className="bg-white/90 rounded-2xl shadow-2xl flex flex-col sm:flex-row w-11/12 sm:w-3/4 overflow-hidden border border-pink-200/50 backdrop-blur-sm">
                        <div className="w-full sm:w-1/2 relative">
                            <Image
                                src="/images/wedding_gif_3.gif"
                                alt="Wedding GIF"
                                width={0}
                                height={0}
                                sizes="80vh"
                                style={{
                                    width: "100%",
                                    height: "80%",
                                    objectFit: "cover",
                                }}
                                className="object-contain"
                            />
                        </div>

                        <div className="w-full sm:w-1/2 p-6 sm:p-8 bg-gradient-to-br from-pink-50 to-yellow-50">
                            <h2
                                className={`${sacramento.className} text-4xl text-pink-600 mb-6 text-center drop-shadow-md`}
                            >
                                Gửi lời chúc tới chúng mình!
                            </h2>

                            <label className="block text-gray-700 font-medium">
                                Họ tên hoặc biệt danh
                            </label>
                            <input
                                required
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Họ và tên"
                                className="w-full px-4 py-2 mt-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/50 backdrop-blur-sm"
                            />

                            <label className="block mt-4 text-gray-700 font-medium">
                                Bạn của
                            </label>
                            <div className="flex items-center space-x-6">
                                <label className="flex items-center text-lg">
                                    <input
                                        type="radio"
                                        name="roleFriend"
                                        value="bride"
                                        checked={roleFriend === false}
                                        onChange={() => setRoleFriend(false)}
                                        className="mr-2 text-pink-500 focus:ring-pink-400"
                                    />
                                    👰 Cô dâu
                                </label>
                                <label className="flex items-center text-lg">
                                    <input
                                        type="radio"
                                        name="roleFriend"
                                        value="groom"
                                        checked={roleFriend === true}
                                        onChange={() => setRoleFriend(true)}
                                        className="mr-2 text-pink-500 focus:ring-pink-400"
                                    />
                                    🤵 Chú rể
                                </label>
                            </div>

                            <label className="block mt-4 text-gray-700 font-medium">
                                Lời chúc
                            </label>
                            <textarea
                                required
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Lời chúc muốn gửi"
                                className="w-full px-4 py-2 mt-2 border border-pink-200 rounded-lg h-28 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/50 backdrop-blur-sm"
                            />

                            <motion.button
                                className={`${sacramento.className} w-full bg-gradient-to-r from-pink-400 via-rose-400 to-yellow-300 text-white py-3 mt-6 rounded-lg shadow-lg hover:from-pink-500 hover:to-yellow-400 transition-all text-xl`}
                                whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(244, 114, 182, 0.4)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSubmit}
                            >
                                Gửi lời chúc ♡
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Wish;