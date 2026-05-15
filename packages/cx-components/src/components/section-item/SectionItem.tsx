import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import type { SectionItemProps } from "./SectionItem.types";
import { sectionItemVariants } from "./section-item.variants";

const FIGMA_TYPE_BY_VARIANT = {
	default: "default-20",
	card: "card-0",
} as const;

export const SectionItem = forwardRef<HTMLDivElement, SectionItemProps>(
	function SectionItem(
		{
			children,
			className,
			type,
			variant = "default",
			"data-figma-render": dataFigmaRender = "component",
			"data-figma-component-id": dataFigmaComponentId = "section-item",
			"data-figma-property-type": dataFigmaType,
			"data-figma-property-contents": dataFigmaContents,
			...props
		},
		ref,
	) {
		const resolvedVariant = type ?? variant ?? "default";

		return (
			<div
				ref={ref}
				data-figma-render={dataFigmaRender}
				data-figma-component-id={dataFigmaComponentId}
				data-figma-property-type={
					dataFigmaType ?? FIGMA_TYPE_BY_VARIANT[resolvedVariant]
				}
				data-figma-property-contents={dataFigmaContents ?? "slot"}
				data-variant={resolvedVariant}
				className={cn(
					sectionItemVariants({ variant: resolvedVariant }),
					className,
				)}
				{...props}
			>
				<div
					className="section-item__contents"
					data-figma-render="slot"
					data-figma-property-name="contents"
				>
					{children}
				</div>
			</div>
		);
	},
);
