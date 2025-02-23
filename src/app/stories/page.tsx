"use client";

import { useEffect, useRef } from "react";
import About from "../components/About";

export default function Stories() {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  return (
    <div>
      <div ref={aboutRef}>
        <About />
      </div>
    </div>
  );
}