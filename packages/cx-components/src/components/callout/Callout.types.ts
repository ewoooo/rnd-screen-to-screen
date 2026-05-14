import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { IconType } from "../icon";
import type { calloutVariants } from "./callout.variants";

export type CalloutFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-title"?: "true" | "false";
};

type NativeCalloutProps = Omit<
	ComponentPropsWithoutRef<"div">,
	"children" | "title"
>;

export type CalloutProps = NativeCalloutProps &
	VariantProps<typeof calloutVariants> &
	CalloutFigmaBridgeProps & {
		children: ReactNode;
		title?: ReactNode;
		icon?: IconType | ReactNode;
	};
