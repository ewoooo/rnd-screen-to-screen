"use client";

import { useCallback, useState } from "react";

type FigmaToComponentStatus = "idle" | "reading" | "ready" | "error";

export type FigmaToComponentSource = {
	fileKey: string;
	nodeId?: string;
	url: string;
};

const FIGMA_DESIGN_URL_PATTERN =
	/https:\/\/(?:www\.)?figma\.com\/(?:design|file)\/([^/?#]+)[^\s]*/;
const FIGMA_NODE_ID_PATTERN = /[?&]node-id=([^&]+)/;

function parseFigmaSource(input: string): FigmaToComponentSource | null {
	const figmaUrl = input.match(FIGMA_DESIGN_URL_PATTERN)?.[0];
	if (!figmaUrl) return null;

	const fileKey = figmaUrl.match(FIGMA_DESIGN_URL_PATTERN)?.[1];
	if (!fileKey) return null;

	const nodeId = figmaUrl.match(FIGMA_NODE_ID_PATTERN)?.[1]?.replace("-", ":");

	return {
		fileKey,
		nodeId,
		url: figmaUrl,
	};
}

export function useFigmaToComponent() {
	const [status, setStatus] = useState<FigmaToComponentStatus>("idle");
	const [source, setSource] = useState<FigmaToComponentSource | null>(null);
	const [error, setError] = useState<string | null>(null);

	const readSource = useCallback((input: string) => {
		const nextSource = parseFigmaSource(input);

		if (!nextSource) {
			setStatus("error");
			setError("Figma design URL을 찾지 못했습니다.");
			setSource(null);
			return null;
		}

		setStatus("ready");
		setError(null);
		setSource(nextSource);
		return nextSource;
	}, []);

	const readFromClipboard = useCallback(async () => {
		setStatus("reading");
		setError(null);

		try {
			const text = await navigator.clipboard.readText();
			return readSource(text);
		} catch (clipboardError) {
			setStatus("error");
			setError("Clipboard read 권한이 거부되었습니다.");
			setSource(null);
			console.error("[figma-to-component] clipboard read failed", clipboardError);
			return null;
		}
	}, [readSource]);

	return {
		status,
		source,
		error,
		readSource,
		readFromClipboard,
		isReady: status === "ready",
	};
}
