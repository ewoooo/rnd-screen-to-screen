import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	devIndicators: false,
	transpilePackages: [
		"@pxds/pxds-preview",
		"@screen/evaluation",
		"@screen/mobile",
	],
};

export default nextConfig;
