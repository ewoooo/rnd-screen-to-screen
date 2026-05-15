import { AppRouterCacheProvider, ThemeProvider } from "@pxds/pxds-components/core";
import type { PropsWithChildren } from "react";

import "@pxds/pxds-components/core/global.css";
import "@pxds/cx-tokens/style.css";
import "@pxds/pxds-layout/styles.css";
import "@pxds/cx-components/styles.css";
import "../../../mobile/src/patterns/mbr/styles.css";
import "./globals.css";

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="ko" suppressHydrationWarning>
			<head>
				<title>PXDS Figma Export PoC</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="preconnect" href="https://cdn.jsdelivr.net" />
				<link
					rel="stylesheet"
					as="style"
					crossOrigin="anonymous"
					href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css"
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
