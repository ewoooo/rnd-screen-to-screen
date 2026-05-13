import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { BadgeFigmaBridgeProps } from "../../types";
import type { BadgeType, badgeVariants } from "./badge.variants";

export type { BadgeFigmaBridgeProps } from "../../types";

type NativeBadgeProps = Omit<
	ComponentPropsWithoutRef<"span">,
	"children" | "color"
>;

export type BadgeProps = NativeBadgeProps &
	Omit<VariantProps<typeof badgeVariants>, "type"> &
	BadgeFigmaBridgeProps & {
		type?: BadgeType;
		children?: ReactNode;
		text?: string;
	};
