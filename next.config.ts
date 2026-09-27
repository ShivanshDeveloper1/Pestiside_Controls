import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-1600585154340-be6161a56a0c",
      },
      { protocol: "https", hostname: "images.unsplash.com" },
       {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      
    ],
    
  },
   typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
