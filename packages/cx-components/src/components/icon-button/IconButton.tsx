import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import type { IconButtonProps } from "./IconButton.types";
import { iconButtonVariants } from "./icon-button.variants";

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	function IconButton(
		{
			children,
			className,
			disabled = false,
			size = "medium",
			variant = "plain",
			"aria-label": ariaLabel,
			"data-figma-render": dataFigmaRender = "component",
			"data-figma-component-id": dataFigmaComponentId = "icon-button",
			"data-figma-property-size": dataFigmaSize,
			"data-figma-property-variant": dataFigmaVariant,
			"data-figma-property-disabled": dataFigmaDisabled,
			onClick,
		},
		ref,
	) {
		return (
			<button
				ref={ref}
				type="button"
				aria-label={ariaLabel}
				disabled={disabled}
				data-figma-render={dataFigmaRender}
				data-figma-component-id={dataFigmaComponentId}
				data-figma-property-size={dataFigmaSize ?? size}
				data-figma-property-variant={dataFigmaVariant ?? variant}
				data-figma-property-disabled={
					dataFigmaDisabled ?? (disabled ? "true" : "false")
				}
				data-size={size}
				data-variant={variant}
				data-disabled={disabled ? "" : undefined}
				className={cn(iconButtonVariants({ size, variant }), className)}
				onClick={onClick}
			>
				{children}
			</button>
		);
	},
);
