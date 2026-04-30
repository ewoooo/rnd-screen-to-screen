import { ThemeProvider } from "@wanteddev/wds";
import { AppRouterCacheProvider } from "@wanteddev/wds-nextjs";
import type { PropsWithChildren } from "react";

import "@wanteddev/wds/global.css";
import "./wds-tokens.css";
import "./globals.css";

const RootLayout = ({ children }: PropsWithChildren) => (
	<html lang="ko" suppressHydrationWarning>
		<head>
			<title>Screen-to-Screen · mobile</title>
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
