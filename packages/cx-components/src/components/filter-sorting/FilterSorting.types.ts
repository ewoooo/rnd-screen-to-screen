import type { ComponentPropsWithoutRef, MouseEventHandler } from "react";
import type { FigmaBridgeAttributes } from "../../types";

export type FilterSortingFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-divider"?: "true" | "false";
};

type NativeFilterSortingProps = Omit<
	ComponentPropsWithoutRef<"div">,
	"children"
>;

export type FilterSortingProps = NativeFilterSortingProps &
	FilterSortingFigmaBridgeProps & {
		totalCount?: number | string;
		totalLabel?: string;
		totalUnit?: string;
		orderLabel?: string;
		filterLabel?: string;
		divider?: boolean;
		onOrderClick?: MouseEventHandler<HTMLButtonElement>;
		onFilterClick?: MouseEventHandler<HTMLButtonElement>;
		className?: string;
	};
