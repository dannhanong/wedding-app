"use client";

import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import Game from "./components/Game";
import Wish from "./components/Wish";
import About from "./components/About";
import { useEffect } from "react";
import { subscribeToPush } from "@/services/push";
import GalleryUpdate from "./components/GalleryUpdate";
// import Image from "next/image";

export default function Home() {
  useEffect(() => {
    async function requestNotificationPermission() {
      const permission: NotificationPermission = await Notification.requestPermission();
      if (permission === 'granted') {
        await subscribeToPush();
      } else {
        console.warn('Quyền thông báo bị từ chối');
      }
    }

    requestNotificationPermission();
  }, []);
  return (
    <div>
      <About />
      <GalleryUpdate />
      <Wish />
      <Game />
      <Footer />
    </div>
  );
}