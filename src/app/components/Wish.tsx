"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import Image from 'next/image';
import { createWish, getAllWishes } from "@/services/wish";
import Swal from "sweetalert2";

interface Wish {
  name: string;
  message: string;
  roleFriend: boolean;
}

const Wish: React.FC = () => {
  const [name, setName] = useState('');
  const [roleFriend, setRoleFriend] = useState<boolean>(false);
  const [message, setMessage] = useState('');
  const [wishes, setWishes] = useState<Wish[]>([]);

  const fetchAllWishes = async () => {
    try {
      const response = await getAllWishes();
      setWishes(response.data);
    } catch (error) {
      console.error("Error during wish fetch:", error);
    }
  }

  const handleSubmit = async () => {
    try {
      const response = await createWish(name, message, roleFriend);
      if (response) {
        setName('');
        setRoleFriend(false);
        setMessage('');
        fetchAllWishes();
        Swal.fire({
          icon: 'success',
          title: 'Lời chúc của bạn đã được gửi đi!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error during wish creation:", error);
    }
  }

  useEffect(() => {
    fetchAllWishes();
  }, []);

  return (
    <div id="fh5co-testimonial" className="pt-10 pb-6 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 mt-5">
          <h2 className="text-3xl font-semibold text-pink-400">Những lời chúc</h2>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="w-full"
        >
          {/* Chia danh sách wishes thành nhóm 3 lời chúc trên mỗi slide */}
          {Array.from({ length: Math.ceil(wishes.length / 3) }, (_, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {wishes.slice(index * 3, index * 3 + 3).map((wish, i) => (
                  <div
                    key={i}
                    className="text-center p-6 bg-white rounded-lg shadow-md relative"
                    style={{ minHeight: "245px" }}
                  >
                    <span className="block mt-3 text-sm text-gray-600">
                      {wish.name}
                      <br />
                    </span>
                    <blockquote className="mt-3 text-gray-700 italic text-sm">
                      <p>{wish.message}</p>
                    </blockquote>
                    <div className="absolute bottom-2 right-2 text-pink-600">
                      {wish.roleFriend ? "Bạn của 🤵" : "Bạn của 👰"}
                    </div>
                  </div>
                ))}
              </motion.div>

            </SwiperSlide>
          ))}
        </Swiper>

        <motion.div
          className="flex items-center justify-center min-h-screen bg-pink-100"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl shadow-lg flex flex-col sm:flex-row w-11/12 sm:w-3/4 overflow-hidden">
            {/* Hình ảnh bên trái */}
            <div className="w-full sm:w-1/2 relative">
              <div className='flex items-center align-middle'>
                <Image
                  src={"/images/wedding_gif_3.gif"}
                  alt="Bride"
                  width={0}
                  height={0}
                  sizes="80vh"
                  style={{ width: '100%', height: '80%', objectFit: 'cover' }}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Form bên phải */}
            <div className="w-full sm:w-1/2 p-6 sm:p-8 bg-pink-50">
              <h2 className="text-2xl font-semibold text-center text-pink-600 mb-4">
                Gửi lời chúc tới chúng mình nha!
              </h2>

              <label className="block text-gray-700">Họ tên hoặc biệt danh của bạn</label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Họ và tên"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              />

              <label className="block mt-4 text-gray-700">Bạn của</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="roleFriend"
                    value="bride"
                    checked={roleFriend === false}
                    onChange={() => setRoleFriend(false)}
                    className="mr-2"
                  />
                  👰
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="roleFriend"
                    value="groom"
                    checked={roleFriend === true}
                    onChange={() => setRoleFriend(true)}
                    className="mr-2"
                  />
                  🤵
                </label>
              </div>

              <label className="block mt-4 text-gray-700">Lời chúc</label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Lời chúc muốn gửi"
                className="w-full px-4 py-2 mt-2 border rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-pink-300"
              ></textarea>

              <button 
                className="w-full bg-pink-500 text-white py-2 mt-4 rounded-lg hover:bg-pink-600"
                onClick={handleSubmit}
              >
                Gửi lời chúc ♡
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Wish;