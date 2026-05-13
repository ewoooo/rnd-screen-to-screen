import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { TitleSectionFigmaBridgeProps } from "../../types";
import type { titleSectionVariants } from "./title-section.variants";

export type { TitleSectionFigmaBridgeProps } from "../../types";

type NativeTitleSectionProps = Omit<ComponentPropsWithoutRef<"section">, "title">;

export type TitleSectionLeftItem =
	| ReactNode
	| {
			type: "text";
			text: string;
	  }
	| {
			type: "icon";
			icon: ReactNode;
			label?: string;
	  }
	| {
			type: "badge";
			text: string;
	  };

export type TitleSectionRightItem =
	| ReactNode
	| {
			type: "icon";
			icon: ReactNode;
			label?: string;
			onClick?: () => void;
	  }
	| {
			type: "textButton";
			text: string;
			onClick?: () => void;
	  }
	| {
			type: "textItemButton";
			label: string;
			value: string;
			icon?: ReactNode;
			onClick?: () => void;
	  }
	| {
			type: "buttonListOrder";
			label: string;
			icon?: ReactNode;
			onClick?: () => void;
	  };

export type TitleSectionProps = NativeTitleSectionProps &
	Omit<
		VariantProps<typeof titleSectionVariants>,
		"subTitle" | "leftItem" | "rightItem"
	> &
	TitleSectionFigmaBridgeProps & {
		title: ReactNode;
		subTitle?: ReactNode;
		leftItem?: TitleSectionLeftItem;
		rightItem?: TitleSectionRightItem;
		className?: string;
	};
