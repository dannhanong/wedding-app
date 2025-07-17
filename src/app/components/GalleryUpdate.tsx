"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sacramento } from "next/font/google";
import { getAllGalleries } from "@/services/gallery";
import styles from "./GalleryUpdate.module.css";

const sacramento = Sacramento({
    subsets: ['latin'],
    weight: '400',
    style: 'normal',
});

interface Gallery {
    id: string;
    fileCode: string;
}

export default function GalleryUpdate() {
    const [galleries, setGalleries] = useState<Gallery[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentSize, setCurrentSize] = useState(10);

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
        <section className="py-1 bg-gradient-to-b from-pink-50 to-yellow-50">
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
                    <div className={styles.banner}>
                        <div className={styles.slider} style={{ ['--quantity' as string]: galleries.length }}>
                            {galleries.map((gallery, index) => (
                                <div
                                    // className={`${styles.item}${index}`}
                                    className={styles.item}
                                    key={gallery.id}
                                    style={{ ['--position' as string]: index + 1 }}
                                >
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_API_URL_FILE}/files/preview/${gallery.fileCode}`}
                                        alt={`Gallery Image ${gallery.id}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
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