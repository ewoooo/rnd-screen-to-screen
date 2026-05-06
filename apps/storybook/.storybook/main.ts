import type { StorybookConfig } from "@storybook/nextjs-vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(dirname, "../../..");
const mobileSrc = path.resolve(dirname, "../../mobile/src");
const registryRoot = path.resolve(dirname, "../../../registry");
const wanteddevRoot = path.resolve(repoRoot, "apps/mobile/node_modules/@wanteddev");

const config: StorybookConfig = {
	stories: ["../src/**/*.stories.@(ts|tsx|mdx)"],
	addons: ["@storybook/addon-docs"],
	framework: {
		name: "@storybook/nextjs-vite",
		options: {},
	},
	typescript: {
		reactDocgen: false,
	},
	viteFinal: async (config) => {
		config.resolve = config.resolve ?? {};
		const existingAliases = Array.isArray(config.resolve.alias)
			? config.resolve.alias
			: Object.entries(config.resolve.alias ?? {}).map(([find, replacement]) => ({
					find,
					replacement,
				}));
		config.resolve.alias = [
			{ find: "@wanteddev/wds/global.css", replacement: path.join(wanteddevRoot, "wds/dist/global.css") },
			{ find: "@wanteddev/wds/theme.css", replacement: path.join(wanteddevRoot, "wds/dist/theme.css") },
			{ find: "@wanteddev/wds/reset.css", replacement: path.join(wanteddevRoot, "wds/dist/reset.css") },
			{ find: "@wanteddev/wds", replacement: path.join(wanteddevRoot, "wds/dist/index.mjs") },
			{ find: "@wanteddev/wds-engine", replacement: path.join(wanteddevRoot, "wds-engine") },
			{ find: "@wanteddev/wds-icon", replacement: path.join(wanteddevRoot, "wds-icon/dist/index.mjs") },
			{ find: "@wanteddev/wds-lottie", replacement: path.join(wanteddevRoot, "wds-lottie") },
			{ find: "@wanteddev/wds-nextjs", replacement: path.join(wanteddevRoot, "wds-nextjs") },
			{ find: "@wanteddev/wds-theme", replacement: path.join(wanteddevRoot, "wds-theme") },
			{ find: "@", replacement: mobileSrc },
			{ find: "@registry", replacement: registryRoot },
			...existingAliases,
		];
		config.resolve.dedupe = ["react", "react-dom"];
		return config;
	},
};

export default config;
