import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	devIndicators: false,
	transpilePackages: ["@screen/mobile"],
};

export default nextConfig;
