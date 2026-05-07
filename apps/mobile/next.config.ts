import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Next.js 좌하단 dev indicator(빌드 상태 FAB) 숨김 — 모바일 frame 위에 떠서 거슬림
	devIndicators: false,
	transpilePackages: [
		"@pxds/pxds-components",
		"@pxds/pxds-layout",
		"@screen/screens",
	],
};

export default nextConfig;
