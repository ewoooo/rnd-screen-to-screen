import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { FigmaBridgeAttributes } from "../../types";

export type RQRContentsDetailRow = {
	id: string;
	label: ReactNode;
	value: string;
};

export type RQRContentsDetailFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-row-count"?: string;
	"data-figma-property-sub-title"?: "true" | "false";
};

type NativeRQRContentsDetailProps = Omit<
	ComponentPropsWithoutRef<"section">,
	"children" | "title"
>;

export type RQRContentsDetailProps = NativeRQRContentsDetailProps &
	RQRContentsDetailFigmaBridgeProps & {
		title: ReactNode;
		subTitle?: ReactNode;
		rows: readonly RQRContentsDetailRow[];
	};
