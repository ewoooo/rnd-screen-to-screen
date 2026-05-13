import {
	createElement,
	type ElementType,
	forwardRef,
	type ReactElement,
} from "react";
import { cn } from "../../lib/cn";
import type { TextElement, TextProps, TextRef } from "./Text.types";
import { textVariants } from "./text.variants";

function TextInner<TElement extends TextElement = "span">(
	{
		as,
		className,
		variant = "body",
		"data-figma-render": dataFigmaRender = "component",
		"data-figma-component-id": dataFigmaComponentId,
		"data-figma-property-variant": dataFigmaVariant,
		...props
	}: TextProps<TElement>,
	ref: TextRef<TElement>,
) {
	const Comp: ElementType = as ?? "span";
	const resolvedVariant = variant ?? "body";
	const resolvedComponentId =
		dataFigmaComponentId ?? (dataFigmaRender === "component" ? "text" : undefined);

	return createElement(Comp, {
		ref,
		"data-figma-render": dataFigmaRender,
		"data-figma-component-id": resolvedComponentId,
		"data-figma-property-variant": dataFigmaVariant ?? resolvedVariant,
		"data-variant": resolvedVariant,
		className: cn(textVariants({ variant: resolvedVariant }), className),
		...props,
	});
}

export const Text = forwardRef(TextInner) as <
	TElement extends TextElement = "span",
>(
	props: TextProps<TElement> & { ref?: TextRef<TElement> },
) => ReactElement | null;
