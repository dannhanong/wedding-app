"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sacramento } from "next/font/google";
import { getAllGalleries } from "@/services/gallery";

const sacramento = Sacramento({
    subsets: ['latin'],
    weight: '400',
    style: 'normal',
});

interface Gallery {
    id: string;
    fileCode: string;
}

export default function Gallery() {
    const [galleries, setGalleries] = useState<Gallery[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentSize, setCurrentSize] = useState(3);

    const fetchAll = async (size: number) => {
        try {
            setIsLoading(true);
            const response = await getAllGalleries(size);
            setGalleries(response.content);
            console.log("Galleries data:", response);
        } catch (error) {
            console.error("Error during gallery fetch:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAll(currentSize);
    }, [currentSize]);

    // Các màu viền nhấp nháy
    const borderColors = [
        "border-pink-200", 
        "border-pink-300", 
        "border-yellow-200", 
        "border-pink-400"
    ];

    return (
        <section className="py-12 bg-gradient-to-b from-pink-50 to-yellow-50">
            {!isLoading ? (
                <div className="container mx-auto text-center">
                    {/* Tiêu đề */}
                    <motion.h2
                        className={`${sacramento.className} text-4xl text-pink-600 mb-2`}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Những Khoảnh Khắc Đẹp
                    </motion.h2>
                    <p className="text-gray-600 mt-2 italic max-w-2xl mx-auto">
                        Mỗi bức ảnh là một kỷ niệm, một câu chuyện tình yêu được lưu giữ mãi mãi.
                    </p>

                    {/* Grid ảnh */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        {galleries.map((gallery, index) => (
                            <motion.div
                                key={index}
                                className="flex justify-center"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: Math.floor(index / 3) * 0.3,
                                }}
                            >
                                {/* Khung ngoài với hiệu ứng nhấp nháy */}
                                <motion.div 
                                    className="p-1 rounded-lg overflow-hidden relative"
                                    animate={{ 
                                        boxShadow: [
                                            "0 0 3px rgba(255, 182, 193, 0.5)",
                                            "0 0 8px rgba(255, 182, 193, 0.8)",
                                            "0 0 3px rgba(255, 182, 193, 0.5)"
                                        ],
                                        borderColor: borderColors
                                    }}
                                    transition={{ 
                                        duration: 3,
                                        repeat: Infinity,
                                        repeatType: "mirror",
                                        ease: "easeInOut",
                                        delay: index * 0.2 // Delay khác nhau cho mỗi khung hình
                                    }}
                                >
                                    <motion.div
                                        className="relative rounded-lg shadow-md overflow-hidden border-4 border-pink-200 bg-pink-50"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_API_URL_FILE}/files/preview/${gallery.fileCode}`}
                                            alt={`Gallery Image ${index + 1}`}
                                            width={400}
                                            height={370}
                                            style={{ minHeight: 370 }}
                                            className="object-cover"
                                        />
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Nút Xem thêm */}
                    <motion.button
                        className={`${sacramento.className} bg-gradient-to-r from-pink-400 to-yellow-300 text-white px-6 py-3 rounded-full shadow-md hover:from-pink-500 hover:to-yellow-400 transition mt-8 mb-4`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentSize(currentSize + 3)}
                    >
                        Xem thêm kỷ niệm
                    </motion.button>
                </div>
            ) : (
                <div className="text-center mt-8">
                    <motion.p
                        className={`${sacramento.className} text-2xl text-pink-500`}
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        Đang tải những khoảnh khắc...
                    </motion.p>
                </div>
            )}
        </section>
    );
}