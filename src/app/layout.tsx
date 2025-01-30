import type { Metadata } from "next";
import "./globals.css";
import Hero from "./components/Hero";
import FlowerEffect from "./components/FlowerEffect";
import ScrollToTopButton from "./components/ScrollToTopButton";

export const metadata: Metadata = {
  title: "Wedding - Next.js",
  description: "A beautiful wedding website built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <FlowerEffect />
        <Hero />
        {children}
        <ScrollToTopButton />
      </body>
    </html>
  );
}