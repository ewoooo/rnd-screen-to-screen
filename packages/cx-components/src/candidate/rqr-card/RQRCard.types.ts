import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { rqrCardVariants } from "./rqr-card.variants";

export type RQRCardFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-padding"?: "none" | "md" | "lg";
};

type NativeRQRCardProps = Omit<ComponentPropsWithoutRef<"div">, "children">;

export type RQRCardProps = NativeRQRCardProps &
	VariantProps<typeof rqrCardVariants> &
	RQRCardFigmaBridgeProps & {
		children: ReactNode;
	};
