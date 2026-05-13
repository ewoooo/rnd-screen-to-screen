"use client";

import { DatabaseIcon, LayoutTemplateIcon, UploadIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import {
	createPxdsFigmaTokenTree,
	getComponentFigmaSpec,
	useFigmaPluginExport,
	useTokensStudioExport,
} from "@pxds/pxds-figma";
import tokenRegistry from "@pxds/pxds-tokens/registry/tokens.original.json";
import { createPxdsTokensStudioJson } from "@pxds/pxds-tokens/tokens-studio";

import { ActionRail } from "./ActionRail";
import { ActionRailButton } from "./ActionRailButton";

const figmaTokenTree = createPxdsFigmaTokenTree(tokenRegistry);
const tokensStudioJson = createPxdsTokensStudioJson(tokenRegistry);

export function PreviewActionRail() {
	const pathname = usePathname();
	const componentId = getComponentIdFromPath(pathname);
	const figmaSpec = getComponentFigmaSpec(componentId);
	const componentExportLabel = figmaSpec
		? "Figma 플러그인 코드 복사"
		: "이 컴포넌트의 Figma 스펙이 아직 없습니다";
	const screenExportLabel = "현재 스크린의 renderable spec이 없습니다";
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
	const screenExportStatus = "idle";
	const screenExportError = null;

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
				disabled={true}
				error={screenExportError}
				label={screenExportLabel}
				onClick={() => undefined}
				status={screenExportStatus}
			/>
		</ActionRail>
	);
}

function getComponentIdFromPath(pathname: string) {
	const match = pathname.match(/^\/components\/([^/]+)/);
	return match?.[1] ?? null;
}
