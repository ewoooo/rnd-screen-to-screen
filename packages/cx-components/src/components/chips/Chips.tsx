import { forwardRef, useState } from "react";
import { cn } from "../../lib/cn";
import { ChipItem } from "../chip-item";
import type { ChipsProps } from "./Chips.types";
import { chipsVariants } from "./chips.variants";

function getFallbackValue(items: ChipsProps["items"], defaultValue?: string) {
	if (defaultValue && items.some((item) => item.value === defaultValue)) {
		return defaultValue;
	}

	return items[0]?.value;
}

export const Chips = forwardRef<HTMLDivElement, ChipsProps>(function Chips(
	{
		ariaLabel,
		className,
		defaultValue,
		items,
		onValueChange,
		selectionMode = "single",
		value,
		"data-figma-render": dataFigmaRender = "component",
		"data-figma-component-id": dataFigmaComponentId = "chips",
		"data-figma-property-selected-value": dataFigmaSelectedValue,
		...props
	},
	ref,
) {
	const [uncontrolledValue, setUncontrolledValue] = useState(() =>
		getFallbackValue(items, defaultValue),
	);
	const fallbackValue = getFallbackValue(items, defaultValue);
	const controlledValue =
		value && items.some((item) => item.value === value) ? value : undefined;
	const selectedValue = controlledValue ?? uncontrolledValue ?? fallbackValue;
	const resolvedSelectedValue = items.some((item) => item.value === selectedValue)
		? selectedValue
		: fallbackValue;

	function selectValue(nextValue: string) {
		if (value === undefined) {
			setUncontrolledValue(nextValue);
		}

		onValueChange?.(nextValue);
	}

	return (
		<div
			ref={ref}
			role="radiogroup"
			aria-label={ariaLabel}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-figma-property-selected-value={
				dataFigmaSelectedValue ?? resolvedSelectedValue
			}
			data-selection-mode={selectionMode}
			className={cn(chipsVariants(), className)}
			{...props}
		>
			{items.map((item) => {
				const selected = item.value === resolvedSelectedValue;

				return (
					<ChipItem
						key={item.value}
						role="radio"
						aria-checked={selected}
						selected={selected}
						aria-disabled={item.disabled || undefined}
						onClick={item.disabled ? undefined : () => selectValue(item.value)}
					>
						{item.label}
					</ChipItem>
				);
			})}
		</div>
	);
});
