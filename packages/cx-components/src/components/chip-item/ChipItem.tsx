import { type ForwardedRef, forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Text } from "../text";
import type { ChipItemProps } from "./ChipItem.types";
import { chipItemVariants } from "./chip-item.variants";

export const ChipItem = forwardRef<HTMLElement, ChipItemProps>(function ChipItem(
	{
		children,
		className,
		onClick,
		selected = false,
		"data-figma-render": dataFigmaRender = "component",
		"data-figma-component-id": dataFigmaComponentId = "chip-item",
		"data-figma-property-selected": dataFigmaSelected,
		...props
	},
	ref,
) {
	const selectedVariant = selected ? "on" : "off";
	const rootProps = {
		"data-figma-render": dataFigmaRender,
		"data-figma-component-id": dataFigmaComponentId,
		"data-figma-property-selected": dataFigmaSelected ?? selectedVariant,
		"data-selected": selectedVariant,
		className: cn(chipItemVariants({ selected }), className),
		...props,
	};

	const label = (
		<Text
			className="chip-item__label"
			data-figma-render="slot"
			data-figma-component-id={undefined}
			variant="caption"
		>
			{children}
		</Text>
	);

	if (onClick) {
		return (
			<button
				ref={ref as ForwardedRef<HTMLButtonElement>}
				type="button"
				onClick={onClick}
				{...rootProps}
			>
				{label}
			</button>
		);
	}

	return (
		<span ref={ref as ForwardedRef<HTMLSpanElement>} {...rootProps}>
			{label}
		</span>
	);
});
