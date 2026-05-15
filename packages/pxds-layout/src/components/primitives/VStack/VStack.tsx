import { forwardRef } from "react";
import type { FigmaLayoutBridgeAttributes } from "../../../types/figma-bridge";
import { Flex, type FlexProps } from "../Flex";

export type VStackProps = Omit<FlexProps, "direction">;

export const VStack = forwardRef<HTMLElement, VStackProps>(function VStack(
	props,
	ref,
) {
	const {
		"data-figma-component-id": dataFigmaComponentId = "v-stack",
		"data-figma-layout-direction": dataFigmaLayoutDirection = "vertical",
		...rest
	} = props;
	const resolvedLayoutDirection =
		dataFigmaLayoutDirection as FigmaLayoutBridgeAttributes["data-figma-layout-direction"];

	return (
		<Flex
			ref={ref}
			direction="column"
			data-figma-component-id={dataFigmaComponentId}
			data-figma-layout-direction={resolvedLayoutDirection}
			{...rest}
		/>
	);
});
