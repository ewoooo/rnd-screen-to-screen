import type { VariantProps } from "class-variance-authority";
import type {
	ComponentPropsWithoutRef,
	MouseEventHandler,
	ReactNode,
} from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { bannerHorizontalVariants } from "./banner-horizontal.variants";

export type BannerHorizontalFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-indicator"?: "true" | "false";
};

type NativeBannerHorizontalProps = Omit<
	ComponentPropsWithoutRef<"div">,
	"aria-label" | "children" | "onClick" | "title"
>;

export type BannerHorizontalProps = NativeBannerHorizontalProps &
	VariantProps<typeof bannerHorizontalVariants> &
	BannerHorizontalFigmaBridgeProps & {
		title: ReactNode;
		description: ReactNode;
		image?: ReactNode;
		indicator?: boolean;
		indicatorCount?: number;
		activeIndex?: number;
		href?: string;
		onClick?: MouseEventHandler<HTMLElement>;
		ariaLabel?: string;
		className?: string;
	};
