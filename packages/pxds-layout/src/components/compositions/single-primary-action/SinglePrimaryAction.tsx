import { forwardRef } from "react";
import { Box, Slot } from "../../primitives";
import type { SinglePrimaryActionProps } from "./SinglePrimaryAction.types";
import { singlePrimaryActionVariants } from "./single-primary-action.variants";

const cn = (...values: Array<string | false | null | undefined>) =>
	values.filter(Boolean).join(" ");

export const SinglePrimaryAction = forwardRef<
	HTMLDivElement,
	SinglePrimaryActionProps
>(function SinglePrimaryAction(
	{
		children,
		className,
		"data-figma-render": dataFigmaRender = "layout",
		"data-figma-component-id": dataFigmaComponentId = "single-primary-action",
		"data-figma-property-action-slot": dataFigmaActionSlot,
		...props
	},
	ref,
) {
	return (
		<Box
			ref={ref}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-figma-layout-kind="composition"
			data-figma-layout-layer="action-area"
			className={cn(singlePrimaryActionVariants(), className)}
			{...props}
		>
			<Slot
				className="single-primary-action__action"
				data-figma-render="slot"
				data-figma-layout-kind="composition"
				data-figma-layout-layer="slot"
				data-figma-layout-slot="action"
				data-figma-layout-gap="spacing-0"
				data-figma-property-action-slot={dataFigmaActionSlot ?? "slot"}
				gap="var(--spacing-0)"
				name="action"
			>
				{children}
			</Slot>
		</Box>
	);
});
