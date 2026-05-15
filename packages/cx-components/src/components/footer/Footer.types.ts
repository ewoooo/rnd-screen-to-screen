import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { FigmaBridgeAttributes } from "../../types";
import type { footerVariants } from "./footer.variants";

export type FooterFigmaBridgeProps = FigmaBridgeAttributes & {
	"data-figma-property-type"?: "01" | "02";
};

type NativeFooterProps = ComponentPropsWithoutRef<"footer">;

export type FooterType = NonNullable<
	Parameters<typeof footerVariants>[0]
>["type"];

export type FooterProps = NativeFooterProps &
	Omit<VariantProps<typeof footerVariants>, "type"> &
	FooterFigmaBridgeProps & {
		type?: FooterType;
		text?: string;
		button?: ReactNode;
		buttonLabel?: string;
		onButtonClick?: () => void;
		className?: string;
	};
