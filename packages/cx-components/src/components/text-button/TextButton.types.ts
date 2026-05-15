import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { textButtonVariants } from "./text-button.variants";

export type TextButtonFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-property-1"?: "default" | "variant2";
};

type NativeButtonProps = ComponentPropsWithoutRef<"button">;

export type TextButtonProps = Omit<NativeButtonProps, "disabled"> &
	VariantProps<typeof textButtonVariants> &
	TextButtonFigmaBridgeProps & {
		asChild?: boolean;
		children: ReactNode;
		disabled?: boolean;
		secondaryChildren?: ReactNode;
	};
