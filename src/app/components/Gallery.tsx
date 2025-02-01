"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getAllGalleries } from "@/services/gallery";

interface Gallery {
  id: string;
  fileCode: string;
}

export default function Gallery() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSize, setCurrentSize] = useState(3);

  const fetchAll = async (size: number) => {
    try {
      setIsLoading(true);
      const response = await getAllGalleries(size);
      setGalleries(response.content);

      console.log("Galleries data:", response);
    } catch (error) {
      console.error("Error during gallery fetch:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAll(currentSize);
  }, [currentSize]);

  return (
    !isLoading ? (
      <section className="">
        <div className="container mx-auto text-center">
          <p className="text-gray-600 mt-2">
            Những kỷ niệm đẹp được ghi lại
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {galleries.map((gallery, index) => (
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
                  // src={`${getUrl(gallery.fileCode)}`}
                  src={`${process.env.NEXT_PUBLIC_API_URL}/files/preview/${gallery.fileCode}`}
                  alt={`Gallery Image ${index + 1}`}
                  width={330}
                  height={370}
                  style={{ minHeight: 370 }}
                  className="rounded-lg shadow-md object-contain bg-pink-50"
                />
              </motion.div>
            ))}
          </div>

          <button
            className="bg-pink-500 text-white px-4 py-2 rounded-md mb-4 mt-6"
            onClick={() => setCurrentSize(currentSize + 3)}
          >
            Xem thêm
          </button>
        </div>
      </section>
    ) : (
      <div className="text-center mt-8">
        <p className="text-gray-600">Đang tải dữ liệu...</p>
      </div>
    )
  );
}