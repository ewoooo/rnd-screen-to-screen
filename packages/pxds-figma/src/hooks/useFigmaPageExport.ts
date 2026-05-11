"use client";

import { useState } from "react";

import {
	createPageFigmaBuildCode,
	type PageFigmaBuildCodeOptions,
	type PageFigmaExportSpec,
} from "../page-export";

type FigmaPageExportStatus = "idle" | "creating" | "created" | "error";

type UseFigmaPageExportOptions = PageFigmaBuildCodeOptions & {
	fileName?: string;
	spec?: PageFigmaExportSpec | null;
};

export function useFigmaPageExport(options: UseFigmaPageExportOptions = {}) {
	const {
		fileName = "pxds-page-export.js",
		spec,
		...buildOptions
	} = options;
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

		setStatus("creating");
		setError(null);

		try {
			const code = createPageFigmaBuildCode(nextSpec, buildOptions);
			downloadTextFile(fileName, code, "text/javascript;charset=utf-8");
			setExportCode(code);
			setStatus("created");
			return code;
		} catch (fileExportError) {
			const message =
				fileExportError instanceof Error
					? fileExportError.message
					: "Figma page export 파일 생성에 실패했습니다.";
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
		isCreating: status === "creating",
		isCreated: status === "created",
		exportPageToFigma,
		reset,
	};
}

function downloadTextFile(fileName: string, content: string, type: string) {
	const blob = new Blob([content], { type });
	const url = URL.createObjectURL(blob);
	const anchor = document.createElement("a");

	anchor.href = url;
	anchor.download = fileName;
	anchor.style.display = "none";
	document.body.append(anchor);
	anchor.click();
	anchor.remove();
	URL.revokeObjectURL(url);
}

