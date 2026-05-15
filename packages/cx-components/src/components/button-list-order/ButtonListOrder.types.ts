import type { ComponentPropsWithoutRef } from "react";
import type { IconType } from "../icon";

export type ButtonListOrderFigmaBridgeProps = {
	"data-figma-render"?:
		| "component"
		| "layout"
		| "slot"
		| "primitive"
		| "ignore";
	"data-figma-component-id"?: string;
};

type NativeButtonListOrderProps = Omit<
	ComponentPropsWithoutRef<"button">,
	"children"
>;

export type ButtonListOrderProps = NativeButtonListOrderProps &
	ButtonListOrderFigmaBridgeProps & {
		label?: string;
		icon?: IconType;
	};
