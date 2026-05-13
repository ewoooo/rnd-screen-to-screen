import { AppBar } from "@pxds/cx-components";
import type { ProgressAppBarProps } from "./ProgressAppBar.types";
import { progressAppBarVariants } from "./progress-app-bar.variants";

const boolAttr = (value: boolean) => (value ? "true" : "false");

const cn = (...values: Array<string | false | null | undefined>) =>
	values.filter(Boolean).join(" ");

const clamp = (value: number, min: number, max: number) =>
	Math.min(Math.max(value, min), max);

const resolvePercent = ({
	currentStep,
	progress,
	totalSteps,
}: Pick<ProgressAppBarProps, "currentStep" | "progress" | "totalSteps">) => {
	if (typeof progress === "number") return clamp(progress, 0, 100);
	if (!currentStep || !totalSteps || totalSteps <= 0) return 0;

	return clamp((currentStep / totalSteps) * 100, 0, 100);
};

export function ProgressAppBar({
	className,
	currentStep,
	leftIcon,
	leftLabel,
	onLeftClick,
	progress,
	progressLabel,
	rightItems,
	showLeftItem = true,
	showProgressLabel = false,
	showRightItem = false,
	title,
	totalSteps,
	"data-node-kind": dataNodeKind = "pattern",
	"data-component-id": dataComponentId = "mbr-progress-app-bar",
	"data-figma-component": dataFigmaComponent = "ProgressAppBar",
	"data-figma-progress": dataFigmaProgress,
	"data-figma-progress-label": dataFigmaProgressLabel,
}: ProgressAppBarProps) {
	const percent = resolvePercent({ currentStep, progress, totalSteps });
	const hasProgressLabel = Boolean(showProgressLabel && progressLabel);
	const ariaLabel =
		progressLabel ??
		(currentStep && totalSteps
			? `${title} ${currentStep}/${totalSteps}`
			: `${title} 진행률`);

	return (
		<header
			data-node-kind={dataNodeKind}
			data-component-id={dataComponentId}
			data-figma-component={dataFigmaComponent}
			data-figma-progress={dataFigmaProgress ?? String(Math.round(percent))}
			data-figma-progress-label={
				dataFigmaProgressLabel ?? boolAttr(hasProgressLabel)
			}
			data-progress={String(Math.round(percent))}
			data-progress-label={boolAttr(hasProgressLabel)}
			className={cn(
				progressAppBarVariants({ progressLabel: hasProgressLabel }),
				className,
			)}
		>
			<AppBar
				title={title}
				showTitle
				showLeftItem={showLeftItem}
				showRightItem={showRightItem}
				leftIcon={leftIcon}
				leftLabel={leftLabel}
				onLeftClick={onLeftClick}
				rightItems={rightItems}
				data-node-kind="component"
				data-component-id="app-bar"
				data-figma-component="AppBar"
			/>
			<div className="mbr-progress-app-bar__progress-row">
				<div
					className="mbr-progress-app-bar__progress"
					role="progressbar"
					aria-label={ariaLabel}
					aria-valuemin={0}
					aria-valuemax={100}
					aria-valuenow={Math.round(percent)}
				>
					<div
						className="mbr-progress-app-bar__progress-value"
						style={{ width: `${percent}%` }}
					/>
				</div>
				{hasProgressLabel ? (
					<span className="mbr-progress-app-bar__progress-label">
						{progressLabel}
					</span>
				) : null}
			</div>
		</header>
	);
}
