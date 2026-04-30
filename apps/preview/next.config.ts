import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	devIndicators: false,
	transpilePackages: ["@screen/screens"],
};

export default nextConfig;
