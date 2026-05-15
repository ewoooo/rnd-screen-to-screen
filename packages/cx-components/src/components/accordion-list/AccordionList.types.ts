import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { FigmaBridgeAttributes } from "../../types";

export type AccordionListItem = {
	id: string;
	title: ReactNode;
	leftText?: ReactNode;
	content?: ReactNode;
	disabled?: boolean;
};

export type AccordionListFigmaBridgeProps = FigmaBridgeAttributes;

type NativeAccordionListProps = Omit<
	ComponentPropsWithoutRef<"div">,
	"children" | "onChange"
>;

export type AccordionListProps = NativeAccordionListProps &
	AccordionListFigmaBridgeProps & {
		items: AccordionListItem[];
		openIds?: string[];
		defaultOpenIds?: string[];
		allowMultiple?: boolean;
		onOpenIdsChange?: (openIds: string[]) => void;
		showTrailingDivider?: boolean;
	};
