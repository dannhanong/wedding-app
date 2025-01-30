"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion";

const wishes = [
  {
    name: "John Doe",
    source: "Twitter",
    message:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia..., Far far away, behind the word mountains, far from the countries Vokalia and Consonantia...",
  },
  {
    name: "Jane Smith",
    source: "Facebook",
    message:
      "At the coast of the Semantics, a large language ocean. Separated they live in Bookmarksgrove...",
  },
  {
    name: "David Johnson",
    source: "Instagram",
    message:
      "Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean...",
  },
  {
    name: "Emily Brown",
    source: "LinkedIn",
    message:
      "Beyond the horizon, across the vast landscapes, there are words yet to be written...",
  },
  {
    name: "Michael Lee",
    source: "Reddit",
    message:
      "Through the ages, stories have been told and passed down from one generation to another...",
  },
  {
    name: "Sarah Wilson",
    source: "WhatsApp",
    message:
      "Within the heart of every storyteller, there lies a tale waiting to be unveiled...",
  },
];

const Wish: React.FC = () => {
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
                    className="text-center p-6 bg-white rounded-lg shadow-md"
                    style={{ minHeight: "245px" }}
                  >
                    <span className="block mt-3 text-sm text-gray-600">
                      {wish.name}
                      <br />
                      via{" "}
                      <a href="#" className="text-blue-500">
                        {wish.source}
                      </a>
                    </span>
                    <blockquote className="mt-3 text-gray-700 italic text-sm">
                      <p>{wish.message}</p>
                    </blockquote>
                  </div>
                ))}
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Wish;