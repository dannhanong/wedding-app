"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sacramento } from "next/font/google";
import { getAllStories } from "@/services/story";

const sacramento = Sacramento({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});

interface Story {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

const About = () => {
  const [bowCount, setBowCount] = useState(0);
  const [stories, setStories] = useState<Story[]>([]);
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);

  const addHearts = () => {
    const newHearts = Array(5)
      .fill(0)
      .map((_, i) => ({
        id: i,
        x: Math.random() * 100,
      }));
    setHearts(newHearts);
    setTimeout(() => setHearts([]), 3000);
  };

  const fetchAllStories = async () => {
    try {
      const response = await getAllStories();
      setStories(response.data);
    } catch (error) {
      console.error("Error during story fetch:", error);
    }
  };

  useEffect(() => {
    const w = window.innerWidth;
    const bc = Math.round(w / 30);
    setBowCount(bc);
    fetchAllStories();
  }, []);

  return (
    <div
      id="fh5co-couple-story"
      className="py-12 bg-gradient-to-b from-pink-50 to-yellow-50 text-gray-800"
    >
      <div className="container mx-auto px-4 md:px-12 lg:px-24 flex flex-col items-center">
        {/* Section giới thiệu */}
        <motion.div
          className="bg-white py-12 px-6 md:px-12 text-center shadow-lg rounded-lg w-full max-w-4xl relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Hiệu ứng hoa rơi */}
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <motion.img
                key={i}
                src="/images/flower1.png"
                alt="Flower petal"
                className="absolute w-6 md:w-8 h-6 md:h-8 opacity-70"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{ y: [0, 20, 0], opacity: [0, 1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  delay: i * 0.3,
                }}
              />
            ))}

          <motion.div
            className="w-28 md:w-32 h-28 md:h-32 mx-auto relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Image
              src="/images/wedding_gif.gif"
              alt="Wedding GIF"
              width={128}
              height={128}
              className="rounded-full object-cover border-4 border-pink-200 shadow-lg"
            />
          </motion.div>

          <motion.h2
            className={`${sacramento.className} text-2xl md:text-5xl text-pink-600 font-bold mt-4 md:mt-6`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05, color: "#f9a8d4" }}
          >
            Xin chào!
          </motion.h2>
          <motion.h3
            className={`${sacramento.className} text-sm md:text-2xl text-gray-800 mt-2 md:mt-4`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Ngày 29/01/2026 tại Quảng Ninh / Hải Phòng
          </motion.h3>
          <motion.p
            className="text-gray-600 mt-2 text-sm md:text-base italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Mời bạn đến chung vui ngày cưới của chúng tôi!
          </motion.p>
        </motion.div>

        {/* Cặp đôi */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center mt-8 md:mt-10 gap-6 md:gap-8 relative w-full max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Hiệu ứng hoa rơi quanh cặp đôi */}
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <motion.img
                key={i}
                src="/images/flower1.png"
                alt="Flower petal"
                className="absolute w-5 md:w-6 h-5 md:h-6 opacity-70"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{ y: [0, 20, 0], opacity: [0, 1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  delay: i * 0.2,
                }}
              />
            ))}

          {/* Chú rể (Lê Thành) */}
          <div className="md:w-1/2 py-4 text-right w-full flex flex-col items-end">
            <motion.div
              className="w-40 h-40 mx-auto relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className='flex justify-end'>
                <Image
                  src="/images/gallery-1.jpg"
                  alt="Groom"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full border-4 border-yellow-300"
                />
              </div>
            </motion.div>
            <motion.h2
              className={`${sacramento.className} text-xl md:text-3xl text-pink-500 mt-4`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05, color: "#f9a8d4" }}
            >
              Lê Thành
            </motion.h2>
            <p className="text-gray-600 mt-2 max-w-sm mx-auto text-sm md:text-base italic text-right">
              Một chàng trai yêu sự tự do, luôn tìm kiếm vẻ đẹp trong từng khoảnh khắc bên người mình yêu.
            </p>
          </div>

          {/* Trái tim giữa */}
          <motion.div
            className="text-3xl md:text-4xl text-pink-500 bg-gradient-to-br from-pink-100 to-yellow-100 rounded-full p-2 md:p-3 shadow-md"
            animate={{ scale: [1, 1.3, 1], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          >
            ❤️
          </motion.div>

          {/* Cô dâu (Minh Khuê) */}
          <div className="md:w-1/2 py-4 text-left w-full flex flex-col items-start">
            <motion.div
              className="w-28 md:w-40 h-28 md:h-40 mx-auto relative"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-40 h-40 mx-auto relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/gallery-1.jpg"
                  alt="Bride"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full border-4 border-pink-300"
                />
              </motion.div>
            </motion.div>
            <motion.h2
              className={`${sacramento.className} text-xl md:text-3xl text-pink-500 mt-4`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05, color: "#f9a8d4" }}
            >
              Minh Khuê
            </motion.h2>
            <p className="text-gray-600 mt-2 max-w-sm mx-auto text-sm md:text-base italic text-left">
              Một cô gái dịu dàng, luôn mang đến ánh sáng và niềm vui cho những người xung quanh.
            </p>
          </div>
        </motion.div>
        {/* Section Our Story */}
        <div className="text-center mt-8 md:mt-16 w-full max-w-4xl">
          <div className="flex justify-center my-6 md:my-10">
            {[...Array(bowCount)].map((_, index) => (
              <motion.img
                key={index}
                src="/images/bow1.gif"
                alt="Bow"
                width={18}
                height={18}
                className="object-contain"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              />
            ))}
          </div>
          <motion.span
            className={`${sacramento.className} text-xl md:text-2xl text-pink-500`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We Love Each Other
          </motion.span>
          <motion.h2
            className={`${sacramento.className} text-2xl md:text-4xl text-gray-800 mt-2 md:mt-4`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Our Story
          </motion.h2>
          <motion.p
            className="text-gray-600 mt-2 text-sm md:text-base max-w-2xl mx-auto italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Hành trình của chúng tôi bắt đầu từ những điều giản dị, và giờ đây, chúng tôi cùng nhau viết nên một câu chuyện tình yêu.
          </motion.p>
        </div>

        {/* Timeline */}
        <div
          className="relative mt-8 md:mt-12 w-full max-w-4xl"
          onMouseEnter={addHearts}
        >
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              className="absolute text-xl md:text-2xl text-pink-500"
              style={{ top: 0, left: `${heart.x}%` }}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: 200 }}
              transition={{ duration: 3 }}
            >
              ♥
            </motion.div>
          ))}
          <ul className="timeline">
            {stories.map((item, index) => (
              <motion.li
                key={index}
                className={`mb-8 md:mb-12 flex flex-col md:flex-row items-center ${index % 2 !== 0 ? "md:flex-row-reverse" : ""
                  }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <motion.div
                  className="w-20 md:w-24 h-20 md:h-24 rounded-full overflow-hidden border-4 border-pink-200 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL_FILE}/files/preview/${item.image}`}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </motion.div>
                <div className="bg-gradient-to-r from-pink-100 to-yellow-100 shadow-md rounded-lg p-4 md:p-6 max-w-md md:ml-4 md:mr-4">
                  <h3
                    className={`${sacramento.className} text-xl md:text-2xl text-pink-600`}
                  >
                    {item.title}
                  </h3>
                  <span className="text-gray-500 text-xs md:text-sm block mb-1 md:mb-2">
                    {new Date(item.date).toLocaleDateString("vi-VN")}
                  </span>
                  <p className="text-gray-600 text-sm md:text-base">
                    {item.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;