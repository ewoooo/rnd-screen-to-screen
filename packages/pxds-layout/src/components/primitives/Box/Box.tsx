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

type BoxOwnProps = SpacingProps &
	CommonLayoutProps &
	SurfaceProps & {
		as?: ElementType;
		className?: string;
		style?: CSSProperties;
		children?: ReactNode;
	};

export type BoxProps = BoxOwnProps &
	FigmaLayoutBridgeAttributes & {
	[key: `data-${string}`]: string | undefined;
	onClick?: React.MouseEventHandler<HTMLElement>;
	role?: string;
	id?: string;
};

export const Box = forwardRef<HTMLElement, BoxProps>(function Box(props, ref) {
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
		className,
		style,
		children,
		"data-figma-render": dataFigmaRender = "primitive",
		"data-figma-component-id": dataFigmaComponentId = "box",
		"data-figma-layout-kind": dataFigmaLayoutKind = "primitive",
		"data-figma-layout-layer": dataFigmaLayoutLayer = "primitive",
		"data-figma-layout-auto": dataFigmaLayoutAuto = "false",
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
			style={{
				...spacingStyle({ p, px, py, pt, pr, pb, pl, gap }),
				...commonLayoutStyle({
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
