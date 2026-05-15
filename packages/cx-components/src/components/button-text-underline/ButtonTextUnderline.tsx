import { Slot } from "radix-ui";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Text } from "../text";
import type { ButtonTextUnderlineProps } from "./ButtonTextUnderline.types";
import { buttonTextUnderlineVariants } from "./button-text-underline.variants";

export const ButtonTextUnderline = forwardRef<
	HTMLButtonElement,
	ButtonTextUnderlineProps
>(function ButtonTextUnderline(
	{
		asChild = false,
		children,
		className,
		disabled = false,
		type = "button",
		"data-figma-render": dataFigmaRender = "component",
		"data-figma-component-id": dataFigmaComponentId = "button-text-underline",
		...props
	},
	ref,
) {
	const Comp = asChild ? Slot.Root : "button";

	return (
		<Comp
			ref={ref}
			type={asChild ? undefined : type}
			disabled={asChild ? undefined : disabled}
			aria-disabled={asChild && disabled ? true : undefined}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-disabled={disabled ? "" : undefined}
			className={cn(buttonTextUnderlineVariants(), className)}
			{...props}
		>
			<Text
				as="span"
				variant="bodySubtle"
				data-figma-render="primitive"
				className="button-text-underline__label"
			>
				{children}
			</Text>
		</Comp>
	);
});
