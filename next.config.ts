import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default config;
