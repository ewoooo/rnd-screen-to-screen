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
			"data-node-kind": dataNodeKind = "component",
			"data-component-id": dataComponentId = "icon-button",
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
				data-node-kind={dataNodeKind}
				data-component-id={dataComponentId}
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
