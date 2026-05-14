import { Slot } from "radix-ui";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Text } from "../text";
import type { TextButtonProps } from "./TextButton.types";
import { textButtonVariants } from "./text-button.variants";

export const TextButton = forwardRef<HTMLButtonElement, TextButtonProps>(
	function TextButton(
		{
			asChild = false,
			children,
			className,
			disabled = false,
			secondaryChildren,
			type = "button",
			variant = "default",
			"data-figma-render": dataFigmaRender = "component",
			"data-figma-component-id": dataFigmaComponentId = "text-button",
			"data-figma-property-property-1": dataFigmaProperty1,
			...props
		},
		ref,
	) {
		const Comp = asChild ? Slot.Root : "button";
		const resolvedVariant = variant ?? "default";
		const figmaProperty1 =
			dataFigmaProperty1 ?? (resolvedVariant === "paired" ? "variant2" : "default");

		return (
			<Comp
				ref={ref}
				type={asChild ? undefined : type}
				disabled={asChild ? undefined : disabled}
				aria-disabled={asChild && disabled ? true : undefined}
				data-figma-render={dataFigmaRender}
				data-figma-component-id={dataFigmaComponentId}
				data-figma-property-property-1={figmaProperty1}
				data-variant={resolvedVariant}
				data-disabled={disabled ? "" : undefined}
				className={cn(textButtonVariants({ variant: resolvedVariant }), className)}
				{...props}
			>
				<Text
					as="span"
					variant="body"
					data-figma-render="primitive"
					className="text-button__label"
				>
					{children}
				</Text>
				{resolvedVariant === "paired" ? (
					<>
						<span className="text-button__divider" aria-hidden="true" />
						<Text
							as="span"
							variant="body"
							data-figma-render="primitive"
							className="text-button__label"
						>
							{secondaryChildren}
						</Text>
					</>
				) : null}
			</Comp>
		);
	},
);
