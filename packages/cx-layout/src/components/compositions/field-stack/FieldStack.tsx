import { forwardRef } from "react";
import { Box, Slot } from "../../primitives";
import type { FieldStackProps } from "./FieldStack.types";
import { fieldStackVariants } from "./field-stack.variants";

const cn = (...values: Array<string | false | null | undefined>) =>
	values.filter(Boolean).join(" ");

export const FieldStack = forwardRef<HTMLDivElement, FieldStackProps>(
	function FieldStack(
		{
			children,
			className,
			"data-figma-render": dataFigmaRender = "layout",
			"data-figma-component-id": dataFigmaComponentId = "field-stack",
			"data-figma-property-contents-slot": dataFigmaContentsSlot,
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
				data-figma-layout-layer="field-stack"
				className={cn(fieldStackVariants(), className)}
				{...props}
			>
				<Slot
					className="field-stack__content"
					data-figma-render="slot"
					data-figma-layout-kind="composition"
					data-figma-layout-layer="slot"
					data-figma-layout-slot="content"
					data-figma-layout-gap="spacing-8"
					data-figma-property-contents-slot={dataFigmaContentsSlot ?? "slot"}
					gap="var(--spacing-8)"
					name="content"
				>
					{children}
				</Slot>
			</Box>
		);
	},
);
