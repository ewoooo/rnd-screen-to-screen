import { ThemeProvider } from "@wanteddev/wds";
import { AppRouterCacheProvider } from "@wanteddev/wds-nextjs";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import "@wanteddev/wds/global.css";
import "./globals.css";

export const metadata: Metadata = {
	title: "Figma Export",
	description: "iframe-free transfer renderer for Screen-to-Screen previews",
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="ko" suppressHydrationWarning>
			<head>
				<script
					src="https://mcp.figma.com/mcp/html-to-design/capture.js"
					async
				/>
			</head>
			<body>
				<ThemeProvider>
					<AppRouterCacheProvider>{children}</AppRouterCacheProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
