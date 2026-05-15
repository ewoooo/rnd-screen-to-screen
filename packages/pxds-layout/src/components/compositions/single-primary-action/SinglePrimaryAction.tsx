import { forwardRef } from "react";
import type { SinglePrimaryActionProps } from "./SinglePrimaryAction.types";

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
		<div
			ref={ref}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			className={cn("single-primary-action", className)}
			{...props}
		>
			<div
				className="single-primary-action__action"
				data-layout-slot="true"
				data-slot="action"
				data-figma-render="slot"
				data-figma-property-name="action"
				data-figma-property-action-slot={dataFigmaActionSlot ?? "slot"}
			>
				{children}
			</div>
		</div>
	);
});
