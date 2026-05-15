import { forwardRef } from "react";
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
			<div
					ref={ref}
					data-figma-render={dataFigmaRender}
					data-figma-component-id={dataFigmaComponentId}
					className={cn(fieldStackVariants(), className)}
					{...props}
				>
				<div
					className="field-stack__content"
					data-layout-slot="true"
					data-slot="content"
					data-figma-render="slot"
					data-figma-property-name="content"
					data-figma-property-contents-slot={dataFigmaContentsSlot ?? "slot"}
				>
					{children}
				</div>
			</div>
		);
	},
);
