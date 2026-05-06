import type { Preview } from "@storybook/nextjs-vite";
import { ThemeProvider } from "@wanteddev/wds";
import type { PropsWithChildren } from "react";

import "@wanteddev/wds/global.css";
import "../../mobile/src/app/wds-tokens.css";
import "../../mobile/src/app/globals.css";
import "./preview.css";

const WdsProvider = ({ children }: PropsWithChildren) => (
	<ThemeProvider>{children}</ThemeProvider>
);

const preview: Preview = {
	decorators: [
		(Story) => (
			<WdsProvider>
				<Story />
			</WdsProvider>
		),
	],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		layout: "centered",
	},
};

export default preview;
