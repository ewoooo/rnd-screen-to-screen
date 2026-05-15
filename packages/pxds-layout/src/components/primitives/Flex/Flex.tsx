import {
	type CSSProperties,
	type ElementType,
	forwardRef,
	type ReactNode,
} from "react";
import type { FigmaLayoutBridgeAttributes } from "../../../types/figma-bridge";
import {
	type CommonLayoutProps,
	commonLayoutStyle,
	type FlexShorthandProps,
	flexStyle,
	type SpacingProps,
	type SurfaceProps,
	spacingStyle,
	surfaceStyle,
} from "../style";

type FlexOwnProps = SpacingProps &
	CommonLayoutProps &
	FlexShorthandProps &
	SurfaceProps & {
		as?: ElementType;
		className?: string;
		style?: CSSProperties;
		children?: ReactNode;
	};

export type FlexProps = FlexOwnProps &
	FigmaLayoutBridgeAttributes & {
	[key: `data-${string}`]: string | undefined;
	onClick?: React.MouseEventHandler<HTMLElement>;
	role?: string;
	id?: string;
};

const toFigmaDirection = (
	direction: CSSProperties["flexDirection"],
): FigmaLayoutBridgeAttributes["data-figma-layout-direction"] | undefined => {
	if (direction === "column" || direction === "column-reverse") return "vertical";
	if (direction === "row" || direction === "row-reverse") return "horizontal";
	return undefined;
};

const toFigmaAlign = (
	align: CSSProperties["alignItems"],
): FigmaLayoutBridgeAttributes["data-figma-layout-align"] | undefined => {
	if (align === "flex-start" || align === "start") return "start";
	if (align === "center") return "center";
	if (align === "flex-end" || align === "end") return "end";
	if (align === "stretch") return "stretch";
	return undefined;
};

const toFigmaJustify = (
	justify: CSSProperties["justifyContent"],
): FigmaLayoutBridgeAttributes["data-figma-layout-justify"] | undefined => {
	if (justify === "flex-start" || justify === "start") return "start";
	if (justify === "center") return "center";
	if (justify === "flex-end" || justify === "end") return "end";
	if (justify === "space-between") return "space-between";
	return undefined;
};

export const Flex = forwardRef<HTMLElement, FlexProps>(function Flex(
	props,
	ref,
) {
	const {
		as: As = "div",
		p,
		px,
		py,
		pt,
		pr,
		pb,
		pl,
		gap,
		direction,
		wrap,
		align,
		justify,
		grow,
		shrink,
		width,
		height,
		minWidth,
		maxWidth,
		minHeight,
		maxHeight,
		display,
		position,
		overflow,
		overflowX,
		overflowY,
		background,
		bgGradient,
		borderRadius,
		borderColor,
		borderWidth,
		boxShadow,
		className,
		style,
		children,
		"data-figma-render": dataFigmaRender = "primitive",
		"data-figma-component-id": dataFigmaComponentId = "flex",
		"data-figma-layout-kind": dataFigmaLayoutKind = "primitive",
		"data-figma-layout-layer": dataFigmaLayoutLayer = "primitive",
		"data-figma-layout-auto": dataFigmaLayoutAuto = "true",
		"data-figma-layout-direction": dataFigmaLayoutDirection = toFigmaDirection(
			direction ?? "row",
		),
		"data-figma-layout-align": dataFigmaLayoutAlign = toFigmaAlign(
			align ?? "stretch",
		),
		"data-figma-layout-justify": dataFigmaLayoutJustify = toFigmaJustify(
			justify ?? "flex-start",
		),
		"data-figma-layout-gap": dataFigmaLayoutGap = gap === undefined
			? undefined
			: String(gap),
		...rest
	} = props;
	return (
		<As
			ref={ref}
			className={className}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-figma-layout-kind={dataFigmaLayoutKind}
			data-figma-layout-layer={dataFigmaLayoutLayer}
			data-figma-layout-auto={dataFigmaLayoutAuto}
			data-figma-layout-direction={dataFigmaLayoutDirection}
			data-figma-layout-align={dataFigmaLayoutAlign}
			data-figma-layout-justify={dataFigmaLayoutJustify}
			data-figma-layout-gap={dataFigmaLayoutGap}
			style={{
				display: display ?? "flex",
				...flexStyle({ direction, wrap, align, justify, grow, shrink }),
				...spacingStyle({ p, px, py, pt, pr, pb, pl, gap }),
				...commonLayoutStyle({
					width,
					height,
					minWidth,
					maxWidth,
					minHeight,
					maxHeight,
					position,
					overflow,
					overflowX,
					overflowY,
				}),
				...surfaceStyle({
					background,
					bgGradient,
					borderRadius,
					borderColor,
					borderWidth,
					boxShadow,
				}),
				...style,
			}}
			{...rest}
		>
			{children}
		</As>
	);
});
