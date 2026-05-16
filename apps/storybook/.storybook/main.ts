import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	stories: [
		"../src/docs/**/*.mdx",
		"../generated/**/*.stories.tsx",
		"../src/stories/**/*.stories.tsx",
	],
	addons: ["@storybook/addon-docs", "@storybook/addon-themes"],
	typescript: {
		reactDocgen: "react-docgen-typescript",
	},
	docs: {
		defaultName: "Docs",
	},
};

export default config;
