import type { CSSProperties, ReactNode } from "react";

import { ContentList } from "./ContentList";
import { ContentOutlet } from "./ContentOutlet";

const SCREEN_INLINE_INSET = "var(--spacing-12)";
const CONTENT_BOTTOM_PADDING = "var(--spacing-16)";

export type AppScreenHeaderPreset =
	| "standard"
	| "form-entry"
	| "pattern-107"
	| "genui-text-section-117";

export type AppScreenActionBarPreset =
	| "compact-action"
	| "default-action"
	| "guided-action"
	| "primary-cta"
	| "pattern-102"
	| "cx-default-108"
	| "cx-with-text-154"
	| "single-primary-cta";

export type AppScreenContentProps = {
	children: ReactNode;
	systemHeader?: ReactNode;
	header?: ReactNode;
	top?: ReactNode;
	bottom?: ReactNode;
	background?: string;
	headerPreset?: AppScreenHeaderPreset;
	actionBarPreset?: AppScreenActionBarPreset;
};

export function AppScreenContent({
	children,
	systemHeader,
	header,
	top,
	bottom,
	background = "var(--semantic-surface-page-normal)",
	headerPreset,
	actionBarPreset,
}: AppScreenContentProps) {
	const appHeader = header ?? top;
	const resolvedHeaderPreset = headerPreset
		? resolveHeaderPreset(headerPreset)
		: undefined;
	const resolvedActionBarPreset = actionBarPreset
		? resolveActionBarPreset(actionBarPreset)
		: undefined;
	const headerMetrics = resolvedHeaderPreset
		? headerPresetMetrics[resolvedHeaderPreset]
		: undefined;
	const actionBarMetrics = resolvedActionBarPreset
		? actionBarPresetMetrics[resolvedActionBarPreset]
		: undefined;
	const contentBottomPadding = actionBarMetrics
		? actionBarMetrics.contentBottomPadding
		: CONTENT_BOTTOM_PADDING;

	return (
		<div
			data-app-screen-header-preset={resolvedHeaderPreset}
			data-app-screen-action-bar-preset={resolvedActionBarPreset}
			style={{
				"--app-screen-header-height": headerMetrics?.height,
				"--app-screen-system-header-height": headerMetrics?.systemHeaderHeight,
				"--app-screen-app-header-height": headerMetrics?.appHeaderHeight,
				"--app-screen-action-bar-height": actionBarMetrics?.height,
				"--app-screen-content-bottom-padding": contentBottomPadding,
				display: "flex",
				flexDirection: "column",
				width: "100%",
				height: "100%",
				overflow: "hidden",
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
	return (
		<section
			data-app-screen-slot={slot}
			data-app-screen-header-preset={
				slot === "systemHeader" || slot === "header" ? headerPreset : undefined
			}
			data-app-screen-action-bar-preset={
				slot === "bottom" ? actionBarPreset : undefined
			}
			style={{
				flexShrink: 0,
				background,
				blockSize: getChromeSlotHeight(slot),
			}}
		>
			{children}
		</section>
	);
}

function getChromeSlotHeight(slot: "systemHeader" | "header" | "bottom") {
	if (slot === "systemHeader") {
		return "var(--app-screen-system-header-height)";
	}

	if (slot === "header") {
		return "var(--app-screen-app-header-height)";
	}

	return "var(--app-screen-action-bar-height)";
}

const headerPresetMetrics = {
	standard: {
		height: "107px",
		systemHeaderHeight: "59px",
		appHeaderHeight: "48px",
	},
	"form-entry": {
		height: "117px",
		systemHeaderHeight: "61px",
		appHeaderHeight: "56px",
	},
} satisfies Record<
	ResolvedAppScreenHeaderPreset,
	{
		height: string;
		systemHeaderHeight: string;
		appHeaderHeight: string;
	}
>;

const actionBarPresetMetrics = {
	"compact-action": {
		height: "102px",
		contentBottomPadding: "102px",
	},
	"default-action": {
		height: "108px",
		contentBottomPadding: "108px",
	},
	"guided-action": {
		height: "154px",
		contentBottomPadding: "154px",
	},
	"primary-cta": {
		height: "108px",
		contentBottomPadding: "108px",
	},
} satisfies Record<
	ResolvedAppScreenActionBarPreset,
	{
		height: string;
		contentBottomPadding: string;
	}
>;

type ResolvedAppScreenHeaderPreset = "standard" | "form-entry";
type ResolvedAppScreenActionBarPreset =
	| "compact-action"
	| "default-action"
	| "guided-action"
	| "primary-cta";

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
