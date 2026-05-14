import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { BadgeType } from "../badge";
import type { IconType } from "../icon";
import type { badgeIconVariants } from "./badge-icon.variants";

export type BadgeIconFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-subtext"?: "off" | "on";
};

type NativeBadgeIconProps = Omit<
	ComponentPropsWithoutRef<"span">,
	"children" | "color"
>;

export type BadgeIconProps = NativeBadgeIconProps &
	Omit<VariantProps<typeof badgeIconVariants>, "subtext"> &
	BadgeIconFigmaBridgeProps & {
		icon?: ReactNode;
		iconType?: IconType;
		badge?: ReactNode;
		badgeText?: string;
		badgeType?: BadgeType;
		subtext?: ReactNode;
		showSubtext?: boolean;
		children?: never;
	};
