import { withThemeByDataAttribute } from "@storybook/addon-themes";
import type { Preview, ReactRenderer } from "@storybook/react-vite";

import "../src/storybook.css";

const preview: Preview = {
	parameters: {
		layout: "centered",
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		options: {
			storySort: {
				order: [
					"Docs",
					["Introduction"],
					"Tokens",
					["Color", "Typography", "Spacing", "Radius", "Theme aliases"],
					"Components",
					["base", "*"],
					"Candidate",
				],
			},
		},
		viewport: {
			viewports: {
				mobileSm: {
					name: "Mobile S (360×640)",
					styles: { width: "360px", height: "640px" },
					type: "mobile",
				},
				mobileMd: {
					name: "Mobile M (375×812)",
					styles: { width: "375px", height: "812px" },
					type: "mobile",
				},
				mobileLg: {
					name: "Mobile L (390×844)",
					styles: { width: "390px", height: "844px" },
					type: "mobile",
				},
			},
		},
	},
	decorators: [
		withThemeByDataAttribute<ReactRenderer>({
			themes: {
				light: "light",
				dark: "dark",
			},
			defaultTheme: "light",
			attributeName: "data-theme",
		}),
	],
	tags: ["autodocs"],
};

export default preview;
