import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://astrolive-shubh.onrender.com/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
