import { forwardRef } from "react";
import type { FigmaLayoutBridgeAttributes } from "../../../types/figma-bridge";
import { Flex, type FlexProps } from "../Flex";

export type HStackProps = Omit<FlexProps, "direction">;

export const HStack = forwardRef<HTMLElement, HStackProps>(function HStack(
	props,
	ref,
) {
	const {
		"data-figma-component-id": dataFigmaComponentId = "h-stack",
		"data-figma-layout-direction": dataFigmaLayoutDirection = "horizontal",
		...rest
	} = props;
	const resolvedLayoutDirection =
		dataFigmaLayoutDirection as FigmaLayoutBridgeAttributes["data-figma-layout-direction"];

	return (
		<Flex
			ref={ref}
			direction="row"
			data-figma-component-id={dataFigmaComponentId}
			data-figma-layout-direction={resolvedLayoutDirection}
			{...rest}
		/>
	);
});
