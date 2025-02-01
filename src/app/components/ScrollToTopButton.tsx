"use client"; // Đảm bảo là Client Component

import { useState, useEffect } from "react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Kiểm tra khi cuộn trang
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);  // Hiển thị button khi cuộn xuống hơn 300px
    } else {
      setIsVisible(false); // Ẩn button khi ở đầu trang
    }
  };

  // Thêm event listener khi component mount và remove khi unmount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Hàm để cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Cuộn mượt mà
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 bg-pink-400 text-white rounded-full shadow-lg hover:bg-pink-500 transition-all z-50"
      >
        ↑
      </button>
    )
  );
}