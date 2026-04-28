"use client";

import { ThemeProvider } from "@wanteddev/wds";
import { AppRouterCacheProvider } from "@wanteddev/wds-nextjs";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, type PropsWithChildren, type ReactNode } from "react";

import { GlobalVersionNav } from "@/components/GlobalVersionNav";

import "@wanteddev/wds/global.css";
import "./wds-tokens.css";
import "./globals.css";

// 스크린 라우트(/discover/v*-* 등)만 mobile-frame으로 감싼다.
// /, /pilot-kit/* 등 카탈로그/인덱스는 풀스크린.
const isScreenRoute = (pathname: string) => {
	if (
		pathname === "/" ||
		pathname.startsWith("/pilot-kit") ||
		pathname.startsWith("/home-kit") ||
		pathname.startsWith("/search-kit")
	)
		return false;
	return true;
};

// 다중 화면을 가로 스크롤로 비교하는 리뷰 페이지는 mobile-frame · GlobalVersionNav 둘 다 우회.
const isFullscreenReviewRoute = (pathname: string) =>
	pathname === "/payment-all" ||
	pathname.startsWith("/payment-all/") ||
	pathname === "/membership-all" ||
	pathname.startsWith("/membership-all/");

const RootLayout = ({ children }: PropsWithChildren) => (
	<html lang="ko" suppressHydrationWarning>
		<head>
			<title>Screen-to-Screen Wireframe</title>
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

const RawChildren = ({ children }: PropsWithChildren): ReactNode => <main>{children}</main>;

const Chrome = ({ children }: PropsWithChildren) => {
	const pathname = usePathname() ?? "/";
	const searchParams = useSearchParams();
	const embedded = searchParams?.get("embed") === "1";
	const fullscreen = embedded || isFullscreenReviewRoute(pathname);
	const wrap = !fullscreen && isScreenRoute(pathname);

	if (fullscreen) {
		return <main>{children}</main>;
	}

	return (
		<div className="app-shell">
			<GlobalVersionNav />
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
