"use client";

import {
	CodeIcon,
	DatabaseIcon,
	LayoutTemplateIcon,
	MousePointerClickIcon,
	UploadIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { getComponentById } from "@pxds/pxds-components/registry";
import {
	createPxdsFigmaTokenTree,
	createPageFigmaExportSpec,
	componentFigmaSpecRegistry,
	getComponentFigmaSpec,
	useFigmaPageExport,
	useFigmaPluginExport,
	useFigmaVariablesExport,
	useTokensStudioExport,
} from "@pxds/pxds-figma";
import tokenRegistry from "@pxds/pxds-tokens/registry/wds-token-registry.json";
import { createPxdsTokensStudioJson } from "@pxds/pxds-tokens/tokens-studio";

import { usePageRegistry } from "@/contexts/page-registry-context";
import { useFigmaMcpRequest } from "@/hooks/use-figma-mcp-request";
import type { FigmaMcpExportRequest } from "@/utils/figma-mcp-request";
import { getRenderableScreenSpecById } from "@/utils/screen-specs";
import { ActionRail } from "./ActionRail";
import { ActionRailButton } from "./ActionRailButton";

const figmaTokenTree = createPxdsFigmaTokenTree(tokenRegistry);
const tokensStudioJson = createPxdsTokensStudioJson(tokenRegistry);
const pageExportRegisteredComponentIds = componentFigmaSpecRegistry.map(
	(entry) => entry.componentId,
);

export function PreviewActionRail() {
	const pathname = usePathname();
	const { selectedRoute } = usePageRegistry();
	const componentId = getComponentIdFromPath(pathname);
	const pageId = getPageIdFromPath(pathname, selectedRoute.id);
	const component = componentId ? getComponentById(componentId) : null;
	const figmaSpec = getComponentFigmaSpec(componentId);
	const renderablePageSpec = pageId ? getRenderableScreenSpecById(pageId) : null;
	const pageFigmaSpec = renderablePageSpec
		? createPageFigmaExportSpec(renderablePageSpec, {
				registeredComponentIds: pageExportRegisteredComponentIds,
			})
		: null;
	const componentExportLabel = figmaSpec
		? "Figma 플러그인 코드 복사"
		: "이 컴포넌트의 Figma 스펙이 아직 없습니다";
	const canExportPage = pathname === "/pages";
	const pageExportLabel = pageFigmaSpec
		? "현재 페이지 Figma 파일 생성"
		: "현재 페이지의 renderable spec이 없습니다";
	const tokensStudioLabel = "Tokens Studio JSON 파일 생성";
	const figmaVariablesLabel = "Figma Variables sync 파일 생성";
	const figmaMcpTarget = getFigmaMcpTarget({
		component,
		pathname,
		selectedRoute,
	});
	const {
		exportTokensStudioJson,
		isCopying: isTokensStudioCopying,
		isCopied: isTokensStudioCopied,
		status: tokensStudioStatus,
		error: tokensStudioError,
	} = useTokensStudioExport({
		fileName: "pxds.tokens.json",
		tokenJson: tokensStudioJson,
		sourceLabel: "PXDS preview Tokens Studio JSON",
	});
	const {
		exportFigmaVariablesCode,
		isCreating: isFigmaVariablesCreating,
		isCreated: isFigmaVariablesCreated,
		status: figmaVariablesStatus,
		error: figmaVariablesError,
	} = useFigmaVariablesExport({
		fileName: "pxds-figma-variables-sync.js",
		tokenTree: figmaTokenTree,
		sourceLabel: "PXDS preview Figma Variables sync",
	});
	const {
		exportToFigma,
		isCopying: isComponentExportCopying,
		isCopied: isComponentExportCopied,
		status: componentExportStatus,
		error: componentExportError,
	} =
		useFigmaPluginExport({
			spec: figmaSpec,
			dsTokens: figmaTokenTree,
			sourceLabel: componentId
				? `PXDS preview: ${componentId}`
				: "PXDS preview",
		});
	const {
		exportPageToFigma,
		isCreating: isPageExportCreating,
		isCreated: isPageExportCreated,
		status: pageExportStatus,
		error: pageExportError,
	} = useFigmaPageExport({
		fileName: pageId ? `pxds-page-${pageId}.js` : "pxds-page-export.js",
		spec: pageFigmaSpec,
		dsTokens: figmaTokenTree,
		componentSpecs: componentFigmaSpecRegistry,
		sourceLabel: pageId ? `PXDS preview page: ${pageId}` : "PXDS preview page",
	});
	const {
		createFigmaMcpRequest,
		isCreating: isFigmaMcpRequestCreating,
		isCreated: isFigmaMcpRequestCreated,
		request: figmaMcpRequest,
		status: figmaMcpRequestStatus,
		error: figmaMcpRequestError,
	} = useFigmaMcpRequest();
	const figmaMcpLabel = getFigmaMcpLabel({
		error: figmaMcpRequestError,
		isCreated: isFigmaMcpRequestCreated,
		request: figmaMcpRequest,
		target: figmaMcpTarget,
	});

	return (
		<ActionRail label="Preview actions">
			<ActionRailButton
				defaultIcon={MousePointerClickIcon}
				disabled={!figmaMcpTarget || isFigmaMcpRequestCreating}
				error={figmaMcpRequestError}
				label={figmaMcpLabel}
				onClick={() => {
					if (!figmaMcpTarget) return;
					void createFigmaMcpRequest(figmaMcpTarget);
				}}
				status={
					isFigmaMcpRequestCreated ? "created" : figmaMcpRequestStatus
				}
			/>
			<ActionRailButton
				defaultIcon={DatabaseIcon}
				disabled={isTokensStudioCopying}
				error={tokensStudioError}
				label={tokensStudioLabel}
				onClick={() => void exportTokensStudioJson()}
				status={isTokensStudioCopied ? "copied" : tokensStudioStatus}
			/>
			<ActionRailButton
				defaultIcon={CodeIcon}
				disabled={isFigmaVariablesCreating}
				error={figmaVariablesError}
				label={figmaVariablesLabel}
				onClick={() => void exportFigmaVariablesCode()}
				status={isFigmaVariablesCreated ? "created" : figmaVariablesStatus}
			/>
			<ActionRailButton
				defaultIcon={UploadIcon}
				disabled={!figmaSpec || isComponentExportCopying}
				error={componentExportError}
				label={componentExportLabel}
				onClick={() => void exportToFigma()}
				status={isComponentExportCopied ? "copied" : componentExportStatus}
			/>
			<ActionRailButton
				defaultIcon={LayoutTemplateIcon}
				disabled={!canExportPage || !pageFigmaSpec || isPageExportCreating}
				error={pageExportError}
				label={pageExportLabel}
				onClick={() => void exportPageToFigma()}
				status={isPageExportCreated ? "created" : pageExportStatus}
			/>
		</ActionRail>
	);
}

function getComponentIdFromPath(pathname: string) {
	const match = pathname.match(/^\/components\/([^/]+)/);
	return match?.[1] ?? null;
}

function getPageIdFromPath(pathname: string, selectedPageId: string) {
	if (pathname !== "/pages") return null;
	return selectedPageId;
}

type FigmaMcpTargetInput = {
	component: ReturnType<typeof getComponentById> | null;
	pathname: string;
	selectedRoute: ReturnType<typeof usePageRegistry>["selectedRoute"];
};

function getFigmaMcpTarget({
	component,
	pathname,
	selectedRoute,
}: FigmaMcpTargetInput) {
	if (component && pathname.startsWith("/components/")) {
		return {
			kind: "component" as const,
			id: component.id,
			name: component.name,
			sourcePath: pathname,
			previewUrl:
				typeof window === "undefined"
					? `/component-render/${component.id}`
					: new URL(`/component-render/${component.id}`, window.location.origin)
							.href,
		};
	}

	if (pathname === "/pages") {
		const mobileOrigin =
			process.env.NEXT_PUBLIC_MOBILE_ORIGIN ?? "http://localhost:3001";

		return {
			kind: "page" as const,
			id: selectedRoute.id,
			name: selectedRoute.label,
			sourcePath: pathname,
			previewUrl: `${mobileOrigin}${selectedRoute.route}`,
		};
	}

	return null;
}

function getFigmaMcpLabel({
	error,
	isCreated,
	request,
	target,
}: {
	error: string | null;
	isCreated: boolean;
	request: FigmaMcpExportRequest | null;
	target: ReturnType<typeof getFigmaMcpTarget>;
}) {
	if (error) return error;
	if (!target) return "현재 화면은 Figma MCP 요청 대상이 아닙니다";
	if (!isCreated || !request) return "Figma MCP 워크플로우 생성";

	return request.workflow.hasExecutableFigmaCode
		? "Figma MCP 워크플로우 생성됨: figma-plugin.js + Codex 프롬프트"
		: "Figma MCP 요청 생성됨: Codex 프롬프트";
}
