"use client";

import { useEffect, useRef, useState } from "react";

const FIGMA_CAPTURE_EXPORT_SCRIPT_ID = "figma-capture-export";
export const FIGMA_CAPTURE_EXPORT_SCRIPT_SRC =
	"https://mcp.figma.com/mcp/html-to-design/capture.js";

type FigmaCaptureExportStatus = "idle" | "loading" | "ready" | "error";
type FigmaCaptureExportCaptureStatus =
	| "idle"
	| "capturing"
	| "captured"
	| "error";

declare global {
	interface Window {
		figma?: {
			captureForDesign?: (options: { selector: string }) => Promise<unknown>;
		};
	}
}

export function useFigmaCaptureExport() {
	const [status, setStatus] = useState<FigmaCaptureExportStatus>("idle");
	const [captureStatus, setCaptureStatus] =
		useState<FigmaCaptureExportCaptureStatus>("idle");
	const didCaptureRef = useRef(false);

	useEffect(() => {
		const runCaptureFromHash = async () => {
			if (
				didCaptureRef.current ||
				!window.location.hash.includes("figmacapture")
			) {
				return;
			}

			const capture = window.figma?.captureForDesign;
			if (!capture) {
				return;
			}

			didCaptureRef.current = true;
			setCaptureStatus("capturing");

			const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
			const selector = params.get("figmaselector") ?? "body";
			const delay = Number(params.get("figmadelay") ?? 0);

			if (delay > 0) {
				await new Promise((resolve) => window.setTimeout(resolve, delay));
			}

			try {
				await capture({ selector });
				setCaptureStatus("captured");
				console.info("[figma-capture-export] capture completed", { selector });
			} catch (error) {
				didCaptureRef.current = false;
				setCaptureStatus("error");
				console.error("[figma-capture-export] capture failed", error);
			}
		};

		let script = document.getElementById(
			FIGMA_CAPTURE_EXPORT_SCRIPT_ID,
		) as HTMLScriptElement | null;

		if (script?.dataset.status === "ready") {
			setStatus("ready");
			void runCaptureFromHash();
			return;
		}

		if (script?.dataset.status === "error") {
			setStatus("error");
			return;
		}

		if (!script) {
			script = document.createElement("script");
			script.id = FIGMA_CAPTURE_EXPORT_SCRIPT_ID;
			script.src = FIGMA_CAPTURE_EXPORT_SCRIPT_SRC;
			script.async = true;
			script.dataset.status = "loading";
			document.head.appendChild(script);
		}

		setStatus("loading");

		const handleLoad = () => {
			if (script) script.dataset.status = "ready";
			setStatus("ready");
			void runCaptureFromHash();
		};

		const handleError = () => {
			if (script) script.dataset.status = "error";
			setStatus("error");
		};

		script.addEventListener("load", handleLoad);
		script.addEventListener("error", handleError);

		return () => {
			script?.removeEventListener("load", handleLoad);
			script?.removeEventListener("error", handleError);
		};
	}, []);

	return {
		status,
		captureStatus,
		isReady: status === "ready",
		scriptSrc: FIGMA_CAPTURE_EXPORT_SCRIPT_SRC,
	};
}
