import type { VariantProps } from "class-variance-authority";
import type {
	ComponentPropsWithoutRef,
	KeyboardEventHandler,
	MouseEventHandler,
	ReactNode,
} from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { bannerHorizontalVariants } from "./banner-horizontal.variants";

export type BannerHorizontalFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-indicator"?: "true" | "false";
};

type NativeBannerHorizontalDivProps = Omit<
	ComponentPropsWithoutRef<"div">,
	"aria-label" | "children" | "onClick" | "onKeyDown" | "title"
> & {
	href?: undefined;
	onClick?: MouseEventHandler<HTMLElement>;
};

type NativeBannerHorizontalAnchorProps = Omit<
	ComponentPropsWithoutRef<"a">,
	"aria-label" | "children" | "href" | "onClick" | "onKeyDown" | "title"
> & {
	href: string;
	onClick?: MouseEventHandler<HTMLElement>;
};

type BannerHorizontalOwnProps =
	VariantProps<typeof bannerHorizontalVariants> &
	BannerHorizontalFigmaBridgeProps & {
		title: ReactNode;
		description: ReactNode;
		image?: ReactNode;
		indicator?: boolean;
		indicatorCount?: number;
		activeIndex?: number;
		ariaLabel?: string;
		className?: string;
		onKeyDown?: KeyboardEventHandler<HTMLElement>;
	};

export type BannerHorizontalProps = BannerHorizontalOwnProps &
	(NativeBannerHorizontalDivProps | NativeBannerHorizontalAnchorProps);
