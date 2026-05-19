import { AppBar, Text } from "@pxds/cx-components";
import type { CSSProperties } from "react";
import type { ProgressAppBarProps } from "./ProgressAppBar.types";

const boolAttr = (value: boolean) => (value ? "true" : "false");

const clamp = (value: number, min: number, max: number) =>
	Math.min(Math.max(value, min), max);

const resolvePercent = (
	currentStep: number | undefined,
	totalSteps: number | undefined,
) => {
	if (!currentStep || !totalSteps || totalSteps <= 0) return 0;
	return clamp((currentStep / totalSteps) * 100, 0, 100);
};

const rootStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "var(--semantic-spacing-gap-default)",
	width: "100%",
	background: "var(--semantic-color-bg-default)",
	boxSizing: "border-box",
};

const progressRowStyle: CSSProperties = {
	display: "flex",
	alignItems: "center",
	gap: "var(--semantic-spacing-gap-comfortable)",
	width: "100%",
	paddingInline: "var(--semantic-spacing-page-gutter)",
	paddingBottom: "var(--semantic-spacing-gap-comfortable)",
	boxSizing: "border-box",
};

const trackStyle: CSSProperties = {
	flex: "1 1 auto",
	height: "var(--spacing-4)",
	borderRadius: "var(--semantic-radius-full)",
	background: "var(--semantic-color-border-subtle)",
	overflow: "hidden",
};

const valueStyle = (percent: number): CSSProperties => ({
	height: "100%",
	width: `${percent}%`,
	borderRadius: "inherit",
	background: "var(--semantic-color-bg-brand)",
	transition: "width 160ms ease",
});

const labelStyle: CSSProperties = {
	flex: "0 0 auto",
	whiteSpace: "nowrap",
	color: "var(--semantic-color-text-secondary)",
};

/**
 * NEW progress app bar pattern for the nova-mbr-fp 가입 플로우.
 * cx-components `AppBar` has no progress slot, so this pattern composes
 * the cx-components `AppBar` (back + title chrome) with a token-styled
 * step progress track. All visual values are semantic design tokens
 * (no raw px/hex/font-size). This is NOT the legacy ProgressAppBar.
 */
export function ProgressAppBar({
	title,
	currentStep,
	totalSteps,
	progressLabel,
	showProgressLabel = false,
	showLeftItem = true,
	onLeftClick,
	className,
	"data-node-kind": dataNodeKind = "pattern",
	"data-component-id": dataComponentId = "pat-mbr-fp-progress-app-bar",
	"data-figma-component": dataFigmaComponent = "ProgressAppBar",
	"data-figma-progress": dataFigmaProgress,
	"data-figma-progress-label": dataFigmaProgressLabel,
}: ProgressAppBarProps) {
	const percent = resolvePercent(currentStep, totalSteps);
	const roundedPercent = Math.round(percent);
	const hasProgressLabel = Boolean(showProgressLabel && progressLabel);
	const ariaLabel =
		progressLabel ??
		(currentStep && totalSteps
			? `${title} ${currentStep}/${totalSteps}`
			: `${title} 진행 단계`);

	return (
		<div
			className={className}
			style={rootStyle}
			data-node-kind={dataNodeKind}
			data-component-id={dataComponentId}
			data-figma-component={dataFigmaComponent}
			data-figma-progress={dataFigmaProgress ?? String(roundedPercent)}
			data-figma-progress-label={
				dataFigmaProgressLabel ?? boolAttr(hasProgressLabel)
			}
			data-progress={String(roundedPercent)}
			data-progress-label={boolAttr(hasProgressLabel)}
		>
			<AppBar
				title={title}
				showTitle
				showLeftItem={showLeftItem}
				onLeftClick={onLeftClick}
				data-node-kind="component"
				data-component-id="app-bar"
				data-figma-component="AppBar"
			/>
			<div style={progressRowStyle}>
				<div
					style={trackStyle}
					role="progressbar"
					aria-label={ariaLabel}
					aria-valuemin={0}
					aria-valuemax={100}
					aria-valuenow={roundedPercent}
				>
					<div style={valueStyle(percent)} />
				</div>
				{hasProgressLabel ? (
					<Text as="span" variant="caption" style={labelStyle}>
						{progressLabel}
					</Text>
				) : null}
			</div>
		</div>
	);
}
