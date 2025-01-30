"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sacramento } from 'next/font/google';

const sacramento = Sacramento({
    subsets: ['latin'],
    weight: '400',
    style: 'normal'
});

export default function Gallery() {
    return (
        <section className="bg-gray-100 py-16">
            <div className="container mx-auto text-center">
                <div id="fh5co-couple" className="fh5co-section-gray">
                    <div className="container">
                        <div className="row">   
                            <div className="bg-gray-100 py-16 px-6 text-center">
                                <h2 className={`text-pink-600 text-5xl font-bold ${sacramento.className}`}>Hello!</h2>
                                <h3 className="text-gray-800 text-2xl mt-4">January 29th, 2026 Vietnam</h3>
                                <p className="text-gray-600 mt-2">We invited you to celebrate our wedding</p>

                                <div className="flex flex-col md:flex-row items-center justify-center mt-10">
                                    <div className="md:w-1/2 py-4 text-right">
                                        <div className="w-40 h-40 ml-auto relative">
                                            <Image
                                                src="/images/gallery-1.jpg"
                                                alt="Groom"
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-full"
                                            />
                                        </div>
                                        <h2 className={`text-pink-500 text-2xl font-semibold mt-4 ${sacramento.className}`}>Lê Thành</h2>
                                        <p className="text-gray-600 mt-2">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove</p>
                                    </div>

                                    <motion.div
                                        className="hidden md:flex items-center justify-center mx-6 text-3xl 
                                        text-pink-500 rounded-full bg-pink-50 p-1 mb-20"                                        animate={{ scale: [1, 1.5, 1] }}
                                        transition={{ repeat: Infinity, duration: 2.0 }}
                                    >
                                        ❤️
                                    </motion.div>

                                    <div className="md:w-1/2 py-4 text-left">
                                        <div className="w-40 h-40 mr-auto relative">
                                            <Image
                                                src="/images/gallery-1.jpg"
                                                alt="Bride"
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-full"
                                            />
                                        </div>
                                        <h2 className={`text-pink-500 text-2xl font-semibold mt-4 ${sacramento.className}`}>Lê Khuê</h2>
                                        <p className="text-gray-600 mt-2">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-gray-600 mt-2">Beautiful memories captured in time.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div>
                        <img src="/images/gallery-1.jpg" alt="Gallery Image 1" className="w-full h-auto rounded-lg shadow-md" />
                    </div>
                    <div>
                        <img src="/images/gallery-1.jpg" alt="Gallery Image 2" className="w-full h-auto rounded-lg shadow-md" />
                    </div>
                    <div>
                        <img src="/images/gallery-1.jpg" alt="Gallery Image 3" className="w-full h-auto rounded-lg shadow-md" />
                    </div>
                </div>
            </div>
        </section>
    );
}