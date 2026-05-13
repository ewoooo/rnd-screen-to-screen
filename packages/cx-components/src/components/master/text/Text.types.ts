import type { VariantProps } from "class-variance-authority";
import type {
	ComponentPropsWithoutRef,
	ComponentPropsWithRef,
	ElementType,
} from "react";
import type { FigmaBridgeProps } from "../../../types";
import type { textVariants } from "./text.variants";

export type TextElement =
	| "span"
	| "p"
	| "label"
	| "div"
	| "strong"
	| "em"
	| "small"
	| "h1"
	| "h2"
	| "h3"
	| "h4"
	| "h5"
	| "h6";

export type TextFigmaBridgeProps = FigmaBridgeProps;

type TextOwnProps<TElement extends ElementType> =
	VariantProps<typeof textVariants> &
		TextFigmaBridgeProps & {
			as?: TElement;
		};

export type TextProps<TElement extends TextElement = "span"> = TextOwnProps<TElement> &
	Omit<ComponentPropsWithoutRef<TElement>, keyof TextOwnProps<TElement>>;

export type TextRef<TElement extends TextElement = "span"> =
	ComponentPropsWithRef<TElement>["ref"];
