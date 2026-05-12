import { ThemeProvider } from "@pxds/pxds-components/core";
import { AppRouterCacheProvider } from "@pxds/pxds-components/core";
import { ScreenExportBridge } from "@pxds/pxds-layout/screen-export";
import type { PropsWithChildren } from "react";

import "@pxds/pxds-components/core/global.css";
import "@pxds/pxds-tokens/tokens.css";
import "./globals.css";

const RootLayout = ({ children }: PropsWithChildren) => (
	<html lang="ko" suppressHydrationWarning>
		<head>
			<title>PXDX · mobile</title>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="preconnect" href="https://cdn.jsdelivr.net" />
			<link
				rel="stylesheet"
				as="style"
				crossOrigin="anonymous"
				href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-jp-dynamic-subset.css"
			/>
			<link
				rel="stylesheet"
				as="style"
				crossOrigin="anonymous"
				href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css"
			/>
			<script
				src="https://mcp.figma.com/mcp/html-to-design/capture.js"
				async
			/>
			<script src="/figma-capture-mobile-frame.js" />
		</head>
		<body>
			<ThemeProvider>
				<AppRouterCacheProvider>
					<main>{children}</main>
					<ScreenExportBridge />
				</AppRouterCacheProvider>
			</ThemeProvider>
		</body>
	</html>
);

export default RootLayout;
