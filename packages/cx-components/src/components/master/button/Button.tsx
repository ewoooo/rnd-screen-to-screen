import { Slot } from "radix-ui";
import { forwardRef } from "react";
import { cn } from "../../../lib/cn";
import type { ButtonProps } from "./Button.types";
import { buttonVariants } from "./button.variants";
import "./button.css";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
	{
		asChild = false,
		className,
		disabled = false,
		size = "medium",
		type = "button",
		variant = "primary",
		"data-node-kind": dataNodeKind = "component",
		"data-component-id": dataComponentId = "cx-button",
		"data-figma-component": dataFigmaComponent = "Button",
		"data-figma-variant": dataFigmaVariant,
		"data-figma-size": dataFigmaSize,
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
			data-node-kind={dataNodeKind}
			data-component-id={dataComponentId}
			data-figma-component={dataFigmaComponent}
			data-figma-variant={dataFigmaVariant ?? resolvedVariant}
			data-figma-size={dataFigmaSize ?? size}
			data-variant={resolvedVariant}
			data-size={size}
			data-disabled={isDisabled ? "" : undefined}
			className={cn(buttonVariants({ variant: resolvedVariant, size }), className)}
			{...props}
		/>
	);
});
