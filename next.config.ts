import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["c.animaapp.com"],
  },
  async rewrites() {
    return [
      {
        source: "/gooham/:path*", // 클라이언트 요청
        destination: "http://localhost:8080/gooham/:path*", // 백엔드 서버 주소
      },
    ];
  },
};

export default nextConfig;
