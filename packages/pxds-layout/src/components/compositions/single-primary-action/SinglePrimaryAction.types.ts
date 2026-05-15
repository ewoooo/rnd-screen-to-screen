import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type SinglePrimaryActionFigmaBridgeProps = {
	"data-figma-render"?: "layout";
	"data-figma-component-id"?: string;
	"data-figma-property-action-slot"?: "slot";
};

type NativeSinglePrimaryActionProps = Omit<
	ComponentPropsWithoutRef<"div">,
	"children"
>;

export type SinglePrimaryActionProps = NativeSinglePrimaryActionProps &
	SinglePrimaryActionFigmaBridgeProps & {
		children?: ReactNode;
		className?: string;
	};
