import { Slot } from "radix-ui";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import type { ButtonProps } from "./Button.types";
import { buttonVariants } from "./button.variants";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
	{
		asChild = false,
		className,
		disabled = false,
		fullWidth = false,
		size = "medium",
		type = "button",
		variant = "primary",
		"data-figma-render": dataFigmaRender = "component",
		"data-figma-component-id": dataFigmaComponentId = "button",
		"data-figma-property-variant": dataFigmaVariant,
		"data-figma-property-size": dataFigmaSize,
		...props
	},
	ref,
) {
	const isDisabled = disabled || variant === "disabled";
	const resolvedVariant = isDisabled ? "disabled" : variant;
	const Comp = asChild ? Slot.Root : "button";

	return (
		<Comp
			ref={ref}
			type={asChild ? undefined : type}
			disabled={asChild ? undefined : isDisabled}
			aria-disabled={asChild && isDisabled ? true : undefined}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-figma-property-variant={dataFigmaVariant ?? resolvedVariant}
			data-figma-property-size={dataFigmaSize ?? size}
			data-variant={resolvedVariant}
			data-size={size}
			data-disabled={isDisabled ? "" : undefined}
			className={cn(
				buttonVariants({ variant: resolvedVariant, size }),
				fullWidth && "button--full-width",
				className,
			)}
			{...props}
		/>
	);
});
