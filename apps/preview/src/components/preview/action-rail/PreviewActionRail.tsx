"use client";

import { DatabaseIcon, LayoutTemplateIcon, UploadIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import {
	createPxdsFigmaTokenTree,
	createScreenFigmaExportSpec,
	componentFigmaSpecRegistry,
	getComponentFigmaSpec,
	useFigmaScreenExport,
	useFigmaPluginExport,
	useTokensStudioExport,
} from "@pxds/pxds-figma";
import tokenRegistry from "@pxds/pxds-tokens/registry/tokens.original.json";
import { createPxdsTokensStudioJson } from "@pxds/pxds-tokens/tokens-studio";

import { useScreenRegistry } from "@/contexts/screen-registry-context";
import {
	activeRenderScreenSpecs,
	activeRenderableScreenSpecs,
	activeSduiScreenSpecs,
	screenRenderRegistry,
	type RenderScreenSpec,
	type RenderableScreenSpecV1,
	type SduiScreen,
} from "@screen/mobile/screens";
import { ActionRail } from "./ActionRail";
import { ActionRailButton } from "./ActionRailButton";

const figmaTokenTree = createPxdsFigmaTokenTree(tokenRegistry);
const tokensStudioJson = createPxdsTokensStudioJson(tokenRegistry);
type ScreenExportComponentSpecEntry = (typeof componentFigmaSpecRegistry)[number];
type ScreenRenderRegistryEntry = {
	id: string;
	exportMode: ScreenExportComponentSpecEntry["exportMode"];
	render?: () => ScreenExportComponentSpecEntry["render"];
};
const screenFigmaSpecRegistry = (
	screenRenderRegistry as readonly ScreenRenderRegistryEntry[]
).map((entry) => ({
	componentId: entry.id,
	exportMode: entry.exportMode,
	render: entry.render?.(),
})) satisfies readonly ScreenExportComponentSpecEntry[];
const screenExportComponentSpecs = [
	...componentFigmaSpecRegistry,
	...screenFigmaSpecRegistry,
] satisfies readonly ScreenExportComponentSpecEntry[];
const screenExportRegisteredComponentIds = screenExportComponentSpecs.map(
	(entry) => entry.componentId,
);
type PreviewScreenExportSpec = RenderScreenSpec | RenderableScreenSpecV1 | SduiScreen;
const screenExportSpecsById: Record<string, PreviewScreenExportSpec> = {
	...(activeRenderableScreenSpecs as Record<string, RenderableScreenSpecV1>),
	...(activeSduiScreenSpecs as Record<string, SduiScreen>),
	...(activeRenderScreenSpecs as Record<string, RenderScreenSpec>),
};

export function PreviewActionRail() {
	const pathname = usePathname();
	const { selectedRoute } = useScreenRegistry();
	const componentId = getComponentIdFromPath(pathname);
	const screenId = getScreenIdFromPath(pathname, selectedRoute.id);
	const figmaSpec = getComponentFigmaSpec(componentId);
	const renderableScreenSpec = screenId ? (screenExportSpecsById[screenId] ?? null) : null;
	const screenFigmaSpec = renderableScreenSpec
		? createScreenFigmaExportSpec(renderableScreenSpec, {
				registeredComponentIds: screenExportRegisteredComponentIds,
			})
		: null;
	const componentExportLabel = figmaSpec
		? "Figma 플러그인 코드 복사"
		: "이 컴포넌트의 Figma 스펙이 아직 없습니다";
	const canExportScreen = pathname === "/screens";
	const screenExportLabel = screenFigmaSpec
		? "현재 스크린 Figma 코드 복사"
		: "현재 스크린의 renderable spec이 없습니다";
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
		exportScreenToFigma,
		isCopying: isScreenExportCopying,
		isCopied: isScreenExportCopied,
		status: screenExportStatus,
		error: screenExportError,
	} = useFigmaScreenExport({
		spec: screenFigmaSpec,
		dsTokens: figmaTokenTree,
		componentSpecs: screenExportComponentSpecs,
		sourceLabel: screenId ? `PXDS preview screen: ${screenId}` : "PXDS preview screen",
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
				disabled={!canExportScreen || !screenFigmaSpec || isScreenExportCopying}
				error={screenExportError}
				label={screenExportLabel}
				onClick={() => void exportScreenToFigma()}
				status={isScreenExportCopied ? "copied" : screenExportStatus}
			/>
		</ActionRail>
	);
}

function getComponentIdFromPath(pathname: string) {
	const match = pathname.match(/^\/components\/([^/]+)/);
	return match?.[1] ?? null;
}

function getScreenIdFromPath(pathname: string, selectedScreenId: string) {
	if (pathname !== "/screens") return null;
	return selectedScreenId;
}
