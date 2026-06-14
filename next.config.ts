import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.103"],
  images: {
    unoptimized: true,
  },
  output: "export",
  trailingSlash: true,
};

export default nextConfig;
