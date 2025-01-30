"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Gallery() {
    return (
      <section className="">
        <div className="container mx-auto text-center">
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
                  className="rounded-lg shadow-md object-contain bg-gray-200"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
}