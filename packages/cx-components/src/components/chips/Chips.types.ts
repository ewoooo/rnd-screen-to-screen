import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { chipsVariants } from "./chips.variants";

export type ChipsItem = {
	value: string;
	label: ReactNode;
	disabled?: boolean;
};

export type ChipsFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-selected-value"?: string;
};

type NativeChipsProps = Omit<
	ComponentPropsWithoutRef<"div">,
	"children" | "defaultValue" | "onChange"
>;

export type ChipsProps = NativeChipsProps &
	VariantProps<typeof chipsVariants> &
	ChipsFigmaBridgeProps & {
		items: ChipsItem[];
		value?: string;
		defaultValue?: string;
		onValueChange?: (value: string) => void;
		selectionMode?: "single";
		ariaLabel?: string;
	};
