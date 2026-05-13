import { ThemeProvider } from "@pxds/pxds-components/core";
import { AppRouterCacheProvider } from "@pxds/pxds-components/core";
import type { PropsWithChildren } from "react";

import "@pxds/pxds-components/core/global.css";
import "@pxds/cx-tokens/tokens.css";
import "@pxds/pxds-layout/styles.css";
import "@pxds/cx-components/styles.css";
import "../patterns/mbr/styles.css";
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
		</head>
		<body>
			<ThemeProvider>
				<AppRouterCacheProvider>
					<main>{children}</main>
				</AppRouterCacheProvider>
			</ThemeProvider>
		</body>
	</html>
);

export default RootLayout;
