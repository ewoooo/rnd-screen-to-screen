"use client";

import { useState } from "react";
import { DatabaseIcon, LayoutTemplateIcon, UploadIcon } from "lucide-react";
import { NovaMbrPg002Screen, novaMbrPg002Config, novaMbrPg002Registry, novaMbrPg002LayoutRegistry } from "@screen/mobile/screen-components";
import { traverseScreen, generateFigmaPluginCode } from "../../../../figma-sync/export";
import {
	createPxdsFigmaTokenTree,
	getComponentFigmaSpec,
	useFigmaPluginExport,
	useTokensStudioExport,
} from "@pxds/pxds-figma";
import metadata from "@pxds/cx-tokens/originals/$metadata.json";
import themes from "@pxds/cx-tokens/originals/$themes.json";
import componentDarkTokens from "@pxds/cx-tokens/originals/_skt/component/dark.json";
import componentLightTokens from "@pxds/cx-tokens/originals/_skt/component/light.json";
import primitiveTokens from "@pxds/cx-tokens/originals/_skt/primitive/default.json";
import semanticDarkTokens from "@pxds/cx-tokens/originals/_skt/semantic/dark.json";
import semanticLightTokens from "@pxds/cx-tokens/originals/_skt/semantic/light.json";
import { createPxdsTokensStudioJson } from "@pxds/cx-tokens/tokens-studio";

import { ActionRail } from "./ActionRail";
import { ActionRailButton } from "./ActionRailButton";
import { useComponentRegistry } from "@/contexts/component-registry-context";

const tokenRegistry = {
	"_skt/primitive/default": primitiveTokens,
	"_skt/semantic/light": semanticLightTokens,
	"_skt/semantic/dark": semanticDarkTokens,
	"_skt/component/light": componentLightTokens,
	"_skt/component/dark": componentDarkTokens,
	$themes: themes,
	$metadata: metadata,
};

const figmaTokenTree = createPxdsFigmaTokenTree(tokenRegistry);
const tokensStudioJson = createPxdsTokensStudioJson(tokenRegistry);

export function PreviewActionRail() {
	const { selectedComponent } = useComponentRegistry();
	const componentId = selectedComponent?.id ?? null;
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
	const [screenExportStatus, setScreenExportStatus] = useState<"idle" | "copying" | "copied" | "error">("idle");
	const [screenExportError, setScreenExportError] = useState<string | null>(null);

	const exportScreenToFigma = async () => {
		setScreenExportStatus("copying");
		setScreenExportError(null);
		try {
			const spec = traverseScreen(NovaMbrPg002Screen, novaMbrPg002Registry, novaMbrPg002LayoutRegistry, {
				id: novaMbrPg002Config.id,
				name: novaMbrPg002Config.name,
				width: novaMbrPg002Config.figma?.width,
				height: novaMbrPg002Config.figma?.height,
			});
			const code = generateFigmaPluginCode(spec);
			await navigator.clipboard.writeText(code);
			setScreenExportStatus("copied");
		} catch (e) {
			setScreenExportError(e instanceof Error ? e.message : "Export 실패");
			setScreenExportStatus("error");
		}
	};

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
				disabled={screenExportStatus === "copying"}
				error={screenExportError}
				label="NOVA-MBR-PG-002-0 Figma 코드 복사"
				onClick={() => void exportScreenToFigma()}
				status={screenExportStatus}
			/>
		</ActionRail>
	);
}

