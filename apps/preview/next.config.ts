import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	devIndicators: false,
	transpilePackages: [
		"@pxds/pxds-preview",
		"@screen/evaluation",
		"@screen/registry",
		"@screen/specs",
	],
};

export default nextConfig;
