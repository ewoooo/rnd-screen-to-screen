import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import type { buttonVariants } from "./button.variants";

type NativeButtonProps = ComponentPropsWithoutRef<"button">;

export type ButtonFigmaBridgeProps = {
	"data-node-kind"?: string;
	"data-component-id"?: string;
	"data-figma-component"?: string;
	"data-figma-variant"?: string;
	"data-figma-size"?: string;
};

export type ButtonProps = Omit<NativeButtonProps, "disabled"> &
	VariantProps<typeof buttonVariants> &
	ButtonFigmaBridgeProps & {
		asChild?: boolean;
		disabled?: boolean;
	};
