import type { ReactNode } from "react";
import type { IconButtonFigmaBridgeProps } from "../../types";
import type {
	IconButtonSize,
	IconButtonVariant,
} from "./icon-button.variants";

export type { IconButtonFigmaBridgeProps } from "../../types";

export type IconButtonProps = IconButtonFigmaBridgeProps & {
	children: ReactNode;
	size?: IconButtonSize;
	variant?: IconButtonVariant;
	disabled?: boolean;
	"aria-label": string;
	onClick?: () => void;
	className?: string;
};
