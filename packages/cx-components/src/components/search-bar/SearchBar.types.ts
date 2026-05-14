import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import type { IconType } from "../icon";
import type { SearchBarType, searchBarVariants } from "./search-bar.variants";

export type SearchBarFigmaBridgeProps = {
	"data-figma-render"?: "component" | "layout" | "slot" | "primitive" | "ignore";
	"data-figma-component-id"?: string;
};

export type SearchBarAction = {
	icon: IconType;
	label: string;
	onClick?: () => void;
};

type NativeSearchBarProps = Omit<
	ComponentPropsWithoutRef<"div">,
	"children" | "onClick"
>;

export type SearchBarProps = NativeSearchBarProps &
	Omit<VariantProps<typeof searchBarVariants>, "type"> &
	SearchBarFigmaBridgeProps & {
		type?: SearchBarType;
		placeholder?: string;
		value?: string;
		leadingIcon?: IconType;
		action?: SearchBarAction;
		onClick?: () => void;
		disabled?: boolean;
		className?: string;
	};
