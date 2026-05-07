import { forwardRef } from "react";
import { Flex, type FlexProps } from "./Flex";

export type HStackProps = Omit<FlexProps, "direction">;

export const HStack = forwardRef<HTMLElement, HStackProps>(function HStack(
	props,
	ref,
) {
	return <Flex ref={ref} direction="row" {...props} />;
});
