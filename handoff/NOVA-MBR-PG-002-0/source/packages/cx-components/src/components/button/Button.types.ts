import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import type { ButtonFigmaBridgeProps } from "../../types";
import type { buttonVariants } from "./button.variants";

export type { ButtonFigmaBridgeProps } from "../../types";

type NativeButtonProps = ComponentPropsWithoutRef<"button">;

export type ButtonProps = Omit<NativeButtonProps, "disabled"> &
	VariantProps<typeof buttonVariants> &
	ButtonFigmaBridgeProps & {
		asChild?: boolean;
		disabled?: boolean;
		fullWidth?: boolean;
	};
