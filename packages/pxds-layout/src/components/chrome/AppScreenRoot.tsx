"use client";

import type { PropsWithChildren } from "react";

/**
 * 모바일 화면 내부 root. 디바이스 프레임/브라우저 캔버스는 preview 앱이 맡고,
 * 여기서는 화면 root DOM 경계만 제공한다.
 */
export function AppScreenRoot({ children }: PropsWithChildren) {
	return (
		<div
			className="mobile-frame"
			data-figma-render="layout"
			data-figma-component-id="mobile-frame"
			data-figma-layout-kind="chrome"
			data-figma-layout-layer="screen"
			data-figma-layout-auto="false"
			data-figma-layout-sizing="fixed"
		>
			{children}
		</div>
	);
}
