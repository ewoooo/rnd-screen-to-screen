import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import type { FigmaBridgeSizeProps } from "../../../types";
import type { buttonVariants } from "./button.variants";

type NativeButtonProps = ComponentPropsWithoutRef<"button">;

export type ButtonFigmaBridgeProps = FigmaBridgeSizeProps;

export type ButtonProps = Omit<NativeButtonProps, "disabled"> &
	VariantProps<typeof buttonVariants> &
	ButtonFigmaBridgeProps & {
		asChild?: boolean;
		disabled?: boolean;
		fullWidth?: boolean;
	};
