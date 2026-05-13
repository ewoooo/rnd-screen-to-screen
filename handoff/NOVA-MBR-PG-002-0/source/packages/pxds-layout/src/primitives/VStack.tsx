import { forwardRef } from "react";
import { Flex, type FlexProps } from "./Flex";

export type VStackProps = Omit<FlexProps, "direction">;

export const VStack = forwardRef<HTMLElement, VStackProps>(function VStack(
	props,
	ref,
) {
	return <Flex ref={ref} direction="column" {...props} />;
});
