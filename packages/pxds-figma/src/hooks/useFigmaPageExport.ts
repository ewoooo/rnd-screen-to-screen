"use client";

import { useState } from "react";

import {
	createPageFigmaBuildCode,
	type PageFigmaBuildCodeOptions,
	type PageFigmaExportSpec,
} from "../page-export";

type FigmaPageExportStatus = "idle" | "copying" | "copied" | "error";

type UseFigmaPageExportOptions = PageFigmaBuildCodeOptions & {
	spec?: PageFigmaExportSpec | null;
};

export function useFigmaPageExport(options: UseFigmaPageExportOptions = {}) {
	const { spec, ...buildOptions } = options;
	const [status, setStatus] = useState<FigmaPageExportStatus>("idle");
	const [error, setError] = useState<string | null>(null);
	const [exportCode, setExportCode] = useState("");

	const reset = () => {
		setStatus("idle");
		setError(null);
	};

	const exportPageToFigma = async (
		nextSpec: PageFigmaExportSpec | null | undefined = spec,
	) => {
		if (!nextSpec) {
			setStatus("error");
			setError("Figma page export spec이 없습니다.");
			return null;
		}

		setStatus("copying");
		setError(null);

		try {
			const code = createPageFigmaBuildCode(nextSpec, buildOptions);
			await navigator.clipboard.writeText(code);
			setExportCode(code);
			setStatus("copied");
			return code;
		} catch (clipboardError) {
			const message =
				clipboardError instanceof Error
					? clipboardError.message
					: "Figma page export code 복사에 실패했습니다.";
			setStatus("error");
			setError(message);
			return null;
		}
	};

	return {
		status,
		error,
		exportCode,
		canExport: Boolean(spec),
		isCopying: status === "copying",
		isCopied: status === "copied",
		exportPageToFigma,
		reset,
	};
}
