import { Sacramento } from 'next/font/google';
import { motion } from 'framer-motion';

const sacramento = Sacramento({
    subsets: ['latin'],
    weight: '400',
});

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-pink-400 to-yellow-300 text-white py-12 text-center">
            <div className="container mx-auto">
                {/* Ngày cưới */}
                <motion.p
                    className={`${sacramento.className} text-3xl font-semibold mb-2`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    29-01-2026
                </motion.p>

                {/* Câu trích dẫn */}
                <motion.p
                    className="text-lg italic text-white mb-6 font-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1 }}
                >
                    Tình yêu là một hành trình dài, và mỗi khoảnh khắc đều là một chương đẹp
                </motion.p>

                {/* Tạo bởi */}
                <p className="text-sm flex justify-center items-center space-x-1">
                    <span>Tạo bởi</span>
                    <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        ❤️
                    </motion.span>
                    <a
                        href="https://freehtml5.co/"
                        className={`${sacramento.className} text-white text-xl hover:text-pink-100 transition`}
                    >
                        Chim cánh cụt - Chúa tể bầu trời
                    </a>
                </p>

                {/* Lời chúc */}
                <motion.p
                    className="text-xs mt-4 italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                >
                    Chúc các cặp đôi mãi mãi hạnh phúc bên nhau.
                </motion.p>
            </div>
        </footer>
    );
}