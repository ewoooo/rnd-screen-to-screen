import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon";
import type { ButtonListOrderProps } from "./ButtonListOrder.types";
import { buttonListOrderVariants } from "./button-list-order.variants";

export const ButtonListOrder = forwardRef<
	HTMLButtonElement,
	ButtonListOrderProps
>(function ButtonListOrder(
	{
		className,
		disabled = false,
		icon = "dropdown",
		label = "인기순",
		type = "button",
		"data-figma-render": dataFigmaRender = "component",
		"data-figma-component-id": dataFigmaComponentId = "button-list-order",
		...props
	},
	ref,
) {
	return (
		<button
			ref={ref}
			type={type}
			disabled={disabled}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-disabled={disabled ? "" : undefined}
			className={cn(buttonListOrderVariants(), className)}
			{...props}
		>
			<span className="cx-button-list-order__label">{label}</span>
			<Icon
				className="cx-button-list-order__icon"
				type={icon}
				size={16}
				aria-hidden="true"
			/>
		</button>
	);
});
