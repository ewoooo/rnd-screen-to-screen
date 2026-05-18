import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	transpilePackages: [
		"@pxds/cx-components",
		"@pxds/cx-icons",
		"@pxds/pxds-figma",
		"@pxds/cx-layout",
		"@screen/mobile",
	],
};

export default nextConfig;
