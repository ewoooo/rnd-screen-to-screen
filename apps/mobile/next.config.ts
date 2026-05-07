import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Next.js 좌하단 dev indicator(빌드 상태 FAB) 숨김 — 모바일 frame 위에 떠서 거슬림
	devIndicators: false,
	allowedDevOrigins: ["http://localhost:3000", "http://127.0.0.1:3000"],
	transpilePackages: [
		"@pxds/pxds-components",
		"@pxds/pxds-icons",
		"@pxds/pxds-layout",
		"@pxds/pxds-tokens",
		"@screen/registry",
		"@screen/specs",
	],
};

export default nextConfig;
