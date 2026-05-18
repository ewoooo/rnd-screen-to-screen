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
	type SpacingProps,
	type SurfaceProps,
	spacingStyle,
	surfaceStyle,
} from "../style";

type GridOwnProps = SpacingProps &
	CommonLayoutProps &
	SurfaceProps & {
		as?: ElementType;
		className?: string;
		style?: CSSProperties;
		children?: ReactNode;
		columns?: CSSProperties["gridTemplateColumns"];
		rows?: CSSProperties["gridTemplateRows"];
		areas?: CSSProperties["gridTemplateAreas"];
		autoFlow?: CSSProperties["gridAutoFlow"];
		autoColumns?: CSSProperties["gridAutoColumns"];
		autoRows?: CSSProperties["gridAutoRows"];
		align?: CSSProperties["alignItems"];
		justify?: CSSProperties["justifyItems"];
		placeItems?: CSSProperties["placeItems"];
		alignContent?: CSSProperties["alignContent"];
		justifyContent?: CSSProperties["justifyContent"];
		placeContent?: CSSProperties["placeContent"];
	};

export type GridProps = GridOwnProps &
	FigmaLayoutBridgeAttributes & {
	[key: `data-${string}`]: string | undefined;
	onClick?: React.MouseEventHandler<HTMLElement>;
	role?: string;
	id?: string;
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
	justify: CSSProperties["justifyItems"],
): FigmaLayoutBridgeAttributes["data-figma-layout-justify"] | undefined => {
	if (justify === "flex-start" || justify === "start") return "start";
	if (justify === "center") return "center";
	if (justify === "flex-end" || justify === "end") return "end";
	return undefined;
};

export const Grid = forwardRef<HTMLElement, GridProps>(function Grid(props, ref) {
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
		columns,
		rows,
		areas,
		autoFlow,
		autoColumns,
		autoRows,
		align,
		justify,
		placeItems,
		alignContent,
		justifyContent,
		placeContent,
		className,
		style,
		children,
		"data-figma-render": dataFigmaRender = "primitive",
		"data-figma-component-id": dataFigmaComponentId = "grid",
		"data-figma-layout-kind": dataFigmaLayoutKind = "primitive",
		"data-figma-layout-layer": dataFigmaLayoutLayer = "primitive",
		"data-figma-layout-auto": dataFigmaLayoutAuto = "true",
		"data-figma-layout-direction": dataFigmaLayoutDirection = "grid",
		"data-figma-layout-align": dataFigmaLayoutAlign = toFigmaAlign(align),
		"data-figma-layout-justify": dataFigmaLayoutJustify = toFigmaJustify(justify),
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
				display: display ?? "grid",
				gridTemplateColumns: columns,
				gridTemplateRows: rows,
				gridTemplateAreas: areas,
				gridAutoFlow: autoFlow,
				gridAutoColumns: autoColumns,
				gridAutoRows: autoRows,
				alignItems: align,
				justifyItems: justify,
				placeItems,
				alignContent,
				justifyContent,
				placeContent,
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
