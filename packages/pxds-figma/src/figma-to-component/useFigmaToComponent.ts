"use client";

import { useCallback, useState } from "react";

import { parseFigmaSource, type FigmaToComponentSource } from "./source";

type FigmaToComponentStatus = "idle" | "reading" | "ready" | "error";

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
