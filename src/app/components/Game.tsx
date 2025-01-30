'use client';

import { useState } from 'react';
import Image from "next/image";
import { motion } from "framer-motion";

export default function Game() {
    const [noPosition, setNoPosition] = useState({ top: '50%', left: '50%' });
    const [showDialog, setShowDialog] = useState(false);
    const [selected, setSelected] = useState(false);

    const moveNoButton = () => {
        const newX = Math.random() * (window.innerWidth - 70);
        const newY = Math.random() * (window.innerHeight - 70);
        setNoPosition({ top: `${newY}px`, left: `${newX}px` });
    };

    const handleClickYes = () => {
        setSelected(true);
        setShowDialog(true);
    }

    return (
        <motion.div 
            className="flex flex-col items-center justify-center relative shadow-lg"
            style={{ height: '70vh' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <h1 className="text-2xl font-bold mb-6 text-pink-400">Bạn sẽ tham dự đám cưới chứ?</h1>
            <div className="flex gap-6">
                {
                    selected ? (
                        <button
                            className="px-6 py-3 bg-green-800 text-white rounded-lg shadow-lg text-lg hover:bg-green-600 mr-32 mb-1"
                            disabled
                        >
                            Đã chọn
                        </button>
                    ) : (
                        <button
                            className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg text-lg hover:bg-green-600 mr-32 mb-1"
                            onClick={handleClickYes}
                        >
                            Có
                        </button>
                    )
                }
                <button
                    className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-lg text-lg absolute transition-all duration-500 ease-in-out"
                    style={{ position: 'absolute', top: noPosition.top, left: noPosition.left }}
                    onMouseEnter={moveNoButton}
                    onClick={moveNoButton}
                >
                    Không
                </button>
            </div>
            {showDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-bold mb-4 text-pink-400">Cảm ơn bạn đã xác nhận</h2>
                        <div className='flex justify-center'>
                            <Image
                                src={"/images/wedding_gif.gif"}
                                alt="Bride"
                                width={0}
                                height={0}
                                sizes="50vh"
                                style={{ width: '50%', height: '50%', objectFit: 'cover' }}
                                className="object-contain"
                            />
                        </div>
                        <div className="flex justify-end mt-5">
                            <button
                                className="px-2 py-1 rounded-lg text-lg hover:bg-pink-100 mt-1 text-pink-600"
                                onClick={() => setShowDialog(false)}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}