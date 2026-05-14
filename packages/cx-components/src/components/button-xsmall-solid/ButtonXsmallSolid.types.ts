import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { ButtonXsmallSolidState } from "./button-xsmall-solid.variants";

export type ButtonXsmallSolidFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-state"?: ButtonXsmallSolidState;
};

type NativeButtonXsmallSolidProps = Omit<
	ComponentPropsWithoutRef<"button">,
	"children" | "disabled" | "color"
>;

export type ButtonXsmallSolidProps = NativeButtonXsmallSolidProps &
	ButtonXsmallSolidFigmaBridgeProps & {
		children: ReactNode;
		state?: ButtonXsmallSolidState;
		disabled?: boolean;
		icon?: ReactNode | false;
	};
