import {
	type CSSProperties,
	type ElementType,
	type ReactNode,
	forwardRef,
} from "react";
import {
	type CommonLayoutProps,
	type SpacingProps,
	type SurfaceProps,
	commonLayoutStyle,
	spacingStyle,
	surfaceStyle,
} from "./style";

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

export type GridProps = GridOwnProps & {
	[key: `data-${string}`]: string | number | boolean | undefined;
	onClick?: React.MouseEventHandler<HTMLElement>;
	role?: string;
	id?: string;
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
		...rest
	} = props;

	return (
		<As
			ref={ref}
			className={className}
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
