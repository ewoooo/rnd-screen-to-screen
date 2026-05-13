import {
	createElement,
	forwardRef,
	type ElementType,
	type ReactElement,
} from "react";
import { cn } from "../../../lib/cn";
import type { TextElement, TextProps, TextRef } from "./Text.types";
import { textVariants } from "./text.variants";

function TextInner<TElement extends TextElement = "span">(
	{
		as,
		className,
		variant = "body",
		"data-node-kind": dataNodeKind = "component",
		"data-component-id": dataComponentId = "cx-text",
		"data-figma-component": dataFigmaComponent = "Text",
		"data-figma-variant": dataFigmaVariant,
		...props
	}: TextProps<TElement>,
	ref: TextRef<TElement>,
) {
	const Comp: ElementType = as ?? "span";
	const resolvedVariant = variant ?? "body";

	return createElement(Comp, {
		ref,
		"data-node-kind": dataNodeKind,
		"data-component-id": dataComponentId,
		"data-figma-component": dataFigmaComponent,
		"data-figma-variant": dataFigmaVariant ?? resolvedVariant,
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
