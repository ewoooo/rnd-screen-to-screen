"use client";

import { ThemeProvider } from "@wanteddev/wds";
import { AppRouterCacheProvider } from "@wanteddev/wds-nextjs";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, type PropsWithChildren, type ReactNode } from "react";

import "@wanteddev/wds/global.css";
import "./wds-tokens.css";
import "./globals.css";

// 루트 인덱스(/)만 풀스크린, 나머지 화면 라우트는 mobile-frame.
const isScreenRoute = (pathname: string) => pathname !== "/";

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
					<Suspense fallback={<RawChildren>{children}</RawChildren>}>
						<Chrome>{children}</Chrome>
					</Suspense>
				</AppRouterCacheProvider>
			</ThemeProvider>
		</body>
	</html>
);

const RawChildren = ({ children }: PropsWithChildren): ReactNode => (
	<main>{children}</main>
);

const Chrome = ({ children }: PropsWithChildren) => {
	const pathname = usePathname() ?? "/";
	const searchParams = useSearchParams();
	const embedded = searchParams?.get("embed") === "1";
	const wrap = !embedded && isScreenRoute(pathname);

	if (embedded) {
		return <main>{children}</main>;
	}

	return (
		<div className="app-shell">
			<main className="app-main">
				{wrap ? (
					<div className="mobile-stage">
						<div className="mobile-frame">{children}</div>
					</div>
				) : (
					children
				)}
			</main>
		</div>
	);
};

export default RootLayout;
