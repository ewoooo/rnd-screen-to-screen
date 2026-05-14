import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { accordionVariants } from "./accordion.variants";

export type AccordionFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-state"?: "open" | "close";
	"data-figma-property-left-text"?: "true" | "false";
};

type NativeAccordionProps = Omit<
	ComponentPropsWithoutRef<"div">,
	"children" | "title" | "onChange"
>;

export type AccordionProps = NativeAccordionProps &
	Omit<VariantProps<typeof accordionVariants>, "leftText" | "state"> &
	AccordionFigmaBridgeProps & {
		title: ReactNode;
		leftText?: ReactNode;
		open?: boolean;
		defaultOpen?: boolean;
		onOpenChange?: (open: boolean) => void;
		children?: ReactNode;
		disabled?: boolean;
	};
