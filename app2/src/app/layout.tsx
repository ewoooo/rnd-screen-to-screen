import { ThemeProvider } from "@wanteddev/wds";
import { AppRouterCacheProvider } from "@wanteddev/wds-nextjs";
import type { PropsWithChildren } from "react";

import "@wanteddev/wds/global.css";
import "./wds-tokens.css";
import "./globals.css";

const RootLayout = ({ children }: PropsWithChildren) => (
	<html lang="ko" suppressHydrationWarning>
		<head>
			<title>Screen-to-Screen · app2</title>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="preconnect" href="https://cdn.jsdelivr.net" />
			<link rel="preconnect" href="https://static.wanted.co.kr" />
			<link
				rel="stylesheet"
				as="style"
				crossOrigin="anonymous"
				href="https://static.wanted.co.kr/fonts/wantedsans/WantedSansVariable.min.css"
			/>
			<link
				rel="stylesheet"
				as="style"
				crossOrigin="anonymous"
				href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-jp-dynamic-subset.min.css"
			/>
			<link
				rel="stylesheet"
				as="style"
				crossOrigin="anonymous"
				href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
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
