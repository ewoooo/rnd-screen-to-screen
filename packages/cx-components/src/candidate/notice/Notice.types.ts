import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { noticeVariants } from "./notice.variants";

export type NoticeFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-title"?: "true" | "false";
	"data-figma-property-tone"?: "info" | "negative" | "positive" | "cautionary";
};

type NativeNoticeProps = Omit<
	ComponentPropsWithoutRef<"div">,
	"children" | "title"
>;

export type NoticeProps = NativeNoticeProps &
	VariantProps<typeof noticeVariants> &
	NoticeFigmaBridgeProps & {
		title?: ReactNode;
		children: ReactNode;
	};
