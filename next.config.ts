import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ['127.0.0.1', 'localhost', 'wedding-app-4nfg.onrender.com', 'wedding-file.onrender.com'],
  },
};

export default nextConfig;
