"use client";

import { useState } from "react";

type ScreenTreeFigmaExportStatus = "idle" | "copying" | "copied" | "error";

type ScreenTreeFigmaExportInput = {
	id: string;
	name: string;
	route: string;
	iframeSrc: string;
};

type ScreenExportResponseMessage = {
	type: "pxds:screen-export:response";
	requestId?: string;
	tree?: unknown;
};

export function useScreenTreeFigmaExport() {
	const [status, setStatus] = useState<ScreenTreeFigmaExportStatus>("idle");
	const [error, setError] = useState<string | null>(null);
	const [exportCode, setExportCode] = useState("");

	const exportScreenTreeToFigma = async (input: ScreenTreeFigmaExportInput) => {
		setStatus("copying");
		setError(null);

		try {
			const tree = await requestScreenTree(input.iframeSrc);
			const response = await fetch("/api/figma-screen-tree-exports", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					id: input.id,
					name: input.name,
					route: input.route,
					tree,
				}),
			});
			const result = (await response.json()) as {
				code?: string;
				error?: string;
			};

			if (!response.ok || !result.code) {
				throw new Error(result.error ?? "Screen tree export에 실패했습니다.");
			}

			await navigator.clipboard.writeText(result.code);
			setExportCode(result.code);
			setStatus("copied");
			return result.code;
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "Screen tree export에 실패했습니다.",
			);
			setStatus("error");
			return null;
		}
	};

	return {
		error,
		exportCode,
		exportScreenTreeToFigma,
		isCopied: status === "copied",
		isCopying: status === "copying",
		status,
	};
}

function requestScreenTree(iframeSrc: string) {
	const iframe = findPreviewIframe(iframeSrc);
	if (!iframe?.contentWindow) {
		return Promise.reject(new Error("현재 페이지 preview iframe을 찾지 못했습니다."));
	}

	const requestId =
		typeof crypto !== "undefined" && "randomUUID" in crypto
			? crypto.randomUUID()
			: `${Date.now()}-${Math.random().toString(36).slice(2)}`;
	const targetOrigin = new URL(iframe.src).origin;

	return new Promise<unknown>((resolve, reject) => {
		const timeout = window.setTimeout(() => {
			window.removeEventListener("message", handleMessage);
			reject(new Error("ScreenExportBridge 응답 시간이 초과되었습니다."));
		}, 3000);

		const handleMessage = (event: MessageEvent<ScreenExportResponseMessage>) => {
			if (event.origin !== targetOrigin) return;
			if (event.data?.type !== "pxds:screen-export:response") return;
			if (event.data.requestId !== requestId) return;

			window.clearTimeout(timeout);
			window.removeEventListener("message", handleMessage);
			resolve(event.data.tree);
		};

		window.addEventListener("message", handleMessage);
		iframe.contentWindow?.postMessage(
			{
				type: "pxds:screen-export:request",
				requestId,
			},
			targetOrigin,
		);
	});
}

function findPreviewIframe(iframeSrc: string) {
	const target = new URL(iframeSrc);
	return Array.from(document.querySelectorAll("iframe")).find((iframe) => {
		try {
			const src = new URL(iframe.src);
			return src.origin === target.origin && src.pathname === target.pathname;
		} catch {
			return false;
		}
	});
}
