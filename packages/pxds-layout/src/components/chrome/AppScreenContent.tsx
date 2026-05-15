import type { CSSProperties, ReactNode } from "react";

import type {
	AppScreenActionBarPreset,
	AppScreenContentProps,
	AppScreenHeaderPreset,
} from "./AppScreen.types";
import {
	appScreenActionBarPresetMetrics,
	appScreenChromeSlotVariants,
	appScreenFrameVariants,
	appScreenHeaderPresetMetrics,
	type ResolvedAppScreenActionBarPreset,
	type ResolvedAppScreenHeaderPreset,
} from "./app-screen.variants";
import { ContentList } from "./ContentList";
import { ContentOutlet } from "./ContentOutlet";

const SCREEN_INLINE_INSET = "var(--spacing-12)";
const CONTENT_BOTTOM_PADDING = "var(--spacing-16)";

export function AppScreenContent({
	children,
	systemHeader,
	header,
	top,
	bottom,
	background = "var(--semantic-surface-page-normal)",
	headerPreset,
	actionBarPreset,
	"data-figma-render": dataFigmaRender = "layout",
	"data-figma-component-id": dataFigmaComponentId = "app-screen",
	"data-figma-layout-kind": dataFigmaLayoutKind = "chrome",
	"data-figma-layout-layer": dataFigmaLayoutLayer = "screen",
	"data-figma-layout-auto": dataFigmaLayoutAuto = "true",
	"data-figma-layout-direction": dataFigmaLayoutDirection = "vertical",
	"data-figma-layout-align": dataFigmaLayoutAlign = "stretch",
	"data-figma-layout-sizing": dataFigmaLayoutSizing = "fill",
	"data-figma-property-header-preset": dataFigmaHeaderPreset,
	"data-figma-property-action-bar-preset": dataFigmaActionBarPreset,
}: AppScreenContentProps) {
	const appHeader = header ?? top;
	const resolvedHeaderPreset = headerPreset
		? resolveHeaderPreset(headerPreset)
		: undefined;
	const resolvedActionBarPreset = actionBarPreset
		? resolveActionBarPreset(actionBarPreset)
		: undefined;
	const headerMetrics = resolvedHeaderPreset
		? appScreenHeaderPresetMetrics[resolvedHeaderPreset]
		: undefined;
	const actionBarMetrics = resolvedActionBarPreset
		? appScreenActionBarPresetMetrics[resolvedActionBarPreset]
		: undefined;
	const contentBottomPadding = actionBarMetrics
		? actionBarMetrics.contentBottomPadding
		: CONTENT_BOTTOM_PADDING;

	return (
		<div
			className={appScreenFrameVariants()}
			data-app-screen-header-preset={resolvedHeaderPreset}
			data-app-screen-action-bar-preset={resolvedActionBarPreset}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-figma-layout-kind={dataFigmaLayoutKind}
			data-figma-layout-layer={dataFigmaLayoutLayer}
			data-figma-layout-auto={dataFigmaLayoutAuto}
			data-figma-layout-direction={dataFigmaLayoutDirection}
			data-figma-layout-align={dataFigmaLayoutAlign}
			data-figma-layout-sizing={dataFigmaLayoutSizing}
			data-figma-property-header-preset={
				dataFigmaHeaderPreset ?? resolvedHeaderPreset
			}
			data-figma-property-action-bar-preset={
				dataFigmaActionBarPreset ?? resolvedActionBarPreset
			}
			style={{
				"--app-screen-header-height": headerMetrics?.height,
				"--app-screen-system-header-height": headerMetrics?.systemHeaderHeight,
				"--app-screen-app-header-height": headerMetrics?.appHeaderHeight,
				"--app-screen-action-bar-height": actionBarMetrics?.height,
				"--app-screen-content-bottom-padding": contentBottomPadding,
				background,
			} as CSSProperties}
		>
			{systemHeader ? (
				<AppScreenChromeSlot
					background={background}
					headerPreset={resolvedHeaderPreset}
				>
					{systemHeader}
				</AppScreenChromeSlot>
			) : null}
			{appHeader ? (
				<AppScreenChromeSlot
					background={background}
					slot="header"
					headerPreset={resolvedHeaderPreset}
				>
					{appHeader}
				</AppScreenChromeSlot>
			) : null}
			<ContentOutlet
				inlineInset={SCREEN_INLINE_INSET}
				actionBarPreset={resolvedActionBarPreset}
				style={{
					flex: "1 1 0",
					minHeight: 0,
					padding: `0 ${SCREEN_INLINE_INSET} var(--app-screen-content-bottom-padding)`,
				}}
			>
				<ContentList>{children}</ContentList>
			</ContentOutlet>
			{bottom ? (
				<AppScreenChromeSlot
					actionBarPreset={resolvedActionBarPreset}
					background={background}
					slot="bottom"
				>
					{bottom}
				</AppScreenChromeSlot>
			) : null}
		</div>
	);
}

function AppScreenChromeSlot({
	children,
	background,
	slot = "systemHeader",
	headerPreset,
	actionBarPreset,
}: {
	children: ReactNode;
	background: string;
	slot?: "systemHeader" | "header" | "bottom";
	headerPreset?: AppScreenHeaderPreset;
	actionBarPreset?: AppScreenActionBarPreset;
}) {
	const layer = getChromeSlotLayer(slot);
	const layoutSlot = getChromeLayoutSlot(slot);

	return (
		<section
			className={appScreenChromeSlotVariants({ slot })}
			data-app-screen-slot={slot}
			data-app-screen-header-preset={
				slot === "systemHeader" || slot === "header" ? headerPreset : undefined
			}
			data-app-screen-action-bar-preset={
				slot === "bottom" ? actionBarPreset : undefined
			}
			data-figma-render="layout"
			data-figma-component-id="app-screen-chrome-slot"
			data-figma-layout-kind="chrome"
			data-figma-layout-layer={layer}
			data-figma-layout-slot={layoutSlot}
			data-figma-layout-auto="false"
			data-figma-layout-sizing="fill"
			data-figma-property-header-preset={
				slot === "systemHeader" || slot === "header" ? headerPreset : undefined
			}
			data-figma-property-action-bar-preset={
				slot === "bottom" ? actionBarPreset : undefined
			}
			style={{
				background,
			}}
		>
			{children}
		</section>
	);
}

function getChromeSlotLayer(slot: "systemHeader" | "header" | "bottom") {
	if (slot === "systemHeader") return "system-header";
	if (slot === "header") return "app-header";
	return "bottom";
}

function getChromeLayoutSlot(slot: "systemHeader" | "header" | "bottom") {
	if (slot === "systemHeader") return "system-header";
	return slot;
}

function resolveHeaderPreset(
	preset: AppScreenHeaderPreset,
): ResolvedAppScreenHeaderPreset {
	if (preset === "pattern-107") {
		return "standard";
	}

	if (preset === "genui-text-section-117") {
		return "form-entry";
	}

	return preset;
}

function resolveActionBarPreset(
	preset: AppScreenActionBarPreset,
): ResolvedAppScreenActionBarPreset {
	if (preset === "pattern-102") {
		return "compact-action";
	}

	if (preset === "cx-default-108") {
		return "default-action";
	}

	if (preset === "single-primary-cta") {
		return "primary-cta";
	}

	if (preset === "cx-with-text-154") {
		return "guided-action";
	}

	return preset;
}
