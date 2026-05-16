import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	devIndicators: false,
	transpilePackages: ["@pxds/cx-layout", "@pxds/cx-spec", "@screen/mobile"],
};

export default nextConfig;
