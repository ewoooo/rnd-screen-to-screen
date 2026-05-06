import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		externalDir: true,
	},
	turbopack: {
		resolveAlias: {
			"@wanteddev/wds": "../mobile/node_modules/@wanteddev/wds",
			"@wanteddev/wds/global.css": "../mobile/node_modules/@wanteddev/wds/dist/global.css",
			"@wanteddev/wds-engine": "../mobile/node_modules/@wanteddev/wds-engine",
			"@wanteddev/wds-icon": "../mobile/node_modules/@wanteddev/wds-icon",
			"@wanteddev/wds-lottie": "../mobile/node_modules/@wanteddev/wds-lottie",
			"@wanteddev/wds-nextjs": "../mobile/node_modules/@wanteddev/wds-nextjs",
			"@wanteddev/wds-theme": "../mobile/node_modules/@wanteddev/wds-theme",
		},
	},
	transpilePackages: ["@screen/screens"],
};

export default nextConfig;
