"use client";

import { useState } from "react";

import type {
	FigmaMcpExportRequest,
	FigmaMcpExportRequestInput,
	FigmaMcpExportResponse,
} from "@/utils/figma-mcp-request";

type FigmaMcpRequestStatus = "idle" | "creating" | "created" | "error";

export function useFigmaMcpRequest() {
	const [status, setStatus] = useState<FigmaMcpRequestStatus>("idle");
	const [error, setError] = useState<string | null>(null);
	const [request, setRequest] = useState<FigmaMcpExportRequest | null>(null);
	const [codexPrompt, setCodexPrompt] = useState("");

	const createFigmaMcpRequest = async (input: FigmaMcpExportRequestInput) => {
		setStatus("creating");
		setError(null);

		try {
			const response = await fetch("/api/figma-mcp-requests", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(input),
			});
			const result = (await response.json()) as
				| (Partial<FigmaMcpExportResponse> & { error?: string })
				| { error?: string };

			if (!response.ok || !("request" in result) || !result.request) {
				throw new Error(
					"error" in result && result.error
						? result.error
						: "Figma MCP 요청 생성에 실패했습니다.",
				);
			}

			setRequest(result.request);
			setCodexPrompt(result.codexPrompt ?? "");
			if (result.codexPrompt) {
				void copyCodexPrompt(result.codexPrompt);
			}
			setStatus("created");
			return result.request;
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Figma MCP 요청 생성에 실패했습니다.",
			);
			setStatus("error");
			return null;
		}
	};

	return {
		createFigmaMcpRequest,
		codexPrompt,
		error,
		isCreated: status === "created",
		isCreating: status === "creating",
		request,
		status,
	};
}

async function copyCodexPrompt(prompt: string) {
	if (!navigator.clipboard?.writeText) return;
	try {
		await navigator.clipboard.writeText(prompt);
	} catch {
		// Clipboard permission can fail after an async request; the artifact still exists.
	}
}
