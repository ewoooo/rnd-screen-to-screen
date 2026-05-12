import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	devIndicators: false,
	transpilePackages: ["@screen/evaluation", "@screen/mobile"],
};

export default nextConfig;
