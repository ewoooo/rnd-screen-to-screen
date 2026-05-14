import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { FigmaBridgeAttributes } from "../../types";

export type ButtonTextUnderlineFigmaBridgeProps = FigmaBridgeAttributes;

type NativeButtonProps = ComponentPropsWithoutRef<"button">;

export type ButtonTextUnderlineProps = Omit<NativeButtonProps, "disabled"> &
	ButtonTextUnderlineFigmaBridgeProps & {
		asChild?: boolean;
		children: ReactNode;
		disabled?: boolean;
	};
