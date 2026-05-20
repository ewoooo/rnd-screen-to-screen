import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  transpilePackages: [
    "@pxds/cx-icons",
    "@pxds/cx-layout",
    "@pxds/cx-spec",
    "@pxds/cx-tokens",
    "@pxds/cx-components",
    "@screen/mobile",
  ],
};

export default nextConfig;
