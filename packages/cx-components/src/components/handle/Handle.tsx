import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import type { HandleProps } from "./Handle.types";
import { handleVariants } from "./handle.variants";

const boolAttr = (value: boolean) => (value ? "true" : "false");

function resolveHandleState({
	showHandle,
	state,
}: {
	showHandle?: boolean;
	state?: HandleProps["state"];
}) {
	if (state === "off" || showHandle === false) {
		return "off";
	}

	return "default";
}

function toFigmaState(state: "default" | "off") {
	return state === "default" ? "Default" : "off";
}

export const Handle = forwardRef<HTMLDivElement, HandleProps>(function Handle(
	{
		className,
		showHandle = true,
		state,
		"data-figma-render": dataFigmaRender = "component",
		"data-figma-component-id": dataFigmaComponentId = "handle",
		"data-figma-property-show-handle": dataFigmaShowHandle,
		"data-figma-property-state": dataFigmaState,
		...props
	},
	ref,
) {
	const resolvedState = resolveHandleState({ showHandle, state });
	const shouldShowHandle = resolvedState === "default";

	return (
		<div
			ref={ref}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-figma-property-show-handle={
				dataFigmaShowHandle ?? boolAttr(shouldShowHandle)
			}
			data-figma-property-state={
				dataFigmaState ?? toFigmaState(resolvedState)
			}
			data-show-handle={boolAttr(shouldShowHandle)}
			data-state={resolvedState}
			className={cn(handleVariants({ state: resolvedState }), className)}
			{...props}
		>
			{shouldShowHandle ? (
				<span className="cx-handle__bar" aria-hidden="true" />
			) : null}
		</div>
	);
});
