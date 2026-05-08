"use client";

import { useState } from "react";

import {
	createComponentFigmaBuildCode,
	type ComponentFigmaBuildCodeOptions,
	type ComponentFigmaExportSpecInput,
} from "../component-export";

type FigmaPluginExportStatus = "idle" | "copying" | "copied" | "error";

type UseFigmaPluginExportOptions = ComponentFigmaBuildCodeOptions & {
	spec?: ComponentFigmaExportSpecInput | null;
};

export function useFigmaPluginExport(options: UseFigmaPluginExportOptions = {}) {
	const { spec, ...buildOptions } = options;
	const [status, setStatus] = useState<FigmaPluginExportStatus>("idle");
	const [error, setError] = useState<string | null>(null);
	const [exportCode, setExportCode] = useState("");

	const reset = () => {
		setStatus("idle");
		setError(null);
	};

	const exportToFigma = async (
		nextSpec: ComponentFigmaExportSpecInput | null | undefined = spec,
	) => {
		if (!nextSpec) {
			setStatus("error");
			setError("Figma export spec이 없습니다.");
			return null;
		}

		setStatus("copying");
		setError(null);

		try {
			const code = createComponentFigmaBuildCode(nextSpec, buildOptions);
			await navigator.clipboard.writeText(code);
			setExportCode(code);
			setStatus("copied");
			return code;
		} catch (clipboardError) {
			const message =
				clipboardError instanceof Error
					? clipboardError.message
					: "Figma export code 복사에 실패했습니다.";
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
		exportToFigma,
		reset,
	};
}
