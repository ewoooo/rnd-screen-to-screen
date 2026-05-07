"use client";

import type { CSSProperties, IframeHTMLAttributes } from "react";

import { MobileViewFrame } from "./MobileViewFrame";
import { useIsolatedPreviewIframe } from "./useIsolatedPreviewIframe";
import { useMobilePreviewViewport } from "./useMobilePreviewViewport";

type MobilePreviewFrameProps = Omit<
	IframeHTMLAttributes<HTMLIFrameElement>,
	"className" | "style" | "width" | "height"
> & {
	src: string;
	title: string;
	frameClassName?: string;
	frameStyle?: CSSProperties;
	iframeClassName?: string;
	iframeStyle?: CSSProperties;
	width?: number | string;
	height?: number | string;
};

export function MobilePreviewFrame({
	src,
	title,
	frameClassName,
	frameStyle,
	iframeClassName,
	iframeStyle,
	width,
	height,
	...iframeProps
}: MobilePreviewFrameProps) {
	const viewport = useMobilePreviewViewport({
		width,
		height,
		style: frameStyle,
	});
	const isolated = useIsolatedPreviewIframe({
		src,
		title,
		iframeStyle,
		...iframeProps,
	});

	return (
		<MobileViewFrame className={frameClassName} style={viewport.frameStyle}>
			<iframe
				{...isolated.iframeProps}
				className={["mobile-preview-frame__iframe", iframeClassName]
					.filter(Boolean)
					.join(" ")}
			/>
		</MobileViewFrame>
	);
}
