"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sacramento } from 'next/font/google';
import About from "./About";

const sacramento = Sacramento({
    subsets: ['latin'],
    weight: '400',
    style: 'normal'
});

export default function Gallery() {
    return (
      <section className="">
        <div className="container mx-auto text-center">
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
                      January 29th, 2026 Vietnam
                    </h3>
                    <p className="text-gray-600 mt-2">
                      We invited you to celebrate our wedding
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
                      className="hidden md:flex items-center justify-center mx-6 text-3xl 
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
                        Lê Khuê
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
          <About />
          <p className="text-gray-600 mt-2">
            Beautiful memories captured in time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[...Array(6)].map((_, index) => (
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
                <Image
                  src="/images/gallery-1.jpg"
                  alt={`Gallery Image ${index + 1}`}
                  width={300}
                  height={370}
                  style={{ minHeight: 370 }}
                  className="rounded-lg shadow-md"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
}