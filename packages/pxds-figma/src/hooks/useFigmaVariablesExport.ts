"use client";

import { useState } from "react";

import {
	createPxdsFigmaVariablesSyncCode,
	type PxdsFigmaVariablesSyncCodeOptions,
} from "../figma-variables";

type FigmaVariablesExportStatus = "idle" | "creating" | "created" | "error";

type UseFigmaVariablesExportOptions = PxdsFigmaVariablesSyncCodeOptions & {
	fileName?: string;
	tokenTree?: unknown;
};

export function useFigmaVariablesExport(
	options: UseFigmaVariablesExportOptions = {},
) {
	const {
		fileName = "pxds-figma-variables-sync.js",
		tokenTree,
		...buildOptions
	} = options;
	const [status, setStatus] = useState<FigmaVariablesExportStatus>("idle");
	const [error, setError] = useState<string | null>(null);
	const [exportCode, setExportCode] = useState("");
	const [exportFileName, setExportFileName] = useState("");

	const reset = () => {
		setStatus("idle");
		setError(null);
	};

	const exportFigmaVariablesCode = async (
		nextTokenTree: unknown = tokenTree,
	) => {
		if (!nextTokenTree) {
			setStatus("error");
			setError("Figma Variables로 내보낼 PXDS token tree가 없습니다.");
			return null;
		}

		setStatus("creating");
		setError(null);

		try {
			const code = createPxdsFigmaVariablesSyncCode(
				nextTokenTree,
				buildOptions,
			);
			downloadTextFile(fileName, code, "text/javascript;charset=utf-8");
			setExportCode(code);
			setExportFileName(fileName);
			setStatus("created");
			return code;
		} catch (fileExportError) {
			const message =
				fileExportError instanceof Error
					? fileExportError.message
					: "Figma Variables sync 파일 생성에 실패했습니다.";
			setStatus("error");
			setError(message);
			return null;
		}
	};

	return {
		status,
		error,
		exportCode,
		exportFileName,
		canExport: Boolean(tokenTree),
		isCreating: status === "creating",
		isCreated: status === "created",
		exportFigmaVariablesCode,
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

