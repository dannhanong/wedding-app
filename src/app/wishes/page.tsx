"use client";

import { useEffect, useRef } from "react";
import Wish from "../components/Wish";

export default function Wishes() {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  return (
    <div>
      <div ref={aboutRef}>
        <Wish />
      </div>
    </div>
  );
}