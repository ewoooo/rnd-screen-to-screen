import type { ReactNode } from "react";
import type { FigmaLayoutBridgeAttributes } from "../../types/figma-bridge";
import { VStack } from "../primitives";

type Props = FigmaLayoutBridgeAttributes & {
	children: ReactNode;
};

export function ContentList({
	children,
	"data-figma-render": dataFigmaRender = "layout",
	"data-figma-component-id": dataFigmaComponentId = "content-list",
	"data-figma-layout-kind": dataFigmaLayoutKind = "chrome",
	"data-figma-layout-layer": dataFigmaLayoutLayer = "content",
	"data-figma-layout-auto": dataFigmaLayoutAuto = "true",
	"data-figma-layout-direction": dataFigmaLayoutDirection = "vertical",
	"data-figma-layout-align": dataFigmaLayoutAlign = "stretch",
	"data-figma-layout-gap": dataFigmaLayoutGap = "spacing-4",
	"data-figma-layout-sizing": dataFigmaLayoutSizing = "fill",
}: Props) {
	return (
		<VStack
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-figma-layout-kind={dataFigmaLayoutKind}
			data-figma-layout-layer={dataFigmaLayoutLayer}
			data-figma-layout-auto={dataFigmaLayoutAuto}
			data-figma-layout-direction={dataFigmaLayoutDirection}
			data-figma-layout-align={dataFigmaLayoutAlign}
			data-figma-layout-gap={dataFigmaLayoutGap}
			data-figma-layout-sizing={dataFigmaLayoutSizing}
			gap="var(--spacing-4)"
		>
			{children}
		</VStack>
	);
}
