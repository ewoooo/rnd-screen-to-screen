"use client";

import type { CSSProperties, IframeHTMLAttributes } from "react";

type UseIsolatedPreviewIframeOptions = Omit<
	IframeHTMLAttributes<HTMLIFrameElement>,
	"className" | "style" | "width" | "height" | "src" | "title"
> & {
	src: string;
	title: string;
	iframeStyle?: CSSProperties;
};

export function useIsolatedPreviewIframe({
	src,
	title,
	iframeStyle,
	sandbox = "allow-scripts allow-forms allow-popups",
	loading = "lazy",
	referrerPolicy = "no-referrer",
	...iframeProps
}: UseIsolatedPreviewIframeOptions) {
	const iframeKey = [src, sandbox, referrerPolicy].join("|");
	const isolatedIframeProps = {
		title,
		src,
		sandbox,
		loading,
		referrerPolicy,
		style: iframeStyle,
		...iframeProps,
	} satisfies IframeHTMLAttributes<HTMLIFrameElement>;

	return {
		src,
		iframeKey,
		iframeProps: isolatedIframeProps,
	};
}
