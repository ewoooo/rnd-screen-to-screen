import type { ReactNode } from "react";

export type ProgressAppBarFigmaBridgeProps = {
	"data-node-kind"?: string;
	"data-component-id"?: string;
	"data-figma-component"?: string;
	"data-figma-progress"?: string;
	"data-figma-progress-label"?: string;
};

export type ProgressAppBarProps = ProgressAppBarFigmaBridgeProps & {
	title: string;
	currentStep?: number;
	totalSteps?: number;
	progress?: number;
	progressLabel?: string;
	showProgressLabel?: boolean;
	showLeftItem?: boolean;
	showRightItem?: boolean;
	leftIcon?: ReactNode;
	rightItems?: ReactNode[];
	leftLabel?: string;
	onLeftClick?: () => void;
	className?: string;
};
