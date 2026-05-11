import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";
import { getComponentById } from "@pxds/pxds-components/registry";
import {
	componentFigmaSpecRegistry,
	createComponentFigmaBuildCode,
	createPageFigmaBuildCode,
	createPageFigmaExportSpec,
	createPxdsFigmaTokenTree,
	getComponentFigmaSpec,
} from "@pxds/pxds-figma";
import tokenRegistry from "@pxds/pxds-tokens/registry/wds-token-registry.json";
import { screenRoutes } from "@screen/mobile/screens";

import type {
	FigmaMcpExportRequest,
	FigmaMcpExportRequestInput,
} from "@/utils/figma-mcp-request";
import { getRenderableScreenSpecById } from "@/utils/screen-specs";

const REQUEST_DIR = join(
	process.cwd(),
	"..",
	"..",
	"artifacts",
	"figma-mcp-requests",
);
const figmaTokenTree = createPxdsFigmaTokenTree(tokenRegistry);
const pageExportRegisteredComponentIds = componentFigmaSpecRegistry.map(
	(entry) => entry.componentId,
);

export async function POST(request: Request) {
	const input = (await request.json()) as Partial<FigmaMcpExportRequestInput>;
	const validationError = getValidationError(input);

	if (validationError) {
		return NextResponse.json({ error: validationError }, { status: 400 });
	}

	const validatedInput = input as FigmaMcpExportRequestInput;
	const requestPayload = createRequestPayload(validatedInput);
	const artifactDir = join(REQUEST_DIR, requestPayload.requestId);
	const figmaPluginCode = createFigmaPluginCode(validatedInput);
	const figmaPluginCodePath = figmaPluginCode
		? join(artifactDir, "figma-plugin.js")
		: null;
	const codexPrompt = createCodexPrompt({
		figmaPluginCodePath,
		input: validatedInput,
		requestPath: join(artifactDir, "request.json"),
	});
	const codexPromptPath = join(artifactDir, "codex-prompt.md");
	const workflow = {
		artifactDir,
		codexPromptPath,
		figmaPluginCodePath,
		hasExecutableFigmaCode: Boolean(figmaPluginCode),
		nextAction: figmaPluginCode
			? "Run the generated figma-plugin.js with Figma MCP use_figma, or paste it into the PXDS Figma Bridge plugin."
			: "Open the preview URL and capture or implement it with Figma MCP.",
	};
	const requestWithWorkflow: FigmaMcpExportRequest = {
		...requestPayload,
		workflow,
	};

	await mkdir(artifactDir, { recursive: true });
	await writeFile(
		join(artifactDir, "request.json"),
		JSON.stringify(requestWithWorkflow, null, 2),
		"utf8",
	);
	await writeFile(codexPromptPath, codexPrompt, "utf8");
	if (figmaPluginCode && figmaPluginCodePath) {
		await writeFile(figmaPluginCodePath, figmaPluginCode, "utf8");
	}
	await writeFile(
		join(REQUEST_DIR, `${requestPayload.requestId}.json`),
		JSON.stringify(requestWithWorkflow, null, 2),
		"utf8",
	);
	await writeFile(
		join(REQUEST_DIR, "latest.json"),
		JSON.stringify(requestWithWorkflow, null, 2),
		"utf8",
	);

	return NextResponse.json({
		codexPrompt,
		request: requestWithWorkflow,
		path: join(REQUEST_DIR, `${requestPayload.requestId}.json`),
	});
}

function getValidationError(input: Partial<FigmaMcpExportRequestInput>) {
	if (input.kind !== "component" && input.kind !== "page") {
		return "kind must be component or page.";
	}
	if (!input.id) return "id is required.";
	if (!input.name) return "name is required.";
	if (!input.sourcePath) return "sourcePath is required.";
	if (!input.previewUrl) return "previewUrl is required.";

	if (input.kind === "component" && !getComponentById(input.id)) {
		return `Unknown component id: ${input.id}`;
	}
	if (
		input.kind === "page" &&
		!screenRoutes.some((route) => route.id === input.id)
	) {
		return `Unknown page id: ${input.id}`;
	}

	return null;
}

function createRequestPayload(input: FigmaMcpExportRequestInput) {
	const createdAt = new Date().toISOString();
	const safeId = input.id.replace(/[^a-z0-9-]+/gi, "-").toLowerCase();
	const requestId = `${createdAt.replace(/[:.]/g, "-")}-${input.kind}-${safeId}`;

	return {
		...input,
		createdAt,
		requestId,
		status: "requested" as const,
		instructions:
			input.kind === "component"
				? "Use Figma MCP to implement the selected PXDS component from the preview URL."
				: "Use Figma MCP to implement the selected PXDS mobile page from the preview URL.",
	};
}

function createFigmaPluginCode(input: FigmaMcpExportRequestInput) {
	if (input.kind === "component") {
		const figmaSpec = getComponentFigmaSpec(input.id);
		if (!figmaSpec) return null;

		return createComponentFigmaBuildCode(figmaSpec, {
			dsTokens: figmaTokenTree,
			sourceLabel: `PXDS preview MCP request: ${input.id}`,
		});
	}

	const renderablePageSpec = getRenderableScreenSpecById(input.id);
	if (!renderablePageSpec) return null;

	const pageFigmaSpec = createPageFigmaExportSpec(renderablePageSpec, {
		registeredComponentIds: pageExportRegisteredComponentIds,
	});

	return createPageFigmaBuildCode(pageFigmaSpec, {
		dsTokens: figmaTokenTree,
		componentSpecs: componentFigmaSpecRegistry,
		sourceLabel: `PXDS preview MCP request page: ${input.id}`,
	});
}

function createCodexPrompt({
	figmaPluginCodePath,
	input,
	requestPath,
}: {
	figmaPluginCodePath: string | null;
	input: FigmaMcpExportRequestInput;
	requestPath: string;
}) {
	const targetLabel =
		input.kind === "component" ? "PXDS component" : "PXDS mobile page";
	const codeInstruction = figmaPluginCodePath
		? `Read ${figmaPluginCodePath} and run that JavaScript in the target Figma file with the Figma MCP use_figma tool.`
		: `Open ${input.previewUrl} and implement this ${targetLabel} in the target Figma file with Figma MCP.`;

	return [
		`Figma MCP 요청 실행: ${input.name}`,
		"",
		`- kind: ${input.kind}`,
		`- id: ${input.id}`,
		`- sourcePath: ${input.sourcePath}`,
		`- previewUrl: ${input.previewUrl}`,
		`- request: ${requestPath}`,
		figmaPluginCodePath ? `- figmaPluginCode: ${figmaPluginCodePath}` : null,
		"",
		codeInstruction,
		"Figma 파일 URL 또는 fileKey가 없으면 사용자에게 먼저 물어봐.",
	]
		.filter(Boolean)
		.join("\n");
}
