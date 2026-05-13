import type { ReactNode } from "react";
import type { AppBarFigmaBridgeProps } from "../../types";

export type { AppBarFigmaBridgeProps } from "../../types";

export type AppBarProps = AppBarFigmaBridgeProps & {
	title?: string;
	showTitle?: boolean;
	showLeftItem?: boolean;
	showRightItem?: boolean;
	showLogo?: boolean;
	leftIcon?: ReactNode;
	logo?: ReactNode;
	rightItems?: ReactNode[];
	leftLabel?: string;
	onLeftClick?: () => void;
	className?: string;
};
