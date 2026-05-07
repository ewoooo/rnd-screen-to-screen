import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	devIndicators: false,
	transpilePackages: ["@pxds/pxds-preview", "@screen/screens"],
};

export default nextConfig;
