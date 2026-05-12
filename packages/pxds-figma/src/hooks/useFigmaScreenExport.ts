"use client";

import { useState } from "react";

import {
	createScreenFigmaBuildCode,
	type ScreenFigmaBuildCodeOptions,
	type ScreenFigmaExportSpec,
} from "../screen-export";

type FigmaScreenExportStatus = "idle" | "copying" | "copied" | "error";

type UseFigmaScreenExportOptions = ScreenFigmaBuildCodeOptions & {
	spec?: ScreenFigmaExportSpec | null;
};

export function useFigmaScreenExport(options: UseFigmaScreenExportOptions = {}) {
	const { spec, ...buildOptions } = options;
	const [status, setStatus] = useState<FigmaScreenExportStatus>("idle");
	const [error, setError] = useState<string | null>(null);
	const [exportCode, setExportCode] = useState("");

	const reset = () => {
		setStatus("idle");
		setError(null);
	};

	const exportScreenToFigma = async (
		nextSpec: ScreenFigmaExportSpec | null | undefined = spec,
	) => {
		if (!nextSpec) {
			setStatus("error");
			setError("Figma screen export spec이 없습니다.");
			return null;
		}

		setStatus("copying");
		setError(null);

		try {
			const code = createScreenFigmaBuildCode(nextSpec, buildOptions);
			await navigator.clipboard.writeText(code);
			setExportCode(code);
			setStatus("copied");
			return code;
		} catch (clipboardError) {
			const message =
				clipboardError instanceof Error
					? clipboardError.message
					: "Figma screen export code 복사에 실패했습니다.";
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
		exportScreenToFigma,
		reset,
	};
}
