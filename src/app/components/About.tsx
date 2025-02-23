"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Sacramento } from 'next/font/google';
import { getAllStories } from '@/services/story';

const sacramento = Sacramento({
  subsets: ['latin'],
  weight: '400',
  style: 'normal',
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
    const newHearts = Array(5).fill(0).map((_, i) => ({
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
    <div id="fh5co-couple-story" className="py-12 bg-gradient-to-b from-pink-50 to-yellow-50 text-gray-800">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Giới thiệu cặp đôi */}
        <motion.div
          className="bg-white py-16 px-6 text-center shadow-lg rounded-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-28 h-28 overflow-hidden border-4 border-pink-200 shadow-lg flex items-center justify-center mx-auto"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/images/wedding_gif.gif"
              alt="Wedding GIF"
              width={96}
              height={96}
              className="object-cover"
            />
          </motion.div>

          <h2 className={`${sacramento.className} text-5xl text-pink-600 font-bold mt-8`}>
            Xin chào!
          </h2>
          <h3 className="text-gray-800 text-2xl mt-4">
            Ngày 29/01/2026 tại Quảng Ninh / Hải Phòng
          </h3>
          <p className="text-gray-600 mt-2 italic">
            Mời bạn đến chung vui ngày cưới của chúng tôi!
          </p>

          {/* Cặp đôi */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center mt-10 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="md:w-1/2 py-4 text-right">
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
              <h2 className={`${sacramento.className} text-3xl text-pink-500 mt-4`}>
                Lê Thành
              </h2>
              <p className="text-gray-600 mt-2 max-w-sm mx-auto">
                Một chàng trai yêu sự tự do, luôn tìm kiếm vẻ đẹp trong từng khoảnh khắc bên người mình yêu.
              </p>
            </div>

            <motion.div
              className="text-4xl text-pink-500 bg-pink-100 rounded-full p-3"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              ❤️
            </motion.div>

            <div className="md:w-1/2 py-4 text-left">
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
              <h2 className={`${sacramento.className} text-3xl text-pink-500 mt-4`}>
                Minh Khuê
              </h2>
              <p className="text-gray-600 mt-2 max-w-sm mx-auto">
                Một cô gái dịu dàng, luôn mang đến ánh sáng và niềm vui cho những người xung quanh.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Section Our Story */}
        <div className="text-center mt-16">
          <div className="flex justify-center my-10">
            {[...Array(bowCount)].map((_, index) => (
              <motion.img
                key={index}
                src="/images/bow1.gif"
                alt="Bow"
                width={22}
                height={22}
                className="object-contain"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              />
            ))}
          </div>
          <span className={`${sacramento.className} text-2xl text-pink-500`}>
            We Love Each Other
          </span>
          <h2 className={`${sacramento.className} text-4xl text-gray-800 mt-2`}>
            Our Story
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto italic">
            Hành trình của chúng tôi bắt đầu từ những điều giản dị, và giờ đây, chúng tôi cùng nhau viết nên một câu chuyện tình yêu.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-12" onMouseEnter={addHearts}>
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              className="absolute text-2xl text-pink-500"
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
                className={`mb-12 flex flex-col md:flex-row items-center ${index % 2 !== 0 ? "md:flex-row-reverse" : ""
                  }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <motion.div
                  className="w-24 h-24 rounded-full overflow-hidden border-4 border-pink-200 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL_FILE}/files/preview/${item.image}`}
                    alt={item.title}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </motion.div>
                <div className="bg-gradient-to-r from-pink-100 to-yellow-100 shadow-md rounded-lg p-6 max-w-md md:ml-6 md:mr-6">
                  <h3 className={`${sacramento.className} text-2xl text-pink-600`}>
                    {item.title}
                  </h3>
                  <span className="text-gray-500 text-sm block mb-2">
                    {new Date(item.date).toLocaleDateString('vi-VN')}
                  </span>
                  <p className="text-gray-600">{item.description}</p>
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