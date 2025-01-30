"use client";

import { useEffect, useRef } from "react";

const FlowerEffect = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const createFlower = () => {
      if (!containerRef.current) return;

      const flower = document.createElement("div");
      flower.classList.add("flower");

      // Vị trí ngẫu nhiên
      flower.style.left = `${Math.random() * 100}vw`;

      // Góc rơi ngẫu nhiên
      flower.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;

      // Tốc độ rơi & độ trễ ngẫu nhiên
      const duration = Math.random() * 3 + 4;
      flower.style.animation = `fall ${duration}s linear`;
      flower.style.animationDelay = `${Math.random() * 4}s`;

      // Kích thước ngẫu nhiên
      const size = Math.random() * 30 + 30;
      flower.style.width = `${size}px`;
      flower.style.height = `${size}px`;

      // Thêm vào container
      containerRef.current.appendChild(flower);

      // Xóa cánh hoa sau khi rơi
      setTimeout(() => flower.remove(), duration * 1000);
    };

    // Tạo hiệu ứng liên tục
    const interval = setInterval(createFlower, 380);

    return () => clearInterval(interval);
  }, []);

  return <div id="falling-flowers" ref={containerRef}></div>;
};

export default FlowerEffect;
