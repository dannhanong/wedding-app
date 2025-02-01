"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Sacramento } from 'next/font/google';
import { getAllStories } from '@/services/story';

const sacramento = Sacramento({
    subsets: ['latin'],
    weight: '400',
    style: 'normal'
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
      <div id="fh5co-couple-story" className="py-6 bg-gray-100 text-gray-100">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.li
            id="fh5co-couple"
            className="fh5co-section-gray"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="container">
              <div className="row">
                <div className="bg-gray-100 py-16 px-6 text-center shadow-lg rounded-lg">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <style jsx>{`
                      @keyframes flip {
                        0% {
                          transform: rotateY(0deg);
                        }
                        50% {
                          transform: rotateY(180deg);
                        }
                        100% {
                          transform: rotateY(360deg);
                        }
                      }
                    `}</style>

                    <div className="w-28 h-28 overflow-hidden border-4 border-white shadow-lg flex items-center justify-center mx-auto">
                      <Image
                        src={"/images/wedding_gif.gif"}
                        alt={"gif"}
                        width={96}
                        height={96}
                        className="object-cover"
                        style={{ animation: "flip 60s infinite linear" }}
                      />
                    </div>

                    <h2
                      className={`text-pink-600 text-5xl font-bold pt-16 ${sacramento.className}`}
                    >
                      Xin chào!
                    </h2>
                    <h3 className="text-gray-800 text-2xl mt-4">
                      Vào ngày 29/01/2026 tại Quảng Ninh / Hải Phòng
                    </h3>
                    <p className="text-gray-600 mt-2">
                      Mời bạn đến dự lễ cưới của chúng tôi
                    </p>
                  </motion.div>

                  <motion.div
                    className="flex flex-col md:flex-row items-center justify-center mt-10"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
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
                      <h2
                        className={`text-pink-500 text-2xl font-semibold mt-4 ${sacramento.className}`}
                      >
                        Lê Thành
                      </h2>
                      <p className="text-gray-600 mt-2">
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts. Separated they live in Bookmarksgrove
                      </p>
                    </div>

                    <motion.div
                      className="md:flex items-center justify-center mx-6 text-3xl 
                                        text-pink-500 rounded-full bg-pink-50 p-1 mb-20"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ repeat: Infinity, duration: 2.3 }}
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
                      <h2
                        className={`text-pink-500 text-2xl font-semibold mt-4 ${sacramento.className}`}
                      >
                        Minh Khuê
                      </h2>
                      <p className="text-gray-600 mt-2">
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts. Separated they live in Bookmarksgrove
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.li>
          <div className="text-center mb-12">
            <div className="flex justify-center my-10">
              {[...Array(bowCount)].map((_, index) => (
                <Image
                  key={index}
                  src={"/images/bow1.gif"}
                  alt="Bride"
                  width={22}
                  height={22}
                  className="object-contain"
                />
              ))}
            </div>
            <span className="text-lg text-gray-500">We Love Each Other</span>
            <h2 className="text-3xl font-bold text-gray-800">Our Story</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts.
            </p>
          </div>
          <div className="relative">
            <ul className="timeline">
              {stories.map((item, index) => (
                <motion.li
                  key={index}
                  className={`mb-8 flex flex-col md:flex-row items-center ${
                    index % 2 !== 0 ? "md:flex-row-reverse" : ""
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/files/preview/${item.image}`}
                      alt={item.title}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-white shadow-md rounded-lg p-6 max-w-md md:ml-6 md:mr-6">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <span className="text-gray-500 text-sm block mb-2">
                      {item.date.toLocaleString()}
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