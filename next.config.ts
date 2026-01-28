import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https",
        port: ""
      },
      {
        hostname: 'capable-mammoth-389.convex.cloud',
        protocol: "https",
        pathname: "/api/storage/**",
      }
    ]
  }
};

export default nextConfig;
