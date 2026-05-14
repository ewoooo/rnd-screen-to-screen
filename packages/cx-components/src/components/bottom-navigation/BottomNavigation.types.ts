import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, MouseEventHandler } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { IconSize, RecolorableIconType } from "../icon";
import type {
	BottomNavigationState,
	bottomNavigationVariants,
} from "./bottom-navigation.variants";

export type BottomNavigationFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-state"?: BottomNavigationState;
};

export type BottomNavigationItem = {
	state: BottomNavigationState;
	label: string;
	icon: RecolorableIconType;
	iconSize: IconSize;
	ariaLabel?: string;
	disabled?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
};

type NativeBottomNavigationProps = Omit<
	ComponentPropsWithoutRef<"nav">,
	"children" | "onChange"
>;

export type BottomNavigationProps = NativeBottomNavigationProps &
	Omit<VariantProps<typeof bottomNavigationVariants>, "state"> &
	BottomNavigationFigmaBridgeProps & {
		state?: BottomNavigationState;
		items?: readonly BottomNavigationItem[];
		onStateChange?: (state: BottomNavigationState) => void;
		className?: string;
	};
