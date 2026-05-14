import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Text } from "../text";
import type { TabItemProps } from "./TabItem.types";
import { tabItemVariants } from "./tab-item.variants";

export const TabItem = forwardRef<HTMLDivElement, TabItemProps>(function TabItem(
	{
		children,
		className,
		selected,
		state = "default",
		text = "{txt}",
		"data-figma-render": dataFigmaRender = "component",
		"data-figma-component-id": dataFigmaComponentId,
		"data-figma-property-state": dataFigmaState,
		...props
	},
	ref,
) {
	const resolvedState =
		selected === undefined ? (state ?? "default") : selected ? "selected" : "default";
	const resolvedComponentId =
		dataFigmaComponentId ??
		(dataFigmaRender === "component" ? "tab-item" : undefined);

	return (
		<div
			ref={ref}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={resolvedComponentId}
			data-figma-property-state={dataFigmaState ?? resolvedState}
			data-state={resolvedState}
			className={cn(tabItemVariants({ state: resolvedState }), className)}
			{...props}
		>
			<Text
				className="tab-item__label"
				data-figma-render="primitive"
				as="span"
			>
				{children ?? text}
			</Text>
		</div>
	);
});
