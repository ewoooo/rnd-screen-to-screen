"use client";

import { DatabaseIcon, LayoutTemplateIcon, UploadIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import {
	createPxdsFigmaTokenTree,
	createPageFigmaExportSpec,
	componentFigmaSpecRegistry,
	getComponentFigmaSpec,
	useFigmaPageExport,
	useFigmaPluginExport,
	useTokensStudioExport,
} from "@pxds/pxds-figma";
import tokenRegistry from "@pxds/pxds-tokens/registry/wds-token-registry.json";
import { createPxdsTokensStudioJson } from "@pxds/pxds-tokens/tokens-studio";

import { usePageRegistry } from "@/contexts/page-registry-context";
import {
	activeRenderScreenSpecs,
	activeRenderableScreenSpecs,
	activeSduiScreenSpecs,
	type RenderScreenSpec,
	type RenderableScreenSpecV1,
	type SduiScreen,
} from "@screen/mobile/screens";
import { ActionRail } from "./ActionRail";
import { ActionRailButton } from "./ActionRailButton";

const figmaTokenTree = createPxdsFigmaTokenTree(tokenRegistry);
const tokensStudioJson = createPxdsTokensStudioJson(tokenRegistry);
const pageExportRegisteredComponentIds = componentFigmaSpecRegistry.map(
	(entry) => entry.componentId,
);
type PreviewPageExportSpec = RenderScreenSpec | RenderableScreenSpecV1 | SduiScreen;
const pageExportSpecsById: Record<string, PreviewPageExportSpec> = {
	...(activeRenderableScreenSpecs as Record<string, RenderableScreenSpecV1>),
	...(activeSduiScreenSpecs as Record<string, SduiScreen>),
	...(activeRenderScreenSpecs as Record<string, RenderScreenSpec>),
};

export function PreviewActionRail() {
	const pathname = usePathname();
	const { selectedRoute } = usePageRegistry();
	const componentId = getComponentIdFromPath(pathname);
	const pageId = getPageIdFromPath(pathname, selectedRoute.id);
	const figmaSpec = getComponentFigmaSpec(componentId);
	const renderablePageSpec = pageId ? (pageExportSpecsById[pageId] ?? null) : null;
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
		? "현재 페이지 Figma 코드 복사"
		: "현재 페이지의 renderable spec이 없습니다";
	const tokensStudioLabel = "Tokens Studio JSON 파일 생성";
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
		isCopying: isPageExportCopying,
		isCopied: isPageExportCopied,
		status: pageExportStatus,
		error: pageExportError,
	} = useFigmaPageExport({
		spec: pageFigmaSpec,
		dsTokens: figmaTokenTree,
		componentSpecs: componentFigmaSpecRegistry,
		sourceLabel: pageId ? `PXDS preview page: ${pageId}` : "PXDS preview page",
	});

	return (
		<ActionRail label="Preview actions">
			<ActionRailButton
				defaultIcon={DatabaseIcon}
				disabled={isTokensStudioCopying}
				error={tokensStudioError}
				label={tokensStudioLabel}
				onClick={() => void exportTokensStudioJson()}
				status={isTokensStudioCopied ? "copied" : tokensStudioStatus}
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
				disabled={!canExportPage || !pageFigmaSpec || isPageExportCopying}
				error={pageExportError}
				label={pageExportLabel}
				onClick={() => void exportPageToFigma()}
				status={isPageExportCopied ? "copied" : pageExportStatus}
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
