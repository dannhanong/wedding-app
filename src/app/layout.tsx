import type { Metadata } from "next";
import "./globals.css";
import Hero from "./components/Hero";
import FlowerEffect from "./components/FlowerEffect";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Chatbot from "./components/ChatbotButton";

export const metadata: Metadata = {
  title: "Lê Thành & Minh Khuê",
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
        <Chatbot />
      </body>
    </html>
  );
}