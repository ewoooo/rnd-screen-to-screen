import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type FieldStackFigmaBridgeProps = {
	"data-figma-render"?: "layout";
	"data-figma-component-id"?: string;
	"data-figma-property-contents-slot"?: "slot";
};

type NativeFieldStackProps = Omit<
	ComponentPropsWithoutRef<"div">,
	"children"
>;

export type FieldStackProps = NativeFieldStackProps &
	FieldStackFigmaBridgeProps & {
		children?: ReactNode;
		className?: string;
	};
