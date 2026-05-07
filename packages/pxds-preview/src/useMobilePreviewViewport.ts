"use client";

import { useMemo, type CSSProperties } from "react";

type MobilePreviewViewportSize = number | string;

type UseMobilePreviewViewportOptions = {
	width?: MobilePreviewViewportSize;
	height?: MobilePreviewViewportSize;
	style?: CSSProperties;
};

function toCssSize(value: MobilePreviewViewportSize | undefined) {
	if (typeof value === "number") return `${value}px`;
	return value;
}

export function useMobilePreviewViewport({
	width,
	height,
	style,
}: UseMobilePreviewViewportOptions = {}) {
	const frameStyle = useMemo(
		() =>
			({
				...(width
					? { "--pxds-device-mobile-view-width": toCssSize(width) }
					: null),
				...(height
					? { "--pxds-device-mobile-view-height": toCssSize(height) }
					: null),
				...style,
			}) as CSSProperties,
		[height, style, width],
	);

	return {
		frameStyle,
	};
}
