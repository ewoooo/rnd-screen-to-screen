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
} from "../style";

type BoxOwnProps = SpacingProps &
	CommonLayoutProps &
	SurfaceProps & {
		as?: ElementType;
		className?: string;
		style?: CSSProperties;
		children?: ReactNode;
	};

export type BoxProps = BoxOwnProps & {
	[key: `data-${string}`]: string | number | boolean | undefined;
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
		...rest
	} = props;
	return (
		<As
			ref={ref}
			className={className}
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
