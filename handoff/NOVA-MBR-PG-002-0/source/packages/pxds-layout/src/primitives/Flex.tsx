import {
	type CSSProperties,
	type ElementType,
	type ReactNode,
	forwardRef,
} from "react";
import { createScreenExportAttributes } from "../screen-export";
import {
	type CommonLayoutProps,
	type FlexShorthandProps,
	type SpacingProps,
	type SurfaceProps,
	commonLayoutStyle,
	flexStyle,
	spacingStyle,
	surfaceStyle,
} from "./style";

type FlexOwnProps = SpacingProps &
	CommonLayoutProps &
	FlexShorthandProps &
	SurfaceProps & {
		as?: ElementType;
		className?: string;
		style?: CSSProperties;
		children?: ReactNode;
	};

export type FlexProps = FlexOwnProps & {
	[key: `data-${string}`]: string | number | boolean | undefined;
	onClick?: React.MouseEventHandler<HTMLElement>;
	role?: string;
	id?: string;
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
		...rest
	} = props;
	return (
		<As
			ref={ref}
			className={className}
			{...createScreenExportAttributes({
				type:
					direction === "column"
						? "VStack"
						: direction === "row"
							? "HStack"
							: "Flex",
				props: {
					as: typeof As === "string" ? As : undefined,
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
					width,
					height,
					background,
					borderRadius,
				},
			})}
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
