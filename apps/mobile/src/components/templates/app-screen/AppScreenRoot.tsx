"use client";

import { useState, type PropsWithChildren } from "react";

import { Box } from "@/components/atoms/layout";

import { AppScreenContext } from "./AppScreenContext";

/**
 * 모바일 화면 내부 root. 디바이스 프레임/브라우저 캔버스는 preview 앱이 맡고,
 * 여기서는 frame-scoped portal context만 제공한다.
 */
export function AppScreenRoot({ children }: PropsWithChildren) {
	const [frame, setFrame] = useState<HTMLDivElement | null>(null);

	return (
		<Box
			className="mobile-frame"
			ref={(node) => setFrame(node as HTMLDivElement | null)}
		>
			<AppScreenContext.Provider value={{ frame }}>
				{children}
			</AppScreenContext.Provider>
		</Box>
	);
}
