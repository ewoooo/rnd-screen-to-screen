import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	transpilePackages: [
		"@pxds/cx-components",
		"@pxds/pxds-components",
		"@pxds/pxds-figma",
		"@pxds/pxds-layout",
		"@screen/mobile",
	],
};

export default nextConfig;
