import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { BadgeType } from "../badge";
import type { listTextRightItemVariants } from "./list-text-right-item.variants";

export type ListTextRightItemLevel = "v" | "g" | "s";

export type ListTextRightItemPreset =
	| { type?: "text"; text: string }
	| { type: "badge"; text: string; badgeType?: BadgeType }
	| { type: "badgeLevel"; levels?: ListTextRightItemLevel[] }
	| {
			type: "textButton";
			text: string;
			onClick?: () => void;
			ariaLabel?: string;
	  }
	| {
			type: "icon";
			icon?: "arrow-right";
			onClick?: never;
			ariaLabel?: string;
	  }
	| {
			type: "icon";
			icon?: "arrow-right";
			onClick: () => void;
			ariaLabel: string;
	  };

export type ListTextRightItemFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-type"?:
		| "Text"
		| "Badge"
		| "BadgeLevel"
		| "TextButton"
		| "Icon";
};

type NativeListTextRightItemProps = Omit<
	ComponentPropsWithoutRef<"span">,
	"children" | "color" | "onClick"
>;

export type ListTextRightItemProps = NativeListTextRightItemProps &
	Omit<VariantProps<typeof listTextRightItemVariants>, "type"> &
	ListTextRightItemFigmaBridgeProps &
	ListTextRightItemPreset & {
		children?: never;
	};
