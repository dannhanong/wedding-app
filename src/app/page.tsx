"use client";

import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import Game from "./components/Game";
import Wish from "./components/Wish";
import About from "./components/About";
// import Image from "next/image";

export default function Home() {
  return (
    <div>
      <About />
      <Gallery />
      <Wish />
      <Game />
      <Footer />
      {/* <div className="relative min-h-screen">
        <Image
          src="/images/flower.gif"
          alt="left gif"
          className="fixed bottom-[-55px] left-[-40px] m-4 w-32 h-32 z-50"
          width={10}
          height={10}
        />
        <Image
          src="/images/flower.gif"
          alt="right gif"
          className="fixed bottom-[-55px] right-[-40px] m-4 w-32 h-32 z-50"
          width={10}
          height={10}
        />
      </div> */}
    </div>
  );
}