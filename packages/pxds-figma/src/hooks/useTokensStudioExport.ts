"use client";

import { useState } from "react";

type TokensStudioExportStatus = "idle" | "creating" | "created" | "error";

type UseTokensStudioExportOptions = {
	fileName?: string;
	tokenJson?: string;
	sourceLabel?: string;
};

export function useTokensStudioExport(
	options: UseTokensStudioExportOptions = {},
) {
	const { fileName = "pxds.tokens.json", tokenJson } = options;
	const [status, setStatus] = useState<TokensStudioExportStatus>("idle");
	const [error, setError] = useState<string | null>(null);
	const [exportJson, setExportJson] = useState("");
	const [exportFileName, setExportFileName] = useState("");

	const reset = () => {
		setStatus("idle");
		setError(null);
	};

	const exportTokensStudioJson = async (nextTokenJson = tokenJson) => {
		if (!nextTokenJson) {
			setStatus("error");
			setError("Tokens Studio로 내보낼 PXDS token JSON이 없습니다.");
			return null;
		}

		setStatus("creating");
		setError(null);

		try {
			downloadJsonFile(fileName, nextTokenJson);
			setExportJson(nextTokenJson);
			setExportFileName(fileName);
			setStatus("created");
			return nextTokenJson;
		} catch (fileExportError) {
			const message =
				fileExportError instanceof Error
					? fileExportError.message
					: "Tokens Studio JSON 파일 생성에 실패했습니다.";
			setStatus("error");
			setError(message);
			return null;
		}
	};

	return {
		status,
		error,
		exportJson,
		exportFileName,
		canExport: Boolean(tokenJson),
		isCopying: status === "creating",
		isCopied: status === "created",
		exportTokensStudioJson,
		reset,
	};
}

function downloadJsonFile(fileName: string, json: string) {
	const blob = new Blob([json], { type: "application/json;charset=utf-8" });
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
