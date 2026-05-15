import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { rqrNoticeVariants } from "./rqr-notice.variants";

export type RQRNoticeFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-title"?: "true" | "false";
	"data-figma-property-tone"?: "info" | "negative" | "positive" | "cautionary";
};

type NativeRQRNoticeProps = Omit<
	ComponentPropsWithoutRef<"div">,
	"children" | "title"
>;

export type RQRNoticeProps = NativeRQRNoticeProps &
	VariantProps<typeof rqrNoticeVariants> &
	RQRNoticeFigmaBridgeProps & {
		title?: ReactNode;
		children: ReactNode;
	};
