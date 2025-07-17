"use client";

import { useEffect, useRef } from "react";
import Gallery from "../components/Gallery";
import GalleryUpdate from "../components/GalleryUpdate";

export default function Galleries() {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  return (
    <div>
      <div ref={aboutRef}>
        <GalleryUpdate />
      </div>
    </div>
  );
}